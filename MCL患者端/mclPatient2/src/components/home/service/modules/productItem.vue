<template>
  <div class="item float_left">
    <router-link tag="div" :to="`/${detailPage}/${item.goodsId}`">
      <div :to="`/${detailPage}/${item.goodsId}`" class="img_wrap">
        <img src="" v-lazy="item.goodsImage" alt="" class="product_pic">
      </div>

      <div class="content">
        <div class="product_title" :class="item.price ? '' : 'product_titles' ">
          <!--<div class="product_title product_titles" v-else>-->
          <p class="product_name">{{item.goodsName}}</p>
          <!-- <div v-if="item.price">
            <p class="product_ls">零售价：{{item.marketPrice}}</p>
            <div class="price">
              <strong class="money" v-if="item.score==0">会员价:{{item.price}}</strong>
              <strong class="money" v-else-if="!item.score">会员价:{{item.price}}</strong>
              <strong class="money" v-else>会员价:{{item.price}}+{{item.score}}积分</strong>
            </div>
          </div>
         <div v-else>
           <div class="price">
             <strong class="money" v-if="item.score==0">¥ {{item.marketPrice}}</strong>
             <strong class="money" v-else-if="!item.score">¥ {{item.marketPrice}}</strong>
           </div>
         </div> -->
				 <div class="product_mpny">
					 <p>¥ {{item.marketPrice}}</p>
            <img src="@/assets/images/shoppingMall/car1.png" alt="" class="buyCar"/>
						<!-- <router-link :to="`/${detailPage}/${item.goodsId}`" class="img_wrap">
					    <span>立即购买</span>
					  </router-link> -->
				 </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  /*  首页，零售，汇兑  */
  // import productImg from "@/assets/images/product.jpg";
  export default {
    name: "productItem",
    data:()=>({
      productImg:'https://resource.jtsc.club/product.jpg'
    }),
    props:['item',"detailPage"],
    methods:{

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
      border-radius: 0.08rem;
      overflow: hidden;
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
    // height: 0.64rem;
    position: relative;
    .price{
      margin-top: 0.04rem;
    }
  }
  .product_titles{
    height: 0.45rem;
  }
  .product_pic{
    width: 100%;
    height: 1.78rem;
    display: block;
  }
  .product_name{
		height: 0.42rem;
    font-size: 0.15rem;
    color: #333535;
    @include ellipsis(2);
  }
  .price span{
    font-size: 0.13rem;
    color: $color60;
    padding-left: 0.03rem;
  }
  .money{
    font-size: 0.12rem;
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
  .product_ls{
    font-size: 0.12rem;
    color: #999;
    margin-top: 0.05rem;
  }
	.product_mpny{
		overflow: hidden;
		margin-top:0.1rem;
		p{
			font-size: 0.18rem;
			color: #EC5D4E;
			float: left;
			line-height: 0.3rem;
		}
		span{
			float: right;
			font-size: 0.12rem;
			color: #fff;
			display: block;
			padding: 0 0.08rem;
			height: 0.24rem;
			line-height: 0.24rem;
			background: #FF913D;
			border-radius: 0.12rem;
		}
	}
  .buyCar{
      width: 0.3rem;
      height: 0.3rem;
      float: right;
    }
</style>
