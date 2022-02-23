<template>
  <div>
    <!--<img class="close" @click="closere" src="@/assets/images/guanbi@2x.png" />-->
    <div class="login_ff">
      <div class="login_logo">
        <img v-lazy="logoImg" />
      </div>
      <ul class="login_inpt">
        <li>
          <p>+86</p>
          <input
            type="tel"
            v-model.trim="phone"
            @focus="$root.windowRecordScroll"
            @blur="$root.windowScrollTop"
            placeholder="手机号"
          />
        </li>
        <li class="yzmcode">
          <div class="input_warp">
            <input
              type="tel"
              v-model.trim="code"
              @focus="$root.windowRecordScroll"
              @blur="$root.windowScrollTop"
              placeholder="输入验证码"
            />
          </div>
          <span class="phonet" v-on:click="phonet()">
            <i v-if="isDown"> {{ time }}</i>
            <i v-else>{{ getCode }}</i>
          </span>
        </li>
        <li v-show="roleList.length > 1">
          <select
            name="role"
            v-model.trim="role"
            @focus="$root.windowRecordScroll"
            @blur="$root.windowScrollTop"
            style="appearance: menulist-button"
          >
            <option
              v-for="(item, index) in roleList"
              :value="item.value"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>
          <van-icon class="sel_play" name="arrow-down" />
        </li>
      </ul>
      <!-- <ul class="login_inpt"> -->

      <!-- <li>
					<img src="@/assets/images/zhanghao@2x.png" />
					<input type="tel" v-model.trim="phone" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入您的手机号" />
				</li> -->
      <!-- <li>
					<img src="@/assets/images/yanzhengma@2x.png" />
					<input type="tel" v-model.trim="picodes" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop"
					 placeholder="图片码的计算结果" />
				</li>
				<div class="verify-box text-center">
					<identify ref="identify" />
				</div> -->
      <!-- <li class="yzmcode">
					<img src="@/assets/images/yanzhengma@2x.png" />
					<input type="tel" v-model.trim="code" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入验证码" />
					<span v-on:click="phonet()">
						<i v-if="isDown"> {{time}}</i>
						<i v-else>{{getCode}}</i>
					</span>
				</li> -->
      <!-- <li>
					<img src="@/assets/images/mima@2x.png" />
					<input type="password" v-model.trim="userpwd" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop"
					 placeholder="请设置密码" />
				</li> -->
      <!-- <li style="display: none;">
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
			</p> -->
      <!--<p class="ets">温馨提示：点击图片更换图片验证码！</p>-->
      <!--<router-link to="/wx_Entrance/home">-->
      <mt-button
        type="default"
        class="add_btn"
        v-on:click="loginbtn()"
        size="large"
        >注册</mt-button
      >
      <!--</router-link>-->
      <div class="agreen">
        <van-popover
          class="popover_bom"
          v-model="showPopoverBom"
          theme="dark"
          placement="top-start"
          :close-on-click-outside="false"
          :actions="actions1"
        >
          <template #reference>
            <p class="qipao">请勾选同意</p>
          </template>
        </van-popover>
        <div class="conent">
          <div class="left_sec">
            <span v-if="agrn" class="axz" @click="agre"></span>
            <span v-else @click="agre"></span>
          </div>
          <div class="right_text">
            <p>
              阅读并同意<a
                @click="optyuup"
                style="color: #35c3d9; margin-left: 0.02rem"
                >【MCL服务】</a
              >用户协议
            </p>
            <p>未注册绑定的手机号验证成功后将自动注册</p>
          </div>
        </div>
        <!-- <span style="color:#333;">未注册绑定的手机号验证成功后将自动注册</span> -->
        <!-- 未注册绑定的手机号验证成功后将自动注册 -->
      </div>
    </div>
  </div>
</template>

