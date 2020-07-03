<template>
  <div class="contribution_value_root padding-header">
    <mt-header title="本月贡献值" fixed class="borderBottom">
      <div slot="left">
        <router-link to="/wx_Entrance/personal"  style="color: initial">
          <mt-button icon="back"></mt-button>
        </router-link>
      </div>
      <div slot="right">
        <img src="https://resource.jtsc.club/rili@2x.png" alt="" style="width: 20px;height: 20px;" @click="timePickerShow">
      </div>
    </mt-header>

    <div class="showMoney">
      <ul class="text-center clear">
      	<li class="float_left">
      		<span class="red">可汇兑</span>
      		<p>	{{current_amount}}</p>
      	</li>
      	<li class="float_left">
	  			<span class="blue">冻结中</span>
	  			<p>	{{current_unamount}}</p>
      	</li>
      </ul>
    </div>

    <div class="friend_all">
      <!--<ul class="text-center">
        <li>
          <p>商品出售贡献</p>
          <p class="num">{{plu_consignment}}</p>
        </li>
        <li>
          <p>分享贡献</p>
          <p class="num">{{direct_contribution}}</p>
        </li>
        <li>
          <p>社区贡献</p>
          <p class="num">{{community_contribution}}</p>
        </li>
      </ul>-->
      <table border="0" cellspacing="0" cellpadding="0">
      	<tr>	<th></th>	<th style="color: #FF3D3D;">可汇兑</th>	<th style="color: #3D9BFF;">冻结中</th></tr>
      	<tr>	<td width="80">商品寄卖</td>	<td class="text-center">{{plu_consignment}}</td>	<td class="text-center">{{plu_unconsignment}}</td></tr>
      	<tr>	<td>分享贡献</td>	<td class="text-center">{{direct_contribution}}</td>	<td class="text-center">{{direct_uncontribution}}</td></tr>
      	<tr>	<td>社区贡献</td>	<td class="text-center">{{community_contribution}}</td>	<td class="text-center">{{community_uncontribution}}</td></tr>
      </table>
    </div>

    <div class="target">
        <div class="left">消费目标：<span class="themeRed">{{consumption_target}}</span></div>
        <div class="right"><span class="themeRed">{{target_state}}</span></div>
    </div>

    <div id="navbar" class="borderBottom">
      <mt-navbar v-model="selected">
        <mt-tab-item id="tab0" @click.native="tabClick('0')"><p>全部</p></mt-tab-item>
        <mt-tab-item id="tab1" @click.native="tabClick('1')"><p>收入</p></mt-tab-item>
        <mt-tab-item id="tab2" @click.native="tabClick('-1')"><p>支出</p></mt-tab-item>
      </mt-navbar>
    </div>

    <!-- tab-container -->
    <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
      <div slot="content">
        <mt-cell v-for="(item,index) in list" :title="item.money" :label="item.create_date" :key="index" class="borderBottom">
          <div class="right text-right">
            <span>{{item.record_type}}</span>
            <span class="mint-cell-label">{{item.remarks}}</span>
          </div>
        </mt-cell>
      </div>
    </loadMore>

    <!--月份picker-->
    <monthPicker @confrim="monthPickerConfrim" ref="monthPicker" firstYear="总贡献值"/>

    <!--<div class="buttons">
        <mt-button type="default" class="add_btns" size="large" @click="goPage">转余额</mt-button>
    </div>-->

	  <div class="detile_btn">
	  	<div class="btn-group">
	  		<p class="defult-btn"  @click="goPage">转余额</p>
	  		<p class="btn" @click="goUnveiled">汇兑</p>
	  	</div>
	  </div>

  </div>
</template>

<script>
  import monthPicker from "@/components/common/monthPicker.vue";   //月份picker
  import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
  export default {
    name: "contributionValue",
    data:()=>({
      selected:"tab0",
      pickerVisible: false,
      current_amount:'',  //当前金额
      current_unamount:'',  //冻结中金额
      plu_consignment:"",  //商品寄卖
      plu_unconsignment:"",  //冻结商品寄卖
      direct_contribution:"",  //直推贡献
      direct_uncontribution:"", //冻结直推贡献
      community_contribution:"",  //社区贡献
      community_uncontribution:"",  // 冻结社区贡献
      consumption_target:"",  //消费目标
      target_state:"",  //目标状态
      list:[],
      param: {
        "pagesize": 10,
        "pagecount": 0,
        "direction": "0",
        "years":""   // "" : 全部,  2019-06
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
        let url = "UserInterface/GetUserCommissionList.ashx";
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
          const {current_amount,current_unamount,plu_consignment,plu_unconsignment,direct_contribution,direct_uncontribution,community_contribution,community_uncontribution,consumption_target,target_state} = data;
          this.current_amount = current_amount;
          this.current_unamount = current_unamount;
          this.plu_consignment = plu_consignment;
          this.plu_unconsignment = plu_unconsignment;
          this.direct_contribution = direct_contribution;
          this.direct_uncontribution = direct_uncontribution;
          this.community_contribution = community_contribution;
          this.community_uncontribution = community_uncontribution;
          this.consumption_target = consumption_target;
          this.target_state = target_state;
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
      goPage(){
        if(this.current_amount != ''){
          this.$router.push(`/personal_contribution_to_balance?current_amount=${this.current_amount}`);
        }
      },
      //汇兑
      goUnveiled(){
        this.$router.push('/unveiled');
      }
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
      /*line-height: 0.92rem;*/
      font-size: 0.36rem;
    }
  }
  .showMoney{
    background: #FFD9DF;
    color: #FF1E41;
    height: 0.92rem;
  }
  .showMoney li{
  	width: 50%;
  	padding-top: 0.18rem;
  	span{
  		color: #FFF;
  		border-radius: 2px;
  		padding: 2px 4px;
  		font-size: 12px;
  		display: inline-block;
  		margin-bottom: 0.03rem;
  	}
  	span.red{
  		background: #FF3D3D;
  	}
  	span.blue{
  		background: #3D9BFF;
  	}
  }
  .friend_all{
    background: #ffffff;
    font-size: 15px;
    padding: 0px 12px;
    color: $color33;
    margin-bottom: 5px;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 43px;*/
    table{
   	 width: 100%;
   	 th,td{padding: 10px 0;font-size: 14px;font-weight: normal;}
    }
    ul{
      display: flex;
      li{
        flex: 1;
      }
      .dj_icon{
        width: 24px;
        height: 13px;
        margin-left: 2px;
        display: inline-block;
        background: url("https://resource.jtsc.club/dongjie@2x.png") no-repeat center;
        background-size: cover;
      }
      .num{
        margin-top: 6px;
        font-size: 18px;
      }
    }
  }
  .target{
    background: #ffffff;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }


  .detile_btn{
    width: 100%;
    height: 0.5rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .detile_btn .btn-group{
    width: 80%;
    height: 0.4rem;
    margin: 0 auto;
    margin-top: 0.05rem;
    border-radius: 0.2rem;
    overflow: hidden;
    display: flex;
    border: 1px solid #FF3D3D;
    box-sizing: border-box;
  }
  .detile_btn .btn-group>p{
    flex: 1;
    text-align: center;
    font-size: 0.16rem;
    line-height: 0.4rem;
  }
  .detile_btn .btn{
    background: #FF3D3D;
    color: #fff;
  }
  .detile_btn .defult-btn{
    color: #FF3D3D;
    box-sizing: border-box;
  }

</style>


