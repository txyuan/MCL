<template>
  <div>
    <xuanzeTime @changeTime="changeTime" :actInfo="actInfo" v-if="!selTime" />
    <div class="padding-header" v-else>
      <div id="class_header" class="myassets">
        <mt-header title="间接业绩" fixed class="borderBottom">
          <div slot="left">
            <router-link to="/consultation" style="color: initial">
              <mt-button icon="back"></mt-button>
            </router-link>
          </div>
        </mt-header>
      </div>
      <bill :params="param" v-if="active == 1" />
      <div class="content1" v-if="active == 0">
        <div class="con_top">
          <div class="home_img">
            <img :src="data.img" />
          </div>
          <div class="home_li">
            <span>
              <i>{{ data.name }} {{ data.phone }}</i>
            </span>
            <label>{{ data.userType }} </label>
            <label class="botto" v-if="userTypes == '5'">
              <span>渠道: {{ data.channelCount }}人</span>
              <span>渠道员工: {{ data.staffCount }}人</span>
              <span>医生: {{ data.doctorCount }}人</span>
              <span>患者: {{ data.patientCount }}人</span>
            </label>
            <label class="botto" v-if="userTypes == '6'">
              <span>渠道员工: {{ data.staffCount }}人</span>
              <span>医生: {{ data.doctorCount }}人</span>
              <span>患者: {{ data.patientCount }}人</span>
            </label>
            <label class="botto" v-if="userTypes == '4'">
              <span>医生: {{ data.doctorCount }}人</span>
              <span>患者: {{ data.patientCount }}人</span>
            </label>
            <label class="botto" v-if="userTypes == '1'">
              <span>患者: {{ data.patientCount }}人</span>
            </label>
          </div>
        </div>
        <div class="con_bot">
          <p class="time_now" @click="selTime = !selTime">
            {{ time }} <van-icon name="arrow-down" />
          </p>
          <div>
            <p>¥ {{ data.achievement }}</p>
            <span>新增下游: {{ data.subordinateCount }}</span>
          </div>
        </div>
      </div>
      <div class="con_list" v-if="active == 0">
        <loadMore
          :param="param"
          @triggerGetList="getList"
          ref="loadMoreE"
          class=""
        >
          <!-- padding-footer -->
          <div slot="content">
            <div class="van-cell" v-for="(item, index) in list" :key="index">
              <div class="title">
                <span class="name">{{ item.remarks }}</span>
                <p class="operation hui">{{ item.operationName }}</p>
                <p class="left">
                  购买人: {{ item.ContactName }}
                  <span>{{ item.ContactPhone }}</span>
                </p>
              </div>
              <div class="right">
                <p class="time_date hui">{{ item.create_date }}</p>
                <p class="money">{{ item.money }}</p>
              </div>
            </div>
          </div>
        </loadMore>
      </div>

      <div class="footer">
        <van-tabbar v-model="active" @change="onChange">
          <van-tabbar-item icon="home-o">账单</van-tabbar-item>
          <van-tabbar-item icon="search">概览</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import loadMore from "@/components/common/loadMore.vue"; // 加载更多组件
import xuanzeTime from "../../xuanzeTime.vue";

import bill from "./bill";
export default {
  name: "userDail",
  data: () => ({
    list: [],
    actInfo: 0,
    selTime: true,
    param: {
      skey: "",
      dateflag: 2,
      date: "",
      begDate: "",
      endDate: "",
      pagesize: 10,
      pagecount: 0,
    },
    data: {},
    time: "",
    achievement: "", // 金额
    noTran: "", // 成交笔数
    purchaseCount: "", // 购买人数
    userTypes: "",
    userType: [
      {
        id: "1",
        value: "患者",
      },
      {
        id: "4",
        value: "医生",
      },
      {
        id: "5",
        value: "渠道",
      },
      {
        id: "6",
        value: "渠道员工",
      },
    ],
    active: 0,
  }),
  created() {
    // this.getList();
    this.getTime();
    if (this.$route.query.sKey) {
      sessionStorage.setItem("sKey", this.$route.query.sKey);
    }
  },
  methods: {
    onChange(val) {
      this.param.pagecount = 0;
    },
    changeTime(val, time, type) {
      this.selTime = val;
      this.param.pagecount = 0;
      if (time) {
        this.$store.commit("setYearInfo", time);
        this.$store.commit("setDateflagInfo", type);
        this.$nextTick(() => {
          this.$refs.loadMoreE.getList();
        });
        return;
      }
      this.time = time;
      this.param.dateflag = type;
    },
    // 获取日期
    getTime() {
      let nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
      };
      this.time = date.year + "-" + 0 + date.month;
      this.$store.commit("setYearInfo", this.time);
      this.$store.commit("setDateflagInfo", 2);
    },
    getList(success) {
      let url = "UserInterface/achievement/IndirectAchievementDetailList.ashx";
      // this.$store.state.timeInfo.year
      this.time = this.$store.state.timeInfo.year;
      this.param.date = this.$store.state.timeInfo.year;
      this.param.dateflag = this.$store.state.timeInfo.dateflag;
      this.param.skey = sessionStorage.getItem("sKey");

      if (this.$store.state.timeInfo.dateflag == 3) {
        this.param.begDate = this.time.split("~")[0];
        this.param.endDate = this.time.split("~")[1];
        this.param.date = "";
      }
      if (this.param.pagecount == 1) {
        this.list = [];
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspCode != 1) {
          return;
        }
        let userTypeData = this.userType.filter(function (item) {
          return item.id == data.userType;
        });
        this.userTypes = data.userType;
        data.userType = userTypeData[0].value;
        this.data = data;

        this.purchaseCount = data.purchaseCount;
        this.noTran = data.noTran;
        this.achievement = data.achievement;
        let modelList = data.data;
        this.list = [...this.list, ...modelList];
        // 加载更多组件触发回调
        if (success) {
          success(modelList, this.list);
        }
      });
    },
  },
  mounted() {},
  components: {
    loadMore,
    xuanzeTime,
    bill,
  },
};
</script>
<style scoped lang="scss">
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

.content1 {
  position: fixed;
  z-index: 9;
  width: 100%;
  background-color: #fafafa;
}
.con_list {
  margin-top: 1.6rem;
}
.con_top {
  // overflow:hidden;
  background-color: #fff;
  display: flex;
  margin-top: 0.05rem;
  padding-bottom: 0.05rem;
}
.home_img {
  //  float: left;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  margin-left: 0.1rem;
  margin-top: 0.07rem;
  border: 1px solid #d8f3f4;
  background-color: #eeffff;
  img {
    // float: left;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.home_li {
  // float: left;
  width: 76%;
  margin-left: 3%;
  margin-top: 0.07rem;

  span {
    width: 100%;
    // display: block;
    overflow: hidden;
    padding-top: 0.04rem;

    i {
      // float: left;
      font-style: normal;
      color: #333535;
      font-size: 0.15rem;
    }
  }
  .botto {
    // margin-left: -0.4rem;
    color: #333535;
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

.con_bot {
  overflow: hidden;
  padding: 0.1rem;
  background-color: #fff;
  margin-top: 0.05rem;
  > p {
    font-size: 0.14rem;
    // margin-left: 0.1rem;
  }
  div {
    p {
      float: left;
      margin-top: 0.1rem;
      margin-left: 0.2rem;
      font-size: 0.2rem;
      font-weight: 500;
    }
    span {
      float: right;
      margin-top: 0.1rem;
      margin-right: 0.2rem;
      font-size: 0.14rem;
    }
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
   display: inline-block;
  height: 0.17rem;
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
