<template>
  <div class="page-bg-white">
    <div class="content">
      <div class="title"><span>常规饮食建议</span></div>
        <ul>
            <li v-for="(item, index) in tool" :key="index">
                <div class="li_block" >
                  <!-- @click="$router.push({name: 'selfTestDetail', query:{type: item.PageUrl, skey: item.sKey, SubjectName: item.name}})" -->
                    <img :src="item.ImageUrl" alt="">
                    <span> {{item.name}} </span>
                </div>    
            </li>
        </ul>

        <div class="title"><span>十五种并发症</span></div>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <div class="li_block" @click="$router.push({name: 'proposalDetail', query:{label: item.name, labelSecond: ''}})">
                    <img :src="item.ImageUrl" alt="">
                    <span> {{item.name}} </span>
                </div>    
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
import {getDietSuggestionList} from "@/api/complication"

export default {
    data: () => ({
      tool: [],
      list: []
    }),
    methods:{
      async getDietSuggestionList(){
        const data = await getDietSuggestionList();
        this.tool = data.SelfTest
        this.list = data.Complication
      }
    },
    created(){
      this.getDietSuggestionList()
    }
}
</script>

<style scoped lang="scss">
.content{
    ul{
        margin: 0 -0.07rem;
        overflow: hidden;
    }
    li{
        width: 33.333%;
        padding: 0 0.07rem;
        margin-bottom: 0.15rem;
        box-sizing: border-box;
        float: left;
    }
    .li_block{
      position: relative;
        border-radius: 0.8rem;
        background: #F5F5F5;
        height: 1rem;
        border-radius: 0.08rem;
        text-align: center;
        padding-top: 0.22rem;
        box-sizing: border-box;
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        // justify-content: center;
    }
    .li_block::after{
      content: "";
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      bottom: -0.1rem;
      right: -0.1rem;
      background: url("../../../../assets/images/selfTestTool/jianTou.png") no-repeat;
      background-size: contain;
    }
    .li_block span{
      display: block;
      font-size: 0.14rem;
    }
    .li_block img{
        width: 0.3rem;
        height: 0.3rem;
        display: block;
        margin: 0 auto;
        margin-bottom: 0.08rem;
    }
}
// 解决方法
.content {
  padding: 0 0.15rem;
}
.title {
  line-height: 0.55rem;
  font-weight: bold;
}
.title span {
  margin-left: 0.1rem;
}
.title::before {
  content: "";
  width: 4px;
  height: 0.18rem;
  border-radius: 2px;
  margin-top: -1px;
  display: inline-block;
  vertical-align: middle;
  background: #0ac5ca;
}
</style>