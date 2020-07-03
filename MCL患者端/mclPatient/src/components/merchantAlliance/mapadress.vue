<template>
    <div>
      <mt-header fixed title="商家地址">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div id="container" style="100%; height:100vh"></div>
    </div>
</template>

<script>
    // import AMap from 'AMap';
    import createScript from "@/components/common/remote-js.js";  //

    export default {
        name: "mapadress",
        data:()=>({

        }),
        methods:{
          comejd(lnglat){
            let lnglatary=lnglat.split(',');
            // let map = new AMap.Map('container', {
            //   center: [lnglatary[0], lnglatary[1]],
            //   resizeEnable: true,
            //   zoom: 16
            // })
            // // 创建一个 Marker 实例：
            // var marker = new AMap.Marker({
            //   position: new AMap.LngLat(lnglatary[0], lnglatary[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            //   title: '北京'
            // });
            // map.add(marker);
            // AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
            //   map.addControl(new AMap.ToolBar())
            //   map.addControl(new AMap.Scale())
            // })
            var map = new BMap.Map('container');
            var point = new BMap.Point(lnglatary[0], lnglatary[1]);
            map.centerAndZoom(point, 14);
            map.addControl(new BMap.MapTypeControl());
            map.enableScrollWheelZoom(true);
            map.enableDoubleClickZoom(true);
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
          }
        },
        mounted(){
          let lnglat = this.$route.params.lnglat;
          window.init=()=>{this.comejd(lnglat)}
          createScript('http://api.map.baidu.com/api?v=2.0&ak=E4805d16520de693a3fe707cdc962045&callback=init')
        }
    }
</script>

<style scoped>

</style>
