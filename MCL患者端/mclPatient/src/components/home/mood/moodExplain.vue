<template>
  <div class="moodExplain-root">
  	<div id="body_main" style="padding-top: 43px;">
  		<mt-header title="心情" fixed>
		    <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
		  </mt-header>
		  
		  <div class="page">
		  	<div class="title">
		  		<span class="font17">Anura心理压力值（ASI）</span>
		  		<span class="huiFont font12 float_right">数据仅供参考</span>
		  	</div>
		  	
		  	<div class="panel">
		  		<div class="list">
		  			<ul class="clear">
		  				<li style="background-color: #71E096;">1</li>
		  				<li style="background-color: #74E8B4;">2</li>
		  				<li style="background-color: #FFEB78;" class="active">3</li>
		  				<li style="background-color: #ED8285;">4</li>
		  				<li style="background-color: #E9414F;">5</li>
		  			</ul>
		  		</div>
		  		<p class="font13 pane-state">状态:高效</p>
		  		<ul class="panel-list font13 huiFont">
		  			<li>● ASI值"适中"表示你有一定的心理压力，身心健康处于稳定状态。</li>
		  			<li>● 大多数人在此ASI区间会表现出最佳的工作状态。 </li>
		  			<li>● 如果你在工作中保持此ASI状态并在休息时适当放松，将会受益匪浅.</li>
		  		</ul>
		  		<div class="note font12">
		  			注:正如静息心率(RHR)会持续变化-样，你的心理压力值( ASI)在连续的测量中显示不同的结果也是正常现象，这是因为心率变异性( HRV )也是持续变化的。所以，当你连续测量时，心理压力值(ASI)结果出现多至1.0的波动也并非异常现象。
		  		</div>
		  	</div>
		  </div>
		
  	</div>    
  </div>
</template>

<script>
    export default {
        name: "moodExplain",
        data:()=>({

        }),
        methods:{
        	
        },
    }
</script>

<style scoped lang="scss">
	.page{
		padding: 0.20rem;
	}
  .title:before{
  	content: "";
  	display: inline-block;
  	width:5px;
		height:11px;
		background:#F78335;
		border-radius:3px;
		margin-left: -5px;
		margin-right: 5px;
  }
  .title{
		padding-left: 5px;
		
  }
  .panel{
  	/*height:3.22rem;*/
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(55,61,83,0.51);
		border-radius:15px;
		padding: 16px;
		margin-top: 20px;
  }
  .list {
  	border-radius: 3px;
  	overflow: hidden;
  }
  .list li{
  	float: left;
  	width: 20%;
  	box-sizing: border-box;
  	text-align: center;
  	color: #FFFFFF;
  	font-size: 0.18rem;
  	line-height: 0.27rem;
  	height: 0.27rem;
  }
  .list li.active{
  	border: 0.02px solid #48546E;
  	color: #48546E;
  	line-height: 0.25rem;
  }
  
  .pane-state{
  	margin-top: 0.1rem;
  	color: #7786E4;
  }
  .panel-list{
  	line-height: 1.5;
  	border-bottom: 1px solid #EDEDF5;
  	padding-bottom: 0.15rem;
  	margin-bottom: 0.15rem;
  }
  .note{
  	color: #CDCFDE;
  	line-height: 1.5;
  }
</style>
