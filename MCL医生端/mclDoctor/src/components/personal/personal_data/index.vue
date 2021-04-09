<template>
	<div class="person_data_root">
		<mt-header fixed title="个人资料">
			<div slot="left">
        <mt-button icon="back" @click.native="$router.push('/wx_Entrance/personal')"></mt-button>
			</div>
		</mt-header>

		<div class="person_data">
			<input type="file" accept="image/*" @change="change($event)" ref="userImg" style="display: none">
			<mt-cell title="头像" is-link @click.native="actionsheetToggle('show')">
				<span><img slot="icon" :src="repData.ImgUrl" style="width:0.3rem;height:0.3rem;border-radius: 15px"></span>
			</mt-cell>
			<mt-cell title="昵称" is-link to="/username">
				<span>{{repData.ContactName}}</span>
			</mt-cell>
			<mt-cell title="账号">
				<span>{{repData.ContactPhone}}</span>
			</mt-cell>
			<mt-cell title="姓名">
				<span>{{repData.Nickname}}</span>
			</mt-cell>
			<mt-cell title="性别" is-link @click.native="pickerToggle('show')">
				<span v-if="repData.Sex == 1">男</span>
				<span v-if="repData.Sex == 2">女</span>
			</mt-cell>
			<mt-cell title="医院" is-link to="/hospital">
				<span>{{repData.Hospital}}</span>
			</mt-cell>
			<mt-cell title="科室">
				<span>{{repData.Department}}</span>
			</mt-cell>
			<mt-cell title="职称" is-link to="/workTitle">
				<span>{{repData.Title}}</span>
			</mt-cell>
			<mt-cell title="是否同意将本人信息展示患者端" is-link @click.native="popupVisibleInfo = true">
				<span v-if="repData.displayFlag === ''">请选择</span>
				<span v-else>{{repData.displayFlag == 1 ? '显示' : '不显示'}}</span>
			</mt-cell>
			<router-link tag="div" to="/goodAt" class="person_margs">
				<p>擅长</p>
				<textarea readonly="readonly">{{repData.begoodat}}</textarea>
			</router-link>
			<div class="person_marg">
				<mt-cell title="修改登录密码" is-link to="/changePass"></mt-cell>
			</div>
			<!-- <div class="person_marg" style="margin-top: 0">
				<mt-cell title="修改支付密码" is-link to="/twopass"></mt-cell>
			</div> -->

			<!-- <div class="person_marg" style="margin-top: 0">
            <mt-cell title="银行卡" is-link to="/editbcard"></mt-cell>
          </div> -->
			<!-- <div class="person_marg">
            <mt-cell title="我的等级">
              <div v-if="repData.UserType == 1">
                <img src="https://resource.jtsc.club/putong@2x.png" />
                <span>普通会员</span>
              </div>
              <div v-if="repData.UserType == 2">
                <img src="https://resource.jtsc.club/vip@2x.png" />
                <span>VIP会员</span>
              </div>
              <div v-if="repData.UserType == 3">
                <img src="https://resource.jtsc.club/hehuo@2x.png" />
                <span>合伙人</span>
              </div>
            </mt-cell>
          </div> -->
		</div>

		<!-- <mt-button type="default" class="add_btn" size="large" @click="signOut">退出登录</mt-button> -->
		<div class="buttons" @click="signOut">
			<label>退出登录</label>
		</div>
		<!-- 头像 -->
		<mt-actionsheet :actions="userActions" v-model="sheetVisible"></mt-actionsheet>

		<!-- 性别picker  -->
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="confirmSex">确定</div>
				</div>
			</mt-picker>
		</mt-popup>

		<!-- 是否同意将本人信息展示患者端  -->
		<mt-popup v-model="popupVisibleInfo" position="bottom">
			<mt-picker :slots="sexSlotInfo" valueKey="name" :showToolbar="true" :visibleItemCount="3" ref="infoPicker">
				<div class="picker_bar">
					<div class="cancel" @click="popupVisibleInfo = false">取消</div>
					<div class="confrim" @click="confirmInfo">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
