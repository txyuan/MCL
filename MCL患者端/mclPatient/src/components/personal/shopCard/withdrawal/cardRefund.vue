<template>
<div>
	<div>
	  <mt-header title="退卡提现">
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	</div>
	<div class="refund_cont">
		<h3>退卡数量 (张)</h3>
		<input type="text" v-model="cardCount" @input="inpcount()" />
		<span>退卡金额：<i>{{cardMoney}}</i>元</span>
		<p>
			<label>可退款张数：{{count}}张</label>
			<i @click="alltcard">全部退卡</i>
		</p>
	</div>
	<div class="refund_sxfa">
		<p>
			<span>手续费：</span>
			<label>{{serviceCharge}}</label>
		</p>
		<p>
			<span>实际到账金额 (元)：</span>
			<label>{{xsjmoney}}</label>
		</p>
		<p>
			<span>到账时间：</span>
			<label>2个工作日内，节假日顺延</label>
		</p>
	</div>
	<div class="pay_stat">
		<!-- <div class="pay_states pay_zsyh">
			<img src="@/assets/images/zsyh.png" />
			<p>
				<span>招商银行</span>
				<label>2312 **** **** **** 231</label>
			</p>
		</div> -->
		<div class="pay_states pay_zfba ayay">
			<img src="@/assets/images/zhifu_bao@2x.png" />
			<p>支付宝</p>
		</div>
	</div>
  <div class="buttons">
      <mt-button type="default" class="add_btns" size="large" @click="tcardmony">退卡提现</mt-button>
  </div>
  
</div>
</template>

<script>
    export default {
        name: "commission",
        data:()=>({
			cardCount:0,  //退卡数量
			cardMoney:0,  //退卡金额
			count:0,  //可提款的张数
			serviceCharge:'0%', //手续费比率
			service_charge:0,
			price:0,  //单价
			xsjmoney:0,//实际到账金额
			serviceChargePercent:0
        }),
        methods:{
          // 获得购物卡退卡提现信息
          getAdrLists(){
          	let url = "UserInterface/GetShoppingCardWithdrawInfo.ashx";
          	this.$post(url).then((data)=>{
          		if(data.rspcode != 1 ){
          			return;
          		}
          		this.count = data.data.count;
				this.serviceCharge = data.data.serviceChargePercent+'%';
				this.serviceChargePercent = data.data.serviceChargePercent/100;
				this.price = data.data.price;
          	})
          },
		  // 监听退卡数量
		  inpcount(){
			  this.cardMoney=(this.cardCount*this.price).toFixed(2);
			  this.xsjmoney=(this.cardMoney-(this.cardMoney*this.serviceChargePercent)).toFixed(2);
			  this.service_charge=(this.cardMoney*this.serviceChargePercent).toFixed(2);
		  },
		  // 全部退卡
		  alltcard(){
			  this.cardCount=this.count;
			  this.inpcount();
		  },
		  // 退卡提现
		  tcardmony(){
			  this.$MessageBox.confirm('确定退卡提现吗?').then(action => {
				  let url = "UserInterface/RefundedCardWithdraw.ashx";
				  let param={
					  "amount":this.cardMoney,
					  "count":this.cardCount,
					  "service_charge":this.service_charge,
					  "actual_arrival":this.xsjmoney
				  };
				  this.$post(url,param).then((data)=>{
					this.$Toast(data.rspdesc);
					if(data.rspcode != 1 ){
						return;
					}
					this.$router.push('/shopCard');
				  })
			  })
		  }
        },
        mounted(){
          this.getAdrLists();
        },
        components:{
          
        }
    }
</script>
<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .mint-cell.borderBottom{
    padding: 0.06rem 0;
    align-items: center;
    align-content: center;
  }
  .right.text-right{
    color: $color60;
    font-size: 0.15rem;
    &>span:nth-child(2){
      margin-top: 5px;
    }
  }
  .refund_cont{
	  width: 94%;
	  padding: 0.1rem 3% 0 3%;
	  background: #fff;
	  margin-top:0.08rem;
	  h3{
		  font-size: 0.15rem;
		  color: #333;
		  font-weight: normal;
	  }
	  input{
		  font-size: 0.28rem;
		  color: #333;
		  border: none;
		  display: block;
		  margin-top: 0.14rem;
	  }
	  span{
		  font-size: 0.15rem;
		  display: block;
		  color: #666;
		  padding-bottom: 0.06rem;
		  i{
			  font-style: normal;
			  color: #FF3D3D;
		  }
	  }
	  p{
		  height: 0.36rem;
		  line-height: 0.36rem;
		  border-top: 1px solid #eee;
		  font-size: 0.15rem;
		  overflow: hidden;
		  label{
			  float: left;
			  display: block;
			  color: #666666;
		  }
		  i{
			  float: right;
			  display: block;
			  color: #FF3D3D;
			  font-style: normal;
		  }
	  }
  }
  .refund_sxfa{
	  margin-top: 0.04rem;
	  padding: 0.06rem 3% 0.1rem 3%;
	  background: #fff;
	  p{
		  overflow: hidden;
		  font-size: 0.14rem;
		  color: #333;
		  margin-top: 0.04rem;
		  span{
			  display: block;
			  float: left;
			  width: 45%;
		  }
	  }
  }
  .pay_stat{
	  margin-top: 0.04rem;
	  background: #fff;
	  .pay_states{
		  height: 0.5rem;
		  overflow: hidden;
		  background: url('./../../../../assets/images/select@2x.png') no-repeat 97% center;
		  background-size: 0.2rem;
		  img{
			  height: 0.28rem;
			  display: block;
			  float: left;
			  margin-top: 0.11rem;
			  margin-left: 3%;
		  }
		  p{
			  font-size: 0.12rem;
			  float: left;
			  margin: 0.11rem 0 0 3%;
			  span{
				  display: block;
				  color: #32312E;
			  }
			  label{
				  display: block;
				  color: #666;
				  margin-top: 0.02rem;
			  }
		  }
		  &.ayay{
			  background: url('./../../../../assets/images/select_click@2x.png') no-repeat 97% center;
			  background-size: 0.2rem;
		  }
	  }
	  .pay_zfba {
		  border-top: 1px solid #eee;
		  p{
			  line-height: 0.5rem;
			  font-size: 0.15rem;
			  color: #2C2B29;
			  margin-top: 0;
		  }
	  }
  }
</style>
