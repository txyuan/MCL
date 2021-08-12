<template>
  <a-layout style="position: absolute;
	width: 100%;
	overflow: hidden;
	height: 100%;">
    <a-layout-header class="layout-header">
      <div class="header">
        <span class="setting">
          <a-dropdown>
            <span class="ant-dropdown-link" href="#">
              <!--<a-icon type="setting" />-->
              <span class="username">{{$root.getUserNameByPhone(userName).userName}}</span>
            </span>
            <!--<a-menu slot="overlay">
              <a-menu-item @click="recEmedia">
                <a href="javascript:;">音视频录制</a>
              </a-menu-item>
              <a-menu-item @click="GetFirendBlack">
                <a href="javascript:;">好友黑名单</a>
              </a-menu-item>
              <a-menu-item @click="toLogout">
                <a href="javascript:;">退出</a>
              </a-menu-item>
            </a-menu>-->
          </a-dropdown>
        </span>

        <span class="setting">
          <a-dropdown>
            <span class="ant-dropdown-link" href="#">
              <a-icon type="plus-circle" />
            </span>
            <a-menu slot="overlay">
              <!-- <a-menu-item @click="ulClick('1')">
                <a href="javascript:;">添加好友</a>
              </a-menu-item> -->
              <!-- <a-menu-item @click="ulClick('2')">
                <a href="javascript:;">申请入群</a>
              </a-menu-item> -->
              <a-menu-item @click="ulClick('3')">
                <a href="javascript:;">创建群组</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </div>

      <a-menu
        v-model="current"
        mode="horizontal"
        :defaultSelectedKeys="['contact']"
        :style="{ lineHeight: '50px', background: '#434648', color: '#fff', textAlign: 'left'}"
        @click="contactTypeChange"
      >
        <a-menu-item key="contact">
          <a-icon type="user" class="navMenu-icon" />
          <span class="navMenu-text">患者</span>
          <div class="tip-style" v-if="getUnread('contact').contact">&nbsp;</div>
        </a-menu-item>
        <a-menu-item key="group">
          <a-icon type="team" class="navMenu-icon" />
          <span class="navMenu-text">群组</span>
          <div class="tip-style" v-if="getUnread('group').group">&nbsp;</div>
        </a-menu-item>
        <!--<a-menu-item key="chatroom">
          <a-icon type="usergroup-add" class="navMenu-icon" />
          <span class="navMenu-text">聊天室</span>
        </a-menu-item>-->
      </a-menu>
    </a-layout-header>

    <a-layout>
      <a-layout-sider
        style="background: #fff"
        :width="broken ? '100%' : 250"
        breakpoint="lg"
        collapsedWidth="0"
        :trigger="null"
        v-model="collapsed"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <el-input placeholder="搜索" v-model.trim="userListKeyword" style="margin: 15px 0;width: 90%"></el-input>
        <!-- 判断是否后台总管理的的账号，总管理账号需要显示客服列表，患者列表 -->
        <!-- <MessageBoxCompany v-if="userInfo.userId == 'company'" :select="select" :type="activeKey" :filterKeyword="userListKeyword" ref="messageBox" /> -->
        <MessageBox :select="select" :type="activeKey" :filterKeyword="userListKeyword" ref="messageBox"/>
        <!-- <MessageBox v-if="activeKey == 'chatroom'"  type="chatroom" />
        <MessageBox v-if="activeKey == 'group'" type="group" />-->
      </a-layout-sider>

      <a-layout-content style="overflow: visible; flex: 1;">
        <Message
          :type="activeKey"
          :broken="broken"
          :hideUserList="hideUserList"
          :showUserList="showUserList"
          ref="messageList"
          @send="send"
        />
        <AddFriend ref="addFriendMethods" />
        <GetFriendRequest />
        <FirendBlack ref="firendModel" />
        <AddGroupUser ref="addGroupModel" />
        <CreateGroup ref="createGroupModel" />
        <VidoeSetting ref="videoSetting" />
        <GroupRequest />
        <GroupInvite />
      </a-layout-content>
      
      <div id="right_box" v-show="rightShow">
      	<div class="cell doctor">
      		<div class="title">医生信息</div>
      		<div class="content">
      			<div class="touxing" style="margin-bottom: 10px;margin-top: 20px;">
      				<!-- <img :src="doctorInfo.doctorImg" class="img"/> -->
              <div style="overflow: hidden"><p style="float: left">医生姓名：{{doctorInfo.doctorName}}</p> 
              <!-- <el-button size="mini" type="primary" @click="openDoctorChartPage(doctorInfo.phone)" style="float: right" v-show="doctorInfo.flag == 0">沟通</el-button> -->
              </div>  
              <div><p>医生简介：{{doctorInfo.content}}</p></div>  
      			</div>
      		</div>
      	</div>
      	
      	<div class="cell huanzhe" v-show="doctorInfo.flag == 0">
      		<div class="title">患者信息</div>
      		<div class="content">
      			<div class="huanzhe">
      				<span>患者姓名：{{huanzheInfo.name}}</span>
	      			<span>性别：{{huanzheInfo.sex}}</span>
	      			<span>年龄（岁）：{{huanzheInfo.age}}</span>
              <br />
	      			<span>身高（cm）：{{huanzheInfo.height}}cm</span>
	      			<span>体重（kg）：{{huanzheInfo.weight}}kg</span>
	      			<span>BMI：{{huanzheInfo.bmi}}</span>
              <br />
	      			<span>临床诊断：{{huanzheInfo.clinicalDiagnosis}}</span>
              <br />
	      			<span>注册天数（天）：{{huanzheInfo.registrationDays}}</span>
	      			<span>会员天数（天）：{{huanzheInfo.memberDays}}</span>
      			</div>
      
            <div class="btn—wrap">
      				<el-row>
							  <el-button size="mini" type="primary" @click="sendIframe('健康档案', '/Pages/PatientManage/ComprehensiveEvaluationNewReport.aspx')">健康档案</el-button>
							  <el-button size="mini" type="primary" @click="sendIframe('效果评价', '/Pages/PatientManage/PatientEvaluateView_New.aspx')">效果评价</el-button>
							  <el-button size="mini" type="primary" @click="sendIframe('报告查询', '/Pages/OnLinePatientManage/OnLineNutritionScreening.aspx')">报告查询</el-button>
							  <el-button size="mini" type="primary" @click="sendIframe('活动订单', '/Pages/OnLinePatientManage/MyObtainedProductList.aspx')">活动订单</el-button>

							  <el-button size="mini" type="primary" @click="sendIframe('商品订单', '/Pages/OnLineAppManage/OrderList.aspx')">商品订单</el-button>
							  <el-button size="mini" type="primary" @click="sendIframe('套餐订单', '/Pages/OnLinePatientManage/ManagementPackage.aspx')">套餐订单</el-button>
							  <el-button size="mini" type="primary" @click="sendIframe('会员信息', '/Pages/OnLinePatientManage/OnLineMemberManage.aspx')">会员信息</el-button>
                
							  <el-button size="mini" type="primary" @click="sendIframe('饮食记录', `/Pages/PatientManage/DietarySurveyList.aspx?patient_skey=${huanzheInfo.patientkey}&headerSkey=undefined`)">饮食记录</el-button>
							  <el-button size="mini" type="primary" @click="sendIframe('营养处方', '/Pages/OnLinePatientManage/OnLineNutritionPlanInfo.aspx')">营养处方</el-button>
							  <el-button size="mini" type="primary" @click="sendIframe('运动处方', '/Pages/OnLinePatientManage/OnLineMotionPlanInfo.aspx')">运动处方</el-button>
							  <el-button size="mini" type="primary" @click="sendIframe('消费流水', `/Pages/OnLineAppManage/UserBasicRechargeRecordList.aspx?${huanzheInfo.patientkey ? `patient_skey=${huanzheInfo.patientkey}` : ``}`)">消费流水</el-button>
							</el-row>
      			</div>
      		</div>
      	</div>
      	
      	<div class="cell question" style="border-bottom: 0;">
      		<div class="title">常见问题</div>
      		<div class="content">
      			<el-input placeholder="请输入内容" v-model.trim="keyword" class="input-with-select">
					    <el-button slot="append" icon="el-icon-search" @click="searchQuestion"></el-button>
					  </el-input>
					  <div class="listWrap" style="margin-top: 15px;">
					  	<div class="list">
                <div v-show="questionList.length == 0">
						  		<p style="text-align: center;">暂无数据</p>
						  	</div>

                <a-collapse accordion v-show="questionList.length != 0">
                  <a-collapse-panel v-for="(item, index) in questionList" :key="index" :header="item.service_keyword" >
                    <p>{{item.content}}</p>
                    <el-button size="mini" type="primary" @click="copyLink(item.content)" class="tag">复制</el-button>
                  </a-collapse-panel>
                </a-collapse>
						  	<!-- <li v-for="(item, index) in questionList" :key="index">

						  		<p>{{item.content}} </p>
						  		<el-button size="mini" type="primary" @click="copyLink(item.content)" class="tag">复制</el-button>
						  	</li> -->
						  	
						  </div>
					  </div>
      		</div>
      	</div>
      </div>

      <div class="tips" @click="numClick">
        <span class="num" v-if="getAllUnread() > 0">{{allNum}}</span>
        <i class="el-icon-chat-dot-round icon"></i>
      </div>
    </a-layout>
  </a-layout>
