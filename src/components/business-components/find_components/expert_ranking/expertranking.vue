<template>
    <div class="contain">
        <div class="header">
            <div class="close-btn" style="cursor:pointer"  @click = "closefn">
                <span class="text1 jiantou">&lt;</span>
                <span class="text1 close">关闭</span>
            </div>
            <span class="text1 title">专家网诊榜</span>
            <div class="time">
                <Date2></Date2>
            </div>
        </div>
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" class="ser_standard">
            <el-form-item prop="name"  class="ser_option1">
                <el-input class="input" style="background-color:#00002D;border:1px solid #1B4E79;"  v-model="ruleForm.name" placeholder="请输入专家姓名/手机号"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="ser_option2">
                <el-col :span="11">
                <el-form-item prop="startTime">
                    <el-date-picker class="input" type="date" placeholder="开始日期" v-model="ruleForm.startTime" style="width: 100%;"
                         :picker-options="startDatePicker"
                         value-format="yyyy-MM-dd"
                         format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-form-item prop="endTime">
                    <el-date-picker class="input" type="date" placeholder="结束日期" v-model="ruleForm.endTime" style="width: 100%;"
                        :picker-options="endDatePicker"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="排序"  prop="sorttype" class="ser_option3">
                <el-select v-model="ruleForm.sorttype" placeholder="" popper-class="select-down" 
  	                :popper-append-to-body="false">
                <el-option label="累积绍兴市诊数" value="1"></el-option>
                <el-option label="平均分" value="2"></el-option>
                <el-option label="综合评分" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" class="search_btn" @click="tosearch('ruleForm')">搜索</el-button>
        </el-form>
          <div >
            <el-table 
            class="expert_list"
            :data="userList" 
            :row-style = "rowStyle"
            ref="tabledata"
            :header-cell-style ="{backgroundColor:'rgb(14,42,106)',color:'#FFFFFF',borderBottom: '1px solid #1B4E79',fontSize:'16px',height:'40px'}"
             >
            <template slot="empty">
                <p>{{this.prompt}}</p>
            </template>
                <el-table-column label="专家姓名" prop="realname" >    
                </el-table-column>
                <el-table-column label="手机号" prop="mobile" >    
                </el-table-column>
                <el-table-column label="累积绍兴市网诊数" prop="tid_count" >    
                </el-table-column>
                <el-table-column label="评分次数" prop="score_times" >    
                </el-table-column>
                <el-table-column label="平均分数" prop="score_avg" >    
                </el-table-column>
                <el-table-column label="综合分数" prop="score_overall" >    
                </el-table-column>    
            </el-table>
        </div>
        <div class="page_divide">
        <!-- <span class="demonstration">大于 7 页时的效果</span> -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="this.pagesize"
                :page-sizes="[1,2,3,4,5]" 
                layout="prev, pager, next"
                :total="this.total">
            </el-pagination>
        </div>
        <div class="expert_num">
           共{{this.total}}条数据
        </div>
    </div>
