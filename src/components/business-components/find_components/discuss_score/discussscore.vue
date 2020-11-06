<template>
    <div class="contain">
        <div class="header">
            <div class="close-btn" style="cursor:pointer" @click = "closefn">
                <span class="text1 jiantou">&lt;</span>
                <span class="text1 close">关闭</span>
            </div>
            <span class="text1 title">评分</span>
            <div class="time">
                <Date2></Date2>
            </div>
        </div>
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" class="ser_standard">
            <el-form-item prop="discuss_name"  class="ser_option1">
                <el-input class="input" style="background-color:#00002D;border:1px solid #1B4E79;padding-left:0px;padding-right:0px"  v-model="ruleForm.discuss_name" placeholder="评分者姓名/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="expert_name"  class="ser_option2">
                <el-input  style="background-color:#00002D;border:1px solid #1B4E79;"  v-model="ruleForm.expert_name" placeholder="搜索专家姓名/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="question"  class="ser_option3">
                <el-input style="backgroundColor:#00002D;border:1px solid #1B4E79;"  v-model="ruleForm.question" placeholder="搜索问题"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="ser_option4" >
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
            <el-button type="primary" class="search_btn" @click="submitForm('ruleForm')">搜索</el-button>
        </el-form>
          <div >
            <el-table 
            class="expert_list"
            :data="userList" 
            :row-style = "rowStyle"
            :header-cell-style ="{backgroundColor:'rgb(14,42,106)',color:'#FFFFFF',borderBottom: '1px solid #1B4E79'}"
             >
                <el-table-column label="解答">
                    <template v-slot="scope">
                        <p class="answer">{{scope.row.answer}}</p>
                        <div class="expert_name">专家：{{scope.row.expert_name}}{{scope.row.expert_mobile}}</div>
                    </template>    
                </el-table-column>
                <el-table-column label="评分" prop="name" >
                    <template v-slot="scope">
                        <div class="score">{{scope.row.score}}星</div>
                        <p class="discuss">{{scope.row.comment}}</p>
                        <div class="discuss_name">{{scope.row.user_name}}{{scope.row.user_mobile}}</div>
                    </template>   
                </el-table-column>
                <el-table-column label="评分时间" prop="addtime">    
                </el-table-column>
                <el-table-column label="问题">
                    <template v-slot="scope">
                        <p class="question">{{scope.row.ask}}</p>
                    </template>  
                </el-table-column>
                <el-table-column label="操作">
                <template v-slot="scope" >
                    <el-button
                        size="mini"
                        type="text"
                        class="hidden"
                        @click="handleEdit(scope.$index, scope.row)"> {{scope.row.isshow==0?'显示评分':'隐藏评分'}}</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        class="detail"
                        @click="watchdetail(scope.$index, scope.row)">详情</el-button>
                </template>
                </el-table-column>    
            </el-table>
        </div>
        <div class="page_divide">
        <!-- <span class="demonstration">大于 7 页时的效果</span> -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,5,20,30,40]" 
                :page-size="this.pagesize"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <!-- <div class="loading" v-show="loading">正在加载数据......</div> -->
        <div class="expert_num">
           共{{this.total}}条数据
        </div>
        <Confim
            ref="confimBox"
            :alertTitle="title"
            @btnSure="clickSure"
            :alertText="Text"
        ></Confim>
    </div>
