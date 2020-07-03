<template>
	<div class="doctorInfo-root">
		<div id="body_main" style="padding-bottom: 0;">
			<mt-header title="医生简介" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>

			<div class="infoPanel borderBottom">
				<img :src="DoctorImg" class="touxiang" width="122" height="122" />
				<div class="info">
					<p class="name">{{DoctorName}}医生</p>
					<p class="font14 huiFont">当前职务：{{Position}}</p>
				</div>
			</div>

			<div class="curriculum font14">
				<div class="title font16">医生履历详细：</div>
				<p class="huiFont"> {{Content}} </p>
				<!-- <p class="huiFont"> 何小何医生毕业于北京大学医学院，博士学历，在国内肺癌领域享有盛名。 </p>
				<p class="huiFont"> 何小何医生毕业于北京大学医学院，博士学历，在国内肺癌领域享有盛名。 </p> -->

				<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="getDoctor" style="margin-top: 80px;">指定该医生</mt-button>

			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "doctorInfo",
		data: () => ({
			DoctorName:'',  //医生姓名
			Position:'',  //职位
			DoctorImg:'',  //医生图片
			Content:'',  //详情
			DoctorsKey:''
		}),
		methods: {
			save() {
				this.$router.push("/doctorPay")
			},
			getDetailInfo(sKey) {
				let url = "UserInterface/GetDoctorDetail.ashx";
				let param = {
					DoctorSkey: sKey
				};
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.Content = data.Content;
					this.DoctorImg = data.DoctorImg;
					this.DoctorName = data.DoctorName;
					this.Position = data.Position;
					this.DoctorsKey=data.DoctorsKey;
				})
			},
			getDoctor() {
				let url = "UserInterface/GetDesignatedDoctor.ashx";
				let param = {
					DoctorSkey: this.DoctorsKey
				};
				this.$post(url,param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.$router.push('/wx_Entrance/home');
				})
			}
		},
		mounted() {
			let sKey = this.$route.params.key;
			this.getDetailInfo(sKey)
		},
	}
</script>

<style scoped lang="scss">
	.infoPanel {
		padding: 0.23rem 0.15rem;
		display: flex;
		background: #FFFFFF;
	}

	.infoPanel img {
		margin-right: 0.20rem;
	}

	.infoPanel .info {
		padding-top: 26px;
	}

	.infoPanel .info .name {
		margin-bottom: 10px;
	}

	.curriculum {
		padding: 0 0.15rem;
		padding-bottom: 0.15rem;
		background: #FFFFFF;

		.title {
			line-height: 0.40rem;
		}

		p {
			text-indent: 0.26rem;
		}
	}
</style>
