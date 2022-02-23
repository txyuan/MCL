<template>
  <div style="background-color: #fff;">
   <div class="header_top" style="background-color: #38c2d7; color: #fff">
      <van-icon class="arrow-left" @click="$router.push('/wx_Entrance/knowledge')" name="arrow-left" />
      <!-- <form class="right" action="/"> -->
      <div class="right">
        <van-search
          class="left_search"
          v-model="value"
          background="#38c2d7"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
      </div>
      <!-- </form> -->
      <p @click="onSearchText">搜索</p>
    </div>
    <!-- 知识列表 -->
    <div class="content_list">
      <div class="fenlei">
       
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
  name: "searchKonwRes",
  data() {
    return {
      
       paramList: {
        firstSubjectType: '',
        name: this.$route.query.title,
        secondSubjectType: "",
        pagesize: 10,
        pagecount: 1,
      },
      typeList: [],
      list: [],
      loading: false,
      finished: false,
      more : true,
      value: '', // 搜索
    };
  },
  components: {
    loadMore,
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
     // 搜索
    onSearch() {
      this.onSearchText();
    },
    onSearchText() {
      this.paramList.name = this.value
      this.paramList.pagecount = 1
      let url = 'UserInterface/knowledge/InsertUserKnowledgeHistory.ashx'
      let params = {
        Tile : this.value
      }
      this.$post(url,params).then((res) => {})
      this.getList();
    },
    detailFN(item) {
      this.$router.push(
        `/knowledgeResult?sKey=${item.sKey}&Title=${item.Title}`
      );
    },
    // 触发上拉加载
    onLoad() {
      let times = setTimeout(() => {
        this.paramList.pagecount += 1; //每请求一次，页面数+1
        this.getList();
        clearTimeout(times);
      }, 500);
    },
    // 获取推荐知识列表
    getList() {
      this.$Indicator.loading();
      let url = "UserInterface/knowledge/GetIndexKnowledgeList.ashx";
      if (this.paramList.pagecount == 1) {
        this.list = [];
      }
      this.$post(url, this.paramList).then((res) => {
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
.header_top {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 0.44rem;
  p {
    width: 0.5rem;
    font-size: 0.16rem;
    line-height: 0.44rem;
    height: 0.44rem;
  }
  // height: 0.44rem;
  display: flex;
  justify-content: space-between;
  .arrow-left {
    font-size: 0.26rem;
    margin-left: 0.2rem;
    // margin-right: 0.1rem;
    // width: 0.5rem;
    line-height: 0.44rem;
  }
  .right {
    flex: 1;
  }
  .van-cell {
    line-height: 0.18rem;
  }
  .van-search {
    padding: 0 0.12rem !important;
    margin-top: 0.08rem;
  }
  .van-search__action {
    color: #fff !important;
  }
}
.content_list {
  margin-top: 0.35rem;
  // margin-bottom: 0.4rem;
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
    margin-top: 0.1rem;
    background-color: #f8f8f8;
    border-radius: 0.1rem;
    .li_top {
      display: flex;
      justify-content: space-between;
      .left_img {
        img {
          width: 0.2rem;
          height: 0.2rem;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          display: inline-block;
        }
      }
      p {
        color: #9a9a9c;
        font-size: 0.12rem;
      }
    }
    .li {
      height: 0.9rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      // border-bottom: 1px solid #ccc;
      // padding: 0.1rem;

      .left_text {
        padding: 0.1rem;
        width: 50%;
        p:nth-child(1) {
          width: 100%;
          // margin-bottom: 0.2rem;
          height: 0.5rem;
          font-size: 0.16rem;
          font-weight: 700;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        p:nth-child(2) {
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
        height: 100%;
        width: 40%;
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