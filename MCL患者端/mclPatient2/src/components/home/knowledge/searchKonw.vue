<template>
  <div class="app_content">
    <div class="header_top" style="background-color: #38c2d7; color: #fff">
      <van-icon class="arrow-left" @click="$router.back()" name="arrow-left" />
      <!-- <form class="right" action="/"> -->
      <div class="right">
        <div class="search-group"  @keyup.enter="onSearch">
          <input type="text" v-model="value" placeholder="请输入搜索关键字">
        </div>
      </div>
      <!-- </form> -->
      <p @click="onSearchText">搜索</p>
    </div>

    <div class="history_konw">
      <p><van-icon class="clock-o" name="clock-o" /><span>历史搜索</span></p>
      <div class="history_more">
        <ul>
          <li v-for="(item,i) in list" :key="i"  @click="searchTile(item.Title)">{{item.Title}}</li>
        </ul> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchKonw",
  data() {
    return {
      value: "",
      list : []
    };
  },
  created() {
    this.getHistory()
  },
  mounted() {},
  methods: {
    searchTile(title) {
      this.$router.push(`/searchKonwRes?title=${title}`)
    },
    // 搜索
    onSearch() {
      this.onSearchText();
    },
    onSearchText() {
      // 存储搜索历史
      let url = 'UserInterface/knowledge/InsertUserKnowledgeHistory.ashx'
      let params = {
        Tile : this.value
      }
      this.$post(url,params).then((res) => {})
      this.$router.push(`/searchKonwRes?title=${this.value}`)
    },
    // 获取历史搜索
    getHistory() {
      let url = 'UserInterface/knowledge/GetUserKnowledgeHistory.ashx'
      this.$post(url).then((res) => {
        if (res.rspcode != 1) {
          return;
        }
        this.list = res.data
      })
    }
  },
};
</script>
<style scoped lang='scss'>
.app_content {
  // padding: 0.1rem;
}
// 搜索框
.search-group{
  margin-top: 0.05rem;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
    padding: 0.08rem 0.2rem;
	  padding-left: 0.45rem;
    display: flex;
    align-items: center;
    // background: #f2f2f2;
	  // border: 1px solid #e5e5e5;
    border-radius: 0.2rem;
    background: url(../../../assets/images/searchKow.png) no-repeat 0.2rem;
    background-size: 0.16rem;
    background-color: #f8f8f8;
    input{
        flex: 1;
        border: none;
        color: #666;
        font-size: 0.14rem;
    }
    .search{
        width: 0.2rem;
        height: 0.2rem;
        margin-left: 0.1rem;
    }
}
.header_top {
  height: 0.44rem;
  p {
    width: 0.5rem;
    font-size: 0.16rem;
    line-height: 0.44rem;
    height: 0.44rem;
  }
  // height: 0.44rem;
  display: flex;
  justify-content: space-between;
  .arrow-left {
    font-size: 0.26rem;
    margin-left: 0.2rem;
    // margin-right: 0.1rem;
    // width: 0.5rem;
    line-height: 0.44rem;
  }
  .right {
    flex: 1;
  }
  .van-cell {
    line-height: 0.18rem;
  }
  .van-search {
    padding: 0 0.12rem !important;
    margin-top: 0.08rem;
  }
  .van-search__action {
    color: #fff !important;
  }
}
.history_konw {
  .history_more {
    padding: 0.1rem 0.2rem;
    color: #636365;
    ul li:nth-child(odd) {
      display: inline-block;
      white-space: nowrap;
      // width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      float: left;
      width: 40%;
      font-size: 0.14rem;
      padding: 0.05rem 0.1rem;
      text-align: center;
      border-radius: 0.6rem;
      background-color: #fff;
      margin-top: 0.1rem;
    }
    ul li:nth-child(even) {
      float: right;
      width: 40%;
      display: inline-block;
      white-space: nowrap;
      // width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.14rem;
      padding: 0.05rem 0.1rem;
      text-align: center;
      border-radius: 0.6rem;
      background-color: #fff;
      margin-top: 0.1rem;
    }
  }

  p {
    padding: 0.2rem;
    margin-top: 0.1rem;
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