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
        <h3>个人病史 (可多选)</h3>
        <div class="illness">
          <ul>
            <li @click="selafterOperation" :class="{ checked: value_50 == 1 }">
              准备手术
            </li>
            <li class="input_li" @click="popupShow">
              <span>手术时间</span>
              <input readonly type="text" v-model="value_51" name="" id="" />
              <van-icon class="time" name="clock-o" />
            </li>
            <li @click="selendOperation" :class="{ checked: value_52 == 1 }">
              手术后
            </li>
          </ul>
        </div>
        <div class="textLine"></div>
        <div class="chemotherapy">
          <ul>
            <li @click="selvalue_53" :class="{ checked: value_53 == 1 }">
              <p>化疗</p>
              <p v-if="value_53 == 1">(第{{ value_54 }}疗程)</p>
            </li>
            <van-popup :close-on-click-overlay="false" class="popupliao" v-model="showhualiao">
              <h4>化疗</h4>
              <p>第<input type="text" v-model="value_54" />疗程</p>
              <div class="btn_com1">
                <button @click="comfig54" class="btn_com">确定</button>
              </div>
              <div class="btn_can1">
                <button @click="cancel54" class="btn_can">取消</button>
              </div>
            </van-popup >
            <li @click="selvalue_55" :class="{ checked: value_55 == 1 }">
              <p>放疗</p>
              <p v-if="value_55 == 1">(第{{ value_56 }}疗程)</p>
            </li>
            <van-popup :close-on-click-overlay="false" class="popupliao" v-model="showfangliao">
              <h4>放疗</h4>
              <p>第<input type="text" v-model="value_56" />疗程</p>
              <div class="btn_com1">
                <button @click="comfig56" class="btn_com">确定</button>
              </div>
              <div class="btn_can1">
                <button @click="cancel56" class="btn_can">取消</button>
              </div>
            </van-popup>
            <li @click="selvalue_57" :class="{ checked: value_57 == 1 }">
              <p>靶向治疗</p>
              <p v-if="value_57 == 1">(第{{ value_58 }}疗程)</p>
            </li>
            <van-popup :close-on-click-overlay="false" class="popupliao" v-model="showba">
              <h4>靶向治疗</h4>
              <p>第<input type="text" v-model="value_58" />疗程</p>
              <div class="btn_com1">
                <button @click="comfig58" class="btn_com">确定</button>
              </div>
              <div class="btn_can1">
                <button @click="cancel58" class="btn_can">取消</button>
              </div>
            </van-popup>
            <li @click="selvalue_59" :class="{ checked: value_59 == 1 }">
              <p>介入治疗</p>
              <p v-if="value_59 == 1">(第{{ value_60 }}疗程)</p>
            </li>
            <van-popup :close-on-click-overlay="false" class="popupliao" v-model="showjieru">
              <h4>介入治疗</h4>
              <p>第<input type="text" v-model="value_60" />疗程</p>
              <div class="btn_com1">
                <button @click="comfig60" class="btn_com">确定</button>
              </div>
              <div class="btn_can1">
                <button @click="cancel60" class="btn_can">取消</button>
              </div>
            </van-popup>
            <li @click="selvalue_61" :class="{ checked: value_61 == 1 }">
              <p>免疫治疗</p>
              <p v-if="value_61 == 1">(第{{ value_62 }}疗程)</p>
            </li>
            <van-popup :close-on-click-overlay="false" class="popupliao" v-model="showmianyi">
              <h4>免疫治疗</h4>
              <p>第<input type="text" v-model="value_62" />疗程</p>
              <div class="btn_com1">
                <button @click="comfig62" class="btn_com">确定</button>
              </div>
              <div class="btn_can1">
                <button @click="cancel62" class="btn_can">取消</button>
              </div>
            </van-popup>
            <li @click="selvalue_63" :class="{ checked: value_63 == 1 }">
              <p>内分泌治疗</p>
              <p v-if="value_63 == 1">(第{{ value_64 }}疗程)</p>
            </li>
            <van-popup :close-on-click-overlay="false" class="popupliao" v-model="shownei">
              <h4>内分泌治疗</h4>
              <p>第<input type="text" v-model="value_64" />疗程</p>
              <div class="btn_com1">
                <button @click="comfig64" class="btn_com">确定</button>
              </div>
              <div class="btn_can1">
                <button @click="cancel64" class="btn_can">取消</button>
              </div>
            </van-popup>
          </ul>
        </div>
         <div class="textLine"></div>
         <div class="bottom_text">
           <ul>
             <li @click="selvalue_65" :class="{ checked: value_65 == 1 }">康复随访中</li>
             <li>
               <!-- <input type="text" placeholder="请输入"> -->
             </li>
             <!-- <div>
               <span>其他</span>
             </div> -->
             <li @click="selvalue_66" :class="{ checked: value_66 == 1 }">其他</li>
             <li v-if="value_66 == 1">
               <input type="text" v-model="value_67" placeholder="请输入">
             </li>
           </ul>
         </div>
      </div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-datetime-picker
          item-height="50"
          title="手术时间"
          active-calss="selectPicker"
          v-model="currentDate"
          confirm-button-text="完成"
          type="date"
          :columns-order="['year', 'month', 'day']"
          :formatter="formatter"
          @change="onShift"
          visible-item-count="6"
          @confirm="confirm"
          @cancel="cancel"
        />
      </van-popup>
      <div class="bot_content">
        <div style="background-color: #fff">
          <div class="btn">
            <van-button
              v-if="btnJurisdiction"
              class="btn_info"
              round
              type="info"
              @click="submit"
              >提交</van-button
            >
            <van-button v-else class="btn_info1" round type="info"
              >提交</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personInfo6",
  data() {
    return {
      btnJurisdiction: false,
      input: false,
      currentDate: new Date(),
      changeDate: this.timeFormat(new Date()),
      
      dom: [],
      doms: [],
      show: false,
      value_50: "0", // 手术前
      value_51: "", // 手术时间
      value_52: "0", // 手术后
      value_53: "0", // 化疗
      showhualiao: false,
      value_54: "", // 疗程
      value_55: "0", // 放疗
      showfangliao: false,
      value_56: "", // 疗程
      value_57: "0", // 靶向治疗
      showba: false,
      value_58: "", // 疗程
      value_59: "0", // 介入治疗
      showjieru: false,
      value_60: "", // 疗程
      value_61: "0", // 免疫治疗
      showmianyi: false,
      value_62: "", // 疗程
      value_63: "0", // 内分泌治疗
      shownei: false,
      value_64: "", // 疗程
      value_65 : '0', // 随访
      value_66 : '0', // 其他
      value_67 : '' // 输入框
    };
  },
  components: {},
  mounted() {
    this.timeFormat(new Date());
    this.btnqunxian()
  },
  methods: {
    btnqunxian() {
      if(this.value_50 == 0 && this.value_51 == '' && this.value_52 ==0 && this.value_53 ==0 && this.value_55 ==0 && this.value_57 ==0
        && this.value_59 ==0 && this.value_61 ==0 && this.value_63 ==0 && this.value_65 ==0 && this.value_66 ==0
      ) {
        this.btnJurisdiction = false
      }else {
        this.btnJurisdiction = true
      }
    },
    // 时间弹出层
    popupShow() {
      this.show = true;
      this.$nextTick(() => {
        this.getDoms();
        this.setDom();
      });
    },
    // 时间确定按钮
    confirm() {
      this.value_51 = this.changeDate;
      this.show = false;
      this.btnqunxian()
    },
    // 时间取消按钮
    cancel() {
      this.changeDate = this.timeFormat(new Date());
      this.show = false;
      this.btnqunxian()
    },
    // 选择手术前
    selafterOperation() {
      if (this.value_50 == 0) {
        this.value_50 = '1';
      } else {
        this.value_50 = '0';
      }
      this.btnqunxian()
    },
    // 选择手术后
    selendOperation() {
      if (this.value_52 == 0) {
        this.value_52 = '1';
      } else {
        this.value_52 = '0';
      }
      this.btnqunxian()
    },
    // 提交按钮
    submit() {
      let personInfo = this.$store.state.personInfo
       let obj = {
         ...personInfo,
         value_50: this.value_50,
         value_51: this.value_51,
         value_52: this.value_52,
         value_53: this.value_53,
         value_54: this.value_54,
         value_55: this.value_55,
         value_56: this.value_56,
         value_57: this.value_57,
         value_58: this.value_58,
         value_59: this.value_59,
         value_60: this.value_60,
         value_61: this.value_61,
         value_62: this.value_62,
         value_63: this.value_63,
         value_64: this.value_64,
         value_65: this.value_65,
         value_66: this.value_66,
         value_67: this.value_67,
       }
       let url = 'UserInterface/AddConditionDiseaseTumourTest.ashx'
       this.$post(url,obj).then(res => {
          if (res.rspcode != 1) {
            this.$Toast(res.rspdesc)
            return
          }
          this.$Toast('保存成功')
          this.$router.push('/wx_Entrance/home')
       })
      //  this.$store.commit('setpersonInfo',obj)

    },
    // 放疗弹框
    selvalue_53() {
      if (this.value_53 == 0) {
        this.value_53 = '1';
      } else if (this.value_53 == 1) {
        if (this.value_54) {
          this.value_53 = '1';
        } else {
          this.value_53 = '0';
        }
      }
      this.btnqunxian()
      this.showhualiao = true;
    },
    comfig54() {
      if (this.value_54 == "") {
        this.value_53 = '0';
        this.btnqunxian()
      }
      
      this.showhualiao = false;
    },
    cancel54() {
      if (this.value_54 == "") {
        this.value_53 = '0';
        this.btnqunxian()
      }
      
      this.showhualiao = false;
    },
    // 放疗弹框
    selvalue_55() {
      if (this.value_55 == '0') {
        this.value_55 = '1';
      } else if (this.value_55 == 1) {
        if (this.value_56) {
          this.value_55 = '1';
        } else {
          this.value_55 = '0';
        }
      }
      this.btnqunxian()
      this.showfangliao = true;
    },
    comfig56() {
      if (this.value_56 == "") {
        this.value_55 = '0';
        this.btnqunxian()
      }
      
      this.showfangliao = false;
    },
    cancel56() {
      if (this.value_56 == "") {
        this.value_55 = '0';
        this.btnqunxian()
      }
      
      this.showfangliao = false;
    },
    // 放疗弹框
    selvalue_57() {
      if (this.value_57 == 0) {
        this.value_57 = '1';
      } else if (this.value_57 == 1) {
        if (this.value_58) {
          this.value_57 = '1';
        } else {
          this.value_57 = '0';
        }
      }
      this.btnqunxian()
      this.showba = true;
    },
    comfig58() {
      if (this.value_58 == "") {
        this.value_57 = '0';
        this.btnqunxian()
      }
      
      this.showba = false;
    },
    cancel58() {
      if (this.value_58 == "") {
        this.value_57 = '0';
        this.btnqunxian()
      }
      
      this.showba = false;
    },
    // 放疗弹框
    selvalue_59() {
      if (this.value_59 == 0) {
        this.value_59 = '1';
      } else if (this.value_59 == 1) {
        if (this.value_60) {
          this.value_59 = '1';
        } else {
          this.value_59 = '0';
        }
      }
      this.btnqunxian()
      this.showjieru = true;
    },
    comfig60() {
      if (this.value_60 == "") {
        this.value_59 = '0';
        this.btnqunxian()
      }
      
      this.showjieru = false;
    },
    cancel60() {
      if (this.value_60 == "") {
        this.value_59 = '0';
        this.btnqunxian()
      }
      
      this.showjieru = false;
    },
    // 放疗弹框
    selvalue_61() {
      if (this.value_61 == 0) {
        this.value_61 = '1';
      } else if (this.value_61 == 1) {
        if (this.value_62) {
          this.value_61 = '1';
        } else {
          this.value_61 = '0';
        }
      }
      this.btnqunxian()
      this.showmianyi = true;
    },
    comfig62() {
      if (this.value_62 == "") {
        this.value_61 = '0';
        this.btnqunxian()
      }
      this.showmianyi = false;
    },
    cancel62() {
      if (this.value_62 == "") {
        this.value_61 = '0';
        this.btnqunxian()
      }
      this.showmianyi = false;
    },
    // 放疗弹框
    selvalue_63() {
      if (this.value_63 == 0) {
        this.value_63 = '1';
      } else if (this.value_63 == 1) {
        if (this.value_64) {
          this.value_63 = '1';
        } else {
          this.value_63 = '0';
        }
      }
      this.btnqunxian()
      this.shownei = true;
    },
    comfig64() {
      if (this.value_64 == "") {
        this.value_63 = '0';
        this.btnqunxian()
      }
      
      this.shownei = false;
    },
    cancel64() {
      if (this.value_64 == "") {
        this.value_63 = '0';
        this.btnqunxian()
      }
      
      this.shownei = false;
    },
    selvalue_65() {
      if(this.value_65 == 0) {
        this.value_65 = '1'
      }else {
        this.value_65 = '0'
      }
      this.btnqunxian()
    },
    selvalue_66() {
      if(this.value_66 == 0) {
        this.value_66 = '1'
      }else {
        this.value_66 = '0'
      }
      this.btnqunxian()
    },
    // 获取修改颜色的时间
    getDoms() {
      var dom = document.querySelectorAll(
        " .van-picker-column__item .van-ellipsis"
      );
      var doms = Array.from(dom);
      this.dom = dom;
      this.doms = doms;
    },
    setDom() {
      let arr = [];
      this.doms.forEach((element) => {
        arr.push(element.innerHTML);
        element.style.color = "#999";
      });
      let dateArr = this.changeDate.split("-");
      let nian = dateArr[0] + "年";
      let yue = dateArr[1] + "月";
      let ri = dateArr[2] + "日";
      this.dom[this.findall(arr, nian)].style.color = "#35c2db";
      this.dom[this.findall(arr, yue)].style.color = "#35c2db";
      this.dom[this.findall(arr, ri)].style.color = "#35c2db";
    },
    findall(a, x) {
      var results = [],
        len = a.length,
        pos = 0;
      while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) {
          //未找到就退出循环完成搜索
          break;
        }
        results.push(pos); //找到就存储索引
        pos += 1; //并从下个位置开始搜索
      }
      return results;
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
    onShift() {
      this.changeDate = this.timeFormat(this.currentDate); // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
      this.setDom();
    },
    // 格式化时间
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      let day = time.getDate();
      if (day < 10) {
        return year + "-" + month + "-" + "0" + day;
      } else {
        return year + "-" + month + "-" + day;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
>>> [class*="van-hairline"]::after {
  border: 1px solid #39c4d5 !important;
  border-radius: 3rem;
}
>>> .van-picker__confirm {
  color: #39c4d5 !important;
}
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff !important;
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
    p:nth-child(6) {
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
}
.illness {
  padding: 0 0.1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    justify-content: start;
    li {
      width: 27%;
      text-align: center;
      border: 1px solid #ccc;
      padding: 0.05rem 0.02rem;
      border-radius: 0.06rem;
      margin: 0.08rem 2.32%;
      font-size: 0.14rem;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .input_li {
      display: flex;
      align-items: center;
      padding: 0.065rem 0.02rem;
      width: 60.2%;
      span {
        margin-left: 0.1rem;
      }
      input {
        color: #36c2d9;
        border: 0;
        margin-left: 0.2rem;
        margin-top: 0.02rem;
        // font-size: 0.16rem;
      }
      .time {
        font-size: 0.18rem;
        margin-right: 0.1rem;
      }
    }
    .checked {
      background-color: #e8fafb;
      color: #36c2d9;
      border: 1px solid #36c2d9;
    }
  }
}
.bottom_text {
    padding: 0 0.1rem;
     ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    justify-content: start;
    
    li {
      width: 27%;
      text-align: center;
      border: 1px solid #ccc;
      padding: 0.05rem 0.02rem;
      border-radius: 0.06rem;
      margin: 0.08rem 2.32%;
      font-size: 0.14rem;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      
    }
    li:nth-child(2) {
      width: 60%;
      border: 0;
    }
    li:nth-child(4) {
      width: 60%;
      input {
        border: 0;
        
      }
    }
    .checked {
      background-color: #e8fafb;
      color: #36c2d9;
      border: 1px solid #36c2d9;
    }
    
  }
}
.popupliao {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  width: 70%;
  height: 35%;
  h4 {
  }
  p {
    text-align: center;
    margin-top: 0.2rem;
    input {
      width: 40%;
      border: 0;
      border-bottom: 2px solid #ccc;
      margin: 0 0.1rem;
      // padding-left: 0.2rem;
      text-align: center;
    }
  }
  .btn_com1 {
    margin-top: 0.3rem;
    width: 70% !important;
    .btn_com {
      width: 100% !important;
      border: 0;
      background-color: #35c3d9;
      height: 0.4rem;
      border-radius: 0.2rem;
      color: #fff;
    }
  }
  .btn_can1 {
    margin-top: 0.1rem;
    width: 70% !important;
    .btn_can {
      width: 100% !important;
      border: 1px solid #ccc;
      background-color: #fff;
      height: 0.4rem;
      border-radius: 0.2rem;
      color: #989898;
    }
  }
}

.checked {
  background-color: #e8fafb;
  color: #36c2d9;
  border: 1px solid #36c2d9;
}
.chemotherapy {
  padding: 0 0.1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    justify-content: start;
    li {
      p {
        // margin: 0.05rem 0 0 0;
      }
      display: flex;
      justify-content: center;
      flex-flow: column;
      align-items: center;
      width: 27%;
      height: 0.5rem;
      text-align: center;
      border: 1px solid #ccc;
      padding: 0.05rem 0.02rem;
      border-radius: 0.06rem;
      margin: 0.08rem 2.32%;
      font-size: 0.14rem;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .checked {
      background-color: #e8fafb;
      color: #36c2d9;
      border: 1px solid #36c2d9;
    }
  }
}
.textLine {
  height: 0.02rem;
  border-top: 2px dashed #ccc;
  margin: 0.1rem 0.2rem;
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