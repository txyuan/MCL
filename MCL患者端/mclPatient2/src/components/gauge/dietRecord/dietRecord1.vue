<template>
  <div class="dietarySuvey-root" style="padding: 0 0.1rem">
    <!-- <div id="body_main" style="padding-top: 48px;background: #FFFFFF;margin-bottom:1.2rem;padding-bottom:0.1rem;"> -->
    <mt-header
      title="饮食记录"
      fixed
      style="background-color: #36c2d7; color: #fff"
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="dsuv_br"></div>
    <div class="dsuv_home">
      <div class="dsuv_title">
        <h3> <span></span> 请选择您每天的饮食结构</h3>
        <p @click="checkJiegou">
          <input readonly v-model="foodJiegou" type="text" placeholder="请选择饮食结构" />
          <van-icon class="arrow" name="arrow" />
        </p>
        <div class="lineBar"></div>
      </div>
      <div class="dsuv_addfood">
				 <h3> <span></span> 请选择您一天吃的饮食有哪些？</h3>
        <div class="dsuv_list">
          <div class="leftText">
            <p>早餐</p>
            <p class="line"></p>
          </div>
          <div>
            <van-cell
              v-for="(item, index) in breakfastList"
              :key="index"
              @click.native="showModal(item)"
            >
              <img slot="icon" :src="item.foodimg" width="50" height="50" />
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{ item.foodname }}</span>
                <span class="mint-cell-label font12 huiFont99"
                  >{{ item.foodconsumption }}{{ item.gramunit }} <span class="line"></span> <span style="color: #fc605b;">{{item.foodkcalReslut}}</span>千卡</span
                >
              </div>
              <div class="font14 huiFont99">
                <!-- <span style="margin-right: 5px;vertical-align: middle;">{{item.resultObj.foodkcal}}{{item.kcalunit}}</span> -->
                <img
                  src="@/assets/images/dietRecord/removeFood.png"
                  alt=""
                  width="20"
                  style="vertical-align: middle"
                  @click.stop="delDietCase('breakfastList', index)"
                />
              </div>
            </van-cell>

            <van-cell @click="otherfood('01')">
              <img slot="icon" src="@/assets/images/dietRecord/addFood.png" width="40" height="40" />
              <div slot="title" class="titleWrap">
                <span style="font-size: 0.16rem">添加早餐</span>
              </div>
            </van-cell>
          </div>
        </div>
        <div class="dsuv_list">
          <div class="leftText">
            <p>午餐</p>
            <p class="line"></p>
          </div>
          <div>
            <van-cell
              v-for="(item, index) in lunchList"
              :key="index"
              @click.native="showModal(item)"
            >
              <img slot="icon" :src="item.foodimg" width="50" height="50" />
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{ item.foodname }}</span>
               <span class="mint-cell-label font12 huiFont99"
                  >{{ item.foodconsumption }}{{ item.gramunit }} <span class="line"></span> <span style="color: #fc605b;">{{item.foodkcalReslut}}</span>千卡</span
                >
              </div>
              <div class="font14 huiFont99">
                <img
                 src="@/assets/images/dietRecord/removeFood.png"
                  alt=""
                  width="25"
                  style="vertical-align: middle"
                  @click.stop="delDietCase('lunchList', index)"
                />
              </div>
            </van-cell>
            <van-cell @click="otherfood('02')">
             <img slot="icon" src="@/assets/images/dietRecord/addFood.png" width="40" height="40" />
              <div slot="title" class="titleWrap">
                <span style="font-size: 0.16rem">添加午餐</span>
              </div>
            </van-cell>
          </div>
          <!-- <span @click="otherfood('02')">+ 午餐</span> -->
        </div>
        <div class="dsuv_list">
          <div class="leftText">
            <p>晚餐</p>
            <p class="line"></p>
          </div>
          <div>
            <van-cell
              v-for="(item, index) in dinnerList"
              :key="index"
              @click.native="showModal(item)"
            >
              <img slot="icon" :src="item.foodimg" width="50" height="50" />
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{ item.foodname }}</span>
                <span class="mint-cell-label font12 huiFont99"
                  >{{ item.foodconsumption }}{{ item.gramunit }} <span class="line"></span> <span style="color: #fc605b;">{{item.foodkcalReslut}}</span>千卡</span
                >
              </div>
              <div class="font14 huiFont99">
                <img
                  src="@/assets/images/dietRecord/removeFood.png"
                  alt=""
                  width="25"
                  style="vertical-align: middle"
                  @click.stop="delDietCase('dinnerList', index)"
                />
              </div>
            </van-cell>
            <van-cell @click="otherfood('03')">
              <img slot="icon" src="@/assets/images/dietRecord/addFood.png" width="40" height="40" />
              <div slot="title" class="titleWrap">
                <span style="font-size: 0.16rem">添加晚餐</span>
              </div>
            </van-cell>
          </div>
          <!-- <span @click="otherfood('03')">+ 晚餐</span> -->
        </div>
        <div class="dsuv_list">
          <div class="leftText"><p>加餐</p></div>
          <div>
            <van-cell
              v-for="(item, index) in mealAdditionList"
              :key="index"
              @click.native="showModal(item)"
            >
              <img slot="icon" :src="item.foodimg" width="50" height="50" />
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{ item.foodname }}</span>
                <span class="mint-cell-label font12 huiFont99"
                  >{{ item.foodconsumption }}{{ item.gramunit }} <span class="line"></span> <span style="color: #fc605b;">{{item.foodkcalReslut}}</span>千卡</span
                >
              </div>
              <div class="font14 huiFont99">
                <img
                  src="@/assets/images/dietRecord/removeFood.png"
                  alt=""
                  width="25"
                  style="vertical-align: middle"
                  @click.stop="delDietCase('mealAdditionList', index)"
                />
              </div>
            </van-cell>
            <van-cell @click="otherfood('04')">
              <img slot="icon" src="@/assets/images/dietRecord/addFood.png" width="40" height="40" />
              <div slot="title" class="titleWrap">
                <span style="font-size: 0.16rem">添加加餐</span>
              </div>
            </van-cell>
          </div>
          <!-- <span @click="otherfood('04')">+ 加餐</span> -->
        </div>
      </div>
    </div>
    <!-- </div> -->

    <div class="bot_content">
      <div class="btn">
        <van-button v-if="valueAll" class="btn_info" round type="info" @click.native="save"
          >完成</van-button
        >
        <van-button v-else class="btn_info1" round type="info">完成</van-button>
      </div>
    </div>

		<!-- 饮食结构弹框 -->
		<van-popup class="popup" :closeable="true" v-model="show" round position="bottom" :style="{ height: '90%' }">
			<h3>饮食结构</h3>
			<div class="content">
				<h4>请选择您每天饮食结构</h4>
				<ul>
					<li v-for="(item,index) in jiegouList" :key="index" :class="{ checked:changeRed == index}" @click="checkeData(item,index)">
						<div class="title">
							<!-- <div class="img"> -->
								<img v-if="changeRed != index" src="@/assets/images/dietRecord/nocheck.png" alt="">
							  <img v-else src="@/assets/images/dietRecord/check.png" alt="">
							<!-- </div> -->
							<p>{{item.title}}</p>
						</div>
						<div class="text">
							<p>{{item.value1}}</p>
							<p>{{item.value2}}</p>
							<p>{{item.value3}}</p>
						</div>
					</li>
				</ul>
			</div>
		</van-popup>
  </div>
