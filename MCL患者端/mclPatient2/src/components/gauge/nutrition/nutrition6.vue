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
      <h3>身体应激情况</h3>
      <div class="gauge_1">
        <p>1、您目前是否有发热</p>
        <div class="one_gau">
          <van-radio-group  class="one_gau_radio" v-model="data.attribute_value_38" direction="horizontal">
            <van-radio  :class="{checkedOne:data.attribute_value_38=='无'}" name="无" >无</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_38=='37.2-38.3'}" name="37.2-38.3" >37.2-38.3</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_38=='38.3-38.8'}" name="38.3-38.8" >38.3-38.8</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_38=='≥38.8'}" name="≥38.8" >≥38.8</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="gauge_1">
        <p>2、若有发热, 持续时间</p>
        <div class="one_gau">
          <van-radio-group  class="one_gau_radio" v-model="data.attribute_value_39" direction="horizontal">
            <van-radio  :class="{checkedOne:data.attribute_value_39=='无'}" name="无" >无</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_39=='<72小时'}" name="<72小时" ><72小时</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_39=='72小时'}" name="72小时" >72小时</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_39=='>72小时'}" name=">72小时" >>72小时</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="gauge_3">
         <p>3、是否用激素 (强的松)</p>
           <van-radio-group  class="one_gau_radio" v-model="data.attribute_value_40" direction="horizontal">
            <van-radio  :class="{checkedOne:data.attribute_value_40=='无'}" name="无" >无</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_40=='低剂量(<10mg强的松或相当剂量的其它激素/d)'}" name="低剂量(<10mg强的松或相当剂量的其它激素/d)" >低剂量(<10mg强的松或相当剂量的其它激素/d)</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_40=='中剂量(10-30mg强的松或相当剂量的其它激素/d)'}" name="中剂量(10-30mg强的松或相当剂量的其它激素/d)" >中剂量(10-30mg强的松或相当剂量的其它激素/d)</van-radio>
            <van-radio  :class="{checkedOne:data.attribute_value_40=='大剂量(30mg强的松或相当剂量的其它激素/d)'}" name="大剂量(30mg强的松或相当剂量的其它激素/d)" >大剂量(30mg强的松或相当剂量的其它激素/d)</van-radio>
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
  name : 'nutrition6',
  data() {
    return {
      show : false,
      checkedOne: "",
      valueAll : false,
      data : {
        attribute_value_38 : '', // 是否发热
        attribute_value_39 : '', 
        attribute_value_40 : '', 
      }
    };
  },
  watch : {
     aaa:{//深度监听，可监听到对象、数组的变化
            handler(newVal, oldVal){
               if(newVal.attribute_value_38 == "" || newVal.attribute_value_39 == ""  || newVal.attribute_value_40 == "" ) {
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
      let obj6 = {
        ...nutrition,
        ...this.data
      }
      this.$store.commit('setnutrition',obj6)
      this.$router.push('/nutrition7')
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
  p:nth-child(6) {
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
  padding-left: 0.34rem;
  margin-top: 0.3rem;
  p {
    font-size: 0.18rem;
  }
  .one_gau {
    .one_gau_radio {
      display: flex;
      justify-content: left;
    }

    >>> .van-radio {
      margin-top: 0.2rem;
      margin-right: 0.2rem;
      border: 1px solid #ccc;
      border-radius: 0.06rem;
      height: 0.4rem !important;
      width: 1.4rem !important;
    }

    >>> .van-radio__icon {
      margin-left: 0.15rem !important;
    }
    >>> .van-radio__label {
      margin-left: -0.2rem !important;
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
     height: 0.44rem !important;
     width: 100% !important;
     margin-right: 0 !important;
   }
   
   >>> .van-radio__icon {
     margin-left: 0.15rem !important;
   }
   >>> .van-radio__label {
    //  margin-left: -0.2rem !important;
    padding: 0.05rem 0.05rem;
    text-align: left;
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