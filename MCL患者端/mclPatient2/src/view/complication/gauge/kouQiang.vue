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
      <div data-v-7891f84c="" class="">
        <div class="q" id="45">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>1、您现在口腔溃疡的严重程度</strong></div>
          </div>
        </div> 
        <ul class="answerUl">
          <li><input type="radio" name="45" value="0" id="radio450"> <label for="radio450">无症状</label></li>
          <li><input type="radio" name="45" value="1" id="radio451"><label for="radio451">黏膜充血水肿</label></li>
          <li><input type="radio" name="45" value="2" id="radio452"><label for="radio452">黏膜充血水肿点状溃疡</label></li>
          <li><input type="radio" name="45" value="3" id="radio453"><label for="radio453">黏膜充血水肿片状溃疡疼痛加剧影响进食</label></li>
          <li><input type="radio" name="45" value="4" id="radio454"><label for="radio454">黏膜大面积溃疡剧痛不能进食</label></li>
        </ul>
      </div>
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
        if((radio.length == 0)){
            this.$Toast('请选择您现在口腔溃疡的严重程度')
            return
        }
        let value = 0;
        radio.forEach(item => value += Number(item.value));
        this.$parent.submit({value: `${value}`})
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>