<template>
    <div class="item-content">
      <img v-lazy="item.goodsImage" src="" alt="" class="pro">
      <div class="text">
        <div class="tit-name">{{item.ProductName}}</div>
<!--        <p class="price">
          <strong class="money">¥ {{item.ProPrice}}</strong>
          <span>购买份数：× {{item.buyCount}}</span>
          <smallButton  class="float_right" :text="item.proType | filterType"/>
        </p>-->
      </div>
    </div>
</template>

<script>
    /*
     订单的列表，获得的商品，我的拼购 使用该组件
    */
    import smallButton from "./../../common/smallButton.vue"
    export default {
        name: "product-content",
        props:["item"],
        components:{
          smallButton
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .item-content{
    display: flex;
  .text{
    flex: 1;
    margin-left: 0.10rem;
  }
  .tit-name{
  @include ellipsis(2);
    font-size: 0.15rem;
    color: $color20;
    min-height: 40px;
  }
  .price{
    margin: 0.10rem 0;
  }
  .price strong{
    color: $themeColor;
    margin-right: 0.05rem;
  }
  .price>span{
    font-size:0.14rem;
    color: $color60;
  }
  }
  img.pro{
  @include cube(0.76rem)
  }
</style>
