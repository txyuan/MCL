<template>
	<div class="headty">
		<mt-header title="健康档案" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="headty_home" style="background: #D1EEFC;">
			<img src="@/assets/images/healthydn.png" />
			<div class="headty_inform">
				<p>基本信息</p>
				<div class="headty_mead">
					<ol>
						<li>姓名：{{datasj.name}}</li>
						<li>年龄：{{datasj.age}}</li>
						<li>性别：{{datasj.sex}}</li>
						<li>身高：{{datasj.height}}cm</li>
						<li>体重：{{datasj.weight}}kg</li>
					</ol>
					<ul>
						<li>婚姻状况：{{datasj.marriage}}</li>
						<li>生活区域：{{datasj.address}}</li>
						<li>录入日期：{{datasj.createtime}}</li>
					</ul>
				</div>
				<div v-if="datasj.clinical_diagnosis && datasj.diagnosisDate && datasj.concurrent && datasj.treatment">
					<p>疾病情况</p>
					<div class="headty_mead">
						<ul>
							<li>临床诊断：{{datasj.clinical_diagnosis}}</li>
							<li>首次诊断日期：{{datasj.diagnosisDate}}</li>
							<li>并发症状：{{datasj.concurrent}}</li>
							<li>已接受的治疗：{{datasj.treatment}}</li>
							<li>目前治疗状态：
								<template v-for="n in 17">
									{{n < 10 ? datasj[`Disease0${n}`] : datasj[`Disease${n}`]}}
								</template>
							</li>
						</ul>
					</div>
				</div>
				<div v-if="datasj.height && datasj.weight && datasj.bmi && datasj.inspectDate && datasj.idealWeight">
					<p>体格检查</p>
					<div class="headty_mead">
						<ul>
							<li>身高：{{datasj.height}}cm</li>
							<li>体重：{{datasj.weight}}kg</li>
							<li>BMI：{{datasj.bmi}}</li>
							<li>检查日期：{{datasj.inspectDate}}</li>
							<li>正常范围：{{datasj.idealWeight}}</li>
						</ul>
					</div>
				</div>
				<div v-if="datasj.NRS2002_01 && datasj.NRS2002_02">
					<p>营养筛查</p>
					<div class="headty_mead">
						<ul>
							<li>NRS2002评分： {{datasj.NRS2002_01}} 分、{{datasj.NRS2002_02}}</li>
						</ul>
					</div>
				</div>
				<div v-if="datasj.PGSGA_01 && datasj.PGSGA_02">
					<p>营养评估</p>
					<div class="headty_mead">
						<ul>
							<li>PG-SGA评分： {{datasj.PGSGA_01}} 分、{{datasj.PGSGA_02}}</li>
							<li>评估日期：{{datasj.assessmentDate}}</li>
						</ul>
					</div>
				</div>
				<div v-if="datasj.investigationDate && datasj.carbohydrate && datasj.energy && datasj.fat && datasj.protein">
					<p>饮食调查</p>
					<div class="headty_mead">
						<ul>
							<li>调查日期：{{datasj.investigationDate}}</li>
							<li>总能量：{{datasj.carbohydrate}}Kal</li>
							<li>碳水化合物：{{datasj.energy}}g</li>
							<li>脂肪：{{datasj.fat}}g</li>
							<li>蛋白质：{{datasj.protein}}g</li>
						</ul>
					</div>
				</div>
				<div v-if="datasj.CartesianScore_01 && datasj.CartesianScore_02">
					<p>卡氏评分</p>
					<div class="headty_mead">
						<ul>
							<li>卡氏评分： {{datasj.CartesianScore_01}} 分、{{datasj.CartesianScore_02}}</li>
						</ul>
					</div>
				</div>
				<div v-if="datasj.PatientLife01 && datasj.PatientLife02 && datasj.PatientLife03 && datasj.PatientLife04 && datasj.PatientLife05 && datasj.PatientLife06 && datasj.PatientLife07 && datasj.PatientLife08 && datasj.PatientLife09 && datasj.PatientLife10">
					<p>生活调查</p>
					<div class="headty_mead">
						<ul>
							<li>食物过敏：{{datasj.PatientLife01}}</li>
							<li>药物过敏：{{datasj.PatientLife02}}</li>
							<li>吸烟：{{datasj.PatientLife03}}</li>
							<li>喝酒：{{datasj.PatientLife04}}</li>
							<li>饮食习惯：{{datasj.PatientLife05}}</li>
							<li>最爱吃的是：{{datasj.PatientLife06}}</li>
							<li>现在能吃多少：{{datasj.PatientLife07}}</li>
							<li>运动情况：{{datasj.PatientLife08}}</li>
							<li>宗教/信仰：{{datasj.PatientLife09}}</li>
							<li>睡眠时间：{{datasj.PatientLife10}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "healthydan",
		data: () => ({
			patientskey:'',
			datasj:{}
		}),
		methods:{
			//获取信息
			getInform() {
				let url = "UserInterface/ComprehensiveEvaluationNewReport.ashx";
				let param={
					patientskey:this.patientskey
				};
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.datasj=data;
				})
			},
		},
		mounted(){
			this.getInform();
		},
		created() {
			this.patientskey = this.$route.query.skey;
		}
	}
</script>

<style scoped lang="scss">
	.headty_home{
		width: 100%;
		padding-top: 44px;
		padding-bottom: 0.12rem;
		img{
			width: 100%;
		}
		.headty_inform{
			width: 92%;
			margin: 0 auto;
			p{
				width: 100%;
				height: 0.36rem;
				background: #00A2EA;
				border-radius: 6px;
				color: #fff;
				font-size: 0.15rem;
				text-align: center;
				line-height: 0.36rem;
				margin-top: 0.16rem;
				
			}
			.headty_mead{
				width: 94%;
				padding: 0.1rem 3%;
				margin-top: 0.1rem;
				background: #fff;
				border-radius: 8px;
				font-size: 0.16rem;
				ol{
					overflow: hidden;
					li{
						width: 50%;
						float: left;
						margin-top: 0.06rem;
					}
				}
				ul{
					li{
						margin-top: 0.06rem;
					}
				}
			}
		}
	}
</style>
