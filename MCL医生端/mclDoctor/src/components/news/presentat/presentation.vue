<template>
	<div>
		<mt-header title="效果评价" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="headty_home" style="background: #D1EEFC;">
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
						<li>临床诊断：{{datasj.clinical_diagnosis}}</li>
						<li>管理诉求：{{datasj.managementAppeals}}</li>
						<li>并发症状：{{datasj.concurrent}}</li>
					</ul>
				</div>
				<p>体重及生活方式</p>
				<div class="headty_mead">
					<div class="mpact_tab">
						<span v-for="(item,index) in liList" @click="addClass(index)" :key="index" :class="{active:index==current}">{{item.names}}</span>
					</div>
					<div id="weighEchart" v-show="weigh"></div>
					<div id="echartnengl" v-show="nengl"></div>
					<div id="echarthaodo" v-show="haodo"></div>
					<div id="echartsport" v-show="sport"></div>
					<div id="echarttimes" v-show="times"></div>
				</div>
				<p>筛查评估</p>
				<div class="headty_mead">
					<div class="mpact_tab">
						<span v-for="(item,index) in eyeList" @click="eyeClass(index)" :key="index" :class="{active:index==currente}">{{item.names}}</span>
					</div>
					<div id="echartshaic" v-show="yingyshac"></div>
					<div id="echartpingg" v-show="yypingg"></div>
					<div id="echartkashi" v-show="kaspf"></div>
					<div id="echartxlyl" v-show="xinliyl"></div>
				</div>
				<p>症状管理</p>
				<div class="headty_mead">
					<div class="mpact_tab">
						<span v-for="(item,index) in zmanageList" @click="zzglClass(index)" :key="index" :class="{active:index==currentz}">{{item.names}}</span>
					</div>
					<div id="echartzmanage1" v-show="zzmanage1"></div>
					<div id="echartzmanage2" v-show="zzmanage2"></div>
					<div id="echartzmanage3" v-show="zzmanage3"></div>
					<div id="echartzmanage4" v-show="zzmanage4"></div>
					<div id="echartzmanage5" v-show="zzmanage5"></div>
					<div id="echartzmanage6" v-show="zzmanage6"></div>
					<div id="echartzmanage7" v-show="zzmanage7"></div>
					<div id="echartzmanage8" v-show="zzmanage8"></div>
					<div id="echartzmanage9" v-show="zzmanage9"></div>
					<div id="echartzmanage10" v-show="zzmanage10"></div>
					<div id="echartzmanage11" v-show="zzmanage11"></div>
					<div id="echartzmanage12" v-show="zzmanage12"></div>
					<div id="echartzmanage13" v-show="zzmanage13"></div>
					<div id="echartzmanage14" v-show="zzmanage14"></div>
					<div id="echartzmanage15" v-show="zzmanage15"></div>
					<div id="echartzmanage16" v-show="zzmanage16"></div>
					<div id="echartzmanage17" v-show="zzmanage17"></div>
					<div id="echartzmanage18" v-show="zzmanage18"></div>
					<div id="echartzmanage19" v-show="zzmanage19"></div>
				</div>
				<p>关键指标</p>
				<div class="headty_mead">
					<div class="mpact_tab">
						<span v-for="(item,index) in eyeListxb" @click="gjzbClass(index)" :key="index" :class="{active:index==currentg}">{{item.names}}</span>
					</div>
					<div id="echartgjzb1" v-show="guanjzb1"></div>
					<div id="echartgjzb2" v-show="guanjzb2"></div>
					<div id="echartgjzb3" v-show="guanjzb3"></div>
					<div id="echartgjzb4" v-show="guanjzb4"></div>
					<div id="echartgjzb5" v-show="guanjzb5"></div>
					<div id="echartgjzb6" v-show="guanjzb6"></div>
					<div id="echartgjzb7" v-show="guanjzb7"></div>
					<div id="echartgjzb8" v-show="guanjzb8"></div>
				</div>
				<p>生活质量</p>
				<div class="headty_mead">
					<div id="echartLifes"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	export default {
		name: "impactAsses",
		data: () => ({
			datasj: {},  //基本信息
			// 体重及方式
			current:0,
			weigh:true,
			nengl:true,
			haodo:true,
			sport:true,
			times:true,
			liList:[
				{names:'体重'},{names:'能量'},{names:'脂肪/蛋白质/碳水化合物'},{names:'运动耗能'},{names:'睡眠时间'}
			],
			// 筛查评估
			currente:0,
			yingyshac:true,
			yypingg:true,
			kaspf:true,
			xinliyl:true,
			eyeList:[
				{names:'营养筛查'},{names:'营养评估'},{names:'卡式评分'},{names:'心理压力值'}
			], 
			// 关键指标
			currentg:0,
			guanjzb1:true,
			guanjzb2:true,
			guanjzb3:true,
			guanjzb4:true,
			guanjzb5:true,
			guanjzb6:true,
			guanjzb7:true,
			guanjzb8:true,
			eyeListxb:[
				{names:'白细胞'},{names:'红细胞'},{names:'血小板'},{names:'血红蛋白'},{names:'白蛋白'},{names:'前白蛋白'},{names:'总蛋白'},{names:'球蛋白'}
			],
			// 症状管理
			currentz:0,
			zzmanage1:true,
			zzmanage2:true,
			zzmanage3:true,
			zzmanage4:true,
			zzmanage5:true,
			zzmanage6:true,
			zzmanage7:true,
			zzmanage8:true,
			zzmanage9:true,
			zzmanage10:true,
			zzmanage11:true,
			zzmanage12:true,
			zzmanage13:true,
			zzmanage14:true,
			zzmanage15:true,
			zzmanage16:true,
			zzmanage17:true,
			zzmanage18:true,
			zzmanage19:true,
			zmanageList:[
				{names:'体重流失'},{names:'贫血'},{names:'疼痛'},{names:'食欲下降、厌食'},{names:'吞咽困难'},{names:'消化不良'},{names:'恶心、呕吐'},{names:'腹胀'},{names:'水肿'},{names:'白细胞减少'},{names:'脱发'},{names:'骨髓抑制'},{names:'便秘'},{names:'失眠'},{names:'口腔黏膜炎'},{names:'疲劳'},{names:'呼吸困难'},{names:'口干'},{names:'腹泻'}
			],
			param:{
				patientskey:''
			}
		}),
		methods: {
			showfun(){
				this.weigh=true;
				this.nengl=false;
				this.haodo=false;
				this.sport=false;
				this.times=false;
				
				this.yingyshac=true;
				this.yypingg=false;
				this.kaspf=false;
				this.xinliyl=false;
				
				this.guanjzb1=true;
				this.guanjzb2=false;
				this.guanjzb3=false;
				this.guanjzb4=false;
				this.guanjzb5=false;
				this.guanjzb6=false;
				this.guanjzb7=false;
				this.guanjzb8=false;
				
				this.zzmanage1=true;
				this.zzmanage2=false;
				this.zzmanage3=false;
				this.zzmanage4=false;
				this.zzmanage5=false;
				this.zzmanage6=false;
				this.zzmanage7=false;
				this.zzmanage8=false;
				this.zzmanage9=false;
				this.zzmanage10=false;
				this.zzmanage11=false;
				this.zzmanage12=false;
				this.zzmanage13=false;
				this.zzmanage14=false;
				this.zzmanage15=false;
				this.zzmanage16=false;
				this.zzmanage17=false;
				this.zzmanage18=false;
				this.zzmanage19=false;
			},
			//基本信息
			getInform() {
				let url = "UserInterface/curve/EssentialInformation.ashx";
				this.$post(url,this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.datasj = data;
				})
			},
			
			addClass(index){
				this.current=index;
				if(index==0){
					this.weigh=true;
					this.nengl=false;
					this.haodo=false;
					this.sport=false;
					this.times=false;
				}else if(index==1){
					this.weigh=false;
					this.nengl=true;
					this.haodo=false;
					this.sport=false;
					this.times=false;
				}else if(index==2){
					this.weigh=false;
					this.nengl=false;
					this.haodo=true;
					this.sport=false;
					this.times=false;
				}else if(index==3){
					this.weigh=false;
					this.nengl=false;
					this.haodo=false;
					this.sport=true;
					this.times=false;
				}else if(index==4){
					this.weigh=false;
					this.nengl=false;
					this.haodo=false;
					this.sport=false;
					this.times=true;
				}
			},
			// 体重及生活方式
			initEchart() {
				// 体重
				var option = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart = echarts.init(document.getElementById('weighEchart'));
				myChart.setOption(option);
				// 能量
				var option1 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart1 = echarts.init(document.getElementById('echartnengl'));
				myChart1.setOption(option1);
				// 蛋白质
				var option2 = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
					    data: ['脂肪', '蛋白质','碳水化合物']
					},
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name:'蛋白质',
							data: [],
							type: 'line',
							areaStyle: {}
						},
						{
							name:'脂肪',
							data: [],
							type: 'line'
						},
						{
							name:'碳水化合物',
							data: [],
							type: 'line'
						},
					],
					color: ["#F78335", "#09AC17", "#CB0000"]
				};
				var myChart2 = echarts.init(document.getElementById('echarthaodo'));
				myChart2.setOption(option2);
				// 运动耗能
				var option3 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#CB0000"]
				};
				var myChart3 = echarts.init(document.getElementById('echartsport'));
				myChart3.setOption(option3);
				// 睡眠时间
				var option4 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#09AC17"]
				};
				var myChart4 = echarts.init(document.getElementById('echarttimes'));
				myChart4.setOption(option4);
				let url = "UserInterface/curve/WeightAndIifestyle.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					var weighth = [],
						recordDate = [],
						recordDate2 = [],
						recordDate3 = [],
						dangerWeight = [],
						standardWeight = [],
						goodtimes = [],
						timedate1=[],
						timedate2=[],
						timedate3=[],
						timedate4=[],
						timedate5=[];
					for (var i = 0; i < data.WeightInfo.length; i++) {
						weighth.push(data.WeightInfo[i].Weight);
						timedate1.push(data.WeightInfo[i].RecordDate);
					}
					for (var i = 0; i < data.DietInfo.length; i++) {
						dangerWeight.push(data.DietInfo[i].foodEnergy);
						recordDate.push(data.DietInfo[i].fat);
						recordDate2.push(data.DietInfo[i].protein);
						recordDate3.push(data.DietInfo[i].carbohydrate);
						timedate2.push(data.DietInfo[i].create_date);
					}
					
					for (var i = 0; i < data.CheckOutInfo.length; i++) {
						standardWeight.push(data.CheckOutInfo[i].motion);
						timedate4.push(data.CheckOutInfo[i].create_date);
					}
					for (var i = 0; i < data.LifeSurveyInfo.length; i++) {
						goodtimes.push(data.LifeSurveyInfo[i].sleep);
						timedate5.push(data.LifeSurveyInfo[i].create_date);
					}
					option.series[0].data = weighth;
					option.xAxis.data = timedate1;
					myChart.setOption(option);
					option1.series[0].data = dangerWeight;
					option1.xAxis.data = timedate2;
					myChart1.setOption(option1);
					option2.series[0].data = recordDate;
					option2.series[1].data = recordDate2;
					option2.series[2].data = recordDate3;
					option2.xAxis.data = timedate2;
					myChart2.setOption(option2);
					option3.series[0].data = standardWeight;
					option3.xAxis.data = timedate4;
					myChart3.setOption(option3);
					option4.series[0].data = goodtimes;
					option4.xAxis.data = timedate5;
					myChart4.setOption(option4);
				})
			},
			
			eyeClass(index){
				this.currente=index;
				if(index==0){
					this.yingyshac=true;
					this.yypingg=false;
					this.kaspf=false;
					this.xinliyl=false;
				}else if(index==1){
					this.yingyshac=false;
					this.yypingg=true;
					this.kaspf=false;
					this.xinliyl=false;
				}else if(index==2){
					this.yingyshac=false;
					this.yypingg=false;
					this.kaspf=true;
					this.xinliyl=false;
				}else if(index==3){
					this.yingyshac=false;
					this.yypingg=false;
					this.kaspf=false;
					this.xinliyl=true;
				}
			},
			// 筛查评估
			initEchartsc() {
				// 营养筛查
				var option = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart = echarts.init(document.getElementById('echartshaic'));
				myChart.setOption(option);
				// 营养评估
				var option1 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#09AC17"]
				};
				var myChart1 = echarts.init(document.getElementById('echartpingg'));
				myChart1.setOption(option1);
				// 卡氏评分
				var option2 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#CB0000"]
				};
				var myChart2 = echarts.init(document.getElementById('echartkashi'));
				myChart2.setOption(option2);
				// 心理压力
				var option3 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart3 = echarts.init(document.getElementById('echartxlyl'));
				myChart3.setOption(option3);
				let url = "UserInterface/curve/ScreeningAssessment.ashx";
				this.$post(url,this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					var weighth = [],
						recordDate = [],
						dangerWeight = [],
						standardWeight = [],
						timedate1=[],
						timedate2=[],
						timedate3=[],
						timedate4=[];
					for (var i = 0; i < data.nrs2002Info.length; i++) {
						weighth.push(data.nrs2002Info[i].score);
						timedate1.push(data.nrs2002Info[i].create_date);
					}
					for (var i = 0; i < data.pgsgaInfo.length; i++) {
						recordDate.push(data.pgsgaInfo[i].score);
						timedate2.push(data.pgsgaInfo[i].create_date);
					}
					for (var i = 0; i < data.cartesianInfo.length; i++) {
						dangerWeight.push(data.cartesianInfo[i].score);
						timedate3.push(data.cartesianInfo[i].create_date);
					}
					for (var i = 0; i < data.pressureInfo.length; i++) {
						standardWeight.push(data.pressureInfo[i].score);
						timedate4.push(data.pressureInfo[i].create_date);
					}
					option.series[0].data = weighth;
					option.xAxis.data = timedate1;
					myChart.setOption(option);
					option1.series[0].data = recordDate;
					option1.xAxis.data = timedate2;
					myChart1.setOption(option1);
					option2.series[0].data = dangerWeight;
					option2.xAxis.data = timedate3;
					myChart2.setOption(option2);
					option3.series[0].data = standardWeight;
					option3.xAxis.data = timedate4;
					myChart3.setOption(option3);
				})
			},
			
			gjzbClass(index){
				this.currentg=index;
				if(index==0){
					this.guanjzb1=true;
					this.guanjzb2=false;
					this.guanjzb3=false;
					this.guanjzb4=false;
					this.guanjzb5=false;
					this.guanjzb6=false;
					this.guanjzb7=false;
					this.guanjzb8=false;
				}else if(index==1){
					this.guanjzb1=false;
					this.guanjzb2=true;
					this.guanjzb3=false;
					this.guanjzb4=false;
					this.guanjzb5=false;
					this.guanjzb6=false;
					this.guanjzb7=false;
					this.guanjzb8=false;
				}else if(index==2){
					this.guanjzb1=false;
					this.guanjzb2=false;
					this.guanjzb3=true;
					this.guanjzb4=false;
					this.guanjzb5=false;
					this.guanjzb6=false;
					this.guanjzb7=false;
					this.guanjzb8=false;
				}else if(index==3){
					this.guanjzb1=false;
					this.guanjzb2=false;
					this.guanjzb3=false;
					this.guanjzb4=true;
					this.guanjzb5=false;
					this.guanjzb6=false;
					this.guanjzb7=false;
					this.guanjzb8=false;
				}else if(index==4){
					this.guanjzb1=false;
					this.guanjzb2=false;
					this.guanjzb3=false;
					this.guanjzb4=false;
					this.guanjzb5=true;
					this.guanjzb6=false;
					this.guanjzb7=false;
					this.guanjzb8=false;
				}else if(index==5){
					this.guanjzb1=false;
					this.guanjzb2=false;
					this.guanjzb3=false;
					this.guanjzb4=false;
					this.guanjzb5=false;
					this.guanjzb6=true;
					this.guanjzb7=false;
					this.guanjzb8=false;
				}else if(index==6){
					this.guanjzb1=false;
					this.guanjzb2=false;
					this.guanjzb3=false;
					this.guanjzb4=false;
					this.guanjzb5=false;
					this.guanjzb6=false;
					this.guanjzb7=true;
					this.guanjzb8=false;
				}else if(index==7){
					this.guanjzb1=false;
					this.guanjzb2=false;
					this.guanjzb3=false;
					this.guanjzb4=false;
					this.guanjzb5=false;
					this.guanjzb6=false;
					this.guanjzb7=false;
					this.guanjzb8=true;
				}
			},
			// 关键指标
			initEchagjzb() {
				// 白细胞
				var option = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart = echarts.init(document.getElementById('echartgjzb1'));
				myChart.setOption(option);
				// 红细胞
				var option1 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#09AC17"]
				};
				var myChart1 = echarts.init(document.getElementById('echartgjzb2'));
				myChart1.setOption(option1);
				// 血小板
				var option2 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#CB0000"]
				};
				var myChart2 = echarts.init(document.getElementById('echartgjzb3'));
				myChart2.setOption(option2);
				// 血红蛋白
				var option3 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart3 = echarts.init(document.getElementById('echartgjzb4'));
				myChart3.setOption(option3);
				// 白蛋白
				var option4 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart4 = echarts.init(document.getElementById('echartgjzb5'));
				myChart4.setOption(option4);
				// 前白蛋白
				var option5 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart5 = echarts.init(document.getElementById('echartgjzb6'));
				myChart5.setOption(option5);
				// 总蛋白
				var option6 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart6 = echarts.init(document.getElementById('echartgjzb7'));
				myChart6.setOption(option6);
				// 球蛋白
				var option7 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart7 = echarts.init(document.getElementById('echartgjzb8'));
				myChart7.setOption(option7);
				
				let url = "UserInterface/curve/KeyIndicators.ashx";
				this.$post(url,this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					var indicators1 = [],
						indicators2 = [],
						indicators3 = [],
						indicators4 = [],
						indicators5 = [],
						indicators6 = [],
						indicators7 = [],
						indicators8 = [],
						timedate1=[];
					for (var i = 0; i < data.tumourInfo.length; i++) {
						indicators1.push(data.tumourInfo[i].attribute_value_05);
						indicators2.push(data.tumourInfo[i].attribute_value_06);
						indicators3.push(data.tumourInfo[i].attribute_value_07);
						indicators4.push(data.tumourInfo[i].attribute_value_10);
						indicators5.push(data.tumourInfo[i].attribute_value_05);
						indicators6.push(data.tumourInfo[i].attribute_value_11);
						indicators7.push(data.tumourInfo[i].attribute_value_12);
						indicators8.push(data.tumourInfo[i].attribute_value_43);
						timedate1.push(data.tumourInfo[i].create_date);
					}
					option.series[0].data = indicators1;
					option.xAxis.data = timedate1;
					myChart.setOption(option);
					option1.series[0].data = indicators2;
					option1.xAxis.data = timedate1;
					myChart1.setOption(option1);
					option2.series[0].data = indicators3;
					option2.xAxis.data = timedate1;
					myChart2.setOption(option2);
					option3.series[0].data = indicators4;
					option3.xAxis.data = timedate1;
					myChart3.setOption(option3);
					option4.series[0].data = indicators5;
					option4.xAxis.data = timedate1;
					myChart4.setOption(option4);
					option5.series[0].data = indicators6;
					option5.xAxis.data = timedate1;
					myChart5.setOption(option5);
					option6.series[0].data = indicators7;
					option6.xAxis.data = timedate1;
					myChart6.setOption(option6);
					option7.series[0].data = indicators8;
					option7.xAxis.data = timedate1;
					myChart7.setOption(option7);
				})
			},
			zzglClass(index){
				this.currentz=index;
				if(index==0){
					this.zzmanage1=true;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==1){
					this.zzmanage1=false;
					this.zzmanage2=true;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==2){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=true;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==3){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=true;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==4){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=true;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==5){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=true;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==6){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=true;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==7){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=true;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==8){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=true;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==9){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=true;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==10){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=true;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==11){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=true;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==12){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=true;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==13){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=true;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==14){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=true;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==15){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=true;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==16){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=true;
					this.zzmanage18=false;
					this.zzmanage19=false;
				}else if(index==17){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=true;
					this.zzmanage19=false;
				}else if(index==18){
					this.zzmanage1=false;
					this.zzmanage2=false;
					this.zzmanage3=false;
					this.zzmanage4=false;
					this.zzmanage5=false;
					this.zzmanage6=false;
					this.zzmanage7=false;
					this.zzmanage8=false;
					this.zzmanage9=false;
					this.zzmanage10=false;
					this.zzmanage11=false;
					this.zzmanage12=false;
					this.zzmanage13=false;
					this.zzmanage14=false;
					this.zzmanage15=false;
					this.zzmanage16=false;
					this.zzmanage17=false;
					this.zzmanage18=false;
					this.zzmanage19=true;
				}
			},
			// 症状管理
			initEchamanage() {
				// 体重流失
				var option = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart = echarts.init(document.getElementById('echartzmanage1'));
				myChart.setOption(option);
				// 贫血
				var option1 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#09AC17"]
				};
				var myChart1 = echarts.init(document.getElementById('echartzmanage2'));
				myChart1.setOption(option1);
				// 疼痛
				var option2 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#CB0000"]
				};
				var myChart2 = echarts.init(document.getElementById('echartzmanage3'));
				myChart2.setOption(option2);
				// 食欲下降、厌食
				var option3 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart3 = echarts.init(document.getElementById('echartzmanage4'));
				myChart3.setOption(option3);
				// 吞咽困难
				var option4 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart4 = echarts.init(document.getElementById('echartzmanage5'));
				myChart4.setOption(option4);
				// 消化不良
				var option5 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart5 = echarts.init(document.getElementById('echartzmanage6'));
				myChart5.setOption(option5);
				// 恶心、呕吐
				var option6 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart6 = echarts.init(document.getElementById('echartzmanage7'));
				myChart6.setOption(option6);
				// 腹胀
				var option7 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart7 = echarts.init(document.getElementById('echartzmanage8'));
				myChart7.setOption(option7);
				// 水肿
				var option8 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart8 = echarts.init(document.getElementById('echartzmanage9'));
				myChart8.setOption(option8);
				// 白细胞减少
				var option9 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#09AC17"]
				};
				var myChart9 = echarts.init(document.getElementById('echartzmanage10'));
				myChart9.setOption(option9);
				// 脱发
				var option10 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#CB0000"]
				};
				var myChart10 = echarts.init(document.getElementById('echartzmanage11'));
				myChart10.setOption(option10);
				// 骨髓抑制
				var option11 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart11 = echarts.init(document.getElementById('echartzmanage12'));
				myChart11.setOption(option11);
				// 便秘
				var option12 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart12 = echarts.init(document.getElementById('echartzmanage13'));
				myChart12.setOption(option12);
				// 失眠
				var option13 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart13= echarts.init(document.getElementById('echartzmanage14'));
				myChart13.setOption(option13);
				// 口腔黏膜炎
				var option14 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart14 = echarts.init(document.getElementById('echartzmanage15'));
				myChart14.setOption(option14);
				// 疲劳
				var option15 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart15 = echarts.init(document.getElementById('echartzmanage16'));
				myChart15.setOption(option15);
				// 呼吸困难
				var option16= {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart16= echarts.init(document.getElementById('echartzmanage17'));
				myChart16.setOption(option16);
				// 口干
				var option17 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart17 = echarts.init(document.getElementById('echartzmanage18'));
				myChart17.setOption(option17);
				// 腹泻
				var option18 = {
					grid: {
						top: 20,
						bottom: 40
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							data: [],
							type: 'line',
							areaStyle: {}
						}
					],
					color: ["#F78335"]
				};
				var myChart18= echarts.init(document.getElementById('echartzmanage19'));
				myChart18.setOption(option18);
				
				let url = "UserInterface/curve/SymptomManagement.ashx";
				this.$post(url,this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					var indicators1 = [],
						indicators2 = [],
						indicators3 = [],
						indicators4 = [],
						indicators5 = [],
						indicators6 = [],
						indicators7 = [],
						indicators8 = [],
						indicators9 = [],
						indicators10 = [],
						indicators11 = [],
						indicators12 = [],
						indicators13 = [],
						indicators14 = [],
						indicators15 = [],
						indicators16 = [],
						indicators17 = [],
						indicators18 = [],
						indicators19 = [],
						timedate1=[],
						timedate2=[],
						timedate3=[],
						timedate4=[],
						timedate5=[],
						timedate6=[],
						timedate7=[],
						timedate8=[],
						timedate9=[],
						timedate10=[],
						timedate11=[],
						timedate12=[],
						timedate13=[],
						timedate14=[],
						timedate15=[],
						timedate16=[],
						timedate17=[],
						timedate18=[],
						timedate19=[];
					for (var i = 0; i < data.data1.length; i++) {
						indicators1.push(data.data1[i].valueList);
						timedate1.push(data.data1[i].dateList);
					}
					for (var i = 0; i < data.data2.length; i++) {
						indicators2.push(data.data2[i].valueList);
						timedate2.push(data.data2[i].dateList);
					}
					for (var i = 0; i < data.data3.length; i++) {
						indicators3.push(data.data3[i].valueList);
						timedate3.push(data.data3[i].dateList);
					}
					for (var i = 0; i < data.data4.length; i++) {
						indicators4.push(data.data4[i].valueList);
						timedate4.push(data.data4[i].dateList);
					}
					for (var i = 0; i < data.data5.length; i++) {
						indicators5.push(data.data5[i].valueList);
						timedate5.push(data.data5[i].dateList);
					}
					for (var i = 0; i < data.data6.length; i++) {
						indicators6.push(data.data6[i].valueList);
						timedate6.push(data.data6[i].dateList);
					}
					for (var i = 0; i < data.data7.length; i++) {
						indicators7.push(data.data7[i].valueList);
						timedate7.push(data.data7[i].dateList);
					}
					for (var i = 0; i < data.data8.length; i++) {
						indicators8.push(data.data8[i].valueList);
						timedate8.push(data.data8[i].dateList);
					}
					for (var i = 0; i < data.data9.length; i++) {
						indicators9.push(data.data9[i].valueList);
						timedate9.push(data.data9[i].dateList);
					}
					for (var i = 0; i < data.data10.length; i++) {
						indicators10.push(data.data10[i].valueList);
						timedate10.push(data.data10[i].dateList);
					}
					for (var i = 0; i < data.data11.length; i++) {
						indicators11.push(data.data11[i].valueList);
						timedate11.push(data.data11[i].dateList);
					}
					for (var i = 0; i < data.data12.length; i++) {
						indicators12.push(data.data12[i].valueList);
						timedate12.push(data.data12[i].dateList);
					}
					for (var i = 0; i < data.data13.length; i++) {
						indicators13.push(data.data13[i].valueList);
						timedate13.push(data.data13[i].dateList);
					}
					for (var i = 0; i < data.data14.length; i++) {
						indicators14.push(data.data14[i].valueList);
						timedate14.push(data.data14[i].dateList);
					}
					for (var i = 0; i < data.data15.length; i++) {
						indicators15.push(data.data15[i].valueList);
						timedate15.push(data.data15[i].dateList);
					}
					for (var i = 0; i < data.data16.length; i++) {
						indicators16.push(data.data16[i].valueList);
						timedate16.push(data.data16[i].dateList);
					}
					for (var i = 0; i < data.data17.length; i++) {
						indicators17.push(data.data17[i].valueList);
						timedate17.push(data.data17[i].dateList);
					}
					for (var i = 0; i < data.data18.length; i++) {
						indicators18.push(data.data18[i].valueList);
						timedate18.push(data.data18[i].dateList);
					}
					for (var i = 0; i < data.data19.length; i++) {
						indicators19.push(data.data19[i].valueList);
						timedate19.push(data.data19[i].dateList);
					}
					option.series[0].data = indicators1;
					option.xAxis.data = timedate1;
					myChart.setOption(option);
					option1.series[0].data = indicators2;
					option1.xAxis.data = timedate1;
					myChart1.setOption(option1);
					option2.series[0].data = indicators3;
					option2.xAxis.data = timedate1;
					myChart2.setOption(option2);
					option3.series[0].data = indicators4;
					option3.xAxis.data = timedate1;
					myChart3.setOption(option3);
					option4.series[0].data = indicators5;
					option4.xAxis.data = timedate1;
					myChart4.setOption(option4);
					option5.series[0].data = indicators6;
					option5.xAxis.data = timedate1;
					myChart5.setOption(option5);
					option6.series[0].data = indicators7;
					option6.xAxis.data = timedate1;
					myChart6.setOption(option6);
					option7.series[0].data = indicators8;
					option7.xAxis.data = timedate1;
					myChart7.setOption(option7);
					option8.series[0].data = indicators9;
					option8.xAxis.data = timedate1;
					myChart8.setOption(option8);
					option9.series[0].data = indicators10;
					option9.xAxis.data = timedate1;
					myChart9.setOption(option9);
					option10.series[0].data = indicators11;
					option10.xAxis.data = timedate1;
					myChart10.setOption(option10);
					option11.series[0].data = indicators12;
					option11.xAxis.data = timedate1;
					myChart11.setOption(option11);
					option12.series[0].data = indicators13;
					option12.xAxis.data = timedate1;
					myChart12.setOption(option12);
					option13.series[0].data = indicators14;
					option13.xAxis.data = timedate1;
					myChart13.setOption(option13);
					option14.series[0].data = indicators15;
					option14.xAxis.data = timedate1;
					myChart14.setOption(option14);
					option15.series[0].data = indicators16;
					option15.xAxis.data = timedate1;
					myChart15.setOption(option15);
					option16.series[0].data = indicators17;
					option16.xAxis.data = timedate1;
					myChart16.setOption(option16);
					option17.series[0].data = indicators18;
					option17.xAxis.data = timedate1;
					myChart17.setOption(option17);
					option18.series[0].data = indicators19;
					option18.xAxis.data = timedate1;
					myChart18.setOption(option18);
				})
			},
			// 生活质量
			lifeEchart() {
				var option = {
					grid: {
						top: 160,
						bottom: 40
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
					    data: ['躯体功能', '角色功能','疲倦情况','恶心与呕吐情况','疼痛状况','认知功能','气促情况','睡眠情况','食欲情况','便秘情况','腹泻情况','情绪功能','社会功能','经济情况','总健康状况']
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '躯体功能',
							data: [],
							type: 'line',
							areaStyle: {}
						},
						{
							name: '角色功能',
							data: [],
							type: 'line'
						},
						{
							name: '疲倦情况',
							data: [],
							type: 'line'
						},
						{
							name: '恶心与呕吐情况',
							data: [],
							type: 'line'
						},
						{
							name: '疼痛状况',
							data: [],
							type: 'line'
						},
						{
							name: '认知功能',
							data: [],
							type: 'line'
						},
						{
							name: '气促情况',
							data: [],
							type: 'line'
						},
						{
							name: '睡眠情况',
							data: [],
							type: 'line'
						},
						{
							name: '食欲情况',
							data: [],
							type: 'line'
						},
						{
							name: '便秘情况',
							data: [],
							type: 'line'
						},
						{
							name: '腹泻情况',
							data: [],
							type: 'line'
						},
						{
							name: '情绪功能',
							data: [],
							type: 'line'
						},
						{
							name: '社会功能',
							data: [],
							type: 'line'
						},
						{
							name: '经济情况',
							data: [],
							type: 'line'
						},
						{
							name: '总健康状况',
							data: [],
							type: 'line'
						},
					],
					color: ["#F78335", "#09AC17", "#CB0000"]
				};
				var myChart = echarts.init(document.getElementById('echartLifes'));
				myChart.setOption(option);
				
				let url = "UserInterface/curve/QualityOfLife.ashx";
				this.$post(url,this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					var weighth = [],
						recordDate = [],
						dangerWeight = [],
						standardWeight = [],
						jiankzk35=[],
						jiankzk36=[],
						jiankzk37=[],
						jiankzk38=[],
						jiankzk39=[],
						jiankzk40=[],
						jiankzk41=[],
						jiankzk42=[],
						jiankzk43=[],
						jiankzk44=[],
						jiankzk45=[],
						jiankzk46=[];
						
					for (var i = 0; i < data.lifeInfo.length; i++) {
						weighth.push(data.lifeInfo[i].attribute_value_32);
						recordDate.push(data.lifeInfo[i].create_date);
						dangerWeight.push(data.lifeInfo[i].attribute_value_33);
						standardWeight.push(data.lifeInfo[i].attribute_value_34);
						jiankzk35.push(data.lifeInfo[i].attribute_value_35);
						jiankzk36.push(data.lifeInfo[i].attribute_value_36);
						jiankzk37.push(data.lifeInfo[i].attribute_value_37);
						jiankzk38.push(data.lifeInfo[i].attribute_value_38);
						jiankzk39.push(data.lifeInfo[i].attribute_value_39);
						jiankzk40.push(data.lifeInfo[i].attribute_value_40);
						jiankzk41.push(data.lifeInfo[i].attribute_value_41);
						jiankzk42.push(data.lifeInfo[i].attribute_value_42);
						jiankzk43.push(data.lifeInfo[i].attribute_value_43);
						jiankzk44.push(data.lifeInfo[i].attribute_value_44);
						jiankzk45.push(data.lifeInfo[i].attribute_value_45);
						jiankzk46.push(data.lifeInfo[i].attribute_value_46);
					}
					option.series[1].data = standardWeight;
					option.series[0].data = weighth;
					option.series[2].data = dangerWeight;
					option.series[3].data = jiankzk35;
					option.series[4].data = jiankzk36;
					option.series[5].data = jiankzk37;
					option.series[6].data = jiankzk38;
					option.series[7].data = jiankzk39;
					option.series[8].data = jiankzk40;
					option.series[9].data = jiankzk41;
					option.series[10].data = jiankzk42;
					option.series[11].data = jiankzk43;
					option.series[12].data = jiankzk44;
					option.series[13].data = jiankzk45;
					option.series[14].data = jiankzk46;
					option.xAxis.data = recordDate;
					myChart.setOption(option);
				})
			},
		},
		mounted() {
			this.showfun();
			this.getInform();
			this.initEchart();
			this.initEchartsc();
			this.initEchagjzb();
			this.initEchamanage();
			this.lifeEchart();
		},
		created() {
			this.param.patientskey = this.$route.query.skey;
		}
	}
