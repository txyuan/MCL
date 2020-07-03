<template>
	<div class="padding-header" style="padding-bottom: 0.2rem;">
		<mt-header title="上传报告" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="mains">
			<div class="form" style="margin-top: 0.06rem" v-if="showButton">
				<mt-cell title="状态选择" is-link @click.native="pickerToggles('show')" style="border-bottom: 1px solid #eee;">
					<span style="">{{param.statecode || '请选择手术状态'}}</span>
				</mt-cell>
				<mt-cell title="检查日期" is-link @click.native="pickerToggle('show')" style="border-bottom: 1px solid #eee">
					<span>{{param.inspectdate}}</span>
				</mt-cell>
			</div>
			<div class="form" style="margin-top: 0.06rem" v-else>
				<mt-cell title="状态选择" style="border-bottom: 1px solid #eee;">
					<span style="">{{param.statecode || '请选择手术状态'}}</span>
				</mt-cell>
				<mt-cell title="检查日期" style="border-bottom: 1px solid #eee">
					<span>{{param.inspectdate}}</span>
				</mt-cell>
			</div>
		</div>
		<div class="img_wrap" v-if="showButton">
			<div class="tits">检查报告一 </div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardA">
					<img :src="idCardA" alt="">
					<p>上传检查报告一</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.inspectpre" alt="">
				</div>
				<div v-if="pageState != 'edit'">
					<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('A')" ref="idCardAFile">
					<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'A')" ref="idCardAFile">
				</div>
			</div>
			<div class="tits">检查报告二 </div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardB">
					<img :src="idCardB" alt="" id="bb">
					<p>上传检查报告二</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.leavehospitalpre" alt="">
				</div>
				<div v-if="pageState != 'edit'">
					<input v-if="anios==1" type="file" accept="image/*" @click="changes('B')" ref="idCardBFile">
					<input v-else type="file" accept="image/*" @change="change($event,'B')" ref="idCardBFile">
				</div>
			</div>
			<div class="tits">出院报告 </div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardC">
					<img :src="idCardC" alt="">
					<p>上传出院报告</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.imageinfo" alt="">
				</div>
				<div v-if="pageState != 'edit'">
					<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('C')" ref="idCardAFile">
					<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'C')" ref="idCardAFile">
				</div>
			</div>
		</div>
		<div class="img_wrap eyepic" v-else>
			<div class="tits">检查报告一</div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardA">
					<img :src="idCardA" alt="">
					<p>上传检查报告一</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.inspectpre" alt="">
				</div>
				<div v-if="pageState != 'edit'">
					<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('A')" ref="idCardAFile">
					<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'A')" ref="idCardAFile">
				</div>
			</div>
			<div class="tits">检查报告二 </div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardB">
					<img :src="idCardB" alt="" id="bb">
					<p>上传检查报告二</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.leavehospitalpre" alt="">
				</div>
				<div v-if="pageState != 'edit'">
					<input v-if="anios==1" type="file" accept="image/*" @click="changes('B')" ref="idCardBFile">
					<input v-else type="file" accept="image/*" @change="change($event,'B')" ref="idCardBFile">
				</div>
			</div>
			<div class="tits">出院报告 </div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardC">
					<img :src="idCardC" alt="">
					<p>上传出院报告</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.imageinfo" alt="">
				</div>
				<div v-if="pageState != 'edit'">
					<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('C')" ref="idCardAFile">
					<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'C')" ref="idCardAFile">
				</div>
			</div>
		</div>
		<div class="others">
			<div class="tits">影像及其他资料 </div>
			<div class="uploadArea">
				<div class="photoList" v-for="(item,index) in photoList" v-if="item.show">
					<img :src="item.src" width="100" height="100" />
					<div class="mask">
						<span class="close" @click="delPhoto(index)" v-if="pageState != 'edit'">X</span> 
					</div>
				</div>
				<img src="@/assets/images/tianjia备份@2x.png" width="100" height="100" @click="addPhoto" class="add" v-if="pageState != 'edit'" v-show="photoAdd"/>
				<div v-if="pageState != 'edit'">
					<input type="file" accept="image/*" style="display: none;" @change="change($event,'D')" ref="file" />
				</div>
			</div>
		</div>
		<div class="btn_ok" v-if="showButton">
			<span @click="submit">确认上传</span>
		</div>

		<!-- 状态picker  -->
		<mt-popup v-model="popupVisibles" position="bottom">
			<mt-picker :slots="sexSlot" :showToolbar="true" :visibleItemCount="3" ref="sexPickers">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggles('hide')">取消</div>
					<div class="confrim" @click="editUserInfos">确定</div>
				</div>
			</mt-picker>
		</mt-popup>

		<!-- 检查日期  -->
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-datetime-picker :visibleItemCount="3" ref="datetimePicker" :startDate="startDate" :endDate="endDate" type="date" year-format="{value} 年" month-format="{value} 月"
			 date-format="{value} 日" @confirm="timeConfirm">
			</mt-datetime-picker>
		</mt-popup>

	</div>
