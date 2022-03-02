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
        <h3>疾病诊断 (可多选)</h3>
        <div class="illness">
          <ul>
            <!-- <li
              v-for="(item, i) in list"
              :key="i"
              @click="selItem(i)"
              :class="{ checked: item.bOn == 1 }"
            >
              {{ item.value }}
            </li> -->
            <li @click="selvalue_01" :class="{ checked: data.value_01 == 1 }" >肺癌</li>
            <li @click="selvalue_02" :class="{ checked: data.value_02 == 1 }" >胃癌</li>
            <li @click="selvalue_03" :class="{ checked: data.value_03 == 1 }" >贲门癌</li>
            <li @click="selvalue_04" :class="{ checked: data.value_04 == 1 }" >肝癌</li>
            <li @click="selvalue_05" :class="{ checked: data.value_05 == 1 }" >乳腺癌</li>
            <li @click="selvalue_06" :class="{ checked: data.value_06 == 1 }" >食管癌</li>
            <li @click="selvalue_07" :class="{ checked: data.value_07 == 1 }" >子宫癌颈癌</li>
            <li @click="selvalue_08" :class="{ checked: data.value_08 == 1 }" >白血病</li>
            <li @click="selvalue_09" :class="{ checked: data.value_09 == 1 }" >膀胱癌</li>
            <li @click="selvalue_10" :class="{ checked: data.value_10 == 1 }" >胰腺癌</li>
            <li @click="selvalue_11" :class="{ checked: data.value_11 == 1 }" >前列腺癌</li>
            <li @click="selvalue_12" :class="{ checked: data.value_12 == 1 }" >卵巢癌</li>
            <li @click="selvalue_13" :class="{ checked: data.value_13 == 1 }" >鼻咽癌</li>
            <li @click="selvalue_14" :class="{ checked: data.value_14 == 1 }" >结/直肠癌</li>
            <li @click="selvalue_15" :class="{ checked: data.value_15 == 1 }" >子宫内膜癌</li>
            <li @click="selvalue_16" :class="{ checked: data.value_16 == 1 }" >恶性淋巴瘤</li>
            <li @click="selvalue_17" :class="{ checked: data.value_17 == 1 }" >喉癌</li>
            <li @click="selvalue_18" :class="{ checked: data.value_18 == 1 }" >脑胶质瘤</li>
            <li @click="selvalue_19" :class="{ checked: data.value_19 == 1 }" >胃间质瘤</li>
            <li @click="selvalue_20" :class="{ checked: data.value_20 == 1 }" >胆管癌</li>
            <li @click="selvalue_21" :class="{ checked: data.value_21 == 1 }" >胆囊癌</li>
            <li @click="selvalue_22" :class="{ checked: data.value_22 == 1 }" >甲状腺癌</li>
            <li @click="selvalue_23" :class="{ checked: data.value_23 == 1 }" >其他</li>
            <li class="input_li" v-if="data.value_23 == 1">
              <input type="text" v-model="data.value_24" placeholder="请输入" name="" id="">
            </li>
          </ul>
        </div>
      </div>
      <div class="bot_content">
        <div style="background-color: #fff">
          <div class="btn">
            <van-button
              v-if="btnJurisdiction"
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
  </div>
</template>

