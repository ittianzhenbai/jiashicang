<template>
  <transition name="fade">
    <div
      class="alert-wrap"
      v-if="showFlag"
    >
      <div class="alert-box">
        <div class="alert-title">{{alertTitle}}</div>
        <div class="alert-text">{{alertText}}</div>
        <div
          class="alert-botton"
          v-on:click="makeSure"
        >{{botton}}</div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "alert",
  data() {
    return {
      showFlag: false
    };
  },
  props: {
    alertTitle: {
      type: String,
      default: "登录失败"
    },
    alertText: {
      type: String,
      default: "暂不支持该类型账号登录，请切换管理院账号再登录"
    },
    botton: {
      type: String,
      default: "知道了"
    }
  },
  methods: {
    makeSure() {
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
  z-index 99
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
    .alert-text
      width 270px
      font-family MicrosoftYaHei
      font-weight 400
      color rgba(255, 255, 255, 1)
      line-height 28px
      text-align center
      margin 0 auto
      font-size 18px
    .alert-botton
      width 199px
      height 57px
      background rgba(53, 155, 192, 0)
      border 1px solid rgba(255, 255, 255, 0.5)
      border-radius 29px
      color #fff
      line-height 57px
      position absolute
      bottom 50px
      left 50%
      margin-left -100px
      font-size 20px
      cursor pointer
      user-select none
.fade-enter-active, .fade-leave-active
  transition opacity 0.5s
.fade-enter, .fade-leave-to
  opacity 0
</style>