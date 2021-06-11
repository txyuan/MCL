<template>
  <div style="background: #fff;height: 100vh;">
    <div id="class_header" class="myassets">
      <mt-header :title="title" fixed>
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
    </div>

    <div class="contant" id="content">
		<div class="vea_ul">
			<div class="vea_list">
				<p>购物卡余额 (元)</p>
				<span>{{ShoppingCardAmount}}</span>
			</div>
			<div class="vea_list vea_list2">
				<p>A版可消费余额 (元)</p>
				<span>{{AAmount}}</span>
			</div>
			<div class="vea_list vea_list3">
				<p>B版可消费余额 (元)</p>
				<span>{{BAmount}}</span>
			</div>
		</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data:()=>({
		title:"我的资产",
		ShoppingCardAmount:"0.00",
		AAmount: "0.00",
		BAmount: "0.00"
    }),
    methods:{
    	// 我的资产
    	getMsgInfo(){
    		let url = "UserInterface/user/MyAssets.ashx";
    		this.$post(url).then((data)=>{
				if(data.rspCode != 1 ){
					return;
				}
				this.ShoppingCardAmount=data.data.ShoppingCardAmount;
				this.AAmount=data.data.AAmount;
				this.BAmount=data.data.BAmount;
    	    })
    	}
    },
	mounted(){
		this.getMsgInfo()
	}
  }
</script>

<style scoped lang="scss">
  #class_header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  #content{
    padding-top: 46px;
  }
  .vea_ul{
	padding: 0 3%;
	.vea_list{
		width: 100%;
		background: #FDF5EB;
		border-radius: 4px;
		padding-bottom: 0.12rem;
		margin-top: 0.1rem;
		p{
			width: 1.5rem;
			font-size: 0.18rem;
			color: #F6843C;
			text-align: center;
			padding-left: 0.24rem;
			background: url(../../../assets/images/zhyue.png) no-repeat 0.08rem center;
			background-size: 0.22rem;
			position: relative;
			left: 50%;
			margin-left: -0.75rem;
			top: 0.18rem;
		}
		span{
			font-size: 0.26rem;
			color: #333;
			display: block;
			text-align: center;
			padding-top: 0.26rem;
		}
	}
	.vea_list2{
		background: #EBF6FD;
		p{
			width: 1.8rem;
			margin-left: -0.9rem;
			background: url(../../../assets/images/jinb.png) no-repeat 0.08rem center;
			background-size: 0.22rem;
		}
	}
	.vea_list3{
		background: #F2EBFD;
		p{
			width: 1.8rem;
			margin-left: -0.9rem;
			background: url(../../../assets/images/jinb.png) no-repeat 0.08rem center;
			background-size: 0.22rem;
		}
	}
  }
	
</style>
