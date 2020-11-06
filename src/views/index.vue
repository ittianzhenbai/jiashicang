<template>
  <div>
    <div
      class="container"
      v-if="loading !== false"
    >
      <div class="content">
        <div class="index" style="cursor:pointer" @click="toindex">
          <div :class='[this.changemoudle == "index" ? "index-icon" :"index-icon index-icon1"]' ></div>
          <span :class='[this.changemoudle == "index" ? "index-text" :"index-text index-text1"]' >首页</span>
        </div>
        <div class="find"  style="cursor:pointer" @click="tofind">
          <div :class='[this.changemoudle == "find" ? "find-icon" :"find-icon find-icon1"]' ></div>
          <span :class='[this.changemoudle == "find" ? "find-text" :"find-text find-text1"]' >发现</span>
        </div>
        <div class="logo">
          <span class="h5">新型庄稼医院管理驾驶舱</span>
        </div>
        <div class="change-data">
          <div class="change-icon"></div>
          <div class="change-box">
            <div class="title">
              <span
                class="p1 active"
              >医院数据源切换</span>
              <span class="p2"
              >{{cur_cityname}}</span>
            </div>
            <div class="choose">
              <div
                class="item"
                @click="chooseHospital('null')"
              >
                <div
                  class="radio"
                  :class="{active:chooseHospitalRadio == 'null' || chooseHospitalRadio == 2}"
                ></div>
                <span :class="{active:chooseHospitalRadio == 'null' || chooseHospitalRadio == 2}">显示所有医院</span>
              </div>
              <div class="item" @click="chooseHospital(1)">
                <div class="radio" :class="{active:chooseHospitalRadio == 1}"></div>
                <span :class="{active:chooseHospitalRadio == 1}">仅显示新型</span>
              </div>
            </div>
            <div class="login-out" @click="loignOutBtn" >退出登录</div>
          </div>
        </div>
        <div
          class="icon-refresh"
          @click="refresh"
        ></div>
        <div class="time"><Date/></div>
        <div v-if="this.changemoudle == 'index'">
          <div class="nav">
          <Navs
            v-bind:PercentArray="navHospitalArray"
            v-bind:activeProvince='activeProvince'
            v-bind:activeCity='activeCity'
            v-on:getName="getNavData"
            @out="loignOutBtn"
          ></Navs>
        </div>
          <div class="country-hospital">
            <Box>
              <CountryHospital
                v-bind:PercentArray=PercentArray
                :title="countryTitle"
              >
              </CountryHospital>
            </Box>
          </div>
          <div class="privent-hospital">
            <Box v-bind:showTitle=false>
              <PriventHospital
                :cityName="secondQuestName"
                :cityMap="letter"
                :proMapData="CurMpArray"
                @clickMapForData="getNavData"
              >
                <PriventHead
                  :Mpubcount=Mpubcount
                  :Usercount=Usercount
                  :Expertcount=Expertcount
                  :Servicecount=Servicecount
                  :Questioncount=Questioncount
                  :Recipecount=Recipecount
                  :Productamount="Productamount"
                ></PriventHead>
              </PriventHospital>
            </Box>
          </div>
            <div class="newest-online">
              <div class="newest-top">
                <Box v-bind:title=newDiDiagnosis>
                  <div class="newest-online-wrap first-wrap">
                    <NewestOnline :Replydata=Replydata></NewestOnline>
                  </div>
                </Box>
              </div>
              <div class="yinongtong">
                <Box
                  v-bind:title=title
                  v-bind:showTitle=false
                >
                  <div class="newest-online-wrap">
                    <YiNongTong
                      :isvideo="isvideo"
                      @openvideo="getshowflag"
                    >
                    </YiNongTong>
                  </div>
                </Box>
              </div>
            </div>
            <div class="swiper-hospital first-swiper">
              <Box v-bind:title=title>
                <SwiperHospital
                  :Mplocaldata="FineMpdata"
                  :selfUrl="'UserCenter/DataV/getHospitallist.html'"
                  :selfDetailUrl="'Web/Mpublic/detail.html?mId='"
                ></SwiperHospital>
              </Box>
            </div>
            <div class="swiper-hospital">
              <Box v-bind:title=title>
                <SwiperBase
                  :Mplocaldata="FineBasedata"
                  :selfUrl="'/UserCenter/DataV/getGoodBaselist.html'"
                  :selfDetailUrl="'Web/Company/detail?id='"
                ></SwiperBase>
              </Box>
            </div>
            <div class="ranking-list">
              <Box>
                <RankingList v-bind:afterExpphdata=Expphdata></RankingList>
              </Box>
            </div>
            <div class="ranking-list">
              <Box>
                <vipList
                  v-bind:colors=false
                  v-bind:Memberdata=Memberdata
                ></vipList>
              </Box>
          </div>
        </div>
        <div v-if="this.changemoudle =='find'">
          <Find></Find>
        </div>
      </div>
      <Confim
        ref="confimBox"
        @btnSure="clickSure"
        :alertText="'注销'+cur_cityname+'账号后，将退出监控平台'"
      ></Confim>
      <transition name="fade">
        <AlertTip ref="tips"></AlertTip>
      </transition>
      <div v-if="this.showvideoflag == 1" class="video-wrap">
        <div class="close-btn" style="cursor:pointer" @click="closealert">
            <span class="text1 jiantou">&lt;</span>
            <span class="text1 close">关闭</span>
        </div>
        <div class="liubai"></div>
        <video class="video" ref="video" autoplay="true" preload="auto" controls :src="this.isvideo.video_url"></video>
      </div>
    </div>
  </div>
