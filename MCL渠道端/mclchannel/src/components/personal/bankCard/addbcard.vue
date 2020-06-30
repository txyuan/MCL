<template>
  <div style="background: #fff;height: 100vh;">
    <h4><router-link to="/wx_Entrance/personal"  style="color: initial">取消</router-link></h4>
	<div class="addcd_gz">
		<h2>添加银行卡</h2>
		<p>请输入支付密码，已验证身份</p>
		<div class="addcd_ul">
			<ul>
				<li v-for="item in 6">{{passlist[item-1]}}</li>
			</ul>
		</div>
	</div>
	<div class="addcd_sz">
		<p v-for="(item,index) in list" :key="index" @click="numbs(item)"><img v-if="item=='x'" src="@/assets/images/guanbi@2x.png" /><span v-if="item!='x'">{{item}}</span></p>
	</div>
  </div>
</template>

<script>
  export default {
	name: "addbcard",
    data:()=>({
        list:[1,2,3,4,5,6,7,8,9,'',0,'x'],
		passlist:[]
    }),
    methods: {
      numbs(item){
		  if(item!='x'){
			if(this.passlist.length<=5){
			   this.passlist.push(item);
			}
			if(this.passlist.length==6){
				this.$router.push('/bankCard');
			}
		  }else{
			  this.passlist.pop();
		  }
	  }
    }
  }
</script>

<style lang="scss" scoped>
  h4{
	  height: 0.44rem;
	  line-height: 0.44rem;
	  padding-left: 4%;
	  font-size: 0.16rem;
	  color: #333;
	  font-weight: normal;
  }
  .addcd_gz{
	padding-top: 0.4rem;
	h2{
		font-size: 0.26rem;
		font-weight: 500;
		text-align: center;
	} 
	p{
		font-size: 0.14rem;
		text-align: center;
		padding-top: 0.16rem;
	}
	.addcd_ul{
		position: relative;
		ul{
			position: absolute;
			left: 50%;
			margin-left: -1.4rem;
			overflow: hidden;
			margin-top:0.6rem;
			li{
				width: 0.46rem;
				height: 0.46rem;
				line-height: 0.46rem;
				text-align: center;
				font-size: 0.16rem;
				color: #666;
				border: 1px solid #ddd;
				border-right: none;
				float: left;
				&:last-child{
					border-right:1px solid #ddd;
				}
			}
		}
	}
	
  }
  .addcd_sz{
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	overflow: hidden;
	p{
		width: 33.333%;
		float: left;
		font-size: 0.2rem;
		color: #666;
		height: 0.56rem;
		text-align: center;
		line-height: 0.56rem;
		box-sizing: border-box;
		border: 1px solid #eee;
		img{
			width: 0.2rem;
			height: 0.2rem;
		}
	}
  }
</style>