</template>

<script>
	var date = new Date();
	let startDate = new Date(`${date.getFullYear()-3}/01/01`)
	let endDate = new Date(`${date.getFullYear()+3}/12/31`)
	
	import axios from 'axios'
	export default {
		name: "realName",
		data: () => ({
			startDate,
			endDate,
			showButton: true,  //是否显示确认上传按钮
			isShowDefalutIdCardA: true, //是否显示默认检查报告图片
			isShowDefalutIdCardB: true, //是否显示默认出院报告图片
			isShowDefalutIdCardC: true, //是否显示默认影像资料图片
			idCardA: "https://resource.jtsc.club/zhengmian@2x.png", //默认正面
			idCardB: "https://resource.jtsc.club/beimian@2x.png", //默认反面
			idCardC: "https://resource.jtsc.club/zhengmian@2x.png", //默认正面
			param: {
				statetext: "", //手术状态显示文本
				statecode: "", //手术状态值
				inspectdate: "", //建议检查日期（文本）
				inspectpre: "", //检查报告图片
				leavehospitalpre: "", //出院报告图片
				imageinfo: "", //影像资料图片
				user_name: "", //真实姓名
				otherinfo1: "", //其他资料图片
				otherinfo2: "", //其他资料图片
			},
			pdsfz: 1, //判断身份证正反面
			anios: 1,
			repData: {
				Sex: "", //性别
			},
			popupVisible: false, //是否显示状态选择picker
			popupVisibles: false, //是否显示检查日期picker
			sexSlot: [{
				flex: 1,
				values: ['手术前', '手术后', '化疗前', '化疗后', '放疗前', '放疗后', '复查'],
				className: 'slot1',
				textAlign: 'center'
			}],
			//图片list
			photoList:[
				{key:"otherinfo1", src:"", show: false},
				{key:"otherinfo2", src:"", show: false}
			],
			//图片加号
			photoAdd: true,  
			pageState: "add",
		}),
		methods: {
			downApp() {
//				let ua = navigator.userAgent.toLowerCase();
//				//Android终端
//				let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
//				//Ios终端
//				let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
//					this.anios = 2;
//					//Ios
//				} else if (/(Android)/i.test(navigator.userAgent)) {
//					this.anios = 1;
//					//Android终端
//				}
				this.anios = 2;
			},
			change(e, type) {
				let file = e.target.files[0];
				let url = URL.createObjectURL(file);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}; //添加请求头
				let params = new FormData(); //创建form对象
				params.append('uploadedFile', file); //通过append向form对象添加数据
				axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
					if (response.data.rspcode != 1) {
						return;
					}
					let responseUrl = response.data.url;
					if (type == 'A') {
						this.isShowDefalutIdCardA = false;
						this.param.inspectpre = responseUrl;
					} else if (type == 'B') {
						this.isShowDefalutIdCardB = false;
						this.param.leavehospitalpre = responseUrl;
					} else if (type == 'C') {
						this.isShowDefalutIdCardC = false;
						this.param.imageinfo = responseUrl;
					} else if (type == 'D') {
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
					}
				})

				// if(type == 'A'){
				//   let params = new FormData(); //创建form对象
				//   params.append('uploadedFile',file);//通过append向form对象添加数据
				//   this.isShowDefalutIdCardA = false;
				//   this.param.inspectpre = url;
				//   axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
				// 	if (response.data.rspcode != 1) {
				// 	  return;
				// 	}
				// 	this.param.inspectpre=response.data.url;
				//   })
				// }else if(type == 'B'){
				//   let params = new FormData(); //创建form对象
				//   params.append('uploadedFile',file);//通过append向form对象添加数据
				//   this.isShowDefalutIdCardB = false;
				//   this.param.leavehospitalpre = url;
				//   axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
				// 	if (response.data.rspcode != 1) {
				// 	  return;
				// 	}
				// 	this.param.leavehospitalpre=response.data.url;
				//   })
				// }else if(type == 'C'){
				//   let params = new FormData(); //创建form对象
				//   params.append('uploadedFile',file);//通过append向form对象添加数据
				//   this.isShowDefalutIdCardC = false;
				//   this.param.imageinfo = url;
				//   axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
				// 	if (response.data.rspcode != 1) {
				// 	  return;
				// 	}
				// 	this.param.imageinfo=response.data.url;
				//   })
				// }else if(type == 'D'){
				//   let params = new FormData(); //创建form对象
				//   params.append('uploadedFile',file);//通过append向form对象添加数据
				//   axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
				// 	if (response.data.rspcode != 1) {
				// 	  return;
				// 	}
				// 	this.param.otherinfo1 = url;
				// 	this.param.imageinfo=response.data.url;
				//   })
				// }
			},
			changes(types) {
				if (types == 'A') {
					this.pdsfz = 1;
				} else if (types == 'B') {
					this.pdsfz = 2;
				} else if (types == 'C') {
					this.pdsfz = 3;
				} else if (types == 'D') {
					this.pdsfz = 4;
				}
				window.back.clickOnAndroidSelectPhoto();
			},
			showbg(name) {
				let url = "UserInterface/UploadPhotos.ashx";
				this.$post(url, {
					BinaryStream: name
				}).then((data) => {
					if (data.rspcode == 0) {
						return;
					}
					let responseUrl = responseUrl;
					if (this.pdsfz == 1) {
						this.isShowDefalutIdCardA = false;
						this.param.inspectpre = responseUrl;
					} else if (this.pdsfz == 2) {
						this.isShowDefalutIdCardB = false;
						this.param.leavehospitalpre = responseUrl;
					} else if (this.pdsfz == 3) {
						this.isShowDefalutIdCardC = false;
						this.param.imageinfo = responseUrl;
					} else if (this.pdsfz == 4) {
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
					}
				})
			},
			//检查日期
			pickerToggle(state) {
				if (state == "show") {
					this.popupVisible = true;
					const {
						datetimePicker
					} = this.$refs;
					datetimePicker.open()
				}
			},
			//显示状态picker
			pickerToggles(state) {
				if (state == "show") {
					this.popupVisibles = true;
				}
				if (state == "hide") {
					this.popupVisibles = false;
				}
			},
			// 反显信息
			showInform() {
				let url = "UserInterface/cart/ReviewManagementDetailInfo.ashx";
				this.$post(url,{
					id: this.$route.query.id
				}).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.isShowDefalutIdCardA = false;
					this.isShowDefalutIdCardB = false;
					this.isShowDefalutIdCardC = false;
					this.param.statecode = data.statecode; //手术状态值
					this.param.inspectdate = data.inspectdate; //检查日期
					this.param.inspectpre = data.inspectpre; //检查报告图片
					this.param.leavehospitalpre = data.leavehospitalpre; //出院报告图片
					this.param.imageinfo = data.imageinfo; //影像资料图片
					this.photoList[0].src = data.otherinfo1; //其他资料图片
					this.photoList[0].show = true;
					this.photoList[1].src = data.otherinfo2; //其他资料图片
					this.photoList[1].show = true;
				})
			},
			//选择状态确定
			editUserInfos() {
				const {
					sexPickers
				} = this.$refs;
				let statecode = sexPickers.getSlotValue(0);
				this.param.statecode = statecode;
				this.pickerToggles('hide');
			},
			//建议日期确定
			timeConfirm(timeDate) {
				const year = timeDate.getFullYear();
				const month = timeDate.getMonth() + 1;
				const date = timeDate.getDate();
				this.param.inspectdate = `${year}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`;
			},
			//提交
			submit() {
				const param = this.param;
				// if (param.inspectpre == "") {
				// 	this.$Toast("请上传有效的检查报告图片")
				// 	return;
				// }
				// if (param.leavehospitalpre == "") {
				// 	this.$Toast("请上传有效的出院报告图片")
				// 	return;
				// }
				// if (param.imageinfo == "") {
				// 	this.$Toast("请输入有效的影像资料图片")
				// 	return;
				// }
				//设置图片地址
				for(let i=0; i<this.photoList.length; i++){
					const item = this.photoList[i];
					param[item.key] = item.src;
				}
				let url = "UserInterface/cart/ReviewManagementUpdate.ashx";
				this.$post(url, this.param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.$router.back();
				})
			},
			//input 添加失去焦点事件
			inputInputBulr() {
				var inputDoms = document.querySelectorAll(".form input");
				inputDoms = [].slice.call(inputDoms);
				inputDoms.forEach((input) => {
					input.addEventListener("focus", this.$root.windowRecordScroll.bind(this.$root), false);
					input.addEventListener("blur", this.$root.windowScrollTop.bind(this.$root), false);
				})
			},
			
			//其他资料 增加图片按钮
			addPhoto(){
				this.pdsfz = 4;
				if(this.anios == 2){
					//Ios
				    return this.$refs.file.click()
				}else if(this.anios == 1){
					//Android终端	
				    window.back.clickOnAndroidSelectPhoto();
				}
			},
			// 删除图片
			delPhoto(index){
				//删除图片数据
				this.photoList[index].show = false;
				this.photoList[index].src = "";
				//显示图片新增按钮
				this.photoAdd = true;
			},
			
		},
		mounted() {
			
			this.downApp();
			window.showbg = this.showbg;
			let that = this;
			//头像的弹窗
			this.userActions = [{
				name: '更换头像',
				method: this.openAlbum
			}]
			//初始化input的事件
			this.inputInputBulr()
			
			const id = this.$route.query.id;
			if(id){
				this.showInform();
				this.showButton = false;  //是否显示确认上传按钮
				this.photoAdd = false;    //是否图片新增按钮
				this.pageState = "edit";
				
			}else{
				const date = new Date();
				let year = date.getFullYear(); 
				let month = date.getMonth(); 
				month = month+1 < 10 ? `0${month+1}`: month+1;
				let day = date.getDay(); 
				day = day < 10 ? `0${day}` : day;
				this.param.inspectdate = `${year}-${month}-${day}`
			}
		}
	}
