<template>
  <div class="product_root">
    <div class="item float_left">
      <div>
        <router-link :to="detailPage" class="img_wrap">
          <img src="" v-lazy="item.goodsImage" alt="" class="product_pic">

          <div class="countDownTime" v-if="item.status == 0">
            <p><span>抢购进行中</span></p >
          </div>

          <div class="countDownTime" v-if="item.status == 1">
            <p><span>倒计时：{{downTime}}</span></p >
          </div>

        </router-link>

        <div class="content">
          <div class="product_title">
            <p class="product_name">{{item.goodsName}}</p >
            <div class="price">
              <strong class="money">¥{{item.marketPrice}}</strong>
            </div>
          </div>

          <div class="time" v-if="item.status == 0"><span>结束时间：{{item.endTime}}</span></div>
          <div class="time themeRed" v-else-if="item.status == 1"><span>开始时间：{{item.startTime}}</span></div>
          <div class="time" v-else><span>&nbsp&nbsp&nbsp</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    /*  抢购，批发页面  */
    /*  status  抢购状态（0,正在批发中;1,在倒计时）   */
    export default {
        name: "product",
        props:['item',"detailPage"],
        data: () => ({
          timer:"",     //setInterval  的索引值
          duration:"",  //倒计时差值
          downTime:""   //倒计时转换时间格式
        }),
        methods:{
          //从秒转换成时间格式
          secondTransformFull(val){
            var d = parseInt((val/60/60/24)%24);
            d = (d < 10) ? '0' + d : d;
            var h = parseInt((val/60/60)%24);
            h = (h < 10) ? '0' + h : h;
            var m = parseInt((val/60)%60);
            m = (m < 10) ? '0' + m : m;
            var s = (val%60);
            s = (s < 10) ? '0' + s : s;
            return  `${d}天${h}时${m}分${s}秒`;
          },
          startDown(){
            this.duration =  parseInt(this.item.duration);
            this.startTime();
            this.timer = setInterval(()=>{
              this.startTime()
            },1000)
          },
          startTime(){
            if(this.duration < 0){
              clearInterval(this.timer)
              this.item.status = 0;  //更改当前商品的状态
              return;
            }
            this.downTime = this.secondTransformFull(this.duration);
            this.duration -=1;
          }
        },
        mounted(){
          if(this.item.status == 1){
            this.startDown();
            //每个商品的倒计时timer 插入 根组件属性productTimer
            this.$root.productTimer.push(this.timer);
          }
        },
        destroyed(){
          if(this.item.status == 1){
            clearInterval(this.timer)
          }
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .item{
    width: 50%;
    padding: 0.025rem;
    box-sizing: border-box;
    &>div{
      @include border;
    }
  }
  .img_wrap{
    position: relative;
    display: block;
    .countDownTime{
      height: 0.35rem;
      line-height: 0.35rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.5);
      text-align: center;
      color: #ffffff;
      font-size: 12px;
    }
  }
  .content{
    background: #ffffff;
    padding: 0.10rem;
    .time{
      white-space: nowrap;
      font-size: 12px;
      color: $color66;
      margin-left: -0.1rem;
      transform: scale(0.9);
      margin-right: -0.1rem;
    }
  }
  .product_title{
    height: 0.45rem;
    position: relative;
    .price{
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .product_pic{
    width: 100%;
    height: 1.78rem;
    display: block;
  }
  .product_name{
    font-size: 0.15rem;
    color: #333535;
    @include ellipsis(1);
  }
  .price span{
    font-size: 0.13rem;
    color: $color60;
    padding-left: 0.03rem;
  }
  .money{
    font-size: 0.16rem;
  }
  .surplus,.money{
    color: $themeColor;
  }
  .progress_bar{
    background: #E0E0E0;
    width: 100%;
    height: 0.05rem;
    @include radio(0.025rem);
    overflow: hidden;
    margin: 0.05rem 0 0.02rem;
    .bar{
      width: 40%;
      display: block;
      height: 100%;
      @include radio(0.025rem);
      background: $themeColor;
    }
  }
  .type_list ul{
    display: flex;
    justify-content: space-between;
    color: $color60;
    font-size: 0.1rem;
    li{
      text-align: center;
    }
  }
  .buy_btn{
    width: 1.20rem;
    text-align: center;
  }
  .btn-group{
    margin-top: 0.10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .shop_car{
    @include cube(0.24rem)
  }
</style>
