<template>
  <div class="weigh-root">
    <div id="body_main" style="background: #FFFFFF;padding-bottom: 0;">
  		<mt-header title="体重记录" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
	    </mt-header> 
		
		<div class="title">
	  		<p> <span class="font16 name">体重</span> <span class="huiFont font12">单位：公斤</span></p>
	  	</div>
	  	
	  	<div id="weighEchart"></div>
		
	  	<div class="weight_cla">
			<div class="weight_clared">
				<span></span>
				<p>临界体重：{{dangerWeight}} 公斤</p>
			</div>
			<div class="weight_clared weight_clagre">
				<p>标准体重：{{standardWeight}} 公斤</p>
				<span></span>
			</div>
		</div>
		
	  	<div class="btns">
	  		<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save">记录体重</mt-button>
	  	</div>
	  	
	  	<div class="jiluInfo">
	  		<ul class="borderTop">
	  			<li class="font12">
	  				<div class="row">
	  					<p class=""> <span class="font17 num">{{startWeight}}</span> <span>公斤</span> </p>
						<p class="">开始记录</p>	
	  				</div>
	  				<div class="row">
	  					<p class="">初始体重</p>
	  					<p class="">{{startRecordDate}}</p>
	  				</div>
	  			</li>
	  			<li class="font12">
	  				<div class="row">
	  					<p class=""> <span class="font17 num">{{newWeight}}</span> <span>公斤</span> </p>
						<p class="">最新记录</p>	
	  				</div>
	  				<div class="row">
	  					<p class="">最新体重</p>
	  					<p class="">{{newRecordDate}}</p>
	  				</div>
	  			</li>
	  		</ul>
	  		
	  		<ul class="borderTop">
				<h3 class="allweit">所有体重记录</h3>
				<loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE" :isDefaultLoading="false">
					<div slot="content">
						<li class="font12" v-for="(item,index) in list" :key="index" :item="item">
							<div class="row">
								<p class=""> <span class="font17 num">{{item.Weight}}</span> <span>公斤</span> </p>
								<p class="">我的记录</p>	
							</div>
							<div class="row">
								<p class="">体重信息</p>
								<p class="">{{item.RecordDate}}</p>
							</div>
						</li>
					</div>
				</loadMore>
	  		</ul>
	  	</div>
	  	
	  	<!-- 遮罩层 -->
	  	<div id="mark" :style="{display: (show?'block': 'none')}">
	  		<div class="modal" :class="show && 'show' ">
	  			<div class="close" @click="hidejl"></div>
	  			<div class="text-center">
	  			 	<p class="today">今天</p>
		  			<img src="@/assets/images/paizhao@2x.png" alt="" width="60" height="60"/>
		  			<div class="huiFont font12 note">
		  				<p>用照片记录改变</p>
		  				<p>（照片将自动发布到个人动态中）</p>
		  			</div>
		  			<!-- <p class="yellow nums"> <span class="num">69.5</span> <span class="font14">公斤</span></p> -->
	  			</div>
	  			<!-- <div class="chizi"></div> -->
	  			<DLRuler :value="50.0" :min="0" :max="300" :onChange="changeWeight"></DLRuler>
	  			<mt-button type="primary" class="theme-button" style="margin-top:0.2rem;" size="large" @click="okweigt">保存</mt-button>
	  		</div>
	  	</div>
	  	
	</div>  
  </div>
</template>

