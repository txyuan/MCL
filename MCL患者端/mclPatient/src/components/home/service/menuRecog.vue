<template>
	<div>
		<mt-header fixed title="菜谱识别">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="pic_img">
			<img src="@/assets/images/moren.png" class="picimgtu" />
			<div class="add_pic">
				<input type="text" class="upimg" placeholder="请输入网络图片URL" />
				<span>识别</span>
			</div>
			<div class="uplodpic">
				<p>
					<span>上传图片</span>
					<input type="file" id="editUserForm" name="file" accept="image/*"/>
				</p>
				<p>
					<span>拍照识别</span>
					<input id="btn_camera" type="file" accept="image/*" capture="camera" οnchange="onTake()" />
				</p>
			</div>
			<p class="lovets">温馨提示：3种方式任选其一即可！</p>
			<div class="result">
				<h3>检测结果</h3>
				<div class="result_more">
					<div class="img_jgli" style="display: none;">
						<p name="foodName">食物名称：<span></span></p>
						<p name="unit">食物单位：<span></span>克/毫升</p>
						<!-- <p name="efficacys">功效：<span></span></p> -->
						<p name="heat">热量：<span></span>Kcal</p>
						<!-- <p name="heatKJ">能量：<span></span>Kcal</p> -->
						<p name="protein">蛋白质：<span></span>g</p>
						<p name="fat">脂肪：<span></span>g</p>
						<p name="carbohydrate">碳水化合物：<span></span>g</p>
						<!-- <p name="moisture">水分：<span></span>g</p> -->
						<!-- <p name="cholesterol">胆固醇：<span></span>mg</p>
						<p name="ediblePart">可食部：<span></span>g或ml</p> -->
						<p name="solkfloc">不溶性纤维：<span></span>g</p>
						<!-- <p name="vitaminB1">维生素B1：<span></span>mg</p>
						<p name="vitaminB2">维生素B2：<span></span>mg</p>
						<p name="vitaminC">维生素C：<span></span>mg</p>
						<p name="vitaminB6">维生素B6：<span></span>ug</p>
						<p name="vitaminB12">维生素B12：<span></span>mg</p>
						<p name="vitaminB3">维生素B3(烟酸)：<span></span></p>
						<p name="vitaminB5">维生素B5(泛酸)：<span></span></p>
						<p name="vitaminB9">维生素B9(叶酸)：<span></span></p>
						<p name="vitaminA">维生素A：<span></span>ug</p>
						<p name="VitaminD">维生素D：<span></span>ug</p>
						<p name="VitaminE">维生素E：<span></span>mg</p>
						<p name="VitaminK">维生素K：<span></span>mg</p>
						<p name="lysine">赖氨酸：<span></span></p>
						<p name="tryptophan">色氨酸：<span></span>mg</p>
						<p name="valine">缬氨酸：<span></span>mg</p>
						<p name="phenylalanine">苯丙氨酸：<span></span>mg</p>
						<p name="threonine">苏氨酸：<span></span>mg</p>
						<p name="isoleucine">异亮氨酸：<span></span>mg</p>
						<p name="leucine">亮氨酸：<span></span>mg</p>
						<p name="methionine">蛋氨酸：<span></span>mg</p>
						<p name="arginine">精氨酸：<span></span>mg</p>
						<p name="glutamic">谷氨酸：<span></span>mg</p>
						<p name="histidine">组氨酸：<span></span>mg</p>
						<p name="alanine">丙氨酸：<span></span>mg</p>
						<p name="glycine">甘氨酸：<span></span>mg</p>
						<p name="proline">脯氨酸：<span></span>mg</p>
						<p name="serine">丝氨酸：<span></span>mg</p>
						<p name="aspartic">天冬氨酸：<span></span>mg</p>
						<p name="calcium">钙：<span></span>mg</p>
						<p name="phosphorus">磷：<span></span>mg</p>
						<p name="potassium">钾：<span></span>mg</p>
						<p name="sodium">钠：<span></span>mg</p>
						<p name="magnesium">镁：<span></span>mg</p>
						<p name="copper">铜：<span></span>mg</p>
						<p name="iron">铁：<span></span>mg</p>
						<p name="zinc">锌：<span></span>mg</p>
						<p name="manganese">锰：<span></span>mg</p>
						<p name="iodine">碘：<span></span>ug</p>
						<p name="chromium">铬：<span></span>ug</p>
						<p name="fluorine">氟：<span></span>ug</p>
						<p name="selenium">硒：<span></span>ug</p>
						<p name="totalFattyAcid">总脂肪酸：<span></span>g</p>
						<p name="saturatedFattyAcid">饱和脂肪酸：<span></span>g</p>
						<p name="monounsaturatedFattyAcid">单不饱和脂肪酸：<span></span>g</p>
						<p name="polyunsaturatedFattyAcid">多不饱和脂肪酸：<span></span>g</p>
						<p name="mfaPercent">单不饱和脂肪酸占比：<span></span>%</p>
						<p name="pfaPercent">多不饱和脂肪酸占比：<span></span>%</p>
						<p name="sfaPercent">饱和脂肪酸占比：<span></span>%</p>
						<p name="carotene">胡萝卜素：<span></span>ug</p>
						<p name="soyIsoflavone">大豆异黄酮：<span></span>mg</p>
						<p name="gi">GI（血糖生成指数）：<span></span></p> -->
					</div>
					<p class="noeyepic" style="display: none;color: #F78335;">不能识别此图，建议上传食物图！</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import jsrsasign from '@/components/common/jsrsasign-all-min.js'
	export default {
		name: "home",
		data: () => ({
			UserKey: '',
			SessionId: '',
		}),
		methods: {
			onTake() {
				var vm = this;
				var timer = new Date();
				var years = timer.getFullYear();
				var months = Number(timer.getMonth()) + 1;
				var days = timer.getDate();
				var hours = timer.getHours();
				var minutes = timer.getMinutes();
				var seconds = timer.getSeconds();

				function addzero(dat) {
					if (dat < 10) {
						dat = '0' + dat;
					}
					return dat;
				}
				var dates = years + '-' + addzero(months) + '-' + addzero(days) + ' ' + addzero(hours) + ':' + addzero(minutes) +
					':' + addzero(seconds);
				var pks =
					"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwr8DPL1z9eFMeRfr+Qr++2xEub2S5qqpKInUTHGp0BJRro3BPX3B1DqCflsbNpt++/GN82ZoRgs2peXWTyh+6rGYTvmXc3CWWNxAVkd5Z2EfisR3jJbDC5UiNnSlbZyQS2ExgLLIttCsQxKw7y0njEejgU1qpbw6/WKSPZl1S8DhrMtgrKJEzD2tqVdmKpiFK9gyUZQ4LghRytpGRpqE4pbjHMbGUAotXejrfgnIJEh5FpjQInQR0HvvhZpnuuf/C8PDHcz406uWAUecUtA+CXa8BqbqcQuV3BhZGWhXFca1Gxy5m1foKJ88MHSXz+Dcxh577efYN/PHECUh3Mp+sQIDAQAB";
				//私钥
				var priKey =
					"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCvwM8vXP14Ux5F+v5Cv77bES5vZLmqqkoidRMcanQElGujcE9fcHUOoJ+Wxs2m3778Y3zZmhGCzal5dZPKH7qsZhO+ZdzcJZY3EBWR3lnYR+KxHeMlsMLlSI2dKVtnJBLYTGAssi20KxDErDvLSeMR6OBTWqlvDr9YpI9mXVLwOGsy2CsokTMPa2pV2YqmIUr2DJRlDguCFHK2kZGmoTiluMcxsZQCi1d6Ot+CcgkSHkWmNAidBHQe++Fmme65/8Lw8MdzPjTq5YBR5xS0D4JdrwGpupxC5XcGFkZaFcVxrUbHLmbV+gonzwwdJfP4NzGHnvt59g388cQJSHcyn6xAgMBAAECggEAcVTt0lxCbpXlhhcIyU6/4ps4R4tuQPSSKrhDJxWCiEcQ5+8wxNM5iINgS55DcPz+4inJvRsclZ6S9+qQVFKxwW0GwPb5T0H3DNFoU42WtjXMQFpjZBqceVIZre0mFGrngiaWw1nH+rPne8UV2KrDeBx8p5Pg+4BWJ/1EM7rpiuI5JBHgXXCRT38DnXrA+7HdZ7CdE1mK9mhLSQW64bwxBbq3FxzoSmSf5bH/KfY6p3qlxvk/LN4YLFzlv2iFrljMyTdxJ+lof8xKZ9q6ZeAsjyMte5aLB4lQzt8ynbGTUq+fIxNMEnN0hNriawi1VzC2GoZdlAkVXkZR50be9k/cvQKBgQDv/4PQcViiQgECSqudsrrvSKR8giNqRfA6BxnUgyY7AksSll4OgQ+hn81+Q910sOthZAeAuqWsLdp0wIgAwwkYDfYJ6LL52EnKphHoI516KIsJxwY2iTTl7gBFq9inttqkDGu3QsTEZgUCLa6+XHPhJKAJAKZDPpGPML+z6iSPowKBgQDPuxmbr/YKr/wW+KDaNK7rxjRsW6SN0WlcTvUyaOesqVS6zGsSQSzptmbylKAU/O/LbacCj/vz+s9FIvYpu5/rhain3EmXEU/989phpxiZBL72H/IQoqcZ+6OwMABnhwPXvkFSiF6TcaEgAFJvkLDh6hq12Hop8AWpSvt3ufbNmwKBgQCRLlOx229PsHflx//rBLy6lYoTW7JKzoYUxEjm2nNdDPUXCGlbgs1O61mnASzNM10gbB9xyvb/ojldmT5sn483wvJMaj0ikKmK8k0wzaKszCvXvVLP2M5sLT5y5xLH2gCHbpAWq0hWupRbDgGAXHMpBjvdVkw9r3LkWQwOrRxy2wKBgCUULoP9qptJwmOPSZbpZHetT1owGXU+9eGGLnorA39sUjVtm4cMnymwZzvRj6lvZJYZIoBwlvZ7xFeA4BOe6/KsTuh3h6MxcefQiSB5JQjbMgLYvOp/PfiDVDp0tv3DucneqeZDdS44UBxYMl67ovcQRGhFFbk6oKgRPEWoqgcVAoGAWvLEemzwSxZjNCPBpXnd56RPnQzXxa4DYpNQcbfFFvyokDiCqjJqUtWD+BMrqumtB1wkPeipGgc81iKn+7HOZTin2O/Eb+qkYBiQ3pXBLo07IQr71yzP2uumdjULmyf88Li8dki2cdttdZ0yvKMa4V3dsIxgAx2hODws60p8FA8=";
				//签名随机字符串5d8c1e8f2a146858303ed5f4
				var signstr = "appId=5e16d4287f02352455cf6b0a&nonceStr=d3aeb2e4-48f8-48dd-9dde-f05adfa1d018&timestamp=" + dates +
					"&version=2.0";
				$('#btn_camera,#editUserForm').on('change', function(e) {
					$('.picimgtu').attr('src', '@/assets/images/moren.png');
					vm.$Indicator.loading();
					// var formData = new FormData();
					// formData.append("uploadedFile", this.files[0]);
					// $.ajax({
					// 	url: 'http://123.57.89.89:6333/UserInterface/UploadFile.ashx?UserKey='+vm.UserKey+'&SessionId='+vm.SessionId,
					// 	type: 'post',
					// 	data: formData,
					// 	contentType: false, // 注意这里应设为false
					// 	processData: false,
					// 	cache: false,
					// 	dataType: "json",
					// 	success: function(data) {
					// 		$('.picimgtu').attr('src', data.url);
					// 		upimg(data.url);
					// 	}
					// });
					
					var files = e.target.files || e.dataTransfer.files;
					if (files && files.length > 0) {
						var file = files[0];
		
						resizeImage(file).then(function (result) {
							return typeof result === 'string' ? convertToBlob(result, file.type) : result;
						}).then(function (blob) {
							// 构建FormData
							var formData = new FormData();
							//注意：此处第3个参数最好传入一个带后缀名的文件名，否则很有可能被后台认为不是有效的图片文件
							formData.append("uploadedFile", blob, file.name); 
							// 上传文件
							$.ajax({
								url: 'http://123.57.89.89:6333/UserInterface/UploadFile.ashx?UserKey=2ce31fee-f7a8-4ea0-8b86-b7f277b0c8f4&SessionId=f37d74b1-061a-44f9-9a2d-6dece8d3e2c6',
								method: "POST",
								data: formData,
								cache: false,
								processData: false,
								dataType: "json",
								contentType: false
							}).then(function (data) {
								$('.picimgtu').attr('src', data.url);
								upimg(data.url);
							}).catch(function (err) {
								console.log(err);
							})
						});
					}
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
				$('.add_pic span').on('click', function() {
					var srcp = $('.upimg').val();
					if (srcp == '') {
						return;
					}
					$('.picimgtu').attr('src', srcp);
					upimg(srcp);
				})

				function upimg(imgurl) {
					var signs = "";
					$.ajax({
						url: "http://121.196.209.88:8081/admin-api-1.0-SNAPSHOT/admin-api/getSign/getSign",
						data: {
							"content": signstr,
							"privateKey": priKey
						},
						type: "POST",
						async: false,
						dataType: "text",
						success: function(data) {
							signs = data;
							$.ajax({
								url: "https://api2.jiankangyouyi.com/v2/food/nutrient/recognition.do",
								data: JSON.stringify({
									"reqData": {
										'foodImageUrl': imgurl
									},
									"appId": "5e16d4287f02352455cf6b0a",
									"sign": signs,
									"version": "2.0",
									"nonceStr": "d3aeb2e4-48f8-48dd-9dde-f05adfa1d018",
									"timestamp": dates
								}),
								type: "POST",
								contentType: "application/json;charset=utf-8",
								dataType: "json",
								success: function(data) {
									vm.$Indicator.close();
									var resDatas = JSON.parse(data.resData);
									if (resDatas.topFoodNutrientBeanList.length == 0) {
										$('.noeyepic').show();
										$('.img_jgli').hide();
										return;
									}
									$('.noeyepic').hide();
									$('.img_jgli').show();
									for (var i = 0; i < $('.img_jgli p').length; i++) {
										var atr = $('.img_jgli p').eq(i).attr('name');
										$('.img_jgli p').eq(i).children('span').text(resDatas.topFoodNutrientBeanList[0][atr]);
									}
								}
							})
						}
					})
				}
			}
		},
		mounted() {
			this.onTake();
		},
		created() {
			// if (localStorage.userInfo) {
			// 	this.UserKey = JSON.parse(localStorage.userInfo).UserKey;
			// 	this.SessionId = JSON.parse(localStorage.userInfo).SessionId;
			// } else {
			// 	this.$router.push('/login');
			// }
			// this.information();
		}
	}
</script>

<style scoped lang="scss">
	.pic_img {
		padding-top: 43px;
		padding-bottom: 0.6rem;

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
			border: 1px solid #ddd;
			box-sizing: border-box;

			h3 {
				height: 0.4rem;
				line-height: 0.41rem;
				background: #fff;
				font-size: 0.13rem;
				text-indent: 1em;
				color: #666;
				border-bottom: 1px solid #eee;
			}

			.result_more {
				padding: 0.1rem 0;
				height: 3.0rem;
				overflow-y: auto;

				p {
					font-size: 0.14rem;
					color: #666;
					line-height: 0.26rem;
					padding: 0 0.2rem;
				}
			}
		}
	}
</style>
