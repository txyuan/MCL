<template>
  <div class="padding-header page-bg-white">
    <mt-header title="15种并发症" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    
    <div class="content">
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <div class="li_block" @click="detailFN(item)">
                    <span> {{item.name}} </span>
                    <img :src="item.ImageUrl" alt="">
                </div>    
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
import {getList,getDetalData} from "@/api/complication" 
import { getZphone } from "@/utils/storage.js"
export default {
    data: () => ({
      list: [],
      rphone : ''
    }),
    methods:{
      async detailFN(item) {
        let params = {
          skey : item.sKey
        }
        const res = await getDetalData(params)
        if(res.rspcode != 1) {
          return
        }
        if(res.ResultSkey) {
          this.$router.push({name: 'complicationResult', query:{ResultSkey:res.ResultSkey, title: item.name, skey: item.sKey}})
        }else {
          this.$router.push({name: 'complicationDeatil', query:{title: item.name, skey: item.sKey}})
        }
      },
      
      async getList(){
        const data = await getList();
        this.list = data.data
      }
    },
    created(){
      this.getList()
      this.rphone = getZphone()
    }
}
</script>

<style scoped lang="scss">
.content{
    ul{
        padding: 0.07rem;
        padding-top: 0.15rem;
        overflow: hidden;
    }
    li{
        width: 50%;
        padding: 0 0.07rem;
        margin-bottom: 0.15rem;
        box-sizing: border-box;
        float: left;
    }
    .li_block{
        border-radius: 0.8rem;
        background: #F5F5F5;
        padding: 0 0.15rem;
        height: 0.7rem;
        border-radius: 0.08rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .li_block img{
        width: 0.3rem;
        height: 0.3rem;
    }
}
</style>