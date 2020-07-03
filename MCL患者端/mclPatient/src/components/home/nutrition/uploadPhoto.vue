<template>
	<div class="uploadPhoto-root">
		<div id="body_main">
			<mt-header title="营养" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
			
			<div class="yinshhi_list">
				<div class="title margin10 marginTop10">
					<div class="wrap">
						<span class="font16">营养时间</span>
						<span class="float_right huiFont9">{{mealtypeText}}</span>
					</div>
				</div>
			</div>
				
			<!-- 饮食方案 -->
			<div class="marginTop10 yinshhi_list" style="background: #fff;">
				<div class="title">
					<div class="wrap borderBottom">
						<span class="font16">营养方案</span>
						<span class="float_right huiFont9">食用量</span>
						<img src="@/assets/images/fabu@2x.png" alt="" class="add" width="23" @click="goOtherDishes()" />
					</div>
				</div>
				<!-- 默认接口返回的数据 -->
				<mt-cell v-for="(item,index) in dietPlanInfo" :key="index">  <!-- @click.native="showModal(item)" -->
					<img slot="icon" src="@/assets/images/午餐@2x.png" width="46" height="46">
					<div slot="title" class="titleWrap">
						<span class="mint-cell-text">{{item.nutritionname}}</span>
						<!-- <span class="mint-cell-label font12 huiFont99">建议食用量：{{item.foodconsumption}}{{item.gramunit}}</span> -->
					</div>
					<div class="font14 huiFont99">
						<span style="margin-right: 5px;vertical-align: middle;">{{item.nutritionunit}}</span>
						<img src="@/assets/images/delIcon.png" alt="" width="25" style="vertical-align: middle;" @click.stop="delDietCase(index)"/>
					</div>
				</mt-cell>
				
			</div>

			<!-- 其他菜式 -->
			<!-- 上传图片区域 -->
			<!-- <div class="marginTop10 yinshhi_list">
				<div class="propic">
					<div class="title">
						<div class="wrap">
							<span class="font16">拍照上传</span>
						</div>
					</div>
					<div class="uploadArea">
						<div class="photoList" v-for="(item,index) in photoList" v-if="item.show">
							<img :src="item.src" width="100" height="100"/>
							<div class="mask"><span class="close" @click="delPhoto(index)">X</span> </div>
						</div>
						<img src="@/assets/images/tianjia备份@2x.png" width="100" height="100" @click="addPhoto" class="add" v-show="photoAdd"/>
						<input type="file" style="display: none;" accept="image/*" @change="iosUpload($event)" ref="file"/>
					</div>
				</div>
			</div> -->

			<div class="fix_bottom fix_bottom_area">
				<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save">保存</mt-button>
			</div>
		</div>

		<!-- 用餐食间picker  -->
		<!-- <mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfo">确定</div>
				</div>
			</mt-picker>
		</mt-popup> -->
		
		<!-- 遮罩层 -->
		<!-- <div id="mark" :style="{display: (show?'block': 'none')}">
			<div class="modal" :class="show && 'show' ">
				<div class="info">
					<div class="bar">
						<span class="yellow" @click="hideModal">取消</span>
						<span class="yellow" @click="confirm">确认</span>
					</div>
		
					<mt-cell class="borderBottom" style="margin-top: 15px;">
						<img slot="icon" src="@/assets/images/午餐@2x.png" width="46" height="46">
						<div slot="title" class="titleWrap">
							<span class="mint-cell-text">{{currentItem.nutritionname}}</span>
						</div>
						<div class="font14 huiFont99">
							<span style="margin-right: 5px;vertical-align: middle;">{{currentItem.nutritionunit}}</span>
						</div>
					</mt-cell>
		
					<div class="showNum font13">
						<div class="left huiFont">
							<p>53千卡</p>
							<p>350克</p>
						</div>
						<div class="yellow">
							<p> <span class="num">&nbsp;{{showNum.join().replace(/,/g, "")}}&nbsp;</span><span></span></p>
						</div>
						<div class="right huiFont">
							<p>50克约等于</p>
							<p>1颗鸡蛋</p>
						</div>
					</div>
				</div>		
				<ul class="keyboard">
					<li v-for="(item,index) in keyList" :style="{'border-right-width': (index%3==2 ? 0 : '2px')}" @click="keyCode(item,index)">{{item}}</li>
				</ul>
			</div>
		</div> -->
		
	</div>
</template>

