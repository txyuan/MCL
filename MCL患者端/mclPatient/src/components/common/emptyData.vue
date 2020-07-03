<template>
    <div>
      <div class="noDataImg">
        <img src="@/assets/images/emptyimg.png" class="noData">
        <p class="text-center">{{text}}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "empty-data",
        props:{
          text:{
            default:"抱歉，暂无数据…"
          }
        }
    }
</script>

<style scoped>
  .noDataImg {
    margin-top: 60px;
    font-size: 13px;
  }
  .noDataImg img {
    width: 160px;
    margin: 0 auto;
    margin-bottom: 10px;
    display: block;
  }
  .noDataImg p{
	  padding-top: 0.16rem;
	  font-size: 0.13rem;
  }
</style>
