<template>
<div>
	<div>
	  <mt-header title="提现">
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	</div>
	<div class="refund_cont">
		<h3>提现</h3>
		<div class="refund_inpt"><span>￥</span><input type="text" v-model="cardCount" @input="inpcount()" /></div>
		<p>
			<label>可提现金额：¥3000</label>
			<i @click="alltcard">全部提现</i>
		</p>
	</div>
	<div class="pay_stat">
		<div class="pay_states pay_zsyh">
			<img src="@/assets/images/zsyh.png" />
			<p>
				<span>招商银行</span>
				<label>2312 **** **** **** 231</label>
			</p>
		</div>
	</div>
  <div class="buttons">
      <mt-button type="default" class="add_btns" size="large" @click="tcardmony">提现</mt-button>
  </div>
  
</div>
</template>

<script>
    export default {
        name: "card-refund",
        data:()=>({
			
        }),
        methods:{
          // 获得购物卡退卡提现信息
          getAdrLists(){
          	
          },
		  // 监听退卡数量
		  inpcount(){
			  
		  },
		  // 全部退卡
		  alltcard(){
			  
		  },
		  // 退卡提现
		  tcardmony(){
// 			  this.$MessageBox.confirm('确定退卡提现吗?').then(action => {
// 				  let url = "UserInterface/RefundedCardWithdraw.ashx";
// 				  let param={
// 					  "amount":this.cardMoney,
// 					  "count":this.cardCount,
// 					  "service_charge":this.service_charge,
// 					  "actual_arrival":this.xsjmoney
// 				  };
// 				  this.$post(url,param).then((data)=>{
// 					this.$Toast(data.rspdesc);
// 					if(data.rspcode != 1 ){
// 						return;
// 					}
// 					this.$router.push('/shopCard');
// 				  })
// 			  })
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
	  .refund_inpt{
		  overflow: hidden;
		  margin-top: 0.14rem;
		  margin-bottom: 0.1rem;
		  color:#3A3A3A;
		  span{
			  display: block;
			  float: left;
			  font-size: 0.3rem;
		  }
		  input{
			  width: 80%;
			  font-size: 0.3rem;
			  color: #3A3A3A;
			  border: none;
			  float: left;
			  display: block;
		  }
	  }
	  p{
		  height: 0.44rem;
		  line-height: 0.44rem;
		  border-top: 1px solid #eee;
		  font-size: 0.15rem;
		  overflow: hidden;
		  label{
			  float: left;
			  display: block;
			  color: #717171;
		  }
		  i{
			  float: right;
			  display: block;
			  color: #4A8EF4;
			  font-style: normal;
		  }
	  }
  }
  .pay_stat{
	  margin-top: 0.04rem;
	  background: #fff;
	  .pay_states{
		  height: 0.54rem;
		  overflow: hidden;
		  background: url('../../../assets/images/next.png') no-repeat 97% center;
		  background-size: 0.2rem;
		  img{
			  height: 0.32rem;
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
				  margin-top: 0.04rem;
			  }
		  }
	  }
  }
</style>
