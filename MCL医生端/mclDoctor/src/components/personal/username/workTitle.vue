<template>
	<div class="username-root">
		<mt-header title="修改所属职称">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>

		<mt-field placeholder="请输入职称" v-model.trim="usernames" class="marginTop5"></mt-field>

		<div class="btn">
			<mt-button type="danger" size="large" @click="userEdit">确定</mt-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: "username",
		data: () => ({
			usernames: ""
		}),
		methods: {
			//个人信息
			information() {
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					this.usernames = data.data.Title;
				})
			},
			userEdit() {
				let url = "UserInterface/UserEdit.ashx";
				let NickName = this.usernames;
				if (NickName == "") {
					this.$Toast("用户名不能为空");
					return;
				}
				this.$post(url, {
					position:NickName
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

<style>
	.username-root input {
		border: none;
	}

	.username-root .btn {
		margin: 0 0.10rem;
		margin-top: 0.80rem;
	}
</style>
