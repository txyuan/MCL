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
      <div class="gauge_1">
        <p>3、您目前的进食情况 (可多选)</p>
        <ul>
          <li @click="selValue_10" :class="{checkedOne:data.attribute_value_10=='1'}">正常饮食</li>
          <li @click="selValue_11" :class="{checkedOne:data.attribute_value_11=='1'}">正常饮食, 但比正常情况少</li>
          <li @click="selValue_12" :class="{checkedOne:data.attribute_value_12=='1'}">少有固体食物</li>
          <li @click="selValue_13" :class="{checkedOne:data.attribute_value_13=='1'}">只能进食流食</li>
          <li @click="selValue_14" :class="{checkedOne:data.attribute_value_14=='1'}">只能口服营养制剂</li>
          <li @click="selValue_15" :class="{checkedOne:data.attribute_value_15=='1'}">几乎吃不下什么</li>
          <li @click="selValue_16" :class="{checkedOne:data.attribute_value_16=='1'}">只能通过管饲进食或静脉营养</li>
        </ul>
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
export default {
  name : 'nutrition3',
  data() {
    return {
      valueAll : false,
      data : {
        attribute_value_10 : '0', 
        attribute_value_11 : '0', 
        attribute_value_12 : '0', 
        attribute_value_13 : '0', 
        attribute_value_14 : '0', 
        attribute_value_15 : '0', 
        attribute_value_16 : '0', 
      }
    };
  },
  watch : {
     aaa:{//深度监听，可监听到对象、数组的变化
            handler(newVal, oldVal){
               if(newVal.attribute_value_10 == "0" && newVal.attribute_value_11 == "0" && newVal.attribute_value_12 == "0"&& newVal.attribute_value_13 == "0"&& newVal.attribute_value_14 == "0"&& newVal.attribute_value_15 == "0"&& newVal.attribute_value_16 == "0") {
                 this.valueAll = false
               }else {
                 this.valueAll = true
               }
            },
            deep:true
        }
  },
   computed: {
    aaa(){
      return JSON.parse(JSON.stringify(this.data)) //对象是引用类型，深拷贝一下，form变得时候就会触发计算属性，然后就会触发aaa，watch就会执行
    }
  },
  methods : {
    goInfo() {
      let nutrition =  this.$store.state.nutrition
      let obj3 = {
        ...nutrition,
        ...this.data
      }
      this.$store.commit('setnutrition',obj3)
      this.$router.push('/nutrition4')
    },
    selValue_10() {
      this.data.attribute_value_10 == '0' ? this.data.attribute_value_10 = '1' : this.data.attribute_value_10 = '0'
    },
    selValue_11() {
      this.data.attribute_value_11 == '0' ? this.data.attribute_value_11 = '1' : this.data.attribute_value_11 = '0'
    },
    selValue_12() {
      this.data.attribute_value_12 == '0' ? this.data.attribute_value_12 = '1' : this.data.attribute_value_12 = '0'
    },
    selValue_13() {
      this.data.attribute_value_13 == '0' ? this.data.attribute_value_13 = '1' : this.data.attribute_value_13 = '0'
    },
    selValue_14() {
      this.data.attribute_value_14 == '0' ? this.data.attribute_value_14 = '1' : this.data.attribute_value_14 = '0'
    },
    selValue_15() {
      this.data.attribute_value_15 == '0' ? this.data.attribute_value_15 = '1' : this.data.attribute_value_15 = '0'
    },
    selValue_16() {
      this.data.attribute_value_16== '0' ? this.data.attribute_value_16 = '1' : this.data.attribute_value_16 = '0'
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
  p:nth-child(3) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.8rem 0 0 0;
  text-align: center;
  font-weight: 500;
}
.gauge_1 {
   margin-top: 0.95rem;
  padding-left: 0.38rem;
  padding-right: 0.37rem;
  ul {
    li {
      margin-top: 0.2rem;
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
    margin: 1.1rem 0 0.2rem 0;
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