<script>
	import echarts from 'echarts';
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	import DLRuler from './ruler.vue';
    export default {
        name: "weigh",
        data:()=>({
			dangerWeight:'',  //危险体重
			standardWeight:'',  //标准体重
			show: false,
			startWeight:'',  //开始体重
			startRecordDate:'',  //开始记录日期
			newWeight:'',  //最新体重
			newRecordDate:'',  //最新记录日期
			list:[],
			wegvale:50,
			param:{
			  pagesize: 10,
			  pagecount: 0,
			},
        }),
        methods:{
        	initEchart(){
        		var option = {
        			grid:{
        				top: 20,
        				bottom: 40
        			},
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: []
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
					    {
					        data: [],
					        type: 'line',
					        // areaStyle: {}
					    },
					    {
					        data: [],
					        type: 'line',
							itemStyle:{
				                normal:{
				                    lineStyle:{
				                        width:1,
				                        type:'dotted'  //'dotted'虚线 'solid'实线
				                    }
				                }
				            },
					    },
					    {
					        data: [],
					        type: 'line',
							itemStyle:{
				                normal:{
				                    lineStyle:{
				                        width:1,
				                        type:'dotted'  //'dotted'虚线 'solid'实线
				                    }
				                }
				            },
					    },
				    ],
				    color:["#F78335", "#09AC17", "#CB0000"]
				};
        		//获取dom容器
				var myChart = echarts.init(document.getElementById('weighEchart'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				let url = "UserInterface/WeightWeekRecordInfo.ashx";
					this.$post(url).then((data)=>{
					 if(data.rspcode != 1 ){
					   return;
					 }
					 var weighth=[],recordDate=[],dangerWeight=[],standardWeight=[];
					 for(var i=0;i<data.data.length;i++){
						 weighth.push(data.data[i].Weight);
						 recordDate.push(data.data[i].RecordDate);
						 dangerWeight.push(data.data[i].DangerWeight);
						 standardWeight.push(data.data[i].StandardWeight);
					 }
					 option.series[1].data=standardWeight;
					 option.series[0].data=weighth;
					 option.series[2].data=dangerWeight;
					 option.xAxis.data=recordDate;
					this.dangerWeight=data.data[0].DangerWeight;
					this.standardWeight=data.data[0].StandardWeight;
					this.startWeight=data.StartWeight;
					this.startRecordDate=data.StartRecordDate;
					this.newWeight=data.NewWeight;
					this.newRecordDate=data.NewRecordDate;
					myChart.setOption(option);
				})
        	},
			//体重记录
			shoplist(success) {
			  let url = "UserInterface/WeightRecordInfo.ashx";
			  this.$post(url,this.param).then((data)=>{
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
			},
        	save(){
        		this.show = true;
        	},
			hidejl(){
				this.show = false;
			},
			// 保存
			okweigt(){
				let url = "UserInterface/UpdateWeightRecord.ashx";
				let param={
					Weight:this.wegvale
				};
				this.$post(url,param).then((data)=>{
					 if(data.rspcode != 1 ){
					   return;
					 }
					 this.$Toast(data.rspdesc);
					 this.show = false;
					 this.initEchart();
					 this.param.pagecount = 0;
					 this.$refs.loadMoreE.getList();
				})
			},
			changeWeight(val) {
				this.wegvale=val;
			}
        },
        mounted: function(){
        	this.initEchart();
			this.param.pagecount = 0;
			this.$refs.loadMoreE.getList();
        },
		components:{
		  loadMore,
		  DLRuler
		},
		created() {
			if (localStorage.userInfo) {
				
			} else {
				this.$router.push('/login');
			}
		}
    }
</script>

<style scoped lang="scss">
  .title{
  	padding: 0.20rem;
  }
  .title .name{
  	color: #000000;
  }
  #weighEchart{
  	margin: 0 0.2rem;
  	height: 1.5rem;
  }
  .btns{
  	padding: 0.20rem 0.66rem;
  }
   
  .jiluInfo{
  	padding:0 0.32rem;
  }
  .jiluInfo ul li .num{
  	color: #000000;
  	font-size: 0.20rem;
  }
  .jiluInfo ul li{
  	padding: 0.15rem 0;
  }
  .jiluInfo ul li .row{
  	padding: 0.02rem 0;
  	display: flex;
  	justify-content: space-between;
  	align-items: baseline;
  }
  
  .modal.show{
  	transform: translateY(0);
  }
  .modal{
  	position: absolute;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	background: #FFFFFF;
  	border-top-left-radius: 10px;
  	border-top-right-radius: 10px;
  	transition: transform ease 0.6s;
  	transform: translateY(1000px);
  	.today{
  		margin: 20px 0;
  	}
  	.note{
  		margin-top: 3px;
  		margin-bottom: 20px;
  	}
  	.nums{
  		margin-bottom: 20px;
  	}
  	.num{
  		font-size: 0.25rem;
  	}
	.chizi{
	  height: 0.6rem;
	  background: linear-gradient(180deg,rgba(255,205,80,1) 0%,rgba(252,209,134,1) 100%);
	  margin-bottom: 20px;
	}	
  }
  .close{
	  width: 0.2rem;
	  height: 0.2rem;
	  background: url(./../../../assets/images/guanbi@2x.png) no-repeat center center;
	  background-size: 100%;
	  position: absolute;
	  right: 0.14rem;
	  top: 0.1rem;
  }
  .weight_cla{
	  width: 80%;
	  margin: 0 auto;
	  overflow: hidden;
	  margin-top: 0.1rem;
	  .weight_clared{
		  width: 50%;
		  overflow: hidden;
		  float: left;
		  span{
			  display: block;
			  width: 0.15rem;
			  height: 0.06rem;
			  background: #CB0000;
			  float: left;
			  margin-top: 0.05rem;
			  border-radius: 0.03rem;
		  }
		  p{
			  font-size: 0.12rem;
			  font-weight: 600;
			  color: #CB0000;
			  margin-left: 0.06rem;
			  float: left;
		  }
		  &.weight_clagre{
			  float: right;
			  span{
				  float: right;
				  background: #09AC17;
			  }
			  p{
				  color: #09AC17;
				  float: right;
			  }
		  }
	  }
  }
  .allweit{
	  padding-top: 0.1rem;
	  font-weight: 700;
	  font-size: 0.16rem;
  }
</style>
