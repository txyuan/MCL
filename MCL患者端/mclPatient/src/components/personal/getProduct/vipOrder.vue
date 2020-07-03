<template>
	<div>
		<div class="fix_top">
			<mt-header title="会员卡订单" class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial;">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>

		<div id="content" style="padding-top: 43px">
			<div class="vip_card">
				<div class="vip_kap">
					<div class="vip_inform">
						<img :src="repData.ImgUrl" />
						<p>
							<span>{{repData.ContactName}}</span>
							<label>{{repData.ContactPhone}}</label>
						</p>
					</div>
					<div class="vip_bot">
						<div class="vip_time">
							<p>会员有效期至 {{repData.MemberEndDate}}</p>
							<label>NO.0012 316385</label>
						</div>
						<span @click="againbuy">立即续费</span>
					</div>
				</div>
			</div>
			<h3>会员卡订单</h3>
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE" :isDefaultLoading="false">
				<mt-tab-container slot="content">
					<mt-tab-container-item>
						<productItem v-for="(item,index) in list" :key="item.orderId" :item="item">
							<span slot="type">{{item.buyTime}}</span>
							<span class="themeRed" slot="dateType">{{item.stateText}}</span>
							<div slot="footer" class="foot">
								<div class="logisticsInfo">合计：
									<span class="themeRed">¥ {{item.orderMoney}}</span>
								</div>
								<div class="btn-group">
									<div v-if="item.state  == '4'" style="overflow: hidden;">
										<div class="f-btn ok laood" style="float: left;" @click="delmoy(item,3)">
											<span>删除订单</span>
										</div>
									</div>
								</div>
							</div>
						</productItem>
					</mt-tab-container-item>
				</mt-tab-container>
			</loadMore>
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	import productItem from "./../myCollage/productItem.vue"; //商品列表
	export default {
		name: "index",
		data: () => ({
			// selected:"",
			hideadress: false,
			listadres: [],
			isactv: 0,
			selected: "tab-container1",
			tabs: [{
				name: "全部",
				type: "-1"
			}, {
				name: "待发货",
				type: "0"
			}, {
				name: "已发货",
				type: "1"
			}, {
				name: "已收货",
				type: "2"
			}],
			filterActive: "0",
			param: {
				pagesize: 10,
				pagecount: 0,
				orderType: 5
			},
			orderkey: '', //提货使用到的商品key
			list: [],
			repData: {
				ImgUrl: "", //头像地址
				ContactName: "", //姓名
				ContactPhone: "", //手机号
				MemberEndDate: "", //有效期
			}
		}),
		methods: {
			//个人信息
			information() {
				this.$Indicator.loading();
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					this.$Indicator.close();
					let model = data.data;
					if (model) {
						this.repData = model;
					}
				})
			},
			//立即续费
			againbuy(){
				this.$router.push('/yearCard');
			},
			tab(val) {
				this.$Indicator.loading();
				this.param.status = val;
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList(); //触发加载更多
				setTimeout(() => {
					this.$Indicator.close();
				}, 200)
			},
			//所得商品列表
			shoplist(success) {
				let url = "UserInterface/OrderDetailInfoList.ashx";
				if (this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.goodsList;
					this.list = [...this.list, ...modelList]
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
			upshop(item) {
				this.getAdrList();
				this.hideadress = true;
				this.orderkey = item.orderId;
			},
			okupshop() {
				let url = "UserInterface/order/UpdateOrderAddressInfo.ashx";
				let param = {
					orderkey: this.orderkey,
					addresskey: this.adreskey
				};
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						this.$Toast("提货失败！");
						return;
					}
					this.$Toast("提货成功！");
					this.hideadress = false;
					this.$Indicator.loading();
					this.param.pagecount = 0;
					this.$refs.loadMoreE.getList(); //触发加载更多
					setTimeout(() => {
						this.$Indicator.close();
					}, 200)
				})
			},
			//隐藏地址
			hideadrs() {
				this.hideadress = false;
			},
			edit(item) {
				this.$router.push(`/personaladdadress/edit?skey=${item.sKey}`)
			},
			//选择地址
			setDefaultAdr(index, skey) {
				this.isactv = index;
				this.adreskey = skey;
			},
			//获取地址列表
			getAdrList() {
				let url = "UserInterface/GetUserAddressList.ashx";
				let param = {
					"PageSize": 100,
					"PageCount": 1,
					"OrderBy": 0
				};
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.VUserAddressInfo;
					this.listadres = [...modelList];
					for (var i in modelList) {
						if (modelList[i].isDefault == 1) {
							this.isactv = i;
							this.adreskey = modelList[i].sKey;
						}
					}
				})
			},
			// 取消订单
			delmoy(item, protype) {
				this.$Indicator.loading();
				let url = "UserInterface/DeleteOrderInfo.ashx";
				let param = {
					orderskey: item.orderId
				}
				this.$post(url, param).then((data) => {
					this.$Indicator.close();
					if (data.rspcode != 1) {
						this.$Toast(data.rspdesc);
						return;
					}
					this.$Toast("删除订单成功");
					this.param.pagecount = 0;
					this.$refs.loadMoreE.getList();
				})
			},
			filterToggleFn(type) {
				var $mark = this.$refs.mark;
				$mark.style.display = "none"
				if (type) {
					$mark.style.display = "block"
				}
			},
			filterActiveFn(index, types) {
				this.filterActive = index;
				this.param.orderType = types;
				this.$Indicator.loading();
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList(); //触发加载更多
				setTimeout(() => {
					this.$Indicator.close();
				}, 200)
			}
		},
		mounted() {
			this.information();
			this.param.pagecount = 0;
			this.$refs.loadMoreE.getList();
		},
		beforeRouteLeave(to, from, next) {
			//不能返回支付成功页面
			if (to.name == "panicBuyingAreaPaySuccess") {
				next("/wx_Entrance/personal")
				return;
			}
			next()
		},
		components: {
			productItem,
			loadMore
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	#content h3 {
		margin-top: 0.1rem;
		width: 92%;
		padding: 0.14rem 4%;
		background: #fff;
		color: #333;
		font-size: 0.16rem;
		font-weight: 500;
	}

	.foot {
		margin-top: 0.08rem;
		display: flex;
		justify-content: space-between;
		font-size: 0.14rem;
		color: $color60;

		.logisticsInfo {
			display: flex;
			align-items: center;
		}

		.f-btn {
			width: 0.72rem;
			height: 0.26rem;
			line-height: 0.26rem;
			text-align: center;
			box-sizing: border-box;
			border-radius: 0.13rem;

			span {
				/*vertical-align: middle;*/
			}

			&.default {
				background: #FFFFFF;
				border: 1px solid $boderE;
			}

			&.ok {
				background: $themeColor;
				margin-left: 5px;

				span {
					color: white;
				}
			}

			&.laood {
				background: #fff;
				border: 1px solid $themeColor;
				box-sizing: border-box;

				span {
					color: $themeColor;
				}
			}
		}

		.btn-group {
			display: flex;
			justify-content: flex-start;
			white-space: normal;
		}
	}

	.vip_card {
		width: 100%;
		height: 2.19rem;
		position: relative;
		background: #fff;

		.vip_kap {
			position: absolute;
			left: 4%;
			top: 0.12rem;
			height: 1.95rem;
			width: 92%;
			background: url(../../../assets/images/nianka.png) no-repeat center center;
			background-size: 100%;

			.vip_inform {
				padding: 0.1rem 0 0 3%;
				overflow: hidden;

				img {
					height: 0.54rem;
					width: 0.54rem;
					margin: 0.06rem 0 0 0.04rem;
					float: left;
					border-radius: 0.27rem;
				}

				p {
					float: left;
					margin-left: 0.1rem;
					color: #7E5000;

					span {
						font-size: 0.18rem;
						padding-top: 0.08rem;
						display: block;
					}

					label {
						display: block;
						font-size: 0.13rem;
						margin-top: 0.08rem;
					}
				}
			}

			.vip_bot {
				position: absolute;
				padding: 0 3% 0.14rem 3%;
				width: 94%;
				bottom: 0;
				left: 0;

				.vip_time {
					float: left;
					color: #7E5000;

					p {
						font-size: 0.13rem;
					}

					label {
						font-size: 0.15rem;
						padding-top: 0.02rem;
						display: block;
					}
				}

				span {
					float: right;
					height: 0.32rem;
					padding: 0 0.2rem;
					font-size: 0.15rem;
					line-height: 0.36rem;
					border-radius: 0.16rem;
					background: linear-gradient(to right, #fff, #EFC99A);
					margin-top: 0.04rem;
				}
			}
		}
	}
</style>
