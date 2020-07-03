<template>
    <div class="product_row-root">
		<div class="row">
			<router-link :to="`/shopdetail/${item.goodsPhId}`">
		      <img src="" v-lazy="item.goodsImage" width="100" height="100" alt="" class="product_pic">
		    </router-link>
			<div class="right">
				<div class="title">[{{item.proPhNumber}}期] {{item.goodsName}}</div>
				<p class="price">价值： <strong>¥{{MarketPrice}}</strong></p>
				<div class="bottom">
					<div class="left">
						<mt-progress class="progress" :value="percentage" :bar-height="5"></mt-progress>
				        <div class="type_list">
				          <ul>
				            <li><p>已购</p><p>{{item.buyCount}}</p></li>
				            <li><p>总量</p><p>{{item.totalCount}}</p></li>
				           <li class="surplus"><p>剩余</p><p>{{item.lessCount}}</p></li>
				       	  </ul>
				        </div>
					</div>
					<div class="right">
						<img src="@/assets/images/car_lists@2x_w.png" width="100%" alt="" @click="addgwUpdate" >
					</div>
					
				</div>
				
			</div>
		</div>		
    </div>
</template>

<script>
    import Bus from "@/assets/js/updateShopCar.js";  //跟新购物车数量
    export default {
        name: "productRow",
        props:['item'],
        data:()=>({
        	
        }),
        computed:{
          //商品总价
          MarketPrice:function () {
            return (this.item.MarketPrice * this.item.totalCount).toFixed(2)
          },
          //百分数
          percentage:function () {
            let val = this.item.buyCount/this.item.totalCount;
            return (val*100);
          }
        },
        methods:{
          //加入购物车
          addgwc(){
            let url = "UserInterface/cart/updateGoodsNum.ashx";
            let param = {
              "goodsId": this.item.goodsId,
              "goodsSpecId": this.item.goodsSpecId,
              "goodsPhId" : this.item.goodsPhId,
              "goodsNum": 1,
              "IsAddNum": 1
            }
            return this.$post(url,param).then((data)=>{
              if(data.rspcode != 1){
                this.$Toast({message: data.rspdesc})
              }else{
                this.$Toast({message: "添加成功"})
                Bus.$emit("updateShop")
              }
              return data;
            })
          },
          //更新商品信息
          upDatePro(){
            let url = "/UserInterface/mall/getProductDetails.ashx";
            let sKey = this.item.goodsPhId;
            return this.$post(url,{sKey}).then((data)=>{
                if(data.rspcode != 1){
                  return
                }
                let model = data.goodsList[0];
                //更新已购和剩余数量 buyCount  lessCount
                this.item.buyCount = model.buyCount;
                this.item.lessCount = model.lessCount;
            })
          },
          //加入购物车更新数据
          addgwUpdate(){
            this.addgwc().then((data)=>{
              if(data.rspcode != 1){
                return
              }
              this.upDatePro();
            })
          },
          //立即拼购
          collageBtn(){
            this.addgwc().then((data)=>{
              if(data.rspcode != 1){
                return
              }
              this.$router.push(`/wx_Entrance/shopcar?proType=${this.item.proType}`)
            })
          }
        },
        mounted(){
        	
        },
        components:{
        	
        }
    }
</script>
<style type="text/css">
	.product_row-root .mt-progress{height: 10px;}
</style>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";
	.row{
		display: flex;
		background: #FFF;
		margin-top: 0.05rem;
		&>.right{
			flex: 1;
			padding: 5px;
		}
		.title{
			@include ellipsis(1);
			font-size: 14px;
		}
		.price{
			font-size: 12px;
			color: $color60;
			font-size: 14px;
			margin-top: 5px;
			strong{
				color: $themeColor;
			}
		}
		.type_list {
			display: flex;
		}
		.bottom {
			display: flex;
			align-items: center;
			font-size: 12px;
			margin-top: 4px;
			.left{
				flex: 1;
			}
			.right{
				width: 30px;
				height: 30px;
				background: $themeColor;
				border-radius: 15px;
				padding: 6px;
				box-sizing: border-box;
				margin-left: 7px;
			}
		} 
		.type_list ul{
			width: 100%;
			display: flex;
			justify-content: space-between;
			p{text-align: center;margin-top: 2px;}
			li{color: $color60;}
			.surplus{
				color: $themeColor;
			}
		}
	}
</style>
