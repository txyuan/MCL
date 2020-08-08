<template>
	<div class="diet-root">
		<div id="" style="padding-top: 88px;">
			<!-- <mt-header title="饮食" fixed>
				<div slot="left">
					<router-link to="/wx_Entrance/home" style="color: inherit;">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header> -->
			<mt-header title="饮食" fixed class="borderBottom">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
			<!-- mt-navbar -->
			<div id="navbar" class="fix_top" style="top: 43px;">
				<mt-navbar v-model="ABflag">
					<mt-tab-item v-for="(item,index) in navbarList" :key="`tab_${index}`" :class="(ABflag == item.type)&&'is-selected'" @click.native="toggleType(item)">
						<p>{{item.name}}</p>
					</mt-tab-item>
				</mt-navbar>
			</div>

			<!-- 内容 -->
			<div class="neirong">
				<!-- 今日饮食 -->
				<div class="yinshhi_list" :hidden="ABflag == 2">
					<!-- 今日提醒 -->
					<div class="home-cell margin10">
						<!-- <p class="name">今日提醒</p> -->
						<ul v-for="(item,index) in todynews" :key="`tip_${index}`" class="remindList" @click="hrefgg(item)">
							<li class="margin10">
								<div class="left">
									<div class="rowTop">
										<img src="@/assets/images/yinshi@2x.png" class="icon" />
										<span class="huiFont font14">{{item.takingcondition}}</span>
									</div>
									<div class="rowBottom font12">
										<p class="yellow">应完成时间：<span>{{item.completiontime}}</span> <span>{{item.timeouttime}}</span></p>
									</div>
								</div>
								<div class="right yellow font14">
									<mt-badge size="small" color="#F78335">
										<span style="padding: 2px 5px;">上传饮食</span>
									</mt-badge>
								</div>
							</li>
						</ul>
					</div>

					<!-- 早餐 -->
					<!-- <div class="title">
						<div class="wrap borderBottom">
							<img src="@/assets/images/zaocan@2x.png" width="20" class="icon" />
							<span class="font16">早餐</span>
							<span class="float_right huiFont9">{{breakfasttime}}</span>
						</div>
					</div>
					<mt-cell v-for="(item,index) in todybreakfast.breakfastdatalist" :key="index">
						<img slot="icon" :src="item.breakfast_foodImg" width="46" height="46">
						<div slot="title" class="titleWrap">
							<span class="mint-cell-text">{{item.breakfast_foodName}}</span>
							<span class="mint-cell-label font12 huiFont99">{{item.breakfast_foodQuantity}}</span>
						</div>
						<div class="font14 huiFont99">
							{{item.breakfast_foodEnergy}}
						</div>
					</mt-cell>
					<div class="completeState clear">
						<div class="float_left">
							完成情况
						</div>
						<div class="float_right ">
							<mt-progress :value="todybreakfast.breakfast_completion" :bar-height="7"> </mt-progress>
							<div class="font12 huiFont99">
								推荐摄入{{todybreakfast.breakfast_recintake}}大卡，实际摄入{{todybreakfast.breakfast_actualintake}}大卡 ,完成度：<span class="red">{{todybreakfast.breakfast_completion}}%</span>
								，{{todybreakfast.breakfast_describe}}
							</div>
						</div>
					</div> -->
					<!-- 午餐 -->
					<!-- <div class="title">
						<div class="wrap borderBottom borderTop">
							<img src="@/assets/images/wucan@2x.png" width="20" class="icon" />
							<span class="font16">午餐</span>
							<span class="float_right huiFont9">{{lunchtime}}</span>
						</div>
					</div>
					<mt-cell v-for="(item,index) in todylunch.lunchdatalist" :key="index" is-link>
						<img slot="icon" :src="item.lunch_foodImg" width="46" height="46">
						<div slot="title" class="titleWrap">
							<span class="mint-cell-text">{{item.lunch_foodName}}</span>
							<span class="mint-cell-label font12 huiFont99">{{item.lunch_foodQuantity}}</span>
						</div>
						<div class="font14 huiFont99">
							{{item.lunch_foodEnergy}}
						</div>
					</mt-cell>
					<div class="completeState clear">
						<div class="float_left">
							完成情况
						</div>
						<div class="float_right ">
							<mt-progress :value="todylunch.lunch_completion" :bar-height="7"> </mt-progress>
							<div class="font12 huiFont99">
								推荐摄入{{todylunch.lunch_recintake}}大卡，实际摄入{{todylunch.lunch_actualintake}}大卡 ,完成度：<span class="red">{{todylunch.lunch_completion}}%</span>
								，{{todylunch.lunch_describe}}
							</div>
						</div>
					</div> -->
					<!-- 晚餐 -->
					<!-- <div class="title">
						<div class="wrap borderBottom borderTop">
							<img src="@/assets/images/wancan@2x.png" width="20" class="icon" />
							<span class="font16">晚餐</span>
							<span class="float_right huiFont9">{{dinnertime}}</span>
						</div>
					</div>
					<mt-cell v-for="(item,index) in todydinner.dinnerdatalist" :key="index" is-link>
						<img slot="icon" :src="item.dinner_foodImg" width="46" height="46">
						<div slot="title" class="titleWrap">
							<span class="mint-cell-text">{{item.dinner_foodName}}</span>
							<span class="mint-cell-label font12 huiFont99">{{item.dinner_foodQuantity}}</span>
						</div>
						<div class="font14 huiFont99">
							{{item.dinner_foodEnergy}}
						</div>
					</mt-cell>
					<div class="completeState clear">
						<div class="float_left">
							完成情况
						</div>
						<div class="float_right ">
							<mt-progress :value="todydinner.dinner_completion" :bar-height="7"> </mt-progress>
							<div class="font12 huiFont99">
								推荐摄入{{todydinner.dinner_recintake}}大卡，实际摄入{{todydinner.dinner_actualintake}}大卡 ,完成度：<span class="red">{{todydinner.dinner_completion}}%</span>
								，{{todydinner.dinner_describe}}
							</div>
						</div>
					</div> -->
					<!--加餐-->
					<!-- <div class="title">
						<div class="wrap borderBottom borderTop">
							<img src="@/assets/images/jiacan@2x.png" width="20" class="icon" />
							<span class="font16">加餐</span>
							<span class="float_right huiFont9">{{mealadditiontime}}</span>
						</div>
					</div>
					<div class="borderBottom">
						<mt-cell v-for="(item,index) in todymealaddition.mealadditiondatalist" :key="index" is-link>
							<img slot="icon" :src="item.mealaddition_foodImg" width="46" height="46">
							<div slot="title" class="titleWrap">
								<span class="mint-cell-text">{{item.mealaddition_foodName}}</span>
								<span class="mint-cell-label font12 huiFont99">{{item.mealaddition_foodQuantity}}</span>
							</div>
							<div class="font14 huiFont99">
								{{item.mealaddition_foodEnergy}}
							</div>
						</mt-cell>
						<div class="completeState clear">
							<div class="float_left">
								完成情况
							</div>
							<div class="float_right ">
								<mt-progress :value="todymealaddition.mealaddition_completion" :bar-height="7"> </mt-progress>
								<div class="font12 huiFont99">
									推荐摄入{{todymealaddition.mealaddition_recintake}}大卡，实际摄入{{todymealaddition.mealaddition_actualintake}}大卡 ,完成度：<span
									 class="red">{{todymealaddition.mealaddition_completion}}%</span> ，{{todymealaddition.mealaddition_describe}}
								</div>
							</div>
						</div>
					</div> -->
					<div class="page">
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
								<tr v-for="(item,index) in dietdata" :key="`hot_${index}`">
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
							<p class="font16">摄入比及推荐</p>
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
								
								<tr v-for="(item,index) in yingyangList" :key="`yys_${index}`">
									<td>{{item.name}}</td>
									<td>
										<label v-if="Number(item.value)<Number(item.recommend)" style="color: #FE7A66;">↓</label>
										<label v-else-if="Number(item.value)>Number(item.recommend)" style="color: #FE7A66;">↑</label>
										<label v-else-if="Number(item.value)==Number(item.recommend)" style="color: #42B8A7;">✔</label>
										{{item.value}}
									</td>
									<td>{{item.recommend}}</td>
								</tr>
							</table>
						</div>
					</div>
				</div>

				<!-- 饮食方案 -->
				<div class="yinshhi_list" :hidden="ABflag == 1" style="padding-bottom: 0.5rem;">
					<div class="noalready" v-if="dataflag==0">
						<img src="@/assets/images/nowzzz.png" />
						<p>请稍等，您的饮食方案正在制作中...</p>
					</div>
					<div class="already" v-else>
						<div class="solution">
							<div class="pog_inform">
								<h3>饮食处方说明</h3>
								<p>根据饮食调查，您每日的实际摄入量是{{actualIntake}}，您的目标摄入量是{{targetenergy}}，能量处于{{energyBalance}}。</p>
								<p>为了在治疗期间能保证充足的能量需要量，使体内能量储备处于稳定状态，以维持体重，提高免疫力，改善营养状况。建议您的每日能量摄入按442原则计算，即脂肪40%、碳水化合物40%、蛋白质20%。其中，脂肪{{fat}}，碳水化合物{{carbohydrate}}，蛋白质{{protein}}。</p>
							</div>
							<div class="pogress"><span>能量目标 /{{targetenergy}}</span></div>
							<div class="clear font14 nengliang">
								<div class="float_left ">能量</div>
								<div class="float_right huiFont">目标{{targetenergy}}</div>
							</div>
							<div class="zonghe">
								<ul>
									<li>
										<img src="@/assets/images/danbaizhi@2x.png" alt="" width="82" height="82" />
										<p class="font12 huiFont">目标{{protein}}</p>
										<p class="font14">蛋白质</p>
									</li>
									<li>
										<img src="@/assets/images/zhifang@2x.png" alt="" width="82" height="82" />
										<p class="font12 huiFont">目标{{fat}}</p>
										<p class="font14">脂肪</p>
									</li>
									<li>
										<img src="@/assets/images/tanshuihuahewu@2x.png" alt="" width="82" height="82" />
										<p class="font12 huiFont">目标{{carbohydrate}}</p>
										<p class="font14">碳水化合物</p>
									</li>
								</ul>
							</div>
						</div>
						<!-- 早餐 -->
						<div class="title">
							<div class="wrap borderBottom">
								<img src="@/assets/images/zaocan@2x.png" width="20" class="icon" />
								<span class="font16">早餐</span>
								<span class="float_right huiFont9">{{breakfast_time}}</span>
							</div>
						</div>
						<mt-cell v-for="(item,index) in breakfast" :key="`yy_${index}`" is-link @click.native="getdetd(item.breakfast_foodName)">
							<img slot="icon" :src="item.breakfast_foodImg" width="46" height="46">
							<div slot="title" class="titleWrap">
								<span class="mint-cell-text">{{item.breakfast_foodName}}</span>
								<span class="mint-cell-label font12 huiFont99">建议食用量：{{item.breakfast_foodQuantity}}</span>
							</div>
							<div class="font14 huiFont99">
								{{item.breakfast_foodEnergy}}
							</div>
						</mt-cell>
						<!-- 早餐加餐 -->
						<!-- <div class="title">
							<div class="wrap borderBottom borderTop">
								<img src="@/assets/images/jiacan@2x.png" width="20" class="icon" />
								<span class="font16">早加餐</span>
								<span class="float_right huiFont9">{{breakfastplus_time}}</span>
							</div>
						</div>
						<div>
							<mt-cell v-for="(item,index) in breakfastplusdata" :key="index" is-link>
								<img slot="icon" :src="item.breakfast_foodImg" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.breakfast_foodName}}</span>
									<span class="mint-cell-label font12 huiFont99">{{item.breakfast_foodQuantity}}</span>
								</div>
								<div class="font14 huiFont99">
									{{item.breakfast_foodEnergy}}
								</div>
							</mt-cell>
						</div> -->
						<!-- <div class="completeState clear">
							<div class="float_left">
								完成情况
							</div>
							<div class="float_right ">
								<mt-progress :value="60" :bar-height="7"> </mt-progress>
								<div class="font12 huiFont99">
									推荐摄入330大卡，实际摄入276大卡 ,完成度：<span class="red">80%</span> ，完成情况良好
								</div>
							</div>
						</div> -->
						<!-- 午餐 -->
						<div class="title">
							<div class="wrap borderBottom borderTop">
								<img src="@/assets/images/wucan@2x.png" width="20" class="icon" />
								<span class="font16">午餐</span>
								<span class="float_right huiFont9">{{lunch_time}}</span>
							</div>
						</div>
						<mt-cell v-for="(item,index) in lunch" :key="`wc_${index}`" is-link @click.native="getdetd(item.lunch_foodName)">
							<img slot="icon" :src="item.lunch_foodImg" width="46" height="46">
							<div slot="title" class="titleWrap">
								<span class="mint-cell-text">{{item.lunch_foodName}}</span>
								<span class="mint-cell-label font12 huiFont99">建议食用量：{{item.lunch_foodQuantity}}</span>
							</div>
							<div class="font14 huiFont99">
								{{item.lunch_foodEnergy}}
							</div>
						</mt-cell>
						<!-- 午加餐 -->
						<!-- <div class="title">
							<div class="wrap borderBottom borderTop">
								<img src="@/assets/images/jiacan@2x.png" width="20" class="icon" />
								<span class="font16">午加餐</span>
								<span class="float_right huiFont9">{{lunchplus_time}}</span>
							</div>
						</div>
						<mt-cell v-for="(item,index) in lunchplusdata" :key="index" is-link>
							<img slot="icon" :src="item.lunch_foodImg" width="46" height="46">
							<div slot="title" class="titleWrap">
								<span class="mint-cell-text">{{item.lunch_foodName}}</span>
								<span class="mint-cell-label font12 huiFont99">{{item.lunch_foodQuantity}}</span>
							</div>
							<div class="font14 huiFont99">
								{{item.lunch_foodEnergy}}
							</div>
						</mt-cell> -->
						<!-- 晚餐 -->
						<div class="title">
							<div class="wrap borderBottom borderTop">
								<img src="@/assets/images/wancan@2x.png" width="20" class="icon" />
								<span class="font16">晚餐</span>
								<span class="float_right huiFont9">{{dinner_time}}</span>
							</div>
						</div>
						<mt-cell v-for="(item,index) in dinner" :key="`dinner_${index}`" is-link @click.native="getdetd(item.dinner_foodName)">
							<img slot="icon" :src="item.dinner_foodImg" width="46" height="46">
							<div slot="title" class="titleWrap">
								<span class="mint-cell-text">{{item.dinner_foodName}}</span>
								<span class="mint-cell-label font12 huiFont99">建议食用量：{{item.dinner_foodQuantity}}</span>
							</div>
							<div class="font14 huiFont99">
								{{item.dinner_foodEnergy}}
							</div>
						</mt-cell>
						<!--加餐-->
						<div class="title">
							<div class="wrap borderBottom borderTop">
								<img src="@/assets/images/jiacan@2x.png" width="20" class="icon" />
								<span class="font16">加餐</span>
								<span class="float_right huiFont9">{{mealaddition_time}}</span>
							</div>
						</div>
						<div class="borderBottom">
							<mt-cell v-for="(item,index) in mealaddition" :key="`jc_${index}`" is-link @click.native="getdetd(item.mealaddition_foodName)">
								<img slot="icon" :src="item.mealaddition_foodImg" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.mealaddition_foodName}}</span>
									<span class="mint-cell-label font12 huiFont99">{{item.mealaddition_foodQuantity}}</span>
								</div>
								<div class="font14 huiFont99">
									{{item.mealaddition_foodEnergy}}
								</div>
							</mt-cell>
						</div>
						<router-link to="/gauge_diet?resetstatus=1" class="buttons">
							<mt-button type="danger" class="add_btns" size="large">调整处方</mt-button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="diet_alety" v-if="aleta">
			<div class="diet_aletw">
				<div class="diet_aletc">
					<p>食物名称:{{aletData.foodname}}</p>
					<p>食物重量:{{aletData.foodgram}}{{aletData.gramunit}}</p>
					<p>能量:{{aletData.foodkcal}}{{aletData.kcalunit}}</p>
					<p>蛋白质:{{aletData.protein}}</p>
					<p>脂肪:{{aletData.fat}}</p>
					<p>碳水化合物:{{aletData.carbohydrate}}</p>
					<!-- <img :src="aletData.foodimg" /> -->
				</div>
				<div class="diet_aleto" @click="ok_alert">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
        name: "diet",
        data:()=>({
        	ABflag: 1,
 			navbarList:[{name:"今日饮食",type:1},{name:"饮食处方",type:2}],
			//今日饮食
			todybreakfast:[],
			todylunch:[],
			todydinner:[],
			todymealaddition:[],
			breakfasttime:'',  //早餐时间
			lunchtime:'',  //午餐时间
			dinnertime:'',  //晚餐时间
			mealadditiontime:'',  //加餐时间
			
			//热量分析
			dietdata:[],  
			totalintake:'',
			totalrecommend:'',
			//三大营养素分析
			yingyangList: [],
			// intakefat:'',  //摄入脂肪
			// recommendfat:'',  //推荐脂肪
			// intakecarbohydrate:'',  //摄入碳水化合物
			// recommendcarbohydrate:'',  //推荐碳水化合物
			// intakeprotein:'',  //摄入蛋白质
			// recommendprotein:'',  //推荐蛋白质
			// nutrientlist:[],  //营养摄入素分析
			// motionlist:[],  //运动分析
			
			// 饮食方案
			datriq:'',
			targetenergy:'',  //目标能量
			protein:'',  //蛋白质
			fat:'',  //脂肪
			carbohydrate:'',  //碳水化合物
			breakfast:[],  //早餐
			lunch:[],  //午餐
			dinner:[],  //晚餐
			breakfast:[],  //加餐
			breakfastplusdata:[],//早餐加餐
			lunchplusdata:[],//午餐加餐
			breakfast_time:'',  //早餐时间
			breakfastplus_time:'',  //早加餐时间
			lunch_time:'',  //午餐时间
			lunchplus_time:'',  //午加餐时间
			dinner_time:'',  //晚餐时间
			mealaddition_time:'',  //加餐时间
			mealaddition: [],
			todynews:[],  //今日提醒
			dataflag:0,
			energyBalance:'',
			actualIntake:'',
			
			aleta:false,
			aletData:{}
        }),
        methods:{
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
			hrefgg(item){
				if(item.iscomp=="1"){
					this.$router.push("/uploadss?skey="+item.skey+"&mealtype="+item.mealname);
				}else{
					this.$router.push("/uploadPhoto?skey="+item.skey+"&mealtype="+item.mealname);
				}
			},
			// 今日提醒
			remindToday() {
				let url = "UserInterface/PatientHomePageRemindToday.ashx";
				let param={
					functiontype:1,
					pagesize:20,
					pagecount:1
				};
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.todynews=data.remindtoday;
				})
			},
        	toggleType(item){
        		this.ABflag = item.type;
        	},
			// 今日饮食
			todayDiet(){
				let url = "UserInterface/SelectTodayDiet.ashx";
				this.$post(url).then((data)=>{
					if(data.rspcode != 1 ){
					   return;
					}
					this.todybreakfast=data.breakfastdata;
					this.todylunch=data.lunchdata;
					this.todydinner=data.dinnerdata;
					this.todymealaddition=data.mealadditiondata;
					if(data.breakfastdata.breakfastdatalist.lenth > 0){
						this.breakfasttime=data.breakfastdata.breakfastdatalist[0].breakfast_time;
					}
					if(data.lunchdata.lunchdatalist.lenth > 0){
						this.lunchtime=data.lunchdata.lunchdatalist[0].lunch_time;
					}
					if(data.dinnerdata.dinnerdatalist.lenth > 0){
						this.dinnertime=data.dinnerdata.dinnerdatalist[0].dinner_time;
					}
					if(data.mealadditiondata.mealadditiondatalist.lenth > 0){
						this.mealadditiontime=data.mealadditiondata.mealadditiondatalist[0].mealaddition_time;
					}
			   })
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
								value: 0,
								name: '早餐'
							},
							{
								value: 0,
								name: '午餐'
							},
							{
								value: 0,
								name: '晚餐'
							},
							{
								value: 0,
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
					if(dietlist.length > 0){
						myChart.setOption(option);
					}
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
						data: [
							{
								value: 0,
								name: '脂肪'
							},
							{
								value: 0,
								name: '蛋白质'
							},
							{
								value: 0,
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
					let list = [
							{
								value: data.intakefat,  // 实际摄入量
								recommend: data.recommendfat,  // 推荐摄入量
								name: '脂肪'
							},
							{
								value: data.intakecarbohydrate,
								recommend: data.recommendcarbohydrate,
								name: '碳水'
							},
							{
								value: data.intakeprotein,
								recommend: data.recommendprotein,
								name: '蛋白质'
							}
					]
					option.series[0].data = list
					this.yingyangList = list
					myChart.setOption(option);
				})
			},
			// 饮食方案
			eachRecord(){
				let url = "UserInterface/SelectTodayDietPlan.ashx";
				this.$post(url).then((data)=>{
					if(data.rspcode != 1 ){
					   return;
					}
					this.dataflag=data.dataflag;
					this.targetenergy=data.targetenergy;
					this.protein=data.protein;
					this.fat=data.fat;
					this.carbohydrate=data.carbohydrate;
					this.breakfast=data.breakfastdata;
					this.breakfastplusdata=data.breakfastplusdata;
					this.lunch=data.lunchdata;
					this.lunchplusdata=data.lunchplusdata;
					this.dinner=data.dinnerdata;
					this.actualIntake=data.actualIntake;
					this.energyBalance=data.energyBalance;
					this.mealaddition=data.mealadditiondata;
					
					if(data.breakfastdata && data.breakfastdata.length != 0){
						this.breakfast_time=data.breakfastdata[0].breakfast_time;
					}
					if(data.breakfastplusdata && data.breakfastplusdata.length != 0){
						this.breakfastplus_time=data.breakfastplusdata[0].breakfast_time;
					}
					if(data.lunchdata && data.lunchdata.length != 0){
						this.lunch_time=data.lunchdata[0].lunch_time;
					}
					if(data.lunchplusdata && data.lunchplusdata.length != 0){
						this.lunchplus_time=data.lunchplusdata[0].lunch_time;
					}
					if(data.dinnerdata && data.dinnerdata.length != 0){
						this.dinner_time=data.dinnerdata[0].dinner_time;
					}
					if(data.mealadditiondata && data.mealadditiondata.length != 0){
						this.mealaddition_time=data.mealadditiondata[0].mealaddition_time;
					}
					
			   })
			},
			getdetd(skeys){
				this.aleta=true;
				let url = "UserInterface/goods/FoodDataDetail.ashx";
				let param={
					food_name:skeys
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
					   return;
					}
					this.aletData=data;
				})
			},
			ok_alert(){
				this.aleta=false;
			}
        },
		mounted(){
			this.getnewdate();
			this.remindToday();
			this.todayDiet();
			this.eachRecord();
			this.pie();
			this.pie2();
			if(this.$route.query.ABflag == 2){
				this.ABflag = 2;
			}
		}
    }
