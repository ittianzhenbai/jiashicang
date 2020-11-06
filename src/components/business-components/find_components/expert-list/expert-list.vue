<template>
    <div class="contain">
        <div class="header">
            <div class="close-btn" style="cursor:pointer" @click = "closefn">
                <span class="text1 jiantou">&lt;</span>
                <span class="text1 close">关闭</span>
            </div>
            <span class="text1 title">所有专家</span>
            <div class="time">
                <Date></Date>
            </div>
        </div>
        <a class="expert_list" target="_blank" :href="this.outlink" ref="expert_list">
            <div class="expert_info" v-for="(item,index) in expert_list" :key="index" @click="godetail(item,index)">
                <img class="photo" v-lazy="item.avatar"  alt="图片好像不见了" >
                <span class="name">{{item.realname}}</span>
                <div class="tag">专家</div>
                <div class="intro">
                    <div class="row1">
                        <span class="join_time">加入时间：{{item.jointime}}</span>
                        <p class="company">{{item.position}}</p>
                    </div>
                    <div class="row2">
                        <span class="chufang">处方({{item.chufangcount}})</span>
                        <span class="cut_line">|</span>
                        <span class="join_hospital">加入医院({{item.hospitalcount}})</span>
                        <p class="skills" v-if="item.zuowu">擅长作物：{{item.zuowu}}</p>
                    </div>
                </div>
            </div>
            <mugen-scroll :handler="loadMore" :should-handle="!loading" scroll-container="expert_list">
            </mugen-scroll>
        </a>
        <!-- <div class="loading" v-show="loading">正在加载数据......</div> -->
        <div class="expert_num">
            共{{this.total}}个结果
        </div>
        <Nodata v-if="this.total == 0"></Nodata>
    </div>
</template>
<script>
import Date from "../../../ui-components/date/date"
import Nodata from "../../../ui-components/no-data/no-data"
import MugenScroll from "vue-mugen-scroll"
export default {
    components:{
        Date,
        Nodata,
        MugenScroll//滚动条下滑加载组件
    },
    data(){
        return{
            expert_list:[],
            curuserid:"" ,//当前的用户ID
            outlink:'http://wap.114nz.com/Web/Expert/detail?Id=' ,
            total:0,
            loading:false,//加载状态
            page: 1, // 当前页数
        }
    },
    created(){
        this.$parent.app_loading=false
        this.userid = window.sessionStorage.getItem('curuserid')
        this.getexpert_list(this.page)
    },
    methods:{
        closefn(){
            this.$router.go(-1)
        },
        godetail(item,index){
            this.outlink = 'http://wap.114nz.com/Web/Expert/detail?Id=' 
            this.outlink = this.outlink+item.uid
        },
        getexpert_list(curpage){
            const rLoading = this.openLoading();
            this.axios.post(
                "/Home/Expert/GetMpExpertList",
                `appId=${this.userid}&purview=${"1"}&page=${curpage}&isstore=${window.sessionStorage.getItem('isstore')}`
            ).then(res=>{
                rLoading.close()
                if(res.data.code == "200"){
                    this.total = res.data.maxitem
                    if(this.page == 1){
                        this.expert_list = res.data.data
                    }else{
                        this.expert_list.push(...res.data.data)
                    }
                    this.loading=false
                }
            })
        },
        loadMore() {
            // 是否当前page不是最后一页
            if (this.page <= Math.ceil(this.total/12)) {
                //this.loading 控制滚动条滑到底部的时候是否执行加载操作
                this.loading = true;
                // 页码+1
                this.page++;
                this.getexpert_list(this.page)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.contain
    width: 100%;
    height: 100%;
    @media screen and (max-width:1340px) 
        width:1340px
        height 768px
    background-color: rgba(3, 5, 57, 1);
    margin 0 auto
    position relative
    .header
        position absolute
        top 15px
        width 100%
        .text1
            font-size 20px
            color #7FB5F1
            border-radius: 2px
        .jiantou
            position absolute
            left 26px
            z-index 666
        .close
            position absolute
            left 45px
            z-index 666
        .title
            margin 0 auto
            font-size 24px
            color #FFFFFF
        .time
            position absolute
            width 130px
            font-size 14px
            right  2%
            top 2px
    .expert_list
        position absolute
        width 85%
        top 63px
        bottom 75px
        left 50%
        transform translate(-50%, 0%); /* 50%为自身尺寸的一半 */
        -webkit-transform: translate(-50%, 0%);
        height 630px
        overflow scroll
        overflow-x hidden
        scrollbar-arrow-color rgba(3, 5, 57, 1)
        scrollbar-base-color hsla(0, 0%, 53%, 0.4)
        scrollbar-track-color rgba(3, 5, 57, 1)
        scrollbar-shadow-color hsla(0, 0%, 53%, 0.1)
        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 4px;
        }
        &:hover::-webkit-scrollbar-thumb {
            background: hsla(0, 0%, 53%, 0.4);
        }
        &:hover::-webkit-scrollbar-track {
            background: hsla(0, 0%, 53%, 0.1);
        }
        @media screen and (min-height:860px)
            height 84.5%
        @supports (-ms-ime-align: auto) and (min-height:860px)
            height 83.5%
        @media screen and (min-height:1080px)
            height 87.9%
        .expert_info
            position relative
            width 100%
            height 154px
            margin-bottom 5px
            border 2px solid rgba(255, 255, 255, 0.15)
            .photo
                position absolute
                height 150px
                width 150px
                top 0px
                left 0px
            .name
                margin-top 25px
                font-size 30px
                float left
                margin-left 175px
                font-family Source Han Sans CN
                font-weight 400
                color #FFFFFF
            .tag
                display inline-block
                margin-top 24px
                margin-left 10px
                float left
                width 60px
                height 35px
                background: #FF6600
                border-radius 16px
                font-size 20px
                font-family SimHei
                font-weight 400
                color #FFFFFF
                line-height 35px
            .intro
                position absolute
                width 1084px
                height 55px
                top 75px
                left 171px
                font-size 20px
                font-family SimHei
                font-weight 400
                line-height 28px
                .row1
                    position absolute
                    top 0
                    left 0
                    color #808080
                    .join_time
                        vertical-align top
                    .company
                        display inline-block
                        margin-left 52px
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                .row2
                    position absolute
                    bottom 0px
                    color #FFFFFF 
                    .cut_line
                        width 1px
                        height 18px        
                        opacity 0.3
                    .join_hospital
                        margin-left 5px
                    .skills
                        display inline-block
                        text-align left
                        vertical-align top
                        margin-left 55px
                        overflow hidden
                        width 800px
                        text-overflow ellipsis
                        white-space nowrap
    .expert_num
        position absolute
        bottom 17px
        left 7.5%
        font-size 16px
        font-family Source Han Sans CN
        font-weight 500
        color #7FB5F1
    
</style>