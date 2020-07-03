<template>
	<div>
		<mt-header title="营养筛查" fixed class="borderBottom">
		  <div slot="left">
		    <header-back>
		      <mt-button icon="back"></mt-button>
		    </header-back>
		  </div>
		</mt-header>
		<div class="scrieen">
			<div class="scrin_list">
				<h2>1、疾病营养需要量程度评分</h2>
				<ul>
					<li>
						<span></span>
						<p>正常营养需要量</p>
					</li>
					<li>
						<span></span>
						<p>需要量轻度提高：髋关节骨折、慢性疾病有急性并发症者（肝硬化、慢性阻塞性肺病、血液透析、糖尿病、一般肿瘤患者）</p>
					</li>
					<li class="actv">
						<span></span>
						<p>需要量中度增加：腹部大手术、脑卒中、重症肺炎、血液恶性肿瘤</p>
					</li>
					<li>
						<span></span>
						<p>需要量明显增加：颅脑损伤、骨髓移植、APACHE评分>10的ICU患者</p>
					</li>
				</ul>
			</div>
			<div class="scrin_list">
				<h2>2、年龄是否≥70岁</h2>
				<ul>
					<li>
						<span></span>
						<p>是</p>
					</li>
					<li class="actv">
						<span></span>
						<p>否</p>
					</li>
				</ul>
			</div>
			<div class="scrin_list">
				<h2>3、疾病营养需要量程度评分</h2>
				<ul>
					<li>
						<span></span>
						<p>正常营养需要量</p>
					</li>
					<li>
						<span></span>
						<p>需要量轻度提高：髋关节骨折、慢性疾病有急性并发症者（肝硬化、慢性阻塞性肺病、血液透析、糖尿病、一般肿瘤患者）</p>
					</li>
					<li class="actv">
						<span></span>
						<p>需要量中度增加：腹部大手术、脑卒中、重症肺炎、血液恶性肿瘤</p>
					</li>
					<li>
						<span></span>
						<p>需要量明显增加：颅脑损伤、骨髓移植、APACHE评分>10的ICU患者</p>
					</li>
				</ul>
			</div>
			<div class="scrin_list">
				<h2>1、疾病营养需要量程度评分</h2>
				<ul>
					<li>
						<span></span>
						<p>正常营养需要量</p>
					</li>
					<li>
						<span></span>
						<p>需要量轻度提高：髋关节骨折、慢性疾病有急性并发症者（肝硬化、慢性阻塞性肺病、血液透析、糖尿病、一般肿瘤患者）</p>
					</li>
					<li class="actv">
						<span></span>
						<p>需要量中度增加：腹部大手术、脑卒中、重症肺炎、血液恶性肿瘤</p>
					</li>
					<li>
						<span></span>
						<p>需要量明显增加：颅脑损伤、骨髓移植、APACHE评分>10的ICU患者</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    name: "realName",
	    data: () => ({
			
		})
	}
</script>

<style scoped lang="scss">
	.scrieen{
		margin-top: 43px;
		padding: 0 3%;
		.scrin_list{
			margin-top: 0.1rem;
			background: #fff;
			padding: 0.1rem;
			h2{
				color: #333535;
				font-size: 0.16rem;
				font-weight: 600;
			}
			ul{
				margin-top:0.1rem;
				li{
					margin-top: 0.04rem;
					overflow: hidden;
					span{
						width: 0.12rem;
						height: 0.12rem;
						display: block;
						background: url(../../../assets/images/select@2x.png) no-repeat center center;
						background-size: 100%;
						float: left;
						margin-top: 0.04rem;
						
					}
					p{
						width: 93%;
						float: left;
						font-size: 0.14rem;
						color: #333535;
						margin-left: 0.1rem;
					}
					&.actv{
						span{
							background: url(../../../assets/images/select_click@2x.png) no-repeat center center;
							background-size: 100%;
						}
					}
				}
			}
		}
	}
</style>
