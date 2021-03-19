<template>
	<div>
		<div class="fix_top">
			<mt-header :title="title" class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial;">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>

			<!-- mt-navbar -->
			<div id="navbar">
				<mt-navbar class="navbar">
					<mt-tab-item id="" v-for="item in tabs" :key="item.type" :class="(param.status == item.type) && 'is-selected'"
					 @click.native="tab(item.type)">
						<p>{{item.name}}</p>
					</mt-tab-item>
				</mt-navbar>
			</div>
		</div>

		<div id="content" style="padding-top: 0.87rem">
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE">
			<mt-tab-container slot="content">
				<mt-tab-container-item>
					<div class="product_item" v-for="(item,index) in list" :key="index" :item="item">
						<div class="title">
							<div class="logistics_number" v-if="item.logistics_number">{{item.logistics_number}}</div>
							<!-- <span class="express">{{item.buyTime}}</span> -->
							<span class="dateType">{{item.stateText}}</span>
						</div>
						<productItem :itemData="item"/>
						<div class="foot">
							<div class="row">
								<!-- <div class="logisticsInfo">合计：
									<span class="themeRed">¥ {{item.orderMoney}}</span>
								</div> -->
								<div class="btn-group">
									<div style="overflow: hidden;">
										<!--<div class="f-btn ok laood" style="float: left;" @click="eyemoy(item,3)">
											<span>查看物流</span>  
										</div>-->
										<div v-if="item.BuyState == '0'" class="f-btn ok laood f-btn-default" style="float: left;" @click="$router.push(`/refund?orderkey=${item.orderId}`)">
											<span>申请退款</span>
										</div>
										<div v-if="item.state == '1'" class="f-btn ok" style="float: left;" @click="shopsh(item)">
											<span>确认收货</span>
										</div>
									</div>
									<!-- <div v-else-if="item.state  == '2'" style="overflow: hidden;">
										<div class="f-btn ok laood" style="float: left;" @click="delmoy(item,3)">
											<span>删除订单</span>
										</div> 
										<div class="f-btn ok laood" style="float: left;" @click="eyemoy(item,3)">
											<span>查看物流</span>
										</div>
										<div class="f-btn ok" style="float: left;" @click="againsh(item)">
											<span>再次购买</span>
										</div>
									</div>-->
								</div>
							</div>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
			</loadMore>
		</div>

	</div>
</template>

