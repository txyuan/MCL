<template>
<div>
	<div>
	   <mt-header title="购卡">
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	</div>
	<div class="refund_cont">
		<h3>购买数量 (张)</h3>
		<input type="text" v-model="pcount" @input="getAdrLis()" />
		<p>
			<label>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</label>
			<i>{{price}}元</i>
		</p>
		<p>
			<label>购买金额：</label>
			<i style="color: #333;">{{buymony}}元</i>
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
      <mt-button type="default" class="add_btns" size="large" v-on:click="getRecharge()">购卡</mt-button>
  </div>
  
</div>
</template>

<script>
    export default {
        name: "cardRecharge",
        data:()=>({
			pcount:0,  //购买数量
			price:0,  //购卡单价
			buymony:0,  //购买金额
			successUrl:'http://123.57.89.89:5334/#/wx_Entrance/home'
        }),
        methods:{
			// 购买单价
			getAdrLists(){
			  let url = "UserInterface/GetShoppingCardPrice.ashx";
			  this.$post(url).then((data)=>{
			    if(data.rspcode != 1 ){
			      return;
			    }
				this.price=data.data.price;
			  })
			},
			// 购买金额
			getAdrLis(){
			  this.buymony=(this.price*this.pcount).toFixed(2);
			},
			//购卡
			getRecharge(){
				let UserKey=JSON.parse(localStorage.userInfo).UserKey;
				let SessionId=JSON.parse(localStorage.userInfo).SessionId;
				let href = window.location.href.split('#')[0];
				let linkhref=href+'#/shopCard';
				// let activePay = this.itemsa[this.isActivea];  //当前的支付方式
				window.location.href=`ctmd.html?UserKey=${UserKey}&SessionId=${SessionId}&buyCount=${this.pcount}&paymenAmount=${this.buymony}&type=9&successUrl=${linkhref}`;
				// console.log(`ctmd.html?UserKey=${UserKey}&SessionId=${SessionId}&buyCount=${this.pcount}&paymenAmount=${this.buymony}&successUrl=${linkhref}&type=9`)
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
