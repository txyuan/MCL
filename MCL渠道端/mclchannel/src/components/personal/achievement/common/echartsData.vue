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
            <p>
              咨询服务 <span>{{ data.consultingService }}</span>
            </p>
            <p>¥{{ data.consulting }}</p>
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
            <p>
              管理服务 <span>{{ data.managementService }}</span>
            </p>
            <p>¥{{ data.management }}</p>
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
            <p>
              零售服务 <span>{{ data.retailServices }}</span>
            </p>
            <p>¥{{ data.retail }}</p>
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
            <p>
              套餐服务 <span>{{ data.packageService }}</span>
            </p>
            <p>¥{{ data.package }}</p>
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
  props: ["param", "url"],
  data() {
    return {
      data: {
        // time:''
      },
      dates : []
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      let url = "UserInterface/achievement/IndirectAchievementDiagram.ashx";
      if (this.url) {
        url = this.url;
        this.param.date = this.$store.state.year;
        this.param.pagecount = 1;
        if (this.$store.state.dateflag) {
          this.param.dateflag = String(this.$store.state.dateflag);
        }
        if (this.$store.state.dateflag == 3) {
          this.param.begDate = this.param.date.split("~")[0];
          this.param.endDate = this.param.date.split("~")[1];
          this.param.date = "";
        }
      } else {
        this.param.skey = sessionStorage.getItem("sKey");
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspCode != 1) {
          return;
        }
        this.getEchartsData(data);
      });
    },
    // 折线图
    getEchartsData(opData) {
      var that = this
      var option = {
        tooltip: {
          trigger: "axis",
          backgroundColor : '#3873f6',
          axisPointer : {
            lineStyle : {
              color : '#5d8ad2'
            }
          },
          formatter: function (params) {
            var week = opData.data.filter(function (item) {
                return item.create_date == params[0].name;
            });
            var d_value = params[0].value;
            var res = "<span style=' text-align: center;'>" + params[0].name + "&nbsp" + "&nbsp" + week[0].week + "<br/>" + "¥" + d_value + "</span>";
            return res;
          },
        },
        grid: {
          left: "0%",
          right: "7.5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisTick: {
              show: false,
            },
            data: [],
            axisLine: {
              lineStyle: {
                color: "#E0E5F4",
              },
            },
            axisLabel: {
              showMaxLabel: true,
              // interval : 0,
              textStyle: {
                color: "#333",
                fontSize:10,
              },
              formatter:function(name){
                let dateArr = [that.dates[0],that.dates[4],that.dates[9],that.dates[14],that.dates[19],that.dates[24],that.dates[that.dates.length -1]]
                if(that.param.dateflag == 2) {
                  return (dateArr.indexOf(name) == -1 ? '' : name )
                }else  {
                  return name
                }
              }
            },
          },
        ],
       yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
             axisLine: {
               show: false,
              
            },
            axisLabel: {
              showMaxLabel: false,
              textStyle: {
                color: "rgba(0,0,0,0)",
                fontSize: 10,
              },
            },
            // show: false,
            splitLine: {
								show:true,     //y网格线
							lineStyle:{
                    type:'dashed',
                    color : 'rgba(0,0,0,0.1)'
                }
							},
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
      this.data = opData;
      this.$refs.consultingService.style.width = opData.consultingService;
      this.$refs.managementService.style.width = opData.managementService;
      this.$refs.retailServices.style.width = opData.retailServices;
      this.$refs.packageService.style.width = opData.packageService;
      this.$emit("getData", opData);
      let times = [];
      let money = [];
      opData.data.forEach((item) => {
        times.push(item.create_date);
        money.push(item.money);
      });
      option.xAxis[0].data = times;
      if(this.param.dateflag == 2) {
        option.xAxis[0].axisLabel.interval = 0
      }
      this.dates = times
      option.series[0].data = money;
      myChart.setOption(option);
      
      //显示提示框
setTimeout(() => {
  myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: option.xAxis[0].data.length-1
})
}, 500);
    },
  },
};
</script>
<style scoped lang='scss'>
#echarts_box {
 
  width: 100%;
  background-color: #fff;
  height: 1.8rem;
  border-radius: 0.1rem;
  padding-top: 0.1rem;
}
.jindu {
  background-color: #fff;
  border-radius: 0.1rem;
  margin-top: 0.1rem;
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
    height: 0.3rem;
    text-align: center;
    img {
      width: 60%;
      height: 100%;
      margin-top: 0.13rem;
      margin-right: 0.05rem;
    }
  }
  .right {
    flex: 1;
    div > p:nth-child(2) {
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