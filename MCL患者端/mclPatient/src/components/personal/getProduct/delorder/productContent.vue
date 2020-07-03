<template>
	<div class="item-content">
		<img v-lazy="item.acimg" src="" alt="" class="pro">
		<div class="text">
			<div v-if="item.acnum">
				<div class="tit-name tit-names">{{item.acname}}</div>
				<span class="timeact">活动时间：{{item.acsdt}}～{{item.acedt}}</span>
			</div>
			<div v-else>
				<div class="tit-name">{{item.acallprice}}</div>
			</div>

			<p class="price">
				<strong class="money">
					<div>¥ {{item.acallprice}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i v-if="item.shownum" style="font-style: normal;color: #999;font-size: 0.13rem;font-weight: normal;">购买份数：×
							{{item.shownum}}</i>
						<i v-if="item.acnum" style="font-style: normal;color: #999;font-size: 0.13rem;font-weight: normal;">报名人数：×
							{{item.acnum}}人</i>
					</div>
				</strong>
			</p>
		</div>
	</div>
</template>

<script>
	/*
     订单的列表，获得的商品，我的拼购 使用该组件
    */
	import smallButton from "./../../../common/smallButton.vue"
	export default {
		name: "product-content",
		props: ["item"],
		components: {
			smallButton
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.item-content {
		display: flex;

		.text {
			flex: 1;
			margin-left: 0.10rem;
		}

		.tit-name {
			height: 0.44rem;
			@include ellipsis(2);
			font-size: 0.15rem;
			color: $color20;
			/*min-height: 40px;*/
		}

		.tit-names {
			height: 0.22rem;
			@include ellipsis(1);
			font-size: 0.15rem;
			color: $color20;
		}

		.timeact {
			color: #666;
			font-size: 0.12rem;
		}

		.price {
			/*margin: 0.10rem 0;*/
			margin-top: 0.1rem;
		}

		.price strong {
			display: block;
			color: $themeColor;
			margin-right: 0.05rem;
			margin-top: 0.04rem;
			font-size: 0.18rem;
		}

		.price>span {
			font-size: 0.14rem;
			color: $color60;
			display: block;
			margin-top: 0.06rem;
		}
	}

	img.pro {
		@include cube(0.85rem)
	}

	.product_ls {
		color: #666;
		font-size: 0.12rem;
		margin-top: 0.04rem;
		font-size: 0.12rem;
	}
</style>
