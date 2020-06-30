<template>
	<div class="padding-header" style="padding-bottom: 0.2rem;">
		<mt-header title="医师认证" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="phys_top">
			<div class="phys_list">
				<p>
					<span class="aaccv"></span>
				</p>
				<label>基本信息</label>
			</div>
			<div class="phys_list">
				<p>
					<span class="aaccv"></span>
				</p>
				<label>个人介绍</label>
			</div>
			<div class="phys_list">
				<p>
					<span class="aaccv"></span>
				</p>
				<label>个人照片</label>
			</div>
			<div class="phys_list">
				<p>
					<span></span>
				</p>
				<label>医生执照</label>
			</div>
		</div>
		<p class="phys_ppo"><span>*</span>请按照要求完善上传资料，否则将不能通过审核</p>
		<div class="img_wrap">
			<div class="tits">请上传个人照片 </div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardA">
					<img :src="idCardA" alt="">
					<p>个人照片</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.practisingimg" alt="">
				</div>
				<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('A')" ref="idCardAFile">
				<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'A')" ref="idCardAFile">
			</div>
			<!-- <div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardB">
					<img :src="idCardB" alt="" id="bb">
					<p>医生工牌 (选填)</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.workcardimg" alt="">
				</div>
				<input v-if="anios==1" type="file" accept="image/*" @click="changes('B')" ref="idCardBFile">
				<input v-else type="file" accept="image/*" @change="change($event,'B')" ref="idCardBFile">
			</div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardC">
					<img :src="idCardC" alt="">
					<p>医师资格证 (选填)</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.qualificationsimg" alt="">
				</div>
				<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('C')" ref="idCardAFile">
				<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'C')" ref="idCardAFile">
			</div>
			<div class="img text-center">
				<div class="defaultImg" v-if="isShowDefalutIdCardD">
					<img :src="idCardD" alt="" id="bb">
					<p>医师职称证 (选填)</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.professionalimg" alt="">
				</div>
				<input v-if="anios==1" type="file" accept="image/*" @click="changes('D')" ref="idCardBFile">
				<input v-else type="file" accept="image/*" @change="change($event,'D')" ref="idCardBFile">
			</div> -->
		</div>
		<span class="btn_ok" @click="submit">下一步</span>
		
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: "realName",
		data: () => ({
			isShowDefalutIdCardA: true, //是否显示默认医师执业证
			isShowDefalutIdCardB: true, //是否显示默认医生工牌
			isShowDefalutIdCardC: true, //是否显示默认医师资格证
			isShowDefalutIdCardD: true, //是否显示默认医师职称证
			idCardA: "https://resource.jtsc.club/zhengmian@2x.png", //默认正面
			idCardB: "https://resource.jtsc.club/beimian@2x.png", //默认反面
			idCardC: "https://resource.jtsc.club/zhengmian@2x.png", //默认正面
			idCardD: "https://resource.jtsc.club/beimian@2x.png", //默认反面
			param: {
				practisingimg: "", //医师执业证
			},
			pdsfz: 1, //判断身份证正反面
			anios: 1,
			repData: {
				Sex: "", //性别
			},
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
				let { UserKey,SessionId } = this.$route.query;
				console.log(UserKey)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}; //添加请求头
				if (type == 'A') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardA = false;
					this.param.practisingimg = url;
					axios.post(`UserInterface/UploadFile.ashx?UserKey=${UserKey}&SessionId=${SessionId}`, params, config).then(response => {
						if (response.data.rspcode != 1) {
							return;
						}
						this.param.practisingimg = response.data.url;
					})
				} else if (type == 'B') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardB = false;
					this.param.workcardimg = url;
					axios.post(`UserInterface/UploadFile.ashx?UserKey=${UserKey}&SessionId=${SessionId}`, params, config).then(response => {
						if (response.data.rspcode != 1) {
							return;
						}
						this.param.workcardimg = response.data.url;
					})
				} else if (type == 'C') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardC = false;
					this.param.qualificationsimg = url;
					axios.post(`UserInterface/UploadFile.ashx?UserKey=${UserKey}&SessionId=${SessionId}`, params, config).then(response => {
						if (response.data.rspcode != 1) {
							return;
						}
						this.param.qualificationsimg = response.data.url;
					})
				} else if (type == 'D') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardD = false;
					this.param.professionalimg = url;
					axios.post(`UserInterface/UploadFile.ashx?UserKey=${UserKey}&SessionId=${SessionId}`, params, config).then(response => {
						if (response.data.rspcode != 1) {
							return;
						}
						this.param.professionalimg = response.data.url;
					})
				}
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
					if (this.pdsfz == 1) {
						this.isShowDefalutIdCardA = false;
						this.param.practisingimg = data.data.imgUrl;
					} else {
						this.isShowDefalutIdCardB = false;
						this.param.workcardimg = data.data.imgUrl;
					}
				})
			},
			
			// 反显信息
			showInform() {
				let url = "UserInterface/RealNameAuthenticationInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspCode != 1) {
						return;
					}
					this.isShowDefalutIdCardA = false;
					this.isShowDefalutIdCardB = false;
					this.param.practisingimg = data.data.practisingimg;
					this.param.workcardimg = data.data.workcardimg;
					this.param.user_name = data.data.user_name;
					this.param.id_card = data.data.id_card;
					this.param.bank_card = data.data.bank_card;
					this.param.hospital = data.data.validity_time;
				})
			},
			//编辑个人信息
			editUserInfo() {
				const {
					sexPicker
				} = this.$refs;
				let sex = sexPicker.getSlotValue(0);
				this.param.hospital = sex;
				this.pickerToggle('hide');
			},
			editUserInfos() {
				const {sexPickers} = this.$refs;
				let sex = sexPickers.getSlotValue(0);
				// sex = (sex == "男" ? 1 : 2);
				this.param.sex = sex;
				this.pickerToggles('hide');
			},
			editUserInfok() {
				const {
					sexPickerk
				} = this.$refs;
				let sex = sexPickerk.getSlotValue(0);
				this.param.department = sex;
				this.pickerTogglek('hide');
			},
			editUserInfoz() {
				const {
					sexPickerz
				} = this.$refs;
				let sex = sexPickerz.getSlotValue(0);
				this.param.title = sex;
				this.pickerTogglez('hide');
			},
			//提交
			submit() {
				const param = this.param;
				let { UserKey,SessionId } = this.$route.query;
				let url = `UserInterface/UserEdit.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
				let params={
					HeadImageUrl:this.param.practisingimg
				};
				this.$post(url, params).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.$router.push(`/physician4?UserKey=${UserKey}&SessionId=${SessionId}`);
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
			}
		},
		mounted() {
			// this.showInform();
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
		width: 94%;
		margin: 0 auto;
		display: block;
		height: 0.5rem;
		background: #24b7c0;
		font-size: 0.16rem;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 6px;
		margin-top: 0.3rem;
	}
	.phys_top{
		width: 88%;
		margin: 0 auto;
		overflow: hidden;
		.phys_list{
			width: 25%;
			float: left;
			p{
				width: 100%;
				height: 0.02rem;
				background: #999;
				position: relative;
				margin-top: 0.14rem;
				span{
					width: 0.06rem;
					height: 0.06rem;
					display: block;
					background: #999;
					position: absolute;
					border-radius: 0.03rem;
					top: -0.02rem;
					left: 50%;
					margin-left: -0.03rem;
					&.aaccv{
						background: #4A8EF4;
					}
				}
			}
			label{
				display: block;
				font-size: 0.13rem;
				text-align: center;
				padding-top: 0.12rem;
			}
		}
	}
	.phys_ppo{
		font-size: 0.13rem;
		padding: 0.14rem 5% 0.06rem 5%;
		color: #666;
		span{
			color: red;
		}
	}
</style>
