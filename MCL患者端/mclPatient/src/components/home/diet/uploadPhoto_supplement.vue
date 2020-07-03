<template>
  <div class="uploadPhoto-root">
  	<div id="body_main">
	    <mt-header title="饮食补录" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
		  </mt-header>
		  
		  <mt-cell title="补录日期" is-link value="选择日期" class=""></mt-cell>
		  <mt-cell is-link title="饮食时间" value="早饭" class="margin10"></mt-cell>
		  
		  <!-- 饮食方案 -->
		  <div class="marginTop10 yinshhi_list">	 
		  	<div class="title">
	  			<div class="wrap borderBottom">
	  				<span class="font16">饮食方案</span>
	  				<span class="float_right huiFont9">食用量</span>
	  			</div>
	  		</div>
	  		<mt-cell>
				  <img slot="icon" src="@/assets/images/morentouxiang.jpg" width="46" height="46">
				  <div slot="title" class="titleWrap">
				  	<span class="mint-cell-text">全麦面包片</span>
				  	<span class="mint-cell-label font12 huiFont99">建议食用量：3片</span>
				  </div>
				  <div class="font14 huiFont99">
				  	267Kcal
				  </div>
				</mt-cell>
				<mt-cell is-link>
				  <img slot="icon" src="@/assets/images/morentouxiang.jpg" width="46" height="46">
				  <div slot="title" class="titleWrap">
				  	<span class="mint-cell-text">全麦面包片</span>
				  	<span class="mint-cell-label font12 huiFont99">建议食用量：3片</span>
				  </div>
				</mt-cell>
		  </div>
		  
		  <!-- 其他菜式 -->
		  <div class="marginTop10 yinshhi_list">	 
		  	<div class="title">
	  			<div class="wrap">
	  				<span class="font16">其他菜式</span>
	  			</div>
	  		</div>
	  		<div class="search">
	  			<img src="@/assets/images/搜索@2x.png" alt="" class="icon" width="20" height="20"/>
	  			<input type="text"  placeholder="请输入食物名称"/>
	  		</div>
	  		<div class="scroll">
	  			<mt-cell is-link>
					  <img slot="icon" src="@/assets/images/morentouxiang.jpg" width="46" height="46">
					  <div slot="title" class="titleWrap">
					  	<span class="mint-cell-text">全麦面包片</span>
					  	<span class="mint-cell-label font12 huiFont99"><span class="red">16</span> 千卡/100克</span>
					  </div>
					</mt-cell>
					<mt-cell is-link>
					  <img slot="icon" src="@/assets/images/morentouxiang.jpg" width="46" height="46">
					  <div slot="title" class="titleWrap">
					  	<span class="mint-cell-text">全麦面包片</span>
					  	<span class="mint-cell-label font12 huiFont99"><span class="red">16</span> 千卡/100克</span>
					  </div>
					</mt-cell><mt-cell is-link>
					  <img slot="icon" src="@/assets/images/morentouxiang.jpg" width="46" height="46">
					  <div slot="title" class="titleWrap">
					  	<span class="mint-cell-text">全麦面包片</span>
					  	<span class="mint-cell-label font12 huiFont99"><span class="red">16</span> 千卡/100克</span>
					  </div>
					</mt-cell>
					<mt-cell is-link>
					  <img slot="icon" src="@/assets/images/morentouxiang.jpg" width="46" height="46">
					  <div slot="title" class="titleWrap">
					  	<span class="mint-cell-text">全麦面包片</span>
					  	<span class="mint-cell-label font12 huiFont99"><span class="red">16</span> 千卡/100克</span>
					  </div>
					</mt-cell>
	  		</div>
	  		
	  		<!-- 上传图片区域 -->
				<div class="title">
	  			<div class="wrap">
	  				<span class="font16">拍照上传</span>
	  			</div>
	  		</div>
	  		<div class="uploadArea">
	  			<div class="photoList" v-for="(item,index) in photoList">
	  				<img :src="item.src" width="100" height="100"/>
	  				<div class="mask"><span class="close" @click="delPhoto(index)">X</span> </div>
	  			</div>
	  			<img src="@/assets/images/tianjia备份@2x.png" width="100" height="100" @click="addPhoto" class="add" v-show="photoList.length<1"/>
	  			<input type="file" style="display: none;" @change="change($event)" ref="file"/>
	  		</div>
		  </div>
		  
		  <div class="fix_bottom fix_bottom_area">
	  		<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save">保存</mt-button>
	  	</div>
		</div>
  </div>
</template>

<script>
	  import pic from "@/assets/images/syyx.png";  //跟新购物车数量
    export default {
        name: "uploadPhoto",
        data:()=>({
					photoList:[]
        }),
        methods:{
        	change($event){
        		var $file = $event.target;
        		var file = $file.files[0]; //获取File对象
        		var URL = window.URL || window.webkitURL;
						var imageURL = URL.createObjectURL(file);
        		this.photoList.push({file: JSON.parse(JSON.stringify(file)), src: imageURL});
        		$file.value = "";
        	},
        	addPhoto(){
        		return this.$refs.file.click()
        	},
        	delPhoto(index){
        		this.photoList.splice(index,1)
        	},
        	save(){
        		this.$router.push("/wx_Entrance/home2")
        	}
        },
    }
</script>

<style scoped lang="scss">
  /* 早餐列表 */
	.yinshhi_list{
		background: #FFFFFF;
	  .title{
	  	padding-left: 0.12rem;
	  	line-height: 45px;
	  }	
	  .wrap{
	  	padding-right: 15px;
	  }
	  .wrap>*{vertical-align: middle;}
	  .wrap>.icon{margin-right: 5px;}
	}
	
	.titleWrap{
  	display: inline-block;
  	vertical-align: middle;
  }
  
  .yinshhi_list .mint-cell{
  	min-height: 66px;
  }
  /* 搜索输入框 */
  .search{
  	background: #F0F1F3;
  	border-radius: 0.15rem;
  	height: 0.30rem;
  	overflow: hidden;
  	margin: 0.12rem;
  	margin-top: 0;
  	padding: 0 0.2rem;
  	display: flex;
  	justify-content: flex-start;
  	align-items: center;
  	.icon,input{vertical-align: middle;}
  	input{
  		flex: 1;
  		height: 0.30rem;
  		line-height: 0.30rem;
  		font-size: 0.12rem;
  		margin-left: 0.05rem;
  	}
  }
  /* 滚动区域 */
  .scroll{
  	overflow: hidden;
  	overflow-y: scroll;
  	height: 220px;
  }
  
  /*上传图片区域*/
  .uploadArea{
  	padding: 0.12rem;
  	padding-top: 0;
  	.photoList,.add{
  		width: 100px;
  		height: 100px;
  		display: inline-block;
  		margin-right: 10px;
  		margin-bottom: 10px;
  		vertical-align: top;
  		position: relative;
  	}
  	.mask{
  		position: absolute;
  		width: 100%;
  		top: 0;
  		bottom: 0;
  		background: rgba(0,0,0,.2);
  		.close{
  			position: absolute;
  			right: 5px;
  			top: 5px;
  			color: #FFFFFF;
  			font-size: 16px;
  		}
  	}
  }
</style>
