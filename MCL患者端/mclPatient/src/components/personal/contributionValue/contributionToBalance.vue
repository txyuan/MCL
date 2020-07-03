<template>
    <div class="contribution_to_balance_root">
      <mt-header title="贡献值转账" class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>

      <div class="main">
        <div class="marginTop5 cell">
          <div class="borderBottom showNum">
            <span>转出贡献值：</span>
            <input type="number" @keydown="handleInput2" placeholder="请输入贡献值" v-model="param.outconvalue">
          </div>
          <div class="surplus">
            <p>当前贡献值剩余 {{current_amount}}</p>
            <p class="themeRed" @click="allOutput">全部转出</p>
          </div>
        </div>
        <div class="marginTop5 cell">
          <div class="showNum">
            <span>可得余额：{{param.outconvalue}}</span>
          </div>
        </div>
      </div>
      <mt-button type="default" class="add_btn" size="large" @click.native="submit">确定</mt-button>
    </div>
</template>

<script>
    export default {
        name: "contributionToBalance",
        data: () => ({
            current_amount:"",  //贡献值
            param:{
              outconvalue:"",  //转出贡献值
              gainbalance:""  //可获得余额
            }
        }),
        methods:{
          handleInput2(e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
          },
          //提交
          submit(){
            let param = this.param;
            if(( Number(param.outconvalue) >  Number(this.current_amount)) || (param.outconvalue == 0) ){
              this.$Toast("请输入有效的贡献值");
              return;
            };
            param.gainbalance = param.outconvalue;
            let url = "UserInterface/GetUserCommissionTransferredBalance.ashx";
            this.$post(url,param).then((data)=>{
              this.$Toast(data.rspDesc)
              if(data.rspCode != 1 ){
                return;
              }
              this.$router.back();
            })
          },
          //全部转出
          allOutput(){
            this.param.outconvalue = this.current_amount
          }
        },
        created(){
          this.current_amount = this.$route.query.current_amount
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .main .cell{
    background: #ffffff;
    padding: 0 10px;
    .showNum{
      font-size: 0.15rem;
      color: $color33;
      padding: 15px 0;
      input{
        font-size: 0.15rem;
      }
    }
    .surplus{
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      color: $color66;
    }
  }

</style>
