<template>
  <div class="home">
     <mt-header title="体重监测" fixed class="mt_header">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="title_img">
      <img src="@/assets/images/gauge_wellom/weightGauge/title.png" alt="" />
    </div>
    <div class="content">
      <img src="@/assets/images/gauge_wellom/weightGauge/time.png" alt="" />
      <img
        v-if="!jieshaoImg"
        src="@/assets/images/gauge_wellom/weightGauge/jieshao.png"
        @click="changeImg"
        alt=""
      />
      <img
        v-else
        src="@/assets/images/gauge_wellom/weightGauge/jieshaoMore.png"
        @click="changeImg"
        alt=""
      />
      <img src="@/assets/images/gauge_wellom/weightGauge/jieshao2.png" alt="" />
      <img src="@/assets/images/gauge_wellom/weightGauge/huode.png" alt="" />
      <img src="@/assets/images/gauge_wellom/weightGauge/lilun.png" alt="" />
      <img src="@/assets/images/gauge_wellom/weightGauge/xuzhi.png" alt="" />
      <img src="@/assets/images/gauge_wellom/weightGauge/wenxian.png" alt="" />
    </div>
    <div class="bot_content">
      <div class="btn">
        <van-button class="btn_info" type="info" @click="goInfo"
          >开始测评</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { setRhone, getZphone } from "@/utils/storage.js";
import { getWechatParm } from "@/api/wx";
//系统logo
import logoImg from "@/assets/images/mclogo.png";
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js";
var wxData = remoteJs("https://res.wx.qq.com/open/js/jweixin-1.1.0.js");
export default {
  name: "wellcom_weightGauge",
  data() {
    return {
      jieshaoImg: false,
      WechatParm: {}, //公众号信息
      shareObj: {
        //分享信息内容配置
        title: `医随康—体重监测`,
        desc: "快来记录您的体重是否在健康体重范围内，对后续的治疗及康复影响非常大哟！", // 分享描述
        link: `${location.origin}${location.pathname}#${this.$route.fullPath}`, //系统地址
        imgUrl: location.origin + logoImg,
      },
    };
  },
  created() {
    if (this.$route.query.rphone) {
      localStorage.setItem("hphone", this.$route.query.rphone);
    }
  },
  mounted() {
    // 通过转发小工具转发进来的情况，获取链接上的推荐码
    const query = this.$route.query;
    if (query.doctorPhone) {
      setRhone(query.doctorPhone);
      this.getWechatParm(); // 设置分享链接
    } else {
      this.shareObj.link = `${location.origin}${location.pathname}#${
        this.$route.fullPath
      }?rphone=${getZphone()}`;
      this.getWechatParm();
    }
  },
  methods: {
    changeImg() {
      this.jieshaoImg = !this.jieshaoImg;
    },
    goInfo() {
      this.$router.push("/weightGauge1");
    },
    // 微信配置******************************************************
    // 获取微信公众号配置
    async getWechatParm() {
      const data = await getWechatParm();
      this.WechatParm = data.WechatParm;
      // this.shareObj.desc = this.getDesc(); // 分享的描述
      this.wxConfig(); // 微信配置
      this.wxRead(); // 微信read回调
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
};
</script>
<style scoped lang='scss'>
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff !important;
}
.title_img {
  margin-top: 0.43rem;
  img {
    width: 100%;
  }
}
.content {
  padding: 0 0.23rem;
  padding-bottom: 1.1rem;
  img {
    width: 100%;
  }
  img:nth-child(1) {
    margin: 0.28rem 0 0.12rem 0;
    width: 1.4rem;
    height: 0.16rem;
  }
  img:nth-child(3) {
    margin: 0.3rem 0 0.24rem 0;
  }
  img:nth-child(5) {
    margin: 0.3rem 0 0.21rem 0;
  }
  img:nth-child(7) {
    margin: 0.24rem 0 0 0;
  }
}
.bot_content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.73rem;
  background-color: #fff;
  .btn {
    width: 100%;
    text-align: center;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    .btn_info {
      width: 100% !important;
      background: linear-gradient(to left, #38c2d7, #51e4f7);
      border: 0;
    }
  }
}
</style>