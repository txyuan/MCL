<template>
  <div>
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
        <li v-if="toggle" class="yzmcode">
          <div class="input_warp">
            <input
              type="tel"
              autocomplete="off"
              maxlength="4"
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
        <li v-else>
          <input
            type="password"
            v-model.trim="userpassword"
            @focus="$root.windowRecordScroll"
            @blur="$root.windowScrollTop"
            @input="inputData"
            placeholder="输入密码"
          />
          <van-icon v-show="passwordBtn" class="question" name="question-o" />
          
          <van-popover
            placement="bottom-start"
            class="popover"
            v-show="passwordBtn"
            v-model="showPopover"
            theme="dark"
            trigger="click"
            :actions="actions"
          >
            <template #reference>
              <p class="qipao">默认密码123456</p>
              <!-- <van-icon name="question-o" /> -->
            </template>
          </van-popover>
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
      <mt-button
        type="default"
        class="add_btn"
        v-on:click="loginbtn()"
        size="large"
        >注册/登录</mt-button
      >
      <!-- <mt-button
        type="default"
        class="add_btn"
        v-on:click="registbtn()"
        size="large"
        style="margin-top: 0.1rem"
        >注册</mt-button
      > -->
      <!--</router-link>-->

      <p class="togglePassword" @click="toggle = !toggle">
        <span v-if="toggle">密码登录</span>
        <span v-else>手机验证码注册/登录</span>
      </p>

      <!-- <div class="page-footer"> -->

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
            <!-- <p class="qipao"></p> -->
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
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
// import { DOCTORURL, CHANNELURL } from '@/configURL.js'
// import { getUserType } from '@/assets/js/uesr.js' //用户类型
import logoImg from "@/assets/images/login/ecare-logo1.png";
import { getRhone, removeRhone, setZphone } from "@/utils/storage.js";

