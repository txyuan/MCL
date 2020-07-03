<template>
  <div class="doctorPay-root">
  	<div id="body_main" style="padding-bottom: 0;">
  		<mt-header title="消息" fixed>
		    <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
		  </mt-header>
		  
		  <div class="page text-center">
		  	<div class="info">
			  	<p class="title font20">{{HospitalName}} </p>
			  	<p class="name font14">{{DoctorName}} {{Position}}</p>
			  </div>
			  
			  <div class="img-border">
			  	<div class="img-border">
			  		<img :src="DoctorImg" class="touxiang" width="122" height="122"/>
			  	</div>
			  </div>
			  
			  <div class="feiyong huiFont font18">
			  	沟通费用：{{Cost}}元/分钟
			  </div>
			  
			  <div class="btn">
			  	<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save">确认沟通</mt-button>
			  </div>
			  
		  </div>
		  
		  
		</div>  
  </div>
</template>

<script>
    export default {
        name: "doctorPay",
        data:()=>({
			HospitalName:'',  //医院名称
			DoctorName:'',  //医生姓名
			Position:'',  //职位
			DoctorImg:'',  //医生图片
			Cost:'',  //费用
        }),
        methods:{
        	// 
        	healThk(){
        		let url = "UserInterface/GetPaymentMessage.ashx";
        		let param={
        			datetime:this.datriq
        		};
        		this.$post(url).then((data)=>{
        			if(data.rspcode != 1 ){
        			   return;
        			}
					this.HospitalName=data.HospitalName;
					this.DoctorName=data.DoctorName;
					this.Position=data.Position;
					this.DoctorImg=data.DoctorImg;
					this.Cost=data.Cost;
        		})
        	}
        },
		mounted(){
			this.healThk();
		}
    }
</script>

<style scoped lang="scss">
  #body_main{
		height: 100vh;
		position: relative;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	
	.info{
		padding-top: 0.57rem;
		padding-bottom: 0.81rem;
	}
	
	.img-border{
		display: inline-block;
		border: 1px solid #F5F5F5;
		border-radius: 50%;
		overflow: hidden;
		padding: 15px;
	}
	
	.feiyong{
		padding: 0.4rem 0;
	}
	
	.btn{
		padding: 0 0.66rem;
	}
</style>
