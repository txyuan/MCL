<template>
	<div style="padding-top: 0.44rem">
		<mt-header title="心情管理" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<!-- <mt-header title="心情管理" fixed class="borderBottom">
			<div slot="left">
				<router-link to="/wx_Entrance/home" style="color: initial;">
					<mt-button icon="back"></mt-button>
				</router-link>
			</div>
		</mt-header> -->
		<div class="pic_img">
			<div class="pic_mrimg">
				<img :src="imgUrl" class="picimgtu" />
			</div>

			<!-- <div class="uplodpic">
				<p>
					<span>上传图片</span>
					<input type="file" id="editUserForm" name="file" accept="image/*" @change="uploadPhoto($event)" />
				</p>
				<p>
					<span>拍照识别</span>
					<input id="btn_camera" type="file" accept="image/*" capture="user" @change="uploadPhoto($event)" />
				</p>
			</div> -->
			<p class="lovets">温馨提示：3种方式任选其一即可！</p>
			<div class="result">
				<h3><em></em>检测结果</h3>
				<div class="result_more">
					<div class="img_jgli" v-show="isShowResult">
						<div class="cell_li" v-for="(item, index) in resultList" :key="index">
							<span class="name">{{item.name}}:</span>
							<mt-progress :value="item.value" :bar-height="6" style="flex: 1;">
								<div slot="end" class="value_text">{{item.value}}%</div>
							</mt-progress>
						</div>
						<p class="cell_li">此人脸的情绪最可能为 <span class="yellow">{{maxItem.name}}</span>，概率为 <span class="yellow">{{maxItem.value}}</span>%</p>
					</div>
					<p class="noeyepic" style="color: #F78335;" v-show="noResult">不能识别此图，建议上传人物图！</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//this.$router.push("/moodExplain")
	import moren from '@/assets/images/touxmrt.png'
	import axios from 'axios'
	export default {
		name: "mood-root",
		data: () => ({
			imgUrl: moren,  //本地图片url
			responseUrl: '',
			resultList:[
				{name:"高兴", key:"happiness", value: 0, className:""},
				{name:"平静", key:"neutral", value: 0, className:""},
				{name:"惊讶", key:"surprise", value: 0, className:""},
				{name:"伤心", key:"sadness", value: 0, className:""},
				{name:"厌恶", key:"disgust", value: 0, className:""},
				{name:"愤怒", key:"anger", value: 0, className:""},
				{name:"恐惧", key:"fear", value: 0, className:""},
			],
			maxItem: {name:"", value: 0}, //最大值

			isShowResult: true,  //是否显示结果
			noResult: false,  //图片不是人物头像
			patientskey:''
		}),
		methods: {
			//上传文件
			uploadPhoto(e){
				let file = e.target.files[0];
				if( e.target.files.length == 0){
					return
				}
				let url = URL.createObjectURL(file);
				let config = {
				  headers:{'Content-Type':'multipart/form-data'}
				};  //添加请求头
				resizeImage(file).then(function (result) {
					return typeof result === 'string' ? convertToBlob(result, file.type) : result;
				}).then( blob => {
					let params = new FormData(); //创建form对象
				  params.append('uploadedFile',file);//通过append向form对象添加数据
					//注意：此处第3个参数最好传入一个带后缀名的文件名，否则很有可能被后台认为不是有效的图片文件
					params.append("uploadedFile", blob, "uploadedFile");
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
						if (response.data.rspcode != 1) {
						  return;
						}

						let responseUrl = response.data.url;
						this.responseUrl = responseUrl;
						// 创建url
						var imgUrl = window.URL.createObjectURL(file);
						this.imgUrl = imgUrl;

						//获取心情结果
						this.getResult()
					})
				})



				/**
				 * 压缩裁剪图片
				 */
				function resizeImage(file) {
					return new Promise(function (resolve, reject) {
						var reader = new FileReader();

						reader.onload = function () {
							var img = new Image();

							img.onload = function () {
								var w = this.naturalWidth;
								var h = this.naturalHeight;
								var maxW = 500;
								var maxH = 500;

								// 如果图片尺寸小于最大限制，则不压缩直接上传
								if (w <= maxW && h <= maxH) {
									resolve(file);
									return;
								}

								var level = 0.6;
								var multiple = Math.max(w / maxW, h / maxH);
								var resizeW = w / multiple;
								var resizeH = h / multiple;

								var canvas = document.createElement("canvas");

								canvas.width = resizeW;
								canvas.height = resizeH;

								var ctx = canvas.getContext("2d");

								ctx.drawImage(img, 0, 0, resizeW, resizeH);

								var base64Img = canvas.toDataURL(file.type, level);
								var arr = base64Img.split(",");

								resolve(arr[1]);
							};

							img.src = this.result;
						};

						reader.readAsDataURL(file);
					});
				}

				/**
				 * 将图片的base64字符串转换为Blob对象
				 */
				function convertToBlob(base64Str, fileType) {
					var base64 = window.atob(base64Str);
					var len = base64.length;
					var buff = new ArrayBuffer(len);
					var uarr = new Uint8Array(buff);

					for (var i = 0; i < len; i++) {
						uarr[i] = base64.charCodeAt(i);
					}

					var blob = null;

					try {
						blob = new Blob([buff], { type: fileType });
					} catch (e) {
						var BlobBuilder = window.BlobBuilder = (
							window.BlobBuilder ||
							window.WebKitBlobBuilder ||
							window.MozBlobBuilder ||
							window.MSBlobBuilder
						);

						if (e.name === "TypeError" && BlobBuilder) {
							var builder = new BlobBuilder();
							builder.append(buff);
							blob = builder.getBlob(fileType);
						}
					}

					return blob;
				}
			},
			//获取心情结果

			getResult(){
				//保存图片
				// let savePic = () => {
				// 	let url = "UserInterface/AddMoodManagement.ashx";
				// 	return this.$post(url,{phoneurl: this.responseUrl})
				// }
				//获取返回信息
				let getInfo = () => {
					let url = "UserInterface/selectMoodManagement.ashx";
					let param={
						patientskey:this.patientskey
					};
					return this.$post(url,param).then((data) => {
						this.$Indicator.close()
						if(data.rspcode==0){
							return;
						}
						this.imgUrl = data.data[0].phoneurl;
						this.isShowResult = true;
						var lengt=Number(data.data.length)-1;
						var model = data.data[lengt];
						this.resultList.forEach((item, index)=>{
							const key = item.key;
							const value = Number(model[key]).toFixed(3);
							item.value = Number(value);
							//最大值
							if(value >= this.maxItem.value){
								this.maxItem.name = item.name
								this.maxItem.value = item.value
							}
						})
					})
				}
				getInfo()
				// this.noResult = false;
				// this.isShowResult = false;
				// this.$Indicator.loading();
				// savePic().then((data) => {
				//   if(data.rspcode==0){
				//   	this.$Indicator.close()
				//   	this.noResult = true;
				// 		return;
				//   }
				//   getInfo()
				// })

			},
			onTake() {

			}
		},
		mounted() {
			this.getResult();
			this.onTake();
		},
		created() {
			this.patientskey = this.$route.query.skey;
		}
	}