</template>
<script>
import Date2 from "../../../ui-components/date/date"
import Confim from "../../../ui-components/confim/confim"
export default {
    components:{
        Date2,
        Confim
    },
    data(){
        return{
            ruleForm: {
                discuss_name: '',
                expert_name:"",
                question:"",
                startTime: '',
                endTime: '',
                delivery: false,
                type: []
            },
            rules: {
                discuss_name: [
                    {message: '请输入评论者名字', trigger: 'blur' },
                    { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' }
                ],
                expert_name: [
                    { message: '请输入专家名字', trigger: 'blur' },
                    { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' }
                ],
                question: [
                    { message: '请输入问题', trigger: 'blur' },
                ],
               startTime: [
                    { message: '请选择日期', trigger: 'change' }
                ],
                endTime: [
                    { message: '请选择日期', trigger: 'change' }
                ],
            },
            currentPage:1, //初始页
            pagesize:3,    //    每页的数据
            userList: [],
            userid:"",
            level:"",
            curcity:"",
            title:"确定隐藏评分吗？",
            total:0,
            isshow_score:"隐藏评分",
            Text:'',
            aid:'', //当前评分的ID
            isshow:'',//判断当前元素是否显示
            startDatePicker: this.beginDate(),
            endDatePicker: this.processDate(),
            alldata:0,
        }
    },
    
    created(){
        var h = document.documentElement.clientHeight || document.body.clientHeight
        let shengyu = h-168-90-60
        this.pagesize = Math.round(shengyu/160)
        if(this.pagesize == 0){
            // 防止this.pagesize计算错误为0的情况
            this.pagesize = 1
        }
        const rLoading = this.openLoading();
        this.$parent.app_loading=false
        this.curcity = window.sessionStorage.getItem('curcity')
        this.level = window.sessionStorage.getItem('level')
        this.userid = window.sessionStorage.getItem('curuserid')
        this.axios.post(
            "Admin/Api/get_appraises_list",
            `mId=${this.userid}&page=${this.currentPage}&pagesize=${this.pagesize}`
        ).then(res=>{
            if(res.data.code == 200){
                rLoading.close()
                this.userList = res.data.data.list
                this.total = res.data.data.total - 0
                this.alldata = res.data.data.total - 0
            }else if(res.data.code ==500){
                rLoading.close()
                this.userList = res.data.data.list
                this.total = 0
            }
        })
    },
    methods:{
        closefn(){
            this.$router.go(-1)
        },
        // 对专家搜索进行封装
        sousuo(userid,currentPage,pagesize,expert_name,discuss_name,question,startTime,endTime){
            this.axios.post(
                "Admin/Api/get_appraises_list",
                `mId=${userid}&page=${currentPage}&pagesize=${pagesize}&expert=${expert_name}&user=${discuss_name}&ask=${question}&startdate=${startTime}&enddate=${endTime}`
            ).then(res=>{
                if(res.data.code == 200){
                    this.openLoading().close()
                    this.userList = res.data.data.list
                    this.total = res.data.data.total - 0
                }else if(res.data.code ==500){
                    this.openLoading().close()
                    this.userList = res.data.data.list
                    this.total = 0
                }
            })
        },
        //改变表格的行样式
        rowStyle({row}){
            if(row){
                return{
                    backgroundColor:'transparent',
                    color:'#FFFFFF',
                    textAlign:'left',
                    height:'160px'
                }
            }
        },
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        // 开始时间限制
        beginDate(){
            const self = this
            // console.log(this.ruleForm.startTime)
            return {
                disabledDate:time=>{
                    if (self.ruleForm.endTime) {  //如果结束时间不为空，则小于结束时间
                        return time.getTime()>Date.now(self.ruleForm.endTime)||time.getTime()>new Date(self.ruleForm.endTime).getTime()
                    }else{
                        return time.getTime()< new Date(self.ruleForm.endTime).getTime||time.getTime()>Date.now()||time.getTime()>Date.now(self.ruleForm.endTime)
                    }
                }
            }
        },
        processDate() {
            const  self = this
            return {
                disabledDate:time=> {
                    if (self.ruleForm.startTime) {  //如果开始时间不为空，则结束时间大于开始时间
                        return time.getTime()<new Date(self.ruleForm.startTime).getTime()||time.getTime()>Date.now()||time.getTime()>Date.now(self.ruleForm.startTime)
                        console.log(beginDateVal)
                    } else{
                        return time.getTime()< new Date(self.ruleForm.startTime).getTime||time.getTime()>Date.now()||time.getTime()>Date.now(self.ruleForm.startTime) 
                    }
                }
            }
        },
        //点击第几页获取第几页的数据
        handleCurrentChange: function(currentPage){
            this.openLoading(); 
            this.currentPage = currentPage;
            if((this.ruleForm.expert_name||this.ruleForm.discuss_name||this.ruleForm.discuss_name||this.ruleForm.question||this.ruleForm.startTime||this.ruleForm.endTime)&&this.total<this.alldata){
               // 当搜索条件不为空并且点击 搜索以后请求返回的数据长度小于全部数据长度，表示进行了条件搜索，此时携带对应的参数条件进行页码跳转
                this.sousuo(this.userid,this.currentPage,this.pagesize,this.ruleForm.expert_name,this.ruleForm.discuss_name,this.ruleForm.question,this.ruleForm.startTime,this.ruleForm.endTime)
            }else{
                //在未点击搜索条件的时候进行搜索 默认是搜索全部，搜索条件置空
                this.sousuo(this.userid,this.currentPage,this.pagesize,'','','','','','')
            }
        },
        //控制评分显示或者隐藏
        handleEdit(index,item){
            this.aid = item.aid
            this.isshow = item.isshow
            if(item.isshow==1){
                this.title = "确定隐藏评分吗？"
                this.$refs.confimBox.showFlag = true;
            }else if(item.isshow == 0){
                this.title = "确定显示评分吗？"
                this.$refs.confimBox.showFlag = true
            }
        },
        //查看详情按钮
        watchdetail(index,item){
            window.open(`http://sxone.114nz.com/#/ask_detail?tid=${item.tid}&from=${"jiashicang"}`)
        },
        // 进行搜索条件的表单提交
        submitForm(formName) {
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
                    // 进行条件搜索的时候初始请求分页使用默认为1,否则可能请求不到数据
                   this.sousuo(this.userid,this.currentPage,this.pagesize,this.ruleForm.expert_name,this.ruleForm.discuss_name,this.ruleForm.question,this.ruleForm.startTime,this.ruleForm.endTime)
                } else {
                    console.log('你提交的信息有误!!');
                    this.openLoading().close()
                    return false;
                }
            });
        },
        //弹窗点击确定按钮
        clickSure() {
            this.openLoading()
            if(this.isshow==1){
                this.axios.post(
                    "Admin/Api/update_appraises",
                    `aId=${this.aid}&opt=${"hidden"}`
                ).then(res=>{
                    //修改完部分数据后 要进行重新请求当前页的数据
                    // 这里要传入全部参数进行请求 匹配当条件搜索或者全部搜索的时候
                    this.sousuo(this.userid,this.currentPage,this.pagesize,this.ruleForm.expert_name,this.ruleForm.discuss_name,this.ruleForm.question,this.ruleForm.startTime,this.ruleForm.endTime)
                })
            }else if(this.isshow==0){
                 this.axios.post(
                    "Admin/Api/update_appraises",
                    `aId=${this.aid}&opt=${"show"}`
                ).then(res=>{
                    this.sousuo(this.userid,this.currentPage,this.pagesize,this.ruleForm.expert_name,this.ruleForm.discuss_name,this.ruleForm.question,this.ruleForm.startTime,this.ruleForm.endTime)
                })
            }
      },
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
/deep/.ser_option4>.el-form-item__content{
    width 360px
    height 45px
}
@media screen and (min-width:1670px){
    /deep/.ser_option1>.el-form-item__content{
        width 260px
    }
    /deep/.ser_option2>.el-form-item__content{
        width 260px
    }
    /deep/.ser_option3>.el-form-item__content{
        width 260px
    }
}
// 日期控件前面的图标
/deep/ .el-icon-date:before{
    line-height 46px
}
//日期 文字颜色修改
/deep/ .el-form-item__label{
    color #FFFFFF
    line-height 45px
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
/deep/ .el-input__inner{
    background-color #00002D
    color #FFFFFF
    font-family Microsoft YaHei
    font-weight 400
    height 45px
}
/deep/.input,.el-input{
    border:1px solid transparent !important
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
/deep/ .el-form-item__content>button{
    position absoulte
    right 0px
}
/deep/ .el-icon-arrow-up:before{
    background #7FB5F1
}
.contain
    width 100%
    @media screen and (max-width:1340px) 
        width:1340px
    height 100%
    background-color rgba(3, 5, 57, 1)
    margin 0 auto
    position relative
    // opacity 0.6
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
            width 130px
            font-size 14px
            right  2%
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
        .ser_option1
            flex 2
            vertical-align top
            color #FFFFFF
            display flex
            justify-content flex-start
        .ser_option2
            flex 2
            @media screen and (min-width:1910px)
                flex 1
                padding-right 40px
           
        .ser_option3
           display inline-block
            flex 2
            vertical-align top
        .ser_option4
            display inline-block
            flex 4
            vertical-align top
             .line
                line-height 45px
        .search_btn
            flex 0.3
            display inline-block
            vertical-align top
            height 40px
    .expert_list
        position absolute
        top 166px
        left 50%
        transform translate(-50%, 0%); /* 50%为自身尺寸的一半 */
        -webkit-transform: translate(-50%, 0%);
        width 85%
    .page_divide
        position absolute
        right 7%
        bottom 20px
    .expert_num
        position fixed
        bottom 20px
        left 7.5%
        font-size 16px
        font-family Source Han Sans CN
        font-weight 500
        color #7FB5F1
    ::-webkit-scrollbar 
        display none
    .question,.answer,.discuss
        font-size 14px
        font-family Microsoft YaHei
        font-weight Regular
        margin-bottom 10px
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 3
        overflow hidden
        width 80%
        margin 0 auto
        text-align left
    .score
        font-size 18px
        font-family Microsoft YaHei
        font-weight Regular
        color #FFFFFF
        margin-bottom 10px
        width 80%
        margin 0 auto
        text-align left
    .discuss_name,.expert_name
        font-weight Regular
        color #B5B5B5
        width 80%
        margin 0 auto
        text-align left
    .hidden,.detail
        color #FF6600       
        font-size 14px
        font-family Microsoft YaHei
        font-weight 400
        line-height 60px
        text-align center !important
    .detail
        color #FFFFFF
</style>