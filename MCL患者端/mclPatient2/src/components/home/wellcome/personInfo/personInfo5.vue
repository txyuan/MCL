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
       <div class="kongbai" @click="goInfoTo">
        <span>跳过</span>
      </div>
    </div>
    <div class="content_all">
      <div class="content">
        <h3>个人病史 (可多选)</h3>
        <div class="illness">
          <ul>
            <li
              v-for="(item, i) in list"
              :key="i"
              @click="selItem(i)"
              :class="{ checked: item.bOn == 1 }"
            >
              {{ item.value }}
            </li>
            <li class="input_li" v-if="input">
              <input type="text" placeholder="请输入" name="" id="">
            </li>
          </ul>
        </div>
      </div>
      <div class="bot_content">
        <div style=" background-color: #fff">
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
  name: "personInfo5",
  data() {
    return {
      list: [
        {
          value: "肺癌",
          bOn: 0,
        },
        {
          value: "胃癌",
          bOn: 0,
        },
        {
          value: "乳腺癌",
          bOn: 0,
        },
        {
          value: "白血病白血病白血病",
          bOn: 0,
        },
        {
          value: "其他",
          bOn: 0,
        },
      ],
      btnJurisdiction : false,
      input : false
    };
  },
  components: {},
  
  mounted() {},
  methods: {
    selItem(i) {
      
      if (this.list[i].bOn == 0) {
        this.list[i].bOn = 1;
      } else if(this.list[i].bOn == 1) {
        this.list[i].bOn = 0;
      }
      if(i == this.list.length-1 && this.list[i].bOn == 1) {
        console.log(i);
        this.input = true
      }else {
        this.input = false
      }
      this.btnSel()
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
      this.$router.push('/personInfo6')
    },
    goInfoTo() {
      this.changeDate = ''
      this.$router.push("/personInfo6");
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
    p:nth-child(5) {
      background-color: #35c2db;
    }
  }

  .kongbai {
    width: 0.44rem;
    line-height: 0.4rem;
    font-size: 0.12rem;
    text-align: center;
    span {
      padding: 0.02rem 0.06rem;
      border-radius: 0.2rem;
      color: #fff;
      background-color: #9c9a9b;
    }
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
    margin: 0.6rem 0 0.2rem 0;
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
      margin: 0.1rem 2.32%;
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