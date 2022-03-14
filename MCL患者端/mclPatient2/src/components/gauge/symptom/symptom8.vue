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
      <h3>恶心呕吐</h3>
     <div class="gauge_3">
         <p>1、您觉得恶心吗？</p>
           <van-radio-group  class="one_gau_radio gebie_radio" v-model="data.value_01" direction="horizontal">
            <van-radio
            v-for="(item, i) in list1"
            :key="i"
            :class="{ checkedOne: data.value_01 == item.id }"
            :name="item.id"
            >{{ item.value }}</van-radio
          >
          </van-radio-group>
         <p style="margin-top:0.4rem;">2、您的呕吐程度？</p>
           <van-radio-group  class="one_gau_radio" v-model="data.value_02" direction="horizontal">
            <van-radio
            v-for="(item, i) in list2"
            :key="i"
            :class="{ checkedOne: data.value_02 == item.id }"
            :name="item.id"
            >{{ item.value }}</van-radio
          >
          </van-radio-group>
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
      list1: [
        {
          value: " 没有",
          id: '1'
        },
        {
          value: "有轻微恶心，食欲不振，但正常三餐，不影响进食和日常生活 ",
          id: '2'
        },
        {
          value: "影响进食及正常生活，但无明显的体重降低、脱水",
          id: '3'
        },
        {
          value: "因恶心而卧床，进食不足，明显的体重降低或脱水",
          id: '4'
        },
      ],
      list2: [
        {
          value: "没有呕吐",
          id: '1'
        },
        {
          value: "1-2次/日",
          id: '2'
        },
        {
          value: "3-5次/日",
          id: '3'
        },
        {
          value: "呕吐6次以上/日",
          id: '4'
        },
      ],
     
      data: {
        value_01: "", // 
        value_02: "", // 
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
        if (newVal.value_01 == "" || newVal.value_02 == "") {
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
        this.stopLine[i].value = this.data.value_01 + ',' + this.data.value_02
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
        this.stopLine[i].value = this.data.value_01 + ',' + this.data.value_02
        this.$store.commit("setsymptom", this.stopLine);
        this.$router.push(`/symptom${this.stopLine[i+1].sKey}`)
      }
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
     margin-left: 0.13rem !important;
    padding: 0.09rem 0.2rem 0.09rem 0.05rem;
    text-align: left;
    line-height: 0.22rem;
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