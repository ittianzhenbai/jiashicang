<template>
  <div
    class="wrap"
    v-show="showFlag"
  >
    <div class="tip-box">
      <div class="tip-title">{{tipTitle}}</div>
      <div class="tip-text">{{tipText}}</div>
      <div
        class="tip-btn"
        c-on:click="close"
      >{{tipBtn}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tip",
  data() {
    return {};
  },
  props: {
    tipTitle: {
      type: STring,
      default: "登录失败"
    },
    tipText: {
      type: STring,
      default: "用户名或密码不正确"
    },
    tipBtn: {
      type: STring,
      default: "知道了"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showFlag() {
      return this.show;
    }
  },
  methods: {
    close() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
.wrap
  width 100%
  height 100%
  position relative
  .tip-box
    position absolute
    left 50%
    top 20%
    transform translateX(-50%)
    width 359px
    height 341px
    background #1A529F
    color #fff
    text-align center
    overflow hidden
    .tip-title
      font-size 30px
      margin 60px auto 47px
    .tip-text
      width 80%
      font-size 18px
      line-height 21px
    .tip-btn
      width 199px
      height 57px
      background rgba(53, 155, 192, 0)
      border 1px solid rgba(255, 255, 255, 0.5)
      border-radius 29px
      position absoulte
      bottom 70px
      left 50%
      transform translateX(-50%)
</style>