<template>
    <div class="person_data_root">
        <mt-header title="个人资料">
          <div slot="left">
            <header-back>
                <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>

        <div class="person_data marginTop5">
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
          <mt-cell title="性别" is-link @click.native="pickerToggle('show')">
            <span v-if="repData.Sex == 1">男</span>
            <span v-if="repData.Sex == 2">女</span>
          </mt-cell>
          <div class="person_marg">
            <mt-cell title="修改登录密码" is-link to="/changePass"></mt-cell>
          </div>
          <!-- <div class="person_marg" style="margin-top: 0">
            <mt-cell title="修改支付密码" is-link to="/twopass"></mt-cell>
          </div> -->
		  <div class="person_juese">
			<mt-cell title="用户角色" style="margin-top: 0.08rem;">
			  <span>{{repData.userType}}</span>
			</mt-cell> 
		  </div>
			
        </div>
				
        <!-- <mt-button type="default" class="add_btn" size="large">退出登录</mt-button> -->
		<div class="buttons">
			<label @click="signOut">退出登录</label>
		</div>
        <!-- 头像 -->
        <mt-actionsheet
          :actions="userActions"
          v-model="sheetVisible">
        </mt-actionsheet>

        <!-- 性别picker  -->
        <mt-popup
          v-model="popupVisible"
          position="bottom">
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
  	import axios from 'axios'
    export default {
        name: "index",
        data:()=>({
          repData:{
            ImgUrl:"",  //头像
            ContactName:"", //姓名
            ContactPhone:"",  //手机号
            Sex:"",  //性别
            UserType:"" //用户会员类型    1.图片会员   2.vip会员   3.合伙人
          },
          userActions:[
            {
              name: '更换头像',
              method: ""
             }
            ],
          sheetVisible: false,  //是否显示上传头像
          popupVisible: false,  //是否显示性别picker
          sexSlots: [
            {
              flex: 1,
              values: ['男', '女'],
              className: 'slot1',
              textAlign: 'center'
            }
          ],
          names:'1',
          anios:1
        }),
        methods:{
          downApp() {
            let ua = navigator.userAgent.toLowerCase();
            //Android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
      　   		//Ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                this.anios=2;
                //Ios
              } else if (/(Android)/i.test(navigator.userAgent)) {
                this.anios=1;
                //Android终端
              }
          },
          //个人信息
          information() {
            // this.$Indicator.loading();
            let url = "UserInterface/GetUserShowInfo.ashx";
            this.$post(url).then((data) => {
              this.$Indicator.close();
              let model = data.data;
              if(localStorage.userInfo){
                const userInfo = JSON.parse( localStorage.userInfo);
                model.userType = this.$root.getUserType(userInfo.UserType);
              }
              this.repData = model;
              const {sexPicker} = this.$refs;
              let sex = (model.Sex == "1" ? '男': '女');
              sexPicker.setSlotValue(0, sex)
              
            })
          },
          //显示头像
          actionsheetToggle(state){
            if(state == "show"){
              this.sheetVisible = true;
            }
            if(state == "hide"){
              this.sheetVisible = false;
            }
          },
          openAlbum(){
            const {userImg} = this.$refs;
            return userImg.click();
          },
          change(e){
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };  //添加请求头
            let params = new FormData(); //创建form对象
            params.append('uploadedFile',file);//通过append向form对象添加数据
            this.repData.ImgUrl = url;
            axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
              if (response.data.rspcode != 1) {
                return;
              }
              this.repData.ImgUrl=response.data.url;
              let url = "UserInterface/UserEdit.ashx";
              this.$post(url,{HeadImageUrl: this.repData.ImgUrl}).then((data) => {
                this.$Toast(data.rspdesc);
                if(data.rspcode == 1){
                  this.information()
                }
              })
            })
          },
          changes(){
            window.back.clickOnAndroidSelectPhoto();
          },
          showbg(name){
            let url = "UserInterface/UploadPhotos.ashx";
            this.$post(url,{BinaryStream: name}).then((data) => {
              if(data.rspcode==0){
                return;
              }
              this.repData.ImgUrl=data.data.imgUrl;
              let urls = "UserInterface/UserEdit.ashx";
              this.$post(urls,{HeadImageUrl: this.repData.ImgUrl}).then((data) => {
                this.$Toast(data.rspdesc);
                if(data.rspcode == 1){
                  this.information()
                }
              });
            })
          },
          //显示性别picker
          pickerToggle(state){
            if(state == "show"){
              this.popupVisible = true;
            }
            if(state == "hide"){
              this.popupVisible = false;
            }
          },
          //编辑个人信息
          editUserInfo(){
            const {sexPicker} = this.$refs;
            let sex = sexPicker.getSlotValue(0);
            sex = (sex == "男" ? 1 : 2);
            let url = "UserInterface/UserEdit.ashx";
            this.$post(url,{Sex: sex}).then((data) => {
              this.$Toast(data.rspdesc);
              if(data.rspcode == 1){
              	this.information()
                this.pickerToggle('hide');
              }
            })
          },
          //退出登录
          signOut(){
            localStorage.clear();
            this.$router.push("/login");
          }
        },
        // created(){
        //   window.showbg = this.showbg;
        // },
        mounted(){
          this.downApp();
          window.showbg=this.showbg;
          let that=this;
          this.information();
          //头像的弹窗
          this.userActions = [{
            name: '更换头像',
            method: this.openAlbum
          }]
        }
    }
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";
  .marginTop5 a{
    border-bottom: 1px solid #ddd;
  }
  .person_marg{
    margin-top: 0.08rem;
  }
  .person_marg img{
    height: 0.2rem;
    width: 0.2rem;
    margin-right: 0.1rem;
  }

</style>
<style lang="scss">
  .person_data_root{
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
  }
  .buttons label{
      width: 88%;
      height: 0.4rem;
      display: block;
      font-size: 0.15rem;
      color: #fff;
      text-align: center;
      line-height: 0.4rem;
      margin: 0 auto;
      border-radius: 0.2rem;
      background: #FF3D3D;
      margin-top: 0.05rem;
  }
</style>
