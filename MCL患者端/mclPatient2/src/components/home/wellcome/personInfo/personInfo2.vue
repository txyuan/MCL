<template>
  <div class="home">
    <div class="header_top">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
      <div class="center_line">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div class="kongbai"></div>
    </div>
    <div class="content_all">
      <div class="content">
        <h3>性别</h3>
        <div class="input_top">
          <div class="nan" v-if="selnan == 1" @click="selectnan">
            <img src="@/assets/images/personalInfo/nan.png" alt="">
            <span>男</span>
            </div>
          <div class="selnan" v-else-if="selnan == 2">
            <img src="@/assets/images/personalInfo/selnan.png" alt="">
            <span>男</span>
            </div>
          <div class="selectnv" v-else-if="selnan == 3" @click="selectnan">
            <img src="@/assets/images/personalInfo/nan.png" alt="">
            <span>男</span>
            </div>
          <div class="nv" v-if="!selnv" @click="selectnv">
            <img src="@/assets/images/personalInfo/nv.png" alt="">
            <span>女</span>
          </div>
          <div class="selnv" v-else >
            <img src="@/assets/images/personalInfo/selnv.png" alt="">
            <span>女</span>
          </div>
        </div>
        <h3 class="height">身高(厘米)</h3>
        <div>
          <DLRuler1
            :value="100"
            :min="0"
            :max="300"
            :onChange="changeHeight"
          ></DLRuler1>
        </div>
        <h3 class="weight">体重(千克)</h3>
        <div>
          <DLRuler
            :value="50.0"
            :min="0"
            :max="300"
            :onChange="changeWeight"
          ></DLRuler>
        </div>
      </div>
      <div class="bot_content">
      
      <div style="background-color: #fff">
        <div class="btn">
          <van-button v-if="sex" class="btn_info" round type="info" @click="goInfo">下一步</van-button>
          <van-button v-else class="btn_info1" round type="info">下一步</van-button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import DLRuler from "@/components/home/weight/ruler.vue";
import DLRuler1 from "./ruler.vue";
export default {
  name: "personInfo2",
  data() {
    return {
      currentDate: new Date(),
      changeDate : this.timeFormat(new Date()),
      selnan : 1,
      selnv : false,
      height : '100',
      weight : '50',
      sex : false
    };
  },
  components: {
    DLRuler,
    DLRuler1
  },
  mounted() {
   this.timeFormat(new Date())
  },
  methods: {
    selectnan() {
      this.sex = true
      this.selnan = 2
      this.selnv = false
    },
    selectnv() {
      this.sex = true
      this.selnan = 3
      this.selnv = true
    },
    changeHeight(val) {
      this.height = Math.round(val);
    },
    changeWeight(val) {
      this.weight = val;
    },

    goInfo() {
      let personInfo = this.$store.state.personInfo
      let obj = {}
      if(this.selnan == 2) {
        obj.sex = '男'
        obj.height =this.height
        obj.weight = this.weight
      }else if(this.selnan == 3){
        obj.sex = '女'
        obj.height =this.height
        obj.weight = this.weight
      }
      let obj2 = {
        ...personInfo,
        ...obj
      }
      this.$store.commit('setpersonInfo',obj2)
      this.$router.push('/personInfo3')
    },
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
     onShift(){
          this.changeDate = this.timeFormat(this.currentDate) // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    timeFormat(time) { // 时间格式化 2019-09-08
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        return year + '-' + month + '-' + day
      },
  },
   
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff !important;
}
>>> .van-picker__frame {
  left: 0;
  right: 0.004rem;
}
>>> [class*=van-hairline]::after {
  border: 1px solid #39c4d5 !important;
    border-radius: 3rem;
}
.header_top {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  background-color: #fff;
  .mint-button--default {
    background-color: #fff !important;
    -webkit-box-shadow: 0 0 0 !important;
    box-shadow: 0 0 0 !important;
  }
  .center_line {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0.42rem;
    p {
      height: 0.05rem;
      width: 15%;
      border-radius: 0.025rem;
      background-color: #ebebed;
    }
    p:nth-child(2) {
      background-color: #35c2db;
    }
  }

  .kongbai {
    width: 0.44rem;
  }
}
.content_all {
  background-color: #fff;
  overflow: hidden;
}
.content {
  background-color: #fff;
  h3 {
    text-align: center;
    font-weight: 500;
    margin: 0.5rem 0 0.2rem 0;
  }
  .height {
    margin-top: 0.2rem;
  }
  .weight {
    margin-top: -0.1rem;
  }
  .input_top {
    display: flex;
    text-align: center;
    border: 1px solid #ccc;
    height: 0.4rem;
    border-radius: 0.3rem;
    margin: 0 0.8rem;
    .selnan {
       box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.35rem;
      width: 55%;
      height: 100%;
      border-right: 1px solid #ccc;
      border-radius: 0.2rem;
      color: #fff;
      background-color: #36c2d9;
       img {
        // margin-top: 0.05rem;
        width: 0.2rem;
        height: 0.2rem;
         vertical-align: middle;
      }
    }
    .selectnv {
       box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.25rem;
      width: 45%;
      height: 100%;
      color: #999;
       img {
        // margin-top: 0.05rem;
        width: 0.2rem;
        height: 0.2rem;
         vertical-align: middle;
      }
    }
    .nan {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.35rem;
      width: 55%;
      height: 100%;
      border-right: 1px solid #ccc;
      border-radius: 0.2rem;
      color: #999;
      img {
        // margin-top: 0.05rem;
        width: 0.2rem;
        height: 0.2rem;
         vertical-align: middle;
      }
    }
    .selnv {
        box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.35rem;
      text-align: center;
      width:55%;
      height: 100%;
       border-left: 1px solid #ccc;
      border-radius: 0.2rem;
      color: #fff;
      background-color: #36c2d9;
      img {
        // margin-top: 0.05rem;
        width: 0.2rem;
        height: 0.2rem;
         vertical-align: middle;
      }
    }
    .nv {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.25rem;
      text-align: center;
      width:45%;
      height: 100%;
      color: #999;
      img {
        // margin-top: 0.05rem;
        width: 0.2rem;
        height: 0.2rem;
         vertical-align: middle;
      }
    }
  }
  .picker {
    margin: 0 0.3rem;
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
    position: fixed;
    bottom: 0.2rem;
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