</template>
<script>
import Date2 from "../../../ui-components/date/date"
export default {
    components:{
        Date2
    },
    data(){
        return{
            // screenwidth:document.document.body.clientWidth,
            ruleForm: {
                name: '',
                sorttype: '1',
                startTime: '',
                endTime: '',
                delivery: false,
                type: [],
            },
            rules: {
                name: [
                    { message: '请输入专家姓名或者手机号', trigger: 'blur' },
                    { min: 1, max: 11, message: '长度在 1到 11个字符', trigger: 'blur' }
                ],
                sorttype: [
                    {message: '请选择排序方式', trigger: 'change' }
                ],
                startTime: [
                    {message: '请选择日期', trigger: 'change' }
                ],
                endTime: [
                    {message: '请选择日期', trigger: 'change' }
                ],
            },
            currentPage:1, //初始页
            pagesize:8,    //    每页的数据
            userList: [],
            screenwidth:document.body.clientWidth,
            userid:"",
            level:"",
            curcity:"",
            startDatePicker: this.beginDate(),
            endDatePicker: this.processDate(),
            total:0,
            prompt: "", //进去页面先让字样为空
            alldata:0
        }
    },
    
    created(){
        this.$parent.app_loading=false
        this.curcity = window.sessionStorage.getItem('curcity')
        this.level = window.sessionStorage.getItem('level')
        this.userid = window.sessionStorage.getItem('curuserid')
    },
    beforeMount(){
        //根据屏幕高度计算出应该放多少行数据
        var h = document.documentElement.clientHeight || document.body.clientHeight
        let shengyu = h-168-90-40
        this.pagesize = Math.round(shengyu/60)
        if(this.pagesize == 0){
            this.pagesize = 1
        }
    },
    mounted(){
       const rLoading = this.openLoading();
        // 刚进入页面的时候获取所有的数据
        this.axios.post(
            "Admin/Api/get_expert_rank",
            `mId=${this.userid}&page=${this.currentPage}&pagesize=${this.pagesize}&keyword=${this.ruleForm.name}&order=${this.ruleForm.sorttype}`
        ).then(res=>{
            // console.log(res)
            if(res.data.code == 200){
                this.userList = res.data.data.list
                this.total = res.data.data.total - 0 
                this.alldata = res.data.data.total - 0 
                rLoading.close();
                if(this.userList.length === 0){
                    this.prompt = "暂无数据";
                } 
            }
        })
    },
    methods:{
        closefn(){
            this.$router.go(-1)
        },
        sousuo(userid,currentPage,pagesize,name,startTime,endTime,sorttype){
            this.axios.post(
                "Admin/Api/get_expert_rank",
                `mId=${userid}&page=${currentPage}&pagesize=${pagesize}&keyword=${name}&startdate=${startTime}&enddate=${endTime}&order=${sorttype}`
            ).then(res=>{
                if(res.data.code == 200){
                    this.openLoading().close()
                    this.userList = res.data.data.list
                }
            })
        },
        rowStyle({row}){
            if(row){
                return{
                    backgroundColor:'transparent',
                    with:"100%",
                    color:'#FFFFFF',
                    fontSize:'14px',
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: '400',
                    lineHeight: '60px',
                    height:'60px'
                }
            }
        },
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        // 选择第几页
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            this.openLoading();
            if((this.ruleForm.name||this.ruleForm.startTime||this.ruleForm.endTime)&&this.total<this.alldata){
                // 当搜索条件不为空并且点击 搜索以后请求返回的数据长度小于全部数据长度，表示进行了条件搜索，此时携带对应的参数条件进行页码跳转
                this.sousuo(this.userid,this.currentPage,this.pagesize,this.ruleForm.name,this.ruleForm.startTime,this.ruleForm.endTime,this.ruleForm.sorttype)
            }else{
                //在未点击搜索条件的时候进行搜索 默认是搜索全部，搜索条件置空,排序方式按照绍兴市累计网诊数（默认排序）
                this.sousuo(this.userid,this.currentPage,this.pagesize,'','','',1)
            }
        },
        // 开始时间限制
        beginDate(){
            const self = this
            return {
                disabledDate:time=>{
                    let endDateVal = new Date(self.ruleForm.endTime).getTime()
                    if (self.ruleForm.endTime) {  //如果结束时间不为空，则小于结束时间
                        return time.getTime()>Date.now(self.ruleForm.endTime)||time.getTime()>new Date(self.ruleForm.endTime).getTime()
                    }else{
                        return time.getTime()< new Date(self.ruleForm.endTime).getTime||time.getTime()>Date.now()||time.getTime()>Date.now(self.ruleForm.endTime)
                    }
                }
            }
        },
        // 结束时间限制
        processDate() {
            const  self = this
            return {
                disabledDate:time=> {
                    if (self.ruleForm.startTime) {  //如果开始时间不为空，则结束时间大于开始时间
                        return time.getTime()<new Date(self.ruleForm.startTime).getTime()||time.getTime()>Date.now()||time.getTime()>Date.now(self.ruleForm.startTime)
                    }else{
                        return time.getTime()< new Date(self.ruleForm.startTime).getTime||time.getTime()>Date.now()||time.getTime()>Date.now(self.ruleForm.startTime) 
                    }
                }
            }
        },
        tosearch(formName){
            this.openLoading();
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.ruleForm.startTime == null){
                        this.ruleForm.startTime =''
                    }
                    if(this.ruleForm.endTime == null){
                        this.ruleForm.endTime=''
                    }
                    this.currentPage = 1
                    this.axios.post(
                        "Admin/Api/get_expert_rank",
                        //搜索的时候要讲当前页码 置换为1 否则当点击大的页码数的时候 可能会搜不到数据 因为搜索到的数据只够放一页
                        `mId=${this.userid}&page=${this.currentPage}&pagesize=${this.pagesize}&keyword=${this.ruleForm.name}&startdate=${this.ruleForm.startTime}&enddate=${this.ruleForm.endTime}&order=${this.ruleForm.sorttype}`
                    ).then(res=>{
                        if(res.data.code == 200){
                            this.openLoading().close()
                            this.userList = res.data.data.list
                            this.total = res.data.data.total - 0
                            if(this.userList.length === 0){
                            this.prompt = "暂无数据";
                        } 
                        }
                    })
                } else {
                    console.log('你提交的信息有误!!');
                    this.openLoading().close()
                    return false;
                }
            });
            
        }
    }
}
</script>
<style lang="stylus" scoped>
//table表格中的文字居中
/deep/.el-table th > .cell {
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
}
// 修改日期输入框的宽度
/deep/.ser_option1>.el-form-item__content{
    width 280px
}
/deep/.ser_option2>.el-form-item__content{
    width 350px
}
@media screen and (min-width:1600px){
    /deep/.ser_option2>.el-form-item__content{
        width 450px
    }
}
//日期 排序文字颜色修改
/deep/ .el-form-item__label{
    color #FFFFFF
    line-height 45px
}
// 日期控件前面的图标
/deep/ .el-icon-date:before{
    line-height 46px
}
// 分别是修改分页组件的中部颜色 右边颜色 左边颜色
/deep/ .el-pager li{
    background-color transparent
    color #409EFF
}
/deep/ .el-pager li:hover{
    background-color transparent
    color #FFFFFF
}
/deep/ .el-pagination .btn-next{
    background transparent
    color #FFFFFF
}
/deep/ .el-pagination .btn-prev{
    background transparent 
    color #FFFFFF
}
/deep/.input,.el-input{
    border:1px solid transparent !important
}
/deep/ .el-pager li.active{
    color #FFFFFF
}
/deep/ .el-pagination button:disabled{
    color #7FB5F1 
}
// 修改输入框内部的颜色和文字
/deep/  .el-input__inner{
    background-color #00002D
    color #FFFFFF
    font-family Microsoft YaHei
    border 1px solid #1B4E79
    font-size 14px
    font-weight 400
    height 45px
}
// 修改el-table表格悬浮效果
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #091D44 !important;
}

