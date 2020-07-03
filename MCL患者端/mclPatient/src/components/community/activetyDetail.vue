<template>
  <div class="activetyDetai-root">
    <div id="body_main">
  		<mt-header title="动态详情" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
		  </mt-header>
		  
		  <div class="showPic">
		  	<img :src="responseData.acimg" width="100%"/>
		  </div>
		  
		  <div class="huodongInfo">
		  	<div class="huodong-cell borderBottom">
		  		<img src="@/assets/images/huodongshijian@2x.png" width="20"/>
		  		<p class="font14"> <span class="name">活动时间：</span> <span class="huiFont"> {{responseData.actime}} </span> </p>
		  	</div>
		  	<div class="huodong-cell borderBottom">
		  		<img src="@/assets/images/zixunrexian@2x.png" width="20"/>
		  		<p class="font14"> <span class="name">咨询热线：</span> <span class="huiFont">{{responseData.chotline}}</span> </p>
		  	</div>
		  	<div class="huodong-cell borderBottom">
		  		<img src="@/assets/images/huodongdidian@2x.png" width="20"/>
		  		<p class="font14"> <span class="name">活动地点：</span> <span class="huiFont">{{responseData.acplace}}</span> </p>
		  	</div>
		  	<div class="huodong-cell">
		  		<img src="@/assets/images/huodongrenshu@2x.png" width="20"/>
		  		<p class="font14"> <span class="name">活动人数：</span><span class="huiFont">{{responseData.acpcount}} 人</span> </p>
		  	</div>
		  </div>
		  
		  <div class="note font14 marginTop10">
		  	<p class="tit">活动详情</p>
		  	<p v-html="responseData.accont"></p>
		  </div>
		  <div class="fix_bottom" v-if="fromorder!='order'">
		  	<div class="left yellow">¥ {{responseData.acprice}}</div>
		  	<div class="right" @click="baoming">立即报名</div>
		  </div>
		</div>  
  </div>
</template>

<script>
    export default {
        name: "activetyDetai",
        data:()=>({
			param:{
				activityskey: ""
			},
			fromorder:'',
			responseData:{
				accont:"",  //活动详情
				acimg:"",   //活动图片
				acpcount:"",//活动人数 
				acplace:"", //活动地点
				acprice:"", //活动价格
				actime:"",  //活动时间
				activityskey:"", //活动key
				chotline:"" ,//咨询热线
				
			}
        }),
        methods:{
        	baoming(){
				const {activityskey} = this.param;
				const {acprice} = this.responseData;
        		this.$router.push(`/activetyEnroll?id=${activityskey}&acprice=${acprice}`)
        	},
			getInfo(){
				let url = "UserInterface/GetCommunityActivitySignUp.ashx";
				this.$post(url,this.param).then((data)=>{
					if(data.rspcode != 1 ){
					  return;
					}
					this.responseData = data;
				})
			}
        },
		mounted: function(){
			this.param.activityskey = this.$route.query.id;
			this.fromorder = this.$route.query.from;
			this.getInfo()
		}
    }
</script>

<style scoped lang="scss">
  .showPic{
  	position: relative;
  	img{
  		display: block;
  	}
  }
  
  .huodongInfo{
  	padding: 0 0.13rem;
  	background: #FFFFFF;
  	.huodong-cell>*{vertical-align: middle;display: inline-block;}
  	.huodong-cell{padding: 0.1rem 0;}
  	img{
  		margin-right: 0.05rem;
  	}
  	.name{
  		color: #000000;
  	}
  }
  .note{
  	background: #FFF;
  	padding: 0.13rem;
  	padding-top: 0;
  	line-height: 1.5;
  	.tit{
  		line-height: 0.45rem;
  	}
  }
  .fix_bottom>*{
  	line-height: 0.44rem;
  	height: 0.44rem;
  	box-sizing: border-box;
  }
  .fix_bottom{
  	text-align: center;
  	.left{
  		border-top: 1px solid #ccc;
  		border-bottom: 1px solid #ccc;
  		width: 40%;
  		float: left;
  		font-size: 0.18rem;
  	}
  	.right{
  		float: left;
  		background: #F78335;
  		width: 60%;
  		color: #FFFFFF;
  	}
  }
  
</style>
