<template>
	<div>
		<div class="login_ff">
			<div class="login_logo">
				<img v-lazy="logoImg">
			</div>
			<ul class="login_inpt">
				<li>
					<img src="@/assets/images/zhanghao@2x.png" />
					<input type="tel" v-model.trim="phone" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入手机号" />
				</li>
				<li>
					<img src="@/assets/images/mima@2x.png" />
					<input type="password" v-model.trim="code" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入密码" />
				</li>
			</ul>
			<p class="agreen">
				<!-- <span v-if="agrn" class="axz" @click="agre"></span>
          <span v-else @click="agre"></span>
          阅读并同意<router-link to="/noticeClause" style="text-decoration: underline;color: #FF3D3D;margin-left: 0.02rem;">金拓商城用户协议</router-link> -->
				<label><router-link to="/changePass">忘记密码？</router-link></label>
			</p>
			<!-- <p class="login_service"></p> -->
			<!--<router-link to="/wx_Entrance/home">-->
			<mt-button type="default" class="add_btn" v-on:click="loginbtn()" size="large">登录</mt-button>
			<!--<mt-button type="default" class="add_btnkd" v-on:click="registbtn()" size="large">注册</mt-button>-->
			<!--</router-link>-->
		</div>
	</div>
</template>

<script>
	import logoImg from '@/assets/images/mclogo.png'
	export default {
		name: "index",
		data: () => ({
			phone: '',
			code: '',
			agrn: false,
			logoImg: logoImg
		}),
		methods: {
			//注册
			registbtn() {
				this.$router.push('/termsService');
			},
			//           agre(){
			//             this.agrn=!this.agrn;
			//           },
			//登录
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
				//             if(!this.agrn){
				//               this.$Toast('请勾选阅读并同意金拓条款须知');
				//               return;
				//             }
				let url = "UserInterface/UserLogin.ashx";
				let param = {
					"userphone": this.phone,
					"userpassword": this.code
				}
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						this.$Toast('登录失败请检查账号密码');
						return;
					}
					//存登录信息
					localStorage.userInfo = JSON.stringify({
						UserKey: data.data.userKey,
						SessionId: data.data.sessionId,
						UserType: data.data.userType,
					})
					this.$Toast('登录成功');
					if(this.$route.query.redirect){
						this.$router.replace(this.$route.query.redirect);
					}else{
						this.$router.push('/wx_Entrance/home');
					}
				})
			}
		},
		created: function(){
			if(localStorage.userInfo){
				this.$router.push("/")
			}
		},
		mounted: function() {

		}
	}
</script>

<style scoped lang="scss">
	.add_btn{
		background: rgb(36,183,192);
	}
	.login_ff {
		width: 100%;
		height: 100vh;
		background: #fff;
	}
	
	.login_logo {
		position: relative;
		left: 0;
		top: 0.52rem;
	}
	
	.login_logo img {
		width: 1.5rem;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	
	.login_inpt {
		width: 88%;
		margin: 0 auto;
		padding-top: 2.0rem;
	}
	
	.login_inpt li {
		width: 94%;
		overflow: hidden;
		margin-top: 0.16rem;
		float: left;
		height: 0.5rem;
		border: 1px solid #eee;
		padding: 0 3%;
		border-radius: 0.25rem;
	}
	
	.login_inpt img {
		float: left;
		height: 0.2rem;
		width: 0.2rem;
		margin-right: 0.08rem;
		margin-top: 0.15rem;
	}
	
	.login_inpt input {
		width: 80%;
		height: 0.5rem;
		border: none;
		padding: 0 0.1rem;
		font-size: 0.14rem;
	}
	
	.login_inpt span {
		width: 1.0rem;
		height: 0.32rem;
		border: 1px solid #FF1E41;
		box-sizing: border-box;
		display: block;
		float: right;
		line-height: 0.325rem;
		color: #FF1E41;
		text-align: center;
		font-size: 0.14rem;
		border-radius: 4px;
		i {
			font-style: normal;
		}
	}
	
	.add_btn {
		width: 86%;
		position: relative;
		margin-top: 0.2rem;
		margin-bottom: 0.12rem;
	}
	
	.login_service {
		clear: both;
		width: 86%;
		padding-left: 7%;
		text-align: right;
		font-size: 0.14rem;
		padding-top: 0.2rem;
	}
	
	.login_service a {
		color: #FF3D3D;
	}
	
	.agreen {
		clear: both;
		font-size: 0.12rem;
		padding-left: 9%;
		color: #666;
		height: 0.3rem;
		margin-top: 0.2rem;
		padding-top: 0.1rem;
		line-height: 0.32rem;
		span {
			width: 0.24rem;
			height: 0.3rem;
			display: block;
			background: url('https://resource.jtsc.club/select@2x.png') no-repeat left center;
			background-size: 0.16rem;
			float: left;
			&.axz {
				background: url('https://resource.jtsc.club/select_click@2x.png') no-repeat left center;
				background-size: 0.16rem;
			}
		}
		label {
			float: right;
			margin-right: 4%;
			a {
				color: #FF3D3D;
				font-size: 0.14rem;
			}
		}
	}
</style>