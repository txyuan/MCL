<template>
<div class="padding-header">
	<div id="class_header" class="myassets">
	  <mt-header title="B版" fixed class="borderBottom">
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
			  <router-link to="/changeIntoB"><label>转入可消费余额></label></router-link>
		  </div>
		  <div class="card_miy2">
			  <p>
				  <span>待返金券 (元)</span>
				  <label>{{banle.returnTicket}}</label>
			  </p>
			  <p>
				  <span>已返金券 (元)</span>
				  <label>{{banle.returnedVouchers}}</label>
			  </p>
			  <p>
				  <span>昨日返券 (元)</span>
				  <label>{{banle.yesterdayReturnTicket}}</label>
			  </p>
			  <p>
				  <span>可消费券 (元)</span>
				  <label>{{banle.spendingTicket}}</label>
			  </p>
			  <div class="dongj" v-if="banle.FrozenFlag==1">
				  <!-- <img src="@/assets/images/yinzhang.png" /> -->
			  </div>
		  </div>
	  </div>
  </div>
	
	<router-link to="marketOrder"><div class="click_mm">市场订单：点击查看</div></router-link>
	
  <div id="navbar" class="borderBottom">
    <mt-navbar v-model="selected">
      <mt-tab-item id="tab0" @click.native="tabClick('1')"><p>余额明细</p></mt-tab-item>
	  <mt-tab-item id="tab1" @click.native="tabClick('2')"><p>金券明细</p></mt-tab-item>
      <mt-tab-item id="tab2" @click.native="tabClick('3')"><p>收益明细</p></mt-tab-item>
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
      <router-link to="/rechargeAB/B">
		<span>购物卡转入</span>
      </router-link>
	  <div v-if="istix!=1">
			<label style="background: #ddd;border: 1px solid #FF514F;box-sizing: border-box;color: #666;">提现</label>
	  </div>
      <div v-else>
      		<router-link to="/withdrawal/B">
      			<label>收益提现</label>
      		</router-link> 
      </div>
  </div>
  
</div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "commission",
        data:()=>({
          selected:"tab0",
		  istix:1,
          list: [{zsa:'+1000张',times:'2018.04.16 14:23',miny:'+1200元',cards:'转入'},{zsa:'-1000',times:'2018.04.16 14:23',miny:'-1200元',cards:'提现'},{zsa:'+1000张',times:'2018.04.16 14:23',miny:'+1200元',cards:'好友提成'}],
          param: {
            "pagesize": 10,
            "pagecount": 0,
            "type": 1
          },
		  banle:{}  //上面
        }),
        methods:{
			// 及时收益
			getAdrLists(){
				let url = "UserInterface/GetMyVerBInfo.ashx";
				this.$post(url).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					this.banle = data.data;
				})
			},
			// 是否可提现
			getIstx(){
				let url = "UserInterface/GetVerBWithdrawInfo.ashx";
				this.$post(url).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					this.istix = data.data.WithdrawFlag;
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
          	let url = "UserInterface/GetMyVerBFlowList.ashx";
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
		  this.getIstx();
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
			position: relative;
			p{
				padding: 0 15%;
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
				}
				&:first-child{
					padding-top: 0.1rem;
				}
			}
			.dongj{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: rgba(000,000,000,0.4);
				img{
					width: 0.7rem;
					top: 0.3rem;
					right: 0.6rem;
					position: absolute;
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
	  font-size: 0.15rem;
	  text-align: center;
	  color: #FF3D3D;
	  text-decoration: underline;
  }
</style>
