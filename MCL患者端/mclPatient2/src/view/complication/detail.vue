<template>
  <div class="padding-header padding-footer page-bg-white" style="padding-bottom: 0.6rem">
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
    <div class="fix_bottom">
    <mt-button type="primary" class="theme-button" size="large" @click.native="$router.push({name: 'complicationHome', params: {type: list[0].self_test_url}, query: $route.query})">立即自测</mt-button>
    </div>
  </div>
</template>

<script>
import {getList2} from "@/api/complication"
import { setRhone } from "@/utils/storage.js"

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
      // 通过转发小工具转发进来的情况，获取链接上的推荐码
      const query = this.$route.query
      if(query.doctorPhone){
        setRhone(query.doctorPhone)
      }
    }
}
</script>

<style scoped lang="scss">
.navbar{
    margin: 0 0.15rem;
    overflow: hidden;
    overflow-x: scroll;

    ul{white-space: nowrap;
      display: -ms-flexbox!important;
      display: flex!important;
      -ms-flex-pack: justify!important;
      justify-content: space-between!important;
    }
    li{
      display: inline-block;
      line-height: 0.38rem;
      height: 0.425rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #666666;
      font-size: 0.155rem;
      border-bottom: 3px solid transparent;
      padding: 0.05rem 0.01rem 0 0.01rem;
      font-family: 微软雅黑, "Microsoft YaHei";
    }
    li.active{
        color: #0ac5ca;
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
  .theme-button{
    height: 0.44rem;
    line-height: 0.44rem;
    border-radius:8px;

  }
.fix_bottom{
  background: #ffffff;
  padding: 0.075rem 0.15rem;
}
</style>
