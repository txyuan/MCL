<template>
	<div class="username-root">
		<mt-header title="擅长">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		
		<div class="textdiv">
			<textarea v-model="usernames"  placeholder="输入专业领域、擅长病种等信息"></textarea>
		</div>

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
					this.usernames = data.data.begoodat;
				})
			},
			userEdit() {
				let url = "UserInterface/UserEdit.ashx";
				let NickName = this.usernames;
				if (NickName == "") {
					this.$Toast("擅长内容不能为空");
					return;
				}
				this.$post(url, {
					BeGoodAt:NickName
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
	.textdiv{
		width: 94%;
		background: #fff;
		padding: 0.1rem 3%;
	}
	textarea {
		width: 100%;
		height: 0.8rem;
		border: none;
		resize: none;
		background: #eee;
		border: 1px solid #ddd;
		padding: 0.08rem 2%;
		border-radius: 6px;
		color: #333;
		font-size: 0.15rem;
		box-sizing: border-box;
	}
</style>