<script>
	import Bus from "@/assets/js/updateShopCar.js"; //bus
	import pic from "@/assets/images/syyx.png"; //
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	import axios from 'axios'
	export default {
		name: "uploadPhoto",
		data: () => ({
			mealtypeText: "早餐前半小时",
			//键盘
			keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'x'],
			showNum: [],
			show: false,
			currentItem: {},   //点击的菜对象
			
			//方案的列表
			dietPlanInfo: [],
			dishesList:[],
			
			//保存的接口参数
			param: {
				seatskey:'',  //提醒key
				mealtype: '01',  //01:早餐前半小时，02:早餐后，03:早加餐，04:午餐后，05:午加餐，06:晚餐前半小时，07:晚餐后，08:晚加餐
				foodinfo: "",     //食物信息
				// img1:"",
				// img2:"",
				// img3:"",
				// img4:"",
			},
			
			//图片list
			photoList:[
				{key:"img1", src:"", show: false},
				{key:"img2", src:"", show: false},
				{key:"img3", src:"", show: false},
				{key:"img4", src:"", show: false},
			],
			//图片加号
			photoAdd: true, 
			
		}),
		methods: {
			
			//饮食补录-查询补录饮食方案
			todayDiet() {
				let url = "UserInterface/NutritionPlanInfo.ashx";
				let param = {
					distinguish: this.param.mealtype
				};
				return this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						return data;
					}
					//把页面菜单数据更新到bus对象 
					Bus.$data.dishesList = data.data;
					this.dietPlanInfo = Bus.$data.dishesList;
					return data;
				})
			},
			//饮食方案 删除
			delDietCase(index){
				this.dietPlanInfo.splice(index, 1)
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
					this.$Toast("请输入用量")
					return
				}
				const showNum = Number(this.showNum.join().replace(/,/g, ""));
				// //是否已经计算初始(化千卡和克)比列
				// if(!this.currentItem.isComputed){
				// 	const {foodkcal, foodconsumption} = this.currentItem;  //千卡  克
				// 	this.currentItem.ratio = (Number(foodkcal)/Number(foodconsumption));  //比率
				// 	this.currentItem.isComputed = true;
				// }
				// let allkcal = this.currentItem.ratio*showNum;   //总千卡
				// this.currentItem.foodkcal = allkcal;  //总千卡 
				this.currentItem.nutritionunit = showNum;  //总克数
				this.hideModal();
			},
			
			//上传图片
			//增加图片按钮
			// addPhoto(){
			// 	if (this.$root.isWeiXin() || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			// 		//微信 和  Ios 
			// 	    return this.$refs.file.click()
			// 	} else if (/(Android)/i.test(navigator.userAgent)) {
			// 	   //Android终端	
			// 	   window.back.clickOnAndroidSelectPhoto();
			// 	}
			// },
			// //ios端 上传文件
			// iosUpload(e){
			// 	let file = e.target.files[0];
			// 	let url = URL.createObjectURL(file);
			// 	let config = {
			// 	  headers:{'Content-Type':'multipart/form-data'}
			// 	};  //添加请求头
			// 	let params = new FormData(); //创建form对象
			// 	params.append('uploadedFile',file);//通过append向form对象添加数据
			// 	axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
			// 		if (response.data.rspcode != 1) {
			// 		  return;
			// 		}
			// 		let responseUrl = response.data.url;
					
					
			// 		//设置图片地址
			// 		for(let i=0; i<this.photoList.length; i++){
			// 			const item = this.photoList[i]
			// 			if(item.src == ""){
			// 				item.src = responseUrl;
			// 				item.show = true;
			// 				break;
			// 			}
			// 		}
			// 		//是否显示增加图片按钮
			// 		let len = 0;
			// 		for(let i=0; i<this.photoList.length; i++){
			// 			const item = this.photoList[i]
			// 			if(item.src != ""){
			// 				len+=1
			// 			}
			// 		}
			// 		if(len == this.photoList.length){
			// 			this.photoAdd = false;
			// 		}
			// 	})
			// },
			// //android端 上传文件（被app主动调起的回调函数）
			// androidUpload(stream){
			// 	let url = "UserInterface/UploadPhotos.ashx";
			// 	this.$post(url,{BinaryStream: stream}).then((data) => {
			// 	  if(data.rspcode==0){
			// 		return;
			// 	  }
			// 	  let responseUrl = responseUrl;
				  
				  
			// 	  //设置图片地址
			// 	  for(let i=0; i<this.photoList.length; i++){
			// 	  	const item = this.photoList[i]
			// 	  	if(item.src == ""){
			// 	  		item.src = responseUrl;
			// 	  		item.show = true;
			// 	  		break;
			// 	  	}
			// 	  }
			// 	  //是否显示增加图片按钮
			// 	  let len = 0;
			// 	  for(let i=0; i<this.photoList.length; i++){
			// 	  	const item = this.photoList[i]
			// 	  	if(item.src != ""){
			// 	  		len+=1
			// 	  	}
			// 	  }
			// 	  if(len == this.photoList.length){
			// 	  	this.photoAdd = false;
			// 	  }
			// 	})
			// },
			// // 删除图片
			// delPhoto(index){
			// 	//删除图片数据
			// 	this.photoList[index].show = false;
			// 	this.photoList[index].src = "";
			// 	//显示图片新增按钮
			// 	this.photoAdd = true;
			// },
			
			//保存
			save() {
				let url = "UserInterface/NutritionUdate.ashx";
				let foodinfoArr = []; 
				this.dietPlanInfo.forEach((item)=>{
					const {nutritionname, nutritionunit} = item;
					foodinfoArr.push(`${nutritionname},${nutritionunit}`)		
				})
				
				//设置图片地址
				// const param = this.param;
				// for(let i=0; i<this.photoList.length; i++){
				// 	const item = this.photoList[i];
				// 	param[item.key] = item.src;
				// }
				//设置饮食方案格式
				this.param.foodinfo = foodinfoArr.join(";")
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.$router.push("/nutrition")
				})
				
			},
			
			
			// 其他菜式页面
			goOtherDishes() {
				this.$router.push(`/uploadPhoto_addCase?mealtype=${this.param.mealtype}`)
			}
		},
		mounted() {
			//饮食时间
			const {mealtype} = this.$route.query;
			if(mealtype){
				let mealtypeText = "";
				switch(mealtype){
					case "01":
					mealtypeText = "早餐前半小时";
					    break;
					case "02":
					mealtypeText = "早餐后";	
					    break;
					case "03":
					mealtypeText = "早加餐";	
					    break;
					case "04":
					mealtypeText = "午餐后";
						break;
					case "05":
					mealtypeText = "午加餐";
						break;
					case "06":
					mealtypeText = "晚餐前半小时";
						break;
					case "07":
					mealtypeText = "晚餐后";
						break;
					case "08":
					mealtypeText = "晚加餐";
					    break;				
				}
				this.mealtypeText = mealtypeText;
				this.param.mealtype = mealtype;
				//把bus对象的菜单数据更新到页面
				this.dietPlanInfo = Bus.$data.dishesList;
			}
		},
		components: {
			loadMore
		},
		created() {
			this.param.mealtype = this.$route.query.mealtype;
			this.param.seatskey = this.$route.query.skey;
		},
		beforeRouteEnter(to, from, next) {
			// 导航进入该组件的对应路由时调用
			// 不是来自搜索菜单的页面，要调用菜单接口
			next(vm => {
			    // 通过 `vm` 访问组件实例
			    if(from.name != "uploadPhoto_addCase"){
					//饮食补录-查询补录饮食方案
					vm.todayDiet();
				}
			 })
		},
		beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 不是去搜索菜单的页面，要置空菜单列表
			if(to.name != "uploadPhoto_addCase"){
				Bus.$data.dishesList = []
			}
			next()
		},
	}
