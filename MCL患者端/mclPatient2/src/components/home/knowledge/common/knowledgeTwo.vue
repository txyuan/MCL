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
           <div class="tool-list">
        <ul>
            <!-- <li v-for="(item, index) in list" :key="index" @click="$router.push({name: 'selfTestDetail', query:{type: item.PageUrl, skey: item.sKey, SubjectName: item.SubjectName}})"> -->
            <li v-for="(item, index) in list" :key="index"  @click="detailFN(item)">

              <div class="box">
                <img :src="item.ImageUrl" alt="">
                <p class="item-title">{{item.Title}}</p>
              </div>
            </li>
        </ul>
      </div>
          
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
    activeId () {
      this.paramList.pagecount = 1
      this.list = []
      this.finished = false
      // 发送请求
       this.getList()
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
  margin-top: 0.5rem;
}
.tool-list ul {
  overflow: hidden;
  padding: 0 0.05rem;
  padding-bottom: 0.05rem;
  margin-top: -0.05rem;
  li {
    float: left;
    width: 50%;
     padding: 0.1rem;
    box-sizing: border-box;
  }
  li .box {
    position: relative;
    text-align: left;
    // background: #F0F4FD;
    border-radius: 0.06rem;
    // height: 0.9rem;
    height: 1.1rem;
    font-size: 0.16rem;
    // padding: 0.15rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .box img {
    width: 100%;
    height: 100%;
  }
  .item-title{
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    font-weight: 700;
    font-size: 0.14rem;
    margin-bottom: 0.02rem;
  }
  .item-des{
    font-size: 0.12rem;
    color: #666;
    height: 0.32rem;
    margin-bottom: 0.05rem;
  }
  // .item-icon{
  //   position: absolute;
  //   bottom: 0.2rem;
  //   left: 0.2rem;
  //   margin-bottom: 0.02rem;
  //   width: 0.36rem;
  //   padding: 0.01rem 0;
    
  //   border-radius: 0.1rem;
  //   // border-top-left-radius: 0.09rem;
  //   // border-bottom-right-radius: 0.09rem;
  //   font-size: 0.12rem;
  //   text-align: center;
  //   font-style: normal;
    
  //   display: block;
  // }
}
</style>