<template>
  <div class="padding-header page-bg-hui">
    <mt-header :title="$route.query.name" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="tool">
      <div class="tool-title" style="font-size:0.24rem"><span>{{title}}</span></div>
      <div class="tool-list">
        <ul>
            <!-- <li v-for="(item, index) in list" :key="index" @click="$router.push({name: 'selfTestDetail', query:{type: item.PageUrl, skey: item.sKey, SubjectName: item.SubjectName}})"> -->
            <li v-for="(item, index) in list" :key="index" @click="detailFN(item)">
              <div class="box">
                <p class="item-title">{{item.Title}}</p>
                <p class="item-des">{{item.Subtitle}}</p>
                <i class="item-icon">查看</i>
              </div>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     param: {
        SubjectTypeSkey: this.$route.query.sKey
      },
      list: [],
      title : ''
    }
  },
  methods:{
    detailFN(item){
      this.$router.push(`/knowledgeResult?sKey=${item.sKey}&Title=${item.Title}`)
    },
    
    getKonwList() {
      let url = "UserInterface/knowledge/GetBusSubjectKnowledgeList.ashx";
      this.$post(url, this.param).then((res) => {
        if (res.rspcode != 1) {
          return;
        }
        this.title = res.group[0].name
        this.list = res.group[0].data;
      });
    },
  },
  created(){
    this.getKonwList()
  }
}
</script>

<style scoped lang="scss">
.banner{
    margin: 0.15rem;
    margin-top: -0.5rem;
    margin-bottom: 0.2rem;
    background: #fff;
    border-radius: 0.08rem;
    overflow: hidden;
    position: relative;
    z-index: 10;
    .note{
        padding: 0.1rem;
        padding-top: 0.15rem;
        box-sizing: border-box;
    }
    .note-title{
        // font-weight: bold;
        padding-bottom: 0.05rem;
    }
    .note-view{
        font-size: 14px;
        padding-left: 0.15rem;
        height: 96px;
        min-height: 96px;
        overflow: hidden;
    }
    .note-view.auto{
      height: auto;
    }
    .note-icon{
      text-align: center;
      font-size: 0.12rem;
      color: #999;
      padding: 0.1rem;
      padding-bottom: 0;
      &::before{
        content: "展开";
        vertical-align: middle;
      }
      &::after{
        content: "";
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        background: url("~@/assets/images/Shape@2x.png") no-repeat right center;
        background-size: 0.2rem;
        vertical-align: middle;
      }
    }
    .note-icon.open {
      &::before{
        content: "关闭";
      }
      &::after{
        transform:rotate(180deg);
      }
    }
    img{display: block;}
}


// 自测工具
.tool {
  margin: 0.15rem;
  border-radius: 0.08rem;
}
.tool-title {
  line-height: 0.55rem;
  // font-weight: bold;
  padding: 0 0.1rem;
}
.tool-title span,.note-title span {
  margin-left: 0.1rem;
}

.tool-list ul {
  overflow: hidden;
  padding: 0 0.05rem;
  padding-bottom: 0.05rem;
  margin-top: -0.05rem;
  li {
    float: left;
    width: 50%;
    padding: 0.05rem;
    box-sizing: border-box;
  }
  li .box {
    text-align: left;
    background: #F0F4FD;
    border-radius: 0.05rem;
    // height: 0.9rem;
    height: 1.1rem;
    font-size: 0.16rem;
    padding: 0.15rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .item-title{
    margin-bottom: 0.02rem;
  }
  .item-des{
    font-size: 0.12rem;
    color: #666;
    height: 0.32rem;
    margin-bottom: 0.05rem;
  }
  .item-icon{
    width: 0.36rem;
    padding: 0.02rem 0;
    border-top-left-radius: 0.09rem;
    border-bottom-right-radius: 0.09rem;
    font-size: 0.12rem;
    text-align: center;
    font-style: normal;
    color: #fff;
    display: block;
    background: #0ac5ca;
  }
}

.tool-list ul li:nth-child(2) .item-icon{
  background: #E8BA44;
}
.tool-list ul li:nth-child(3) .item-icon{
  background: #E16968;
}
.tool-list ul li:nth-child(4) .item-icon{
  background: #5FC375;
}
.tool-list ul li:nth-child(5) .item-icon{
  background: #916CD5;
}
.tool-list ul li:nth-child(6) .item-icon{
  background: #6BA0F5;
}
</style>