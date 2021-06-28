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
        <div class="q" id="44">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>1、您现在便秘的严重程度</strong></div>
          </div>
        </div> 
        <ul class="answerUl">
          <li><input type="checkbox" style=" margin-left: 6px;" name="44" value="0" id="checkbox440"><label for="checkbox440">没有便秘情况</label></li>
          <li><input type="radio" style=" margin-left: 6px;" name="44" value="1" id="radio441"><label for="radio441">2天解便一次，伴有大便轻度干结，或每天一次伴有大便严重干结</label></li>
          <li><input type="radio" style=" margin-left: 6px;" name="44" value="2" id="radio442"><label for="radio442">3天解便一次，伴有大便轻度干结</label></li>
          <li><input type="radio" style=" margin-left: 6px;" name="44" value="3" id="radio443"><label for="radio443">2-3天解便一次，伴有大便干结</label></li>
          <li><input type="radio" style=" margin-left: 6px;" name="44" value="4" id="radio444"><label for="radio444">4天及以上解便一次</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="44" value="1" id="checkbox445"><label for="checkbox445">伴有腹痛</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="44" value="1" id="checkbox446"><label for="checkbox446">伴有腹胀</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="44" value="1" id="checkbox447"><label for="checkbox447">大便软，但自感排便困难</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="44" value="2" id="checkbox448"><label for="checkbox448">必须依靠开塞露等药物才能解便</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="44" value="1" id="checkbox449"><label for="checkbox449">便秘时间超过半年</label></li>
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
        const list = [...document.querySelectorAll(".form-panel input[type=checkbox]:checked")];
        if((list.length == 0) && (radio.length == 0)){
            this.$Toast('请选择您现在便秘的严重程度')
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