<template>
  <div class="achievement_root padding-header">
    <mt-header title="我的营业额" fixed class="borderBottom">
      <div slot="left">
        <router-link to="/wx_Entrance/personal"  style="color: initial">
          <mt-button icon="back"></mt-button>
        </router-link>
      </div>
      <div slot="right">
        <img src="https://resource.jtsc.club/rili@2x.png" alt="" style="width: 20px;height: 20px;" @click="timePickerShow">
      </div>
    </mt-header>

    <div class="showMoney text-center">
      <p>
        <img src="https://resource.jtsc.club/w_yeji_wd@2x.png" style="width: 0.25rem;height: 0.25rem;"/>
        {{total_performance}}
      </p>
    </div>

    <div class="friend_all">
      <ul class="text-center">
        <li>
          <p>个人营业额</p>
          <p class="num">{{personal_performance}}</p>
        </li>
        <li>
          <p>分享营业额</p>
          <p class="num">{{direct_performance}}</p>
        </li>
        <li>
          <p>社区营业额</p>
          <p class="num">{{community_performance}}</p>
        </li>
      </ul>
    </div>

    <div id="navbar" class="borderBottom">
      <mt-navbar v-model="selected">
        <mt-tab-item id="tab0" @click.native="tabClick('1')"><p>个人明细</p></mt-tab-item>
        <mt-tab-item id="tab1" @click.native="tabClick('2')"><p>分享明细</p></mt-tab-item>
        <mt-tab-item id="tab2" @click.native="tabClick('3')"><p>社区明细</p></mt-tab-item>
      </mt-navbar>
    </div>

    <!-- tab-container -->
    <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
      <div slot="content">
        <mt-cell v-for="(item,index) in list" :title="item.money" :label="item.create_date" :key="index" class="borderBottom">
          <div class="right text-right">
            <span>{{item.record_type}}</span>
            <span class="mint-cell-label">消费{{item.money}}</span>
          </div>
        </mt-cell>
      </div>
    </loadMore>

    <!--月份picker-->
    <monthPicker @confrim="monthPickerConfrim" ref="monthPicker" firstYear="总业绩"/>

    <!--<div class="buttons">-->
      <!--<router-link to="">-->
        <!--<mt-button type="default" class="add_btns" size="large" >转积分</mt-button>-->
      <!--</router-link>-->
    <!--</div>-->

  </div>
</template>

<script>
  import monthPicker from "@/components/common/monthPicker.vue";   //月份picker
  import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
  export default {
    name: "achievement",
    data:()=>({
      selected:"tab0",
      pickerVisible: false,
      total_performance:'', //总业绩
      personal_performance:'', //个人业绩
      direct_performance:'', //直推业绩
      community_performance:'', //社区业绩
      list:[],
      param: {
        "pagesize": 10,
        "pagecount": 0,
        "direction": "1",
        "years": ""  // "" : 全部,  2019-06
      }
    }),
    methods:{
      //tab切换
      tabClick(val){
        this.$Indicator.loading();
        this.param.direction = val;
        this.reloadLoadMore();
        setTimeout(()=>{ this.$Indicator.close()},200)
      },
      //重新加载
      reloadLoadMore(){
        this.param.pagecount = 0;
        this.$refs.loadMoreE.getList();
      },
      //获取列表
      getList(success){
        let url = "UserInterface/GetTotalPerformanceList.ashx";
        if(this.param.pagecount == 1){
          this.list = [];
        }
        this.$post(url,this.param).then((data)=>{
          if(data.rspCode != 1 ){
            return;
          }
          let modelList = data.data;
          this.list = [...this.list,...modelList]
          //加载更多组件触发回调
          if(success){
            success(modelList,this.list)
          }
          const {total_performance,personal_performance,direct_performance,community_performance} = data;
          this.current_amount = total_performance;
          this.personal_performance = personal_performance;
          this.direct_performance = direct_performance;
          this.community_performance = community_performance;
          this.total_performance = total_performance;
        })
      },
      timePickerShow(){
        let{monthPicker} = this.$refs;
        monthPicker.show();
      },
      //时间picker的确定
      monthPickerConfrim(values){
        let [year,month] = values;
        let{monthPicker} = this.$refs;
        let firstYear = monthPicker.firstYear;
        if(year == firstYear){
          this.param.years = ""
        }else{
          month = parseInt(month);
          month = (month<10 ? `0${month}`: month);
          this.param.years = `${parseInt(year)}-${month}`
        }
        this.reloadLoadMore();
      },
    },
    mounted(){

    },
    components:{
      monthPicker,
      loadMore
    }
  }
</script>
<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .mint-cell.borderBottom{
    padding: 0.06rem 0;
    align-items: center;
    align-content: center;
  }
  .right.text-right{
    color: $color60;
    font-size: 0.15rem;
    &>span:nth-child(2){
      margin-top: 5px;
    }
  }
  .showMoney{
    margin-bottom: 5px;
    background: #ffffff;
    p{
      line-height: 0.92rem;
      font-size: 0.36rem;
    }
  }
  .showMoney{
    background: #FFD9DF;
    color: #FF1E41;
  }
  .friend_all{
    background: #ffffff;
    font-size: 15px;
    padding: 14px 0;
    color: $color33;
    margin-bottom: 5px;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 43px;*/
    ul{
      display: flex;
      li{
        flex: 1;
      }
      .num{
        margin-top: 6px;
        font-size: 18px;
      }
    }
  }
</style>

