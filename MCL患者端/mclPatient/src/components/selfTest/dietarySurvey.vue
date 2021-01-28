<template>
	<div class="dietarySuvey-root" style="min-height: 100vh;background: #FFFFFF;">
		<div id="body_main" style="padding-top: 48px;background: #FFFFFF;">
			<mt-header title="简易膳食调查" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
      <div class="dsuv_br"></div>
			<div class=" time-pick">
				<div class="time-inner">
					<div class="time-show"><input type="date" v-model="datriq" class="article-time"/></div>
				</div>
			</div>
			<div class="dsuv_home">

        <div class="dsuv_eveall">
          <label>能量分配</label>
          <div class="d-flex dsuvFlexnr">
            <div class="flex-fill">
            <strong>{{allObj.allFoodenergy.toFixed(0)}}</strong>
						<span>总能量(Kcal)</span></div>
            <div class="flex-fill">
              <strong>{{allObj.allCarbohydrate.toFixed(0)}}</strong>
						<span>碳水化合物(g)</span>
            </div>
            <div class="flex-fill">
              <strong>{{allObj.allFat.toFixed(0)}}</strong>
						<span>总脂肪(g)</span>
            </div>
            <div class="flex-fill">
              <strong>{{Number(allObj.allProtein).toFixed(0)}}</strong>
              <span>蛋白质(g)</span></div>
					</div>
        </div>
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
						<span @click="otherfood('01')">+ 早餐</span>
					</div>
					<div class="dsuv_list">
						<p>午餐</p>
						<div>
							<mt-cell v-for="(item,index) in lunchList" :key="index" @click.native="showModal(item)">
								<img slot="icon" :src="item.foodimg" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.foodname}}</span>
									<span class="mint-cell-label font12 huiFont99">实际食用：{{parseFloat(item.foodconsumption).toFixed(0)}}{{item.gramunit}}</span>
								</div>
								<div class="font14 huiFont99">
									<span style="margin-right: 5px;vertical-align: middle;">{{item.resultObj.foodkcal}}{{item.kcalunit}}</span>
									<img src="@/assets/images/delIcon.png" alt="" width="25" style="vertical-align: middle;" @click.stop="delDietCase('lunchList',index)"/>
								</div>
							</mt-cell>
						</div>
						<span @click="otherfood('02')">+ 午餐</span>
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
						<span @click="otherfood('03')">+ 晚餐</span>
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
						<span @click="otherfood('04')">+ 加餐</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 在线营养筛查页面跳转过来才需要显示 -->
		<div class="buttons" v-if="$route.query.id">
		  <mt-button type="danger" class="add_btns" size="large" @click.native="save">提交保存</mt-button>
		</div>

		<!-- 遮罩层 -->
		<div id="mark" :style="{display: (show?'block': 'none')}">
			<div class="modal" :class="show && 'show' ">
				<div class="info">
          <div class="btnClose">
            <span @click="hideModal"></span>
            <!-- <span>10月20日/早餐</span> -->
          </div>

<!--          <div class="bar">-->
<!--            <span class="yellow" @click="hideModal">取消</span>-->
<!--						&lt;!&ndash; <span>10月20日/早餐</span> &ndash;&gt;-->
<!--						<span class="yellow" @click="confirm">确认</span>-->
<!--					</div>-->

					<mt-cell style="margin-top: 15px;">
						<img slot="icon" :src="currentItem.foodimg" width="46" height="46">
						<div slot="title" class="titleWrap">
							<span class="mint-cell-text">{{currentItem.foodname}}</span>
							<span class="mint-cell-label font12 huiFont99"><span class="red">{{currentItem.foodkcal}}{{currentItem.kcalunit}}</span>/{{currentItem.foodgram}}{{currentItem.gramunit}}</span>
						</div>
					</mt-cell>

					<div class="showNum font13">
						<div class="left huiFont">
							<p style="line-height: 25px">{{currentItem.foodkcal}} {{currentItem.kcalunit}}</p>
							<p>{{currentItem.foodgram}}{{currentItem.gramunit}}</p>
						</div>
						<div class="yellow">
              <p><span class="num">{{showNum.join().replace(/,/g, "")}}&nbsp;</span><span class="num_g">{{company}}</span></p>
						</div>
            <div class="right huiFont"  style="text-align: center; color: #898989">
              <p> <img src="@/assets/images/icon-units.png" alt="" class="icon" width="22" height="22"/></p>
              <p @click="weightEstimation">重量估算</p>
						</div>
					</div>
				</div>
        <div class="dw_ys" v-show="hideWgtTwo" >
          <mt-button type="primary" id="saveWeight" class="dw_btn active" size="large" @click.native="saveWeight">克</mt-button>
          <mt-button type="primary" id="saveTwo" class="dw_btn" size="large" @click.native="saveTwo">两</mt-button>
        </div>
        <div class="dw_ys" v-show="hideBtnml" >
          <mt-button type="primary" id="saveMl" class="dw_btn active"  size="large">ml</mt-button>
        </div>

        <ul class="keyboard">
					<li v-for="(item,index) in keyList" :style="{'border-right-width': (index%3==2 ? 0 : '2px')}" @click="keyCode(item,index)">{{item}}</li>
				</ul>
        <div class="btnConfirm"><span @click="confirm">确 认</span></div>
			</div>
		</div>

	</div>
