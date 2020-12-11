<template>
	<div>
		<mt-header fixed title="常见问题">
		  <div slot="left">
	        <header-back>
	           <mt-button icon="back"></mt-button>
	        </header-back>
	      </div>
		</mt-header>
		<div class="search_cont">
			<img src="../../../assets/images/position.png" />
			<input type="text" v-model="problemname" @keyup.enter="getDetailInfo" placeholder="搜索相应问题" />
			<ul>
				<li v-for="(item,index) in problem">
					<router-link :to="`/questionDetail/`+item.skey">{{item.content}}</router-link>
				</li>
			</ul>
		</div>
		<!-- <div class="bottd">
			<div class="bottdg">
				<div class="row">
					<img src="@/assets/images/picdc.png" />
				</div>
				<p>营养管理</p>
			</div>
			<div class="bottdg">
				<div class="row">
					<img src="@/assets/images/picdc.png" />
				</div>
				<p>运动管理</p>
			</div>
			<div class="bottdg">
				<div class="row">
					<img src="@/assets/images/picdc.png" />
				</div>
				<p>主治医生</p>
			</div>
		</div> -->
	</div>
</template>

<script>
	export default {
	    name: "index",
	    data:()=>({
	      problemname:'',
		  problem:[]
	    }),
		methods:{
			// 搜索问题
			getDetailInfo(){
				let url = "UserInterface/PatientHomePageProblemList.ashx";
				let param={
					problemname:this.problemname
				};
				this.$post(url,param).then((data)=>{
					if(data.rspcode != 1 ){
						return;
					}
					this.problem = data.data;
			   })
			},
		},
		mounted(){
			this.getDetailInfo();
		},
		components:{

		}
	}
</script>

<style scoped lang="scss">
  .mint-header {
    height:0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
	.search_cont{
    padding-top:0.44rem;
    text-align: center;
    background-color: #FFFFFF;
		img{
			width: 100%;
		}
		input{
			position: relative;
			width: 70%;
			padding: 0 2% 0 12%;
			height: 0.44rem;
			top: -0.26rem;
			background:rgba(255,255,255,1);
			box-shadow:0px 2px 8px 0px rgba(0,0,0,0.5);
			border-radius:6px;
			background: #fff url(../../../assets/images/sousuowenti@2x.png) no-repeat 3% center;
			background-size: 0.2rem;
		}

    input::-webkit-input-placeholder {
      color: #787878;
    }
		ul{
      padding: 0 0 0.5rem 5%;
      text-align: left;
			li{
        border-bottom: 1px solid #e5e5e5;
        font-size: 0.142rem;
        padding: 0.14rem 0.1rem 0.14rem 0.1rem;
        color: #666;
				a{
					color: #333333;
				}
			}
		}
	}
	.bottd{
		width: 100%;
		bottom: 0;
		left: 0;
		padding: 0.1rem 0;
		position: fixed;
		z-index: 1;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		background: #ffffff;
		.bottdg{
			height: 100%;
			-webkit-box-flex: 1;
			-ms-flex: 1;
			flex: 1;

			text-align: center;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
			-ms-flex-line-pack: center;
			align-content: center;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
			font-size: 0.16rem;
			color: #636768;
			.row{
				width: 100%;
				img{
					height: 0.22rem;
				}
			}
			p{
				font-size: 0.12rem;
			}
		}
	}
</style>
