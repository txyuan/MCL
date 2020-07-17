
<template>
  <el-container>
	<div class="login" v-if="false">
		<div class="login-panel">
			<div class="logo">Web IM</div>
			<van-cell-group>
				<van-field v-model="username" equired placeholder="用户名"/>
				<van-field v-model="password"  v-on:keyup.13="toLogin" type="password" placeholder="密码" required/>
				<van-field v-model="nickname" placeholder="昵称" v-show="this.isRegister == true"/>
			</van-cell-group>
			<van-button type="default" @click="toRegister" v-if="this.isRegister == true">注册</van-button>
			<van-button type="default" @click="toLogin" v-else>登录</van-button>
		</div>
		<p class="tip" v-if="this.isRegister == true">
			已有账号?
			<span class="green" v-on:click="changeType">去登录</span>
		</p>
		<p class="tip" v-else>
			没有账号?
			<span class="green" v-on:click="changeType">注册</span>
		</p>
	</div>
  </el-container>
</template>

<script>
import "./index.less";
import { mapState, mapActions } from "vuex";
export default{
	data(){
		return {
			username: "",
			password: "111111",
			nickname: ""
		};
	},
	mounted: function(){
		const path = this.isRegister ? "/register" : "/login";
    
		if(path !== location.pathname){
			// this.$router.push(path);
		}

		// 从连接后边截取 username和userkey
		// 自动登录
		const username = this.$route.query.username;
		if(username){
			this.username = username
			const {userkey} = this.$route.query
			localStorage.UserKey = userkey
			this.toLogin()
		}
	},
	components: {},
	computed: {
		isRegister(){
			return this.$store.state.login.isRegister;
		},
	},
	methods: {
		...mapActions(["onLogin", "setRegisterFlag", "onRegister"]),
		toLogin(){
			this.onLogin({
				username: this.username.toLowerCase(),
				password: this.password
			});
		},
		toRegister(){
			this.onRegister({
				username: this.username.toLowerCase(),
				password: this.password,
				nickname: this.nickname.toLowerCase(),
			});
		},
		changeType(){
			this.setRegisterFlag(!this.isRegister);
		}
	}
};
</script>
