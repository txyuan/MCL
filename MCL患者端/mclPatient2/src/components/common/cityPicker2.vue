<template>
    <div class="city_picker_root">
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
    <cityPicker @confrim="cityPickerChange" ref="cityPicker"/>
   */

export default {
  name: 'city-picker',
  data: () => ({
    showPicker: false,
    provinceCode: 11,
    cityCode: 1101,
    countyCode: 110101,
    slots: [
      {
        flex: 1,
        values: [],
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: 0
      },
      {
        flex: 1,
        values: [],
        className: 'slot2',
        textAlign: 'center',
        defaultIndex: 0
      }
      //          {
      //            flex: 1,
      //            values: adrData[0].children[0].children,
      //            className: 'slot3',
      //            textAlign: 'center',
      //            defaultIndex: 0
      //          }
    ]
  }),
  methods: {
    onValuesChange (picker, values) {
      // 滑动-省-区域
      let pCode = (picker.getSlotValue(0) == null) ? this.provinceCode : picker.getSlotValue(0).code // 省份的code
      if (pCode != this.provinceCode) {
        let provinceObj =	picker.getSlotValue(0)
        this.provinceCode = pCode
        // 市
        let cityData = [...provinceObj.children]
        this.cityCode = cityData[0].code
        picker.setSlotValues(1, cityData)
        picker.setSlotValue(1, cityData[0])
        // 县
        //            let countryData = [...provinceObj.children[0].children];
        //            this.countyCode = countryData[0].code;
        //            picker.setSlotValues(2, countryData)
        //            picker.setSlotValue(2,countryData[0])
      }

      // 滑动-市-区域
      let cityCode = (picker.getSlotValue(1) == null) ? this.cityCode : picker.getSlotValue(1).code // 城市的code
      if ((cityCode != this.cityCode)) {
        let cityObj =	picker.getSlotValue(1)
        this.cityCode = cityCode

        // 县
        //            let countryData = [...cityObj.children];
        //            this.countyCode = countryData[0].code;
        //            picker.setSlotValues(2, countryData);
        //            picker.setSlotValue(2,countryData[0])
      }
    },
    findProvinceIndex (code) {
      return adrData.findIndex((item, index) => (code == item.code))
    },
    findCountyIndex (target, code) {
      return target.findIndex((item, index) => (code == item.code))
    },
    show () {
      this.showPicker = true
    },
    hide () {
      this.$emit('cancel')
      this.showPicker = false
    },
    confirm () {
      let cityPicker = this.$refs.cityPicker
      let values = [cityPicker.getSlotValue(0), cityPicker.getSlotValue(1)]
      this.$emit('confrim', values)
      this.hide()
    }
  },
  created(){
    import(/* webpackChunkName: "cityData" */ '@/assets/js/address3.json').then((data) => {
      this.slots[0].values = data
      this.slots[1].values = data[0].children
    })
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