</template>

<script>
import DLRuler from "@/components/home/diet/ruler"; //加载更多组件

export default {
  name: "dietRecord1",
  data: () => ({
    datriq: "", //日期
    valueAll: false,
    //键盘
    keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "x"],
    showNum: [],
    show: false,
    currentItem: {}, //点击的菜对象

    allObj: {
      allFoodenergy: 0, //总能量
      allProtein: 0, //总蛋白质
      allFat: 0, //脂肪
      allCarbohydrate: 0, //碳水化合物
    },

    hideBtnml: false,
    hideWgtTwo: true,
    company: "克",
    weightVisible: false,

    //早餐的列表
    breakfastList: [],
    //午餐的列表
    lunchList: [],
    //晚餐的列表
    dinnerList: [],
    //加餐的列表
    mealAdditionList: [],
		changeRed : -1,
    //保存接口的参数
    param: {
      DietRangeSkey : '',
      DeviceList: { data: [] },
    },
    nutritionskey: "",
		jiegouList : [
			{
        skey : '',
			 title : '',
			 value1 : '',
			 value2 : '',
			 value3 : '',
			}
		],
		foodJiegou : '', // 饮食结构
    skey : '',
     
  }),
	watch : {
		'breakfastList.length' : {
			handler(newValue,oldValue) {
				if(newValue != 0 || this.lunchList.length != 0 || this.dinnerList.length != 0 ||this.mealAdditionList.length != 0) {
					this.valueAll = true
				}else {
					this.valueAll = false
				}
			},
			deep :true
		},
		'lunchList.length' : {
			handler(newValue,oldValue) {
				if(newValue != 0 || this.breakfastList.length != 0 || this.dinnerList.length != 0 ||this.mealAdditionList.length != 0) {
					this.valueAll = true
				}else {
					this.valueAll = false
				}
			},
			deep :true
		},
		'dinnerList.length' : {
			handler(newValue,oldValue) {
				if(newValue != 0 || this.lunchList.length != 0 || this.breakfastList.length != 0 ||this.mealAdditionList.length != 0) {
					this.valueAll = true
				}else {
					this.valueAll = false
				}
			},
			deep :true
		},
		'mealAdditionList.length' : {
			handler(newValue,oldValue) {
				if(newValue != 0 || this.lunchList.length != 0 || this.dinnerList.length != 0 ||this.breakfastList.length != 0) {
					this.valueAll = true
				}else {
					this.valueAll = false
				}
			},
			deep :true
		},
    '$store.state.breakfastList.length' : {
     	handler(newValue,oldValue) {
					this.breakfastList = this.$store.state.breakfastList
			},
			deep :true
    },
    '$store.state.lunchList.length' : {
     	handler(newValue,oldValue) {
					this.lunchList = this.$store.state.lunchList
			},
			deep :true
    },
    '$store.state.dinnerList.length' : {
     	handler(newValue,oldValue) {
					this.dinnerList = this.$store.state.dinnerList
			},
			deep :true
    },
    '$store.state.mealAdditionList.length' : {
     	handler(newValue,oldValue) {
					this.mealAdditionList = this.$store.state.mealAdditionList
			},
			deep :true
    },
	},
  methods: {
    // 选择饮食结构
		checkJiegou() {
      this.show = true
		},
    // 饮食结构
    getFoodJieG() {
      let url = 'UserInterface/selfTestTool/GetDietarystructureList.ashx'
      this.$post(url).then(res => {
        let jiegouList = []
        res.data.forEach((item,index) => {
          let obj = {}
          obj.title = item.value
          obj.skey = item.skey
          obj.value1 = item.diet[0].values
          obj.value2 = item.diet[1].values
          obj.value3 = item.diet[2].values
          jiegouList.push(obj)
        })
        this.jiegouList = jiegouList

      })
    },
		// 单选
		checkeData(item,i) {
			this.foodJiegou = item.title
      this.breakfastList = [] 
      this.lunchList = []
       this.dinnerList = []
       this.mealAdditionList = []
      let data = {
        skey : item.skey
      }
      let url = 'UserInterface/selfTestTool/GetDietRecipesList.ashx'
      this.$post(url,data).then(res => {
        res.data.forEach(item => {
        let data1 = {}
         data1.foodimg = item.foodImg
         data1.foodname = item.foodName
         data1.foodconsumption = item.foodQuantity
         data1.gramunit = item.foodNnit
         data1.mealtype = item.mealType
         data1.foodkcalReslut = item.foodEnergy.split('K')[0]
          if(item.mealType == '01') {
            this.breakfastList.push(data1)
          }else if(item.mealType == '02') {
            this.lunchList.push(data1)
          }else if(item.mealType == '03') {
            this.dinnerList.push(data1)
          }else {
            this.mealAdditionList.push(data1)
          }
          
        })
      this.$store.commit('setbreakfastList',this.breakfastList)
      this.$store.commit('setlunchList',this.lunchList)
      this.$store.commit('setdinnerList',this.dinnerList)
      this.$store.commit('setmealAdditionList',this.mealAdditionList)
      // this.getFoodData()
      })
			this.changeRed = i;
			if(item) {
				this.show = false
			}
      
		},
    //饮食方案 删除
    delDietCase(obj, index) {
      this[obj].splice(index, 1);
      //获取早中晚加的数据
			// this.getFoodData()
    },
    // 其他菜式页面
    otherfood(type) {
      this.$router.push(`/otherdietRecord?mealtype=${type}`);
    },
    //保存
    save() {
      //获取早中晚加的数据
			this.getFoodData()
      let url = "UserInterface/InsertDietarySurvey.ashx";
      this.$post(url, {
        ...this.param,
        DietRangeSkey: this.skey,
      }).then((data) => {
        this.$Toast(data.rspdesc);
        if (data.rspcode != 1) {
          return;
        }
        this.$router.push("/selfTestTool");
        // this.getMsgInfo();
      });
    },
			//获取早中晚加的数据
			getFoodData(){
				//早餐的列表  午餐的列表    晚餐的列表  加餐的列表
				let list = [...this.breakfastList, ...this.lunchList, ...this.dinnerList, ...this.mealAdditionList];
        console.log(list);
				let foodList = []
				list.forEach((item,index)=>{
					foodList.push({mealtype: item.mealtype,foodname: item.foodname,foodenergy: item.foodkcalReslut,foodweight: item.foodconsumption});
				})
        
				this.param.DeviceList = JSON.stringify({data: foodList});
			},
    // 基本信息
    getMsgInfo() {
      let url = "UserInterface/PatientHomePageEssentialInfo.ashx";
      this.$post(url).then((data) => {
        if (data.rspcode != 1) {
          return;
        }
        if (this.nutritionskey == undefined) {
          this.$router.push("/wx_Entrance/selfTest");
        } else {
          if (data.IsMember == 1) {
            this.$router.push(`/nuteye?id=${this.nutritionskey}`);
          } else {
            this.$router.push(`/watch_repot?orderKey=${this.nutritionskey}`);
          }
        }
      });
    },

  },
  created() {},
  mounted() {
    this.getFoodJieG()
    const id = this.$route.query.id;
    this.nutritionskey = id;
    //获取早中晚加的数据
		// this.getFoodData()
    
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 不是去搜索菜单的页面，要置空菜单列表
    if (to.name != "otherdietRecord") {
      this.foodJiegou = ''
      this.breakfastList = []
      this.lunchList = []
      this.dinnerList = []
      this.mealAdditionList = []
     this.$store.state.breakfastList = []
     this.$store.state.lunchList = []
     this.$store.state.dinnerList = []
     this.$store.state.mealAdditionList = []
    }
    next();
  },
  components: {
    DLRuler,
  },
};
</script>

