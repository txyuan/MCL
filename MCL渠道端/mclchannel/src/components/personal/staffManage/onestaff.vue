<template>
	<div class="padding-header">
		<mt-header fixed title="员工管理">
		  <div slot="left">
			<header-back>
			  <mt-button icon="back"></mt-button>
			</header-back>
		  </div>
		</mt-header>
		<div class="content">
			<router-link to="" style="overflow: hidden;display: block;">
			    <div class="person_info">
			      <img :src="info.imgurl" style="width:0.64rem;height:0.64rem;border-radius: 0.32rem">
			      <div class="info">
			        <p class="name">{{info.nickname}}<a style="padding-top: 0.04rem;"><img src="@/assets/images/bohao@2x.png" style="height: 0.14rem;margin-left: 0.16rem;" /></a></p>
			        <p class="tel">累计推广：{{info.extensioncount}}</p>
			      </div>
			      <div class="person_type">
			        <span @click="toggleTole(true)">{{info.role}}</span>
			        <i class="mint-cell-allow-right"></i>
			      </div>
			    </div>
			  </router-link>
		</div>
		<img src="../../../assets/images/zhrt.png" style="width: 100%;border-top: 1px solid #eee;border-bottom: 1px solid #eee;" />
		<div class="card_achieve">
			  <div class="card_alist">
				  <p>{{info.newdoctorcount}}</p>
				  <span>本月新增医生</span>
			  </div>
			  <div class="card_alist">
				  <p>{{info.newextensioncount}}</p>
				  <span>本月新增渠道</span>
			  </div>
			  <div class="card_alist">
				  <p>{{info.newpatientcount}}</p>
				  <span>本月新增患者</span>
			  </div>
		</div>
		<h3>用户列表</h3>
		<div id="navbar" class="borderBottom" style="margin-top: 0.06rem;">
		  <mt-navbar v-model="selected">
		    <mt-tab-item id="tab0" @click.native="tabClick('1')"><p>渠道</p></mt-tab-item>
		    <mt-tab-item id="tab1" @click.native="tabClick('2')"><p>医生</p></mt-tab-item>
		    <mt-tab-item id="tab2" @click.native="tabClick('3')"><p>患者</p></mt-tab-item>
		  </mt-navbar>
		</div>
		
		<div class="borderpay">
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
				<div slot="content">
					<div class="callddh" v-for="(item,index) in list" :key="index">
						<mt-cell :title="item.nickname" :label="item.create_date" class="borderBottom">
							<div class="right text-right">
								<span>已推广 : {{item.nickname}}人</span>
								<span class="mint-cell-label">已消费 : ¥{{item.money}}</span>
							</div>
						</mt-cell>
						<img src="../../../assets/images/bohao@2x.png" class="calldh" />
					</div>
				</div>
			</loadMore>
		</div>
		<div class="chose" v-if="isShow">
			<div class="alet">
				<img src="../../../assets/images/guanbih.png" @click="toggleTole(false)" />
				<h4>切换员工角色</h4>
				<p class="act">
					<span>当前角色：</span>
					<label>推广员工</label>
				</p>
				<p>
					<span>备选角色：</span>
					<label>发货员工</label>
				</p>
				<i>确定保存</i>
			</div>
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	export default {
	    name: "onestaff",
		data:()=>({
			selected:"tab0",
			count:0,  //拥有数量
			price:0,  //当前单价
			values:0,  //拥有价值
			
			param: {
			  "pagesize": 10,
			  "pagecount": 0,
			  "type": 1,  //状态（1：渠道;2：医生;3：患者）
			  "flag": 2,  //1：我的用户，2：员工用户）
			  "staffskey": "",//员工主键
			},
			list: [],
			//员工角色显示/隐藏
			isShow:false,
			//默认显示信息
			info:{
				imgurl: "", //头像地址
				nickname: "", //昵称
				tel: "", //电话
				extensioncount: "", //累计推广
				role: "", //角色
				newdoctorcount: "", //本月新增医生
				newextensioncount: "", //本月新增渠道
				newpatientcount: "" //本月新增患者
			}
		}),
		methods:{
			// 切换员工角色
			toggleTole(state){
				this.isShow = state;
			},
			//tab切换
			tabClick(val){
				this.$Indicator.loading();
				this.param.type = val;
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
				setTimeout(()=>{ this.$Indicator.close()},200)
			},
			// 下面流水
			getList(success){
   				let url = "UserInterface/channel/StaffPromotionList.ashx";
   				if(this.param.pagecount == 1){
   					 this.list = [];
   				}
   				this.$post(url,this.param).then((data)=>{
   					if(data.rspcode != 1 ){
   					      return;
   					}
   					 let modelList = data.data;
   					 this.list = [...this.list,...modelList]
   					 //加载更多组件触发回调
   					 if(success){
   					   success(modelList,this.list)
   					  }
   				})
			},
			//获取默认信息
			getInfo(){
				let url = "UserInterface/channel/StaffManagementDetail.ashx";
				let param = {
					userskey: this.$route.query.key,
				}
				this.$post(url,param).then((data)=>{
   					if(data.rspcode != 1 ){
   					      return;
   					}
   					this.info = data;
   					
   				})
			}
		},
		mounted: function(){
			//获取默认信息
			this.getInfo()
			this.param.staffskey = this.$route.query.key;			
		},
		components: {
			 loadMore
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";
	//头像部分
	.person_info{
	  padding: 0.14rem 0.10rem;
	  background: #ffffff;
	  display: flex;
	  position: relative;
	  img{
	    margin-right: 0.10rem;
	  }
	  .info{
	    flex: 1;
	    height: 64px;
	    display: flex;
	    flex-wrap: wrap;
	    align-content: space-around;
	    &>p{
	      width: 100%;
	      font-size: 0.18rem;
	      color: $color40;
	    }
	    &>p.name{
	      @include ellipsis(1);
	    }
	  }
	  .person_type{
	    line-height: 64px;
	    padding-right: 28px;
	    color: $color40;
	  }
	  .person_type span{
	    height: 0.28rem;
		border-radius: 0.14rem;
		line-height: 0.28rem;
		color: #fff;
		width: 0.8rem;
		display: inline-block;
	    font-size: 0.13rem;
		text-align: center;
	    background-image: linear-gradient(to right,#F39645, #F46F42);
	  }
	}
	.content{
	   /*padding-top: 43px;*/
	}
	h3{
		padding: 0 5%;
		height: 0.44rem;
		line-height: 0.44rem;
		font-weight: 400;
		font-size: 0.15rem;
		color: #666;
	}
	.card_achieve{
		  overflow: hidden;
		  margin-top: -0.04rem;
		  background:#fff;
		  .card_alist{
			  width: 33.33%;
			  padding: 0.12rem 0;
			  float: left;
			  p{
				  font-size: 0.16rem;
				  color: #58AD9D;
				  text-align: center;
			  }
			  span{
				  font-size: 0.13rem;
				  color: #636768;
				  text-align: center;
				  display: block;
				  padding: 0.06rem;
			  }
		  }
	}
	.shaixuan{
	  height: 0.2rem;
	  width: 0.2rem;
	  margin-top: 0.08rem;
	}
	.callddh{
		position: relative;
		.calldh{
			position: absolute;
			height: 0.26rem;
			top: 50%;
			margin-top: -0.13rem;
			left: 48%;
		}
	}
	.chose{
		width: 100%;
		height: 100vh;
		background: rgba(000,000,000,0.4);
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		.alet{
			width: 82%;
			position: absolute;
			height: 2.1rem;
			left: 9%;
			top: 1.5rem;
			background: #fff;
			border-radius: 6px;
			img{
				width: 0.16rem;
				position: absolute;
				right: 0.1rem;
				top: 0.1rem;
			}
			h4{
				font-size:0.15rem;
				color: #333333;
				font-weight: 400;
				padding: 0.1rem 5%;
			}
			p{
				font-size: 0.14rem;
				color: #999;
				padding: 0.16rem 5% 0 5%;
				label{
					padding-left: 0.24rem;
					margin-left: 0.1rem;
					background: url(../../../assets/images/select@2x.png) no-repeat left center;
					background-size: 0.16rem;
				}
				&.act{
					color: #FF3D3D;
					label{
						background: url(../../../assets/images/select_click@2x.png) no-repeat left center;
						background-size: 0.16rem;
					}
				}
			}
			i{
				width: 1.2rem;
				height: 0.3rem;
				background: #FF3D3D;
				color: #fff;
				font-size: 0.13rem;
				display: block;
				font-style: normal;
				text-align: center;
				line-height: 0.3rem;
				border-radius: 0.15rem;
				position: absolute;
				bottom: 0.18rem;
				left: 50%;
				margin-left: -0.6rem;
			}
		}
	}
</style>
