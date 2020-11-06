<template>
  <div class="loading-wrap">
    <img
      src="./loading.gif"
      alt=""
      class="loading-img"
    >
  </div>
</template>
<script>
export default {
  name: "loading",
  data() {
    return {};
  }
};
// background rgba(154, 154, 154, 0.6)
</script>
<style lang="stylus" scoped>
.loading-wrap
  position absolute
  left 0
  top 0
  right 0
  bottom 0
.loading-img
  position absolute
  left 50%
  top 50%
  margin-left -30px
  margin-top -30px
  display block
  width 60px
  height 60px
</style>