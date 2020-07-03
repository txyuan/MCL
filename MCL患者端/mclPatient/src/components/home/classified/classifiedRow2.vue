<template>
  <div class="classified_wrap">
       <ul>
         <router-link tag="li" to="/diet" style="margin-right: 0.025rem">
           <img src="@/assets/images/饮食@2x.png" alt="">
					 <p>饮食</p>
         </router-link>
         <router-link tag="li" to="/nutrition" style="margin-left: 0.025rem">
           <img src="@/assets/images/午餐@2x.png" alt="">
					 <p>营养</p>
         </router-link>
				 <router-link tag="li" to="/sport" style="margin-right: 0.025rem">
						<img src="@/assets/images/晚餐@2x.png" alt="">
						<p>运动</p>
				 </router-link>
				 <router-link tag="li" to="/mood" style="margin-right: 0.025rem">
						<img src="@/assets/images/加餐@2x(1).png" alt="">
						<p>心情</p>
				 </router-link>
				 <router-link tag="li" to="/weight" style="margin-left: 0.025rem">
				   <img src="@/assets/images/加餐@2x.png" alt="">
					 <p>体重</p>
				 </router-link>
       </ul>
  </div>
</template>

<script>
    export default {
        name: "classified-row",
        data:()=>({

        }),
        methods:{
        	
        },
    }
</script>

<style scoped lang="scss">
  .classified_wrap{
    box-sizing: border-box;
    background: #FFFFFF;
    padding-top: 0.13rem;
    padding-bottom: 0.13rem;
    .name{
    	line-height: 0.44rem;
    	padding: 0 0.12rem;
    }
  }
  ul{
    display: flex;
    justify-content: space-between;
    padding: 0 0.12rem;
    li{
      /*flex: 1;*/
      background: #ffffff;
      text-align: center;
      img{
        width: 0.48rem;
        display: block;
      }
			p{
				font-size: 0.13rem;
				/*margin-top: 0.06rem;*/
				color: #636768;
			}
    }
  }
</style>
