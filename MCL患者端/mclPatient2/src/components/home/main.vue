<template>
   <div class="home padding-footer">
     <div class="logo">
       <img src="@/assets/images/home/homeLogo.png" alt="">
     </div>
     <div class="menu">
       <ul>
          <li>
           <div class="wrap">
            <router-link tag="div" to="/weight">
              <img src="@/assets/images/home/weight.png" alt="">
              <p>体重</p>
            </router-link>
           </div>
          </li>
          <li>
           <div class="wrap">
            <router-link tag="div" to="/diet">
              <img src="@/assets/images/home/diet.png" alt="">
              <p>饮食</p>
             </router-link>
           </div>
          </li>
          <li>
           <div>
             <div class="wrap">
              <router-link tag="div" to="/selfTestTool">
                <img src="@/assets/images/home/test.png" alt="">
                <p>自测</p>
              </router-link>
            </div>
           </div>
          </li>
          <li>
           <div class="wrap">
              <router-link tag="div" to="/complication">
               <img src="@/assets/images/home/zhengZhuang.png" alt="">
                <p>症状</p>
              </router-link>
           </div>
         </li>
         <li>
           <div class="wrap">
             <router-link tag="div" to="/sport">
              <img src="@/assets/images/home/sport.png" alt="">
              <p>运动</p>
             </router-link>
           </div>
         </li>
         <li>
           <div class="wrap">
             <router-link tag="div" to="/mesage">
              <img src="@/assets/images/home/keFu.png" alt="">
              <p>客服</p>
             </router-link>
           </div>
         </li>
       </ul>
     </div>
   </div>
</template>

<script>
    export default {
        name:"",
        data () {
            return {

            }
        },
        methods:{

        },
        components: {

        }
    }
</script>

<style lang="scss" scoped>
.home{
  min-height: 100vh;
  background: url("../../assets/images/home/bg.png") no-repeat -1.2rem -0.9rem;
  background-size: 4rem;
  background-color: #fff;
  box-sizing: border-box;


  .logo {
    border-bottom: 1px solid #E0E0E0;
    text-align: center;
    background: #61B1CA;
    padding: 0.02rem  0;
  }
  .logo img{
    height: 0.5rem;
    vertical-align: middle;
  }

  .menu ul{
    overflow: hidden;
  }

  li{
    flex: 1;
    width: 50%;
    padding: 0.2rem;
    float: left;
    text-align: center;
    box-sizing: border-box;
    position: relative;

    img{
      height: 0.6rem;
      vertical-align: middle;
    }

    .wrap{
      height: 1.35rem;
      background: url("../../assets/images/home/border.png") no-repeat center;
      background-size: contain;
      display: flex;
      // flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 0.18rem;
    }

    .wrap p{
      margin-top: 0.1rem;
      color: #0ac5ca;
    }
  }

  li::before{
    content: "";
    display: inline-block;
    width: 1px;
    background: #E0E0E0;
    position: absolute;
    top: 0.3rem;
    bottom: 0.3rem;
    left: 0;
  }

  li::after{
    content: "";
    display: inline-block;
    height: 1px;
    background: #E0E0E0;
    position: absolute;
    left: 0.3rem;
    right: 0.3rem;
    bottom: 0;
  }

  li:nth-child(odd)::before{
    display: none;
  }

  li:nth-child(5)::after,li:nth-child(6)::after{ 
    display: none;
  }
}
</style>
