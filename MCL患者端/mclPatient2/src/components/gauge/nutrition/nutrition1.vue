<template>
  <div class="home">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      title="营养评估"
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
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div>
      <h3>体重自测</h3>
      <div class="gauge_1">
        <p>1、您现在是否严重腹水、水肿?</p>
        <div class="one_gau">
          <van-radio-group
            @change="oneGauRadio"
            class="one_gau_radio"
            v-model="checkedOne"
            direction="horizontal"
          >
            <van-radio :class="{ checkedOne: checkedOne == 1 }" name="1"
              >是</van-radio
            >
            <van-radio :class="{ checkedOne: checkedOne == 2 }" name="2"
              >否</van-radio
            >
          </van-radio-group>
        </div>
      </div>
      <div class="one_gau_input">
        <p v-if="checkedOne == 1">
          <span>白蛋白值</span>
          <input
            v-model="data.attribute_value_01"
            type="number"
            pattern="\d*"
            placeholder="请输入白蛋白值"
            name="请输入白蛋白值"
            id=""
          />
          <span>g/L</span>
        </p>
        <p v-if="checkedOne == 2">
          <span>您的体重</span>
          <input
            @click="rulerWeight"
            v-model="data.attribute_value_02"
            type="text"
            placeholder="请输入体重"
            readonly
            name="请输入体重"
            id=""
          />
          <span>千克</span>
        </p>
      </div>
      <div class="gauge_1">
        <p>2、在过去的两周我的体重</p>
        <div class="one_gau">
          <van-radio-group
            class="one_gau_radio"
            v-model="data.attribute_value_03"
            direction="horizontal"
          >
            <van-radio
              :class="{ checkedOne: data.attribute_value_03 == '减轻' }"
              name="减轻"
              >减轻</van-radio
            >
            <van-radio
              :class="{ checkedOne: data.attribute_value_03 == '没变化' }"
              name="没变化"
              >没变化</van-radio
            >
            <van-radio
              :class="{ checkedOne: data.attribute_value_03 == '增加' }"
              name="增加"
              >增加</van-radio
            >
          </van-radio-group>
        </div>
      </div>
      <div class="gauge_1">
        <p>3、近期 (1-3月) 体重是否下降?</p>
        <div class="one_gau">
          <van-radio-group
            @change="threeGauRadio"
            class="one_gau_radio"
            v-model="data.value_05_flag"
            direction="horizontal"
          >
            <van-radio
              :class="{ checkedOne: data.value_05_flag == '是' }"
              name="是"
              >是</van-radio
            >
            <van-radio
              :class="{ checkedOne: data.value_05_flag == '否' }"
              name="否"
              >否</van-radio
            >
          </van-radio-group>
        </div>
      </div>
      <div class="one_gau_input" style="margin-bottom: 1.3rem;">
        <div class="weight" v-if="data.value_05_flag == '是'">
          <!-- <p>
            <span>目前体重</span>
            <input
              v-model="data.attribute_value_061"
              type="text"
              placeholder="请输入体重"
              name=""
              id=""
            />
            <span>千克</span>
          </p> -->
          <p>
            <span>体重下降了</span>
            <input
              v-model="data.attribute_value_06"
              type="number"
              pattern="\d*"
              placeholder="非必填"
              name=""
              id=""
            />
            <span>千克</span>
          </p>
          <div class="gauge_3">
            <van-radio-group
              class="one_gau_radio"
              v-model="data.attribute_value_05"
              direction="horizontal"
            >
              <van-radio
                :class="{
                  checkedOne: data.attribute_value_05 == '3个月内体重下降',
                }"
                name="3个月内体重下降"
                >3个月内体重下降</van-radio
              >
              <van-radio
                :class="{
                  checkedOne: data.attribute_value_05 == '2个月内体重下降',
                }"
                name="2个月内体重下降"
                >2个月内体重下降</van-radio
              >
              <van-radio
                :class="{
                  checkedOne: data.attribute_value_05 == '1个月内体重下降',
                }"
                name="1个月内体重下降"
                >1个月内体重下降</van-radio
              >
            </van-radio-group>
          </div>
          <!-- <p>
            <span>一个月前体重</span>
            <input
              v-model="data.attribute_value_04"
              type="text"
              placeholder="请输入下降体重"
              name=""
              id=""
            />
            <span>千克</span>
          </p> -->
        </div>
        <p>
          <span>一个月前体重</span>
          <input
            v-model="data.attribute_value_04"
            type="number"
            pattern="\d*"
            placeholder="请输入下降体重"
            name=""
            id=""
          />
          <span>千克</span>
        </p>
      </div>
    </div>
    <div class="bot_content">
      <div>
        <div class="btn">
          <van-button
            v-if="valueAll"
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
    <div>
      <van-popup
      class="popup"
        :closeable="true"
        v-model="show"
        round
        position="bottom"
        :style="{ height: '50%' }"
      >
        <h3 style="margin-top: 0.4rem">您的体重 (千克)</h3>
        <Ruler :value="50" :min="0" :max="300" :onChange="changeWeight" />
        <div class="weight_btn">
          <van-button class="btn_info1" @click="submitWeight" round type="info"
            >保存</van-button
          >
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>

