<template>
  <div class="month_pickwe_root">
    <mt-popup
      v-model="showPicker"
      position="bottom"
      class="mint-popup-city">

      <mt-picker :slots="slots" valueKey="name" :showToolbar="true" :visibleItemCount="3" @change="onValuesChange" ref="cityPicker" class="city-picker">
        <div class="bar">
          <span @click="hide">取消</span>
          <span @click="confirm" class="confirm">确定</span>
        </div>
      </mt-picker>

    </mt-popup>
  </div>
</template>

<script>
  /*  示例
    <monthPicker @confrim="monthPicker" ref="monthPicker"/>
   */

  export default {
    name: "monthPicker",
    props:{
      firstYear:{
        default:"全部"
      }
    },
    data:()=>({
      showPicker: false,
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center',
        }
      ],
      years:[],
      months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
    }),
    methods: {
      onValuesChange(picker, values) {
        let year = picker.getSlotValue(0);  //年份的code
        if(year){
          if(year == this.firstYear){
            picker.setSlotValues(1, [])
          }else{
            picker.setSlotValues(1, this.months)
          }
        }
      },
      show(){
        this.showPicker = true;
      },
      hide(){
        this.showPicker = false;
      },
      confirm(){
        let picker = this.$refs.cityPicker;
        let values = [picker.getSlotValue(0),picker.getSlotValue(1)];
        this.$emit("confrim",values)
        this.hide();
      },
      //生成年份的数组
      renderYears(){
        //年   前10年
        const date = new Date();
        const year = date.getFullYear();
        let startYear = (year - 5);
        let endYear = year;
        let yearsArr = [];
        for(startYear; startYear<= endYear; startYear++){
          yearsArr.push(`${startYear}年`)
        }
        this.years = [this.firstYear,...yearsArr];
      }
    },
    created(){
      this.renderYears()
      this.slots[0].values =  this.years;
    },
    mounted(){
      //默认今年
      const date = new Date();
      const year = date.getFullYear();
      let picker = this.$refs.cityPicker;
      picker.setSlotValue(0, `${year}年`);
    }
  }
</script>

<style scoped lang="scss">
  .mint-popup-city{
    width: 100%;
  }
  .bar{
    padding: 0 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .confirm{
      color: #0084ff;
    }
  }

</style>
