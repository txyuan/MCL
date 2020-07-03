<template>
  <div class="sport-uploadPhoto-root">
  	<div id="body_main">
	    <mt-header title="拍照上传" fixed>
		    <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
		  </mt-header>
		  
		  <div class="marginTop10">
		  	<mt-cell title="补录日期" is-link value="选择日期" class="margin10 time"></mt-cell>
		  	<div class="my-cell borderBottom">
	    		<span class="">营养方案</span>
	    		<span class="float_right huiFont font14">是否食用</span>
	    	</div>
	    	<div class="content-list margin10">
	    		<div class="my-cell borderBottom">
		    		<span class="font14 cell-name">ABD活性因子</span>
		    		<span class="huiFont font14">100g（2粒）</span>
		    		<span class="float_right icon"></span>
		    	</div>
		    	<div class="my-cell">
		    		<span class="font14 cell-name">超级复合益生菌粉</span>
		    		<span class="huiFont font14">100g（2粒）</span>
		    		<span class="float_right icon active"></span>
		    	</div>
	    	</div>
	    	
	    	<div class="qita">
	    		<div class="my-cell">
		    		<span class="">其他营养</span>
		    	</div>
		    	<div class="area">
		    		<textarea name="" rows="3" cols="" placeholder="请简述您服用的其他营养品，并拍照上传让我们帮忙分析。"></textarea>
		    	</div>
		    	<!-- 上传图片区域 -->
		    	<div class="my-cell">
		    		<span class="">拍照上传</span>
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
  </div>
</template>

<script>
    export default {
        name: "sport-uploadPhoto",
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

  /* */
	.my-cell{
		line-height: 0.45rem;
		padding: 0 0.15rem;
		background: #FFFFFF;
		&>*{vertical-align: middle;}
	}
	.content-list{
		background: #FFFFFF;
		padding-left: 0.20rem;
		padding-right: 0.05rem;
		.my-cell{
			padding-left: 0;
			position: relative;
		}
		.cell-name{
			margin-right: 0.15rem;
		}
		.icon{
			display: inline-block;
			width: 0.2rem;
			height: 0.2rem;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0.15rem;
			margin: auto;
			background: url("../../../assets/images/select@2x.png") no-repeat;
			background-size: cover;
		}
		.icon.active{
			background-image: url("../../../assets/images/select_click@2x.png");
		}
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
  
  .qita{
  	background: #FFFFFF;
  	.area{
  		padding: 0.12rem;
  	}
  	.area textarea{
  		resize: none;
  		display: block;
  		width: 100%;
  		padding: 5px;
  		box-sizing: border-box;
  		background:rgba(249,249,249,1);
			border-radius:5px;
			border:1px solid rgba(240,240,240,1);
  	}
  }
</style>
<style type="text/css">
	.time .mint-cell-wrapper{
		padding: 0 0.15rem;
	}
</style>