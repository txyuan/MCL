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
      <p v-for="(item,index) in stopLine" :key="index" :class="{pCheck : index == i}"></p>
    </div>
    <div>
      <h3>放射性肺炎（多选）</h3>
     <div class="gauge_1">
        <ul>
          <li @click="selValue_01" :class="{checkedOne:data.value_01=='1'}">有诊断，但较轻微无明显症状</li>
          <li @click="selValue_02" :class="{checkedOne:data.value_02=='1'}">偶有刺激性干咳</li>
          <li @click="selValue_03" :class="{checkedOne:data.value_03=='1'}">干咳，活动后加重（多数在放射治疗2～3个月后出现）</li>
          <li @click="selValue_04" :class="{checkedOne:data.value_04=='1'}">干咳频繁</li>
          <li @click="selValue_05" :class="{checkedOne:data.value_05=='1'}">伴有气喘、气急</li>
          <li @click="selValue_06" :class="{checkedOne:data.value_06=='1'}">伴有胸痛</li>
          <li @click="selValue_07" :class="{checkedOne:data.value_07=='1'}">伴有心悸、心慌</li>
          <li @click="selValue_08" :class="{checkedOne:data.value_08=='1'}">伴有发热</li>
          <li @click="selValue_09" :class="{checkedOne:data.value_09=='1'}">呼吸困难，或伴有低氧血症</li>
          <li @click="selValue_10" :class="{checkedOne:data.value_10=='1'}">并发支气管炎</li>
          <li @click="selValue_11" :class="{checkedOne:data.value_11=='1'}">并发肺气肿</li>
        </ul>
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
              >{{btnValue}}</van-button
            >
            <van-button v-else class="btn_info1" round type="info"
              >{{btnValue}}</van-button
            >
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
      stopLine : [],
      i : null,
      btnValue: '下一步',
      data: {
        value_01: "0", // 
        value_02: "0", // 
        value_03: "0", // 
        value_04: "0", // 
        value_05: "0", // 
        value_06: "0", // 
        value_07: "0", // 
        value_08: "0", // 
        value_09: "0", // 
        value_10: "0", // 
        value_11: "0", // 
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
        if (newVal.value_01 == "0" && newVal.value_02 == "0" && newVal.value_03 == "0" && newVal.value_04 == "0" && newVal.value_05 == "0" && newVal.value_06 == "0" && newVal.value_07 == "0" && newVal.value_08 == "0"
         && newVal.value_09 == "0" && newVal.value_10 == "0" && newVal.value_11 == "0") {
          this.valueAll = false
        }else {
          this.valueAll = true
        }
      },
      deep: true,
    },
  },
  created() {
    
  },
  mounted() {
    this.getsymptom()
  },
  computed: {
    aaa() {
      return JSON.parse(JSON.stringify(this.data)); //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    },
  },
  methods: {
    getsymptom() {
      let symptom = this.$store.state.symptom;
      this.stopLine = symptom
      let str = this.$route.path.match(/symptom(\S*)/)[1];
      let i = symptom.findIndex( item => item.sKey == str)
      this.i = i
      if(this.stopLine.length -1 ==  i) {
        this.btnValue = '提交'
      }else {
         this.btnValue = '下一步'
      }
    },
    goInfo() {
     let str = this.$route.path.match(/symptom(\S*)/)[1];
    let i = this.stopLine.findIndex( item => item.sKey == str)
     if(this.stopLine.length -1 ==  i) {
        console.log('end');
      }else {
         this.$router.push(`/symptom${this.stopLine[i+1].sKey}`)
      }
      // this.$store.commit("setpsychology", this.data);
      // this.$router.push("/psychology2");
    },
     selValue_01() {
      this.data.value_01 == '0' ? this.data.value_01 = '1' : this.data.value_01 = '0'
    },
    selValue_02() {
      this.data.value_02 == '0' ? this.data.value_02 = '1' : this.data.value_02 = '0'
    },
    selValue_03() {
      this.data.value_03 == '0' ? this.data.value_03 = '1' : this.data.value_03 = '0'
    },
    selValue_04() {
      this.data.value_04 == '0' ? this.data.value_04 = '1' : this.data.value_04 = '0'
    },
    selValue_05() {
      this.data.value_05 == '0' ? this.data.value_05 = '1' : this.data.value_05 = '0'
    },
    selValue_06() {
      this.data.value_06 == '0' ? this.data.value_06 = '1' : this.data.value_06 = '0'
    },
    selValue_07() {
      this.data.value_07== '0' ? this.data.value_06 = '1' : this.data.value_06 = '0'
    },
    selValue_08() {
      this.data.value_08== '0' ? this.data.value_08 = '1' : this.data.value_08 = '0'
    },
    selValue_09() {
      this.data.value_09== '0' ? this.data.value_09 = '1' : this.data.value_09 = '0'
    },
    selValue_10() {
      this.data.value_10== '0' ? this.data.value_10 = '1' : this.data.value_10 = '0'
    },
    selValue_11() {
      this.data.value_11== '0' ? this.data.value_11 = '1' : this.data.value_11 = '0'
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
    margin: 0.05rem 0.02rem  0 0.02rem;
    border-radius: 0.03rem;
    background-color: #ebebed;
  }
  .pCheck {
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
   margin-top: 0.3rem;
  padding-left: 0.38rem;
  padding-right: 0.37rem;
  margin-bottom: 1.3rem;
  p {
    font-size: 0.18rem;
  }
  ul {
    li {
      padding: 0.09rem 0.05rem;
      margin-top: 0.2rem;
     border: 1px solid #ccc;
     border-radius: 0.06rem;
    //  height: 0.4rem;
     text-align: center;
     line-height: 0.22rem;
     color: #999;
    }
    .checkedOne {
      border: 1px solid #36c2d7 !important;
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