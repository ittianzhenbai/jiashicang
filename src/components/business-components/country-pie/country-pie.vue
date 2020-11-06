<template>
  <div
    class="pie-wrap"
    id="countryPie"
    style="width:100%;height:100%"
  >
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");

export default {
  name: "country-pie",
  data() {
    return {};
  },
  props: {
    pieData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    initPie() {
      let mapEchartP = echarts.init(document.getElementById("countryPie"));
      mapEchartP.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} {d}%"
          },
          series: this.pieData
        },
        true
      );
    }
  },
  mounted() {
    this.initPie();
    // console.table(this.pieData);
  },
  computed: {},
  components: {},
  watch: {
    pieData() {
      this.initPie();
    }
  }
};
</script>
<style lang="stylus" scoped>
.pie-wrap
  width 100%
  height 100%
</style>