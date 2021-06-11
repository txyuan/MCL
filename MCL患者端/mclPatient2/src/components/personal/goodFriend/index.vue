<template>
	<div>
		<mt-header title="我的好友" fixed class="borderBottom">
		  <div slot="left">
		    <header-back>
		      <mt-button icon="back"></mt-button>
		    </header-back>
		  </div>
		</mt-header>
		<div class="friends_ul">
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
				<div slot="content">
					<div class="friends_li" v-for="(item,index) in list" :key="`list${index}`">
						<img :src="item.imgUrl" />
						<div class="friends_name">
							<p>
								<span>{{item.contactName}}</span>
								<i>{{item.createTime}}</i>
							</p>
							<label>{{item.contactPhone}}</label>
						</div>
					</div>
				</div>
			</loadMore>		  
			
			<!-- <div class="friends_li">
				<img src="../../../assets/images/bbanxl.png" />
				<div class="friends_name">
					<p>
						<span>王小二</span>
						<i>2019.10.07 12:40:43</i>
					</p>
					<label>17600001212</label>
				</div>
			</div>
			<div class="friends_li">
				<img src="../../../assets/images/bbanxl.png" />
				<div class="friends_name">
					<p>
						<span>王小二</span>
						<i>2019.10.07 12:40:43</i>
					</p>
					<label>17600001212</label>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	export default {
	  name: "friend",
	  data:()=>({
		  param : {
		    pagesize: 10,
		    pagecount: 0
		  },
		  list:[]
	  }),
	  methods:{
		  //获取好友
		  getList(success){
		    let url = "UserInterface/GetUserSubordinateList.ashx";
		    this.$post(url,this.param).then((data)=>{
				if(data.rspCode != 1 ){
				  return;
				}
				let modelList = data.data;
				if(this.param.pagecount == 1){
				  this.list = [...modelList];
				}else{
				  this.list = [...this.list,...modelList]
				}
				//加载更多组件触发回调
				if(success){
				  success(modelList,this.list)
				}
		    })
		  },
	  },
	  components:{
		  loadMore
	  }
	}
</script>

<style scoped lang="scss">
	.friends_ul{
		margin-top: 51px;
		.friends_li{
			width: 94%;
			background: #fff;
			overflow: hidden;
			border-bottom: 1px solid #eee;
			padding: 0.12rem 2% 0.12rem 4%;
			img{
				height: 0.5rem;
				border-radius: 0.25rem;
				float: left;
			}
			.friends_name{
				float: left;
				width: 80%;
				margin-left: 0.1rem;
				p{
					overflow: hidden;
					span{
						font-size: 0.16rem;
						float: left;
						display: block;
						color: #333535;
					}
					i{
						float: right;
						font-size: 0.12rem;
						color: #999;
						font-style: normal;
					}
				}
				label{
					font-size: 0.16rem;
					color: #999;
					padding-top: 0.04rem;
					display: block;
				}
			}
		}
	}
</style>
