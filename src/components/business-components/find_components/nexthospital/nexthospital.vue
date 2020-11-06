<template>
    <div class="contain">
        <div class="header">
            <div class="close-btn" style="cursor:pointer"  @click = "closefn">
                <span class="text1 jiantou">&lt;</span>
                <span class="text1 close">关闭</span>
            </div>
            <!-- <span class="text1 title">{{this.curcity}}网上庄稼医院-下级医院数据统计</span> -->
            <div class="time">
                    <Date></Date>
            </div>
        </div>
        <div class="content">
            <div class="left_title">
                <span class="text2">{{this.curcity}}网上庄稼医院-下级医院数据统计</span>
            </div>
            <table class="hospital_info">
                <tr class="hang">
                    <td class="leibie">
                        <div class="text2">庄稼医院</div>
                    </td>
                    <td class="neirong">
                        <div class="mpublic"><span class="num">{{this.mpublic}}</span>所</div>
                        <div class="isstore">其中<span class="num">{{this.isstore}}</span>所实体店</div>
                    </td>
                </tr>
                <tr class="hang">
                    <td class="leibie">专家</td>
                    <td class="neirong"><span class="num">{{this.expert}}</span>位</td>
                </tr>
                <tr class="hang">
                    <td class="leibie">会员</td>
                    <td class="neirong"><span class="num">{{this.user}}</span>个</td>
                </tr>
                <tr class="hang">
                    <td class="leibie">诊疗</td>
                    <td class="neirong"><span class="num">{{this.wenzhen}}</span>次</td>
                </tr>
                <tr class="hang">
                    <td class="leibie">
                        <div class="text2"> 测土配方</div>
                    </td>
                    <td class="neirong"><span class="num">{{this.cetu}}</span>次</td>
                </tr>
            </table>
            <div class="Visualized" v-if="this.chartxianshi !== 0">
                <div id="echartContainer" class="mychart" style="width:100%; height:500px"></div>
                <div class="table" v-if="this.curcity !== '全国'" >
                    <el-table class="el_table" 
                        :data="hospitaldata" 
                        :row-style = "rowStyle"
                        :header-cell-style ="{backgroundColor:'#091D44',borderBottom: '1px solid #1B4E79'}"
                        >
                        <el-table-column label="地区" prop="name" align='center'>    
                        </el-table-column>
                        <el-table-column label="庄稼医院" prop="num" align='center' >    
                        </el-table-column>
                        <el-table-column label="实体店医院" prop="isstore" align='center'>    
                        </el-table-column>
                        <el-table-column label="专家" prop="expert" align='center'>    
                        </el-table-column>
                        <el-table-column label="会员" prop="member" align='center'>
                        </el-table-column>
                        <el-table-column label="诊疗" prop="wenzhen" align='center'>
                        </el-table-column> 
                        <el-table-column label="测土配方" prop="cetu" align='center'>    
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var echarts = require('echarts')
import Date from "../../../ui-components/date/date"
export default {
    components:{
        Date
    },
    data(){
        return{
            chartdata:[],//柱状图总数据
            chartname:[],//柱状图x轴数据
            chartnum:[],//柱状图y轴数据
            hospitaldata: [],//
            userid:"",
            cetu:"",
            expert:"",
            isstore:"",//实体店数量
            user:"",//会员数
            wenzhen:"",//问诊数
            mpublic:"",//医院总数
            curcity:'',
            curlevel:'',
            isshow:true,
            chartxianshi:'',//控制右边的柱状图和图表是否显示
        }
    },
    created(){
        const rLoading = this.openLoading();
        this.curcity = window.sessionStorage.getItem('curcity')
        this.curlevel = window.sessionStorage.getItem('curlevel')
        this.$parent.app_loading=false
        this.userid = window.sessionStorage.getItem('curuserid')
        this.axios.all([
            this.axios.post(
                "/Home/Manage/GetManageMpAreaData",
                `appId=${this.userid}&isstore=${window.sessionStorage.getItem('isstore')}`),
            this.axios.post(
                "/Home/Manage/GetShaoxingMpData",
                `appId=${this.userid}&areaname=${this.curcity}&level=${this.curlevel}&isstore=${window.sessionStorage.getItem('isstore')}`)
            ])
        .then(this.axios.spread((res1, res2) => {
            rLoading.close()
            if(res1.data.code == "200"){
                this.chartxianshi = res1.data.data.chart.length
                this.chartdata = res1.data.data.chart
                this.chartxianshi = res1.data.data.chart.length
                this.hospitaldata = res1.data.data.lists
                for(let i=0;i<this.chartdata.length;i++){
                    if(this.chartdata[i].num !== 0 && this.curcity =='全国'){
                        this.chartname.push(this.chartdata[i].name)
                        this.chartnum.push(this.chartdata[i].num)
                    }else if(this.chartdata[i].num !== 0 && this.curlevel-0 < 4){
                        // 市县级医院要去除数量为0 的县或镇不显示
                        this.chartname.push(this.chartdata[i].name)
                        this.chartnum.push(this.chartdata[i].num)
                    }else if(this.curlevel-0 == 4){
                        // 省级医院显示所有医院
                        this.chartname.push(this.chartdata[i].name)
                        this.chartnum.push(this.chartdata[i].num)
                    }
                }
                if(this.chartname.length<16){
                    for(let j = this.chartname.length;j<14;j++){
                        this.chartname.push("")
                    }
                }
            }
            if(res2.data.code == "200"){
                this.wenzhen = res2.data.data.wenzhen
                this.user = res2.data.data.user
                this.cetu = res2.data.data.cetu
                this.isstore = res2.data.data.isstore
                this.mpublic = res2.data.data.mpublic
                this.expert = res2.data.data.expert
            }
        }))
    },
    mounted() {
        var myChart = echarts.init(document.getElementById('echartContainer'));
        const self = this
  // 绘制图表
        setInterval(() => {
            myChart.setOption({
            title: {
                text: '医院数量',
                left:'left', 
                textStyle:{
                    fontFamily: 'SimHei',
                    fontWeight:400,
                    fontSize:24,
                    color:'#FFFFFF'
                },
                padding:[20,0,0,20]  
            },
            //空值echarts的上下左右位置
            grid:{
                    x:50,
                    y:80,
                    x2:50,
                    y2:60,
                    borderWidth:10
            },
            color:["#3398DB"],
            tooltip: {},
            xAxis: {
                type: 'category',
                data: self.chartname,
                boundaryGap: true,
                axisTick: {
                    show: false,
                    // interval: 1,
                },
                axisLine: {
                    lineStyle: {
                        color: '#FF6600', // 颜色
                        width: 1, // 粗细
                    }
                },
                axisLabel:{
                    show:true,
                    interval:0,//当数据过多时候重叠显示
                    // rotate:40,
                    textStyle:{
                        fontFamily: 'SimHei',
                        fontWeight:400,
                        fontSize:14,
                        color:'#FFFFFF',
                    }
                }
            },
            yAxis: {
                show : false,
                axisLine:{
                    lineStyle:{
                        color:'#FF6600',
                        width:20,//这里是为了突出显示加上的
                    }
                } 
            },
            series: [{
                name: '医院数量',
                type: 'bar',
                barWidth : 10,//柱图宽度
                data: self.chartnum,
                barGap:'10%',
                barCategoryGap:'10%',
                itemStyle: {
                    normal: {
                        color:'#FF6600',
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                fontFamily: 'SimHei',
                                fontWeight:400,
                                fontSize:20,
                                color:'#FF6600'
                            }
                        }
                        }
                    },
                }]
            },true);
        }, 500);
    },
    methods:{
        rowStyle({row}){
            if(row){
                return{
                    backgroundColor:'#091D44',
                    color:'#FFFFFF',
                    opacity:'0.5'
                }
            }
        },
        closefn(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
// 修改el-table表格悬浮效果
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #212e3e !important;
}
//修改el-table的表格的边框样式
/deep/ .el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: transparent;
}
/deep/.el-table__row>td{
	border-bottom: 1px solid #1B4E79;
    border-left:none;
    border-right:none;
}
/deep/.el-table::before {//去掉最下面的那一条线
	height: 0px;
}
.contain
    width: 100%;
    @media screen and (max-width:1340px) 
        width:1340px
    height: 100%;
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
        .close
            position absolute
            left 45px
        .title
            margin 0 auto
            color #FFFFFF
            opacity 0.9
        .time
            position absolute
            width 130px
            font-size 14px
            right 2%
            top 2px
    .left_title
        position absolute
        top 63px
        left 83px
        .text2
            font-size 30px
            color #ffffff
            border-radius 2px
    .hospital_info
        position absolute
        left 83px
        top 135px
        width 340px
        height 499px
        background #091D44
        border 2px solid #072F65
    .hang
        height 55px
        border-bottom  2px solid #072F65
        box-sizing  border-box 
    .neirong
        font-size 24px
        color #FFFDFD
        text-align center
    .isstore
        font-size 18px
        margin-top 10px
    .num
        color #FF6600
    .leibie
        width 113px
        height 30px
        background #0C2954
        font-size 24px
        font-family SimHei
        font-weight 400
        color #FFFDFD
        line-height 24px
        .text2
            width 60px
            margin 0 auto
    .Visualized
        position absolute
        right 83px
        left 439px
        top 134px
        height 600px
        background #091D44
        border 2px solid #072F65
        overflow scroll 
        overflow-x hidden
        scrollbar-arrow-color #091D44
        scrollbar-base-color hsla(0, 0%, 53%, 0.4)
        scrollbar-track-color #091D44
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
            height 85%
            left 439px
    .mychart
        width 88%
    .el_table
        background #091D44
        border 2px solid #072F65
        width 90%
        margin 0 auto
        margin-bottom 30px

</style>