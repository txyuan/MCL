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
      <div data-v-7891f84c="" class=""><div class="q" id="50"><div align="" class="auto-style3"><div class="askTitle"><strong>1、血小板情况</strong></div></div></div> <ul class="answerUl"> <li><label>血液检查，血常规中血小板计数</label><input name="50_1" id="50_1" class="td_input " type="number" v-model="value"><label>10<sup>9</sup>/L</label></li></ul></div>
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
            this.$Toast('请输入血小板情况')
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