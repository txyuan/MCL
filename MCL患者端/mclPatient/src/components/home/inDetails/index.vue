<template>
    <div>
      <img src="https://resource.jtsc.club/fanhui_yuan@2x.png" v-on:click="backr()" class="return_back" />
      <div class="detile_lunbo">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in items" :key="index"><img :src="item.banner" /></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="paddimg">
        <div class="show_ms">
          <h2>商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</h2>
          <div class="show_griad">
            <span>1238743积分</span>
            <i>价值：¥8200</i><br />
            <label>我的积分：28374</label>
          </div>
        </div>
        <div class="evaluation">
          <h3>商品评价（29384）</h3>
          <div class="show_name">
            <img src="https://resource.jtsc.club/touxiang_default@2x.png" />
            <span>昵称昵称</span>
            <label>2017-03-28 18:23</label>
          </div>
          <p>内容内容内容内容内容内容</p>
          <ul>
            <li><img src="https://resource.jtsc.club/product.jpg" /></li>
            <li><img src="https://resource.jtsc.club/product.jpg" /></li>
            <li><img src="https://resource.jtsc.club/product.jpg" /></li>
            <li><img src="https://resource.jtsc.club/product.jpg" /></li>
          </ul>
          <span class="show_allpl"><label>查看全部评论</label></span>
        </div>
        <p class="continue">继续拖动，查看商品详情</p>
        <div class="detail_btn">
          <i>立即兑换</i>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data:()=>({
        isActive:0,
        items: [
          // { banner: require("@/assets/images/zwt_xiao@2x.png")},
          // { banner: require("@/assets/images/zwt_xiao@2x.png")},
          // { banner: require("@/assets/images/zwt_xiao@2x.png")},
          // { banner: require("@/assets/images/zwt_xiao@2x.png")}
        ]
      }),
      methods:{
        backr: function(index) {
          window.history.go(-1);
        }
      }
    }
</script>

<style scoped>
  .return_back{
    position: fixed;
    left: 3%;
    top: 0.1rem;
    width: 0.3rem;
    height: 0.3rem;
    z-index: 9;
  }
  .detile_lunbo{
    height: 3.75rem
  }
  .detile_lunbo img{
    width: 100%;
  }
  .paddimg{
    padding-bottom: 0.5rem;
  }
  .show_ms{
    background: #fff;
    margin-top: 0.05rem;
    padding-bottom: 0.1rem;
  }
  .show_ms h2{
    width: 94%;
    margin: 0 auto;
    font-size: 0.14rem;
    font-weight: normal;
    padding-top: 0.1rem;
  }
  .show_griad{
    width: 94%;
    margin: 0 auto;
    padding-top: 0.1rem;
  }
  .show_griad span{
    color: #FF1E41;
    font-size: 0.2rem;
  }
  .show_griad label{
    color: #202020;
    display: block;
    margin-top: 0.07rem;
    font-size: 0.15rem;
  }
  .show_griad i{
    font-style: normal;
    width: 0.88rem;
    height: 0.24rem;
    display: inline-block;
    float: right;
    color: #606060;
    font-size: 0.15rem;
    text-align: center;
    line-height: 0.24rem;
  }
  .show_allnum li{
    width: 33.3333%;
    float: left;
    color: #606060;
    font-size: 0.14rem;
  }
  .show_allnum li:nth-child(2){
    text-align: center;
  }
  .show_allnum li:nth-child(3){
    text-align: right;
    color: #FF1E41;
  }
  .detail_btn{
    width: 100%;
    height: 0.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    border-top: 1px solid #E0E0E0;
  }
  .detail_btn i{
    width: 94%;
    background: #FF1E41;
    height: 0.4rem;
    display: block;
    margin-left: 3%;
    font-style: normal;
    float: left;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.05rem;
    font-size: 0.18rem;
  }
  .evaluation{
    background: #fff;
    margin-top: 0.05rem;
  }
  .evaluation h3{
    font-weight: normal;
    width: 94%;
    margin: 0 auto;
    line-height: 0.45rem;
  }
  .show_name{
    width: 94%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 0.02rem;
  }
  .show_name img{
    width: 0.22rem;
    height: 0.22rem;
    float: left;
  }
  .show_name span{
    height: 0.22rem;
    display: block;
    float: left;
    font-size: 0.14rem;
    line-height: 0.22rem;
    margin-left: 0.08rem;
    color: #202020;
  }
  .show_name label{
    font-size: 0.13rem;
    color: #606060;
    display: block;
    float: right;
    line-height: 0.22rem;
  }
  .evaluation p{
    width: 94%;
    margin: 0 auto;
    font-size: 0.14rem;
    color: #404040;
    margin-top: 0.1rem;
  }
  .evaluation ul{
    overflow: hidden;
    width: 94%;
    margin: 0 auto;
    margin-top: 0.08rem;
  }
  .evaluation ul li{
    width: 24%;
    margin-left: 1.333333%;
    float: left;
  }
  .evaluation ul li:first-child{
    margin-left: 0;
  }
  .evaluation ul li img{
    width: 100%;
  }
  .show_allpl{
    display: block;
    position: relative;
    height: 0.54rem;
    background: #fff;
  }
  .show_allpl label{
    display: block;
    width: 1rem;
    height: 0.24rem;
    border-radius: 0.12rem;
    position: absolute;
    left: 50%;
    margin-left: -0.5rem;
    top: 0.15rem;
    border: 1px solid #FF1E41;
    text-align: center;
    line-height: 0.25rem;
    font-size: 0.12rem;
    color: #FF1E41;
  }
  .continue{
    width: 100%;
    color: #606060;
    text-align: center;
    font-size: 0.14rem;
    line-height: 0.55rem;
  }
</style>
