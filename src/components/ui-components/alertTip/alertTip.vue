<template>
  <div
    class="alert-wrap"
    v-show="aletiTipShow"
  >
    <div class="alertTip-box">
      <p class="text1">{{text1}}</p>
      <p class="text2">{{text2}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "alertTip",
  props: {
    text1: {
      type: String,
      default: "该地区庄稼医院正在建设中..."
    },
    text2: {
      type: String,
      default: "敬请期待"
    }
  },
  data() {
    return {
      aletiTipShow: false
    };
  },
  watch: {
    aletiTipShow(newVal) {
      // let that = this;
      // if (newVal == true) {
      //   setTimeout(function() {
      //     that.aletiTipShow = false;
      //   }, 1500);
      // }
    }
  }
};
</script>
<style lang="stylus" scoped>
.alert-wrap
  width 100%
  height 675px
  position absolute
  top 90px
  left 0
  background #080f3e
  z-index 9999
  .alertTip-box
    width 320px
    height 126px
    font-size 18px
    font-family MicrosoftYaHei
    font-weight 400
    color rgba(255, 255, 255, 1)
    line-height 28px
    text-align center
    position absolute
    z-index 99
    left 50%
    top 45%
    transform translate(-50%, -50%)
    // background #0E2A6A
    border-radius 10px
    padding-top 40px
</style>