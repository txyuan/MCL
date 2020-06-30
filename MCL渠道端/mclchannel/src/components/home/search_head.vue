<template>
    <div>
      <header class="header_search fix_top">
        <input type="text" placeholder="请输入搜索内容" v-model="val" @click="clickInput" readonly class="text-center seach_input">
        <img src="@/assets/images/bailingd.png" alt="" class="mesageIcon" />
      </header>
    </div>
</template>

<script>
    export default {
        name: "search_head",
        props:{
          placehold: {
            default: "请输入搜索内容"
          }
        },
        data:()=>({
           val:""
        }),
        methods:{
          clickInput(){
            this.$emit('change',this.val)
          },
          toggleMeg(){
            this.$emit('toggleMeg','show')
            this.$parent.getMsgInfo();
          }
        },
        created:function () {

        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .header_search{
    padding: 0.08rem 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #000000;
    .mesageIcon{
      width: 0.26rem;
      height: 0.26rem;
      vertical-align: middle;
      margin-left: 0.1rem;
    }
  }

  input{
    line-height: 0.28rem;
    height: 0.28rem;
    color: $color66;
    @include radio(20px);
    flex: 1;
    background: #f2f2f2;
  }

  input.seach_input{
    background-image: url("https://resource.jtsc.club/search_top_left@2x.png");
    background-repeat: no-repeat;
    background-position: 0.08rem center;
    background-size: 0.20rem;
  }
</style>
