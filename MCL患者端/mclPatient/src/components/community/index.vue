<template>
  <div class="community-root">
    <div id="body_main" style="padding-top: 88px;">
  		<mt-header title="社区" fixed> </mt-header>

		  <!-- mt-navbar -->
		  <div id="navbar" class="fix_top" style="top: 43px;">
		    <mt-navbar v-model="ABflag">
		      <mt-tab-item v-for="(item,index) in navbarList" :key="index" :class="(ABflag == item.type)&&'is-selected'" @click.native="toggleType(item)"><p>{{item.name}}</p></mt-tab-item>
		    </mt-navbar>
		  </div>

		  <!-- 内容 -->
		  <div class="neirong">

		  	<!-- 发布按钮 -->
		  	<div class="addPublic">
		  		<router-link to="/publish">
		  			<img src="@/assets/images/fabu@2x.png" width="60"/>
		  		</router-link>
		  	</div>

		  	<loadMore :param="param" @triggerGetList="getList" ref="loadMore">
		  		<div slot="content">
					<div class="content" v-show="ABflag == 1">
						<router-link tag="div" to="/edition">
							<div class="education marginTop10">
								<div class="title font16">在线教育</div>
								<img src="@/assets/images/位图@2x.png" width="100%"/>
							</div>
						</router-link>

						<div class="chart marginTop10" v-for="(item, index) in dynamicList" :key="index">
							<div class="title font16" v-if="index == 0">所有动态</div>
							<mt-cell>
                <img slot="icon" :src="item.userImg"  class="headPortrait">
							  <div slot="title" class="titleWrap">
								<span class="mint-cell-text">{{item.nickname}}</span>
								<span class="mint-cell-label font12 huiFont99">{{item.createTime}}</span>
                  <router-link tag="p" :to="`/chartDetail?id=${item.sKey}`" class="yellow font14">查看全文</router-link>
                  <p class="detail font14">{{item.content}}</p>
							  </div>
							</mt-cell>
							<ul class="showPic">
								<li v-for="(imgItem, imgIndex) in item.imgList" :key="imgIndex"><img :src="imgItem.img" width="100%"/></li>
							</ul>
							<!-- <div class="showVideo">
								<img src="@/assets/images/位图@2x.png" width="100%"/>
								<img src="@/assets/images/bofang@2x.png" class="play"/>
							</div> -->
							<div class="bar clear">
								<div class="xin" :class="{'active': item.followStatus == 1}" @click="doFollow(item)">{{item.followCount}}</div>
							 <router-link tag="div" :to="`/chartDetail?id=${item.sKey}`" class="pinlun">{{item.commentCount}}</router-link>
								<div class="xing" :class="{'active': item.praiseStatus == 1}" @click="doPraise(item)">{{item.praiseCount}}</div>
<!--								<div class="share">&nbsp;</div>-->
							</div>
						</div>
					</div>

					<div class="content" v-show="ABflag == 2">
						<router-link  v-for="(item, index) in activeList" :key="index" tag="div" :to="`/activetyDetail?id=${item.acskey}`">
							<div class="activity marginTop10">
								<div class="item margin10">
									<img :src="item.acimg" alt="" width="100%" class="pic"/>
									<div class="activity-bar font12 huiFont">
										<div>
											<img src="@/assets/images/yijieshu@2x.png" class="icon" width="15"/>
											<span>{{item.acsdt}} ～ {{item.acedt}}</span>
										</div>
										<span>{{item.signupnumber}}人报名</span>
									</div>
								</div>
							</div>
						</router-link>

					</div>

					<div class="content" v-show="ABflag == 3">
						<div class="activity marginTop10">
							<div class="item margin10" v-for="(item, index) in caseList" :key="index">
								<img :src="item.caseImg" alt="" width="100%" class="pic"/>
								<div class="activity-bar font12 huiFont">
									<div>
										<img src="@/assets/images/yijieshu@2x.png" class="icon" width="15"/>
										<span class="font16">{{item.caseName}}</span>
									</div>
									<span>{{item.casePeopleCount}}</span>
								</div>
							</div>
						</div>
					</div>

					<div class="content" v-show="ABflag == 4">

						<div class="chart marginTop10" v-for="(item, index) in myDynamicList" :key="index">
							<div class="title font16" v-if="index == 0">我的所有动态</div>
							<mt-cell>
							  <img slot="icon" :src="item.userImg" width="46" height="46">
							  <div slot="title" class="titleWrap">
								<span class="mint-cell-text">{{item.nickname}}</span>
								<span class="mint-cell-label font12 huiFont99">{{item.createTime}}</span>
							  </div>
							  <div class="font14 huiFont99">
								<mt-badge size="normal" color="#F78335" @click.native="delDynamic(item, index)">删除</mt-badge>
								<mt-badge size="normal" color="#888" v-if="item.state == 1">审核中</mt-badge>
								<mt-badge size="normal" color="#F78335" v-if="item.state == 2">已审核</mt-badge>
							  </div>
							</mt-cell>
							<p class="detail font14">{{item.content}}</p>
							<router-link tag="p" :to="`/chartDetail?id=${item.sKey}`" class="yellow font14">查看全文</router-link>
							<ul class="showPic">
								<li v-for="(imgItem, imgIndex) in item.imgList" :key="imgIndex"><img :src="imgItem.img" width="100%"/></li>
							</ul>
							<!-- <div class="showVideo">
								<img src="@/assets/images/位图@2x.png" width="100%"/>
								<img src="@/assets/images/bofang@2x.png" class="play"/>
							</div> -->
							<div class="bar clear">
								<div class="xin" :class="{'active': item.followStatus == 1}" @click="doFollow(item)">{{item.followCount}}</div>

                <router-link tag="div" :to="`/chartDetail?id=${item.sKey}`" class="pinlun">{{item.commentCount}}</router-link>
