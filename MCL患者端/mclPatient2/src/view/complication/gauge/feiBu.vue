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
      <div data-v-7891f84c="" class=""><div class="q" id="53"><div align="" class="auto-style3"><div class="askTitle"><strong>1、肺部感染</strong></div></div></div> <ul class="answerUl"><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="0" id="checkbox530"><label for="checkbox530">无明显症状</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="1" id="checkbox531"><label for="checkbox531">呼吸困难</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="2" id="checkbox532"><label for="checkbox532">发热，持续时间长</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="3" id="checkbox533"><label for="checkbox533">高热</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="4" id="checkbox534"><label for="checkbox534">咳嗽</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="5" id="checkbox535"><label for="checkbox535">气喘</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="6" id="checkbox536"><label for="checkbox536">咳痰，量少</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="7" id="checkbox537"><label for="checkbox537">咳痰，偶有量多</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="8" id="checkbox538"><label for="checkbox538">咳痰，自感量多，但咳不出</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="9" id="checkbox539"><label for="checkbox539">咳痰，痰液粘稠</label></li><li><input type="checkbox" style=" margin-left: 6px;" name="53" value="10" id="checkbox5310"><label for="checkbox5310">半年内多次肺部感染（2次以上）</label></li></ul></div>   
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
            this.$Toast('请选择肺部感染')
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