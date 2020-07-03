<template>
	<div>
		<mt-header fixed title="今日提醒">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="todyinform">
			<ul class="remindList">
				<router-link tag="li" to="" v-for="(item,index) in todynews" :key="index" class="borderBottom">
					<div class="left">
						<div class="rowTop">
							<img src="@/assets/images/yinshi@2x.png" class="icon" />
							<span class="huiFont font14">{{item.takingcondition}}</span>
						</div>
						<div class="rowBottom font12">
							<p class="yellow" v-if="item.mtypevalue=='1'">应完成时间：<span>{{item.completiontime}}</span> 已超时：<span>{{item.timeouttime}}</span></p>
						</div>
					</div>
					<!-- <div class="right yellow font14" @click="cklcl(item)">
						查看 <img src="@/assets/images/next@2x.png" alt="" width="22" class="next" />
					</div> -->
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    todynews: []
  }),
  methods: {
    // 今日提醒跳转
    cklcl (item) {
      if (item.mtypevalue == 1) {
        this.$router.push('/uploadPhoto?skey=' + item.skey + '&mealtype=' + item.mealname)
      } else if (item.mtypevalue == 2) {
        this.$router.push('/nutritionUploadPhoto?skey=' + item.skey + '&mealtype=' + item.mealname)
      } else if (item.mtypevalue == 3) {
        this.$router.push('/sport?skey=' + item.skey)
      } else if (item.mtypevalue == 4) {
        this.$router.push('/mood?skey=' + item.skey)
      } else if (item.mtypevalue == 5) {

      } else if (item.mtypevalue == 6) {
        this.$router.push('/weight?skey=' + item.skey)
      } else if (item.mtypevalue == 7) {
        this.$router.push('/yearCard?skey=' + item.skey)
      } else if (item.mtypevalue == 8) {
        this.$router.push('/wx_Entrance/service?skey=' + item.skey)
      }
    },
    // 今日提醒
    remindToday () {
      let url = 'UserInterface/PatientHomePageRemindToday.ashx'
      let param = {
        functiontype: '',
        pagesize: 20,
        pagecount: 1
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.todynews = data.remindtoday
      })
    }
  },
  mounted () {
    this.remindToday()
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
	.todyinform{
		padding-top:43px;
	}
	/*今日提醒*/
	.remindList {
		&>li {
			padding: 0.13rem 0.12rem;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
		}

		&>li .left {
			.rowTop .icon {
				width: 0.14rem;
				vertical-align: middle;
				margin-right: 5px;
			}
		}

		&>li .right {
			text-align: right;
			line-height: 0.37rem;
		}

		&>li .right .next {
			width: 0.22rem;
			vertical-align: middle;
			margin-left: 0.1rem;
		}

		.rowTop {
			margin-bottom: 0.05rem;
		}

		.rowTop>* {
			vertical-align: middle;
		}
	}
</style>
