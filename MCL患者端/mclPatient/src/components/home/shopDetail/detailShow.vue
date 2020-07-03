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
        <mt-progress class="progress" :value="percentage" :bar-height="10"></mt-progress>
        <ul class="show_allnum">
          <li>
            <p>已购</p>
            <span>{{goodsInfo.buyCount}}</span>
          </li>
          <li>
            <p>总量</p>
            <span>{{goodsInfo.totalCount}}</span>
          </li>
          <li>
            <p>剩余</p>
            <span>{{goodsInfo.lessCount}}</span>
          </li>
        </ul>
      </div>
      <mt-cell class="title_qk" @click.native="goHomeParticipate" title="本期参与情况" is-link></mt-cell>
      <mt-cell class="title_qk" title="上期回顾" is-link @click.native="goPriQ()" v-if="priorWinInfo != null">
        <span style="color: #FF1E41">{{priorWinInfo.stateText}}</span>
      </mt-cell>
        <div class="detail_btn" v-show="isShowFoot">
          <span @click="addgwc">加入购物车</span>
          <label  @click="collageBtn">立即拼购</label>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "detailShow",
        props:["goodsInfo","phaseList","isShowFoot"],
        data:()=>({
          navbarItem:{},
          priorWinInfo:{stateText:""},
          winInfo: {winCode:"",winner:"",buyCount:"",endTime:""}
        }),
        computed:{
          //商品总价
          MarketPrice:function () {
            return (this.goodsInfo.MarketPrice * this.goodsInfo.totalCount).toFixed(2)
          },
          //百分数
          percentage:function () {
            let val = this.goodsInfo.buyCount/this.goodsInfo.totalCount;
            return (val*100);
          }
        },
        methods:{
          //本期参与情况
          goHomeParticipate(){
            let sKey = this.$route.params.sKey;
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
          //加入购物车
          addgwc(){
            let url = "UserInterface/cart/updateGoodsNum.ashx";
            let param = {
              "goodsId": this.goodsInfo.goodsId,
              "goodsSpecId": this.goodsInfo.goodsSpecId,
              "goodsPhId" : this.goodsInfo.goodsPhId,
              "goodsNum": 1,
              "IsAddNum": 1
            }
            return this.$post(url,param).then((data)=>{
              if(data.rspcode != 1){
                this.$Toast({message: data.rspdesc})
              }else{
                this.$Toast({message: "添加成功"})
              }
              return data;
            })
          },
          //立即拼购
          collageBtn(){
            this.addgwc().then((data)=>{
              if(data.rspcode != 1){
                return
              }
              this.$router.push(`/wx_Entrance/shopcar?proType=${this.goodsInfo.proType}`)
            })
          }
        },
        created(){
          let sKey = this.$route.params.sKey;
          this.phaseList.forEach((item) => {
            if(sKey == item.goodsPhId){
              this.navbarItem = item
            }
          })
          this.priorWinInfo = this.navbarItem.priorWinInfo
          if(this.navbarItem.winInfo != null){
            this.winInfo = this.navbarItem.winInfo;
          }

        }
    }
</script>

<style scoped>
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
  .progress{
    width: 94%;
    margin: 0 auto;
    margin-top: 0.12rem;
  }
  .show_allnum{
    width: 94%;
    margin: 0 auto;
    overflow: hidden;
  }
  .show_allnum li{
    width: 33.3333%;
    float: left;
    color: #606060;
    font-size: 0.14rem;
  }
.show_allnum li:nth-child(2){
  text-align: center;
}
.show_allnum li:nth-child(3){
  text-align: right;
  color: #FF1E41;
}
  .title_qk{
    height: 0.44rem;
    width: 100%;
    background: #fff;
    margin-top: 0.05rem;
    font-size: 0.16rem;
    color: #202020;
  }
  .detail_btn{
    width: 100%;
    height: 0.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 100;
    border-top: 1px solid #E0E0E0;
  }
.detail_btn span{
  width: 33%;
  background: #FFA51E;
}
.detail_btn label{
  width: 58%;
  background: #FF1E41;
}
.detail_btn span,.detail_btn label{
  height: 0.4rem;
  display: block;
  float: left;
  margin-left: 3%;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  line-height: 0.4rem;
  margin-top: 0.05rem;
  font-size: 0.18rem;
}

</style>
