<template>
	<div class="username-root">

		<mt-header title="修改登录密码">
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
				<mt-field label="新密码：" type="password" placeholder="请输入新密码" v-model="newpassword"></mt-field>
			</div>
			<!-- <p class="ets">温馨提示：点击图片更换图片验证码！</p> -->
			<div class="changePassbtn">
				<mt-button size="large" class="determineBtn" @click="loginbtn">确认</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import identify from '@/components/common/identify.vue'
	export default {
		name: "index",
		data: () => ({
			phone: "",
			code: "",
			newpassword: "",
			getCode: "获取验证码",
			VerificationCode: 60,
			isDown: false,
			picodes: "",
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
					this.$Toast('请输入您的新密码');
					return;
				}
				let url = "UserInterface/UserRetrievePassword.ashx";
				let param = {
					"userphone": this.phone,
					"vercode": this.code,
					"newpassword": this.newpassword,
					"passwordtype": 1
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

  .mint-header {
    height: 0.44rem;
    border-bottom: 1px solid #eee;
  }
  .username-root{

    .edit_pass{
      margin-top: 0.1rem;
      position: relative;

      .phonenum,.codenum,.passnum{
        position: relative;
        padding:0.015rem 0.015rem 0.015rem 0.1rem;
        background-color: #FFFFFF;
      }
      .phonenum::after {
        background-color: #000;
        content: " ";
        opacity: 0.1;
        right: 0;
        bottom: 0;
        left: 0.2rem;
        position: absolute;
        height: 1px;
      }
      .passnum{
        margin-top: 0.1rem;
      }
      .changePassbtn{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        .determineBtn{
          background-color: #0AC5C9;
          color: #FFFFFF;
          border-radius: 0;
          height: 0.44rem;
          font-size: 0.165rem;
          letter-spacing: 2px;
        }
      }
    .codenum u {
      display: inline-block;
      text-decoration: none;
      padding: 0 0.15rem;
      text-align: center;
      color: #fd9419;
      font-size: 0.13rem;
      border-radius: 0.13rem;
      line-height:2;
      border: 1px solid #fd9419;
    }

    .codenum u i {
      font-style: normal;
    }

    .ets {
      padding-left: 3%;
      font-size: 0.13rem;
      color: #F78335;
      padding-top: 0.1rem;
    }

  }
    .verify-box {
      line-height: 0.3rem;
    }

    .verify-box>div {
      min-width: 75px;
    }
  }


</style>

<style>
  .username-root .edit_pass input[type=text] {
    border: 0;
    color: #666666;
  }
  .username-root .edit_pass a.mint-cell .mint-cell-text {
    color: #666666;
  }
</style>
