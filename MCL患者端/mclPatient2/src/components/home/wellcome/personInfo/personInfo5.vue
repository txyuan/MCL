<template>
  <div class="home">
    <div class="header_top">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
      <div class="center_line">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div class="kongbai" @click="goInfoTo">
        <span>跳过</span>
      </div>
    </div>
    <div class="content_all">
      <div class="content">
        <h3>个人病史 (可多选)</h3>
        <div class="illness">
          <ul>
            <li @click="selvalue_27" :class="{ checked: data.value_27 == 1 }">
              肝硬化
            </li>
            <li @click="selvalue_28" :class="{ checked: data.value_28 == 1 }">
              慢性肝炎
            </li>
            <li @click="selvalue_29" :class="{ checked: data.value_29 == 1 }">
              中风
            </li>
            <li
              class="COPD"
              @click="selvalue_30"
              :class="{ checked: data.value_30 == 1 }"
            >
              <span>COPD</span>
              <span>（慢阻肺）</span>
            </li>
            <li @click="selvalue_31" :class="{ checked: data.value_31 == 1 }">
              心肌梗塞
            </li>
            <li @click="selvalue_32" :class="{ checked: data.value_32 == 1 }">
              接受透析治疗
            </li>
            <li @click="selvalue_33" :class="{ checked: data.value_33 == 1 }">
              糖尿病
            </li>
            <li @click="selvalue_34" :class="{ checked: data.value_34 == 1 }">
              高血压
            </li>
            <li @click="selvalue_35" :class="{ checked: data.value_35 == 1 }">
              冠心病
            </li>
            <li @click="selvalue_36" :class="{ checked: data.value_36 == 1 }">
              贫血
            </li>
            <li @click="selvalue_37" :class="{ checked: data.value_37 == 1 }">
              甲亢
            </li>
            <li @click="selvalue_38" :class="{ checked: data.value_38 == 1 }">
              甲低
            </li>
            <li @click="selvalue_39" :class="{ checked: data.value_39 == 1 }">
              慢性胰腺炎
            </li>
            <li @click="selvalue_40" :class="{ checked: data.value_40 == 1 }">
              骨质疏松
            </li>
            <li @click="selvalue_41" :class="{ checked: data.value_41 == 1 }">
              溃疡性结肠炎
            </li>
            <li @click="selvalue_42" :class="{ checked: data.value_42 == 1 }">
              肠道克罗恩病
            </li>
            <li class="COPD" @click="selvalue_43" :class="{ checked: data.value_43 == 1 }">
              
              <span>慢性胆道</span>
              <span>系统疾病</span>
            </li>
            <li @click="selvalue_44" :class="{ checked: data.value_44 == 1 }">
              慢性肾病
            </li>
            <li class="COPD" @click="selvalue_45" :class="{ checked: data.value_45 == 1 }">
              
              <span>系统性</span>
              <span>红斑狼疮</span>
            </li>
            <li @click="selvalue_46" :class="{ checked: data.value_46 == 1 }">
              结核
            </li>
            <li @click="selvalue_47" :class="{ checked: data.value_47 == 1 }">
              无
            </li>
            <li @click="selvalue_48" :class="{ checked: data.value_48 == 1 }">
              其他
            </li>
            <li class="input_li" v-if="data.value_48 == 1">
              <input
                type="text"
                v-model="data.value_49"
                placeholder="请输入"
                name=""
                id=""
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="bot_content">
        <div style="background-color: #fff">
          <div class="btn">
            <van-button
              v-if="btnJurisdiction"
              class="btn_info"
              round
              type="info"
              @click="goInfo"
              >下一步</van-button
            >
            <van-button v-else class="btn_info1" round type="info"
              >下一步</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personInfo5",
  data() {
    return {
      btnJurisdiction: false,
      input: false,
      flag: "",
      data: {
        value_27: "0",
        value_28: "0",
        value_29: "0",
        value_30: "0",
        value_31: "0",
        value_32: "0",
        value_33: "0",
        value_34: "0",
        value_35: "0",
        value_36: "0",
        value_37: "0",
        value_38: "0",
        value_39: "0",
        value_40: "0",
        value_41: "0",
        value_42: "0",
        value_43: "0",
        value_44: "0",
        value_45: "0",
        value_46: "0",
        value_47: "0",
        value_48: "0",
        value_49: "",
      },
    };
  },
  components: {},

  mounted() {
    this.btnquanxian();
  },
  methods: {
    btnquanxian() {
      if (
        this.data.value_27 == 0 &&
        this.data.value_28 == 0 &&
        this.data.value_28 == 0 &&
        this.data.value_29 == 0 &&
        this.data.value_30 == 0 &&
        this.data.value_31 == 0 &&
        this.data.value_32 == 0 &&
        this.data.value_33 == 0 &&
        this.data.value_34 == 0 &&
        this.data.value_35 == 0 &&
        this.data.value_36 == 0 &&
        this.data.value_37 == 0 &&
        this.data.value_38 == 0 &&
        this.data.value_39 == 0 &&
        this.data.value_40 == 0 &&
        this.data.value_41 == 0 &&
        this.data.value_42 == 0 &&
        this.data.value_43 == 0 &&
        this.data.value_44 == 0 &&
        this.data.value_45 == 0 &&
        this.data.value_46 == 0 &&
        this.data.value_47 == 0 &&
        this.data.value_48 == "0" &&
        this.data.value_49 == ""
      ) {
        this.btnJurisdiction = false;
      } else {
        this.btnJurisdiction = true;
      }
    },
    selvalue_27() {
      this.data.value_27 == 0
        ? (this.data.value_27 = "1")
        : (this.data.value_27 = "0");
      this.btnquanxian();
    },
    selvalue_28() {
      this.data.value_28 == 0
        ? (this.data.value_28 = "1")
        : (this.data.value_28 = "0");
      this.btnquanxian();
    },
    selvalue_29() {
      this.data.value_29 == 0
        ? (this.data.value_29 = "1")
        : (this.data.value_29 = "0");
      this.btnquanxian();
    },
    selvalue_30() {
      this.data.value_30 == 0
        ? (this.data.value_30 = "1")
        : (this.data.value_30 = "0");
      this.btnquanxian();
    },
    selvalue_31() {
      this.data.value_31 == 0
        ? (this.data.value_31 = "1")
        : (this.data.value_31 = "0");
      this.btnquanxian();
    },
    selvalue_32() {
      this.data.value_32 == 0
        ? (this.data.value_32 = "1")
        : (this.data.value_32 = "0");
      this.btnquanxian();
    },
    selvalue_33() {
      this.data.value_33 == 0
        ? (this.data.value_33 = "1")
        : (this.data.value_33 = "0");
      this.btnquanxian();
    },
    selvalue_34() {
      this.data.value_34 == 0
        ? (this.data.value_34 = "1")
        : (this.data.value_34 = "0");
      this.btnquanxian();
    },
    selvalue_35() {
      this.data.value_35 == 0
        ? (this.data.value_35 = "1")
        : (this.data.value_35 = "0");
      this.btnquanxian();
    },
    selvalue_36() {
      this.data.value_36 == 0
        ? (this.data.value_36 = "1")
        : (this.data.value_36 = "0");
      this.btnquanxian();
    },
    selvalue_37() {
      this.data.value_37 == 0
        ? (this.data.value_37 = "1")
        : (this.data.value_37 = "0");
      this.btnquanxian();
    },
    selvalue_38() {
      this.data.value_38 == 0
        ? (this.data.value_38 = "1")
        : (this.data.value_38 = "0");
      this.btnquanxian();
    },
    selvalue_39() {
      this.data.value_39 == 0
        ? (this.data.value_39 = "1")
        : (this.data.value_39 = "0");
      this.btnquanxian();
    },
    selvalue_40() {
      this.data.value_40 == 0
        ? (this.data.value_40 = "1")
        : (this.data.value_40 = "0");
      this.btnquanxian();
    },
    selvalue_41() {
      this.data.value_41 == 0
        ? (this.data.value_41 = "1")
        : (this.data.value_41 = "0");
      this.btnquanxian();
    },
    selvalue_42() {
      this.data.value_42 == 0
        ? (this.data.value_42 = "1")
        : (this.data.value_42 = "0");
      this.btnquanxian();
    },
    selvalue_43() {
      this.data.value_43 == 0
        ? (this.data.value_43 = "1")
        : (this.data.value_43 = "0");
      this.btnquanxian();
    },
    selvalue_44() {
      this.data.value_44 == 0
        ? (this.data.value_44 = "1")
        : (this.data.value_44 = "0");
      this.btnquanxian();
    },
    selvalue_45() {
      this.data.value_45 == 0
        ? (this.data.value_45 = "1")
        : (this.data.value_45 = "0");
      this.btnquanxian();
    },
    selvalue_46() {
      this.data.value_46 == 0
        ? (this.data.value_46 = "1")
        : (this.data.value_46 = "0");
      this.btnquanxian();
    },
    selvalue_47() {
      this.data.value_47 == 0
        ? (this.data.value_47 = "1")
        : (this.data.value_47 = "0");
      this.btnquanxian();
    },
    selvalue_48() {
      this.data.value_48 == 0
        ? (this.data.value_48 = "1")
        : (this.data.value_48 = "0");
      this.btnquanxian();
    },
    btnSel() {
      let arr = this.list.find((item) => {
        if (item.bOn == "1") {
          return item;
        }
      });
      if (arr) {
        this.btnJurisdiction = true;
      } else {
        this.btnJurisdiction = false;
      }
    },
    goInfo() {
      let personInfo = this.$store.state.personInfo;
      personInfo.flag = "2";
      let obj = {
        flag: "2",
        ...personInfo,
        ...this.data,
      };
      this.$store.commit("setpersonInfo", obj);
      this.$router.push("/personInfo6");
    },
    goInfoTo() {
      let personInfo = this.$store.state.personInfo;
      personInfo.flag = "1";
      let obj5 = {
        flag: "1",
        ...personInfo,
        ...this.data,
      };
      this.$store.commit("setpersonInfo", obj5);
      this.$router.push("/personInfo6");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff !important;
}

.header_top {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  background-color: #fff;
  .mint-button--default {
    background-color: #fff !important;
    -webkit-box-shadow: 0 0 0 !important;
    box-shadow: 0 0 0 !important;
  }
  .center_line {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0.42rem;
    p {
      height: 0.05rem;
      width: 15%;
      border-radius: 0.025rem;
      background-color: #ebebed;
    }
    p:nth-child(5) {
      background-color: #35c2db;
    }
  }

  .kongbai {
    width: 0.44rem;
    line-height: 0.4rem;
    font-size: 0.12rem;
    text-align: center;
    span {
      padding: 0.02rem 0.06rem;
      border-radius: 0.2rem;
      color: #fff;
      background-color: #9c9a9b;
    }
  }
}
.content_all {
  background-color: #fff;
  overflow: hidden;
}
.content {
  background-color: #fff;
  h3 {
    text-align: center;
    font-weight: 500;
    margin: 0.6rem 0 0.2rem 0;
  }
}
.illness {
  padding: 0 0.1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    justify-content: start;
    li {
      width: 27%;
      text-align: center;
      border: 1px solid #ccc;
      padding: 0.05rem 0.02rem;
      border-radius: 0.06rem;
      margin: 0.1rem 2.32%;
      font-size: 0.14rem;
      color: #999;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
    .COPD {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      font-size: 0.12rem;
      padding: 0 0.02rem;
      align-items: center;
    }
    .input_li {
      padding: 0.065rem 0.02rem;
      width: 60.2%;
      input {
        border: 0;
        margin-left: 0.1rem;
      }
    }
    .checked {
      background-color: #e8fafb;
      color: #36c2d9;
      border: 1px solid #36c2d9;
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
    p:nth-child(3) {
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
    position: fixed;
    bottom: 0.2rem;
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