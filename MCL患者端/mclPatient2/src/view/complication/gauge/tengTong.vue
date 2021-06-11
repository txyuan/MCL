<template>
    <div class="padding-header page-bg-white">
        <mt-header :title="title" fixed>
            <div slot="left">
                <header-back>
                <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>

        <div class="valurang">
            <div class="q"></div>
            <div class="numrang">
                <p>{{rangeValue}}<label style="font-size: 0.3rem;">分</label></p>
                <span>{{rangeName}}</span>
            </div>
            <div class="fszrg">
                <h3>严重程度</h3>
                <mt-range
                    v-model="rangeValue"
                    :min="0"
                    :max="10"
                    :step="1"
                    :bar-height="10"
                    @change="rangeChange">
                </mt-range>
                <ul class="rangeNum">
                    <li v-for="n in 11" :key="n">{{n-1}}</li>
                </ul>
            </div>
        </div>

        <mt-button
            type="primary"
            class="theme-button fix_bottom"
            size="large"
            @click.native="save"
        >保存</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        const { type } = this.$route.params
        return {
            type, 
            rangeValue: 0,
            rangeName: ""
        }
    },
	computed:{
		title(){ return this.$route.query.title }
	},
    methods:{
        rangeChange(){
			if(this.type == "tengTong"){
				if(this.rangeValue==0){
					this.rangeName='无症状'
				}else if(this.rangeValue==1){
					this.rangeName='非常轻微'
				}else if(this.rangeValue==2){
					this.rangeName='稍微有'
				}else if(this.rangeValue==3){
					this.rangeName='有点痛'
				}else if(this.rangeValue==4){
					this.rangeName='中等程度'
				}else if(this.rangeValue==5){
					this.rangeName='较明显不适'
				}else if(this.rangeValue==6){
					this.rangeName='一般痛'
				}else if(this.rangeValue==7){
					this.rangeName='比较痛'
				}else if(this.rangeValue==8){
					this.rangeName='非常痛'
				}else if(this.rangeValue==9){
					this.rangeName='特别痛'
				}else if(this.rangeValue==10){
					this.rangeName='极痛'
				}
			}else if(this.rgid==34){
				if(this.rangeValue==0){
					this.rangeName='最差'
				}else if(this.rangeValue==1){
					this.rangeName='非常差'
				}else if(this.rangeValue==2){
					this.rangeName='比较差'
				}else if(this.rangeValue==3){
					this.rangeName='有点差'
				}else if(this.rangeValue==4){
					this.rangeName='稍微差'
				}else if(this.rangeValue==5){
					this.rangeName='能吃'
				}else if(this.rangeValue==6){
					this.rangeName='一般好'
				}else if(this.rangeValue==7){
					this.rangeName='比较好'
				}else if(this.rangeValue==8){
					this.rangeName='非常好'
				}else if(this.rangeValue==9){
					this.rangeName='特别好'
				}else if(this.rangeValue==10){
					this.rangeName='最好'
				}
			}else if(this.type == "tunYanKunNan"){
				if(this.rangeValue==0){
					this.rangeName='完全不能进食，不适合做吞咽训练'
				}else if(this.rangeValue==1){
					this.rangeName='吞咽困难或不能吞咽，不适合做吞咽训练'
				}else if(this.rangeValue==2){
					this.rangeName='大量误吸，吞咽困难或不能吞咽，适合做吞咽基础训练'
				}else if(this.rangeValue==3){
					this.rangeName='如做好准备可减少误吸，可进行进食训练'
				}else if(this.rangeValue==4){
					this.rangeName='作为兴趣进食可以，但营养摄取仍需非口途径'
				}else if(this.rangeValue==5){
					this.rangeName='仅1～2顿的营养摄取可经口'
				}else if(this.rangeValue==6){
					this.rangeName='3顿的营养摄取均可经口，但需补充辅助营养'
				}else if(this.rangeValue==7){
					this.rangeName='如为能吞咽的食物，3顿均可经口摄取'
				}else if(this.rangeValue==8){
					this.rangeName='除少数难吞咽的食物，3顿均可经口摄取'
				}else if(this.rangeValue==9){
					this.rangeName='可吞咽普通食物但需给予指导'
				}else if(this.rangeValue==10){
					this.rangeName='进食，吞咽能力正常'
				}
			}else{
				if(this.rangeValue==0){
					this.rangeName='无症状'
				}else if(this.rangeValue==1){
					this.rangeName='非常轻微'
				}else if(this.rangeValue==2){
					this.rangeName='稍微有'
				}else if(this.rangeValue==3){
					this.rangeName='少量有'
				}else if(this.rangeValue==4){
					this.rangeName='中等程度'
				}else if(this.rangeValue==5){
					this.rangeName='较明显'
				}else if(this.rangeValue==6){
					this.rangeName='一般严重'
				}else if(this.rangeValue==7){
					this.rangeName='比较严重'
				}else if(this.rangeValue==8){
					this.rangeName='非常严重'
				}else if(this.rangeValue==9){
					this.rangeName='特别严重'
				}else if(this.rangeValue==10){
					this.rangeName='极为严重'
				}
			}
		},
		save(){
			const {rangeValue} = this
			this.$parent.submit({value: `${rangeValue}`})
		}
    },
    created() {
        
    },
    mounted() {
        this.rangeChange()  // 设置默认值
    }
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>