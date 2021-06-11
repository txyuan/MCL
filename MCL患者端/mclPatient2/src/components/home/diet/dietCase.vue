<template>
    <div class="diet-root">
    <div class="padding-header" style="background-color: #f1f1f1">
      <mt-header title="饮食处方" fixed class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <!-- 内容 -->
      <div class="neirong">
        <!-- 饮食方案 -->
        <cases/>
      </div>
    </div>
  </div>
</template>

<script>
import cases from "./tabs/case.vue";
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    created() {

    },
    mounted() {
    },
    components:{
      cases
    }
}
</script>
<style scoped lang='scss'>
@import "./tabs/index.scss";
</style>