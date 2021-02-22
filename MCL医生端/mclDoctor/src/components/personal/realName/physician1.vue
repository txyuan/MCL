<template>
	<div class="padding-header physician">
		<mt-header fixed title="完善资料"></mt-header>
		<div class="mains">
			<div class="phys_top d-flex justify-content-around">
				<div class="phys_list aaccv">
<!--					<p>-->
<!--						<span class="aaccv"></span>-->
<!--					</p>-->
          <i class="icons icon-doctor"></i>
					<label>基本信息</label>
				</div>
				<div class="phys_list">
					<p>
						<span></span>
					</p>
          <i class="icons icon-personal"></i>
					<label>个人介绍</label>
				</div>
				<div class="phys_list">
					<p>
						<span></span>
					</p>
          <i class="icons icon-photo"></i>
					<label>个人照片</label>
				</div>
				<div class="phys_list">
					<p>
						<span></span>
					</p>
          <i class="icons icon-license"></i>
					<label>医生执照</label>
				</div>
			</div>
			<div class="form" style="margin-top: 0.1rem">
				<div class="form_bname  d-flex align-items-center">
          <div>手机号码<span>(<em>*</em>必填)</span></div>
          <div class="flex-grow-1"><input type="" placeholder="请输入手机号码" readonly="readonly" v-model="phonenum" /></div>
				</div>
				<div class="form_bname d-flex align-items-center">
					<div>姓名<span>(<em>*</em>必填)</span></div>
          <div class="flex-grow-1"><input type="" placeholder="请输入真实姓名" v-model="param.name" /></div>
				</div>
        <div class="form_bname d-flex align-items-center">
          <div>性别</div>
          <div class="flex-grow-1"><mt-cell  is-link @click.native="pickerToggles('show')" >
					<!-- <span v-if="param.sex == 1">男</span>
					<span v-if="param.sex == 2">女</span> -->
					<span style="">{{param.sex || '请选择您的性别'}}</span>
          </mt-cell></div>
        </div>

        <div class="form_bname d-flex align-items-center">

          <div>地区</div>
          <div class="flex-grow-1"><mt-cell title="" is-link @click.native="openCityPicker('show')" >
					<span>{{param.city || '请选择您所在地区'}}</span>
				</mt-cell>
          </div>
        </div>

				<div class="form_bname d-flex align-items-center">
					<div>医院/公司<span>(<em>*</em>必填)</span></div>
          <div class="flex-grow-1"><input type="" placeholder="请输入所属医院/公司" v-model="param.hospital" /></div>
				</div>
				<div class="form_bname d-flex align-items-center">
					<div>科室/部门<span>(<em>*</em>必填)</span></div>
          <div class="flex-grow-1"><input type="" placeholder="请输入所属科室/部门" v-model="param.department" /></div>
				</div>
				<div class="form_bname d-flex align-items-center">
					<div>角色<span>(<em>*</em>必填)</span></div>
          <div class="flex-grow-1">
            <mt-cell title="" is-link @click.native="pickerTogglez('show')" >
              <span>{{param.title || '请选择您的角色'}}</span>
            </mt-cell>
