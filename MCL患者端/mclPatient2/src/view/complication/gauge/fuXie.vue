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
      <div data-v-7891f84c="">
        <div class="q" id="48">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>1、您现在的腹泻严重程度</strong></div>
          </div>
        </div> 
        <ul class="answerUl">
          <li><input type="checkbox" style=" margin-left: 6px;" name="48" value="0" id="checkbox480"><label for="checkbox480">没有腹泻</label></li>
          <li><input type="radio" style=" margin-left: 6px;" name="radio" value="1" id="checkbox481"><label for="checkbox481">偶尔有1次，或每天1次</label></li>
          <li><input type="radio" style=" margin-left: 6px;" name="radio" value="2" id="checkbox482"><label for="checkbox482">每天腹泻3-4次</label></li>
          <li><input type="radio" style=" margin-left: 6px;" name="radio" value="3" id="checkbox483"><label for="checkbox483">每天腹泻4-6次</label></li>
          <li><input type="radio" style=" margin-left: 6px;" name="radio" value="4" id="checkbox484"><label for="checkbox484">每天腹泻大于6次</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="48" value="1" id="checkbox485"><label for="checkbox485">水样腹泻</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="48" value="1" id="checkbox486"><label for="checkbox486">伴有其中一种症状：食欲减退、恶心、呕吐、发热</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="48" value="1" id="checkbox487"><label for="checkbox487">伴有血便</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="48" value="1" id="checkbox488"><label for="checkbox488">伴有腹痛</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="48" value="1" id="checkbox489"><label for="checkbox489">腹泻和便秘交替出现</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="48" value="1" id="checkbox4810"><label for="checkbox4810">伴有体重下降</label></li></ul></div>
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
        const radio = document.querySelectorAll(".form-panel input[type=radio]:checked")
        const list = [...document.querySelectorAll(".form-panel input[type=checkbox]:checked")];
        if((list.length == 0) && (radio.length == 0)){
            this.$Toast('请选择您现在的腹泻严重程度')
            return
        }
        let value = 0;
        list.forEach(item => value += Number(item.value));
        radio.forEach(item => value += Number(item.value));
        this.$parent.submit({value: `${value}`})
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>