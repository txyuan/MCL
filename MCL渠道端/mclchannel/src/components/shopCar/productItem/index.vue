<template>
    <div class="item">
        <div class="check-area">
          <i class="check-i" :class="item.goodsSelected == 1 && 'checked'" @click="changeSelect()"></i>
        </div>
        <div class="content">
            <img v-lazy="item.goodsImage" class="prodect-img" alt="">
            <div class="text">
               <p class="product_name">{{item.goodsName}}</p>
                <p class="product_ls" v-if="ABflag == 2"><span v-if="item.ProDistinguish=='03'">抢购价</span><span v-else>市场价</span>：￥{{item.MarketPrice}}</p>
								<p class="product_ls" v-if="ABflag == 1" style="color: #FF3D3D;font-size: 0.16rem;margin-top: 0.18rem;">￥{{item.MarketPrice}}</p>
               <div class="price" v-if="ABflag == 2">
                 <strong class="money" v-if="item.ProDistinguish!='03'">会员价：￥{{item.goodsPrice}}+{{item.certain_integral}}券</strong>
               </div> 
               <div class="show-price" v-if="ABflag == 2">
								 <!--<label class="show-mony">¥ {{item.goodsPrice}}+{{item.certain_integral}}</label>-->
                 <addSubtraction v-model="num" :item="item" @change="inputChange"/>
                 <!-- <span class="surplus">库存：{{item.goodsInventory}}</span> -->
               </div>
							 <div class="show-price" v-if="ABflag == 1" style="margin-top: 0.16rem;">
							 								 <!--<label class="show-mony">¥ {{item.goodsPrice}}+{{item.certain_integral}}</label>-->
							   <addSubtraction v-model="num" :item="item" @change="inputChange"/>
							   <!-- <span class="surplus">库存：{{item.goodsInventory}}</span> -->
							 </div>
            </div>
        </div>
    </div>
</template>

<script>
  import addSubtraction from "./addSubtraction.vue";
    export default {
        name: "index",
        props:["item","ABflag"],
        data: ()=>({
          timer: undefined
        }),
        computed:{
          num:{
            get(){
               return this.item.goodsNum
            },
            set(newVal){
                //只有输入的时候才会触发
                if(this.timer){
                  clearTimeout(this.timer)
                }
                if((newVal == "") || isNaN(newVal)){
                  this.$Indicator.close();
                  return
                }
                this.$Indicator.loading()
                this.timer = setTimeout(()=>{
                  this.inputChange(newVal,'',(data)=>{
                    this.$Indicator.close();
                  },false)
                },500)
            }
          }
        },
        methods:{
          //加减的跟新数据
          inputChange(val,IsAddNum="",callback=()=>{},isLoad=true){
            //IsAddNum  "" : 加减 数字    "2": 全部
            if(Number(val) > Number(this.item.lessCount)){
              this.$Indicator.close();
              this.$Toast("剩余数量不足!")
              return
            }
            isLoad && this.$Indicator.loading();
            let url = "/UserInterface/cart/updateGoodsNum.ashx";
            let {goodsId, goodsSpecId, goodsPhId,proType} = this.item;
						console.log(this.item)
            let param = {goodsId, goodsSpecId, goodsPhId ,goodsNum:val,proType, IsAddNum,ABflag:this.item.ABflag };
            this.$post(url,param).then((data)=>{
              isLoad &&  this.$Indicator.close();
              callback(data)
              if(data.rspcode != 1){
                this.$Toast(data.rspdesc)
                 return;
              }
              this.$emit('render',data)
            })
          },
          //多选
          changeSelect(){
            this.$Indicator.loading();
            let url = "/UserInterface/cart/selectGoods.ashx";
            //goodsSelected  1 选中
            let {goodsId, goodsSpecId, goodsPhId, goodsSelected,proType} = this.item;
            let selectState  =  (goodsSelected == 1) ? 0 : 1;  //1  选中 0  取消
            let param = {goodsId, goodsSpecId,ABflag:this.item.ABflag, goodsPhId ,selectState,proType};
            this.$post(url,param).then((data)=>{
              this.$emit('render',data)
              this.$Indicator.close();
            })
          }
        },
        components:{
          addSubtraction
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .item{
    display: flex;
    width: 100%;
    padding: 0.10rem 0;
    background: #ffffff;
    .check-area{
      width: 0.34rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .prodect-img{
      @include cube(1.02rem);
      margin-right: 0.05rem;
    }
    .content{
      flex: 1;
      display: flex;

      .text{
        flex: 1;
        padding-right: 0.10rem;
      }
      .product_name{
        @include ellipsis(1);
        font-size: 0.15rem;
        line-height: 1.5;
		color: #333;		
      }
      .price{
        margin: 0.06rem 0 0.04rem 0;
        height: 0.15rem;
        span:nth-child(2){
          font-size: 0.15rem;
          color: $color60;
        }

      }
      .money{
        color: $themeColor;
        font-size: 0.14rem;
				font-weight: 600;
      }
    }
    .surplus{
      color: $themeColor;
      font-size: 0.12rem;
      margin-left: 0.10rem;
    }
    .num-type{
      font-size: 0;
      margin-top: 0.08rem;
      .type-btn{
        display: inline-block;
        background: $bgF8;
        font-size: 0.14rem;
        color: $color40;
        padding: 0.02rem 0.11rem;
        margin-right: 0.05rem;
      }
      .themeRed{
        color: $themeColor;
      }
    }
  }
  .product_ls{
    color: #666;
    font-size: 0.13rem;
    margin-top: 0.06rem;
  }
	.show-price{
		overflow: hidden;
		margin-top: 0.12rem;
	}
	.show-mony{
		font-size: 0.18rem;
		color: #FF3D3D;
		line-height: 0.26rem;
		display: block;
		float: left;
	}
	.clear.btn-addsub{
		float: right;
	}
</style>
