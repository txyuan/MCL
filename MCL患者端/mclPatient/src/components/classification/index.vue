<template>
<div>
  <div id="body_main">

    <div id="class_header">
      <!-- 搜索  -->
      <search-input />
      <!-- 导航条  -->
      <nav-bar :param="param" @triggerLoad="startLoad" @resetParam="resetParam"/>
    </div>

    <!-- 商品列表  -->
    <loadMore :param="param" @triggerGetList="loadData" ref="loadMoreE" :isDefaultLoading="false" style="padding-bottom: 55px;">
      <div class="content bodycont clear" slot="content" >
      	<productItem v-for="(item,index) in list" :key="item.goodsId" :item="item" detailPage="classdetail"/>
      </div>
    </loadMore>

  </div>
</div>
</template>

<script>
    import searchInput from "./search_input.vue";   //搜索
    import navBar from "./navbar/navbar.vue";  //导航
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    import Bus from "@/assets/js/updateShopCar.js";  //跟新购物车数量
    import productItem from "@/components/common/productItem.vue";   //商品
    export default {
        name: "classification",
        data:()=>({
          list:[],
          categoryid1:'',
          categoryid2:'',
          ordertypes:0,
          param : {
            "pagesize": 10,
            "pagecount": 0,
            "priceorder": '1',    //0，价格降序;1，价格升序
            "saleorder": '1',     //0，销量降序;1，销量升序
            "secondsubjecttype": '',
            "firstsubjecttype": ''
          },
          paramString:""    //param 默认的筛选条件字符串
        }),
        methods:{
          //触发加载更多
          startLoad(){
            this.param.pagecount = 0;
            this.$refs.loadMoreE.getList();
          },
          //商品列表
          loadData(success){
            let url = "UserInterface/GetProductList.ashx";
            if(this.param.pagecount == 1){
              this.list = [];
            }
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              let modelList = data.goodsList;
              this.list = [...this.list,...modelList]
              //加载更多组件触发回调
              if(success){
                success(modelList,this.list)
              }
            })
          },
          //重置筛选条件
          resetParam(){
            const {priceorder,saleorder,secondsubjecttype,firstsubjecttype} = JSON.parse(this.paramString)
            this.param.priceorder = priceorder;
            this.param.saleorder = saleorder;
            this.param.secondsubjecttype = secondsubjecttype;
            this.param.firstsubjecttype = firstsubjecttype;
          }
        },
        activated(){
          //排除第一次执行
          if(this.list.length > 0){
            this.$refs.loadMoreE.loading = false;//打开分页
          }
          Bus.$emit("updateShop")
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
        mounted(){
          this.startLoad()
          this.paramString = JSON.stringify(this.param);
        },
        components:{
          searchInput,
          navBar,
          productItem,
          loadMore
        }
    }
</script>

<style scoped lang="scss">
  #body_main{
    padding-top: 0;
  }
  #class_header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  .bodycont{
    padding-top: 95px;
    margin-left: 0.075rem;
    margin-right: 0.075rem;
  }
</style>
