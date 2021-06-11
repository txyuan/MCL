<template>
  <div class="padding-header padding-footer page-bg-white">
    <mt-header :title="title" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>

    <div class="form-panel">
      <div data-v-7891f84c="" class=""><div class="q" id="54"><div align="" class="auto-style3"><div class="askTitle"><strong>1、低蛋白血症</strong></div></div></div> <ul class="answerUl"> <li><label>血液检查，生化中血清白蛋白</label><input name="54_1" id="54_1" class="td_input " type="number" v-model="value"><label>g/L</label></li></ul></div>
    </div>
    <mt-button
      type="primary"
      class="theme-button fix_bottom"
      size="large"
      @click.native="save"
      >保存</mt-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    }
  },
  computed:{
		title(){ return this.$route.query.title }
	},
  watch:{
      value(value){
          this.$nextTick(() => {
              this.value = value.toString().replace(/[^\d.]/g,'')
          })
      }
  },
  methods: {
    save(){
        const {value} = this
        if(!value){
            this.$Toast('请输入白蛋白值')
            return
        }
        this.$parent.submit({value: `${value}`})
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>