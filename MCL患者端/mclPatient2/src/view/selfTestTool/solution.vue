<template>
    <div class="padding-header padding-footer page-bg-hui">
        <mt-header title="干预方案" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>

        <img src="@/assets/images/selfTestTool/banner3.jpg" alt="" width="100%">

        <div class="content">
            <div class="section result-box">
                <div class="section-title"><span>评测结果</span></div>
                <div class="section-result">
                    <div class="result-title">
                        <p>{{data.EvaluationResults}}</p>
                        <!-- <p>您的评测结果分值为<span class="num">{{data.score}}</span>分， </p> -->
                        <p>评测结果为：</p>
                    </div>
                    <div class="result-des" v-if="data.scoreResult">{{data.scoreResult}}</div>
                     <div class="bg"></div>
                    <div class="result-note" v-html="data.remarks">
                        <!-- 注：总分>3分：无营养风险，需每周复查；总分≥3分：有营养风险，需要营养支持治疗。 -->
                    </div>
                </div>
                <div class="score-box">
                    <div class="score-content"><span>{{data.score}}</span></div>
                </div>
            </div>
            <div class="section">
                <div class="section-title"><span>{{data.ResultTile}}</span></div>
                <div class="section-content">
                    <!-- <img src="@/assets/images/bohaiyinhang.png" alt="" width="100%"> -->
                    <div v-html="data.Memo"></div>
                    <!-- <div class="item">
                        <p class="item-title">1.总热量</p>
                        <p class="item-content">碳水化合物每克产热4千卡，是热量的主要来源，现认为碳水化合物应占饮食总热量的55%～65%。</p>
                    </div>
                    <div class="item">
                        <p class="item-title">2.碳水化合物</p>
                        <p class="item-content">总热量的需要量要根据患者的年龄、性别、身高、体重、体力活动量、病情等综合因素来确定。首先要算出每个人的标准体重，可参照下述公式：标准体重（kg）=身高（cm）-105或标准体重（kg）=[身高（cm）-100]×0.9；女性的标准体重应再减去2kg。也可根据年龄、性别、身高查表获得。</p>
                    </div>
                    <div class="item">
                        <p class="item-title">3.蛋白质</p>
                        <p class="item-content">蛋白质每克产热量4千卡。占总热量的12%～15%。蛋白质的需要量在成人每千克体重约1g。在儿童，孕妇，哺乳期妇女，营养不良，消瘦，有消耗性疾病者宜增加至每千克体重1.5～2.0g。</p>
                    </div>
                    <div class="item">
                        <p class="item-title">4.脂肪</p>
                        <p class="item-content">脂肪的能量较高，每克产热量9千卡。约占总热量25%，</p>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="fix_bottom">
            <mt-button type="primary" class="theme-button" size="large" @click.native="solution">
                <span v-if="$route.query.type == 'protein'">营养建议</span>
                <span v-else>饮食建议</span>
            </mt-button>
            <mt-button type="default" class="theme-button" size="large" @click.native="$root.goMessage">个性化定制</mt-button>
        </div>
    </div>
</template>

<script>
import { getSelfTestToolResult } from "@/api/selfTest.js"
import { GetProductList } from "@/api/shopCar.js"
export default {
    data() {
        return {
            data:{
                // string	ResultTypeName	分类名称
                // string	score	分数
                // string	scoreResult	结果
                // string	remarks	备注
                // string	ResultTile	结果标题
                // string	ImageUrl	图片
                // string	Memo	备注
            }
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
            const secondSymptomName = this.data.ResultTypeNameTwo
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
            const {count, goodsList} = await GetProductList(param)
            if(count == 1){
                this.$router.push({name: "serviceDetail", params: {sKey: goodsList[0].goodsId}})
            }else{
                this.$router.push({name: 'searchProduct', query:{q: goodsName, secondSymptomName}})
            }
        }
    },
    created() {
        this.getInfo()
    },
    mounted() {

    }
}
</script>
<style scoped lang='scss'>
/* @import url(); 引入css类 */

.result-box{
    margin-top: -1.4rem !important;
    margin-bottom: 0.2rem !important;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.score-box{
    width: 1.2rem;
    height: 1.2rem;
    background: url("../../assets/images/selfTestTool/scoreBg.png") no-repeat 0.05rem -0.25rem;
    background-size: 1.4rem auto;
    position: absolute;
    top: -0rem;
    right: -0rem;
    .score-content{
        text-align: center;
        color: #FFFFFF;
        margin-left: 0.3rem;
        margin-top: 0.2rem;
    }
    span {
        font-size: 0.35rem;
    }
}
.content{
    padding-top: 0.2rem;
}

.section{
  padding: 0 0.15rem;
  padding-bottom: 0.15rem;
  margin: 0.15rem;
  margin-bottom: 0.15rem;
  background: #FFFFFF;
  border-radius: 0.08rem;
}
.section-title {
  line-height: 0.55rem;
  font-weight: bold;
}
.section-title span {
  margin-left: 0.1rem;
}
.section-title::before {
  content: "";
  width: 4px;
  height: 0.18rem;
  border-radius: 2px;
  margin-top: -1px;
  display: inline-block;
  vertical-align: middle;
  background: #0ac5ca;
}
.section-content{
    font-size: 0.14rem;
    .item{
        margin-top: 0.2rem;
    }
}

.section-result{
    font-size: 0.14rem;
    .result-title{
        // display: flex;
        // justify-content: space-between;
        color: #666;
        padding-right: 0.95rem;
    }
    .num{
        color: #0ac5ca;
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
        color: #666;
        padding: 0.1rem;
        background: #F6F7FB;
        border-radius: 0.08rem;
    }
}
.fix_bottom{
    display: flex;
    background: #FFFFFF;
    padding: 0.1rem 0.15rem;
    .theme-button{
        border-radius: 0;
    }
    .theme-button:first-child{
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    .theme-button:last-child{
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }
}
</style>