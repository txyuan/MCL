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
                        <p  v-if="data.scoreResult">评测结果为：</p>
                    </div>
                    <div class="result-des" v-if="data.scoreResult">{{data.scoreResult}}</div>
                     <div class="bg"></div>
                    <div class="result-note" v-html="data.remarks">
                    </div>
                </div>
                <div class="score-box" v-if="data.score">
                    <div class="score-content"><span>{{data.score}}</span></div>
                </div>
            </div>
            <div class="section">
                <div class="section-title"><span>{{data.ResultTile}}</span></div>
                <div class="section-content">
                    <div v-html="data.Memo"></div>
                </div>
            </div>
        </div>

        <div class="fix_bottom" v-if="($route.query.type != 'water') && ($route.query.type != 'weight')">
            <mt-button type="primary" class="theme-button" size="large" @click.native="proposal" v-if="$route.query.type != 'actualIntake'">查看饮食建议</mt-button>
            <mt-button type="default" size="large" @click.native="$root.goMessage">个性化定制</mt-button>
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
        // 建议
        proposal(){
            const goodsName = this.data.ResultTypeName
            const secondSymptomName = this.data.scoreResult
            const pageUrl = this.$route.query.type
            this.$router.push({name: "proposalDetail", query:{label: goodsName, labelSecond: secondSymptomName, pageUrl }})
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
    // margin-top: -1.4rem !important;
    // margin-bottom: 0.2rem !important;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.score-box{
    width: 1.2rem;
    height: 1.2rem;
    background: url("../../assets/images/complication/scoreBg2.png") no-repeat 0.05rem -0.25rem;
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
    position: absolute;
    top: 1.275rem;
    left: 0;
    right: 0;
    margin-bottom: 0.5rem;
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
