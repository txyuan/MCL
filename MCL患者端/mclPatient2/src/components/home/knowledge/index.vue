<template>
  <div style="background-color: #fff">
    <!-- <mt-header fixed title="知识"></mt-header> -->
    <!-- <van-search v-model="value" shape="round" @click="$router.push('/searchKonw')" placeholder="请输入搜索关键词" /> -->
    <div style="background-color: #fff; padding: 0.1rem 0.2rem 0 0.2rem">
      <div class="search-group" @click="$router.push('/searchKonw')">
        <input type="text" placeholder="请输入搜索关键字" disabled />
      </div>
    </div>
    <!-- 产品分类 -->
    <div class="product_type">
      <ul>
        <li v-for="item in typeList" :key="item.sKey" @click="checkOut(item)">
          <img :src="item.ImageUrl" alt="" />
          <p>{{ item.name }}</p>
        </li>
        <li v-show="!more" @click="knowMore">
          <img src="@/assets/images/kno-more.png" alt="" />
          <p>更多</p>
        </li>
      </ul>
      <!-- <ul v-else>
        <li v-for="item in typeList" :key="item.sKey" @click="checkOut(item)">
          <img :src="item.ImageUrl" alt="" />
          <p>{{ item.name }}</p>
        </li>
      </ul> -->
    </div>
    <!-- 知识列表 -->
    <div class="content_list">
      <div class="fenlei">
        <div class="title_kno">
          <h4>精选推荐</h4>
          <div class="quan"></div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <van-cell
            class="ul"
            v-for="item in list"
            :key="item.sKey"
            @click="detailFN(item)"
          >
            <div class="list_li">
              <div class="li_top">
                <div class="left_img">
                  <img :src="item.platformLogo" alt="" />
                  <span>{{ item.platformName }}</span>
                </div>
                <p>{{ item.create_time }}</p>
              </div>

              <div class="li">
                <div class="left_text">
                  <p>
                    {{ item.Title }}
                  </p>
                  <p>
                    <span>阅读 {{ item.readCount }}</span
                    ><span>分享 {{ item.shareCount }}</span
                    ><span>点赞 {{ item.followCount }}</span>
                  </p>
                </div>
                <div class="right_img">
                  <img :src="item.ImageUrl" alt="" />
                </div>
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
      more: true,
      value: "", // 搜索
    };
  },
  components: {
    loadMore,
  },
  created() {
    this.getKnowOneList();
    this.getList();
  },
  mounted() {},
  methods: {
    // 更多知识
    knowMore() {
      this.$router.push("/knowMore");
    },
    detailFN(item) {
      sessionStorage.setItem("share", item.ImageUrl);
      this.$router.push(
        `/knowledgeResult?sKey=${item.sKey}&Title=${item.Title}`
      );
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
        if (res.list.length > 8) {
          this.more = false;
          let list = [];
          for (var i = 0; i < 7; i++) {
            list.push(res.list[i]);
          }
          this.typeList = list;
        } else {
          this.typeList = res.list;
        }
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
        } else if (res.data.length == 0) {
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
// 搜索框
.search-group {
  padding: 0.08rem 0.2rem;
  padding-left: 0.45rem;
  display: flex;
  align-items: center;
  // background: #f2f2f2;
  // border: 1px solid #e5e5e5;
  border-radius: 0.2rem;
  background: url(../../../assets/images/searchKow.png) no-repeat 0.2rem;
  background-size: 0.16rem;
  background-color: #f8f8f8;
  input {
    flex: 1;
    border: none;
    color: #666;
    font-size: 0.14rem;
  }
  .search {
    width: 0.2rem;
    height: 0.2rem;
    margin-left: 0.1rem;
  }
}
// 产品分类
.product_type {
  background-color: #fff;
  // margin-top: 0.4rem;
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
      font-size: 0.14rem;
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
  margin-bottom: 0.4rem;
  background-color: #fff;
  padding: 0.1rem;
  .fenlei {
    .title_kno {
      position: relative;
      overflow: hidden;
    }
    h4 {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 0.18rem;
      height: 0.3rem;
      font-weight: 500;
      margin-left: 0.1rem;
      z-index: 1;
      background-color: #fff;
    }
    .quan {
      margin-left: 0.25rem;
      // margin-top: 0.01rem;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      // background-color: #ffc759;
      border: 0.04rem solid #ffc759;
    }
  }
  .ul {
    margin-top: 0.15rem;
    background-color: #f8f8f8;
    border-radius: 0.1rem;
    .li_top {
      display: flex;
      justify-content: space-between;
      .left_img {
        img {
           margin-top: -0.03rem;
          width: 0.2rem;
          height: 0.2rem;
          display: inline-block;
          vertical-align: middle;
        }
        span {
             line-height: 0.26rem;
          font-size: 0.16rem;
          display: inline-block;
        }
      }
      p {
        color: #9a9a9c;
        font-size: 0.14rem;
      line-height: 0.26rem;
      }
    }
    .li {
      height: 0.9rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      // border-bottom: 1px solid #ccc;
      padding: 0.1rem 0;

      .left_text {
        // padding: 0.1rem;
        margin-left: 0.1rem;
        margin-top: 0.05rem;
        padding-bottom: 0;
        width: 1.6rem;
        p:nth-child(1) {
          // width: 1.6rem;
          height: 0.5rem;
          line-height: 0.25rem;
          font-size: 0.16rem;
          font-weight: 700;
          display: -webkit-box;
          overflow: hidden;
          /*! autoprefixer: off; */
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        p:nth-child(2) {
          margin-left: -0.1rem;
          margin-top: 0.15rem;
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 0.12rem;
          span:nth-child(1) {
            // width: 0.;
            padding: 0 0.1rem;
            background-color: #feeee0;
            border-radius: 0.12rem;
            color: #f08622;
          }
          span:nth-child(2) {
            // padding: 0.04rem;
            color: #9a9a9c;
          }
          span:nth-child(3) {
            // padding: 0.04rem;
            color: #9a9a9c;
          }
          // font-size: 0.14rem;
          // color: #aeaeae;
          // white-space: nowrap;
          // overflow: hidden;
          // text-overflow: ellipsis;
        }
      }
      .right_img {
        margin-bottom: 0.1rem;
        height: 100%;
        width: 42%;
        img {
          border-radius: 0.06rem;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>