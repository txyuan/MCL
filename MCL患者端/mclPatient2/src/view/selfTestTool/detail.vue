<template>
    <div class="padding-header page-bg-white">
        <mt-header :title="title" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>

        <div class="content" :class="$route.query.type">
            <div class="panel">
               <div class="panel-title">{{title}}</div>
               <div class="section" v-html="SubjectMemo"></div>
               <img v-if="$route.query.type == 'BMI'" src="@/assets/images/selfTestTool/bg/BMI.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'energy'" src="@/assets/images/selfTestTool/bg/每日所需能量.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'protein'" src="@/assets/images/selfTestTool/bg/每日所需蛋白量.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'water'" src="@/assets/images/selfTestTool/bg/每日所需饮水量.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'weight'" src="@/assets/images/selfTestTool/bg/标准体重.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'actualIntake'" src="@/assets/images/selfTestTool/bg/每日实际摄入量.png" alt="" width="100%" class="bgImg">
               <mt-button type="primary" class="theme-button" size="large" @click.native="$router.push({name: 'toolHome', query: $route.query, params:{type: $route.query.type}})">立即自测 <!--  <span style="font-size: 12px">（1元1次）</span>--> </mt-button>
            </div>
        </div>

    </div>
</template>

<script>
import { getDetail } from "@/api/selfTest.js"
import { setRhone,getZphone } from "@/utils/storage.js"
import { getWechatParm } from "@/api/wx"
 
//系统logo
import logoImg from '@/assets/images/mclogo.png';
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js"
remoteJs('https://res.wx.qq.com/open/js/jweixin-1.1.0.js');

export default {
    data() {
        const title = this.$route.query.SubjectName
        return {
            title,
            ImageUrl: "",
            SubjectMemo: "",
            WechatParm: {}, //公众号信息
            shareObj: { //分享信息内容配置
              title: `自测工具—${title}`,
              desc: '', // 分享描述
              link: `${location.origin}${location.pathname}#${this.$route.fullPath}`, //系统地址
              imgUrl: (location.origin + logoImg)
            },
        }
    },
    methods:{
        async getInfo(){
            const param = {skey: this.$route.query.skey}
            const data = await getDetail(param);
            this.ImageUrl = data.ImageUrl;
            this.SubjectMemo = data.SubjectMemo;
        },
        getDesc(){
            const wrap = document.createElement("div")
            wrap.innerHTML = this.SubjectMemo
            
            function getSpanText() {
            const span = wrap.querySelector("span")
            const desc = span.innerText
            span.parentNode.removeChild(span);
            return desc ? desc : getSpanText()
            }

            return getSpanText()
        },
        // 获取微信公众号配置
        async getWechatParm(){
            const data = await getWechatParm();
            this.WechatParm = data.WechatParm
            this.shareObj.desc = this.getDesc() // 分享的描述
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
                jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
            });
        },
        //微信read回调
        wxRead() {
            wx.ready(() => {
                this.ShareTimeline();
                this.ShareAppMessage();
                this.ShareQQ();
                this.ShareWeibo();
            })
        },
        // 2.3 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        ShareTimeline() {
            wx.onMenuShareTimeline(this.shareObj)
        },
        // 2.3 监听“分享给朋友”按钮点击、自定义分享内容及分享结果接口
        ShareAppMessage() {
            wx.onMenuShareAppMessage(this.shareObj)
        },
        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
        ShareQQ() {
            wx.onMenuShareQQ(this.shareObj)
        },
        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        ShareWeibo() {
            wx.onMenuShareWeibo(this.shareObj)
        }
    },
    async created() {
        await this.getInfo()
        // 通过转发小工具转发进来的情况，获取链接上的推荐码
        const query = this.$route.query
        if(query.doctorPhone){
            setRhone(query.doctorPhone)
            this.getWechatParm()  // 设置分享链接
        }else {
             this.shareObj.link = `${location.origin}${location.pathname}#${this.$route.fullPath}&rphone=${getZphone()}`
             this.getWechatParm()
        }
    },
     mounted() {
       
       if(this.$route.query.rphone) {
           localStorage.setItem('hphone','')
          localStorage.setItem('hphone',this.$route.query.rphone)
        }
    }
}
</script>
<style scoped lang='scss'>
/* @import url(); 引入css类 */
.banner {
   padding: 0.15rem;
   padding-bottom: 0;
}
.content{
    height: calc(100vh - 43px);
    overflow: hidden;
    overflow-y: scroll;
    background: url("../../assets/images/selfTestTool/bg/BMIbg.jpg") no-repeat;
    background-size: 100% auto;
    &.BMI{
        background-image: url("../../assets/images/selfTestTool/bg/BMIbg.jpg");
        background-color: #A5BFF2;
        .panel .panel-title,.theme-button,.section{color: #505a88;}
    }
    &.energy{
        background-image: url("../../assets/images/selfTestTool/bg/每日所需能量bg.jpg");
        background-color: #CAC7F4;
        .panel .panel-title,.theme-button,.section{color: #7056b2;}
    }
    &.protein{
        background-image: url("../../assets/images/selfTestTool/bg/每日所需蛋白量bg.jpg");
        background-color: #B2F1E9;
        .panel .panel-title,.theme-button,.section{color: #38b5b9;}
    }
    &.water{
        background-image: url("../../assets/images/selfTestTool/bg/每日所需饮水量bg.jpg");
        background-color: #C6E3A9;
        .panel .panel-title,.theme-button,.section{color: #88a531;}
    }
    &.weight{
        background-image: url("../../assets/images/selfTestTool/bg/标准体重bg.jpg");
        background-color: #BCF2DA;
        .panel .panel-title,.theme-button,.section{color: #69b273;}
    }
    &.actualIntake{
        background-image: url("../../assets/images/selfTestTool/bg/每日实际摄入量bg.jpg");
        background-color: #F0DEB8;
        .panel .panel-title,.theme-button,.section{color: #ac7f29;}
        .panel {padding-bottom: 0.10rem;}
    }
}
.panel{
    width: 84%;
    margin: 0.6rem auto  0.3rem;
    padding-top: 1px;

    background: rgba(255,255,255, 0.4);
    border-radius: 0.15rem;
    box-sizing: border-box;
    position: relative;
    .theme-button{
        width: 65%;
        background: #FFF;
        color: #505a88;
        border-radius: 20px;
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        margin: auto;
    }
    .bgImg{
        display: block;
    }
    .panel-title{
        color: #505a88;
        font-size: 0.26rem;
        margin-top: -0.15rem;
        margin-left: 0.15rem;
        letter-spacing: 1px;
    }
}
.section{
    font-size: 0.13rem;
    color: #505a88;
    padding: 0.1rem 0.15rem;
  min-height: 1.15rem;
  >>>p{

    line-height: 1.5!important;
  }
>>>span{
  font-size: 0.13rem!important;
}
}

.section-title {
  line-height: 0.55rem;
  font-weight: bold;
}
.section-title span {
  margin-left: 0.1rem;
}
.section-title::before {
  content: "";
  width: 4px;
  height: 0.18rem;
  border-radius: 2px;
  margin-top: -1px;
  display: inline-block;
  vertical-align: middle;
  background: #0ac5ca;
}
.section-content{
    font-size: 0.14rem;
}
</style>