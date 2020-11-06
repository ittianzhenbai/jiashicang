<!--  -->
<template>
  <div class="treat-box clearfix">
    <div class="swiper-topBar">
      <div
        class="swiper-container s3"
        v-if="sw_flag && swiperArr.length != 0"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(item,index) in swiperArr" :key = "index"
            class="swiper-slide"
          >
            <div class="treat-title1">
              <a
                :href="baseUrl+selfDetailUrl+item.id"
                class="detail"
                target="_blank"
              >{{item.name}}</a>
              <span class="sp"><a
                  :href="baseUrl+selfUrl+'?areaname='+name+'&level='+level"
                  target="_blank"
                >&gt;</a></span></div>
            <ul class="treat-number">
              <li v-if="item.pic">
                <div class="swiper-box">
                  <div class="swiper-container2 s4">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <a
                          :href="baseUrl+selfDetailUrl+item.id"
                          class="imgs-href"
                          target="_blank"
                        >
                          <img
                            :src="item.pic"
                            alt="暂无图片"
                          >
                        </a>
                        <!-- <div class="title">{{it}}</div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <noData v-show="noDatas || swiperArr.length == 0"></noData>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import noData from "../../ui-components/no-data/no-data";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      // baseUrl: process.env.VUE_BASE_URL || "http://beta.wap.114nz.com/",
      baseUrl: "http://wap.114nz.com/",
      sw_flag: false
    };
  },
  props: {
    Mplocaldata: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selfUrl: {
      type: String,
      default: ""
    },
    selfDetailUrl: {
      type: String,
      default: ""
    }
  },
  // components: {},

  computed: {
    swiperArr() {
      // let arr = this.noDatas == true ? [] : this.Mplocaldata;
      let picArr = [];
      if (this.Mplocaldata) {
        this.Mplocaldata.forEach((item, index) => {
          item.pic.forEach((el, i) => {
            picArr.push({
              id: item.id,
              name: item.name,
              pic: el
            });
          });
        });
      }
      picArr = this.noDatas == true ? [] : picArr;
      return picArr;
    },
    swiperTime() {
      let time = this.Mplocaldata[0].pic.length * 3000;
      return time + 330;
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

  methods: {
    initSwiper() {
      let that = this;
      this.$nextTick(function() {
        let s1 = new Swiper(".s3", {
          autoplay: true,
          speed: 300,
          observer: true,
          loop:true,
          observeParents: false
        });
      });
      // this.$nextTick(function() {
      //   let s2 = new Swiper(".s4", {
      //     autoplay: {
      //       delay: 3000,
      //       stopOnLastSlide: false,
      //       disableOnInteraction: true
      //     },
      //     loop: true,
      //     initialSlide: 0,
      //     observer: true,
      //     observeParents: true
      //   });
      // });
    }
  },
  mounted() {
    this.sw_flag = true;
    setTimeout(() => {
      this.initSwiper();
    }, 0);
  },
  watch: {
    Mplocaldata() {
      this.sw_flag = false;
      setTimeout(() => {
        this.sw_flag = true;
        this.initSwiper();
      }, 0);
    }
    // swiperImg:{}
  },
  components: {
    noData
  }
};
</script>
<style lang='stylus' scoped>
.treat-box
  position relative
  // margin-top -40px
  .swiper-topBar
    margin-right 4px
    float left
    width 100%
    height 218px
  .treat-title1
    font-size 16px
    line-height 40px
    text-indent 20px
    text-align left
    color #fff
    width 100%
    border-bottom 1px solid #1b4e79
    position relative
    & > .detail
      display block
      color #fff
      width 250px
      overflow hidden
      height 40px
      text-overflow ellipsis
      white-space nowrap
    & > .sp
      line-height 40px
      font-size 24px
      position absolute
      right 0
      top 1px
      width 43px
      & > a
        color #7FB5F1
        display block
        padding-right 10px
  .treat-number
    height 175px
    width 100%
    li
      position relative
      padding-top 10px
      .ads-label
        margin-bottom 5px
        position relative
        padding-left 60px
        font-size 12px
        font-family SimSun
        font-weight 400
        color #7FB5F1
        line-height 24px
        &>.label
          position absolute
          left 0
          top 0
          width 60px
          text-align justify
          &:after
            content ''
            width 100%
            height 0
            margin 0
            display inline-block
            overflow hidden
        &>.text
          width 302px
          letter-spacing 1px
      .swiper-box
        width 232.5px
        height 150px
        margin 0 auto
        text-align center
        overflow hidden
        font-size 14px
        .swiper-container2
          width 100%
          height 100%
          .imgs-href
            display block
            width 232.5px
            height 150px
            margin-bottom 7px
            & > a
              display block
            img
              display block
              width 232.5px
              height 150px
          .title
            font-size 14px
            color #7FB5F1
</style>
