<template>
	<div>
		<mt-header fixed title="订单详情">
		  <div slot="left">
			<header-back>
			  <mt-button icon="back"></mt-button>
			</header-back>
		  </div>
		</mt-header>
		<div class="order_cont">
			<h3>订单信息</h3>
			<ul>
				<li>
					<span>订单号：</span>
					<p>{{orderinfo.orderid}}</p>
				</li>
				<li>
					<span>下单时间：</span>
					<p>{{orderinfo.buytime}}</p>
				</li>
				<li>
					<span>付款时间：</span>
					<p>{{orderinfo.paymenttimes}}</p>
				</li>
				<li>
					<span>订单状态：</span>
					<p style="color: #FF3D3D;">{{orderinfo.state}}</p>
				</li>
			</ul>
			<h3>商品信息</h3>
			<div class="shop_inform">
				<div class="shop_informs">
					<img :src="goodinfo.goodsimages" />
					<div class="shop_spa">
						<h4>{{goodinfo.goodsname}}</h4>
						<p>
							<span>¥{{goodinfo.showprice}}</span>
							<label>数量：×{{goodinfo.buycoun}}</label>
						</p>
					</div>
				</div>
				<p class="shop_money">订单合计：<span>¥{{goodinfo.ordermoney}}</span></p>
			</div>
			<h3>用户信息</h3>
			<ul>
				<li>
					<span>收货姓名：</span>
					<p>{{goodinfo.receiptname}}</p>
				</li>
				<li>
					<span>手机号码：</span>
					<p>{{goodinfo.phonenumber}}</p>
				</li>
				<li>
					<span>收货地址：</span>
					<p>{{goodinfo.receivingaddress}}</p>
				</li>
			</ul>
		</div>
		<div class="buttons">
			<router-link :to="`/orderShip??key=${$route.query.key}`">
				<label>发货</label>
			</router-link>
		</div>
		
	</div>
</template>

<script>
	export default {
	    name: "order-details",
		data:()=>({
			orderinfo:{
				orderid: "", //订单号
				buytime: "", //下单时间
				paymenttimes:"", //付款时间
				state:"", //订单状态
			},
			goodinfo:{
				goodsimages: "", //产品图片
				goodsname: "", //产品名称
				showprice: "", //产品单价价格
				buycoun: "", //产品数量
				ordermoney: "", //产品总价
			},
			receiptinfo:{
				receiptname: "", //收货姓名
				phonenumber: "", //手机号码
				receivingaddress: "", //收货地址
			}
		}),
		methods:{
			getInfo(){
				let url = "UserInterface/channel/SelectDeliverGoods.ashx";
	            let param = {
	            	orderskey: this.$route.query.key
	            }
	            this.$post(url,param).then((data)=>{
	              if(data.rspcode != 1 ){
	                return;
	              }
	              let modelList = data.goodsList;
	              const {orderinfo, goodinfo, receiptinfo} = data;
	              this.orderinfo = orderinfo;
	              this.goodinfo = goodinfo;
	              this.receiptinfo = receiptinfo;
	            })
			}
		},
		mounted:function(){
			this.getInfo()
		}
	}
</script>

<style scoped lang="scss">
	.order_cont{
		padding-bottom: 0.6rem;
		padding-top: 43px;
		h3{
			padding: 0 5%;
			height: 0.44rem;
			line-height: 0.44rem;
			font-weight: 400;
			font-size: 0.15rem;
			color: #666;
		}
		ul{
			li{
				height: 0.4rem;
				background: #fff;
				padding: 0 5%;
				font-size: 0.13rem;
				line-height: 0.4rem;
				overflow: hidden;
				border-bottom: 1px solid #DBDBDB;
				span{
					display: block;
					float: left;
					color: #666;
					width: 0.8rem;
				}
				p{
					float: left;
					color: #333;
				}
			}
		}
	}
	.shop_inform{
		background: #fff;
		.shop_informs{
			padding: 0.14rem 4%;
			border-bottom: 1px solid #DBDBDB;
			background: url(../../../assets/images/jiantou@2x.png) no-repeat 97% center;
			background-size: 0.26rem;
			overflow: hidden;
			img{
				height: 0.76rem;
				float: left;
			}
			.shop_spa{
				float: left;
				width: 70%;
				margin-left: 0.1rem;
				h4{
					font-size: 0.14rem;
					color: #333;
					width: 100%;
					line-height: 0.2rem;
					padding-top: 0.02rem;
					font-weight: normal;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
					-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
					-webkit-line-clamp: 2; /** 显示的行数 **/
					overflow: hidden;  /** 隐藏超出的内容 **/
				}
				p{
					padding-top: 0.08rem;
					span{
						font-size: 0.18rem;
						color: #F78335;
					}
					label{
						font-size: 0.12rem;
						color: #666;
						margin-left: 0.14rem;
					}
				}
			}
		}
		.shop_money{
			height: 0.46rem;
			line-height: 0.46rem;
			padding: 0 4%;
			font-size: 0.14rem;
			color: #333;
			border-bottom: 1px solid #DBDBDB;
			span{
				color: #F78335;
			}
		}
	}
	.buttons{
	  overflow: hidden;
	  label{
		  width: 88%;
		  height: 0.4rem;
		  display: block;
		  font-size: 0.15rem;
		  color: #fff;
		  text-align: center;
		  line-height: 0.4rem;
		  margin: 0 auto;
		  border-radius: 0.2rem;
		  background: #FF3D3D;
		  margin-top: 0.05rem;
	  }
	}
	
</style>
