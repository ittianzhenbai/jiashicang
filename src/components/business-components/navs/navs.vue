<template>
  <div
    class="nav-wrap clearfix"
    v-on:mousemove="showChild"
    v-on:mouseout="hideChild"
  >
    <div class="nav-header">
      <div
        v-for="item in computedBreadArray"
        :key="item.name"
        class="bread_list"
        @click="getBreakData(item.name,item.id,item.level,item.letter,item.isclick,item.dname,item.dlevel,item.dindex)"
      >
        <span class="address-name">{{item.name}}</span>
        <span class="symbol">></span>
      </div>
    </div>
    <transition
      name="fade"
      mode="out-in"
      appear
    >
      <div
        class="nav-content clearfix"
        v-show="showFlag"
      >
        <!-- v-show="showFlag" -->
        <div class="t1 contryTitle">
          <span class="first-bar">全国</span>
          <span
            v-bind:class="[
            activeProvinceComputed =='全国'
            ? 'active'
            :'',getLoginId != 5?'disabled':'']"
            v-on:click="getCountryDatas('全国', 0, 5, 'china', 1, '浙江省', 4, 0)"
          >全部医院</span></div>
        <!--  -->
        <div class="t2 choose">
          <div class="title-bar">省</div>
          <ul class="clearfix">
            <!-- <li class="active">浙江</li>
          <li class="disable">福建</li> -->
            <li
              v-for="pItem in provincial"
              :key="pItem.name"
              v-on:click="getDatas(pItem.name,pItem.id,pItem.level,pItem.letter,pItem.isclick,pItem.dname,pItem.dlevel,pItem.dindex)"
              v-bind:class="[pItem.isclick == 0 ? 'disable':''
            ,pItem.name==activeProvinceComputed
            ? 'active'
            :'']"
            >
              {{pItem.name}}
            </li>
          </ul>
        </div>
        <div class="t2 choose">
          <div class="title-bar">市</div>
          <ul class="clearfix">
            <!-- <li class="active">全部</li>
          <li class="disable">杭州</li> -->
            <li
              v-for="(activeCityArrItem) in activeCityArr"
              :key="activeCityArrItem.id"
              v-on:click="secondGetData(activeCityArrItem.name,activeCityArrItem.id,activeCityArrItem.level,activeCityArrItem.letter,activeCityArrItem.isclick,activeCityArrItem.dname,activeCityArrItem.dlevel,activeCityArrItem.realname,activeCityArrItem.reallevel,activeCityArrItem.dindex)"
              v-bind:class="[activeCityArrItem.isclick == 0 ? 'disable':''
            ,activeCityArrItem.name == activeProvinceComputed || activeCityArrItem.name == activeCity
            ? 'active'
            :'']"
            >
              {{activeCityArrItem.name}}
            </li>
          </ul>
        </div>
        <div class="t2 choose">
          <div class="title-bar">县</div>
          <ul
            class="clearfix"
            v-if="bviousArr"
          >
            <li
              v-for="bvious in bviousArr"
              :key="bvious.name"
              @click="getThressData(bvious.name,bvious.id,bvious.level,bvious.letter,bvious.isclick,bvious.dname,bvious.dlevel,bvious.dindex)"
              :class="[bvious.name==activeProvinceComputed || bvious.name == bviousActiveClass? 'active':'',bvious.isclick == 0 ? 'disable':'']"
            >{{bvious.name}}</li>
          </ul>
          <div v-else>
            该地区暂无县级
          </div>
        </div>
        <div
          class="t2 disable"
          v-for="(item,index) in villageArr"
          :key="item.name"
        >
          <div class="title-bar">{{index == 0?'乡':'村'}}</div>
          <div class="title">{{item[1].name}}<div class="number mid-number">{{item[1].value}}<span>所</span></div>
          </div>
          <div
            class="title"
            v-show="activeProvinceComputed !== '全国'"
          >{{item[0].name}}<span class="number">{{item[0].value}}</span>所</div>
        </div>
        <!-- <div class="t2 disable">
        <div class="title">{{clickAdress}}乡镇医院</div>
        <div class="number mid-number">{{PercentArray[4].nums}}<span>所</span></div>
        <div class="title">全国乡镇医院<span class="number">{{PercentArray[4].totalnums}}</span>所</div>
      </div>
      <div class="t2 disable">
        <div class="title">{{clickAdress}}村级服务点</div>
        <div class="number mid-number">{{PercentArray[5].nums}}<span>所</span></div>
        <div class="title">全国村级服务点<span class="number">{{PercentArray[5].totalnums}}</span>所</div>
      </div> -->
      </div>
    </transition>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "navs",
  data() {
    return {
      showFlag: "",
      clickAdress: "", //选中一级的地址，用于展现二级地址是什么，从一级数组里匹配
      hoverItem: "",
      // breadArr: [], //面包屑导航 ?
      secondDefaultCity: this.$store.state.defaultCity,
      secondDlevel: this.$store.state.secondGlobalLevel,
      threeClickAddress: "",
      breadAds: {}, //面包屑地址 ?
      // breadArray: this.breadArr //面包屑导航
      arrs: this.PercentArray,
      thressRootArr: [], //用来放三级县级地址的跟属性
      safeThressAddress: "" //用来暂时保存 匹配县级地址的地址
    };
  },
  props: {
    PercentArray: {
      //县乡村医院数量
      type: Array,
      default: function() {
        return [];
      }
    },
    activeProvince: {
      type: String,
      default: "浙江省"
    }
  },
  mounted() {
    // console.log(this.picAddress)
    // console.log(this.picAddress.province)
    // console.log('登陆的id:'+JSON.stringify(this.loginId))//登陆保存地图参数的id
    // console.log('导航信息：'+JSON.stringify(this.breadArr))//导航信息
    // console.log('省区'+JSON.stringify(this.provincial))
    // console.log('市区：'+JSON.stringify(this.activeCityArr))//市区
    // console.log('县区：'+JSON.stringify(this.bviousArr))//县区
    // console.log(this.defaultProvince)//默认省份
    if (this.activeProvinceComputed == "全国") {
      this.clickAdress = this.secondCityComputed;
    } else {
      this.clickAdress = this.activeProvinceComputed;
    }
    let level = this.$store.state.globalLevel;
    // let bread = this.$store.state.accountName;
    let ads = this.$store.state.defaultProvince;
    // this.activeoBviousArr();
    if(this.loginId<=3){
      this.safeThressAddress = this.defaultProvince
    }
  },
  computed: {
    villageArr() {
      return this.arrs.splice(1, 2);
    },
    ...mapState([
      "defaultProvince",//全网请求地址
      "loginId",//登陆时，保存地图参数id
      "breadArr",//面包屑导航数组
      "defaultCity",//方块二级请求地址
      "bviousName",//县级名字
      "picAddress"
    ]),
    computedBreadArray() {
      //计算后的面包屑导航
      let arr = [];
      let level = this.loginId;
      // let level = this.breadArr[this.breadArr-1].level
      this.breadArr.forEach((el, index) => {
        if (el.level <= level) {
          arr.push(el);
        }
      });
      return arr;
    },
    getLoginId() {
      // 反复刷新切换路由以后消失
      return this.$store.state.loginId;
    },
    provincial() {
      // 反复刷新切换路由以后消失
      return this.$store.state.defaultAddressArr;
    },
    globalLevel() {
      //一级地址的等级
      return this.$store.state.globalLevel;
    },
    leftActiveAddress() {
      //导航左边位置的的确
      return this.$store.state.defaultProvince;
    },
    activeProvinceComputed() {
      //选中的省
      if (this.getLoginId > 3) {
        return this.leftActiveAddress;
      } else {
        return this.$store.state.picAddress.province;
      }
    },
    bviousActiveClass() {
      if (this.getLoginId == 3) {
        return this.bviousName;
      }
      if (this.getLoginId == 2) {
        return this.defaultCity;
      }
    },
    secondCityComputed() {
      //选中的城市
      return this.$store.state.defaultCity;
    },
    activeCityArr() {
      let arr = [];
      if (this.clickAdress == "全国") {
        this.clickAdress = "浙江省";
      }
      this.provincial.forEach(item => {
        if (item.name == this.clickAdress) {
          arr = item.city;
          // console.log(item.name)
        }else if (item.name == this.breadArr[0].dname){
          // 全国账号下切换导航消失
          arr = item.city;
        }
      });
      return arr;
    },
    activeCountryThressArr() {
      let arr = [];
      // if (this.globalLevel == 2) {
      //   this.provincial.forEach(item => {
      //     if (item.name == this.secondCityComputed) {
      //       arr = item.city;
      //     }
      //   });
      // }
      this.provincial.forEach(item => {
        console.log(item.name)
        if (item.name == this.secondCityComputed) {
          arr = item.city;
          console.log(item.name)
        }
      });
      return arr;
    },
    activeCity() {
      // 指定二级导航的选中位置
      if (this.getLoginId == 3) {
        return this.$store.state.picAddress.city;
      } else if (this.getLoginId == 2) {
        return this.$store.state.picAddress.city;
      }
    },
    bviousArr() {
      //县级导航列表
      // *******
      // *******
      // *******
      // *******
      // *******
      // *******
      let arr = [];
      let arr2 = [];
      let globalLevel = this.globalLevel;
      if (globalLevel == 5) {
        this.activeCityArr.forEach(item => {
          if (item.name == "杭州市") {
            arr = item.city;
          }
        });
        return arr;
      }
      if (globalLevel == 4) {
        this.activeCityArr.forEach(item => {
          if (item.name == this.defaultCity) {
            arr = item.city;
          }
        });
        return arr;
      }
      if (globalLevel == 3) {
        this.activeCityArr.forEach(item => {
          if (item.name == this.defaultProvince) {
            arr = item.city;
          }
        });
        return arr;
      }
      if (globalLevel == 2 && this.loginId != 2) {
        this.activeCityArr.forEach(item => {
          if (item.name == this.safeThressAddress) {
            arr = item.city;
          }else if(item.name == this.breadArr[2].name){
            // 解决区级账号登录县级数据丢失问题
            arr = item.city;
          }
        });
        return arr;
      }
      if (this.loginId == 2) {
        this.activeCityArr.forEach(item => {
          if (item.name == this.picAddress.city) {
            arr = item.city;
          }
        });
        return arr;
      }
    }
  },
  methods: {
    ...mapMutations([
      "getDefaultProvince",
      "getGlobalLevel",
      "getDefaultCity",
      "getSecondGlobalLevel",
      "getSecondMapIndex",
      "getBreadArr",
      "getBviousName",
      "getBviousLevel",
      "getIsnav"
    ]),
    loginOut() {
      //推出登陆按钮
      this.$emit("out");
    },
    showChild() {
      this.showFlag = true;
    },
    hideChild() {
      this.showFlag = false;
    },
    getCountryDatas(name, id, level, letter, isClick, dname, dlevel, dindex) {
      //点击全国获取数据
      if (this.getLoginId != "5") {
        isClick = 0;
      }
      if (isClick != 0) {
        this.clickAdress = name;
        this.getDefaultProvince(name);
        this.getGlobalLevel(level);
        this.getDefaultCity(dname);
        this.getSecondGlobalLevel(dlevel);
        let obj = { id, name, level, letter, isClick };
        this.getSecondMapIndex(dindex);
        this.$emit("getName", obj);
      }
    },
    getDatas(name, id, level, letter, isClick, dname, dlevel, dindex) {
      //点击请求省级数据
      if (isClick != 0) {
        this.clickAdress = name;
        this.safeThressAddress = dname;
        this.getDefaultProvince(name);
        this.getGlobalLevel(level);
        this.getDefaultCity(dname);
        this.getSecondGlobalLevel(dlevel);
        let obj = { id, name, level, letter, isClick };
        this.getSecondMapIndex(dindex);
        this.$emit("getName", obj);
      }
    },
    getBreakData(
      name,
      id = 1,
      level,
      letter,
      isclick = 1,
      dname,
      dlevel,
      dindex
    ) {
      //点击面包屑导航
      if (this.loginId < 3) {
        isclick = 0;
        this.getDatas(name, id, level, letter, isclick, dname, dlevel, dindex);
        return false;
      }
      if (level == 2) {
        let isClick = isclick;
        this.getThressData(
          name,
          (id = 1),
          level,
          (letter = null),
          (isClick = 1),
          dname,
          dlevel,
          dindex
        );
        return;
      }
      if (level == 3) {
        let isClick = isclick;
        this.safeThressAddress = name;
        this.getDefaultProvince(name);
        this.getGlobalLevel(level);
        this.getDefaultCity(dname);
        this.getSecondGlobalLevel(dlevel);
        let obj = { id, name, level, letter, isClick };
        this.$emit("getName", obj);
        this.getSecondMapIndex(dindex);
        return false;
      }
      this.getDatas(name, id, level, letter, isclick, dname, dlevel, dindex);
    },
    getThressData(
      name,
      id = 1,
      level,
      letter = null,
      isClick,
      dname,
      dlevel,
      dindex
    ) {
      if (isClick != 0) {
        //点击县级地址的导航
        //不发送地图
        //不发送dname，dlevel,dindex
        // console.log(name, id, level, letter, isclick, dname, dlevel, dindex);
        // console.log("level :", level);
        letter = null;
        dindex = null;
        // this.getDefaultProvince(name); //请求一级地址
        // this.getGlobalLevel(level); //请求二级地址
        // this.getDefaultCity(dname); //请求二级地址
        // this.getSecondGlobalLevel(dlevel);
        this.getBviousName(name);
        this.getBviousLevel(level);
        let obj = { id, name, level, letter, isClick };
        // this.getSecondMapIndex(dindex);
        this.$emit("getName", obj);
      }
    },
    secondGetData(
      name,
      id,
      level,
      letter,
      isClick,
      dname,
      dlevel,
      realName,
      realLevel,
      dindex
    ) {
      //点击市级导航
      if (isClick != 0) {
        this.safeThressAddress = name;
        this.getDefaultProvince(name);
        this.getGlobalLevel(level);
        this.getDefaultCity(dname);
        this.getSecondGlobalLevel(dlevel);
        let obj = { id, name, level, letter, isClick };
        this.$emit("getName", obj);
        this.getSecondMapIndex(dindex);
      }
    }
  },
  watch: {
    // activeCityArr(newVal) {
    //   console.log("this.activeCityArr :", newVal);
    // },
    // bviousArr(newVal) {
    //   console.log("this.bviousArr :", newVal);
    // }
    // defaultProvince(newVal) {
    //   this.breadAds = {
    //     name: newVal,
    //     level: this.$store.state.globalLevel
    //   };
    //   let newLevel = this.$store.state.globalLevel;
    //   let oldLevel = this.breadArr[this.breadArr.length - 1].level;
    //   console.log("newLevel :", newLevel);
    //   console.log("oldLevel :", oldLevel);
    //   if (newLevel == oldLevel) {
    //     if (oldLevel.length == 0) {
    //       this.breadArr.push(this.breadAds);
    //       this.breadArr.shift();
    //     } else {
    //       this.breadArr.pop();
    //       this.breadArr.push(this.breadAds);
    //     }
    //     console.log("等于的情况", this.breadAds);
    //     console.log("this.breadArr:", this.breadArr);
    //     return;
    //   }
    //   if (newLevel < oldLevel) {
    //     if (newLevel < oldLevel - 1) {
    //       this.breadArr.push({
    //         name: this.secondDefaultCity,
    //         level: this.secondDlevel
    //       });
    //     }
    //     this.breadArr.push(this.breadAds);
    //     console.log("<的情况", this.breadAds);
    //     console.log("this.breadArr:", this.breadArr);
    //     return;
    //   }
    //   if (newLevel > oldLevel) {
    //     let i = 0;
    //     this.breadArr.forEach((item, index) => {
    //       if (newLevel == item.level) {
    //         i = index;
    //       }
    //     });
    //     let many = this.breadArr.length - i;
    //     this.breadArr.splice(i, many);
    //     this.breadArr.push(this.breadAds);
    //     console.log(">的情况", this.breadAds);
    //     console.log("this.breadArr:", this.breadArr);
    //     return;
    //   }
    // }
  }
};
</script>
<style lang="stylus" scoped>
.title-bar
  font-size 18px
  color #fff
