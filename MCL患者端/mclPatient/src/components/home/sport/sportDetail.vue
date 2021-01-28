<template>
	<div>
		<mt-header title="运动" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		
		<div class="sptdtl">
			<img src="../../../assets/images/ydcfdetail.jpg" />
			<div class="sptdtl_ff">
				<h3>日常生活</h3>
				<div class="sptdtl_cont">
					<p>必须项目<span>（全做）</span></p>
					<label>日常琐事（刷牙，洗手，梳头，刮胡子等），洗淋浴，用毛巾擦身（站姿）穿脱衣,洗衣服，收衣服，熨衣服，挂衣服，收叠洗好的衣服</label>
				</div>
				<div class="sptdtl_cont">
					<p>选择项目<span>（选其一）</span></p>
					<label>1、盛菜，摆饭桌，烹调前的材料准备(走着)坐床边，边聊天边吃饭，吃饭(站姿)，洗碗(站姿)</label>
					<label>2、扫除：轻微的活动(扫垃圾，收拾房间，换床上用品，倒垃圾)收拾行李(站姿)</label>
					<label>3、给植物浇水，陪孩子玩(坐姿，轻松地)，照顾孩子或宠物，轻微的农活，推儿童车或和孩子一起走，玩扑克牌，复印(站姿)</label>
					<label>4、站着的工作(售货员，工厂等)</label>
				</div>
				<div class="sptdtl_cont">
					<p>选择项目<span>（选其一）</span></p>
					<label>1、领着小孩或狗，购物等)</label>
					<label>2、钓鱼(坐船钓鱼2.5，溪流钓鱼6.0)</label>
					<label>3、打扫屋子</label>
					<label>4、木工活</label>
					<label>5、捆绑东西，从车里拿东西</label>
					<label>6、上下楼梯</label>
					<label>7、站着照顾孩子</label>
					<label>8、打麻将</label>
					<label>9、给植物浇水</label>
				</div>
				<div class="sptdtl_cont">
					<p>选择项目<span>（选其一）</span></p>
					<i>娱乐休闲</i>
					<label>1、广场舞，交谊舞(快)</label>
					<label>2、和孩子玩儿/照顾宠物(较剧烈的行走和小跑)</label>
					<label>3、上下楼梯，家具的移动搬运</label>
					<label>4、擦地(跪姿)，扫地，拖地</label>
					<label>5、园艺工作</label>
				</div>
				<div class="sptdtl_cont">
					<p>农活</p>
					<label>1、清除房顶的积雪，用铁锹铲雪，推轮椅车</label>
					<label>2、种植树苗，院子拔草，割草(用电动割草机，推着走)，晒稻草给家畜喂食，养牲畜</label>
					<label>3、油漆，轻木工活</label>
					<label>4、挖坑，清扫仓库，劈木，耕作</label>
					<label>5、给家畜喂食，饲养牲畜</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "sport",
		data: () => ({
			
		})
	}
</script>

<style scoped lang="scss">
	.sptdtl{
		padding-top: 53px;
		img{
			width: 100%;
		}
		.sptdtl_ff{
			background: #fff;
			padding-bottom: 0.2rem;
			h3{
				width: 96%;
				margin-left: 4%;
				border-bottom: 1px solid #eee;
				font-weight: 400;
				font-size: 0.17rem;
				line-height: 0.44rem;
				color: #000;
			}
			.sptdtl_cont{
				padding: 0 4%;
				p{
					font-size: 0.16rem;
					line-height: 0.6rem;
					color: #000;
					span{
						color: #999;
						font-size: 0.14rem;
					}
				}
				i{
					font-style: normal;
					display: block;
					font-size: 0.15rem;
					padding-bottom: 0.16rem;
				}
				label{
					font-size: 0.14rem;
					display: block;
					padding-bottom: 0.14rem;
					color: #999;
				}
			}
			
		}
	}
</style>