<script>
import { DOCTORURL, CHANNELURL } from "@/configURL.js";
import identify from "@/components/common/identify.vue";
import logoImg from "@/assets/images/login/ecare-logo1.png";
import { setZphone, getRhone } from "@/utils/storage.js";
export default {
  name: "register",
  data: () => ({
    rphone: "",
    phone: "",
    code: "",
    // userpwd: '',
    getCode: "获取验证码",
    VerificationCode: 60,
    isDown: false,
    logoImg: logoImg,
    picodes: "",
    agrn: false,
    showPopoverBom: false,
    // 患者分享给 患者
    // 医生分享给 患者和医生
    // 渠道分享给 医生，渠道，
    roleMap: {
      // role0: '1,2',
      role1: "1,4",
      role2: "1,4",
      role3: "1,4",
      role4: "1,4",
      role5: "1,4",
      role6: "1,4",
      role7: "1,4",
      role9: "1,4",
    },
    roleList: [
      {
        value: 1,
        name: "患者",
        show: true,
      },

      {
        value: 4,
        name: "医生",
        show: true,
      },
    ],
    role: 1,
    actions1: [{ text: "请勾选同意" }],
  }),
 watch: {
    agrn: function (newVal, oldVal) {
      if (newVal == true) {
        this.showPopoverBom = false;
      }
    },
  },
 computed: {
    time: function () {
      setTimeout(() => {
        if (this.VerificationCode <= 0) {
          this.isDown = false;
          this.VerificationCode = 60;
          return;
        }
        this.VerificationCode--;
      }, 1000);
      return `${this.VerificationCode}s后发送`;
    },
  },
  methods: {
    optyuup() {
      if (
        this.role == 1 ||
        this.role == 2 ||
        this.role == 3 ||
        this.role == ""
      ) {
        this.$router.push("/noticeClause");
      } else if (this.role == 4) {
        this.$router.push("/noticeClause2");
      } else {
        this.$router.push("/noticeClause3");
      }
    },
    // 验证码
    phonet() {
      let url = "UserInterface/UserRegeditCode.ashx";
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.phone)) {
        this.$Toast("请输入格式正确的手机号");
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
        userphone: this.phone,
        ucode: encodeURI(datass),
      };
      this.$post(url, param).then((data) => {
        this.$Toast(data.rspdesc);
        if (data.rspcode != 1) {
        }
      });
    },
    // 关闭
    // closere () {
    //   if (this.$route.query.form) {
    //     this.$router.back()
    //   } else {
    //     this.$router.push('/login')
    //   }
    // },
    agre() {
      this.agrn = !this.agrn;
    },
    // 注册
    loginbtn() {
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      //				if (!myreg.test(this.rphone)) {
      //					this.$Toast('请输入格式正确的推荐人手机号');
      //					return;
      //				}
      if (!myreg.test(this.phone)) {
        this.$Toast("请输入格式正确的手机号");
        return;
      }
      if (this.code == "") {
        this.$Toast("请输入验证码");
        return;
      }
      // if (this.userpwd == '') {
      //   this.$Toast('请输入您的密码')
      //   return
      // }
      // if (!this.agrn) {
      //   this.$Toast("请勾选阅读并同意用户注册协议");
      //   return;
      // }
      if (this.agrn == false) {
        this.showPopoverBom = true;
        return;
      } else {
        this.showPopoverBom = false;
      }
      let url = "UserInterface/UserRegedit.ashx";
      let param = {
        rphone: this.rphone,
        userphone: this.phone,
        vercode: this.code,
        // 'userpwd': this.userpwd,
        role: this.role,
        openid: localStorage.openId,
      };
      if (getRhone()) {
        param.rphone = getRhone();
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc);
          return;
        }
        // 存登录信息
        this.$Toast(data.rspdesc);
        if (this.$route.query.form) {
          this.$router.back();
        } else {
          // 存用户手机
          setZphone(this.phone);
          // 将推荐人手机号清空
          localStorage.setItem("hphone", "");
          // 患者端
          if (this.role == 1 || this.role == 2 || this.role == 3) {
            this.saveLoginInfo(data); // 存登录信息
            const redirect = this.$route.query.redirect;
            if (redirect) {
              this.$router.replace(redirect); // 通过分享来 返回分享页面
            } else {
              // 通过好友邀请进来 微信公众号首页
              location.href =
                "http://cli.marryhealthscience.com/patient/index.html#/wx_Entrance/home";
            }

            // 医生端
          } else if (this.role == 4) {
            // 实名认证
            if (data.doctorflag == "1" || !data.doctorflag) {
              location.href = `${DOCTORURL}#/wxFollowPage`;
            }
            // 医师认证
            if (data.doctorflag == "2") {
              location.href = `${DOCTORURL}#/wxFollowPage`;
            }
          } else if (
            this.role == 5 ||
            this.role == 6 ||
            this.role == 7 ||
            this.role == 8
          ) {
            // 渠道端
            location.href = `${CHANNELURL}#/wxFollowPage`;
          }
        }
      });
    },
    saveLoginInfo(data) {
      // 存登录信息
      localStorage.userInfo = JSON.stringify({
        UserKey: data.userkey,
        SessionId: data.session_id,
        userType: data.userType,
      });
    },
  },
  components: {
    identify,
  },
  mounted: function () {
    // if (role) {
    // if(this.$route.query.doctorPhone) {
    //  this.rphone =  this.$route.query.doctorPhone
    //  return
    // }
    const { rphone, role } = this.$route.query;
    this.rphone = rphone;
    // 地区渠道商的手机号码
    // if((role == 5) && (rphone == "15523523851")){
    //   this.role = '5';
    //   this.roleList = this.roleList.filter(item => String(item.value) == "5")
    // }else{
    // 这个用户可以选择注册的角色
    let JurisdictionRole = this.roleMap["role" + role].split(",");

    this.roleList = this.roleList.filter((item) =>
      JurisdictionRole.includes(String(item.value))
    ); // 显示用户可以选择注册的角色
    this.role = JurisdictionRole[0];
    // }
    // }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      if (from.name == null || from.name == "noticeClause") {
        vm.$route.meta.keepAlive = true;
      }
      vm.$route.meta.keepAlive = false;
    });
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    let keepAlive = to.name == "noticeClause";
    this.$route.meta.keepAlive = keepAlive;
    next();
  },
};
</script>

