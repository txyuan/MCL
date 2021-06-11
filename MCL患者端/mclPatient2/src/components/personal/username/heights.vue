<template>
    <div class="username-root">
      <mt-header title="修改身高">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>

      <mt-field placeholder="请输入身高(cm)" type="number" v-model.trim="heights" class="marginTop5"></mt-field>

      <div class="btn">
         <mt-button type="danger" size="large" @click="userEdit">确定</mt-button>
      </div>

    </div>
</template>

<script>
export default {
  name: 'heights',
  data: () => ({
    heights: ''
  }),
  methods: {
    // 个人信息
    information () {
      let url = 'UserInterface/GetUserShowInfo.ashx'
      this.$post(url).then((data) => {
        this.heights = data.data.height
      })
    },
    userEdit () {
      let url = 'UserInterface/UserEdit.ashx'
      let height = this.heights
      if (height == '') {
        this.$Toast('身高不能为空')
        return
      }
      this.$post(url, {height}).then((data) => {
        this.$Toast(data.rspdesc)
        if (data.rspcode == 1) {
          this.$router.back()
        }
      })
    }
  },
  mounted () {
    this.information()
  }
}
</script>

<style>
.username-root input{
  border: none;
}
.username-root .btn{
  margin: 0 0.10rem;
  margin-top: 0.80rem;
}
</style>
