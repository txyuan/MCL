<template>
  <div class="padding-header page-bg-hui">
    <mt-header title="自测工具" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>

    <img src="@/assets/images/selfTestTool/banner.jpg" alt="" width="100%">
    
    <div class="banner">
      <div class="note">
        <div class="note-title"><span>为什么要做自测？</span></div>
        <div class="note-view" :class="{'auto': isOpen}" ref="noteView">
          <div v-html="memo" class="note-content"></div>
        </div>
        <div v-show="isShowIcon" class="note-icon" :class="{'open': isOpen}" @click="isOpen = !isOpen"></div>
      </div>
    </div>
    <div class="tool">
      <div class="tool-title"><span>自测工具</span></div>
      <div class="tool-list">
        <ul>
            <!-- <li v-for="(item, index) in list" :key="index" @click="$router.push({name: 'selfTestDetail', query:{type: item.PageUrl, skey: item.sKey, SubjectName: item.SubjectName}})"> -->
            <li v-for="(item, index) in list" :key="index" @click="detailFN(item)">
              <div class="box">
                <p class="item-title">{{item.SubjectName}}</p>
                <p class="item-des">{{item.TileName}}</p>
                <i class="item-icon">GO></i>
              </div>
            </li>
             <li  @click="$router.push('/gauge_PG_SGA')">
              <div class="box">
                <p class="item-title">筛查评估</p>
                <!-- <p class="item-des">{{item.TileName}}</p> -->
                <i class="item-icon">GO></i>
              </div>
            </li>
             <li  @click="$router.push('/dietarySurvey')">
              <div class="box">
                <p class="item-title">膳食评估</p>
                <!-- <p class="item-des">{{item.TileName}}</p> -->
                <i class="item-icon">GO></i>
              </div>
            </li>
             <li  @click="$router.push('/otherfoodOnly')">
              <div class="box">
                <p class="item-title">食物查询</p>
                <!-- <p class="item-des">{{item.TileName}}</p> -->
                <i class="item-icon">GO></i>
              </div>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getSelfTestList } from "@/api/selfTest.js"
import { getZphone } from "@/utils/storage.js"
import {getDetalData} from "@/api/complication"
export default {
  data() {
    return {
      isOpen: false,
      isShowIcon: false,
      memo: "",
      list: [
        // {
        //   sKey:"",
        //   SubjectName: "BMI自测",
        //   ImageUrl: "",
        //   SubjectMemo: "适用于基础自测",
        //   PageUrl: "BMI",
        //   CreateDate: ""
        // },
        // {
        //   sKey:"",
        //   SubjectName: "每日所需能量",
        //   ImageUrl: "",
        //   SubjectMemo: "适用于基础自测",
        //   PageUrl: "energy",
        //   CreateDate: ""
        // },
        // {
        //   sKey:"",
        //   SubjectName: "每日所需蛋白量",
        //   ImageUrl: "",
        //   SubjectMemo: "适用于基础自测",
        //   PageUrl: "protein",
        //   CreateDate: ""
        // },
        // {
        //   sKey:"",
        //   SubjectName: "每日所需饮水量",
        //   ImageUrl: "",
        //   SubjectMemo: "适用于基础自测",
        //   PageUrl: "water",
        //   CreateDate: ""
        // },
        // {
        //   sKey:"",
        //   SubjectName: "标准体重自测",
        //   ImageUrl: "",
        //   SubjectMemo: "适用于基础自测",
        //   PageUrl: "weight",
        //   CreateDate: ""
        // },
        // {
        //   sKey:"",
        //   SubjectName: "每日实际摄入量",
        //   ImageUrl: "",
        //   SubjectMemo: "适用于基础自测",
        //   PageUrl: "actualIntake",
        //   CreateDate: ""
        // },
      ],
      rphone : ''
    }
  },
  methods:{
     async detailFN(item) {
      //  $router.push({name: 'selfTestDetail', query:{type: item.PageUrl, skey: item.sKey, SubjectName: item.SubjectName}})
        let params = {
          skey : item.sKey
        }
        const res = await getDetalData(params)
        if(res.rspcode != 1) {
          return
        }
        if(res.ResultSkey) {
          // selfTestSolution?ResultSkey=2918c2ce-d042-42cb-a3be-a66d55346c4b&skey=a430952c-ee99-4d07-b4b7-9ee4227d853a&type=energy
          this.$router.push({name: 'selfTestSolution', query:{ResultSkey:res.ResultSkey,type: item.PageUrl, skey: item.sKey,SubjectName: item.SubjectName}})
        }else {
          this.$router.push({name: 'selfTestDetail', query:{type: item.PageUrl, skey: item.sKey, SubjectName: item.SubjectName}})
        }
      },
    async getList(){
      const data = await getSelfTestList();
      this.img = data.img;
      this.memo = data.memo;
      this.list = data.data;
      this.$nextTick(() => {
        const noteView = this.$refs.noteView
        const viewHeight = noteView.offsetHeight
        const contentHeight = noteView.querySelector('.note-content').offsetHeight
        if(contentHeight > viewHeight){
          this.isShowIcon = true
        }
      })
    }
  },
  created(){
    this.getList()
    this.rphone = getZphone()
  }
}
</script>

