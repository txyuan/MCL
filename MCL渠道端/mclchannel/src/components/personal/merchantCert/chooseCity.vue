<template>
	<div>
		<div class="city_alet" v-if="isShow">
			<div class="city_black" @click="hides"></div>
			<div class="city_cont">
				<div class="city_nav">
					<p>
						<span v-for="(item,index) in citys" v-on:click="guige(index)" v-bind:class="{act:index==guigeSpan}" :key="index">{{item}}</span>
					</p>
					<label v-on:click="okcity">确定</label>
				</div>
				<div class="city_city">
					<div class="city_contry city_contrys" v-if="contryshow">
						<p v-for="(item,index) in addressjson" @click="getcitys(item.name,index)" v-bind:class="{acte:index==showsheng}" :key="index">{{item.name}}</p>
					</div>
					<div class="city_contry city_contryc" v-if="contryshi">
						<p v-for="(item,index) in addresshi" @click="getxian(item.name,index)" v-bind:class="{acte:index==showshi}" :key="index">{{item.name}}</p>
					</div>
					<div class="city_contry city_contryx" v-if="contryxian">
						<p v-for="(item,index) in addressxian" @click="getjie(item.name,index)" v-bind:class="{acte:index==showxian}" :key="index">{{item.name}}</p>
					</div>
					<div class="city_contry city_contryj" v-if="contryjie">
						<p v-for="(item,index) in addressjie" @click="choosejie(item.name,index)" v-bind:class="{acte:index==showjie}" :key="index">{{item.name}}</p>
					</div>
				</div>
			</div>
		</div>
		<input type="text" v-model="shengs" style="display: none;" />
		<input type="text" v-model="shis" style="display: none;" />
		<input type="text" v-model="xians" style="display: none;" />
		<input type="text" v-model="jies" style="display: none;" />
	</div>
</template>

<script>
	import addressjson from "@/assets/js/address3.json";
	export default {
        name: "choose-city",
        data:()=>({
        	isShow:false,
        	citys:["省市","城市","区县","街道"],
        	guigeSpan:0,
        	
        	addressjson,
        	showsheng:-1,
        	contryshow:true,
        	
        	addresshi:[],
        	showshi:-1,
        	contryshi:false,
        	
        	addressxian:[],
        	showxian:-1,
        	contryxian:false,
        	
        	addressjie:[],
        	showjie:-1,
        	contryjie:false,
        	
        	shengs:'',
        	shis:'',
        	xians:'',
        	jies:''
        }),
        methods: {
        	//显示
        	shows(){
        		this.isShow=true;
        	},
        	//点击隐藏
        	hides(){
        		this.isShow=false;
        	},
        	guige(index){
        		if(index==0){
        			this.contryshow=true;
        			this.contryshi=false;
        			this.contryxian=false;
        			this.contryjie=false;
        		}else if(index==1){
        			if(this.showsheng<0){
        				return;
        			}
        			this.contryshow=false;
        			this.contryshi=true;
        			this.contryxian=false;
        			this.contryjie=false;
        		}else if(index==2){
        			if(this.showshi<0){
        				return;
        			}
        			this.contryshow=false;
        			this.contryshi=false;
        			this.contryxian=true;
        			this.contryjie=false;
        		}else if(index==3){
        			if(this.showxian<0){
        				return;
        			}
        			this.contryshow=false;
        			this.contryshi=false;
        			this.contryxian=false;
        			this.contryjie=true;
        		}
        		this.guigeSpan=index;
        	},
        	//获取城市
	        getcitys(poscity,index){
	        	this.guigeSpan=1;
	        	this.showsheng=index;
	        	this.contryshow=false;
	        	this.contryshi=true;
	        	for(let i in addressjson){
	        		if(poscity==addressjson[i].name){
	                    this.addresshi=addressjson[i].children;
	               }
	            }
	        	if(this.shengs!=poscity){
	        		this.showshi=-1;
	        		this.showxian=-1;
	        	}
	        	this.shengs=poscity;
	        },
	        //获取区县
	        getxian(posxian,index){
	        	this.showshi=index;
	        	this.contryshi=false;
	        	this.contryxian=true;
	        	this.guigeSpan=2;
	        	for(let i in addressjson){
	        		if(this.shengs==addressjson[i].name){
	        			for(let j in addressjson[i].children){
		                  	if(posxian==addressjson[i].children[j].name){
		                    	this.addressxian=addressjson[i].children[j].children;
		                  	}
		                }
	        		}
	                
              	}
	        	if(this.shis!=posxian){
	        		this.showxian=-1;
	        	}
	        	this.shis=posxian;
	        },
	        //获取街道
	        getjie(posjie,index){
	        	this.showxian=index;
	        	this.contryxian=false;
	        	this.contryjie=true;
	        	this.guigeSpan=3;
	        	for(let i in addressjson){
	                for(let j in addressjson[i].children){
	                	for(let a in addressjson[i].children[j].children){
	                		if(posjie==addressjson[i].children[j].children[a].name){
		                    	this.addressjie=addressjson[i].children[j].children[a].children;
		                  	}
	                	}
	                }
              	}
	        	if(this.xians!=posjie){
	        		this.showjie=-1;
	        	}
	        	this.xians=posjie;
	        },
	        //选择街道
	        choosejie(posjies,index){
	        	this.showjie=index;
	        	this.jies=posjies;
	        },
	        //确定
	        okcity(){
	        	if((this.shengs=='')||(this.showsheng==-1)){
	        		this.$Toast('请选择省市！');
	        		return;
	        	}
	        	if((this.shis=='')||(this.showshi==-1)){
	        		this.$Toast('请选择城市！');
	        		return;
	        	}
	        	if((this.xians=='')||(this.showxian==-1)){
	        		this.$Toast('请选择区县！');
	        		return;
	        	}
	        	if((this.jies=='')||(this.showjie==-1)){
	        		this.$Toast('请选择街道！');
	        		return;
	        	}
	        	this.$emit('child-say',this.shengs+','+this.shis+','+this.xians+','+this.jies);
	        	this.isShow=false;
	        }
        },
        mounted(){
        	
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
		height: 0.42rem;
		font-size: 0.14rem;
	}
	.city_cont .city_nav p span.act{
		border-bottom: 1px solid #FF3D3D;
		box-sizing: border-box;
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
		padding-top: 0.1rem;
		height: 3.36rem;
		overflow-y: auto;
		padding-bottom: 0.1rem;
	}
	.city_contry p{
		font-size: 0.15rem;
		height: 0.36rem;
		line-height: 0.36rem;
		padding-left: 4%;
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
	.city_contryj p.acte{
		color: #FF3D3D;
	}
</style>