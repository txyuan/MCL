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
      <h3>活动和身体机能</h3>
      <div class="gauge_1">
        <p>1、在过去1月内, 我的活动 (可多选)</p>
        <ul>
          <li @click="selValue_33" :class="{checkedOne:data.attribute_value_33=='1'}">正常, 无限制</li>
          <li @click="selValue_34" :class="{checkedOne:data.attribute_value_34=='1'}">不像往常, 但还能起床进行轻微的活动</li>
          <li @click="selValue_35" :class="{checkedOne:data.attribute_value_35=='1'}">多数时候不想起床活动, 但卧床或座椅时间不超过半天</li>
          <li @click="selValue_36" :class="{checkedOne:data.attribute_value_36=='1'}">几乎干不了什么, 一天大多数时候都卧床或在椅子上</li>
          <li @click="selValue_37" :class="{checkedOne:data.attribute_value_37=='1'}">几乎完全卧床, 无法起床</li>
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
  name : 'nutrition5',
  data() {
    return {
      valueAll : false,
      data : {
        attribute_value_33 : '0', 
        attribute_value_34 : '0', 
        attribute_value_35 : '0', 
        attribute_value_36 : '0', 
        attribute_value_37 : '0', 
      }
    };
  },
  watch : {
     aaa:{//深度监听，可监听到对象、数组的变化
            handler(newVal, oldVal){
               if(newVal.attribute_value_33 == "0" && newVal.attribute_value_34 == "0" && newVal.attribute_value_35 == "0"&& newVal.attribute_value_36 == "0"&& newVal.attribute_value_37 == "0") {
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
      let obj5 = {
        ...nutrition,
        ...this.data
      }
      this.$store.commit('setnutrition',obj5)
      this.$router.push('/nutrition6')
    },
    selValue_33() {
      this.data.attribute_value_33 == '0' ? this.data.attribute_value_33 = '1' : this.data.attribute_value_33 = '0'
    },
    selValue_34() {
      this.data.attribute_value_34 == '0' ? this.data.attribute_value_34 = '1' : this.data.attribute_value_34 = '0'
    },
    selValue_35() {
      this.data.attribute_value_35 == '0' ? this.data.attribute_value_35 = '1' : this.data.attribute_value_35 = '0'
    },
    selValue_36() {
      this.data.attribute_value_36 == '0' ? this.data.attribute_value_36 = '1' : this.data.attribute_value_36 = '0'
    },
    selValue_37() {
      this.data.attribute_value_37 == '0' ? this.data.attribute_value_37 = '1' : this.data.attribute_value_37 = '0'
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
  p:nth-child(5) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.95rem 0 0 0;
  text-align: center;
  font-weight: 500;
}
.gauge_1 {
   margin-top: 0.3rem;
  padding-left: 0.38rem;
  padding-right: 0.37rem;
  ul {
    li {
      padding: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.2rem;
     border: 1px solid #ccc;
     border-radius: 0.06rem;
    //  height: 0.4rem;
     text-align: center;
    //  line-height: 0.4rem;
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
    p:nth-child(5) {
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
    margin: 0.3rem 0 0.2rem 0;
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