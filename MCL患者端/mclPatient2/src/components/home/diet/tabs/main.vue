<template>
    <div class="diet-root">
    <div id="" style="padding-top:0.93rem; background-color: #f6f6f9">
      <!-- <mt-header title="饮食" fixed>
        <div slot="left">
          <router-link to="/wx_Entrance/home" style="color: inherit;">
            <mt-button icon="back"></mt-button>
          </router-link>
        </div>
      </mt-header> -->
      <mt-header title="饮食" fixed class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <!-- mt-navbar -->
      <div id="navbar" class="fix_top" style="top: 0.48rem;">
        <mt-navbar v-model="ABflag">
          <mt-tab-item v-for="(item,index) in navbarList" :key="`tab_${index}`"
                       :class="(ABflag == item.type)&&'is-selected'"
                       @click.native="toggleType(item)">
            <p>{{item.name}}</p>
          </mt-tab-item>
        </mt-navbar>
      </div>

      <!-- 内容 -->
      <div class="neirong">
        <!-- 今日饮食 -->
        <todayDiet v-show="ABflag == 1"/>
        
        <!-- 饮食方案 -->
        <cases v-show="ABflag == 2"/>

        <!-- 饮食建议 -->
        <complication v-show="ABflag == 3"/>
      </div>
    </div>
  </div>
</template>

<script>
import cases from "./case.vue";
import todayDiet from "./todayDiet.vue";
import complication from "./complication.vue";
export default {
    data() {
        return {
            ABflag: 1,
            navbarList: [{name: '今日饮食', type: 1}, {name: '饮食处方', type: 2}, {name: '饮食建议', type: 3}],
        }
    },
    methods: {
        toggleType (item) {
            this.ABflag = item.type
        }
    },
    created() {

    },
    mounted() {
      if (this.$route.query.ABflag == 2) {
        this.ABflag = 2
      }
    },
    components:{
      cases,
      todayDiet,
      complication
    }
}
</script>
<style scoped lang='scss'>
@import "./index.scss";
</style>