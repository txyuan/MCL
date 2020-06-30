<template>
	<div style="background: #fff;min-height: 100vh;padding-bottom: 0.3rem;">
		<div id="class_header" class="myassets">
			<mt-header title="卡号管理" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div class="bankc_ul">
			<loadMore :param="param" @triggerGetList="getbankcard" ref="loadMoreE">
				<div slot="content">
					<div class="bankc_list" v-for="(item,index) in list" :key="index">
						<div class="bankc_li zhongguogongshnagbank" v-if="item.bankname=='中国工商银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li" v-else-if="item.bankname=='北京银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li bohaiyinhangbank" v-else-if="item.bankname=='渤海银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li guangfabank" v-else-if="item.bankname=='广发银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li hengfengbank" v-else-if="item.bankname=='恒丰银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li huaxiabank" v-else-if="item.bankname=='华夏银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li jiaotongbank" v-else-if="item.bankname=='交通银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li shanghaipudongfazhanbank" v-else-if="item.bankname=='上海浦东发展银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li shenzhenfazhanbank" v-else-if="item.bankname=='深圳发展银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li xingyebank" v-else-if="item.bankname=='兴业银行'">
							<p>{{item.bankcard}}</p>
						</div>
						
						<div class="bankc_li zhaoshangbank" v-else-if="item.bankname=='招商银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li zheshangbank" v-else-if="item.bankname=='浙商银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li zhongguoguangdabank" v-else-if="item.bankname=='中国光大银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li zhongguojianshebank" v-else-if="item.bankname=='中国建设银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li zhongguominshengbank" v-else-if="item.bankname=='中国民生银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li zhongguonongyebank" v-else-if="item.bankname=='中国农业银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li zhongguoyinhangbank" v-else-if="item.bankname=='中国银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li zhongguoyouzhengchuxubank" v-else-if="item.bankname=='中国邮政储蓄银行'">
							<p>{{item.bankcard}}</p>
						</div>
						<div class="bankc_li zhongxinbank" v-else-if="item.bankname=='中信银行'">
							<p>{{item.bankcard}}</p>
						</div>
					</div>
				</div>
			</loadMore>
		</div>
		<router-link to="/addcard"><span class="addbc">+ 添加银行卡</span></router-link>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "index",
		data: () => ({
			param: {
				pagecount: 0,
				pagesize: 10
			},
			list: []
		}),
		methods: {
			getbankcard(success) {
				let url = "UserInterface/BankCardUserInfo.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					if (this.param.pagecount == 1) {
						this.list = [...modelList];
					} else {
						this.list = [...this.list, ...modelList]
					}
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			}
		},
		components: {
			loadMore
		}
	}
</script>

<style lang="scss" scoped>
	.bankc_ul {
		padding-top: 43px;

		.bankc_list {
			width: 92%;
			margin: 0 auto;
			height: 1.32rem;
			
			border-radius: 6px;
			margin-top: 0.1rem;
			.bankc_li{
				width: 100%;
				height: 100%;
				background: url(../../../assets/images/beijingyinhang.png) no-repeat center center;
				background-size: 100%;
				p {
					color: #fff;
					font-size: 0.24rem;
					padding: 0.74rem 0 0 8%;
				}
				&.bohaibank{
					background: url(../../../assets/images/bohaiyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.guangfabank{
					background: url(../../../assets/images/guangfayiinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.hengfengbank{
					background: url(../../../assets/images/hengfengyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.huaxiabank{
					background: url(../../../assets/images/huaxiayinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.jiaotongbank{
					background: url(../../../assets/images/jiaotongyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.shenzhenfazhanbank{
					background: url(../../../assets/images/shenzhenfazhanyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.shanghaipudongfazhanbank{
					background: url(../../../assets/images/shanghaipudongfazhanyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.xingyebank{
					background: url(../../../assets/images/xingyeyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhaoshangbank{
					background: url(../../../assets/images/zhaoshangyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zheshangbank{
					background: url(../../../assets/images/zheshangyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhongguoguangdabank{
					background: url(../../../assets/images/zhongguoguangdayinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhongguogongshnagbank{
					background: url(../../../assets/images/zhongguogongshnagyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhongguojianshebank{
					background: url(../../../assets/images/zhongguojiansheyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhongguominshengbank{
					background: url(../../../assets/images/zhongguominshengyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhongguonongyebank{
					background: url(../../../assets/images/zhongguonongyeyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhongguobank{
					background: url(../../../assets/images/zhongguoyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhongguoyouzhengchuxubank{
					background: url(../../../assets/images/zhongguoyouzhengchuxuyinhang.png) no-repeat center center;
					background-size: 100%;
				}
				&.zhongxinbank{
					background: url(../../../assets/images/zhongxinyinhang.png) no-repeat center center;
					background-size: 100%;
				}
			}
			
		}
	}

	.addbc {
		display: block;
		width: 80%;
		margin: 0 auto;
		height: 0.46rem;
		border: 1px solid #4A8EF4;
		text-align: center;
		line-height: 0.46rem;
		font-size: 0.16rem;
		color: #4A8EF4;
		border-radius: 0.25rem;
		margin-top: 0.5rem;
	}
</style>
