<template>
  <div class="treat-person">
    <a
      href="javascript:;"
      class="header"
      v-if="!noDatas"
      v-show="Memberdata.length != 0"
    >最新加入的会员</a>
    <ul
      class="nums"
      v-if="!noDatas"
      v-show="Memberdata.length != 0"
    >
      <li v-for="(meItem,index) in Memberdata" :key="index">
        <div class="num">{{meItem.inputtime}}</div>
        <div class="person-img">
          <img
            :src="meItem.avatar"
            alt=""
          >
        </div>
        <div class="name">{{meItem.name}}</div>
        <div class="total-num">{{meItem.title}}</div>
      </li>
    </ul>
    <noData
      v-if="noDatas || Memberdata.length == 0"
      :tetx="noDataMessage"
    ></noData>
  </div>
</template>
<script>
// const colorArr = ["#FA4647", "#F79D1D", "#F79D1D", "#0963B1", "#0963B1"];
import noData from "../../ui-components/no-data/no-data";
export default {
  name: "vip-list",
  data() {
    return {
      noDataMessage: "该地区暂无会员",
      // baseUrl: process.env.VUE_BASE_URL || "http://beta.wap.114nz.com/",
      baseUrl: "http://wap.114nz.com/"
    };
  },
  props: {
    Memberdata: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    noDatas() {
      return this.$store.state.noData;
    },
    name() {
      return this.$store.state.defaultProvince;
    },
    level() {
      return this.$store.state.globalLevel;
    }
  },
  components: {
    noData
  }
};
</script>
<style lang="stylus" scoped>
.treat-person
  float left
  width 100%
  text-align left
  position relative
  height 100%
  .header
    display block
    cursor default
    left 0
    height 40px
    width 100%
    color #fff
    font-size 16px
    line-height 40px
    padding-left 20px
    border-bottom 1px solid #1b4e79
    &>span
      line-height 40px
      font-size 24px
      padding-right 10px
      float right
      color #7FB5F1
  .treat-title2
    font-size 16px
    line-height 34px
    text-indent 15px
    margin 12px 0 10px 17px
  .nums
    padding-top 13px
    & > li
      font-size 0
      padding-left 20px
      margin-bottom 3px
      position relative
      .num
        width 39px
        font-size 14px
        color #7FB5F1
        display inline-block
        vertical-align middle
        margin-right 10px
      .person-img
        display inline-block
        vertical-align middle
        width 28px
        height 28px
        border-radius 100%
        background #7FB5F1
        margin 0 5px 0 5px
        overflow hidden
        & > img
          width 100%
      .name
        font-size 15px
        color #ffffff
        display inline-block
        vertical-align middle
        margin-left 10px
        width 88px
        overflow hidden
        white-space nowrap
      .total-num
        display inline-block
        vertical-align middle
        font-size 12px
        color #7FB5F1
        position absolute
        right 13px
        top 50%
        transform translateY(-50%)
</style>