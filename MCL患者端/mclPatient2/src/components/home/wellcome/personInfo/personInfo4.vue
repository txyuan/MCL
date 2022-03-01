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
        <h3>首次诊断日期</h3>
        <div class="picker">
          <van-datetime-picker
            item-height="60"
            :show-toolbar="false"
            active-calss="selectPicker"
            v-model="currentDate"
            type="date"
            :columns-order="['year', 'month', 'day']"
            :formatter="formatter"
            @change="onShift"
            visible-item-count="5"
          />
        </div>
      </div>
      <div class="bottom_radio">
        <van-checkbox v-model="checked" icon-size="24px"
          >具体日期记不清</van-checkbox
        >
      </div>
      <div class="bot_content">
        <div style="height:2rem; background-color: #fff">
          <div class="btn">
            <van-button class="btn_info" round type="info" @click="goInfo"
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
  name: "personInfo4",
  data() {
    return {
      currentDate: new Date(),
      changeDate: this.timeFormat(new Date()),
      valueName: " ",
      checked: "",
      dom : [],
      doms : []
    };
  },
  mounted() {
    this.timeFormat(new Date());
    this.getDoms()
    this.setDom();
  },
  methods: {
    getDoms() {
      var dom = document.querySelectorAll(
        ".picker .van-picker-column__item .van-ellipsis"
      );
      var doms = Array.from(dom);
      this.dom = dom
      this.doms = doms
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
    goInfo() {
      this.$router.push("/personInfo5");
    },
    goInfoTo() {
      this.changeDate = "";
      this.$router.push("/personInfo5");
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
>>> [class*="van-hairline"]::after {
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
    p:nth-child(4) {
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
.bottom_radio {
  display: flex;
  align-items: center;
  // width: ;
  margin: 0.3rem 0.3rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border: 1px solid #ccc;
  >>> .van-checkbox__label {
    color: #999;
    margin-left: 0.7rem;
  }
  >>> .van-checkbox__icon {
    margin-left: 0.1rem;
  }
}

.content {
  background-color: #fff;
  h3 {
    text-align: center;
    font-weight: 500;
    margin: 1rem 0 0.2rem 0;
  }
  .input_top {
    text-align: center;
    border: 1px solid #ccc;
    height: 0.6rem;
    border-radius: 0.3rem;
    margin: 0 0.3rem;
    input {
      border: 0;
      line-height: 0.6rem;
      margin-left: 30%;
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