<template>
	<div class="uploadPhoto-root" style="background: #FAFAFA;">
		<div id="body_main" style="padding-top: 1rem;" >
			<div class="fix_top" style="background: #FAFAFA;">
				<mt-header title="食物查询">
					<div slot="left">
						<header-back>
							<mt-button icon="back"></mt-button>
						</header-back>
					</div>
				</mt-header>
				<!-- 搜索框 -->
				
				<!-- mt-navbar -->
				<div id="navbar">
					<mt-navbar>
						<mt-tab-item id="" v-for="(item,index) in tabs" :key="index" :class="(param.food_type_id == item.food_type_id) && 'is-selected'"
						 @click.native="tab(item,index)">
							<p>{{item.food_type_name}}</p>
						</mt-tab-item>
					</mt-navbar>
				</div>
			</div>


			<!-- 其他菜式 -->
			<div class=" yinshhi_list">
				<loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE" :isDefaultLoading="false">
					<div class="scroll" slot="content">
						<mt-cell class="cell" v-for="(item,index) in list" :key="index" is-link >
							<img slot="icon" :src="item.foodimg" width="52" height="52">
							<div slot="title" class="titleWrap">
								<span class="mint-cell-text">{{item.foodname}}</span>
								<span class="mint-cell-label font12 huiFont99"><span class="colF7">{{item.foodkcal}} {{item.kcalunit}}</span> /{{item.foodgram}}{{item.gramunit}}</span>
							</div>
						</mt-cell>
					</div>
				</loadMore>
			</div>
		</div>


	</div>
</template>

<script>
	import Bus from "@/assets/js/updateShopCar.js"; //bus
	import pic from "@/assets/images/syyx.png"; //跟新购物车数量
	import loadMore from "@/components/common/loadMore.vue";
  import DLRuler from '../home/diet/ruler' //加载更多组件

	export default {
		name: "uploadPhoto",
		data: () => ({
			//tab 切换
			isactv: 0,
			selected: "tab-container1",
			tabs: [], //
			isSearchPanel: false,  //显示搜索面板
			searchIndex: -1,
			searchList:[],  //search的下拉框

			keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'x'],
			showNum: [],
			show: false,
			currentItem: {},   //点击的菜对象

      hideBtnml: false,
      hideWgtTwo: true,
      company:'克',
      weightVisible: false,

			//早，中，晚，加餐的对象key
			foodKey:"",
			searchParam: {
				pagesize: 100,
				pagecount: 1,
				distinguish: '早餐',
				foodname: '',
			},
			param: {
				pagesize: 10,
				pagecount: 0,
				food_type_id: ""
			},
			list: []
		}),
		methods: {
			tab(item) {
				this.$Indicator.loading();
				this.param.food_type_id = item.food_type_id;
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList(); //触发加载更多
				setTimeout(() => {
					this.$Indicator.close();
				}, 200)
			},

			//分类
			getType(){
				let url = "UserInterface/goods/FoodClassificationList.ashx";
				this.$post(url).then((data) => {
					const list = data.data;
					this.tabs = list;
					this.tab(list[0])
				})
			},

			//菜单列表
			shoplist(success) {
				let url = "UserInterface/goods/FoodDataList.ashx";  //分类下的列表
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					const {mealtype} = this.$route.query;
					modelList.forEach((item, index)=>{
						item.mealtype = mealtype
					})
					if (this.param.pagecount == 1) {
						this.list = [...modelList];
					} else {
						this.list = [...this.list, ...modelList]
					}

					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
		},
		mounted() {
			//饮食时间
			const {mealtype} = this.$route.query;
			if(mealtype){
				let mealtypeText = "", foodKey = "";
				switch(mealtype){
					case "01":
					mealtypeText = "早餐";
					foodKey = "breakfastList"
					    break;
					case "02":
					mealtypeText = "午餐";
					foodKey = "lunchList"
					    break;
					case "03":
					mealtypeText = "晚餐";
					foodKey = "dinnerList"
					    break;
					case "04":
					mealtypeText = "加餐";
					foodKey = "mealAdditionList"
					    break;
				}
				this.foodKey = foodKey;
				this.searchParam.distinguish = mealtypeText;
			}

			//添加菜单
			const foodKey = this.foodKey;
			if(!Bus.$data[foodKey]){
				Bus.$data[foodKey] = [];
			}
			Bus.$on("addDishes", (item) => {
				Bus.$data[foodKey].push(item)
			})

			//搜索条件
//			this.searchDishes()
			//获取分类
			this.getType()
		},
		destroyed() {
			//移除addDishes事件避免多次注册事件
			Bus.$off("addDishes")
		},
		components: {
			loadMore
		}
	}