export default {
  name: "index",
  data: () => ({
    phone: "",
    code: "",
    passwordBtn: true,
    userpassword: "",
    toggle: true, // true: 验证码登录, false: 密码登录
    agrn: false,
    logoImg: logoImg,
    getCode: "获取验证码",
    VerificationCode: 60,
    isDown: false,
    hphone: "",
    showPopover: false,
    showPopoverBom: false,
    agrn: false,
    actions: [{ text: "默认密码123456" }],
    actions1: [{ text: "请勾选同意" }],

  }),
  watch: {
    agrn: function (newVal, oldVal) {
      if (newVal == true) {
        this.showPopoverBom = false;
      }
    },
    // showPopover: function (newVal, oldVal) {
    //   if (newVal == true) {
    //     this.$nextTick(() => {
    //        let popover__action = document.querySelector('.van-popover__action')
    //        popover__action.style.width = '1.8rem'
    //        popover__action.style.height = '0.3rem'
    //   })
    //   }
    // },

    // showPopoverBom: function (newVal, oldVal) {
    //   console.log(newVal);
    //   if(newVal == true) {
    //      this.$nextTick(() => {
    //        let popover__action = document.querySelector('.van-popover__action')
    //        popover__action.style.width = '1.1rem'
    //        popover__action.style.height = '0.3rem'
    //   })
    //   }
    
    // },
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
  created() {
    this.getRphone();
    
  },
  methods: {
    // 获取推荐人手机号
    getRphone() {
     
      var str = this.$router.history.current.query.redirect;
      var reg = RegExp(/rphone/);
      var reg1 = RegExp(/doctorPhone/);
      if (str.match(reg)) {
        str = str.match(/rphone=(\S*)/)[1];
        if (str != null) {
          this.hphone = str;
        }
      } else if (str.match(reg1)) {
        str = str.match(/doctorPhone=(\S*)/)[1];
        if (str != null) {
          this.hphone = str;
        }
      }
    },
    optyuup() {
      // if ((this.role == 1) || (this.role == 2) || (this.role == 3) || (this.role == '')) {
      this.$router.push("/noticeClause");
      // } else if (this.role == 4) {
      // this.$router.push('/noticeClause2')
      // } else {
      // this.$router.push('/noticeClause3')
      // }
    },
    agre() {
      this.agrn = !this.agrn;
    },
    inputData() {
      if (this.userpassword == "") {
        this.passwordBtn = true;
      } else {
        this.passwordBtn = false;
      }
    },
    // 验证码
    phonet() {
      let url = "UserInterface/UserRegeditCode.ashx";
      let userphone = this.phone;
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.phone)) {
        this.$Toast("请输入格式正确的手机号");
        return;
      }
      let jmnum = this.$root.getjmw(userphone);
      let datass = this.$root.$getCode(jmnum);
      if (this.isDown) {
        return;
      }
      this.isDown = true;
      let param = {
        userphone: userphone,
        ucode: encodeURI(datass).replace(/\+/g, "%2B"),
      };
      this.$post(url, param).then((data) => {
        this.$Toast(data.rspdesc);
        if (data.rspcode != 1) {
          return;
        }
      });
    },
    // 注册
    // registbtn() {
    //   // 判断通过分享来的注册 返回路由不携带推荐人手机号
    //   let redirect = this.$route.query.redirect;
    //   var reg = RegExp(/rphone=/);
    //   var reg1 = RegExp(/doctorPhone=/);
    //   let res_redirect;
    //   if (redirect.match(reg)) {
    //     let ipos = redirect.indexOf("rphone=");
    //     res_redirect = redirect.substring(0, ipos);
    //   } else if (redirect.match(reg1)) {
    //     let ipos = redirect.indexOf("doctorPhone=");
    //     res_redirect = redirect.substring(0, ipos);
    //   } else {
    //     res_redirect = redirect;
    //   }
    //   // 注册页面携带推荐人手机号
    //   let hphone = localStorage.getItem("hphone");
    //   if (hphone) {
    //     if (redirect) {
    //       this.$router.push(
    //         `/termsService?redirect=${res_redirect}&rphone=${hphone}`
    //       );
    //     } else {
    //       this.$router.push(`/termsService?rphone=${hphone}`);
    //     }
    //   } else {
    //     if (redirect) {
    //       this.$router.push(
    //         `/termsService?redirect=${res_redirect}&rphone=${this.hphone}`
    //       );
    //     } else {
    //       this.$router.push(`/termsService?rphone=${this.hphone}`);
    //     }
    //   }
    // },
    // 登录
    loginbtn() {
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.phone)) {
        this.$Toast("请输入格式正确的手机号");
        return;
      }

      let param = {};
      const userphone = this.phone,
        openid = localStorage.openId;

      // 验证码登录
      if (this.toggle) {
        if (this.code == "") {
          this.$Toast("请输入验证码");
          return;
        }
        param = {
          userphone,
          openid,
          vercode: this.code,
        };
      } else {
        // 手机密码登录
        if (this.userpassword == "") {
          this.$Toast("请输入登录密码");
          return;
        }
        param = {
          userphone,
          openid,
          userpassword: this.userpassword,
        };
      }
      if (this.agrn == false) {
        this.showPopoverBom = true;
        return;
      } else {
        this.showPopoverBom = false;
      }
      // 注册页面携带推荐人手机号
      let hphone = localStorage.getItem("hphone");
      let redirect = this.$route.query.redirect;
      // 通过扫码进入商城，在登录时候，传标识字段
      if (getRhone()) {
        param.rphone = getRhone();
      } else if (hphone) {
        param.rphone = hphone;
      } else if (redirect) {
        var reg = RegExp(/rphone=/);
        var reg1 = RegExp(/doctorPhone=/);
        if (redirect.match(reg)) {
          param.rphone = this.hphone;
        } else if (redirect.match(reg1)) {
          param.rphone = this.hphone;
        }
      }
      let url = "UserInterface/UserLogin.ashx";
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc);
          return;
        }
        // 患者端
        const roles = ["1", "2", "3", "4", "5", "6"]; // 允许登录的角色。患者，患者家人，路人，医生, 渠道端
        if (roles.includes(String(data.data.userType))) {
          // 存登录信息
          this.saveLoginInfo(data.data);
          // 存用户手机
          setZphone(this.phone);
          // 将注册时需要的推荐人手机号清空
          localStorage.setItem("hphone", "");
          const redirect = this.$route.query.redirect;
          this.$Toast("登录成功");
          // const userinfoflag = data.data.userinfoflag; // 1:线下，2：线上
          // if (userinfoflag == 0) {
          //   this.$router.replace("/wellcome_personInfoRegister");
          //   return;
          // }
          if (redirect) {
            // 判断通过分享来的登录 返回路由不携带推荐人手机号
            // var reg = RegExp(/rphone=/);
            // if (redirect.match(reg)) {
            //   let ipos = redirect.indexOf("rphone=");
            //   let res_redirect = redirect.substring(0, ipos);
            //   this.$router.replace(res_redirect);
            // } else {
            //   this.$router.replace(redirect);
            // }
            if(redirect == '/wellcome_personInfo') {
              this.$router.replace('/personInfo1');
            }else {
              this.$router.replace(redirect);
            }
            // 报告查询页面
            // if (redirect == '/eyeconme') {
            // 	this.$router.replace('/wellcome?redirect=/eyeconme')
            // } else {
            // this.$router.replace(redirect)
            // }
          } else {
            this.$router.replace("/wx_Entrance/home");
          }
        } else {
          this.$Toast("该账号权限不匹配");
        }
      });
    },
    saveLoginInfo(data) {
      // 存登录信息
      localStorage.userInfo = JSON.stringify({
        UserKey: data.userKey,
        SessionId: data.sessionId,
        userType: data.userType,
      });
      // 清空sessionStorage
      removeRhone();
    },
  },
  mounted: function () {
    // document.querySelector('.van-popover__action')
    console.log(document.querySelector('.van-popover__action'));
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
body .van-popover--dark .van-popover__content {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
/deep/ .van-popover__action {
  width: 0 !important;
  height: 0 !important;
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
