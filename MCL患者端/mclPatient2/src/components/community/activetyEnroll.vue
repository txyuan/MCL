<template>
  <div class="activetyEnroll-root">
    <div id="body_main">
  		<mt-header title="活动报名" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
		</mt-header>
		  
		<div class="baoming marginTop10">
			<mt-cell class="borderBottom">
			  <div slot="title" class="titleWrap">
				<span class="mint-cell-text">参加者姓名</span>
			  </div>
			  <div class="">
				<input type="text" v-model.trim="param.name" style="width: 175px;" placeholder="请输入参加者姓名"/>
				<img src="@/assets/images/xingming@2x.png" width="20"/>
			  </div>
			</mt-cell>
			
			<mt-cell class="borderBottom">
			  <div slot="title" class="titleWrap">
				<span class="mint-cell-text">手机号码</span>
			  </div>
			  <div class="">
					<input type="tel" v-model.trim="param.phone" placeholder="请输入手机号码"/>
			  </div>
			</mt-cell>
			
			<!-- <mt-cell class="borderBottom">
			  <div slot="title" class="titleWrap">
				<span class="mint-cell-text">身份证号码</span>
			  </div>
			  <div class="">
					<input type="text"  placeholder="请输入身份证号码"/>
			  </div>
			</mt-cell> -->
		
			<mt-cell is-link class="borderBottom" @click.native="pcountPickerToggles('show')">
			  <div slot="title" class="titleWrap">
				<span class="mint-cell-text">请选择参加人数</span>
			  </div>
			  <div class="">
				{{param.pcount}}人
			  </div>
			</mt-cell>
		
			<div class="xieyi margin10">
				<mt-checklist v-model="value" :options="options"> </mt-checklist>
			</div>
		
			<!-- <mt-cell is-link class="margin10">
			  <div slot="title" class="titleWrap">
				<div class="mint-cell-text">
					<span>积分：</span>
					<span class="huiFont font12">当前积分 100，积分可抵</span>
					<span class="yellow font12">¥100.0</span>
				</div>
			  </div>
			  <div class="">
				<mt-switch></mt-switch> 
			  </div>
			</mt-cell> -->
		
			<div class="showInfo font14 margin10">
				<p><span>报名人数：</span> <span>{{param.pcount}} 人</span></p>
				<p><span>报名总金额：</span> <span>¥{{param.price}}</span></p>
				<!-- <p><span>积分抵扣：</span> <span class="yellow font12">- ¥100.00</span></p> -->
			</div>
		
			<mt-cell is-link class="">  <!-- @click.native="payPickerToggles('show')" -->
			  <div slot="title" class="titleWrap">
				<div class="mint-cell-text">
					<span>支付方式：</span>
					<span>{{payDefaultName}}</span>
				</div>
			  </div>
			</mt-cell>
        </div>  
		<div class="fix_bottom_area fix_bottom">
			<div class="left yellow">¥ {{param.price}}</div>
			<div class="right"><mt-button type="primary" class="theme-button button-radio " size="small" @click.native="submit"> &nbsp;&nbsp;&nbsp; 确认报名 &nbsp;&nbsp;&nbsp; </mt-button></div>
		</div>
    </div>  
	
	<!-- 请选择参加人数  -->
	<mt-popup
		v-model="pcountVisible"
		position="bottom">
		<mt-picker 
			:slots="pcountSlot" 
			:showToolbar="true" 
			:visibleItemCount="3" 
			ref="pcountPickers"
		>
		    <div class="picker_bar">
				<div class="cancel" @click="pcountPickerToggles('hide')">取消</div>
				<div class="confrim" @click="pcountConfirm">确定</div>
		    </div>
		</mt-picker>
	</mt-popup>
	
	<!-- 支付方式  -->
	<mt-popup
		v-model="payVisible"
		position="bottom">
		<mt-picker 
			:slots="paySlot" 
			:showToolbar="true" 
			:visibleItemCount="3" 
			ref="payPickers"
		>
		    <div class="picker_bar">
				<div class="cancel" @click="payPickerToggles('hide')">取消</div>
				<div class="confrim" @click="payConfirm">确定</div>
		    </div>
		</mt-picker>
	</mt-popup>
	
  </div>
</template>

