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
    <van-tabs v-model="activeId" animated sticky offset-top="0.4rem">
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
import loadMore from "@/components/common/loadMore.vue";
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
    async activeId () {
      this.paramList.pagecount = 1
      this.list = []
      // 发送请求
      await this.getList()
    }
  },
  components: {
    loadMore,
  },
  methods: {
    detailFN(item) {
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
      this.paramList.secondSubjectType = this.activeId
      let url = "UserInterface/knowledge/GetKnowledgeList.ashx";
      this.$post(url, this.paramList).then((res) => {
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
       let times = setTimeout(() => {
        this.params.pagecount += 1; //每请求一次，页面数+1
        this.getList();
        clearTimeout(times);
      }, 500);
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
  margin-top: 0.5rem;
}
.ul {
  margin-top: 0.1rem;
  // background-color: #f8f8f8;
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
</style>