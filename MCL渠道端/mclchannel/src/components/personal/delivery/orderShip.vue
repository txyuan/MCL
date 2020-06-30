<template>
	<div>
		<mt-header fixed title="订单发货">
		  <div slot="left">
			<header-back>
			  <mt-button icon="back"></mt-button>
			</header-back>
		  </div>
		</mt-header>
		<div class="order_cont">
			<h3>物流信息</h3>
			<ul>
				<li>
					<span>选择物流：</span>
					<select v-model="param.logisticsname">
						<option v-for="(item, index) in wList" :key="index" :value="item.skey">{{item.logisticsname}}</option>
					</select>
				</li>
				<li>
					<span>填写物流单号：</span>
					<input type="text" v-model.trim="param.logisticsno"/>
				</li>
			</ul>
		</div>
		<div class="buttons">
			<label @click="submit">确认保存</label>
		</div>
	</div>
</template>

<script>
	export default {
	    name: "order-ship",
		data:()=>({
			wList: [],
			param:{
				orderskey: "",  //订单主键
				logisticsname: "",  //物流名称
				logisticsno: "",  //物流单号
			}
		}),
		methods:{
			//物流信息
			getWList(){
				let url = "UserInterface/channel/LogisticsInfo.ashx";
	            this.$post(url).then((data)=>{
	              if(data.rspCode != 1 ){
	                return;
	              }
	              let modelList = data.data;
	              this.wList = modelList;
	              this.param.logisticsname = modelList[0].skey;
	            })
			},
			//保存 
			submit(){
				if(this.param.logisticsno == ""){
					this.$Toast("请填写物流单号")
					return
				}
				let url = "UserInterface/channel/ConfirmShipment.ashx";
	            this.$post(url, this.param).then((data)=>{
	              if(data.rspcode != 1 ){
	                return;
	              }
	              this.$Toast("保存成功")
	              this.$router.back()
	            })
			}
		},
		mounted:function(){
			//物流信息
			this.getWList()
			//设置订单key
			this.param.orderskey = this.$route.query.key;
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
					width: 1.1rem;
				}
				select{
					width: 60%;
				}
				input{
					width: 50%;
					padding: 0 2%;
				}
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
