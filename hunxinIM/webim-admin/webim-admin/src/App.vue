<template>
    <div id="app">
        <router-view />
		<a-modal
			title="系统升级公告"
			:visible="true"
			:closable="false"
			:footer="null"
		>
			<p style="text-indent: 28px;">尊敬的用户，为了给大家提供更优质的服务，医随康“咨询对话框”服务将在3月24-27日进行系统升级维护，在此期间将暂停使用，其余版块服务正常使用。升级期间有任何问题请联系客服微信或拨打客服电话19112955142/19942298381/19122340792，感谢您的理解！</p>
		</a-modal>
    </div>
</template>

<script>
import WebIM from "./utils/WebIM";
import { mapState, mapActions } from "vuex";


export default{
	name: "App",
	methods:{
		
	},
	beforeMount(){
		
		// 非login页面。 实现自动登录功能
		const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"));
		if(userInfo && this.$route.name !== 'login'){
			const userName = userInfo.userId;
			const password = userInfo.password;
			const options = {
				apiUrl: WebIM.config.apiURL,
				user: userName,
				pwd: password,
				appKey: WebIM.config.appkey
			};
			WebIM.conn.open(options);
		}
	},
	
};
    
</script>

<style>
  @import url('./utils/theme/base.css');

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .el-message-box{
	  width: 50%;
	  max-width: 400px;
  }

</style>