//修改el-table的表格的边框样式
/deep/ .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: transparent;
}
// 去掉表格竖线
/deep/  .el-table, .el-table__expanded-cell {
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
//下拉框箭头修改
/deep/ .el-icon-arrow-up:before{
    color:#7FB5F1;
}
//下拉框悬浮效果修改
/deep/ .el-select-dropdown__item.hover,.el-select-dropdown__item:hover{
    background:#2C94F3 !important;
    color #FFFFFF
}
/deep/.select-down .el-scrollbar{
    background-color: #00002d;
    z-index 99999
    padding-bottom 20px
    text-align center
    width 200px
    padding-top 0px
    position absolute
    right 5px
    color #FFFFFF
}
/deep/ .el-select-dropdown__list{
    padding 0 0
}
/deep/ .el-select-dropdown__item.selected,.el-select-dropdown__item{
    color #FFFFFF
    padding-left 5px
}
/deep/ .el-select-dropdown__item.selected{
    font-weight normal
}
/deep/ .el-select-dropdown .el-popper .select-down{
    display none
}
 //修改总体选项的样式 最外层
  /deep/ .el-select-dropdown{
    margin: 0px;
    border:none;
    border-radius: 0px;
  }
  //修改的是下拉框选项内容上方的尖角
/deep/ .el-popper .popper__arrow, .el-popper .popper__arrow::after{
    display none
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
            font-size 24px
            color #FFFFFF
        .time
            position absolute
            width 200px
            right  20px
            top 2px
    .ser_standard
        position absolute
        width 85%
        left 50%
        transform translate(-50%, 0%); /* 50%为自身尺寸的一半 */
        -webkit-transform: translate(-50%, 0%);
        top 93px
        font-size 14px
        font-family Microsoft YaHei
        font-weight 400
        color #B5B5B5
        display flex
        justify-content space-between
        flex-direction row
        z-index 9999
        .ser_option1
            flex 2
            vertical-align top
            color #FFFFFF
            display flex
            justify-content flex-start
        .ser_option2
            flex 5
            @media screen and (min-height:768px) and (min-width:1600px)
                flex 5
                padding-left 100px
            .line
                line-height 45px
        .ser_option3
            display inline-block
            flex 3
            padding-right 30px
            vertical-align top
            @media screen and (min-height:768px) and (min-width:1670px)
                padding-right 100px
        .search_btn
            flex 0.3
            display inline-block
            vertical-align top
            height 40px
            width 60px
            @media screen and (min-height:768px) and (min-width:1670px)
                flex 0.2
    .expert_list
        position absolute
        top 169px
        left 50%
        transform translate(-50%, 0%); /* 50%为自身尺寸的一半 */
        -webkit-transform: translate(-50%, 0%);
        width 85%
        overflow-x hidden
    .page_divide
        position absolute
        right 7%
        bottom 20px
    .expert_num
        position absolute
        bottom 23px
        left 7.5%
        font-size 16px
        font-family Source Han Sans CN
        font-weight 500
        color #7FB5F1
    ::-webkit-scrollbar 
        display none
</style>