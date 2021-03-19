<template>
  <div class="padding-header">
    <mt-header title="申请售后" fixed class="borderBottom">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="content">
        <div>
            <productOrderItem class="productRow" :itemData="detail"/>
            <div class="cell_group">
                <mt-cell title="退款原因" is-link @click.native="popupVisible = true">
                    <span v-if="param.RefundReason">{{param.RefundReason}}</span>
                    <span v-else>请选择</span>
                </mt-cell>
                <mt-cell title="退款金额" class="left">
                    <span class="yellow">¥{{detail.orderMoney}}</span>
                </mt-cell>
            </div>
            <div class="note">
                不可修改，最多¥{{detail.orderMoney}}，含发货邮费¥0.00
            </div>
            <div class="filed_group">
                <mt-field v-model="param.RefundExplain" label="退款说明" placeholder="选填，最多200字" class="borderBottom"></mt-field>
            </div>
        </div>
    </div>
    <div class="fix_bottom">
        <mt-button type="primary" class="theme-button" size="large" @click.native="submit" :disabled="disabled">提交</mt-button>
    </div>

    <!-- 性别picker  -->
    <mt-popup v-model="popupVisible" position="bottom" class="picker_style">
        <mt-picker :slots="slots" :showToolbar="true" :visibleItemCount="3" ref="picker">
            <div class="picker_bar">
                <div class="cancel" @click="popupVisible = false">取消</div>
                <div class="confrim" @click="pickerConfirm">确定</div>
            </div>
        </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import productOrderItem from './productOrderItem.vue'
export default {
  props: ['itemData'],
  data: () => ({
      param: {
        sKey: '',
        RefundReason: '',
        RefundExplain: '',
        //   sKey（订单主键），RefundReason（退款原因），RefundExplain（退款说明）
      },
      detail: {},
      popupVisible: false, // 是否显示性别picker
      slots: [{
        flex: 1,
        values: ['拍错/多拍/不喜欢', '未按约定时间发货', '协商一致退款', '地址/电话填错了', '送达时间选错了', '其他'],
        className: 'slot1',
        textAlign: 'center'
      }],
      disabled: false
  }),
  methods:{
      getDetail(){
        let url = 'UserInterface/mall/getRefundOrderDetails.ashx'
        this.$post(url, {orderkey: this.param.sKey}).then((data) => {
            if (data.rspcode != 1) {
                return
            }
            const source = data.data
            this.detail = {
                goodsName: source.goodsName,
                goodsImage: source.goodsImage,
                buyTime: '',
                buyCount: source.ProCount,
                orderMoney: source.OrderMoney
            }
        })
      },
      pickerConfirm(){
        const { picker } = this.$refs
        let value = picker.getSlotValue(0)
        this.param.RefundReason = value
        this.popupVisible = false
      },
      submit(){
        if(!this.param.RefundReason){
            this.$Toast('请选择退款原因')
            return
        }
        this.disabled = true
        let url = 'UserInterface/order/RefundOrder.ashx'
        this.$post(url, this.param).then((data) => {
            this.disabled = false
            if (data.rspCode != 1) {
                this.$Toast(data.rspDesc)
                return
            }
            this.$Toast('提交成功')
            this.$router.back()
        })
      }
  },
  created(){
    const orderkey = this.$route.query.orderkey
    this.param.sKey = orderkey
    this.getDetail()
  },
  components: {
    productOrderItem
  }
};
</script>

<style lang="scss">
.cell_group{
    margin-top: 0.15rem;
    a.mint-cell{
        position: relative;
        min-height: 0.48rem;
    }
    .mint-cell-wrapper{
        font-size: 16px;
        color: #000;
        padding-left: 0.2rem;
    }
    a.mint-cell::after{
        background-color: #000;
        content: " ";
        opacity: 0.1;
        right: 0;
        bottom: 0;
        left: 0.2rem;
        position: absolute;
        height: 1px;
    }
    a.mint-cell:last-child::after{
        opacity: 0;
    }
    a.mint-cell.left .mint-cell-title{
        flex: none;
        width: 105px;
    }
}
.filed_group{
   .mint-cell-wrapper{
      padding-left: 0.2rem; 
   }
   .mint-cell-value input{
       font-size: 0.14rem;
       border: 0;
       color: #999;
   }
   .mint-cell-value input::placeholder{
       color: #999;
   }
}
.fix_bottom {
    padding: 0;
    .theme-button {
        height: 48px;
    }
    
}
.mint-popup-bottom {
	width: 100%;
}

.picker_style{
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
}

</style>
<style scoped>
.content{
    padding-top: 0.1rem;
}
.note{
    padding-left: 0.2rem;
    line-height: 0.4rem;
    font-size: 0.12rem;
    color: #999;
}
.productRow /deep/ .right .name {
    margin-top: 0.06rem !important;
}
</style>