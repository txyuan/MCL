<template>
    <div>
      <div id="calendar">
        <!-- 年份 月份 -->
        <div class="month">
          <ul>
            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
              <span class="choose-year">{{ currentYear }}</span>
              <span class="choose-month">{{ currentMonth }}月</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
          </ul>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li style="color:red">六</li>
          <li style="color:red">日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
          <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
          <li  v-for="dayobject in days">
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->

            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>

            <!--如果是本月  还需要判断是不是这一天-->
            <span v-else>
          <!--今天  同年同月同日-->
                <span v-if=" dayobject.isSign===true" class="active">{{ dayobject.day.getDate() }}</span>
                <span v-else>{{ dayobject.day.getDate() }}</span>
            </span>

          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "datanew",
        props:['arrDates'],
        data:()=>({
          currentDay: 0,
          currentMonth: 1,
          currentYear: 1970,
          currentWeek: 1,
          days: [],
          arrDate: []
        }),
        created: function() {  //在vue初始化时调用
          // this.initData(null);
        },
        methods: {
          //时间戳转时间
          formatDate (date, fmt) {
            if (/(y+)/.test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            let o = {
              'M+': date.getMonth() + 1,
              'd+': date.getDate(),
              'h+': date.getHours(),
              'm+': date.getMinutes(),
              's+': date.getSeconds()
            };
            for (let k in o) {
              if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
              }
            }
            return fmt;
          },
          padLeftZero (str) {
            return ('00' + str).substr(str.length);
          },
          formatDatet(time) {
            var date = new Date(time * 1000);
            return this.formatDate(date, 'yyyy-MM-dd');
          },
          //获取日历
          initData: function(cur) {
            this.arrDate.length=0;
            for(var i in this.arrDates){
              this.arrDate.push(this.formatDatet(this.arrDates[i].createTime))
            }
            var leftcount=0; //存放剩余数量
            var date;
            if (cur) {
              date = new Date(cur);
            } else {
              var now=new Date();
              var d = new Date(this.formatDates(now.getFullYear() , now.getMonth() , 1));
              d.setDate(42);
              date = new Date(this.formatDates(d.getFullYear(),d.getMonth() + 1, 1));
            }
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;

            this.currentWeek = date.getDay(); // 1...6,0
            if (this.currentWeek == 0) {
              this.currentWeek = 7;
            }
            var str = this.formatDates(this.currentYear , this.currentMonth, this.currentDay);

            this.days.length = 0;
            // 今天是周日，放在第一行第7个位置，前面6个
            //初始化本周
            for (var i = this.currentWeek - 1; i >= 0; i--) {
              var d = new Date(str);
              d.setDate(d.getDate() - i);
              var dayobject; //用一个对象包装Date对象  以便为以后预定功能添加属性
              dayobject = {day: d,isSign: this.isVerDate(this.formatDates(d.getFullYear(),(d.getMonth()+1),(d.getDate())))}
              this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
            }
            //其他周
            for (var i = 1; i <= 42 - this.currentWeek;i++) {
              var d = new Date(str);
              d.setDate(d.getDate() + i);
              var dayobject={};
              dayobject = {day: d,isSign: this.isVerDate(this.formatDates(d.getFullYear(),(d.getMonth()+1),(d.getDate())))}
              this.days.push(dayobject);
            }
          },
          isVerDate (v) {
            return this.arrDate.includes(v)
          },
          pickPre: function(year, month) {
            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDates(year , month , 1));
            d.setDate(0);
            this.initData(this.formatDates(d.getFullYear(),d.getMonth() + 1,1));
          },
          pickNext: function(year, month) {
            var d = new Date(this.formatDates(year , month , 1));
            d.setDate(42);
            this.initData(this.formatDates(d.getFullYear(),d.getMonth() + 1,1));
          },
          pickYear: function(year, month) {
            alert(year + "," + month);
          },
          // 返回 类似 2016-01-02 格式的字符串
          formatDates: function(year,month,day){
            var y = year;
            var m = month;
            if(m<10) m = "0" + m;
            var d = day;
            if(d<10) d = "0" + d;
            return y+"-"+m+"-"+d
          }
        }
    }
</script>

<style scoped>
  #calendar{
    width:100%;
    margin: 0 auto;
    margin-top: 2.0rem;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
  }
  .month {
    width: 100%;
    background: #fff;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 0.2rem;
  }

  .choose-month {
    text-align: center;
    font-size: 0.15rem;
  }

  .arrow {
    padding: 0.2rem;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: #404040;
    font-size: 0.18rem;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 0.07rem 0;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    color: #404040;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
    font-size: 0.15rem;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    height: 0.4rem;
    text-align: center;
    font-size: 0.16rem;
    color: #606060;
    margin-top: 0.08rem;
    position: relative;
  }
  .days li>span>span{
    height: 0.4rem;
    width: 0.4rem;
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -0.2rem;
    line-height: 0.4rem;
  }
  .days li .active {
    border-radius: 50%;
    border: 1px solid #FF1E41;
    color: #FF1E41;
  }

  .days li .other-month {
    height: 0.4rem;
    width: 0.4rem;
    display: block;
    line-height: 0.4rem;
    color: gainsboro;
    position: absolute;
    left: 50%;
    margin-left: -0.2rem;
  }
</style>
