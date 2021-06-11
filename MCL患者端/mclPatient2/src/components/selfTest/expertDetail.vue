<template>
	<div>
		<div class="expertDetail-root padding-header" style="background: #FFFFFF;">
			<mt-header title="MCL专家栏" fixed>
				<div slot="left">
				  <header-back>
					<mt-button icon="back"></mt-button>
				  </header-back>
				</div>
			</mt-header>
			<div class="video-block">
				<div v-if="videourl!=''">
					<video controls="" preload="preload" style="width: 100%;height: 100%;">
						<source :src="videourl" type="video/mp4">
					</video>
				</div>
				<!-- <video :src="videourl" class="video"></video> -->
				<!-- <img src="@/assets/images/play.png" alt="" width="52" height="52" class="play-icon"> -->
			</div>
			<div class="article-block">
				<p class="article-title">{{title}}</p>
				<div class="article-des font14">
					<div class="article-time">
						{{createtime}}
					</div>
				</div>
				<div class="article-des font14">
					<div class="article-label">
						<mt-badge size="small" v-for="(item,index) in labels" :key="index" color="#F78335">#{{item}}</mt-badge>
					</div>
				</div>
				<div class="article-content">
					{{content}}
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "expertDetail",
		data:()=>({
			videourl:'',
			content: "",
			createtime: "",
			labels: [],
			title: ""
		}),
		methods:{
			// 专家栏详情
			getDetailInfo(sKey){
				let url = "UserInterface/PatientHomePageExpertDetail.ashx";
				let param={
					skey:sKey
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					this.title=data.title;
					this.createtime=data.createtime;
					this.content=data.content;
					this.labels=data.label;
					this.videourl=data.videourl;
			   })
			},
			// 统计浏览次数
			doLookNum(sKey){
				let url = "UserInterface/UpdateBrowseCount.ashx";
				let param={
					skey:sKey
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
			   })
			},
		},
		mounted(){
			let sKey = this.$route.params.skey;
			this.getDetailInfo(sKey)
			this.doLookNum(sKey)
		},
		components:{

		}
	}
</script>

<style scoped lang="scss">
  .mint-header {
    height:0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .padding-header {
    padding-top:0.44rem;
  }
	.video-block{
		position: relative;
		.video{
			display: block;
			width: 100%;
			height: 3.30rem;
		}
		.play-icon{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
		}
	}
	.article-block{
		padding:0.15rem 0.15rem 0.35rem 0.15rem;
	}
	.article-title{
		font-size: 0.20rem;
    letter-spacing: 0.0125rem;
		color: #333333;
    padding: 0.1rem 0;
	}
	.article-des{
		display: flex;
		justify-content: space-between;
    padding-bottom: 0.075rem;
		.article-time{
			padding-left: 0.20rem;
			background: url(../../assets/images/time.png) no-repeat left center;
			background-size: 0.15rem;
      color: #999999;
		}

	}
  .article-content{
    line-height: 1.8;
    font-size: 0.142rem;
    letter-spacing:1px;
    color: #555555;
  }
</style>
<style>
  .article-label .mint-badge{
		padding-top: 0;
		padding-bottom: 0;
		line-height: 0.20rem;
    color: #0ac5ca;
    background: none!important;
    font-size: 0.14rem;
	}

</style>
