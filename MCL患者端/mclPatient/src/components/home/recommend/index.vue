<template>
<div class="recommend_wrap">
  <!--<navbar :lists="navList" @toggleTab="tabClick"/>-->
  <div class="content clear" style="margin-left: -0.06rem;margin-right: -0.06rem;">
    <productItem v-for="(item,index) in list" :key="item.goodsId" :item="item" detailPage="classdetail"/>
  </div>
</div>
</template>

<script>
    import navbar from "./navbar.vue";   //导航
    import productItem from "@/components/common/productItem.vue";   //商品
    export default {
        name: "index",
        props:["param","list"],
        data:()=>({
          navList:[]
        }),
        methods:{
          //tab的点击事件
          tabClick(item){
            // this.param.secondSubjectType = item.categoryId;
            this.$emit("triggerMore");
          },
          //首页推荐分类列表
          loadlist(){
            // let url = "UserInterface/getRecomCategory.ashx";
            // return this.$post(url).then((data)=>{
            //   this.navList = data.subjectList;
            //   // this.param.secondSubjectType = data.subjectList[0].categoryId;
            // })
          }
        },
        mounted(){
          // this.loadlist().then(()=>{
             this.$emit("triggerMore");
          // })
        },
        components:{
          navbar,
          productItem
        }
    }
</script>

<style scoped>
  .content{
    padding-left: 0.025rem;
    padding-right: 0.025rem;
  }
</style>
