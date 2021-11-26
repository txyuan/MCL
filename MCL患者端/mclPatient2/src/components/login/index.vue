<template>
	<div>
		<div class="login_ff">
			<div class="login_logo">
				<img v-lazy="logoImg">
			</div>
			<ul class="login_inpt">
				<li>
					<input type="tel" v-model.trim="phone" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入手机号" />
				</li>
				<li v-if="toggle" class="yzmcode">
					<div class="input_warp">
						<input type="tel" v-model.trim="code" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入验证码" />
					</div>
					<span v-on:click="phonet()">
						<i v-if="isDown"> {{time}}</i>
						<i v-else>{{getCode}}</i>
					</span>
				</li>
				<li v-else>
					<input type="password" v-model.trim="userpassword" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="默认初始密码：123456" />
				</li>
			</ul>
			<!-- <p class="agreen"> -->
				<!-- <span v-if="agrn" class="axz" @click="agre"></span>
          <span v-else @click="agre"></span>
          阅读并同意<router-link to="/noticeClause" style="text-decoration: underline;color: #FF3D3D;margin-left: 0.02rem;">金拓商城用户协议</router-link> -->
				<!-- <label><router-link to="/changePass">忘记密码？</router-link></label> -->
			<!-- </p> -->
			<!-- <p class="login_service"></p> -->
			<!--<router-link to="/wx_Entrance/home">-->
			<mt-button type="default" class="add_btn" v-on:click="loginbtn()" size="large">登录</mt-button>
			<!--<mt-button type="default" class="add_btnkd" v-on:click="registbtn()" size="large">注册</mt-button>-->
			<!--</router-link>-->
			<p class="togglePassword" @click="toggle = !toggle">
				<span v-if="toggle">密码登录</span>
				<span v-else>手机验证码登录</span>
			</p>

			<div class="page-footer">
					<!-- <p>更好，从正确的生活方式开始</p> -->
					<img src="@/assets/images/login/des.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
// import { DOCTORURL, CHANNELURL } from '@/configURL.js'
// import { getUserType } from '@/assets/js/uesr.js' //用户类型
import logoImg from '@/assets/images/login/loginLogoIcon.png'
import { getRhone, removeRhone } from "@/utils/storage.js"

