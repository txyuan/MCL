<template>
  <div class="chartDetail-root">
  	<div id="body_main">
  		<mt-header title="动态详情" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
		  </mt-header>

		  <div class="chart marginTop10">
			<mt-cell>
			  <img slot="icon" :src="responceData.userImg" class="headPortrait" width="46" height="46">
			  <div slot="title" class="titleWrap">
				<span class="mint-cell-text">{{responceData.nickname}}</span>
				<span class="mint-cell-label font12 huiFont99">{{responceData.createTime}}</span>
          <p class="detail font14">{{responceData.content}}</p>
			  </div>
			</mt-cell>
<!--			<p class="yellow font14">查看全文</p>-->
			<ul class="showPic">
				<li v-for="(imgItem, imgIndex) in responceData.imgList" :key="imgIndex"><img :src="imgItem.img" width="100%"/></li>
			</ul>
			<!-- <div class="showVideo">
				<img src="@/assets/images/位图@2x.png" width="100%"/>
				<img src="@/assets/images/bofang@2x.png" class="play"/>
			</div> -->
  		</div>

		  <div class="chartContent marginTop10">
		  	<div class="titlewrap">
		  		<div class="title font16 borderBottom"><img src="@/assets/images/评论备份2@2x.png" width="18"/> 全部评论</div>
		  	</div>

		  	<div class="chart-list">
				<div v-if="responceData.commentList.length == 0">
					<p class="text-center font14" style="padding-top: 0.15rem;">暂无评论</p>
				</div>

				<div v-for="(item, index) in responceData.commentList" :key="index">
					<mt-cell @click.native="clickComment(item)">
					  <img slot="icon" :src="item.userImg" class="headPortraits" width="32" height="32">
					  <div slot="title" class="titleWrap">
						<span class="mint-cell-text">{{item.userNickname}}</span>
						<span class="mint-cell-label font12 huiFont99">{{item.commentTime}}</span>
					  </div>
					  <div class="font14 huiFont99">
						<div class="xin" :class="{'active': item.followStatus == 1}" @click.stop="doCommentFollow(item)"></div>
					  </div>
					</mt-cell>
					<p class="chartNei font14">{{item.userComment}}</p>

					<div class="huifu font14" v-if="item.commentReplyList.length>0">
						<div class="inner">
							<p v-for="(reply, i) in item.commentReplyList" :key="i"  @click="clickComment(reply)">
								<span class="yellow">{{reply.userNickname}}：</span>
								{{reply.userReply}}
							</p>
							<!-- <p>
								<span class="yellow">柿子k</span> 回复 <span class="yellow">西红柿m：</span>
								嗯嗯嗯
							</p> -->
						</div>
					</div>
				</div>
			</div>
		</div>

  	</div>

  	<div class="fix_bottom">
  		<div class="input-group">
  			<img src="@/assets/images/edit@2x.png" width="15"/>
  			<input type="text" v-model.trim="commentContent" :placeholder="commentPlaceholder" @keyup.enter="submitComment" ref="commentInput"/>
  		</div>
  		<div class="icons">
			<span class="xing" :class="{'active': responceData.followStatus == 1}" @click="doFollow(responceData)">{{responceData.followCount}}</span>
  			<span class="xin" :class="{'active': responceData.praiseStatus == 1}" @click="doPraise(responceData)">{{responceData.praiseCount}}</span>
  		</div>
  	</div>
  </div>
</template>

<script>
    export default {
        name: "chartDetail",
        data:()=>({
			dynamicKey:"",  //详情key

			responceData:{
				nickname: "",   //用户昵称
				userImg:"",  //用户头像
				createTime:"",  //上传时间（小时单位：1小时前）
				content:"", //content
				imgList: [],  //上传图片信息（多个图片）
				commentList:"", //评论信息
				praiseCount:"",  //好评数量
				followCount:""   //关注数量
			},

			isreplyStatus: false,  //是否是回复状态
			replyKey:"",  //回复评论key
			commentPlaceholder:"说点什么吧！",  //评论的placeholder
			commentContent:"",  //评论的内容

        }),
        methods:{
			//获取页面信息
        	getInfo(){
				let url = "UserInterface/GetCommunityDynamicDetail.ashx";
				let param = {contentSkey: this.dynamicKey};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					  return;
					}
					this.responceData = data;
				})
			},

			//点击评论事件
			clickComment(item){
				//回复状态
				this.isreplyStatus = true;
				this.replyKey = item.commentsKey;
				this.commentPlaceholder = `回复${item.userNickname}: `;
				return this.$refs.commentInput.click();
			},

			//提交评论内容
			submitComment(){
				if(this.commentContent == ""){
				  this.$Toast("请输入评论内容")
				  return;
				}
				if(this.isreplyStatus){
					//回复评论
					this.replyComment()
				}else{
					//添加评论
					this.addComment()
				}
			},
			//添加评论
			addComment(){
				let url = "UserInterface/addDynamicComment.ashx";
				let param = {
					dynamicKey: this.dynamicKey,
					content: this.commentContent  //内容
				};
				this.$post(url,param).then((data)=>{
					this.$Toast(data.rspdesc);
					if(data.rspcode != 1 ){
					  return;
					}
					//清空评论
					this.commentContent = "";
					//更新详情数据
					this.getInfo();
				})
			},
			//回复评论
			replyComment(){
				let url = "UserInterface/addDynamicReply.ashx";
				let param = {
					dynamicKey: this.dynamicKey,
					content: this.commentContent,  //内容
					commentsKey: this.replyKey,  //评论Key
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					  return;
					}
					//清空评论
					this.commentContent = "";
					//回复状态
					this.isreplyStatus = false;
					this.replyKey = "";
					this.commentPlaceholder = "说点什么吧！";
					//更新详情数据
					this.getInfo();
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

			//评论关注
			doCommentFollow(item){
				const followStatus = (item.followStatus == 1 ? 0 : 1);
				let param = {
					commentSkey: item.commentsKey,  //动态Key
					follow: followStatus,  //1,关注 ;0,取消关注
				};
				let url = "UserInterface/CommunityDynamicCommentFollow.ashx";
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					  return;
					}
					//修改状态
					item.followStatus = followStatus;
				})
			},

        },
		mounted: function(){
			//页面详情key
			this.dynamicKey = this.$route.query.id;
			this.getInfo()
		}
    }
