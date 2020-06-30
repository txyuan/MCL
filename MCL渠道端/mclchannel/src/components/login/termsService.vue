<template>
	<div>
		<!--<img class="close" @click="closere" src="@/assets/images/guanbi@2x.png" />-->
		<div class="login_ff">
			<div class="login_logo">
				<img v-lazy="logoImg">
			</div>
			<ul class="login_inpt">
				<!--<li>
          <img src="@/assets/images/tuijianren@2x.png" />
          <input type="tel" v-model.trim="rphone" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入推荐人手机号" />
        </li>-->
				<li>
					<img src="@/assets/images/zhanghao@2x.png" />
					<input type="tel" v-model.trim="phone" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入您的手机号" />
				</li>
				<li class="yzmcode">
					<img src="@/assets/images/yanzhengma@2x.png" />
					<input type="tel" v-model.trim="code" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入验证码" />
					<span v-on:click="phonet()">
          <i v-if="isDown"> {{time}}</i>
          <i v-else>{{getCode}}</i>
          </span>
				</li>
				<li>
					<img src="@/assets/images/mima@2x.png" />
					<input type="password" v-model.trim="userpwd" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请设置密码" />
				</li>
			</ul>
			<p class="what_yuang">
				<span v-for="(item,index) in roleList" v-on:click="addClass(item,index)" v-bind:class="{ act:index==current}">{{item.name}}</span>
			</p>
			<!-- <p class="agreen">
          <span v-if="agrn" class="axz" @click="agre"></span>
          <span v-else @click="agre"></span>
          阅读并同意<router-link to="/noticeClause" style="text-decoration: underline;color: #FF3D3D;margin-left: 0.02rem;">金拓商城用户协议</router-link>
      </p> -->
			<!--<p class="ets">温馨提示：点击图片更换图片验证码！</p>-->
			<!--<router-link to="/wx_Entrance/home">-->
			<mt-button type="default" class="add_btn" v-on:click="loginbtn()" size="large">确定</mt-button>
			<!--</router-link>-->
		</div>
	</div>
</template>

