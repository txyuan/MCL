<template>
<div>
  <div id="body_main">

  	<mt-header title="首页" fixed></mt-header>
    
    <!-- 轮播图  -->
    <carousel class="margin10"/>
    
    <!-- 欢迎信息 -->
    <!--<div class="wellcomInfo">
    	<div class="info">
    		<div>
    			<p class="font14 name">中午好，何小何</p>
    			<p class="font12 des">MCL专业守护您第 110 天</p>
    		</div>
    		<img src="@/assets/images/lianxikefu@2x.png" alt="">
    	</div>
    	<div class="btn font14">
    		<img src="@/assets/images/搜索--1@2x.png" alt="" width="18"/>
    		<span>搜索病症</span>
    	</div>
    </div>-->
    
    <!-- 处方查看  -->
    <classified @toggleMeg="toggleMeg" @click="linkf" class="margin10"/>
    
    <!-- 我的医生 -->
    <div class="home-cell margin10">
    	<div class="myDocter">
    		<router-link tag="div" to="/yearCard">
    			<img src="@/assets/images/morentouxiang.jpg" alt="" class="touxiang"/>
    		</router-link>
    		
    		<div class="content">
    			<div class="nameInfo">
    				<span class="DName font17">范医生</span>
    				<span class="label font15">主任医师</span>
    				<router-link tag="div" to="/message2" class="msg">
    					<img src="@/assets/images/xiaoxi@2x(1).png" alt="" class="icon"/>
    					<span class="labelJiao">3</span>
    				</router-link>	
    			</div>
    			<router-link tag="div" to="/yearCard">
    				<div class="adr font15">
	          	<span>安阳市肿瘤医院</span> | <span>肿瘤科</span>
	          </div>
	          <div class="des font12 huiFont"> 擅长：肿瘤方面的科学治疗和调理…</div>
	    		</router-link>
    		</div>
    	</div>
    </div>
    
    <!-- 指定医生 -->
    <!--<div class="huiyuan">
    	<img src="@/assets/images/doctor@2x.png" width="100%"/>
    </div>-->
    
    <!-- 今日提醒 -->
    <div class="home-cell margin10">
    	<p class="name">今日提醒</p>
    	<ul class="remindList">
    			<router-link tag="li" to="/uploadPhoto" class="borderBottom">
		  	  	<div class="left">
    					<div class="rowTop">
    						<img src="@/assets/images/yinshi@2x.png" class="icon"/>
    						<span class="huiFont font14">早餐服用</span>
    					</div>
    					<div class="rowBottom font12">
    						<p class="yellow">应完成时间：<span>06:30</span> 已超时：<span>1小时20分钟</span></p>
    					</div>
    				</div>
    				<div class="right yellow font14">
    					查看 <img src="@/assets/images/next@2x.png" alt="" width="22" class="next"/>
    				</div>
    		  </router-link>
    		  
    		  <router-link tag="li" to="/nutritionUploadPhoto" class="">
		  	  	<div class="left">
    					<div class="rowTop">
    						<img src="@/assets/images/yaopin@2x.png" class="icon"/>
    						<span class="huiFont font14">ABD活性因子服用</span>
    					</div>
    					<div class="rowBottom font12">
    						<p class="yellow">应完成时间：<span>06:30</span> 已超时：<span>1小时20分钟</span></p>
    					</div>
    				</div>
    				<div class="right yellow font14">
    					查看 <img src="@/assets/images/next@2x.png" alt="" width="22" class="next"/>
    				</div>
    		  </router-link>
    	</ul>
    </div>
    
    <!-- 信息补录提醒 -->
    <div class="home-cell margin10">
    	<p class="name">信息补录提醒</p>
    	<ul class="remindList">
    		  <router-link tag="li" to="/diet_supplement" class="borderBottom">
    		  	<div class="left">
    					<div class="rowTop">
    						<img src="@/assets/images/yinshi@2x.png" class="icon"/>
    						<span class="huiFont font14">早餐服用录入（1天前）</span>
    					</div>
    					<div class="rowBottom font12">
    						<p class="yellow">应完成时间：<span>06:30</span> 已超时：<span>1小时20分钟</span></p>
    					</div>
    				</div>
    				<div class="right yellow font14">
    					查看 <img src="@/assets/images/next@2x.png" alt="" width="22" class="next"/>
    				</div>
    		  </router-link>
    		  
    		  <router-link tag="li" to="/uploadPhoto_supplement" class="">
		  	  	<div class="left">
    					<div class="rowTop">
    						<img src="@/assets/images/yaopin@2x.png" class="icon"/>
    						<span class="huiFont font14">ABD活性因子服用情况录入（3天前）</span>
    					</div>
    					<div class="rowBottom font12">
    						<p class="yellow">应完成时间：<span>06:30</span> 已超时：<span>1小时20分钟</span></p>
    					</div>
    				</div>
    				<div class="right yellow font14">
    					查看 <img src="@/assets/images/next@2x.png" alt="" width="22" class="next"/>
    				</div>
    		  </router-link>
    	</ul>
    </div>
    
    <!--体重记录-->
    <!--<div class="home-cell weightArea">
    	<p class="name">体重记录 <img src="@/assets/images/fabu@2x.png" alt="" class="add" width="23"/></p>
    	<div class="weightInfo">
    		<div class="left">
    			<p class="font12 tit1">最新体重</p>
    			<p class="font14 tit2">69.8 公斤</p>
    		</div>
    		<div class="right">
    			
    		</div>
    	</div>
    </div>-->
    
   
    
    
    <!--MCL专家栏-->
    <!--<div class="home-cell zhuanjai margin10">
    	<p class="name">MCL专家栏 <span class="more">更多>></span></p>
    	<div class="mclWrap">
        	<ul class="mclZj">
        		<li v-for="n in 5">
        			<div class="coverWrap">
        				<div class="mask">
        					<div class="seeNum">
        						 <img src="@/assets/images/eye.png" alt="" /> <span class="font12">3k+</span>
        					</div>
        				</div>
        				<img src="@/assets/images/lrfh.png" alt="" class="cover"/>
        			</div>
        			<p class="font12">癌症公益讲座1</p>
        		</li>
        	</ul>
    	</div>
    </div>-->
    
    <!--常见问题-->
    <!--<div class="home-cell">
    	<p class="name">常见问题 <span class="more">更多>></span></p>
    	<ul class="question font14">
    		<li class="borderBottom">得了肺癌怎么办？</li>
    		<li class="borderBottom">如何正确抗癌？</li>
    		<li class="borderBottom">如何正确面对癌症的损伤？</li>
    		<li class="borderBottom">癌症的种类怎么划分，如何预防癌…</li>
    	</ul>
    </div>-->

		<!--显示商城二维码-->
    <transition name="fade">
      <div class="showCode" id="mark" style="display: block" v-if="isShowCode">
        <div class="code_wrap">
          <div class="code_inner" @click.stop="" ref="codeBg">
            <p class="tit">{{messageInfo.message_name}}</p>
            <p>{{messageInfo.message_memo}}</p>
            <mt-button type="danger" class="share_btn" size="large" @click="toggleMeg('hide')">知道了</mt-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
	<div class="linkef" v-show="ewmshow">
	  <div class="linkefnr">
	    <img src="https://resource.jtsc.club/bianji_car_quxiao@2x.png" class="closewm" @click="closewms" />
	    <h2>
	      <img src="@/assets/images/kefloho.png" />
	      <label>万象商纬</label>
	    </h2>
	    <img src="@/assets/images/wxewm.jpg" class="imgewm" />
	    <span>扫描二维码，加客服微信</span>
	    <span>微信号：sg50675772</span>
	    <p>电话客服：400电话开通中</p>
	    <!-- <p style="margin-top: 0.02rem;">客服热线2：18218494793</p> -->
	  </div>
	</div>
