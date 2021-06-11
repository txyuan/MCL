<template>
	<div class="edition-root">
		<div id="body_main">
			<mt-header title="在线教育" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
            
			<loadMore :param="param" @triggerGetList="getList" ref="loadMore" :isDefaultLoading="false">
				<div slot="content"> 
					<div class="showPic">
						<img src="@/assets/images/位图@2x.png" width="100%" />
						<div class="info">
							<div class="inner">
								<p class="font16 tit">{{editionInfo.title}}</p>
								<p class="font14" style="opacity: 0.8;">{{editionInfo.content}}</p>
								<p class="font12" style="opacity: 0.6;">{{editionInfo.peopleCount}}人正在学习</p>
							</div>
						</div>
					</div>

					<div class="editon-list">
						<mt-cell class="borderBottom" v-for="(item, index) in list" :key="index">
							<img slot="icon" :src="item.studyImg" width="46" height="46">
							<div slot="title" class="titleWrap">
								<span class="mint-cell-text font12 huiFont99">第{{item.studyDay}}天</span>
								<span class="mint-cell-label font14">{{item.studyContent}}</span>
							</div>
						</mt-cell>
					</div>
				</div>
			</loadMore>

		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "edition",
		data: () => ({
			editionInfo:{
				title:"",  //标题
				content:"",//内容
				peopleCount:"" //学习人数
			},
			//接口参数
			param: {
				pagesize: 10,
				pagecount: 0,
				edusKey: ""
			},
			list: []
		}),
		methods: {
			//获取在线教育的banner信息
			getEditionBanner() {
				let url = "UserInterface/MyCommunityOnlineEdu.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.editionInfo = data;
					this.param.edusKey = data.sKey;
					this.$refs.loadMore.getList();
				})
			},
			//获取列表
			getList(success) {
				let url = "UserInterface/MyCommunityOnlineEduList.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.studyList;
					if (this.param.pagecount == 1) {
						this.list = [...modelList];
					} else {
						this.list = [...this.list, ...modelList]
					}
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
		},
		mounted: function(){
			this.getEditionBanner()
		},
		components: {
			loadMore
		}
	}
</script>

<style scoped lang="scss">
	.titleWrap {
		display: inline-block;
		vertical-align: middle;
	}

	.showPic {
		position: relative;

		img {
			display: block;
		}
	}

	.info {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);

		.inner {
			position: absolute;
			left: 10px;
			bottom: 15px;
			color: #FFFFFF;
		}

		.tit {
			margin-bottom: 5px;
		}
	}
</style>
<style>
	.editon-list>.mint-cell {
		padding: 0.10rem 0;
	}

	.editon-list>.mint-cell .mint-cell-text {
		font-size: 12px;
	}
</style>
