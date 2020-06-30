<template>
	<div class="padding-header">
		<div id="class_header" class="myassets">
			<mt-header title="我的余额" fixed class="borderBottom">
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
					<span>{{price}}</span>
				</div>
			</div>
		</div>

		<div id="navbar" class="borderBottom">
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
			</mt-navbar>
		</div>

		<div class="borderpay">
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
				<div slot="content">
					<mt-cell v-for="(item,index) in list" :title="item.money" :label="item.create_date" :key="index" class="borderBottom">
						<div class="right text-right">
							<span>{{item.remarks}}</span>
						</div>
					</mt-cell>
				</div>
			</loadMore>
		</div>
		<div class="buttons">
			<router-link to="/rechademon">
				<label>充值</label>
			</router-link>
		</div>

	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	export default {
		name: "commission",
		data: () => ({
			selected: "tab0",
			price: 0, //当前单价
			list: [],
			param: {
				"pagesize": 10,
				"pagecount": 0,
				"type": 1   //状态（//-1,全部;0,充值;1,消费）
			}
		}),
		methods: {
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
			// 列表
			getList(success) {
			  let url = "UserInterface/channel/GetUserBalanceList.ashx";
			  if(this.param.pagecount == 1){
			    this.list = [];
			  }
			  this.$post(url,this.param).then((data)=>{
			    if(data.rspCode != 1 ){
			      return;
			    }
			    let modelList = data.data;
			    this.list = [...this.list,...modelList]
			    this.price = data.current_amount
			    //加载更多组件触发回调
			    if(success){
			      success(modelList,this.list)
			    }
			  })
			}
		},
		mounted() {
			
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
			background: #FFDCDC;
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
					color: #FF3D3D;
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
			background: #FF3D3D;
			margin-top: 0.05rem;
			margin-left: 6%;
		}
	}
</style>