</div>
</template>

<script>

  import carousel from "./carousel.vue";
  import classified from "./classified/classifiedRow2.vue";
  import Bus from "@/assets/js/updateShopCar.js";  //跟新购物车数量
  export default {
      name: "home",
      data:()=>({
        isShowCode: false,
				UserKey: '',
				SessionId: '',
        param:{
          "areaCode": 341802,
          "pagesize": 10,
          "pagecount": 0,
          "secondSubjectType": ""
        },
        messageInfo:{
        	message_name:"",
        	message_memo:""
        },
				ewmshow:false
      }),
      methods:{
          searchChange(val){
            let $router = this.$router;
            $router.push('/searchproduct')
          },
         //关闭商城二维码
         toggleMeg (state) {
           if(state == "show"){
             this.isShowCode = true;
             return;
           }
           this.isShowCode = false
         },
				 // 获取通知
         getMsgInfo(){
         	let url = "UserInterface/GetMessageInfo.ashx";
         	this.$post(url).then((data)=>{
	          if(data.rspcode != 1 ){
	            return;
	          }
	          this.messageInfo.message_name = data.message_name;
	          this.messageInfo.message_memo = data.message_memo;
        	})
         },
				 //我的客服
				 linkf(){
				   this.ewmshow=true;
				 },
				 closewms(){
				   this.ewmshow=false;
				 }
      },
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        let keepAlive = (to.name == "classdetail") ? true: false;
        this.$route.meta.keepAlive = keepAlive;
        next()
      },
      mounted(){
				this.getMsgInfo()
      },
      components:{
        carousel,
        classified
      },
			created(){
				// this.information();
			}
  }
