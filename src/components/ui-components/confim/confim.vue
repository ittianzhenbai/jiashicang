<template>
  <transition name="fade">
    <div
      class="alert-wrap"
      v-if="showFlag"
    >
      <div class="alert-box">
        <div :class='[alertText==""? "alert-title1":"alert-title"]'>{{alertTitle}}</div>
        <div class="alert-text">{{alertText}}</div>
        <div class="btn-wrap">
          <div
            :class='[alertText==""? "btn btn1":"btn"]'
            v-on:click="makeSure"
          >{{btnLeft}}</div>
          <div
            :class='[alertText==""? "btn btn1":"btn"]'
            v-on:click="makeNo"
          >{{btnRight}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "confim",
  data() {
    return {
      showFlag: false
    };
  },
  props: {
    alertTitle: {
      type: String,
      default: "确定退出登录？"
    },
    alertText: {
      type: String,
      default: "注销浙江省新型庄稼医院账号后，将退出监控平台"
    },
    btnLeft: {
      type: String,
      default: "确定"
    },
    btnRight: {
      type: String,
      default: "取消"
    }
  },
  methods: {
    makeSure() {
      this.showFlag = false;
      this.$emit("btnSure");
    },
    makeNo() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
.alert-wrap
  width 100%
  height 100%
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background rgba(0, 0, 45, 0.6)
  z-index 11119999999
  .alert-box
    width 359px
    height 341px
    background rgba(26, 82, 159, 1)
    border-radius 10px
    margin 145px auto
    overflow hidden
    position relative
    .alert-title
      font-size 30px
      font-family MicrosoftYaHei
      font-weight 400
      color rgba(255, 255, 255, 1)
      margin 60px 0 47px
    .alert-title1
      font-size 30px
      font-family MicrosoftYaHei
      font-weight 400
      color rgba(255, 255, 255, 1)
      margin 80px 0 47px
    .alert-text
      width 270px
      font-family MicrosoftYaHei
      font-weight 400
      color rgba(255, 255, 255, 1)
      line-height 28px
      text-align center
      margin 0 auto
      font-size 18px
    .btn-wrap
      font-size 0
      text-align center
      margin-top 45px
      .btn
        width 140px
        height 57px
        background rgba(53, 155, 192, 0)
        border 1px solid rgba(255, 255, 255, 0.5)
        border-radius 29px
        color #fff
        line-height 57px
        font-size 20px
        cursor pointer
        user-select none
        margin-right 10px
        display inline-block
      .btn1
        margin-top 60px
.fade-enter-active, .fade-leave-active
  transition opacity 0.5s
.fade-enter, .fade-leave-to
  opacity 0
</style>