import Ruler from "./ruler.vue";
export default {
  name: "nutrition1",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
     
      data: {
        attribute_value_01: "", // 白蛋白值
        attribute_value_02: "", // 体重
        attribute_value_03: "", // 我的体重
        value_05_flag: "", // 近期体重
        attribute_value_061: "", // 目前体重
        attribute_value_06: "", // 下降体重
        attribute_value_04: "", // 一个月前体重
        attribute_value_05: "", // 选择下降体重
      },
      weight : '50'
    };
  },
  components: {
    Ruler,
  },
  watch: {
    aaa: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        if (
          this.checkedOne == "" ||
          newVal.attribute_value_03 == "" ||
          newVal.value_05_flag == ""
        ) {
          this.valueAll = false;
        } else {
          if (
            (this.checkedOne == "1" && newVal.attribute_value_01 == "") ||
            (this.checkedOne == "2" && newVal.attribute_value_02 == "")
          ) {
            this.valueAll = false;
          } else {
            if (
              (newVal.value_05_flag == "是" &&
                (
                  newVal.attribute_value_04 == "" ||
                  newVal.attribute_value_05 == "")) ||
              (newVal.value_05_flag == "否" && newVal.attribute_value_04 == "")
            ) {
              this.valueAll = false;
            } else {
              this.valueAll = true;
            }
          }
        }
      },
      deep: true,
    },
  },
  created() {
    
  },
  mounted() {
    
  },
  computed: {
    aaa() {
      return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    },
  },
  methods: {
    goInfo() {
      this.$store.commit("setnutrition", this.data);
      this.$router.push("/nutrition2");
    },
    changeWeight(val) {
      this.weight = val;
    },
    submitWeight() {
      this.data.attribute_value_02 = this.weight;
      this.show = false;
    },
    rulerWeight() {
      this.show = true;
    },
    oneGauRadio() {
      this.data.attribute_value_01 = "";
      this.data.attribute_value_02 = "";
    },
    threeGauRadio() {
      this.data.attribute_value_061 = "";
      this.data.attribute_value_06 = "";
      this.data.attribute_value_04 = "";
      this.data.attribute_value_05 = "";
    },
   
   
  },
};
</script>

<style scoped lang="scss">
.popup {
  overflow: hidden;
}
.weight_btn {
  width: 100%;
  margin: 0.3rem 15%;
  .btn_info1 {
    width: 70% !important;
    background-color: #36c2d9;
    color: #fff;
    border: 0;
  }
}
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
  height: 0.3rem;
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
  padding: 0 0.1rem;
  line-height: 0.42rem;
  p {
    height: 0.06rem;
    width: 7%;
    border-radius: 0.03rem;
    background-color: #ebebed;
  }
  p:nth-child(1) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.95rem 0 0 0;
  text-align: center;
  font-weight: 500;
  font-size: 0.2rem;
}
.gauge_1 {
  padding-left: 0.34rem;
  margin-top: 0.3rem;
  p {
    font-size: 0.18rem;
  }
  .one_gau {
    .one_gau_radio {
      display: flex;
      justify-content: left;
    }

    >>> .van-radio {
      margin-top: 0.2rem;
      margin-right: 0.2rem;
      border: 1px solid #ccc;
      border-radius: 0.06rem;
      height: 0.4rem !important;
      width: 1.4rem !important;
    }

    >>> .van-radio__icon {
      margin-left: 0.15rem !important;
    }
    >>> .van-radio__label {
     margin-left: 0.13rem !important;
    padding: 0.09rem 0.2rem 0.09rem 0.05rem;
    text-align: left;
      width: 100%;
      color: #999 !important;
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
}
.gauge_3 {
  padding-left: 0.38rem;
  padding-right: 0.37rem;
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
    height: 0.4rem !important;
    width: 100% !important;
    margin-right: 0 !important;
  }

  >>> .van-radio__icon {
    margin-left: 0.15rem !important;
  }
  >>> .van-radio__label {
    margin-left: 0.13rem !important;
    padding: 0.09rem 0.2rem 0.09rem 0.05rem;
    text-align: left;
    width: 100%;
    color: #999 !important;
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
.one_gau_input {
   
  p {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    padding: 0 0.1rem;
    margin: 0.15rem;
    margin-bottom: 0;
    height: 0.4rem;
    line-height: 0.4rem;

    background-color: #faf7f8;
    input {
      flex: 1;
      margin-right: 0.1rem;
      text-align: right;
      border: 0;
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