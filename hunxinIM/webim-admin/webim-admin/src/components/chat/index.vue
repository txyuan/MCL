<template>
	<div class="userlist">
		<!-- <a-menu style="width: 100%; border-right: 0;" mode="inline" :selectedKeys="selectedKeys" v-if="filterKeyword == ''">
			<a-sub-menu v-for="(item) in userList[type]" :key="getKey(item)" class="my_menu">
				<span slot="title">
					{{ item.name}}
				</span>
				<a-menu-item v-for="val in item.groupList" :key="val.groupid"  @click="select2(val)">
					{{val.groupname}}
				</a-menu-item>
			</a-sub-menu>
		</a-menu> -->

		<a-menu style="width: 100%; border-right: 0;" mode="inline" :selectedKeys="selectedKeys" >
			<a-menu-item style="height: 80px; position: relative; textAlign: left; borderBottom: 1px solid #eee; margin: 0"
			v-for="(item) in groupAjaxTempList" :key="getKey(item)" @click="select2(item, getKey(item))">
				<span class="custom-title">
					{{ item.name }}
				</span>
				<div class="icon-style" v-if="item.meum != 0">
					<span class="unreadNum">{{item.meum}}</span>
				</div>
				<span class="time-style" style="float:right">{{getLastMsg(item).msgTime}}</span>
				<div style="line-height: 30px">消费金额：{{item.account}}</div>
				<div>{{getLastMsg(item).lastMsg}}</div>
			</a-menu-item>
		</a-menu>
		<div v-if="groupAjaxTempList.length == 0" style="margin-top: 15px;">没有好友信息</div>
	</div>
</template>

