<template>
	<div>
		<mt-header title="今日饮食" fixed>
		  <div slot="left">
		      <header-back>
		        <mt-button icon="back"></mt-button>
		      </header-back>
		    </div>
		</mt-header>
		<div class="uopss_cont">
			<div class="yinshhi_list">
				<div class="title margin10 marginTop10">
					<div class="wrap">
						<span class="font16">饮食时间</span>
						<span class="float_right huiFont9">{{mealtypeText}}</span>
					</div>
				</div>
			</div>
			
			<!-- 今日饮食 -->
			<div class="marginTop10 yinshhi_list" style="background: #fff;">
				<div class="title">
					<div class="wrap borderBottom">
						<span class="font16">今日饮食</span>
						<span class="float_right huiFont9">食用量</span>
					</div>
				</div>
				<!-- 默认接口返回的数据 -->
				<mt-cell v-for="(item,index) in dietPlanInfo" :key="index" @click.native="showModal(item)">
					<img slot="icon" :src="item.foodimg" width="46" height="46">
					<div slot="title" class="titleWrap">
						<span class="mint-cell-text">{{item.foodname}}</span>
						<span class="mint-cell-label font12 huiFont99">建议食用量：{{item.foodconsumption}}{{item.gramunit}}</span>
					</div>
					<div class="font14 huiFont99">
						<span style="margin-right: 5px;vertical-align: middle;">
							<i v-if="item.resultObj" style="font-style:normal">{{item.resultObj.foodkcal}}</i>
							<i v-else style="font-style:normal">{{item.foodkcal}}</i>
							{{item.kcalunit}}</span>
						
					</div>
				</mt-cell>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    name: "uploadss",
	    data:()=>({
			dietPlanInfo:[],
			mealtype:'01',
			mealtypeText:'早餐'
		}),
		methods:{
			gettodyeat(){
				let url = "UserInterface/DietPlanInfo.ashx";
				let param={
					distinguish: this.mealtype,
					flag:1,
				};
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.dietPlanInfo=data.data;
				})
			}
		},
		mounted(){
			const {mealtype} = this.$route.query;
			if(mealtype){
				let mealtypeText = "";
				switch(mealtype){
					case "01":
					mealtypeText = "早餐";
					    break;
					case "02":
					mealtypeText = "午餐";	
					    break;
					case "03":
					mealtypeText = "晚餐";	
					    break;
					case "04":
					mealtypeText = "加餐";
					    break;
				}
				this.mealtypeText = mealtypeText;
				this.mealtype = mealtype;
			}
			this.gettodyeat();
		}
	}
</script>

<style scoped lang="scss">
	.uopss_cont{
		padding-top: 43px;
	}
	.yinshhi_list {
		background: #FFFFFF;
	
		.title {
			padding-left: 0.12rem;
			line-height: 45px;
		}
	
		.wrap {
			padding-right: 15px;
		}
	
		.wrap>* {
			vertical-align: middle;
		}
	
		.wrap>.icon {
			margin-right: 5px;
		}
	}
	.titleWrap {
		display: inline-block;
		vertical-align: middle;
	}
	
	.yinshhi_list .mint-cell {
		min-height: 66px;
	}
</style>
