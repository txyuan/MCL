<template>
<div>
  <h3 ref="element">患者动态</h3>
  <div class="dyna_cont">
	  <div class="dyna_list">
		  <div class="dyna_litop">
			  <img src="../../assets/images/211铃铛@2x.png" />
			  <div class="dyna_lipic">
				  <span>颜女子</span>
				  <label>1小时前</label>
			  </div>
		  </div>
		  <p>糖尿病人的早餐！</p>
		  <img src="../../assets/images/lpoerm.png" />
		  <div class="dyna_order">
			  <span @click="clkdz">86</span>
			  <i>255</i>
			  <label>21</label>
			  <u></u>
		  </div>
	  </div>
  </div>
</div>
</template>

<script>
  export default {
      name: "index",
      data:()=>({
		guigeSpan:"-1",  //控制点亮状态 -1为默认不点亮
        kouweiSpan:"-1",  //控制点亮状态
      }),
      methods:{
        guige:function(index){  //当点击时候点亮，同级的span标签删除Class
			this.guigeSpan = index;
		},
      },
      mounted(){
		
      }
  }
</script>

<style scoped lang="scss">
    h3{
  	  height: 0.44rem;
  	  font-size: 0.17rem;
  	  text-align: center;
  	  line-height: 0.44rem;
  	  font-weight: normal;
  	  letter-spacing: 0.02rem;
	  background: #fff;
	  position: fixed;
	  width: 100%;
	  top: 0;
	  left: 0;
	}
	.dyna_cont{
		padding: 0.44rem 0 63px 0;
	}
	.dyna_list{
		background: #fff;
		padding: 0 5%;
		margin-top: 0.1rem;
		.dyna_litop{
			padding-top: 0.15rem;
			overflow: hidden;
			img{
				height: 0.44rem;
				width: 0.44rem;
				float: left;
			}
			.dyna_lipic{
				float: left;
				margin-left: 0.12rem;
				span{
					display: block;
					font-size: 0.15rem;
					color: #333535;
				}
				label{
					display: block;
					font-size: 0.12rem;
					color: #9F9F9F;
					margin-top: 0.04rem;
				}
			}
		}
		p{
			font-size: 0.14rem;
			color: #333535;
			padding: 0.12rem 0;
		}
		img{
			height: 1.7rem;
		}
		.dyna_order{
			overflow: hidden;
			padding: 0.14rem 0;
			span,i,label{
				display: block;
				width: 0.3rem;
				padding-left: 0.26rem;
				background: url(../../assets/images/dianzan.png) no-repeat left center;
				background-size: 0.18rem;
				font-size: 0.14rem;
				color: #6C6C6C;
				line-height: 0.2rem;
				float: left;
			}
			span{
				&.act{
					background: url(../../assets/images/dianzanok.png) no-repeat left center;
					background-size: 0.18rem;
				}
			}
			i{
				font-style: normal;
				background: url(../../assets/images/pinglun.png) no-repeat left center;
				background-size: 0.18rem;
				margin-left: 0.22rem;
			}
			label{
				background: url(../../assets/images/xingx.png) no-repeat left center;
				background-size: 0.18rem;
				margin-left: 0.22rem;
				&.actv{
					background: url(../../assets/images/xingxok.png) no-repeat left center;
					background-size: 0.18rem;
				}
			}
			u{
				display: block;
				width: 0.18rem;
				height: 0.18rem;
				float: right;
				background: url(../../assets/images/fenxiang.png) no-repeat left top;
				background-size: 0.17rem;
			}
		}
	}
</style>
