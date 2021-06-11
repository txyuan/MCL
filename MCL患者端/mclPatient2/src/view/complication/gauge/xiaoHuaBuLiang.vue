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
      <div data-v-7891f84c="" class=""><div class="q" id="36"><div align="" class="auto-style3"><div class="askTitle"><strong>1、您现在有下列哪些症状表现？</strong></div></div></div> <ul class="answerUl"><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="1" id="checkbox361"><label for="checkbox361">上腹痛</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="2" id="checkbox362"><label for="checkbox362">上腹不适</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="3" id="checkbox363"><label for="checkbox363">上腹饱胀</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="4" id="checkbox364"><label for="checkbox364">烧心</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="5" id="checkbox365"><label for="checkbox365">反酸</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="6" id="checkbox366"><label for="checkbox366">嗳气</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="7" id="checkbox367"><label for="checkbox367">恶心</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="8" id="checkbox368"><label for="checkbox368">打嗝</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="9" id="checkbox369"><label for="checkbox369">肠鸣</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="36" value="10" id="checkbox3610"><label for="checkbox3610">排气增多</label></li></ul></div>
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
    }
  },
  computed:{
		title(){ return this.$route.query.title }
	},
  methods: {
    save(){
        const list = [...document.querySelectorAll(".form-panel input[type=checkbox]:checked")];
        if((list.length == 0)){
            this.$Toast('请选择您现在有下列哪些症状表现')
            return
        }
        let value = 0;
        list.forEach(item => value += Number(item.value));
        this.$parent.submit({value: `${value}`})
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>