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
      <div data-v-7891f84c=""><div class="q" id="32"><div align="" class="auto-style3"><div class="askTitle"><strong>1、血红蛋白情况</strong></div></div></div> <ul class="answerUl dhysUl"> <li><label>血液检查，血常规中血红蛋白值（Ｈｂ）<input name="32" id="32_1" class="td_input" type="number" v-model="value"><label>g/L</label></label></li></ul> <ul class="explainUl"><li><label>贫血分级标准为：</label></li> <li class="d-flex"><div><label>1.轻度贫血：</label></div><div><label>Ｈｂ男性90～120g/L，女性Ｈｂ90～110g/L；</label></div></li> <li class="d-flex"><div><label>2.中度贫血：</label></div><div><label>Ｈｂ60～90g/L；</label></div></li> <li class="d-flex"><div><label>3.重度贫血：</label></div><div><label>Ｈｂ＜60g/L。</label></div></li></ul></div>
    </div>
    <mt-button
      type="primary"
      class="theme-button fix_bottom"
      size="large"
      @click.native="save"
      >保存</mt-button>
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
            this.$Toast('请输入血红蛋白值')
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