<template>
  <div class="extractProduct_root">
    <div class="fix_top">
      <mt-header title="提取商品" class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>

      <!-- mt-navbar -->
      <div id="navbar">
        <mt-navbar>
          <mt-tab-item  id="" v-for="item in tabs" :key="item.type" :class="(param.Status == item.type) && 'is-selected'" @click.native="tab(item.type)"><p>{{item.name}}</p></mt-tab-item>
        </mt-navbar>
      </div>
    </div>

    <div id="content" style="padding-top: 0.87rem">
      <!-- tab-container -->
      <loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE">
        <mt-tab-container slot="content">
          <mt-tab-container-item>
            <productItem v-for="(item,index) in list" :key="index" :item="item">
              <span :class="{'yellow':(item.State == 0),'themeRed': ((item.State == 1) || (item.State == 4))}" slot="type">{{item.StateText}}</span>
              <span slot="dateType">中奖时间：{{item.OrderTime}}</span>

              <div slot="footer" class="foot">
                <div class="logisticsInfo">物流信息：{{(item.State == 0 ? "暂无" : item.LogisticsNumber)}}</div>

                <div v-if="item.State != '-1'" class="btn-group">

                  <!--<div class="f-btn copynum">-->
                  <!--<router-link :to="`personalreceivingadress?ProPhReSkey=${item.proPhReSkey}&OrderDetailKey=${item.orderDetailId}`" class="float_right">-->
                  <!--<span>修改地址</span>-->
                  <!--</router-link>-->
                  <!--</div>-->

                  <div class="f-btn ok" v-if="item.State == '0'">
                    <router-link :to="`/personalreceivingadress?OrderKey=${item.OrderDetailsKey}&formPage=record`"> <span>修改地址</span></router-link>
                  </div>
                  <div class="f-btn ok" v-if="item.State == '1'" @click="shopsh(item)"><span>确认收货</span></div>
                  <!--<div class="f-btn ok" v-if="item.state  == '4'">-->
                  <!--<router-link :to="`/productevaluate?goodsId=${item.goodsId}&orderId=${item.orderId}`"> <span>评价</span></router-link>-->
                  <!--</div>-->
                </div>

              </div>
            </productItem>
          </mt-tab-container-item>
        </mt-tab-container>
      </loadMore>
    </div>

  </div>
</template>

<script>
  import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
  import productItem from "./productItem.vue";  //商品列表
  export default {
    name: "extractProduct",
    data:() => ({
      // selected:"",
      selected: "tab-container1",
      tabs:[{name:"全部",type:"-1"},{name:"待发货",type:"0"},{name:"待收货",type:"1"},{name:"已完成",type:"5"}],  //{name:"待评价",type:"4"},
      param:{
        PageSize: 10,
        PageCount: 0,
        Status: "-1"
      },
      list:[],
    }),
    methods: {
      tab(val){
        this.$Indicator.loading();
        this.param.Status = val;
        this.param.PageCount = 0;
        this.$refs.loadMoreE.getList();  //触发加载更多
        setTimeout(()=>{
          this.$Indicator.close();
        },200)
      },
      //所得商品列表
      shoplist(success) {
        let url = "UserInterface/GetProductAwardsList.ashx";
        if(this.param.PageCount == 1){
          this.list = [];
        }
        this.$post(url,this.param).then((data)=>{
          if(data.rspcode != 1 ){
            return;
          }
          let modelList = data.list;
          this.list = [...this.list,...modelList]
          //加载更多组件触发回调
          if(success){
            success(modelList,this.list)
          }
        })

      },
      //  确认收货
      shopsh(item) {
        this.$Indicator.loading();
        let url = "UserInterface/ConfirmAwardsOrder.ashx";
        let param = {
          OrderDetailsKey: item.OrderDetailsKey
        }
        this.$post(url, param).then((data) => {
          this.$Indicator.close();
          if(data.rspcode != 1){
            this.$Toast(data.rspdesc);
            return;
          }
          this.$Toast("确认收货成功");
          this.tab('1');
        })
      }
    },
    components:{
      productItem,
      loadMore
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .foot{
    margin-top: 0.08rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.14rem;
    color: $color60;
    .f-btn{
      width: 0.72rem;
      height: 0.18rem;
      line-height: 0.18rem;
      font-size: 0.12rem;
      text-align: center;
      span{
        vertical-align: middle;
      }
      &.copynum{
        background: $themeColor2;
        color: $themeColor;
        border: 1px solid $themeColor;
      }
      &.ok{
        background: $themeColor;
        height: 0.20rem;
        line-height: 0.20rem;
        margin-left: 5px;
        span{
          color: white;
        }
      }
    }
    .btn-group{
      display: flex;
      justify-content: flex-start;
      white-space: normal;
    }
  }
</style>
