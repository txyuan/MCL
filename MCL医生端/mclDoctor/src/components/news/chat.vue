<template>
	<div>
		<mt-header title="消息" fixed>
		    <div slot="left">
		      <header-back>
		        <mt-button icon="back"></mt-button>
		      </header-back>
		    </div>
		</mt-header>
		
		<iframe :src="`${KFURL}/login?username=${repData.ContactPhone}&userkey=${userkey}`" width="100%" style="height: calc(100vh - 48px);border: none;margin-top: 43px;"></iframe>

		<!-- <mt-header title="白容因" fixed>
		    <div slot="left">
		      <header-back>
		        <mt-button icon="back"></mt-button>
		      </header-back>
		    </div>
		</mt-header>
		<div class="prescript">
			<router-link to="/chatSet">
				<img src="@/assets/images/211铃铛@2x.png" />
			</router-link>
			<p>因为患者最近身体虚弱，输液导致的身体浮肿，等一周之后就好了。</p>
		</div> -->
	</div>
</template>

<script>
	import { KFURL } from '@/configURL.js'
	export default {
	    name: "index",
	    data:()=>({
			KFURL,
			repData:{},
			userkey: '',
	    }),
	    methods:{
			//个人信息
			information() {
				// this.$Indicator.loading();
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					this.$Indicator.close();
					let model = data.data;
					this.repData = model;
				})
			},
	    },
		mounted(){
			this.information();
			this.userkey = JSON.parse(localStorage.getItem('userInfo')).UserKey
		}
	}
</script>

<style scoped lang="scss">
	.prescript{
		margin-top: 53px;
		img{
			width: 0.6rem;
			float: right;
			margin-right: 5%;
		}
		p{
			float: right;
			background: #fff;
			margin-right: 0.1rem;
			width: 60%;
			padding: 0.1rem;
			font-size: 0.14rem;
			line-height: 0.2rem;
			border-radius: 4px;
		}
	}
</style>
