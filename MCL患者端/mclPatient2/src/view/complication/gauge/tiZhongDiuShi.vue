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
        <div class="q" id="31">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>1、体重情况</strong></div>
          </div>
        </div> 
        <ul class="answerUl"> 
          <li><label>现在体重</label><input name="31_1" id="31_1" class="td_input " type="number" v-model.trim="value"><label>kg（每次测量时，穿的衣物相差不多，进食情况基本相等）</label></li>
          <li><label>一个月前的体重</label><input name="31_1" id="31_1" class="td_input " type="number" v-model.trim="value2"><label>kg</label></li>
          <li><label>六个月前的体重</label><input name="31_1" id="31_1" class="td_input " type="number" v-model.trim="value3"><label>kg</label></li>
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
      value: "",
      value2: "",
      value3: "",
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
      },
      value2(value){
          this.$nextTick(() => {
              this.value2 = value.toString().replace(/[^\d.]/g,'')
          })
      },
      value3(value){
          this.$nextTick(() => {
              this.value3 = value.toString().replace(/[^\d.]/g,'')
          })
      },
  },
  methods: {
    save(){
        const {value, value2, value3} = this
        if(!value){
            this.$Toast('请输入现在体重')
            return
        }
        if(!value2 && !value3){
            this.$Toast('请输入一个月前的体重或者六个月前的体重')
            return
        }
        this.$parent.submit({value: `${value},${value2 == "" ? 0 : value2},${value3 == "" ? 0 : value3}`})
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
.form-panel .answerUl li{
  label{
    margin-left: 0;
  }
}
</style>