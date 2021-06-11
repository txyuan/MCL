<template>
  <div class="padding-header padding-footer page-bg-white">
    <mt-header :title="title" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>

    <div class="result">
      <div id="echart"></div>
      <p class="echart-title">{{data.scoreResult}}</p>
      <div class="note">
        <p class="title">注：{{title}}分级标准为：</p>
        <p v-html="data.remarks">1.轻度贫血：Hb男性90~120L，女性Hb90-110L</p>
        <!-- <p>2.中度贫血：Hb60~90L</p> -->
      </div>
    </div>
    <div class="bg"></div>
    <div class="solution">
      <div class="solution-title"><span>推荐方案</span></div>
      <div class="solution-list">
        <ul>
          <li @click="solution">饮食建议</li>
          <li @click="solution">营养方案</li>
        </ul>
      </div>
    </div>

    <div class="fix_bottom">
        <mt-button type="primary" class="theme-button" size="large" @click.native="$root.goMessage">个性化定制</mt-button>
    </div>
    
  </div>
</template>

<script>
import { getSelfTestToolResult } from "@/api/selfTest.js"
import { GetProductList } from "@/api/shopCar.js"
export default {
  data () { 
    const {title} = this.$route.query
    return {
      title,
      data: {},
      option: {
        color: ["#0ac5ca", "#eeeeee"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            silent: true,
            radius: ["80%", "100%"],
            avoidLabelOverlap: false,
            hoverAnimation: false, //关闭放大动画
            selectedOffset: 0, //选中块的偏移量
            label: {
              show: false,
              position: "center",
              formatter: "",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                // fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "直接访问",
                // selected: true, //默认选中第一块
                label: {
                  show: true, //默认显示第一块
                  fontSize: "40",
                  formatter: "0",
                  // fontWeight: "bold",
                },
              },
              { value: 0, name: "邮件营销" },
            ],
          },
        ],
      },
    }
  },
  methods:{
    initEchart() {
      var chart = this.$echarts.init(document.getElementById('echart'));
      chart.setOption(this.option)
    },
    async getInfo(){
        const query = this.$route.query
        const param = {
            skey: query.skey, 
            ResultSkey: query.ResultSkey
        }
        const res = await getSelfTestToolResult(param)
        this.data = res
        this.option.series[0].data[0].value = res.score
        this.option.series[0].data[1].value = (res.score >= 100 ? 0 : 100 - res.score)
        this.option.series[0].data[0].label.formatter = res.score
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
      const {count, goodsList} = await GetProductList(param)
      if(count == 1){
        this.$router.push({name: "serviceDetail", params: {sKey: goodsList[0].goodsId}})
      }else{
        this.$router.push({name: 'searchProduct', query:{q: goodsName, secondSymptomName}})
      }
    }
  },
  async mounted(){
    await this.getInfo()
    this.initEchart()
  }
};
</script>

<style  scoped lang="scss">
.result {
  padding: 0.15rem;
  padding-top: 0.35rem;
  .note {
    font-size: 0.14rem;
    color: #666;
    // & p:not(.title) {
      // text-indent: 0.25rem;
    // }
  }
}
#echart {
  height: 1.5rem;
}
.echart-title{
  text-align: center;
  color: #0ac5ca;
  font-size: 0.18rem;
  padding: 0.15rem 0;
}
.bg {
  height: 0.1rem;
  background: #f1f1f1;
}

// 解决方法
.solution {
  padding: 0 0.15rem;
}
.solution-title {
  line-height: 0.55rem;
  font-weight: bold;
}
.solution-title span {
  margin-left: 0.1rem;
}
.solution-title::before {
  content: "";
  width: 4px;
  height: 0.18rem;
  border-radius: 2px;
  margin-top: -1px;
  display: inline-block;
  vertical-align: middle;
  background: #0ac5ca;
}
.solution-list ul {
  display: flex;
  li {
    width: 50%;
    color: #fff;
    text-align: center;
    background: #0ac5ca;
    border-radius: 4px;
    line-height: 1rem;
  }

  li:first-child {
    margin-right: 0.07rem;
  }
  li:last-child {
    margin-left: 0.07rem;
  }
}
// .fix_bottom{
    // display: flex;
    // background: #FFFFFF;
    // padding: 0.1rem 0.15rem;
    // .theme-button{
    //   border-radius: 0;
    // }
    // .theme-button:first-child{
    //   border-top-left-radius: 6px;
    //   border-bottom-left-radius: 6px;
    // }
    // .theme-button:last-child{
    //   border-top-right-radius: 6px;
    //   border-bottom-right-radius: 6px;
    // }
// }
</style>