</script>

<style scoped lang="scss">
	.titleWrap{
    display: inline-block;
    vertical-align: middle;
    padding-left: 50px;
    padding-top: 2px;
    span.mint-cell-text,span.mint-cell-label{
    display: inline-block;
    line-height: 23px;
      margin-top: 0;
  }
  }
  .headPortrait{
    width: 46px;
    height: 46px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .headPortraits{
       width: 32px;
       height: 32px;
       position: absolute;
       left: 10px;
     }
  .titlewrap{
  	padding-left: 0.15rem;

  }
  .title{
  	line-height: 0.48rem;
  	color: #000000;
  	padding-left: 0.05rem;
  	img{margin-right: 0.05rem;}
  }
  .title>*{vertical-align: middle;}
  /* 动态 */
  .education,.chart{
  	background: #FFFFFF;
  	padding: 0.15rem;
  }
  .education{padding-top: 0;}
  .chart{ }
  .content .chart:nth-of-type(2){
  	padding-top: 0;
  }

  .education img{
  	border-radius: 5px;
  }
  .chart .detail{
    padding: 0.025rem 0;
    line-height: 20px;
    color: #666;
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
      -o-object-fit: cover;
      object-fit: cover;
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
  	padding-left: 0.20rem;
  	margin-right: 0.1rem;
  	background: url("../../assets/images/心@2x.png") no-repeat 0.02rem center;
  	background-size: 0.15rem;
  	font-size: 0.14rem;
  }
  .bar{
  	padding: 0.15rem 0;
  	&>.xin{
  		background-image: url("../../assets/images/心@2x.png");
  	}
  	&>.xin.active{
  		background-image: url("../../assets/images/心备份@2x.png");
  	}

  	&>.pinlun{
  		background-image: url("../../assets/images/评论备份2@2x.png");
  	}
  	&>.pinlun.active{
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

  .chartContent{
  	background: #FFFFFF;
  }
  .chart-list {
  	padding: 0 0.15rem;
	padding-bottom: 0.15rem;
  	.xin{
  		background: url("../../assets/images/心@2x.png") no-repeat center;
  		background-size: 0.15rem;
  		width: 0.15rem;
  		height: 0.15rem;
  	}
  	.xin.active{
  		background-image: url("../../assets/images/心备份@2x.png");
  	}
  }

  .chartNei {
    margin-bottom: 0.10rem;
    padding-left: 50px;
    word-break: break-word;
    color: #666;
    line-height: 20px;
  }
  .huifu{
  	padding-left: 37px;
  	.inner{
  		padding: 10px;
  		background: #FAFAFA;
  	}
  }

  .fix_bottom{
  	height: 0.40rem;
  	padding: 0 0.15rem;
  	background: #FFFFFF;
  	.input-group{
  		background: #FAFAFA;
  		border-radius: 0.15rem;
  		overflow: hidden;
  		height: 0.30rem;
  		line-height: 0.30rem;
  		width: 50%;
  		box-sizing: border-box;
  		padding-left: 0.1rem;
  		float: left;
  		margin-top: 0.05rem;
  	}
  	.input-group>*{vertical-align: middle;}
  	.input-group input{width: 70%;border: none;height: 0.30rem;}
  	.icons{float: right;width: 50%;text-align: right;box-sizing: border-box;}
  	.icons span{
  		display: inline-block;
  		background: url("../../assets/images/心@2x.png") no-repeat 0.02rem center;
  		background-size: 0.15rem;
			padding-left: 0.22rem;
  		height: 0.15rem;
  		line-height: 0.15rem;
  		margin-top: 0.12rem;
      color: #666;
      font-weight: 500;
  	}
  	.icons span.xin{
  		margin-right: 0.15rem;
  		background-image: url("../../assets/images/心@2x.png");
  	}
  	.icons span.xin.active{
  		background-image: url("../../assets/images/心备份@2x.png");
  	}
  	.icons span.xing{
  		background-image: url("../../assets/images/星星(1)@2x.png");
  	}
  	.icons span.xing.active{
  		background-image: url("../../assets/images/星星(1)备份@2x.png");
  	}

  }
</style>

<style type="text/css">
	.chart-list .mint-cell .mint-cell-wrapper,.chart .mint-cell .mint-cell-wrapper{
		padding: 0;
	}
	.chart-list a.mint-cell .mint-cell-text{
		font-size: 0.14rem;
	}
</style>
