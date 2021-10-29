<template>
  <div class="padding-header page-bg-white">
      <mt-header title="转发小工具" fixed class="borderBottom">
				<div slot="left">
					<header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
				</div>
			</mt-header>

      <div class="content">
        <div class="title">15种并发症</div>
        <ul>
          <li v-for="(item, i) in list" :key="i" :class="{'active': (type == 'complication' && index == i)}" @click="toggle(i, 'complication')">
            <p>{{item.name}}</p>
          </li>
        </ul>

        <div class="title">自测工具</div>
        <ul>
          <li v-for="(item, j) in list2" :key="j" :class="{'active': (type == 'selfTest' && index == j)}" @click="toggle(j, 'selfTest')">
            <p>{{item.SubjectName}}</p>
          </li>
        </ul>

        <mt-cell title="医生" is-link style="margin-top: 0.15rem" @click.native="$router.push({name: 'getGoctorList'})">
          <span v-if="doctor.name">{{doctor.name}}</span>
          <span v-else>请选择医生</span>
        </mt-cell>
      </div>

      <div class="fix_bottom">
        <mt-button type="primary" class="theme-button" size="large" @click.native="confirm">去转发</mt-button>
      </div>
  </div>
</template>

<script>
import {getList} from "@/api/complication" 
import { getSelfTestList } from "@/api/selfTest.js"
import bus from "@/utils/bus.js"

export default {
  data: () => ({
    list: [],
    list2: [],
    type: "",
    index: -1,
    doctor:{
      name: "",
      phone: ""
    }
  }),
  methods:{
    // 并发症
    async getList(){
      const data = await getList();
      this.list = data.data
    },
    // 自测工具
    async getList2(){
      const data = await getSelfTestList();
      this.list2 = data.data;
    },
    toggle(index, type){
      this.index = index;
      this.type = type;
    },
    // 跳转到并发症
    goComplication(item){
      this.$router.push({name: 'complicationDeatil', query:{title: item.name, skey: item.sKey, doctorPhone: this.doctor.phone}})
    },
    // 跳转到自测工具
    goSelfTest(item){
      this.$router.push({name: 'selfTestDetail', query:{type: item.PageUrl, skey: item.sKey, SubjectName: item.SubjectName, doctorPhone: this.doctor.phone}})
    },
    confirm(){
      if(this.type == ""){
        this.$Toast('请选择15种并发症或者自测工具')
        return
      }
      if(this.doctor.phone == ""){
        this.$Toast('请选择医生')
        return
      }
      
      if(this.type == "complication"){
      // 跳转到并发症
        this.goComplication(this.list[this.index])
      }else if(this.type == "selfTest"){
      // 跳转到自测工具
        this.goSelfTest(this.list2[this.index])
      }
    }
  },
  created(){
    this.getList()
    this.getList2()
    // bus 绑定事件
    bus.$on('checkDoctor', (data) => {
      this.doctor = data
    }) 
  }
}
</script>

<style scoped lang="scss">
.content{
  padding: 0.05rem;
}
.title{
  font-size: 0.16rem;
  margin: 0.2rem 0 0.1rem 0.1rem;
}
ul{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 33.33%;
    font-size: 0.13rem;
    text-align: center;
  }
  li p{
    padding: 0.1rem 0;
    margin: 0.05rem;
    border-radius: 4px;
    background: #F5F5F5;
  }
  li.active  p{
    color: #ffffff;
    background: #0ac5ca;
  }
}

.fix_bottom {
  background: #ffffff;
  padding: 0.075rem 0.15rem;
}
</style>