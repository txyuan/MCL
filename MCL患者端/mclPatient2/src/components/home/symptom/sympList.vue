<template>
	<div class="caseUpload-root padding-header">
		<mt-header title="症状管理" fixed class="borderBottom">
			<div slot="left">
				<router-link to="/wx_Entrance/home" style="color: initial;">
					<mt-button icon="back"></mt-button>
				</router-link>
			</div>
		</mt-header>

		<div class="page_btn text-center">
			<img src="@/assets/images/病例.png" width="79" style="margin-bottom: 15px;" />
			<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="$router.push(`/symptom`)">添加记录</mt-button>
		</div>

		<div class="rev_fuc">
			<div>
				<h3><i></i>历史记录</h3>
				<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
					<div slot="content">
						<div class="rev_list" v-for="(item,index) in list" :key="index">
							<div class="rev_lilf" style="width: 38%;overflow: hidden;">
								<p>{{item.create_date}}</p>
							</div>
							<!-- <label>{{item.create_time}}</label> -->
							<router-link :to="`/sympEye?idtime=${item.skey}`">
								<span class="blue">查看详情</span>
							</router-link>
						</div>
					</div>
				</loadMore>
			</div>
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	export default {
		name: "appointment",
		data: () => ({
			param: {
			  "pagesize": 10,
			  "pagecount": 0
			},
			list: [],
		}),
		methods: {
			//获取列表
			getList(success) {
				let url = "UserInterface/DiseaseConditionInfoList.ashx";
				this.$post(url,this.param).then((data) => {
					if(data.rspcode != 1 ){
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
			}
		},
		mounted(){

		},
		components: {
			loadMore
		}
	}
</script>

<style scoped lang="scss">
  .mint-header{
    height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
    font-size: 0.16rem;
  }
  .padding-header {
    padding-top: 0.44rem;
  }
	.page_btn {
		padding: 0.25rem;
	}

	.rev_fuc {
		width: 100%;
		background: #fff;
    margin-top: 0.1rem;
		h3 {
			height: 0.5rem;
			line-height: 0.5rem;
			padding-left: 4%;
			font-size: 0.15rem;
			color: #333;
			border-bottom: 1px solid #e5e5e5;
      font-weight: 500;
      i{
        display: inline-block;
        width: 5px;
        height: 15px;
        background-color: #0ac5ca;
        border-radius: 2px;
        margin-right: 0.075rem;
        vertical-align: middle;
      }
		}
		.rev_list {
      padding: 0.13rem 3% 0.15rem 1%;
      border-bottom: 1px dashed #e5e5e5;
      overflow: hidden;
      margin-left: 0.2rem;
			.rev_lilf {
				/*float: left;
				width: 70%;*/
				p {
					color: #333333;
					font-size: 0.14rem;
				}
				label {
					color: #666;
					display: block;
					margin-top: 0.06rem;
					font-size: 0.12rem;
				}
			}
			span {
				/*float: right;*/
        padding: 0.025rem 0.1rem;
        display: block;
        background: #0ac5ca;
        color: #fff;
        font-size: 0.13rem;
        border-radius: 0.14rem;
				/*margin-top: 0.08rem;*/
				&.greens {
					background: #4D9C30;
				}
				&.bluue {
					background: #6358F4;
				}
        &.blue{
          background: #0ac5ca;
        }
			}
		}

		.rev_list{
			display: flex;
			justify-content: space-between;
			align-content: center;
			.rev_lilf,label{
				margin-top: 0.04rem;
			}
		}
    .rev_list:last-child{
      border-bottom:0;
    }
	}
</style>
