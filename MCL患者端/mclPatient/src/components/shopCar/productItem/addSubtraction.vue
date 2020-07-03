<template>
    <div class="clear btn-addsub" :class="size == 'big'&& 'big'">
        <div class="subtraction float_left" @click="subtraction"></div>
        <div class="show-num float_left">
          <input type="number" :value="value" @input="updateVal($event)" @blur="blur"/>
        </div>
        <div class="add  float_left"  @click="add"></div>
    </div>
</template>

<script>
    export default {
        name: "add-subtraction",
        props:{
          value:{
            default: 1
          },
          size:{
            default: "small"
          },
          item:{}
        },
        data:()=>({
          defaultValue: 0
        }),
        methods:{
          add(){
            let value = (Number(this.value) + 1);
            // this.$emit("input",value)
            this.$emit("change",value)
          },
          subtraction(){
            let value = (Number(this.value) - 1);
			if(value < 1){
				return
			}
            this.$emit("change",value)
            // this.$emit("input",value)
          },
          //数量输入
          // inputnum($evevt){
          //   let num = $evevt.target.value;
          //   let value = Number(this.value);
          //   this.$emit("change",num,'',(data)=>{
          //     if(data.rspcode == 0){
          //       this.item.goodsNum = '';
          //       setTimeout(()=>{
          //         this.$emit("input",value);
          //       },0)
          //     }
          //   });
          // },
          updateVal($evevt){
            let value = $evevt.target.value;
			console.log(value)
			if(value < 0){
				value = String(value).replace("-","");
				value = Number(value);
				$evevt.target.value = value;
			}
            this.$emit("input",value);
          },
          blur($evevt){
            let $value = $evevt.target.value;
            if( ($value == "") || ($value>this.item.goodsNum)){
              $evevt.target.value = this.item.goodsNum;
            }
          }
        },
        mounted(){
          this.defaultValue = this.item.goodsNum;
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .btn-addsub{
    display: inline-block;
    vertical-align: middle;
    @include border;
    @include radio(2px);
    line-height: 0.24rem;
    &.big{
      line-height: 0.30rem;
    }
  }

  .add,.subtraction{
      @include cube(0.24rem);
      background: url("../../../assets/images/jia_yes@3x.png") no-repeat center;
      background-size: 0.16rem;
  }

  .btn-addsub.big{
    .add,.subtraction{
      @include cube(0.30rem);
    }
  }

  .add{
    border-left: 1px solid $boderE;
    &.no{
      background-image: url("../../../assets/images/jia_no@3x.png");
    }
  }
  .subtraction{
    border-right: 1px solid $boderE;
    background-image: url("../../../assets/images/jian_yes@3x.png");
    &.no{
      background-image: url("../../../assets/images/jian_no@3x.png");
    }
  }

  .show-num{
    width: 0.52rem;
    text-align: center;
    color: $color20;
    input{
      width: 100%;
      text-align: center;
      height: 0.24rem;
      vertical-align: top;
    }
  }
  .btn-addsub.big{
    .show-num input{
      height: 0.30rem;
    }
  }
</style>
