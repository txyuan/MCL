<template>
   <div class="addCase-root">
       <div id="body_main">
            <mt-header title="营养" fixed class="borderBottom">
                <div slot="left">
                    <header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
                </div>
            </mt-header>
         <div style="margin-top: 0.1rem;background-color: #FFFFFF;padding-left: 0.1rem">
            <mt-field label="名称" placeholder="请输入名称" v-model.trim="currentItem.nutritionname"></mt-field>
            <mt-field label="用量" placeholder="请输入用量" v-model.trim="currentItem.nutritionunit"></mt-field>
         </div>
            <div class="fix_bottom fix_bottom_area">
                <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save">保存</mt-button>
            </div>
        </div>
   </div>
</template>

<script>
    import Bus from "@/assets/js/updateShopCar.js"; //bus
    export default {
        name:"uploadPhoto_addCase",
        data () {
            return {
                currentItem:{
                    nutritionname: "",
                    nutritionunit: ""
                },
            }
        },
        methods:{
            save(){
				if(this.currentItem.nutritionname == ""){
					this.$Toast("请输入名称")
					return
                }
                if(this.currentItem.nutritionunit == ""){
					this.$Toast("请输入用量")
					return
				}
				Bus.$emit("addDishes", this.currentItem)
				this.$router.back()
			},
        },
        mounted(){
            //添加菜单
			if(!Bus.$data.dishesList){
				Bus.$data.dishesList = [];
			}
			Bus.$on("addDishes", (item) => {
				Bus.$data.dishesList.push(item)
			})
        },
        destroyed() {
			//移除addDishes事件避免多次注册事件
			Bus.$off("addDishes")
		},
        components: {

        }
    }
</script>

<style lang="scss">
.addCase-root{
  input[type=text] {
    border: none;
  }
  .mint-header{
    height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
    font-size: 0.16rem;
  }
  a.mint-cell{
    border-bottom: 1px solid #e5e5e5;
    padding:0.025rem 0.1rem;
  }

  a.mint-cell:last-child{
    border-bottom: 0;
  }
  a.mint-cell .mint-cell-text {
    font-size: 0.15rem;
  }
  .addCase-root input{
    border:0;
  }
  .fix_bottom{
    border: 0;
    height: 0.44rem;
    padding: 0;
    .theme-button{
      background-color: #0ac5ca;
      width: 100%;
      border-radius: 0;
      height: 0.44rem;
      line-height: 0.44rem;
      margin: 0;
    }
  }
}
</style>
