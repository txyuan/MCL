<template>
  <div class="padding-header padding-footer page-hui-white">
    <mt-header :title="title" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>

    <img src="@/assets/images/complication/banner4.jpg" alt="" width="100%">
    <div class="content">
        <div class="section result-box" :class="'color_'+data.ColorDiscriminationFlag">
            <!-- <div class="section-title"><span>{{title}}风险评测</span></div> -->
            <div class="score-box" v-if="data.score">
                <div v-if="(pageUrl == 'tiZhongDiuShi') || (pageUrl == 'kouQiang')" class="score-content"><span style="font-size: 0.14rem">{{data.scoreResult}}</span></div>
                <div v-else-if="(pageUrl == 'diDanBai')" class="score-content"><span>{{data.score}}</span>g/L</div>
                <div v-else-if="(pageUrl == 'baiXiBao') || (pageUrl == 'xueXiaoBan')" class="score-content"><span>{{data.score}}<sup style="">9</sup></span>/L</div>
                <div v-else class="score-content"><span>{{data.score}}</span></div>
            </div>
            <div class="section-result">
                <div class="result-title">
                    <span v-if="data.scoreResult && ((pageUrl != 'tiZhongDiuShi') && (pageUrl != 'kouQiang'))">
                      <span v-if="pageUrl == 'diDanBai'">您的白蛋白为<span class="score-num">{{data.score}}g/L</span>，</span>
                      <span v-else-if="pageUrl == 'baiXiBao'">您的白细胞计数为<span class="score-num">{{data.score}}×10^9/L</span>，</span>
                      <span v-else-if="pageUrl == 'xueXiaoBan'">您的血小板计数为<span class="score-num">{{data.score}}×10^9/L</span>，</span>
                      <span v-else>您的{{title}}风险评测分值为<span class="score-num">{{data.score}}</span>，</span>
                    </span>
                    <span v-if="data.scoreResult">评测结果为：</span>
                </div>
                <div class="result-des" v-if="data.scoreResult">{{data.scoreResult}}</div>
                <div class="result-des-note" v-if="data.medicalAdviceFlag == '1'">请遵医嘱，或尽快联系平台医生！</div>
                <div class="bg"></div>
                <div class="result-note" v-html="data.remarks"></div>
            </div>
        </div>
        <div class="section" v-if="(data.medicalAdviceFlag == '0') && (productList.length != 0)">
            <div class="section-title"><span>营养方案</span></div>
            <div class="section-content">
              <div class="section-view">
                <productItem v-for="(item, index) in productList" :key="index" :item="item" detailPage="serviceDetail"/>
              </div>
            </div>
        </div>
    </div>

    <div class="fix_bottom" v-if="data.ColorDiscriminationFlag != undefined">
        <mt-button v-if="(data.ColorDiscriminationFlag != '1') && (data.ColorDiscriminationFlag != '0')" type="primary" class="theme-button" size="large" @click.native="proposal">查看饮食建议</mt-button>
        <mt-button type="default" size="large" @click.native="$root.goMessage">
          <span v-if="(data.medicalAdviceFlag == '1') || (data.ColorDiscriminationFlag == '0')">联系平台医生</span>
          <span v-else>个性化定制</span>
        </mt-button>
    </div>
    
  </div>
</template>

<script>
import { getSelfTestToolResult } from "@/api/selfTest.js"
import { GetProductList } from "@/api/shopCar.js"
import productItem from "./productItem.vue"
export default {
  components:{
    productItem
  },
  data () { 
    const {title, type} = this.$route.query
    return {
      title,
      pageUrl: type,
      data: {},
      productList: []
    }
  },
  methods:{
    async getInfo(){
        const query = this.$route.query
        const param = {
            skey: query.skey, 
            ResultSkey: query.ResultSkey
        }
        const res = await getSelfTestToolResult(param)
        this.data = res
    },
    // 解决方案
    async solution(){
      const goodsName = this.data.ResultTypeName
      const secondSymptomName = this.data.scoreResult
      const param = {
        saleorder: "", // 0，销量降序;1，销量升序
        priceOrder: "", // 0，价格降序;1，价格升序
        pagecount: 1,
        pagesize: 10,
        secondSubjectType: "", // 一级分类主键
        firstSubjectType: "", // 二级分类主键
        goodsName, // 疾病，症状，商品
        secondSymptomName, // 
      }
      const data = await GetProductList(param)
      if(data.rspcode == 1){
        this.productList = [...data.goodsList]
      }
      // if(count == 1){
      //   this.$router.push({name: "serviceDetail", params: {sKey: goodsList[0].goodsId}})
      // }else{
      //   this.$router.push({name: 'searchProduct', query:{q: goodsName, secondSymptomName}})
      // }
    },
    // 建议
    proposal(){
      const goodsName = this.data.ResultTypeName
      const secondSymptomName = this.data.scoreResult
      this.$router.push({name: "proposalDetail", query:{label: goodsName, labelSecond: secondSymptomName, pageUrl: this.pageUrl }})
    }
  },
  async mounted(){
    await this.getInfo()
    await this.solution()
  }
};
</script>

