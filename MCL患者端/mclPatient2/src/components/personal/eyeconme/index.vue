<template>
	<div>
		<div class="fix_top">
			<mt-header title="营养查看报告" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial;">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div style="padding-top: 43px;">
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" :isDefaultLoading="false">
				<div slot="content">
					<mt-cell v-for="(item,index) in list" :key="index" :title="item.ContactName" label="" is-link :to="`/nuteye?id=`+item.goodsId" class="borderBottom">
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
				flag:2
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
		}
	}
</script>

<style scoped lang="scss">
	
</style>
