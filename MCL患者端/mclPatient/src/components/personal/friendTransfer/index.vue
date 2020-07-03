<template>
    <div>
      <mt-header title="好友转账">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="fried_list">
        <h3>转出余额：
          <input type="number" v-model.trim="balance" placeholder="请输入余额"/>
        </h3>
        <p>
          当前余额剩余 ¥<label>{{balanced}}</label>
          <span @click="allyezc">全部转出</span>
        </p>
      </div>
      <div class="fried_list">
        <h3>转出积分：
          <input type="number" v-model.trim="integral"  placeholder="请输入积分"/>
        </h3>
        <p>
          当前积分剩余 <label>{{integrald}}</label>
          <span @click="alljfzc">全部转出</span>
        </p>
      </div>
      <div class="fried_phone">
        <label>好友手机号：</label>
        <input type="text" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入好友的手机号" v-model.trim="sphone" />
      </div>
      <div class="fried_phone" style="margin-top: 0;border-top: 1px solid #eee">
        <label>二级密码：</label>
        <input type="password" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入您的二级密码" v-model.trim="erjpass" />
      </div>
      <p class="tsejmm">温馨提示：为了您的账户安全，请输入二级密码，如没有二级密码，请前往<router-link to="/twopass" style="text-decoration: underline;color: rgb(64, 116, 255);">个人中心</router-link>设置！</p>
      <mt-button type="default" class="add_btn" size="large" @click="saveInfo">确定</mt-button>

    </div>
</template>

<script>
    export default {
        name: "index",
        data:()=>({
          balance: 0, //转出余额
          balanced:"", //当前余额
          integral: 0, //转出积分
          integrald:"", //当前积分
          sphone:'', //手机号
          erjpass:''
        }),
        methods:{
          //全部转出余额
          allyezc(){
            this.balance=this.balanced;
          },
          //全部转出积分
          alljfzc(){
            this.integral=this.integrald;
          },
          // 确定
          saveInfo(){
            if(( Number(this.balance) >  Number(this.balanced))){
              this.$Toast("请输入有效的余额值");
              return;
            };
            if(( Number(this.integral) >  Number(this.integrald))){
              this.$Toast("请输入有效的积分值");
              return;
            };
            let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if( !myreg.test(this.sphone) ){
              this.$Toast('请输入格式正确的手机号');
              return;
            };
            if(this.erjpass==''){
              this.$Toast("请输入二级密码");
              return;
            };
              let url = "UserInterface/UserPassword2Check.ashx";
              let param = {
                "password2": this.erjpass
              };
              this.$post(url,param).then((data)=> {
                if(data.rspcode != 1){
                  this.$Toast(data.rspdesc);
                  return;
                }
                this.saveInfok()
              })
          },
          saveInfok(){
            let url = "UserInterface/FriendTransfer.ashx";
            let param = {
              "transferredbalance": this.balance,
              "transferredintegral": this.integral,
              "friendsphone": this.sphone
            };
            this.$post(url,param).then((data)=> {
              this.$Toast(data.rspDesc);
              if(data.rspCode != 1){
                return;
              }
              this.$router.push('/wx_Entrance/personal');
            })
          },
          //个人信息
          information() {
            let url = "UserInterface/GetUserShowInfo.ashx";
            this.$post(url).then((data) => {
              let model = data.data;
              const {Balance,VGScore} = model;
              this.balanced = Balance;
              this.integrald = VGScore;
            })
          },
        },
        created(){
          this.information();
        }
    }
</script>

<style scoped>
.fried_list{
  width: 94%;
  padding: 0 3%;
  background: #fff;
  margin-top: 0.05rem;
}
.fried_list h3{
  height: 0.64rem;
  line-height: 0.64rem;
  font-size: 0.15rem;
  font-weight: 200;
  border-bottom: 1px solid #ddd;
}
.fried_list h3 input{
  width: 50%;
  font-size: 0.15rem;
}
.fried_list p{
  height: 0.36rem;
  font-size: 0.15rem;
  line-height: 0.36rem;
  color: #666;
}
.fried_list p span{
  color: #FF3D3D;
  float: right;
}
  .fried_phone{
    height: 0.5rem;
    overflow: hidden;
    background: #fff;
    width: 94%;
    padding: 0 3%;
    margin-top: 0.1rem;
  }
  .fried_phone label{
    font-size: 0.16rem;
    color: #333;
    line-height: 0.5rem;
  }
.fried_phone input{
  height: 0.5rem;
  border: none;
  width: 66%;
  font-size: 0.14rem;
}
  .add_btn{
    margin-top: 0.26rem;
  }
  .tsejmm{
    padding: 0 4%;
    margin-top: 0.1rem;
    font-size: 0.12rem;
    color: #FF3D3D;
    line-height: 0.2rem;
  }
</style>