export default {
  name: 'index',
  data: () => ({
    phone: '',
    code: '',
		userpassword: '',
		toggle: true, // true: 验证码登录, false: 密码登录
    agrn: false,
    logoImg: logoImg,
		getCode: '获取验证码',
    VerificationCode: 60,
    isDown: false
  }),
  computed: {
    time: function () {
      setTimeout(() => {
        if (this.VerificationCode <= 0) {
          this.isDown = false
          this.VerificationCode = 60
          return
        }
        this.VerificationCode--
      }, 1000)
      return `${this.VerificationCode}s后发送`
    }
  },
  methods: {
    // 验证码
	phonet() {
		let url = "UserInterface/UserRegeditCode.ashx";
		let userphone = this.phone;
		let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		if (!myreg.test(this.phone)) {
			this.$Toast('请输入格式正确的手机号');
			return;
		}
		let jmnum = this.$root.getjmw(userphone);
		let datass = this.$root.$getCode(jmnum);
		if (this.isDown) {
			return;
		}
		this.isDown = true;
		let param = {
			"userphone": userphone,
			"ucode": encodeURI(datass).replace(/\+/g, '%2B')
		}
		this.$post(url, param).then((data) => {
			this.$Toast(data.rspdesc);
			if (data.rspcode != 1) {
				return;
			}
		})
	},
    // 注册
    registbtn () {
      this.$router.push('/termsService')
    },
    //           agre(){
    //             this.agrn=!this.agrn;
    //           },
    // 登录
    loginbtn () {
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!myreg.test(this.phone)) {
        this.$Toast('请输入格式正确的手机号')
        return
      }

			let param = {}
			const userphone = this.phone, openid = localStorage.openId

			// 验证码登录
			if(this.toggle){
				if (this.code == '') {
					this.$Toast('请输入验证码')
					return
				}
				param = {
					userphone,
					openid,
					vercode: this.code,
				}
			}else{
			// 手机密码登录
				if (this.userpassword == '') {
					this.$Toast('请输入登录密码')
					return
				}
				param = {
					userphone,
					openid,
					userpassword: this.userpassword,
				}
			}
      
			// 通过扫码进入商城，在登录时候，传标识字段
			if(getRhone()){
				param.doctorPhone = getRhone()
			}

			let url = 'UserInterface/UserLogin.ashx'
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc)
          return
        }
			// 患者端
			const roles = ['1', '2', '3', '4']; // 允许登录的角色。患者，患者家人，路人，医生
			if (roles.includes(String(data.data.userType))) {
				// 存登录信息
				this.saveLoginInfo(data.data)
				const redirect = this.$route.query.redirect
				this.$Toast('登录成功')
				const userinfoflag = data.data.userinfoflag // 1:线下，2：线上
				if (userinfoflag == 0) {
					this.$router.replace('/wellcome_personInfoRegister')
					return
				}
				if (redirect) {
					// 报告查询页面
					// if (redirect == '/eyeconme') {
					// 	this.$router.replace('/wellcome?redirect=/eyeconme')
					// } else {
						this.$router.replace(redirect)
					// }
				} else {
					this.$router.replace('/wx_Entrance/home')
				}
			} else {
					this.$Toast('该账号权限不匹配')
			}
      })
    },
		saveLoginInfo(data){
      // 存登录信息
      localStorage.userInfo = JSON.stringify({
				UserKey: data.userKey,
				SessionId: data.sessionId,
				userType: data.userType
      })
			// 清空sessionStorage
			removeRhone()
    }
  },
  created: function () {
  },
  mounted: function () {

  }
}
</script>

<style scoped lang="scss">
	.login_ff {
		width: 100%;
		height: 100vh;
		background: linear-gradient(to bottom, #21B6CF, #2166CE);
	}

	.login_logo {
		text-align: center;
		padding: 0.40rem 0;
	}

	.login_logo img {
		height: 0.75rem;
	}

	.login_inpt {
		width: 88%;
		margin: 0 auto;
	}

	.login_inpt li {
		width: 94%;
		overflow: hidden;
		margin-bottom: 0.25rem;
		height: 0.5rem;
		border: 1px solid #fff;
		padding: 0 3%;
		border-radius: 0.04rem;
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
		color: #fff;
	}
	.login_inpt input::placeholder{
		color: #fff;
	}
	.login_inpt span {
		width: 1.0rem;
		height: 0.32rem;
		box-sizing: border-box;
		display: block;
		float: right;
		line-height: 0.325rem;
		color: #fff;
		text-align: center;
		font-size: 0.14rem;

		i {
			font-style: normal;
		}
	}

	.add_btn {
		width: 88%;
		color: #24b7c0;
    background: #FFF;
    border-radius: 0.04rem;
		height: 0.5rem;
		line-height: 0.5rem;
		margin: 0 auto;
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
				color: #F78335;
				font-size: 0.14rem;
			}
		}
	}

	.login_inpt .yzmcode input {
		flex: 1;
	}

	.yzmcode {
		display: flex;
		align-items: center;
	}

	.yzmcode .input_warp {
		flex: 1;
		display: flex;
	}

  .togglePassword{
		width: 88%;
		margin: 0 auto;
		margin-top: 0.25rem;
		color: #FFF;
	}

	.page-footer{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		color: #FFF;
	}
	.page-footer::after{
		content: "";
		display: inline-block;
		width: 30%;
		height: 1px;
		background: #FFF;
		position: absolute;
		top: 10px;
		left: 0;
		right: 0;
		margin: auto;
	}

	.page-footer img{
		width: 96%;
	}
</style>