<script>
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
import productItem from './productOrderItem.vue' // 商品列表
export default {
  name: 'index',
  data: () => ({
	isLoad: false, // 是否加载过接口
	title: '',
    selected: 'tab-container1',
    tabs: [{
      name: '全部',
      type: '-1'
    }, {
      name: '待发货',
      type: '0'
    }, {
      name: '已发货',
      type: '1'
    }, {
      name: '已收货',
      type: '2'
    }], //
    param: {
      pagesize: 10,
      pagecount: 0,
      status: '-1',
	  orderType: '3' // 2：管理套餐；3：商品订单
    },
    orderkey: '', // 提货使用到的商品key
    list: []
  }),
  methods: {
    tab (val) {
	  this.setPage()
      this.$Indicator.loading()
      this.param.status = val
      this.param.pagecount = 0
      this.$refs.loadMoreE.getList() // 触发加载更多
      setTimeout(() => {
        this.$Indicator.close()
      }, 200)
    },
    // 所得商品列表
    shoplist (success) {
      let url = 'UserInterface/ProductOrderDetailInfoList.ashx'
      if (this.param.pagecount == 1) {
        this.list = []
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
		this.isLoad = true
        let modelList = data.goodsList
        this.list = [...this.list, ...modelList]
        // 加载更多组件触发回调
        if (success) {
          success(modelList, this.list)
        }
      })
    },
    // 取消订单
    // delmoy (item, protype) {
    //   this.$Indicator.loading()
    //   let url = 'UserInterface/DeleteOrderInfo.ashx'
    //   let param = {
    //     orderskey: item.orderId
    //   }
    //   this.$post(url, param).then((data) => {
    //     this.$Indicator.close()
    //     if (data.rspcode != 1) {
    //       this.$Toast(data.rspdesc)
    //       return
    //     }
    //     this.$Toast('删除订单成功')
    //     this.tab(this.param.status)
    //   })
    // },
    //  确认收货
    shopsh (item) {
      this.$Indicator.loading()
      let url = 'UserInterface/order/ConfirmOrder.ashx'
      let param = {
        sKey: item.orderId,
        flag: 2
      }
      this.$post(url, param).then((data) => {
        this.$Indicator.close()
        if (data.rspCode != 1) {
          this.$Toast(data.rspdesc)
          return
        }
        this.$Toast('确认收货成功')
        this.tab(this.param.status)
      })
    },
	setPage(){
	  const query = this.$route.query
	  this.param.orderType = query.orderType
	  if(this.param.orderType == 2){
		this.title = '管理套餐'
	  }
	  if(this.param.orderType == 3){
		this.title = '商品订单'
	  }
	}
  },
  beforeRouteEnter (to, form, next) {
    next((vm) => {
      // 解锁加载更多
      vm.$refs.loadMoreE.isLock = true
      // 从详情页面返回，列表接口如果没有被加载过，需要加载接口
      if (form.name === 'refund' && !vm.isLoad) {
        vm.tab('-1')
      }
      // 非详情页面进来
      if (form.name !== 'refund') {
        vm.tab('-1')
      }
    })
  },
  beforeRouteLeave (to, form, next) {
    // 去详情页面，关锁加载更多
    if (to.name === 'refund') {
      this.$refs.loadMoreE.isLock = false
    }
    next()
  },
  components: {
    productItem,
    loadMore
  }
}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	#mark {
		.content {
			color: $color66;
			padding: 7px 15px;
			background: #FFF;
			font-size: 0.14rem;
		}

		.content li {
			width: 33.33%;
			box-sizing: border-box;
			padding: 5px;
		}

		.content li.active .item {
			background: $themeColor2;
			color: $themeColor;
			border-color: $themeColor2;
		}

		.content li .item {
			border: 1px solid $boderE;
			line-height: 30px;
			border-radius: 2px;
		}
	}
	.product_item{
		background: #FFF;
		border-radius: 0.1rem;
		margin-top: 0.1rem;
		.title{
			overflow: hidden;
			padding: 0.1rem 0;
			margin: 0 0.1rem;
			border-bottom: 1px solid #e1e1e1;
			font-size: 0.14rem;
			.logistics_number{float: left;}
			.dateType{float: right;display: block;color: #999;}
		}
	}
	.product_row{
		padding-top: 0.2rem !important;
		padding-bottom: 0.2rem !important;
	}
	.foot {
		font-size: 0.14rem;
		color: $color60;
		.row{
			overflow: hidden;
		}
		.f-btn {
			width: 0.72rem;
			height: 0.26rem;
			line-height: 0.26rem;
			text-align: center;
			box-sizing: border-box;
			border-radius: 0.13rem;
			margin-bottom: 0.15rem;
			margin-right: 0.1rem;
			font-size: 0.14rem;
			span {
				/*vertical-align: middle;*/
			}

			&.default {
				background: #FFFFFF;
				border: 1px solid $boderE;
			}

			&.ok {
				background: $themeColor;
				span {
					color: white;
				}
			}

			&.laood {
				background: #fff;
				border: 1px solid $themeColor;
				box-sizing: border-box;

				span {
					color: $themeColor;
				}
			}
		}

		.btn-group {
			float: right;
		}
	}

	.shaixuan {
		height: 0.2rem;
		width: 0.2rem;
		margin-top: 0.08rem;
	}

	.myc_adress {
		z-index: 99999;
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(000, 000, 000, 0.5);
	}

	.myc_cadress {
		width: 100%;
		height: 4.6rem;
		background: #fff;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.myc_chose {
		width: 100%;
		height: 0.44rem;
		border-bottom: 1px solid #EEEEEE;
		position: relative;
	}

	.myc_chose p {
		text-align: center;
		line-height: 0.45rem;
		font-size: 0.15rem;
		color: #666;
	}

	.myc_chose span {
		display: block;
		width: 0.2rem;
		height: 0.2rem;
		position: absolute;
		right: 3%;
		top: 0.12rem;
		background: url("https://resource.jtsc.club/bianji_car_quxiao@2x.png") no-repeat center center;
		background-size: 0.14rem 0.14rem;
	}

	.myc_adul {
		height: 3.4rem;
		overflow-y: auto;
	}

	.myc_adlist {
		overflow: hidden;
		height: 0.7rem;
		border-bottom: 1px solid #eee;
		background: url("https://resource.jtsc.club/jiantou_right_h@2x.png") no-repeat 97% center;
		background-size: 0.24rem 0.24rem;
	}

	.myc_adlist .myc_actv {
		width: 0.44rem;
		height: 0.7rem;
		display: block;
		float: left;
		background: url("https://resource.jtsc.club/select@2x.png") no-repeat center center;
		background-size: 0.18rem 0.18rem;
	}

	.myc_adlist .myc_actv.myc_actve {
		background: url("https://resource.jtsc.club/select_click@2x.png") no-repeat center center;
		background-size: 0.18rem 0.18rem;
	}

	.myc_acont p {
		overflow: hidden;
		font-size: 0.15rem;
		color: #333;
		margin-top: 0.13rem;
	}

	.myc_acont p i {
		font-style: normal;
		margin-left: 0.1rem;
	}

	.myc_acont p label {
		width: 0.5rem;
		height: 0.18rem;
		border: 1px solid #FF3D3D;
		font-size: 0.12rem;
		color: #FF3D3D;
		text-align: center;
		line-height: 0.19rem;
		float: right;
		display: none;
		margin-right: 0.4rem;
	}

	.myc_acont p label.mra {
		display: block;
	}

	.myc_acont u {
		text-decoration: none;
		font-size: 0.13rem;
		color: #666;
		margin-top: 0.07rem;
		display: block;
	}

	.myc_addadrs {
		font-size: 0.15rem;
		color: #FF3D3D;
		text-align: center;
		line-height: 0.36rem;
	}

	.myc_okbtn {
		width: 88%;
		background: #FF3D3D;
		height: 0.4rem;
		display: block;
		text-align: center;
		line-height: 0.4rem;
		color: #FFFFFF;
		font-size: 0.16rem;
		position: absolute;
		border-radius: 0.2rem;
		margin: 0 auto;
		left: 50%;
		margin-left: -44%;
		bottom: 0.2rem;
	}

	.myc_adliets {
		width: 94%;
		padding: 0 3%;
		height: 0.44rem;
		border-bottom: 1px solid #eee;
		overflow: hidden;
		font-size: 0.15rem;
	}

	.myc_adliets span {
		display: block;
		width: 0.6rem;
		line-height: 0.44rem;
		float: left;
		color: #202020;
		text-align: right;
		margin-right: 5%;
	}

	.myc_adliets label {
		display: block;
		width: 60%;
		float: left;
		line-height: 0.44rem;
		color: #FF3D3D;
	}

	.myc_adliets input {
		display: block;
		width: 60%;
		float: left;
		border: none;
		height: 0.44rem;
		font-size: 0.14rem;
	}

	.myc_admarg {
		border-top: 9px solid #FAFAFA;
	}

	.myc_addadrs a {
		color: #FF3D3D;
	}
	.f-btn-default{
		border-color: #999 !important;
		span{
			color: #999 !important;
		}
	}
	.navbar{
		border-bottom-left-radius: 0.1rem;
		border-bottom-right-radius: 0.1rem;
	}


</style>
