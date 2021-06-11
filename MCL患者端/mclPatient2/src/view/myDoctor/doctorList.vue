<template>
    <div class="padding-header page-bg-hui">
        <mt-header title="我的医生" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
            <div slot="right" @click="$router.push({name: 'myDoctor'})">医生</div>
        </mt-header>
        
        <div class="nav fix_top">
            <ul>
                <li v-for="(item, index) in navList" :key="index" :class="{'active': param.doctorType == item.value}" @click="param.doctorType = item.value;startLoad()">{{item.name}}</li>
            </ul>
        </div>

        <div class="content">
            <loadMore :param="param" @triggerGetList="loadData" ref="loadMoreE">
                <ul class="doctorList" slot="content">
                    <li v-for="(item, index) in list" :key="index" @click="$router.push({name: 'doctorDetail'})">
                        <img v-lazy="item.DoctorImg" alt="" class="doctorPic">
                        <div class="right">
                            <div class="name">{{item.DoctorName}}<span>{{item.Position}}</span></div>
                            <div class="location">{{item.HospitalName}}&nbsp;&nbsp;&nbsp;{{item.Department}}</div>
                            <div class="num"> <p>好评：<span>{{item.Praise}}</span></p> <p>已咨询：<span>{{item.consultingCount}}</span></p></div>
                            <div class="des">擅长：{{item.BeGoodAt}}</div>
                            <div class="labels">
                                <div><span class="label active">图文</span></div>
                                <div><span class="label">视频</span></div>
                                <div><span class="label">语音</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </loadMore>
        </div>
    </div>
</template>

<script>
import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
import { getDoctorInfoList } from "@/api/doctor.js"
export default {
    data() {
        return {
            navList: [
                {name: "附近医生", value: "1"},
                {name: "平台医生", value: "2"},
            ],
            param: {
				"pagecount": 0,
				"pagesize": 10,
                "doctorType": 1, // 1：附近医生，2：平台医生
			},
			list: [],
            isLoad: false
        }
    },
    methods: {
        //触发加载更多
        startLoad() {
            this.param.pagecount = 0;
            this.$refs.loadMoreE.getList();
        },
        //商品列表
        async loadData(success) {
            if (this.param.pagecount == 1) {
                this.list = [];
            }
            const data = await getDoctorInfoList(this.param)
            if (data.rspcode != 1) {
                return;
            }
            this.isLoad = true
            let modelList = data.data;
            this.list = [...this.list, ...modelList]
            //加载更多组件触发回调
            if (success) {
                success(modelList, this.list)
            }
        },
    },
    beforeRouteEnter (to, form, next) {
        next((vm) => {
            // 解锁加载更多
            vm.$refs.loadMoreE.isLock = true
            // 从详情页面返回，列表接口如果没有被加载过，需要加载接口
            // if (form.name === 'doctorDetail' && !vm.isLoad) {
            //     vm.startLoad()
            // }
            // 非详情页面进来
            if (form.name !== 'doctorDetail') {
                vm.startLoad()
            }
        })
    },
    beforeRouteLeave (to, form, next) {
        // 去详情页面，关锁加载更多
        if (to.name === 'doctorDetail') {
            this.$refs.loadMoreE.isLock = false
        }
        next()
    },
    components: {
        loadMore
    }
}
</script>
<style scoped lang='scss'>
@import "@/assets/css/base.scss";
.page-bg-hui{
    padding-top: 0.88rem;
}
.nav{
    top: 43px;
    ul{
        display: flex;
    }
    li{
        flex: 1;
        text-align: center;
        height: 0.45rem;
        line-height: 0.45rem;
        background: #fff;
    }
    .active{
        color: #F78335;
    }
}
.doctorList{
    li{
        display: flex;
        background: #fff;
        padding: 0.15rem;
        margin-top: 0.1rem;
    }
    .doctorPic{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 0.35rem;
        margin-right: 0.15rem;
    }
    .right{
        flex: 1;
        font-size: 0.14rem;
    }
    .right>*{
        margin: 0.05rem 0;
    }
    .name{
        font-size: 0.16rem;
        margin-top: 0;
        span{
            font-size: 0.14rem;
            color: #666;
            margin-left: 0.15rem;
        }
    }
    .location{
        color: #666;
    }
    .num{
        color: #666;
        overflow: hidden;
        span{
            color: #F78335;
        }
        p{
            float: left;
        }
        p:last-child{
            margin-left: 0.15rem;
        }
    }
    .des{
        color: #666;
        font-size: 14px;
        height: 37px;
        @include ellipsis(2);
    }
    .labels{
        overflow: hidden;
        margin-bottom: 0;
        margin-top: 0.1rem;
        div{
            width: 33.333%;
            float: left;
            text-align: left;
        }
        .label{
            width: 0.5rem;
            height: 0.25rem;
            line-height: 0.26rem;
            border-radius: 0.125rem;
            text-align: center;
            color: #F78437;
            font-size: 0.12rem;
            background: #FFDEC9;
            display: inline-block;
        }
        .label.active{
            background: #F78437;
            color: #FFDEC9;
        }
    }
}
</style>