<template>
  <div class="home">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      title="体能评估"
      fixed
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="center_line">
      <p></p>
      <p></p>
    </div>
    <div>
      <h3>肺功能测试</h3>
      <div class="gauge_3">
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
    <div class="bot_content">
      <div style="background-color: #fff">
        <div class="btn">
          <van-button
            v-if="valueAll"
            class="btn_info"
            round
            type="info"
            @click="goInfo"
            >提交</van-button
          >
          <van-button v-else class="btn_info1" round type="info"
            >提交</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "physicalGauge2",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
      list1: [
        {
          value: "活动如常人，对日常生活无影响、无气短",
          id: "100",
        },
        {
          value: "一般劳动时出现气短",
          id: "90",
        },
        {
          value: "平地步行不气短，速度较快或登楼、上坡时，同行的同龄健康人不觉气短而自己已气短",
          id: "80",
        },
        {
          value: "慢走不到百步即有气短",
          id: "70",
        },
        {
          value: "讲话或穿衣等轻微活动时有气短",
          id: "60",
        },
        {
          value: "安静时出现气短，无法平卧",
          id: "50",
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
        }
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
  computed: {
    aaa() {
      return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    },
  },
  methods: {
    goInfo() {
      let physicalGauge = this.$store.state.physicalGauge
      let obj = {
        ...physicalGauge,
        ...this.data
      }
      let url  = 'UserInterface/selfTestTool/AddPhysicalFitnessAssessment.ashx'
      this.$post(url,obj).then(res=> {
         if (res.rspcode != 1) {
            this.$Toast(res.rspdesc)
            return
          }
          this.$Toast(res.rspdesc)
          this.$router.push('/selfTestTool')
      })
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
  justify-content: space-between;
  align-items: center;
  padding: 0 1.4rem;
  line-height: 0.42rem;
  p {
    height: 0.06rem;
    width: 47%;
    border-radius: 0.03rem;
    background-color: #ebebed;
  }
  p:nth-child(2) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.95rem 0 0 0;
  text-align: center;
  font-weight: 500;
}
.gauge_3 {
  margin-top: 0.2rem;
  padding-left: 0.38rem;
  padding-right: 0.37rem;
  margin-bottom: 0.4rem;
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
    margin-left: 0.12rem !important;
    padding: 0.09rem 0.08rem;
    line-height: 0.22rem;
    text-align: left;
    width: 100%;
    color: #999 !important;
  }
  // >>> .van-radio:nth-child(4) {
  //   .van-radio__label {
  //     margin-left: 0.12rem !important;
  //     padding: 0.1rem 0.05rem;
  //     line-height: 0.24rem;
  //     text-align: left;
  //     width: 100%;
  //     color: #999 !important;
  //   }
  // }
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
  background-color: #fff;

  .title {
    padding-top: 0.4rem;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.14rem;
    p:nth-child(6) {
      font-size: 0.16rem;
      color: #4ec2a5;
    }
  }
  .down {
    text-align: center;
    img {
      margin-top: 0.4rem;
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .btn {
    width: 100%;
    background-color: #fff;
    margin: 0.9rem 0 0.2rem 0;
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