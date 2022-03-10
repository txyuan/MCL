<template>
  <div class="home">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      title="症状管理"
      fixed
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="center_line" ref="center_line">
      <p
        v-for="(item, index) in stopLine"
        :key="index"
        :class="{ pCheck: index == i }"
      ></p>
    </div>
    <div>
      <h3>便秘</h3>
      <div class="gauge_3">
        <p>您有便秘吗？</p>
        <van-radio-group
          class="one_gau_radio"
          v-model="data.value_01"
          direction="horizontal"
        >
          <van-radio
            v-for="(item, i) in list1"
            :key="i"
            :class="{ checkedOne: data.value_01 == item.value }"
            :name="item.value"
            >{{ item.value }}</van-radio
          >
        </van-radio-group>
      </div>
    </div>
    <div class="bot_content" v-if="lastBtn">
      <div>
        <div class="btn">
          <van-button
            v-if="valueAll"
            class="btn_info"
            round
            type="info"
            @click="goInfo"
            >{{ btnValue }}</van-button
          >
          <van-button v-else class="btn_info1" round type="info">{{
            btnValue
          }}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "symptom6",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
      stopLine: [],
      i: null,
      btnValue: "提交",
      lastBtn: false,
      list1: [
        {
          value: " 没有",
          id: "正常",
        },
        {
          value: "二、三天一次排便",
          id: "轻度",
        },
        {
          value:"每周少于3次，排便时间可长达30分钟以上，每次排便很困难",
          id: "中度",
        },
        {
          value: "大便干燥难解，数日不大便，甚至一周或10余天不大便，严重影响生活",
          id: "严重",
        },
      ],

      data: {
        value_01: "", //
      },
    };
  },
  components: {
    // Ruler,
  },
  watch: {
    aaa: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        if (newVal.value_01 == "") {
          this.valueAll = false;
        } else {
          this.valueAll = true;
          if (this.lastBtn == false) {
            let str = this.$route.path.match(/symptom(\S*)/)[1];
            let i = this.stopLine.findIndex((item) => item.sKey == str);
            setTimeout(() => {
              this.$router.push(`/symptom${this.stopLine[i + 1].sKey}`);
            }, 500);
          }
        }
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.getsymptom();
  },
  computed: {
    aaa() {
      return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    },
  },
  methods: {
    getsymptom() {
      let symptom = this.$store.state.symptom;
      this.stopLine = symptom;
      let str = this.$route.path.match(/symptom(\S*)/)[1];
      let i = symptom.findIndex((item) => item.sKey == str);
      this.i = i;
      if (this.stopLine.length - 1 == i) {
        this.btnValue = "提交";
        this.lastBtn = true;
      } else {
        this.lastBtn = false;
      }
    },
    goInfo() {
      let str = this.$route.path.match(/symptom(\S*)/)[1];
      let i = this.stopLine.findIndex((item) => item.sKey == str);
      if (this.stopLine.length - 1 == i) {
        console.log("end");
      } else {
        this.$router.push(`/symptom${this.stopLine[i + 1].sKey}`);
      }
      // this.$store.commit("setpsychology", this.data);
      // this.$router.push("/psychology2");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff !important;
}
.center_line {
  height: 0.4rem;
  position: fixed;
  background-color: #fff;
  z-index: 1;
  top: 0.38rem;
  left: 0;
  right: 0;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.48rem;
  line-height: 0.42rem;
  p {
    height: 0.06rem;
    width: 7%;
    margin: 0.05rem 0.02rem 0 0.02rem;
    border-radius: 0.03rem;
    background-color: #ebebed;
  }
  .pCheck {
    background-color: #35c2db;
  }
}
h3 {
  margin: 1.25rem 0 0 0;
  text-align: center;
  font-weight: 500;
  font-size: 0.2rem;
}
.gauge_3 {
  margin-top: 0.3rem;
  padding-left: 0.38rem;
  padding-right: 0.37rem;
  margin-bottom: 1.3rem;
  p {
    font-size: 0.18rem;
  }
  .one_gau_radio {
    display: flex;
    justify-content: space-between;
  }

  >>> .van-radio {
    margin-top: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 0.06rem;
    //  height: 0.44rem !important;
    width: 100% !important;
    margin-right: 0 !important;
  }

  >>> .van-radio__icon {
    margin-left: 0.15rem !important;
  }
  >>> .van-radio__label {
    margin-left: 0.15rem !important;
    padding: 0.09rem 0.05rem;
    line-height: 0.22rem;
    text-align: left;
    width: 100%;
    color: #999 !important;
  }
  >>> .van-radio:nth-child(1) .van-radio__label {
    margin-left: -0.2rem !important;
    text-align: center;
  }
  >>> .van-radio:nth-child(2) .van-radio__label {
    margin-left: -0.2rem !important;
    text-align: center;
  }
  >>> .van-radio__icon--checked .van-icon {
    background-color: #36c2d7;
    border-color: #36c2d7;
  }
  .checkedOne {
    border: 1px solid #36c2d7 !important;
    >>> .van-radio__label {
      color: #36c2d7 !important;
    }
  }
}
.bot_content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  // background-color: #fff;

  .title {
    // padding-top: 0.4rem;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.14rem;
    p:nth-child(3) {
      font-size: 0.16rem;
      color: #4ec2a5;
    }
  }
  .btn {
    width: 100%;
    // background-color: transparent;
    margin: 0 0 0.2rem 0;
    text-align: center;
    .btn_info {
      width: 80% !important;
      background: linear-gradient(to left, #38c2d7, #51e4f7);
      border: 0;
    }
    .btn_info1 {
      border: 0;
      width: 80% !important;
      background-color: #dcdcdc;
    }
  }
}
</style>