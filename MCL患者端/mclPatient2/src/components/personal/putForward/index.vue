<template>
    <div>
      <mt-header title="佣金提现">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="put_money">
        <h2>提现金额</h2>
        <p>¥ <input type="number" v-model.trim="money" placeholder="请输入提现金额"/></p>
        <div>
          <span>可用提现佣金 ¥<span class="put_mon"> {{moneys}}</span></span>
          <label v-on:click="addClassFun()">全部提现</label>
        </div>
      </div>
      <div class="put_form">
        <p>银行卡</p>
        <mt-field label="您的姓名：" class="put_fom" placeholder="请输入您的姓名" v-model.trim="usernames"></mt-field>
        <mt-field label="身份证号：" class="put_fom" placeholder="请输入身份证号" v-model.trim="idcard"></mt-field>
        <mt-field label="手机号：" class="put_fom" placeholder="请输入手机号" v-model.trim="mophone"></mt-field>
        <mt-field label="银行名称：" class="put_fom" placeholder="请输入银行名称" v-model.trim="bankname"></mt-field>
        <mt-field label="银行卡号：" class="put_fom" placeholder="请输入银行卡号" v-model.trim="card"></mt-field>
      </div>
      <!--<router-link to="/personalPutSuccess">-->
        <mt-button type="default" class="add_btn" size="large" v-on:click="submit()">确认提现</mt-button>
      <!--</router-link>-->
    </div>
</template>

<script>
    export default {
        name: "index",
        data:()=>({
          money:"",
          moneys:"",
          usernames: "",
          idcard: "",
          card: "",
          mophone:"",
          bankname:""
        }),
        methods:{
          addClassFun: function() {
            this.money=this.moneys;
          },
          //佣金提现
          getmoney(){
            let url = "UserInterface/GetUserCommissionList.ashx";
            let param = {
              PageSize:10,
              PageCount:1,
              Direction: '-1'
            };
            this.$post(url,param).then((data)=>{
              if(data.rspCode != 1){
                return;
              }
              this.moneys = data.current_amount;
            })
          },
          //绑定银行卡
          // getRecharge(){
          //   let url = "UserInterface/user/bindingBankInfo.ashx";
          //   let param = {
          //     "bn": '农业银行',
          //     "bun": this.usernames,
          //     "bno": '1258856355455566323544',
          //     "action": "inser"
          //   }
          //   this.$post(url,param).then((data)=>{
          //     this.$Toast({ message: data.rspDesc})
          //     if(data.rspCode != 1){
          //        return
          //     }
          //     this.$router.push("/wx_Entrance/personal")
          //   })
          // },
          //  确认提现
          submit(){
            if((this.money < 100) || (this.money%100 > 0)){
          		this.$Toast("提现的金额必须大于¥100，且是100的整数倍。");
          		return;
          	};
            let url = "UserInterface/AddCommission.ashx";
            let param = {
              "RealName":this.usernames, //姓名
              "IdNumber":this.idcard,  //身份证号
              "MobilePhone":this.mophone,  //手机号
              "AmountOfCash": this.money,  //提现金额
              "CardNumber": this.card,  //银行卡号
              "BankName": this.bankname  //银行名称
            };
            this.$post(url,param).then((data)=>{
              if(data.rspCode != 1 ){
                this.$Toast({message: "您输入信息有误"})
                 return;
              };
              this.$Toast({message: data.rspDesc})
              this.$router.push("/personalPutSuccess")
            })
          }
        },
        mounted(){
          this.getmoney();
        }
    }
</script>

<style scoped>
.put_money{
  width: 100%;
  height: 1.36rem;
  background: #fff;
  border-top: 1px solid #E0E0E0;
}
  .put_money h2{
    width: 94%;
    margin: 0 auto;
    color: #404040;
    font-size: 0.18rem;
    padding-top: 0.1rem;
  }
.put_money p{
  width: 94%;
  margin: 0 auto;
  color: #333333;
  font-size: 0.3rem;
  padding-top: 0.15rem;
  border-bottom: 1px solid #eee;
  line-height: 0.42rem;
}
.put_money p input{
  width: 60%;
  height: 0.42rem;
  font-size: 0.3rem;
  border: none;
}
.put_money p input::placeholder{
  font-size: 16px;
}
.put_money div{
  width: 94%;
  margin: 0 auto;
  height: 0.44rem;
}
.put_money div span{
  color: #606060;
  line-height: 0.44rem;
}
.put_money div label{
  color: #FF1E41;
  line-height: 0.44rem;
  float: right;
}
.put_form{
  margin-top: 0.05rem;
}
  .put_form p{
    width: 94%;
    background: #fff;
    height: 0.45rem;
    border-bottom: 1px solid #E0E0E0;
    line-height: 0.45rem;
    color: #404040;
    padding: 0 3%;
  }
</style>
