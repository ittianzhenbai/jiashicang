<template>
  <div style="height:100%">
    <div v-if="!noDatas">
      <div class="header">{{title}}</div>
      <div class="roundness">
        <div class="round">
          <CountryPie :pieData="getArr"></CountryPie>
        </div>
        <ul class="round-ul">
          <li
            v-for="(name,index) in ulArrText"
            :key="name"
          >
            <span
              class="color"
              :style="{'background':ulArrColor[index]}"
            ></span>
            {{name}}
          </li>
        </ul>
      </div>
      <ul class="adress-ul">
        <li v-for="(item,index) in PercentArrayArr" :key= 'index'>
          <p>{{item.nums}}</p>
          <h6>{{item.name}}</h6>
        </li>
      </ul>
    </div>
    <noData v-if="noDatas"></noData>
  </div>
</template>
<script>
import CountryPie from "../country-pie/country-pie";
import noData from "../../ui-components/no-data/no-data";

export default {
  name: "country-hospital",
  data() {
    return {};
  },
  props: {
    PercentArray: {
      type: Array,
      default: function() {
        return [];
      }
    },
    title: { type: String, default: "浙江省" }
  },
  computed: {
    PercentArrayArr() {
      let result = [];
      result = this.PercentArray.slice().reverse();
      return result;
    },
    noDatas() {
      return this.$store.state.noData;
    },
    ulArrText() {
      let arr = ["全国", "省", "市", "县", "乡", "村"];
      let length = this.getPieValue.length; //数据长度
      let result = arr
        .reverse()
        .splice(0, length)
        .reverse();
      return result;
    },
    ulArrColor() {
      let arrColor = [
        "#FBE69C",
        "#F79D1D",
        "#70DA83",
        "#42C7C4",
        "#71A3FF",
        "#F25F79"
      ];
      let length = this.getPieValue.length; //数据长度
      let result = arrColor.splice(0, length).reverse();
      return result;
    },
    getArr() {
      let arr = [
        {
          name: "村级数量",
          type: "pie",
          radius: ["90%", "95%"],
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false,
          color: ["#FBE69C", "#0E2A6D"],
          data: [
            //村级
          ]
          //颜色值表示，建院数量为特定颜色，总数为目标建院数量，其余比例为蓝色
        },
        {
          name: "乡级数量",
          type: "pie",
          radius: ["75%", "80%"],
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false,
          color: ["#F79D1D", "#0E2A6D"],
          data: [
            //乡级
          ]
        },
        {
          name: "县级数量",
          type: "pie",
          radius: ["60%", "65%"],
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false,
          color: ["#70DA83", "#0E2A6D"],
          data: [
            // 县级
          ]
        },
        {
          name: "市级数量",
          type: "pie",
          radius: ["45%", "50%"],
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false,
          color: ["#42C7C4", "#0E2A6D"],
          data: [
            //市级
          ]
        },
        {
          name: "省级数量",
          type: "pie",
          radius: ["30%", "35%"],
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false,
          color: ["#71A3FF", "#0E2A6D"],
          data: [
            //省级级
          ]
        },
        {
          name: "全国数量",
          type: "pie",
          radius: ["15%", "20%"],
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false,
          color: ["#F25F79", "#0E2A6D"],
          data: [
            //全国级
          ]
        }
      ];
      arr.forEach((item, index) => {
        item.data = this.getPieValue[index];
      });
      let length = this.PercentArray.length;
      // console.log(length);
      let result = arr.splice(0, length).reverse();
      result.forEach((item, index) => {
        let data = item.data;
        if (data[0].value == 0 && data[1].value == 0) {
          let r = data.splice(0, 1);
          item.color = ["#0E2A6D"];
        }
      });
      return result;
    },
    getPieValue() {
      // 对的
      let arr = [];
      this.PercentArray.reverse().forEach((item, index) => {
        arr.push([
          {
            value: this.PercentArray[index].nums,
            name: this.PercentArray[index].name
          },
          {
            value:
              this.PercentArray[index].totalnums -
              this.PercentArray[index].nums,
            name: this.PercentArray[index].name + "未完成"
          }
        ]);
      });
      return arr;
    }
  },
  components: {
    CountryPie,
    noData
  }
};
</script>
<style lang="stylus" scoped>
.header
  display block
  left 0
  height 40px
  width 100%
  color #fff
  font-size 16px
  line-height 40px
  padding-left 20px
  text-align left
  border-bottom 1px solid #1b4e79
.roundness
  height 304px
  border-bottom 1px solid #1B4E79
  overflow hidden
  .round
    width 214px
    height 214px
    margin 32px auto 0
  .round-ul
    font-size 0
    text-align center
    margin-top 20px
    & > li
      display inline
      color #fff
      margin-right 12px
      padding-left 17px
      position relative
      .color
        width 10px
        height 10px
        border-radius 50%
        position absolute
        left 0px
        top 2px
        display block
        background #333
      &:last-child
        margin-right 0
.adress-ul
  // width 214px
  margin 0 auto
  font-size 0px
  padding-top 18px
  text-align center
  color #fff
  li
    font-size 14px
    display inline-block
    margin-right 15px
    p
      font-size 18px
      font-weight bold
      margin-bottom 14px
    h6
      font-weight 400
      color #7FB5F1
    &:last-child
      margin-right 0
</style>