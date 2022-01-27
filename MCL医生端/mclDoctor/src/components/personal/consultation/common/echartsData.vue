<template>
  <div>
    <div id="echarts_box"></div>
    <div class="jindu">
      <p>业绩分类</p>
      <div class="fuwu">
        <div class="left">
          <img src="@/assets/images/zixun.png" alt="" />
        </div>
        <div class="right">
          <div>
            <p>咨询服务 <span>{{data.consultingService}}</span></p>
            <p>¥{{data.consulting}}</p>
          </div>
          <div class="jin">
            <div class="tiao" ref="consultingService"></div>
          </div>
        </div>
      </div>
      <div class="fuwu">
        <div class="left">
          <img src="@/assets/images/guanli.png" alt="" />
        </div>
        <div class="right">
          <div>
            <p>管理服务 <span>{{data.managementService}}</span></p>
            <p>¥{{data.management}}</p>
          </div>
          <div class="jin">
            <div class="tiao" ref="managementService"></div>
          </div>
        </div>
      </div>
      <div class="fuwu">
        <div class="left">
          <img src="@/assets/images/lingshou.png" alt="" />
        </div>
        <div class="right">
          <div>
            <p>零售服务 <span>{{data.retailServices}}</span></p>
            <p>¥{{data.retail}}</p>
          </div>
          <div class="jin">
            <div class="tiao" ref="retailServices"></div>
          </div>
        </div>
      </div>
      <div class="fuwu">
        <div class="left">
          <img src="@/assets/images/taocan.png" alt="" />
        </div>
        <div class="right">
          <div>
            <p>套餐服务 <span>{{data.packageService}}</span></p>
            <p>¥{{data.package}}</p>
          </div>
          <div class="jin">
            <div class="tiao" ref="packageService"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["param","url"],
  data() {
    return {
      data : {
        // time:''
      }
    };
  },
  created() {
  },
  mounted() {
    this.getEchartsData();
  },
  methods: {
    getEchartsData() {
      var option = {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            var d_value = params[0].value;
            var res = params[0].name + "<br/>" + "¥" + d_value;
            return res;
          },
        },
        grid: {
          left: "-4%",
          right: "6.5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
            show: false,
          },
        ],
        series: [
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
              show: false,
              position: "top",
            },
            areaStyle: { type: "default", color: "#d5f0fd" },
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              normal: {
                color: "#5c7bd9", //改变折线点的颜色
                lineStyle: {
                  color: "#3873f6", //改变折线颜色
                },
              },
            },
            data: [],
          },
        ],
      };
      var myChart = this.$echarts.init(document.getElementById("echarts_box"));
      myChart.setOption(option);
      

      let url = "UserInterface/achievement/IndirectAchievementDiagram.ashx";
      if(this.url) {
        url = this.url
        this.param.date = this.$store.state.year
        this.param.pagecount = 1
      if (this.$store.state.dateflag) {
        this.param.dateflag = String(this.$store.state.dateflag);
      }
      if (this.$store.state.dateflag == 3) {
        this.param.begDate = this.time.split("~")[0];
        this.param.endDate = this.time.split("~")[1];
        this.param.date = "";
      }
      this.$emit('setTime',this.param.date)
      }else {
        this.param.skey = sessionStorage.getItem('sKey')
      }
      
      this.$post(url, this.param).then((data) => {
        if (data.rspCode != 1) {
          return;
        }
        this.data = data
        this.$refs.consultingService.style.width = data.consultingService
        this.$refs.managementService.style.width = data.managementService
        this.$refs.retailServices.style.width = data.retailServices
        this.$refs.packageService.style.width = data.packageService
        this.$emit("getData", data);
        let times = [];
        let money = [];
        data.data.forEach((item) => {
          times.push(item.create_date);
          money.push(item.money);
        });

        option.xAxis[0].data = times;
        option.series[0].data = money;
        myChart.setOption(option);
      });
    },
  },
};
</script>
<style scoped lang='scss'>
#echarts_box {
  width: 100%;
  // margin: 0 0.2rem;
  background-color: #fff;
  height: 2rem;
  border-radius: 0.1rem;
}
.jindu {
  background-color: #fff;
  border-radius: 0.1rem;
  margin-top: 0.05rem;
  padding: 0.1rem;
}
.jin {
  width: 100%;
  background-color: #ccc;
  height: 0.05rem;
  border-radius: 0.025rem;
  margin-top: 0.4rem;
}
.tiao {
  background-color: #3873f6;
  height: 100%;
  width: 0%;
  border-radius: 0.025rem;
}
.fuwu {
  display: flex;

  .left {
    width: 0.5rem;
    height: 0.5rem;
    text-align: left;
    img {
      width: 70%;
      height: 70%;
      margin-top: 0.1rem;
    }
  }
  .right {
    flex: 1;
    div > p:nth-child(2){
      float: right;
      margin-top: 0.1rem;
    }
    div > p:nth-child(1) {
      float: left;
      margin-top: 0.1rem;
      span {
        color: #7d8182;
        font-size: 0.14rem;
      }
    }
  }
}
</style>