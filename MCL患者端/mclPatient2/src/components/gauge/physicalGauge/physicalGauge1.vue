<template>
  <div class="home">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      title="体能评估"
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
    </div>
    <div>
      <h3>健康状态(KPS 分级)</h3>
     <div class="gauge_3">
           <van-radio-group  class="one_gau_radio" v-model="data.KPS" direction="horizontal">
            <van-radio
            v-for="(item, i) in list1"
            :key="i"
            :class="{ checkedOne: data.KPS == item.id }"
            :name="item.id"
            >{{ item.value }}</van-radio
          >
          </van-radio-group>
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
  name: "physicalGauge1",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
      list1: [
        {
          value: "身体正常，无任何不适",
          id: '100'
        },
        {
          value: "能进行正常活动，有轻微不适",
          id: '90'
        },
        {
          value: "勉强可正常活动，有一些不适",
          id: '80'
        },
        {
          value: "生活可自理，但不能维持正常生活或工作",
          id: '70'
        },
        {
          value: "有时需人扶助，多数时间可自理",
          id: '60'
        },
        {
          value: "常需人照料",
          id: '50'
        },
        {
          value: "生活不能自理，需特别照顾",
          id: '40'
        },
        {
          value: "生活严重不能自理",
          id: '30'
        },
        {
          value: "病重，需住院积极支持治疗 ",
          id: '20'
        },
        {
          value: "病危作",
          id: '10'
        },
      ],
     
      WechatParm: {}, //公众号信息
      shareObj: {
        //分享信息内容配置
        title: `自测工具-体能评估`,
        desc: "", // 分享描述
        link: `${location.origin}${location.pathname}#${this.$route.fullPath}`, //系统地址
        imgUrl: location.origin + logoImg,
      },
      data: {
        KPS: "", // 
      },
    };
  },
  components: {
    // Ruler,
  },
  watch: {
     aaa: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        if (newVal.KPS != "") {
           this.$store.commit("setphysicalGauge", this.data);
           setTimeout(() => {
             this.$router.push('/physicalGauge2')
           }, 500);
        }
      },
      deep: true,
    },
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
  computed: {
    aaa() {
      return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    },
  },
  methods: {
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
  height: 0.4rem;
  position: fixed;
  background-color: #fff;
  z-index: 1;
  top: 0.38rem;
  left: 0;
  right: 0;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.4rem;
  line-height: 0.42rem;
  p {
    height: 0.06rem;
    width: 47%;
    border-radius: 0.03rem;
    background-color: #ebebed;
  }
  p:nth-child(1) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.95rem 0 0 0;
  text-align: center;
  font-weight: 500;
  font-size: 0.2rem;
}
.gauge_3 {
  margin-top: 0.2rem;
  padding-left: 0.38rem;
  padding-right: 0.37rem;
  margin-bottom: 0.4rem;
  .one_gau_radio {
    display: flex;
    justify-content: space-between;
    
  }
   
   >>> .van-radio {
     margin-top: 0.2rem;
     border: 1px solid #ccc;
     border-radius: 0.06rem;
    //  height: 0.44rem !important;
     width: 100% !important;
     margin-right: 0 !important;
   }
   
   >>> .van-radio__icon {
     margin-left: 0.15rem !important;
   }
   >>> .van-radio__label {
     margin-left: -0.2rem !important;
    padding: 0.09rem 0.08rem;
    line-height: 0.24rem;
    text-align: center;
    width: 100%;
       color: #999 !important;
     }
     >>> .van-radio:nth-child(4) {
        .van-radio__label {
     margin-left: 0.12rem !important;
    padding: 0.09rem 0.08rem;
    line-height: 0.22rem;
    text-align: left;
    width: 100%;
       color: #999 !important;
     }
     }
   >>> .van-radio__icon--checked .van-icon {
    background-color: #36c2d7;
    border-color: #36c2d7;
  }
   .checkedOne {
      border: 1px solid #36c2d7 !important;
      >>> .van-radio__label {
       color: #36c2d7 !important;
     } 
  
}
}

</style>