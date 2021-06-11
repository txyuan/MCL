<template>
	<div>
		<div class="fix_top">
			<mt-header fixed title="取消订单">
			  <div slot="left">
			    <header-back>
			       <mt-button icon="back"></mt-button>
			    </header-back>
			  </div>
			</mt-header>
		</div>
		<div class="delorder">
			<div class="delorder_list">
				<div class="delorder_li" v-for="(item,index) in liList" :key="index" v-on:click="addClass(index,item.title)" v-bind:class="{ delact:index==current}">
					<img :src="item.imppg" />
					<p>{{item.title}}</p>
				</div>
			</div>
			<textarea v-model="allno" placeholder="都不是，偷偷告诉我们吧～～（50字以内）"></textarea>
			<span @click="okupshop">确认取消</span>
		</div>
	</div>
</template>

<script>
	import imag from '@/assets/images/tabbar/xiaoxi@2x.png'
	import imag2 from '@/assets/images/yaopin@2x.png'
	import imag3 from '@/assets/images/yinshi@2x.png'
	export default {
		name: "index",
		data: () => ({
			allno:'',  //备注
			current:0,
			liList:[
				{title:'行程有变，去不了了',imppg:imag},
				{title:'身体健康问题',imppg:imag2},
				{title:'家人担心，不同意前往',imppg:imag3}
			],
			acskey:'',  //订单明细主键
			problem:'',  //问题
		}),
		methods: {
			addClass:function(index,problems){ 
				this.current=index;
				this.problem=problems;
			},
			okupshop() {
				let url = "UserInterface/GETActivityConfirmCancel.ashx";
				let param = {
					acskey: this.acskey,
					problem: this.problem,
					remarks: this.allno
				};
				this.$post(url, param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.$router.push('/activityOrder');
				})
			},
		},
		mounted(){
			let sKey = this.$route.params.skey;
			this.acskey=sKey;
		},
	}
</script>

<style scoped lang="scss">
	.delorder {
		padding: 0 3%;
		margin-top: 90px;

		.delorder_list {
			width: 92%;
			background: #fff;
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
			border-radius: 3px;
			overflow: hidden;
			margin: 0 auto;

			.delorder_li {
				height: 0.48rem;
				border-bottom: 1px solid #A4B4B2;
				overflow: hidden;

				img {
					height: 0.2rem;
					float: left;
					margin: 0.14rem 0.2rem;
				}

				p {
					float: left;
					line-height: 0.48rem;
					font-size: 0.14rem;
					color: #60686B;
				}

				&.delact {
					background: url(../../../../assets/images/click_select@2x.png) no-repeat 94% center;
					background-size: 0.14rem;
				}
			}

		}

		textarea {
			width: 86%;
			margin: 0 auto;
			display: block;
			padding: 0.1rem 3%;
			color: #666;
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
			background: #fff;
			font-size: 0.13rem;
			height: 0.62rem;
			margin-top: 0.22rem;
		}

		span {
			width: 92%;
			height: 0.44rem;
			line-height: 0.44rem;
			text-align: center;
			color: #fff;
			font-size: 0.16rem;
			display: block;
			background: #F78335;
			margin: 0 auto;
			border-radius: 0.22rem;
			margin-top: 0.6rem;
		}
	}
</style>
