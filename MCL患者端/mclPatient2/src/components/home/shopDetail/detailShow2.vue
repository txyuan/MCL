<template>
    <div>
      <div>
        <div class="show_ms">
          <h2>{{goodsInfo.goodsName}}</h2>
          <div class="show_griad">
            <span>¥{{MarketPrice}}</span>
            <!--<label>价值：¥{{goodsInfo.MarketPrice}}</label>-->
            <i>{{goodsInfo.proType | filterType}}</i>
          </div>
        </div>
        <div class="prize">
          <h4>揭晓倒计时</h4>
          <p v-if="isShowTime">{{time}}</p>
        </div>
        <mt-cell class="title_qk" @click.native="goHomeParticipate" title="本期参与情况" is-link></mt-cell>
        <mt-cell class="title_qk title_review" title="" is-link @click.native="goPriQ"  v-if="priorWinInfo != null">
          <p class="review">上期回顾</p>
          <p class="lucky" style="padding-top: 0.09rem">幸运专享码：<label>{{priorWinInfo.winCode}}</label></p>
          <p class="lucky">获奖者：<label>{{priorWinInfo.winner}}</label></p>
          <p class="lucky">购买份数：<label>{{priorWinInfo.buyCount}}</label></p>
          <p class="lucky" style="margin-bottom: 5px">揭晓时间：{{priorWinInfo.endTime}}</p>
        </mt-cell>

        <div class="detail_btn" @click="checkcCurrent"  v-show="isShowFoot">
          <i>查看当前进行中</i>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "detailShow2",
        props:["goodsInfo","phaseList","isShowFoot"],
        computed:{
          //商品总价
          MarketPrice:function () {
            return (this.goodsInfo.MarketPrice * this.goodsInfo.totalCount).toFixed(2)
          },
          time:function () {
            setTimeout(()=>{
              if(this.difference <= 0){
                this.isShowTime = false;
                this.navbarItem.unveiledTime = "00:00:0";
                this.goEndPage();
                return;
              }
              this.difference -= 10;
            },10)
            return this.secondFull(this.difference)
          }
        },
        data:()=>({
          navbarItem:{},
          priorWinInfo:{stateText:""},
          winInfo: {winCode:"",winner:"",buyCount:"",endTime:""},
          difference: 20,
          isShowTime: false
        }),
        methods:{
            //评价
            goHomeComments(){
              let sKey = this.$route.params.sKey;
              this.$router.push({path:`/homeComments/${sKey}`})
            },
            //本期参与情况
            goHomeParticipate(){
              let sKey = this.$route.params.detailsKey;
              this.$router.push({path:`/homeParticipate/${sKey}`})
            },
            //上期
            goPriQ(){
              let priorWinInfo = this.navbarItem.priorWinInfo;
              let sKey = this.$route.params.sKey;
              if(priorWinInfo == null){
                return;
              }
              let path = "";
              if(priorWinInfo.state == 0){
                path = `/shopdetail/${sKey}/detailshow`;
              }else if(priorWinInfo.state == 1){
                path = `/shopdetail/${sKey}/detailshow2/${priorWinInfo.goodsPhId}`
              }else{
                path = `/shopdetail/${sKey}/detailshow3/${priorWinInfo.goodsPhId}`
              }
              this.$router.replace({path});
            },
            //查看当前
            checkcCurrent(){
              let sKey = this.$route.params.sKey;
              let  path = `/shopdetail/${sKey}/detailshow`;
              this.$router.replace({path});
            },
            //从秒转换成时间格式
            secondFull(val){
              var m = parseInt((val/1000/60)%60);
              m = (m < 10) ? '0' + m : m;
              var s = parseInt((val/1000)%60);
              s = (s < 10) ? '0' + s : s;
              var hs = ((val%1000)/10).toString().substr(0,2);
              hs = (hs < 10) ? '0' + hs : hs;
              return  `${m}:${s}:${hs}`;
            },
            //从时间格式转换成秒
            transformSecond(h,m,s){
              var h = Number(h);
              var m = Number(m);
              var s = Number(s);

              var hTos = h*60*60*1000;
              var mTos = m*60*1000;
              var sTos = s*1000;
              return (hTos + mTos + sTos)
            },
            //开始倒计时
            startTime(){
              let unveiledTime = this.navbarItem.unveiledTime;
              if(unveiledTime != "") {
                this.isShowTime = true;
              }else{
                this.goEndPage();
              }
              unveiledTime = unveiledTime.split(":");  //this.item.unveiledTime 00:00:20格式
              let [ h, m, s ] = unveiledTime;
              this.difference = this.transformSecond(h,m,s);
            },
          //跳转已结束页面
          goEndPage(){
            let {sKey,detailsKey} = this.$route.params;
            let path = `/shopdetail/${sKey}/detailshow3/${detailsKey}?winState=1`;
            this.$parent.upDatePhaseList().then(()=>{
              this.$router.replace(path);
            });
          },
          //获取当前期数的信息
          getNavItem(){
            let url = "/UserInterface/mall/getProductDetails.ashx";
            let sKey = this.$route.params.sKey;
            return this.$post(url,{sKey}).then((data)=> {
              if (data.rspcode != 1) {
                return
              }
              let phaseList = data.phaseList;
              let detailsKey = this.$route.params.detailsKey;
              phaseList.forEach((item) => {
                if(detailsKey == item.goodsPhId){
                  this.navbarItem = item
                }
              })
              this.priorWinInfo = this.navbarItem.priorWinInfo;
              if(this.navbarItem.winInfo != null){
                this.winInfo = this.navbarItem.winInfo;
              }
              //开始倒计时
              this.startTime()
            })
          }
        },
        created(){
          this.getNavItem();
        }
    }
