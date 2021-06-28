<template>
  <div class="padding-header page-bg-white">
    <mt-header :title="label" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    
    <div style="overflow: hidden">
      <div class="content" v-for="(item, index) in list" :key="index" v-html="item.memo"></div>
    </div>
    
  </div>
</template>

<script>
import {getDietAdviceList} from "@/api/complication" 
export default {
    data: function() {
        const {label, labelSecond} = this.$route.query
        return {
            label,
            labelSecond,
            navIndex: 0,
            content: "",
            list: []
        }
    },
    methods:{
      async getList(){
        const data = await getDietAdviceList({label: this.label, labelSecond: this.labelSecond});
        this.list = data.data
      }
    },
    created(){
      this.getList()
    }
}
</script>

<style scoped lang="scss">
.navbar{
    margin: 0 0.15rem;
    overflow: hidden;
    overflow-x: scroll;
    ul{white-space: nowrap;}
    li{
        display: inline-block;
        line-height: 0.4rem;
        height: 0.4rem;
        box-sizing: border-box;
        margin-right: 0.15rem;
        color: #666;
        font-size: 0.15rem;
        border-bottom: 2px solid transparent;
    }
    li.active{
        color: #000;
        border-color: #0ac5ca;
    }
}
.content{
   margin: 0 0.15rem;
   margin-top: 0.1rem;
   font-size: 0.14rem;
   >>> img{
     width: 100%;
   }
}
</style>