<style scoped lang="scss">
.login_ff {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/login/login-bgc.png") no-repeat 0 0;
  background-size: cover;
  // background: linear-gradient(to bottom, #21b6cf, #2166ce);
}

.login_logo {
  text-align: center;
  padding: 0.5rem 0 0.3rem 0;
}

.login_logo img {
  height: 0.8rem;
}

.login_inpt {
  width: 88%;
  margin: 0 auto;
}

.login_inpt li {
  width: 94%;
  overflow: hidden;
  margin-bottom: 0.18rem;
  height: 0.5rem;
  border-bottom: 1px solid #ccc;
  padding: 0 3%;
}
.login_inpt li:first-child {
  display: flex;
  p {
    line-height: 0.5rem;
    width: 0.5rem;
    font-size: 0.14rem;
  }
}

.login_inpt li:nth-child(2) {
  position: relative;
  .question {
    position: absolute;
    left: 0.95rem;
    top: 0.17rem;
  }
  .popover {
    position: absolute;
    width: 0.2rem;
    height: 0.2rem;
    z-index: 1;
    left: 0.87rem;
    top: 0.15rem;
  }
}
.login_inpt li:nth-child(3) {
  position: relative;
  // display: flex;
  select{
    width: 100%;
  line-height: 0.5rem;
  font-size: 0.14rem;
  appearance: none !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
}
.sel_play {
  position: absolute;
  top: 0.15rem;
  right: 0.1rem;
  color: #7d7f83;
}
}
body .van-popover--dark .van-popover__content {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.qipao {
  padding: 0.05rem 0.1rem;
  font-size: 0.1rem;
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
  color: #333;
}
.login_inpt input::placeholder {
  font-size: 0.16rem;
  color: #7d7f83;
}
.login_inpt .phonet {
  width: 1rem;
  height: 0.3rem;
  border: 1px solid #24b7c0;
  box-sizing: border-box;
  display: block;
  float: right;
  line-height: 0.3rem;
  color: #24b7c0;
  text-align: center;
  font-size: 0.14rem;
  border-radius: 0.04rem;

  i {
    font-style: normal;
  }
}

.add_btn {
  width: 88%;
  color: #fff;
  background: #24b7c0;
  border-radius: 0.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: 0 auto;
  font-size: 0.16rem;
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.1);
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
  color: #ff3d3d;
}

.agreen {
  position: absolute;
  bottom: 0.4rem;
  left: 50%;
  // right: 0;
  margin-left: -1.75rem;
  width: 3.5rem;
  font-size: 0.12rem;
  display: flex;
  justify-content: center;
  // padding-left: 0.2rem;
  color: #666;
  height: 0.4rem;
  line-height: 0.32rem;
  .conent {
    display: flex;
    p {
      line-height: 0.2rem;
      margin-left: 0.05rem;
    }
    //
    .right_text p:first-child {
      color: #7d7f83;
    }
    .left_sec {
      display: flex;
      align-items: center;
    }
    
  }
  .popover_bom {
      position: absolute;
      left: 0.4rem !important;
      top: 0;
    }
  .conent span {
    width: 0.3rem;
    height: 0.3rem;
    display: block;
    background: url("../../assets/images/select@2x.png") no-repeat center center;
    background-size: 0.16rem;
    // float: left;
    &.axz {
      background: url("../../assets/images/select_click@2x.png") no-repeat
        center center;
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

.togglePassword {
  width: 88%;
  margin: 0 auto;
  margin-top: 0.25rem;
  color: #7d7f83;
  text-align: center;
}

.page-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  // margin-left: 15%;
  text-align: center;
  color: #fff;
}
.page-footer::after {
  content: "";
  display: inline-block;
  width: 30%;
  height: 1px;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
}

.page-footer img {
  width: 96%;
}
</style>
