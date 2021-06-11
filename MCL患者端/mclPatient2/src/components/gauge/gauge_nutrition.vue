<template>
	<div class="PG-SGA-root padding-header padding-footer">
		<mt-header title="营养处方" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div>
			<!--<div class="title2 yellow bg-white">5.体格检查</div>
			<mt-field label="身高" placeholder="请输入身高" type="tel" v-model="param.height" class="borderBottom">
				<span style="margin-left: 5px;">cm</span>
			</mt-field>
			<mt-field label="目前体重" placeholder="请输入体重" type="tel" v-model="param.weight" class="borderBottom">
				<span style="margin-left: 5px;">kg</span>
			</mt-field>
			<mt-field label="理想体重" placeholder="理想体重" :value="idealweight" :disabled="true" class="borderBottom">
				<span style="margin-left: 5px;">kg</span>
			</mt-field>
			<div class="title2 yellow bg-white">6.摄入量</div>
			<mt-field label="实际摄入量" placeholder="请输入摄入量" type="tel"  v-model="param.actualintake" class="borderBottom">
				<span style="margin-left: 5px;">kcal</span>
			</mt-field>
			<mt-field label="推荐摄入量" placeholder="推荐摄入量" type="tel"  :value="recommendedintake" :disabled="true" class="borderBottom">
				<span style="margin-left: 5px;">kcal</span>
			</mt-field>
			<mt-field label="能量差额" placeholder="能量差额" :value="energybalance" :disabled="true" class="borderBottom">
				<span style="margin-left: 5px;">kcal</span>
			</mt-field>
			<div class="title2 yellow bg-white">7.能量分配</div>
			<mt-radio :options="energyallocationRadiolist.option" v-model="param.energyallocation" class="borderBottom"></mt-radio>
			<div class="title2 yellow bg-white">8.饮食能量占比</div>
			<mt-radio :options="energyratioRadiolist.option" v-model="param.energyratio" class="borderBottom radio-nowrap"></mt-radio>
			<div class="title2 yellow bg-white">9.营养实际量</div>
			<mt-field label="蛋白质" placeholder="蛋白质" :value="protein" :disabled="true" class="borderBottom">
				<span style="margin-left: 5px;">g</span>
			</mt-field>
			<mt-field label="脂肪" placeholder="脂肪" :value="fat" :disabled="true" class="borderBottom">
				<span style="margin-left: 5px;">g</span>
			</mt-field>
			<mt-field label="碳水化合物" placeholder="碳水化合物" :value="carbohydrate" :disabled="true" class="borderBottom">
				<span style="margin-left: 5px;">g</span>
			</mt-field>


			<div class="title2 yellow bg-white">13.饮食形式</div>
			<mt-radio :options="dietformRadiolist.option" v-model="param.dietform" class="borderBottom"></mt-radio>-->

			<div class="title2 bg-white">1、您目前处在以下哪个阶段？<em class="text_bt">(必填)</em></div>
			<mt-radio :options="diettabooRadiolists.option" v-model="param.prescription_value_22"></mt-radio>
			<div class="title2 bg-white">2、您现在的身体症状有哪些？<em class="text_bt">(必填)</em></div>
			<mt-checklist :options="diettabooRadiolist.option" v-model="diettabooRadiolist.value"></mt-checklist>
			<div class="fix_bottom fix_bottom_area">
				<mt-button type="primary" class="theme-button button-radio" size="large" @click.native="submit"  v-preventReClick>提交申请</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "gauge_nutrition",
		data: () => ({
			//接口参数
			param: {
				prescription_value_22: "",
				prescription_value01: "0",
				resetstatus: "", //重置状态 （传1就行）
			},
			//  单选框
			diettabooRadiolists: {
				option: ['治疗期', '康复期', '维持期'],
				value: '',
				radiolist: true
			},
			//饮食禁忌  多选框
			diettabooRadiolist: {
				option: [{
						label: '体重丢失',
						value: "01"
					}, {
						label: '贫血',
						value: "02"
					}, {
						label: '疼痛',
						value: "03"
					}, {
						label: '食欲下降、厌食',
						value: "04"
					}, {
						label: '呼吸困难',
						value: "05"
					}, {
						label: '消化不良',
						value: "06"
					}, {
						label: '恶心、呕吐',
						value: "07"
					}, {
						label: '腹胀',
						value: "08"
					},
					{
						label: '水肿',
						value: "09"
					}, {
						label: '腹泻',
						value: "10"
					}, {
						label: '便秘',
						value: "11"
					}, {
						label: '疲劳',
						value: "12"
					}, {
						label: '失眠',
						value: "13"
					}, {
						label: '白细胞减少',
						value: "14"
					}, {
						label: '脱发',
						value: "15"
					}, {
						label: '放射性肺炎',
						value: "16"
					}, {
						label: '骨髓抑制',
						value: "17"
					},
					{
						label: '放射性肠炎',
						value: "18"
					}, {
						label: '口干',
						value: "19"
					}, {
						label: '口腔黏膜炎',
						value: "20"
					}, {
						label: '吞咽困难',
						value: "21"
					},
				],
				value: [],
				checklist: true
			},
		}),
		watch: {
			//饮食禁忌
			'diettabooRadiolist.value': {
				handler: function(list) {
					//重置
					this.diettabooRadiolist.option.forEach((item) => {
						this.param[`diettaboo${item.value}`] = "0";
					})
					//选中项
					list.forEach((item) => {
						this.param[`diettaboo${item}`] = "1";
					})
				},
				deep: true
			},
		},
		methods: {
			//提交
			submit() {
				if (this.param.prescription_value_22 == "") {
					this.$Toast("请选择您目前所处的阶段");
					return;
				}
				if (this.diettabooRadiolist.value == "") {
					this.$Toast("请选择您现在的身体症状有哪些");
					return;
				}
				let url = "UserInterface/UpdateNutritionPrescription.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						this.$Toast(data.rspdesc)
						return;
					}
					this.$Toast("提交申请成功")
					//查看报告
					this.$router.replace('/nutrition')
				})
			},
		},
		mounted() {
			//是否重置表单
			const resetstatus = this.$route.query.resetstatus;
			if (resetstatus) {
				this.param.resetstatus = resetstatus
			}

			//重置表单
			// this.diettabooRadiolist.option.forEach((item)=>{
			// 	this.param[`prescription_value${item.value}`] = "0";
			// })
		},
		components: {

		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
	.mint-header {
		height: 0.44rem;
		border-bottom: 1px solid #e5e5e5;
		font-size: 0.16rem;
	}

	.padding-header {
		padding-top: 0.44rem;
	}

	.title,
	.title2 {
		margin-top: 10px;
		padding: 5px 10px;
		font-size: 16px;
	}

	.title2 {
		padding: 0 10px;
		line-height: 0.48rem;
		border-bottom: 1px solid #e5e5e5;
		font-size: 0.15rem;

		.text_bt {
			font-style: normal;
			font-size: 0.13rem;
			color: #CB0000;
			padding-left: 0.05rem;
		}
	}

	.fix_bottom {
		border: 0;
		height: 0.44rem;
		padding: 0;

		.theme-button {
			background-color: #0ac5ca;
			width: 100%;
			border-radius: 0;
			height: 0.44rem;
			line-height: 0.44rem;
			margin: 0;
		}
	}
</style>
<style lang="scss">
	.PG-SGA-root {
		.line-input {
			width: 50px;
			border: none;
			border-bottom: 1px solid #EEEEEE;
		}

		a.mint-cell .mint-cell-text {
			font-size: 14px;
		}

		.mint-field .mint-cell-title,
		.my-mint-cell .mint-cell-title {
			width: 105px;
			-webkit-box-flex: 0;
			-ms-flex: none;
			flex: none;
		}

		.my-mint-cell .mint-cell-value {
			flex: 1;
		}

		.mint-cell-value .mint-field-core,
		.mint-cell-value select {
			// width: 250px;
			height: 33px;
			margin-left: 10px;
			font-size: 14px;
			color: inherit;
			text-indent: 5px;
			border: 1px solid #EEEEEE;
		}

		.mint-cell-value select {
			border: 1px solid #EEEEEE;
			height: 33px;
		}

		.mint-radiolist,
		.mint-checklist {
			padding: 0.1rem 0;
			background-color: #FFFFFF;
		}

		// 多选框
		.mint-radiolist.radio-nowrap {
			background: #FFF;

			.mint-cell {
				display: inline-block;
			}

			.mint-radiolist-label {
				white-space: nowrap;
			}
		}

		// 单选框
		.mint-radiolist-label,
		.mint-checklist-label {
			display: flex;
			align-items: center;
		}

		.mint-radiolist .mint-radio-label,
		.mint-checkbox-label {
			font-size: 0.145rem;
		}

		.mint-radiolist .mint-radiolist-title,
		.mint-checklist-title {
			margin: 0;
		}
	}

	.mint-radio-input:checked+.mint-radio-core,
	.mint-checkbox-input:checked+.mint-checkbox-core {
		background-color: #0ac5ca;
		border-color: #0ac5ca;
	}
</style>
