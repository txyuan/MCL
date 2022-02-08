<template>
  <div>
    <div>
      <mt-header title="选择时间" fixed class="borderBottom">
        <div slot="left">
          <router-link to="" style="color: initial; font-size: 0.14rem">
            <mt-button @click="cannel">取消</mt-button>
          </router-link>
        </div>
        <div slot="right">
          <router-link to="" style="color: initial; font-size: 0.14rem">
            <mt-button @click="confim">完成</mt-button>
          </router-link>
        </div>
      </mt-header>
      <div class="selectTime" style="padding: 0.1rem">
        <div>
          <div class="nian" v-show="active == 1">
            <p @click="selYue">按年选择 <van-icon name="exchange" /></p>
            <input type="text" class="input_time" :value="year" />
            <van-picker
              :default-index="10"
              title="选择选项时段"
              show-toolbar
              :columns="columns"
              @change="onChange"
            />
          </div>
          <div class="yue nian" v-show="active == 2">
            <p @click="selRi">按月选择 <van-icon name="exchange" /></p>
            <input type="text" class="input_time" :value="yue" />
            <van-datetime-picker
              v-model="currentDate"
              type="year-month"
              title="选择年月"
              :min-date="minDate"
              :max-date="maxDate"
              @change="changeTime"
            />
          </div>
          <div class="ri nian" v-show="active == 3">
            <p @click="selNian">按日选择 <van-icon name="exchange" /></p>
            <div class="riInput">
              <input
                @focus="riStart"
                type="text"
                class="input_time"
                :value="ristart"
              />
              <p>至</p>
              <input
                @focus="riEnd"
                type="text"
                class="input_time"
                :value="riend"
              />
            </div>
            <van-datetime-picker
              v-show="activeStart == 1"
              v-model="currentDateristart"
              type="date"
              title="选择年月日"
              :min-date="minDateri"
              :max-date="maxDateri"
              @change="changeTimeStart"
            />
            <van-datetime-picker
              v-show="activeStart == 2"
              v-model="currentDateriend"
              type="date"
              title="选择年月日"
              :min-date="minDateriend"
              :max-date="maxDateriend"
              @change="changeTimeEnd"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "xuanzeTime",
  props: ["actInfo"],
  data() {
    return {
      columns: [],
      year: new Date().getFullYear(),
      yue: "",
      ristart: "",
      riend: "",
      minDate: new Date(2012, 0),
      maxDate: new Date(2025, 10),
      currentDate: new Date(),

      minDateriend: new Date(),
      maxDateriend: new Date(),
      currentDateriend: "",

      minDateri: new Date(2020, 0, 1),
      maxDateri: new Date(2025, 10, 1),
      currentDateristart: new Date(),

      active: 1,
      activeStart: 1,
    };
  },
  created() {
    this.SelData();
    this.format();
  },
  methods: {
    format() {
      this.yue = dayjs(this.currentDate).format("YYYY-MM");
      if (this.activeStart == 1) {
        this.ristart = dayjs(this.currentDateristart).format("YYYY-MM-DD");
      }
      if (this.activeStart == 2) {
        this.riend = dayjs(this.currentDateriend).format("YYYY-MM-DD");
      }
    },

    changeTime() {
      this.format();
    },
    changeTimeStart() {
      this.format();
    },
    changeTimeEnd() {
      this.format();
    },
    // 切换
    selYue() {
      this.active = 2;
    },
    selRi() {
      this.active = 3;
    },
    selNian() {
      this.active = 1;
    },

    riStart() {
      this.activeStart = 1;
    },
    riEnd() {
      this.minDateriend = this.currentDateristart;
      let year = Number(this.ristart.split("-")[0]);
      let month = Number(this.ristart.split("-")[1]) - 1;
      let day = Number(this.ristart.split("-")[2]);
      if (day <= 15) {
        day = 65;
      } else {
        day = 55;
      }
      this.maxDateriend = new Date(year, month, day);
      this.activeStart = 2;
    },

    // 获取年
    SelData() {
      let mydate = new Date();
      let startyear = mydate.getFullYear() - 10;
      let endyear = mydate.getFullYear();
      for (var i = startyear; i <= endyear; i++) {
        let year = { text: i, value: i };
        this.columns.push(year);
      }
    },
    onChange(pic, val) {
      this.year = val.value;
    },
    cannel() {
      this.$emit("changeTime", true, "");
    },
    confim() {
      if (sessionStorage.getItem("tabActive") == 1) {
        if (this.actInfo == 0) {
          if (this.active == 1) {
            this.$emit("changeTime", true, this.year, this.active);
          } else if (this.active == 2) {
            this.$emit("changeTime", true, this.yue, this.active);
          } else {
            this.$emit(
              "changeTime",
              true,
              `${this.ristart} ~ ${this.riend}`,
              this.active
            );
          }
          return;
        } else if (this.actInfo == 1) {
          if (this.active == 1) {
            this.$emit("changeTime", true, this.year, this.active);
          } else if (this.active == 2) {
            this.$emit("changeTime", true, this.yue, this.active);
          } else {
            this.$emit(
              "changeTime",
              true,
              `${this.ristart} ~ ${this.riend}`,
              this.active
            );
          }
          return;
        }

        if (this.active == 1) {
          this.$store.commit("setYearZhi", this.year);
          this.$store.commit("setDateflagZhi", this.active);
        } else if (this.active == 2) {
          this.$store.commit("setYearZhi", this.yue);
          this.$store.commit("setDateflagZhi", this.active);
        } else {
          this.$store.commit("setYearZhi", `${this.ristart} ~ ${this.riend}`);
          this.$store.commit("setDateflagZhi", this.active);
        }
        this.$emit("changeTime", true);
        return;
      }
      if (sessionStorage.getItem("tabActive") == 2) {
        if (this.active == 1) {
          this.$store.commit("setYearZi", this.year);
          this.$store.commit("setDateflagZi", this.active);
        } else if (this.active == 2) {
          this.$store.commit("setYearZi", this.yue);
          this.$store.commit("setDateflagZi", this.active);
        } else {
          this.$store.commit("setYearZi", `${this.ristart} ~ ${this.riend}`);
          this.$store.commit("setDateflagZi", this.active);
        }

        this.$emit("changeTime", true);
        return;
      }
      if (this.active == 1) {
        this.$store.commit("setYear", this.year);
        this.$store.commit("setDateflag", this.active);
      } else if (this.active == 2) {
        this.$store.commit("setYear", this.yue);
        this.$store.commit("setDateflag", this.active);
      } else {
        this.$store.commit("setYear", `${this.ristart} ~ ${this.riend}`);
        this.$store.commit("setDateflag", this.active);
      }
      this.$emit("changeTime", true);
    },
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
.selectTime .nian > p {
  font-size: 0.14rem;
  width: 1rem;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  background-color: #fff;
  margin-left: 0.1rem;
  margin-top: 0.5rem;
}
.nian /deep/ .van-picker .van-picker__toolbar {
  display: none !important;
}
.input_time {
  width: 100%;
  border: 0;
  border-bottom: 2px solid #6d93e1;
  margin: 0.4rem 0 0.1rem 0;
  text-align: center;
  line-height: 0.3rem;
  color: #6d93e1;
}
.riInput {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .input_time {
    width: 40%;
  }

  p {
    margin-top: 0.4rem;
  }
}
</style>