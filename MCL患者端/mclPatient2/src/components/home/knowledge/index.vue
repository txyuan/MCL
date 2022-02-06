<template>
  <div>
    <mt-header fixed title="知识"></mt-header>
    <!-- 产品分类 -->
    <div class="product_type">
      <ul>
        <li v-for="item in typeList" :key="item.sKey" @click="checkOut(item)">
          <img :src="item.ImageUrl" alt="" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <!-- 知识列表 -->
    <div class="content_list">
      <div class="fenlei">
        <h4>推荐知识</h4>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <van-cell class="ul" v-for="item in list" :key="item.sKey" @click="detailFN(item)">
            <div class="li">
              <div class="left_text">
                <p>
                  {{ item.Title }}
                </p>
                <p>{{ item.Subtitle }}</p>
              </div>
              <div class="right_img">
                <img :src="item.ImageUrl" alt="" />
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import loadMore from "@/components/common/loadMore.vue"; // 加载更多组件
export default {
  name: "knowledge",
  data() {
    return {
      params: {
        pagecount: 1,
        pagesize: 10,
      },
      typeList: [],
      list: [],
      loading: false,
      finished: false,
    };
  },
  components: {
    loadMore,
  },
  created() {
    this.getKnowOneList();
    this.getList();
  },
  mounted() {
  },
  methods: {
    detailFN(item){
      this.$router.push(`/knowledgeResult?sKey=${item.sKey}&Title=${item.Title}`)
    },
    // 触发上拉加载
    onLoad() {
      let times = setTimeout(() => {
        this.params.pagecount += 1; //每请求一次，页面数+1
        this.getList();
        clearTimeout(times);
      }, 500);
    },
    // 选择跳转
    checkOut(item) {
      if (item.PageStyle == "样式一") {
        this.$router.push(`/knowledgeOne?sKey=${item.sKey}&name=${item.name}`);
      } else {
        this.$router.push(`/knowledgeTwo?sKey=${item.sKey}&name=${item.name}`);
      }
    },
    // 获取一级列表
    getKnowOneList() {
      let url = "UserInterface/knowledge/GetKnowledgeCategoryList.ashx";
      this.$post(url).then((res) => {
        this.typeList = res.list;
      });
    },
    // 获取推荐知识列表
    getList() {
      this.$Indicator.loading();
      let url = "UserInterface/knowledge/GetIndexKnowledgeList.ashx";
      if (this.params.pagecount == 1) {
        this.list = [];
      }
      this.$post(url, this.params).then((res) => {
					this.$Indicator.close();
        if (res.rspcode != 1) {
          return;
        }
        if (res.data.length < 10) {
          this.finished = true;
          // return;
        }else if(res.data.length == 0) {
           this.finished = true;
          return;
        }
        let modelList = res.data;
        this.list = [...this.list, ...modelList];
        // 加载状态结束
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
// 产品分类
.product_type {
  background-color: #fff;
  margin-top: 0.5rem;
  padding: 0;
  ul {
    overflow: hidden;
    padding: 0.1rem 0.15rem;
  }
  li {
    float: left;
    width: 25%;
    text-align: center;
    font-size: 0.14rem;
    color: #666;
    padding: 0.1rem 0;
    p {
      margin-top: 0.05rem;
      font-size: 0.13rem;
    }
  }
  img {
    display: block;
    width: 0.48rem;
    height: 0.48rem;
    margin: 0 auto;
  }
}
.content_list {
  margin-top: 0.1rem;
  margin-bottom: 0.6rem;
  background-color: #fff;
  padding: 0.1rem;
  .fenlei {
    h4 {
      font-size: 0.2rem;
      font-weight: 500;
      margin-left: 0.1rem;
    }
  }
  .ul {
    margin-top: 0.1rem;
    .li {
      height: 0.8rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 0.1rem;

      .left_text {
        width: 55%;
        p:nth-child(1) {
          width: 100%;
          margin-bottom: 0.2rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        p:nth-child(2) {
          width: 100%;
          font-size: 0.14rem;
          color: #aeaeae;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .right_img {
        height: 100%;
        width: 35%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>