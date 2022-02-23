<template>
  <div style="">
    <mt-header style="background-color: #38c2d7; color: #fff" :title="$route.query.Title" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <h5>{{ data.Title }}</h5>
    <div class="li_top">
      <div class="left_img">
        <img :src="data.platformLogo" alt="" />
        <span style="font-size: 0.14rem">{{ data.platformName }}</span>
        <span style="color: #737172; font-size: 0.14rem">{{
          data.Subtitle
        }}</span>
      </div>
      <p>{{ data.create_time }}</p>
    </div>
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
        <p>
          <van-icon
            v-if="good"
            @click="goodCli"
            class="good"
            name="good-job-o"
          /><van-icon
            v-else
            @click="goodCli"
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
      good: true,
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
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: '朋友圈', icon: 'wechat-moments' },
        // { name: "复制链接", icon: "link" },
      ],
      isSmark: false,
    };
  },
  created() {
    // this.onShare()
    this.getInfoData();
    this.getWechatParm();
    if (this.$route.query.rphone) {
      localStorage.setItem("hphone", this.$route.query.rphone);
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
      this.onShare()
      wx.onMenuShareTimeline(this.shareObj);
    },
    // 2.3 监听“分享给朋友”按钮点击、自定义分享内容及分享结果接口
    ShareAppMessage() {
      this.onShare()
      wx.onMenuShareAppMessage(this.shareObj);
    },
    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    ShareQQ() {
      this.onShare()
      wx.onMenuShareQQ(this.shareObj);
    },
    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    ShareWeibo() {
      this.onShare()
      wx.onMenuShareWeibo(this.shareObj);
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
        this.data.followCount = res.followCount
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
      this.isSmark = true
      this.showShare = false;
    },
    onShare() {
      let url = 'UserInterface/knowledge/UpdateKnowledgeShareCount.ashx'
      
      this.$post(url,this.param).then((res) => {
       
      });
    },
    // 立即查看按钮跳转
    linkAddres() {
      if (this.data.LinkAddress) {
        window.location.href = this.data.LinkAddress;
      }
    },
    // 获取详情
    getInfoData() {
      let url = "UserInterface/knowledge/GetKnowledgeDetails.ashx";
      this.$post(url, this.param).then((res) => {
        if (res.rspcode != 1) {
          return;
        }
        this.data = res.data;
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
.content {
  background-color: #fff;
  padding: 0.1rem;
  padding-top: 0;
  padding-bottom: 0;
}
h5 {
  background-color: #fff;
  margin-top: 0.4rem;
  padding: 0.2rem;
  padding-bottom: 0.1rem;
  font-size: 0.16rem;
}
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
  padding: 0.1rem 0.15rem;
  /* margin-top: -0.3rem; */
  display: flex;
  justify-content: space-between;
}

.left_text p {
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
  width: 0.2rem;
  height: 0.2rem;
  display: inline-block;
  vertical-align: middle;
}
.li_top span {
  display: inline-block;
}
.li_top p {
  color: #9a9a9c;
  font-size: 0.12rem;
  line-height: 0.26rem;
}
.link_img {
  margin-top: 0.1rem;
  padding: 0.1rem 0.1rem;

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