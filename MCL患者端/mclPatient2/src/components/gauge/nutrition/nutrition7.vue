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
      <h3>肌肉丢失情况</h3>

      <div class="gauge_3">
        <p>1、颞部（颞肌） ：直接观察，头转向一边</p>
        <div class="images">
          <img src="@/assets/images/颞部01.png" alt="" />
          <img src="@/assets/images/颞部02.png" alt="" />
        </div>
        <van-radio-group
          class="one_gau_radio"
          v-model="data.attribute_value_41"
          direction="horizontal"
        >
          <van-radio
            v-for="(item, i) in list"
            :key="i"
            :class="{ checkedOne: data.attribute_value_41 == item.value }"
            :name="item.id"
            >{{ item.value }}</van-radio
          >
        </van-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nutrition7",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
      list: [
        {
          value: "看不到明显凹陷",
          id: '正常'
        },
        {
          value: "轻度凹陷",
          id: '轻度'
        },
        {
          value: "凹陷",
          id: '中度'
        },
        {
          value: "显著凹陷",
          id: '严重'
        },
      ],
      data: {
        attribute_value_41: "", // 肌肉丢失情况
      },
    };
  },
  watch: {
    aaa: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        if (newVal.attribute_value_41 != "") {
          let nutrition = this.$store.state.nutrition;
          let obj7 = {
            ...nutrition,
            ...this.data,
          };
          this.$store.commit("setnutrition", obj7);
          setTimeout(() => {
            this.$router.push("/nutrition8");
          }, 500);
        }
      },
      deep: true,
    },
  },
  computed: {
    aaa() {
      return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    },
  },
  methods: {
    // goInfo() {
    //   let nutrition = this.$store.state.nutrition;
    //   let obj6 = {
    //     ...nutrition,
    //     ...this.data,
    //   };
    //   this.$store.commit("setnutrition", obj6);
    //   this.$router.push("/nutrition7");
    // },
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
  top: 0.4rem;
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
  p:nth-child(7) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.95rem 0 0 0;
  text-align: center;
  font-weight: 500;
  font-size: 0.2rem;
}

.gauge_3 {
  margin-top: 0.3rem;
  padding-bottom: 0.6rem;
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
      width: 50%;
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
</style>