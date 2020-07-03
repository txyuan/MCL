<template>
  <div class="padding-header">
    <div class="wheel_root">
        <mt-header fixed title="幸运大转盘">
          <div slot="left">
            <header-back>
              <mt-button icon="back"></mt-button>
            </header-back>
          </div>
          <div slot="right">
            <router-link to="/record" class="header-right">我的记录</router-link>
          </div>
        </mt-header>
         <div class="showinfo text-center">
           <span>剩余积分{{info.Balance}}，还可抽{{info.Times}}次</span>
         </div>
         <div style="min-height: 200px">
           <canvasWheel v-if="isShowCanvas" :info="info"  @getWinResult="getWinResult" @updateDefaultInfo="updateDefaultInfo"/>
         </div>
         <div class="namelist">
           <div class="tit text-center">
             <span>获奖名单</span>
           </div>
           <div class="box">
               <div class="table_wrap">
                 <table class="text-center">
                   <tr>
                     <th>昵称</th><th>奖品</th>
                   </tr>
                 </table>
                 <div class="listView">
                   <table class="text-center" :style="{marginTop: -top+'px'}">
                     <tbody>
                          <tr v-for="(item,index) in info.AwardUserList" :key="index"> <td style="width: 50%">{{item.UserName}}</td><td style="width: 50%">{{item.AwardItem}}</td></tr>
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>
         </div>
         <div class="rule">
           <div class="tit text-center">
             <span>活动规则</span>
           </div>
           <div v-html="info.Rules"></div>
         </div>
    </div>
  </div>
</template>

<script>
    import canvasWheel from './canvasWheel.vue';
    export default {
        name: "wheel",
        data: () => ({
            //tableList:[{name:"昵称",tel:"176****2336",prize:"某品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"},{name:"昵称昵称昵称",tel:"176****2336",prize:"某某某奖品"}],
            timer: 0,
            top: 0,
            isShowCanvas: false,
            info:{
              Use: 0,  //0,不可以抽奖;1,可以抽奖
              CannotMessage: '', //不能抽奖时的消息
              Balance: '', //剩余积分数
              Times:'', //可抽取的次数
              AwardsList:[
//            	{AwardsKey:"0",AwardsType:"0",ImageUrl:""},
//            	{AwardsKey:"0",AwardsType:"0",ImageUrl:""},
//            	{AwardsKey:"0",AwardsType:"0",ImageUrl:""},
//            	{AwardsKey:"0",AwardsType:"0",ImageUrl:""},
//            	{AwardsKey:"0",AwardsType:"0",ImageUrl:""},
//            	{AwardsKey:"0",AwardsType:"0",ImageUrl:""},
//            	{AwardsKey:"0",AwardsType:"0",ImageUrl:""},
              ], //奖品列表（AwardsKey 奖品Key，AwardsName 奖品名称，AwardsType 奖品类型 (0,积分;1,余额;2,商品)，Rate 中奖率 ImageUrl 图片Url）
              AwardUserList:[], //获奖名单
              Rules:"", //规则
            }
        }),
       methods:{
         tableSwiper(){
            var count = 0;
            var tableLenth =  this.info.AwardUserList.length;
            if(tableLenth <= 4){
              return;
            }
            this.timer = setInterval(()=>{
              if(count >= (tableLenth-4)){
                count = 0;
                this.top = 0;
              }
              count++;
              this.top +=25;
            },1500)
         },
         //获取默认信息
         updateDefaultInfo(){
           let url = "UserInterface/GetTurntableAwards.ashx";
           return this.$post(url).then((data)=>{
             if(data.rspcode == 1 ){
               this.isShowCanvas = true;
               this.info = data.data;
             }
             return data;
           })
         },
         //获取中奖结果
         getWinResult(callback){
           let url = "UserInterface/GetUserAwards.ashx";
           this.$post(url).then(callback)
//         then((data)=>{
//           if(data.rspcode == 1 ){
//              this.updateDefaultInfo();
//           }
//           return data;
//         })
         }
       },
       mounted(){
         this.$Indicator.loading()
         this.updateDefaultInfo().then((data)=>{
           this.$Indicator.close();
           if(data.rspcode == 1 ){
             this.tableSwiper();
           }else{
             this.$Toast(data.rspdesc)
           }
         })

       },
       destroyed(){
         clearInterval(this.timer)
       },
       components:{
         canvasWheel
       }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/css/base.scss";
    .wheel_root{
      background: url("../../assets/images/wheelBg.png") no-repeat;
      background-size: 100% auto;
      background-color: #FD474B;
      padding-top: 1.8rem;
      padding-left: 18px;
      padding-right: 18px;
      padding-bottom: 20px;
    }
    .showinfo{
      color: #FB5B6A;
      margin-bottom: 15px;
      span{display: inline-block;background: #ffffff;line-height: 30px;padding: 0 20px;border-radius: 5px}
    }
    .header-right{font-size: 0.14rem;color: inherit}
    .tit{margin-bottom: 0.15rem}
    .tit,.rule{color:#ffffff}
    .tit span{
      position: relative;
      padding: 0 5px;
      &:after,&:before{
        content: "";
        display: block;
        width: 60px;
        height: 1px;
        background: #ffffff;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      &:after{
        right: -100%;
      }
      &:before{
        left: -100%;
      }
    }
    .namelist,.rule{margin-top: 0.2rem}
    .namelist{
       .box{
          border: 2px solid #FEAF23;
          border-radius: 2px;
          padding: 10px;
       }
      table{
        width: 100%;
        th{ padding: 4px 0;font-weight: normal;}
        td{ padding: 2px 0;font-size: 14px}
      }
      .table_wrap{
        background: #FEAF23;
        color: #ffffff;
        border-radius: 2px;
      }
      .listView {
        height: 105px;
        overflow: hidden;
      }
    }
</style>
