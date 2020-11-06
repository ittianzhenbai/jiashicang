import Vue from 'vue'
import "babel-polyfill"
import Router from 'vue-router'
const WebForCounty = resolve=>require(["./views/web-for-country.vue"],resolve)
const Index = resolve=>require(["./views/index.vue"],resolve)
const Nexthospital = resolve=>require(["./components/business-components/find_components/nexthospital/nexthospital.vue"],resolve)
const Expertlist = resolve=>require(["./components/business-components/find_components/expert-list/expert-list.vue"],resolve)
const Defaultsort = resolve=>require(["./components/business-components/find_components/defaultsort/defaultsort.vue"],resolve)
const Multiplesort = resolve=>require(["./components/business-components/find_components/multiplesort/multiplesort.vue"],resolve)
const Selectsort = resolve=>require(["./components/business-components/find_components/selectsort/selectsort.vue"],resolve)
const Expertranking = resolve=>require(["./components/business-components/find_components/expert_ranking/expertranking.vue"],resolve)
const Discussscore = resolve=>require(["./components/business-components/find_components/discuss_score/discussscore.vue"],resolve)
const Hospitalsort = resolve=>require(["./components/business-components/find_components/hospitalsort/hospitalsort"],resolve)
// import VueRouter from 'vue-router';
import store from './store'
import axios from 'axios'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: WebForCounty
    },
    {
      path: '/home',
      name: 'home',
      component: WebForCounty
    },
    {
      path:'/nexthospital',
      name:'Nexthospital',
      component:Nexthospital
    },
    {
      path:'/expertlist',
      name:'Expertlist',
      component:Expertlist
    },
    {
      path:'/hospitalsort',
      name:'Hospitalsort',
      component:Hospitalsort,
      'children':[
        {
            'path':'/hospitalsort',
            'component':Defaultsort,
            'meta':{
              keepAlive:true
            },
        },
        {
            'path':'/defaultsort',
            'name':'defaultsort',
            'component':Defaultsort,
            'meta':{
              keepAlive:true
            },
       },
        {
            'path':'/multiplesort',
            'name':'multiplesort',
            'component':Multiplesort,
            'meta':{
              keepAlive:true
            },
        },
        {
            'path':'/selectsort',
            'name':'selectsort',
            'component':Selectsort,
            'meta':{
              keepAlive:true
            },
        }
    ]
    },
    {
      path:'/expertranking',
      name:'Expertranking',
      component:Expertranking
    },
    {
      path:'/discussscore',
      name:'Discussscore',
      component:Discussscore
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      beforeEnter: (to, from, next) => {
        // console.log('from:', from.name)
        // console.log('to:', to)
        let userName = store.state.sessionUsername ? store.state.sessionUsername : window.sessionStorage.getItem('userName')
        let password = store.state.sessionPassword ? store.state.sessionPassword : window.sessionStorage.getItem('passWord')
        if (to.name == 'Index' && from.path == '/') {
          axios
            .post(
              "Home/Login/login",
              `username=${userName}&password=${password}`
            ).then(res => {
              if (res.data.code == 200) {
                let userid = res.data.data.userid;
                let level = res.data.data.level;
                let secondLevel = 0;
                if (level >= 3) {
                  secondLevel = level - 1;
                } else {
                  secondLevel = level;
                }
                if (level <= 3) {
                  store.commit('getPicAddress', res.data.data.address);
                  window.sessionStorage.setItem('getPicAddress', JSON.stringify(res.data.data.address))
                }
                let arr = res.data.data.area;
                let areaname = res.data.data.areaname;
                let defaultName = res.data.data.default;
                let letter = res.data.data.letter;
                // console.log(arr,areaname,defaultName,letter)
                store.commit('getDefaultProvince', areaname); // 获取全网页地址
                store.commit('getGlobalLevel', level); //获取全网页等级
                store.commit('getDefaultCity', defaultName); // 获取二级方块地址
                store.commit('getSecondGlobalLevel', secondLevel); //获取二级方块等级
                store.commit('getDefaultAddressArr', arr); // 获取默认导航列表
                store.commit('getGlobalFstusername', res.data.data.Fstusername); //获取益农通账号
                store.commit('getGlobalFstuserpw', res.data.data.Fstuserpw); //获取益农通密码
                store.commit('getGlobalFstRoomid', res.data.data.FstRoomid); //获取益农通id
                store.commit('getAccountName', res.data.data.areaname);
                store.commit('getLoginId', level);
                store.commit('getBreadArr', res.data.data.nav);
                window.sessionStorage.setItem('getDefaultProvince', areaname)// 获取全网页地址
                window.sessionStorage.setItem('getGlobalLevel', level)//获取全网页等级
                window.sessionStorage.setItem('getDefaultAddressArr',JSON.stringify(res.data.data.area))//获取默认导航列表
                window.sessionStorage.setItem('getSecondGlobalLevel',secondLevel)//获取二级方块等级
                window.sessionStorage.setItem('getDefaultCity', res.data.data.default) // 获取二级方块地址
                window.sessionStorage.setItem('getGlobalFstusername', res.data.data.Fstusername)//获取益农通账号
                window.sessionStorage.setItem('getGlobalFstuserpw', res.data.data.Fstuserpw)//获取益农通密码
                window.sessionStorage.setItem('getGlobalFstRoomid', res.data.data.FstRoomid); //获取益农通id
                next({
                  query: {
                    userid: userid,
                    areaname: areaname,
                    level: level,
                    letter: letter
                  }
                });
              }
            })
        } else {
          store.commit('getDefaultAddressArr', JSON.parse(window.sessionStorage.getItem('getDefaultAddressArr'))); //获取默认导航列表
          store.commit('getGlobalLevel', window.sessionStorage.getItem('getGlobalLevel')); //获取全网页等级
          store.commit('getDefaultProvince', window.sessionStorage.getItem('getDefaultProvince')); // 获取全网页地址
          store.commit('getLoginId', window.sessionStorage.getItem('getGlobalLevel'));//获取当前登录者的id
          store.commit('getDefaultCity', window.sessionStorage.getItem('getDefaultCity')); // 获取二级方块地址
          // store.commit('getSecondGlobalLevel', window.sessionStorage.getItem('getSecondGlobalLevel')); // 获取二级方块等级
          store.commit('getGlobalFstusername',window.sessionStorage.getItem('getGlobalFstusername')); //获取益农通账号
          store.commit('getGlobalFstuserpw',window.sessionStorage.getItem('getGlobalFstuserpw')); //获取益农通密码
          store.commit('getGlobalFstRoomid', window.sessionStorage.getItem('getGlobalFstRoomid')); //获取益农通id
          // store.commit('getBreadArr',JSON.parse(window.sessionStorage.getItem('BreadArr')))//获取面包屑导航
          let level = window.sessionStorage.getItem('getGlobalLevel')
          let secondLevel = 0;
          if (level >= 3) {
            secondLevel = level - 1;
          } else {
            secondLevel = level;
          }
          store.commit('getSecondGlobalLevel', secondLevel); //获取二级方块等级
          if(level<= 3){
            store.commit('getPicAddress', JSON.parse(window.sessionStorage.getItem('getPicAddress')));
          }
          next()
        }

      }
    }
  ]
})


