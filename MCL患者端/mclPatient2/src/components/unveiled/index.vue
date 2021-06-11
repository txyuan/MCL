<template>
<div>
  <!--<div id="class_header">-->
    <!--<mt-header title="汇兑商城"></mt-header>-->
  <!--</div>-->
  <mt-header fixed title="汇兑商城">
    <div slot="left">
      <header-back>
        <mt-button icon="back"></mt-button>
      </header-back>
    </div>
  </mt-header>

  <div id="content" class="padding-footer">
    <loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE">
      <div slot="content" class="clear">
        <productItem  v-for="(item,index) in list" :key="index" :item="item" detailPage="unveiledDetail"/>
      </div>
    </loadMore>
  </div>

</div>
</template>

<script>
  import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
  import Bus from "@/assets/js/updateShopCar.js";  //跟新购物车数量
  import productItem from "@/components/common/productItem.vue";   //商品
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
          //获取商品类别
          shoplist(success){
            let url = "UserInterface/GetExchangeProductList.ashx";
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
          let keepAlive = (to.name == "unveiledDetail") ? true: false;
          this.$route.meta.keepAlive = keepAlive;
          next()
        },
        components:{
          productItem,
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
    padding-top: 49px;
    margin-left: 0.07rem;
    margin-right: 0.07rem;
  }

</style>
