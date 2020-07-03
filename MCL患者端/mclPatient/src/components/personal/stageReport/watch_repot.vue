<template>
	<div>
		<div class="fix_top">
			<mt-header title="查看报告" class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial;">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div class="tage">
			<img src="../../../assets/images/pdfIcon.png" />
			<p style="margin-top: 0.14rem;">您需支付19.9元获取报告；</p>
			<p>成为会员后可免费获取报告</p>
		</div>
		<div class="btns">
			<mt-button type="primary" class="theme-button button-radio" size="large" @click.native="getReport">获取报告</mt-button>
			<mt-button type="default" class="theme-button button-radio" size="large" @click.native="$router.push(`/yearCard?&redirect=personalnutrition`)">成为会员</mt-button>
			<mt-button type="default" class="theme-button button-radio " size="large" @click.native="$router.push(`/wx_Entrance/home`)">返回首页</mt-button> 
		</div>

	</div>
</template>

<script>
	export default {
		name: "index",
		data: () => ({
			IsMember: 0, //0非会员   1会员
		}),
		methods: {
			//获取报告
			getReport() {
				// if(this.IsMember != 1){
				// 	this.$Toast("请先成为会员")
				// }else{
					//去支付
				this.$router.push(`/serviceorderpay/${this.$route.query.orderKey}`)
				// }
			},
			// 基本信息
			getMsgInfo() {
				let url = "UserInterface/PatientHomePageEssentialInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.IsMember = data.IsMember;
				})
			},
		},
		mounted: function() {
			this.getMsgInfo()
		},
		components: {

		}
	}
</script>

<style scoped lang="scss">
	.tage {
		padding: 0 3%;
		margin-top: 43px;

		img {
			width: 0.9rem;
			position: relative;
			left: 50%;
			margin-left: -0.45rem;
			margin-top: 0.86rem;
		}

		p {
			font-size: 0.16rem;
			color: #333535;
			text-align: center;
			margin-top: 0.08rem;
		}

		span {
			display: block;
			width: 100%;
			text-align: center;
			height: 0.5rem;
			line-height: 0.5rem;
			background: #F78335;
			border-radius: 4px;
			color: #fff;
			margin-top: 0.4rem;
			font-size: 0.16rem;
		}
	}

	.btns {
		margin-top: 0.5rem;
		padding: 0 0.2rem;
	}
</style>
<style>
	.btns .theme-button {
		margin-bottom: 15px;
	}
</style>
