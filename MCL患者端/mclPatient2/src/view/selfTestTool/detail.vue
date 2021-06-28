<template>
    <div class="padding-header page-bg-white">
        <mt-header :title="title" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>
        
        <div class="content" :class="$route.query.type">
            <div class="panel">
               <div class="panel-title">{{title}}</div>
               <div class="section" v-html="SubjectMemo"></div>
               <img v-if="$route.query.type == 'BMI'" src="@/assets/images/selfTestTool/bg/BMI.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'energy'" src="@/assets/images/selfTestTool/bg/每日所需能量.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'protein'" src="@/assets/images/selfTestTool/bg/每日所需蛋白量.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'water'" src="@/assets/images/selfTestTool/bg/每日所需饮水量.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'weight'" src="@/assets/images/selfTestTool/bg/标准体重.png" alt="" width="100%" class="bgImg">
               <img v-if="$route.query.type == 'actualIntake'" src="@/assets/images/selfTestTool/bg/每日实际摄入量.png" alt="" width="100%" class="bgImg">
               <mt-button type="primary" class="theme-button" size="large" @click.native="$router.push({name: 'toolHome', query: $route.query, params:{type: $route.query.type}})">立即自测 <!--  <span style="font-size: 12px">（1元1次）</span>--> </mt-button>
            </div>
        </div>

    </div>
</template>

<script>
import { getDetail } from "@/api/selfTest.js"
export default {
    data() {
        return {
            ImageUrl: "",
            SubjectMemo: "",
        }
    },
    computed:{
		title(){ return this.$route.query.SubjectName }
	},
    methods:{
        async getInfo(){
            const param = {skey: this.$route.query.skey}
            const data = await getDetail(param);
            this.ImageUrl = data.ImageUrl;
            this.SubjectMemo = data.SubjectMemo;
        }
    },
    created() {
        this.getInfo()
    }
}
</script>
<style scoped lang='scss'>
/* @import url(); 引入css类 */
.banner {
   padding: 0.15rem;
   padding-bottom: 0;
}
.content{
    height: calc(100vh - 43px);
    overflow: hidden;
    overflow-y: scroll;
    background: url("../../assets/images/selfTestTool/bg/BMIbg.jpg") no-repeat;
    background-size: 100% auto;
    &.BMI{
        background-image: url("../../assets/images/selfTestTool/bg/BMIbg.jpg");
        .panel .panel-title,.theme-button,.section{color: #505a88;}
    }
    &.energy{
        background-image: url("../../assets/images/selfTestTool/bg/每日所需能量bg.jpg");
        .panel .panel-title,.theme-button,.section{color: #7056b2;}
    }
    &.protein{
        background-image: url("../../assets/images/selfTestTool/bg/每日所需蛋白量bg.jpg");
        .panel .panel-title,.theme-button,.section{color: #38b5b9;}
    }
    &.water{
        background-image: url("../../assets/images/selfTestTool/bg/每日所需饮水量bg.jpg");
        .panel .panel-title,.theme-button,.section{color: #88a531;}
    }
    &.weight{
        background-image: url("../../assets/images/selfTestTool/bg/标准体重bg.jpg");
        .panel .panel-title,.theme-button,.section{color: #69b273;}
    }
    &.actualIntake{
        background-image: url("../../assets/images/selfTestTool/bg/每日实际摄入量bg.jpg");
        .panel .panel-title,.theme-button,.section{color: #ac7f29;}
        .panel {padding-bottom: 0.10rem;}
    }
}
.panel{
    width: 90%;
    margin: 0 auto;
    margin-top: 0.8rem;
    margin-bottom: 0.3rem;
    padding-top: 1px;
    
    background: rgba(255,255,255, 0.4);
    border-radius: 0.15rem;
    box-sizing: border-box;
    position: relative;
    .theme-button{
        width: 65%;
        background: #FFF;
        color: #505a88;
        border-radius: 20px;
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        margin: auto;
    }
    .bgImg{
        display: block;
    }
    .panel-title{
        color: #505a88;
        font-size: 0.26rem;
        margin-top: -0.15rem;
        margin-left: 0.15rem;
        letter-spacing: 1px;
    }
}
.section{
    font-size: 0.13rem;
    color: #505a88;
    padding: 0.1rem 0.15rem;
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
}
</style>