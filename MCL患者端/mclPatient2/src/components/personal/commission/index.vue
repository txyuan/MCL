<template>
<div class="padding-header">
  <mt-header :title="title" fixed class="borderBottom">
    <div slot="left">
     <router-link to="/wx_Entrance/personal"  style="color: initial">
       <mt-button icon="back"></mt-button>
     </router-link>
    </div>
  </mt-header>

  <div class="showMoney text-center">
	  	  <ul class="text-center clear" v-if="type == 'goldenBeans'">
		      	<li class="float_left">
		      		<span class="red">可使用</span>
		      		<p>	{{moneye}}</p>
		      	</li>
		      	<li class="float_left">
			  			<span class="blue">冻结中</span>
			  			<p>	{{current_unamount}}</p>
		      	</li>
	      </ul>
        <p v-else>
          <img v-if="type == 'balance'" src="https://resource.jtsc.club/w_yue_wd@2x.png" style="width: 0.25rem;height: 0.25rem;"/>
          <img v-if="type == 'quota'" src="https://resource.jtsc.club/w_peie_wd@2x.png" style="width: 0.25rem;height: 0.25rem;"/>
          <img v-if="type == 'integral'" src="https://resource.jtsc.club/w_jifen_wd@2x.png" style="width: 0.25rem;height: 0.25rem;"/>
          {{moneye}}
        </p>
        
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
          <span class="mint-cell-label">消费{{item.money}}</span>
          <span v-if="(type == 'commission')&&(item.operation_type == '1')" style="font-size: 12px;margin-top: 5px">{{item.remarks}}</span>
        </div>
      </mt-cell>
    </div>
  </loadMore>

  <div class="buttons" v-show="(type == 'balance')||(type == 'goldenBeans')">
      <mt-button type="default" class="add_btns" size="large" @click="goPage">{{buttonText}}</mt-button>
  </div>
  
</div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "commission",
        data:()=>({
          selected:"tab0",
          list: [],
          title:"",
          type:"",
          buttonText:"",
          buttonPath:"",
          moneye:'',
          current_unamount:"0", //冻结中
          param: {
            "pagesize": 10,
            "pagecount": 0,
            "Direction": "0"
          }
        }),
        methods:{
          //tab切换
          tabClick(val){
            this.$Indicator.loading();
            this.param.Direction = val;
            this.param.pagecount = 0;
            this.$refs.loadMoreE.getList();
            setTimeout(()=>{ this.$Indicator.close()},200)
          },
          //获取列表
          getList(success){
            let type = this.$route.params.type;
            if(type == "quota"){
              this.getCommission(success);
            }else if(type == "balance"){
              this.getMoney(success);
            }else if(type == "integral"){
              this.getIntegral(success);
            }else if(type == "goldenBeans"){
              this.getGoldList(success);
            }
          },
          //配额信息列表
          getCommission(success){
            let url = "UserInterface/GetUserQuotaList.ashx";
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
              this.moneye=data.current_amount;
            })
          },
          //余额信息列表
          getMoney(success){
            let url = "UserInterface/channel/GetUserBalanceList.ashx";
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
              this.moneye=data.current_amount;
            })
          },
          //积分信息列表
          getIntegral(success){
            let url = "UserInterface/GetUserIntegralList.ashx";
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
              this.moneye=data.current_integra;
            })
          },
          //获取金豆列表
          getGoldList(success){
            let url = "UserInterface/GetUserJinDouList.ashx";
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
              this.moneye=data.current_amount;
              this.current_unamount=data.current_unamount;
            })
          },
          goPage(){
            let type = this.$route.params.type;
            if(type == "goldenBeans"){  //我的配额
              if(this.moneye != ''){
                this.$router.push(`${this.buttonPath}?current_amount=${this.moneye}`);
              }
            }else{
              this.$router.push(this.buttonPath);
            }
          },
          //汇兑
          goUnveiled(){
            this.$router.push('/unveiled');
          }
        },
        mounted(){
          let type = this.$route.params.type;
          let title = "";
          let buttonText = "";
          let buttonPath = "";
          if(type == "quota"){
            title = "我的配额"
            buttonText = "";
          }else if(type == "balance"){
            title = "我的余额";
            buttonText = "充值";
            buttonPath = "/personalrecharge";
          }else if(type == "integral"){
            title = "我的积分"
            buttonText = "";
          }else if(type == "goldenBeans"){
          	title = "我的金豆"
            buttonText = "转积分";
            buttonPath = "/quotaToIntegral";
          }
          this.type = type;
          this.title = title;
          this.buttonText = buttonText;
          this.buttonPath = buttonPath;
        },
        components:{
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
</style>
