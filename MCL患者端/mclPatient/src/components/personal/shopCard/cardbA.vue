<template>
<div class="padding-header">
	<div id="class_header" class="myassets">
	  <mt-header title="A版" fixed class="borderBottom">
		<div slot="left">
		 <router-link to="/wx_Entrance/personal"  style="color: initial">
		   <mt-button icon="back"></mt-button>
		 </router-link>
		</div>
	  </mt-header>
	</div>
  <div class="card_money">
	  <h4>可消费余额 (元)：{{banle.blance}}</h4>
	  <div class="card_num">
		  <div class="card_miy">
			  <p>即时收益 (元)</p>
			  <span>{{banle.instantAmount}}</span>
			  <router-link to="/changeInto"><label>转B版消费></label></router-link>
		  </div>
		  <div class="card_miy2">
			  <p>
				  <span>累计转入 (元)</span>
				  <label>{{banle.cumulativeTransfer}}</label>
			  </p>
			  <p>
				  <span>累计收益 (元)</span>
				  <label>{{banle.cumulativeProfit}}</label>
			  </p>
			  <p>
				  <span>昨日收益 (元)</span>
				  <label>{{banle.yesterdayProfit}}</label>
			  </p>
		  </div>
	  </div>
  </div>
	
	<div class="click_mm">
		  <p>提示：</p>
		  <span>当月业绩目标</span>
		  <label>{{banle.finishStatus}}</label>
		  <a href="javascript:;"><router-link to="clickOrder">点击说明</router-link></a>
	</div>
	
  <div id="navbar" class="borderBottom">
    <mt-navbar v-model="selected">
      <mt-tab-item id="tab0" @click.native="tabClick('1')"><p>余额明细</p></mt-tab-item>
	  <mt-tab-item id="tab1" @click.native="tabClick('2')"><p>收益明细</p></mt-tab-item>
      <mt-tab-item id="tab2" @click.native="tabClick('3')"><p>收益转B明细</p></mt-tab-item>
      <mt-tab-item id="tab3" @click.native="tabClick('4')"><p>提现明细</p></mt-tab-item>
    </mt-navbar>
  </div>
  
  <div class="borderpay">
  <!-- tab-container -->
  <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
    <div slot="content">
      <mt-cell v-for="(item,index) in list" :title="item.money+'元'" :key="index" class="borderBottom">
        <div class="right text-right">
          <span>{{item.create_date}}</span>
          <span class="mint-cell-label">{{item.record_type}}</span>
          <!-- <span style="font-size: 12px;margin-top: 5px;">{{item.cards}}</span> -->
        </div>
      </mt-cell>
    </div>
  </loadMore>
  </div>
  <div class="buttons">
	  <router-link to="/rechargeAB/A">
      <span>购物卡转入</span>
	  </router-link>
	  <router-link to="/withdrawal/A">
	  <label>收益提现</label>
	  </router-link>
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
          param: {
            "pagesize": 10,
            "pagecount": 0,
            "type": 1
          },
					banle:{}
        }),
        methods:{
			// 及时收益
			getAdrLists(){
				let url = "UserInterface/GetMyVerAInfo.ashx";
				this.$post(url).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					this.banle = data.data;
				})
			},
		    //tab切换
		    tabClick(val){
			  this.$Indicator.loading();
			  this.param.type = val;
			  this.param.pagecount = 0;
			  this.$refs.loadMoreE.getList();
			setTimeout(()=>{ this.$Indicator.close()},200)
		    },
			// 下面流水
			getList(success){
				let url = "UserInterface/GetMyVerAFlowList.ashx";
				if(this.param.pagecount == 1){
					this.list = [];
				}
				this.$post(url,this.param).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					let modelList = data.list;
					this.list = [...this.list,...modelList]
					//加载更多组件触发回调
					if(success){
						success(modelList,this.list)
					}
				})
			}
        },
        mounted(){
          this.getAdrLists();
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
  .card_money{
	h4{
		height: 0.36rem;
		background: #ED462F;
		color: #fff;
		font-size: 0.14rem;
		font-weight: normal;
		line-height: 0.36rem;
		padding: 0 3%;
	}
	.card_num{
		overflow: hidden;
		border-bottom: 2px solid #B7B4B4;
		.card_miy{
			height: 1.12rem;
			background: #A1EFFD;
			float: left;
			width: 40%;
			border-right:2px solid #B7B4B4;
			box-sizing: border-box;
			p{
				text-align: center;
				font-size: 0.16rem;
				padding-top: 0.2rem;
			}
			span{
				display: block;
				text-align: center;
				font-size: 0.23rem;
				color: #EB4630;
				padding-top: 0.04rem;
			}
			label{
				display: block;
				text-align: center;
				font-size: 0.14rem;
				color: #EB4630;
				padding-top: 0.02rem;
			}
		}
		.card_miy2{
			height: 1.12rem;
			background: #C8F9FD;
			float: left;
			width: 60%;
			p{
				padding: 0 7%;
				overflow: hidden;
				font-size: 0.14rem;
				margin-top:0.04rem;
				span{
					display: block;
					float: left;
				}
				label{
					display: block;
					float: right;
					font-size: 0.13rem;
					line-height: 0.22rem;
				}
				&:first-child{
					padding-top: 0.2rem;
				}
			}
			
		}
	}
  }
  .buttons{
	  overflow: hidden;
	  span{
		  width: 44%;
		  float: left;
		  height: 0.4rem;
		  display: block;
		  font-size: 0.15rem;
		  color: #FF514F;
		  text-align: center;
		  line-height: 0.4rem;
		  border: 1px solid #FF3D3D;
		  box-sizing: border-box;
		  border-radius: 0.2rem 0 0 0.2rem;
		  border-right: none;
		  margin: 0.05rem 0 0 6%;
	  }
	  label{
		  width: 44%;
		  float: left;
		  height: 0.4rem;
		  display: block;
		  font-size: 0.15rem;
		  color: #fff;
		  text-align: center;
		  line-height: 0.4rem;
		  border-radius: 0 0.2rem 0.2rem 0;
		  background: #FF3D3D;
		  margin-top: 0.05rem;
	  }
  }
  .click_mm{
	  height: 0.44rem;
	  background: #fff;
	  margin: 0.06rem 0;
	  overflow: hidden;
	  line-height: 0.44rem;
	  padding: 0 3%;
	  font-size: 0.15rem;
	  p{
		  color: #424242;
		  float: left;
	  }
	  span{
		  display: block;
		  float: left;
		  color: #717171;
		  font-size: 0.14rem;
	  }
	  label{
		  color: #FF4645;
		  display: block;
		  float: left;
		  margin-left: 15%;
	  }
	  a{
		  float: right;
		  color: #FF4645;
		  display: block;
		  text-decoration: underline;
	  }
  }
</style>