</script>

<style scoped lang="scss">
	#weighEchart,#echartnengl,#echarthaodo,#echartsport,#echarttimes,#echartkashi,#echartpingg,#echartshaic,#echartxlyl,
	#echartgjzb1,#echartgjzb2,#echartgjzb3,#echartgjzb4,#echartgjzb5,#echartgjzb6,#echartgjzb7,#echartgjzb8,
	#echartzmanage1,#echartzmanage2,#echartzmanage3,#echartzmanage4,#echartzmanage5,#echartzmanage6,#echartzmanage7,
	#echartzmanage8,#echartzmanage9,#echartzmanage10,#echartzmanage11,#echartzmanage12,#echartzmanage13,#echartzmanage14,
	#echartzmanage15,#echartzmanage16,#echartzmanage17,#echartzmanage18,#echartzmanage19,{
	  	margin: 0 0.2rem;
	  	height: 1.5rem;
	}
	#echartLifes{
		margin: 0 0.2rem;
		height: 3.5rem;
	}
	.headty_home {
		width: 100%;
		padding-top: 44px;
		padding-bottom: 0.12rem;

		.headty_inform {
			width: 92%;
			margin: 0 auto;

			p {
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

			.headty_mead {
				width: 94%;
				padding: 0.1rem 3%;
				margin-top: 0.1rem;
				background: #fff;
				border-radius: 8px;
				font-size: 0.16rem;

				ol {
					overflow: hidden;

					li {
						width: 50%;
						float: left;
						margin-top: 0.06rem;
					}
				}

				ul {
					li {
						margin-top: 0.06rem;
					}
				}
			}
		}
	}
	.mpact_tab{
		overflow: hidden;
		span{
			padding: 0 0.14rem;
			background: #fff;
			border: 1px solid #ddd;
			box-sizing: border-box;
			display: block;
			height: 0.3rem;
			line-height: 0.3rem;
			font-size: 0.14rem;
			width: auto;
			border-radius: 0.15rem;
			float: left;
			&.active{
				background: #F78335;
				border: none;
				color: #fff;
			}
		}
	}
</style>
