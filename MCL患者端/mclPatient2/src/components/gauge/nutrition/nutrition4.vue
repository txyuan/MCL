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
        <p>4、近两周来, 我有一下问题, 影响我的饮食 (可多选)</p>
        <ul>
          <li @click="selValue_17" :class="{checkedOne:data.attribute_value_17=='1'}">吃饭没有问题</li>
          <li @click="selValue_18" :class="{checkedOne:data.attribute_value_18=='1'}">没有食欲, 不想吃</li>
          <li @click="selValue_19" :class="{checkedOne:data.attribute_value_19=='1'}">恶心</li>
          <li @click="selValue_20" :class="{checkedOne:data.attribute_value_20=='1'}">呕吐</li>
          <li @click="selValue_21" :class="{checkedOne:data.attribute_value_21=='1'}">口腔溃疡</li>
          <li @click="selValue_22" :class="{checkedOne:data.attribute_value_22=='1'}">便秘</li>
          <li @click="selValue_23" :class="{checkedOne:data.attribute_value_23=='1'}">腹泻</li>
          <li @click="selValue_24" :class="{checkedOne:data.attribute_value_24=='1'}">口干</li>
          <li @click="selValue_25" :class="{checkedOne:data.attribute_value_25=='1'}">食品没味</li>
          <li @click="selValue_26" :class="{checkedOne:data.attribute_value_26=='1'}">食品气味不好</li>
          <li @click="selValue_27" :class="{checkedOne:data.attribute_value_27=='1'}">吞咽困难</li>
          <li @click="selValue_28" :class="{checkedOne:data.attribute_value_28=='1'}">一会儿就饱了</li>
          <li @click="selValue_29" :class="{checkedOne:data.attribute_value_29=='1'}">疼痛</li>
          <li @click="selValue_31" :class="{checkedOne:data.attribute_value_31=='1'}">其他</li>
        </ul>
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
  name : 'nutrition4',
  data() {
    return {
      valueAll : false,
      data : {
        attribute_value_17 : '0', 
        attribute_value_18 : '0', 
        attribute_value_19 : '0', 
        attribute_value_20 : '0', 
        attribute_value_21 : '0', 
        attribute_value_22 : '0', 
        attribute_value_23 : '0', 
        attribute_value_24 : '0', 
        attribute_value_25 : '0', 
        attribute_value_26 : '0', 
        attribute_value_27 : '0', 
        attribute_value_28 : '0', 
        attribute_value_29 : '0', 
        attribute_value_31 : '0', 
      }
    };
  },
  watch : {
     aaa:{//深度监听，可监听到对象、数组的变化
            handler(newVal, oldVal){
               if(newVal.attribute_value_17 == "0" && newVal.attribute_value_18 == "0" && newVal.attribute_value_19 == "0"&& newVal.attribute_value_20 == "0"&& newVal.attribute_value_21 == "0"&& newVal.attribute_value_22 == "0" && newVal.attribute_value_23 == "0" && newVal.attribute_value_24 == "0" && newVal.attribute_value_25 == "0"
                && newVal.attribute_value_26 == "0" && newVal.attribute_value_27 == "0" && newVal.attribute_value_28 == "0" && newVal.attribute_value_29 == "0" && newVal.attribute_value_31 == "0"
               ) {
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
      let obj4 = {
        ...nutrition,
        ...this.data
      }
      this.$store.commit('setnutrition',obj4)
      this.$router.push('/nutrition5')
    },
    selValue_17() {
      this.data.attribute_value_17 == '0' ? this.data.attribute_value_17 = '1' : this.data.attribute_value_17 = '0'
    },
    selValue_18() {
      this.data.attribute_value_18 == '0' ? this.data.attribute_value_18 = '1' : this.data.attribute_value_18 = '0'
    },
    selValue_19() {
      this.data.attribute_value_19 == '0' ? this.data.attribute_value_19 = '1' : this.data.attribute_value_19 = '0'
    },
    selValue_20() {
      this.data.attribute_value_20 == '0' ? this.data.attribute_value_20 = '1' : this.data.attribute_value_20 = '0'
    },
    selValue_21() {
      this.data.attribute_value_21 == '0' ? this.data.attribute_value_21 = '1' : this.data.attribute_value_21 = '0'
    },
    selValue_22() {
      this.data.attribute_value_22 == '0' ? this.data.attribute_value_22 = '1' : this.data.attribute_value_22 = '0'
    },
    selValue_23() {
      this.data.attribute_value_23== '0' ? this.data.attribute_value_23 = '1' : this.data.attribute_value_23 = '0'
    },
    selValue_24() {
      this.data.attribute_value_24== '0' ? this.data.attribute_value_24 = '1' : this.data.attribute_value_24 = '0'
    },
    selValue_25() {
      this.data.attribute_value_25== '0' ? this.data.attribute_value_25 = '1' : this.data.attribute_value_25 = '0'
    },
    selValue_26() {
      this.data.attribute_value_26== '0' ? this.data.attribute_value_26 = '1' : this.data.attribute_value_26 = '0'
    },
    selValue_27() {
      this.data.attribute_value_27== '0' ? this.data.attribute_value_27 = '1' : this.data.attribute_value_27 = '0'
    },
    selValue_28() {
      this.data.attribute_value_28== '0' ? this.data.attribute_value_28 = '1' : this.data.attribute_value_28 = '0'
    },
    selValue_29() {
      this.data.attribute_value_29== '0' ? this.data.attribute_value_29 = '1' : this.data.attribute_value_29 = '0'
    },
    selValue_31() {
      this.data.attribute_value_31== '0' ? this.data.attribute_value_31 = '1' : this.data.attribute_value_31 = '0'
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
  p:nth-child(4) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.8rem 0 0 0;
  text-align: center;
  font-weight: 500;
 font-size: 0.2rem;
}
.gauge_1 {
   margin-top: 0.95rem;
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