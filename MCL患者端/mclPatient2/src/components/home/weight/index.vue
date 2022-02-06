<template>
  <div class="weigh-root">
    <div id="body_main" style="padding-bottom: 0;">
  		<mt-header title="体重记录" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
	    </mt-header>

		<div class="mag10 bg-white">
			<div class="weight_des" v-html="WeightContent"></div>
			<div class="title"><span class="huiFont font12">单位：公斤</span></div>
			<div id="weighEchart"></div>

			<div class="weight_cla">
				<div class="weight_clared">
					<span></span>
					<p>临界体重：{{dangerWeight}} 公斤</p>
				</div>
				<div class="weight_clared weight_clagre">
					<p>标准体重：{{standardWeight}} 公斤</p>
					<span></span>
				</div>
			</div>

			<div class="btns">
				<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save">记录体重</mt-button>
				<mt-button type="default" class="theme-button button-radio " size="large" @click.native="$router.push({name: 'dietCase'})" style="margin-top: 15px">饮食调查</mt-button>
			</div>
		
        </div>
     
        <div class="mag10 bg-white">
          <div class="jiluInfo">
	  		<ul>
				<h3 class="allweit">体重记录</h3>
				<loadMore :param="param"  @triggerGetList="shoplist" ref="loadMoreE" :isDefaultLoading="false">
					<div slot="content">
					 
		    <div class="flex ac Dark" style="color: #000;font-weight: 600;">
		   	<div class="p-2 " style="width:33%;text-align: center;">
				记录时间
			  </div>
			<div class="p-2 " style="width:33%;text-align: center;">
				体重
			</div>
			<div class="p-2 " style="width:33%;text-align: center;">
				差值
			</div>
		</div>
		<div v-for="(item,index) in list" :key="index">
			<div class="flex ac Dark"  style="color: #333;">
				<div class="p-2 " style="width:33%;text-align: center;">
          <template>
	      <!-- {{item.RecordDate | formater(item.RecordDate)}} -->
	      {{item.RecordDate}}
          </template>
				
				</div>
				
				<div class="p-2 " style="width:33%;text-align: right; padding-right: 0.3rem">
				 {{item.Weight}}
				</div>
				<div class="p-2 " style="width:33%;text-align: right;padding-right: 0.3rem">
				<i v-show="item.Difference < 0" class="icon iconfont icon-icon_xiangxiajiantoucuxiao"></i>
				<i v-show="item.Difference > 0" class="icon iconfont icon-icon_xiangshangjiantoucuxiao"></i>
				{{item.Difference.includes('-') ? item.Difference.substr(1) : item.Difference}}Kg
				</div>
 
			</div>
		</div>

					</div>
				</loadMore>
	  		</ul>
          </div>
	  	</div>
	  	<!-- 遮罩层 -->
	  	<div id="mark" :style="{display: (show?'block': 'none')}">
	  		<div class="modal" :class="show && 'show' ">
	  			<div class="close" @click="hidejl"></div>
	  			<div class="text-center">
<!--	  			 	<p class="today">今天</p>-->
<!--		  			<img src="@/assets/images/paizhao@2x.png" alt="" width="60" height="60"/>-->
<!--		  			<div class="huiFont font12 note">-->
<!--		  				<p>用照片记录改变</p>-->
<!--		  				<p>（照片将自动发布到个人动态中）</p>-->
<!--		  			</div>-->
		  			<!-- <p class="yellow nums"> <span class="num">69.5</span> <span class="font14">公斤</span></p> -->
	  			</div>
	  			<!-- <div class="chizi"></div> -->
          <span class="tit_ys">体重<em>（Kg） </em></span>
	  			<DLRuler :value="50.0" :min="0" :max="300" :onChange="changeWeight"></DLRuler>
	  			<mt-button type="primary" class="theme-button rulerBtm" size="large" @click="okweigt">保存</mt-button>
	  		</div>
	  	</div>

	</div>
  </div>
</template>

<script>
	import echarts from 'echarts';
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	import DLRuler from './ruler.vue';
	import { getWechatParm } from "@/api/wx"
	//系统logo
