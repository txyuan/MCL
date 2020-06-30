<template>
	<div class="username-root">
		<mt-header title="擅长">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="person_margs">
			<p>擅长</p>
			<textarea v-model.trim="begoodat"></textarea>
		</div>
		<!-- <mt-field placeholder="请输入用户名" v-model.trim="usernames" class="marginTop5"></mt-field> -->
		
		<div class="btn">
			<mt-button type="danger" size="large" @click="userEdit">确定</mt-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: "username",
		data: () => ({
			begoodat: ""
		}),
		methods: {
			//个人信息
			information() {
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					this.begoodat = data.data.begoodat;
				})
			},
			userEdit() {
				let url = "UserInterface/UserEdit.ashx";
				let begoodat = this.begoodat;
				if (begoodat == "") {
					this.$Toast("不能为空");
					return;
				}
				this.$post(url, {
					begoodat
				}).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode == 1) {

						this.$router.back();
					}
				})
			}
		},
		mounted() {
			this.information()
		}
	}
</script>

<style scoped lang="scss">
	.username-root input {
		border: none;
	}

	.username-root .btn {
		margin: 0 0.10rem;
		margin-top: 0.80rem;
	}
	.person_margs{
		background: #fff;
		padding: 0 5%;
		padding-bottom: 0.08rem;
		p{
			font-size: 16px;
			padding: 0.1rem 0;
		}
		textarea{
			width: 100%;
			height: 0.8rem;
			border: none;
			resize: none;
			background: #eee;
			border: 1px solid #ddd;
			padding: 0.08rem 2%;
			border-radius: 6px;
			color: #333;
			font-size: 0.13rem;
			box-sizing: border-box;
		}
	}
</style>
