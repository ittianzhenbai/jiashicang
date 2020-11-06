<template>
    <div class="contain">
        <div class="header">
            <div class="close_btn" style="cursor:pointer" @click="toindex">
                <span class="text1 jiantou">&lt;</span>
                <span class="text1 close" >关闭</span>
            </div>
            <div class="option">
                <router-link to="/defaultsort" replace><span :class='[this.cur_index == 1 ? "text2 text3":"text2"]' @click = "changecolor1" >默认排序</span></router-link>
                <router-link to="/multiplesort" replace><span :class='[this.cur_index == 2 ? "text2 text3":"text2"]'  @click = "changecolor2" >综合排序</span></router-link>
                <router-link to="/selectsort" replace><span :class='[this.cur_index == 3 ? "text2 text3":"text2"]'  @click = "changecolor3" >筛选</span></router-link>
            </div>
            <div class="time">
                <Date></Date>
            </div>
        </div>
        <div class="content">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import Date from "../../../ui-components/date/date"
export default {
    components:{
        Date
    },
    
    data(){
        return{
             cur_index:2
        }
    },
    
    created(){
        this.$parent.app_loading=false
    },
    methods:{
        toindex(e){
            e.stopPropagation()
            this.$router.back()
        },
        changecolor1(){
            this.cur_index = 1
        },
        changecolor2(){
            this.cur_index = 2
        },
        changecolor3(){
            this.cur_index = 3
        }
    }
}
</script>
<style lang="stylus" scoped>
.contain
    width: 100%;
    height: 100%;
    @media screen and (max-width:1341px)
        width 1340px
    background-color: rgba(3, 5, 57, 1);
    margin 0 auto
    position relative
    .header
        position absolute
        top 15px
        width 100%
        .text1
            font-size 20px
            line-height 20px
            color #7FB5F1
            border-radius: 2px
        .jiantou
            position absolute
            left 26px
        .close
            position absolute
            left 45px
            z-index 666
        .title
            margin 0 auto
        .time
            position absolute
            width 130px
            font-size 14px
            right  2%
            top 2px
        .option
            margin 0 auto
            width 500px
            vertical-align middle
            position relative
            top -13px
            z-index 666
            .text2
                font-size 24px
                font-family SimHei
                font-weight 400
                color #C5C5C5
                line-height 50px
                margin-right 50px
            .text3
                color #FF6600
                padding-bottom 10px
                border-bottom 2px solid #FF6600
    ::-webkit-scrollbar 
        display none
    .content 
        -ms-overflow-style none
</style>