</template>
<script>
import CountryHospital from "../components/business-components/country-hospital/country-hospital";
import PriventHospital from "../components/business-components/privent-hospital/privent-hospital";
import PriventHead from "../components/business-components/privent-head/privent-head";
import NewestOnline from "../components/business-components/newest-online/newest-online";
import SwiperBase from "../components/business-components/swiper-base/swiper-base"
import SwiperHospital from "../components/business-components/swiper-hospital/swiper-hospital"
import Navs from "../components/business-components/navs/navs"
const YiNongTong = resolve=>require(["../components/business-components/yinongtong/yinongtong"],resolve)
const RankingList = resolve=>require(["../components/business-components/ranking-list/ranking-list"],resolve)
const vipList = resolve=>require(["../components/business-components/vip-list/vip-list"],resolve)
const Box = resolve=>require(["../components/ui-components/box/box"],resolve)
const Confim = resolve=>require(["../components/ui-components/confim/confim"],resolve)
const AlertTip = resolve=>require(["../components/ui-components/alertTip/alertTip"],resolve)
const Find = resolve=>require(["../components/business-components/find_components/find-index/find-index"],resolve)
const Date = resolve=>require(["../components/ui-components/date/date"],resolve)
import { mapMutations, mapState } from "vuex";

export default {
  name: "index",
  data() {
    return {
      date: "",
      loading: false,
      newDiDiagnosis: "最新诊疗",
      expertRank: "专家排行榜",
      joinVip: "最新加入的会员",
      navList: [],
      title: "",
      userid: 54435,
      areaname: "杭州市",
      level: 3,
      indexData: {},
      letter: "",
      secondLevel: "", //右边地图数据的地址等级
      activeProvince: "", //默认选中的省 浙江
      activeCity: "", // 默认选中的城市  台州
      PercentArray: [],
      CurMpArray: [], //地图数据-数组
      Mpubcount: 0,
      Usercount: 0,
      Expertcount: 0,
      Servicecount: 0,
      Questioncount: 0,
      Recipecount: 0,
      Productamount: 0,
      Replydata: [],
      FineMpdata: [],
      Mplocaldata: [],
      FineBasedata: [],
      Expphdata: [],
      Memberdata: [],
      isvideo:{},//判断数据是否为空，控制益农通不同效果
      navHospitalArray: [], //导航----县乡镇医院数组
      confimFlag: false,
      chooseHospitalRadio: "null",
      changemoudle : 'index',
      cur_cityname:window.sessionStorage.getItem('name'),
      showvideoflag:false,//控制益农通视频点播
    };
  },
  methods: {
    tofind(){
      this.changemoudle ='find'
      window.sessionStorage.setItem("cur_status","find")
      this.$nextTick(()=>{
        this.$refs.tips.aletiTipShow = false;
      })
    },
    toindex(){
      this.changemoudle = 'index'
      window.sessionStorage.setItem("cur_status","index")
      if(this.$store.state.noData == true){
        this.$nextTick(()=>{ this.$refs.tips.aletiTipShow = true;})
      }else{
        this.$nextTick(()=>{ this.$refs.tips.aletiTipShow = false;})
      }
    },
    //控制益农通视频播放
    getshowflag(msg){
      // 益农通传递参数表示当前有视频资源
      this.showvideoflag = msg
    },
    closealert(){
      // 关闭益农通播放视频弹窗
      this.showvideoflag = false
    },
    chooseHospital(num) {
      //选择所有/或者新型医院
      if (num == this.isstore) {
        return;
      }
      this.chooseHospitalRadio = num;
      if (num == 1) {
        this.getIsstore(1);
      } else {
        this.getIsstore(null);
      }
    },
    refresh() {
        location.reload();
    },
    loignOutBtn() {
      // 退出登陆按钮
      this.$refs.confimBox.showFlag = true;
    },
    clickSure() {
      this.$router.go(-1);
    },
    ...mapMutations([
      "getGlobalLevel",
      "getDefaultProvince",
      "getDefaultAddressArr",
      "getNoData",
      "getBreadArr",
      "getIsnav",
      "getIsstore"
    ]),
    getData(id, name, level, isClick) {
    if (isClick & (isClick != 0)) {
        const rLoading = this.openLoading();
        this.axios
          .post(
            "/Home/NationwideDatav/GetDataVindex",
            `userid=${id}&areaname=${name}&level=${level}&isstore=${this.isstore}`
          )
          .then(res => {
            // this.FineMpdata = [];
              this.$parent.app_loading = false
              rLoading.close();
            if (res.data.code == 200) {
              this.isvideo = res.data.data.Video //益农通是否存在视频案例，得到的是一个包含视频资源的对象
              this.$parent.app_loading = false
              this.loading = true;
              this.indexData = res.data.data;
              this.PercentArray = this.indexData.PercentArray;
              this.CurMpArray = res.data.data.CurMpArray;//三级地址数组
              this.Mpubcount = this.indexData.Mpubcount;
              this.Usercount = this.indexData.Usercount;
              this.Expertcount = this.indexData.Expertcount;
              this.Servicecount = this.indexData.Servicecount;
              this.Questioncount = this.indexData.Questioncount;
              this.Recipecount = this.indexData.Recipecount;
              this.Productamount = this.indexData.Productamount;
              this.Replydata = this.indexData.Replydata;
              this.FineMpdata = this.indexData.FineMpdata;
              this.Mplocaldata = this.indexData.Mplocaldata;
              this.FineBasedata = this.indexData.FineBasedata;
              this.Expphdata = this.indexData.Expphdata;
              this.Memberdata = this.indexData.Memberdata;
              this.navHospitalArray = this.indexData.AreaMpArray;
              this.getBreadArr(res.data.nav);
              this.getNoData(false);
            } else if (res.data.code == 203) {
              this.getBreadArr(res.data.nav);
              this.getNoData(true);
              this.$refs.tips.aletiTipShow = true;
              this.loading = true;
            }
          });
      }
    },
    getNavData(obj) {
      //重新写入store的一级地址和等级
      //然后发送请求
      this.$refs.tips.aletiTipShow = false;
      this.getData(this.userid, obj.name, obj.level, obj.isClick);
      this.getGlobalLevel(obj.level); // 获取点击的地址等级
      this.getDefaultProvince(obj.name);
      this.getIsnav(1);
      if (obj.level > 2) {
        this.letter = obj.letter;
      }
    }
  },
  computed: {
    ...mapState(["isstore","accountName"]),
    accountName() {
      return this.$store.state.accountName;
    },
    firstQuestName() {
      //一级请求地址
      return this.$store.state.defaultProvince;
    },
    firstQuestLevel() {
      //一级请求等级
      return this.$store.state.globalLevel;
    },
    secondQuestName() {
      //二级方块请求地址
      return this.$store.state.defaultCity;
    },
    secondQuestElevel() {
      //二级方块请求地址等级
      return this.$store.state.secondGlobalLevel;
    },
    countryTitle() {
      return `${this.firstQuestName}建院情况`;
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    // console.log('from',from)
    // console.log('to',to)
    if(from.name == "Nexthospital"||from.name == "Expertlist"||from.path=="/hospitalsort"||from.path == "/discussscore"||from.path=="/expertranking"){
      next(vm=>{vm.changemoudle = 'find'})
    }else if(from.path == "/defaultsort"||from.path == "/multiplesort"||from.path=="/selectsort"||from.path=="/discussscore"){
      next(vm=>{vm.changemoudle = 'find'})
    }else if(from.path == "/"){
      next(vm=>{vm.changemoudle = 'index'})
    }
  },
  created() {
  //   let arr = this.$store.state.defaultAddressArr;
  //   this.getDefaultAddressArr(arr);
        let cur_status = window.sessionStorage.getItem("cur_status")
        if(!cur_status){
          this.changemoudle ="index"
        }else{
          this.changemoudle = window.sessionStorage.getItem("cur_status")
        }
  },
  mounted() {
    this.userid = this.$route.query.userid;
    this.letter = this.$route.query.letter;
    this.navList = this.$store.state.defaultAddressArr; // 导航的省市乡县列表
    this.getData(this.userid, this.firstQuestName, this.firstQuestLevel, 1);
    this.chooseHospitalRadio = this.isstore || "null";
  },
  components: {
    Find,
    Navs,
    CountryHospital,
    Box,
    PriventHospital,
    NewestOnline,
    YiNongTong,
    SwiperHospital,
    RankingList,
    PriventHead,
    vipList,
    Confim,
    AlertTip,
    SwiperBase,
    Date
    // Loadings
  },
  watch: {
    isstore(newVal) {
      this.$router.go(0);
      // console.log("1 :>> ", 1);
    },
    changemoudle(newVal,oldVal){
      if(oldVal == 'find'){
        // console.log(this.userid, this.firstQuestName, this.firstQuestLevel, 1)
        this.navList = this.$store.state.defaultAddressArr
        this.getData(this.userid, this.firstQuestName, this.firstQuestLevel, 1);
      }
    }
  },
  beforeDestroyed(){
    console.log('1 :>> ', 1);
  }
};
</script>
<style lang="stylus" scoped>
bg-image($url) 
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) 
        background-image: url($url + "@2x.png")
