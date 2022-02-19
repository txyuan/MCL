<template>
<div>
  <xuanzeTime @changeTime="changeTime" v-if="!selTime"/>
  <div class="padding-header" v-else>
    <div id="class_header" class="myassets">
      <mt-header title="我的业绩" fixed class="borderBottom">
        <div slot="left">
          <router-link to="/wx_Entrance/personal" style="color: initial">
            <mt-button icon="back"></mt-button>
          </router-link>
        </div>
      </mt-header>
    </div>
    <div class="content">
      <van-tabs v-model="active" class="guding" @change="changeTabs">
        <van-tab title="直接业绩">
          <div style="padding: 0.1rem 0.1rem">
            <div class="money_card">
              <p class="time_now" @click="selTime = !selTime">
                {{ time }} <van-icon name="arrow-down" />
              </p>
              <h2>¥{{ dataZhi.achievement }}</h2>
              <div class="bot">
                <div style="width: 50%">
                  <p>{{ dataZhi.purchaseCount }}</p>
                  <p>购买人数</p>
                </div>
                <div style="width: 50%">
                  <p>{{ dataZhi.noTran }}</p>
                  <p>成交笔数</p>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="间接业绩">
          <div style="padding: 0.1rem 0.1rem">
            <div class="money_card">
              <p class="time_now" @click="selTime = !selTime">
                {{ time3 }} <van-icon name="arrow-down" />
              </p>
              <h2>¥{{ dataJian.achievement }}</h2>
              <div class="bot">
                <div style="width: 50%">
                  <p>{{ dataJian.purchaseCount }}</p>
                  <p>购买人数</p>
                </div>
                <div style="width: 50%">
                  <p>{{ dataJian.noTran }}</p>
                  <p>成交笔数</p>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="我的消费">
          <div style="padding: 0.1rem 0.1rem">
            <div class="money_card">
              <!-- <p class="time_now" @click="$router.push('/selTime')"> -->
              <p class="time_now" @click="selTime = !selTime">
                {{ time2 }} <van-icon name="arrow-down" />
              </p>
              <h2>¥{{ dataZi.achievement }}</h2>
              <div class="bot">
                <div style="width: 50%">
                  <p>{{ dataZi.purchaseCount }}</p>
                  <p>购买人数</p>
                </div>
                <div style="width: 50%"></div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="card_money">
			<div class="card_num">
				<div class="card_miy">
					<span>{{allmoney}}</span>
				</div>
			</div>
		</div> -->

    <!-- <div id="navbar" class="borderBottom">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('0')">
					<p>团队服务</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('1')">
					<p>社区服务</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('2')">
					<p>患者服务</p>
				</mt-tab-item>
			</mt-navbar>
		</div> -->

    
<zhijie @getDataZhi="getDataZhi" @getData1="getData1" @setTime="setTime" v-if="active == 0"/>

  <jianjie @getDataJian='getDataJian' @setTime="setTime"  v-else-if="active == 1"/>

    <geren @getData="getData" @setTime="setTime"  v-else />
    <!-- <div class="buttons">
			<router-link to="/cardRefund">
				<label>提现</label>
			</router-link>
		</div> -->
  </div>
  
  </div>
</template>

<script>
import loadMore from "@/components/common/loadMore.vue"; // 加载更多组件

import geren from "./common/geren.vue";
import zhijie from "./common/zhijie.vue";
import jianjie from "./common/jianjie.vue";
import xuanzeTime from "./xuanzeTime.vue";
export default {
  name: "commission",
  data: () => ({
    list: [],
    param: {
      dateflag: 2,
      date: "",
      begDate: "",
      endDate: "",
      pagesize: 10,
      pagecount: 0,
    },
    selTime : true,
    active: 0,
    time: "",
    time2: "",
    time3: "",
    achievement: "", // 金额
    noTran: "", // 成交笔数
    purchaseCount: "", // 购买人数
   
    dataZi: {},
    dataJian : {},
    dataZhi : {},
  }),
  created() {
    if (sessionStorage.getItem("tabActive")) {
      this.active = Number(sessionStorage.getItem("tabActive"));
    }
  },
  methods: {
    getData1(data) {
      this.dataZhi = data
    },
    setTime(time){
      this.time = time
      this.time2 = time;
      this.time3 = time;
    },
    getData(data) {
      this.dataZi = data;
    },
    getDataJian(data) {
      this.dataJian = data;
      // this.time3 = nowTime;
    },
    getDataZhi(data) {
      this.dataZhi = data;
    },
    changeTime(val) {
      this.selTime = val
    },

    // 当前单价
    getAdrLists() {},
    changeTabs() {
      if (this.active == 1) {
        sessionStorage.setItem("tabActive", this.active);
      } else if (this.active == 2) {
        sessionStorage.setItem("tabActive", this.active);
      } else {
        sessionStorage.setItem("tabActive", this.active);
      }
    },
   
    // echarts
    // echartsActive() {
    //   this.echartsAct = true
    // }
  },
  mounted() {
    this.getAdrLists();
  },
  components: {
    loadMore,
    
    zhijie,
    geren,
    jianjie,
    xuanzeTime
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";

/deep/ .van-tabs__line {
  background-color: #3873f6;
}
/deep/ .mint-header.is-fixed {
  z-index: 9 !important;
}
.mint-cell.borderBottom {
  padding: 0.06rem 0;
  align-items: center;
  align-content: center;
}

.right.text-right {
  color: $color60;
  font-size: 0.15rem;

  & > span:nth-child(2) {
    margin-top: 5px;
  }
}

.content {
  width: 100%;
  background-color: #fff;
}

.guding {
  position: fixed;
  width: 100%;
  z-index: 9;
  background-color: #fafafa;
}

.money_card {
  border-radius: 0.1rem;
  height: 1.1rem;
  background-color: #fff;
  padding: 0.05rem 0.1rem;
  overflow: hidden;

  .time_now {
    float: right;
    font-size: 0.14rem;
  }

  h2 {
    text-align: center;
    margin-top: 0.2rem;
    font-size: 0.26rem;
    font-weight: 500;
  }

  .bot div {
    text-align: center;
    float: left;
    margin-top: 0.1rem;
  }
}
.echarts {
  margin-top: 1.8rem;
  background-color: #fff;
  // height: 0.3rem;
  i {
    float: right;
    font-size: 0.24rem;
    padding: 0.1rem;
    transform: rotate(90deg);
    z-index: 1;
  }
}
.van-cell {
  // padding: 0.1rem;
  flex-flow: row nowrap;
  justify-content: space-between;
  .operation {
    margin-top: -0.05rem;
  }
  .money {
    margin-top: 0.2rem;
    font-size: 0.18rem;
    font-weight: 500;
  }
}
.van-cell .name {
  font-size: 0.16rem;
}
.right p {
  // margin-left: -0.7rem;
  text-align: right;
}
.hui {
  color: #8b8b8b;
}
.borderpay {
  padding: 0 0.1rem;
  background-color: #fff;
}
</style>
