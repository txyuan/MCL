<template>
  <div style="">
    <mt-header
      style="background-color: #38c2d7; color: #fff"
      :title="title"
      fixed
    >
      <div slot="left">
        <mt-button icon="back" @click="back"></mt-button>
      </div>
    </mt-header>
    <div style="padding: 0.2rem; background-color: #fff">
      <h5>{{ data.Title }}</h5>
    </div>
    <div class="li_top">
      <div class="left_img">
        <img :src="data.platformLogo" alt="" />
        <span style="font-size: 0.16rem">{{ data.platformName }}</span>
        <span style="color: #737172; font-size: 0.16rem">{{
          data.Subtitle
        }}</span>
      </div>
      <p>{{ data.create_time }}</p>
    </div>
    <p class="line"></p>
    <div class="content" v-html="data.Memo"></div>
    <p class="line"></p>
    <div class="link_address">
      <div class="left_text">
        <p>
          <span>阅读 {{ data.readCount }}</span>
        </p>
        <p @click="showShare = true">
          <van-icon class="good" name="share-o" />&nbsp;<span
            >分享 {{ data.shareCount }}</span
          >
        </p>
        <p  @click="goodCli">
          <van-icon
            v-if="good"
            class="good"
            name="good-job-o"
          /><van-icon
            v-else
            class="good1"
            name="good-job"
          />&nbsp;<span>点赞 {{ data.followCount }}</span>
        </p>
      </div>
    </div>
    <!-- <van-cell title="显示分享面板" @click="showShare = true" /> -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    <div class="link_img">
      <img @click="linkAddres" :src="data.SmallImageUrlTwo" alt="" />
    </div>

    <!--  分享蒙版  -->
    <div
      id="mark"
      style="display: block"
      v-on:click="isSmark = false"
      v-show="isSmark"
      class="shareMark"
    >
      <img src="@/assets/images/share.png" />
      <div class="bottom">
        <p class="tip" style="margin-bottom: 100px; font-size: 20px">
          请点击右上角分享<span></span>
        </p>
        <p class="btn">我知道了</p>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/assets/js/uesr.js";
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js";
remoteJs("https://res.wx.qq.com/open/js/jweixin-1.1.0.js");
import { getWechatParm } from "@/api/wx";
import { getZphone } from "@/utils/storage.js";
//系统logo
import logoImg from "@/assets/images/mclogo.png";
export default {
  name: "knowledgeResult",
  data() {
    return {
      param: {
        skey: this.$route.query.sKey,
      },
      data: {},
      title: "", // 标题
      good: true,
      WechatParm: {}, //公众号信息

      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "朋友圈", icon: "wechat-moments" },
        // { name: "复制链接", icon: "link" },
      ],
      isSmark: false,
      imgUrl : ''
    };
  },
  created() {
    this.getInfoData();
      this.imgUrl = sessionStorage.getItem('share')
    if (this.$route.query.rphone) {
      localStorage.setItem("hphone", this.$route.query.rphone);
    }
  },
  mounted () {
   
  },
  methods: {
    back() {
      if (this.$route.query.from && this.$route.query.from == "share") {
        this.$router.push("/wx_Entrance/knowledge");
      } else {
        this.$router.back();
      }
    },
    // 微信配置
    async getWechatParm() {
      const data = await getWechatParm();
      this.WechatParm = data.WechatParm;
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
      // this.onShare()
      wx.ready(() => {
        var that = this;
        this.ShareTimeline(that);
        this.ShareAppMessage(that);
        this.ShareQQ(that);
        this.ShareWeibo(that);
      });
    },
    // 2.3 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    ShareTimeline(that) {
      wx.onMenuShareTimeline({
        //分享信息内容配置
        title: that.data.Title,
        desc: that.data.outline, // 分享描述
        link: `${location.origin}${location.pathname}#${
          that.$route.fullPath
        }&from=share&rphone=${getZphone()}`, //系统地址
        imgUrl: that.imgUrl ? that.imgUrl : location.origin + logoImg,
        success: function () {
          that.onShare();
        },
      });
    },
    // 2.3 监听“分享给朋友”按钮点击、自定义分享内容及分享结果接口
    ShareAppMessage(that) {
      wx.onMenuShareAppMessage({
        //分享信息内容配置
        title: that.data.Title,
        desc: that.data.outline, // 分享描述
        link: `${location.origin}${location.pathname}#${
          that.$route.fullPath
        }&from=share&rphone=${getZphone()}`, //系统地址
        imgUrl: that.imgUrl ? that.imgUrl : location.origin + logoImg,
        success: function () {
          that.onShare();
        },
      });
    },
    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    ShareQQ(that) {
      wx.onMenuShareQQ({
        //分享信息内容配置
        title: that.data.Title,
        desc: that.data.outline, // 分享描述
        link: `${location.origin}${location.pathname}#${
          that.$route.fullPath
        }&from=share&rphone=${getZphone()}`, //系统地址
        imgUrl: that.imgUrl ? that.imgUrl : location.origin + logoImg,
        success: function () {
          that.onShare();
        },
      });
    },
    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    ShareWeibo(that) {
      wx.onMenuShareWeibo({
        //分享信息内容配置
        title: that.data.Title,
        desc: that.data.outline, // 分享描述
        link: `${location.origin}${location.pathname}#${
          that.$route.fullPath
        }&from=share&rphone=${getZphone()}`, //系统地址
        imgUrl: that.imgUrl ? that.imgUrl : location.origin + logoImg,
        success: function () {
          that.onShare();
        },
      });
    },
    // 点赞
    goodCli() {
      if (!localStorage.userInfo) {
        logout();
        return;
      }
      let url = "UserInterface/knowledge/UpdateUserKnowledgeFollow.ashx";
      this.$post(url, this.param).then((res) => {
        if (res.rspcode != 1) {
          return;
        }
        if (res.flag == 1) {
          this.good = false;
        } else if (res.flag == 2) {
          this.good = true;
        }
        this.data.followCount = res.followCount;
        // this.getInfoData();
      });
    },
    // 分享
    onSelect(option) {
      // console.log(option);
      // if(option.name == '复制链接') {
      //   document.execCommand("Copy"); // 执行浏览器复制命令
      //   this.$Toast("复制成功");
      //   return
      // }
      this.isSmark = true;
      this.showShare = false;
    },
    onShare() {
      let url = "UserInterface/knowledge/UpdateKnowledgeShareCount.ashx";
      this.$post(url, this.param).then((res) => {});
    },
    // 立即查看按钮跳转
    linkAddres() {
      if (this.data.LinkAddress) {
        window.location.href = this.data.LinkAddress;
      }
    },
    // 获取详情
    getInfoData() {
      this.$Indicator.loading();
      let url = "UserInterface/knowledge/GetKnowledgeDetails.ashx";
      this.$post(url, this.param).then((res) => {
        this.$Indicator.close();
        if (res.rspcode != 1) {
          return;
        }
        this.data = res.data;
        this.title = res.data.SubjectName;
         this.getWechatParm()
        if (res.data.flag == 1) {
          this.good = false;
        } else if (res.data.flag == 2) {
          this.good = true;
          
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
body {
 width: 100%;
  height: 100%;
  
}

document {
  width: 100%;
  height: 100%;
}
.content {
  width: 100% !important;
  box-sizing:border-box;
  background-color: #fff;
  padding: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0;
  >>> p {
    // line-height: 0.36rem !important;
    text-indent: 0px !important;
  }
  // >>> h2 {
  //   line-height: 0.36rem !important;
  // }
  // >>> h3 {
  //   line-height: 0.36rem !important;
  // }
  // >>> h4 {
  //   line-height: 0.36rem !important;
  // }
  // >>> h5 {
  //   line-height: 0.36rem !important;
  // }
  // >>> h6 {
  //   line-height: 0.36rem !important;
  // }
  // >>> span {
  //   line-height: 0.36rem !important;
  // }
}
h5 {
  box-sizing:border-box;
  background-color: #fff;
  margin-top: 0.4rem;
  font-size: 0.22rem;
  line-height: 0.26rem;
  display: -webkit-box;
  overflow: hidden;
  /*! autoprefixer: off; */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
// .content >>> img {
//   width: 80%;

//   /* margin: 0.1rem 0; */
//   /* height: 4rem; */
// }
.content >>> img {
  width: 100%;

  /* margin: 0.1rem 0; */
  /* height: 4rem; */
}
.content >>> p {
  line-height: 0.3rem;
}
.line {
  width: 100;
  height: 1px;
  margin: 0 0.1rem;
  background-color: #ccc;
}
.link_address .left_text {
  background-color: #fff;
  padding: 0 0.15rem;
  /* margin-top: -0.3rem; */
  display: flex;
  justify-content: space-between;
}

.left_text p {
  padding: 0.1rem 0;
  line-height: 0.2rem;
  font-size: 0.14rem;
}
.left_text p:nth-child(2) i {
  vertical-align: middle;
}
.left_text p:nth-child(3) .good {
  font-size: 0.16rem;
  vertical-align: middle;
}
.left_text p:nth-child(1) span {
  padding: 0.02rem 0.1rem;
  background-color: #feeee0;
  border-radius: 0.12rem;
  color: #f08622;
}
.li_top {
  background-color: #fff;
  padding: 0.1rem;
  display: flex;
  justify-content: space-between;
}
.li_top img {
  margin-top: -0.03rem;
  width: 0.2rem;
  height: 0.2rem;
  display: inline-block;
  vertical-align: middle;
}
.li_top span {
  line-height: 0.26rem;
  display: inline-block;
}
.li_top p {
  color: #9a9a9c;
  font-size: 0.12rem;
  line-height: 0.26rem;
}
.link_img {
  margin-top: 0.1rem;
  // margin-bottom: 0.1rem;
  padding: 0.1rem 0.1rem;
  padding-bottom: 0.2rem;

  background-color: #fff;
}
.link_img img {
  border-radius: 0.06rem;
  width: 100%;
  height: 1.2rem;
}
.good1 {
  color: #fe7a3f;
  font-size: 0.16rem;
}
.shareMark{
		img {
			position: absolute;
			right: 10%;
			top: 30px;
			width: 40%;
		}

		.bottom {
			position: absolute;
			bottom: 80px;
			color: #ffffff;
			width: 100%;
			text-align: center;
		}

		.bottom .tip {
			margin-bottom: 30px;
		}

		.bottom .btn {
			display: inline-block;
			border: 1px solid #ffffff;
			border-radius: 3px;
			text-align: center;
			margin: 0 auto;
			padding: 7px 15px;
			line-height: 1;
		}
	}
</style>