<template>
  <div class="wxFollowPage-root">
  	 <div class="panel">
  	 		<div class="panel_name">
  	 			<p class="title">注册成功</p>
  	 			<p class="des">请识别图中二维码关注公众号</p>
  	 		</div>
  	 		<div class="border" :style="{'height': `${borderHeight}px`}"></div>
  	 		<div class="panel_code">
	  	 	 <img src="@/assets/images/wxcode.jpg"/>
	  	 	 <p>长按识别识别图中二维码</p>
	  	 </div>
  	 </div>  
  	 
  </div>
</template>

<script>
    export default {
        name: "wxFollowPage",
        data:()=>({
					
        }),
        computed:{
        	borderHeight: function(){
        		var width = window.innerWidth*0.85;
        		return parseInt(width/(633/36))   
        	}
        },
        methods:{
        	
        },
    }
</script>

<style scoped lang="scss">
  .wxFollowPage-root{
  	height: 100vh;
  	/*background: url('../../assets/images/wxFollowPageBG.png') no-repeat center center;*/
  	background-color: #24b7c0;
  }
  .panel{
  	width: 85%;
  	height: 449px;
  	position: absolute;
  	top: 0;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	margin: auto;
  	text-align: center;
  	border-radius: 15px;
  	overflow: hidden;
  }
  .panel_name,.panel_code{
  	background: #FFFFFF;
  }
  .panel_name{
  	padding-top: 45px;
  	padding-bottom: 20px;
  }
  .panel_code{
  	padding-top: 48px;
  	padding-bottom: 92px;
  }
  .panel_code img{
  	width: 150px;
  	height: 150px;
  	display: inline-block;
  }
  .title{
  	color: #F78335;
  	font-size: 22px;
  	margin-bottom: 15px;
  }
  .des{
  	font-size: 13px;
  }
 .panel_code p{
  	color: #2D2C2C;
  	font-size: 13px;
  	margin-top: 20px;
  }
  .border{
  	background: url('../../assets/images/wxFollowPageBorder.png') no-repeat left top;
  	background-size: 100% 100%;
  	position: relative;
  	margin-top: -1px;
  	margin-bottom: -1px;
  }
  .border::before{
  	content: "";
  	display: inline-block;
  	width: 80%;
  	height: 2px;
  	background-image: linear-gradient(to right, #D8D8D8 0%, #D8D8D8 50%, transparent 50%);
		background-size: 12px 1px;
		background-repeat: repeat-x;
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	left: 0;
  	right: 0;
  	margin: auto;
  }
  
</style>
