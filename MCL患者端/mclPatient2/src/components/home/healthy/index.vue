<template>
	<div class="healthy-root">
		<div id="body_main" style="padding-top: 87px;background: #FFFFFF;padding-bottom: 0;">
			<mt-header title="健康状况" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
			<div class="fix_top time-pick" style="top: 43px;">
				<div class="time-inner">
					<div class="time-show"><input type="date" v-model="datriq" /></div>
				</div>
			</div>

			<div class="page">
				<div class="panel" style="position: relative;">
					<div class="huan text-huan">
						<p style="font-size: 14px;">BMI</p>
						<p style="font-size: 16px;" class="yellow">{{bmi}}</p>
						<p style="font-size: 12px;">健康状况： <span class="red">{{healthystatus}}</span></p>
					</div>
					<div class="huan" id="huan"></div>
				</div>

				<!-- 热量分析 -->
				<div class="title">
					<span class="font17">热量分析</span>
				</div>
				<div class="panel">
					<p class="font16">三餐热量比及摄入</p>
					<p class="huiFont font12">
						<span style="margin-right: 3%;"><label style="color: #FE7A66;">↑</label>偏高</span>
						<span style="margin-right: 3%;"><label style="color: #FE7A66;">↓</label>偏低</span>
						<span><label style="color: #42B8A7;">✔</label>合适</span>
					</p>

					<div id="pie"></div>

					<table border="0" cellspacing="0" cellpadding="0" class="bgtable">
						<tr>
							<th>名称</th>
							<th>摄入（千卡）</th>
							<th>推荐（千卡）</th>
						</tr>
						<tr v-for="(item,index) in dietdata" :key="index">
							<td>{{item.quantityname}}</td>
							<td>
								<label v-if="Number(item.quantityintake)<Number(item.quantityrecommend)" style="color: #FE7A66;">↓</label>
								<label v-else-if="Number(item.quantityintake)>Number(item.quantityrecommend)" style="color: #FE7A66;">↑</label>
								<label v-else-if="Number(item.quantityintake)==Number(item.quantityrecommend)" style="color: #42B8A7;">✔</label>
								{{item.quantityintake}}
							</td>
							<td>{{item.quantityrecommend}}</td>
						</tr>
						<tr class="line">
							<td colspan="3">
								<div class="borderBottom"></div>
							</td>
						</tr>
						<tr>
							<td class="font14">总摄入</td>
							<td>
								<label v-if="Number(totalintake)<Number(totalrecommend)" style="color: #FE7A66;">↓</label>
								<label v-else-if="Number(totalintake)>Number(totalrecommend)" style="color: #FE7A66;">↑</label>
								<label v-else-if="Number(totalintake)==Number(totalrecommend)" style="color: #42B8A7;">✔</label>
								{{totalintake}}
							</td>
							<td>{{totalrecommend}}</td>
						</tr>
					</table>
				</div>

				<!-- 三大营养素分析 -->
				<div class="title">
					<span class="font17">三大营养素分析</span>
				</div>
				<div class="panel">
					<p class="font16">供能比及摄入</p>
					<p class="huiFont font12">
						<span style="margin-right: 3%;"><label style="color: #FE7A66;">↑</label>偏高</span>
						<span style="margin-right: 3%;"><label style="color: #FE7A66;">↓</label>偏低</span>
						<span><label style="color: #42B8A7;">✔</label>合适</span>
					</p>

					<div id="pie2"></div>

					<table border="0" cellspacing="0" cellpadding="0" class="bgtable">
						<tr>
							<th>名称</th>
							<th>摄入（克）</th>
							<th>推荐（克）</th>
						</tr>
						<tr>
							<td>脂肪</td>
							<td>
								<label v-if="Number(intakefat)<Number(recommendfat)" style="color: #FE7A66;">↓</label>
								<label v-else-if="Number(intakefat)>Number(recommendfat)" style="color: #FE7A66;">↑</label>
								<label v-else-if="Number(intakefat)==Number(recommendfat)" style="color: #42B8A7;">✔</label>
								{{intakefat}}
							</td>
							<td>{{recommendfat}}</td>
						</tr>
						<tr>
							<td>碳水</td>
							<td>
								<label v-if="Number(intakecarbohydrate)<Number(recommendcarbohydrate)" style="color: #FE7A66;">↓</label>
								<label v-else-if="Number(intakecarbohydrate)>Number(recommendcarbohydrate)" style="color: #FE7A66;">↑</label>
								<label v-else-if="Number(intakecarbohydrate)==Number(recommendcarbohydrate)" style="color: #42B8A7;">✔</label>
								{{intakecarbohydrate}}
							</td>
							<td>{{recommendcarbohydrate}}</td>
						</tr>
						<tr>
							<td>蛋白质</td>
							<td>
								<label v-if="Number(intakeprotein)<Number(recommendprotein)" style="color: #FE7A66;">↓</label>
								<label v-else-if="Number(intakeprotein)>Number(recommendprotein)" style="color: #FE7A66;">↑</label>
								<label v-else-if="Number(intakeprotein)==Number(recommendprotein)" style="color: #42B8A7;">✔</label>
								{{intakeprotein}}
							</td>
							<td>{{recommendprotein}}</td>
						</tr>
					</table>
				</div>

				<!-- 营养摄入素分析 -->
				<div class="title">
					<span class="font17">营养摄入素分析</span>
					<span class="huiFont font12 float_right">各品牌营养品间数据有差别</span>
				</div>
				<div class="panel">
					<table border="0" cellspacing="0" cellpadding="0" class="geTable">
						<tr>
							<th>名称</th>
							<th>摄入量</th>
							<th>推荐</th>
						</tr>
						<tr v-for="(item,index) in nutrientlist" :key="index">
							<td>{{item.nutrientname}}</td>
							<td>{{item.nutrientintake}}</td>
							<td>{{item.nutrientrecommend}}</td>
						</tr>
					</table>
				</div>

				<!-- 运动分析 -->
				<div class="title">
					<span class="font17">运动分析</span>
				</div>
				<div class="panel">
					<table border="0" cellspacing="0" cellpadding="0" class="geTable">
						<tr>
							<th>已完成的运动</th>
							<th></th>
							<th></th>
						</tr>
						<tr v-for="(item,index) in motionlist" :key="index">
							<td>{{item.motionname}}</td>
							<td>{{item.motionunit}}</td>
							<td>{{item.actualmovement}}</td>
						</tr>
					</table>
				</div>

				<!-- Anura心理压力值 -->
				<div class="title">
					<span class="font17">Anura心理压力值（ASI）</span>
					<span class="huiFont font12 float_right">数据仅供参考</span>
				</div>
				<div class="panel">
					<div class="list">
						<ul class="clear">
							<li style="background-color: #71E096;">1</li>
							<li style="background-color: #74E8B4;">2</li>
							<li style="background-color: #FFEB78;" class="active">3</li>
							<li style="background-color: #ED8285;">4</li>
							<li style="background-color: #E9414F;">5</li>
						</ul>
					</div>
					<p class="font13 pane-state">状态:高效</p>
					<ul class="panel-list font13 huiFont">
						<li>● ASI值"适中"表示你有一定的心理压力，身心健康处于稳定状态。</li>
						<li>● 大多数人在此ASI区间会表现出最佳的工作状态。 </li>
						<li>● 如果你在工作中保持此ASI状态并在休息时适当放松，将会受益匪浅.</li>
					</ul>
					<div class="note font12">
						注:正如静息心率(RHR)会持续变化-样，你的心理压力值( ASI)在连续的测量中显示不同的结果也是正常现象，这是因为心率变异性( HRV
						)也是持续变化的。所以，当你连续测量时，心理压力值(ASI)结果出现多至1.0的波动也并非异常现象。
					</div>
				</div>

				<!-- 菜单 -->
				<!-- <div class="menulist">
					<ul>
						<router-link tag="li" to="/diet_supplement">
							<img src="@/assets/images/饮食@2x.png" alt="">
							<p>+饮食</p>
						</router-link>

						<router-link tag="li" to="/uploadPhoto_supplement">
							<img src="@/assets/images/午餐@2x.png" alt="">
							<p>+营养</p>
						</router-link>

						<router-link tag="li" to="/sport">
							<img src="@/assets/images/晚餐@2x.png" alt="">
							<p>+运动</p>
						</router-link>

						<router-link tag="li" to="/mood">
							<img src="@/assets/images/加餐@2x(1).png" alt="">
							<p>+心情</p>
						</router-link>
					</ul>
				</div> -->
			</div>

		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: "healthy",
		data: () => ({
			datriq: '',  //日期
			healthystatus:'',  //体重情况
			bmi:'',
			//热量分析
			dietdata:[],  
			totalintake:'',
			totalrecommend:'',
			//三大营养素分析
			intakefat:'',  //摄入脂肪
			recommendfat:'',  //推荐脂肪
			intakecarbohydrate:'',  //摄入碳水化合物
			recommendcarbohydrate:'',  //推荐碳水化合物
			intakeprotein:'',  //摄入蛋白质
			recommendprotein:'',  //推荐蛋白质
			nutrientlist:[],  //营养摄入素分析
			motionlist:[],  //运动分析
		}),
		methods: {
			getnewdate(){
				let timer=new Date;
				let years=timer.getFullYear();
				let mont=Number(timer.getMonth())+1;
				if(mont<10){
					mont='0'+mont;
				}
				let days=timer.getDate();
				if(days<10){
					days='0'+days;
				}
				this.datriq=years+'-'+mont+'-'+days;
			},
			//进度条
			huan(e) {
				var option = {
					tooltip: {
						show: false
					},
					legend: {
						show: false
					},
					animation: false,
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['85%', '100%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: e,
								name: ''
							},
							{
								value: 100 - e,
								name: ''
							}
						]
					}],
					color: ["#ffa466", "#f5f5f5"]
				};

				//获取dom容器
				var myChart = echarts.init(document.getElementById('huan'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},

			//饼图
			pie() {
				var option = {
					tooltip: {
						show: false
					},
					legend: {
						data:['早餐','午餐','晚餐','加餐']
					},
					animation: false,
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['30%', '60%'],
						center: ['50%', '50%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								position: 'outside',
								textStyle: {
									fontSize: '12',
//			                        color: "#FFF"
								},
								formatter: '{d}%'
							},
						},
						labelLine: {
							normal: {
								show: true,
							}
						},
						data: [{
								value: 25,
								name: '早餐'
							},
							{
								value: 25,
								name: '午餐'
							},
							{
								value: 25,
								name: '晚餐'
							},
							{
								value: 25,
								name: '加餐'
							},
						]
					}],
					color: ["#7687e8", "#f1a5a5", "#f7d284", "#76c5a1"]
				};

				//获取dom容器
				var myChart = echarts.init(document.getElementById('pie'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				let url = "UserInterface/HealthCalorimetricAnalysis.ashx";
				let param={
					datetime:this.datriq
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					   return;
					}
					this.huan(data.bmi);
					this.bmi=data.bmi;
					this.healthystatus=data.healthystatus;
					this.dietdata=data.dietdata.dietlistdata;
					this.totalintake=data.dietdata.totalintake;
					this.totalrecommend=data.dietdata.totalrecommend;
					let dietlist=[];
					for(var i=0;i<data.dietdata.dietlistdata.length;i++){
						let aa={value:data.dietdata.dietlistdata[i].quantityintake,name:data.dietdata.dietlistdata[i].quantityname};
						dietlist.push(aa)
					}
					option.series[0].data=dietlist;
					myChart.setOption(option);
				})
			},

			//饼图
			pie2() {
				var option = {
					tooltip: {
						show: false
					},
					legend: {
						data:['脂肪','蛋白质','碳水']
					},
					animation: false,
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['0%', '60%'],
						center: ['50%', '50%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								position: 'outside',
								textStyle: {
									fontSize: '12',
									//			                        color: "#FFF"
								},
								formatter: '{d}%'
							},
						},
						labelLine: {
							normal: {
								show: true,
							}
						},
						data: [{
								value: 25,
								name: '脂肪'
							},
							{
								value: 25,
								name: '蛋白质'
							},
							{
								value: 25,
								name: '碳水'
							}
						]
					}],
					color: ["#f7d284", "#7687e8", "#f1a5a5"]
				};

				//获取dom容器
				var myChart = echarts.init(document.getElementById('pie2'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				let url = "UserInterface/HealthThreeNutrition.ashx";
				let param={
					datetime:this.datriq
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					   return;
					}
					this.intakefat=data.intakefat;
					this.intakecarbohydrate=data.intakecarbohydrate;
					this.recommendfat=data.recommendfat;
					this.recommendcarbohydrate=data.recommendcarbohydrate;
					this.intakeprotein=data.intakeprotein;
					this.recommendprotein=data.recommendprotein;
				})
			},
			// 营养摄入素分析
			analysis(){
				let url = "UserInterface/HealthNutritionIntake.ashx";
				let param={
					datetime:this.datriq
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					   return;
					}
					this.nutrientlist=data.data;
				})
			},
			// 运动分析
			healThk(){
				let url = "UserInterface/HealThkinematicAnalysis.ashx";
				let param={
					datetime:this.datriq
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					   return;
					}
					this.motionlist=data.data;
				})
			}
		},
		mounted: function() {
			this.getnewdate();
			this.huan(80);
			this.pie();
			this.pie2();
			this.analysis();
			this.healThk();
		}
	}