</script>
<style>
	/* .physc{
	  .mint-popup-bottom{
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
	} */
	/* .real_name_root .form{
    background: #fff;
    color: #333333;
    overflow: auto;
  }
  .real_name_root .form .tit{
    padding: 0 10px;
    line-height: 40px;
    font-size: 0.14rem;
    color: #666666;
  }
  .real_name_root .form input{
    border: none;
    color: #333333;
  } */
</style>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.img_wrap {
		background: #fff;
		padding: 0 10px;
		padding-bottom: 10px;

		.tits {
			font-size: 0.15rem;
			color: #333535;
			line-height: 0.5rem;
			margin-top: 0.1rem;
		}

		.img {
			position: relative;
			background: #F9F9F9;
			color: $color66;
			font-size: 0.14rem;
			height: 1.90rem;
		}

		.img .defaultImg {
			height: 100%;

			img {
				width: 18%;
				margin-top: 50px;
				margin-bottom: 25px;
			}
		}

		.img input[type=file] {
			opacity: 0;
			width: 100%;
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		.img .newImg {
			width: 100%;
			height: 100%;
		}

		.img .newImg:before {
			content: "";
			display: inline-block;
			width: 0px;
			height: 100%;
			vertical-align: middle;
		}

		.img .newImg img {
			max-height: 100%;
			max-width: 100%;
			display: inline-block;
			vertical-align: middle;
		}
	}

	.others {
		background: #fff;
		padding: 0 10px;
		padding-bottom: 0.7rem;

		.tits {
			font-size: 0.15rem;
			color: #333535;
			line-height: 0.5rem;
			margin-top: 0.1rem;
		}

		/*上传图片区域*/
		.uploadArea {
			padding: 0.12rem;
			padding-top: 0;

			.photoList,
			.add {
				width: 100px;
				height: 100px;
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 10px;
				vertical-align: top;
				position: relative;
			}

			.mask {
				position: absolute;
				width: 100%;
				top: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .2);

				.close {
					position: absolute;
					right: 5px;
					top: 5px;
					color: #FFFFFF;
					font-size: 16px;
				}
			}
		}
	}

	.mint-popup-bottom {
		width: 100%;
	}

	.picker_bar {
		display: flex;
		justify-content: space-between;
		text-align: center;
		line-height: 40px;
		padding: 0 20px;
		border-bottom: solid 1px #eaeaea;

		.confrim {
			color: #26a2ff;
		}
	}

	.add_btn {
		margin-top: 0.6rem;
	}

	.link_kf {
		font-size: 0.12rem;
		color: #FF3D3D;
		line-height: 0.2rem;
		padding: 0.14rem 3%;
	}

	.form_bname {
		background: #fff;
		border-bottom: 1px solid #eee;

		span {
			font-size: 16px;
			height: 48px;
			line-height: 48px;
			padding: 0 10px;
		}

		input {
			width: 50%;
			float: right;
			text-align: right;
			height: 48px;
			font-size: 0.14rem;
			margin-right: 30px;
		}
	}

	.shzyd {
		padding: 0 10px;
		padding-bottom: 10px;
		margin-top: 0.1rem;
		background: #fff;

		.tits {
			font-size: 0.15rem;
			color: #333535;
			line-height: 0.5rem;
		}

		textarea {
			min-height: 1.1rem;
			max-height: 1.1rem;
			min-width: 94%;
			max-width: 94%;
			border: none;
			resize: none;
			padding: 0.1rem;
			background: #F9F9F9;
			font-size: 0.14rem;
			color: #666;
		}
	}

	.btn_ok {
		width: 100%;
		border-top: 1px solid #eee;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 0.6rem;
		background: #fff;
		font-size: 0.15rem;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.4rem;

		span {
			width: 92%;
			height: 0.4rem;
			display: block;
			background: #F78335;
			border-radius: 0.35rem;
			margin: 0.1rem 0 0 4%;
		}
	}
	.img_wrap.eyepic .img{
		height: auto;
	}
	.img_wrap.eyepic .img .newImg img{
		width: 100%;
		height: auto;
	}
</style>
