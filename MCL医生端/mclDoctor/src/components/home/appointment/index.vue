<template>
	<div class="achievement_root padding-header">
		<mt-header title="复诊预约" fixed class="borderBottom">
			<div slot="left">
				<router-link to="/wx_Entrance/personal" style="color: initial">
					<mt-button icon="back"></mt-button>
				</router-link>
			</div>
			<!-- <div slot="right">
				<img src="https://resource.jtsc.club/rili@2x.png" alt="" style="width: 20px;height: 20px;" @click="timePickerShow">
			</div> -->
		</mt-header>

		<!-- <div class="showMoney text-center">
			<p>
				{{current_amount}}
			</p>
		</div> -->

		<div id="navbar" class="borderBottom">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('0')">
					<p>预约中</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('1')">
					<p>预约完成</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('2')">
					<p>预约失败</p>
				</mt-tab-item>
			</mt-navbar>
		</div>

		<!-- tab-container -->
		<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer" :isDefaultLoading="false">
			<div slot="content">
				<div class="rev_list" v-for="(item,index) in list" :key="index" @click="appdetail(item.sKey)">
					<div class="rev_lilfc">
						<div class="rev_lilf">
							<p>{{item.treatment}}</p>
						</div>
						<label>{{item.create_date}}</label>
						<span class="greens">{{item.ContactName}}</span>
					</div>
				</div>
			</div>
		</loadMore>

	</div>
</template>

<script>
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
export default {
  name: 'achievement',
  data: () => ({
    selected: 'tab0',
    pickerVisible: false,
    current_amount: '', // 总积分
    list: [], // l{money:'+200',create_date:'2018-02-03',remarks:'邀请好友'}
    param: {
      'pagesize': 10,
      'pagecount': 0,
      'direction': 0
    }
  }),
  methods: {
    // tab切换
    tabClick (val) {
      this.$Indicator.loading()
      this.param.direction = val
      this.reloadLoadMore()
      setTimeout(() => {
        this.$Indicator.close()
      }, 200)
    },
    // 重新加载
    reloadLoadMore () {
      this.param.pagecount = 0
      this.$refs.loadMoreE.getList()
    },
    // 获取列表
    getList (success) {
      let url = 'UserInterface/doctor/ReviewthebookingList.ashx'
      if (this.param.pagecount == 1) {
        this.list = []
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspCode != 1) {
          return
        }
        let modelList = data.data
        this.list = [...this.list, ...modelList]
        // 加载更多组件触发回调
        if (success) {
          success(modelList, this.list)
        }
        const {current_amount} = data
        this.current_amount = current_amount
      })
    },
    timePickerShow () {
      let {
        monthPicker
      } = this.$refs
      monthPicker.show()
    },
    appdetail (sk) {
      this.$router.push('/appdetails?skey=' + sk)
    }
  },
  mounted () {
    this.reloadLoadMore()
  },
  components: {
    loadMore
  }
}
</script>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.mint-cell.borderBottom {
		padding: 0.06rem 0;
		align-items: center;
		align-content: center;
	}

	.right.text-right {
		color: $color60;
		font-size: 0.15rem;

		&>span:nth-child(2) {
			margin-top: 5px;
		}
	}

	.showMoney {
		margin-bottom: 5px;
		background: #ffffff;

		p {
			line-height: 0.92rem;
			font-size: 0.32rem;
		}
	}

	.showMoney {
		background: #FFDFC9;
		color: #F78335;
		font-weight: 500;
	}

	.friend_all {
		background: #ffffff;
		font-size: 15px;
		padding: 14px 0;
		color: $color33;
		margin-bottom: 5px;

		/*position: fixed;*/
		/*left: 0;*/
		/*right: 0;*/
		/*top: 43px;*/
		ul {
			display: flex;

			li {
				flex: 1;
			}

			.num {
				margin-top: 6px;
				font-size: 18px;
			}
		}
	}

	.rev_list {
		padding: 0.13rem 3% 0.15rem 4%;
		border-bottom: 1px solid #eee;
		overflow: hidden;
		background: #fff;
		.rev_lilfc{
			// width: 100%;
			// overflow: hidden;
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
				height: 0.28rem;
				padding: 0 0.14rem;
				display: block;
				background: #F78335;
				color: #fff;
				line-height: 0.28rem;
				font-size: 0.14rem;
				border-radius: 0.14rem;
				/*margin-top: 0.08rem;*/
				&.greens {
					background: #4D9C30;
				}
				&.bluue {
					background: #6358F4;
				}
			}
		}

	}

	.rev_lilfc{
		display: flex;
		justify-content: space-between;
		align-content: center;
		.rev_lilf,label{
			margin-top: 0.08rem;
		}
	}
</style>
