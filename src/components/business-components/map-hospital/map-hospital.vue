<template>
  <div :class='[noDatas || CurMp.length == 0 ? "map-hospital-wrap nodata":"map-hospital-wrap"]'>
    <div class="title">{{cityNames}}医院概况</div>
    <div class="chart">
      <ChartPie
        :pieData=CurMp
        v-if="!noDatas"
        v-show="CurMp.length != 0"
      >
      </ChartPie>
      <noData
        v-if="noDatas || CurMp.length == 0"
        :text="noDataMessga"
      >
      </noData>
    </div>
    <ul class="num-container clearfix"
        v-if="noDatas || CurMp.length !== 0"
    >
      <li>
        <p class="num">{{count.Mpubcount}}</p>
        <p class="name">庄稼医院</p>
      </li>
      <li>
        <p class="num">{{count.Usercount}}</p>
        <p class="name">会员</p>
      </li>
      <li>
        <p class="num">{{count.Expertcount}}</p>
        <p class="name">专家</p>
      </li>
      <li>
        <p class="num">{{count.Servicecount}}</p>
        <p class="name">服务面积</p>
      </li>
      <li>
        <p class="num">{{count.Questioncount}}</p>
        <p class="name">诊疗</p>
      </li>
      <li>
        <p class="num">{{count.Recipecount}}</p>
        <p class="name">测土配方</p>
      </li>
    </ul>
  </div>
</template>
<script>
import ChartPie from "../chart-pie/chart-pie";
import noData from "../../ui-components/no-data/no-data";
export default {
  name: "map-hospital",
  data() {
    return {
      noDataMessga: "该地区暂无医院"
    };
  },
  props: {
    cityNames: {
      type: String,
      default: ""
    },
    CurMp: {
      type: Array,
      default: function() {
        return [];
      }
    },
    count: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {},
  watch: {},
  computed: {
    noDatas() {
      return this.$store.state.noData;
    }
  },
  components: {
    ChartPie,
    noData
  }
};
</script>
<style lang="stylus" scoped>
.map-hospital-wrap
  background rgba(6, 22, 64, 0.7)
  border 1px solid #0382B4
  border-radius 20px
  color #fff
  padding 5px 10px 5px
  text-align left
  font-family MicrosoftYaHei
  .title
    font-size 18px
    font-weight 400
    margin-bottom 20px
  .chart
    width 100%
    height 166px
  .num-container
    width 100%
    & > li
      width 33.33%
      text-align center
      float left
      margin-bottom 10px
      .num
        font-size 14px
        font-weight bold
        color rgba(255, 255, 255, 1)
        line-height 16px
        margin-bottom 7px
      .name
        color #7FB5F1
        font-size 12px
.nodata
  margin-top 50px
</style>