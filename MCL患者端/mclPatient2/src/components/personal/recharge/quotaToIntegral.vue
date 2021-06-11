<template>
    <div class="quota_to_integral_root">
      <mt-header title="转积分" class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>

      <div class="main">
         <div class="marginTop5 cell">
           <div class="borderBottom showNum">
             <span>转出金豆：</span>
             <input type="number" placeholder="请输入金豆" @input="input" @keydown="handleInput2" v-model="param.transferquota">
           </div>
           <div class="surplus">
             <p>当前金豆剩余 {{current_amount}}</p>
             <p class="themeRed" @click="allOutput">全部转出</p>
           </div>
         </div>
        <div class="marginTop5 cell">
          <div class="showNum">
            <span>可得积分：{{param.getintegral}}</span>
          </div>
        </div>
      </div>
      <mt-button type="default" class="add_btn" size="large" @click="submit">确定</mt-button>
    </div>
</template>

<script>
    export default {
        name: "quotaToIntegral",
        data: () => ({
          timer:"",
          current_amount:"",  //配额
          param:{
            transferquota:"",  //转出配额
            getintegral:""  //可获得积分
          }
        }),
      methods:{
        handleInput2(e) {
          // 通过正则过滤小数点后两位
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null;
        },
        //输入配额
        input(){
          clearTimeout(this.timer);
          this.timer = setTimeout(()=>{
            let url = "UserInterface/GetUserQuotaIntegralProportion.ashx";
            this.$post(url,{transferquota: this.param.transferquota}).then((data)=>{
              if(data.rspCode != 1 ){
                return;
              }
              this.param.getintegral = data.getintegral;
            })
          },600)
        },
        //提交
        submit(){
          if((Number(this.param.transferquota) > Number(this.current_amount)) || (this.param.transferquota == 0)){
            this.$Toast("请输入有效的金豆值");
            return;
          };
          let url = "UserInterface/GetUserQuotaIntegralTransformation.ashx";
          this.$post(url,this.param).then((data)=>{
            this.$Toast(data.rspDesc)
            if(data.rspCode != 1 ){
              return;
            }
            this.$router.back();
          })
        },
        //全部转出
        allOutput(){
          this.param.transferquota = this.current_amount;
          clearTimeout(this.timer);
          this.timer = setTimeout(()=>{
            let url = "UserInterface/GetUserQuotaIntegralProportion.ashx";
            this.$post(url,{transferquota: this.param.transferquota}).then((data)=>{
              if(data.rspCode != 1 ){
                return;
              }
              this.param.getintegral = data.getintegral;
            })
          },600)
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
