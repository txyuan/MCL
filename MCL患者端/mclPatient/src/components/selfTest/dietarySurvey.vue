<template>
	<div class="dietarySuvey-root" style="min-height: 100vh;background: #fff;">
		<div id="body_main" style="padding-top: 87px;background: #FFFFFF;">
			<mt-header title="简易膳食调查" fixed>
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
			<div class="dsuv_home">
				<div class="dsuv_addfood">
					<div class="dsuv_list">
						<p>早餐</p>
						<div>
							<mt-cell v-for="(item,index) in breakfastList" :key="index" @click.native="showModal(item)">
								<img slot="icon" :src="item.foodimg" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.foodname}}</span>
									<span class="mint-cell-label font12 huiFont99">实际食用：{{item.foodconsumption}}{{item.gramunit}}</span>
								</div>
								<div class="font14 huiFont99">
									<span style="margin-right: 5px;vertical-align: middle;">{{item.resultObj.foodkcal}}{{item.kcalunit}}</span>
									<img src="@/assets/images/delIcon.png" alt="" width="25" style="vertical-align: middle;" @click.stop="delDietCase('breakfastList',index)"/>
								</div>
							</mt-cell>
						</div>
						<span @click="otherfood('01')">+ 食物</span>
					</div>
					<div class="dsuv_list">
						<p>午餐</p>
						<div>
							<mt-cell v-for="(item,index) in lunchList" :key="index" @click.native="showModal(item)">
								<img slot="icon" :src="item.foodimg" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.foodname}}</span>
									<span class="mint-cell-label font12 huiFont99">实际食用：{{item.foodconsumption}}{{item.gramunit}}</span>
								</div>
								<div class="font14 huiFont99">
									<span style="margin-right: 5px;vertical-align: middle;">{{item.resultObj.foodkcal}}{{item.kcalunit}}</span>
									<img src="@/assets/images/delIcon.png" alt="" width="25" style="vertical-align: middle;" @click.stop="delDietCase('lunchList',index)"/>
								</div>
							</mt-cell>
						</div>
						<span @click="otherfood('02')">+ 食物</span>
					</div>
					<div class="dsuv_list">
						<p>晚餐</p>
						<div>
							<mt-cell v-for="(item,index) in dinnerList" :key="index" @click.native="showModal(item)">
								<img slot="icon" :src="item.foodimg" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.foodname}}</span>
									<span class="mint-cell-label font12 huiFont99">实际食用：{{item.foodconsumption}}{{item.gramunit}}</span>
								</div>
								<div class="font14 huiFont99">
									<span style="margin-right: 5px;vertical-align: middle;">{{item.resultObj.foodkcal}}{{item.kcalunit}}</span>
									<img src="@/assets/images/delIcon.png" alt="" width="25" style="vertical-align: middle;" @click.stop="delDietCase('dinnerList',index)"/>
								</div>
							</mt-cell>
						</div>
						<span @click="otherfood('03')">+ 食物</span>
					</div>
					<div class="dsuv_list">
						<p>加餐</p>
						<div>
							<mt-cell v-for="(item,index) in mealAdditionList" :key="index" @click.native="showModal(item)">
								<img slot="icon" :src="item.foodimg" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.foodname}}</span>
									<span class="mint-cell-label font12 huiFont99">实际食用：{{item.foodconsumption}}{{item.gramunit}}</span>
								</div>
								<div class="font14 huiFont99">
									<span style="margin-right: 5px;vertical-align: middle;">{{item.resultObj.foodkcal}}{{item.kcalunit}}</span>
									<img src="@/assets/images/delIcon.png" alt="" width="25" style="vertical-align: middle;" @click.stop="delDietCase('mealAdditionList',index)"/>
								</div>
							</mt-cell>
						</div>
						<span @click="otherfood('04')">+ 食物</span>
					</div>
				</div>
				<p class="dsuv_eveall">
					<label>能量分配：</label>
					<span>
						<i>总能量: {{allObj.allFoodenergy.toFixed(2)}}Kal</i>
						<i>碳水化合物:{{allObj.allCarbohydrate.toFixed(2)}}g</i>
						<i>总脂肪:{{allObj.allFat.toFixed(2)}}g</i>
						<i>蛋白质:{{Number(allObj.allProtein).toFixed(2)}}g</i>
					</span>
				</p>
			</div>
		</div>
		<div class="buttons">
		  <mt-button type="danger" class="add_btns" size="large" @click.native="save">提交保存</mt-button>
		</div>
		
		<!-- 遮罩层 -->
		<div id="mark" :style="{display: (show?'block': 'none')}">
			<div class="modal" :class="show && 'show' ">
				<div class="info">
					<div class="bar">
						<span class="yellow" @click="hideModal">取消</span>
						<!-- <span>10月20日/早餐</span> -->
						<span class="yellow" @click="confirm">确认</span>
					</div>
		
					<mt-cell class="borderBottom" style="margin-top: 15px;">
						<img slot="icon" :src="currentItem.foodimg" width="46" height="46">
						<div slot="title" class="titleWrap">
							<span class="mint-cell-text">{{currentItem.foodname}}</span>
							<span class="mint-cell-label font12 huiFont99"><span class="red">{{currentItem.foodkcal}}{{currentItem.kcalunit}}</span>/{{currentItem.foodgram}}{{currentItem.gramunit}}</span>
						</div>
					</mt-cell>
		
					<div class="showNum font13">
						<div class="left huiFont">
							<p>{{currentItem.foodkcal}} {{currentItem.kcalunit}}</p>
							<p>{{currentItem.foodgram}}{{currentItem.gramunit}}</p>
						</div>
						<div class="yellow">
							<p> <span class="num">&nbsp;{{showNum.join().replace(/,/g, "")}}&nbsp;</span><span>{{currentItem.gramunit}}</span></p>
						</div>
						<div class="right huiFont">
							<!-- <p>50克约等于</p>
							<p>1颗鸡蛋</p> -->
						</div>
					</div>
				</div>
		
				<!--<p class="yellow text-center">克</p>-->
		
				<ul class="keyboard">
					<li v-for="(item,index) in keyList" :style="{'border-right-width': (index%3==2 ? 0 : '2px')}" @click="keyCode(item,index)">{{item}}</li>
				</ul>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Bus from "@/assets/js/updateShopCar.js"; //bus
	export default {
		name: "healthy",
		data: () => ({
			datriq: '',  //日期
			
			//键盘
			keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'x'],
			showNum: [],
			show: false,
			currentItem: {},   //点击的菜对象
			
			allObj:{
				allFoodenergy: 0,  //总能量
				allProtein: 0,  //总蛋白质
				allFat: 0,   //脂肪
				allCarbohydrate : 0  //碳水化合物
			},
					
			//早餐的列表
			breakfastList: [],
			//午餐的列表
			lunchList: [],
			//晚餐的列表
			dinnerList: [],
			//加餐的列表
			mealAdditionList: [],
			
			//保存接口的参数
			param:{
				DeviceList:{data: []}
			},
			nutritionskey:''
			
		}),
		methods:{
			getday(){
				var dates=new Date;
				var years=dates.getFullYear();
				var months=dates.getMonth()+1;
				if(months<10){
					months='0'+months;
				}
				var datet=dates.getDate();
				if(datet<10){
					datet='0'+datet;
				}
				var aopy=years+'-'+months+'-'+datet;
				this.datriq=aopy;
			},
			//饮食补录-查询补录饮食方案
//			todayDiet() {
//				let url = "UserInterface/DietPlanInfo.ashx";
//				let param = {
//					distinguish: this.param.mealtype
//				};
//				return this.$post(url, param).then((data) => {
//					if (data.rspcode != 1) {
//						return data;
//					}
//					//把页面菜单数据更新到bus对象 
//					const {mealtype} = this.$route.query;
//					modelList.forEach((item, index)=>{
//						item.mealtype = mealtype
//					})
//					Bus.$data.breakfastList = data.data;
//					this.breakfastList = Bus.$data.breakfastList;
//					return data;
//				})
//			},
			//饮食方案 删除
			delDietCase(obj,index){
				this[obj].splice(index, 1)
				//获取早中晚加的数据
				this.getFoodData()
			},
			// 其他菜式页面
			otherfood(type) {
				this.$router.push(`/otherfood?mealtype=${type}`)
			},
			
			
			//显示和隐藏键盘
			showModal(item) {
				this.currentItem = item;
				this.showNum = [];
				this.show = true
			},
			hideModal() {
				this.show = false
			},
			//键盘的输入事件
			keyCode(item, index) {
				if (item == "x") {
					this.showNum.pop()
				} else {
					if(this.showNum.length<6){
						this.showNum.push(item)
					}
				}
			},
			//键盘的确定按钮
			confirm(){
				if(this.showNum.length == 0){
					this.$Toast("请输入菜品克数")
					return
				}
				const showNum = Number(this.showNum.join().replace(/,/g, ""));
				//单位克   
				const {foodgram, foodkcal, protein, fat, carbohydrate} = this.currentItem;  
				//总千卡
				const foodkcal2 = Number((showNum/foodgram)*foodkcal).toFixed(2);
				//总蛋白质
				const protein2 = Number((showNum/foodgram)*protein).toFixed(1);
				//脂肪
				const fat2 = Number((showNum/foodgram)*fat).toFixed(2);
				//碳水化合物
				const carbohydrate2 = Number((showNum/foodgram)*carbohydrate).toFixed(2);
				//resultObj 保存计算过的结果
				this.currentItem.resultObj = {foodkcal:foodkcal2, protein:protein2, fat:fat2, carbohydrate:carbohydrate2}
 				//总克数
				this.currentItem.foodconsumption = showNum;

				this.hideModal();
				//获取早中晚加的数据
				this.getFoodData()
			},
			
			//获取早中晚加的数据
			getFoodData(){
				//早餐的列表  午餐的列表    晚餐的列表  加餐的列表
				let list = [...this.breakfastList, ...this.lunchList, ...this.dinnerList, ...this.mealAdditionList];
				let foodList = [], allFoodenergy = 0, allProtein = 0, allFat = 0, allCarbohydrate = 0;
				list.forEach((item,index)=>{
					const resultObj = item.resultObj;
					allFoodenergy+= Number(resultObj.foodkcal); //总能量
					allProtein+= Number(resultObj.protein); //总蛋白质  
					allFat+= Number(resultObj.fat);  //脂肪
					allCarbohydrate+= Number(resultObj.carbohydrate);  //碳水化合物
					foodList.push({mealtype: item.mealtype,foodname: item.foodname,foodenergy: resultObj.foodkcal,foodweight: item.foodgram});
				})
				allProtein=allProtein.toFixed(1);
				this.allObj = {
					allFoodenergy,
					allProtein,
					allFat,
					allCarbohydrate
				}
				this.param.DeviceList = JSON.stringify({data: foodList});
			},
			//保存
			save() {
				//获取早中晚加的数据
				this.getFoodData()
				let url = "UserInterface/InsertDietarySurvey.ashx";
				this.$post(url, this.param).then((data) => {
					this.$Toast(data.rspdesc)
					if (data.rspcode != 1) {
						return;
					}
					this.getMsgInfo();
				})
			},
			// 基本信息
			getMsgInfo() {
				let url = "UserInterface/PatientHomePageEssentialInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					if(this.nutritionskey==undefined){
						this.$router.push("/wx_Entrance/selfTest");
					}else{
						if (data.IsMember==1) {
							this.$router.push(`/nuteye?id=${this.nutritionskey}`);
						} else {
							this.$router.push(`/watch_repot?orderKey=${this.nutritionskey}`);
						}
					}
				})
			},
		},
		created(){
			if(!localStorage.userInfo){
				this.$router.push({
					path:"/login",
					query:{redirect: this.$router.currentRoute.fullPath}//从哪个页面跳转
				});
			}
		},
		mounted(){
			const id = this.$route.query.id;
			this.nutritionskey = id;
			this.getday();
			//早餐
			const breakfastList = Bus.$data.breakfastList || [];
			this.breakfastList = breakfastList
			//午餐
			const lunchList = Bus.$data.lunchList || [];
			this.lunchList = lunchList
			//晚餐
			const dinnerList = Bus.$data.dinnerList || [];
			this.dinnerList = dinnerList
			//加餐
			const mealAdditionList = Bus.$data.mealAdditionList || [];
			this.mealAdditionList = mealAdditionList
			//获取早中晚加的数据
			this.getFoodData()
		},
