<template>
	<div class="person_data_root">
		<mt-header fixed title="编辑商家信息">
          <div slot="left">
            <header-back>
                <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>
        <div class="edit_cont">
        	<input type="file" v-if="anios==1" accept="image/*" @click="changes" ref="userImg" style="display: none">
          	<input type="file" v-else accept="image/*" @change="change($event)" ref="userImg" style="display: none">
        	<div class="edit_list edit_li">
        		<span>商家头像</span>
        		<img v-if="ImgUrl==''" :src="imgpic" @click="actionsheetToggle('show')" />
        		<img v-else :src="ImgUrl" @click="actionsheetToggle('show')" />
        	</div>
        	<div class="edit_list">
        		<span>商家名称</span>
        		<label v-on:click="nameClick(addTodo)">{{addTodo}}</label>
        	</div>
        	<div class="edit_list">
        		<span>商家分类</span>
        		<label v-on:click="chosclassed">{{subjectType}}</label>
        	</div>
        	<div class="edit_list">
        		<span>人均消费</span>
        		<label @click="pickerToggle('show')">{{moneys}}</label>
        	</div>
        	<div class="edit_list">
        		<span>优惠政策</span>
        		<label v-on:click="policyClick(policy)">{{policy}}</label>
        	</div>
        	<div class="edit_list">
        		<span>联系方式</span>
        		<label @click="phones(telephone)">{{telephone}}</label>
        	</div>
        	<div class="edit_list">
        		<span>商家公告</span>
        		<label @click="showsd(businessNotice)">{{businessNotice}}</label>
        	</div>
        	<div class="edit_list">
        		<span>上午营业时间</span>
        		<label @click="amtimes(amtime)">{{amtime}}</label>
        	</div>
        	<div class="edit_list">
        		<span>下午营业时间</span>
        		<label @click="pmtimes(pmtime)">{{pmtime}}</label>
        	</div>
        	<div class="edit_list">
        		<span>商家地址</span>
        		<label v-on:click="choscty">{{shopadress}}</label>
        	</div>
        	<div class="edit_list">
        		<span>详细地址</span>
        		<input type="text" v-on:click="maps" placeholder="详细地址" v-model="latlng" readonly="readonly" />
        	</div>
        </div>
        <router-link to="" class="buttons" style="z-index: 3;">
        	<mt-button type="danger" @click="addinform" class="add_btns" size="large">完成</mt-button>
      	</router-link>
      	
      	<!-- 头像 -->
        <mt-actionsheet
          :actions="userActions"
          v-model="sheetVisible">
        </mt-actionsheet>
        
        <!-- 人均消费picker  -->
        <mt-popup
          v-model="popupVisible"
          position="bottom">
          <mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
            <div class="picker_bar">
              <div class="cancel" @click="pickerToggle('hide')">取消</div>
              <div class="confrim" @click="editUserInfo">确定</div>
            </div>
          </mt-picker>
        </mt-popup>
        <!--选择城市-->
        <choose-city v-on:child-say="listenToMyBoy" ref="child" />
        <!--分类-->
        <chose-class v-on:child-clas="lisclass" ref="childs"  />
	</div>
</template>

