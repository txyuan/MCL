<template>
    <div>
      <div class="fix_top">
			 <mt-header title="查看物流" class="borderBottom">
         <div slot="left">
					<router-link to style="color: initial;">
						<mt-button icon="back" @click="$router.back()"></mt-button>
					</router-link>
				</div>
			 </mt-header>
		  </div>
        <div class="product_row">
    <img v-lazy="itemData.goodsImage" class="productImg" alt="">
    <div class="right">
      <div class="name">{{itemData.goodsName}}</div>
      <div class="time" v-if="itemData.buyTime">下单时间：{{itemData.buyTime}}</div>
      <div class="orderNum">购买份数：{{itemData.buyCount}}</div>
      <div class="money">付款金额：¥ {{itemData.orderMoney}}</div>
    </div>
     </div>
     	<div class="title">
				<div class="logistics_number" v-if="itemData.logistics_number">{{itemData.logistics_number}}</div>
				<span class="dateType">{{itemData.stateText}}</span>
			</div>
      <div class="main">
        <div class="aui-flex aui-flex-lag">
                    <div class="aui-flex-box">
                        <h2 style="color:#333">物流跟踪</h2>
                    </div>
                </div>
                <div v-if="wuliuData.length != 0" class="aui-timeLine b-line">
                    <ul class="aui-timeLine-content">
                        <li class="aui-timeLine-content-item" v-for="(item, index) in wuliuData" :key="index">
                            <em class="aui-timeLine-content-icon"></em>
                            <p>{{item.AcceptStation}}</p>
                            <p style="margin-top: 10px;">{{item.AcceptTime}}</p>
                        </li>
                    </ul>
                </div>
                 <div v-else class="noData">
                    <p>{{data.Reason}}</p>
                </div>
      </div>
    </div>
</template>

<script>
export default {
  name : 'personalgetwuliu',
    data() {
        return {
          itemData : {}, // 商品信息
          data : {},
          wuliuData : [] // 物流信息
        }
    },
    created() {
      this.itemData = JSON.parse(window.localStorage.getItem('commInfo'))
       this.getWuliuData()
    },
    mounted() {
      
    },
    methods : {
      getWuliuData() {
      let url = 'UserInterface/TestLogisticsTrackingQuery.ashx'
      let param = {
        LogisticCode: this.itemData.LogisticCode,
      }
      this.$get(url, param).then((data) => {
        this.data = data
        this.wuliuData = data.Traces.reverse()
         })
      }
    }
}
</script>
<style scoped lang="scss">
.product_row{
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
  display: flex;
  background: #fff;
  padding: 0.1rem;
  .productImg{
    width: 0.85rem;
    height: 0.85rem;
    margin-right: 0.20rem;
    border-radius: 4px;
  }
  .right{
    flex: 1;
    font-size: 0.12rem;
    color: #999;
    &>div{
      margin: 0.03rem 0;
    }
  }
  .name{
    font-size: 0.16rem;
    color: #333;
    margin-top: 0 !important;
    margin-bottom: 0.10rem !important;
  }
  .time{height: 0.19rem;}
}
	.title{
			overflow: hidden;
			padding: 0.1rem 0.1rem;
			border-bottom: 1px solid #e1e1e1;
			font-size: 0.14rem;
      background-color: #fff;
			.logistics_number{float: left;}
			.dateType{float: right;display: block;color: #999;}
		}

.aui-flex-box {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 0.1rem 0.1rem;
    min-width: 0;
    font-size: 0.14rem;
    color: #333;
    background-color: #fff;
}

/* 必要布局样式css */
.aui-flexView {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}
.aui-flex-lag .aui-flex-box h2 {
    font-size: 0.14rem;
    color: #999999;
}

.aui-flex-lag .aui-flex-box h2 em {
    font-style: normal;
    color: #333;
}
.aui-timeLine {
    background-color: #fff;
    font-size: 0.12rem;
    color: #6e6e6e;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.aui-timeLine-content {
    margin-left: 0.16rem;
    border-left: 0.01rem solid #e4e5e9;
}

.aui-timeLine-content-item {
    padding: 0.16rem 0.12rem 0.12rem 0;
    margin-left: 0.16rem;
    position: relative;
}

.aui-timeLine-content .aui-timeLine-content-item:first-child {
    margin-top: 0.16rem;
    padding-top: 0;
    color: #ff8785;
}

.aui-timeLine-content .aui-timeLine-content-item:first-child:before {
    content: "";
    width: 0.16rem;
    height: 0.16rem;
    position: absolute;
    z-index: 0;
    top: 0;
    left: -0.24rem;
    background-color: #fbbfbf;
    border-radius: 99px;
}

.aui-timeLine-content-icon {
    width: 0.08rem;
    height: 0.08rem;
    border-radius: 0.99rem;
    background-color: #e4e5e9;
    content: "";
    position: absolute;
    z-index: 1;
    left: -0.16rem;
    display: block;
    top: 0.19rem;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
}

.aui-timeLine-content-item:first-child>.aui-timeLine-content-icon {
    top: 0.03rem;
}

.aui-timeLine-content-item:first-child>.aui-timeLine-content-icon {
    background-color: #f23030;
    width: 0.1rem;
    height: 0.1rem;
}
.noData {
  width: 100%;
  height: 1rem;
  background-color: #fff;
  text-align: center;
  padding-top: 0.5rem;
}
</style>