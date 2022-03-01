<template>
  <div class="home">
    <mt-header title="" fixed class="mt_header">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>

    <!-- 图片 -->
    <div class="content_img">
      <img src="@/assets/images/home/userInfo.png" alt="" />
    </div>

    <div class="bot_content">
      <div class="title">
        <p>让我们在几分钟内了解您的基本信息</p>
        <p>我们会为您提供</p>
        <p>一份个性化定制的健康方案</p>
      </div>
      <div class="down">
        <img src="@/assets/images/home/downInfo.png" alt="" />
      </div>
      <div style="height: 1rem; background-color: #fff">
        <div class="btn">
          <van-button class="btn_info" round type="info" @click="goInfo">开始填写</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goInfo() {
      this.$router.push('/personInfo1')
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
.mt_header {
  background-color: #fff;
  border: 0;
}
.content_img {
  padding-top: 0.7rem;
  width: 100%;
  height: 3rem;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
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
    .van-button {
      width: 80% !important;
      background: linear-gradient(to left, #38c2d7, #51e4f7);
      border: 0;
    }
  }
}
</style>