.container
  width 100%
  height 100%
  background-color #080f3e
  position relative
  z-index 222
  .content
    width 1340px
    height calc(100vh)
    margin 0 auto
    position relative
    padding-top 50px
    background url('./index-bj.jpg') no-repeat
    .index,.find
      position absolute 
      top 15px
      font-size 13px
      color #ffffff
    .index
      left 20px
      padding-top 1px
      width 60px
      z-index 999
      .index-icon
        height 18px
        width 20px
        background url('./index-white-icon.png') no-repeat
        background-size 100%
        bg-image('./index-white-icon') 
      .index-icon1
        background url('./index-icon1.png') no-repeat
        bg-image('./index-icon1') 
        background-size 20px 18px
      .index-text
        position absolute
        left 25px
        top 6px
      .index-text1
        color #7FB5F1
    .find
      left 100px
      width 53px
      top 15px
      border 1px solid transparent
      z-index 666
      .find-icon
        height 20px
        width 20px
        background url('./find-icon1.png') no-repeat
        background-size 100%
        bg-image('./find-icon1')
      .find-icon1
        background url('./find-icon.png') no-repeat
        bg-image('./find-icon')
        background-size 20px 20px
      .find-text
        position absolute
        right 0px
        top 5px
      .find-text1
        color #7FB5F1
    .logo
      position absolute
      left 0
      right 0
      top 15px
      .h5
        font-size 24px
        font-family SourceHanSansCN-Medium
        font-weight 500
        color #FFFFFF
      .h6
        font-size 17px
        font-family ArialMT
        font-weight 400
        color rgba(255, 255, 255, 1)
    .time
      position absolute
      top 11px
      right 20px
      font-size 14px
      font-family ArialMT
      font-weight 400
      color rgba(127, 181, 241, 1)
    .change-data
      position absolute
      top 0px
      right 175px
      height 30px
      &:hover .change-box
        display block
      .change-icon
        width 20px
        height 18px
        margin-top 18px
        background url('./setting-icon.png') no-repeat
        background-size 100%
        bg-image('./setting-icon')
        cursor pointer
        &:hover .change-box
          display block
      .change-box
        position absolute
        right 0
        top 36px
        width 355px
        height 200px
        background #05113D
        z-index 9999999999
        border 1px solid #1B4E79
        display none
        .title
          padding 30px 0px 20px 20px
          font-size 14px
          font-family Microsoft YaHei
          font-weight 400
          color rgba(127, 181, 241, 1)
          text-align left
          & > span
            display inline-block
            width 50%
            user-select none
            &.active
              font-weight bold
              font-size 18px
        .choose
          margin-top 20px
          padding 0 20px
          & > .item
            display inline-block
            width 50%
            color #fff
            font-size 16px
            text-align left
            cursor pointer
            .radio
              width 22px
              height 22px
              background url('./radio.png') no-repeat
              margin-right 10px
              display inline-block
              vertical-align middle
              &.active
                background url('./checked-radio.png') no-repeat
                color #F79D1D
            & > span
              display inline-block
              vertical-align middle
              &.active 
                color #F79D1D
        .login-out
          position absolute
          left 0
          right 0
          bottom 0
          height 50px
          border-top 1px solid #1B4E79
          text-align center
          font-size 16px
          line-height 50px
          color #fff
          cursor pointer
          user-select none
    .icon-refresh
      width 20px
      height 20px
      background url('./refresh.png') no-repeat
      background-size 100%
      position absolute
      top 17px
      right 229px
      cursor pointer
      z-index 9999
  .country-hospital
    width 315px
    height 430px
    float left
    margin-bottom 10px
    margin-right 9px
    margin-left 25px
    margin-top 14px
    background: #00002D;
    border: 1px solid #1B4E79;
  .privent-hospital
    width 640px
    height 430px
    background: #00002D;
    border: 1px solid #1B4E79;
    float left
    margin-bottom 10px
    margin-right 9px
    margin-top 14px
  .newest-online
    width 315px
    height 270px
    float left
    margin-bottom 10px
    margin-top 14px
  .first-wrap
    width 315px
    height 270px
    .newest-top
      height 270px
  .yinongtong
    margin-top 9px !important
    height 150px
  .swiper-hospital
    width 315px
    height 215px
    float left
    margin-right 9px
    background: #00002D;
    border: 1px solid #1B4E79;
    // opacity: 0.6;
  .first-swiper
    margin-left 25px
  .ranking-list
    width 315px
    height 215px
    float left
    background: #00002D;
    border: 1px solid #1B4E79;
    // opacity: 0.6;
    margin-right 9px
    &:last-child
      margin-right 0
  .video-wrap
    width 100%
    height 100%
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background rgb(0, 0, 45)
    z-index 11119999999
    .close-btn
      padding-top 15px
      .text1
          font-size 20px
          color #7FB5F1
          border-radius: 2px
      .jiantou
          position absolute
          left 25px
      .close
          position absolute
          left 45px
    .liubai
        padding-bottom 50px
    .video
        outline none
        width 80%
</style>