<template>
	<div>
		<mt-header fixed title="员工管理">
		  <div slot="left">
			<header-back>
			  <mt-button icon="back"></mt-button>
			</header-back>
		  </div>
		</mt-header>
		<div class="order_cont">
			<div v-for="(item,index) in list" :key="index">
				<router-link :to="`/onestaff?key=${item.skey}`" tag="div">
					<mt-cell-swipe class="width100" :right="[
					  {
						content: '关闭账号',
						style: delStyle,
						handler: ()=>(del(false,item))
					  }
					]">
					<div class="staff_li">
						<img :src="item.imgurl" />
						<div class="staff_rigt">
							<h2>
								<span>{{item.username}}</span>
								<label>推广员工</label>
							</h2>
							<p>累计推广：<span>{{item.doctorcount}}</span>， <span>{{item.channelcount}}</span>， <span>{{item.patientcount}}</span></p>
						</div>
					</div>
				  </mt-cell-swipe>
				</router-link>
				  <!--<mt-cell-swipe class="width100" :right="[
					{
						content: '开启账号',
						style: opeStyle,
						handler: ()=>(del(false,item))
					  }
					]">
					<div class="staff_li">
						<img src="../../../assets/images/bbanxl.png" />
						<div class="staff_rigt">
							<h2>
								<span>白容因</span>
								<label>推广员工</label>
							</h2>
							<p>累计推广：<span>10</span>医生， <span>10</span>渠道商， <span>10</span>患者</p>
						</div>
					</div>
				  </mt-cell-swipe>-->
				
			</div>
		</div>
		<div class="buttons">
			<router-link to="/establish">
				<label>创建新员工</label>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
	    name: "index",
		data:()=>({
			list: [],
			delStyle:{background: '#FF1E41', color: '#fff',lineHeight: '0.68rem',fontSize:'0.12rem'},
			opeStyle:{background: '#18B600', color: '#fff',lineHeight: '0.68rem',fontSize:'0.12rem'}
		}),
		methods:{
			//员工管理列表
			getList(){
				let url = "UserInterface/channel/StaffManagementList.ashx";
	            this.$post(url).then((data)=>{
	              if(data.rspcode != 1 ){
	                return;
	              }
	              let modelList = data.data;
	              this.list = modelList;
	            })
			}
		},
		mounted:function(){
			//员工管理列表
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";
	.order_cont{
		padding-bottom: 0.6rem;
		padding-top: 43px;
	}
	.product-list{
	  position: fixed;
	  width: 100%;
	  top: 0.88rem;
	  bottom: 1.03rem;
	}
	.staff_li{
		width: 100%;
		height: 0.68rem;
		background: #fff url(../../../assets/images/jiantou@2x.png) no-repeat 98% center;
		background-size: 0.22rem;
		border-bottom: 1px solid #ddd;
		img{
			height: 0.5rem;
			float: left;
			border-radius: 0.25rem;
			margin-top: 0.09rem;
		}
		.staff_rigt{
			float: left;
			margin-left: 0.12rem;
			h2{
				overflow: hidden;
				padding-top: 0.12rem;
				font-weight: normal;
				span{
					color: #333535;
					display: block;
					line-height: 0.2rem;
					float: left;
					font-size: 0.15rem;
				}
				label{
					display: block;
					float: left;
					color: #fff;
					font-size: 0.12rem;
					height: 0.18rem;
					line-height: 0.18rem;
					width: 0.66rem;
					text-align: center;
					background: linear-gradient(left, #F39645, #F46F42);
					margin-left: 0.14rem;
					border-radius: 0.09rem;
				}
			}
			p{
				font-size: 0.12rem;
				padding-top: 0.1rem;
				color: #7D8182;
				span{
					color: #FF3D3D;
				}
			}
		}
	}
	.buttons{
	  overflow: hidden;
	  label{
		  width: 88%;
		  height: 0.4rem;
		  display: block;
		  font-size: 0.15rem;
		  color: #fff;
		  text-align: center;
		  line-height: 0.4rem;
		  margin: 0 auto;
		  border-radius: 0.2rem;
		  background: #FF3D3D;
		  margin-top: 0.05rem;
	  }
	}
</style>
