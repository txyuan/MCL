<template>
    <div>
      <mt-header title="积分专享">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="record_list">
        <div class="record_item" v-for="(item,index) in items">
          <span>{{item.times}}</span>
          <p>{{item.cont}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data:()=>({
          items: [
            { times:'2018.04.20 12:37',cont:'运气简直爆棚啦！恭喜您！抽中了某某某奖品，快去看看吧！' },
            { times:'2018.04.20 12:37',cont:'运气简直爆棚啦！恭喜您！抽中了某某某奖品，快去看看吧！' },
            { times:'2018.04.20 12:37',cont:'很遗憾，您没抽到任何奖品！洗洗手再来试试吧，祝您好运连连！' },
            { times:'2018.04.20 12:37',cont:'运气简直爆棚啦！恭喜您！抽中了某某某奖品，快去看看吧！' },
          ]
        })
    }
</script>

<style scoped>
  .record_list{
    width: 94%;
    margin: 0 auto;
  }
  .record_item{
    background: #fff;
    margin-top: 0.1rem;
    padding-bottom: 0.08rem;
  }
  .record_item span{
    display: block;
    width: 94%;
    margin: 0 auto;
    font-size: 0.14rem;
    color: #606060;
    padding-top: 0.1rem;
  }
  .record_item p{
    display: block;
    width: 94%;
    margin: 0 auto;
    font-size: 0.15rem;
    color: #333;
    line-height: 0.24rem;
    padding-top: 0.07rem;
  }
</style>
