<template>
<div>
	<div>
	  <mt-header :title="editionab">
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	</div>
	<div class="refund_cont">
		<h3>提现</h3>
		<input type="number" v-model="rmoney" @input="cardconut" />
		<!-- <span>退卡金额：<i>3400</i>元</span> -->
		<p>
			<label>最低提现额：¥{{datainfotm.minAmount}}</label>
		</p>
		<p>
			<label>可提现金额：¥{{datainfotm.amount}}</label>
			<i @click="alltxa">全部提现</i>
		</p>
	</div>
	<div class="refund_sxfa">
		<p>
			<span>手续费：</span>
			<label>{{datainfotm.serviceChargePercent}}%</label>
		</p>
		<p>
			<span>实际到账金额 (元)：</span>
			<label>{{shdmoney}}</label>
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
	<div class="buttons" v-if="isShow">
		<mt-button type="default" class="add_btns" size="large" @click="oktxian">提现</mt-button>
	</div>
	<div class="buttons" v-else>
  		<mt-button type="default" class="add_btns" size="large" @click="oktxianb">提现</mt-button>
	</div>
</div>
</template>

<script>
    export default {
        name: "commission",
        data:()=>({
			editionab:'A版提现',
			rmoney:1,//提现金额
			shdmoney:0,//实际到账金额
			isShow:true,
			datainfotm:{}
        }),
        methods:{
			// 获得A版提现信息
			getAdrLists(){
				let url = "UserInterface/GetVerAWithdrawInfo.ashx";
				this.$post(url).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					this.datainfotm = data.data;
					this.shdmoney=(this.rmoney-(this.datainfotm.serviceChargePercent*this.rmoney/100)).toFixed(2);
				})
			},
			// 获得B版提现信息
			getAdrListsb(){
				let url = "UserInterface/GetVerBWithdrawInfo.ashx";
				this.$post(url).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					this.datainfotm = data.data;
					this.shdmoney=(this.rmoney-(this.datainfotm.serviceChargePercent*this.rmoney/100)).toFixed(2);
				})
			},
			// 监听money
			cardconut(){
				if(Number(this.rmoney)>Number(this.datainfotm.amount)){
					this.$Toast('可提现金额不足');
					return;
				}
				this.shdmoney=(this.rmoney-(this.datainfotm.serviceChargePercent*this.rmoney/100)).toFixed(2);
			},
			// 全部提现
			alltxa(){
				this.rmoney=this.datainfotm.amount;
				this.cardconut();
			},
			// 提现A
			oktxian(){
				if(this.rmoney==''){
					this.rmoney=0;
				}
				if((Number(this.rmoney)<=0)||(this.rmoney=='e')){
					this.$Toast('请输入有效的提现金额');
					return;
				}
				if(Number(this.rmoney)>Number(this.datainfotm.amount)){
					this.$Toast('可提现金额不足');
					return;
				}
				this.$MessageBox.confirm('确定提现吗?').then(action => {
					let url = "UserInterface/VerAWithdraw.ashx";
					let param = {
						amount:this.rmoney,
						service_charge:Number(this.rmoney)-Number(this.shdmoney),
						actual_arrival:this.shdmoney
					};
					this.$post(url,param).then((data)=>{
						this.$Toast(data.rspdesc);
						if(data.rspcode != 1 ){
							return;
						}
						this.$router.push('/cardbA');
					})
				})
			},
			// 提现B
			oktxianb(){
				this.$MessageBox.confirm('确定提现吗?').then(action => {
					let url = "UserInterface/VerBWithdraw.ashx";
					let param = {
						amount:this.rmoney,
						service_charge:Number(this.rmoney)-Number(this.shdmoney),
						actual_arrival:this.shdmoney
					};
					this.$post(url,param).then((data)=>{
						this.$Toast(data.rspdesc);
						if(data.rspcode != 1 ){
							return;
						}
						this.$router.push('/cardbB');
					})
				})
			}
        },
        mounted(){
          let edition = this.$route.params.edition;
          if(edition=='A'){
          	this.editionab='A版提现';
			this.isShow=true;
			this.getAdrLists();
          }else{
          	this.editionab='B版提现';
			this.isShow=false;
			this.getAdrListsb();
          }
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
