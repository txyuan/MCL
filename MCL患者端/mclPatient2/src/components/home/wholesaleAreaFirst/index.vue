<template>
  <div>
    <div id="class_header">
      <mt-header :title="title" fixed>
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
    </div>

    <div id="content" class="padding-footer">
      <loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE">
        <div slot="content" class="clear">
          <product  v-for="(item,index) in list" :key="index" :item="item" :detailPage="`/wholesaleAreaDetail/${item.goodsId}${orderParam}`" :ref="`product${index}`"/>
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
    name: "wholesaleAreaFirst",
    data:()=>({
    	title:"批发专区",
    	orderParam:"", //?orderId=0
      param:{
        pagesize: 10,
        pagecount:0,
        proType: ''  //"" 全部， 1 一元拼购，不中全返，限购专区
      },
      list: []
    }),
    methods:{
      //获取商品类别
      shoplist(success){
        let url = "UserInterface/GetWholesaleProductList.ashx";
        //批发优先购买专区
        let orderId = this.$route.query.orderId;
        if(orderId){
        	this.title = "批发优先购买专区";
        	//参数携带到详情页面
        	const {OrderPeiEr,orderMoney,buyCount} = this.$route.query;
        	this.orderParam = `?orderId=${orderId}&OrderPeiEr=${OrderPeiEr}&orderMoney=${orderMoney}&buyCount=${buyCount}`;
        	//批发优先购买专区新增参数
        	this.param.flag = 1;
        }
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
      let keepAlive = (to.name == "wholesaleAreaDetail") ? true: false;
      this.$route.meta.keepAlive = keepAlive;
      //清空product组件时间倒计时
      this.list.forEach((item,index)=>{
        const product = this.$refs[`product${index}`][0];
        if(product.timer != ""){
          clearInterval(product.timer)
        }
      })
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
