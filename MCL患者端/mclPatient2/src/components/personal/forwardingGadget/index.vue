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
       

        <mt-cell title="医生" is-link style="margin-top: 0.15rem" @click.native="$router.push({name: 'getGoctorList'})">
          <span v-if="doctor.name">{{doctor.name}}</span>
          <span v-else>请选择医生</span>
        </mt-cell>

        <select name="role" class="select"  v-model="value" style="appearance: menulist-button;">
						<option v-for="item in roleList" :disabled="item.disabled" :value="item.value" :key="item.value" :style="item.color">{{item.name}}</option>
					</select>

         <!-- <div class="title">15种并发症</div> -->
        <ul v-show="value == 1">
          <li v-for="(item, i) in list" :key="i" :class="{'active': (type == 'complication' && index == i)}" @click="toggle(i, 'complication')">
            <p>{{item.name}}</p>
          </li>
        </ul>

        <!-- <div class="title">自测工具</div> -->
        <ul v-show="value == 2">
          <li v-for="(item, j) in list2" :key="j" :class="{'active': (type == 'selfTest' && index == j)}" @click="toggle(j, 'selfTest')">
            <p>{{item.SubjectName}}</p>
          </li>
        </ul>
        <!-- <div class="title">商品列表</div> -->
        <ul v-show="value == 3">
          <li v-for="(item, z) in list3" :key="z" :class="{'active': (type == 'serviceDetail' && index == z)}" @click="toggle(z, 'serviceDetail')">
            <p>{{item.goodsName}}</p>
          </li>
        </ul>
        <!-- <div class="title">诊疗</div> -->
        <ul v-show="value == 4">
          <li v-for="(item, w) in list4" :key="w" :class="{'active': (type == 'treatment' && index == w)}" @click="toggle(w, 'treatment')">
            <p>{{item.goodsName}}</p>
          </li>
        </ul>
      </div>

      <div class="fix_bottom">
        <mt-button type="primary" class="theme-button" size="large" @click.native="confirm">去转发</mt-button>
      </div>
  </div>
</template>

<script>
import {getList} from "@/api/complication" 
import { getSelfTestList } from "@/api/selfTest.js"
import { GetProductShareList } from "@/api/shopCar.js"
import bus from "@/utils/bus.js"

export default {
  data: () => ({
    list: [],
    list2: [],
    list3 : [],
    list4 : [{
      goodsName : '基础信息',
      type : 'wellcome_personInfo'
    },
    {
      goodsName : '营养评估',
      type : 'nutrition1'
    },
    {
      goodsName : '心理评估',
      type : 'psychology1'
    },
     {
      goodsName : '体能评估',
      type : 'physicalGauge1'
    },
    {
      goodsName : '体重监测',
      type : 'weightGauge1'
    },
    {
      goodsName : '症状管理',
      type : 'symptom1'
    },
   
    ],
    type: "",
    index: -1,
    item : {},
    doctor:{
      name: "",
      phone: ""
    },
    roleList : [
      {
        value : 0,
        color: {color: '#888'},
        disabled : true,
        name : '请选择要分享的内容'
      },
      {
        value : 1,
        name : '15种并发症'
      },
      {
        value : 2,
        name : '自测工具'
      },
       {
        value : 3,
        name : '商品列表'
      }, {
         value : 4,
        name : '诊疗'
      }
    ],
    value : 0
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
    async getList3() {
      const data = await GetProductShareList()
      this.list3 = data.goodsList
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
    // 跳转到商城
    goServiceDetail(item){
      // this.$router.push({name: 'serviceDetail', params:{type: item.PageUrl, skey: item.sKey, SubjectName: item.SubjectName, doctorPhone: this.doctor.phone}})
      this.$router.push( `serviceDetail/${item.goodsId}?doctorPhone=${this.doctor.phone}`)
    },
    // 跳转到诊疗
    gotreatment(item){
      // this.$router.push({name: 'serviceDetail', params:{type: item.PageUrl, skey: item.sKey, SubjectName: item.SubjectName, doctorPhone: this.doctor.phone}})
      this.$router.push(`/${item.type}?doctorPhone=${this.doctor.phone}`)
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
      }else if(this.type == "serviceDetail") {
      // 跳转到商城
        this.goServiceDetail(this.list3[this.index])
      }else if(this.type == "treatment") {
        // 跳转到诊疗
        this.gotreatment(this.list4[this.index])
      }
    }
  },
  created(){
    this.getList()
    this.getList2()
    this.getList3()
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
  margin-bottom: 0.5rem;
}
.title{
  font-size: 0.16rem;
  margin: 0.2rem 0 0.1rem 0.1rem;
}
ul{
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.2rem;
  li{
    width: 33.33%;
    font-size: 0.13rem;
    text-align: center;
  }
  li p{
    padding: 0.1rem 0.05rem;
    margin: 0.05rem;
    border-radius: 4px;
    background: #F5F5F5;
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
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
.select {
   width : 3.5rem;
   
   font-size:0.16rem; 
   padding-left:0.06rem;
   margin-top: 0.1rem;
}

</style>