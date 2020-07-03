<template>
<div class="padding-header">
	<div id="class_header">
	  <mt-header title="详细说明" fixed>
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	</div>
  
  <div class="borderpay scdd" style="border-top: 1px solid #eee;">
		<div class="borderpay_pp">
			<h3>完成任务说明：（3选1都算完成任务）</h3>
			<p>1、自行在B版（除爆品区外），消费到达标金额的产品并确认收货算完成任务。</p>
			<p>达标金额的算法：其标准为个人在“A版累计转入金额”的<span>{{percent}}</span>以上，您当前最低累计消费金额为：<u>{{minConsume}}</u>元。</p>
			<p>例：张三在“A版累计转入”10000元，则：10000×0.016=160元，此月张三必须在B版消费160元以上（含160元）并确认收货，算完成任务。</p>
			<p>2、或当月分享一个“新的、有效”消费者在A版有“转入金额”算完成任务。</p>
			<p>3、或当月分享一个“新的、有效”消费者在B版（除爆品区外）任意消费一笔并确认收货算完成任务。</p>
			<p style="text-indent: 0;margin-top: 0.06rem;padding-bottom: 0.1rem;"><span>友情提示：每月月底前务必完成任务，否则次月起奖励终止！</span></p>
		</div>
  <!-- tab-container -->
  <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
    <div slot="content">
      <mt-cell v-for="(item,index) in list" :title="item.amount+'元'" :label="item.proName+'x'+item.proCount" :key="index" class="borderBottom">
        <div class="right text-right">
          <span>{{item.orderTime}}</span>
          <span class="mint-cell-label">{{item.userPhone}}</span>
          <!-- <span style="font-size: 12px;margin-top: 5px;">{{item.cards}}</span> -->
        </div>
      </mt-cell>
    </div>
  </loadMore>
  </div>
  
</div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "commission",
        data:()=>({
					percent:'',
					minConsume:'',
          list: [{aa:'-100',bb:'2018-09-18 00:12:14',cc:'法国红酒',dd:'2',ee:'张勇'}],
          param: {
            "pagesize": 10,
            "pagecount": 0
          },
					phones:''
        }),
        methods:{
					showInform(){
						let url = "UserInterface/GetStandardInfo.ashx";
						this.$post(url).then((data)=>{
						  if(data.rspcode != 1 ){
						    return;
						  }
							this.percent = data.data.percent;
							this.minConsume = data.data.minConsume;
							this.phones = data.data.contactPhone;
						})
					},
          // 下面流水
          getList(success){
          	let url = "UserInterface/GetStandardOrderList.ashx";
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
          this.showInform();
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
	.borderpay_pp{
		padding: 0 3%;
		background:#fff;
		border-bottom:1px solid #eee;
		h3{
			font-size: 0.15rem;
			color: #333;
			font-weight: 500;
			padding: 0.1rem 0 0.06rem 0;
		}
		p{
			font-size: 0.13rem;
			color: #666;
			line-height: 0.22rem;
			text-indent: 2em;
			span,u{
				color: #FF4645;
			}
		}
	}
</style>
