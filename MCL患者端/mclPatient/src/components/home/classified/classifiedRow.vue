<template>
	<div class="classified_wrap">
		<div>
			<ul>
				
				<li @click="doLink('/welcomebl')" style="margin-right: 0.025rem" v-if="messageInfo.blscFlag==0||messageInfo.IsMember==0">
					<img src="@/assets/images/binglisc.png" alt="">
					<p>病历上传</p>
				</li>
				<li @click="doLink('/caseUpload')" style="margin-right: 0.025rem" v-else>
					<img src="@/assets/images/binglisc.png" alt="">
					<p>病历上传</p>
				</li>
				<li @click="doLink('/welcomezz')" style="margin-left: 0.025rem" v-if="messageInfo.zzglFlag==0||messageInfo.IsMember==0">
					<img src="@/assets/images/bingfabz.png" alt="">
					<p>症状管理</p>
				</li>
				<li @click="doLink('/sympList')" style="margin-left: 0.025rem" v-else>
					<img src="@/assets/images/bingfabz.png" alt="">
					<p>症状管理</p>
				</li>
				<li @click="doLink('/welcomeyy')" style="margin-right: 0.025rem" v-if="messageInfo.yyjlFlag==0||messageInfo.IsMember==0">
					<img src="@/assets/images/yonyaojl.png" alt="">
					<p>用药记录</p>
				</li>
				<li @click="doLink('/medicatRecord')" style="margin-right: 0.025rem" v-else>
					<img src="@/assets/images/yonyaojl.png" alt="">
					<p>用药记录</p>
				</li>
				<li @click="doLink('/welcomefzyy')" style="margin-right: 0.025rem" v-if="messageInfo.fzyyFlag==0||messageInfo.IsMember==0">
					<img src="@/assets/images/fuzhenyuyuea.png" alt="">
					<p>复诊预约</p>
				</li>
				<li @click="doLink('/appointment')" style="margin-right: 0.025rem" v-else>
					<img src="@/assets/images/fuzhenyuyuea.png" alt="">
					<p>复诊预约</p>
				</li>
				<!-- <li tag="li" @click="doLink('/healthy')" style="margin-left: 0.025rem">
					<img src="@/assets/images/加餐@2x.png" alt="">
					<p>健康</p>
				</li> -->
			</ul>
			<ul style="margin-top: 0.1rem;">
				<li @click="doLink('/buyfood/饮食')" style="margin-right: 0.025rem" v-if="messageInfo.lbFlag==0||messageInfo.IsMember==0">
					<img src="@/assets/images/饮食@2x.png" alt="">
					<p>饮食处方</p>
				</li>
				<li @click="doLink('/diet')" style="margin-right: 0.025rem" v-else>
					<img src="@/assets/images/饮食@2x.png" alt="">
					<p>饮食处方</p>
				</li>
				<li @click="doLink('/buyfood/营养')" style="margin-left: 0.025rem" v-if="messageInfo.yylbFlag==0||messageInfo.IsMember==0">
					<img src="@/assets/images/午餐@2x.png" alt="">
					<p>营养处方</p>
				</li>
				<li @click="doLink('/nutrition')" style="margin-left: 0.025rem" v-else>
					<img src="@/assets/images/午餐@2x.png" alt="">
					<p>营养处方</p>
				</li>
				<li @click="doLink('/buyfood/运动')" style="margin-right: 0.025rem" v-if="messageInfo.ydlbFlag==0||messageInfo.IsMember==0">
					<img src="@/assets/images/晚餐@2x.png" alt="">
					<p>运动处方</p>
				</li>
				<li @click="doLink('/sport')" style="margin-right: 0.025rem" v-else>
					<img src="@/assets/images/晚餐@2x.png" alt="">
					<p>运动处方</p>
				</li>
				
				<li @click="doLink('/welcomexqgl')" style="margin-right: 0.025rem" v-if="messageInfo.xqglFlag==0||messageInfo.IsMember==0">
					<img src="@/assets/images/加餐@2x(1).png" alt="">
					<p>心情管理</p>
				</li>
				<li @click="doLink('/mood')" style="margin-right: 0.025rem" v-else>
					<img src="@/assets/images/加餐@2x(1).png" alt="">
					<p>心情管理</p>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: "classified-row",
		data: () => ({
			messageInfo:'',
			isLoad: false
		}),
		methods: {
			getMsgInfo() {
				let url = "UserInterface/PatientHomePageEssentialInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.messageInfo = data;
					this.isLoad = true
				})
			},
			doLink(url){
				if(this.isLoad){
					this.$router.push(url)
				}
			}
		},
		mounted(){
			this.getMsgInfo();
		},
	}
</script>

<style scoped lang="scss">
	.classified_wrap {
		box-sizing: border-box;
		background: #FFFFFF;
		padding-top: 0.13rem;
		padding-bottom: 0.13rem;
		width: 94%;
		margin: 0 auto;
		.name {
			line-height: 0.44rem;
			padding: 0 0.12rem;
		}
	}

	ul {
		display: flex;
		justify-content: space-between;
		padding: 0 0.12rem;

		li {
			/*flex: 1;*/
			background: #ffffff;
			text-align: center;

			img {
				width: 0.48rem;
				display: block;
			}

			p {
				font-size: 0.13rem;
				/*margin-top: 0.06rem;*/
				color: #636768;
				margin-top: 0.04rem;
			}
		}
	}
</style>