</script>

<style scoped lang="scss">
	.page {
		padding: 0.20rem;
		padding-top: 0;
	}

	.title:before {
		content: "";
		display: inline-block;
		width: 5px;
		height: 11px;
		background: #F78335;
		border-radius: 3px;
		margin-left: -5px;
		margin-right: 5px;
	}

	.title {
		padding-left: 5px;
		margin-top: 20px;
	}

	.panel {
		/*height:3.22rem;*/
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 8px 0px rgba(55, 61, 83, 0.51);
		border-radius: 15px;
		padding: 16px;
		margin-top: 20px;
	}

	.list {
		border-radius: 3px;
		overflow: hidden;
	}

	.list li {
		float: left;
		width: 20%;
		box-sizing: border-box;
		text-align: center;
		color: #FFFFFF;
		font-size: 0.18rem;
		line-height: 0.27rem;
		height: 0.27rem;
	}

	.list li.active {
		border: 0.02px solid #48546E;
		color: #48546E;
		line-height: 0.25rem;
	}

	.pane-state {
		margin-top: 0.1rem;
		color: #7786E4;
	}

	.panel-list {
		line-height: 1.5;
		border-bottom: 1px solid #EDEDF5;
		padding-bottom: 0.15rem;
		margin-bottom: 0.15rem;
	}

	.note {
		color: #CDCFDE;
		line-height: 1.5;
	}

	/*时间栏目*/
	.time-pick {
		background: #FFA466;
		height: 44px;
	}

	.time-inner {
		width: 200px;
		text-align: center;
		padding-top: 10px;
		margin: 0 auto;
	}

	.time-show {
		display: inline-block;
		width: 116px;
		font-size: 12px;
		line-height: 25px;
		background: #e79660;
		color: #FFFFFF;
		text-align: center;
		border-radius: 5px;
		overflow: hidden;

		input {
			width: 100%;
			font-size: 12px;
			color: #fff;
			text-align: center;
		}
	}


	/*第一个进度条*/
	.huan {
		height: 150px;
		width: 150px;
		margin: 0 auto;
		position: relative;
	}

	.text-huan {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		text-align: center;
		padding-top: 75px;
	}

	/*第二个饼图*/
	#pie,
	#pie2 {
		/*width: 200px;*/
		height: 300px;
		margin: 0 auto;
	}

	.panel table.bgtable {
		width: 100%;
		font-size: 0.12rem;
		line-height: 0.25rem;
		text-align: left;
		background: #F5F6FA;
		border-radius: 5px;
		padding: 5px 10px;
	}

	.panel table.bgtable th {
		font-weight: normal;
		color: #7484E4;
	}

	.panel table.bgtable .line td {
		padding: 5px 0;
	}

	.geTable {
		width: 100%;
		font-size: 0.12rem;
		line-height: 0.25rem;
		text-align: left;
		/*padding: 5px 10px;*/
	}

	.panel table.geTable th {
		font-weight: normal;
		color: #7484E4;
	}

	.geTable th,
	.geTable td {
		border-bottom: 1px solid #eee;
		;
	}

	.geTable tr:last-of-type td {
		border: none;
	}

	/* 菜单 */
	.menulist {
		margin-top: 0.3rem;
	}

	.menulist ul {
		display: flex;
		justify-content: space-around;
		text-align: center;
		font-size: 0.12rem;
	}

	.menulist ul img {
		width: 0.35rem;
		display: block;
	}
</style>
