<template>
	<div class="padding-header person_data_root">
		<div id="class_header" class="myassets">
			<mt-header title="资金记录" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div class="record_money">
			<div class="record_moneyl">
				<p @click="filterToggleFn(true)">本月</p>
			</div>
			<div class="record_moneyr">
				<p style="padding-top: 0.12rem;">支出 ¥{{expenditure}}</p>
				<p>收入 ¥{{income}}</p>
			</div>
		</div>
		<div id="navbar" class="borderBottom" style="margin-top: 0.06rem;">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('-1')">
					<p>全部</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('0')">
					<p>充值</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('1')">
					<p>消费</p>
				</mt-tab-item>
				<mt-tab-item id="tab3" @click.native="tabClick('2')">
					<p>提现</p>
				</mt-tab-item>
				<mt-tab-item id="tab4" @click.native="tabClick('3')">
					<p>收入</p>
				</mt-tab-item>
			</mt-navbar>
		</div>

		<div class="borderpay">
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
				<div slot="content">
					<mt-cell v-for="(item,index) in list" title="item.money" label="item.create_date" :key="index" class="borderBottom">
						<div class="right text-right">
							<span>{{item.remarks}}</span>
							<!-- <span class="mint-cell-label">{{item.create_date}}</span> -->
						</div>
					</mt-cell>
				</div>
			</loadMore>
		</div>
		
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="slots" style="background: #fff;" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfo">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	 import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	export default {
		name: "commission",
		data: () => ({
			selected: "tab0",
			count: 0, //拥有数量
			price: 0, //当前单价
			values: 0, //拥有价值
			expenditure:"", //支付
			income:"", //收入
			popupVisible: false, //是否显示日期picker
			list: [],
			param: {
				"pagesize": 10,
				"pagecount": 0,
				"month": "", //年月（举例：2019-09）
				"type": 1
			},
			slots: [{
				flex: 1,
				values: [],
				className: 'slot1',
				textAlign: 'right'
			}, {
				divider: true,
				content: '-',
				className: 'slot2'
			}, {
				flex: 1,
				values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				className: 'slot3',
				textAlign: 'left'
			}]
		}),
		methods: {
			// 显示日期
			filterToggleFn() {
				this.popupVisible = true;
			},
			// 日期确定
			editUserInfo() {
				const {
					sexPicker
				} = this.$refs;
				let years = sexPicker.getSlotValue(0);
				let month = sexPicker.getSlotValue(1);
				this.param.month = `${years}-${month}`
				this.tabClick(this.param.type);
				this.popupVisible = false;
			},
			// 取消日期
			pickerToggle(state) {
				this.popupVisible = false;
			},
			// 当前单价
			getAdrLists() {

			},
			//tab切换
			tabClick(val) {
				this.$Indicator.loading();
				this.param.type = val;
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
				setTimeout(() => {
					this.$Indicator.close()
				}, 200)
			},
			// 下面流水
			getList(success) {
			  let url = "UserInterface/channel/GetChannelCapitalRecordList.ashx";
			  if(this.param.pagecount == 1){
			    this.list = [];
			  }
			  this.$post(url,this.param).then((data)=>{
			    if(data.rspCode != 1 ){
			      return;
			    }
			    let modelList = data.data;
			    this.list = [...this.list,...modelList]
			    this.expenditure = data.expenditure;  //支付
			    this.income = data.expenditure;  //收入
			    //加载更多组件触发回调
			    if(success){
			      success(modelList,this.list)
			    }
			  })
			}
		},
		created() {
			//初始时间为2019年
			const year = new Date().getFullYear();
			for(let i = 2019; i<= year; i++){
				this.slots[0].values.push(i)
			}
		},
		mounted() {
			this.getAdrLists();
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
	
	.card_achieve {
		overflow: hidden;
		background: #fff;
		.card_alist {
			width: 33.33%;
			padding: 0.12rem 0;
			float: left;
			p {
				font-size: 0.14rem;
				color: #606060;
				text-align: center;
			}
			span {
				font-size: 0.3rem;
				color: #333333;
				text-align: center;
				display: block;
				padding: 0.06rem;
			}
		}
	}
	
	.shaixuan {
		height: 0.2rem;
		width: 0.2rem;
		margin-top: 0.08rem;
	}
	
	.record_money {
		height: 0.6rem;
		overflow: hidden;
		.record_moneyl {
			float: left;
			position: relative;
			width: 50%;
			height: 0.6rem;
			p {
				position: absolute;
				font-size: 0.14rem;
				color: #333;
				width: 0.42rem;
				height: 0.28rem;
				line-height: 0.28rem;
				padding: 0 0.12rem;
				background: #fff url(../../../assets/images/yuefen@2x.png) no-repeat 88% center;
				background-size: 0.16rem;
				border-radius: 6px;
				left: 0.2rem;
				top: 50%;
				margin-top: -0.14rem;
			}
		}
		.record_moneyr {
			float: left;
			width: 45%;
			padding-right: 5%;
			p {
				color: #888;
				font-size: 0.14rem;
				text-align: right;
				padding-top: 0.04rem;
			}
		}
	}
</style>
<style lang="scss">
	.person_data_root {
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
		.picker-item {
			text-align: center;
		}
	}
</style>