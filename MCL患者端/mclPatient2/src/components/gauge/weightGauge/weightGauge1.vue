<template>
  <div class="home">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      title="体重监测"
      fixed
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div>
      <div class="one_gau_input">
        <div class="date">
          <p>
            <span>日期</span>
            <input readonly  type="text" v-model="changeDate" placeholder="请选择日期" />
            <img src="@/assets/images/date.png" alt="">
          </p>
        </div>
        <div class="height">
          <p>
            <span>身高</span>
            <input type="text" readonly @click="rulerHeight" v-model="data.value_02" placeholder="请选择身高" />
            <span>厘米</span>
          </p>
        </div>
      </div>
      <div class="weight">
          <p>
            <span>体重</span>
            <input readonly @click="rulerWeight" type="text" v-model="data.value_03" placeholder="请输入" />
            <span>千克</span>
          </p>
        </div>
      <div class="gauge_3">
        <p>目前的身体状况（选填）</p>
        <van-radio-group
          class="one_gau_radio"
          v-model="data.value_04"
          direction="horizontal"
        >
          <van-radio
            v-for="(item, i) in list"
            :key="i"
            :class="{ checkedOne: data.value_04 == item.value }"
            :name="item.value"
            >{{ item.value }}</van-radio
          >
        </van-radio-group>
      </div>
    </div>
    <div class="bot_content">
        <div class="btn">
          <van-button
            v-if="valueAll"
            class="btn_info"
            round
            type="info"
            @click="goInfo"
            >保存</van-button
          >
          <van-button v-else class="btn_info1" round type="info"
            >保存</van-button
          >
        </div>
    </div>
    <div>
      <van-popup
      class="popup"
        :closeable="true"
        v-model="show"
        round
        position="bottom"
        :style="{ height: '53%'}"
      >
        <h3 style="margin-top: 0.4rem; text-align:center">体重 (千克)</h3>
        <Ruler class="ruler" :value="50" :min="0" :max="300" :onChange="changeWeight" />
        <div class="weight_btn">
          <van-button class="btn_info1" @click="submitWeight" round type="info"
            >保存</van-button
          >
        </div>
      </van-popup>
      <van-popup
      class="popup"
        :closeable="true"
        v-model="showHeight"
        round
        position="bottom"
        :style="{ height: '53%' }"
      >
        <h3 style="margin-top: 0.4rem; text-align:center">身高 (厘米)</h3>
        <Ruler1 :value="160" :min="0" :max="300" :onChange="changeHeight" />
        <div class="weight_btn">
          <van-button class="btn_info1" @click="submitHeight" round type="info"
            >保存</van-button
          >
        </div>
      </van-popup>
      
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
import {getUserInfo} from '@/api/person.js'
import Ruler from "@/components/home/weight/ruler.vue";
import Ruler1 from "./ruler.vue";
export default {
  name: "weightGauge1",
  data() {
    return {
      show: false,
      showHeight: false,
      checkedOne: "",
      valueAll: false,
      WechatParm: {}, //公众号信息
      shareObj: {
        //分享信息内容配置
        title: `自测工具-体重监测`,
        desc: "", // 分享描述
        link: `${location.origin}${location.pathname}#${this.$route.fullPath}`, //系统地址
        imgUrl: location.origin + logoImg,
      },
      data: {
        value_01 : this.timeFormat(new Date()), // 日期
        value_02 : '', // 身高
        value_03 : '', // 体重
        value_04 : '', // 身体状况
      },
       list: [
        {
          value: "卧床患者",
          id: '正常'
        },
        {
          value: "每天可以在病房走动",
          id: '轻度'
        },
        {
          value: "自由活动",
          id: '中度'
        },
      ],
      weight: "50",
      height : '160',
      currentDate: new Date(),
      changeDate: this.timeFormat(new Date()),
    };
  },
  components: {
    Ruler,
    Ruler1
  },
  watch: {
      aaa:{//深度监听，可监听到对象、数组的变化
            handler(newVal, oldVal){
               if(newVal.value_02 == ""  || newVal.value_03 == "" || newVal.value_04 == "") {
                 this.valueAll = false
               }else {
                 this.valueAll = true
               }
            },
            deep:true
        }
  },
  created() {
    this.getUserInfo()
    if (this.$route.query.rphone) {
      localStorage.setItem("hphone", this.$route.query.rphone);
    }
  },
  mounted() {
    this.timeFormat(new Date());
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
    // 获取用户基本信息
    getUserInfo(){
      getUserInfo().then(res => {
        this.data.value_02 = res.data.height
      })
    },
    // 获取修改颜色的时间
    getDoms() {
      var dom = document.querySelectorAll(
        " .van-picker-column__item .van-ellipsis"
      );
      var doms = Array.from(dom);
      this.dom = dom;
      this.doms = doms;
    },
    setDom() {
      let arr = [];
      this.doms.forEach((element) => {
        arr.push(element.innerHTML);
        element.style.color = "#999";
      });
      let dateArr = this.changeDate.split("-");
      let nian = dateArr[0] + "年";
      let yue = dateArr[1] + "月";
      let ri = dateArr[2] + "日";
      this.dom[this.findall(arr, nian)].style.color = "#35c2db";
      this.dom[this.findall(arr, yue)].style.color = "#35c2db";
      this.dom[this.findall(arr, ri)].style.color = "#35c2db";
    },
    findall(a, x) {
      var results = [],
        len = a.length,
        pos = 0;
      while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) {
          //未找到就退出循环完成搜索
          break;
        }
        results.push(pos); //找到就存储索引
        pos += 1; //并从下个位置开始搜索
      }
      return results;
    },
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
    onShift() {
      this.changeDate = this.timeFormat(this.currentDate); // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
      this.setDom();
    },
    // 格式化时间
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      let day = time.getDate();
      if (day < 10) {
        return year + "-" + month + "-" + "0" + day;
      } else {
        return year + "-" + month + "-" + day;
      }
    },
    //  changeTime() {
    //   this.showTime = true;
    //   this.$nextTick(() => {
    //     this.getDoms();
    //     this.setDom();
    //   });
    // },
    //  // 时间确定按钮
    // confirm() {
    //   this.data.value_01 = this.changeDate;
    //   this.showTime = false;
    // },
    // // 时间取消按钮
    // cancel() {
    //   this.changeDate = this.timeFormat(new Date());
    //   this.showTime = false;
    // },
    goInfo() {
      let url = 'UserInterface/selfTestTool/AddWeightMonitoring.ashx'
      this.$post(url,this.data).then(res => {
         if (res.rspcode != 1) {
            this.$Toast(res.rspdesc)
            return
          }
          this.$Toast(res.rspdesc)
          this.$router.push('/selfTestTool')
      })
    },
    changeWeight(val) {
      this.weight = val;
    },
    submitWeight() {
      this.data.value_03 = this.weight;
      this.show = false;
    },
    rulerWeight() {
      this.show = true;
    },
    rulerHeight() {
       this.showHeight = true;
    },
   changeHeight(val) {
      this.height = String(Math.round(val));
    },
    submitHeight() {
      this.data.value_02 = this.height;
      this.showHeight = false;
    },


   // 微信配置******************************************************
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
.popup {
  overflow: hidden;
}
>>> [class*="van-hairline"]::after {
  border: 1px solid #39c4d5 !important;
  border-radius: 3rem;
}
>>> .van-picker__confirm {
  color: #39c4d5 !important;
}
.weight_btn {
  width: 100%;
  margin: 0.3rem 15%;
  .btn_info1 {
    margin-bottom: 0.46rem;
    width: 70% !important;
    background-color: #36c2d9;
    color: #fff;
    border: 0;
  }
}
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  // background-color: #fff !important;
}


