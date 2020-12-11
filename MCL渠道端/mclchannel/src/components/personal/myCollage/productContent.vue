<template>
    <div class="item-content">
      <img v-lazy="item.goodsImage" src="" alt="" class="pro">
      <div class="text">
        <div class="tit-name">{{item.goodsName}}</div>
        <!-- <p class="product_ls" v-if="ABflag == 2"><span v-if="item.ProDistinguish==3">抢购价</span><span v-else>市场价</span>：¥ {{item.proPrice}}</p>
				<p class="product_ls" v-else="ABflag == 1" style="color: #FF3D3D;font-size: 0.14rem;">¥ {{item.proPrice}}</p> -->
        <p class="price">
          <strong class="money"><div v-if="item.ProDistinguish!='03'">¥ {{item.showPrice}}<span>数量：x{{item.buyCount}}</span></div></strong>
          <!-- <span>购买份数：× {{item.buyCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i style="font-style: normal;color: #999;font-size: 0.13rem;">快递费：{{item.ExpressCost}}</i></span> -->
          <!-- <smallButton  class="float_right" :text="item.orderTypeText"/> -->
        </p>
      </div>
    </div>
</template>

<script>
/*
     订单的列表，获得的商品，我的拼购 使用该组件
    */
import smallButton from './../../common/smallButton.vue'
export default {
  name: 'product-content',
  props: ['item', 'ABflag'],
  components: {
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
  @include ellipsis(1);
    font-size: 0.15rem;
    color: $color20;
    /*min-height: 40px;*/
  }
  .price{
    /*margin: 0.10rem 0;*/

  }
  .price strong{
  	 display: block;
    color: $themeColor;
    margin-right: 0.05rem;
    margin-top: 0.04rem;
    font-size: 0.13rem;
  }
  .price>span{
    font-size:0.14rem;
    color: $color60;
    display: block;
    margin-top: 0.06rem;
  }
  }
  img.pro{
  @include cube(0.85rem)
  }
  .product_ls{
  	color: #666;
    font-size: 0.12rem;
    margin-top: 0.04rem;
    font-size: 0.12rem;
  }
	.item-content .tit-name {
		padding-top: 0.04rem;
		// height: 0.48rem;
		-webkit-line-clamp: 2;
		color: #333;
		font-size: 0.14rem;
		line-height: 0.24rem;
	}
	.item-content .price .money{
		font-weight: normal;
		font-size: 0.18rem;
		padding-top: 0.04rem;
		color: #F78335;
		span{
			font-size: 0.12rem;
			color: #666666;
			margin-left: 0.14rem;
		}
	}
</style>