<style scoped lang="scss">
.banner{
    margin: 0.15rem;
    margin-top: -0.5rem;
    margin-bottom: 0.2rem;
    background: #fff;
    border-radius: 0.08rem;
    overflow: hidden;
    position: relative;
    z-index: 10;
    .note{
        padding: 0.1rem;
        padding-top: 0.15rem;
        box-sizing: border-box;
    }
    .note-title{
        // font-weight: bold;
        padding-bottom: 0.05rem;
    }
    .note-view{
        font-size: 14px;
        padding-left: 0.15rem;
        height: 96px;
        min-height: 96px;
        overflow: hidden;
    }
    .note-view.auto{
      height: auto;
    }
    .note-icon{
      text-align: center;
      font-size: 0.12rem;
      color: #999;
      padding: 0.1rem;
      padding-bottom: 0;
      &::before{
        content: "展开";
        vertical-align: middle;
      }
      &::after{
        content: "";
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        background: url("../../assets/images/Shape@2x.png") no-repeat right center;
        background-size: 0.2rem;
        vertical-align: middle;
      }
    }
    .note-icon.open {
      &::before{
        content: "关闭";
      }
      &::after{
        transform:rotate(180deg);
      }
    }
    img{display: block;}
}


// 自测工具
.tool {
  margin: 0.15rem;
  background: #fff;
  border-radius: 0.08rem;
}
.tool-title {
  line-height: 0.55rem;
  // font-weight: bold;
  padding: 0 0.1rem;
}
.tool-title span,.note-title span {
  margin-left: 0.1rem;
}
.tool-title::before,.note-title::before {
  content: "";
  width: 4px;
  height: 0.18rem;
  border-radius: 2px;
  margin-top: -1px;
  display: inline-block;
  vertical-align: middle;
  background: #0ac5ca;
}
.tool-list ul {
  overflow: hidden;
  padding: 0 0.05rem;
  padding-bottom: 0.05rem;
  margin-top: -0.05rem;
  li {
    float: left;
    width: 50%;
    padding: 0.05rem;
    box-sizing: border-box;
  }
  li .box {
    text-align: left;
    background: #F0F4FD;
    border-radius: 0.05rem;
    // height: 0.9rem;
    height: 1.1rem;
    font-size: 0.16rem;
    padding: 0.15rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .item-title{
    margin-bottom: 0.02rem;
  }
  .item-des{
    font-size: 0.12rem;
    color: #666;
    height: 0.32rem;
    margin-bottom: 0.05rem;
  }
  .item-icon{
    width: 0.36rem;
    padding: 0.02rem 0;
    border-top-left-radius: 0.09rem;
    border-bottom-right-radius: 0.09rem;
    font-size: 0.12rem;
    text-align: center;
    font-style: normal;
    color: #fff;
    display: block;
    background: #0ac5ca;
  }
}

.tool-list ul li:nth-child(2) .item-icon{
  background: #E8BA44;
}
.tool-list ul li:nth-child(3) .item-icon{
  background: #E16968;
}
.tool-list ul li:nth-child(4) .item-icon{
  background: #5FC375;
}
.tool-list ul li:nth-child(5) .item-icon{
  background: #916CD5;
}
.tool-list ul li:nth-child(6) .item-icon{
  background: #6BA0F5;
}
</style>