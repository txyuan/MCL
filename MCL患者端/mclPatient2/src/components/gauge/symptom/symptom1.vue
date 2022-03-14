<template>
  <div class="padding-header page-bg-white">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      title="症状管理"
      fixed
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <h3><span></span>请记录您现有症状 (多选)</h3>
    <div class="content">
      <div class="one">
        <p>一、全身症状</p>
        <van-checkbox-group v-model="result1">
          <van-cell-group :border="false">
            <van-cell
              v-for="(item, index) in list1"
              clickable
              :key="item.sKey"
              @click="toggle1(item, index)"
              :class="{ active: item.active }"
            >
              <template slot="title">
                <span class="custom-title">{{ item.name }}</span>
                <span class="right_img"></span>
              </template>
              <img class="left_img" :src="item.ImageUrl" alt="" />
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes1" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <div class="two">
        <p>二、 神经系统</p>
        <van-checkbox-group v-model="result2">
          <van-cell-group :border="false">
            <van-cell
              v-for="(item, index) in list2"
              clickable
              :key="item.sKey"
              @click="toggle2(item, index)"
              :class="{ active: item.active }"
            >
              <template slot="title">
                <span class="custom-title">{{ item.name }}</span>
                <span class="right_img"></span>
              </template>
              <img class="left_img" :src="item.ImageUrl" alt="" />
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <div class="three">
        <p>三、消化系统</p>
        <van-checkbox-group v-model="result3">
          <van-cell-group :border="false">
            <van-cell
              v-for="(item, index) in list3"
              clickable
              :key="item.sKey"
              @click="toggle3(item, index)"
              :class="{ active: item.active }"
            >
              <template slot="title">
                <span class="custom-title">{{ item.name }}</span>
                <span class="right_img"></span>
              </template>
              <img class="left_img" :src="item.ImageUrl" alt="" />
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes3" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <div class="four">
        <p>四、 呼吸系统</p>
        <van-checkbox-group v-model="result4">
          <van-cell-group :border="false">
            <van-cell
              v-for="(item, index) in list4"
              clickable
              :key="item.sKey"
              @click="toggle4(item, index)"
              :class="{ active: item.active }"
            >
              <template slot="title">
                <span class="custom-title">{{ item.name }}</span>
                <span class="right_img"></span>
              </template>
              <img class="left_img" :src="item.ImageUrl" alt="" />
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes4"></van-checkbox>
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </div>
    <div class="bot_content">
      <div>
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
import { getList, getDetalData } from "@/api/complication";
import { setRhone, getZphone } from "@/utils/storage.js";
import { getWechatParm } from "@/api/wx";
//系统logo
import logoImg from "@/assets/images/mclogo.png";
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js";
var wxData = remoteJs("https://res.wx.qq.com/open/js/jweixin-1.1.0.js");
export default {
  data: () => ({
    WechatParm: {}, //公众号信息
    shareObj: {},
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    rphone: "",
    result: [],
    result1: [],
    result2: [],
    result4: [],
    result3: [],
    valueAll: false,
  }),
  watch: {
    result1: {
      handler(newValue, oldValue) {
        if (
          newValue.length == 0 &&
          this.result2.length == 0 &&
          this.result3.length == 0 &&
          this.result4.length == 0
        ) {
          // this.result = []
          // 操作
          this.valueAll = false;
        } else {
          // let arr = []
          // this.result = arr.concat(newValue)
          this.valueAll = true;
        }
      },
    },
    result2: {
      handler(newValue, oldValue) {
        if (
          newValue.length == 0 &&
          this.result1.length == 0 &&
          this.result3.length == 0 &&
          this.result4.length == 0
        ) {
          // this.result = []
          // 操作
          this.valueAll = false;
        } else {
          // let arr = []
          // this.result = arr.concat(newValue)
          this.valueAll = true;
        }
      },
    },
    result3: {
      handler(newValue, oldValue) {
        if (
          newValue.length == 0 &&
          this.result2.length == 0 &&
          this.result1.length == 0 &&
          this.result4.length == 0
        ) {
          // this.result = []
          // 操作
          this.valueAll = false;
        } else {
          // let arr = []
          // this.result = arr.concat(newValue)
          this.valueAll = true;
        }
      },
    },
    result4: {
      handler(newValue, oldValue) {
        if (
          newValue.length == 0 &&
          this.result1.length == 0 &&
          this.result2.length == 0 &&
          this.result3.length == 0
        ) {
          // this.result = []
          // 操作
          this.valueAll = false;
        } else {
          // let arr = []
          // this.result = arr.concat(newValue)
          this.valueAll = true;
        }
      },
    },
  },
  methods: {
    goInfo() {
      let arr = [];
      arr = arr.concat(this.result1);
      arr = arr.concat(this.result2);
      arr = arr.concat(this.result3);
      arr = arr.concat(this.result4);
      this.result = arr;
      this.result.forEach((item, index) => {
        item.SubjectName = item.name;
        delete item.active;
        delete item.ImageUrl;
        delete item.name;
      });

      this.$router.push(`/symptom${this.result[0].sKey}`);
      this.$store.commit("setsymptom", this.result);
    },
    toggle1(item, index) {
      this.$refs.checkboxes1[index].toggle();
      if (item.active) {
        item.active = false;
      } else {
        item.active = true;
      }
    },
    toggle2(item, index) {
      this.$refs.checkboxes2[index].toggle();
      if (item.active) {
        item.active = false;
      } else {
        item.active = true;
      }
    },
    toggle3(item, index) {
      this.$refs.checkboxes3[index].toggle();
      if (item.active) {
        item.active = false;
      } else {
        item.active = true;
      }
    },
    toggle4(item, index) {
      this.$refs.checkboxes4[index].toggle();
      if (item.active) {
        item.active = false;
      } else {
        item.active = true;
      }
    },

    async getList() {
      const data = await getList();
      data.data.forEach((element) => {
        element.active = false;
      });
      this.list1 = [data.data[0]];
      this.list2 = [data.data[1], data.data[2]];
      this.list3 = [
        data.data[3],
        data.data[4],
        data.data[5],
        data.data[6],
        data.data[7],
        data.data[8],
        data.data[9],
      ];
      this.list4 = [data.data[10]];
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
  created() {
    this.getList();
    this.shareObj = {
      //分享信息内容配置
      title: `自测工具-症状管理`,
      desc: "", // 分享描述
      link: `${location.origin}${location.pathname}#${this.$route.fullPath}`, //系统地址
      imgUrl: location.origin + logoImg,
    };
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
};
</script>

<style scoped lang="scss">
.padding-header {
  padding: 0.2rem 0.13rem;
  background-color: #f5f6fa;
}
h3 {
  margin-left: 0.14rem;
  font-size: 0.2rem;
  font-weight: 500;
  height: 0.21rem;
  line-height: 0.2rem;
  margin-top: 0.5rem;
  span {
    box-sizing: border-box;
    border: 2px solid #36c2d9;
    margin-right: 0.1rem;
    border-radius: 0.02rem;
  }
}
.content {
  margin-top: 0.25rem;
  margin-bottom: 1.3rem;
  .one {
    position: relative;
    background-color: #fff;
    border-radius: 0.08rem;
    padding: 0.12rem 0 0 0;
    margin-bottom: 0.1rem;
    p {
      position: absolute;
      left: -0.04rem;
      top: 0.1rem;
      width: 1.15rem;
      height: 0.25rem;
      line-height: 0.26rem;
      padding-left: 0.15rem;
      font-size: 0.14rem;
      color: #fff;
      background: url("~@/assets/images/symptom/oneTitle.png") no-repeat;
      background-size: 100% 100%;
    }
    >>> .van-checkbox {
      display: none;
    }
    >>> .van-cell-group {
      border-radius: 0.08rem;
      margin-top: 0.38rem;
      overflow: hidden;
      padding: 0 0.11rem;
      // height: 0.7rem;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      .van-cell {
        display: flex;
        align-items: center;
        position: relative;
        height: 0.8rem;
        border-radius: 0.1rem;
        background-color: #f5f5f5;
        width: 1.58rem !important;
        margin-bottom: 0.18rem;
        padding-right: 0.2rem;
        .van-cell__title {
          font-size: 0.18rem;
          margin-left: 0.34rem;
        }
        .van-cell__value {
          position: absolute;
          left: 0.1rem;
          top: 50%;
          margin-top: -0.15rem;
        }
        .left_img {
          width: 0.3rem;
          height: 0.3rem;
        }
        .right_img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.3rem;
          height: 0.25rem;
          background: url("~@/assets/images/symptom/moren.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .active {
        background-color: #fff !important;
        border: 1px solid #57acf9;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
        .right_img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.3rem;
          height: 0.25rem;
          background: url("~@/assets/images/symptom/oneCheck.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .two {
    position: relative;
    background-color: #fff;
    border-radius: 0.08rem;
    padding: 0.12rem 0 0 0;
    margin-bottom: 0.1rem;
    p {
      position: absolute;
      left: -0.04rem;
      top: 0.1rem;
      width: 1.15rem;
      height: 0.25rem;
      line-height: 0.26rem;
      padding-left: 0.15rem;
      font-size: 0.14rem;
      color: #fff;
      background: url("~@/assets/images/symptom/twoTitle.png") no-repeat;
      background-size: 100% 100%;
    }
    >>> .van-checkbox {
      display: none;
    }
    >>> .van-cell-group {
      border-radius: 0.08rem;
      margin-top: 0.38rem;
      overflow: hidden;
      padding: 0 0.11rem;
      // height: 0.7rem;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      .van-cell {
        display: flex;
        align-items: center;
        position: relative;
        height: 0.8rem;
        border-radius: 0.1rem;
        background-color: #f5f5f5;
        width: 1.58rem !important;
        margin-bottom: 0.18rem;
        padding-right: 0.2rem;
        .van-cell__title {
          font-size: 0.18rem;
          margin-left: 0.34rem;
        }
        .van-cell__value {
          position: absolute;
          left: 0.1rem;
          top: 50%;
          margin-top: -0.15rem;
        }
        .left_img {
          width: 0.3rem;
          height: 0.3rem;
        }
        .right_img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.3rem;
          height: 0.25rem;
          background: url("~@/assets/images/symptom/moren.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .active {
        background-color: #fff !important;
        border: 1px solid #41bfab;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
        .right_img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.3rem;
          height: 0.25rem;
          background: url("~@/assets/images/symptom/twoCheck.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .three {
    position: relative;
    background-color: #fff;
    border-radius: 0.08rem;
    padding: 0.12rem 0 0 0;
    margin-bottom: 0.1rem;
    p {
      position: absolute;
      left: -0.04rem;
      top: 0.1rem;
      width: 1.15rem;
      height: 0.25rem;
      line-height: 0.26rem;
      padding-left: 0.15rem;
      font-size: 0.14rem;
      color: #fff;
      background: url("~@/assets/images/symptom/threeTitle.png") no-repeat;
      background-size: 100% 100%;
    }
    >>> .van-checkbox {
      display: none;
    }
    >>> .van-cell-group {
      border-radius: 0.08rem;
      margin-top: 0.38rem;
      overflow: hidden;
      padding: 0 0.11rem;
      // height: 0.7rem;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      .van-cell {
        display: flex;
        align-items: center;
        position: relative;
        height: 0.8rem;
        border-radius: 0.1rem;
        background-color: #f5f5f5;
        width: 1.58rem !important;
        margin-bottom: 0.18rem;
        padding-right: 0.2rem;
        .van-cell__title {
          font-size: 0.18rem;
          margin-left: 0.34rem;
        }
        .van-cell__value {
          position: absolute;
          left: 0.1rem;
          top: 50%;
          margin-top: -0.15rem;
        }
        .left_img {
          width: 0.3rem;
          height: 0.3rem;
        }
        .right_img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.3rem;
          height: 0.25rem;
          background: url("~@/assets/images/symptom/moren.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .active {
        background-color: #fff !important;
        border: 1px solid #fc8c8c;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
        .right_img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.3rem;
          height: 0.25rem;
          background: url("~@/assets/images/symptom/threeCheck.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .four {
    position: relative;
    background-color: #fff;
    border-radius: 0.08rem;
    padding: 0.12rem 0 0 0;
    p {
      position: absolute;
      left: -0.04rem;
      top: 0.1rem;
      width: 1.15rem;
      height: 0.25rem;
      line-height: 0.26rem;
      padding-left: 0.15rem;
      font-size: 0.14rem;
      color: #fff;
      background: url("~@/assets/images/symptom/fourTitle.png") no-repeat;
      background-size: 100% 100%;
    }
    >>> .van-checkbox {
      display: none;
    }
    >>> .van-cell-group {
      border-radius: 0.08rem;
      margin-top: 0.38rem;
      overflow: hidden;
      padding: 0 0.11rem;
      // height: 0.7rem;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      .van-cell {
        display: flex;
        align-items: center;
        position: relative;
        height: 0.8rem;
        border-radius: 0.1rem;
        background-color: #f5f5f5;
        width: 1.58rem !important;
        margin-bottom: 0.18rem;
        //  padding-right: 0.2rem;
        .van-cell__title {
          font-size: 0.18rem;
          margin-left: 0.34rem;
        }
        .van-cell__value {
          position: absolute;
          left: 0.1rem;
          top: 50%;
          margin-top: -0.15rem;
        }
        .left_img {
          width: 0.3rem;
          height: 0.3rem;
        }
        .right_img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.3rem;
          height: 0.25rem;
          background: url("~@/assets/images/symptom/moren.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .active {
        background-color: #fff !important;
        border: 1px solid #86a5f1;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
        .right_img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.3rem;
          height: 0.25rem;
          background: url("~@/assets/images/symptom/fourCheck.png") no-repeat;
          background-size: 100% 100%;
        }
      }
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