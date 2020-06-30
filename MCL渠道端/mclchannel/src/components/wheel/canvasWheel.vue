<template>
    <div class="canvas_wheel_root">
      <div class="lottery" style="width: 100%;">
        <canvas id="myCanvas" width="" height="" ref="myCanvas">
          当前浏览器版本过低，请使用其他浏览器尝试
        </canvas>
        <img :src="startPng" id="start" ref="start">
      </div>
    </div>
</template>

<script>
    import startPng from "./../../assets/images/start.png";
    import canvas1 from "./../../assets/images/1.png";
    import canvas2 from "./../../assets/images/2.png";
    import canvas3 from "./../../assets/images/3.png";
    import canvas4 from "./../../assets/images/4.png";
    import canvas5 from "./../../assets/images/5.png";
    import canvas6 from "./../../assets/images/6.png";
    import canvas7 from "./../../assets/images/7.png";
    import canvas8 from "./../../assets/images/8.png";
    export default {
        name: "canvas_wheel",
        props:["info"],
        data: () => ({
          startPng,
          ctx: null,
          num: 0,
          awardPic: [],
          imgs:[],
          awardTitle:[],
          options: null
        }),
        methods: {
          wheelSurf(opt){
            var options = {
              outerCircle: {
                color: '#df1e15'
              },
              innerCircle: {
                color: '#f4ad26'
              },
              dots: ['#fbf0a9', '#fbb936'],
              disk: ['#ffb933', '#ffe8b5', '#ffb933', '#ffd57c', '#ffb933', '#ffe8b5', '#ffd57c'],
              title: {
                color: '#5c1e08',
                font: '16px Arial'
              }
            }
            options.list = opt.list;
            this.options = options;
            // 画布中心移动到canvas中心
            var _canvas = this.$refs.myCanvas,
              width = _canvas.width,
              height = _canvas.height,
              ctx = _canvas.getContext("2d"),
              imgs = [],
              awardTitle = [],
              awardPic = [];
            this.ctx = ctx;
            this.awardPic = awardPic;
            this.imgs = imgs;
            this.awardTitle = awardTitle;
            for (var item in options.list) {
              awardTitle.push(options.list[item].name)
              imgs.push(options.list[item].image)
            }
            var num = imgs.length;
            this.num = num;
            // 圆心
            var x = width / 2
            var y = height / 2
            ctx.translate(x, y)
          },
          init(angelTo){
            angelTo = angelTo || 0;
            var _this = this;
            var _canvas = this.$refs.myCanvas;
            let {ctx,num,options,awardPic,imgs,awardTitle} = this.$data;
            ctx.clearRect(0,0, _canvas.width, _canvas.height);
          
            // 半径
            var radii = _canvas.width/2;

            //开始指针的宽度
            var start = document.getElementById("start");

            start.width = (parseInt(_canvas.style.width)/3.6);

            // 平分角度
            var angel = (2 * Math.PI / 360) * (360 / num);
            var startAngel = 2 * Math.PI / 360 * (-90)
            var endAngel = 2 * Math.PI / 360 * (-90) + angel

            // 旋转画布
            ctx.save()
            ctx.rotate(angelTo * Math.PI / 180);
            // 画外圆
            ctx.beginPath();
            var lineWidth = radii/10;
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = options.outerCircle.color;
            var wRadii = (radii-(lineWidth/2));
            ctx.arc(0, 0, wRadii, 0, 2 * Math.PI)
            ctx.stroke();

            // 画里圆
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = options.innerCircle.color;
            var nRadii = (wRadii-lineWidth);
            ctx.arc(0, 0, nRadii, 0, 2 * Math.PI)
            ctx.stroke();

            // 装饰点
            var dotColor = options.dots
            for (var i = 0; i < 12; i++) {
              // 装饰点 圆心 坐标计算
              ctx.beginPath();
              var radius = (radii-lineWidth);
              var xr = radius * Math.cos(startAngel)
              var yr = radius * Math.sin(startAngel)

              ctx.fillStyle = dotColor[i % dotColor.length]
              ctx.arc(xr, yr, 11, 0, 2 * Math.PI)
              ctx.fill()

              startAngel += (2 * Math.PI / 360) * (360 / 12);

            }
            // 画里转盘
            var innerR = (radii/2.5);
            var innerL = (radii/1.25);

            var colors = options.disk
            for (var i = 0; i < num; i++) {
              ctx.beginPath();
              ctx.lineWidth = innerL;
              ctx.strokeStyle = colors[i % colors.length]
              ctx.arc(0, 0, innerR, startAngel, endAngel)
              ctx.stroke();
              startAngel = endAngel
              endAngel += angel
            }
            // 添加奖品
            function loadImg() {
              return new Promise((resolve,reject) => {
                var countImg = 0
                if (awardPic.length) {
                  resolve(awardPic)
                  return;
                }
                for (var i = 0; i < num; i++) {
                  var img = new Image()
                  awardPic.push(img)
                  _this.awardPic = awardPic;
                  img.src = imgs[i];
                  img.crossOrigin = "Anonymous";
                  img.onload = function () {
                    countImg++
                    if (countImg == num) {
                      resolve(awardPic);
                    }
                  }
                }
              })
            }

            loadImg().then(function (awardPic) {
              startAngel = angel / 2
              for (var i = 0; i < num; i++) {
                ctx.save();

                ctx.rotate(startAngel);
                ctx.drawImage(awardPic[i], -(radii/6), -(radii/4.5) - (radii/2),radii/3,radii/3);
               /* ctx.font = options.title.font;
                ctx.fillStyle = options.title.color;
                ctx.textAlign = "center";
                ctx.fillText(awardTitle[i], 0, -(radii-lineWidth*2-30));*/
                startAngel += angel
                ctx.restore();
              }
              ctx.restore();
            })
          },
          lottery (angel, callback) {
            angel = angel || 0
            angel = 360-angel
            angel += 720
            // 基值（减速）
            var baseStep = 30
            // 起始滚动速度
            var baseSpeed = 0.3
            // 步长
            var count = 1;
            var _this = this
            var timer = setInterval(function () {

              _this.init(count)
              if (count == angel) {
                clearInterval(timer)
                if (typeof callback == "function") {
                  callback()
                }
              }
              count = count + baseStep * (((angel - count) / angel) > baseSpeed ? baseSpeed : ((angel - count) / angel))
              if (angel - count < 0.5) {
                count = angel
              }

            }, 25)
          },
          loadCanvs(){
            var wrap = document.getElementsByClassName("canvas_wheel_root")[0];
            var canvas = this.$refs.myCanvas;
            var screenWidth = wrap.offsetWidth; //wrap.offsetWidth
            canvas.width = screenWidth*2;
            canvas.height = screenWidth*2;
            canvas.style.width = screenWidth+"px";
            canvas.style.height = screenWidth+"px";
            // 初始化装盘数据 正常情况下应该由后台返回
            var initData = { "list": []};
            this.info.AwardsList.forEach((item,index)=>{
              let obj = {
                id: item.AwardsKey,
                name: item.AwardsName, //item.AwardsName
                image: item.ImageUrl,  //canvas8
                rank: (index+1),
                percent: item.Rate,
                AwardsType: item.AwardsType
              }
              initData.list.push(obj)
            })
            // var initData = {
            //   "list": [
            //     {
            //       "id": 100,
            //       "name": "5000元京东卡",
            //       "image": canvas1,
            //       "rank":1,
            //       "percent":54.5
            //     },
            //     {
            //       "id": 101,
            //       "name": "1000元京东卡",
            //       "image": canvas2,
            //       "rank":2,
            //       "percent":0
            //     },
            //     {
            //       "id": 102,
            //       "name": "100个比特币",
            //       "image": canvas3,
            //       "rank":3,
            //       "percent":0
            //     },
            //     {
            //       "id": 103,
            //       "name": "50元话费",
            //       "image": canvas4,
            //       "rank":4,
            //       "percent":0
            //     },
            //     {
            //       "id": 104,
            //       "name": "100元话费",
            //       "image": canvas5,
            //       "rank":5,
            //       "percent":0
            //     },
            //     {
            //       "id": 105,
            //       "name": "500个比特币",
            //       "image": canvas6,
            //       "rank":6,
            //       "percent":1.5
            //     },
            //     {
            //       "id": 106,
            //       "name": "500元京东卡",
            //       "image": canvas7,
            //       "rank":7,
            //       "percent":54
            //     }
            //   ]
            // }

            // 计算分配获奖概率(前提所有奖品概率相加100%)
            function getGift(){
              var percent = Math.random()*100;  //产生1-100的随机数
              var totalPercent = 0;  //initData 商品数组
              for(var i = 0 ,l = initData.list.length;i<l;i++){
                totalPercent += initData.list[i].percent;  //percent 中奖概率
                if(percent<=totalPercent){
                  return initData.list[i]
                }
              }
            }

            var list = {};

            var angel = 360 / initData.list.length;
            // 格式化成插件需要的奖品列表格式
            for (var i = 0, l = initData.list.length; i < l; i++) {
              list[initData.list[i].rank] = {
                id:initData.list[i].id,
                name: initData.list[i].name,
                image: initData.list[i].image
              }
            }

            // 定义转盘奖品
            this.wheelSurf({
              list: list // 奖品 列表，(必填)
            });

            // 初始化转盘
            this.init()

            // 抽奖
            var throttle = true;
            var start = this.$refs.start;
            var _this = this;
            start.onclick = function () {
              //判断该用户是否有权限
              if(_this.info.Use == 0){
                _this.$Toast(_this.info.CannotMessage);
                return;
              }
              //避免重复点击
              if(!throttle){
                return false;
              }
              throttle = false;

              var count = 0;
              
              //获奖信息应该由后台返回
              _this.$emit("getWinResult",(data)=>{
                  if(data.rspcode == 0){
                  	throttle = true;
                    _this.$Toast(data.rspdesc);
                    return;
                  }
                  //中奖结果
	              var winData = data.data; 
	              // 计算奖品角度
	              for (const key in list) {
	                if (list.hasOwnProperty(key)) {
	                  if (winData.AwardsKey == list[key].id) {
	                    break;
	                  }
	                  count++
	                }
	              }
	              // 转盘抽奖，
	              _this.lottery((count * angel + angel / 2), function () {
	                  throttle = true;
	                  _this.$Toast(data.rspdesc);  //提示中间信息
	                  _this.$emit("updateDefaultInfo")//更新页面数据
	              }) 	  
              })
              
            }
          }
        },
        mounted(){
          this.loadCanvs()
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/css/base.scss";
    .lottery {
      position: relative;
      display: inline-block;
      overflow: hidden;
    }

    .lottery img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;
    }

    #message {
      position: absolute;
      top: 0px;
      left: 10%;
    }
</style>
