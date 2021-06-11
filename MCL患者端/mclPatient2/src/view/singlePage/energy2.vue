<template>
  <div class="page">
      <div class="panel">
          <mt-button type="primary" class="title button-radio" size="large">每日实际摄入能量</mt-button>
          <p class="radio-title">请选择您目前的身体状态</p>
          <div class="radio—item" v-for="item in list" :key="item.id" @click="currentId = item.id">
              <span class="radio" :class="{'checked': item.id == currentId}"></span>
              <div class="content">
                  <div class="label">{{item.label}}</div>
              </div>
          </div>
          
          <mt-button type="primary" class="blue-button" size="large">确&nbsp;&nbsp;定</mt-button>

          <div class="note">
              <div>您每日所需能量为</div>
              <div style="letter-spacing: 2px;"><span>3000</span>kcal/kg.d</div>
              
          </div>
          <div class="link">
              <a href="">立即补充营养</a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        currentId: "-1",
        list: [
            {id: "0", label: "卧床患者"},
            {id: "1", label: "每天可以在病房走动"},
            {id: "2", label: "自由活动"},
        ]
    })
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
.radio—item .label{
    margin-top: 0.05rem;
    line-height: 0.24rem;
}
</style>