import { logout } from '@/assets/js/user.js'
import axios from 'axios'
export default {
  name: 'index',
  data: () => ({
    repData: {
      ImgUrl: '', // 头像
      ContactName: '', // 姓名
      ContactPhone: '', // 手机号
      Sex: '', // 性别
      UserType: '', // 用户会员类型    1.图片会员   2.vip会员   3.合伙人
      displayFlag: ''
    },
    userActions: [{
      name: '更换头像',
      method: ''
    }],
    sheetVisible: false, // 是否显示上传头像
    popupVisible: false, // 是否显示性别picker
    popupVisibleInfo: false, // 是否同意将本人信息展示患者端
    sexSlots: [{
      flex: 1,
      values: ['男', '女'],
      className: 'slot1',
      textAlign: 'center'
    }],
    sexSlotInfo: [{
      flex: 1,
      values: [{name: '显示', id: '1'}, {name: '不显示', id: '2'}],
      className: 'slot1',
      textAlign: 'center'
    }],
    names: '1',
    anios: 1
  }),
  methods: {
    downApp () {
      let ua = navigator.userAgent.toLowerCase()
      // Android终端
      let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
      // Ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.anios = 2
        // Ios
      } else if (/(Android)/i.test(navigator.userAgent)) {
        this.anios = 1
        // Android终端
      }
    },
    // 个人信息
    information () {
      // this.$Indicator.loading();
      let url = 'UserInterface/GetUserShowInfo.ashx'
      this.$post(url).then((data) => {
        this.$Indicator.close()
        let model = data.data
        this.repData = model
        const {
          sexPicker
        } = this.$refs
        let sex = (model.Sex == '1' ? '男' : '女')
        sexPicker.setSlotValue(0, sex)
      })
    },
    // 显示头像
    actionsheetToggle (state) {
      if (state == 'show') {
        this.sheetVisible = true
      }
      if (state == 'hide') {
        this.sheetVisible = false
      }
    },
    openAlbum () {
      const {
        userImg
      } = this.$refs
      return userImg.click()
    },
    change (e) {
      let file = e.target.files[0]
      let url = URL.createObjectURL(file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } // 添加请求头
      let params = new FormData() // 创建form对象
      params.append('uploadedFile', file) // 通过append向form对象添加数据
      this.repData.ImgUrl = url
      axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
        if (response.data.rspcode != 1) {
          return
        }
        this.repData.ImgUrl = response.data.url
        let url = 'UserInterface/UserEdit.ashx'
        this.$post(url, {
          HeadImageUrl: this.repData.ImgUrl
        }).then((data) => {
          this.$Toast(data.rspdesc)
          if (data.rspcode == 1) {
            this.information()
          }
        })
      })
    },
    changes () {
      window.back.clickOnAndroidSelectPhoto()
    },
    showbg (name) {
      let url = 'UserInterface/UploadPhotos.ashx'
      this.$post(url, {
        BinaryStream: name
      }).then((data) => {
        if (data.rspcode == 0) {
          return
        }
        this.repData.ImgUrl = data.data.imgUrl
        let urls = 'UserInterface/UserEdit.ashx'
        this.$post(urls, {
          HeadImageUrl: this.repData.ImgUrl
        }).then((data) => {
          this.$Toast(data.rspdesc)
          if (data.rspcode == 1) {
            this.information()
          }
        })
      })
    },
    // 显示性别picker
    pickerToggle (state) {
      if (state == 'show') {
        this.popupVisible = true
      }
      if (state == 'hide') {
        this.popupVisible = false
      }
    },
    // 编辑个人信息
    editUserInfo (param) {
      let url = 'UserInterface/UserEdit.ashx'
      return this.$post(url, param).then((data) => {
        this.$Toast(data.rspdesc)
        if (data.rspcode == 1) {
          this.information()
        }
      })
    },
    confirmSex () {
      const {
        sexPicker
      } = this.$refs
      let sex = sexPicker.getSlotValue(0)
      sex = (sex == '男' ? 1 : 2)
			this.editUserInfo({ Sex: sex }).then(() => { this.pickerToggle('hide') })
    },
    confirmInfo () {
      const {
        infoPicker
      } = this.$refs
      let sex = infoPicker.getSlotValue(0)
			this.editUserInfo({ displayFlag: sex.id }).then(() => { this.popupVisibleInfo = false })
    },
    // 退出登录
    signOut () {
      logout()
    }
  },
  // created(){
  //   window.showbg = this.showbg;
  // },
  mounted () {
    this.downApp()
    window.showbg = this.showbg
    let that = this
    this.information()
    // 头像的弹窗
    this.userActions = [{
      name: '更换头像',
      method: this.openAlbum
    }]
  }
}
</script>

