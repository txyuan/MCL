<template>
	<div class="padding-header person_data_root">
		<div id="class_header" class="myassets">
			<mt-header title="管理服务" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
				<!-- <div slot="right">
					<img class="shaixuan" @click="filterToggleFn(true)" src="@/assets/images/rili@2x.png" />
				</div> -->
			</mt-header>
		</div>
		<div class="card_money">
			<div class="card_num">
				<div class="card_miy">
					<span>{{price}}</span>
				</div>
			</div>
			<p>
				<label>金额</label>
				<label>患者</label>
				<label>医生</label>
			</p>
		</div>
		<!-- <div class="card_achieve">
			<div class="card_alist">
				<p>个人业绩</p>
				<span>1000</span>
			</div>
			<div class="card_alist">
				<p>团队业绩</p>
				<span>1000</span>
			</div>
			<div class="card_alist">
				<p>社区业绩</p>
				<span>1000</span>
			</div>
		</div> -->
		<!-- <div id="navbar" class="borderBottom" style="margin-top: 0.06rem;">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('1')">
					<p>个人业绩</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('2')">
					<p>团队业绩</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('3')">
					<p>社区业绩</p>
				</mt-tab-item>
			</mt-navbar>
		</div> -->

		<div class="borderpay">
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
				<div slot="content">
					<div class="data_list" v-for="(item,index) in list" :key="index">
						<p>
							<label>{{item.money}}</label>
							<label>{{item.remarks}}</label>
							<label>{{item.nickname}}</label>
						</p>
						<span>{{item.create_date}}</span>
					</div>
					<!-- <mt-cell v-for="(item,index) in list" :title="item.money" :label="item.create_date" :key="index" class="borderBottom">
						<div class="right text-right">
							<span>{{item.remarks}}</span>
							<span class="mint-cell-label">{{item.create_date}}</span>
						</div>
					</mt-cell> -->
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
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
export default {
  name: 'commission',
  data: () => ({
    selected: 'tab0',
    price: 0, // 总业绩
    popupVisible: false, // 是否显示日期picker
    list: [],
    param: {
      'pagesize': 10,
      'pagecount': 0
    },
    slots: [{
      flex: 1,
      values: ['2015', '2016', '2017', '2018', '2019', '2020'],
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
    filterToggleFn () {
      this.popupVisible = true
    },
    // 日期确定
    editUserInfo () {
      const {
        sexPicker
      } = this.$refs
      let years = sexPicker.getSlotValue(0)
      let month = sexPicker.getSlotValue(1)
      this.popupVisible = false
    },
    // 取消日期
    pickerToggle (state) {
      this.popupVisible = false
    },
    // 当前单价
    getAdrLists () {

    },
    // tab切换
    tabClick (val) {
      this.$Indicator.loading()
      this.param.type = val
      this.param.pagecount = 0
      this.$refs.loadMoreE.getList()
      setTimeout(() => {
        this.$Indicator.close()
      }, 200)
    },
    // 下面流水
    getList (success) {
      let url = 'UserInterface/doctor/GetTotalServiceList.ashx'
      if (this.param.pagecount == 1) {
        this.list = []
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.price = data.total_performance
        let modelList = data.data
        this.list = [...this.list, ...modelList]
        // 加载更多组件触发回调
        if (success) {
          success(modelList, this.list)
        }
      })
    }
  },
  mounted () {
    this.getAdrLists()
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

	.card_money {
		h4 {
			height: 0.36rem;
			background: #ED462F;
			color: #fff;
			font-size: 0.14rem;
			font-weight: normal;
			line-height: 0.36rem;
			padding: 0 3%;
		}

		.card_num {
			background: #D2E4FE;
			overflow: hidden;
			padding: 0.24rem 0;

			.card_miy {
				float: left;
				width: 100%;

				span {
					// width: ;
					display: block;
					text-align: center;
					font-size: 0.36rem;
					color: #4A8EF4;
					padding: 0.06rem 0 0.04rem 0;
				}
			}
		}
		p{
			overflow: hidden;
			background: #fff;
			padding: 0.1rem 3%;
			border-bottom: 1px solid #ddd;
			font-size: 0.15rem;
			color: #333;
			label{
				float: left;
				display: block;
				width: 33.33%;
				&:nth-child(2){
					text-align: center;
				}
				&:nth-child(3){
					text-align: right;
				}
			}
		}
	}
	.data_list{
		background: #fff;
		padding: 0.1rem 3%;
		border-bottom: 1px solid #eee;
		p{
			overflow: hidden;
			font-size: 0.14rem;
			label{
				float: left;
				display: block;
				width: 33.33%;
				&:nth-child(2){
					text-align: center;
					color: #666;
				}
				&:nth-child(3){
					text-align: right;
					color: #666;
				}
			}
		}
		span{
			font-size: 0.13rem;
			color: #666;
			padding-top: 0.06rem;
			display: block;
		}
	}
	.buttons {
		overflow: hidden;

		label {
			width: 88%;
			float: left;
			height: 0.4rem;
			display: block;
			font-size: 0.15rem;
			color: #fff;
			text-align: center;
			line-height: 0.4rem;
			border-radius: 0.2rem;
			background: #4A8EF4;
			margin-top: 0.05rem;
			margin-left: 6%;
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
