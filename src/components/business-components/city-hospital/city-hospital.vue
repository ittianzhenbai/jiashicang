<template>
  <div>
    <div class="pie-wrap">
      <ChartPie
        name="city"
        :pieData=CurMp
        v-show="CurMp.length != 0"
        :wh='wh'
      ></ChartPie>
      <noData v-if="noDatas || CurMp.length == 0"></noData>
    </div>
    <ul class="city-name-ul clearfix">
      <li v-for="(item,index) in pieLiArr">
        <span
          class="square"
          :style="{background:colorArr[index]}"
        ></span>
        <p class="name">{{item}}</p>
      </li>
    </ul>
    <div
      class="city-context"
      v-if="countObj"
    >
      <div
        class="title"
        v-show="countObj"
      >{{countObj.name}}</div>
      <ul
        class="city-num-ul clearfix"
        v-show="countObj.level != 0"
      >
        <li>
          <p class="num">{{countObj.count.Usercount}}
          </p>
          <p class="text">会员</p>
        </li>
        <li>
          <p class="num">{{countObj.count.Expertcount}}
          </p>
          <p class="text">专家</p>
        </li>
        <li>
          <p class="num">{{countObj.count.Servicecount}}
          </p>
          <p class="text">服务面积</p>
        </li>
        <li>
          <p class="num">{{countObj.count.Questioncount}}
          </p>
          <p class="text">诊疗</p>
        </li>
        <li>
          <p class="num">{{countObj.count.Recipecount}}
          </p>
          <p class="text">测土配方</p>
        </li>
      </ul>
      <div
        class="text-box"
        v-show="countObj.level == 0"
        :class="{w:countObj.pic}"
      >
        {{countObj.introduce}}
      </div>
      <img
        :src="countObj.pic"
        class="text-box-img"
        v-show="countObj.level == 0 && countObj.pic"
      >
      <a
        :href="'http://wap.114nz.com/Web/Mpublic/detail.html?mId='+countObj.linkid"
        target="_blank"
        v-show="countObj.level == 0"
        class="getMore"
      >更多 ></a>
    </div>
  </div>
</template>
<script>
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
import ChartPie from "../chart-pie/chart-pie";
import noData from "../../ui-components/no-data/no-data";
// import { setTimeout } from "timers";
export default {
  name: "city-hospital",
  data() {
    return {
      wh: "width:300px;height:190px",
      pieIndex: 1,
      colorArr: []
    };
  },
  props: {
    CurMp: {
      type: Array,
      default: function() {
        return [];
      }
    },
    cityNames: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    pieLi: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    // colorArr() {
    //   let arr = this.CurMp.concat([]);
    //   let length = arr.filter(item => item.value !== 0).length;
    //   //length = 4
    //   // 数组内 value 不等于0的数量
    //   let len = this.pieLi.length - length;
    //   //数组内等于0的数量
    //   let newArr = [];
    //   for (let i = 0; i < len; i++) {
    //     newArr.push("#7FB5F1");
    //   }
    //   // let arr = Array,from()

    //   colors = colors.splice(0, length);
    //   colors = colors.concat(newArr);

    //   return colors;
    // },

    pieLiArr() {
      let result = [];
      let arr = this.pieLi.concat([]);
      if (this.pieLi.length > 15) {
        result = arr.splice(0, 14);
        result.push("其他");
        return result;
      } else {
        return this.pieLi;
      }
    },
    noDatas() {
      return this.$store.state.noData;
    },
    countName() {
      return this.list[this.pieIndex].name;
    },
    countObj() {
      return this.list[this.pieIndex];
    }
  },
  methods: {
    colorArray() {
      let arr = colors.concat([]);
      if (!this.CurMp) {
        return;
      }
      //数组内 value 不等于0的数量
      let length = this.CurMp.filter(item => item.value !== 0).length;
      //length = 4
      // 数组内 value 等于0的数量
      let len = this.pieLi.length - length;
      //数组内等于0的数量
      let newArr = [];
      for (let i = 0; i < len; i++) {
        newArr.push("#7FB5F1");
      }
      // let arr = Array,from()
      arr = arr.splice(0, length, newArr);
      arr = arr.concat(newArr);
      this.colorArr = arr;
    }
  },
  mounted() {
    let that = this;
    setInterval(function() {
      that.pieIndex++;
      if (that.pieIndex >= that.list.length) {
        that.pieIndex = 0;
      }
    }, 5000);
    this.colorArray();
  },
  watch: {
    CurMp(newVal) {
      let arr = colors.concat([]);
      //数组内 value 不等于0的数量
      let length = newVal.filter(item => item.value !== 0).length;
      //length = 4
      // 数组内 value 等于0的数量
      let len = this.pieLi.length - length;
      //数组内等于0的数量
      let newArr = [];
      for (let i = 0; i < len; i++) {
        newArr.push("#7FB5F1");
      }
      // let arr = Array,from()
      arr = arr.splice(0, length, newArr);
      arr = arr.concat(newArr);
      this.colorArr = arr;
    }
  },
  components: {
    ChartPie,
    noData
  }
};
</script>

<style lang="stylus" scoped>
.pie-wrap
  width 300px
  height 190px
.city-name-ul
  width 285px
  margin-left 46px
  margin-top 12px
  font-size 0
  height 125px
  overflow hidden
  & > li
    float left
    width 33.33%
    text-align left
    color #fff
    margin-bottom 10px
    & > span
      display inline-block
      width 25px
      height 15px
      background yellow
      vertical-align middle
      margin-right 10px
    .name
      display inline-block
      vertical-align middle
      font-size 14px
      width 59px
      text-overflow ellipsis
      white-space nowrap
      overflow hidden
.text-box
  padding 0 10px 0 10px
  font-size 12px
  color #999
  height 93px
  margin-top -14px
  overflow hidden
  line-height 18px
  text-overflow ellipsis
  word-break break-all
  white-space normal
  display -webkit-box
  -webkit-line-clamp 5
  -webkit-box-orient vertical
  text-align left
  float left
  &.w
    width 143px
    padding-right 10px
.text-box-img
  margin-top -14px
  float right
  width 95px
  height 95px
  margin-right 10px
.getMore
  position absolute
  left 10px
  bottom 16px
  font-size 14px
  color #7FB5F1
.city-context
  position absolute
  right 10px
  top 123px
  width 250px
  height 214px
  background rgba(6, 22, 64, 0.7)
  border 1px solid rgba(3, 130, 180, 1)
  border-radius 10px
  color #fff
  .title
    font-size 18px
    line-height 18px
    margin 34px 0
  .city-num-ul
    & > li
      float left
      width 33.33%
      text-align center
      margin-bottom 16px
      &:nth-child(4)
        width 50%
      &:nth-child(5)
        width 50%
      & > .num
        font-size 14px
        font-weight bold
        margin-bottom 9px
      & > .text
        color #7FB5F1
</style>