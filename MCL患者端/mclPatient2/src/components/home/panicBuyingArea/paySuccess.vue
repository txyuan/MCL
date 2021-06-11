<template>
  <div style="background: #fff;height: 100vh">
    <mt-header title="支付完成">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <span class="sun_xian"></span>
    <div class="sun_coat text-center">
      <img src="https://resource.jtsc.club/ok@2x.png" style="width: 1.0rem;height: 1.0rem;">
      <div class="des">
        <p>抢购成功！</p>
        <p>可进入我的订单查看物流信息</p>
      </div>

      <div class="btns">
        <router-link style="margin-top: 15px" to="/personalgetproduct?type=1">
          <mt-button type="danger" class="add_btn">查看订单</mt-button>
        </router-link>

        <router-link to="/wx_Entrance/home">
          <mt-button type="default" size="large" class="radio theme-button" style="width: 89%;margin: 0 auto">返回首页</mt-button>
        </router-link>
      </div>


    </div>
  </div>
</template>

<script>
    export default {
        name: "sun-success",
        beforeRouteLeave (to, from, next) {
		      //去非详情(批发专区)页面， 清空所有商品列表时间timer
		      if( !(to.name == "panicBuyingAreaDetail")  ){
		      	this.$root.clearAllProductTimer();   //清除所有的时间timer
		      }
		      next()
		    }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .sun_xian{
    height: 1px;
    background: #E0E0E0;
    display: block;
  }
  .sun_coat{
    padding-top: 0.75rem;
    .des{
      padding-top: 0.3rem;
    }
    p{
      color: #404040;
      font-size: 0.16rem;
      text-align: center;
      line-height: 1.5;
    }
  }
  .btns>a{
    display: inline-block;
    width: 100%;
  }
  .add_btn{
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