<script>
	import identify from '@/components/common/identify.vue'
	import logoImg from '@/assets/images/mclogo.png'
	export default {
		name: "register",
		data: () => ({
			rphone: '',
			phone: '',
			code: '',
			userpwd: '',
			getCode: "获取验证码",
			VerificationCode: 60,
			isDown: false,
			logoImg: logoImg,
			picodes: "",
			agrn: false,
			roleList: [{
					value: 6,
					name: "推广员工",
					show: true
				},
				{
					value: 7,
					name: "发货员工",
					show: true
				}
			],
			role: '6',  //角色类型id
			current: 0
		}),
		computed: {
			time: function() {
				setTimeout(() => {
					if(this.VerificationCode <= 0) {
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
				if(!myreg.test(this.phone)) {
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
				if(this.isDown) {
					return;
				}
				this.isDown = true;
				let param = {
					"userphone": this.phone,
					"ucode": encodeURI(datass)
				};
				this.$post(url, param).then((data) => {
					this.$Toast(data.rspdesc);
					if(data.rspcode != 1) {
						return;
					}
				})
			},
			//关闭
			closere() {
				if(this.$route.query.form) {
					this.$router.back()
				} else {
					this.$router.push('/login');
				}
			},
			agre() {
				this.agrn = !this.agrn;
			},
			//确定
			loginbtn() {
				let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
//				if(!myreg.test(this.rphone)) {
//					this.$Toast('请输入格式正确的推荐人手机号');
//					return;
//				}
				if(!myreg.test(this.phone)) {
					this.$Toast('请输入格式正确的手机号');
					return;
				}
				if(this.code == "") {
					this.$Toast('请输入验证码');
					return;
				}
				if(this.userpwd == "") {
					this.$Toast('请输入您的密码');
					return;
				}
				if(this.role == "") {
					this.$Toast('请选择用户角色');
					return;
				}
//				if(!this.agrn) {
//					this.$Toast('请勾选阅读并同意用户注册协议');
//					return;
//				}
				let url = "UserInterface/UserRegedit.ashx";
				let param = {
					"rphone": this.rphone,
					"userphone": this.phone,
					"vercode": this.code,
					"userpwd": this.userpwd,
					"role": this.role
				}
				this.$post(url, param).then((data) => {
					if(data.rspcode != 1) {
						this.$Toast(data.rspdesc);
						return;
					}
					//存登录信息
					this.$Toast(data.rspdesc);
					if(this.$route.query.form) {
						this.$router.back()
					} else {
						this.$router.push('/login');
					}
				})
			},
			addClass(item,index){
				this.current = index;				
				this.role = item.value;				
			}
		},
		components: {
			identify
		},
		mounted: function() {
      let rphone = this.$route.query.rphone;
			this.rphone = rphone;
		}
	}
</script>

<style scoped lang="scss">
	.close {
		width: 0.2rem;
		height: 0.2rem;
		position: fixed;
		top: 0.14rem;
		right: 4%;
	}
	
	.login_ff {
		width: 100%;
		height: 100vh;
		background: #fff;
	}
	
	.login_logo {
		position: relative;
		left: 0;
		top: 0.1rem;
	}
	
	.login_logo img {
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	
	.login_inpt {
		width: 88%;
		margin: 0 auto;
		padding-top: 1.6rem;
		overflow: hidden;
	}
	
	.login_inpt li {
		width: 94%;
		overflow: hidden;
		margin-top: 0.08rem;
		float: left;
		height: 0.45rem;
		border: 1px solid #eee;
		padding: 0 3%;
		border-radius: 0.25rem;
	}
	
	.login_inpt img {
		float: left;
		height: 0.21rem;
		width: 0.21rem;
		margin-right: 0.08rem;
		margin-top: 0.11rem;
	}
	
	.login_inpt input {
		width: 80%;
		height: 0.45rem;
		border: none;
		padding: 0 0.1rem;
		font-size: 0.14rem;
	}
	/*.login_inpt li:nth-child(3){
    width: 55%;
  }
  .login_inpt li:nth-child(3) input{
    width: 70%;
  }*/
	
	.login_inpt .yzmcode input {
		width: 48%;
	}
	
	.login_inpt span {
		width: 1.0rem;
		height: 0.34rem;
		box-sizing: border-box;
		display: block;
		float: right;
		line-height: 0.35rem;
		color: #FF1E41;
		text-align: center;
		font-size: 0.14rem;
		margin-top: 0.08rem;
		border-left: 1px solid #EEEEEE;
		i {
			font-style: normal;
		}
	}
	
	.add_btn {
		width: 86%;
		position: relative;
		margin-top: 0.3rem;
		clear: both;
	}
	
	.verify-box {
		width: 34%;
		float: right;
		margin: 0.14rem 0 0 0;
		line-height: 0.35rem;
	}
	
	.ets {
		padding-left: 9%;
		font-size: 0.13rem;
		color: #FF3D3D;
		padding-top: 0.1rem;
	}
	
	.agreen {
		font-size: 0.12rem;
		padding-left: 0.2rem;
		color: #666;
		height: 0.3rem;
		margin-top: 0.1rem;
		line-height: 0.32rem;
		span {
			width: 0.3rem;
			height: 0.3rem;
			display: block;
			background: url('../../assets/images/select@2x.png') no-repeat center center;
			background-size: 0.16rem;
			float: left;
			&.axz {
				background: url('../../assets/images/select_click@2x.png') no-repeat center center;
				background-size: 0.16rem;
			}
		}
	}
	
	.what_yuang {
		width: 86%;
		margin: 0 auto;
		margin-top: 0.1rem;
		overflow: hidden;
		span {
			display: block;
			float: left;
			font-size: 0.15rem;
			color: #999999;
			padding-left: 0.26rem;
			background: url("../../assets/images/select@2x.png") no-repeat left center;
			background-size: 0.18rem;
			&:first-child {
				margin-right: 0.26rem;
			}
			&.act {
				background: url("../../assets/images/select_click@2x.png") no-repeat left center;
				background-size: 0.18rem;
				color: #FF3D3D;
			}
		}
	}
</style>