<!--            <input type="" placeholder="请选择角色" v-model="param.title" />-->
          </div>
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

      <p class="phys_ppo"><span>*</span>请按照要求完善必填项并上传资料，否则将不能通过审核</p>
		</div>
		<!-- <div class="img_wrap">
			<div class="tits">请上传医师认证资料 </div>
			<div class="img text-center" style="margin-bottom: 10px">
				<div class="defaultImg" v-if="isShowDefalutIdCardA">
					<img :src="idCardA" alt="">
					<p>医师执业证</p>
				</div>
				<div class="newImg" v-else>
					<img :src="param.practisingimg" alt="">
				</div>
				<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('A')" ref="idCardAFile">
				<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'A')" ref="idCardAFile">
			</div>
			<div class="img text-center" style="margin-bottom: 10px">
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
			</div>
		</div> -->
		<!-- <div class="shzyd">
			<div class="tits">擅长</div>
			<textarea placeholder="输入专业领域、擅长病种等信息" v-model="param.begoodat"></textarea>
		</div> -->
		<div class="btn_ok" @click="submit">下一步</div>
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
					<div class="cancel" @click="pickerToggles('hide')">取消</div>
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
					<div class="cancel" @click="pickerTogglez('hide')">取消</div>
					<div class="confrim" @click="editUserInfoz">确定</div>
				</div>
			</mt-picker>
		</mt-popup>

		<cityPicker @confrim="cityPickerChange" ref="cityPicker"/>
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
				name: "", //真实姓名
				sex: "", //性别
				department: "", //科室
				hospital: "", //医院
				title: "", //职称
				city:"",  //城市
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
				values: [ '主任医师', '副主任医师','主治医师', '医师',  '护士', '医学顾问', '营养师'
				],
				className: 'slot1',
				textAlign: 'center'
			}],
			phonenum:''
		}),
		methods: {
			// 获取手机号
			getphone(){
				let { UserKey,SessionId } = this.$route.query;
				let url = `UserInterface/GetUserShowInfo.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.phonenum=data.data.Account;
				})
			},
			//citypicker的确定回调
			cityPickerChange(values){
			  let cityValue = [values[0].name,values[1].name,values[2].name].toString();
			  this.param.city = cityValue;
			},
      //打开citypicker
      openCityPicker(){
        this.$refs.cityPicker.show();
      },
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
				let url = `UserInterface/doctor/InsertDoctorInfo1.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
				this.$post(url, this.param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.$router.push(`/physician2?UserKey=${UserKey}&SessionId=${SessionId}`);
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
			this.getphone();
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
		},
		components:{
			cityPicker: () => import(/* webpackChunkName: "cityData" */"./../../common/cityPicker.vue")
		}
	}
</script>
<style>

  .mains .form .mint-cell-value span{
    font-size: 0.14rem;
    color: #787878;

  }
  .mains .form .mint-cell-value.is-link {
    margin-right: 0.125rem;
  }
  .mains .form .mint-cell-allow-right::after{
    right: 0.02rem;
  }
  .mains .form .mint-cell .mint-cell-wrapper{
    padding: 0;
  }
 .physician .picker-toolbar{
    height: 0.42rem;
  }
  .physician .mint-popup-bottom,.physician .city_picker_root{
    min-height: 35%;
  }
  .physician .city-picker .bar{
       line-height: 0.42rem;
       padding: 0;
  }
  .physician .city-picker .bar span{
    text-align: center;
    background-color: #e5e5e5;
    width: 50%;
  }
  .physician .city-picker .bar .confirm{
    color: #FFFFFF;
    background-color: #4A8EF4;
  }
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
  .padding-header {
    padding-top:0.44rem;
    padding-bottom:0.44rem;
  }
  .mint-header {
    height:0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .mains{
    margin-top: 0.1rem;
    margin-bottom: 0.5rem;
  }
	.img_wrap {
		background: #fff;
    padding: 0 0.125rem 0.125rem 0.125rem;
    margin-top: 0.1rem;

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
		line-height: 0.42rem;
		padding: 0;
		border-bottom: solid 1px #eaeaea;
    background-color: #4A8EF4;
    .cancel{
      width: 50%;
      background-color: #e5e5e5;
    }
		.confrim {
      width: 50%;
			color: #FFFFFF;
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
    font-size: 0.155rem;
    padding:0 0.15rem 0 0.125rem;
		span {
			font-size:0.13rem;
      color: #999999;
      margin-left: 0.05rem;
      em{
        font-size: 0.16rem;
        color: #FF1E41;
        margin-right: 0.02rem;
        vertical-align: sub;
      }
		}

		input {
			width: 100%;
			text-align: right;
			height: 0.44rem;
			font-size: 0.14rem;
      margin-right: 0.2rem;
      color: #787878;
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
    width: 90%;
    margin:0.5rem auto 0 auto;
    display: block;
    height: 0.44rem;
    background: #4A8EF4;
    font-size: 0.16rem;
    color: #FFFFFF;
    text-align: center;
    line-height: 0.5rem;
    border-radius: 0.2rem;
    /*position: absolute;*/
    /*bottom: 0;*/
	}
	.phys_top{
		width:100%;
		margin: 0 auto;
		overflow: hidden;
    padding: 0.2rem 0;
    background-color: #FFFFFF;
    color: #666666;
		.phys_list{
      position: relative;
      &.aaccv{
        color: #307aed;
        .icon-doctor{
          background-image: url("../../../assets/images/icon-doctor_a.png");
        }
        .icon-personal{
          background-image: url("../../../assets/images/icon-personal_a.png");
        }
        .icon-photo{
          background-image: url("../../../assets/images/icon-photo_a.png");
        }
        .icon-license{
          background-image: url("../../../assets/images/icon-license_a.png");
        }
        p{
          border-bottom: 1px dashed #307aed;
        }
      }
      .icons{
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        background-size: 100%;
        margin: 0 auto;
        background-position: center bottom;
        background-repeat: no-repeat;
      }
      .icon-doctor{
        background-image: url("../../../assets/images/icon-doctor.png");
      }
      .icon-personal{
        background-image: url("../../../assets/images/icon-personal.png");
      }
      .icon-photo{
        background-image: url("../../../assets/images/icon-photo.png");
      }
      .icon-license{
        background-image: url("../../../assets/images/icon-license.png");
      }
			p{
        width: 76%;
        height: 0.02rem;
        border-bottom: 1px dashed #bababa;
        position: absolute;
        margin-top: 0.14rem;
        top: 0;
        left: -80%;
			}
			label{
				display: block;
				font-size: 0.13rem;
				text-align: center;
				padding-top: 0.05rem;
			}
		}
	}
	.phys_ppo{
		font-size: 0.13rem;
		padding: 0.125rem 5% 0.05rem 5%;
		color: #999999;
		span{
			color: red;
		}
	}
  .d-flex {
    display: -ms-flexbox!important;
    display: flex!important;
  }

  .justify-content-around {
    -ms-flex-pack: distribute!important;
    justify-content: space-around!important;
  }
  .flex-grow-1 {
    -ms-flex-positive: 1!important;
    flex-grow: 1!important;
  }
  .align-items-center {
    -ms-flex-align: center!important;
    align-items: center!important;
  }
</style>
