<template>
  <div class="treat-person">
    <a
      :href="baseUrl+'UserCenter/DataV/getExpertlist.html?areaname='+name+'&level='+level+'&isstore='+isstore"
      class="header"
      target="_blank"
      v-if="!noDatas"
      v-show="afterExpphdata.length != 0"
    >专家排行榜<span>&gt;</span></a>
    <ul
      class="nums"
      v-if="!noDatas"
      v-show="afterExpphdata.length != 0"
    >
      <li v-for="(item,index) in afterExpph" :key="index">
        <div
          class="num"
          :style={color:item.color}
        >{{index+1}}</div>
        <div class="person-img">
          <img
            :src="item.avatar"
            alt=""
          >
        </div>
        <div class="name">{{item.name}}</div>
        <div class="total-num">{{item.posts}}</div>
      </li>
    </ul>
    <noData
      v-if="noDatas || afterExpphdata.length == 0"
      :text="noDataMessage"
    ></noData>
  </div>
</template>
<script>
const colorArr = ["#FA4647", "#F79D1D", "#F79D1D", "#0963B1", "#0963B1"];
import noData from "../../ui-components/no-data/no-data";
import { mapState } from "vuex";
export default {
  name: "ranking-list",
  data() {
    return {
      noDataMessage: "该地区暂无专家",
      baseUrl: "http://wap.114nz.com/"
      // baseUrl: process.env.VUE_BASE_URL || 'http://beta.wap.114nz.com/'
    };
  },
  props: {
    colors: {
      type: Boolean,
      default: true
    },
    afterExpphdata: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    ...mapState(["isstore"]),
    afterExpph() {
      this.afterExpphdata.forEach((element, index) => {
        if (this.colors) {
          element.color = colorArr[index];
        } else {
          element.color = "#7FB5F1";
        }
      });
      return this.afterExpphdata;
    },
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
    height 40px
    width 100%
    display block
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
        font-size 18px
        font-weight bold
        color #FA4647
        display inline-block
        vertical-align middle
        margin-right 10px
        font-style italic
      .person-img
        display inline-block
        vertical-align middle
        width 28px
        height 28px
        border-radius 100%
        background #7FB5F1
        margin 0 28px 0 22px
        overflow hidden
        & > img
          width 100%
      .name
        font-size 15px
        color #ffffff
        display inline-block
        vertical-align middle
        margin-left 10px
      .total-num
        display inline-block
        vertical-align middle
        font-size 15px
        color #7FB5F1
        position absolute
        right 43px
        top 50%
        transform translateY(-50%)
</style>