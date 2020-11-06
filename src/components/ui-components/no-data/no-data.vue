<template>
  <div class="no-wrap">
    <div class="text">
      <h4>{{text}}</h4>
      <p>敬请期待</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "no-data",
  data() {
    return {};
  },
  props: {
    text: {
      type: String,
      default: "该地区暂无数据"
    }
  }
};
</script>
<style lang="stylus" scoped>
.no-wrap
  width 100%
  height 100%
  position relative
  .text
    width 80%
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    text-align center
    & > h4
      font-size 24px
      color #fff
      line-height 24px
      margin-bottom 19px
    & > p
      font-size 14px
      color #fff
</style>