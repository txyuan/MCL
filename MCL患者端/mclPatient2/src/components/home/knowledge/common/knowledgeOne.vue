<template>
  <div>
    <mt-header fixed :title="$route.query.name">
      <div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
    </mt-header>
    <!-- <van-tabs>
  <van-tab>
    内容 {{ index }}
  </van-tab>
</van-tabs> -->
    <div style="background-color: #fff;">
      <div class="content_list">
      <!-- <loadMore
        :param="param"
        @triggerGetList="getKonwList"
        ref="loadMoreE"
        
      > -->
        <div class="fenlei" v-for="(item,index) in list" :key="index">
          <h4>{{item.name}}</h4>
          <ul>
            <li v-for="items in item.data" :key="items.sKey" @click="detailFN(items)"> 
              <div class="left_text">
                <p>
                  {{items.Title}}
                </p>
                <p>{{items.Subtitle}}</p>
              </div>
              <div class="right_img">
                <img :src="items.ImageUrl" alt="" />
              </div>
            </li>
          </ul>
        </div>
      <!-- </loadMore> -->
    </div>
    </div>
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
        // pagecount: 0,
      },
      list: [],
    };
  },
  created() {
    this.getKonwList()
  },
  components: {
    loadMore,
  },
  methods: {
    detailFN(item){
      this.$router.push(`/knowledgeResult?sKey=${item.sKey}&Title=${item.Title}`)
    },
    getKonwList(success) {
      // let param = {
      //   SubjectTypeSkey: this.$route.query.sKey,
      // };
      // if (this.param.pagecount == 1) {
      //   this.list = [];
      // }
      let url = "UserInterface/knowledge/GetBusSubjectKnowledgeList.ashx";
      this.$post(url, this.param).then((res) => {
        if (res.rspcode != 1) {
          return;
        }
        let modelList = res.group;
        this.list = [...this.list, ...modelList];
        // //加载更多组件触发回调
        // if (success) {
        //   success(modelList, this.list);
        // }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";

.content_list {
  margin-top: 0.5rem;
   margin-bottom: 0.6rem;
  background-color: #fff;
  padding: 0.1rem;
  .fenlei {
    h4 {
      font-size: 0.2rem;
      font-weight: 700;
      margin-left: 0.1rem;
    }
  }
  ul {
    margin-top: 0.1rem;
    li {
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