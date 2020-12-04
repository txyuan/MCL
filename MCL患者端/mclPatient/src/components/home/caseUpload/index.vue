<template>
  <div class="caseUpload-root padding-header">
  	<mt-header title="病历上传" fixed class="borderBottom">
  		<div slot="left">
  			<router-link to="/wx_Entrance/home" style="color: initial;">
  				<mt-button icon="back"></mt-button>
  			</router-link>
  		</div>
  	</mt-header>
  	<div class="page_btn text-center">
  		<img src="@/assets/images/病例.png" width="79" style="margin-bottom: 15px;"/>
  		<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="$router.push(`/physician`)">上传病历</mt-button>
  	</div>

  	<div class="rev_fuc" style="margin-top: 0.1rem;padding-bottom: 0.3rem;">
		<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
			<div slot="content">
				<h3>历史病历</h3>
				<div class="rev_list" v-for="(item,index) in list" :key="index">
					<div class="rev_lilf">
						<p>复查时间： {{item.ReviewDate}}</p>
						<label>上传时间： {{item.ReviewDate}}</label>
					</div>
					<router-link :to="`/physician?id=${item.ReKey}`">
						<span class="greens">查看报告</span>
					</router-link>
				</div>
			</div>
		</loadMore>
	</div>
  </div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "caseUpload",
        data:()=>({
			param : {
			   pagesize: 10,
			   pagecount: 0
			 },
			list:[],
        }),
        methods:{
        	//获取列表
        	getList(success){
        		let url = "UserInterface/ReviewManagementInfo.ashx";
        		this.$post(url,this.param).then((data)=>{
        			if(data.rspcode != 1 ){
        			  return;
        			}
        			let modelList = data.HisPresentation;
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
        },
		components:{
			loadMore
		}
    }
</script>

<style scoped lang="scss">
  .page_btn{
  	padding: 0.25rem;
  }

  .rev_fuc{
			width: 100%;
			background: #fff;
			h3{
				height: 0.5rem;
				line-height: 0.5rem;
				padding-left: 4%;
				font-size: 0.15rem;
				color: #333;
				border-bottom: 1px solid #eee;
			}
			.rev_list{
				padding: 0.13rem 3% 0.15rem 4%;
				border-bottom: 1px solid #eee;
				overflow: hidden;
				.rev_lilf{
					float: left;
					width:70%;
					p{
						color: #333333;
						font-size: 0.14rem;
					}
					label{
						color: #666;
						display: block;
						margin-top: 0.06rem;
						font-size: 0.12rem;
					}
				}
				span{
					float: right;
					height: 0.28rem;
					padding: 0 0.14rem;
					display: block;
					background: #F78335;
					color: #fff;
					line-height: 0.28rem;
					font-size: 0.14rem;
					border-radius: 0.14rem;
					margin-top: 0.08rem;
					&.greens{
						background: #4D9C30;
					}
					&.bluue{
						background: #6358F4;
					}
				}
			}
		}
</style>
