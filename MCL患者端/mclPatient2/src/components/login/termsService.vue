<template>
	<div>
		<!--<img class="close" @click="closere" src="@/assets/images/guanbi@2x.png" />-->
		<div class="login_ff">
			<div class="login_logo">
				<img v-lazy="logoImg">
			</div>
			<ul class="login_inpt">

				<li>
					<img src="@/assets/images/zhanghao@2x.png" />
					<input type="tel" v-model.trim="phone" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入您的手机号" />
				</li>
				<!-- <li>
					<img src="@/assets/images/yanzhengma@2x.png" />
					<input type="tel" v-model.trim="picodes" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop"
					 placeholder="图片码的计算结果" />
				</li>
				<div class="verify-box text-center">
					<identify ref="identify" />
				</div> -->
				<li class="yzmcode">
					<img src="@/assets/images/yanzhengma@2x.png" />
					<input type="tel" v-model.trim="code" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入验证码" />
					<span v-on:click="phonet()">
						<i v-if="isDown"> {{time}}</i>
						<i v-else>{{getCode}}</i>
					</span>
				</li>
				<!-- <li>
					<img src="@/assets/images/mima@2x.png" />
					<input type="password" v-model.trim="userpwd" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop"
					 placeholder="请设置密码" />
				</li> -->
				<li style="display: none;">
					<img src="@/assets/images/tuijianren@2x.png" />
					<input type="tel" v-model.trim="rphone" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop"
					 placeholder="邀请人手机号" />
				</li>
				<li v-show="roleList.length > 1">
					<img src="@/assets/images/shenfen@2x.png" />
					<select name="role" v-model.trim="role" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" style="appearance: menulist-button">
						<option v-for="(item,index) in roleList" :value="item.value" :key="index">{{item.name}}</option>
					</select>
				</li>
			</ul>

			<p class="agreen">
				<span v-if="agrn" class="axz" @click="agre"></span>
				<span v-else @click="agre"></span>
				阅读并同意<a @click="optyuup" style="text-decoration: underline;color: #FF3D3D;margin-left: 0.02rem;">【MCL服务】用户使用协议</a>
			</p>
			<!--<p class="ets">温馨提示：点击图片更换图片验证码！</p>-->
			<!--<router-link to="/wx_Entrance/home">-->
			<mt-button type="default" class="add_btn" v-on:click="loginbtn()" size="large">确定</mt-button>
			<!--</router-link>-->
		</div>
	</div>
</template>

<script>
import { DOCTORURL, CHANNELURL } from '@/configURL.js'
import identify from '@/components/common/identify.vue'
import logoImg from '@/assets/images/mclogo.png'

