<template>
  <div class="home">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      title="营养评估"
      fixed
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="center_line">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div>
      <h3>焦虑测试</h3>
      <div class="gauge_1">
        <p>3、您目前的进食情况 (可多选)</p>
        <ul>
          <li @click="selValue_10" :class="{checkedOne:data.attribute_value_10=='1'}">正常饮食</li>
          <li @click="selValue_11" :class="{checkedOne:data.attribute_value_11=='1'}">正常饮食, 但比正常情况少</li>
          <li @click="selValue_12" :class="{checkedOne:data.attribute_value_12=='1'}">少有固体食物</li>
          <li @click="selValue_13" :class="{checkedOne:data.attribute_value_13=='1'}">只能进食流食</li>
          <li @click="selValue_14" :class="{checkedOne:data.attribute_value_14=='1'}">只能口服营养制剂</li>
          <li @click="selValue_15" :class="{checkedOne:data.attribute_value_15=='1'}">几乎吃不下什么</li>
          <li @click="selValue_16" :class="{checkedOne:data.attribute_value_16=='1'}">只能通过管饲进食或静脉营养</li>
        </ul>
      </div>
    </div>
    <div class="bot_content">
        <div style="background-color: #fff">
          <div class="btn">
            <van-button
              v-if="valueAll"
              class="btn_info"
              round
              type="info"
              @click="goInfo"
              >下一步</van-button
            >
            <van-button v-else class="btn_info1" round type="info"
              >下一步</van-button
            >
          </div>
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
// import Ruler from "./ruler.vue";
export default {
  name: "psychology1",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
      WechatParm: {}, //公众号信息
      shareObj: {
        //分享信息内容配置
        title: `自测工具-心理评估`,
        desc: "", // 分享描述
        link: `${location.origin}${location.pathname}#${this.$route.fullPath}`, //系统地址
        imgUrl: location.origin + logoImg,
      },
      data: {
        attribute_value_01: "", // 白蛋白值
        attribute_value_02: "", // 体重
      },
    };
  },
  components: {
    // Ruler,
  },
  watch: {
    // aaa: {
    //   //深度监听，可监听到对象、数组的变化
    //   handler(newVal, oldVal) {
    //     if (
    //       this.checkedOne == "" ||
    //       newVal.attribute_value_03 == "" ||
    //       newVal.value_05_flag == ""
    //     ) {
    //       this.valueAll = false;
    //     } else {
    //       if (
    //         (this.checkedOne == "1" && newVal.attribute_value_01 == "") ||
    //         (this.checkedOne == "2" && newVal.attribute_value_02 == "")
    //       ) {
    //         this.valueAll = false;
    //       } else {
    //         if (
    //           (newVal.value_05_flag == "是" &&
    //             (newVal.attribute_value_061 == "" ||
    //               newVal.attribute_value_04 == "" ||
    //               newVal.attribute_value_05 == "" ||
    //               newVal.attribute_value_06 == "")) ||
    //           (newVal.value_05_flag == "否" && newVal.attribute_value_04 == "")
    //         ) {
    //           this.valueAll = false;
    //         } else {
    //           this.valueAll = true;
    //         }
    //       }
    //     }
    //   },
    //   deep: true,
    // },
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
      }&rphone=${getZphone()}`;
      this.getWechatParm();
    }
  },
  computed: {
    // aaa() {
    //   return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    // },
  },
  methods: {
    goInfo() {
      this.$store.commit("setnutrition", this.data);
      this.$router.push("/nutrition2");
    },
    changeWeight(val) {
      this.weight = val;
    },
    submitWeight() {
      this.data.attribute_value_02 = this.weight;
      this.show = false;
    },
    rulerWeight() {
      this.show = true;
    },
    oneGauRadio() {
      this.data.attribute_value_01 = "";
      this.data.attribute_value_02 = "";
    },
    threeGauRadio() {
      this.data.attribute_value_061 = "";
      this.data.attribute_value_06 = "";
      this.data.attribute_value_04 = "";
      this.data.attribute_value_05 = "";
    },
    getDesc() {
      const wrap = document.createElement("div");
      wrap.innerHTML = this.SubjectMemo;

      function getSpanText() {
        const span = wrap.querySelector("span");
        const desc = span.innerText;
        span.parentNode.removeChild(span);
        return desc ? desc : getSpanText();
      }

      return getSpanText();
    },
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
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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

<style scoped lang="scss">
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff !important;
}
.center_line {
  height: 0.3rem;
  position: fixed;
  background-color: #fff;
  z-index: 1;
  top: 0.4rem;
  left: 0;
  right: 0;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.4rem;
  line-height: 0.42rem;
  p {
    height: 0.06rem;
    width: 13%;
    border-radius: 0.03rem;
    background-color: #ebebed;
  }
  p:nth-child(1) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.8rem 0 0 0;
  text-align: center;
  font-weight: 500;
}
.gauge_1 {
   margin-top: 0.3rem;
  padding: 0 0.3rem;
  ul {
    li {
      margin-top: 0.2rem;
     border: 1px solid #ccc;
     border-radius: 0.06rem;
     height: 0.4rem;
     text-align: center;
     line-height: 0.4rem;
     color: #999;
    }
    .checkedOne {
      border: 1px solid #36c2d7 !important;
       color: #36c2d7 !important;
  
}
  }
}
.bot_content {
  background-color: #fff;

  .title {
    padding-top: 0.4rem;
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
      margin-top: 0.4rem;
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .btn {
    width: 100%;
    background-color: #fff;
    margin: 0.3rem 0 0.2rem 0;
    text-align: center;
    .btn_info {
      width: 80% !important;
      background: linear-gradient(to left, #38c2d7, #51e4f7);
      border: 0;
    }
    .btn_info1 {
      border: 0;
      width: 80% !important;
      background-color: #dcdcdc;
    }
  }
}
</style>