import logoImg from '@/assets/images/mclogo.png';
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js"
remoteJs('https://res.wx.qq.com/open/js/jweixin-1.1.0.js');

	import { getZphone } from "@/utils/storage.js"
    export default {
        name: "weigh",
        data() {
					return {
				rphone : '', // 用户手机号
				WechatParm: {}, //公众号信息
				shareObj: { //分享信息内容配置
					title: 'MCL-体重',
					desc: '我在医随康分享了我的体重信息，赶快来看看吧。', // 分享描述
					link: `${location.origin}${location.pathname}#${this.$route.fullPath}?rphone=${getZphone()}`, //系统地址
					imgUrl: (location.origin + logoImg)
				},
			WeightContent: '',
			dangerWeight:'',  //危险体重
			standardWeight:'',  //标准体重
			show: false,
			startWeight:'',  //开始体重
			startRecordDate:'',  //开始记录日期
			newWeight:'',  //最新体重
			newRecordDate:'',  //最新记录日期
			list:[],
			wegvale:50,
			param:{
			  pagesize: 10,
			  pagecount: 0,
			},
					}
				},
        methods:{
			
        	initEchart(){
        		var option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                },
                textStyle: {
                  fontWeight: 'lighter',
                  fontSize: 13
                }
              },
        			grid:{
        				top: 20,
        				bottom: 40
        			},
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: [],
              axisLabel: {
                color: '#787878',
              },
              axisLine: {
                lineStyle: {
                  color: '#979797'
                }
              },
              axisTick: {
                // show: false,
                lineStyle: {
                  color: '#979797'
                }
              },
              nameTextStyle: {
                align: 'left',
              },
              offset: 4
				    },
				    yAxis: {
				        type: 'value',
              axisLine: {
                // show: false
                lineStyle: {
                  color: '#979797'
                }
              },
              axisTick: {
                // show: false

                alignWithLabel: true,
                lineStyle: {
                  color: '#979797'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(241, 240, 240, 1)'
                }
              },
              nameTextStyle: {
                color: '#787878',
                fontSize: 13,
                align: 'center'
              },
              scale: true,
				    },
				    series: [
					    {
					        data: [],
					        type: 'line',
					        // areaStyle: {}
					    },
					    {
					        data: [],
					        type: 'line',
							itemStyle:{
				                normal:{
				                    lineStyle:{
				                        width:1,
				                        type:'dotted'  //'dotted'虚线 'solid'实线
				                    }
				                }
				            },
					    },
					    {
					        data: [],
					        type: 'line',
							itemStyle:{
				                normal:{
				                    lineStyle:{
				                        width:1,
				                        type:'dotted'  //'dotted'虚线 'solid'实线
				                    }
				                }
				            },
					    },
				    ],
				    color:["#0ac5ca", "#d17942", "#162d45"]
				};
        		//获取dom容器
				var myChart = echarts.init(document.getElementById('weighEchart'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				let url = "UserInterface/WeightWeekRecordInfo.ashx";
					this.$post(url).then((data)=>{
					 if(data.rspcode != 1 ){
					   return;
					 }
					 var weighth=[],recordDate=[],dangerWeight=[],standardWeight=[];
					 for(var i=0;i<data.data.length;i++){
						 weighth.push(data.data[i].Weight);
						 recordDate.push(data.data[i].RecordDate);
						 dangerWeight.push(data.data[i].DangerWeight);
						 standardWeight.push(data.data[i].StandardWeight);
					 }
					 option.series[1].data=standardWeight;
					 option.series[0].data=weighth;
					 option.series[2].data=dangerWeight;
					 option.xAxis.data=recordDate;
					this.dangerWeight=data.data[0].DangerWeight;
					this.standardWeight=data.data[0].StandardWeight;
					this.startWeight=data.StartWeight;
					this.startRecordDate=data.StartRecordDate;
					this.WeightContent=data.WeightContent;
					this.newWeight=data.NewWeight;
					this.newRecordDate=data.NewRecordDate;
					myChart.setOption(option);
				})
        	},
				 async getWechatParm() {
        const data = await getWechatParm();
        this.WechatParm = data.WechatParm
        this.wxConfig(); // 微信配置
			  this.wxRead(); // 微信read回调
          },
			//体重记录
			shoplist(success) {
			  let url = "UserInterface/WeightRecordInfo.ashx";
			  this.$post(url,this.param).then((data)=>{
			    if(data.rspcode != 1 ){
			      return;
			    }
				
			    let modelList = data.data;
			    if(this.param.pagecount == 1){
			      this.list = [...modelList];
			    }else{
			      this.list = [...this.list,...modelList]
			    }
			    //加载更多组件触发回调
			    if(success){
			      success(modelList,this.list)
			    }
			  })
			},
        	save(){
        		this.show = true;
        	},
			hidejl(){
				this.show = false;
			},
			// 保存
			okweigt(){
				let url = "UserInterface/UpdateWeightRecord.ashx";
				let param={
					Weight:this.wegvale
				};
				this.$post(url,param).then((data)=>{
					 if(data.rspcode != 1 ){
					   return;
					 }

					 this.$Toast(data.rspdesc);
					 this.show = false;
					 this.initEchart();
					 this.param.pagecount = 0;
					 this.$refs.loadMoreE.getList();
				})
			},
			changeWeight(val) {
				this.wegvale=val;
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


       mounted() {
       this.initEchart();
			this.param.pagecount = 0;
			this.$refs.loadMoreE.getList();
			this.getWechatParm()
		  
        },


		components:{
		  loadMore,
		  DLRuler
		}
    }
</script>

<style scoped lang="scss">
	.weight_des{
		padding: 0.10rem 0.20rem;	
	}
  .mint-header {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .title{
    padding: 0.20rem 0.20rem 0.10rem 0.20rem;
  }
  .title .name{
  	color: #000000;
  }
  #weighEchart{
  	margin: 0 0.2rem;
  	height: 2.5rem;
  }
  .btns{
  	padding: 0.20rem 8% 0.10rem 8%;
    .mint-button--primary {
      background: #0ac5ca!important;
    }
  }

  .jiluInfo{
    width: 86%;
    margin: 0px auto;
  }
  .jiluInfo ul li .num{
  	color: #000000;
  	font-size: 0.20rem;
  }
  .jiluInfo ul li{
  	padding: 0.15rem 0;
  }
  .jiluInfo ul li .row{
  	padding: 0.02rem 0;
  	display: flex;
  	justify-content: space-between;
  	align-items: baseline;
  }
  .mag10{
    margin-top: 0.1rem;
  }
  .modal.show{
    transform: translateY(0);
    min-height: 45%;
    padding-top: 0.35rem;
  }
  .modal{
  	position: absolute;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	background: #FFFFFF;
  	border-top-left-radius: 10px;
  	border-top-right-radius: 10px;
  	transition: transform ease 0.6s;
  	transform: translateY(1000px);
  	.today{
  		margin: 20px 0;
  	}
  	.note{
  		margin-top: 3px;
  		margin-bottom: 20px;
  	}
  	.nums{
  		margin-bottom: 20px;
  	}
  	.num{
  		font-size: 0.25rem;
  	}
	.chizi{
	  height: 0.6rem;
	  background: linear-gradient(180deg,rgba(255,205,80,1) 0%,rgba(252,209,134,1) 100%);
	  margin-bottom: 20px;
	}
    .tit_ys {
      display: block;
      text-align: center;
      font-size: 0.2rem;
      padding-left: 0.2rem;
      padding-bottom: 0.1rem;

      em {
        font-style: normal;
        font-size: 0.15rem;
      }
    }
    .rulerBtm {
      height: 0.44rem;
      line-height: 0.44rem;
      background: #0ac5ca;
      position: absolute;
      bottom: 0.25rem;
      width: 60%;
      margin: 0.1rem 20%;
      border-radius: 0.2rem;
    }
  }
  .close{
	  width: 0.2rem;
	  height: 0.2rem;
	  background: url(./../../../assets/images/guanbi@2x.png) no-repeat center center;
	  background-size: 100%;
	  position: absolute;
	  right: 0.14rem;
	  top: 0.1rem;
  }
  .weight_cla{
	  width: 80%;
	  margin: 0 auto;
	  overflow: hidden;
	  margin-top: 0.1rem;
	  .weight_clared{
		  width: 50%;
		  overflow: hidden;
		  float: left;
		  span{
			  display: block;
			  width: 0.15rem;
			  height: 0.06rem;
			  background: #CB0000;
			  float: left;
			  margin-top: 0.05rem;
			  border-radius: 0.03rem;
		  }
		  p{
			  font-size: 0.12rem;
			  font-weight: 600;
			  color: #CB0000;
			  margin-left: 0.06rem;
			  float: left;
		  }
		  &.weight_clagre{
			  float: right;
			  span{
				  float: right;
				  background: #09AC17;
			  }
			  p{
				  color: #09AC17;
				  float: right;
			  }
		  }
	  }
  }
  .allweit{
	  padding: 0.2rem 0 0.15rem 0;
	  font-weight: 700;
	  font-size: 0.16rem;
    border-bottom: 1px solid #e5e5e5;
  }
	.p-2{
	padding: 20rpx;
  box-sizing: border-box;
}
.flex{
	display: flex;
}
.ac{
	align-items: center;
  border-bottom: 1px solid #ccc;
  height: 0.45rem !important;
  line-height: 0.45rem !important;
}
.icon-icon_xiangxiajiantoucuxiao {
	color: red;
}
.icon-icon_xiangshangjiantoucuxiao {
	color: #09ac17;
}
.icon {
	margin-right: -0.05rem;
}
</style>
