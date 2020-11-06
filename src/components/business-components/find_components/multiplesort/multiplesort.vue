<template>
    <div class="contain">
        <div class="hospitalinfo" ref="hospitalinfo">
            <div @click="godetail(item)" :class='[item.isstore == 0 ? "singlehospital":"singlehospital singlehospital1"]' v-for="(item,index) in hospitalinfo" :key="index" >
                <div class="hospitalname"><p class="hos_name">{{item.name}}</p></div>
                <div class="expert">
                    <span class="text1 expertnum">专家</span>
                    <span class="text1 num1">{{item.expert}}</span>
                </div>
                <div class="diagnose">
                    <span class="text1 net_diagnose">{{item.isstore == 1? "会员":"网诊"}}</span>
                    <span class="text1 num2">{{item.isstore == 1? item.user:item.wen}}</span>
                </div>
                <div class="chufang">
                    <span class="text1 yaofang" v-if="item.isstore == 1">处方</span>
                    <span class="text1 num3" v-if="item.isstore==1">{{item.chufang}}</span>
                </div>
            </div>
        </div>
        <div class="hospital_num">
            共{{hospitalinfo.length}}个结果
        </div>
        <div class="temporary" v-if="this.hospitalinfo.length = 0">
            暂无符合条件的医院
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            hospitalinfo:[],//获取到的医院的信息
            userid:"" ,//用户的id
        }
    },
    created(){
        const rLoading = this.openLoading();
        // 控制路由点击字体的样式
        this.$parent.cur_index = 2
        this.userid = window.sessionStorage.getItem('curuserid')
        this.axios.post(
            "/Home/Manage/GetManageMpDataList",
            `appId=${this.userid}&type=${"default"}&ordertag=${"listorder"}&storetag=${window.sessionStorage.getItem('isstore')}&areatag=${""}`
        ).then(res=>{
            if(res.data.code == "200"){
                this.hospitalinfo = res.data.data.lists
                rLoading.close();
            }
        })
    },
    mounted(){
        this.$refs.hospitalinfo.style.height = `${this.getheight(70,0.025)}px`
    },
    methods:{
        //内容高度自适应,获取滚动区域高度
         getheight(top,bottomrate){
             var h = document.documentElement.clientHeight || document.body.clientHeight
             return Math.round(h-top-h*bottomrate-30)
         },
         godetail(item){
            window.open("http://wap.114nz.com/Web/Mpublic/detail?mId=" + item.appid)
            this.axios.post(
                //ordertag代表综合排序
                "/Home/Manage/GetManageMpDataList",
                `appId=${this.userid}&type=${"default"}&ordertag=${"listorder"}&storetag=${window.sessionStorage.getItem('isstore')}&areatag=${""}`
            ).then(res=>{
                if(res.data.code == "200"){
                    this.hospitalinfo = res.data.data.lists
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.contain
    position relative
    top 70px
    .hospitalinfo
        padding-left 3%
        overflow scroll
        overflow-x hidden
        .singlehospital
            width 310px
            height 150px
            background rgb(22,82,148)
            margin-right 10px
            margin-bottom 10px
            float left
            position relative
            @media (-webkit-min-device-pixel-ratio:1) and (min-device-pixel-ratio:1) and (max-width:1920px)
                &:nth-child(4n+0)
                    margin-right 0px
            @media screen and (min-width:1640px) and (max-width:1890px)
                width 379.5px
                height 187.5px
            @media screen and (min-width:1900px) 
                width 439.5px
                height 212.5px
             .hospitalname
                text-align center
                position relative
                margin-top 24px
                height 25px
                font-size 25px
                @media screen and (min-width:1640px) and (max-width:1890px) {
                    font-size 32px
                    height 32px
                    margin-top 30px
                }
                @media screen and (min-width:1900px) {
                    font-size 35px
                    height 35px
                    margin-top 34px
                }
                font-family SimHei
                font-weight 400
                color #FFFFFF
                .hos_name
                    margin 0 auto
                    width 89%
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
            .text1
                color #CDCDCD
                font-size 20px
                font-family SimHei
                font-weight 400
                @media screen and (min-width:1640px) and (max-width:1890px) {
                    font-size 25px
                }
                @media screen and (min-width:1900px) {
                    font-size 28px
                }
            .expert
                position absolute
                top 46%
                left 17.7%
                .expertnum
                    display block
                    margin-bottom 10px
            .diagnose
                position  absolute
                top 46%
                right 43.5%
                @media screen and (min-width:1603px)
                    right 43.3%
                .net_diagnose
                    display block
                    margin-bottom 10px
            .chufang
                position absolute
                top 46%
                right 17.7%
                .yaofang
                    display block
                    margin-bottom 10px
        .singlehospital1
                background rgb(4,117,124)
    .hospital_num
        height 16px
        font-size 16px
        font-family Source Han Sans CN
        font-weight 500
        color #80B6F2
        position fixed
        left 2.8%
        bottom 2.5%
</style>