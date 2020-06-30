<template>
  <div style="background: #fff;min-height: 100vh;">
    <div id="class_header" class="myassets">
      <mt-header title="卡号管理" fixed class="borderBottom">
    	<div slot="left">
    	 <router-link to="/wx_Entrance/personal"  style="color: initial">
    		 <mt-button icon="back"></mt-button>
    	 </router-link>
    	</div>
      </mt-header>
    </div>
	<div class="bankc_ul">
		<loadMore :param="param" @triggerGetList="getbankcard" ref="loadMoreE">
				<div slot="content">
					<div class="bankc_list" v-for="(item,index) in list" :key="index">
						<div class="bankc_li">
							<p>{{item.bankcard}}</p>
						</div>
					</div>
				</div>
			</loadMore>
	</div>
	<router-link to="/addcard"><span class="addbc">+ 添加银行卡</span></router-link>
  </div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
  export default {
	name: "index",
    data:()=>({
      param: {
				pagecount: 0,
				pagesize: 10
			},
			list: []
    }),
    methods: {
			getbankcard(success) {
				let url = "UserInterface/BankCardUserInfo.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
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
			}
		},
		components: {
			loadMore
		}
  }
</script>

<style lang="scss" scoped>
  .bankc_ul{
	  padding-top:43px;
	  .bankc_list{
		  width: 92%;
		  margin: 0 auto;
		  height: 1.32rem;
		  background: url(../../../assets/images/beijingyinhang.png) no-repeat center center;
			background-size: 100%;
		  border-radius: 6px;
		  margin-top: 0.1rem;
		  p{
			  color: #fff;
			  font-size: 0.24rem;
			  padding: 0.74rem 0 0 8%;
		  }
	  }
  }
  .addbc{
	  display: block;
	  width: 80%;
	  margin: 0 auto;
	  height: 0.46rem;
	  border: 1px solid #4A8EF4;
	  text-align: center;
	  line-height: 0.46rem;
	  font-size: 0.16rem;
	  color: #4A8EF4;
	  border-radius: 0.25rem;
	  margin-top: 0.5rem;
  }
</style>