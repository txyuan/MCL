<template>
	<div style="background: #fff;min-height: 100vh;">
		<div class="fix_top">
			<mt-header fixed title="复诊预约">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
			<div class="wel_fix">
				<img src="@/assets/images/welfzyy.jpg" style="width: 100%;" />
			</div>
			<mt-button type="default" class="add_btn" v-on:click="goubuyvip()" v-if="isvip==0" size="large">去购买</mt-button>
			<mt-button type="default" class="add_btn" v-on:click="loginbtn()" v-else size="large">下一步</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data: () => ({
			isvip:0,
			isbook:0,
		}),
		methods:{
			// 基本信息
			getMsgInfo() {
				let url = "UserInterface/PatientHomePageEssentialInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.isvip = data.IsMember;
					this.isbook = data.lbFlag;
				})
			},
			goubuyvip(){
				this.$router.push('/yearCard');
			},
			loginbtn(){
				this.$router.push('/appointment');
			}
		},
		mounted(){
			this.getMsgInfo();
		}
	}
</script>

<style scoped lang="scss">
	.wel_fix{
		padding-top: 43px;
	}
	.add_btn{
		background: #24B7BF;
		position: fixed;
		bottom: 0.3rem;
		left: 5%;
		margin: 0;
	}
</style>

