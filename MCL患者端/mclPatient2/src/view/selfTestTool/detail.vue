<template>
    <div class="padding-header padding-footer page-bg-white">
        <mt-header :title="title" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>
        
        <img src="@/assets/images/selfTestTool/banner2.jpg" alt="" width="100%">

        <!-- <div class="banner">
            <img v-lazy="ImageUrl" alt="" width="100%">
        </div> -->

        <div class="content">
            <div class="section" v-html="SubjectMemo"></div>
            <!-- <div class="section">
                <div class="section-title"><span>什么是BMI自测？</span></div>
                <div class="section-content">水来与各种食物和饮水水来与各种食物和饮水水来与各种食物和饮水水来与各种食物和饮水水来与各种食物和饮水水来与各种食物和饮水</div>
            </div>
            <div class="section">
                <div class="section-title"><span>你是否有以下症状</span></div>
                <div class="section-content">
                    <p>1. 水来与各种食物和饮水水来</p>
                    <p>2. 水来与各种食物和饮水水来</p>
                    <p>3. 水来与各种食物和饮水水来</p>
                    <p>4. 水来与各种食物和饮水水来</p>
                </div>
            </div>
            <div class="section">
                <div class="section-title"><span>我们将会提供</span></div>
                <div class="section-content">水来与各种食物和饮水水来与各种食物和饮水水来与各种食物和饮水水来与各种食物和饮水水来与各种食物和饮水水来与各种食物和饮水</div>
            </div>
            <div class="section">
                <div class="section-title"><span>适用人群</span></div>
                <div class="section-content">
                    <p>1. 水来与各种食物和饮水水来</p>
                    <p>2. 水来与各种食物和饮水水来</p>
                    <p>3. 水来与各种食物和饮水水来</p>
                    <p>4. 水来与各种食物和饮水水来</p>
                </div>
            </div> -->
        </div>

        <mt-button type="primary" class="theme-button fix_bottom" size="large" @click.native="$router.push({name: 'toolHome', query: $route.query, params:{type: $route.query.type}})">立即自测 <!--  <span style="font-size: 12px">（1元1次）</span>--> </mt-button>
    </div>
</template>

<script>
import { getDetail } from "@/api/selfTest.js"
export default {
    data() {
        return {
            ImageUrl: "",
            PageUrl: "",
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
.section{
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