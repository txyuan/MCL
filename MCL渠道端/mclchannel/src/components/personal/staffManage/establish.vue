<template>
	<div>
		<mt-header fixed title="创建员工">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="estab_cont">
			<ul>
				<li>
					<span>员工手机号</span>
					<input type="text" v-model="param.userphone" />
				</li>
				<li>
					<span>员工姓名</span>
					<input type="text" v-model="param.username" />
				</li>
				<li>
					<span>默认密码</span>
					<input type="text" value="0000" disabled="disabled" />
				</li>
				<li>
					<span>员工身份</span>
					<label @click="pickerToggle('show')">{{ygid}}</label>
				</li>
			</ul>
		</div>
		<div class="buttons">
			<label @click="creatUser">保存</label>
		</div>
		<!-- 员工身份picker  -->
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfo">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
export default {
  name: 'establish',
  data: () => ({
    param: {
      userphone: '', // 手机号
      username: '', // 姓名
      userpwd: '0000', // 密码
      role: '6' // 6：推广员工；7：发货员工
    },
    sexSlots: [{
      flex: 1,
      values: ['推广员', '发货员'],
      className: 'slot1',
      textAlign: 'center'
    }],
    popupVisible: false, // 是否显示员工picker
    ygid: '推广员'
  }),
  methods: {
    // 是否可创建发货员工
    isshopfh () {
      let values = ['推广员', '发货员']
      let valuess = ['推广员']
      const userInfo = JSON.parse(localStorage.userInfo)
      if (userInfo.UserType == '8') {
        this.sexSlots[0].values = valuess
      } else {
        this.sexSlots[0].values = values
      }
    },
    // 员工身份picker
    pickerToggle (state) {
      if (state == 'show') {
        this.popupVisible = true
      }
      if (state == 'hide') {
        this.popupVisible = false
      }
    },
    // 员工身份picker  确定
    editUserInfo () {
      const {
        sexPicker
      } = this.$refs
      let sex = sexPicker.getSlotValue(0)
      this.ygid = sex
      this.param.role = (sex == '推广员' ? 6 : 7)
      this.pickerToggle('hide')
    },
    // 创建员工
    creatUser () {
      if (this.param.userphone == '') {
        this.$Toast('请填写员工手机号')
        return
      }
      if (this.param.username == '') {
        this.$Toast('请填写员工姓名')
        return
      }
      let url = 'UserInterface/channel/CreateStaff.ashx'
      this.$post(url, this.param).then((data) => {
        this.$Toast(data.rspdesc)
        if (data.rspcode != 1) {
          return
        }
        this.$router.back()
      })
    }
  },
  mounted: function () {
    this.isshopfh()
  }
}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.mint-popup-bottom {
		width: 100%;
	}

	.picker_bar {
		display: flex;
		justify-content: space-between;
		text-align: center;
		line-height: 40px;
		padding: 0 20px;
		border-bottom: solid 1px #eaeaea;

		.confrim {
			color: #26a2ff;
		}
	}

	.add_btn {
		margin-top: 0.6rem;
	}

	.estab_cont {
		padding-bottom: 0.6rem;
		padding-top: 43px;

		ul {
			margin-top: 0.1rem;

			li {
				padding: 0 3%;
				border-bottom: 1px solid #eee;
				background: #fff url(../../../assets/images/jiantou@2x.png) no-repeat 98% center;
				background-size: 0.22rem;
				line-height: 0.46rem;
				overflow: hidden;
				height: 0.46rem;

				span {
					display: block;
					font-size: 0.16rem;
					color: #333;
					float: left;
				}

				input,
				label {
					width: 50%;
					border: none;
					font-size: 0.14rem;
					text-align: right;
					color: #333;
					height: 0.46rem;
					float: right;
					margin-right: 0.24rem;
				}
			}
		}
	}

	.buttons {
		overflow: hidden;

		label {
			width: 88%;
			height: 0.4rem;
			display: block;
			font-size: 0.15rem;
			color: #fff;
			text-align: center;
			line-height: 0.4rem;
			margin: 0 auto;
			border-radius: 0.2rem;
			background: #FF3D3D;
			margin-top: 0.05rem;
		}
	}
</style>
