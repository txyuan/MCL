<template>
    <div>
      <div @click="goback" class="back_btn">
           <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: "header-back",
        methods:{
          goback(){
            this.$router.back()
          }
        }
    }
</script>
<style scoped>
  .back_btn{
    display: inline-block;
  }
</style>
