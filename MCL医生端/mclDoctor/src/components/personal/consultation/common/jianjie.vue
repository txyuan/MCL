<template>
  <div>
    <div class="borderpay">
      <div class="echarts">
        <!-- <van-icon  name="sort" /> -->
      </div>
      <div class="home_ul">
        <div class="home_list" v-for="(item, index) in modelList" :key="index">
          <p @click="getchildg(item)" v-if="item.clists.length == 0">
            {{ item.name }}（<span class="nr_sm">{{ item.count }}</span
            >）<span class="money_right">¥ {{ item.money }}</span>
          </p>

          <p @click="getchildg(item)" v-else class="showIs">
            {{ item.name }}（<span class="nr_sm">{{ item.count }}</span
            >）<span class="money_right">¥ {{ item.money }}</span>
          </p>

          <ul>
            <li v-for="(items, i) in item.clists" :key="i">
              <router-link :to="{name:'userDail',query:{sKey:items.sKey}}">
                  <div class="home_img">
                  <img :src="items.img" />
                </div>
                <div class="home_li">
                  <span>
                    <i>{{ items.ContactName }}</i>
                  </span>
                  <label>下游人数: {{ items.downstreamCount }} </label>
                  <label>
                    成交数: {{ items.noTran }}
                    <u>{{ items.money }}</u>
                  </label>
                </div>
              </router-link>
            </li>
          </ul>
          
        </div>
        
      </div>
      <van-loading  v-if="loading" size="24px">加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import loadMore1 from "@/components/common/loadMore.vue"; // 加载更多组件
export default {
  // props: ['time2'],
  data() {
    return {
      listZi: [],
      modelList: [],
      clists : [],
      loading : false,
      param: {
        dateflag: 2,
        date: "",
        begDate: "",
        endDate: "",
        pagesize: 10,
        pagecount: 1,
      },
      time2: "",
      datas: {
        purchaseCount: "",
        achievement: "",
        noTran: "",
      },
    };
  },
  components: {
    loadMore1,
  },
  watch: {},
  created() {
    this.getTime();
    this.getAllList();
  },
  methods: {
    getchildg(item) {
      if (item.clists.length != 0) {
        item.clists = [];
        return;
      }
      this.param.pagecount = 1
      this.getchildList(item);
      this.scroll(item)
    },
      getchildList(item) {
      let url = "UserInterface/achievement/IndirectAchievementRecordList.ashx";
      this.param.userType = item.userType;
      this.loading = true
      this.$post(url, this.param).then((data) => {
        this.loading = false
        if (data.rspCode != 1) {
          return;
        }
        this.clists = data.data;
        item.clists = [...item.clists, ...this.clists];
        // item.clists = data.data;
      });
    },
    scroll(item) {
       let that = this;
        window.onscroll = function () {
          //滚动条到底部的条件
            let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200;
          if (bottomOfWindow && that.loading == false) {
            if (that.clists.length > 0) {
              that.param.pagecount++;
              that.getchildList(item);
            }
          }
        };
    },
    // 获取日期
    getTime() {
      if (this.$store.state.timeZhi.year) {
        this.time2 = this.$store.state.timeZhi.year;
      } else {
        let nowDate = new Date();
        let date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
        };
        this.time2 = date.year + "-" + 0 + date.month;
        // this.$emit('getNowTime',this.time2)
      }
    },
    getAllList() {
      let url = "UserInterface/achievement/IndirectAchievementGroupList.ashx";
      this.param.date = this.time2;

      if (this.$store.state.timeZhi.dateflag) {
        this.param.dateflag = String(this.$store.state.timeZhi.dateflag);
      }
      if (this.$store.state.timeZhi.dateflag == 3) {
        this.param.begDate = this.time2.split("~")[0];
        this.param.endDate = this.time2.split("~")[1];
        this.param.date = "";
      }
      this.$post(url, this.param).then((data) => {
        this.$emit("getDataJian", this.datas, this.param, this.time2);
        if (data.rspCode != 1) {
          return;
        }
        this.datas.purchaseCount = data.purchaseCount;
        this.datas.noTran = data.noTran;
        this.datas.achievement = data.achievement;
        // this.allmoney = data.totalservicecharge;
        for (var i = 0; i < data.group.length; i++) {
          data.group[i].clists = [];
        }
        this.modelList = data.group;
      });
    },
  },
  mounted() {
    //  this.getZiList();
  },
};
</script>
<style scoped lang='scss'>
@import "@/assets/css/base.scss";

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
    z-index: 0.5;
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
.home_ul {
  background: #fff;
  /*padding: 0 2%;*/
  margin-top: 0.1rem;
  .home_list {
    border-top: 1px solid #dfe6e7;
    .nr_sm {
      color: #4a8ef4;
    }
    &:first-child {
      border-top: none;
    }

    p {
      height: 0.5rem;
      font-size: 0.15rem;
      color: #333535;
      background: url(~@/assets/images/eyenext.png) no-repeat 0.06rem center;
      background-size: 0.2rem;
      padding-left: 0.26rem;
      line-height: 0.5rem;
      &.showIs {
        background: url(~@/assets/images/eyenext@2x.png) no-repeat 0.06rem
          center;
        background-size: 0.2rem;
      }
    }
  }

  ul {
    li {
      /*height: 0.68rem;*/
      /*border-bottom: 1px solid #DFE6E7;*/
      padding: 0.08rem 0;
      position: relative;
      > a {
        display: flex;
        align-items: center !important;
      }
      .home_img {
        width: 0.38rem;
        height: 0.38rem;
        border-radius: 50%;
        margin-left: 0.1rem;
        margin-top: 0.07rem;
        border: 1px solid #d8f3f4;
        background-color: #eeffff;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .home_li {
        width: 76%;
        margin-left: 3%;
        margin-top: 0.07rem;

        span {
          width: 100%;
          display: block;
          overflow: hidden;
          padding-top: 0.04rem;

          i {
            float: left;
            font-style: normal;
            color: #333535;
            font-size: 0.15rem;
          }
        }

        label {
          display: block;
          color: #7d8182;
          font-size: 0.13rem;
          padding-top: 0.05rem;
          u {
            float: right;
            text-decoration: none;
            color: #333535;
            font-size: 0.18rem;
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
    li::after {
      background-color: #000;
      content: " ";
      opacity: 0.1;
      right: 0;
      top: 0;
      left: 0.1rem;
      height: 1px;
      position: absolute;
    }
  }
}
.money_right {
  float: right;
  margin-right: 0.1rem;
  font-size: 0.2rem;
  font-weight: 500;
}
</style>