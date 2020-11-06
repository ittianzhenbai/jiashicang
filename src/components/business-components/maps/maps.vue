<template>
  <div class="map-wrap">
    <div
      id="mapId"
      :style="{width:'295px',height:'330px'}"
    ></div>
    <div
      class="showMapData"
      ref="mapData"
    >
      <span>{{cityName}}</span> ｜ <span
        class="number"
        @click="lookSecondDetail"
        :class="{'none':cityVal}"
      >{{cityVal == 0 ? '暂无医院':'详情>'}}</span>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/map");
require("echarts/lib/component/tooltip");
import { mapMutations, mapState } from "vuex";
export default {
  name: "maps",
  data() {
    return {
      pieIndex: 0,
      cityName: "", //城市名称
      cityVal: "", //城市对应的数据
      obj: {}
    };
  },
  props: {
    name: {
      type: String,
      default: "zhejiang"
    },
    mapData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    ...mapMutations(["changeBaseCity", "getIsnav"]),
    initMap(name) {
      let that = this;
      // 注册可用的地图
      let mapEcharts = echarts.init(document.getElementById("mapId"));
      this.axios
        .post("/Home/NationwideDatav/getJosnArea", `areaname=${name}`)
        .then(res => {
          echarts.registerMap(name, res.data);
          mapEcharts.setOption(
            {
              tooltip: {
                trigger: "item",
                // formatter: "{b}:{c}所"
                formatter: function(name) {
                  // return "";
                  let val = isNaN(name.data.value) ? 0 : name.data.value;
                  // if(isNaN(name.data.value)){

                  // }
                  return name.data.name + ":" + val + "所";
                }
              },
              series: [
                {
                  name: name,
                  type: "map",
                  mapType: name, // 自定义扩展图表类型,
                  zoom: 1.2,
                  position: "center",
                  // selectedMode: "single",
                  itemStyle: {
                    normal: {
                      areaColor: "#226DBF",
                      label: {
                        show: that.textBoolean,
                        textStyle: {
                          color: "#fff",
                          fontSize: 0
                        }
                      }
                    },
                    emphasis: {
                      areaColor: "#fbe69c",
                      label: {
                        // backgroundColor: "#ff6600",
                        show: that.textBoolean,
                        textStyle: {
                          color: "#fff",
                          fontSize: 10
                        }
                      }
                    }
                  },
                  data: that.mapsArray
                }
              ]
            },
            true
          );

          mapEcharts.off("click");
          mapEcharts.on("click", function(params) {
            let x = params.event.offsetX;
            let y = params.event.offsetY;
            that.$refs.mapData.style.left = x + "px";
            that.$refs.mapData.style.top = y + "px";
            that.$refs.mapData.style.display = "block";
            that.pieIndex = params.dataIndex;
            that.cityName = params.name;
            // console.log(that.cityName)
            that.cityVal = params.value;
            that.obj = {
              name: params.name,
              level: params.data.level,
              index: params.dataIndex,
              childName: params.data.childName,
              childLevel: params.data.childLevel,
              isClick: 1,
              letter: params.data.letter
            };
            // that.$emit("upCity", obj);
            let midObj = "";
            // console.log(that.obj);
            if (
              params.data.level == 4 ||
              params.data.level == 3 ||
              params.data.level == 2
            ) {
              midObj = {
                name: params.name,
                level: params.data.level
              };
            } else {
              midObj = {
                name: params.data.childName,
                level: params.data.childLevel
              };
            }

            //点击地图，更新中间区域内容
            that.$emit("getMidData", midObj);
          });
        });
    },
    lookSecondDetail() {
      if (this.cityVal != 0) {
        //点击地图查看详情，全网页数据更新
        this.$emit("upCity", this.obj);
      }
    }
  },
  // created(){
  //   // 离开重新进入会触发更新，保存成离开之前的
  //   if(window.sessionStorage.getItem('mapIndex') != null){
  //     this.pieIndex = window.sessionStorage.getItem('mapIndex')
  //   }
  // },
  mounted() {
    //用一个中心bus事件吧
    this.initMap(this.name);
  },
  // beforeDestroy(){
  //   // 记录离开时当前地图的指向
  //   window.sessionStorage.setItem('mapIndex',this.pieIndex)
  // },
  computed: {
    ...mapState(["globalLevel"]),
    textBoolean() {
      let textBoolean = true;
      if (this.name == "china") {
        textBoolean = false;
      } else {
        textBoolean = false;
      }
      return textBoolean;
    },
    mapsArray() {
      // 给地图的数组
      let arr = [];
      this.mapData.forEach((item, index) => {
        if (this.pieIndex == index) {
          arr.push({
            name: item.name,
            value: item.hcount,
            level: item.level,
            selected: true,
            childName: item.childname,
            childLevel: item.childlevel,
            letter: item.childmapname
          });
        } else {
          arr.push({
            name: item.name,
            value: item.hcount,
            level: item.level,
            selected: false,
            childName: item.childname,
            childLevel: item.childlevel,
            letter: item.childmapname
          });
        }
      });
      // console.log(arr, this.pieIndex);
      return arr;
    },
    dMapIndex() {
      return this.$store.state.secondMapIndex;
    }
  },
  components: {},
  watch: {
    name(newVal) {
      if (this.globalLevel <= 2) {
        return;
      }
      console.log("name");
      // this.initMap(newVal);
      this.pieIndex = this.dMapIndex;
      this.$refs.mapData.style.display = "none";
      console.log("地图名字：", newVal);
    },
    pieIndex(newVal, oldVal) {
      console.log("pieIndex");
      console.log(newVal, oldVal);
      // this.initMap(this.name);
    },
    mapsArray() {
      // console.log("mapsArray :");
      this.initMap(this.name);
    }
  }
};
</script>
<style lang="stylus" scoped>
.map-wrap
  position relative
  .showMapData
    padding 5px
    background rgba(0, 0, 0, 0.5)
    color #ffffff
    position absolute
    left 0px
    top 0px
    transition 0.5s all ease
    line-height 22px
    border-radius 5px
    z-index 222222
    display none
    .number
      cursor default
      &.none
        cursor pointer
</style>