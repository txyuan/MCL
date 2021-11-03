<template>
  <div class="padding-header padding-footer page-bg-white" style="padding-bottom: 0.6rem">
    <mt-header :title="title" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>

    <div class="navbar">
        <ul>
            <li v-for="(item, index) in list" :key="index" :class="{'active': index == navIndex}" @click="toggle(item, index)">{{item.parentName}}</li>
        </ul>
    </div>
    <div class="content" v-html="content">
    </div>
    <div class="fix_bottom">
    <mt-button type="primary" class="theme-button" size="large" @click.native="$router.push({name: 'complicationHome', params: {type: list[0].self_test_url}, query: $route.query})">立即自测</mt-button>
    </div>
  </div>
</template>

<script>
import {getList2} from "@/api/complication"
import { setRhone } from "@/utils/storage.js"
import { getWechatParm } from "@/api/wx"
//系统logo
import logoImg from '@/assets/images/mclogo.png';
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js"
remoteJs('https://res.wx.qq.com/open/js/jweixin-1.1.0.js');
  
export default {
    data: function() {
        const {title, skey} = this.$route.query
        return {
            title,
            skey,
            navIndex: 0,
            content: "",
            list: [],

            WechatParm: {}, //公众号信息
            shareObj: { //分享信息内容配置
              title: `15种并发症—${title}`,
              desc: '', // 分享描述
              link: `${location.origin}${location.pathname}#${this.$route.fullPath}`, //系统地址
              imgUrl: (location.origin + logoImg)
            },
        }
    },
    methods:{
      toggle(item, index){
        this.navIndex = index
        this.content = item.content
      },
      async getList(){
        const data = await getList2({id: this.skey});
        this.list = data.data
        this.toggle(this.list[0], 0)
      },
      getDesc(){
        const wrap = document.createElement("div")
        wrap.innerHTML = this.list[0].content
        
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
    async created(){
      await this.getList()
      // 通过转发小工具转发进来的情况，获取链接上的推荐码
      const query = this.$route.query
      if(query.doctorPhone){
        setRhone(query.doctorPhone)
        this.getWechatParm()  // 设置分享链接
      }
    }
}
</script>

<style scoped lang="scss">
.navbar{
    margin: 0 0.15rem;
    overflow: hidden;
    overflow-x: scroll;

    ul{white-space: nowrap;
      display: -ms-flexbox!important;
      display: flex!important;
      -ms-flex-pack: justify!important;
      justify-content: space-between!important;
    }
    li{
      display: inline-block;
      line-height: 0.38rem;
      height: 0.425rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #666666;
      font-size: 0.155rem;
      border-bottom: 3px solid transparent;
      padding: 0.05rem 0.01rem 0 0.01rem;
      font-family: 微软雅黑, "Microsoft YaHei";
    }
    li.active{
        color: #0ac5ca;
        border-color: #0ac5ca;
    }
}
.content{
   margin: 0 0.15rem;
   margin-top: 0.1rem;
   font-size: 0.14rem;
   >>> img{
     width: 100%;
   }
}
  .theme-button{
    height: 0.44rem;
    line-height: 0.44rem;
    border-radius:8px;

  }
.fix_bottom{
  background: #ffffff;
  padding: 0.075rem 0.15rem;
}
</style>
