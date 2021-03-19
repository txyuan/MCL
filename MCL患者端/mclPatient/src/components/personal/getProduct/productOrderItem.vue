<template>
  <div class="product_row">
    <img v-lazy="itemData.goodsImage" class="productImg" alt="">
    <div class="right">
      <div class="name">{{itemData.goodsName}}</div>
      <div class="time">下单时间：{{itemData.buyTime}}</div>
      <div class="orderNum">购买份数：{{itemData.buyCount}}</div>
      <div class="money">付款金额：¥ {{itemData.orderMoney}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:["itemData"]
}
</script>

<style scoped lang="scss">
.product_row{
  display: flex;
  background: #fff;
  padding: 0.1rem;
  .productImg{
    width: 0.90rem;
    height: 0.90rem;
    margin-right: 0.20rem;
    border-radius: 4px;
  }
  .right{
    flex: 1;
    font-size: 0.14rem;
    color: #999;
    &>div{
      margin: 0.03rem 0;
    }
  }
  .name{
    font-size: 0.16rem;
    font-weight: bold;
    color: #333;
    margin-top: 0 !important;
    margin-bottom: 0.10rem !important;
  }
  .time{height: 0.19rem;}
}
</style>