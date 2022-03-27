<template>
  <div class="PG-SGA-root padding-header padding-footer">
    <mt-header title="筛查评估" fixed class="borderBottom">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <van-tabs v-model="active">
  <van-tab :title="title"></van-tab>
  
</van-tabs>
     <swiper :options="swiperOption">
      <swiper-slide v-for="(item,i) of imgList" :key="i">
              <img class="slide-img" :src="item.picUrl"/>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
 export default {
    // 注册组件
    components: {
      swiper,
      swiperSlide

    },
    data() {
      return {
        active : '',
        title : '',
        // 图片列表
        imgList: [{
          'picUrl': '@/assets/images/home/homeTop.png'
        }, {
          'picUrl': '@/assets/images/home/homeTop.png'
        },
        {'picUrl': '@/assets/images/home/homeTop.png'}],
        // 配置属性
        swiperOption: {
          direction: 'horizontal', // 滑动的方向(水平方向)
          loop: true, // 是否循环
          // autoplay: {
          //   delay: 1500 // 自动播放的时长
          // },
          touchRatio: 2,
          slidesPerView: 'auto', // 设置可视区一共显示几张图片,设置auto,设置auto为自适应;
          centeredSlides: true, // 设置为true时,带有active-slide类名的图片会居中
          spaceBetween: -10, //  每张图片之间的间隔
          on: {
    slideChangeTransitionStart : () => {
      // alert(this.activeIndex);
    this.changeGauge()
    },
  },
        }
      }
    },
    methods : {
      changeGauge() {
        // console.log(i);
        this.$nextTick(() => {
          let active = document.querySelector('.swiper-slide-active')
          console.log(active);
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
.swiper-slide{
  width: 2rem;
  height: 1.8rem;
  img{
    width:100%;
    height:100%;
  }
}
// 如果想要两边的图片显示时缩小加上一下css代码
// 默认中间的图片会带有类名 : .swiper-slide-acive;
// 默认中间的图片的上一张图片会带有类 名:  .swiper-slide-prev ;
// 默认中间的图片的下一张会带有类名: .swiper-slide-next ;.
.swiper-slide-next{
  transform: scale(.7);
}
.swiper-slide-prev{
  transform: scale(.7);
}
</style>