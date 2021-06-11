<template>
<div class="padding-header">
	<div>
	  <mt-header title="转卡给他人" fixed class="borderBottom">
		<div slot="left">
		 <router-link to="/wx_Entrance/personal"  style="color: initial">
		   <mt-button icon="back"></mt-button>
		 </router-link>
		</div>
	  </mt-header>
	</div>
	<div class="refund_cont">
		<h3>转出购物卡数量 (张)</h3>
		<input type="text" v-model="monumy" @input="monum()" />
		<!-- <span>退卡金额：<i>3400</i>元</span> -->
		<p>
			<label>转出购物卡价值 (元)：</label>
			<i>{{zoutmony}}</i>
		</p>
		<p>
			<label>余额数量：{{ShoppingCardCount}}张；价值{{ShoppingCardAmount}}元</label>
			<i @click="allzc()">全部转出</i>
		</p>
	</div>
	<div class="refund_phone">
		<span>转给手机号：</span>
		<input type="text" v-model="friendsphone" placeholder="请输入好友的手机号" />
	</div>
	<mt-button type="default" class="add_btn" size="large" @click="zkok()">确定</mt-button>
  
</div>
</template>

<script>
    // import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "cards-other",
        data:()=>({
			ShoppingCardAmount:"0.00",  //价值
			ShoppingCardCount: "0", //余额数量
			ShoppingCardPrice: "0.00",  //单价
			monumy:0,  //写入购物卡数量
			zoutmony:0,  //转出购物卡价值
			friendsphone:'',  //好友手机号
			yfds:true
        }),
        methods:{
			// 购物卡数量和金额
			saveInfo(){
				let url = "UserInterface/SelectShoppingCardInfo.ashx";
				this.$post(url).then((data)=>{
					if(data.rspCode != 1 ){
						return;
					}
					this.ShoppingCardAmount=data.data.ShoppingCardAmount;
					this.ShoppingCardCount=data.data.ShoppingCardCount;
					this.ShoppingCardPrice=data.data.ShoppingCardPrice;
				})
			},
			// 输入数量
			monum(){
				if(Number(this.monumy)>Number(this.ShoppingCardCount)){
					this.$Toast('余额数量不足');
					this.yfds=false;
					return;
				}
				this.yfds=true;
				this.zoutmony=(Number(this.ShoppingCardPrice)*this.monumy).toFixed(2);
			},
			// 全部转出
			allzc(){
				this.yfds=true;
				this.monumy=this.ShoppingCardCount;
				this.zoutmony=Number(this.ShoppingCardAmount)*Number(this.ShoppingCardCount);
			},
			// 确定
			zkok(){
				let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if( !myreg.test(this.friendsphone) ){
				  this.$Toast('请输入格式正确的手机号');
				  return;
				}
				this.$MessageBox.confirm('确定转卡给此好友吗?').then(action => {
					if(this.yfds){
						let url = "UserInterface/FriendTransfer.ashx";
						let param = {
							shoppingCardCount:this.monumy,
							friendsphone:this.friendsphone
						};
						this.$post(url,param).then((data)=>{
							this.$Toast(data.rspDesc);
							if(data.rspCode != 1 ){
								return;
							}
							this.saveInfo();
						})
					}else{
						this.$Toast('余额数量不足');
					}
				})
			}
        },
        mounted(){
          this.saveInfo();
        },
        components:{
          // loadMore
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
  .refund_phone{
	  overflow: hidden;
	  margin-top: 0.08rem;
	  background: #fff;
	  span{
		  line-height: 0.5rem;
		  font-size: 0.15rem;
		  color: #333;
		  float: left;
		  line-height: 0.5rem;
		  margin-left: 3%;
	  }
	  input{
		  height: 0.5rem;
		  border: none;
		  width: 60%;
		  font-size: 0.14rem;
	  }
  }
</style>
