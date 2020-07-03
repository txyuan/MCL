<template>
    <div>
      <div class="sign_header">
        <mt-header title="签到">
          <div slot="left">
            <header-back>
              <mt-button icon="back"></mt-button>
            </header-back>
          </div>
          <mt-button slot="right">查看规则</mt-button>
        </mt-header>
        <div class="sign_qd">
          <p>积分：{{num}}</p>
          <div class="sign_opc">
            <div class="sign_ff" @click="timeclick()">
              <div v-if="scoretype == 0">
                <h2>签到</h2>
                <span>+{{sign}}积分</span>
              </div>
              <div v-else>
                <h2>已签到</h2>
                <span>{{count}}天</span>
              </div>
            </div>
          </div>
        </div>
        <!--日历签到-->
        <datas :arrDates="dateList" ref="datepicker" />
      </div>
    </div>
</template>
<script>
    import datas from './../../common/datanew.vue';
    export default {
        name: "index",
        data:()=>({
          num: '',  //all_scoreNum  总积分
          scoretype:'',  //first_todayScoreType  今天是否签到
          sign:'',  //first_scoreNum  每天签到加多少积分
          count:'',  //count  连续签到几天
          dateList:[]
        }),
        methods: {
          //获取签到日期
          datatime(){
            let url = "UserInterface/user/getScoreList.ashx";
            // let paramt = {
            //   PageSize: 10000000,
            //   PageCount: 1
            // }
            this.$post(url).then((data)=>{
              this.scoretype=data.first_todayScoreType;
              this.sign=data.first_scoreNum;
              this.count = data.count;
              this.num = data.all_scoreNum;
              this.dateList = data.data;
              setTimeout(()=>{
                this.$refs.datepicker.initData(null);
              },0)
            })
          },
          //签到
          postime(){
            let d = new Date();
            let years = d.getFullYear();
            let months = d.getMonth();
            let days = d.getDate();
            let dates = years+'-'+months+'-'+days;
            let url = "UserInterface/user/SignIn.ashx";
            let param = {
              dates: dates
            }
            return this.$post(url,param)
          },
          // 点击签到
          timeclick(){
          	//已签到的状态
          	if(this.scoretype != 0){
          		return;
          	}
            this.postime().then((data)=>{
              this.$Toast(data.rspdesc)
              this.datatime()
            })
          }
        },
        mounted(){
          this.datatime();
        },
        components:{
          datas
        }
    }
</script>

<style scoped>
.sign_header{
  width: 100%;
  height: 2.6rem;
  background: url("../../../assets/images/qiandao_bakeground@2x.png") no-repeat;
  background-size: 100%;
}
  .sign_qd{
    position: relative;
    width: 100%;
    top: 0.3rem;
  }
  .sign_qd p{
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 0.18rem;
  }
  .sign_opc{
    width: 1.0rem;
    height: 1.0rem;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
    position: absolute;
    left: 50%;
    margin-left: -0.5rem;
    margin-top: 0.18rem;
  }
  .sign_ff{
    width: 0.92rem;
    height: 0.92rem;
    background: #fff;
    border-radius: 50%;
    float: left;
    margin: 0.04rem;
  }
  .sign_ff div{
    /*display: none;*/
  }
.sign_ff h2{
  width: 80%;
  font-size: 0.18rem;
  color: #FF1E41;
  border-bottom: 1px solid #FFD9DF;
  margin: 0 auto;
  padding-top: 20%;
  padding-bottom: 0.06rem;
  text-align: center;
}
.sign_ff span{
  text-align: center;
  color: #FF1E41;
  font-size: 0.15rem;
  padding-top: 0.03rem;
  display: block;
  width: 100%;
}
</style>