<!--                <div class="pinlun">{{item.commentCount}}</div>-->
								<div class="xing" :class="{'active': item.praiseStatus == 1}" @click="doPraise(item)">{{item.praiseCount}}</div>
<!--								<div class="share">&nbsp;</div>-->
							</div>
						</div>
					</div>
				</div>
			</loadMore>

		  </div>
    </div>
  </div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "community",
        data:()=>({
			ABflag: 1,
			navbarList:[{name:"动态",type:1},{name:"活动",type:2},{name:"案例",type:3},{name:"我的",type:4}],
			param : {
			  pagesize: 10,
			  pagecount: 0
			},
			dynamicList:[],  //动态列表
			activeList:[],  //活动列表
			caseList:[],    //案例列表
			myDynamicList:[]//我的动态列表
        }),
        methods:{
        	toggleType(item){
        		this.ABflag = item.type;
				this.dynamicList = [];
				this.activeList = [];
				this.caseList = [];
				this.myDynamicList = [];
				this.param.pagecount = 0;
				this.$refs.loadMore.getList();
        	},
			//加载页面列表
			getList(success){
				if(this.ABflag == 1){
					this.getDynamicList(success)  //动态
				}else if(this.ABflag == 2){
					this.getActiveList(success)   //动态
				}else if(this.ABflag == 3){
					this.getCaseList(success)   //案例
				}else if(this.ABflag == 4){
					this.getMyDynamicList(success)   //我的动态
				}
			},
			//获取动态列表
			getDynamicList(success){
			  let param = JSON.parse(JSON.stringify(this.param));
			  param.dynamicFlag = 0;  //动态区分（0：全部，1：我的）
			  let url = "UserInterface/GetCommunityDynamicInfo.ashx";
			  this.$post(url,param).then((data)=>{
				if(data.rspcode != 1 ){
				  return;
				}
				let modelList = data.dynamicList;
				if(this.param.pagecount == 1){
				  this.dynamicList = [...modelList];
				}else{
				  this.dynamicList = [...this.dynamicList,...modelList]
				}
				//加载更多组件触发回调
				if(success){
				  success(modelList,this.dynamicList)
				}
			  })
			},
			//获取我的态列表
			getMyDynamicList(success){
			  let param = JSON.parse(JSON.stringify(this.param));
			  param.dynamicFlag = 1;  //动态区分（0：全部，1：我的）
			  let url = "UserInterface/GetCommunityDynamicInfo.ashx";
			  this.$post(url,param).then((data)=>{
				if(data.rspcode != 1 ){
				  return;
				}
				let modelList = data.dynamicList;
				if(this.param.pagecount == 1){
				  this.myDynamicList = [...modelList];
				}else{
				  this.myDynamicList = [...this.myDynamicList,...modelList]
				}
				//加载更多组件触发回调
				if(success){
				  success(modelList,this.myDynamicList)
				}
			  })
			},
			//获取活动列表
			getActiveList(success){
			  let param = this.param;
			  let url = "UserInterface/GetCommunityActivity.ashx";
			  this.$post(url,param).then((data)=>{
				if(data.rspcode != 1 ){
				  return;
				}
				let modelList = data.aclist;
				if(this.param.pagecount == 1){
				  this.activeList = [...modelList];
				}else{
				  this.activeList = [...this.activeList,...modelList]
				}
				//加载更多组件触发回调
				if(success){
				  success(modelList,this.activeList)
				}
			  })
			},
			//获取案例列表
			getCaseList(success){
			  let param = this.param;
			  let url = "UserInterface/GetCommunityCaseList.ashx";
			  this.$post(url,param).then((data)=>{
				if(data.rspcode != 1 ){
				  return;
				}
				let modelList = data.caseList;
				if(this.param.pagecount == 1){
				  this.caseList = [...modelList];
				}else{
				  this.caseList = [...this.caseList,...modelList]
				}
				//加载更多组件触发回调
				if(success){
				  success(modelList,this.caseList)
				}
			  })
			},

			//动态好评
			doPraise(item){
				const praiseStatus = (item.praiseStatus == 1 ? 0 : 1);
				let param = {
					contentSkey: item.sKey,  //动态Key
					praise: praiseStatus,  //1,好评 ;0,取消好评
				};
				let url = "UserInterface/CommunityDynamicPraise.ashx";
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					  return;
					}
					//修改页面数值
					let praiseCount = Number(item.praiseCount);
					item.praiseCount = (praiseStatus == 1 ? praiseCount+=1 : praiseCount-=1)
					item.praiseStatus = praiseStatus;
				})
			},

			//动态关注
			doFollow(item){
				const followStatus = (item.followStatus == 1 ? 0 : 1);
				let param = {
					contentSkey: item.sKey,  //动态Key
					follow: followStatus,  //1,关注 ;0,取消关注
				};
				let url = "UserInterface/CommunityDynamicFollow.ashx";
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					  return;
					}
					//修改页面数值
					let followCount = Number(item.followCount);
					item.followCount = (followStatus == 1 ? followCount+=1 : followCount-=1)
					item.followStatus = followStatus;
				})
			},

			//删除动态
			delDynamic(item, index){
				let param = {
					contentSkey: item.sKey,  //动态Key
				};
				let url = "UserInterface/DelCommunityDynamic.ashx";
				this.$post(url,param).then((data)=>{
					this.$Toast(data.rspdesc);
					if(data.rspcode != 1 ){
					  return;
					}
					this.myDynamicList.splice(index,1);
				})
			}
        },
		components:{
			loadMore
		}
    }