<script>
	import axios from 'axios';
	import choseClass from "./choseClass.vue";  //选择城市
	import chooseCity from "@/components/personal/merchantCert/chooseCity.vue";  //选择城市
	export default {
        name: "index",
        data:()=>({
        	userActions:[
	            {
	              	name: '更换头像',
	              	method: ""
	            }
            ],
            imgpic:'https://resource.jtsc.club/sfidcard.png',  //默认头像
            ImgUrl:'',  //头像
          	sheetVisible: false,  //是否显示上传头像
        	addTodo:"",  //商家名称
        	subjectType:"",  //分类
        	subjectType1:'',//1分类key
        	subjectType2:'',//2分类key
        	policy:"",  //优惠政策
        	telephone:"",  //联系方式
        	businessNotice:"",  //商家公告
        	amtime:"",  //上午营业时间
        	pmtime:"",  //下午营业时间
        	moneys:'',  //人均消费
        	anios:1,
        	popupVisible: false,  //是否显示性别picker
          	sexSlots: [
            	{
              		flex: 1,
              		values: ['10', '20', '30', '40', '50', '60', '80','90', '100', '110', '120', '130', '140', '150','160', '170', '180', '190', '200', '210', '220'],
              		className: 'slot1',
              		textAlign: 'center'
            	}
          	],
          	shopadress:"",  //商家地址
          	parentMsg:false,
          	latlng:"",  //详细地址
          	lats:"",
          	lngs:"",
          	keys:"",  //商家key
          	addored:""   //0新增  1编辑
        }),
        methods: {
        	//查询信息
        	eyeinform(sKey){
        		let url="UserInterface/BusinessUnion/UserBusinessInfo.ashx";
        		let param={
        			businesskey:sKey
        		};
        		this.$post(url,param).then((data)=>{
	              if(data.rspCode != 1){
	                return;
	              }
	              this.ImgUrl=data.business.businessImage;
	              this.addTodo=data.business.businessName;
	              this.subjectType=data.business.subjectType;
	              this.subjectType1=data.business.subjectTypeSkey;
	              this.subjectType2=data.business.subjectSkey;
	              this.moneys=data.business.consumption;
	              this.policy=data.business.favouredPolicy;
	              this.telephone=data.business.mobilePhone;
	              this.amtime=data.business.businessMorDate;
	              this.pmtime=data.business.businessAfterDate;
	              this.shopadress=data.business.businessAddress;
	              this.latlng=data.business.detailedAddress;
	              this.lngs=data.business.slong;
	              this.lats=data.business.lat;
	              this.businessNotice=data.business.businessNotice
	            })
        	},
        	//选择城市
        	chosclassed(){
        		this.$refs.childs.shows();
        	},
        	//选择分类
        	lisclass(somedata){
        		this.subjectType = somedata.split(',')[0];
        		this.subjectType1 = somedata.split(',')[1];
        		this.subjectType2 = somedata.split(',')[2];
        	},
        	downApp() {
	            let ua = navigator.userAgent.toLowerCase();
	            //Android终端
	            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
	      　   		//Ios终端
	            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
	                this.anios=2;
	                //Ios
	            } else if (/(Android)/i.test(navigator.userAgent)) {
	                this.anios=1;
	                //Android终端
	            }
	        },
        	//显示头像
	        actionsheetToggle(state){
	            if(state == "show"){
	              this.sheetVisible = true;
	            }
	            if(state == "hide"){
	              this.sheetVisible = false;
	            }
	        },
	        openAlbum(){
	            const {userImg} = this.$refs;
	            return userImg.click();
	        },
	        change(e){
	            let file = e.target.files[0];
	            let url = URL.createObjectURL(file);
	            let config = {
	              headers:{'Content-Type':'multipart/form-data'}
	            };  //添加请求头
	            let params = new FormData(); //创建form对象
	            params.append('uploadedFile',file);//通过append向form对象添加数据
	            this.ImgUrl = url;
	            axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
	              	if (response.data.rspcode != 1) {
	                	return;
	              	}
	              	this.ImgUrl=response.data.url;
	            })
          	},
          	changes(){
            	window.back.clickOnAndroidSelectPhoto();
          	},
          	showbg(name){
	            let url = "UserInterface/UploadPhotos.ashx";
	            this.$post(url,{BinaryStream: name}).then((data) => {
	              if(data.rspcode==0){
	                return;
	              }
	              this.ImgUrl=data.data.imgUrl;
	            })
	        },
          	//人均消费picker
	        pickerToggle(state){
	            if(state == "show"){
	              this.popupVisible = true;
	            }
	            if(state == "hide"){
	              this.popupVisible = false;
	            }
	        },
	        //编辑个人信息
	        editUserInfo(){
	            const {sexPicker} = this.$refs;
	            let moneysd = sexPicker.getSlotValue(0);
	           	this.moneys=moneysd+'元';
	           	this.pickerToggle('hide');
	        },
        	//商家名称
        	nameClick(addTodo){
        		let addTodos=addTodo;
        		if(addTodos==''){
        			addTodos='000';
        		}
        		this.$router.push('/tradeName/'+addTodos);
        	},
        	//优惠政策
        	policyClick(policy){
        		let policys=policy;
        		if(policys==''){
        			policys='000';
        		}
        		this.$router.push('/favPolicy/'+policys);
        	},
        	//联系方式
        	phones(telephone){
        		let telephones=telephone;
        		if(telephones==''){
        			telephones='000';
        		}
        		this.$router.push('/phones/'+telephones);
        	},
        	//商家公告
        	showsd(businessNotice){
        		let businessn=businessNotice;
        		if(businessn==''){
        			businessn='000';
        		}
        		this.$router.push('/busineshow/'+businessn);
        	},
        	//上午营业时间
        	amtimes(amtime){
        		let amtimes=amtime;
        		if(amtimes==''){
        			amtimes='000';
        		}
        		this.$router.push('/amtime/'+amtimes);
        	},
        	//下午营业时间
        	pmtimes(pmtime){
        		let pmtimes=pmtime;
        		if(pmtimes==''){
        			pmtimes='000';
        		}
        		this.$router.push('/pmtime/'+pmtimes);
        	},
        	//选择城市
        	choscty(){
        		this.$refs.child.shows();
        	},
        	listenToMyBoy(somedata){
        		this.shopadress = somedata;
        	},
        	//选择经纬度
        	maps(){
        		this.$router.push('/mapdt');
        	},
        	//新增编辑
        	addinform(){
        		if(this.ImgUrl==''){
					this.$Toast('请选择商家头像');
					return;
				}
				if(this.addTodo==''){
					this.$Toast('请填写商品名称');
					return;
				}
				if(this.subjectType==''){
					this.$Toast('请选择商品分类');
					return;
				}
				if(this.moneys==''){
					this.$Toast('请选择人均消费');
					return;
				}
				if(this.policy==''){
					this.$Toast('请填写优惠政策');
					return;
				}
				if(this.telephone==''){
					this.$Toast('请填写联系方式');
					return;
				}
				if(this.businessNotice==''){
					this.$Toast('请填写商家公告');
					return;
				}
				if(this.amtime==''){
					this.$Toast('请填写上午营业时间');
					return;
				}
				if(this.pmtime==''){
					this.$Toast('请填写下午营业时间');
					return;
				}
				if(this.shopadress==''){
					this.$Toast('请选择商家地址');
					return;
				}
				if(this.latlng==''){
					this.$Toast('请选择详细地址');
					return;
				}
        		let url="UserInterface/BusinessUnion/UserBusinessEdit.ashx";
        		let param={
        			businesskey:this.keys,
        			businessName:this.addTodo,
        			businessLogo:this.ImgUrl,
        			consumption:this.moneys,
        			favouredPolicy:this.policy,
        			phoneNumber:this.telephone,
        			businessMorDate:this.amtime,
        			businessAfterDate:this.pmtime,
        			businessAddress:this.shopadress,
        			detailedAddress:this.latlng,
        			slong:this.lngs,
        			lat:this.lats,
        			subjectTypeSkey:this.subjectType1,
        			subjectSkey:this.subjectType2,
        			flag:this.addored,
        			businessNotice:this.businessNotice
        		};
        		this.$post(url,param).then((data)=>{
        		  this.$Toast(data.rspDesc);
	              if(data.rspCode != 1){
	                return;
	              }
	              this.$router.push('/comManage');
	            })
        	},
        	getkeep(){
        		let sKey = this.$route.params.sKey;
	        	if(sKey!=0){
	        		this.keys=sKey;
	        		this.eyeinform(sKey);
	        		this.addored=2;
	        	}else{
	        		this.addored=1;
	        		this.keys='';
	        	}
        	}
        },
        created() {
            this.$bus.on('add-todo', (key,val) => {
              	this[key] = val;
            });
        },
        mounted(){
        	this.downApp();
        	window.showbg=this.showbg;
	        this.userActions = [{
	            name: '更换头像',
	            method: this.openAlbum
	        }]
        },
        beforeRouteEnter (to, from, next) {
		  next(vm => {
		    // 通过 `vm` 访问组件实例
		    //从非详情页面进来  都要重新加载数据
		    if(from.name == "comManage"){
		    	vm.getkeep();    
		    }
		  })
		},
        components:{
        	choseClass,
        	chooseCity
        }
   	}
