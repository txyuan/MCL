<template>
  <div class="home padding-footer">
    <div class="title_info">
      <div class="infoPhoto">
        <img :src="imgUrl" alt="" />
        <h3>你好, {{name}}</h3>
      </div>

      <img
        @click="kefu"
        class="kefu"
        src="@/assets/images/home/kefuNew.png"
        alt=""
      />
    </div>
    <div class="content_top">
      <div class="energy">
        <p></p>
        <p @click="$router.push('/gauge_main')">查看详情</p>
      </div>
      <div class="echarts" @click="$router.push('/gauge_main')">
        <div class="echarts_left"></div>
        <div class="echarts_right">
          <span>体重</span>
          <span>饮食</span>
          <span>营养</span>
          <span>体力</span>
          <span>心理</span>
          <div class="san1">
            <div class="f1"></div>
            <div class="f2"></div>
            <div class="f3"></div>
            <div class="f4"></div>
            <div class="f5"></div>
          </div>
          <div class="san2">
            <div class="f1"></div>
            <div class="f2"></div>
            <div class="f3"></div>
            <div class="f4"></div>
            <div class="f5"></div>
          </div>
          <div class="san3">
            <div class="f1"></div>
            <div class="f2"></div>
            <div class="f3"></div>
            <div class="f4"></div>
            <div class="f5"></div>
          </div>
          <div class="san4">
            <div class="f1"></div>
            <div class="f2"></div>
            <div class="f3"></div>
            <div class="f4"></div>
            <div class="f5"></div>
          </div>
          <div class="san5">
            <div class="f1"></div>
            <div class="f2"></div>
            <div class="f3"></div>
            <div class="f4"></div>
            <div class="f5"></div>
          </div>
        </div>
      </div>
      <div class="topTab">
        <van-swipe class="my-swipe" :loop="false" indicator-color="white">
          <van-swipe-item>
            <div class="items">
              <div @click="$router.push('/physician')">
                <p><img src="@/assets/images/home/bingli.png" alt="" /></p>
                <p><span>病历上传</span></p>
              </div>
              <div @click="$router.push('/symptom1')">
                <p>
                  <img src="@/assets/images/home/zhengzhuangNew.png" alt="" />
                </p>
                <p><span>症状管理</span></p>
              </div>
              <div @click="$router.push('/medicatRecord')">
                <p><img src="@/assets/images/home/yongyao.png" alt="" /></p>
                <p><span>用药调查</span></p>
              </div>
              <div @click="$router.push('/personalnutrition')">
                <p><img src="@/assets/images/home/shaicha.png" alt="" /></p>
                <p><span>筛查评估</span></p>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="items">
              <div @click="$router.push('/dietRecord1')">
                <p><img src="@/assets/images/home/yinshi.png" alt="" /></p>
                <p><span>饮食监测</span></p>
              </div>
              <div @click="$router.push('/weightGauge1')">
                <p><img src="@/assets/images/home/tizhong.png" alt="" /></p>
                <p><span>体重监测</span></p>
              </div>
              <div @click="$router.push('/physicalGauge1')">
                <p><img src="@/assets/images/home/tili.png" alt="" /></p>
                <p><span>体力评估</span></p>
              </div>
              <div @click="$router.push('/psychology1')">
                <p><img src="@/assets/images/home/xinli.png" alt="" /></p>
                <p><span>心理评估</span></p>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="bar"></div>
    <div class="content_bet"></div>
    <div class="content_bottom">
      <div class="bot_title">
        <h3>常用工具</h3>
        <van-swipe class="my-swipe" :loop="false" indicator-color="white">
          <van-swipe-item>
            <div class="items">
              <div @click="$router.push('/healthydan')">
                <span>健康档案</span>
              </div>
              <div>
                <span>综合报告</span>
              </div>
              <div @click="$router.push('/impactAsses')">
                <span>效果评价</span>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="items">
              <div @click="$router.push('/review')">
                <span>复诊预约</span>
              </div>
              <div @click="$router.push('/otherfoodOnly')">
                <span>食物查询</span>
              </div>
              <div></div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div @click="kefu" class="stickKefu">
      <img src="@/assets/images/home/kefuGig.png" alt="" />
    </div>
    <!-- 首页的广告部分 -->
    <transition name="fade">
      <div class="advertisement" v-if="show">
        <div class="countDown" @click="skipAdvertisement">{{ count }}s跳过</div>
        <div class="view">
          <img src="@/assets/images/home/advertisementNew.png" alt="" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { logout } from "@/assets/js/uesr.js";