<style scoped lang="scss">
	.person_marg {
		margin-top: 0.1rem;
	}

	.person_marg img {
		height: 0.2rem;
		width: 0.2rem;
		margin-right: 0.1rem;
	}
	.person_margs{
		background: #fff;
		padding: 0 5% 0.1rem 5%;
		p{
			font-size: 0.16rem;
			padding: 0.1rem 0;
		}
		textarea{
			width: 100%;
			height: 0.8rem;
			resize: none;
			background: #eee;
			border: 1px solid #ddd;
			padding: 0.08rem 3%;
			border-radius: 6px;
			color: #333;
			font-size: 0.15rem;
			box-sizing: border-box;
		}
	}
	.buttons {
		overflow: hidden;
    height: 0.44rem;
		label {
			width: 100%;
			display: block;
			font-size: 0.165rem;
			color: #fff;
			text-align: center;
			line-height: 0.44rem;
			background: #4A8EF4;
      border-radius: 0;
      letter-spacing: 2px;
		}
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

</style>
<style lang="scss">
	.person_data_root {
    padding-top: 0.44rem;
    padding-bottom: 0.54rem;
		.mint-popup-bottom {
			width: 100%;
		}

    .person_data{
      margin-top: 0.1rem;
      a.mint-cell{
        position: relative;
      }
      a.mint-cell::after{
        background-color: #000;
        content: " ";
        opacity: 0.1;
        right: 0;
        bottom: 0;
        left: 0.15rem;
        position: absolute;
        height: 1px;
      }
       a.mint-cell .mint-cell-value {
        margin-right: 20px;
      }
       a.mint-cell  .mint-cell-allow-right::after{
        right: 15px;
      }

      .person_marg{
        a.mint-cell::after{
          opacity: 0;
        }
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
    }
	}

  .person_data_root .picker-items{
    margin-top: 0.15rem;
  }
  .person_data_root .mint-popup-bottom,  .person_data_root  .picker-items .city_picker_root {
   min-height: 35%;
  }
  /*手机*/
  @media screen and (max-width:539px){
    .mint-header {
      height: 0.44rem;
      border-bottom: 1px solid #eee;
      font-size: 0.175rem;
    }
    .mint-cell {
      min-height: 0.48rem;
    }
    a.mint-cell .mint-cell-text {
      font-size: 0.16rem;
    }
    .mint-cell-wrapper{
      font-size: 0.16rem;
    }
    .mint-button {
      font-size: 0.165rem;
      letter-spacing: 2px;
      height:0.44rem;
    }
    .mint-msgbox{
      font-size: 0.16rem;
    }
  .username-root>.marginTop5 {
    margin-top: 0.1rem;

  }
    .username-root>div.btn{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0;
    }
    .username-root>div.btn>.mint-button{
      font-size: 0.165rem;
      letter-spacing: 2px;
      border-radius: 0;
    }
  }

  /*平板*/

  @media screen and (min-width:540px) and (max-width:960px){
    .mint-header {
      height: 48px;
      border-bottom: 1px solid #eee;
      font-size: 18px;
    }
    .mint-header {
      font-size: 18px;
    }
    a.mint-cell .mint-cell-text {
      font-size: 16px;
    }
    .mint-cell-wrapper{
      font-size:16px;
    }
    .mint-button {
      font-size: 18px;
      height: 41px;
    }

    .mint-msgbox{
      font-size:16px;
    }
  }
</style>
