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
			<img src="../../assets/images/healthydn.png" />
			<div class="headty_inform">
				<p>基本信息</p>
				<div class="headty_mead">
					<ol>
						<li>姓名：{{datasj.name}}</li>
						<li>年龄：{{datasj.age}}</li>
						<li>性别：{{datasj.sex}}</li>
					</ol>
					<ul>
						<li>录入日期：{{datasj.createtime}}</li>
						<!-- <li>临床诊断：{{datasj.clinical_diagnosis}}</li>
						<li>管理诉求：{{datasj.managementAppeals}}</li>
						<li>并发症状：{{datasj.concurrent}}</li> -->
					</ul>
				</div>
				
				<div v-if="datasj.PGSGA_01!=''&&datasj.PGSGA_02!=''">
					<p>营养评估</p>
					<div class="headty_mead">
						<ul>
							<li>PG-SGA评分： {{datasj.PGSGA_01}} 分、{{datasj.PGSGA_02}}</li>
						</ul>
					</div>
				</div>
				<p>生活调查</p>
				<div class="headty_mead">
					<ul>
						<li>过敏史：{{datasj.PatientLife01}}</li>
						<li>吸烟：{{datasj.PatientLife02}}</li>
						<!-- <li>目前为：{{datasj.PatientLife03}}</li>
						<li>在您的一生中，累积吸烟是否超过5包（20支/包）：{{datasj.PatientLife04}}</li>
						<li>平均每周（7天）吸烟 {{datasj.PatientLife05}} 包,持续 {{datasj.PatientLife06}}年</li> -->
						<li>喝酒：{{datasj.PatientLife07}}</li>
						<!-- <li>过去一年是否规律饮酒：{{datasj.PatientLife08}}</li>
						<li>平均每周（7天）饮酒： {{datasj.PatientLife09}}次</li>
						<li>常饮酒为：{{datasj.PatientLife10}}</li>
						<li>啤酒 {{datasj.PatientLife11}}瓶/周； <br />
							葡萄酒/黄酒 {{datasj.PatientLife12}}ml/周； <br />
							高度白酒 {{datasj.PatientLife13}}两/周：
						</li>
						<li>在您过去的一年中是否经常喝茶叶茶：{{datasj.PatientLife14}}</li>
						<li>平均每周（7天）泡茶 {{datasj.PatientLife15}}次（换一次茶叶算一次）</li>
						<li>常喝茶为：{{datasj.PatientLife16}}</li>
						<li>日均饮水量：{{datasj.PatientLife17}}ml</li> -->
						<li>运动情况：{{datasj.PatientLife18}}</li>
						<li>宗教/信仰：{{datasj.PatientLife19}}</li>
						<!-- <li>其他爱好：{{datasj.PatientLife20}}</li>
						<li>手机使用时间：{{datasj.PatientLife21}}</li>
						<li>微信使用情况：{{datasj.PatientLife22}}</li>
						<li>亲属陪伴情况：{{datasj.PatientLife23}}</li> -->
						<li>睡眠时间：{{datasj.PatientLife24}}</li>
						<!-- <li>影响睡眠的原因：{{datasj.PatientLife25}}</li>
						<li>之前最爱吃的食物：{{datasj.PatientLife26}}</li>
						<li>按照之前能吃的最大量，现在能吃：{{datasj.PatientLife27}}分(%)</li>
						<li>最近最爱吃的食物：{{datasj.PatientLife28}}</li>
						<li>按照最近能吃的最大量，现在能吃：{{datasj.PatientLife29}}分(%)</li> -->
					</ul>
				</div>
				<!-- <div v-if="datasj.Cardiopulmonary01!=''&&datasj.Cardiopulmonary02!=''&&datasj.Cardiopulmonary03!=''">
					<p>心肺测试</p>
					<div class="headty_mead">
						<ul>
							<li>6分钟步行试验：{{datasj.Cardiopulmonary01}} 米</li>
							<li>是否完成试验：{{datasj.Cardiopulmonary02}}</li>
							<li>肺功能测试：{{datasj.Cardiopulmonary03}}</li>
						</ul>
					</div>
				</div> -->
				
				<!-- <p>膳食调查</p> -->
				<!-- <div v-if="(datasj.tumour_01!=null&&datasj.tumour_02!=null&&datasj.tumour_03!=null&&datasj.tumour_04!=null&&datasj.tumour_05!=null&&datasj.tumour_06!=null&&datasj.tumour_07!=null&&datasj.tumour_08!=null&&datasj.tumour_09!=null&&datasj.tumour_10!=null&&datasj.tumour_11!=null&&datasj.tumour_12!=null&&datasj.tumour_13!=null&&datasj.tumour_14!=null&&datasj.tumour_15!=null&&datasj.tumour_16!=null&&datasj.tumour_17!=null&&datasj.tumour_18!=null&&datasj.tumour_19!=null&&datasj.tumour_20!=null&&datasj.tumour_21!=null&&datasj.tumour_22!=null&&datasj.tumour_23!=null&&datasj.tumour_24!=null&&datasj.tumour_25!=null)">
					<p>生化指标</p>
					<div class="headty_mead">
						<ul>
							<li>白细胞： {{datasj.tumour_01}}*109/L</li>
							<li>红细胞： {{datasj.tumour_02}}*1012/L</li>
							<li>血小板： {{datasj.tumour_03}}*109/L</li>
							<li>血红蛋白： {{datasj.tumour_04}}g/L</li>
							<li>中性粒细胞百分比： {{datasj.tumour_05}}%</li>
							<li>淋巴细胞： {{datasj.tumour_06}}*109/L</li>
							<li>总蛋白： {{datasj.tumour_07}}g/L</li>
							<li>白蛋白： {{datasj.tumour_08}}g/L</li>
							<li>前白蛋白： {{datasj.tumour_09}}g/L</li>
							<li>尿素氮： {{datasj.tumour_10}}mmol/L</li>
							<li>C反应蛋白： {{datasj.tumour_11}}mg/L/li>
							<li>尿微量白蛋白： {{datasj.tumour_12}}g/L</li>
							<li>血糖： {{datasj.tumour_13}}mmol/L</li>
							<li>糖化血红蛋白： {{datasj.tumour_14}}mg/dl</li>
							<li>血清钾： {{datasj.tumour_15}}mmol/L</li>
							<li>血清钠： {{datasj.tumour_16}}mmol/L</li>
							<li>血清磷： {{datasj.tumour_17}}mmol/L</li>
							<li>血清镁： {{datasj.tumour_18}}mmol/L</li>
							<li>同型半胱氨酸： {{datasj.tumour_19}}µmol/L</li>
							<li>球蛋白： {{datasj.tumour_20}}g/L</li>
							<li>谷草转氨酶： {{datasj.tumour_21}}U/L</li>
							<li>谷丙转氨酶： {{datasj.tumour_22}}U/L</li>
							<li>总胆红素： {{datasj.tumour_23}}μmol／L</li>
							<li>直接胆红素： {{datasj.tumour_24}}µmol/L</li>
							<li>铁蛋白： {{datasj.tumour_25}}µg/L</li>
						</ul>
					</div>
				</div> -->
				<!-- <div v-if="(datasj.disease_01!=null&&datasj.disease_02!=null&&datasj.disease_03!=null&&datasj.disease_04!=null&&datasj.disease_05!=null&&datasj.disease_06!=null&&datasj.disease_07!=null&&datasj.disease_08!=null&&datasj.disease_09!=null&&datasj.disease_10!=null&&datasj.disease_11!=null&&datasj.disease_12!=null&&datasj.disease_13!=null&&datasj.disease_14!=null&&datasj.disease_15!=null&&datasj.disease_16!=null&&datasj.disease_17!=null&&datasj.disease_18!=null&&datasj.disease_19!=null&&datasj.disease_20!=null&&datasj.disease_21!=null&&datasj.disease_22!=null&&datasj.disease_23!=null&&datasj.disease_24!=null&&datasj.disease_25!=null&&datasj.disease_26!=null&&datasj.disease_27!=null)">
					<p>生化指标</p>
					<div class="headty_mead">
						<ul>
							<li>空腹血糖： {{datasj.disease_01}}mmol/L</li>
							<li>餐后血糖： {{datasj.disease_02}}mmol/L</li>
							<li>糖化血红蛋白（%）： {{datasj.disease_03}}mg/dl</li>
							<li>同型半胱甘酸(Hcy)： {{datasj.disease_04}}μmoI/L</li>	
							<li>甘油三酯： {{datasj.disease_05}}mmol/L</li>	
							<li>总胆固醇： {{datasj.disease_06}}mmol/L</li>
							<li>高密度脂蛋白： {{datasj.disease_07}}mmol/L</li>	
							<li>低密度脂蛋白： {{datasj.disease_08}}mmol/L</li>	
							<li>骨密度值：{{datasj.disease_09}}</li>
							<li>血钙： {{datasj.disease_10}}mmol/L</li>	
							<li>心电图ST段水平： {{datasj.disease_11}}mv</li>	
							<li>颈动脉斑块大小：{{datasj.disease_12}}</li>
							<li>谷丙转氨酶： {{datasj.disease_13}}U/L	</li>
							<li>谷草转氨酶： {{datasj.disease_14}}U/L	</li>
							<li>血清肌酐： {{datasj.disease_15}}μmoI/L</li>
							<li>尿酸： {{datasj.disease_16}}µmol/L</li>	
							<li>白细胞： {{datasj.disease_17}}*109/L</li>	
							<li>红细胞： {{datasj.disease_18}}*1012/L</li>
							<li>血红蛋白： {{datasj.disease_19}}g/L</li>	
							<li>中性粒细胞百分比： {{datasj.disease_20}}%</li>	
							<li>淋巴细胞： {{datasj.disease_21}}*109/L</li>
							<li>总蛋白： {{datasj.disease_22}}g/L</li>	
							<li>白蛋白： {{datasj.disease_23}}g/L</li>	
							<li>前白蛋白： {{datasj.disease_24}}mg/L</li>
							<li>尿素氮： {{datasj.disease_25}}mmol/L</li>
							<li>C反应蛋白： {{datasj.disease_26}}mg/L	</li>
							<li>尿微量白蛋白： {{datasj.disease_27}}g/L</li>
						</ul>
					</div>
				</div> -->
				<!-- <div v-if="datasj.PatientMentality01!=''&&datasj.PatientMentality02!=''">
					<p>精神状态</p>
					<div class="headty_mead">
						<ul>
							<li>精神状态评分： {{datasj.PatientMentality01}} 分、{{datasj.PatientMentality02}}</li>
						</ul>
					</div>
				</div>
				<div v-if="datasj.Emotion01!=''&&datasj.Emotion02!=''&&datasj.Emotion03!=''&&datasj.Emotion04!=''">
					<p>焦虑/抑郁</p>
					<div class="headty_mead">
						<ul>
							<li>焦虑程度评分：  {{datasj.Emotion01}}分、{{datasj.Emotion02}}</li>
							<li>抑郁程度评分：  {{datasj.Emotion03}}分、{{datasj.Emotion04}}</li>
						</ul>
					</div>
				</div>
				<div v-if="datasj.Psychological01!=''">
					<p>心理压力</p>
					<div class="headty_mead">
						<ul>
							<li>心理压力评分： {{datasj.Psychological01}}分</li>
						</ul>
					</div>
				</div> -->
				<!-- <div v-if="datasj.divQualityLife01!=''">
					<p>生活质量</p>
					<div class="headty_mead">
						<ul>
							<li>生活质量评分： {{datasj.divQualityLife01}}分</li>
						</ul>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "healthydan",
		data: () => ({
			datasj:{}
		}),
		methods:{
			//获取信息
			getInform() {
				let url = "UserInterface/ComprehensiveEvaluationNewReport.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.datasj=data;
				})
			},
		},
		mounted(){
			this.getInform();
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
