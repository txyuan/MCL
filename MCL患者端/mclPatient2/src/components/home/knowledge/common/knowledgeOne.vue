<template>
  <div style="background-color: #f8f8f8">
    <mt-header
      style="background-color: #38c2d7; color: #fff"
      fixed
      :title="$route.query.name"
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <van-tabs v-model="activeId" animated sticky offset-top="0.37rem">
      <van-tab
        v-for="item in tabList"
        :key="item.sKey"
        :title="item.name"
        :name="item.sKey"
      >
        <div class="content_list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了~~"
            @load="loadMore"
            :immediate-check="false"
            :offset="50"
          >
           <van-cell
            class="ul"
            v-for="(item,i) in list"
            :key="i"
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
      </van-tab>
    </van-tabs>
    <div style="background-color: #fff"></div>
  </div>
</template>

<script>
// import loadMore from "@/components/common/loadMore.vue";
export default {
  name: "knowledgeOne",
  data() {
    return {
      param: {
        SubjectTypeSkey: this.$route.query.sKey,
        //  pagesize:10,
        // pagecount: 1,
      },
      paramList: {
        firstSubjectType: this.$route.query.sKey,
        name: '',
        secondSubjectType: "",
        pagesize: 10,
        pagecount: 1,
      },
      tabList: [], // tab列表
      list: [], // 知识列表
      activeId: 0,
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
    };
  },
  created() {
    this.getKonwTabList();
  },
  watch: {
    // 监听  切换数据
    activeId () {
      this.paramList.pagecount = 1
      this.list = []
      this.finished = false
      // 发送请求
      this.getList()
    }
  },
  components: {
    // loadMore,
  },
  methods: {
    detailFN(item) {
      sessionStorage.setItem('share',item.ImageUrl)
      this.$router.push(
        `/knowledgeResult?sKey=${item.sKey}&Title=${item.Title}`
      );
    },
    // 查询tab
    getKonwTabList() {
      let url = "UserInterface/knowledge/GetBusSubjectKnowledgeList.ashx";
      this.$post(url, this.param).then((res) => {
        if (res.rspcode != 1) {
          return;
        }
        this.tabList = res.group;
      });
    },
    // 查询列表
    getList() {
      this.$Indicator.loading();
      this.paramList.secondSubjectType = this.activeId
      let url = "UserInterface/knowledge/GetKnowledgeList.ashx";
      if (this.paramList.pagecount == 1) {
        this.list = [];
      }
      this.$post(url, this.paramList).then((res) => {
        this.$Indicator.close();
        if (res.rspcode != 1) {
          return;
        }
          let modelList = res.data;
          // 判断,没有数据后停止加载
        if (res.data.length < 10) {
            this.finished = true;
            // return;
          } else if (res.data.length == 0) {
            this.finished = true;
            return;
          }
          this.list = [...this.list, ...modelList];
          this.loading = false
      });
    },
    // 上拉获取更多
    async loadMore() {
       if (this.list.length > 0) {
        this.paramList.pagecount++
      this.getList()
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
/deep/ .van-tab--active {
  font-weight: 700;
}
/deep/ .van-tabs__line {
  background-color: #f8cb72 !important;
}
/deep/ .van-cell {
  background-color: #f8f8f8 !important;
}
.content_list {
  background-color: #fff;
  padding: 0.05rem 0.1rem;
  margin-top: 0.45rem;
}
.ul {
    margin-top: 0.15rem;
    background-color: #f8f8f8;
    height: 1.46rem;
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
        width: 1.65rem;
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
          margin-top: 0.08rem;
          display: flex;
          justify-content: space-between;
          width: 1.8rem;
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
        height: 0.8rem;
        width: 1.2rem;
        img {
          border-radius: 0.06rem;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>