<script>
export default {
  name: "personInfo3",
  data() {
    return {
      btnJurisdiction : false,
      input : false,
      data : {
        value_01 : '0',
        value_02 : '0',
        value_03 : '0',
        value_04 : '0',
        value_05 : '0',
        value_06 : '0',
        value_07 : '0',
        value_08 : '0',
        value_09 : '0',
        value_10 : '0',
        value_11 : '0',
        value_12 : '0',
        value_13 : '0',
        value_14 : '0',
        value_15 : '0',
        value_16 : '0',
        value_17 : '0',
        value_18 : '0',
        value_19 : '0',
        value_20 : '0',
        value_21 : '0',
        value_22 : '0',
        value_23 : '0',
        value_24 : '',
      }
    };
  },
  components: {},
  mounted() {
    this.btnquanxian()
  },
  methods: {
    btnquanxian() {
      if(this.data.value_01 == 0 && this.data.value_02 == 0 && this.data.value_03 == 0 && this.data.value_04 == 0 && this.data.value_05 == 0 && this.data.value_06 == 0 && this.data.value_07 == 0 && 
      this.data.value_08 == 0 && this.data.value_09 == 0 && this.data.value_10 == 0 && this.data.value_11 == 0 && this.data.value_12 == 0 && this.data.value_13 == 0 && 
      this.data.value_14 == 0 && this.data.value_15 == 0 && this.data.value_16 == 0 && this.data.value_17 == 0 && this.data.value_18 == 0 && this.data.value_19 == 0 && 
      this.data.value_20 == 0 && this.data.value_21 == 0 && this.data.value_22 == 0 && this.data.value_23 == '0' && this.data.value_24 == ''
      ) {
        this.btnJurisdiction = false
      }else {
        this.btnJurisdiction = true
      }
    },
    selvalue_01() {
      this.data.value_01 == 0 ? this.data.value_01 = '1' : this.data.value_01 = '0'
      this.btnquanxian()
    },
    selvalue_02() {
      this.data.value_02 == 0 ? this.data.value_02 = '1' : this.data.value_02 = '0'
      this.btnquanxian()
    },
    selvalue_03() {
      this.data.value_03 == 0 ? this.data.value_03 = '1' : this.data.value_03 = '0'
      this.btnquanxian()
    },
    selvalue_04() {
      this.data.value_04 == 0 ? this.data.value_04 = '1' : this.data.value_04 = '0'
      this.btnquanxian()
    },
    selvalue_05() {
      this.data.value_05 == 0 ? this.data.value_05 = '1' : this.data.value_05 = '0'
      this.btnquanxian()
    },
    selvalue_06() {
      this.data.value_06 == 0 ? this.data.value_06 = '1' : this.data.value_06 = '0'
      this.btnquanxian()
    },
    selvalue_07() {
      this.data.value_07 == 0 ? this.data.value_07 = '1' : this.data.value_07 = '0'
      this.btnquanxian()
    },
    selvalue_08() {
      this.data.value_08 == 0 ? this.data.value_08 = '1' : this.data.value_08 = '0'
      this.btnquanxian()
    },
    selvalue_09() {
      this.data.value_09 == 0 ? this.data.value_09 = '1' : this.data.value_09 = '0'
      this.btnquanxian()
    },
    selvalue_10() {
      this.data.value_10 == 0 ? this.data.value_10 = '1' : this.data.value_10 = '0'
      this.btnquanxian()
    },
    selvalue_11() {
      this.data.value_11 == 0 ? this.data.value_11 = '1' : this.data.value_11 = '0'
      this.btnquanxian()
    },
    selvalue_12() {
      this.data.value_12 == 0 ? this.data.value_12 = '1' : this.data.value_12 = '0'
      this.btnquanxian()
    },
    selvalue_13() {
      this.data.value_13 == 0 ? this.data.value_13 = '1' : this.data.value_13 = '0'
      this.btnquanxian()
    },
    selvalue_14() {
      this.data.value_14 == 0 ? this.data.value_14 = '1' : this.data.value_14 = '0'
      this.btnquanxian()
    },
    selvalue_15() {
      this.data.value_15 == 0 ? this.data.value_15 = '1' : this.data.value_15 = '0'
      this.btnquanxian()
    },
    selvalue_16() {
      this.data.value_16 == 0 ? this.data.value_16 = '1' : this.data.value_16 = '0'
      this.btnquanxian()
    },
    selvalue_17() {
      this.data.value_17 == 0 ? this.data.value_17 = '1' : this.data.value_17 = '0'
      this.btnquanxian()
    },
    selvalue_18() {
      this.data.value_18 == 0 ? this.data.value_18 = '1' : this.data.value_18 = '0'
      this.btnquanxian()
    },
    selvalue_19() {
      this.data.value_19 == 0 ? this.data.value_19 = '1' : this.data.value_19 = '0'
      this.btnquanxian()
    },
    selvalue_20() {
      this.data.value_20 == 0 ? this.data.value_20 = '1' : this.data.value_20 = '0'
      this.btnquanxian()
    },
    selvalue_21() {
      this.data.value_21 == 0 ? this.data.value_21 = '1' : this.data.value_21 = '0'
      this.btnquanxian()
    },
    selvalue_22() {
      this.data.value_22 == 0 ? this.data.value_22 = '1' : this.data.value_22 = '0'
      this.btnquanxian()
    },
    selvalue_23() {
      this.data.value_24 = ''
      this.data.value_23 == 0 ? this.data.value_23 = '1' : this.data.value_23 = '0'
      this.btnquanxian()
    },
    btnSel() {
     let arr = this.list.find((item) => {
        if (item.bOn == "1") {
          return item;
        }
      });
      if(arr) {
        this.btnJurisdiction = true
      }else {
        this.btnJurisdiction = false
      }
    },
    goInfo() {
       let personInfo = this.$store.state.personInfo
       let obj3 = {
         ...personInfo,
         ...this.data
       }
       this.$store.commit('setpersonInfo',obj3)
      this.$router.push('/personInfo4')
    }
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
    p:nth-child(3) {
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
        padding: 0.065rem 0.02rem;
        width: 60.2%;
        input {
        border: 0;
        margin-left: 0.1rem;
      }
    }
    .checked {
      background-color: #e8fafb;
      color: #36c2d9;
      border: 1px solid #36c2d9;
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