</script>

<style scoped>
  .paddimg{
    padding-bottom: 0.5rem;
  }
  .show_ms{
    background: #fff;
    margin-top: 0.05rem;
    padding-bottom: 0.1rem;
  }
  .show_ms h2{
    width: 94%;
    margin: 0 auto;
    font-size: 0.14rem;
    font-weight: normal;
    padding-top: 0.1rem;
  }
  .show_griad{
    width: 94%;
    margin: 0 auto;
    padding-top: 0.1rem;
  }
  .show_griad span{
    color: #FF1E41;
    font-size: 0.2rem;
  }
  .show_griad label{
    color: #606060;
    font-size: 0.15rem;
    margin-left: 0.1rem;
  }
  .show_griad i{
    font-style: normal;
    width: 0.88rem;
    height: 0.24rem;
    border-radius: 2px;
    display: inline-block;
    float: right;
    color: #FF1E41;
    font-size: 0.14rem;
    text-align: center;
    line-height: 0.24rem;
    border: 1px solid #FF1E41;
  }
  .prize{
    width: 100%;
    height: 1.37rem;
    background: #fff;
    margin-top: 0.05rem;
  }
  .prize h4{
    color: #202020;
    width: 94%;
    margin: 0 auto;
    padding-top: 0.1rem;
  }
  .prize p{
    width: 100%;
    color: #FF1E41;
    font-size: 0.3rem;
    padding-top: 0.37rem;
    text-align: center;
  }
  .title_qk{
    height: 0.44rem;
    width: 100%;
    background: #fff;
    margin-top: 0.05rem;
    font-size: 0.16rem;
    color: #202020;
  }
  .title_review{
    height: auto;
  }

  .detail_btn{
    width: 100%;
    height: 0.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: #fff;
    border-top: 1px solid #E0E0E0;
  }
  .detail_btn i{
    width: 94%;
    background: #FF1E41;
    height: 0.4rem;
    display: block;
    margin-left: 3%;
    font-style: normal;
    float: left;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.05rem;
    font-size: 0.18rem;

  }
</style>
