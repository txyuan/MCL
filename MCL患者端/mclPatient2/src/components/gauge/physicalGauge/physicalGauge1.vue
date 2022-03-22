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
      <h3>健康状态(KPS 分级)</h3>
     <div class="gauge_3">
           <van-radio-group  class="one_gau_radio" v-model="data.KPS" direction="horizontal">
            <van-radio
            v-for="(item, i) in list1"
            :key="i"
            :class="{ checkedOne: data.KPS == item.id }"
            :name="item.id"
            >{{ item.value }}</van-radio
          >
          </van-radio-group>
         </div>
    </div>
    
  </div>
</template>

<script>

// import Ruler from "./ruler.vue";
export default {
  name: "physicalGauge1",
  data() {
    return {
      show: false,
      checkedOne: "",
      valueAll: false,
      list1: [
        {
          value: "身体正常，无任何不适",
          id: '100'
        },
        {
          value: "能进行正常活动，有轻微不适",
          id: '90'
        },
        {
          value: "勉强可正常活动，有一些不适",
          id: '80'
        },
        {
          value: "生活可自理，但不能维持正常生活或工作",
          id: '70'
        },
        {
          value: "有时需人扶助，多数时间可自理",
          id: '60'
        },
        {
          value: "常需人照料",
          id: '50'
        },
        {
          value: "生活不能自理，需特别照顾",
          id: '40'
        },
        {
          value: "生活严重不能自理",
          id: '30'
        },
        {
          value: "病重，需住院积极支持治疗 ",
          id: '20'
        },
        {
          value: "病危作",
          id: '10'
        },
      ],
     
     
      data: {
        KPS: "", // 
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
        if (newVal.KPS != "") {
           this.$store.commit("setphysicalGauge", this.data);
           setTimeout(() => {
             this.$router.push('/physicalGauge2')
           }, 500);
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
     margin-left: 0.13rem !important;
    padding: 0.1rem 0.2rem 0.1rem 0.05rem;
    text-align: left;
    line-height: 0.24rem;
    width: 100%;
       color: #999 !important;
     }
     >>> .van-radio:nth-child(4) {
        .van-radio__label {
     margin-left: 0.12rem !important;
    padding: 0.09rem 0.08rem;
    line-height: 0.22rem;
    text-align: left;
    width: 100%;
       color: #999 !important;
     }
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