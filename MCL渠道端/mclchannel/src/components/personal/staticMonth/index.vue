<template>
	<div class="padding-header smont">
		<mt-header title="绩效统计" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<!-- tab-container -->
		<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
			<div slot="content">
				<router-link v-for="(item,index) in list" :key="index" :to="'/monthDetail?month='+item.month">
					<mt-cell :title="item.user_name" :label="item.month" class="borderBottom">
						<div class="right text-right">
							<span style="font-size: 0.13rem;">{{item.money}} <i style="color: #FF5355;font-style: normal;">({{item.status}})</i></span>
							<span class="mint-cell-label">{{item.create_date}}</span>
						</div>
					</mt-cell>
				</router-link>
			</div>
		</loadMore>
	</div>
</template>

<script>
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
export default {
  name: 'index',
  data: () => ({
    list: [],
    param: {
      'pagesize': 10,
      'pagecount': 0
    }
  }),
  methods: {
    // 获取列表
    getList (success) {
      let url = 'UserInterface/channel/ChannelMonthlyStatisticalReportList.ashx'
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
  components: {
    loadMore
  }
}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";
</style>
<style>
	.smont .mint-cell-text{
		color: #333;
	}
</style>
