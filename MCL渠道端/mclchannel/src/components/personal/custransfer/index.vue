<template>
	<div>
		<mt-header fixed title="选择客户">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="cus_taf">
			<div class="cus_list" v-for="(item,index) in list" :key="index" @click="addClass(index)" :class="{ act:index==current}">
				<span></span>
				<p>{{item.username}}</p>
			</div>
		</div>
		<div class="buttons" @click="okcust">
			<a href="javascript:;">
				<label>转让对象</label>
			</a>
		</div>
	</div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    current: 0,
    list: []
  }),
  methods: {
    // 客户列表
    getList () {
      let url = 'UserInterface/channel/ChannelCustomerTransferSelect.ashx'
      this.$post(url).then((data) => {
        if (data.rspcode != 1) {

        }
        let modelList = data.data
        this.list = modelList
      })
    },
    addClass (index) {
      this.current = index
    },
    okcust () {
      this.$router.push('/customerfer?opkey=' + this.list[this.current].skey)
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
	.cus_taf{
		padding-top: 43px;
		padding-bottom: 0.5rem;
	}
	.cus_list{
		overflow: hidden;
		background: #fff;
		padding: 0.14rem 4%;
		width: 92%;
		border-top: 1px solid #eee;
		span{
			width: 0.2rem;
			height: 0.2rem;
			display: block;
			background: url(../../../assets/images/select@2x.png) no-repeat center center;
			background-size: 0.2rem;
			float: left;
		}
		p{
			float: left;
			font-size: 0.14rem;
			color: #333;
			margin-left: 0.12rem;
		}
		&.act{
			span{
				background: url(../../../assets/images/select_click@2x.png) no-repeat center center;
				background-size: 0.2rem;
			}
		}
	}
	.buttons{
	  overflow: hidden;
	  label{
		  width: 88%;
		  height: 0.4rem;
		  display: block;
		  font-size: 0.15rem;
		  color: #fff;
		  text-align: center;
		  line-height: 0.4rem;
		  margin: 0 auto;
		  border-radius: 0.2rem;
		  background: #FF3D3D;
		  margin-top: 0.05rem;
	  }
	}
</style>
