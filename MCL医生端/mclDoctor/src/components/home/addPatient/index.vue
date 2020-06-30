<template>
	<div class="person_data_root">
	  <mt-header title="添加患者">
	    <div slot="left">
	      <header-back>
	        <mt-button icon="back"></mt-button>
	      </header-back>
	    </div>
	  </mt-header>
	  <div class="patient">
		  <h3>请确认患者信息录入真实有效</h3>
		  <div class="patient_list">
			  <p>
				  <span>身份证号</span>
				  <input type="text" placeholder="请输入身份证号" />
			  </p>
			  <p>
				  <span>姓名</span>
				  <input type="text" placeholder="请输入姓名" />
			  </p>
			  <p>
				  <span>联系电话</span>
				  <input type="text" placeholder="请输入联系电话" />
			  </p>
			  <p>
				  <span>出生日期</span>
				  <input type="date" placeholder="请选择出生日期" />
			  </p>
			  <p style="margin-top: 0.1rem;">
				  <span>性别</span>
				  <label @click="pickerToggle('show')"><i v-if="param.Sex == 1">男</i><i v-else-if="param.Sex == 2">女</i></label>
			  </p>
			  <p>
				  <span>现居住地址</span>
				  <label @click="openCityPicker">{{param.UserAddress}}</label>
			  </p>
		  </div>
	  </div>
	  <span class="btn_ok">保存</span>
	  <cityPicker @confrim="cityPickerChange" ref="cityPicker"/>
	  <mt-popup v-model="popupVisible" position="bottom">
	    <mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
	      <div class="picker_bar">
	        <div class="cancel" @click="pickerToggle('hide')">取消</div>
	        <div class="confrim" @click="editUserInfo">确定</div>
	      </div>
	    </mt-picker>
	  </mt-popup>
	</div>
</template>

<script>
  export default {
      name: "index",
      data:()=>({
		  popupVisible: false,  //是否显示性别picker
		  sexSlots: [
			{
			  flex: 1,
			  values: ['男', '女'],
			  className: 'slot1',
			  textAlign: 'center'
			}
		  ],
		  param:{
			UserAddress:'',
			Sex:''
		  }
      }),
      methods:{
        //citypicker的确定回调
        cityPickerChange(values){
          let cityValue = [values[0].name,values[1].name,values[2].name].toString();
          this.param.UserAddress = cityValue;
        },
        //打开citypicker
        openCityPicker(){
          this.$refs.cityPicker.show();
        },
		//显示性别picker
		pickerToggle(state){
		  if(state == "show"){
		    this.popupVisible = true;
		  }
		  if(state == "hide"){
		    this.popupVisible = false;
		  }
		},
		editUserInfo(){
			const {sexPicker} = this.$refs;
			let sex = sexPicker.getSlotValue(0);
			sex = (sex == "男" ? 1 : 2);
			this.param.Sex=sex;
			console.log(sex)
			this.pickerToggle('hide');
		}
      },
      mounted(){
		
      },
	  components:{
	    cityPicker: () => import(/* webpackChunkName: "cityData" */"./../../common/cityPicker.vue")
	  }
  }
</script>

<style scoped lang="scss">
  .patient{
	  h3{
		  font-weight: normal;
		  height: 0.46rem;
		  background: #EEF5FF;
		  color: #4A8EF4;
		  font-size: 0.156rem;
		  text-align: center;
		  line-height: 0.46rem;
	  }
  }
  .patient_list{
	  p{
		  background: #fff;
		  border-bottom: 1px solid #EEEEEE;
		  height: 0.5rem;
		  span{
			  display: block;
			  float: left;
			  line-height: 0.5rem;
			  margin-left: 0.15rem;
			  font-size: 0.15rem;
			  color: #333;
		  }
		  input{
			  display: block;
			  width: 50%;
			  float: right;
			  height: 0.5rem;
			  border: none;
			  margin-right: 0.15rem;
			  font-size: 0.14rem;
			  color: #666;
			  text-align: right;
			  line-height: 0.5rem;
			  &[type=date]{
				  background: url(../../../assets/images/next.png) no-repeat right center;
				  background-size: 0.24rem;
			  }
		  }
		  label{
			  display: block;
			  width: 60%;
			  float: right;
			  height: 0.5rem;
			  margin-right: 0.15rem;
			  background: url(../../../assets/images/next.png) no-repeat right center;
			  background-size: 0.24rem;
			  font-size: 0.14rem;
			  color: #666;
			  text-align: right;
			  line-height: 0.5rem;
			  padding-right: 0.24rem;
			  i{
				  font-style: normal;
			  }
		  }
	  }
  }
  .btn_ok{
	  position: fixed;
	  width: 92%;
	  height: 0.5rem;
	  background: #4A8EF4;
	  border-radius: 4px;
	  line-height: 0.5rem;
	  color: #fff;
	  text-align: center;
	  font-size: 0.15rem;
	  bottom: 0.2rem;
	  left: 4%;
  }
</style>
<style lang="scss">
  .person_data_root{
    .mint-popup-bottom{
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
  }
</style>
