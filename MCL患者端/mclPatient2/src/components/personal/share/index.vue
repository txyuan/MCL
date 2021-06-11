<template>
<div>
  <div class="padding-header">
  <mt-header title="邀请好友" class="is-fixed">
    <div slot="left"  v-show="isBtn">
      <header-back>
        <mt-button icon="back"></mt-button>
      </header-back>
    </div>
  </mt-header>
  <div class="sharbody">
    <!-- <img v-lazy="sharBg" class="sharebg"/> -->
		<img src="@/assets/images/yaoqingw.png" class="sharebg" />
    <div class="code_img">
      <img v-lazy="MyQrCodeSrc" alt="" width="100%">
    </div>
    <div class="btn-group">
      <mt-button type="danger" class="share_btn" size="large" v-on:click="shareclick('friend')" v-show="isBtn">分享微信好友</mt-button>
      <mt-button type="danger" class="share_btn" size="large" v-on:click="shareclick('circle')" v-show="isBtn">分享朋友圈</mt-button>
    </div>

  </div>
  </div>
  <!--  分享蒙版  -->
  <div id="smark" v-on:click="shareclick" v-show="isSmark">
    <img src="https://resource.jtsc.club/share.png" v-if="false"/>
    <div class="bottom">
      <p class="tip" style="margin-bottom: 100px;font-size: 20px">请长按图片进行分享</p>
      <!--<p class="tip">请点击右上角分享</p>-->
      <p class="btn">我知道了</p>
    </div>
  </div>
  <div class="sharebot"></div>
</div>

</template>

<script>
    /*引入微信js-sdk */
    // import remoteJs from "@/components/common/remote-js.js"
    // remoteJs('https://res.wx.qq.com/open/js/jweixin-1.1.0.js');
    // import sharBg from "./../../../assets/images/sharebg.png"
    //系统logo
    // import logoImg from '@/assets/images/logo.jpg';
    let rphone = ""; //推荐人的手机号
    export default {
        name: "share",
        data:()=>({
          sharBg: "@/assets/images/yaoqing.png",
          MyQrCodeSrc: '',
          WechatParm:{},  //公众号信息
          shareObj:{  //分享信息内容配置
            title: '万象商纬邀请您加入！享受幸福创业的乐趣，从此开始！',
            desc:"点击注册并下载万象商纬，让您创业无忧！",
            link: ``, //系统分享页面地址
            imgUrl: 'https://resource.jtsc.club/wanxiang.png'
          },
          isSmark: false,
          isBtn: true,
          styleObj: {},
        }),
        methods:{
          //  获取二维码
          sell(){
            let {UserKey,SessionId} = this.$route.query;
            let url = `/UserInterface/user/GetUserShareInfo.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
            let href = window.location.href.split('#')[0];
						// let href = 'http://123.57.89.89:5334/';
            return this.$post(url,{Url: href}).then((data)=>{
              if(data.rspcode != 1){ return };
              let model = data.data;
              this.MyQrCodeSrc =  model.MyQrCodeSrc;
              this.shareObj.link =  model.SharedUrl;
              //this.WechatParm = model.WechatParm;
            })
          },
          //  点击分享
          shareclick(type){
            const {title,desc,link,imgUrl} = this.shareObj;
            location.href =  `share.html?type=${type}&title=${title}&desc=${desc}&imgUrl=${imgUrl}&link=${link}`
            // this.isSmark = !this.isSmark;
          },
          //微信配置
          wxConfig(){
            let WechatParm = this.WechatParm;
            wx.config({
                debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: WechatParm.AppId,// 必填，公众号的唯一标识
                timestamp: WechatParm.Timestamp,// 必填，生成签名的时间戳
                nonceStr: WechatParm.NonceStr,// 必填，生成签名的随机串
                signature: WechatParm.Signature,// 必填，签名，
                jsApiList: [ 'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
            });
          },
          //微信read回调
          wxRead(){
            wx.ready(()=>{
              this.ShareTimeline();
              this.ShareAppMessage();
              this.ShareQQ();
              this.ShareWeibo();
            })
          },
          // 2.3 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
          ShareTimeline(){
            wx.onMenuShareTimeline(this.shareObj)
          },
          // 2.3 监听“分享给朋友”按钮点击、自定义分享内容及分享结果接口
          ShareAppMessage(){
            wx.onMenuShareAppMessage(this.shareObj)
          },
          // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
          ShareQQ(){
            wx.onMenuShareQQ(this.shareObj)
          },
          // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
          ShareWeibo(){
            wx.onMenuShareWeibo(this.shareObj)
          }
        },
        mounted(){
          this.sell().then(()=>{
            // this.wxConfig();  //微信配置
            // this.wxRead();  //微信read回调
          });
          if(this.$route.query.from == "share"){
            this.isBtn = false;
          };
        }
    }
</script>

<style scoped>
  .sharbody{
     width: 100%;
     height:  calc( 100vh - 43px);
     overflow: hidden;
     position: relative;
     background: #F07F4B;
   }
  .sharbody .sharpic img{
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    margin-left: -0.25rem;
    top: 0.3rem;
  }
  .sharbody .sharpic p{
    width: 100%;
    text-align: center;
    font-size: 0.2rem;
    color: #333;
    margin-top: 1.0rem;
    float: left;
  }
  .sharebg{
    width: 100%;
    display: block;
  }
  .code_img{
    width: 136px;
    /* border: 2px solid orange; */
    height: 136px;
    padding: 10px;
    /* box-sizing: border-box; */
    display: block;
    background: #ffffff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 186px;
    margin: auto;
    z-index: 99;
		border-radius: 6px;
  }
  .btn-group{
    width: 80%;
    /*margin-top: 0.3rem;*/
    position: fixed;
    bottom: 26px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 999;
  }
  .btn-group .share_btn{
    margin-bottom: 20px;
  }
#smark{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.6);
  text-align: center;
  z-index: 9;
}
#smark img{
  position: absolute;
  right: 10%;
  top: 30px;
  width: 40%;
}
#smark  .bottom{
  position: absolute;
  bottom: 80px;
  color: #ffffff;
  width: 100%;
}
#smark  .bottom .tip{
  margin-bottom: 30px;
}
#smark  .bottom .btn{
  display: inline-block;
  border: 1px solid #ffffff;
  border-radius: 3px;
  text-align: center;
  text-align: center;
  margin: 0 auto;
  padding: 7px 15px;
  line-height: 1;
}
  .sharebot{
    width: 94%;
    position: fixed;
    bottom: 0.2rem;
    left: 3%;
    /* background: #fff url("../../../assets/images/yaoqing.png") no-repeat; */
    background-size: 100%;
    height: 330px;
    border-radius: 8px;
  }
</style>