import { getWechatParm } from "@/api/wx";
//系统logo
import logoImg from "@/assets/images/mclogo.png";
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js";
remoteJs("https://res.wx.qq.com/open/js/jweixin-1.1.0.js");

import { getZphone } from "@/utils/storage.js";

export default {
  name: "",
  data() {
    return {
      count: 4,
      show: false,
      timer: 0, // 计时器
      rphone: "", // 用户手机号
      WechatParm: {}, //公众号信息
      shareObj: {
        //分享信息内容配置
        title: "MCL",
        desc: "我在医随康分享了MCL首页，赶快来看看吧。", // 分享描述
        link: `${location.origin}${location.pathname}#${
          this.$route.fullPath
        }?rphone=${getZphone()}`, //系统地址
        imgUrl: location.origin + logoImg,
      },
      san1: "0",
      san2: "0",
      san3: "0",
      san4: "0",
      san5: "0",
      name : '',
      imgUrl : ''
    };
  },
  methods: {
    	// 个人信息
	informations () {
	  let url = 'UserInterface/GetUserShowInfo.ashx'
	  this.$post(url).then((data) => {
      this.name = data.data.Nickname
      this.imgUrl = data.data.ImgUrl
	  })
	},
    // 获取量表信息
    getGaugeData() {
      let url = "UserInterface/PatientHomeScaleInfo.ashx";
      this.$post(url).then((res) => {
        // 饮食
        this.san4 = res.diet;
        // 心理
        if (res.psychology) {
          if (res.psychology > 21) {
            this.san1 = "0";
          } else if (res.psychology >= 15 && res.psychology <= 21) {
            this.san1 = "2";
          } else if (res.psychology >= 11 && res.psychology <= 14) {
            this.san1 = "3";
          } else if (res.psychology >= 8 && res.psychology <= 10) {
            this.san1 = "4";
          } else if (res.psychology >= 0 && res.psychology <= 7) {
            this.san1 = "5";
          }
        } else {
          this.san1 = "0";
        }
        // 营养
        if (res.pgsga != "") {
          
          if (res.pgsga >= 9) {
            this.san2 = "1";
          } else if (res.pgsga >= 4 && res.pgsga <= 8) {
            this.san2 = "2";
          } else if (res.pgsga >= 2 && res.pgsga <= 3) {
            this.san2 = "3";
          } else if (res.pgsga >= 0 && res.pgsga <= 1) {
            this.san2 = "5";
          }
        } else {
          this.san2 = "0";
        }
        // 体重
        if (res.weight) {
          if (res.weight >= 28|| res.weight < 16) {
            this.san3 = "1";
          } else if (res.weight >= 16 && res.weight <= 17.4) {
            this.san3 = "2";
          } else if (res.weight >= 17.5 && res.weight <= 18.4) {
            this.san3 = "3";
          } else if (res.weight >= 24 && res.weight <= 27.9) {
            this.san3 = "4";
          } else if (res.weight >= 18.5 && res.weight <= 23.9) {
            this.san3 = "5";
          }
        } else {
          this.san3 = "0";
        }
        // 体力
        if (res.pks) {
          if (res.pks >= 28|| res.pks < 16) {
            this.san5 = "1";
          } else if (res.pks >= 16 && res.pks <= 17.4) {
            this.san5 = "2";
          } else if (res.pks >= 17.5 && res.pks <= 18.4) {
            this.san5 = "3";
          } else if (res.pks >= 24 && res.pks <= 27.9) {
            this.san5 = "4";
          } else if (res.pks >= 18.5 && res.pks <= 23.9) {
            this.san5 = "5";
          }
        } else {
          this.san5 = "0";
        }
        this.$nextTick(() => {
          this.getInfo();
        });
      });
    },
    // 雷达图
    getInfo() {
      if (this.san1) {
        let sanjiao = document.querySelector(".san1");
        if (this.san1 < 3) {
          for (var i = 0; i < this.san1; i++) {
            sanjiao.children[i].className = "san_red";
          }
        } else if (this.san1 >= 3 && this.san1 <= 4) {
          for (var i = 0; i < this.san1; i++) {
            sanjiao.children[i].className = "san_yellow";
          }
        } else {
          for (var i = 0; i < this.san1; i++) {
            sanjiao.children[i].className = "san_green";
          }
        }
      }
      if (this.san2) {
        let sanjiao = document.querySelector(".san2");
        if (this.san2 < 3) {
          for (var i = 0; i < this.san2; i++) {
            sanjiao.children[i].className = "san_red";
          }
        } else if (this.san2 >= 3 && this.san2 <= 4) {
          for (var i = 0; i < this.san2; i++) {
            sanjiao.children[i].className = "san_yellow";
          }
        } else {
          for (var i = 0; i < this.san2; i++) {
            sanjiao.children[i].className = "san_green";
          }
        }
      }
      if (this.san3) {
        let sanjiao = document.querySelector(".san3");
        if (this.san3 < 3) {
          for (var i = 0; i < this.san3; i++) {
            sanjiao.children[i].className = "san_red";
          }
        } else if (this.san3 >= 3 && this.san3 <= 4) {
          for (var i = 0; i < this.san3; i++) {
            sanjiao.children[i].className = "san_yellow";
          }
        } else {
          for (var i = 0; i < this.san3; i++) {
            sanjiao.children[i].className = "san_green";
          }
        }
      }
      if (this.san4) {
        let sanjiao = document.querySelector(".san4");
        if (this.san4 < 3) {
          for (var i = 0; i < this.san4; i++) {
            sanjiao.children[i].className = "san_red";
          }
        } else if (this.san4 >= 3 && this.san4 <= 4) {
          for (var i = 0; i < this.san4; i++) {
            sanjiao.children[i].className = "san_yellow";
          }
        } else {
          for (var i = 0; i < this.san4; i++) {
            sanjiao.children[i].className = "san_green";
          }
        }
      }
      if (this.san5) {
        let sanjiao = document.querySelector(".san5");
        if (this.san5 < 3) {
          for (var i = 0; i < this.san5; i++) {
            sanjiao.children[i].className = "san_red";
          }
        } else if (this.san5 >= 3 && this.san5 <= 4) {
          for (var i = 0; i < this.san5; i++) {
            sanjiao.children[i].className = "san_yellow";
          }
        } else {
          for (var i = 0; i < this.san5; i++) {
            sanjiao.children[i].className = "san_green";
          }
        }
      }
    },

    // 微信配置
    async getWechatParm() {
      const data = await getWechatParm();
      this.WechatParm = data.WechatParm;
      this.wxConfig(); // 微信配置
      this.wxRead(); // 微信read回调
    },

    async kefu() {
      if (!localStorage.userInfo) {
        logout("/wx_Entrance/home");
        return;
      }
      window.location.href =
        "https://work.weixin.qq.com/kfid/kfc349d1845c90759d4";
      // 请完善个人信息
      // const data = await getUserInfo();
      // const type_disease = data.data.type_disease
      // if(type_disease == null){
      // this.$MessageBox.alert('请完善个人信息').then(action => {
      // this.$router.replace("/wellcome_personInfoRegister")
      //  })

      // }else {
      //   window.location.href = 'https://work.weixin.qq.com/kfid/kfc349d1845c90759d4'
      // }
    },

    // 显示广告
    showAdvertisement() {
      if (!sessionStorage.getItem("advertisement")) {
        this.show = true;
        sessionStorage.setItem("advertisement", "是否显示广告标识");
        // 开始倒计时
        this.timer = setInterval(() => {
          if (this.count <= 0) {
            this.show = false;
            return;
          }
          this.count--;
        }, 1000);
      }
    },
    // 跳过广告
    skipAdvertisement() {
      clearInterval(this.timer);
      this.show = false;
    },
    //微信配置
    wxConfig() {
      let WechatParm = this.WechatParm;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: WechatParm.AppId, // 必填，公众号的唯一标识
        timestamp: WechatParm.Timestamp, // 必填，生成签名的时间戳
        nonceStr: WechatParm.NonceStr, // 必填，生成签名的随机串
        signature: WechatParm.Signature, // 必填，签名，
        jsApiList: [
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
        ],
      });
    },
    //微信read回调
    wxRead() {
      wx.ready(() => {
        this.ShareTimeline();
        this.ShareAppMessage();
        this.ShareQQ();
        this.ShareWeibo();
      });
    },
    // 2.3 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    ShareTimeline() {
      wx.onMenuShareTimeline(this.shareObj);
    },
    // 2.3 监听“分享给朋友”按钮点击、自定义分享内容及分享结果接口
    ShareAppMessage() {
      wx.onMenuShareAppMessage(this.shareObj);
    },
    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    ShareQQ() {
      wx.onMenuShareQQ(this.shareObj);
    },
    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    ShareWeibo() {
      wx.onMenuShareWeibo(this.shareObj);
    },
  },
  created() {
    this.informations ()
    this.getGaugeData();
    this.showAdvertisement();
    this.getWechatParm();

    if (this.$route.query.rphone) {
      localStorage.setItem("hphone", this.$route.query.rphone);
    }
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: url("../../assets/images/home/homeTop.png") no-repeat;
  background-size: 4rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0.22rem 0.18rem;
  padding-bottom: 0.7rem;
  .title_info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .infoPhoto {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        margin-left: 0.12rem;
        font-weight: 500;
      }
      img {
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
      }
    }
    h3 {
      font-size: 0.18rem;
      color: #fff;
    }
    .kefu {
      width: 0.22rem;
      height: 0.22rem;
      border-radius: 50%;
    }
  }
  >>> .van-swipe__indicator {
    background-color: #dcdcdc !important;
  }
  >>> .van-swipe__indicator--active {
    background-color: #36c2d9 !important;
  }

  .content_top {
    position: relative;
    margin-top: 0.12rem;
    padding: 0.13rem 0.1rem 0 0.17rem;
    background-color: #fff;
    border-radius: 0.08rem;
    width: 100%;
    min-height: 2.84rem;
    box-sizing: border-box;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);

    .energy {
      display: flex;
      justify-content: space-between;

      p:nth-child(2) {
        width: 0.7rem;
        height: 0.24rem;
        line-height: 0.24rem;
        text-align: center;
        font-size: 0.14rem;
        background-image: linear-gradient(to right, #1edbcd, #00ceb9);
        color: #fff;
        border-radius: 0.12rem;
      }
    }

    .echarts {
      display: flex;
      justify-content: space-between;

      .echarts_left {
        width: 50%;
      }
      .echarts_right {
        position: relative;
        width: 50%;
        height: 1.2rem;
        margin-top: 0.1rem;

        span {
          position: absolute;
          color: #666;
          font-size: 0.12rem;
        }
        span:nth-child(1) {
          left: 0.2rem;
          top: 0.2rem;
        }
        span:nth-child(2) {
          right: 0.1rem;
          top: 0.2rem;
        }
        span:nth-child(3) {
          left: 0.09rem;
          top: 0.6rem;
        }
        span:nth-child(4) {
          right: 0;
          top: 0.6rem;
        }
        span:nth-child(5) {
          right: 40%;
          bottom: -0.05rem;
        }
      }
      .san1 {
        position: absolute;
        left: 30%;
        top: 55%;
        width: 0.726rem;
        height: 0.42rem;
        clip-path: polygon(50% 0, 8.5% 100%, 91.5% 100%);
        box-sizing: border-box;
        // border: 0.2px solid #fff;
        div {
          width: 0.726rem;
          height: 0.075rem;
          background-color: #f5f5f5;
          margin-bottom: 0.01rem;
        }
      }
      .san2 {
        transform: rotate(72deg);
        transform-origin: 50% -0.005rem;
        position: absolute;
        left: 30%;
        top: 55%;
        width: 0.726rem;
        height: 0.42rem;
        clip-path: polygon(50% 0, 8.5% 100%, 91.5% 100%);
        box-sizing: border-box;
        div {
          width: 0.726rem;
          height: 0.075rem;
          background-color: #f5f5f5;
          margin-bottom: 0.01rem;
        }
      }
      .san3 {
        transform: rotate(144deg);
        // transform-origin: center top;
        transform-origin: 50% -0.005rem;
        position: absolute;
        left: 30%;
        top: 55%;
        width: 0.726rem;
        height: 0.42rem;
        clip-path: polygon(50% 0, 8.5% 100%, 91.5% 100%);
        box-sizing: border-box;
        div {
          width: 0.726rem;
          height: 0.075rem;
          background-color: #f5f5f5;
          margin-bottom: 0.01rem;
        }
      }
      .san4 {
        transform: rotate(216deg);
        // transform-origin: center top;
        transform-origin: 50% -0.005rem;
        position: absolute;
        left: 30%;
        top: 55%;
        width: 0.726rem;
        height: 0.42rem;
        clip-path: polygon(50% 0, 8.5% 100%, 91.5% 100%);
        box-sizing: border-box;
        div {
          width: 0.726rem;
          height: 0.075rem;
          background-color: #f5f5f5;
          margin-bottom: 0.01rem;
        }
      }
      .san5 {
        transform: rotate(288deg);
        // transform-origin: center top;
        transform-origin: 50% -0.005rem;
        position: absolute;
        left: 30%;
        top: 55%;
        width: 0.726rem;
        height: 0.42rem;
        clip-path: polygon(50% 0, 8.5% 100%, 91.5% 100%);
        box-sizing: border-box;
        div {
          width: 0.726rem;
          height: 0.075rem;
          background-color: #f5f5f5;
          margin-bottom: 0.01rem;
        }
      }
      .san_red {
        background-color: #fc605b !important;
      }
      .san_yellow {
        background-color: #fec543 !important;
      }
      .san_green {
        background-color: #41d599 !important;
      }
    }
    .topTab {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #f0f9ff;
      min-height: 1.04rem;
      width: 100%;
      border-radius: 0.08rem;

      .my-swipe .van-swipe-item {
        color: #333;
        font-size: 20px;
        // line-height: 1.04rem;
        height: 1.04rem;
        text-align: center;
        background-color: #f0f9ff;
        border-radius: 0 0 0.08rem 0.08rem;

        .items {
          padding: 0 0.1rem;
          margin-top: 0.1rem;
          display: flex;
          justify-content: space-between;
          div {
            text-align: center;
            background-color: #fff;
            font-size: 0.14rem;
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 0.06rem;
            img {
              width: 0.3rem;
              height: 0.3rem;
              margin: 0.09rem 0 0.04rem 0;
            }
          }
        }
      }
    }
  }

  .bar {
    margin-top: 0.12rem;
    height: 0.1rem;
    // width: 100%;
    margin-left: -0.18rem;
    margin-right: -0.18rem;
    background-color: #f5f6fa;
  }

  .content_bet {
    margin-top: 0.2rem;
    min-height: 2.12rem;
    width: 100%;
    border-radius: 0.08rem;
    box-sizing: border-box;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .content_bottom {
    margin-top: 0.2rem;
    min-height: 1.9rem;
    width: 100%;
    border-radius: 0.08rem;
    box-sizing: border-box;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);

    .bot_title {
      height: 0.36rem;
      width: 100%;
      background-color: #f5f5f5;
      line-height: 0.36rem;

      h3 {
        font-size: 0.16rem;
        margin-left: 0.14rem;
        font-weight: 500;
      }
    }
    >>> .van-swipe__indicator--active {
      background-color: #36c2d9 !important;
    }
    .my-swipe .van-swipe-item {
      color: #333;
      font-size: 20px;
      // line-height: 1.04rem;
      height: 1.54rem;
      text-align: center;
      background-color: #fff;
      border-radius: 0 0 0.08rem 0.08rem;

      .items {
        margin-top: 0.1rem;
        padding: 0 0.1rem;
        display: flex;
        justify-content: space-between;

        div {
          width: 1rem;
          height: 1.2rem;
          padding-top: 0.09rem;
          span {
            font-size: 0.16rem;
            text-align: center;
            font-weight: 500;
          }
        }
      }
    }
    .my-swipe .van-swipe-item:nth-child(1) {
      .items {
        div:nth-child(1) {
          background: url("../../assets/images/home/jiankang.png") no-repeat;
          background-size: 1rem;
        }
        div:nth-child(2) {
          background: url("../../assets/images/home/zonghe.png") no-repeat;
          background-size: 1rem;
        }
        div:nth-child(3) {
          background: url("../../assets/images/home/xiaoguo.png") no-repeat;
          background-size: 1rem;
        }
      }
    }
    .my-swipe .van-swipe-item:nth-child(2) {
      .items {
        div:nth-child(1) {
          background: url("../../assets/images/home/fuzhen.png") no-repeat;
          background-size: 1rem;
        }
        div:nth-child(2) {
          background: url("../../assets/images/home/shiwu.png") no-repeat;
          background-size: 1rem;
        }
      }
    }
  }
}
.stickKefu {
  width: 0.68rem;
  height: 0.68rem;
  position: fixed;
  right: 0.04rem;
  bottom: 2.1rem;

  img {
    width: 90%;
    height: 90%;
  }
}
// 广告部分
.advertisement {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 100;

  .view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  img {
    width: 100%;
    height: 100%;
  }

  .countDown {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.4);
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    color: #fff;
    text-align: center;
    font-size: 14px;
  }
}
</style>
