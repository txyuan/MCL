<template>
	<div class="padding-header" style="padding-bottom: 0.2rem;">
		<mt-header title="医师认证" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="mains">
			<div class="form" style="margin-top: 0.06rem">
				<div class="form_bname">
					<span>姓名</span>
					<input type="" placeholder="请输入真实姓名(必填)" v-model="param.name" />
				</div>
				<mt-cell title="性别" is-link @click.native="pickerToggles('show')" style="border-bottom: 1px solid #eee;">
					<!-- <span v-if="param.sex == 1">男</span>
					<span v-if="param.sex == 2">女</span> -->
					<span style="">{{param.sex}}</span>
				</mt-cell>
				<div class="form_bname">
					<span>医院</span>
					<input type="" placeholder="请输入所属医院(必填)" v-model="param.hospital" />
				</div>
				<div class="form_bname">
					<span>科室</span>
					<input type="" placeholder="请输入所属科室(必填)" v-model="param.department" />
				</div>
				<div class="form_bname">
					<span>职称</span>
					<input type="" placeholder="请输入您的职称(必填)" v-model="param.title" />
				</div>
				<!-- <mt-cell title="医院" is-link @click.native="pickerToggle('show')" style="border-bottom: 1px solid #eee">
					<span>{{param.hospital}}</span>
				</mt-cell>
				<mt-cell title="科室" is-link @click.native="pickerTogglek('show')" style="border-bottom: 1px solid #eee;">
					<span style="">{{param.department}}</span>
				</mt-cell>
				<mt-cell title="职称" is-link @click.native="pickerTogglez('show')" style="border-bottom: 1px solid #eee">
					<span>{{param.title}}</span>
				</mt-cell> -->

			</div>
		</div>
		<div class="img_wrap">
			<div class="tits">请上传医师认证资料 </div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardA">
					<img :src="idCardA" alt="">
					<p>医师执业证</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.practisingimg" alt="">
				</div>
				<!-- <input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('A')" ref="idCardAFile"> -->
				<input type="file" accept="image/*" name="uploadedFile" @change="change($event,'A')" ref="idCardAFile">
			</div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardB">
					<img :src="idCardB" alt="" id="bb">
					<p>医生工牌 (选填)</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.workcardimg" alt="">
				</div>
				<!-- <input v-if="anios==1" type="file" accept="image/*" @click="changes('B')" ref="idCardBFile"> -->
				<input type="file" accept="image/*" @change="change($event,'B')" ref="idCardBFile">
			</div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardC">
					<img :src="idCardC" alt="">
					<p>医师资格证 (选填)</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.qualificationsimg" alt="">
				</div>
				<!-- <input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('C')" ref="idCardAFile"> -->
				<input type="file" accept="image/*" name="uploadedFile" @change="change($event,'C')" ref="idCardAFile">
			</div>
			<div class="img text-center">
				<div class="defaultImg" v-if="isShowDefalutIdCardD">
					<img :src="idCardD" alt="" id="bb">
					<p>医师职称证 (选填)</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.professionalimg" alt="">
				</div>
				<!-- <input v-if="anios==1" type="file" accept="image/*" @click="changes('D')" ref="idCardBFile"> -->
				<input type="file" accept="image/*" @change="change($event,'D')" ref="idCardBFile">
				<!-- <input v-if="anios==3" type="file" accept="image/*" @click="changes('D')" ref="idCardBFile">
			<input v-else type="file" accept="image/*" @change="change($event,'D')" ref="idCardBFile"> -->
			</div>
		</div>
		<div class="shzyd">
			<div class="tits">擅长</div>
			<textarea placeholder="输入专业领域、擅长病种等信息" v-model="param.begoodat"></textarea>
		</div>
		<span class="btn_ok" @click="submit">保存</span>
		<!-- 发卡银行picker  -->
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfo">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
		<!-- 性别picker  -->
		<mt-popup v-model="popupVisibles" position="bottom">
			<mt-picker :slots="sexSlot" :showToolbar="true" :visibleItemCount="3" ref="sexPickers">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfos">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
		<!-- 科室picker  -->
		<mt-popup v-model="popupVisiblek" position="bottom">
			<mt-picker :slots="sexSlotk" :showToolbar="true" :visibleItemCount="3" ref="sexPickerk">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfok">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
		<!-- 职称picker  -->
		<mt-popup v-model="popupVisiblez" position="bottom">
			<mt-picker :slots="sexSlotz" :showToolbar="true" :visibleItemCount="3" ref="sexPickerz">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfoz">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
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
				workcardimg: "", //医生工牌
				qualificationsimg: "", //医师资格证
				professionalimg: "", //医师职称证
				name: "", //真实姓名
				sex: "", //性别
				department: "", //科室
				hospital: "", //医院
				title: "", //职称
				begoodat:"",  //擅长
			},
			pdsfz: 1, //判断身份证正反面
			anios: 1,
			repData: {
				Sex: "", //性别
			},
			popupVisible: false, //是否显示银行picker
			popupVisibles: false, //是否显示性别picker
			popupVisiblek: false, //是否显示科室picker
			popupVisiblez: false, //是否显示职称picker
			sexSlots: [{
				flex: 1,
				values: ['中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '中信银行', '中国光大银行', '华夏银行', '中国民生银行', '广发银行', '深圳发展银行',
					'招商银行', '兴业银行', '上海浦东发展银行', '恒丰银行', '浙商银行', '渤海银行', '中国邮政储蓄银行', '北京银行'
				],
				className: 'slot1',
				textAlign: 'center'
			}],
			sexSlot: [{
				flex: 1,
				values: ['男', '女'],
				className: 'slot1',
				textAlign: 'center'
			}],
			sexSlotk: [{
				flex: 1,
				values: ['中国工商银行2', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '中信银行', '中国光大银行', '华夏银行', '中国民生银行', '广发银行', '深圳发展银行',
					'招商银行', '兴业银行', '上海浦东发展银行', '恒丰银行', '浙商银行', '渤海银行', '中国邮政储蓄银行', '北京银行'
				],
				className: 'slot1',
				textAlign: 'center'
			}],
			sexSlotz: [{
				flex: 1,
				values: ['中国工商银行3', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '中信银行', '中国光大银行', '华夏银行', '中国民生银行', '广发银行', '深圳发展银行',
					'招商银行', '兴业银行', '上海浦东发展银行', '恒丰银行', '浙商银行', '渤海银行', '中国邮政储蓄银行', '北京银行'
				],
				className: 'slot1',
				textAlign: 'center'
			}],
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
				if (type == 'A') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardA = false;
					this.param.practisingimg = url;
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
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
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
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
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
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
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
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
			//显示银行picker
			pickerToggle(state) {
				if (state == "show") {
					this.popupVisible = true;
				}
				if (state == "hide") {
					this.popupVisible = false;
				}
			},
			//显示性别picker
			pickerToggles(state) {
				if (state == "show") {
					this.popupVisibles = true;
				}
				if (state == "hide") {
					this.popupVisibles = false;
				}
			},
			//显示科室picker
			pickerTogglek(state) {
				if (state == "show") {
					this.popupVisiblek = true;
				}
				if (state == "hide") {
					this.popupVisiblek = false;
				}
			},
			//显示职称picker
			pickerTogglez(state) {
				if (state == "show") {
					this.popupVisiblez = true;
				}
				if (state == "hide") {
					this.popupVisiblez = false;
				}
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
				if ((param.practisingimg == "") || (param.workcardimg == "")) {
					this.$Toast("请上传有效的医师执业证或医生工牌")
					return;
				}
				if (param.name == "") {
					this.$Toast("请输入有效的真实姓名")
					return;
				}
				if (param.hospital == "") {
					this.$Toast("请输入所属医院")
					return;
				}
				if (param.department == "") {
					this.$Toast("请输入所属科室")
					return;
				}
				if (param.title == "") {
					this.$Toast("请输入所属职称")
					return;
				}
				let { UserKey,SessionId } = this.$route.query;
				let url = `UserInterface/doctor/PhysicianAccreditation.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
				this.$post(url, this.param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.$router.push('/appDown');
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
		background: #4A8EF4;
		font-size: 0.16rem;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 6px;
		margin-top: 0.3rem;
	}
</style>
