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
        <div class="q" id="11">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>1、恶心情况</strong></div>
          </div>
        </div> 
        <ul class="answerUl">
          <li><input type="radio" name="radio1" value="0" id="radio110" title="没有恶心"><label for="radio110">没有恶心</label></li>
          <li><input type="radio" name="radio1" value="1" id="radio111" title="有恶心、偶尔"><label for="radio111">有恶心、偶尔</label></li>
          <li><input type="radio" name="radio1" value="2" id="radio112" title="多次恶心，一天小于等于三次"><label for="radio112">多次恶心，一天小于等于三次</label></li>
          <li><input type="radio" name="radio1" value="3" id="radio113" title="频繁恶心，一天大于三次或一见到食物就恶心"><label for="radio113">频繁恶心，一天大于三次或一见到食物就恶心</label></li>
        </ul>

        <div class="q" id="12">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>2、呕吐情况</strong></div>
          </div>
        </div> 
        <ul class="answerUl">
          <li><input type="radio" name="radio2" value="0" id="radio120" title="没有呕吐情况"><label for="radio120">没有呕吐情况</label></li>
          <li><input type="radio" name="radio2" value="1" id="radio121" title="有呕吐偶有1次"><label for="radio121">有呕吐偶有1次</label></li>
          <li><input type="radio" name="radio2" value="2" id="radio122" title="有呕吐，每天一次"><label for="radio122">有呕吐，每天一次</label></li>
          <li><input type="radio" name="radio2" value="3" id="radio123" title="多次呕吐，一天大于2次"><label for="radio123">多次呕吐，一天大于2次</label></li>
          <li><input type="radio" name="radio2" value="4" id="radio124" title="频繁呕吐，或每次进食都出现呕吐"><label for="radio124">频繁呕吐，或每次进食都出现呕吐</label></li>
        </ul>

        <div class="q" id="37">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>3、恶心或呕吐情况对吃饭进食的影响程度</strong></div>
          </div>
        </div> 
        <ul class="answerUl">
          <li><input type="radio" name="radio3" value="0" id="radio370" title="一般，影响不大"><label for="radio370">一般，影响不大</label></li>
          <li><input type="radio" name="radio3" value="1" id="radio371" title="有影响，能进食软食"><label for="radio371">有影响，能进食软食</label></li>
          <li><input type="radio" name="radio3" value="2" id="radio372" title="有影响，能进食流质食物"><label for="radio372">有影响，能进食流质食物</label></li>
          <li><input type="radio" name="radio3" value="3" id="radio373" title="非常严重，导致进食很困难"><label for="radio373">非常严重，导致进食很困难</label></li>
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
        if((radio.length < 3)){
            this.$Toast('请选择恶心呕吐')
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