<style scoped lang="scss">
.dsuv_home {
  margin-top: 48px;
  background: #ffffff;
  margin-bottom: 1.2rem;
  padding-bottom: 0.1rem;
  border-radius: 0.08rem;
}
.dsuv_title {
  padding: 0.25rem 0.2rem;
  box-sizing: border-box;
  height: 1.4rem;
  h3 {
		margin-left: -0.05rem;
    font-size: 0.18rem;
    font-weight: 500;
		span {
			margin-right: 0.05rem;
			border-left: 4px solid #36C2D9;
		border-radius: 0.04rem;
		}
  }
  p {
    margin-top: 0.14rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.15rem;
    background-color: #f8f8fa;
    line-height: 0.5rem;
		border-radius: 0.06rem;
    input {
			flex: 1;
			margin-right: 0.2rem;
      border: 0;
			white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    }
		.arrow {
			
			color: #999999;
		}
  }
	.lineBar {
		margin: 0.3rem -0.1rem 0 -0.1rem;
		border-top: 1px solid #E8E8E8;
	}
}
.dsuv_addfood {
	h3 {
		margin-top: 0.1rem;
		margin-left: -0.05rem;
    font-size: 0.18rem;
    font-weight: 500;
		span {
			margin-right: 0.05rem;
			border-left: 4px solid #36C2D9;
		border-radius: 0.04rem;
		}
  }
}
.popup {
    padding: 0 0 0.3rem 0;
	h3 {
		text-align: center;
		font-size: 0.2rem;
		font-weight: 500;
		margin-top: 0.29rem;
	}
	h4 {
		margin-top: 0.4rem;
		font-size: 0.18rem;
		font-weight: 500;
	}
	.content {
		// position: absolute;
		// bottom: 0.3rem;
		// left: 0;
		// right: 0;
		padding: 0 0.35rem;
		padding-bottom: 0.3rem;
		li {
			margin-top: 0.18rem;
			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #f5f5f5;
				color: #666;
				border: 1px solid #BEBEBE ;
				border-radius: 0.06rem;
				padding:  0.07rem 0.18rem;
				line-height: 0.24rem;
				img {
					width: 0.2rem;
				}
				p {
					flex: 1;
					text-align: left;
					padding-left: 0.25rem;
					font-size: 0.16rem;
				}
		}
		.text {
			box-sizing: border-box;
			border: 1px solid #BEBEBE ;
			border-top: 0;
			margin-top: -0.1rem;
			padding: 0.2rem 0.18rem 0.12rem 0.18rem;
			line-height: 0.24rem;
			font-size: 0.14rem;
			color: #999999;
		}
		}
		.checked {
			.title {
				background-color: #62C0D6;
				color: #fff;
				border: 1px solid #62C0D6 ;
		}
		.text {
			border: 1px solid #62C0D6;
			color: #62C0D6;
		}
	}
		
	}

	
}
.mint-header {
  height: 48px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 0.16rem;
}
.dsuv_eveall {
  width: 90%;
  margin: 2% auto;
  overflow: hidden;
  font-size: 0.14rem;
  background-color: #0ac5ca;
  background-image: repeating-linear-gradient(45deg, #0ac5ca 0%, #52e3e6 100%);
  border-radius: 0.1rem;
  padding: 0.475rem 2% 0.15rem 2%;
  position: relative;
  text-align: center;
  box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2);
  .dsuvFlexnr {
  }
  .d-flex {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    .flex-fill {
      -ms-flex: 1 1 auto !important;
      flex: 1 1 auto !important;
    }
  }
  label {
    display: block;
    font-weight: 600;
    color: #00b2b6;
    padding: 0.035rem 0.08rem 0.035rem 0.15rem;
    position: absolute;
    left: -0.1rem;
    top: 0.125rem;
    background-color: #ffffff;
    border-radius: 0.15rem;
    font-size: 0.15rem;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.1);
  }
  strong {
    color: #ffffff;
    font-size: 0.18rem;
    font-weight: 500;
    line-height: 1.8;
    text-shadow: 1px 1px 1px rgba(6, 124, 127, 0.5);
  }
  span {
    display: block;
    color: #ffffff;
    text-shadow: 1px 1px 1px rgba(6, 124, 127, 0.5);
  }
}
.dsuv_addfood {
  width: 90%;
  margin: 0.1rem auto;
  border-radius: 0.1rem;
  padding: 2%;

  .dsuv_list {
    margin: 0.3rem 0 0 0;
    display: flex;
    justify-content: space-between;
    .leftText {
      margin-top: -0.05rem;
      margin-bottom: -0.3rem;
      padding-bottom: 0.3rem;
      text-align: center;
    }
    p {
			color: #666666;
    }
    .line {
      // height: ;
      border-left: 1px dashed #e8e8e8;
      height: 100%;
      width: 0px;
      margin-left: 0.15rem;
      margin-top: 0.05rem;
    }
    .cellAdd {
      // margin-top: 0.1rem;
      border-radius: 0.06rem;
      height: 0.66rem;
      width: 2.68rem;
      background-color: #f8f8fa !important;

      // border: 1px solid red;
    }
  }
}
.dsuv_br {
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

.article-time {
  background: url(~@/assets/images/shaixuan_xia@2x.png) no-repeat right center
    #ffffff;
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
  .mint-cell-label {
    margin-top: -0.02rem;
		.line {
			border-left: 1px solid #999999;
			margin: 0 0.05rem;
		}
  }
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
  background: #ffffff;
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
      background-color: #0ac5ca;
      color: #ffffff;
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
    color: #0ac5ca;
    display: inline-block;
    min-width: 84px;
    height: 0.35rem;
    padding: 0 0.05rem;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 2px solid #0ac5ca;
  }

  .num_g {
    font-size: 0.155rem;
    color: #0ac5ca;
    vertical-align: super;
  }
  .dw_ys {
    text-align: center;
    margin: 0.15rem 0;
    .dw_btn {
      display: inline-block;
      width: 0.5rem;
      padding: 0 0.05rem;
      background: none;
      color: #666666;
      height: 0.28rem;
      border-radius: 0.4rem;
    }
    .active {
      background: #0ac5ca;
      color: #ffffff;
    }
    .dw_btn::after {
      background: none;
      color: #0ac5ca;
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

.keyboard li:last-child {
  color: #fafafa;
  background: url(~@/assets/images/jpsc_bg.png) no-repeat center center #fafafa;
  background-size: 0.3rem 0.25rem;
  font-size: 0.16rem;
  font-family: ui-monospace;
  line-height: 0.44rem;
}
.propic {
  width: 100%;
  border-bottom: 1px solid #eee;
}

.mint-popup-3 {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.wigtsin_bg {
  background-color: #ffffff;
}
.wigtsin_bg img {
  width: 100%;
  margin: 0;
  padding: 0;
}
.bot_content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 1rem;
  height: 0.88rem;
  background-color: #fff;
  .btn {
    width: 100%;
    background-color: #fff;
    padding: 0.15rem 0 0 0;
    text-align: center;
    .btn_info {
      width: 80% !important;
      background: linear-gradient(to left, #38c2d7, #51e4f7);
      border: 0;
    }
    .btn_info1 {
      border: 0;
      width: 80% !important;
      background-color: #dcdcdc;
    }
  }
}
</style>
<style type="text/css" scoped>
.dsuv_list .van-cell-wrapper {
  padding: 0;
}
.dsuv_list >>> .van-cell {
  align-items: center;
  margin-bottom: 0.1rem;
  background-color: #f8f8fa !important;
  min-height: 0.66rem;
  width: 2.7rem;
  padding-left: 0.3rem;
  border-radius: 0.06rem;
}
/* .dsuv_list1 >>> .van-cell {
		margin-top: 0.1rem;
		background-color: #f8f8fa !important;
		min-height: 0.66rem;
		width: 2.7rem;
	} */
.dsuv_list >>> .van-cell:nth-child(1) {
  margin-top: 0;
}
.dsuv_list .van-cell .van-cell_title img {
  border-radius: 4px;
}
.dsuv_list >>> .van-cell .van-cell__value {
  flex: 0.2;
}
.dsuv_list .van-cell .van-cell__value img {
  width: 0.2rem;
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
.buttons {
  height: auto;
}
.add_btns {
  background-color: #0ac5ca;
  width: 100%;
  border-radius: 0;
  margin: 0 auto;
  height: 48px;
}
</style>
