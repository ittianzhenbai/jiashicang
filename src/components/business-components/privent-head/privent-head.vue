<template>
  <div class="wrap">
    <ul class="header">
      <li>
        <p>{{Mpubcount}}</p>
        <h6>庄稼医院(所)</h6>
      </li>
      <li>
        <p>{{Usercount}}</p>
        <h6>会员(个)</h6>
      </li>
      <li>
        <p>{{Expertcount}}</p>
        <h6>专家(位)</h6>
      </li>
      <li>
        <p>{{Servicecount}}</p>
        <h6>服务面积(亩)</h6>
      </li>
      <li>
        <p>{{Questioncount}}</p>
        <h6>诊疗(次)</h6>
      </li>
      <li>
        <p>{{Recipecount}}</p>
        <h6>测土配方(次)</h6>
      </li>
      <li>
        <a
          :href="'http://wap.114nz.com/UserCenter/DataV/getSalelist?areaname='+defaultProvince+'&level='+globalLevel"
          target="_blank"
        >
          <p>{{Productamount}}</p>
          <h6>销售额</h6>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "privent-head",
  data() {
    return {};
  },
  props: {
    Mpubcount: {
      //医院数
      type: Number,
      default: 0
    },
    Usercount: {
      //会员数
      type: Number,
      default: 0
    },
    Expertcount: {
      //专家数
      type: Number,
      default: 0
    },
    Servicecount: {
      // 服务面积
      type: Number,
      default: 0
    },
    Questioncount: {
      // 诊疗数
      type: Number,
      default: 0
    },
    Recipecount: {
      // 测土配方数
      type: Number,
      default: 0
    },
    Productamount: {
      //销售金额
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState(["defaultProvince", "globalLevel"])
  }
};
</script>
<style lang="stylus" scoped>
.header
  display block
  width 580px
  height 56px
  text-align center
  font-size 0
  margin 10px auto
  position relative
  padding-top 10px
  &:before
    content ''
    position absolute
    top 0
    left 0
    right 0
    height 3px
    background url('./border-top.png') no-repeat
    font-size 14px
  &:after
    content ''
    position absolute
    bottom 0
    left 0
    right 0
    height 3px
    background url('./border-bottom.png') no-repeat
    font-size 14px
  & > li
    display inline-block
    width 14.2%
    color #F79D1D
    font-size 21px
    font-weight 400
    p
      color #F79D1D
      font-size 21px
      font-weight 400
    h6
      font-size 12px
      color #7FB5F1
      margin-top 3px
</style>