</script>

<style scoped lang="scss">
.cell /deep/ .mint-cell-allow-right {
  display: none;
}
  .mint-header{
    height: 48px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 0.16rem;
  }
	/* 早餐列表 */
	.yinshhi_list {
		background: #FFFFFF;
    padding-top: 0.1rem;
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
    margin-left: 0.1rem;
	}

	.yinshhi_list .mint-cell {
		min-height: 66px;
	}
	.fix_top{
    	z-index: 90;
    }
	/* 搜索输入框 */
	.search-block{
    	position: relative;
		z-index: 10;
		background: #0ac5ca;
    padding: 0.075rem 0.2rem 0.075rem 0.2rem;
	    .menu-list{
		    position: absolute;
		    left: 0.12rem;
		    right: 0.12rem;
		    margin-top: -0.12rem;
		    padding: 0.03rem 0;
		    border: 1px solid #F0F1F3;
		    border-radius: 6px;
		    background: #FFF;
		    max-height: 4rem;
    		ul{
    			max-height: 4rem;
    			overflow-y: scroll;
          min-height: 0.40rem;
    		}
		    li{
		    	padding: 0.03rem  0.22rem;
		    }
		    li.active{
		    	color: #FFFFFF;
		    	background: #F78335;
		    }
		    .close{
			    position: absolute;
			    right: 0;
          padding: 0.05rem 0.1rem;
			    font-size: 16px;
			    color: #EC0000;
		    }
	    }
	}
	.search {
		background: #F0F1F3;
		border-radius: 0.1rem;
		overflow: hidden;
    padding: 0 0.1rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.icon,
		input {
			vertical-align: middle;
		}

		input {
			flex: 1;
			font-size: 0.145rem;
      line-height:2;
			margin-left: 0.05rem;
		}
   input::-webkit-input-placeholder{
           color:#999999;
         }
	}
  #navbar .mint-navbar .mint-tab-item.is-selected{
     border-bottom: 2px solid #0ac5ca;
    color: #0bb8bc;
    font-weight: 500;
  }
	/* 滚动区域 */
	.scroll {
		overflow: hidden;
	}
span.colF7{
  color: #F78335;
}
  #navbar .mint-navbar p {
    line-height: 0.42rem;
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
        background-color: #0ac5ca;
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
      color: #0ac5ca;
      display: inline-block;
      min-width: 84px;
      height: 0.35rem;
      padding:0 0.05rem;
      box-sizing: border-box;
      text-align: center;
      border-bottom: 2px solid #0ac5ca;
    }

    .num_g {
      font-size: 0.165rem;
      color: #0ac5ca;
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
        background: #0ac5ca;
        color: #FFFFFF;

      }
      .dw_btn::after{
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

  .keyboard li:last-child{
    color: #fafafa;
    background: url(../../assets/images/jpsc_bg.png) no-repeat center center #fafafa;
    background-size: 0.30rem 0.25rem;
    font-size: 0.16rem;
    font-family: ui-monospace;
    line-height: 0.44rem;
  }

  .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .wigtsin_bg{
    background-color: #FFFFFF;
  }
  .wigtsin_bg img{
    width: 100%;
    margin: 0;
    padding: 0;
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
	.uploadPhoto-root #navbar{
		overflow-x: scroll;
	    margin: 0 auto 0.1rem auto;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    padding: 0px 10px;
		.mint-navbar{
			display: inline-block;
			white-space: nowrap;
		}
		.mint-navbar .mint-tab-item{
			height: 0.44rem;
			box-sizing: border-box;
			display: inline-block;
			padding: 0 15px;
      border-bottom: 2px solid #FFFFFF;
		}
	}
  .btnConfirm{
    text-align: center;
    span{
      display: block;
      width: 100%;
      line-height: 48px;
      background-color: #0ac5ca;
      color: #FFFFFF;
      font-size: 0.16rem;
    }
  }
  .btnClose{
    text-align:right;
    padding: 0.05rem 0 0 0;
    span{
    display:inline-block;
    /*line-height: 0.22rem;*/
    /*color: #666666;*/
    /*  font-weight: bolder;*/
    /*font-size: 0.16rem;*/
      width: 0.22rem;
      height: 0.22rem;
      /*border: 1px solid #999999;*/
      /*border-radius: 50%;*/
      text-align: center;
      background: url(../../assets/images/关闭@2x.png) no-repeat center center #FFFFFF;
      background-size: 0.15rem;
  }
  }
#main_router img{
  border-radius: 4px;
}
  /*.show .info .mint-cell-title{ text-align: center;*/
  /*  .titleWrap{*/
  /*    text-align: left;*/
  /*  }*/
  /*}*/

</style>