export default {
  name: 'register',
  data: () => ({
    rphone: '',
    phone: '',
    code: '',
    // userpwd: '',
    getCode: '获取验证码',
    VerificationCode: 60,
    isDown: false,
    logoImg: logoImg,
    picodes: '',
    agrn: false,
    // 患者分享给 患者
    // 医生分享给 患者和医生
    // 渠道分享给 医生，渠道，
    roleMap: {
      // role0: '1,2',
      role1: '2',
      role2: '2',
      role3: '',
      role4: '1,4',
      role5: '6',
      role6: '1,4',
      role7: '4',
      role8: '4'
    },
    roleList: [{
      value: '',
      name: '您的身份',
      show: true
    },
    {
      value: 1,
      name: '患者',
      show: true
    },
    {
      value: 2,
      name: '患者家人',
      show: true
    },
    {
      value: 3,
      name: '路人',
      show: true
    },
    {
      value: 4,
      name: '医生',
      show: true
    },
    {
      value: 5,
      name: '地区渠道商',
      show: true
    },
    {
      value: 6,
      name: '推广员工',
      show: true
    },
    {
      value: 7,
      name: '发货员工',
      show: true
    },
    {
      value: 8,
      name: '渠道经理',
      show: true
    }
    ],
    role: ''
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
    optyuup () {
      if ((this.role == 1) || (this.role == 2) || (this.role == 3) || (this.role == '')) {
        this.$router.push('/noticeClause')
      } else if (this.role == 4) {
        this.$router.push('/noticeClause2')
      } else {
        this.$router.push('/noticeClause3')
      }
    },
    // 验证码
    phonet () {
      let url = 'UserInterface/UserRegeditCode.ashx'
      let userphone = this.phone
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!myreg.test(this.phone)) {
        this.$Toast('请输入格式正确的手机号')
        return
      }
      // const identify = this.$refs.identify;
      // if ((this.picodes === "") || (this.picodes != identify.code)) {
      // 	this.$Toast('图片验证码填写有误！');
      // 	return;
      // }
      let jmnum = this.$root.getjmw(this.phone)
      let datass = this.$root.$getCode(jmnum)
      if (this.isDown) {
        return
      }
      this.isDown = true
      let param = {
        'userphone': this.phone,
        'ucode': encodeURI(datass)
      }
      this.$post(url, param).then((data) => {
        this.$Toast(data.rspdesc)
        if (data.rspcode != 1) {

        }
      })
    },
    // 关闭
    // closere () {
    //   if (this.$route.query.form) {
    //     this.$router.back()
    //   } else {
    //     this.$router.push('/login')
    //   }
    // },
    agre () {
      this.agrn = !this.agrn
    },
    // 确定
    loginbtn () {
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      //				if (!myreg.test(this.rphone)) {
      //					this.$Toast('请输入格式正确的推荐人手机号');
      //					return;
      //				}
      if (!myreg.test(this.phone)) {
        this.$Toast('请输入格式正确的手机号')
        return
      }
      if (this.code == '') {
        this.$Toast('请输入验证码')
        return
      }
      // if (this.userpwd == '') {
      //   this.$Toast('请输入您的密码')
      //   return
      // }
      if (!this.agrn) {
        this.$Toast('请勾选阅读并同意用户注册协议')
        return
      }
      let url = 'UserInterface/UserRegedit.ashx'
      let param = {
        'rphone': this.rphone,
        'userphone': this.phone,
        'vercode': this.code,
        // 'userpwd': this.userpwd,
        'role': this.role,
        'openid': localStorage.openId
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc)
          return
        }
        // 存登录信息
        this.$Toast(data.rspdesc)
        if (this.$route.query.form) {
          this.$router.back()
        } else {
          // 患者端
          if (this.role == 1 || this.role == 2 || this.role == 3) {
            // 关注微信公众号
            this.$router.push('/wxFollowPage')
            // 医生端
          } else if (this.role == 4) {
            // 实名认证
            if ((data.doctorflag == '1') || (!data.doctorflag)) {
              location.href = `${DOCTORURL}#/physician1?UserKey=${data.userkey}&SessionId=${data.session_id}&parentPhone=${this.rphone}`
            }
            // 医师认证
            if (data.doctorflag == '2') {
              location.href = `${DOCTORURL}#/physician1?UserKey=${data.userkey}&SessionId=${data.session_id}&parentPhone=${this.rphone}`
            }
          } else if (this.role == 5 || this.role == 6 || this.role == 7 || this.role == 8) {
            // 渠道端
            location.href = `${CHANNELURL}#/wxFollowPage`
          }
        }
      })
    }
  },
  components: {
    identify
  },
  mounted: function () {
    const {rphone, role} = this.$route.query
    if (role) {
      this.rphone = rphone
      // 地区渠道商的手机号码
      // if((role == 5) && (rphone == "15523523851")){
      //   this.role = '5';
      //   this.roleList = this.roleList.filter(item => String(item.value) == "5")
      // }else{
      // 这个用户可以选择注册的角色
        let JurisdictionRole = this.roleMap['role' + role].split(',') 
        this.roleList = this.roleList.filter(item => JurisdictionRole.includes(String(item.value)))  // 显示用户可以选择注册的角色
        this.role = JurisdictionRole[0]
      // }
    }
  },
  beforeRouteEnter (to, from, next) {
		  next(vm => {
		    // 通过 `vm` 访问组件实例
		    if (from.name == null || from.name == 'noticeClause') {
		    	vm.$route.meta.keepAlive = true
		    }
		    vm.$route.meta.keepAlive = false
		  })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    let keepAlive = (to.name == 'noticeClause')
    this.$route.meta.keepAlive = keepAlive
    next()
  }
}
</script>

<style scoped lang="scss">
	.add_btn{
		background: rgb(36,183,192);
	}
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
		width: 100%;
		overflow: hidden;
		margin-top: 0.08rem;
		float: left;
		height: 0.45rem;
		border: 1px solid #eee;
		padding: 0 3%;
		border-radius: 0.25rem;
		box-sizing: border-box;
	}

	.login_inpt img {
		float: left;
		height: 0.21rem;
		width: 0.21rem;
		margin-right: 0.08rem;
		margin-top: 0.11rem;
	}

	.login_inpt input,
	.login_inpt select {
		width: 80%;
		height: 0.45rem;
		border: none;
		padding: 0 0.1rem;
		font-size: 0.14rem;
	}

	// .login_inpt li:nth-child(2) {
	// 	width: 58%;
	// }

	// .login_inpt li:nth-child(2) input {
	// 	width: 70%;
	// }
	.login_inpt .yzmcode {
		display: flex;
    align-items: center;
	}
  .login_inpt .yzmcode img{
    margin-top: 0;
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
