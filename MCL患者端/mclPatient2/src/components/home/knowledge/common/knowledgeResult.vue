<template>
  <div style="background-color: #fff;">
    <mt-header :title="$route.query.Title" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <h5>{{ data.Title }}</h5>
    <div class="li_top">
      <div class="left_img">
        <img :src="data.platformLogo" alt="" />
        <span>{{ data.platformName }}</span>
        <!-- <span>{{data.}}</span> -->
      </div>
      <p>{{ data.create_time }}</p>
    </div>
    <div class="content" v-html="data.Memo"></div>
    <div class="btn">
      <van-button
      class="btn_bottom"
        v-if="this.data.LinkAddress"
        type="primary"
        size="small"
        @click="linkAddres"
        >立即查看</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "knowledgeResult",
  data() {
    return {
      param: {
        skey: this.$route.query.sKey,
      },
      data: {},
    };
  },
  created() {
    this.getInfoData();
  },
  methods: {
    // 立即查看按钮跳转
    linkAddres() {
      window.location.href = this.data.LinkAddress;
    },
    getInfoData() {
      let url = "UserInterface/knowledge/GetKnowledgeDetails.ashx";
      this.$post(url, this.param).then((res) => {
        if (res.rspcode != 1) {
          return;
        }
        this.data = res.data;
      });
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 0.1rem;
  
}
h5 {
  margin-top: 0.4rem;
  padding: 0.2rem;
  font-size: 0.16rem;
}
.content >>> img {
  width: 100%;
  /* margin: 0.1rem 0; */
  /* height: 4rem; */
}
.content >>> p {
  line-height: 0.3rem;
}
.btn {
   margin-top: -0.3rem;
}
.btn .btn_bottom {
  margin-left: 0.5rem;
}
.li_top {
  padding: 0.1rem;
  display: flex;
  justify-content: space-between;
}
.li_top img {
  width: 0.2rem;
  height: 0.2rem;
  display: inline-block;
  vertical-align: middle;
}
.li_top span {
  display: inline-block;
}
.li_top p {
  color: #9a9a9c;
  font-size: 0.12rem;
  line-height: 0.26rem;
}
</style>