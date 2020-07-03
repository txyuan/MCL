<template>
  <div class="publish-root">
  	<div id="body_main">
  		<mt-header title="发布动态" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
		  </mt-header>
		  
		  <div class="content">
		  	<div class="textNeirong">
		  		<textarea name="" rows="4" cols="" placeholder="请输入内容" v-model.trim="param.content"></textarea>
		  	</div>
		  	
		  	<div class="uploadArea">
	  			<div class="photoList" v-for="(item,index) in photoList" v-if="item.show">
	  				<img :src="item.src" width="100" height="100"/>
	  				<div class="mask"><span class="close" @click="delPhoto(index)">X</span> </div>
	  			</div>
	  			<img src="@/assets/images/tianjia备份@2x.png" width="100" height="100" @click="addPhoto" class="add" v-show="photoAdd"/>
	  			<input type="file" style="display: none;" accept="image/*" @change="iosUpload($event)" ref="file"/>
	  		</div>
		  </div>
		  
		  <mt-cell is-link class="borderBottom margin10" @click.native="seePickerToggles('show')">
			<div slot="title" class="titleWrap">
				<span class="mint-cell-text">谁能看见</span>
			</div>
			<div class="">
				{{seeDefaultName}}
			</div>
		  </mt-cell>
		  <div class="btn">
			<mt-button type="primary" class="theme-button" size="large" @click.native="submit"> 发布 </mt-button>
		  </div>
			
		<!-- 谁能看见picker  -->
		<mt-popup
			v-model="seeVisible"
			position="bottom">
			<mt-picker 
				:slots="seeSlot" 
				:showToolbar="true" 
				:visibleItemCount="3" 
				ref="seePickers"
			>
			    <div class="picker_bar">
					<div class="cancel" @click="seePickerToggles('hide')">取消</div>
					<div class="confrim" @click="seeConfirm">确定</div>
			    </div>
			</mt-picker>
		</mt-popup>
			
  	</div>  
  </div>
</template>

<script>
	import axios from 'axios'
    export default {
        name: "publish",
        data:()=>({
			//接口参数
			param:{
				content:"",  //内容
				img1:"",
				img2:"",
				img3:"",
				alowView:"1"  //查看权限(1,所有人;2,只有自己)
			},
			
			//图片list
			photoList:[
				{key:"img1", src:"", show: false},
				{key:"img2", src:"", show: false},
				{key:"img3", src:"", show: false},
			],
			//图片加号
			photoAdd: true,   
			
			//谁能看见picker
			seeList:[
				{name:"所有人", val:"1"}, {name:"只有自己", val:"2"}
			],
			seeDefaultName:"所有人",  //页面显示的文字
			seeVisible: false,
			seeSlot:[
				{
					flex: 1,
					values: ['所有人', '只有自己'],
					className: 'slot1',
					textAlign: 'center'
				}
			],
        }),
        methods:{
			//谁能看见picker
			seePickerToggles(state){
				if(state == "show"){
					this.seeVisible = true;
				}
				if(state == "hide"){
					this.seeVisible = false;
				}
			},
			//谁能看见picker 确定事件
			seeConfirm(){
				const {seePickers} = this.$refs;
				let statecode = seePickers.getSlotValue(0);
				this.seeList.forEach((item, index)=>{
					if(item.name == statecode){
						const {val, name} = item;
						this.param.alowView = val;
						this.seeDefaultName = name;
					}
				})
				this.seePickerToggles('hide');
			},
			
			//增加图片按钮
			addPhoto(){
//				if (this.$root.isWeiXin() || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
//					//微信 和  Ios 
//				    return this.$refs.file.click()
//				} else if (/(Android)/i.test(navigator.userAgent)) {
//				   //Android终端	
//				   window.back.clickOnAndroidSelectPhoto();
//				}
					return this.$refs.file.click()
			},
			//ios端 上传文件
			iosUpload(e){
				let file = e.target.files[0];
				let url = URL.createObjectURL(file);
				let config = {
				  headers:{'Content-Type':'multipart/form-data'}
				};  //添加请求头
				let params = new FormData(); //创建form对象
				params.append('uploadedFile',file);//通过append向form对象添加数据
				axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
					if (response.data.rspcode != 1) {
					  return;
					}
					let responseUrl = response.data.url;
					
					
					//设置图片地址
					for(let i=0; i<this.photoList.length; i++){
						const item = this.photoList[i]
						if(item.src == ""){
							item.src = responseUrl;
							item.show = true;
							break;
						}
					}
					//是否显示增加图片按钮
					let len = 0;
					for(let i=0; i<this.photoList.length; i++){
						const item = this.photoList[i]
						if(item.src != ""){
							len+=1
						}
					}
					if(len == this.photoList.length){
						this.photoAdd = false;
					}
				})
			},
			//android端 上传文件（被app主动调起的回调函数）
			androidUpload(stream){
				let url = "UserInterface/UploadPhotos.ashx";
				this.$post(url,{BinaryStream: stream}).then((data) => {
				  if(data.rspcode==0){
					return;
				  }
				  let responseUrl = responseUrl;
				  
				  
				  //设置图片地址
				  for(let i=0; i<this.photoList.length; i++){
				  	const item = this.photoList[i]
				  	if(item.src == ""){
				  		item.src = responseUrl;
				  		item.show = true;
				  		break;
				  	}
				  }
				  //是否显示增加图片按钮
				  let len = 0;
				  for(let i=0; i<this.photoList.length; i++){
				  	const item = this.photoList[i]
				  	if(item.src != ""){
				  		len+=1
				  	}
				  }
				  if(len == this.photoList.length){
				  	this.photoAdd = false;
				  }
				})
			},
			// 删除图片
			delPhoto(index){
				//删除图片数据
				this.photoList[index].show = false;
				this.photoList[index].src = "";
				//显示图片新增按钮
				this.photoAdd = true;
			},
			
			
			//提交
			submit(){
				const param = this.param;
				if(param.content == ""){
				  this.$Toast("请输入内容")
				  return;
				}
				
				//设置图片地址
				for(let i=0; i<this.photoList.length; i++){
					const item = this.photoList[i];
					param[item.key] = item.src;
				}
				
				let url = "UserInterface/CommunityDynamicRelease.ashx";
				this.$post(url,this.param).then((data)=>{
				  this.$Toast(data.rspdesc);
				  if(data.rspcode != 1 ){
					return;
				  }
				  this.$router.back();
				})
			},
        },
		mounted: function(){
			//设置Android 打开相册的回调函数
			window.showbg=this.androidUpload;
		}
    }
</script>

<style scoped lang="scss">
  //picker 的样式	
  .mint-popup-bottom {
	width: 100%;
  }
  .picker_bar{
	display: flex;
	justify-content: space-between;
	text-align: center;
	line-height: 40px;
	padding: 0 20px;
	border-bottom: solid 1px #eaeaea;
	.confrim{
		color: #26a2ff;
	}
  }
  
  .content{
  	background: #FFFFFF;
  	.textNeirong{
  		padding: 0.12rem ;
  	}
		textarea{
			resize: none;
			width: 100%;
			display: block;
			border: none;
		}
  }
  .btn{
  	margin-top: 15px;
  	padding: 0.12rem;
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