</script>

<style scoped lang="scss">
	.neirong {
		margin-top: 0.11rem;
	}

	.home-cell {
		&>.name {
			line-height: 0.44rem;
			padding: 0 0.12rem;
			background: #FFFFFF;
		}

		.more {
			float: right;
			color: #958F8F;
			font-size: 0.12rem;
		}
	}

	/*今日提醒*/
	.remindList {
		&>li {
			padding: 0.13rem 0.12rem;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
		}

		&>li .left {
			.rowTop .icon {
				width: 0.14rem;
				vertical-align: middle;
				/*margin-right: 5px;*/
			}
		}

		&>li .right {
			text-align: right;
		}

		.rowTop {
			margin-bottom: 0.05rem;
		}

		.rowTop>* {
			vertical-align: middle;
		}
	}

	.completeState {
		padding: 0.12rem;

		.float_left {
			width: 40%;
		}

		.float_right {
			width: 60%;
		}
	}

	/* 早餐列表 */
	.yinshhi_list {
		background: #FFFFFF;

		.title {
			padding-left: 0.12rem;
			line-height: 45px;
		}

		.wrap {
			padding-right: 34px;
		}

		.wrap>* {
			vertical-align: middle;
		}

		/*.wrap>.icon{margin-right: 5px;}*/
	}

	.titleWrap {
		display: inline-block;
		vertical-align: middle;
	}

	.mint-cell {
		min-height: 66px;
	}

	.mt-progress {
		height: 7px;
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 0.10rem;
	}

	.solution {
		padding: 0.13rem 0.20rem;
		background: #FFFFFF;
	}

	.solution .pogress {
		line-height: 18px;
		border-radius: 9px;
		background: #0AC5C9;
		text-align: center;
		color: #FFFFFF;
		font-size: 11px;
	}
	.pog_inform{
		font-size: 0.13rem;
		color: #666;
		padding: 0 0 0.2rem 0;
	}
	.pog_inform h3{
		font-size: 0.15rem;
		color: #333;
		text-align: center;
		font-weight: 500;
		padding-bottom: 0.04rem;
	}
	.pog_inform p{
		text-indent: 2em;
		line-height: 0.22rem;
	}
	.nengliang {
		padding: 0.10rem 0;
	}

	.zonghe {
		margin-top: 0.15rem;
	}

	.zonghe ul {
		display: flex;
		justify-content: space-between;
		text-align: center;

		.huiFont {
			margin-top: 5px;
			margin-bottom: 5px;
		}
	}
	.noalready{
		padding-top: 0.4rem;
		img{
			width: 1.0rem;
			margin: 0 auto;
			display: block;
		}
		p{
			text-align: center;
			color: #666;
			font-size: 0.14rem;
			padding-top: 0.2rem;
		}
	}
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
	.diet_alety{
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9990000;
		background: rgba(000,000,000,0.6);
		.diet_aletw{
			width: 78%;
			padding: 0 4%;
			height: 3.8rem;
			background: #fff;
			border-radius: 8px;
			position: relative;
			top: 50%;
			margin-top: -1.9rem;
			left: 7%;
			.diet_aletc{
				height: 2.8rem;
				padding: 0.2rem 0;
				p{
					font-size: 0.14rem;
					color: #666;
					margin-top: 0.08rem;
				}
				img{
					width:100%;
					max-height: 1.0rem;
					margin-top: 0.1rem;
				}
			}
			.diet_aleto{
				height: 0.38rem;
				line-height: 0.38rem;
				font-size: 0.14rem;
				color: #F78335;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				text-align: center;
				border-top: 1px solid #ddd;
			}
		}
	}
	.yinshhi_list .title:before{
		content: none;
	}
</style>
<style type="text/css">
	.completeState .mt-progress-progress {
		background-color: #EC0000;
	}
</style>
