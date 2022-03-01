<template>
  <div class="home">
    <mt-header
      fixed
      title="更多知识"
      style="background-color: #36c2d7; color: #fff"
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="know_list">
      <ul>
        <li v-for="item in typeList" :key="item.sKey" @click="checkOut(item)">
          <div class="left">
            <img :src="item.ImageUrl" alt="" />
            <p>{{ item.name }}</p>
          </div>
          <van-icon class="arrow" name="arrow" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "knowMore",
  data() {
    return {
      typeList: [],
    };
  },
  created() {
    this.getKnowOneList();
  },
  mounted() {},
  methods: {
     // 选择跳转
    checkOut(item) {
      if (item.PageStyle == "样式一") {
        this.$router.push(`/knowledgeOne?sKey=${item.sKey}&name=${item.name}`);
      } else {
        this.$router.push(`/knowledgeTwo?sKey=${item.sKey}&name=${item.name}`);
      }
    },
    // 获取一级列表
    getKnowOneList() {
      let url = "UserInterface/knowledge/GetKnowledgeCategoryList.ashx";
      this.$post(url).then((res) => {
        this.typeList = res.list;
      });
    },
  },
};
</script>
<style scoped lang='scss'>
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff !important;
}
.know_list {
  ul {
    margin-top: 0.2rem;
    padding: 0.2rem 0.1rem 1.6rem 0.1rem;
  }
  li {
    display: flex;
    justify-content: space-between;
    background-color: #f8f8f8;
    margin: 0.15rem 0;
    border-radius: 0.1rem;
    padding: 0.05rem 0 0.05rem 0.1rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      display: inline-block;
      vertical-align: middle;
    }
    p {
      display: inline-block;
      margin-left: 0.3rem;
    }
    .arrow {
      line-height: 0.5rem;
      color: #9a9a9c;
      margin-right: 0.2rem;
      font-size: 0.2rem;
    }
  }
}
</style>