</template>

<script>
import Vue from "vue";
import MessageBox from "../../components/chat/index.vue";
import MessageBoxCompany from "../../components/chat/indexCompany.vue";
import Message from "../../components/chat/message.vue";
import AddFriend from "../../components/addModal/addFriend.vue";
import GetFriendRequest from "../../components/addModal/getFriendRequest.vue";
import FirendBlack from "../../components/addModal/firendBlack.vue";
import AddGroupUser from "../../components/group/addGroupUser.vue";
import CreateGroup from "../../components/group/createGroup.vue";
import VidoeSetting from "../../components/videoSetting/index";
import GroupRequest from "../../components/group/groupRequest.vue";
import GroupInvite from "../../components/group/groupInvite.vue";
import "./index.less";
import { mapState, mapActions } from "vuex";
import Clipboard from 'clipboard'
import { BASEURL } from '@/configURL'
export default {
  data() {
    return {
      userListKeyword: '', // 搜索好友的输入框
    	rightShow: false, //右侧信息窗口显示
    	keyword: "",  //搜索关键字
      questionList: [],  //问题列表
      allNum: 0, // 未读消息的总条数
      
    	//医生和患者信息
    	doctorInfo: {
        flag: "", //0：患者，1：医生
        phone:"", //医生手机号
    		age: "",
    		bmi:"",
				diseaseTypes:"",
				doctorImg:"",
				doctorName:"",
				height:"",
				memberDays:"",
				name:"",
				registrationDays:"",
				sex:"",
				weight:"",
    	},
    	huanzheInfo:{

      },

      groupRead: false,
      contactRead: false,
      showSettingOptions: false,
      activeKey: "contact",
      selectedItem: "",
      showAddOptions: false,
      addList: [
        {
          name: "添加好友",
          id: "1",
          icon: "chat"
        },
        {
          name: "申请入群",
          id: "2",
          icon: "friends"
        },
        {
          name: "创建群组",
          id: "3",
          icon: "comment"
        }
      ],
      userName: localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).userId,
      collapsed: false,
      broken: false,
      current: ["contact"]
    };
  },
  computed: {
    chatList() {
      return this.$store.state.chat.msgList;
    },
    userInfo: () => localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")),
  },
  methods: {
    ...mapActions(["onLogout", "onGetFirendBlack"]),
    toLogout() {
      this.onLogout();
    },
    onCollapse(collapsed, type) {
      if (type != "responsive") {
        this.$data.collapsed = true;
      } else {
        this.$data.collapsed = false;
      }
    },
    onBreakpoint(broken) {
      this.$data.broken = broken;
    },
    hideUserList() {
      this.$data.collapsed = true;
    },
    showUserList() {
      this.$data.collapsed = false;
    },
    select(i) {
      this.$refs.messageList.select(i);
      if (this.broken) {
        this.$data.collapsed = true;
      }
      this.userListKeyword = ''
      //医生和患者信息
      this.getDoctorInfo(i)
    },
    GetFirendBlack() {
      this.onGetFirendBlack();
      this.$refs.firendModel.changModel();
    },
    optionsVisibleChange() {
      this.$data.showSettingOptions = !this.$data.showSettingOptions;
    },
    contactTypeChange(type) {
      this.$data.activeKey = type.key;
      this.$router.push(`/${type.key}`);
      if (this.broken && this.collapsed) {
        this.$data.collapsed = false;
      }

      switch (type.key) {
        case "contact":
          this.$refs.messageBox.onGetContactUserList();
          break;
        case "group":
          this.$refs.messageBox.onGetGroupUserList();
          break;
        case "chatroom":
          this.$refs.messageBox.onGetChatroomUserList();
          break;
        default:
          break;
      }
      this.$refs.messageList.getCurrentMsg(type.key);
    },
    addModalChange() {
      this.$data.showAddOptions = !this.$data.showAddOptions;
    },
    ulClick(i) {
      // this.addModalChange();
      switch (i) {
        case "1":
          this.$refs.addFriendMethods.changeModal();
          break;
        case "2":
          this.$refs.addGroupModel.changeGroupModel();
          break;
        case "3":
          this.$refs.createGroupModel.changeCreateModel();
          break;
        default:
          break;
      }
    },
    recEmedia() {
      this.$refs.videoSetting.show();
    },
    getUnread(type) {
      const chatList = this.chatList[type];
      let obj = {
        contact: false,
        group: false
      };
      
      if (JSON.stringify(chatList) != "{}") {
        for (const item in chatList) {
          chatList[item].map((v, k) => {
            if (v.status === "unread") {
              if (v.chatType === "group") {
                obj.group = true;
              }
              if (v.chatType === "contact") {
                obj.contact = true;
              }
            }
            return obj;
          });
        }
      }

      return {
        contact: obj.contact,
        group: obj.group
      };
    },
    // 获取总的未读消息
    getAllUnread() {

      const getNum =(type) => {
        let num = 0;
        const chatList = this.chatList[type];
        if (JSON.stringify(chatList) != "{}") {
          for (const item in chatList) {
            let itemNum = 0
            chatList[item].map((v, k) => {
              if (v.status === "unread") {
                itemNum += 1
              }
            });
            num += itemNum
          }
        }
        return num;
      }
      const allNum = getNum("contact") + getNum("group")
      this.allNum = allNum
      return allNum;
    },

    //医生和患者信息
    async getDoctorInfo(key){
    	this.rightShow = true
      let username = "";
      const {	name } = this.$route;
      if (name == "contact") {
        username = [key.name].join(",");
      } else if (name == "group") {
        // 群组的组成成员列表
        await this.$refs.messageList.getGroupInfo()  // 群组的信息
        const groupInfo = this.$store.state.group.groupInfo
        const { members } = groupInfo
        username = members.map(item => item.member).join(",")
      }
      
      // 获取患者和医生的数据
      const vm = this
      await getInfo(0);
      await getInfo(1);
      this.$nextTick(() => {
        var height = $("#right_box").height();
        var cellHeight = $("#right_box .doctor").height()+$("#right_box .huanzhe").height()
        $("#right_box .question .listWrap").height(height-cellHeight-98)
      })
      
      // 0 患者  1医生
      function getInfo(flag){
        let url = `${BASEURL}/Pages/OnLineAppManage/GetSelectInfoList.ashx`;
        return new Promise(function(reslove,reject){
          $.ajax({
            url: url,
            data: {
              "rphone": username,
              flag
            },
            type: 'post',
            dataType: "json",
            success: (data)=>{
              if(data.rspcode == 1){
                reslove(data)
                if(flag == 0){
                  vm.huanzheInfo = data;
                }
                if(flag == 1){
                  vm.doctorInfo = data;
                }
              }
            },
            error: (data)=>{
              reject(data)
            }
          })
        })
      }
    },
    openDoctorChartPage(phone){
      const {messageBox} = this.$refs;
      let concatList = messageBox.contact;
      concatList.forEach((item, index)=>{
        if(item.name == phone){
          messageBox.select2(item, index)
        }
      })
    },
    //常见问题查询
    searchQuestion(){
    	let url = `${BASEURL}/Pages/OnLineAppManage/GetSericeCommonProblemList.ashx`;
			let param = {"keyword": this.keyword}
			$.ajax({
				url: url,
				data: param,
		    type: 'post',
		    dataType: "json",
		    success: (data)=>{
		    	if(data.rspcode == 1){
		    		this.questionList = data.data;
		    		setTimeout(function(){
		    			var $view = $("#right_box .question .listWrap");
				    	var viewHeight = $view.height();
              var height = $("#right_box .question .listWrap .list").height();
              $view.css("overflow-y","scroll")
				    	// if(height > viewHeight){
				    	// 	$view.css("overflow-y","scroll")
				    	// }else{
				    	// 	$view.css("overflow-y","hidden")
				    	// }
		    		},0)
		    	}
		    }
			})
    },
    copyLink (data) {
      let clipboard = new Clipboard('.tag', {
        text: function () {
          return data
        }
      })
      clipboard.on('success', e => {
        this.$message("复制成功")
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message('复制失败')
        clipboard.destroy()
      })
    },
    //量表点击跳转
    sendIframe(title, page){
      if(page.indexOf('?') !== -1){
        page += `&phone=${this.huanzheInfo.LoginPhone}`
      }else{
        page += `?phone=${this.huanzheInfo.LoginPhone}`
      }
      var pageSrc = `${title},${page}`
      parent.postMessage(pageSrc, "*"); 
    },
    send(){
      // 移动该好友的顺序
      if(this.$refs.messageBox.movePositon){
        this.$refs.messageBox.movePositon()
      }
    },
    // 未读消息的总条数的点击事件
    numClick(){

      if(this.allNum == 0){
        return;
      }

      // 获取每个好友的第一条未读消息
      const getMessage = (type) => {
        const chatList = this.chatList[type], hisroryList = [];
        if (JSON.stringify(chatList) != "{}") {
          for (const item in chatList) {
            let historyObj = {}, useritem = chatList[item]
            for (let i =0; i < useritem.length; i++ ) {
              const itemMessage = useritem[i]
              if (itemMessage.status === "unread") {
                historyObj = itemMessage
                break
              }
            }
            // 每个用户未读的消息对象
            if(JSON.stringify(historyObj) != "{}"){
              hisroryList.push(historyObj)
            }
          }
        }
        return hisroryList;
      }
      
      const list = [...getMessage("contact"), ...getMessage("group")].sort((a, b) => b.time - a.time)
      
      if(list.length > 0){
        // 模拟点击患者和群组菜单。
        const chatId = list[0].chatId
        const chatType = list[0].chatType
        this.current = [chatType]
        this.contactTypeChange({key: chatType})
        // 根据（好友/群组）id查找左侧菜单对应的菜单，执行对应菜单的点击事件。
        this.$nextTick(() => {
          const userList = this.$refs.messageBox.userList[chatType]
          for(let i=0; i<userList.length; i++){
            const item = userList[i]
            let itemId = ""
            if(chatType == "contact"){
              itemId = item.name
            }else if(chatType == "group"){
              itemId = item.groupid
            }
            if(itemId == chatId){
              this.$refs.messageBox.select2(item)
              break
            }
          }
        })
      }
    }
  },
  created(){
    //获取昵称
    this.$root.getUserInfo([this.userName])
  },
  components: {
    MessageBox,
    MessageBoxCompany,
    Message,
    AddFriend,
    GetFriendRequest,
    FirendBlack,
    AddGroupUser,
    CreateGroup,
    VidoeSetting,
    GroupRequest,
    GroupInvite
  }
};
</script>
<style>
	#right_box{
		width: 451px;
		background: #FFF;
		text-align: left;
	}
	#right_box .cell .title{
		text-align: center;
		font-size: 16px;
	}
	#right_box .content{
		padding: 0 15px;
	}
	#right_box .cell{
		border-bottom: 1px solid #DCDFE6;
	}
	.btn—wrap{
		padding-top: 10px;
	}
	.btn—wrap button{
		margin-bottom: 5px;
		text-align: center;
		margin-left: 1px !important;
		min-width: 79px;
		box-sizing: border-box;
	}
	.btn—wrap button:first-child,{
		margin-left: 0px !important;
	}
	
	.touxing {
		text-align: left;
	}
	.touxing img{
		width: 60px;
		height: 60px;
		border-radius: 30px;
		border-width: 0;
		background: #CCCCCC;
		display: inline-block;
	}
	.touxing p{
		/* margin-left:15px; */
		margin: 0px;
		/* display: inline-block; */
	}
	.huanzhe>span{
		margin-right: 15px;
	}
	#right_box .list {padding: 0;margin: 0;}
	#right_box .list li{
		border-bottom: 1px solid #CCCCCC;
		display: flex;
		justify-content: space-between;
		padding: 5px 0;
	}
	#right_box .list li p{
		margin: 4px 0;
		width: 350px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
	}

  .tips{
    position: fixed;
    right: 20px;
    bottom: 20px;
    font-size: 30px;
    width: 50px;
    height: 50px;
    text-align: center;
    background: #FFF;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 1px 1px 10px 3px #CCCCCC;
  }
  .tips .icon{
    font-size: 28px;
    vertical-align: middle;
  }
  .tips .num{
    position: absolute;
    top: 5px;
    right: 5px;
    min-width: 20px;
    height: 20px;
    color: #FFF;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    background: #f04134;
    font-size: 12px;
  }
</style>
