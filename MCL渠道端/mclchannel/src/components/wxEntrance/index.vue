<template>
	<div>
		<router-view />

		<div id="tabbar">
			<mt-tabbar v-model="selected" :fixed="true">
				<mt-tab-item v-for="(item,index) in tabList" :key="index" :id="item.path">
					<!--<img slot="icon" :src="item.icon">-->
					<router-link :to="'/wx_Entrance/'+item.path" tag="div" class="tab-bar-link">
						<i class="mint-tab-item-icon" :class="item.pathy">icon</i>
						<p>{{item.name}}</p>
						<span class="badge" v-if="item.name=='订单'">{{proCount}}</span>
					</router-link>
				</mt-tab-item>
			</mt-tabbar>
		</div>
	</div>
</template>

<script>
	import Bus from "@/assets/js/updateShopCar.js"; //跟新购物车数量
	import Vue from "vue";
	const orderNumber = Vue.observable({ count: 0 });

	export default {
		name: "wx_Entrance",
		computed:{
			proCount: () => orderNumber.count,
		},
		data: () => ({
			// proCount: 0, //商品数量
			selected: "",
			tabList: [{
					name: "首页",
					path: "home",
					pathy: "home"
				},
				// {name:"商城",path:"classification",pathy:"classification"},
				{
					name: "商品",
					path: "versionB",
					pathy: "versionB"
				},
				{
					name: "分享",
					path: "share",
					pathy: "share"
				},
				{
					name: "订单",
					path: "delivery",
					pathy: "delivery"
				},
				{
					name: "我的",
					path: "personal",
					pathy: "personal"
				}
			]
		}),
		watch:{
			selected: function () {
				if(localStorage.userInfo){
					this.updateOrderNumber()
				}
			}
		},
		methods: {
			// 订单数量
			updateOrderNumber() {
				let url = "/UserInterface/channel/ChannelOrderCount.ashx";
				this.$post(url).then((data)=>{
					orderNumber.count = data.OrderCount
				})
			},
			// setShopChatQuantity(val) {
			// 	this.proCount = val;
			// }
		},
		created() {
			// Bus.$on("updateShop", () => {
			// 	//有登录信息才能获取购物车数量，主要针对通过分享进来的（未登录）用户，防止系统异地登录，跳转登录页
			// 	if (localStorage.userInfo) {
			// 		this.getShopChatQuantity();
			// 	}
			// })
			// if (localStorage.userInfo) {
			// 	Bus.$emit("updateShop")
			// }
			if(localStorage.userInfo){
				this.updateOrderNumber()
			}
		},
		mounted: function() {
			if (localStorage.userInfo) {
				let UserKey = JSON.parse(localStorage.userInfo).UserKey;
				let SessionId = JSON.parse(localStorage.userInfo).SessionId;
				this.tabList[2].path = `share?title=分享&UserKey=${UserKey}&SessionId=${SessionId}`
			}
		},
		activated() {
			// if (localStorage.userInfo) {
			// 	Bus.$emit("updateShop")
			// }
		},
		destroyed() {
			//移除updateShop事件避免多次注册事件
			// Bus.$off("updateShop")
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/common.scss";

	.tab-bar-link.router-link-active {
		color: #FF5355;
	}

	.tab-bar-link {
		position: relative;
		color: #636768;

		.mint-tab-item-icon {
			width: 22px;
			height: 22px;
			display: inline-block;
			background: url("./../../assets/images/shouye.png") no-repeat center;
			background-size: cover;
			line-height: 999;
			overflow: hidden;
			margin-bottom: 4px;

			&.home {
				background-image: url("./../../assets/images/shouye.png")
			}

			&.versionB {
				background-image: url("./../../assets/images/shangpin.png")
			}

			&.share {
				background-image: url("./../../assets/images/fenxiang.png")
			}

			&.delivery {
				background-image: url("./../../assets/images/gouwuhce.png")
			}

			&.personal {
				background-image: url("./../../assets/images/wode.png")
			}

		}

		&.router-link-active .mint-tab-item-icon {
			&.home {
				background-image: url("./../../assets/images/shouyea.png")
			}

			&.versionB {
				background-image: url("./../../assets/images/shangpina.png")
			}

			&.share {
				background-image: url("./../../assets/images/fenxianga.png")
			}

			&.delivery {
				background-image: url("./../../assets/images/gouwuchea.png")
			}

			&.personal {
				background-image: url("./../../assets/images/wodea.png")
			}
		}

		.badge {
			display: inline-block;
			min-width: 18px;
			height: 18px;
			line-height: 18px;
			font-size: 10px;
			@include radio(10px);
			overflow: hidden;
			color: white;
			text-align: center;
			background-color: $themeColor;
			position: absolute;
			top: -2px;
			right: 13%;
		}
	}
</style>
