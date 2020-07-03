<template>
  <div class="searchDoctor-root">
  	<div id="body_main" style="padding-bottom: 0;">
  		<mt-header title="查找医生" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
		  </mt-header>
			
			<div id="container"></div>
			
			<div class="search-group" @click="search">
				<input type="text" placeholder="搜索附近医生" disabled="disabled"/>
				<img src="@/assets/images/sousuowenti@2x.png" width="18" height="18"/>
			</div>
			
			<div class="card-list">
				<ul>
					<li class="card" v-for="n in 5">
						<div class="adr">
							<img src="@/assets/images/wodedizhi.png" width="18" height="21"/>
							<span class="font12 huiFont">距当前位置 < 10km</span>
						</div>
						<div class="pic text-center">
							<img src="@/assets/images/morentouxiang.jpg"/>
						</div>
						<div class="text-center font14">何小何</div>
						<p class="text-center font12">杭州市肿瘤医院 </p>
						<p class="text-center font12">科室主任/肺癌专家</p>
						<div class="bar text-center font12">
							<div class="left">
								指定此医生
							</div>
							<div class="right">
								医生介绍
							</div>
						</div>
					</li>
				</ul>
			</div>
			
  	</div>  
  </div>
</template>

<script>
		
		import remoteJs from "@/components/common/remote-js.js";
		
		remoteJs('https://webapi.amap.com/maps?v=1.4.15',function(){
			var map = new AMap.Map('container', {
	        resizeEnable: true, //是否监控地图容器尺寸变化
	        zoom:11, //初始化地图层级
	        center: [116.397428, 39.90923] //初始化地图中心点
	    });
		})
		
		
    export default {
        name: "searchDoctor",
        data:()=>({

        }),
        methods:{
        	search(){
        		this.$router.push("/searchDoctorList")
        	}
        },
    }
</script>

<style scoped lang="scss">
	#body_main{
		height: 100vh;
		position: relative;
		box-sizing: border-box;
	}
  .search-group{
  	width: 80%;
  	height: 0.35rem;
  	position: absolute;
  	top: 60px;
  	left: 0;
  	right: 0;
  	margin: auto;
  	background: #FFFFFF;
  	border: 1px solid #DDDDDD;
  	border-radius: 5px;
  	padding: 0 0.15rem;
  	display: flex;
  	justify-content: space-between;
  	align-items: center;
  	input{flex: 1;margin-right: 10px;border: none;}
  }
  .search-group>*{vertical-align: middle;display: inline-block;}
  
  #container{
  	position: absolute;
  	top: 43px;
  	bottom: 0;
  	left: 0;
  	right: 0;
  }
  .card-list{
  	position: absolute;
  	bottom: 20px;
  	left: 0;
  	right: 0;
  	overflow: hidden;
  	overflow-x: scroll;
  	
  	ul{
  		white-space: nowrap;
  	}
  	.card{
  		display: inline-block;
  		background: #FFFFFF;
  		border-radius: 5px;
  		box-shadow:0px 2px 11px 0px rgba(0,0,0,0.5);
  		width: 1.45rem;
  		height: 2.00rem;
  		overflow: hidden;
  		position: relative;
  		margin: 0 0.09rem;
  		transition: transform ease 0.6s;
  		transform: translateY(0);
  	}
  	.card .adr{
  		display: flex;
  		justify-content: space-between;
  		align-items: center;
  		padding: 0.05rem;
  	}
  	.card .pic {
  		padding-top: 0.05rem;
  		img{
  			width: 0.70rem;
  			height: 0.70rem;
  			border-radius: 0.35rem;
  		}
  	}
  	.bar{
  		display: flex;
  		justify-content: space-between;
  		position: absolute;
  		bottom: 0;
  		left: 0;
  		right: 0;
  		height: 0.25rem;
  		line-height: 0.25rem;
  	}
  	.bar .left,.bar .right{width: 50%;box-sizing: border-box;}
  	.bar .left{
  		background: #E98B49;
  		color: #FFFFFF;
  	}
  	.bar .right{
  		border-top: 1px solid #DDDDDD;
  		color: #E98B49;
  	}
  	
  }
</style>
