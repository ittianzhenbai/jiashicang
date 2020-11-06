<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="loading" v-show="app_loading" ></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      app_loading:true
    }
  },
  created(){
    this.app_loading = false
  },
  updated(){
   
  }
}
</script>
<style lang="stylus">
@import './common/css/index'
@keyframes rotates{
    0%{
        transform: rotate(0);
      }
    100%{
        transform:rotate(360deg);
    }
	}

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  width 100%
  height 100%
  position relative
  .loading
    text-align center
    color #fff
    font-size 20px
    position fixed
    left 50%
    top 40%
    color #7FB5F1
    font-size 18px
    margin-left -70px
    width 50px
    height 50px
    background url(./loading.svg) no-repeat 100% center 
    background-size cover
    animation rotates 1s infinite linear
    animation-direction:normal;
    z-index 1
.fade-enter-active, .fade-leave-active
  transition opacity 0.5s
.fade-enter, .fade-leave-to
  opacity 0
.create-isLoading
    font-size 30px
    .el-loading-spinner
        .el-loading-text
          font-size 20px !important 
          margin-top 10px
</style>
