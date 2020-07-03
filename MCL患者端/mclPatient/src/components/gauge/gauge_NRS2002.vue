<template>
	<div class="NRS-root padding-header padding-footer">
		<mt-header title="NRS2002" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>


		<!-- <div class="title yellow">个人信息</div>
		<mt-field label="姓名" placeholder="请输入姓名" class="borderBottom"></mt-field>
		<mt-field label="性别" placeholder="请输入性别" class="borderBottom"></mt-field>
		<mt-field label="年龄" placeholder="请输入年龄" class="borderBottom"></mt-field>
		<mt-field label="临床诊断" placeholder="请输入临床诊断" class="borderBottom"></mt-field>
		<mt-field label="录入人" placeholder="请输入录入人" class="borderBottom"></mt-field> -->

		<div class="title yellow">NRS2002</div>
		
		<div class="title yellow">1.疾病营养需要量程度评分</div>
		<mt-radio :options="attribute_value_01_item.option" v-model="formData.attribute_value_01" class="borderBottom"></mt-radio>
		
		<div class="title yellow">2.营养受损状况评分</div>
		
		<mt-field label="身高" placeholder="请输入身高" v-model.trim="formData.attribute_value_03" class="borderBottom marginTop10"  @change="doBMI">
			<span style="margin-left: 5px;">m</span>
		</mt-field>
		<mt-field label="体重" placeholder="请输入体重" v-model.trim="formData.attribute_value_04" class="borderBottom" @change="doBMI">
			<span style="margin-left: 5px;">kg</span>
		</mt-field>
		<mt-field label="BMI" placeholder="请输入BMI" :disabled="true" v-model="formData.attribute_value_05" class="borderBottom">
		</mt-field>
		<div class="title2 bg-white">正常营养状态</div>
		<mt-radio class="radio-nowrap"  :options="attribute_value_02_item.option" v-model="formData.attribute_value_02"></mt-radio>
		<div class="title2 bg-white borderBottom" style="margin: 0;min-height: 48px;">
			注：因严重胸腹水、水肿得不到准确BMI值时，用白蛋白替代 <input type="tel" class="line-input" v-model="formData.attribute_value_06"> g/L
		</div>
		<mt-radio class="radio-nowrap" :options="attribute_value_07_item.option" v-model="formData.attribute_value_07"></mt-radio>

		<div class="title2 bg-white">近期(1-3个月)体重是否下降</div> 
		<mt-radio class="radio-nowrap" :options="attribute_value_08_item.option" v-model="formData.attribute_value_08"></mt-radio>
		<div class="title2 bg-white marginTop10" style="margin: 0;padding-top: 0;padding-bottom: 0;min-height: 48px;line-height: 48px;">
			若是体重下降<input type="text" class="line-input"  v-model="formData.attribute_value_09"> kg
		</div>
		<mt-radio :options="attribute_value_10_item.option"  v-model="formData.attribute_value_10"></mt-radio>

		<div class="title2 bg-white">一周内进食量是否减少</div>
		<mt-radio class="radio-nowrap" :options="attribute_value_11_item.option" v-model="formData.attribute_value_11"></mt-radio>
		<div class="title2 bg-white">较从前减少</div>
		<mt-radio :options="attribute_value_12_item.option" v-model="formData.attribute_value_12"></mt-radio>

		<div class="title yellow">3.年龄是否≥70岁</div>
		<mt-radio class="radio-nowrap" :options="attribute_value_13_item.option" v-model="formData.attribute_value_13"></mt-radio>

		<div class="title yellow">4.近7天内是否行手术治疗</div> 
		<mt-radio class="radio-nowrap" :options="attribute_value_14_item.option" v-model="formData.attribute_value_14"></mt-radio>

		<div class="title yellow">5.NRS总评分</div>
		<mt-field label="评分" placeholder="评分" :disabled="true" class="borderBottom" v-model="formData.attribute_value_15">
			<mt-button size="small" type="primary" class="theme-button" style="margin-left: 15px;" @click.native="doFraction">提交评分</mt-button>
		</mt-field>

		<div class="fix_bottom fix_bottom_area">
			<mt-button type="primary" class="theme-button button-radio" size="large" @click.native="submit">下一步</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "friend",
		data: () => ({
			attribute_value_01_item: {
				option: ['正常营养需要量', '需要量轻度提高：髋关节骨折、慢性疾病有急性并发症者（肝硬化、慢性阻塞性肺病、血液透析、糖尿病、一般肿瘤患者）', '需要量中度增加：腹部大手术、脑卒中、重症肺炎、血液恶性肿瘤', '需要量明显增加：颅脑损伤、骨髓移植、APACHE评分>10的ICU患者'],
				tipInfo: "请选择疾病营养需要量程度评分"
			},
			attribute_value_02_item: {
				option: ['正常', '不正常'],
				tipInfo: "请选择营养状态"
			},
			attribute_value_03_item: {
				// option: [],
				tipInfo: "请输入身高"
			},
			attribute_value_04_item: {
				// option: [],
				tipInfo: "请输入体重"
			},
			attribute_value_05_item: {
				// option: [],
				tipInfo: "请输入BMI"
			},
			attribute_value_06_item: {
				// option: [],
				tipInfo: "请输入白蛋白"
			},
			attribute_value_07_item: {
				option: ['BMI≤18.5', '白蛋白<30g/L'],
				tipInfo: "请选择营养状态"
			},
			attribute_value_08_item: {
				option: ['是', '否'],
				tipInfo: "请选择体重是否下降"
			},
			attribute_value_09_item: {
				// option: [],
				tipInfo: "请输入体重下降"
			},
			attribute_value_10_item: {
				option: ['3个月内体重下降', '1个月内体重下降', '2个月内体重下降'],
				tipInfo: "请选择体重下降"
			},
			attribute_value_11_item: {
				option: ['是', '否'],
				tipInfo: "请选择一周内进食量是否减少"
			},
			attribute_value_12_item: {
				option: ['25%-50%', '50%-75%', '75%-100%'],
				tipInfo: "请选择一周内进食量是否减少"
			},  
			attribute_value_13_item: {
				option: ['是', '否'],
				tipInfo: "请选择年龄是否≥70岁"
			},
			attribute_value_14_item: {
				option: ['是', '否'],
				tipInfo: "请选择近7天内是否行手术治疗"
			},
			
			//提交
			formData: {
				attribute_value_01: "", //疾病营养需要量程度评分
				attribute_value_02: "", //正常营养状态
				attribute_value_03: "", //身高
				attribute_value_04: "", //体重
				attribute_value_05: "", //BMI
				attribute_value_06: "", //白蛋白
				attribute_value_07: "", //
				attribute_value_08: "", //近期(1-3个月)体重是否下降
				attribute_value_09: "", //体重下降
				attribute_value_10: "", //体重下降  
				attribute_value_11: "", //进食量是否减少  
				attribute_value_12: "", //进食量较从前减少
				
				attribute_value_13: "", //年龄是否≥70岁
				attribute_value_14: "", //近7天内是否行手术治疗
				attribute_value_15: "", //总评分
				
				//attribute_value_16: "", //
			},
			
			//评分
			formDataFraction:{
				attribute_value_01: "",
				attribute_value_02: "",
				attribute_value_07: "",
				attribute_value_08: "",
				attribute_value_10: "",
				attribute_value_11: "",
				attribute_value_12: "",
				attribute_value_13: "",
				attribute_value_14: ""
			},
			
		}),
		methods: {
			//提交
			submit(){
				
				
				let url = "UserInterface/NRSSubmit.ashx";
				let param = this.formData;
				if(param.attribute_value_15 == ""){
					this.$Toast("请提交总评分");
					return
				}
				let isPass = false;
				//遍历数据  
				for(let key in param){
					var formDataItem = param[key];
					if(formDataItem == ""){
						//var rowData = this.$data[`${key}_item`];
						//空内容弹出提示
						// if(rowData){
						// 	const { tipInfo } = rowData;
						// 	this.$Toast(tipInfo);
						// }
						// isPass = true;
						// break
					}
				}
				
				// if(isPass){
				// 	return
				// }
				
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						this.$Toast(data.rspdesc)
						return;
					}
					this.$router.push(`/gauge_PG_SGA?screeningskey=${data.screeningskey}`)
				})
			},
			//评分
			doFraction(){
				let url = "UserInterface/GetNRSInfo.ashx";
				let param = this.formDataFraction;
				let isPass = false;
				//遍历数据  
				for(let key in param){
					var formDataItem = this.formData[key];
					var rowData = this.$data[`${key}_item`];
					if(formDataItem == ""){
						//空内容弹出提示
						// const { tipInfo } = rowData;
						// this.$Toast(tipInfo);
						// isPass = true;
						// break
					}else{
						//遍历到value值
						if(rowData){
							const index = rowData.option.findIndex((value, index)=>{
								return (formDataItem == value)
							});
							param[key] = index;
						}
					}
				}
				
				// if(isPass){
				// 	return
				// }
				
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						this.$Toast(data.rspdesc)
						return;
					}
					this.$Toast("评分成功")
					const score = data.score;
					this.formData.attribute_value_15 = score;
				})
			},
			//计算BMI
			doBMI(){
				const {attribute_value_03, attribute_value_04} = this.formData;  //身高  体重
				if(attribute_value_03 == "" || attribute_value_04 == ""){
					return
				}
				const BMI = attribute_value_04/(attribute_value_03*attribute_value_03);  //体重/身高的平方
				this.formData.attribute_value_05 = BMI.toFixed(2)
			}
		},
		mounted() {

		},
		components: {

		},
		created() {
			if (localStorage.userInfo) {
				
			} else {
				this.$router.push('/login');
			}
		}
	}
</script>

<style scoped lang="scss">
	.title,
	.title2 {
		margin-top: 10px;
		padding: 5px 10px;
		font-size: 16px;
	}

	.title2 {
		font-size: 14px;
	}
</style>
<style lang="scss">
	.NRS-root {
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
		}

		.mint-cell-value select {
			border: 1px solid #EEEEEE;
			height: 33px;
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

			.mint-radio-label {
				font-size: 14px;
			}

			.mint-radiolist-title {
				margin: 0;
			}
		}

		// 单选框
		.mint-radiolist-label {
			display: flex;
			align-items: center;
		}

		.mint-radiolist .mint-radio-label,
		.mint-checkbox-label {
			font-size: 14px;
		}

		.mint-radiolist .mint-radiolist-title,
		.mint-checklist-title {
			margin: 0;
		}
	}
</style>
