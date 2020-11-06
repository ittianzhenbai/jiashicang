<template>
  <div class="wrap">
    <!-- <div
      class="title"
      v-if="showTitle"
    >
      {{title}}
    </div> -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Box",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="stylus" scoped>
.wrap
  width 100%
  height 100%
  background rgba(0, 0, 45, 0.6)
  border 1px solid rgba(27, 78, 121, 0.6)
  position relative
  &:before
    content ''
    width 15px
    height 15px
    position absolute
    left -3px
    top -3px
    background url('./leftTop.png') no-repeat
  &:after
    content ''
    width 15px
    height 15px
    position absolute
    right -3px
    bottom -3px
    background url('./rightBottom.png') no-repeat
  .title
    height 40px
    // border-bottom 1px solid rgba(27, 78, 121, 1)
    padding-left 20px
    line-height 40px
    color #fff
    font-weight 400
    font-size 16px
    text-align left
</style>