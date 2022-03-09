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
      <div class="gauge_3">
        <p>7、小腿（腓肠肌）</p>
        <div class="images">
          <img src="@/assets/images/小腿.png" alt="" />
        </div>
        <van-radio-group
          class="one_gau_radio"
          v-model="data.attribute_value_47"
          direction="horizontal"
        >
          <van-radio
            v-for="(item, i) in list"
            :key="i"
            :class="{ checkedOne: data.attribute_value_47 == item.value }"
            :name="item.id"
            >{{ item.value }}</van-radio
          >
        </van-radio-group>
      </div>
    </div>
    <div class="bot_content">
        <div >
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
  name: "nutrition13",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
      list: [
        {
          value: "肌肉发达",
          id: '正常'
        },
        {
          value: "瘦, 有肌肉轮廓",
          id: '轻度'
        },
        {
          value: "瘦, 肌肉轮廓模糊",
          id: '中度'
        },
        {
          value: "瘦, 无肌肉轮廓, 肌肉松垮无力",
          id: '严重'
        },
        
      ],
      data: {
        attribute_value_47: "", // 肩部
      },
    };
  },
  watch: {
    aaa: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        if (newVal.attribute_value_47 == "") {
         this.valueAll = false
          }else {
            this.valueAll = true
          }
        }
      },
      deep: true,
    
  },
  computed: {
    aaa() {
      return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    },
  },
  methods: {
    goInfo() {
      let nutrition = this.$store.state.nutrition;
      let obj6 = {
        ...nutrition,
        ...this.data,
      };
      let url = 'UserInterface/selfTestTool/PGSGASubmit.ashx'
      this.$post(url,obj6).then(res => {
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
  p:nth-child(13) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.8rem 0 0 0;
  text-align: center;
  font-weight: 500;
  font-size: 0.2rem;
}

.gauge_3 {
  margin-top: 0.95rem;
   margin-bottom: 1.3rem;
  p {
    font-size: 0.18rem;
    padding: 0 0.23rem;
  }
  // margin-top: 0.3rem;
  .images {
    padding: 0 0.23rem;
    margin-top: 0.2rem;
    display: flex;
    img {
      width: 100%;
      border-radius: 0.04rem;
    }
  }
  .one_gau_radio {
    padding: 0 0.33rem;
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
     margin-left: -0.2rem !important;
    padding: 0.05rem 0.05rem;
    text-align: center;
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