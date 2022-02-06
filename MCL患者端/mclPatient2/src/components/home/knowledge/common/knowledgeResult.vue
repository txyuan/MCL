<template>
  <div>
    <mt-header :title="$route.query.Title" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="content" v-html="data.Memo">
      
    </div>
    <div class="btn">
      <van-button v-if="this.data.LinkAddress"  type="primary" size="small" @click="linkAddres">立即查看</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name : 'knowledgeResult',
  data() {
    return {
      param: {
        skey: this.$route.query.sKey
      },
      data : {}
    }
  },
  created() {
this.getInfoData()
  },
  methods : {
    // 立即查看按钮跳转
    linkAddres() {
      window.location.href = this.data.LinkAddress
    },
    getInfoData() {
       let url = 'UserInterface/knowledge/GetKnowledgeDetails.ashx'
       this.$post(url, this.param).then((res) => {
        if (res.rspcode != 1) {
          return;
        }
        this.data = res.data
      });
    }
  }

}
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 0.1rem;
  margin-top: 0.4rem;
  
  }
.content>>> img {
  width: 100%;
  /* margin: 0.1rem 0; */
  /* height: 4rem; */
}
.content>>> p {
  line-height: 0.3rem;
}
.btn {
  width: 100%;
  padding-left:0.5rem;
   padding-bottom:0.2rem;
   margin-top: -0.3rem;
   background-color: #fff;
}
</style>