import Vue from 'vue'
import "babel-polyfill"
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountName: '', //登陆账号（其实是地址）
    defaultProvince: '', //全网请求地址
    globalLevel: 5,  // 获取请求的地址等级
    defaultCity: '', // 方块二级请求地址
    secondGlobalLevel: '', //方块二级请求等级
    secondMapIndex: 0, //每次请求地图的默认数据的索引
    defaultAddressArr: [], // 登陆之后给定的导航列表
    baseCity: '', // 地图选择地址
    clickCity: '', // 获取数据选择的地址,
    globalActiveName: '', //登陆之后的地图右边数据显示 = 点击之后的右边数据显示
    globalFstusername: '', //益农通账号
    globalFstuserpw: '', //益农通密码
    globalFstRoomid: '', //益农通房间id
    noData: false, //没数据时
    picAddress: {},
    loginId: {}, //登陆时，保存地图参数id
    sessionUsername: '', //账号
    sessionPassword: '', //密码
    breadArr: [], //面包屑导航数组
    bviousName: "", //县级的名字
    bviousLevel: 0, //县级等级
    isnav: 1,
    isstore: window.sessionStorage.getItem('isstore') ,//null为全国数据，1为新院数据
  },
  getters: {

  },
  mutations: {
    getIsnav(state, data) {
      state.isnav = data
    },
    getBviousName(state, data) {
      //县级的名字
      state.bviousName = data
    },
    getBviousLevel(state, data) {
      //县级等级
      state.bviousLevel = data
    },
    getDefaultProvince(state, data) {
      // 全网请求地址
      state.defaultProvince = data
    },
    getGlobalLevel(state, data) {
      // 获取请求的地址等级
      state.globalLevel = data
    },
    getDefaultCity(state, data) {
      // 方块二级请求地址
      state.defaultCity = data
    },
    getSecondGlobalLevel(state, data) {
      // 获取请求的地址等级
      state.secondGlobalLevel = data
    },
    getClickCity(state, city) {
      //点击地址获取数据的地址
      state.clickCity = city
    },
    changeBaseCity(state, data) {
      //地图获取点击地址
      state.baseCity = data
    },
    getDefaultAddressArr(state, data) {
      //登陆之后给定的导航列表
      state.defaultAddressArr = data
    },
    getGlobalActiveName(state, data) {
      //登陆之后的地图右边数据显示 = 点击之后的右边数据显示
      state.globalActiveName = data
    },
    getGlobalFstusername(state, data) {
      //益农通账号
      state.globalFstusername = data
    },
    getGlobalFstuserpw(state, data) {
      //益农通密码
      state.globalFstuserpw = data
    },
    getGlobalFstRoomid(state, data) {
      state.globalFstRoomid = data
    },
    getNoData(state, data) {
      state.noData = data
    },
    getPicAddress(state, data) { //获取县级地址的
      state.picAddress = data
    },
    getAccountName(state, data) {
      state.accountName = data
    },
    getSecondMapIndex(state, data) {
      state.secondMapIndex = data
    },
    getLoginId(state, data) {
      //登陆时，保存地图参数id
      state.loginId = data
    },
    getBreadArr(state, data) {  //获取面包屑导航
      state.breadArr = data
    },
    getSessionUsername(state, data) { //改变账号，和把账号保存在session中 
      state.sessionUsername = data
      window.sessionStorage.setItem('userName', data)
    },
    getSessionPassword(state, data) { //改变密码，和把密码写入到session中
      state.sessionPassword = data
      window.sessionStorage.setItem('passWord', data)
    },
    getIsstore(state, data) {
      state.isstore = data
      window.sessionStorage.setItem('isstore', data)
    },
    // getShaoxingnetbvious(state,data){
    //   state.shaoxingnextbvious = data
    //   console.log(state.shaoxingnextbvious)
    // } 
  },
  actions: {

  }
})
