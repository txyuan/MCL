<template>
	<div class="username-root">
		<mt-header title="修改支付密码">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="edit_pass">
			<div class="phonenum">
				<mt-field label="手机号：" placeholder="请输入手机号" v-model="phone"></mt-field>
			</div>
			<!-- <div class="codenum">
				<mt-field label="图片码：" placeholder="图片码的计算结果" v-model="picodes">
					<div class="verify-box text-center">
						<identify ref="identify" />
					</div>
				</mt-field>
			</div> -->
			<div class="codenum">
				<mt-field label="验证码：" placeholder="请输入验证码" v-model="code">
					<u v-on:click="phonet()">
						<i v-if="isDown"> {{time}}</i>
						<i v-else>{{getCode}}</i>
					</u>
				</mt-field>
			</div>
			<div class="passnum">
				<mt-field label="新密码：" type="password" placeholder="请输入新密码：" v-model="newpassword"></mt-field>
			</div>
			<div class="btn">
				<mt-button type="danger" size="large" @click="loginbtn">确认</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import identify from '@/components/common/identify.vue'
	export default {
		name: "twppass",
		data: () => ({
			phone: "",
			code: "",
			newpassword: "",
			getCode: "获取验证码",
			VerificationCode: 60,
			isDown: false,
			picodes: ""
		}),
		computed: {
			time: function() {
				setTimeout(() => {
					if (this.VerificationCode <= 0) {
						this.isDown = false;
						this.VerificationCode = 60;
						return
					}
					this.VerificationCode--
				}, 1000)
				return `${this.VerificationCode}s后发送`
			}
		},
		methods: {
			//验证码
			phonet() {
				let url = "UserInterface/UserRegeditCode.ashx";
				let userphone = this.phone;
				let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.phone)) {
					this.$Toast('请输入格式正确的手机号');
					return;
				}
				// const identify = this.$refs.identify;
				// if ((this.picodes === "") || (this.picodes != identify.code)) {
				// 	this.$Toast('图片验证码填写有误！');
				// 	return;
				// }
				let jmnum = this.$root.getjmw(this.phone);
				let datass = this.$root.$getCode(jmnum);
				if (this.isDown) {
					return;
				}
				this.isDown = true;
				let param = {
					"userphone": this.phone,
					"ucode": encodeURI(datass).replace(/\+/g, '%2B')
				}
				this.$post(url, param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
				})
			},
			//确定
			loginbtn() {
				let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.phone)) {
					this.$Toast('请输入格式正确的手机号');
					return;
				}
				if (this.code == "") {
					this.$Toast('请输入验证码');
					return;
				}
				if (this.newpassword == "") {
					this.$Toast('请输入您的新二级密码');
					return;
				}
				let url = "UserInterface/UserRetrievePassword.ashx";
				let param = {
					"userphone": this.phone,
					"vercode": this.code,
					"newpassword": this.newpassword,
					"passwordtype": 2
				}
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						this.$Toast(data.rspdesc);
						return;
					}
					this.$Toast('修改成功');
					this.$router.back();
				})
			}
		},
		components: {
			identify
		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss">
	.passnum {
		margin-top: 0.1rem;
	}

	.phonenum {
		margin-top: 0.1rem;
		border-bottom: 1px solid #ddd;
	}

	.codenum {
		border-bottom: 1px solid #d9d9d9;
	}

	.codenum u {
		display: inline-block;
		text-decoration: none;
		width: 1.0rem;
		text-align: center;
		color: #4A8EF4;
		font-size: 0.12rem;
		border-radius: 0.13rem;
		height: 0.26rem;
		line-height: 0.27rem;
		border: 1px solid #4A8EF4;
	}

	.codenum u i {
		font-style: normal;
	}

	.username-root input {
		border: none;
	}

	.username-root .btn {
		margin: 0 0.20rem;
		border-radius: 22px;
		overflow: hidden;
		margin-top: 0.5rem;
	}

	.ets {
		padding-left: 3%;
		font-size: 0.13rem;
		color: #FF3D3D;
		padding-top: 0.1rem;
	}

	.verify-box {
		line-height: 0.3rem;
	}

	.verify-box>div {
		min-width: 75px;
	}
</style>
