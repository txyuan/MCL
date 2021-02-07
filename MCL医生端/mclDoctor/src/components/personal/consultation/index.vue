<template>
	<div class="padding-header">
		<div id="class_header" class="myassets">
			<mt-header title="咨询服务" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div class="card_money">
			<div class="card_num">
				<div class="card_miy">
					<span>{{allmoney}}</span>
				</div>
			</div>
		</div>

		<!-- <div id="navbar" class="borderBottom">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('0')">
					<p>团队服务</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('1')">
					<p>社区服务</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('2')">
					<p>患者服务</p>
				</mt-tab-item>
			</mt-navbar>
		</div> -->

		<div class="borderpay">
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class=""> <!-- padding-footer -->
				<div slot="content">
					<mt-cell v-for="(item,index) in list" :title="item.money" :label="item.create_date" :key="index" class="borderBottom">
						<div class="right text-right">
							<span>{{item.remarks}}</span>
							<span class="mint-cell-label">{{item.nickname}}</span>

						</div>
					</mt-cell>
				</div>
			</loadMore>
		</div>
		<!-- <div class="buttons">
			<router-link to="/cardRefund">
				<label>提现</label>
			</router-link>
		</div> -->

	</div>
</template>

<script>
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
export default {
  name: 'commission',
  data: () => ({
    selected: 'tab0',
    allmoney: 0, // 拥有数量
    list: [],
    param: {
      'pagesize': 10,
      'pagecount': 0
    }
  }),
  methods: {
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
      let url = 'UserInterface/doctor/ServiceChargeInfo.ashx'
      if (this.param.pagecount == 1) {
        this.list = []
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.allmoney = data.totalservicecharge
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
</style>