<script>
    export default {
        name: "activetyEnroll",
        data:()=>({
			
			acprice: "",  //活动单人价
			
			//接口参数
			param:{
				activityskey: "",
				name:"",   //报名人
				phone:"",  //联系方式
				pcount:"1", //报名人数
				price:"",//报名金额
				paytype:"4",//1 微信 2 支付宝 3 银联 4 余额 5：其他
			},
			
			//出行安全须知
			options:[{
				label: '我已阅读《出行安全须知》，知晓此行安全注意事项',
				value: '1'
		    }],
			value: [],
			
			//报名人数picker
			pcountVisible: false,
			pcountSlot:[
				{
					flex: 1,
					values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
					className: 'slot1',
					textAlign: 'center'
				}
			],
			
			//支付方式picker
			payList:[
				{name:"微信", val:"1"}, {name:"支付宝", val:"2"}, {name:"银联", val:"3"}, {name:"余额", val:"4"}, {name:"其他", val:"5"}
			],
			payDefaultName:"余额",  //页面显示的文字
			payVisible: false,
			paySlot:[
				{
					flex: 1,
					values: ['微信', '支付宝', '银联', '余额', '其他'],
					className: 'slot1',
					textAlign: 'center'
				}
			],
        }),
        methods:{
        	
			//报名人数picker
			pcountPickerToggles(state){
				if(state == "show"){
					this.pcountVisible = true;
				}
				if(state == "hide"){
					this.pcountVisible = false;
				}
			},
			//报名人数picker 确定事件
			pcountConfirm(){
				const {pcountPickers} = this.$refs;
				let statecode = pcountPickers.getSlotValue(0);
				this.param.pcount = statecode;
				//计算报名总金额
				let acprice = this.acprice;
				this.param.price = (acprice*statecode).toFixed(2);
				this.pcountPickerToggles('hide');
			},
			
			//支付方式picker
			payPickerToggles(state){
				if(state == "show"){
					this.payVisible = true;
				}
				if(state == "hide"){
					this.payVisible = false;
				}
			},
			//支付方式picker 确定事件
			payConfirm(){
				const {payPickers} = this.$refs;
				let statecode = payPickers.getSlotValue(0);
				this.payList.forEach((item, index)=>{
					if(item.name == statecode){
						const {val, name} = item;
						this.param.paytype = val;
						this.payDefaultName = name;
					}
				})
				this.payPickerToggles('hide');
			},
			
			//确认报名
			submit(){
				if( this.param.name == "" ){
				  this.$Toast('请输入参加者姓名');
				  return;
				}
				let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if( !myreg.test(this.param.phone) ){
				  this.$Toast('请输入格式正确的手机号码');
				  return;
				}
				let url = "UserInterface/GetCommunityActivitySignUpConfirm.ashx";
				this.$post(url,this.param).then((data)=>{
				  if(data.rspcode != 1){
					this.$Toast(data.rspdesc);
					return;
				  }
				  this.$Toast(data.rspdesc);
				  this.$router.push('/activityOrder');
				})
			},
			
        },
		mounted: function(){
			const {id, acprice} = this.$route.query
			this.param.activityskey = id;
			this.acprice = acprice;
			this.param.price = acprice;
		}
    }
</script>

<style scoped lang="scss">
  //picker 的样式	
  .mint-popup-bottom {
	width: 100%;
  }
  .picker_bar{
	display: flex;
	justify-content: space-between;
	text-align: center;
	line-height: 40px;
	padding: 0 20px;
	border-bottom: solid 1px #eaeaea;
	.confrim{
		color: #26a2ff;
	}
  }
  
  .titleWrap{
  	display: inline-block;
  	vertical-align: middle;
  }
  .showInfo{
  	line-height: 0.4rem;
  	padding: 0 10px;
  	background: #FFFFFF;
  	p{display: flex;justify-content: space-between;}
  }
  input[type=text],input[type=tel]{
  	width: 200px;
  	border: none;
  }
  
  .fix_bottom_area{
  	display: flex;
  	justify-content: space-between;
  	align-items: center;
  }
  .fix_bottom_area .left{
  	font-size: 0.20rem;
  }
  .fix_bottom_area .right{
  	width: 150px;
  	text-align: right;
  }
</style>
<style>
	.baoming .mint-switch-core{
		height: 16px;
		width: 32px;
	}
	.baoming .mint-switch-core::after{
		height: 14px;
		width: 14px;
	}
	
	.baoming .mint-switch-input:checked + .mint-switch-core::after{
		transform: translateX(16px);
	}
	.baoming .mint-switch-core::before{
		height: 14px;
		width: 30px;
	}
	.baoming a.mint-cell .mint-cell-text{
		font-size: 0.14rem;
	}
	.baoming .mint-switch-input:checked + .mint-switch-core{
		border-color: #F78335;
    background-color: #F78335;
	}
	.xieyi .mint-checkbox-label{font-size: 0.12rem;}
	.xieyi .mint-checkbox-core{
    width: 15px;
    height: 15px;
	}
	.xieyi .mint-checkbox-core::after{
		top: 1px;
    left: 5px;
  }
  .xieyi .mint-checklist-label{
  	padding: 0;
  }
  
</style>