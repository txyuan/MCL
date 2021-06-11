<template>
<div class="padding-header">
	<div id="class_header" class="myassets">
	  <mt-header title="购物卡" fixed class="borderBottom">
		<div slot="left">
		 <router-link to="/wx_Entrance/personal"  style="color: initial">
		   <mt-button icon="back"></mt-button>
		 </router-link>
		</div>
	  </mt-header>
	</div>
  <div class="card_money">
	  <h4>拥有价值 (元)：{{values}}</h4>
	  <div class="card_num">
		  <div class="card_miy">
			  <p>当前单价 (元)</p>
			  <span>{{price}}</span>
		  </div>
		  <div class="card_miy">
			  <p>拥有数量 (张)</p>
			  <span>{{count}}</span>
		  </div>
	  </div>
  </div>

  <div id="navbar" class="borderBottom">
    <mt-navbar v-model="selected">
      <mt-tab-item id="tab0" @click.native="tabClick('1')"><p>购卡明细</p></mt-tab-item>
      <mt-tab-item id="tab1" @click.native="tabClick('2')"><p>转卡明细</p></mt-tab-item>
      <mt-tab-item id="tab2" @click.native="tabClick('3')"><p>退卡明细</p></mt-tab-item>
    </mt-navbar>
  </div>
  
  <div class="borderpay">
  <!-- tab-container -->
  <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
    <div slot="content">
      <mt-cell v-for="(item,index) in list" :title="item.card_count+'张'" :label="item.money+'元'" :key="index" class="borderBottom">
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
		<router-link to="/cardRecharge">
    <span>充值购卡</span>
		</router-link>
		<router-link to="/cardRefund">
	  <label>退卡提现</label>
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
					count:0,  //拥有数量
					price:0,  //当前单价
					values:0,  //拥有价值
          list: [{zsa:'+1000张',times:'2018.04.16 14:23',miny:'+1200元',cards:'购卡'},{zsa:'+1000张',times:'2018.04.16 14:23',miny:'+1200元',cards:'购卡'},{zsa:'+1000张',times:'2018.04.16 14:23',miny:'+1200元',cards:'购卡'}],
          param: {
            "pagesize": 10,
            "pagecount": 0,
            "type": 1
          }
        }),
        methods:{
					// 当前单价
					getAdrLists(){
					  let url = "UserInterface/GetMyShoppingCardInfo.ashx";
					  this.$post(url).then((data)=>{
					    if(data.rspcode != 1 ){
					      return;
					    }
					    this.values = data.data.values;
							this.count = data.data.count;
							this.price = data.data.price;
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
					  let url = "UserInterface/GetMyShoppingCardFlowList.ashx";
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
		background: #A1EFFD;
		overflow: hidden;
		padding: 0.2rem 0;
		border-bottom: 1px solid #B7B4B4;
		.card_miy{
			float: left;
			width: 50%;
			p{
				text-align: center;
				font-size: 0.16rem;
				padding-top: 0.04rem;
			}
			span{
				display: block;
				text-align: center;
				font-size: 0.22rem;
				color: #EB4630;
				padding: 0.06rem 0 0.04rem 0;
			}
			&:first-child{
				border-right: 1px solid #375257;
				box-sizing: border-box;
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
</style>
