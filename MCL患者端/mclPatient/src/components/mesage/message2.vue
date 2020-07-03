<template>
  <div class="message2-root" style="min-height: 100vh;overflow: hidden;">
  	<div id="body_main" style="padding: 0;background: #eff7f9;position: relative;">
  		<img src="@/assets/images/message2.png" alt="" style="width: 100%;"/>
  		<div class="btns">
  			<mt-button type="primary" class="button-radio" size="large" @click.native="$router.push(`/gauge_PG_SGA`)">在线营养筛查</mt-button> 
  			<mt-button type="primary" class="theme-button button-radio" size="large" @click.native="$router.push(`/wx_Entrance/home`)">好的，知道了</mt-button>
  		</div>
  		
  			
  		<!--<mt-header title="营养评估简介" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
		  </mt-header>-->
		  
		  <!--<div id="mark" style="display: block;">
		  	<div class="panel">
		  		<div class="title text-center">营养评估简介</div>
		  		<img src="@/assets/images/taocangBG.png" width="100%" class=""/>
		  		<div class="content">
		  			营养风险筛查（nutritionriskscreening）用以决定是否需要制定或实施肠外肠内营养支持计划。可以帮助患者监测身体的健康状态和身体各个方面的机能状况。
		  		</div>
		  		<mt-button type="primary" class="" size="small" @click.native="$router.push(`/gauge_PG_SGA`)">在线营养筛查</mt-button> 
		  	</div>
		  	<div class="text-center" style="width: 80%;margin: 0 auto;">
		  		<mt-button type="primary" class="theme-button button-radio" size="large" @click.native="$router.push(`/wx_Entrance/home`)">好的，知道了</mt-button> 
		  	</div>
		  </div>-->
		</div>  
  </div>
</template>

<script>
    export default {
        name: "message2",
        data:()=>({

        }),
        methods:{
        	
        },
    }
</script>

<style scoped lang="scss">
  .message{
  	margin-top: 70px;
  	margin-bottom: 10px;
  }
  .panel{
  	background: linear-gradient(#F9C375,#EF9347);
  	width: 90%;
  	color: #FFFFFF;
  	margin: 0 auto;
  	margin-top: 0.70rem;
  	margin-bottom: 0.20rem;
  	padding: 0.2rem 0.35rem;
  	box-sizing: border-box;
  	border-radius: 0.25rem;
  	overflow: hidden;
  }
  .panel img{
  	margin: 0.1rem 0;
  }
  .panel .title{
  	font-size: 0.25rem;
  	font-weight: bold;
  }
  .panel .content{
  	font-size: 0.14rem;
  	word-break: break-all;
  	line-height: 1.5;
  }
  .btns{
  	position: fixed;
  	bottom: 10px;
  	left: 15%;
  	right: 15%;
  }
</style>
<style type="text/css">
	.message2-root .mint-button{
    background: #24B7C0;
    margin-bottom: 10px;
  }
  .message2-root .theme-button{
  	background: #FFFFFF;
  	color: #24B7C0;
  	border: 1px solid #24B7C0;
  }
</style>