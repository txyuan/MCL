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
      <h3>消化不良</h3>
     <div class="gauge_1">
        <p>4、近两周来,我有以下问题, 影响我的饮食 (可多选)</p>
        <ul>
          <li @click="selValue_01" :class="{checkedOne:data.value_01=='0'}">吃饭没有问题</li>
          <li @click="selValue_02" :class="{checkedOne:data.value_02=='1'}">没有食欲, 不想吃</li>
          <li @click="selValue_03" :class="{checkedOne:data.value_03=='2'}">恶心</li>
          <li @click="selValue_04" :class="{checkedOne:data.value_04=='3'}">呕吐</li>
          <li @click="selValue_05" :class="{checkedOne:data.value_05=='4'}">口腔溃疡</li>
          <li @click="selValue_06" :class="{checkedOne:data.value_06=='5'}">便秘</li>
          <li @click="selValue_07" :class="{checkedOne:data.value_07=='6'}">腹泻</li>
          <li @click="selValue_08" :class="{checkedOne:data.value_08=='7'}">口干</li>
          <li @click="selValue_09" :class="{checkedOne:data.value_09=='8'}">食品没味</li>
          <li @click="selValue_10" :class="{checkedOne:data.value_10=='9'}">食品气味不好</li>
          <li @click="selValue_11" :class="{checkedOne:data.value_11=='10'}">吞咽困难</li>
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
        value_01: "", // 
        value_02: "", // 
        value_03: "", // 
        value_04: "", // 
        value_05: "", // 
        value_06: "", // 
        value_07: "", // 
        value_08: "", // 
        value_09: "", // 
        value_10: "", // 
        value_11: "", // 
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
        if (newVal.value_01 == "" && newVal.value_02 == "" && newVal.value_03 == "" && newVal.value_04 == "" && newVal.value_05 == "" && newVal.value_06 == "" && newVal.value_07 == "" && newVal.value_08 == ""
         && newVal.value_09 == "" && newVal.value_10 == "" && newVal.value_11 == "") {
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
      // 下一步/提交
    goInfo() {
    let str = this.$route.path.match(/symptom(\S*)/)[1];
    let i = this.stopLine.findIndex( item => item.sKey == str)
     if(this.stopLine.length -1 ==  i) {
        let arrValue = []
        Object.values(this.data).forEach(item => {
          if(item) {
            arrValue.push(item)
          }
        })
        this.stopLine[i].value = arrValue.join(',')
        let url = 'UserInterface/complication/AddSymptomManagement.ashx'
        this.$post(url,{value : JSON.stringify(this.stopLine)}).then(res => {
           if (res.rspcode != 1) {
            this.$Toast(res.rspdesc)
            return
          }
          this.$Toast(res.rspdesc)
          this.$router.push('/selfTestTool')
        })
      }else {
        let arrValue = []
        Object.values(this.data).forEach(item => {
          if(item) {
            arrValue.push(item)
          }
        })
        this.stopLine[i].value = arrValue.join(',')
        this.$store.commit("setsymptom", this.stopLine);
        this.$router.push(`/symptom${this.stopLine[i+1].sKey}`)
      }
    },
     selValue_01() {
      this.data.value_01 == '' ? this.data.value_01 = '0' : this.data.value_01 = ''
    },
    selValue_02() {
      this.data.value_02 == '' ? this.data.value_02 = '1' : this.data.value_02 = ''
    },
    selValue_03() {
      this.data.value_03 == '' ? this.data.value_03 = '2' : this.data.value_03 = ''
    },
    selValue_04() {
      this.data.value_04 == '' ? this.data.value_04 = '3' : this.data.value_04 = ''
    },
    selValue_05() {
      this.data.value_05 == '' ? this.data.value_05 = '4' : this.data.value_05 = ''
    },
    selValue_06() {
      this.data.value_06 == '' ? this.data.value_06 = '5' : this.data.value_06 = ''
    },
    selValue_07() {
      this.data.value_07== '' ? this.data.value_07 = '6' : this.data.value_07 = ''
    },
    selValue_08() {
      this.data.value_08== '' ? this.data.value_08 = '7' : this.data.value_08 = ''
    },
    selValue_09() {
      this.data.value_09== '' ? this.data.value_09 = '8' : this.data.value_09 = ''
    },
    selValue_10() {
      this.data.value_10== '' ? this.data.value_10 = '9' : this.data.value_10 = ''
    },
    selValue_11() {
      this.data.value_11== '' ? this.data.value_11 = '10' : this.data.value_11 = ''
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
  padding-left: 0.35rem;
   margin-bottom: 1.3rem;
  p {
    font-size: 0.18rem;
    padding-right: 0.35rem;
  }
  ul {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    li {
      width: 1.4rem;
      margin-top: 0.2rem;
      margin-right: 0.2rem;
     border: 1px solid #ccc;
     border-radius: 0.06rem;
     height: 0.4rem;
     text-align: center;
     line-height: 0.4rem;
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