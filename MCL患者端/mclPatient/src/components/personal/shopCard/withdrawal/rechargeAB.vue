<template>
<div>
	  <mt-header :title="titleab">
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	<div class="refund_cont">
		<h3>转入购物卡数量 (张)</h3>
		<input type="number" v-model="cardxont" @input="cardconut" />
		<p>
			<label>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</label>
			<i>{{price}}元</i>
		</p>
		<p>
			<label>转入金额：</label>
			<i>{{addmoney}}元</i>
		</p>
	</div>
	<div class="pay_rshi" v-if="idShow">
		<h3>提示：</h3>
		<p>1、首次转入3000起，续转不限，但每月份续转不超过30000元。</p>
		<p>2、首次转入之日起四个月内可续转，四个月后推广员达到计划倍数收益后，方可重新续转，从而进行第二阶段推广收益计划。</p>
		<p>3、转入消费区后，“未消费余额”将无法转回或退款，仅能用于消费，建议消费多少转多少。</p>
	</div>
	<div class="pay_rshi" v-else>
		<h3>提示：</h3>
		<p>转入消费区后，“未消费余额”将无法转回或退款，仅能用于消费，建议消费多少转多少。</p>
	</div>
  <div class="buttons" v-if="abshow">
      <mt-button type="default" class="add_btns" size="large" @click="getAmony()">转入</mt-button>
  </div>
  <div class="buttons" v-else>
      <mt-button type="default" class="add_btns" size="large" @click="getAmonyb()">转入</mt-button>
  </div>
  
</div>
</template>

<script>
    export default {
        name: "commission",
        data:()=>({
			titleab:'A版转入',
			cardxont:0,  //购卡数量
			idShow: true,
			price:0,  //单价
			addmoney:0,  //充值金额
			abshow:true
        }),
        methods:{
			// 获得购物卡退卡提现信息
			getAdrLists(){
				let url = "UserInterface/GetShoppingCardPrice.ashx";
				this.$post(url).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					this.price = data.data.price;
				})
			},
			// 监听数量
			cardconut(){
				this.addmoney=(this.price*this.cardxont).toFixed(2);
			},
			// A版充值
			getAmony(){
				let reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
				if (!reg.test(this.cardxont)) {
					alert(2)
					this.$Toast('请输入正整数！')
					this.cardxont='';
					return;
				}
				if(this.cardxont==''){
					this.cardxont=0;
				}
				if((Number(this.cardxont)<=0)||(this.cardxont=='e')){
					this.$Toast('请输入有效的提现金额');
					return;
				}
				this.$MessageBox.confirm('确定转入吗?').then(action => {
					let url = "UserInterface/VerARecharge.ashx";
					let param={
						count:this.cardxont,
						amount:this.addmoney
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
			// B版充值
			getAmonyb(){
				let reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
				 //验证警戒值
				if((this.cardxont!='') && (this.cardxont != 'undefined')){
					if (!reg.test(this.cardxont)) {
						this.$Toast('请输入正整数！')
						this.cardxont='';
						/*this.$refs.warn_value.focus();*/
						return ;
					}
				}
				if(this.cardxont==''){
					this.cardxont=0;
				}
				if((Number(this.cardxont)<=0)||(this.cardxont=='e')){
					this.$Toast('请输入有效的提现金额');
					return;
				}
				this.$MessageBox.confirm('确定转入吗?').then(action => {
					let url = "UserInterface/VerBRecharge.ashx";
					let param={
						count:this.cardxont,
						amount:this.addmoney
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
			this.getAdrLists();
			let edition = this.$route.params.edition;
			if(edition=='A'){
				this.titleab='A版转入';
				this.idShow=true;
				this.abshow=true;
			}else{
				this.titleab='B版转入';
				this.idShow=false;
				this.abshow=false;
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
  .pay_rshi{
	  padding: 0.12rem 3%;
	  h3{
		  font-size: 0.15rem;
		  font-weight: normal;
		  margin-bottom: 0.06rem;
		  color: #3A3A3A;
	  }
	  p{
		  font-size: 0.14rem;
		  color: #666;
		  line-height: 0.22rem;
		  text-indent: 1em;
	  }
  }
</style>
