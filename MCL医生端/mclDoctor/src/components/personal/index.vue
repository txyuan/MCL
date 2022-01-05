<template>
	<div>
		<mt-header fixed title="我的"></mt-header>
		<div class="content">
			<router-link to="/personaldata" style="overflow: hidden;display: block;">
				<div class="person_info">
					<img :src="repData.ImgUrl" style="width:0.64rem;height:0.64rem;border-radius: 0.32rem">
					<div class="info">
						<p class="name">{{repData.ContactName}}</p>
						<p class="tel">{{repData.ContactPhone}}</p>
					</div>
					<div class="person_type">
						<span v-if="repData.Title!=''">{{repData.Title}}</span>
						<i class="mint-cell-allow-right"></i>
					</div>
				</div>
			</router-link>
			<div class="person_list">
				<mt-cell title="咨询服务" is-link to="/consultation" class="clickr">
					<img slot="icon" src="../../assets/images/zixunfuwu.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="管理服务" is-link to="/myAchieve" class="clickr">
					<img slot="icon" src="../../assets/images/guanlifuwu.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="零售服务" is-link to="/achieves" class="clickr">
					<img slot="icon" src="../../assets/images/lingshoufuwu.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="套餐服务" is-link to="/packService" class="clickr">
					<img slot="icon" src="../../assets/images/taocaifuwu.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="服务业绩查看" is-link to="/packService" class="clickr">
					<img slot="icon" src="../../assets/images/taocaifuwu.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="邀请好友" is-link :to="`/share?title=邀请好友&UserKey=${UserKey}&SessionId=${SessionId}`" class="clickr">
					<img slot="icon" src="../../assets/images/yaoqinghaoyou@2x.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="我的邀请" is-link to="/myTeam">
					<img slot="icon" src="../../assets/images/wodeyaoqing.png" width="24" height="24">
				</mt-cell>
				<!-- <mt-cell title="收益管理" is-link to="/capitalRecord" class="clickr" style="margin-top: 0.1rem;">
					<img slot="icon" src="../../assets/images/zijinjilu@2x.png" width="24" height="24">
				</mt-cell>
				<mt-cell title="卡号管理" is-link to="/addbcard" class="clickr">
					<img slot="icon" src="../../assets/images/kahaoguanli @2x.png" width="24" height="24">
				</mt-cell> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    UserKey: '',
    SessionId: '',

    repData: {}
  }),
  methods: {
    // 个人信息
    information () {
      // this.$Indicator.loading();
      let url = 'UserInterface/GetUserShowInfo.ashx'
      this.$post(url).then((data) => {
        this.$Indicator.close()
        let model = data.data
        this.repData = model
      })
    }
  },
  created () {
    if (localStorage.userInfo) {
      this.UserKey = JSON.parse(localStorage.userInfo).UserKey
      this.SessionId = JSON.parse(localStorage.userInfo).SessionId
    }
  },
  mounted () {
    this.information()
  }
}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	//头像部分
	.person_info {
		padding: 0.14rem 0.10rem;
		background: #ffffff;
		display: flex;
		position: relative;
		margin-bottom: 0.05rem;

		img {
			margin-right: 0.10rem;
		}

		.info {
			flex: 1;
			height: 64px;
			display: flex;
			flex-wrap: wrap;
			align-content: space-around;

			&>p {
				width: 100%;
				font-size: 0.18rem;
				color: $color40;
			}

			&>p.name {
				@include ellipsis(1);
			}
		}

		.person_type {
			line-height: 64px;
			padding-right: 28px;
			color: $color40;
		}

		.person_type span {
			height: 0.28rem;
			border-radius: 0.14rem;
			line-height: 0.28rem;
			color: #fff;
			width: 0.8rem;
			display: inline-block;
			font-size: 0.13rem;
			text-align: center;
			background-image: linear-gradient(to right, #F39645, #F46F42);
		}
	}

	.content {
		padding-top: 43px;
		padding-bottom: 56px;
	}

  .person_list .clickr{
    position: relative;
  }
  .person_list .clickr::after{
    background-color: #000;
    content: " ";
    opacity: 0.1;
    right: 0;
    bottom: 0;
    left: 0.1rem;
    height: 1px;
    position: absolute;
  }
  .person_list .clickr:last-child::after{

    opacity: 0;
  }
</style>