</template>

<script>
	import Bus from "@/assets/js/updateShopCar.js"; //bus
  import DLRuler from '../home/diet/ruler' //加载更多组件
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

      hideBtnml: false,
      hideWgtTwo: true,
      company:'克',

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

			// 重量估算
      weightEstimation() {
				this.$router.push(`/weightEstimation`)
			},


			//显示和隐藏键盘
			showModal(item) {
				this.currentItem = item;
				this.showNum = [];
        this.show = true
        if( this.currentItem.gramunit=="ml"){
          this.hideBtnml=true;
          this.hideWgtTwo=false;
          this.company= "ml";
        }
        if( this.currentItem.gramunit=="g"){
          this.hideBtnml=false;
          this.hideWgtTwo=true;
          this.company= "克";
          document.getElementById('saveWeight').classList.add('active')
          document.getElementById('saveTwo').classList.remove('active')
        }
			},
			hideModal() {
				this.show = false
			},
			//键盘的输入事件
			keyCode(item, index) {
				if (item == "x") {
					this.showNum.pop()
				} else {
          if( this.company=="两"){
            if (this.showNum.length < 3) {
              this.showNum.push(item)
            }
          }
          else {
            if (this.showNum.length < 6) {
              this.showNum.push(item)
            }
          }
				}
			},
			//键盘的确定按钮
			confirm(){
        if(this.showNum.length == 0){
          this.$Toast("请输入菜品克数")
          return
        }
        let showNum;
        if( this.company=="两"){
          showNum = Number(this.showNum.join().replace(/,/g, ""))*50;
          this.currentItem.gramunit="g";
        }else {
          showNum = Number(this.showNum.join().replace(/,/g, ""));
        }
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
      saveWeight () {
        this.show = true
        this.company= "克"
        document.getElementById('saveWeight').classList.add('active')
        document.getElementById('saveTwo').classList.remove('active')
        this.showNum.length=0
      },
      saveTwo() {
        this.show = true
        this.company= "两"
        document.getElementById('saveTwo').classList.add('active')
        document.getElementById('saveWeight').classList.remove('active')
        this.showNum.length=0
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
					foodList.push({mealtype: item.mealtype,foodname: item.foodname,foodenergy: resultObj.foodkcal,foodweight: item.foodconsumption});
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
				this.$post(url, {
					...this.param,
					DietarySurveySkey: this.$route.query.DietarySurveySkey
				}).then((data) => {
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
    components: {
      DLRuler
    }
	}
</script>

<style scoped lang="scss">
  .mint-header{
    height: 48px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.16rem;
  }
	.dsuv_eveall{
		width:90%;
		margin: 2% auto;
		overflow: hidden;
		font-size: 0.14rem;
    background-color: #0AC5C9;
    background-image: repeating-linear-gradient(45deg,#0AC5C9 0%, #52e3e6 100%);
    border-radius:0.1rem;
    padding: 0.475rem 2% 0.15rem 2%;
    position: relative;
    text-align: center;
    box-shadow: 2px 5px 8px rgba(0,0,0,0.2);
    .dsuvFlexnr{

    }
    .d-flex{
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      .flex-fill {
        -ms-flex: 1 1 auto!important;
        flex: 1 1 auto!important;
      }
    }
		label{
			display: block;
			font-weight: 600;
			color: #00b2b6;
      padding: 0.035rem 0.08rem 0.035rem 0.15rem;
      position: absolute;
      left: -0.1rem;
      top: 0.125rem;
      background-color: #FFFFFF;
      border-radius: 0.15rem;
      font-size: 0.15rem;
      box-shadow: 2px 5px 5px rgba(0,0,0,0.1);
		}
    strong{
      color: #FFFFFF;
      font-size: 0.18rem;
      font-weight: 500;
      line-height: 1.8;
      text-shadow: 1px 1px 1px rgba(6,124,127,0.5);
    }
		span{
			display: block;
			color: #FFFFFF;
      text-shadow: 1px 1px 1px rgba(6,124,127,0.5);
		}
	}
	.dsuv_addfood{
		width:90%;
		margin: 0.1rem auto;
    border-radius:0.1rem;
    padding: 2%;
		.dsuv_list{
      margin: 0.1rem auto;
			p{
        background: url(../../assets/images/yinshi@2x.png) no-repeat left center;
        padding-left: 0.2rem;
        background-size: 0.15rem;
				height: 0.4rem;
				line-height: 0.4rem;
				color: #333333;
				font-size: 0.16rem;
        border-bottom: 1px solid #e5e5e5;
			}
			&>span{
        display:inline-block;
        text-align: center;
        font-size: 0.15rem;
        color: #0AC5C9;
        border: 1px dashed #0AC5C9;
        padding: 0.035rem 0.135rem;
        border-radius: 4px;
        margin: 0.15rem auto;
			}
		}
	}
  .dsuv_br{
    background-color: #f1f1f1;
    width: 100%;
    height: 0.1rem;
  }
	/*时间栏目*/
	.time-pick {
		/*background: #f1f1f1;*/
	}

	.time-inner {
    min-width: 100px;
		text-align: center;
    /*height: 30px;*/
		margin: 0 auto;
    padding-top: 0.05rem;
    padding-left: 0.15rem;
	}

  .article-time{
    background: url(../../assets/images/shaixuan_xia@2x.png) no-repeat right center #FFFFFF;
  }
	.time-show {
		display: inline-block;
		font-size: 0.145rem;
		/*background:rgba(0, 0, 0,0.2);*/
		color: #484848;
		text-align: center;
		border-radius: 5px;
		overflow: hidden;

		input {
			font-size: 0.145rem;
      color: #666666;
      line-height: 28px;
			text-align: center;
		}
	}


	/* 早餐列表 */
	.titleWrap {
		display: inline-block;
		vertical-align: middle;
    margin-left: 0.1rem;
	}


  /* 弹出层 */
  #mark {
    z-index: 99;
  }

  .modal.show {
    transform: translateY(0);
    min-height: 50%;
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
    padding-bottom: 0.44rem;
    .btnConfirm {
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999;
      span {
        display: block;
        width: 100%;
        line-height: 0.44rem;
        background-color: #0AC5C9;
        color: #FFFFFF;
        font-size: 0.16rem;
      }
    }
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
      margin: 0.35rem 4% 0.2rem 4%;
    }

    .num {
      font-size: 0.275rem;
      color: #0AC5C9;
      display: inline-block;
      min-width: 84px;
      height: 0.35rem;
      padding:0 0.05rem;
      box-sizing: border-box;
      text-align: center;
      border-bottom: 2px solid #0AC5C9;
    }

    .num_g {
      font-size: 0.155rem;
      color: #0AC5C9;
      vertical-align: super;
    }
    .dw_ys{
      text-align: center;
      margin: 0.15rem 0;
      .dw_btn{
        display: inline-block;
        width: 0.5rem;
        padding: 0 0.05rem;
        background: none;
        color: #666666;
        height: 0.28rem;
        border-radius: 0.4rem;
      }
      .active{
        background: #0AC5C9;
        color: #FFFFFF;

      }
      .dw_btn::after{
        background: none;
        color: #0AC5C9;
      }

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
    line-height: 0.42rem;
    box-sizing: border-box;
    border-right: 4px solid #fff;
    border-top: 4px solid #fff;
    background-color: #fafafa;
    border-radius: 10px;
    color: #555555;
  }

  .keyboard li:last-child{
    color: #fafafa;
    background: url(../../assets/images/jpsc_bg.png) no-repeat center center #fafafa;
    background-size: 0.30rem 0.25rem;
    font-size: 0.16rem;
    font-family: ui-monospace;
    line-height: 0.44rem;
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
  .dsuv_list .mint-cell .mint-cell-title img{
    border-radius: 4px;
  }
  .dsuv_list .mint-cell .mint-cell-value img{

    width: 0.15rem;
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
  .buttons{
    height: auto;
  }
  .add_btns{
    background-color: #0AC5C9;
    width: 100%;
    border-radius: 0;
    margin: 0 auto;
    height: 48px;
  }
</style>
