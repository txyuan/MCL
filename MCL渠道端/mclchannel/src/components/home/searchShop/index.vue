<template>
    <div>
        <div id="class_header">
          <!-- 头部  -->
          <mt-header fixed title="商品">
            <div slot="left">
              <header-back>
                <mt-button icon="back"></mt-button>
              </header-back>
            </div>
          </mt-header>
        </div>

        <!--身体-->
        <loadMore :param="param" @triggerGetList="seacherInput" ref="loadMoreE" :isDefaultLoading="false">
          <div class="padding-header clear content" slot="content">
             <productItem v-for="(item,index) in list" :key="index" :item="item" detailPage="classdetail" />
          </div>
        </loadMore>
      </div>
</template>

<script>
    import topHead from "./../../classification/search_input.vue";   //搜索
    import productItem from "@/components/common/productItem.vue";   //商品
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件

    export default {
        name: "index",
        data:()=>({
          list:[],
          param:{
            "areaskey": '341802',
            "pagesize": 10,
            "pagecount": 0,
            "keyword": ""
          }
        }),
        methods: {
          seacherInput(success) {
            let url = "UserInterface/GetProductNameList.ashx";
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              let modelList = data.goodsList;
              data.goodsList.forEach((item)=>{
                const {goodsId} = item;
                item.detailUrl = `/classdetail/${goodsId}`
              })
              if(this.param.pagecount == 1){
                this.list = [...modelList];
              }else{
                this.list = [...this.list,...modelList]
              }
              //加载更多组件触发回调
              if(success){
                success(modelList,this.list)
              }
            })
          },
          //开始加载更多
          startLoadMore() {
            this.param.pagecount = 0;
            this.$refs.loadMoreE.getList();
          }
        },
        mounted(){
          this.param.keyword = this.$route.query.search;
          this.startLoadMore();
        },
        activated(){
          this.$refs.loadMoreE.loading = false;//打开分页
        },
        deactivated(){
          this.$refs.loadMoreE.loading = true;//关闭分页
        },
        beforeRouteLeave (to, from, next) {
          // 导航离开该组件的对应路由时调用
          let keepAlive = (to.name == "classdetail") ? true: false;
          this.$route.meta.keepAlive = keepAlive;
          next()
        },
        components:{
            topHead,
            productItem,
            loadMore
        }
    }
</script>

<style scoped>
.shopbody{
  margin-top: 43px;
}
.content{
  padding-left: 0.025rem;
  padding-right: 0.025rem;
}
</style>
