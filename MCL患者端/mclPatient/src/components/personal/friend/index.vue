<template>
<div>
  <mt-header title="我的业绩" fixed class="borderBottom">
    <div slot="left">
      <header-back>
        <mt-button icon="back"></mt-button>
      </header-back>
    </div>
  </mt-header>

  <div class="friend_yejy">
    <div class="friend_li">
			<p>总人数</p>
			<span>{{TotalCount}}</span>
		</div>
		<div class="friend_li">
			<p>本月新增</p>
			<span>{{MonthTotalCount}}</span>
		</div>
  </div>
	<loadMore :param="param" @triggerGetList="getAdrList" ref="loadMoreE">
	  <div class="friend_ul" slot="content">
			<div class="friend_list" v-for="(item,index) in list" :key="index">
				<p>{{item.ContactName}}</p>
				<label>{{item.orderflag}}</label>
				<span>{{item.create_time}}</span>
			</div>
		</div>
	</loadMore>
</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
      name: "friend",
      data:()=>({
		TotalCount:"",
		MonthTotalCount:"",
        param : {
        	"pagesize": 10,
        	"pagecount": 0
        },
		sount:true,
        list:[]
      }),
      methods:{
        getAdrList(success){
          let url = "UserInterface/user/MyRecommenderInfo.ashx";
          if(this.param.pagecount == 1){
            this.list = [];
          }
          this.$post(url,this.param).then((data)=>{
            if(data.rspCode != 1 ){
              return;
            }
			if(this.sount==true){
				this.TotalCount=data.TotalCount;
				this.MonthTotalCount=data.MonthTotalCount;
			}
			this.sount=false;
            let modelList = data.data;
            this.list = [...this.list,...modelList]
            //加载更多组件触发回调
            if(success){
              success(modelList,this.list)
            }
          })
        }
      },
	  mounted(){
	  	
	  },
	  components:{
	    loadMore
	  }
    }
</script>
<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .friend_yejy{
    background: #ffffff;
    font-size: 15px;
    padding: 16px 0;
    color: $color33;
    position: fixed;
    left: 0;
    right: 0;
    top: 43px;
    .friend_li{
			width: 50%;
			float: left;
			p{
				text-align: center;
				font-size: 14px;
				color: #606060;
			}
			span{
				display: block;
				text-align: center;
				font-size: 30px;
				color: #333;
				padding-top: 8px;
			}
		}
  }
	.friend_ul{
		margin-top:146px;
		.friend_list{
			height: 0.5rem;
			line-height: 0.5rem;
			border-bottom: 1px solid #EEEEEE;
			overflow: hidden;
			padding: 0 2.5%;
			font-size: 0.15rem;
			background: #fff;
			color: #333;
			p{
				float: left;
				width: 1.0rem;
			}
			label{
				float: left;
				width: 30%;
				text-align: center;
				font-size: 0.14rem;
				color: #666;
			}
			span{
				float: right;
			}
		}
	}
</style>

