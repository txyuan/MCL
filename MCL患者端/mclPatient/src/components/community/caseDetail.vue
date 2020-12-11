<template>
	<div>
		<mt-header title="案例" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="case_det">
			<div class="caseTitle">
				<span class="font20">{{data.name}}</span>
			</div>
			<div class="des">
				<div class="article-time">
					<img src="@/assets/images/time.png" alt=""/> <span>{{data.createDate}}</span>
				</div>
				<!-- <div class="seeNum">
					<img src="@/assets/images/eyeh.png" alt=""/> <span>{{data.casePeopleCount}}</span>
				</div> -->
			</div>
			<div v-html="data.content"></div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'case-detail',
  data: () => ({
    param: {
      skey: ''
    },
    data: {}
  }),
  methods: {
    getInfo () {
      let url = 'UserInterface/GetCommunityCaseDetail.ashx'
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.data = data
        // this.content = data.content;
      })
    }
  },
  mounted () {
    this.param.skey = this.$route.query.id
    this.getInfo()
  }
}
</script>

<style scoped lang="scss">
	.case_det{
		background: #fff;
		min-height: 100vh;
		padding:0.15rem;
		padding-top: 43px;
		box-sizing: border-box;
	}
	.des{
		padding: 0.05rem 0;
    padding-bottom: 0.1rem;
	}
	.seeNum, .article-time {
		padding-right: 0.1rem;
		font-weight: 500;
		display: inline-block;

		img {
			width: 0.16rem;
			vertical-align: middle;
		}

		span {
			font-size: 0.135rem;
			color: #787878;
			vertical-align: middle;
		}
	}
	.caseTitle{
		display: block;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>
