<template>
<div class="padding-header">
	<div id="class_header">
	  <mt-header title="市场订单" fixed>
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	</div>
  
  <div class="borderpay scdd" style="border-top: 1px solid #eee;">
  <!-- tab-container -->
  <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
    <div slot="content">
      <mt-cell v-for="(item,index) in list" :title="item.amount+'元'" :label="item.proName+'x'+item.proCount" :key="index" class="borderBottom">
        <div class="right text-right">
          <span>{{item.orderTime}}</span>
          <span class="mint-cell-label">{{item.userName}}</span>
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
          list: [{aa:'-100',bb:'2018-09-18 00:12:14',cc:'法国红酒',dd:'2',ee:'张勇'}],
          param: {
            "pagesize": 10,
            "pagecount": 0
          },
        }),
        methods:{
          // 下面流水
          getList(success){
          	let url = "UserInterface/GetMarketOrderList.ashx";
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
</style>