</script>

<style scoped>
	.edit_cont{
		width: 94%;
		background: #fff;
		padding: 0 3%;
		margin-top: 47px;
		padding-bottom: 0.54rem;
	}
	.edit_list{
		width: 95%;
		height: 0.5rem;
		border-bottom: 1px solid #ddd;
		padding-right: 5%;
		background: url("https://resource.jtsc.club/xiayiye@2x.png") no-repeat right center;
		background-size: 0.07rem;
	}
	.edit_list span{
		float: left;
		display: block;
		font-size: 0.16rem;
		color: #333;
		line-height: 0.5rem;
	}
	.edit_list label{
		line-height: 0.5rem;
		float: right;
		display: block;
		font-size: 0.14rem;
		color: #666;
		border: none;
		width: 60%;
		text-align: right;
		height: 0.5rem;
		text-overflow: ellipsis;
		overflow:hidden;
		white-space: nowrap;
	}
	.edit_list input{
		height: 0.5rem;
		float: right;
		font-size: 0.14rem;
		color: #666;
		border: none;
		width: 60%;
		text-align: right;
	}
	.edit_li{
		height: 0.66rem;
	}
	.edit_li span{
		line-height: 0.66rem;
	}
	.edit_li img{
		width: 0.5rem;
		height: 0.5rem;
		margin-top: 0.08rem;
		border-radius: 50%;
		float: right;
	}
    .person_data_root .mint-popup-bottom{
      width: 100%;
    }
    .person_data_root .mint-popup-bottom .picker_bar{
      display: flex;
      justify-content: space-between;
      text-align: center;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: solid 1px #eaeaea;
      
    }
    .person_data_root .mint-popup-bottom .picker_bar .confrim{
        color: #26a2ff;
      }
</style>