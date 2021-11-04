<template>
	<div class="achievement_root padding-header">
		<mt-header :title="`${param.month.split('-')[1]}月业绩`" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
			<div slot="right">
				<img src="@/assets/images/date.png" width="20" alt="" @click="$refs.picker.open();">
			</div>
		</mt-header>

		<div class="showMoney text-center">
			<p>
				<img src="../../../assets/images/w_yeji_wd@2x.png" style="width: 0.25rem;height: 0.25rem;" />
				{{total_performance}}
			</p>
		</div>
		<div id="navbar" class="card_navbar borderBottom" v-if="isShowBar">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab1" @click.native="tabClick('1')">
					<p>渠道业绩</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('2')">
					<p>医生业绩</p>
				</mt-tab-item>
				<mt-tab-item id="tab3" @click.native="tabClick('3')">
					<p>员工业绩</p>
				</mt-tab-item>
			</mt-navbar>
		</div>

		<!-- tab-container -->
		<div class="borderpay">
			<loadMore :param="param" :isDefaultLoading="false" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
				<div slot="content">
					<div class="callddh" v-for="(item,index) in list" :key="index">
						<div class="card_cont">
							<div class="card_cont_tit">
								<div class="card_img">
									<!-- <img v-if="param.direction == 1" src="../../../assets/images/qdjl.png"/> -->
									<img v-if="param.direction == 2" src="../../../assets/images/kdy.png"/>
									<img v-if="param.direction == 3" src="../../../assets/images/yha.png"/>
								</div>
								<!-- <div class="card_img">
									<img :src="item.ImgUrl"/>
								</div> -->
								<div class="card_cont_txt"><span>{{item.name}}</span>{{item.phone}}</div>
							</div>
							<div class="card_cont_xq align-items-center">
								<div class="card_cont_xqwb"  v-if="param.direction == 2">
									<p>医院名称：{{item.HospitalName}}</p>
								</div>
								<div class=" d-flex justify-content-between">
									<p class=" flex-grow-1">业绩金额：{{item.achievement}}元</p>
									<div class="card_cont_btn" v-if="param.direction == 2">
										<mt-button type="danger" size="large" @click="$router.push(`/achievementDetail?month=${param.month}&skey=${item.doctorsKey}`)">查看详情</mt-button>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</loadMore>
		</div>

		<!-- 日期控件  -->
		<mt-datetime-picker
		  class="my_datetime"
			ref="picker"
			type="date"
			:endDate="new Date()"
			v-model="timeValue"
			@confirm="confirm">
		</mt-datetime-picker>

	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "achievement",
		data: function() {
			const date = new Date();
			return {
				isLoad: false, // 是否加载过接口
				selected: "tab1",
				isShowBar: false, //是否显示分类
				pickerVisible: false,
				total_performance: '', //总业绩
				// personal_performance: '', //个人业绩
				// direct_performance: '', //直推业绩
				// community_performance: '', //社区业绩
				list: [],
				param: {
					"pagesize": 10,
					"pagecount": 0,
					"direction": "1",
					"month": `${date.getFullYear()}-${date.getMonth() + 1}`
				},

				// 日期控件
				popupVisible: false,
				timeValue: date
			}
		},
		methods: {
			//tab切换
			tabClick(val) {
				this.$Indicator.loading();
				this.param.direction = val;
				this.reloadLoadMore();
				setTimeout(() => {
					this.$Indicator.close()
				}, 200)
			},
			//重新加载
			reloadLoadMore() {
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
			},
			//获取列表
			getList(success) {
				let url = "UserInterface/GetTotalPerformanceList.ashx";
				if (this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.isLoad = true
					let modelList = data.data;
					this.list = [...this.list, ...modelList]
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
					const {	total_performance } = data;
					this.total_performance = total_performance;
				})
			},
			loadPage(){
				//员工或渠道经理账号权限：不分佣金类型
				if (localStorage.userInfo) {
					const UserInfo = JSON.parse(localStorage.userInfo);
					const UserType = UserInfo.userType; //6  推广员工   7 发货员工  8  渠道经理 
					if (UserType == "6") {
						this.isShowBar = false;
						this.tabClick('2');
						this.selected='tab2'
					} else {
						this.isShowBar = true
						this.tabClick('1');
						this.selected='tab1'
					}
				}
			},
			// 日期插件确定事件
			confirm(value){
				const picker = this.$refs.picker;
				this.param.month = `${picker.getYear(value)}-${picker.getMonth(value)}`
				this.tabClick(this.selected.split("tab")[1])
			}
		},
		beforeRouteEnter (to, form, next) {
			next((vm) => {
				// 解锁加载更多
				vm.$refs.loadMoreE.isLock = true
				// 从详情页面返回，列表接口如果没有被加载过，需要加载接口
				if (form.name === 'achievementDetail' && !vm.isLoad) {
					vm.tabClick('2')
				}
				// 非详情页面进来
				if (form.name !== 'achievementDetail') {
					vm.loadPage()
				}
			})
		},
		beforeRouteLeave (to, form, next) {
			// 去详情页面，关锁加载更多
			if (to.name === 'achievementDetail') {
				this.$refs.loadMoreE.isLock = false
			}
			next()
		},
		components: {
			loadMore
		}
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.mint-cell.borderBottom {
		padding: 0.06rem 0;
		align-items: center;
		align-content: center;
	}

	.right.text-right {
		color: $color60;
		font-size: 0.15rem;

		&>span:nth-child(2) {
			margin-top: 5px;
		}
	}

	.showMoney {
		margin-bottom: 5px;
		background: #ffffff;

		p {
			line-height: 0.92rem;
			font-size: 0.36rem;
		}
	}

	.showMoney {
		background: #FFDCDC;
		color: #FF1E41;
	}

	.friend_all {
		background: #ffffff;
		font-size: 15px;
		padding: 14px 0;
		color: $color33;
		margin-bottom: 5px;

		/*position: fixed;*/
		/*left: 0;*/
		/*right: 0;*/
		/*top: 43px;*/
		ul {
			display: flex;

			li {
				flex: 1;
			}

			.num {
				margin-top: 6px;
				font-size: 18px;
			}
		}
	}

	.card_navbar{
    margin-top: 0.1rem;
    border-bottom: 1px solid #e5e5e5;
  }

	.callddh {
		position: relative;
		.calldh {
			position: absolute;
			height: 0.26rem;
			top: 50%;
			margin-top: -0.13rem;
			left: 48%;
		}
	}
	.callddh .content{
		display: flex;
		justify-content: space-between;
		line-height: 45px;
		background: #fff;
		padding: 0 5px;
		font-size: 14px;
		border-bottom: 1px solid #eee;
	}
  .borderpay{
    background-color: #FFFFFF;
    padding-top: 0.05rem;
    .card_cont{
      width: 88%;
      margin: 0.2rem auto;
      box-shadow: 1px 3px 6px 0px rgba(0,0,0,0.1);
      border-radius: 0.1rem;
      padding: 0.05rem 0;
      .card_cont_tit{
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        display: block;
        .card_img{
          display: inline-block;
          position: absolute;
          left:0.1rem ;
          top: 0.04rem;
          img{
            width: 0.32rem;
            height: 0.32rem;
						border-radius: 50%;
          }
        }
        .card_cont_txt{
          height: 0.4rem;
          padding-left: 0.52rem;
          line-height: 0.4rem;
          font-size: 0.16rem;
          span{
            font-size: 0.17rem;
            display: inline-block;
            padding-right: 0.1rem;
            color: #202020;
          }
        }
      }
      .card_cont_xq{
        padding: 0.1rem 0.15rem 0.1rem 0.52rem;
        .card_cont_xqwb{
          font-size: 0.145rem;
          color: #666666;
          line-height: 1.6;
        }
        .card_cont_btn{
          .mint-button{
            height: auto;
            font-size: 0.13rem;
            padding: 0.02rem 0 0.025rem 0;
            text-align: center;
            border-radius: 6px;
            width: 0.7rem;
          }
        }
      }
    }
  }

	.d-flex {
    display: -ms-flexbox!important;
    display: flex!important;
  }
  .justify-content-around {
    -ms-flex-pack: distribute!important;
    justify-content: space-around!important;
  }
  .justify-content-between {
    -ms-flex-pack: justify!important;
    justify-content: space-between!important;
  }
  .align-items-center {
    -ms-flex-align: center!important;
    align-items: center!important;
  }
  .flex-grow-1 {
    -ms-flex-positive: 1!important;
    flex-grow: 1!important;
  }

	// 隐藏日期列
	.my_datetime >>> .picker-items .picker-slot:nth-child(3){
		display: none;
	}
</style>