<style  scoped lang="scss">

.result-box{
    // margin-top: -1.8rem !important;
    // margin-bottom: 0.2rem !important;
    overflow: hidden;
}

.score-box{
    width: 1.5rem;
    height: 1.3rem;
    margin: 0.15rem auto;
    background: url("../../assets/images/complication/scoreBg2.png") no-repeat;
    background-size: 100% auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .score-content{
        text-align: center;
        color: #FFFFFF;
        text-indent: 0.1rem;
    }
    span {
        font-size: 0.35rem;
    }
}
.content{
  position: absolute;
  top: 0.8rem;
  left: 0;
  right: 0;
  margin-bottom: 0.5rem;
}

.section{
  padding: 0.15rem;
  padding-top: 0;
  margin: 0.15rem;
  margin-bottom: 0.15rem;
  background: #FFFFFF;
  border-radius: 0.08rem;

  // 正常背景
  &.color_1{
    .score-num,.result-des-note{color: #00C9CB;}
    .result-des::before{background: #00C9CB;}
    .score-box{background-image: url("../../assets/images/complication/scoreBg2.png");}
  }
  // 轻度背景
  &.color_2{
    .score-num,.result-des-note{color: #C9E15A;}
    .result-des::before{background: #C9E15A;}
    .score-box{background-image: url("../../assets/images/complication/scoreBg1.png");}

  }
  // 中度背景
  &.color_3{
    .score-num,.result-des-note{color: #E8893D;}
    .result-des::before{background: #E8893D;}
    .score-box{background-image: url("../../assets/images/complication/scoreBg3.png");}
  }
  // 极重度背景
  &.color_4{
    .score-num,.result-des-note{color: #C83636;}
    .result-des::before{background: #C83636;}
    .score-box{background-image: url("../../assets/images/complication/scoreBg4.png");}
  }
  // 重度背景
  &.color_5{
    .score-num,.result-des-note{color: #E1523F;}
    .result-des::before{background: #E1523F;}
    .score-box{background-image: url("../../assets/images/complication/scoreBg5.png");}
  }
}
.section-title {
  line-height: 0.55rem;
  font-weight: bold;
}
// .section-title span {
//   margin-left: 0.1rem;
// }
// .section-title::before {
//   content: "";
//   width: 4px;
//   height: 0.18rem;
//   border-radius: 2px;
//   margin-top: -1px;
//   display: inline-block;
//   vertical-align: middle;
//   background: #0ac5ca;
// }
.section-content{
    font-size: 0.14rem;
    overflow: hidden;
    overflow-x: scroll;
    .section-view{
      white-space: nowrap;
      >>> .item:first-child{
        padding-left: 0;
      }
      >>> .item:last-child{
        padding-right: 0;
      }
    }
    
}



.section-result{
    font-size: 0.14rem;
    .result-title{
        // display: flex;
        // justify-content: space-between;
        color: #666;
        // padding-right: 0.95rem;
    }
    .result-des{
        font-size: 0.14rem;
        font-weight: bold;
        margin: 0.1rem 0;
    }
    .result-des::before{
        content: "";
        display: inline-block;
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        background: #0ac5ca;
        vertical-align: middle;
        margin-right: 0.05rem;
        margin-top: -0.02rem;
    }
    .result-des-note{
      font-size: 0.12rem;
      color: #E05956;
      padding: 0.1rem;
      background: #FFDDDC;
      border-radius: 0.08rem;
    }
    .score-num{
      color: #0ac5ca;
      padding: 0 3px;
    }
    
    .bg{
        margin: 0.15rem -0.15rem;
        border-top: 1px dashed #f5f5f5;
        position: relative;
    }
    .bg::before,.bg::after{
        content: "";
        display: inline-block;
        width: 0.18rem;
        height: 0.18rem;
        background: #f5f5f5;
        border-radius: 50%;
        position: absolute;
        top: -0.09rem;
    }
    .bg::before{
        left: -0.09rem;
    }
    .bg::after{
        right: -0.09rem;
    }

    .result-note{
        font-size: 0.12rem;
        color: #9194a5;
        padding: 0.1rem;
        background: #F6F7FB;
        border-radius: 0.08rem;
    }
}
.fix_bottom >>> {
    display: flex;
    background: #FFFFFF;
    .mint-button{
        border-radius: 0;
        font-size: 16px;
        height: 41px;
    }
    .mint-button--default{
      background: #FFFFFF;
    }
}
</style>