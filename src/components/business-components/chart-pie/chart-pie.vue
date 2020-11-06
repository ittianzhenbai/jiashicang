<template>
  <div
    id="pie"
    :style="wh"
  >
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
let colors = [
  "#F79D1c",
  "#F7Db1c",
  "#b7de32",
  "#5ede32",
  "#32de8f",
  "#32b3de",
  "#3287de",
  "#9b32de",
  "#dc32de",
  "#cf6d25"
];

export default {
  name: "chart-pie",
  data() {
    return {};
  },
  props: {
    pieData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    wh: {
      type: String,
      default: "width:258px;height:166px"
    }
  },
  methods: {
    initPie() {
      let that = this;
      let mapEcharts = echarts.init(document.getElementById("pie"));
      mapEcharts.showLoading();
      mapEcharts.setOption({
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            let arr = params.data.list;
            let str = arr.join("<br/>");
            str = `${params.data.name} <span style="font-size:18px">${
              params.data.value
            }</span>所医院<br/>${str}`;
            return str;
            // ("{a} <br/>{b} : {c} ({d}%)");
          }
        },
        // legend: {
        //   type: "scroll",
        //   orient: "vertical",
        //   right: 10,
        //   top: 20,
        //   bottom: 20,
        //   data: [
        //     { value: 20, name: "wu" },
        //     { value: 40, name: "he" },
        //     { value: 50, name: "long" }
        //   ]
        // },
        series: [
          {
            name: "地区",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            color: colors,
            data: that.pieData
          }
        ]
      });
      mapEcharts.hideLoading();
    }
  },
  mounted() {
    this.initPie();
  },
  watch: {
    pieData() {
      this.initPie();
    }
  },
  computed: {},
  components: {}
};
</script>
<style lang="stylus" scoped>
div
  color #fff
</style>