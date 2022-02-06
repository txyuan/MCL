<template>
  <div>
    <xuanzeTime class="seleTime" @changeTime="changeTime" :actInfo="actInfo" v-if="!selTime" />
     <div v-else>
       <div class="con_bot">
          <p class="time_now" @click="selTime = !selTime">
            {{ time }} <van-icon name="arrow-down" />
          </p>
          <label>成交{{data.noTran}}笔</label>
          <div>
            <p >¥ {{ data.achievement }}</p>
            <p>新增下游: {{ data.subordinateCount }}</p>
          </div>
        </div>
       <echartsData @getData="getData" :param="params" class="echartsData"/>
     </div>
     
  </div>
</template>

<script>
import echartsData from "../echartsData.vue";
import xuanzeTime from "../../xuanzeTime.vue";
export default {
  name :'bill',
  props : ['params'],
  data() {
    return {
      actInfo : 1,
       param: {
      dateflag: 2,
      date: "",
      begDate: '',
      endDate: '',
      skey : '',
      pagesize: 10,
      pagecount: 1,
    },
    data : {},
      time: '',
      selTime : true,
    }
  },
  components : {
    echartsData,
    xuanzeTime
  },
  created(){
     if(this.params.date) {
      this.time = this.params.date
      return
    }
    this.getTime()
  },
  methods : {
     changeTime(val,time,type) {
        this.selTime = val
      if(!time) {
        //  if(!this.params.date){

        //  }
         this.time = this.params.date
         return
       }
     
      this.time = time
      this.params.date = time
      this.params.dateflag = type
      if (type == 3) {
        this.params.begDate = this.time.split("~")[0];
        this.params.endDate = this.time.split("~")[1];
        this.params.date = "";
      }
    },
    getData(data) {
      this.data = data
    },
    // 获取日期
    getTime() {
        let nowDate = new Date();
        let date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
        };
        this.time = date.year + "-" + 0 + date.month;
        this.param.date = this.time
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
.con_bot {
  overflow: hidden;
  padding: 0.1rem;
  // background-color: #fff;
  margin-top: 0.05rem;
  > p {
    font-size: 0.14rem;
    // margin-left: 0.1rem;
  }
  div {
    line-height: 0.2rem;
    p:first-child {
      float: left;
      margin-top: 0.1rem;
      margin-left: 0.2rem;
      font-size: 0.2rem;
      font-weight: 500;
    }
    p:nth-child(2) {
      float: left;
      margin-top: 0.1rem;
      margin-left: 0.4rem;
      font-size: 0.2rem;
      font-weight: 500;
    }
  }
}
label {
    display: block;
    color: #7d8182;
    font-size: 0.13rem;
    padding-top: 0.05rem;
    }
    .seleTime {
      margin-top: -0.45rem;
    }
    // .echartsData {
    //   padding: 0.1rem;
    // }
</style>