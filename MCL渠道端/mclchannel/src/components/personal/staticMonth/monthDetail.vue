<template>
	<div class="achievement_root padding-header">
		<mt-header title="我的业绩" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>

		<div id="navbar" class="borderBottom">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick(1)">
					<p>筛查</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick(2)">
					<p>套餐</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick(3)">
					<p>单品</p>
				</mt-tab-item>
				<mt-tab-item id="tab3" @click.native="tabClick(5)">
					<p>年卡</p>
				</mt-tab-item>
			</mt-navbar>
		</div>

		<!-- tab-container -->
		<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
			<div slot="content">
				<mt-cell v-for="(item,index) in list" :title="item.RContactName" :label="item.RContactPhone" :key="index" class="borderBottom">
					<div class="right text-right">
						<span style="font-size: 0.13rem;">{{item.ProName}} <i style="color: #FF5355;font-style: normal;"> ￥{{item.OrderMoney}}</i></span>
						<span class="mint-cell-label">{{item.BuyTime}}</span>
					</div>
				</mt-cell>
			</div>
		</loadMore>
	</div>
</template>

<script>
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
export default {
  name: 'achievement',
  data: () => ({
    selected: 'tab0',
    pickerVisible: false,
    list: [],
    param: {
      'pagesize': 10,
      'pagecount': 0,
      'month': '',
      'flag': 1
      // "years": ""  // "" : 全部,  2019-06
    }
  }),
  methods: {
    // tab切换
    tabClick (val) {
      this.$Indicator.loading()
      this.param.flag = val
      this.reloadLoadMore()
      setTimeout(() => {
        this.$Indicator.close()
      }, 200)
    },
    // 重新加载
    reloadLoadMore () {
      this.param.pagecount = 0
      this.$refs.loadMoreE.getList()
    },
    // 获取列表
    getList (success) {
      let url = 'UserInterface/channel/ChannelMonthlyStatisticalReportDetail.ashx'
      if (this.param.pagecount == 1) {
        this.list = []
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspCode != 1) {
          return
        }
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
    const type = this.$route.query.type
    if (type) {
      this.tabClick(type)
      if (type == 2) {
        this.selected = 'tab1'
      } else if (type == 3) {
        this.selected = 'tab2'
      } else if (type == 5) {
        this.selected = 'tab3'
      }
    }
  },
  created () {
    this.param.month = this.$route.query.month
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
</style>
