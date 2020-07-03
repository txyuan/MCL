<template>
<div>
	<div>
	  <mt-header title="转入">
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	</div>
	<div class="refund_cont">
		<h3>可转入</h3>
		<input type="number" v-model="moneye" @input="cardconut" />
		<p>
			<label>可转入：¥{{amount}}</label>
			<i @click="alltx">全部转入</i>
		</p>
	</div>
	<div class="refund_sxfa">
		<p>
			<span>手续费：</span>
			<label>{{VerAServiceChargeVerB}}%</label>
		</p>
		<p>
			<span>实际转入金额：</span>
			<label>{{shdmoney}}</label>
		</p>
	</div>
	<div class="pay_stat">
		<div class="pay_states pay_zfba ayay">
			<img src="@/assets/images/bbanxl.png" />
			<p>B版</p>
		</div>
	</div>
	<div class="buttons">
		<mt-button type="default" class="add_btns" size="large" @click="txmony">转入</mt-button>
	</div>
</div>
</template>

<script>
    export default {
        name: "commission",
        data:()=>({
			moneye:1,  //qian
			amount:0,  //可转入金额
			shdmoney:0,  //实际转入金额
			VerAServiceChargeVerB:0  //手续费
        }),
        methods:{
          // A版转入B版的信息可转入
		  getAdrLists(){
		  	let url = "UserInterface/GetATransferInBInfo.ashx";
		  	this.$post(url).then((data)=>{
		  		if(data.rspcode != 1 ){
		  			return;
		  		}
		  		this.amount = data.data.amount;
				this.VerAServiceChargeVerB = data.data.VerAServiceChargeVerB;
				this.shdmoney=this.moneye-(Number(data.data.VerAServiceChargeVerB)*Number(this.moneye)/100).toFixed(2);
		  	})
		  },
		  // 监听money
		  cardconut(){
		  	if(Number(this.moneye)>Number(this.amount)){
		  		this.$Toast('可转入余额不足');
		  		return;
		  	}
		  	this.shdmoney=(this.moneye-(this.VerAServiceChargeVerB*this.moneye/100)).toFixed(2);
		  },
		  // 全部转入
		  alltx(){
			  this.moneye=this.amount;
			  this.shdmoney=(this.moneye-(this.VerAServiceChargeVerB*this.moneye/100)).toFixed(2);
		  },
		  // 转入
		  txmony(){
			  if((Number(this.moneye)<=0)||(this.moneye=='e')){
			  	this.$Toast('请输入有效的提现金额');
			  	return;
			  }
			  if(Number(this.moneye)>Number(this.amount)){
				  this.$Toast('可转入余额不足');
				  return;
			  }
			  this.$MessageBox.confirm('确定转入吗?').then(action => {
				  let url = "UserInterface/VerATransferInB.ashx";
				  let param={
					  amount:this.moneye,
					  ActualAmount:this.shdmoney
				  };
				  this.$post(url,param).then((data)=>{
					this.$Toast(data.rspdesc);
					if(data.rspcode != 1 ){
						return;
					}
					this.$router.push('/cardbA');
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
