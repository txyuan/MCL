<template>
	<div class="person_data_root">
		<mt-header title="个人资料">
			<div slot="left">
				<mt-button icon="back" @click.native="$route.push('/wx_Entrance/personal')"></mt-button>
			</div>
		</mt-header>

		<div class="person_data marginTop5">
      <div class="person_data_xq">
			<!-- <input type="file" v-if="anios==1" accept="image/*" @click="changes()" ref="userImg" style="display: none"> -->
			<input type="file" accept="image/*" @change="change($event)" ref="userImg" style="display: none">
			<mt-cell title="头像" is-link @click.native="actionsheetToggle('show')">
				<span><img slot="icon" :src="repData.ImgUrl" style="width:0.3rem;height:0.3rem;border-radius: 15px"></span>
			</mt-cell>
			<mt-cell title="昵称" is-link to="/username">
				<span>{{repData.Nickname}}</span>
			</mt-cell>
			<mt-cell title="账号">
				<span>{{repData.Account}}</span>
			</mt-cell>
			<mt-cell title="性别" is-link @click.native="pickerToggle('show')">
				<span v-if="repData.Sex == 1">男</span>
				<span v-if="repData.Sex == 2">女</span>
			</mt-cell>
<!--			<mt-cell title="身高" is-link to="/heights">-->
<!--				<span>{{repData.height}}<em style="font-style:normal; padding-left: 2px">cm</em></span>-->
<!--			</mt-cell>-->
      </div>
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
		<mt-button class="add_btns" size="large" @click="signOut">退出登录</mt-button>
		<!-- 头像 -->
		<mt-actionsheet :actions="userActions" v-model="sheetVisible">
		</mt-actionsheet>

		<!-- 性别picker  -->
		<mt-popup v-model="popupVisible" position="bottom" class="picker_style">
			<mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfo">确定</div>
				</div>
			</mt-picker>
		</mt-popup>

	</div>
</template>

<script>
import { logout } from '@/assets/js/uesr.js' // 退出登录
import axios from 'axios'
export default {
  name: 'index',
  data: () => ({
    repData: {
      ImgUrl: '', // 头像
      Nickname: '', // 昵称
      Account: '', // 账号
      Sex: '' // 性别
    },
    userActions: [{
      name: '更换头像',
      method: ''
    }],
    sheetVisible: false, // 是否显示上传头像
    popupVisible: false, // 是否显示性别picker
    sexSlots: [{
      flex: 1,
      values: ['男', '女'],
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
      this.$Indicator.loading()
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
    editUserInfo () {
      const {
        sexPicker
      } = this.$refs
      let sex = sexPicker.getSlotValue(0)
      sex = (sex == '男' ? 1 : 2)
      let url = 'UserInterface/UserEdit.ashx'
      this.$post(url, {
        Sex: sex
      }).then((data) => {
        this.$Toast(data.rspdesc)
        if (data.rspcode == 1) {
          this.information()
          this.pickerToggle('hide')
        }
      })
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

  .person_data_root {
  .mint-header {
    height: 0.44rem;
    border-bottom: 1px solid #eee;
  }

	.person_marg {
		margin-top: 0.1rem;
	}

	.person_marg img {
		height: 0.2rem;
		width: 0.2rem;
		margin-right: 0.1rem;
	}
  .person_data{
    padding-bottom: 0.44rem;
    margin-top: 0.1rem;
  }
    .add_btns{
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 0;
      border-radius: 0;
      line-height: 0.44rem;
      font-size: 0.165rem;
      letter-spacing: 1px;
      width: 100%;
      background-color: #0AC5C9;
    }
  }
</style>
<style lang="scss">
.person_data_root{
  .picker_style{

    .picker_bar {
      display: flex;
      justify-content: space-between;
      text-align: center;
      line-height: 0.42rem;
      padding: 0;
      border-bottom: solid 1px #eaeaea;
      background-color: #0AC5C9;
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

.person_data_root .picker_style .picker-items{
  margin-top: 0.15rem;
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
  .mint-field-core{
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
    width: 100%;
  }
  .username-root>div.btn>.mint-button{
    font-size: 0.165rem;
    letter-spacing: 2px;
    border-radius: 0;
    background-color: #0AC5C9;
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
  .mint-field-core{
    font-size: 0.16px;
  }
  .mint-button {
    font-size: 18px;
    height: 41px;
  }

  .mint-msgbox{
    font-size:16px;
  }
}
	.person_data_root {
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
    .person_data{
      .person_data_xq{
        a.mint-cell{
          position: relative;
        }
        a.mint-cell::after{
          background-color: #000;
          content: " ";
          opacity: 0.1;
          right: 0;
          bottom: 0;
          left: 0.2rem;
          position: absolute;
          height: 1px;
        }
        a.mint-cell:last-child::after{
          opacity: 0;
        }
      }
    }
  }

</style>
