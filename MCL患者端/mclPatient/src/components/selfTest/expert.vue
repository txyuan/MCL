<template>
  <div class="selfTestRoot">
  	  <mt-header title="MCL专家栏" fixed>
  	 		<div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
  	  </mt-header>
  		<div id="body_main">
  			<ul class="selfTest">
  				<li v-for="(item,index) in expertColumn" :key="index">
					<router-link :to="`/expertDetail/`+item.sKey">
						<img :src="item.ColumnImg" class="showPic"/>
						<div class="tit">
							<!-- <img src="@/assets/images/jinxingzhong@2x.png" class="icon" width="15"/> -->
							<span class="font16" style="height: 0.46rem;display: block;">{{item.ColumnName}}</span>
							<span class="font14 personNum">{{item.PlaybackVolume}}人浏览过</span>
						</div>
					</router-link>
  				</li>
  			</ul>
  		</div>
  </div>
</template>

<script>
    export default {
        name: "selfTest",
        data:()=>({
			expertColumn:[]
        }),
        methods:{
        	expert(){
        		let url = "UserInterface/PatientHomePageExpert.ashx";
        		this.$post(url).then((data)=>{
        	     if(data.rspcode != 1 ){
        	       return;
        	     }
        	     this.expertColumn = data.data;
        	   })
        	},
        },
		mounted(){
				this.expert()
		}
    }
</script>

<style scoped lang="scss">
  .selfTest{
  	padding: 0 0.20rem;
  	li{
  		margin-top: 0.15rem;
  		// border-radius: 0.10rem;
  		background: #FFFFFF;
  		overflow: hidden;
  		.showPic{
  			width: 38%;
			float: left;
  			display: block;
  		}
  		.tit{
			width: 60%;
			float: right;
  			padding: 0;
			color: #666;
  			.personNum{
  				color: #999999;
				display: block;
  			}
  			.icon{
  				vertical-align: middle;
  			}
  		}
  	}
  }
</style>
