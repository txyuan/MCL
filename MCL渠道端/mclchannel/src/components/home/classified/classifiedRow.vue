<template>
  <div class="classified_wrap">
       <ul>
         <router-link tag="li" to="" style="margin-right: 0.025rem">
           <img src="@/assets/images/lianxikefu@2x.png" alt="" @click="showkf">
					 <p>联系客服</p>
         </router-link>
         <router-link tag="li" to="/myAssets" style="margin-left: 0.025rem">
           <img src="@/assets/images/myzic.png" alt="">
					 <p>我的资产</p>
         </router-link>
				 <router-link tag="li" to="" style="margin-right: 0.025rem">
						<img src="@/assets/images/ggdetail.png" alt="" @click="toggleMeg">
						<p>公告详情</p>
				 </router-link>
				 <router-link tag="li" to="/BusinSchool" style="margin-left: 0.025rem">
				   <img src="@/assets/images/shanguni.png" alt="">
					 <p>商学院</p>
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
					toggleMeg(){
					  this.$emit('toggleMeg','show');
					  this.$parent.getMsgInfo();
					},
					showkf(){
						this.$parent.linkf();
					}
        },
    }
</script>

<style scoped lang="scss">
  .classified_wrap{
    margin: 0.1rem 0 0.04rem 0;
    box-sizing: border-box;
  }
  ul{
    display: flex;
    li{
      flex: 1;
      background: #ffffff;
      padding: 0.05rem 0.12rem 0.09rem 0.12rem;
      img{
        width: 80%;
				margin-left: 10%;
      }
			p{
				font-size: 0.14rem;
				margin-top: 0.06rem;
				text-align: center;
			}
    }
  }
</style>
