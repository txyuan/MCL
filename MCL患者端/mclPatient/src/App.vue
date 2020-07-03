<template>
	<div id="app">
		<keep-alive>
			<router-view id="main_router" v-if="$route.meta.keepAlive" />
		</keep-alive>
		<router-view id="main_router" v-if="!$route.meta.keepAlive" />
	</div>
</template>

<script>
	export default {
		name: 'App'
	}

	//适配rem布局
	{
		!(function() {
			function initResponse() {
				var screenWidth = innerWidth;
				if (screenWidth > 550) {
					screenWidth = 550;
					let body = document.getElementsByTagName("body")[0];
					body.style.width = screenWidth + "px";
					body.style.margin = "0 auto";
				}
				document.documentElement.style.fontSize = 100 * (screenWidth / 375) + 'px';
			}

			initResponse();
			window.addEventListener("resize", initResponse);
			window.addEventListener("resize", function() {
				setTimeout(() => {
					initResponse()
				}, 500)
			});
		})()
	}
</script>

<style lang="scss">
	// @font-face{
	// 	font-family: "pingfang-sc-regular";
	// 	src: url("./assets/css/PingFangSCRegular.ttf");
	// }
	@import "@/assets/css/common.scss";

	//懒加载图片的背景
	img[lazy=loading],
	img[lazy=error] {
		background: url("https://resource.jtsc.club/zwt_xiao@2x.png") no-repeat center;
		background-size: cover;
	}

	//一级标题
	.head_tit {
		font-size: 0.18rem;
		color: $color40;
		line-height: 43px;
		height: 43px;
		font-weight: normal;
		background-color: #ffffff;

		&.search {
			/*background: url( "./assets/images/search_top_left@2x.png") no-repeat 0.10rem center;*/
			/*background-size: 0.24rem;*/
			/*background-color: #ffffff;*/
		}
	}

	//分类的navbar样式
	.navbar.icon>ul {
		display: flex;
		justify-content: space-around;
		background: #ffffff;
		border-bottom: 1px solid $boderE0;

		li>p {
			font-size: 0.15rem;
			color: $color60;
			padding-right: 0.14rem;
			line-height: 44px;
			height: 44px;
			background: url("./assets/images/shopxh.png") no-repeat right center;
			background-size: 0.09rem auto;
		}

		li>p.active {
			background-image: url("./assets/images/shopxc.png");
			color: $themeColor;
		}

		li>p.price {
			background-image: url("./assets/images/shopsxh.png");

			&.active {
				background-image: url("./assets/images/shopcxh.png");
			}

			&.active.down {
				background-image: url("./assets/images/shophxc.png");
			}
		}

	}

	//多选框
	.check-i {
		@include cube(0.20rem);
		display: block;
		background: url("./assets/images/select@2x.png") no-repeat center;
		background-size: cover;
	}

	.check-i.checked {
		background-image: url("./assets/images/select_click@2x.png");
	}

	//支付方式
	.recharge_pay {
		background: #fff;
		margin-top: 0.05rem;

		h3 {
			font-size: 0.18rem;
			color: #404040;
			padding: 0 0.10rem;
			margin: 0 auto;
			line-height: 0.45rem;
		}

		ul {
			border-top: 1px solid #E0E0E0;
		}

		li {
			overflow: hidden;
			height: 0.5rem;
			border-bottom: 1px solid #E0E0E0;
			padding-right: 0.5rem;
		}

		li img {
			height: 0.3rem;
			margin: 0.1rem 0 0 4%;
			float: left;
		}

		li span {
			display: block;
			float: left;
			font-size: 0.16rem;
			line-height: 0.5rem;
			color: #404040;
			margin-left: 0.18rem;
		}

		li .right {
			color: $color40;
			line-height: 0.50rem;
		}

		li.achose {
			background: url("https://resource.jtsc.club/dui@2x.png") no-repeat 96% center;
			background-size: 0.2rem;
		}
	}
</style>
