<template>
    <div class="app_down_root">
      <img :src="sharBg" alt="" class="sharebg" width="100%">
      <div class="btn_group">
        <mt-button type="danger" class="share_btn" size="large"  @click.native="addDown('android')">
          <img src="https://resource.jtsc.club/anzhuo.png" alt="" width="20" style="vertical-align: middle;margin-bottom: 2px">
          安卓下载
        </mt-button>
        <mt-button type="danger" class="share_btn" size="large" @click.native="addDown('ios')">
          <img src="https://resource.jtsc.club/ios.png" alt="" width="20" style="vertical-align: middle;margin-bottom: 4px">
          iOS下载
        </mt-button>
      </div>
    </div>
</template>

<script>
    // import sharBg from "./../../assets/images/sharebg.png"
    export default {
        name: "app-down",
        data: () => ({
          sharBg:'https://resource.jtsc.club/sharebg.png'
        }),
        methods:{
        	addDown(device){
        		if(device == 'android'){
        			location.href = "https://fir.im/2mqu"
        		};
        		if(device == 'ios'){
        			location.href = "https://www.pgyer.com/3QBQ"
        		};
        	}
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/css/base.scss";
    .app_down_root{
      position: relative;
      height: 100vh;
      overflow: hidden;
      background: #F07F4B;
    }
    .sharebg{
      display: block;
    }
    .btn_group{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 80px;
      padding: 0 20px;
    }
    .share_btn{
      margin-bottom: 0.1rem;
    }
</style>