.nav-wrap
  position relative
  top 0px
  height 40px
  background rgba(44, 148, 243, 0.2)
  &:before
    content ''
    width 100%
    height 1px
    background linear-gradient(90deg, rgba(5, 53, 108, 1), rgba(0, 183, 255, 1), rgba(5, 54, 110, 1))
  &:after
    content ''
    width 100%
    height 1px
    position absolute
    bottom 0
    background linear-gradient(90deg, rgba(5, 53, 108, 1), rgba(0, 183, 255, 1), rgba(5, 54, 110, 1))
  .icon-more
    width 25px
    height 25px
    background url('./more.png') no-repeat
    position absolute
    top 30px
    left 255px
    cursor pointer
    z-index 99999
  .nav-header
    line-height 25px
    color #fff
    font-size 18px
    height 40px
    padding-left 25px
    overflow hidden
    .bread_list
      font-size 14px
      line-height 40px
      &:last-child
        .symbol
          display none
      .symbol
        margin 0 10px
        font-size 20px
        line-height 22px
      .address-name
        cursor pointer
    & > div
      float left
    .t1
      width 153px
      background rgba(44, 148, 243, 0.5) url('./down.png') no-repeat
      background-position 130px 10px
      cursor pointer
      overflow hidden
      text-overflow ellipsis
      padding-right 20px
      height 39px
    .t2
      width 150px
      position relative
      cursor pointer
      &:after
        content ''
        position absolute
        width 1px
        height 25px
        background rgba(31, 87, 158, 0.5)
        right 0
        top 7px
    .t3
      width 175px
      position relative
      &:after
        content ''
        position absolute
        width 1px
        height 25px
        background rgba(31, 87, 158, 0.5)
        right 0
        top 7px
      &:last-child:after
        height 39px
        top 0
  .nav-content
    width 299px
    min-height 628px
    color #fff
    background #0E2A6A
    position absolute
    top 40px
    z-index 99990
    text-align left
    display block
    transition all 0.3s ease-in
    & > div
      padding-top 20px
      font-size 14px
      border-bottom 1px solid rgba(31, 87, 158, 0.5)
      padding 10px 0px 5px 24px
      &:last-child
        border-bottom none
    .t1
      span
        &.active
          color #F79D1D
          cursor pointer
        &.disabled
          color #7FB5F1
          cursor default
      .first-bar
        color #fff
        cursor default
    .contryTitle
      cursor pointer
      line-height 1
      .first-bar
        font-size 18px
        margin-right 20px
      &.disabled
        color #7FB5F1
        cursor default
    .disable
      color #7FB5F1
      cursor default
    .t2
      &.choose
        cursor pointer
        .title-bar
          margin-bottom 12px
          cursor default
      &.disable
        padding-bottom 0
      .address-t
        color #fff
        font-size 18px
      .title
        margin-bottom 10px
      .mid-number
        font-size 30px
        margin-left 11px
      .number
        color #A6FBFF
        display inline-block
        & > span
          color #7FB5F1
          font-size 14px
          margin-left 9px
      ul
        margin-top -5px
        li
          float left
          margin-right 5px
          line-height 25px
          &.active
            color #F79D1D
</style>