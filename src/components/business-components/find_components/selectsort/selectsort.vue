<template>
    <div class="contain">
        <div class="sel_city" ref="sel_city">
            <div :class='[index == 0 ? "kuang cities cities1":"kuang cities"]' ref="cur_city" v-for="(item,index) in areadata" :key="index" @click="sel_city(item,index)">{{item.name}}</div>
        </div>
        <div class="sel_type" >
            <div class="kuang type" ref="cur_type" v-for="(item,index) in typelist" :key="index" @click="sel_type(item,index)">{{item}}</div>
        </div>
        <div class="hospitalinfo" ref="hospitalinfo">
            <div  @click="godetail(item)" :class='[item.isstore == 0 ? "singlehospital":"singlehospital singlehospital1"]' v-for="(item,index) in hospitalinfo" :key="index" >
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
            共{{this.total}}个结果
        </div>
        <div class="temporary" v-if="this.total == 0">
            暂无符合条件的医院，敬请关注！
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // citylist:[],
            typelist:['全部','网店','实体店'],
            areadata:[],//获取到的城市的信息和对应城市的id
            cur_city:"",//当前选择的省市或者市区 县区
            cur_type:"",//当前选择的网站类型
            userid:"",
            hospitalinfo:[],//获取的医院信息
            total:null,
            outlink:"",//点击每个医院跳转到外部链接
            message:'',
            citynum:'',
            wangdian:false,//当为1的时候表示是当前是选择了只是新院
        }
    },
    created(){
        this.$parent.cur_index = 3
        this.userid = window.sessionStorage.getItem('curuserid')
        const rLoading = this.openLoading();//加载动画
        //刚开始默认获取全部的信息
        this.axios.post(
            "/Home/Manage/GetManageMpDataList",
            `appId=${this.userid}&type=${"default"}&ordertag=${"default"}&storetag=${window.sessionStorage.getItem('isstore')}&areatag=${this.cur_city}`
        ).then(res=>{
            if(res.data.code == "200"&&res.data.message == "请求成功"){
                this.hospitalinfo = res.data.data.lists
                this.areadata = res.data.data.areadata
                this.$refs.hospitalinfo.style.height = `${this.getheight(70,0.025,0.03)}px`
                this.total = res.data.data.lists.length - 0
                rLoading.close()
            }else if(res.data.message =="暂无符合条件的医院"){
                rLoading.close()
                this.total = 0
                this.hospitalinfo = res.data.data.lists
            }
        })
    },
    mounted(){
        if(window.sessionStorage.getItem('isstore')== null || window.sessionStorage.getItem('isstore')== 'null'){
            this.$refs.cur_type[0].className = "kuang type type1"
            this.cur_type = ""
        }else{
            this.$refs.cur_type[2].className = "kuang type type1"
            this.cur_type = '1'
        }  
    },
    methods:{
         //内容高度自适应,获取滚动区域高度
         getheight(top,bottomrate,leftrate){
             var h = document.documentElement.clientHeight || document.body.clientHeight
             var w = document.documentElement.clientWidth || document.body.clientWidth
            //  城市要显示几行
            //1.先计算出一行可以显示多少数据,采取向下取整的方法
             var colomus = Math.floor((w-w*leftrate)/102)
            //2.计算可以显示几行,取值要向上取整
             var rows = Math.ceil(this.areadata.length/colomus)
            //3.最后得出滚动区域高度
            return h-top-50*(rows+1)-h*bottomrate-40
         },
        //网络请求封装
        sousuo(userid,cur_type,cur_city){
            this.axios.post(
                "/Home/Manage/GetManageMpDataList",
                `appId=${userid}&type=${"default"}&ordertag=${"default"}&storetag=${cur_type}&areatag=${cur_city}`
            ).then(res=>{
                if(res.data.code == "200"&&res.data.message == "请求成功"){
                    this.hospitalinfo = res.data.data.lists
                    this.total = res.data.data.lists.length - 0
                    this.openLoading().close()
                }else if(res.data.message =="暂无符合条件的医院"){
                    this.total = 0
                    this.hospitalinfo = res.data.data.lists
                    this.openLoading().close()
                }
            })
        },
        sel_city(item,index) {
            this.cur_city = item.name
            this.$refs.cur_city[index].className = "kuang cities cities1"
            for(let i = 0;i<this.areadata.length;i++){
                if(i!== index){
                    this.$refs.cur_city[i].className = "kuang cities"
                }
            }
            if(window.sessionStorage.getItem('isstore') == '1' || window.sessionStorage.getItem('isstore') == 1){
                if(this.wangdian == true){
                    this.total = 0
                    this.hospitalinfo =""
                }else{
                    this.openLoading()
                    this.sousuo(this.userid,this.cur_type,this.cur_city)
                }
            }else{
                this.openLoading()
                this.sousuo(this.userid,this.cur_type,this.cur_city)
            }
        },
        sel_type(item,index) {
            this.$refs.cur_type[index].className = "kuang type type1"
            for(let i = 0;i<this.typelist.length;i++){
                if(i!== index){
                    this.$refs.cur_type[i].className = "kuang type"
                }
            }
            //做判断是因为要根据选择的医院类型 进行request
            if(window.sessionStorage.getItem('isstore')== null || window.sessionStorage.getItem('isstore')== 'null'){
                if(item == "全部"){
                    this.cur_type = ''
                }else if(item == "网店"){
                    this.cur_type = "0"
                }else if(item == "实体店"){
                    this.cur_type = "1"
                }
                this.openLoading()
                this.sousuo(this.userid,this.cur_type,this.cur_city)
            }
            if(window.sessionStorage.getItem('isstore') == '1' || window.sessionStorage.getItem('isstore') == 1 ){
                if(item == "全部"){
                    this.cur_type = "1"
                    this.wangdian = false
                    this.openLoading()
                    this.sousuo(this.userid,this.cur_type,this.cur_city)
                }else if(item == "网店"){
                    this.cur_type = "0"
                    this.wangdian = true
                    this.total = 0
                    this.hospitalinfo = ''
                }else if(item == "实体店"){
                    this.wangdian = false
                    this.cur_type = "1"
                    this.openLoading()
                    this.sousuo(this.userid,this.cur_type,this.cur_city)
                }
            }
        },
        godetail(item){
            window.open("http://wap.114nz.com/Web/Mpublic/detail?mId=" + item.appid)
        }
    }
}
</script>
<style lang="stylus" scoped>
.contain
    position relative
    top 70px
    .kuang
        width 90px
        height 40px
        border 1px solid #ffffff
        color #FFFFFF
        font-size 20px
        font-family SimHei
        font-weight 400
        line-height 40px
    .sel_city
        padding-left 3%
        .cities
            float left
            color #B5B5B5
            margin-right 12px
            border 1px solid #1C395D
            margin-bottom 10px
        .cities1
            border 1px solid #ffffff
            color #FFFFFF
    .sel_type
        clear both
        padding-left 3%
        margin-top 10px
        float left
        .type
            float left
            color #B5B5B5
            border 1px solid #1C395D
            margin-right 12px
            margin-bottom 10px
        .type1
            border 1px solid #ffffff
            color #FFFFFF
    .kuang1
        border 1px solid #1C395D
        color #B5B5B5
    .hospitalinfo
        clear both
        margin-top 60px
        padding-left 3%
        border 1px solid transparent
        overflow-x hidden
        overflow scroll
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
                    margin  0 auto
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
    .temporary
        font-size 30px
        line-height 36px
        color #FFFFFF
        width 300px
        height 200px
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%); /* 50%为自身尺寸的一半 */
        -webkit-transform: translate(-50%, -50%);
</style>