</script>

<style scoped lang="scss">
  .mint-header {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
	.pic_img {
		img {
			display: block;
			width: 100%;
		}

		.add_pic {
			width: 96%;
			background: #ddd;
			overflow: hidden;
			padding: 0.06rem 2%;
			font-size: 0.14rem;

			input {
				width: 80%;
				display: block;
				float: left;
				height: 0.3rem;
				border: none;
				color: #666;
			}

			span {
				display: block;
				float: right;
				width: 20%;
				height: 0.3rem;
				background: #F78335;
				border-radius: 4px;
				text-align: center;
				line-height: 0.3rem;
				color: #fff;
			}
		}

		.uplodpic {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 96%;
			background: #fff;
			border-top: 1px solid #eee;
			padding: 0.06rem 2%;
			border-bottom: 1px solid #eee;
			overflow: hidden;
			z-index: 10;

			p {
				width: 50%;
				height: 0.44rem;
				float: left;
				background: #F78335;
				text-align: center;
				color: #fff;
				line-height: 0.44rem;
				border-radius: 0 8px 8px 0;
				font-size: 0.15rem;
				position: relative;
				overflow: hidden;

				input {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}

				&:first-child {
					background: #fff;
					border: 1px solid #F78335;
					box-sizing: border-box;
					color: #F78335;
					border-radius: 8px 0 0 8px;
				}
			}
		}

		.lovets {
			display: none;
			font-size: 0.13rem;
			color: #f00;
			padding: 0.1rem 3%;
		}

		.result {
      width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-top: 0.1rem;
      background: #fff;

      h3 {
        height: 0.44rem;
        border-bottom: 1px solid #DFE6E7;
        font-weight: 500;
        font-size: 0.15rem;
        line-height: 0.44rem;
        color: #333535;
        padding-left: 0.12rem;

        em {
          font-style: normal;
          background-color: #4A8EF4;
          display: inline-block;
          width: 0.035rem;
          height:  0.135rem;
          margin-right: 0.05rem;
          border-radius: 0.015rem;
        }
      }

			.result_more {
				padding: 0.1rem 0;
				height: 3.0rem;
				overflow-y: auto;

				.cell_li {
					font-size: 0.14rem;
					color: #666;
					line-height: 0.26rem;
					padding: 0 0.2rem;
					display: flex;
					justify-content: flex-start;
				}

				.cell_li .name {
					margin-right: 5px;
				}
			}
		}
	}

	.noeyepic {
		font-size: 0.14rem;
		padding: 0 0.2rem;
	}

	.value_text {
		color: #26a2ff;
		margin-left: 5px;
		width: 0.6rem;
	}

	.pic_mrimg {
	}
</style>
<style type="text/css">
	.img_jgli .mt-progress-runway {
		border-radius: 3px;
		overflow: hidden;
	}
</style>
