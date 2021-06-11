<template>
  <div class="padding-header padding-footer page-bg-white">
    <mt-header :title="title" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    
    <div class="navbar">
        <ul>
            <li v-for="(item, index) in list" :key="index" :class="{'active': index == navIndex}" @click="toggle(item, index)">{{item.parentName}}</li>
        </ul>
    </div>
    <div class="content" v-html="content">
    </div>
    <mt-button type="primary" class="theme-button fix_bottom" size="large" @click.native="$router.push({name: 'complicationHome', params: {type: list[0].self_test_url}, query: $route.query})">立即自测</mt-button>
  </div>
</template>

<script>
import {getList2} from "@/api/complication" 
export default {
    data: function() {
        const {title, skey} = this.$route.query
        return {
            title,
            skey,
            navIndex: 0,
            content: "",
            list: []
        }
    },
    methods:{
      toggle(item, index){
        this.navIndex = index
        this.content = item.content
      },
      async getList(){
        const data = await getList2({id: this.skey});
        this.list = data.data
        this.toggle(this.list[0], 0)
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