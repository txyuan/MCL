<template>
	<div>
		<div class="city_alet" v-if="isShow">
			<div class="city_black" @click="hides"></div>
			<div class="city_cont">
				<div class="city_nav">
					<!--<p>
						<span v-for="(item,index) in citys" v-on:click="guige(index)" v-bind:class="{act:index==guigeSpan}" :key="index">{{item}}</span>
					</p>-->
					<label v-on:click="okcity">确定</label>
				</div>
				<div class="city_city">
					<div class="city_contry city_contryx">
						<p v-for="(item,index) in idclass" @click="getjie(item.firstLevelName,index,item.firstLevelId)" v-bind:class="{acte:index==showxian}" :key="index">{{item.firstLevelName}}</p>
					</div>
					<div class="city_contry city_contryj">
						<p v-for="(item,index) in addressjie" @click="choosejie(item.twoLevelName,index,item.twoLevelId)" v-bind:class="{acte:index==showjie}" :key="index">{{item.twoLevelName}}</p>
					</div>
				</div>
			</div>
		</div>
		<input type="text" v-model="xians" style="display: none;" />
		<input type="text" v-model="jies" style="display: none;" />
	</div>
</template>

<script>
//	import addressjson from "@/assets/js/address3.json";
	export default {
        name: "choose-city",
        data:()=>({
        	idclass:[],  //分类json
        	
        	isShow:false,
        	
        	showxian:0,
        	
        	addressjie:[],
        	showjie:0,
        	
        	xians:'',
        	firstLevelId:'',
        	jies:'',
        	twoLevelId:''
        }),
        methods: {
        	//分类
        	classfl(){
        		let url="UserInterface/BusinessUnion/getBusinessUnionCategoryList.ashx";
        		this.$post(url).then((data)=>{
	              if(data.rspcode != 1){
	                return;
	              }
	              this.idclass=data.subjectList;
	              this.addressjie=data.subjectList[0].levels;
	              this.firstLevelId=data.subjectList[0].firstLevelId;
	              this.twoLevelId=data.subjectList[0].levels[0].twoLevelId;
	            })
        	},
        	//显示
        	shows(){
        		this.isShow=true;
        	},
        	//点击隐藏
        	hides(){
        		this.isShow=false;
        	},
	        //获取二级分类
	        getjie(posjie,index,firstLevelId){
	        	this.showxian=index;
	        	for(let i in this.idclass){
            		if(posjie==this.idclass[i].firstLevelName){
                    	this.addressjie=this.idclass[i].levels;
                  	}
              	}
	        	if(this.xians!=posjie){
	        		this.showjie=-1;
	        	}
	        	this.xians=posjie;
	        	this.firstLevelId=firstLevelId;
	        },
	        //选择分类
	        choosejie(posjies,index,twoLevelId){
	        	this.showjie=index;
	        	this.jies=posjies;
	        	this.twoLevelId=twoLevelId;
	        },
	        //确定
	        okcity(){
	        	this.$emit('child-clas',this.xians+'-'+this.jies+','+this.firstLevelId+','+this.twoLevelId);
	        	this.isShow=false;
	        }
        },
        mounted(){
        	this.classfl();
        }
   	}
</script>

<style scoped>
	.city_alet{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 9;
		
	}
	.city_black{
		width: 100%;
		height: 100vh;
		background: rgba(000,000,000,0.4);
		position: absolute;
		left: 0;
		top: 0;
	}
	.city_cont{
		width: 100%;
		height: 4.0rem;
		background: #fff;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	.city_cont .city_nav{
		width: 100%;
		height: 0.44rem;
		border-bottom: 1px solid #ddd;
		overflow: hidden;
	}
	.city_cont .city_nav p{
		float: left;
		margin-left: 4%;
	}
	.city_cont .city_nav p span{
		display: block;
		float: left;
		margin-right: 0.3rem;
		color: #333;
		line-height: 0.44rem;
		font-size: 0.14rem;
	}
	.city_cont .city_nav p span.act{
		border-bottom: 1px solid #FF3D3D;
	}
	.city_cont .city_nav label{
		float: right;
		color: #FF3D3D;
		line-height: 0.44rem;
		font-size: 0.14rem;
		display: block;
		margin-right: 3%;
	}
	.city_city{
		
	}
	.city_contry{
		width: 50%;
		float: left;
		padding-top: 0.1rem;
		height: 3.36rem;
		overflow-y: auto;
		padding-bottom: 0.1rem;
	}
	.city_contry p{
		font-size: 0.15rem;
		height: 0.36rem;
		line-height: 0.36rem;
		text-align: center;
	}
	.city_contrys p.acte{
		color: #FF3D3D;
	}
	.city_contryc p.acte{
		color: #FF3D3D;
	}
	.city_contryx p.acte{
		color: #FF3D3D;
	}
	.city_contryj{
		background: #eee;
	}
	.city_contryj p.acte{
		color: #FF3D3D;
	}
</style>