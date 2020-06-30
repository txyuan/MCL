<template>
    <div>
      <div class="myc_chose">
        <p>选择收货地址</p>
        <span></span>
      </div>
      <div class="myc_adul">
        <div class="myc_adlist">
          <span class="myc_actv myc_actve"></span>
          <div class="myc_acont">
            <p>
              <span>王小二</span>
              <i>18237462038</i>
              <label class="mra">默认</label>
            </p>
            <u>天津市河西区香年广场A座801</u>
          </div>
        </div>
        <div class="myc_adlist">
          <span class="myc_actv"></span>
          <div class="myc_acont">
            <p>
              <span>王小二</span>
              <i>18237462038</i>
              <label>默认</label>
            </p>
            <u>天津市河西区香年广场A座801</u>
          </div>
        </div>
        <div class="myc_adlist">
          <span class="myc_actv"></span>
          <div class="myc_acont">
            <p>
              <span>王小二</span>
              <i>18237462038</i>
              <label>默认</label>
            </p>
            <u>天津市河西区香年广场A座801</u>
          </div>
        </div>
        <p class="myc_addadrs">
          +添加地址
        </p>
      </div>
      <span class="myc_okbtn">确定</span>
    </div>
</template>

<script>
    export default {
        name: "adress"
    }
</script>

<style scoped>
.myc_chose{
  width: 100%;
  height: 0.44rem;
  border-bottom: 1px solid #EEEEEE;
  position: relative;
}
.myc_chose p{
  text-align: center;
  line-height: 0.45rem;
  font-size: 0.15rem;
  color: #666;
}
.myc_chose span{
  display: block;
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  right: 3%;
  top: 0.12rem;
  background: url("./../../../assets/images/bianji_car_quxiao@2x.png") no-repeat center center;
  background-size: 0.14rem 0.14rem;
}
.myc_adul{
  height: 3.0rem;
  overflow-y: auto;
}
.myc_adlist{
  overflow: hidden;
  height: 0.7rem;
  border-bottom: 1px solid #eee;
  background: url("https://resource.jtsc.club/jiantou_right_h@2x.png") no-repeat 97% center;
  background-size: 0.24rem 0.24rem;
}
  .myc_adlist .myc_actv{
    width: 0.44rem;
    height: 0.7rem;
    display: block;
    float: left;
    background: url("https://resource.jtsc.club/select@2x.png") no-repeat center center;
    background-size: 0.18rem 0.18rem;
  }
.myc_adlist .myc_actv.myc_actve{
  background: url("https://resource.jtsc.club/select_click@2x.png") no-repeat center center;
  background-size: 0.18rem 0.18rem;
  }
.myc_acont p{
  overflow: hidden;
  font-size: 0.15rem;
  color: #333;
  margin-top: 0.13rem;
}
.myc_acont p i{
  font-style: normal;
  margin-left: 0.1rem;
}
.myc_acont p label{
  width: 0.5rem;
  height: 0.18rem;
  border: 1px solid #FF3D3D;
  font-size: 0.12rem;
  color: #FF3D3D;
  text-align: center;
  line-height: 0.19rem;
  display: block;
  float: right;
  display: none;
  margin-right: 0.4rem;
}
.myc_acont p label.mra{
  display: block;
}
.myc_acont u{
  text-decoration: none;
  font-size: 0.13rem;
  color: #666;
  margin-top: 0.07rem;
  display: block;
}
  .myc_addadrs{
    font-size: 0.15rem;
    color: #FF3D3D;
    text-align: center;
    line-height: 0.36rem;
  }
  .myc_okbtn{
    width: 88%;
    background: #FF3D3D;
    height: 0.4rem;
    display: block;
    text-align: center;
    line-height: 0.4rem;
    color: #FFFFFF;
    font-size: 0.16rem;
    position: absolute;
    border-radius: 0.2rem;
    margin: 0 auto;
    left: 50%;
    margin-left: -44%;
    bottom: 0.2rem;
  }
</style>
