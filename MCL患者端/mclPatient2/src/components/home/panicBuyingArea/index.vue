<template>
  <div>
    <div id="class_header">
      <mt-header title="抢购专区" fixed>
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
    </div>

    <div id="content" class="padding-footer">
      <loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE" :isDefaultLoading="false">
        <div slot="content" class="clear">
          <product v-for="(item,index) in list" :key="index" :item="item" :detailPage="`/panicBuyingAreaDetail/${item.goodsId}`" :ref="`product${index}`"/>
        </div>
      </loadMore>
    </div>

  </div>
</template>

<script>
  import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
  import Bus from "@/assets/js/updateShopCar.js";  //跟新购物车数量
  import product from "@/components/common/product.vue";   //商品
  export default {
    name: "unveiled",
    data:()=>({
      param:{
        pagesize: 10,
        pagecount:0
      },
      list: []
    }),
    methods:{
    	//触发加载更多
      startLoad(){
        this.param.pagecount = 0;
        this.$refs.loadMoreE.getList();
      },
      //获取商品类别
      shoplist(success){   
        let url = "UserInterface/GetPanicBuyingProductList.ashx";
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
      }
    },
    activated(){
      //排除第一次执行
//    if(this.list.length > 0){
//      this.$refs.loadMoreE.loading = false;//打开分页
//    }
//    Bus.$emit("updateShop")
    },
    deactivated(){
//    this.$refs.loadMoreE.loading = true;//关闭分页
    },
    beforeRouteEnter (to, from, next) {
		  next(vm => {
		    // 通过 `vm` 访问组件实例
		    //从非详情页面进来  都要重新加载数据
		    if(from.name != "panicBuyingAreaDetail"){
		    	vm.startLoad();    
		    }
		    //详情页面进来，数据为空要加载
		    if((from.name == "panicBuyingAreaDetail")&&(vm.list.length == 0)){
		    	vm.startLoad(); 
		    }
		    
		  })
		},
    beforeRouteLeave (to, from, next) {
      //导航离开该组件的对应路由时调用
      //去非详情页面， 清空所有商品列表时间timer
      if(to.name != "panicBuyingAreaDetail"){
      	this.$root.clearAllProductTimer();   //清除所有的时间timer
      }
      next()
    },
    components:{
      product,
      loadMore
    },
    mounted(){
      // this.shoplists();
    }
  }
</script>

<style scoped lang="scss">
  #class_header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  #content{
    padding-top: 53px;
    margin-left: 0.075rem;
    margin-right: 0.075rem;
  }

</style>