//		beforeRouteEnter(to, from, next) {
//			// 导航进入该组件的对应路由时调用
//			// 不是来自搜索菜单的页面，要调用菜单接口
//			next(vm => {
//			    // 通过 `vm` 访问组件实例
//			    if(from.name != "otherfood"){
//					//饮食补录-查询补录饮食方案
//					vm.todayDiet();
//				}
//			 })
//		},
		beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 不是去搜索菜单的页面，要置空菜单列表
			if(to.name != "otherfood"){
				Bus.$data.breakfastList = []
				Bus.$data.lunchList = []
				Bus.$data.dinnerList = []
				Bus.$data.mealAdditionList = []
			}
			next()
		},
	}
</script>

<style scoped lang="scss">
	.dsuv_eveall{
		width: 92%;
		margin: 0 auto;
		overflow: hidden;
		height: 1.1rem;
		font-size: 0.14rem;
		margin-top: 0.16rem;
		label{
			float: left;
			display: block;
			font-weight: 600;
			color: #333;
		}
		span{
			width: 75%;
			display: block;
			float: left;
			color: #666;
			i{
				font-style: normal;
				display: block;
				margin-top: 0.02rem;
				margin-left: 0.12rem;
			}
		}
	}
	.dsuv_addfood{
		width: 94%;
		margin: 0 auto;
		margin-top: 0.1rem;
		.dsuv_list{
			border-bottom: 1px solid #ddd;
			p{
				height: 0.4rem;
				line-height: 0.4rem;
				color: #049FCF;
				font-size: 0.16rem;
			}
			&>span{
				display: block;
				height: 0.4rem;
				line-height: 0.4rem;
				font-size: 0.15rem;
			}
		}
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
	
	
	/* 早餐列表 */
	.titleWrap {
		display: inline-block;
		vertical-align: middle;
	}
	
	/* 弹出层 */
	#mark {
		z-index: 9999;
	}

	.modal.show {
		transform: translateY(0);
	}

	.modal {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		transition: transform ease 0.6s;
		transform: translateY(1000px);

		.info {
			padding: 0px 10px;
		}

		.bar {
			padding: 7px 10px;
			display: flex;
			justify-content: space-between;
			align-items: baseline;
		}

		.showNum {
			display: flex;
			justify-content: space-between;
			margin: 45px 0;
		}

		.num {
			font-size: 0.30rem;
			display: inline-block;
			padding: 0 0.05rem;
			min-width: 0.25rem;
			height: 0.40rem;
			box-sizing: border-box;
			text-align: center;
			border-bottom: 2px solid #F78335;
		}
	}

	.keyboard {
		font-size: 0;
	}

	.keyboard li {
		width: 33.333%;
		display: inline-block;
		font-size: 0.18rem;
		font-weight: bold;
		text-align: center;
		line-height: 0.40rem;
		box-sizing: border-box;
		border-right: 2px solid #eee;
		border-top: 2px solid #eee;
	}

	.propic {
		width: 100%;
		border-bottom: 1px solid #eee;
	}
</style>
<style type="text/css">
	.dsuv_list .mint-cell-wrapper{
		padding: 0;
	}
	.dsuv_list .mint-cell {
		min-height: 66px;
	}
</style>
<style lang="scss">
	.dietarySuvey-root {
		.mint-popup-bottom {
			width: 100%;
		}

		.picker_bar {
			display: flex;
			justify-content: space-between;
			text-align: center;
			line-height: 40px;
			padding: 0 20px;
			border-bottom: solid 1px #eaeaea;

			.confrim {
				color: #26a2ff;
			}
		}
	}
</style>