<script>
	import "./index.less";
	import {
		mapActions,
		mapGetters
	} from "vuex";
	//import EmediaModal from "../emediaModal/index";
	import moment from "moment";
	import _ from "lodash";
	//import AddAVMemberModal from "../emediaModal/addAVMemberModal";
	//import MultiAVModal from "../emediaModal/multiAVModal";
	import GetGroupInfo from "../group/groupInfo.vue";
	import {getHuanXinGroupsByUser, getUserInfo} from "@/api/app.js"

	export default {
		data() {
			return {
				isLoading: false,
				consumptionLoad: false, // 获取金额接口只能加载一次
				groupAjaxList: [], // 群组列表
				groupAjaxTempList: [], // 群组列表
				groupSourceList: [], // 群组原来数据列表
				activedKey: {
					contact: "",
					group: "",
					chatroom: ""
				},
				showFirendMenus: false,
				firendMenus: [{
						name: "加入黑名单",
						id: "1",
						icon: "add-o"
					},
					{
						name: "删除好友",
						id: "2",
						icon: "delete"
					}
				],
				message: "",
				isHttps: window.location.protocol === "https:",
				loadText: "加载更多",
				status: {
					sending: "发送中",
					sent: "已发送",
					read: "已读"
				},
				isCollapse: true,
				unRead: "",
				// selectedKeys: [ this.getKey(this.activedKey[this.type]) ]
			};
		},

		beforeMount() {
			if (this.type === "contact") {
				setTimeout(() => {
					this.onGetFirendBlack();
					this.onGetContactUserList();
				}, 100);
			} else if (this.type === "group") {
				this.onGetGroupUserList();
			} else if (this.type === "chatroom") {
				this.onGetChatroomUserList();
			}
		},
		mounted() {
			// 取到黑名单列表值将黑名单匹配用户列表进行筛选
			let blackList = this.$store.state.friendModule.blackList;
			this.$store.commit("changeUserList", blackList);
			// 监听二级客服的未读消息
			// window.addEventListener('message',e=>{
			// 	if(e.data.meum>=1){
			// 		console.log(e.data)
			// 		// this.messageNumber=Number(e.data.meum)
			// 		// localStorage.mesnum=this.messageNumber
			// 	}
			// },false)
		},
		updated() {
			this.scollBottom();
		},
		computed: {
			...mapGetters({
				contact: "onGetContactUserList",
				group: "onGetGroupUserList",
				chatroom: "onGetChatroomUserList",
				msgList: "onGetCurrentChatObjMsg"
			}),
			userInfo: () => localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")),
			userList() {
				const temp = {
					contact: this.contact.filter(item => {
						this.$set(item, 'username', this.$root.getUserNameByPhone(String(item.name)))
						this.$set(item, 'meum', this.getUnreadNum(item))
						if (item && !this.blackList.includes(item.name)) {
							return item;
						}
					}),
					group: this.group.filter(item => {
						this.$set(item, 'username', this.$root.getUserNameByPhone(String(item.name)))
						this.$set(item, 'meum', this.getUnreadNum(item))
						if (item && !this.blackList.includes(item.name)) {
							return item;
						}
					}),
					chatroom: this.chatroom
				}

				// 获取消费金额
				this.getConsumption(temp.group)

				return temp;
			},
			blackList() {
				return Object.keys(this.$store.state.friendModule.blackList);
			},
			chatList() {
				return this.$store.state.chat.msgList;
			},
			selectedKeys() {
				return [this.getKey(this.activedKey[this.type]) || ""];
			}
		},
		props: [
			"type", // 聊天类型 contact, group, chatroom
			"username", // 选中的聊天对象
			"select",
			"filterKeyword"
		],
		watch: {
			'userList.group': function(value) {
				// 好友列表根据未读消息排序，缓存好友列表顺序
				const newValue = this.userListSortByMessage([...value])
				this.groupAjaxTempList = newValue
				this.groupSourceList = newValue
			},
			filterKeyword: function(value) {
				let groupAjaxList = this.userList.group.filter(item => item.name.indexOf(value) != -1)
				this.groupAjaxTempList = groupAjaxList
			}
		},
		methods: {
			...mapActions([
				"onGetContactUserList",
				"onGetGroupUserList",
				"onGetChatroomUserList",
				"onGetCurrentChatObjMsg",
				"onSendText",
				"onCallVideo",
				"onCallVoice",
				"getGroupMembers",
				"getHistoryMessage",
				"onAddBlack",
				"onDelteFirend",
				"onGetGroupinfo",
				"recallMessage",
				"onGetGroupBlack",
				"onGetFirendBlack"
			]),
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},
			getKey(item) {
				let key = "";
				switch (this.type) {
					case "contact":
						key = item.name;
						break;
					case "group":
						key = item.groupid;
						break;
					case "chatroom":
						key = item.id;
						break;
					default:
						break;
				}
				return key;
			},
			getUnreadNum(item) {
				const {
					name,
					params
				} = this.$route;
				const chatList = this.chatList[name];
				let userId = "";
				if (name == "contact") {
					userId = item.name;
				} else if (name == "group") {
					userId = item.groupid;
				} else {
					userId = item.id;
					return 0;
				}
				
				const currentMsgs = chatList[userId] || [];
				let unReadNum = 0;
				currentMsgs.forEach(msg => {
					if (msg.status !== "read" && msg.status !== "recall" && !msg.bySelf) {
						unReadNum++;
					}
				});
				return unReadNum;
			},
			select2(key) {
				this.$data.selectedKeys = [key.groupid];
				this.select(key);
				this.$data.activedKey[this.type] = key;
				//医生和患者信息
				this.$emit("getInfo", key.name.split("(")[0])
			},
			loadMoreMsgs() {
				const me = this;
				const success = function(msgs) {
					if (msgs.length === 0) {
						me.$data.loadText = "已无更多数据";
					}
				};
				let name = "";
				let isGroup = false;
				if (this.type === "contact") {
					name = this.$data.activedKey[this.type].name;
				} else if (this.type === "group") {
					name = this.$data.activedKey[this.type].groupid;
					isGroup = true;
				} else if (this.type === "chatroom") {
					name = this.$data.activedKey[this.type].id;
					isGroup = true;
				}
				this.getHistoryMessage({
					name,
					isGroup,
					success
				});
			},
			changeMenus() {
				if (this.type === "contact") {
					this.$data.showFirendMenus = !this.$data.showFirendMenus;
				} else if (this.type === "group") {
					this.$refs.groupInfoModel.chengeInfoModel();
					this.getGroupInfo();
				}
			},

			getGroupInfo() {
				this.onGetGroupinfo({
					select_id: this.$data.activedKey[this.type].groupid
				});
			},
			// onSendTextMsg() {
			// 	this.onSendText({
			// 		chatType: this.type,
			// 		chatId: this.$data.activedKey[this.type],
			// 		message: this.$data.message
			// 	});
			// 	this.$data.message = "";
			// },

			selectEmoji(v) {
				this.$data.message = v;
				this.$refs.txtDom.focus();
			},

			customEmoji(value) {
				return `<img src="../../../static/faces/${value}" style="width:20px"/>`;
			},

			renderTxt(txt = "") {
				let rnTxt = [];
				let match = null;
				const regex = /(\[.*?\])/g;
				let start = 0;
				let index = 0;
				while ((match = regex.exec(txt))) {
					index = match.index;
					if (index > start) {
						rnTxt.push(txt.substring(start, index));
					}
					if (match[1] in emoji.obj) {
						const v = emoji.obj[match[1]];
						rnTxt.push(this.customEmoji(v));
					} else {
						rnTxt.push(match[1]);
					}
					start = index + match[1].length;
				}
				rnTxt.push(txt.substring(start, txt.length));
				return rnTxt.toString().replace(/,/g, "");
			},

			callVideo() {
				if (this.type == "contact") {
					this.$refs.emediaModal.showEmediaModal();
					this.$refs.emediaModal.showCallerWait(
						this.$data.activedKey[this.type].name
					);
					const videoSetting = JSON.parse(localStorage.getItem("videoSetting"));
					const recMerge = (videoSetting && videoSetting.recMerge) || false;
					const rec = (videoSetting && videoSetting.rec) || false;
					this.onCallVideo({
						chatType: this.type,
						to: this.$data.activedKey[this.type].name,
						rec,
						recMerge
					});
				} else if (this.type == "group") {
					this.getGroupMembers(this.$data.activedKey[this.type].groupid);
					this.$refs.addAvMembertModal.show();
				}
			},
			callVoice() {
				this.$refs.emediaModal.showEmediaModal();
				this.$refs.emediaModal.showCallerWait(
					this.$data.activedKey[this.type].name
				);
				const videoSetting = JSON.parse(localStorage.getItem("videoSetting"));
				const recMerge = (videoSetting && videoSetting.recMerge) || false;
				const rec = (videoSetting && videoSetting.rec) || false;
				this.onCallVoice({
					chatType: this.type,
					to: this.$data.activedKey[this.type].name,
					rec,
					recMerge
				});
			},
			readablizeBytes(value) {
				let s = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
				let e = Math.floor(Math.log(value) / Math.log(1024));
				return (value / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
			},

			// TODO 可以抽离到utils
			renderTime(time) {
				const nowStr = new Date();
				const localStr = time ? new Date(time) : nowStr;
				const localMoment = moment(localStr);
				const localFormat = localMoment.format("MM-DD hh:mm A");
				return localFormat;
			},
			getLastMsg(item) {
				const {
					name,
					params
				} = this.$route;
				const chatList = this.chatList[name];
				let userId = "";
				if (name == "contact") {
					userId = item.name;
				} else if (name == "group") {
					userId = item.groupid;
				} else {
					userId = item.id;
				}
				const currentMsgs = chatList[userId] || [];
				let lastMsg = "";
				let lastType =
					currentMsgs.length && currentMsgs[currentMsgs.length - 1].type;
				if (currentMsgs.length) {
					if (lastType === "img") {
						lastMsg = "[image]";
					} else if (lastType === "file") {
						lastMsg = currentMsgs[currentMsgs.length - 1].filename;
					} else if (lastType === "audio") {
						lastMsg = "[audio]";
					} else if (lastType === "vidio") {
						lastMsg = "[vidio]";
					} else {
						lastMsg = currentMsgs[currentMsgs.length - 1].msg;
					}
				}
				const msgTime = currentMsgs.length ?
					this.renderTime(currentMsgs[currentMsgs.length - 1].time) :
					"";
				return {
					lastMsg,
					msgTime
				};
			},
			scollBottom() {
				setTimeout(() => {
					const dom = this.$refs.msgContent;
					if (!dom) return;
					dom.scrollTop = dom.scrollHeight;
				}, 0);
			},
			handleCommand(item) {
				let name = "";
				if (this.type === "contact") {
					name = this.$data.activedKey[this.type].name;
				} else if (this.type === "group") {
					name = this.$data.activedKey[this.type].groupid;
				} else if (this.type === "chatroom") {
					name = this.$data.activedKey[this.type].id;
				}
				this.recallMessage({
					to: name,
					message: item
				});
			},
			// onOpenChange(openKeys) {
				// this.userList['contact'].forEach((item) => {
				// 	if(!item.groupList){
				// 		getHuanXinGroupsByUser(item.name).then(({data}) => {
				// 			data.data.forEach((item) => {item.name = item.groupname})
				// 			this.$set(item, 'groupList', data.data)
				// 			this.groupAjaxList.concat(data.data)
				// 		})
				// 	}
				// })
			// },

			// 主动给好友聊天的时候，该好友置顶（未读消息的下边）
			movePositon(){
				let groupid = this.$route.params.id
				for(let i = 0; i < this.groupSourceList.length; i++){
					let item = this.groupSourceList[i]
					if((item.groupid == groupid) && (i != 0)){
						this.groupSourceList.splice(i, 1)
						this.groupSourceList.unshift(item)
						break
					}
				}
				// 缓存好友列表数据
				if(this.groupSourceList.length > 0){
					localStorage.setItem('uesrList', JSON.stringify(this.groupSourceList))
				}
			},

			// 好友列表根据未读消息排序，缓存好友列表顺序
			userListSortByMessage(sourceData){
				// 读取缓存中的好友列表（根据缓存排序）
				if(localStorage.getItem('uesrList') && (sourceData.length > 0)){
					// 数组转换为对象，方便取值
					const temObj = {}
					sourceData.forEach(item => temObj[item.groupid] = item)
					// 遍历缓存中的数据
					const newUserList = []
					const userList = JSON.parse(localStorage.getItem('uesrList'))
					for(let i = 0; i< userList.length; i++){
						let item = userList[i]
						if(temObj[item.groupid]){
							newUserList.push(temObj[item.groupid])
							delete temObj[item.groupid]
						}
					}
					// 新增的用户数据（对比缓存数据）
					Object.keys(temObj).forEach((groupid) => newUserList.push(temObj[groupid]))
					sourceData = newUserList
				}

				// 未读消息的好友，放到列表的前边（根据未读消息排序）
				const weiduList = [] // 有未读消息的好友
				const oldList = [] // 没有未读消息的好友
				for(let i = 0; i< sourceData.length; i++){
					let tempItem = sourceData[i]
					if(tempItem.meum > 0){
						weiduList.push(tempItem)
					}else{
						// 查找当前聊天的好友
						// if((this.$route.name == "group") && (this.$route.params.id == tempItem.groupid)){
						// 	oldList.unshift(tempItem)
						// }else{
						// 其他好友	
							oldList.push(tempItem)
						// }
					}
				}

				// 未读消息排序
				weiduList.sort((a, b) => b.meum - a.meum)
				
				// 拼接数组
				sourceData = [...weiduList, ...oldList]
				// 缓存好友列表数据
				if(sourceData.length > 0){
					localStorage.setItem('uesrList', JSON.stringify(sourceData))
				}
				return sourceData
			},
			// 获取消费金额
			getConsumption(sourceData){
				if(this.consumptionLoad == true){return}
				this.consumptionLoad = true
				const names = sourceData.map(item => {
					item.name = item.groupname
					return item.name.split("(")[0]
				})
				getUserInfo([...names], 'user').then(({data}) => {
					data.data.forEach((item, index) => {
						this.$set(sourceData[index], 'account', item.account)
					})
				})
			}
		}
	};