.one_gau_input {
  margin-top: 0.53rem;
  background-color: #fff;
  padding: 0 0.22rem;
  .date {
    height: 0.6rem;
    line-height: 0.6rem;
    img {
      margin-top: -0.03rem;
      width: 0.16rem;
      height: 0.16rem;
    }
    p {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      input {
        flex: 1;
        padding-right: 0.1rem;
        border: 0;
        text-align: right;
        // font-size: 0.18rem;
      }
    }
  }
  .height {
    height: 0.68rem;
    line-height: 0.68rem;
    p {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        flex: 1;
        padding-right: 0.1rem;
        border: 0;
        text-align: right;
        // font-size: 0.18rem;
      }
    }
  }
}
.weight {
  margin-top: 0.1rem;
  background-color: #fff;
  padding:  0 0.22rem;
    height: 0.68rem;
    line-height: 0.68rem;
    p {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        flex: 1;
        padding-right: 0.1rem;
        border: 0;
        text-align: right;
        // font-size: 0.18rem;
      }
    }
  }
.gauge_3 {
  margin-bottom: 1.3rem;
  overflow: hidden;
  margin-top: 0.1rem;
  background-color: #fff;
  padding: 0.18rem 0 0.35rem 0;
  p {
    padding-left: 0.2rem;
  }
  .one_gau_radio {
     padding-left: 0.38rem;
  padding-right: 0.37rem;
    display: flex;
    justify-content: space-between;
  }
  >>> .van-radio {
    margin-top: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 0.06rem;
    height: 0.4rem !important;
    width: 100% !important;
    margin-right: 0 !important;
  }

  >>> .van-radio__icon {
    margin-left: 0.15rem !important;
  }
  >>> .van-radio__label {
    margin-left: 0.13rem !important;
    padding: 0.1rem 0.2rem 0.1rem 0.05rem;
    text-align: left;
    width: 100%;
    color: #999 !important;
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
.bot_content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 1rem;
  height: 0.88rem;
  background-color: #fff;
  .btn {
    width: 100%;
    background-color: #fff;
    padding: 0.15rem 0 0 0;
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