<template>
	<div>
		<div class="questionDetail-root padding-header">
			<mt-header title="常见问题" fixed>
				<div slot="left">
				  <header-back>
					<mt-button icon="back"></mt-button>
				  </header-back>
				</div>
			</mt-header>

			<div class="article-block" >
				<p class="article-title">{{title}}</p>
				<div class="article-des font14">
					<div class="article-time">
						{{createtime}}
					</div>
				</div>
				<!-- <div class="article-des font14" style="padding-top: 0;">
					<div class="article-label">
						<mt-badge size="small" v-for="(item,index) in labels" :key="index" color="#F78335">#{{item}}</mt-badge>
					</div>
				</div> -->
				<div class="article-content" v-html="content"></div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "questionDetail",
		data:()=>({
			content: "",
			createtime: "",
			labels: [],
			title: ""
		}),
		methods:{
			// 问题详情
			getDetailInfo(sKey){
				let url = "UserInterface/PatientHomePageProblemDetail.ashx";
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
			   })
			},
		},
		mounted(){
			let sKey = this.$route.params.skey;
			this.getDetailInfo(sKey);
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
  .article-block{
    padding:0.15rem 0.15rem 0.35rem 0.15rem;
    background-color: #FFFFFF;
    margin-top: 0.1rem;
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
      background: url(../../../assets/images/time.png) no-repeat left center;
      background-size: 0.15rem;
      color: #999999;
    }

  }
  .article-content{
    line-height: 1.8;
    font-size: 0.142rem;
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
