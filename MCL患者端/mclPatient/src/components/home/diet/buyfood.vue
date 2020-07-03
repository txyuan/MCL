<template>
	<div style="background: #fff;min-height: 100vh;">
		<div class="">
			<mt-header fixed :title="names">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
			<div class="wel_fix">
				<img src="@/assets/images/welysfa.jpg" v-if="names == '饮食'" style="width: 100%;" />
				<img src="@/assets/images/welyycf.jpg" v-if="names == '营养'" style="width: 100%;" />
				<img src="@/assets/images/welydcf.jpg" v-if="names == '运动'" style="width: 100%;" />
			</div>
			<mt-button type="default" class="add_btn" v-on:click="goubuyvip()" v-if="isvip==0" size="large">成为会员</mt-button>
			<mt-button type="default" class="add_btn" v-on:click="gouviplb()" v-else size="large">下一步</mt-button>
		</div>
	</div>
	<!-- <div>
		<mt-header fixed :title="names">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>

		<div class="buyfood">
			<div class="panel">
				<div class="title yellow text-center">
					<img src="@/assets/images/panel_title.png" width="26"/>
					<span>{{solution}}</span>
				</div>
				
				<div class="content font14" v-if="names == '饮食'">
					<div class="content-tit"><span>健康饮食的重要性</span></div>
					<div class="content-text">
						饮食是人体维持生命的基础，饮食科学合理，能够保证生命肌体正常运转  饮食不合理会透支健康。大量的实验表明，长期不合理的饮食习惯，是导致肿瘤的最直接因素。所以，建立良好的饮食习惯，合理调整膳食结构，平衡营养，对防癌抗癌有积极的意义。每个人，每个家庭的口味不同，所以标准化的健康食谱我们大众很难坚持。我们会首先做饮食调查，看目前您的饮食的情况，我们是调整您的摄入比例而不改变您的口味习惯，使您吃的满意还吃得对，制定方案后，您每天进入饮食板块，填写您每餐饮食的情况，根据您每餐饮食的情况我们会给予指导。
					</div>
				</div>
				
				<div class="content font14" v-if="names == '营养'">
					<div class="content-tit"><span>营养的重要性</span></div>
					<div class="content-text">
						营养是构成生命最基础的物质，它在维护健康，在预防疾病及治疗疾病过程当中，有不可替代的作用和价值。世界范围内40-80%肿瘤患者存在营养不良，20%肿瘤患者直接死于营养不良。2016年年初中国抗癌协会肿瘤营养与支持治疗专业委员会对23618例肿瘤患者初步数据显示：中国肿瘤患者营养不良发生率为57.6%；恶性肿瘤病人死亡最常见原因是营养不良。您的营养情况怎么样，营养不良的时候应该补充什么，怎么补充，补充多少，这都需要专业的营养师的检测和指导。我们会首先给您做营养筛查，了解您目前营养情况，之后根据您前面的营养状态制定符合您自身的营养方案。从而使您营养达标，有效的帮您康复。
					</div>
				</div>
				
				<div class="content font14" v-if="names == '运动'">
					<div class="content-tit"><span>运动的重要性</span></div>
					<div class="content-text">
						运动是构成生命最基础的物质，它在维护健康，在预防疾病及治疗疾病过程当中，有不可替代的作用和价值。世界范围内40-80%肿瘤患者存在营养不良，20%肿瘤患者直接死于营养不良。2016年年初中国抗癌协会肿瘤营养与支持治疗专业委员会对23618例肿瘤患者初步数据显示：中国肿瘤患者营养不良发生率为57.6%；恶性肿瘤病人死亡最常见原因是营养不良。您的营养情况怎么样，营养不良的时候应该补充什么，怎么补充，补充多少，这都需要专业的营养师的检测和指导。我们会首先给您做营养筛查，了解您目前营养情况，之后根据您前面的营养状态制定符合您自身的营养方案。从而使您营养达标，有效的帮您康复。
					</div>
				</div>
				
			</div>
			<span @click="goubuyvip" v-if="isvip==0" class="btn">去购买</span>
			<span @click="gouviplb" v-else class="btn">下一步</span>
		</div> -->

		
	</div>
</template>

<script>
	export default {
		name: "buyfood",
		data: () => ({
			names:'饮食',
			solution:"饮食方案",
			isvip:0,  //是否是会员，1是会员
			isbook:0   //是否已填写量表,1已填写
		}),
		methods: {
			// 基本信息
			getMsgInfo() {
				let url = "UserInterface/PatientHomePageEssentialInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.isvip = data.IsMember;
					this.isbook = data.lbFlag;
				})
			},
			goubuyvip(){
				this.$router.push('/yearCard');
			},
			gouviplb(){
				if(this.names=="饮食"){
					this.$router.push('/gauge_diet?ABflag=2');
				}else if(this.names=="营养"){
					this.$router.push('/gauge_nutrition?ABflag=2');
				}else if(this.names=="运动"){
					this.$router.push('/sport_CF?ABflag=2');
				}
			}
		},
		mounted(){
			this.getMsgInfo();
			let names = this.$route.params.names;
			this.names=names;
			let solution = "饮食方案"
			if(names == "营养"){
				solution = "营养方案"
			}
			this.solution = solution
		}
	}
</script>

<style scoped lang="scss">
	.wel_fix{
		padding-top: 43px;
	}
	.add_btn{
		background: #24B7BF;
		position: fixed;
		bottom: 0.3rem;
		left: 5%;
		margin: 0;
	}
	.buyfood{
		min-height: 100vh;
		padding-top: 44px;
		box-sizing: border-box;
		background: url('../../../assets/images/food_bg.png') no-repeat center 44px;
		background-size: 100% auto;
		/*img{
			display: block;
			width: 1.0rem;
			margin: 0 auto;
			margin-top: 0.8rem;
			margin-bottom: 0.16rem;
		}
		p{
			font-size: 0.16rem;
			text-align: center;
			font-weight: 500;
			color: #000;
			line-height: 0.26rem;
		}*/
		.btn{
			width: 86%;
			height: 0.4rem;
			background: #f78335;
			line-height: 0.4rem;
			text-align: center;
			color: #fff;
			border-radius: 0.2rem;
			margin: 0 auto;
			font-size: 0.15rem;
			margin-top: 0.25rem;
			display: block;
		}
	}
	.panel{
		width: 90%;
		margin: 0 auto;
		background: #FFFFFF;
		border-radius: 6px;
		padding: 0.25rem 0.13rem;
		margin-top: 1.7rem;
		.title>*{
			vertical-align: middle;
		}
		.title img{margin-right: 6px;}
		.content-tit{
			color: #333333;
			font-size: 0.16rem;
			position: relative;
			padding-left: 12px;
			margin-top: 0.15rem;
			margin-bottom: 0.05rem;
		}
		.content-tit:before{
			content: "";
			display: inline-block;
			width:5px;
			height:10px;
			background:linear-gradient(46deg,rgba(239,146,70,1) 0%,rgba(249,196,118,1) 100%);
			border-radius:3px;
			vertical-align: middle;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			margin: auto;
		}
		.content-text{
			color: #626161;
			padding-left: 12px;
		}
	}
</style>
