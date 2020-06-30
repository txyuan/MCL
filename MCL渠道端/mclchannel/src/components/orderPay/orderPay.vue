<template>
    <div>
      <mt-header title="支付" fixed class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="padding-header padding-footer">
        <mt-cell>
          <span slot="title">本次需要支付金额</span>
          <span class="themeRed allPrice">¥{{orderInfo.orderAmount}}</span>
        </mt-cell>
        <div class="recharge_pay">
          <h3>支付方式</h3>
          <ul>
            <li v-for="(item,index) in items" v-on:click="addClassFun(index)" v-bind:class="{achose: index==isActive}" v-show="item.isShow">
              <img :src="item.pic" alt="">
              <span>{{item.pay}}</span>
              <!--<div class="right float_right" v-if="index == 0">302.32</div>-->
            </li>
          </ul>
        </div>
        <div class="themeRed marginTop5 tip-p">
          <p>温馨提示：全返类型商品仅可用微信支付，如未中奖，金额将返还到您的余额当中</p>
        </div>
      </div>
      <div class="buttons" @click="pay">
        <mt-button type="danger" size="large" class="add_btns">支付</mt-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "order-pay",
        data:()=>({
          isActive: 0,
          payId: 2,
          items: [
            // { pic: require("@/assets/images/wechat_zhifu@2x.png"),pay:'微信支付',isShow: false, id:0},
            // { pic: require("@/assets/images/integral@2x.png"),pay:'积分支付',isShow: false, id:1},
            { pic: require("@/assets/images/balance@2x.png"),pay:'余额支付',isShow: true, id:2},
            // { pic: require("@/assets/images/commission@2x.png"),pay:'佣金支付',isShow: false, id:3},
            // { pic: require("@/assets/images/zhenglian_zhifu@2x.png"),pay:'证联支付',isShow: true, id:2}
          ],
          orderInfo:{}
        }),
        methods:{
          addClassFun: function(index) {
            this.isActive = index;
            this.payId = this.items[index].id;
          },
          //获取支付信息
          getPayInfo(){
            this.$Indicator.loading();
            let url = "UserInterface/order/getPayInfo.ashx";

            let param = {
              "orderId": this.$route.query.orderId
            }
            this.$post(url,param).then((data)=>{
              this.$Indicator.close()
              if(data.rspcode == 0){
                this.$Toast('订单获取失败，请稍候重新支付！');
                return;
              }

              this.orderInfo = data.orderInfo;

              //不中全返只能使用微信支付
              // this.items.forEach((item,index)=>{
              //   item.isShow = true;
              //   if((this.orderInfo.ordertype == 2) && (index != 0)){
              //     item.isShow = false;
              //   }
              // })

            })
          },
          //支付
          pay(){
            let isActive = this.payId;
            this.$Indicator.loading();
            let param = {OrderKey: this.orderInfo.orderId};
            if(isActive == 0){
              let url = "UserInterface/IPayment/WPaymentRequest_Webpage.ashx";
              let param = {
                "OrderKey": this.orderInfo.orderId,
                "OpenID": localStorage.openId
              };
              //微信支付
              this.$pay.wechatPayment(url,param,(data)=>{
                this.$Indicator.close()
                this.$Toast(data.rspdesc);
                this.$router.push("/wx_Entrance/personal")
              },(data)=>{
                this.$Indicator.close()
                this.$Toast(data.rspdesc)
              })
            }else if(isActive == 1){
              //积分支付
              this.$pay.integralPay(param,(data)=>{
                //成功
                this.$Indicator.close()
                this.$Toast(data.rspdesc);
                this.$router.push("/wx_Entrance/personal")
              },(data)=>{
                //失败
                this.$Indicator.close()
                this.$Toast(data.rspdesc);
              })
            }else if(isActive == 2){
              //余额支付
              this.$pay.balancePayment(param,(data)=>{
                //成功
                this.$Indicator.close()
                this.$Toast(data.rspdesc);
                this.$router.push("/wx_Entrance/personal")
              },(data)=>{
                //失败
                this.$Indicator.close()
                this.$Toast(data.rspdesc);
              })
            }else  if(isActive == 3){
              //佣金支付
              this.$pay.commissionPayment(param,(data)=>{
                //成功
                this.$Indicator.close()
                this.$Toast(data.rspdesc);
                this.$router.push("/wx_Entrance/personal")
              },(data)=>{
                //失败
                this.$Indicator.close()
                this.$Toast(data.rspdesc);
              })
            }
          },
        },
        mounted(){
          this.getPayInfo()
        }
    }
</script>

<style scoped>
  .tip-p{
    padding: 0.10rem;
    font-size: 0.13rem;
    background-color: white;
  }
</style>
