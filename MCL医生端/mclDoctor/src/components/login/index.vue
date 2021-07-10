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
				<!-- <li>
					<img src="@/assets/images/mima@2x.png" />
					<input type="password" v-model.trim="code" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop"
					 placeholder="请输入密码" />
				</li> -->
				<li class="yzmcode">
					<div class="input_warp">
						<img src="@/assets/images/yanzhengma@2x.png" />
						<input type="tel" v-model.trim="code" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入验证码" />
					</div>
					<span v-on:click="phonet()">
						<i v-if="isDown"> {{time}}</i>
						<i v-else>{{getCode}}</i>
					</span>
				</li>
			</ul>
			<p class="agreen">
				<!-- <span v-if="agrn" class="axz" @click="agre"></span>
          <span v-else @click="agre"></span>
          阅读并同意<router-link to="/noticeClause" style="text-decoration: underline;color: #FF3D3D;margin-left: 0.02rem;">金拓商城用户协议</router-link> -->
				<!-- <label>
					<router-link to="/changePass">忘记密码？</router-link>
				</label> -->
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
  name: 'index',
  data: () => ({
    phone: '',
    code: '',
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
      if (this.code == '') {
        this.$Toast('请输入验证码')
        return
      }
      let url = 'UserInterface/UserLogin.ashx'
      let param = {
        'userphone': this.phone,
        'vercode': this.code,
        'openid': localStorage.openId
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode == 0) {
          this.$Toast(data.rspdesc)
          return
        }
        if ((data.data.userType == 4)) {
          if (data.rspcode == 2) {
            this.$router.push(`/physician1?UserKey=${data.data.userKey}&SessionId=${data.data.sessionId}`)
            return
          }
          // 存登录信息
          localStorage.userInfo = JSON.stringify({
            UserKey: data.data.userKey,
            SessionId: data.data.sessionId,
			userType: data.data.userType
          })
          this.$Toast('登录成功')
          if (this.$route.query.redirect) {
            this.$router.replace(this.$route.query.redirect)
          } else {
            this.$router.push('/wx_Entrance/home')
          }
        } else {
          this.$Toast('该账号权限不匹配')
        }
      })
    }
  },
  created: function () {
    if (localStorage.userInfo) {
      this.$router.push('/')
    }
  },
  mounted: function () {

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
		height: 1.5rem;
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
		border-left: 1px solid #eee;
		box-sizing: border-box;
		display: block;
		float: right;
		line-height: 0.325rem;
		color: #24b7c0;
		text-align: center;
		font-size: 0.14rem;

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
				color: #4A8EF4;
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
</style>