</script>

<style scoped lang="scss">
	/* 早餐列表 */
	.yinshhi_list {
		background: #FFFFFF;

		.title {
			padding-left: 0.12rem;
			line-height: 45px;
		}

		.wrap {
			padding-right: 15px;
		}

		.wrap>* {
			vertical-align: middle;
		}

		.wrap>.icon {
			margin-right: 5px;
		}
	}

	.titleWrap {
		display: inline-block;
		vertical-align: middle;
	}

	.yinshhi_list .mint-cell {
		min-height: 66px;
	}

	/* 搜索输入框 */
	.search {
		background: #F0F1F3;
		border-radius: 0.15rem;
		height: 0.30rem;
		overflow: hidden;
		margin: 0.12rem;
		margin-top: 0;
		padding: 0 0.2rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.icon,
		input {
			vertical-align: middle;
		}

		input {
			flex: 1;
			height: 0.30rem;
			line-height: 0.30rem;
			font-size: 0.12rem;
			margin-left: 0.05rem;
		}
	}

	/* 滚动区域 */
	.scroll {
		overflow: hidden;
	}

	/*上传图片区域*/
	.uploadArea {
		padding: 0.12rem;
		padding-top: 0;

		.photoList,
		.add {
			width: 100px;
			height: 100px;
			display: inline-block;
			margin-right: 10px;
			margin-bottom: 10px;
			vertical-align: top;
			position: relative;
		}

		.mask {
			position: absolute;
			width: 100%;
			top: 0;
			bottom: 0;
			background: rgba(0, 0, 0, .2);

			.close {
				position: absolute;
				right: 5px;
				top: 5px;
				color: #FFFFFF;
				font-size: 16px;
			}
		}
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
<style lang="scss">
	.uploadPhoto-root {
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
