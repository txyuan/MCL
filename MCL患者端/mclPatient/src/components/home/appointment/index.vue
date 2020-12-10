<template>
	<div class="caseUpload-root padding-header">
		<mt-header title="复诊预约" fixed class="borderBottom">
			<div slot="left">
				<router-link to="/wx_Entrance/home" style="color: initial;">
					<mt-button icon="back"></mt-button>
				</router-link>
			</div>
		</mt-header>

		<div class="page_btn text-center">
			<img src="@/assets/images/病例.png" width="79" style="margin-bottom: 15px;" />
			<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="$router.push(`/makeform`)">预约</mt-button>
		</div>

		<div class="rev_fuc" style="margin-top: 0.1rem;padding-bottom: 0.3rem;">
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
				<div slot="content">
					<h3><i></i>历史预约</h3>
					<!--<div class="rev_list" v-for="(item,index) in list" :key="index">
						<div class="rev_lilf">
							<p>{{item.name}}</p>
							<label>预约时间： {{item.CreateTime}}</label>
						</div>
						<label>{{item.CreateTime}}</label>
						<router-link to="/makeform?pageState=look">
							<span class="greens">查看报告</span>
						</router-link>
					</div>-->

					<div class="rev_list" v-for="(item,index) in list" :key="index">
						<div class="rev_lilfc">
							<div class="rev_lilf">
								<p>{{item.name}}</p>
							</div>
							<label>{{item.CreateTime}}</label>
              <div v-if="item.Booking_status == '预约成功'" >
                <span class="success">{{item.Booking_status}}</span>
              </div>
              <div v-if="item.Booking_status == '预约失败'">
                <span class="fail">{{item.Booking_status}}</span>
              </div>
              <div v-if="item.Booking_status == '预约中'">
                <span class="blue">{{item.Booking_status}}</span>
              </div>
						</div>

						<div class="rev_other">{{item.other}}</div>
					</div>
				</div>
			</loadMore>
		</div>
	</div>
</template>

<script>
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
export default {
  name: 'appointment',
  data: () => ({
    param: {
      pagesize: 10,
      pagecount: 0
    },
    list: []
  }),
  methods: {
    // 获取列表
    getList (success) {
      let url = 'UserInterface/getReviewthebooking.ashx'
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        let modelList = data.data
        if (this.param.pagecount == 1) {
          this.list = [...modelList]
        } else {
          this.list = [...this.list, ...modelList]
        }
        // 加载更多组件触发回调
        if (success) {
          success(modelList, this.list)
        }
      })
    }
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
		h3{
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
        background-color: #0AC5C9;
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
			.rev_lilfc{
				// width: 100%;
				// overflow: hidden;
				.rev_lilf {
					/*float: left;
					width: 70%;*/
					p {
						color: #333333;
						font-size: 0.145rem;
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
          background: #0AC5C9;
          color: #fff;
          font-size: 0.13rem;
          min-width: 0.5rem;
          text-align: center;
          border-radius: 0.14rem;
					/*margin-top: 0.08rem;*/
          &.success{
            background: #4ec622;
          }
          &.fail{
            background: #cccccc;
          }
          &.blue{
            background: #0AC5C9;
          }
				}
			}

		}

		.rev_lilfc{
			display: flex;
			justify-content: space-between;
			align-content: center;
			.rev_lilf,label{
        margin-top: 0.04rem;
      }
      label{
        font-size: 0.14rem;
        color: #666666;
      }
		}
		.rev_other{
			font-size: 0.13rem;
			color: #666;
		}
	}
</style>
