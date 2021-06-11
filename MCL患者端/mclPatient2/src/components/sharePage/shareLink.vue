<template>
    <div class="share_link_root">
      <img src="@/assets/images/yaoqingw.png" alt="" class="sharebg" width="100%">
      <div class="btn_group">
        <div class="btn">
          <img src="https://resource.jtsc.club/tuijianren@2x.png" alt="" width="20">
          <input type="tel" v-model.trim="rphone" placeholder="请输入推荐人手机号" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop">
        </div>
        <div class="btn">
          <img src="https://resource.jtsc.club/zhanghao@2x.png" alt="" width="20" >
          <input type="tel" v-model.trim="phone" placeholder="请输入您的手机号" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop">
        </div>
        <div class="btn">
          <img src="https://resource.jtsc.club/yanzhengma@2x.png" alt="" width="20" >
          <input type="number" v-model.trim="picodes" placeholder="图片码的计算结果" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop">
          <div class="verify-box text-center">
            <identify ref="identify" />
          </div>
        </div>
        <div class="btn">
          <img src="https://resource.jtsc.club/yanzhengma@2x.png" alt="" width="20" >
          <input type="number" v-model.trim="code" placeholder="请输入验证码" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop">
          <div class="code">
            <span class="themeRed" v-on:click="phonet()">
              <i v-if="isDown"> {{time}}</i>
              <i v-else>{{getCode}}</i>
            </span>
          </div>
        </div>
        <div class="btn" style="margin-bottom: 30px">
          <img src="https://resource.jtsc.club/mima@2x.png" alt="" width="20">
          <input type="password" v-model.trim="userpwd" placeholder="请设置密码" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop">
        </div>
        <!-- <p class="agreen">
          <span v-if="agrn" class="axz" @click="agre"></span>
          <span v-else @click="agre"></span>
          阅读并同意<router-link to="/noticeClause" style="text-decoration: underline;color: #fff;margin-left: 0.02rem;">万象商纬用户协议</router-link>
        </p> -->
        <mt-button type="danger" class="share_btn" size="large" v-on:click="loginbtn">注册下载</mt-button>
        <mt-button type="danger" class="share_btn" size="large" v-on:click="goAppDown">已有账号，直接下载</mt-button>
      </div>
    </div>
</template>

<script>
  import identify from '@/components/common/identify.vue'
    // import sharBg from "./../../assets/images/sharebg.png"
    export default {
        name: "share-link",
        data: () => ({
          sharBg:'https://resource.jtsc.club/sharebg.png',
          rphone:'',
          phone: '',
          code:'',
          userpwd:'',
          getCode:"获取验证码",
          VerificationCode: 60,
          isDown: false,
          picodes:"",
          agrn:true
        }),
        computed:{
          time:function () {
            setTimeout(()=>{
              if( this.VerificationCode <= 0){
                this.isDown = false;
                this.VerificationCode = 60;
                return
              }
              this.VerificationCode--
            },1000)
            return `${this.VerificationCode}s后发送`
          }
        },
        methods:{
          goAppDown(){
            this.$router.push("/appDown")
          },
        //验证码
          phonet() {
            let url = "UserInterface/UserRegeditCode.ashx";
            let userphone = this.phone;
            let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if( !myreg.test(this.phone) ){
              this.$Toast('请输入格式正确的手机号');
              return;
            }
            const identify  = this.$refs.identify;
            if((this.picodes === "") || (this.picodes != identify.code)){
              this.$Toast('图片验证码填写有误！');
              return;
            }
            let jmnum=this.$root.getjmw(this.phone);
            let datass = this.$root.$getCode(jmnum);
            if(this.isDown){
              return;
            }
            this.isDown = true;
            let param = {
              "userphone": this.phone,
              "ucode": encodeURI(datass).replace(/\+/g, '%2B')
            }
            this.$post(url,param).then((data)=> {
              this.$Toast(data.rspdesc);
              if(data.rspcode != 1){
                return;
              }
            })

          },
          //关闭
          // closere(){
          //   this.$router.push('/login');
          // },
          agre(){
            this.agrn=!this.agrn;
          },
          //确定
          loginbtn(){
            let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if( !myreg.test(this.rphone) ){
              this.$Toast('请输入格式正确的推荐人手机号');
              return;
            }
            if( !myreg.test(this.phone) ){
              this.$Toast('请输入格式正确的手机号');
              return;
            }
            if( this.code == "" ){
              this.$Toast('请输入验证码');
              return;
            }
            if( this.userpwd == "" ){
              this.$Toast('请输入您的密码');
              return;
            }
            if(!this.agrn){
              this.$Toast('请勾选阅读并同意金拓条款须知');
              return;
            }
            let url = "UserInterface/UserRegedit.ashx";
            let param = {
              "rphone":this.rphone,
              "userphone": this.phone,
              "vercode": this.code,
              "userpwd":this.userpwd
            }
            this.$post(url,param).then((data)=>{
              if(data.rspcode != 1){
                this.$Toast(data.rspdesc);
                return;
              }

              this.$Toast(data.rspdesc);
              this.goAppDown();
            })
          }
        },
        mounted:function(){
          let rphone = this.$route.query.rphone;
          this.rphone = rphone
        },
        components:{
          identify
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/css/base.scss";
    .share_link_root{
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      background: #F07F4B;
    }
    .sharebg{
      display: block;
    }
    .btn_group{
      position: absolute;
      left: 0;
      right: 0;
      top: 1.3rem;
      padding: 0 20px;
    }
    .btn_group .btn{
      background: #ffffff;
      height: 50px;
      padding: 0 20px;
      border-radius: 25px;
      color: $color33;
      display: flex;
      align-items: center;
      margin-bottom: 0.12rem;
    }
    .share_btn{
      margin-bottom: 0.12rem;
     }
    .btn_group .btn img{
      margin-right: 20px;
    }
    .btn_group .btn img,.btn_group .btn input{
      vertical-align: middle;
      color: $color33;
    }
    .btn_group .btn input{
      flex: 1;
      border: none;
    }
    .code{
      height: 60%;
      padding-left: 0.15rem;
      border-left: 1px solid $boderE;
      font-size: 12px;
      line-height: 30px;
      i{font-style: normal}
    }
  .verify-box{
    line-height: 0.3rem;
  }
  .verify-box>div{
    min-width: 75px;
  }
    .agreen{
      font-size: 0.12rem;
      color: #fff;
      height: 0.3rem;
      margin-top: -24px;
      margin-bottom: 0.16rem;
      line-height: 0.32rem;
      span{
        width: 0.3rem;
        height: 0.3rem;
        display: block;
        background: url('https://resource.jtsc.club/selecthaha.png') no-repeat 0.06rem center;
        background-size: 0.16rem;
        float: left;
        &.axz{
          background: url('https://resource.jtsc.club/select_click@2x.png') no-repeat center center;
          background-size: 0.16rem;
        }
      }
    }
</style>
