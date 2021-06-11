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
        <div class="q" id="18">
          <div align="" class="auto-style3">
            <div class="askTitle"><strong>1、睡眠是否有障碍？</strong></div>
          </div>
        </div>
        <ul class="answerUl">
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="0"
              id="checkbox180"
            /><label for="checkbox180">没有</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="1"
              id="checkbox181"
            /><label for="checkbox181">睡眠节律紊乱</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="2"
              id="checkbox182"
            /><label for="checkbox182">入睡困难</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="3"
              id="checkbox183"
            /><label for="checkbox183">早醒</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="4"
              id="checkbox184"
            /><label for="checkbox184">多梦</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="5"
              id="checkbox185"
            /><label for="checkbox185">睡眠浅，易醒</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="6"
              id="checkbox186"
            /><label for="checkbox186">醒后不易睡着</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="7"
              id="checkbox187"
            /><label for="checkbox187">睡后有疲惫感</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="8"
              id="checkbox188"
            /><label for="checkbox188">睡眠时间小于6小时</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="9"
              id="checkbox189"
            /><label for="checkbox189">伴有头痛、头晕等症状</label>
          </li>
          <li>
            <input
              type="checkbox"
              style="margin-left: 6px"
              name="18"
              value="10"
              id="checkbox1810"
            /><label for="checkbox1810">睡眠障碍时间超过1周</label>
          </li>
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
        if(list.length == 0){
            this.$Toast('请选择睡眠是否有障碍')
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