</script>

<style scoped lang="scss">
  .titleWrap{
  	display: inline-block;
  	vertical-align: middle;
    padding:2px 2px 2px 50px;
    span.mint-cell-text,span.mint-cell-label{
      display: inline-block;
      line-height: 23px;
      margin-top: 0;
    }
    .yellow{
    right: 2px;
    position: absolute;
    top: 2px;
    line-height: 23px;
  }

  }
  .title{
  	line-height: 0.48rem;
  	color: #000000;
  }
  .addPublic{
  	position: fixed;
  	bottom: 20%;
  	right: 20px;
  	z-index: 99999999;
  }
  /* 动态 */
  .education,.chart{
  	background: #FFFFFF;
  	padding: 0.15rem;
  }
  .education{padding-top: 0;}
  .chart{
     padding-bottom: 0;
    .headPortrait{
      width: 46px;
      height: 46px;
      position: absolute;
      top: 0;
      left: 0;
    }}
  .content .chart:nth-of-type(2){
  	padding-top: 0;
  }

  .education img{
  	border-radius: 5px;
  }
  .chart .detail{
    padding: 0.025rem 0;
    line-height: 21px;
    color: #666;
    max-height: 36px;
  }
  .showPic{
    margin: 0.1rem 0 0.1rem 46px;
  	display: flex;
  	justify-content: flex-start;
  	li{
		width: 32%;
		margin-right: 2%;
  	}
	li:last-child{
		margin-right: 0px;
	}
  	img{
  		border-radius: 5px;
      object-fit:cover;
      height: 100%;
      width: 100%;
  	}
  }
  .showVideo{
  	position: relative;
  	margin: 0.05rem 0;
  	img{
  		border-radius: 5px;
  	}
  	.play{
  		width: 0.55rem;
  		height: 0.55rem;
  		position: absolute;
  		top: 0;
  		bottom: 0;
  		left: 0;
  		right: 0;
  		margin: auto;
  	}
  }

  .bar>*{
  	display: inline-block;
  	float: left;
  	padding-left: 0.23rem;
  	margin-right: 0.12rem;
  	background: url("../../assets/images/心@2x.png") no-repeat 0.02rem center;
  	background-size: 0.15rem;
  	font-size: 0.14rem;
    color: #666;
  }
  .bar{
  	padding: 0.05rem 0 0.15rem 46px;
  	&>.xin{
  		background-image: url("../../assets/images/心@2x.png");
  	}
  	&>.xin.active{
  		background-image: url("../../assets/images/心备份@2x.png");
  	}

  	&>.pinlun{
  		background-image: url("../../assets/images/评论备份2@2x.png");
  	}

  	&>.xing{
  		background-image: url("../../assets/images/星星(1)@2x.png");
  	}
  	&>.xing.active{
  		background-image: url("../../assets/images/星星(1)备份@2x.png");
  	}

  	&>.share{
  		float: right;
  		margin-right: 0;
  		background-image: url("../../assets/images/分享备份@2x.png");
  	}

  }
  /*活动*/
  .activity{
  	.item{
  		margin-left: 0.15rem;
  		margin-right: 0.15rem;
  		background: #FFFFFF;
  		border-radius: 5px;
  		overflow: hidden;
  	}
  	.pic{
  		display: block;
  	}
  	.activity-bar{
  		display: flex;
  		justify-content: space-between;
  		align-items: baseline;
  		padding: 0.08rem;
  		.icon{
  			vertical-align: text-top;
  		}
  	}
  }
</style>

<style type="text/css">
	.community-root .mint-cell .mint-cell-wrapper{
		padding: 0;
	}
	.community-root .mint-badge{
		font-size: 12px;
		padding: 3px 10px;
	}
</style>