</script>

<style scoped lang="scss">
  
  /*.header_search{
     font-size: 12px;
  }
  .active_pic img{
    width: 100%;
    height: 0.96rem;
    display: block;
  }
  .page-infinite-wrapper {
    margin-top: -1px;
    width: 100%;
    overflow: scroll;
  }
  #mark{
    z-index: 9999999;
    .close{
      display: inline-block;
      margin-top: 20px;
    }
    .code_wrap{
      height: 100%;
      text-align: center;
    }
    .code_inner{
      width: 80%;
      height: 3rem;
      margin: 0 auto;
      margin-top: 32%;
      padding-top: 40%;
      background: url("https://resource.jtsc.club/back_tg.png") no-repeat;
      background-size: 100% auto;
      color: #ffffff;
      position: relative;
      p{
				line-height: 1.5;
				font-size: 0.13rem;
				padding: 0 5%;
				text-align: left;
				text-indent: 2em;
			}
			.tit{
				font-size: 0.14rem;
				text-align: center;
				padding-bottom: 0.06rem;
				color: #F8F244;
				text-indent: 0;
			}
      img{
        width: 56%;
      }
      .share_btn{
        width: 90%;
        margin: 0 auto;
        margin-top: 0.2rem;
        position: absolute;
        bottom: 0.66rem;
        left: 50%;
        margin-left: -45%;
				font-size: 0.15rem;
      }
    }
  }
	.home_gg{
		width: 100%;
		height: 0.35rem;
		background: #EDA165;
		overflow:hidden;
		position:absolute;
		top: 2.2rem;
		left:0;
		img{
			height: 0.21rem;
			float: left;
			display: block;
			margin-top: 0.07rem;
			margin-left: 2%;
		}
		.scroll{
			position: relative;
			width: 80%;
			height: 0.35rem;
			line-height: 0.35rem;
			font-size: 0.13rem;
			white-space: nowrap;
			overflow: hidden;
			float: left;
			margin-left: 2%;
			span{
				display: inline-block;*//*inline样式不能使用动画*/
				/*animation: scroll 20s linear infinite;
				&:after{
					position: absolute;
					left: 100%;
					content: attr(data-text);
					margin-left: 20em;
				}
			}
		}
	}
  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 20em));*/ /*总长再加上margin-left*/
    /*}
  }
	.home_gg1{
		height: 0.32rem;
		width: 100%;
		margin-top: 0.1rem;
	}
	.home_tjyh{
		width: 100%;
		position: relative;
		overflow: hidden;
		a{
			width: 49%;
			float: right;
			margin-top:0.06rem;
			&:first-child{
				float: left;
			}
		}
		img{
			width: 100%;
		}
		.home_wuxing{
			width: 0.7rem;
			position: absolute;
			top: 0;
			left: 50%;
			margin-left: -0.35rem;
		}
	}
	.home_monc{
		margin-top:0.1rem;
		img{
			width: 100%;
		}
	}
	
	.linkef{
	  width: 100%;
	  height: 100vh;
	  background: rgba(000,000,000,0.5);
	  position: fixed;
	  left: 0;
	  top: 0;
	  z-index: 9999;
	  .linkefnr{
	    width: 70%;
	    padding: 0 6%;
	    height: 4.06rem;
	    background: #fff;
	    position: absolute;
	    left: 50%;
	    margin-left: -41%;
	    top: 50%;
	    margin-top: -2.03rem;
	    border-radius: 6px;
	    .closewm{
	      width: 0.2rem;
	      height: 0.2rem;
	      position: absolute;
	      right: 3.5%;
	      top: 0.1rem;
	    }
	    h2{
	      font-weight: normal;
	      padding: 0;
	      padding-top: 0.2rem;
	      overflow: hidden;
	      img{
	        width: 0.3rem;
	        height: 0.3rem;
	        display: block;
	        float: left;
	      }
	      label{
	        font-size: 0.14rem;
	        float: left;
	        line-height: 0.3rem;
	        margin-left: 0.1rem;
	      }
	    }
	    .imgewm{
	      width: 2.6rem;
	      height: 2.6rem;
	      display: block;
	      margin: 0 auto;
	    }
	    span{
	      font-size: 0.14rem;
	      color: #666;
	      display: block;
	      width: 100%;
	      text-align: center;
	      margin-bottom: 0.03rem;
	    }
	    p{
	      display: block;
	      font-size: 0.2rem;
	      color: red;
	      padding: 0 3%;
	      text-align: center;
	      margin-top: 0.1rem;
	    }
	  }
	}
	.fenxiang{
		position: relative;
		.chongzmd{
			width: 100%;
			height: auto;
			position: absolute;
		}
		.chongzy{
			width: 60px;
			height: auto;
			position: absolute;
			right: 10%;
		}
	}*/
	
	.home-cell{
		&>.name{
			line-height: 0.44rem;
    	padding: 0 0.12rem;
    	background: #FFFFFF;
		}
		.more{
			float: right;
			color: #958F8F;
			font-size: 0.12rem;
		}
	}
	/*欢迎信息 */
	.wellcomInfo{
		padding: 0.12rem;
		background: #FFFFFF;
		.info {
			display: flex;
			justify-content: space-between;
			margin-bottom: 0.1rem;
		}
		.info .name{
			font-weight: bold;
			margin-top: 0.05rem;
			margin-bottom: 0.05rem;
		}
		.info .des{
			color: #91959D;
		}
		.info img{
			width: 0.60rem;
		  height: 0.60rem;
		}
		.btn{
			text-align: center;
			color: #FFFFFF;
			line-height: 0.33rem;
			height: 0.33rem;
			background:rgba(247,131,53,1);
			box-shadow:0px 4px 4px 0px rgba(154,154,154,0.59);
			border-radius:17px;
		}
		.btn img{
			vertical-align: middle;
		}
	}
	/*mcl专家栏*/
	.mclWrap{
		overflow: hidden;
		overflow-x: scroll;
	}
	.mclZj{
		background: #FFFFFF;
		padding: 0.07rem 0.06rem;
		white-space: nowrap;
		display: inline-block;
		li{
			display: inline-block;
			width: 1.40rem;
			margin: 0 0.06rem;
		}
		.coverWrap{
			position: relative;
			border-radius: 5px;
			overflow: hidden;
			.mask{
				width: 100%;
				background: rgba(0,0,0,.3);
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
			}
			.seeNum{
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				color: #FFFFFF;
				text-align: right;
				line-height: 0.2rem;
				padding-right: 0.05rem;
			}
			.seeNum img{
				width: 0.15rem;
				vertical-align: middle;
			}
			.cover{
				display: block;
				width: 100%;
				height: 0.85rem;
			}
		}
		p{
			color: #333333;
			margin: 0.05rem 0;
		}
	}
	
	/*我的医生*/
	.myDocter{
		padding: 0.13rem 0.12rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		.touxiang{
			width: 0.72rem;
			height: 0.72rem;
			border-radius: 0.36rem;
		}
		.content{
			flex: 1;
			padding-left: 0.25rem;
		}
		.nameInfo .msg{display: inline-block;vertical-align: middle;float: right;position: relative;padding-right: 0.05rem;}
		.nameInfo .msg .icon{width: 0.21rem;}
		.nameInfo .msg span.labelJiao{
			min-width: 0.14rem;
			line-height: 0.14rem;
			border-radius: 0.14rem;
			background: #FF0000;
			color: #FFF;
			text-align: center;
			font-size: 12px;
			position: absolute;
			top: -0.07rem;
			right: 0;
		}
		
		.nameInfo,.adr {margin-bottom: 0.07rem;}
		.nameInfo span{vertical-align: middle;}
		.nameInfo .label{
			border: 1px solid #F78335;
			border-radius: 2px;
			color: #F78335;
			padding: 0.01rem 0.08rem;
			margin-left: 0.15rem;
		}
		
	}
	/*今日提醒*/
	.remindList{
		&>li {
			padding: 0.13rem 0.12rem;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
		}
		
		&>li .left{
			.rowTop .icon{
				width: 0.14rem;
				vertical-align: middle;
				margin-right: 5px;
			}
		}
		&>li .right{
			text-align: right;
			line-height: 0.37rem;
		}
		&>li .right .next{
			width: 0.22rem;
			vertical-align: middle;
			margin-left: 0.1rem;
		}
		.rowTop{
			margin-bottom: 0.05rem;
		}
		.rowTop>*{vertical-align: middle;}
	}
	
	/*体重记录*/
	.weightArea{
		background: #FFFFFF;
		padding-bottom: 0.13rem;
		.add{
			float: right;
			width: 0.23rem;
			height: 0.23rem;
			margin-top: 0.1rem;
		}
		.weightInfo{
			padding: 0 0.12rem;
		}
		.weightInfo .tit1{
			color: #999999;
			margin-bottom: 0.05rem;
			margin-bottom: 0.05rem;
		}
	}
	.huiyuan{
		padding: 0.14rem 0;
	}
	/*常见问题*/
	.question{
		background: #FFFFFF;
		padding: 0 0.12rem;
		li{
			line-height: 40px;
		}
	}
</style>
