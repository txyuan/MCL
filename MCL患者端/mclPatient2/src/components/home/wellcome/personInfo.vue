<template>
  <div class="home">
    <mt-header title="" fixed class="mt_header">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>

    <!-- 图片 -->
    <div class="content_img">
      <img src="@/assets/images/home/userInfo.png" alt="" />
    </div>
    <div class="bot_content">
      <div class="title">
        <p>让我们在几分钟内了解您的基本信息</p>
        <p>我们会为您提供</p>
        <p>一份个性化定制的健康方案</p>
      </div>
      <div class="down">
        <img src="@/assets/images/home/downInfo.png" alt="" />
      </div>
      <div >
        <div class="btn">
          <van-button class="btn_info" round type="info" @click="goInfo"
            >开始填写</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/assets/js/uesr.js";
import { getWechatParm } from "@/api/wx";
//系统logo
import logoImg from "@/assets/images/mclogo.png";
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js";
var wx1 = remoteJs("https://res.wx.qq.com/open/js/jweixin-1.1.0.js");
import { setRhone, getZphone } from "@/utils/storage.js";
export default {
  data() {
    return {
      WechatParm: {}, //公众号信息
      shareObj: {
        //分享信息内容配置
        title: "医随康—个人信息",
        desc: "填写您的信息后，方便给您建立档案。", // 分享描述
        link: ``, //系统地址
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
      this.shareObj.link = `${location.origin}${location.pathname}#${this.$route.fullPath}`;
      this.getWechatParm(); // 设置分享链接
    } else {
      this.shareObj.link = `${location.origin}${location.pathname}#${
        this.$route.fullPath
      }&rphone=${getZphone()}`;
      this.getWechatParm();
    }
  },
  methods: {
    // 微信配置
    async getWechatParm() {
      const data = await getWechatParm();
      this.WechatParm = data.WechatParm;
      this.wxConfig(); // 微信配置
      this.wxRead(); // 微信read回调
    },
    goInfo() {
       if (!localStorage.userInfo) {
        logout("/wellcome_personInfo");
        return;
      }
      this.$router.push("/personInfo1");
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

<style lang="scss" scoped>
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff !important;
}
.mt_header {
  background-color: #fff;
  border: 0;
}
.content_img {
  padding-top: 0.5rem;
  width: 100%;
  height: 2.9rem;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
}
.bot_content {
  
  // background-color: #fff;

  .title {
    padding-top: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.14rem;
    p:nth-child(3) {
      font-size: 0.16rem;
      color: #4ec2a5;
    }
  }
  .down {
    text-align: center;
    img {
      margin-top: 0.2rem;
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .btn {
    width: 100%;
    // background-color: #fff;
    position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
    // position: fixed;
    margin: 0.8rem 0 0.2rem 0;
    // bottom: 0.2rem;
    text-align: center;
    .van-button {
      width: 80% !important;
      background: linear-gradient(to left, #38c2d7, #51e4f7);
      border: 0;
    }
  }
}
</style>