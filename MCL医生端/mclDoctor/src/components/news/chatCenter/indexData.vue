<template>
	<div>
		<div class="fix_top">
			<mt-header fixed title="营养筛查报告">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
		</div>
		<div style="padding-top:0.44rem;">
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" :isDefaultLoading="false">
				<div slot="content" class="indexData">
					<mt-cell v-for="(item,index) in list" :key="index" :title="item.ContactName" label="" is-link :to="`/indexDataDet?id=`+item.goodsId+`&patientskey=`+param.patientskey" class="borderBottom">
						<div class="right text-right">
							<span>{{item.buyTime}}</span>
							<!-- <span class="mint-cell-label"></span> -->
						</div>
					</mt-cell>
				</div>
			</loadMore>
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "index",
		data: () => ({
			param: {
				pagesize: 10,
				pagecount: 0,
				orderType: 1,  //（1：营养筛查，2：管理套餐，3：商品订单，4：会员卡订单）
				flag:2,
				patientskey:''
			},
			list:[]
		}),
		methods:{
			getList(success) {
				let url = "UserInterface/OrderDetailInfoList.ashx";
				if (this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.goodsList;
					this.list = [...this.list, ...modelList]
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
		},
		mounted(){
			this.param.pagecount = 0;
			this.$refs.loadMoreE.getList();
		},
		components: {
			loadMore
		},
		created() {
			this.param.patientskey = this.$route.query.skey;
		}
	}
</script>

<style scoped lang="scss">
  .mint-header {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .indexData{
    margin-top: 0.1rem;
  }
</style>
<style lang="scss">
  .indexData{

    .mint-cell{
      background:#FFFFFF url("../../../assets/images/zijinjilu@2x.png") no-repeat 0.12rem center;
      background-size:0.2rem;
      padding-left: 0.32rem;
    }
    .mint-cell-title{
      font-size: 0.15rem;
      span{
        font-size: 0.15rem;
      }
    }
    .mint-cell-value{
      font-size: 0.14rem;
      span{
        font-size: 0.14rem;
      }
    }
  }
</style>
