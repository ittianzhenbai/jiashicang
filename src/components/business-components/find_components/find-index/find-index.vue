<template>
    <div class="contain">
        <div class="next-hospital-data" @click = "tonexthospital">
            <span class="text1" >下级医院数据</span>
        </div>
        <div class="hospital-sort" @click="tohospitalsort">
            <span class="text1" >医院综合排序</span>
        </div>
        <div class="expert" @click="toexpertlist">
            <span class="text1"  >专家</span>
        </div>
          <div class="expert-net-sort" v-if="shaoxingprivate == true" @click="toexpertranking">
            <span class="text1" >专家网诊榜</span>
        </div>
        <div class="score" v-if="shaoxingprivate == true" @click="todiscussscore">
            <span class="text1" >评分</span>
        </div>
        <div class="shaoxing-serve" v-if="shaoxingprivate == true">
            <div class="text2" >{{this.title}}</div>
            <img class="sao-ma" :src="this.imgurl" alt="站点正在维护升级中，请稍后！"/>
        </div>
        <div class="bottom-text">{{cur_cityname}}</div>
    </div>
</template>
<script>
export default {
    'name':'Find',
    data(){
        return{
           shaoxingprivate:false,
           curcity:window.sessionStorage.getItem('curcity'),
           imgurl:"",
           title:"",
           cur_cityname:window.sessionStorage.getItem('name'),
           tmp_alert_satus:''
        }
    },
    created(){
    //    let curcity = window.sessionStorage.getItem('curcity')
    //    let shaoxingnextbvious = JSON.parse(window.sessionStorage.getItem('shaoxingnextbvious'))//获取绍兴管理员下属的院级信息
    //    for(var i = 0;i<shaoxingnextbvious.length;i++){
    //        if(shaoxingnextbvious[i].name == curcity){
    //            this.shaoxingprivate = true
    //        }
    //    }
    //    if(curcity == "绍兴市"){
    //        this.shaoxingprivate = true
    //    }
        let isshaoxing = window.sessionStorage.getItem('isshaoxing')
        if(isshaoxing == 1){
            this.shaoxingprivate = true
        }
       //获取绍兴市为民服务平台的二维码
       this.axios.get(
           "/Admin/Api/get_qr_code"
       ).then(res=>{
            this.imgurl = res.data.data.qrcode
            this.title = res.data.data.title
       })
   },
   methods:{
       tonexthospital(){
           this.$router.push({
                'path':'/nexthospital'
            })
       },
       tohospitalsort(){
           this.$router.push({
               'path':'/hospitalsort'
           })
       },
       toexpertlist(){
           this.$router.push({
               'path':'/expertlist'
           })
       },
       toexpertranking(){
           this.$router.push({
               'path':'/expertranking'
           })
       },
       todiscussscore(){
           this.$router.push({
               'path':'/discussscore'
           })
       }
   }
}
</script>
<style lang="stylus" scoped>
.contain
    height 720px
    width 100%
    position relative
    .next-hospital-data,.expert-net-sort
        position absolute
        left 91px
        top 104px
        width: 502px
        height: 230px
        background: #2393DD
    .expert-net-sort
        top 346px
        background: #01D9AD
    .text1
        line-height 230px
        text-align center         
        font-size 36px;
        font-family SimHei
        font-weight 400
        color #FFFFFF
        cursor default
    .hospital-sort,.score
        position absolute
        right 419px
        top 104px
        width: 320px
        height: 230px
        background: #D93165
    .score
        top 346px;
        background: #FF6500
    .expert,.shaoxing-serve
        position absolute
        right 92px
        width: 320px;
        height: 230px;
        top 104px
        background #7B6FF9
    .shaoxing-serve
        top 346px
        background #EBB701
        .text2
            width: 108px;
            height: 121px;
            margin-left 23px
            margin-top 49px
            font-size 36px
            font-family SimHei
            font-weight 400
            color #FFFFFF
            cursor default
        .sao-ma
            position absolute
            left 138px
            top 27px
            width 165px
            height 165px
            background #FFFFFF
    .bottom-text
        position absolute
        bottom 18px
        left 564px
        font-size: 24px;
        font-family Source Han Sans CN;
        color #FFFFFF
</style>