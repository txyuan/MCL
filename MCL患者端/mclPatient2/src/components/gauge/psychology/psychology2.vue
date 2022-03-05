<template>
  <div class="home">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      title="心理评估"
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
    </div>
    <div>
     <div class="gauge_3">
         <p>3、我的心中充满烦恼</p>
           <van-radio-group  class="one_gau_radio" v-model="data.value_03" direction="horizontal">
            <van-radio
            v-for="(item, i) in list1"
            :key="i"
            :class="{ checkedOne: data.value_03 == item.value }"
            :name="item.value"
            >{{ item.value }}</van-radio
          >
          </van-radio-group>
         <p style="margin-top:0.4rem;">4、我能够安闲而轻松地坐着</p>
           <van-radio-group  class="one_gau_radio" v-model="data.value_04" direction="horizontal">
            <van-radio
            v-for="(item, i) in list2"
            :key="i"
            :class="{ checkedOne: data.value_04 == item.value }"
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
              >下一步</van-button
            >
            <van-button v-else class="btn_info1" round type="info"
              >下一步</van-button
            >
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import Ruler from "./ruler.vue";
export default {
  name: "psychology2",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
      list1: [
        {
          value: "大多数时间",
          id: '正常'
        },
        {
          value: "常常如此",
          id: '轻度'
        },
        {
          value: "时时，但并不经常",
          id: '中度'
        },
        {
          value: "根本没有",
          id: '严重'
        },
      ],
      list2: [
        {
          value: "肯定",
          id: '正常'
        },
        {
          value: "经常",
          id: '轻度'
        },
        {
          value: "并不经常",
          id: '中度'
        },
        {
          value: "根本没有",
          id: '严重'
        },
      ],
      data: {
        value_03: "", // 
        value_04: "", // 
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
        if (newVal.value_03 == "" || newVal.value_04 == "") {
          this.valueAll = false
        }else {
          this.valueAll = true
        }
      },
      deep: true,
    },
  },
  created() { },
  mounted() {},
  computed: {
    aaa() {
      return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    },
  },
  methods: {
    goInfo() {
      this.$store.commit("setpsychology", this.data);
      this.$router.push("/psychology3");
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
  padding: 0 0.5rem;
  line-height: 0.42rem;
  p {
    height: 0.06rem;
    width: 14%;
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
  margin-top: 0.95rem;
  padding-left: 0.38rem;
  padding-right: 0.37rem;
  
  .one_gau_radio {
    display: flex;
    justify-content: space-between;
    
  }
   
   >>> .van-radio {
     margin-top: 0.2rem;
     border: 1px solid #ccc;
     border-radius: 0.06rem;
     height: 0.44rem !important;
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
    margin: 0.38rem 0 0.2rem 0;
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