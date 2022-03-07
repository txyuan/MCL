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
     <div class="gauge_1">
         <p>5、我感到一种令人发抖的恐惧</p>
         <div class="one_gau">
           <van-radio-group  class="one_gau_radio" v-model="data.value_05" direction="horizontal">
            <van-radio
            v-for="(item, i) in list1"
            :key="i"
            :class="{ checkedOne: data.value_05 == item.value }"
            :name="item.value"
            >{{ item.value }}</van-radio
          >
          </van-radio-group>
         </div>
         <p style="margin-top:0.4rem;">6、我有点坐立不安，好像感到非要活动不可</p>
         <div class="one_gau">
           <van-radio-group  class="one_gau_radio" v-model="data.value_06" direction="horizontal">
            <van-radio
            v-for="(item, i) in list2"
            :key="i"
            :class="{ checkedOne: data.value_06 == item.value }"
            :name="item.value"
            >{{ item.value }}</van-radio
          >
          </van-radio-group>
         </div>
         <p style="margin-top:0.4rem;">7、我突然有恐慌感</p>
         <div class="one_gau">
           <van-radio-group  class="one_gau_radio" v-model="data.value_07" direction="horizontal">
            <van-radio
            v-for="(item, i) in list3"
            :key="i"
            :class="{ checkedOne: data.value_07 == item.value }"
            :name="item.value"
            >{{ item.value }}</van-radio
          >
          </van-radio-group>
         </div>
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
  name : 'psychology3',
  data() {
    return {
      show : false,
      checkedOne: "",
      valueAll : false,
      list1: [
        {
          value: "根本没有",
          id: '正常'
        },
        {
          value: "有时",
          id: '轻度'
        },
        {
          value: "很经常",
          id: '中度'
        },
        {
          value: "非常经常",
          id: '严重'
        },
      ],
      list2: [
        {
          value: "确实非常多",
          id: '正常'
        },
        {
          value: "是不少",
          id: '轻度'
        },
        {
          value: "并不很多",
          id: '中度'
        },
        {
          value: "根本没有",
          id: '严重'
        },
      ],
      list3: [
        {
          value: "确实很经常",
          id: '正常'
        },
        {
          value: "时常",
          id: '轻度'
        },
        {
          value: "并非经常",
          id: '中度'
        },
        {
          value: "根本没有",
          id: '严重'
        },
      ],
      data : {
        value_05 : '', // 
        value_06 : '', // 
        value_07 : '', // 
      }
    };
  },
  watch : {
     aaa:{//深度监听，可监听到对象、数组的变化
            handler(newVal, oldVal){
               if(newVal.value_05 == "" || newVal.value_06 == ""  || newVal.value_07 == "" ) {
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
      let psychology =  this.$store.state.psychology
      let obj6 = {
        ...psychology,
        ...this.data
      }
      this.$store.commit('setpsychology',obj6)
      this.$router.push('/psychology4')
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
  p:nth-child(3) {
    background-color: #35c2db;
  }
}
h3 {
  margin: 0.95rem 0 0 0;
  text-align: center;
  font-weight: 500;
}
.gauge_1 {
  padding-left: 0.34rem;
  margin-top: 0.95rem;
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
.bot_content {
  background-color: #fff;

  .title {
    padding-top: 0.4rem;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.14rem;
    p:nth-child(6) {
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
    margin: 0.66rem 0 0.2rem 0;
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