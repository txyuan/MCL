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
      <div class="phys_top d-flex justify-content-around">
      <div class="phys_list aaccv">
        <i class="icons icon-doctor"></i>
        <label>基本信息</label>
      </div>
      <div class="phys_list aaccv">
        <p>
          <span></span>
        </p>
        <i class="icons icon-personal"></i>
        <label>个人介绍</label>
      </div>
      <div class="phys_list aaccv">
        <p>
          <span></span>
        </p>
        <i class="icons icon-photo"></i>
        <label>个人照片</label>
      </div>
      <div class="phys_list aaccv">
        <p>
          <span></span>
        </p>
        <i class="icons icon-license"></i>
        <label>医生执照</label>
      </div>
    </div>
      <div class="img_wrap">
        <div class="tits"><em></em>请上传医师认证资料 <span style="color: #1cb0b9;font-size: 12px">（至少选一证件上传或者输入省份证码）</span></div>
				<div class="form">
					<div class="form_bname  d-flex align-items-center">
						<div>身份证号</div>
						<div class="flex-grow-1"><input type="" placeholder="请输入身份证码" v-model="param.IdNumber"/></div>
					</div>
				</div>
				
        <div class="img text-center" style="margin-bottom: 10px">
          <div class="defaultImg" v-if="isShowDefalutIdCardA">
            <img :src="idCardA" alt="">
            <p style="color: #787878"> <img src="../../../assets/images/编组 3@2x.png" style="height: 0.33rem;width: 0.46rem; margin: 0;display: block;margin: 0 auto 0.1rem auto;"/>医师执业证</p>
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
            <p style="color: #787878"> <img src="../../../assets/images/编组 3@2x.png" style="height: 0.33rem;width: 0.46rem; margin: 0;display: block;margin: 0 auto 0.1rem auto;"/>医生工牌 </p>

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
            <p style="color: #787878"> <img src="../../../assets/images/编组 3@2x.png" style="height: 0.33rem;width: 0.46rem; margin: 0;display: block;margin: 0 auto 0.1rem auto;"/>医师资格证 </p>

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
            <p style="color: #787878"> <img src="../../../assets/images/编组 3@2x.png" style="height: 0.33rem;width: 0.46rem; margin: 0;display: block;margin: 0 auto 0.1rem auto;"/>医师职称证 </p>

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
        <div class="tits"><em></em>擅长</div>
        <textarea placeholder="输入专业领域、擅长病种等信息" v-model="param.begoodat"></textarea>
      </div>
      <p class="phys_ppo"><span>*</span>请按照要求完善上传资料，否则将不能通过审核</p>
    </div>
		<div class="btn_ok" @click="submit">确定</div>

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
				IdNumber: "", //身份证号
				practisingimg: "", //医师执业证
				workcardimg: "", //医生工牌
				qualificationsimg: "", //医师资格证
				professionalimg: "", //医师职称证
				begoodat:"",  //擅长
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
				if((param.IdNumber !='') && IsCard(param.IdNumber) == false){
					this.$Toast("请输入有效的身份证码")
					return
				}
				if (IsCard(param.IdNumber) || (param.practisingimg != "") || (param.workcardimg != "") || (param.qualificationsimg != "") || (param.professionalimg != "")) {
					let { UserKey,SessionId } = this.$route.query;
					let url = `UserInterface/doctor/InsertDoctorInfo3.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
					this.$post(url, this.param).then((data) => {
						this.$Toast(data.rspdesc);
						if (data.rspcode != 1) {
							return;
						}
						this.$router.push('/wxFollowPage');
						// this.$router.push('/appDown');
					})
				}else{
					this.$Toast("请至少选一证件上传或者输入省份证码")
				}
				function IsCard(str) {
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					return reg.test(str);
				}
				
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
			// this.inputInputBulr()
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
			white-space: nowrap;
			font-size: 14px;
			overflow: hidden;
      em{
        display: inline-block;
        width: 0.035rem;
        height: 0.15rem;
        background-color: #4A8EF4;
        margin-right: 0.05rem;
        vertical-align: text-top;
      }
		}

		.img {
			position: relative;
			background: #F9F9F9;
			color: $color66;
			font-size: 0.14rem;
			height: 1.90rem;
      border-radius: 0.075rem;
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
      em{
        display: inline-block;
        width: 0.035rem;
        height: 0.15rem;
        background-color: #4A8EF4;
        margin-right: 0.05rem;
        vertical-align: text-top;
      }
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
      border-radius: 0.075rem;
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
    padding: 0.14rem 5% 0.02rem 5%;
    color: #666;
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
	.form_bname {
		background: #fff;
		border-bottom: 1px solid #eee;
    font-size: 14px;
		margin-bottom: 10px;
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
</style>
