<template>
    <div style="background: #fff;height: 100vh;">
      <mt-header title="知情同意书" style="position: fixed;top: 0;left: 0;width: 100%;border-bottom: 1px solid #ddd;">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="xiy" style="padding: 60px 10px 10px 10px;">
        <p class="title">尊敬的先生/女士：</p>
        <p class="title">您好！</p>
        <p>欢迎您加入加拿大生活方式医学管理中心大家庭！这是一项来自加拿大的专业肿瘤治疗性生活方式医学改变及疾病症状管理项目（简称MCL生活方式管理），不同于普通的医疗项目。我们能更加清晰地找到机体发病原因并帮助您战胜疾病，并通过结合饮食计划、锻炼、营养补充剂和压力等多方面管理，以滋养、平衡和重塑机体活力的方式全面提高身体功能，以达到缓解或逆转疾病。我们已成功帮助了成千上万的肿瘤（慢病）患者。因此，我们想邀请您参加该项目。</p>
        <p>MCL可以帮助您：</p>
        <p>①每天采用简单步骤，监测并记录您的饮食、运动、心理及症状的变化；</p>
        <p>②您的每一次记录都会得到专业的实时指导； </p>
        <p>③您的每一次记录都会以变化曲线的形式展现给您及您的临床医生；</p>
        <p>④临床医师、注册营养师或者肿瘤康复管理师在线一对一实时咨询；</p>
		<p>⑤您的健康指标出现异常，系统会自动给您、您的亲人及临床医生发送风险预警信息。</p>
		<p>我们为您提供的管理系统非常重要。我们将会分析您疾病情况、个人病史、测试结果、目前的生活方式和健康状况，为您制定健康目标。并通过综合、高度个性化的以及具体细致的计划，指导您一步步实现这些健康目标。如果您能严格按照我们要求做好准备，将会将管理效果最大化。</p>
		<p>您需要按以下要求做好：</p>
		<p>①每个手机号仅限注册一个账号，为增强监督，可同时绑定多位亲属手机账号；</p>
		<p>②严格如实填写健康史和生活方式相关调查量表；</p>
		<p>③按时按量执行饮食、营养、运动及心理处方；</p>
		<p>④按时记录每天的生活方式相关及症状变化，越详细越好；</p>
		<p>在我们的大家庭里，您并不孤单，就像有一群伙伴陪伴您走过这种疾病。</p>
		<p>如果您有与本项目相关的任何问题,或有与自身权益相关的任何问题，请联系客服，联系电话：400 644 7333。</p>
		<p>我已被告知MCL项目的宗旨、获益、义务等。我已经阅读这份知情同意书，并且同意参加本项目。</p>
       
      </div>
    </div>
</template>

<script>
    export default {
        name: "notice-clause"
    }
</script>

<style scoped>
  .title{
  	text-indent: 0px;
  }
  p{
  	text-indent: 28px;
  	line-height: 1.5;
  	font-size: 14px;
  }
</style>
