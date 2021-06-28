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
        <div class="q" id="49">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>1、放射性肺炎</strong></div>
          </div>
        </div> 
        <ul class="answerUl">
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="0" id="checkbox490"><label for="checkbox490">有诊断，但较轻微无明显症状</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox491"><label for="checkbox491">偶有刺激性干咳</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox492"><label for="checkbox492">干咳，活动后加重（多数在放射治疗2～3个月后出现）</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox493"><label for="checkbox493">干咳频繁</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox494"><label for="checkbox494">伴有气喘、气急</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox495"><label for="checkbox495">伴有胸痛</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox496"><label for="checkbox496">伴有心悸、心慌</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox497"><label for="checkbox497">伴有发热</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox498"><label for="checkbox498">呼吸困难，或伴有低氧血症</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox499"><label for="checkbox499">并发支气管炎</label></li>
          <li><input type="checkbox" style=" margin-left: 6px;" name="49" value="1" id="checkbox4910"><label for="checkbox4910">并发肺气肿</label></li>
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
        const list = [...document.querySelectorAll(".form-panel input[type=checkbox]:checked")];
        if((list.length == 0)){
            this.$Toast('请选择放射性肺炎')
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