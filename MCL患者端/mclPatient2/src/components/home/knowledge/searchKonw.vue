<template>
  <div class="app_content">
    <div class="header_top" style="background-color:#38c2d7;color:#fff;">
     <van-icon class="arrow-left" @click="$router.back()" name="arrow-left" />
      <!-- <form class="right" action="/"> -->
        <div class="right">
          <van-search
          class="left_search"
          v-model="value"
          background="#38c2d7"
          shape="round"
          placeholder="请输入搜索关键词"
        />
        
        </div>
      <!-- </form> -->
      <p>取消</p>
    </div>
    
    <div class="history_konw">
      <p><van-icon class="clock-o" name="clock-o" /><span>历史搜索</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchKonw",
  data() {
    return {
      value: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      // Toast("取消");
    },
  },
};
</script>
<style scoped lang='scss'>
.app_content {
  // padding: 0.1rem;
}
.header_top {
  p {
      width: 0.5rem;
      font-size: 0.16rem;
      line-height: 0.6rem;
    }
  // height: 0.44rem;
  display: flex;
  justify-content: space-between;
  .arrow-left {
    font-size: 0.26rem;
    margin-left: 0.2rem;
    // margin-right: 0.1rem;
    // width: 0.5rem;
    line-height: 0.6rem;
  }
  .right {
    flex: 1;
    
  }
  .van-search__action {
    color: #fff !important;
  }
}
.history_konw {
  padding: 0.2rem;
  margin-top: 0.1rem;
  p {
    font-size: 0.18rem;
    .clock-o {
      color: #82d0b6;
    }
    span {
    font-weight: 500;
    margin-left: 0.1rem;
  }
  }
}
</style>