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
            <mt-field label="名称" placeholder="请输入名称" v-model.trim="currentItem.nutritionname" class="margin10 marginTop10"></mt-field>
            <mt-field label="用量" placeholder="请输入用量" v-model.trim="currentItem.nutritionunit"></mt-field>
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
    .addCase-root input{
        border: 1px solid #EEEEEE;
    }
</style>