</script>

<style scoped lang='less'>
	.userlist {
		height: calc(100% - 70px);
		overflow-y: scroll;
		border-right: 1px solid #e8e8e8;
		border-top: 1px solid #e8e8e8;
	}

	.byself {
		float: right;
	}

	.recallMsg {
		font-size: 12px;
		color: #aaa;
		width: 100%;
		text-align: center;
	}

	.custom-title {
		font-weight: 500;
		width: 100%;
		height: 50px;
	}

	.moreMsgs {
		background: #ccc !important;
		border-radius: 8px;
		cursor: pointer;
	}

	.status {
		display: inline;
		position: relative;
		top: 20px;
		font-size: 12px;
		left: -6px;
		color: #736c6c;
	}

	.unreadNum {
		float: left;
		width: 100%;
	}

	.icon-style {
		display: inline-block;
		background-color: #f04134;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		color: white;
		line-height: 1.5;
		text-align: center;
	}

	.emoji-style {
		width: 22px;
		float: left;
	}

	.img-style {
		max-width: 350px;
	}

	.time-style {
		clear: both;
		margin-left: 2px;
		margin-top: 3px;
		font-size: 12px;
		color: #888c98;
		position: absolute;
		right: 5px;
	}

	.file-style {
		width: 240px;
		margin: 2px 2px 2px 0;
		font-size: 13px;

		h2 {
			border-bottom: 1px solid #e0e0e0;
			font-weight: 300;
			text-align: left;
		}

		h3 {
			max-width: 100%;
			font-size: 15px;
			height: 20px;
			line-height: 20px;
			font-weight: 600;
			-o-text-overflow: ellipsis;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			text-align: left;
			margin-bottom: 20px;
		}

		.bottom {
			span {
				color: #999999;
				text-align: left;
			}
		}

		a {
			color: #999999;
			float: right;
			text-decoration: none;
		}

		.el-dropdown-link {
			cursor: pointer;
			color: #409eff;
		}

		.el-icon-arrow-down {
			font-size: 12px;
		}

		.el-menu-vertical-demo {
			width: 100%;
		}
	}
	.my_menu{
		text-align: left;
	}
	.my_menu /deep/ .ant-menu-item{
		padding-left: 35px !important;
	}
</style>
