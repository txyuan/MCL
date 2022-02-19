<template>
  <div>
    <div class="borderpay">
      <div class="echarts">
        <!-- <van-icon  name="sort" /> -->
      </div>
       <loadMore1
        :param="param"
        @triggerGetList="getList"
        ref="loadMoreE"
        class=""
      >
        <!-- padding-footer -->
        <div slot="content">
          <div class="van-cell" v-for="(item, index) in listZi" :key="index">
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
      </loadMore1>
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
      param: {
        dateflag: 2,
        date: "",
        begDate: "",
        endDate: "",
        pagesize: 10,
        pagecount: 0,
      },
      time : '',
      datas : {
      purchaseCount : '',
      achievement : ''
      }
    };
  },
  components: {
    loadMore1,
  },
  created() {
     this.getTime()
  },
  methods: {
    // 获取日期
    getTime() {
     if (this.$store.state.year) {
        this.time = this.$store.state.year;
      } else {
        let nowDate = new Date();
        let date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
        };
        this.time = date.year + "-" + 0 + date.month;
        this.$store.commit("setYear", this.time);
      }
      this.$emit('setTime',this.time)
    },
    // 个人业绩
    getList(success) {
      let url = "UserInterface/achievement/PersonalAchievementRecordList.ashx";
      this.param.date = this.time;

       if (this.$store.state.dateflag) {
        this.param.dateflag = String(this.$store.state.dateflag);
      }
      if (this.$store.state.dateflag == 3) {
        this.param.begDate = this.time.split("~")[0];
        this.param.endDate = this.time.split("~")[1];
        this.param.date = "";
      }
      if (this.param.pagecount == 1) {
        this.listZi = [];
      }
      this.$post(url, this.param).then((data) => {
         this.$emit('getData',this.datas)
        if (data.rspCode != 1) {
          return;
        }
        this.datas.purchaseCount = data.purchaseCount;
        // this.datas.noTran = data.noTran;
        this.datas.achievement = data.achievement;
        // this.allmoney = data.totalservicecharge;
        let modelList = data.data;
          this.listZi = [...this.listZi, ...modelList];
           // 加载更多组件触发回调
        if (success) {
          success(modelList, this.listZi);
        }
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
  .right {
    width: 40%;
  }
  .title {
    width: 60%;
  }
  .title>span {
    display: block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
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