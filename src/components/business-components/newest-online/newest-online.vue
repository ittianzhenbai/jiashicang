<!--  -->
<template>
  <div>
    <div class="dia-box">
      <a
        :href="baseUrl+'UserCenter/DataV/getQuestionlist.html?areaname='+name+'&level='+level+'&isstore='+isstore"
        target="_blank"
        class="head-title"
        v-if="!noDatas"
        v-show="Replydatas.length != 0"
      >最新诊疗<span>&gt;</span></a>
      <ul
        class="dia-ul"
        id="diaUl"
        v-if="!noDatas"
        v-show="Replydatas.length != 0"
      >
        <li v-for="(item,index) in Replydatas" :key = "index">
          <!-- <a
            :href="'http://www.114nz.com/index.php?m=content&c=index&a=datavinfo&catid=1540&id='+item.tid+'&tdsourcetag=s_pcqq_aiomsg.html'"
            target="_blank"
          > -->
          <a
            :href="baseUrl+(item.module == 'thread' ? 'Web/':'UserCenter/')+(item.module == 'thread' ? 'Thread':'DataV')+'/'+(item.module == 'thread' ? 'detail':'getWenzhenDetail')+(item.module == 'thread' ? '?tid='+item.tid:'?Id='+item.tid)+(item.module == 'thread' ? '':'&appId='+item.appid)+(item.module == 'thread' ? '':'&module='+item.module)"
            target="_blank"
          >
            <div class="time">{{item.dateline}}
            </div>
            <div class="text">
              <span class="text1">{{item.subject}}</span>
              <span
                class="text2"
                :style="{display:'none'}"
              >{{item.subject}}</span>
            </div>
          </a>
        </li>

      </ul>
      <noData
        v-if="noDatas || Replydatas.length == 0"
        :text="noDataMessage"
      ></noData>
    </div>
  </div>
</template>

<script>
import noData from "../../ui-components/no-data/no-data";
import { mapState } from "vuex";

export default {
  data() {
    return {
      noDataMessage: "该地区暂无网诊",
      baseUrl: "http://wap.114nz.com/"
      // baseUrl: process.env.VUE_BASE_URL || "http://beta.wap.114nz.com/",
    };
  },
  props: {
    Replydata: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    ...mapState(["isstore"]),
    Replydatas() {
      return this.Replydata.splice(0, 5);
    },
    name() {
      return this.$store.state.defaultProvince;
    },
    level() {
      return this.$store.state.globalLevel;
    },
    noDatas() {
      return this.$store.state.noData;
    }
  },

  mounted() {
    this.getWidth();
  },

  methods: {
    getWidth() {
      let textList1 = document
        .getElementById("diaUl")
        .getElementsByClassName("text1");
      let textList2 = document
        .getElementById("diaUl")
        .getElementsByClassName("text2");
      let liList = document
        .getElementById("diaUl")
        .getElementsByTagName("li")[0];
      if(textList1.length){
          for (let i = 0; i < textList1.length; i++) {
            let textW = textList1[i].clientWidth;
            let liW = liList.clientWidth;
          if (textW > 228) {
            textList1[i].className = "text1 an t1";
            textList2[i].style.display = "block";
            textList2[i].className = "text2 an2 t2";
          } else {
            textList1[i].className = "text1 an";
            textList2[i].style.display = "none";
            textList2[i].className = "text2 an2";
          }
        }
      }
    }
  },
  components: {
    noData
  },
  watch: {
    Replydata() {
      this.getWidth();
    }
  }
};
</script>
<style lang='stylus' scoped>
.dia-box
  position relative
  height 267px
  .head-title
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
    &>span
      line-height 40px
      font-size 24px
      padding-right 10px
      float right
  .dia-title
    font-size 16px
    line-height 34px
    height 34px
    margin 0 0 0 16px
    text-indent 15px
  .dia-ul
    margin-top 20px
    margin-left 10px
    &>li
      padding-left 61px
      position relative
      margin-bottom 20px
      height 20px
      overflow hidden
      width 100%
      text-align left
      color #ffffff
      line-height 20px
      .time
        position absolute
        left 0
        top 0
        width 50px
        height 20px
        text-align center
        line-height 20px
        background #0C2C78
        color #7FB5F1
      .text
        white-space normal
        display inline-block
        overflow hidden
        word-break keep-all /* 不换行 */
        white-space nowrap /* 不换行 */
        position relative
        height 20px
        min-width 228px
        color #ffffff
        & > span
          display block
          font-size 12px
        .t1
          animation marquee1 32s linear infinite
          margin-left 100%
          position absolute
          width auto
        .t2
          animation marquee2 32s linear 16s infinite
          margin-left 100%
          position absolute
        @keyframes marquee1
          0%
            transform translateX(0)
          100%
            transform translateX(-225%)
        @keyframes marquee2
          0%
            transform translateX(0)
          100%
            transform translateX(-225%)
.yinongbao
  width 323px
  height 280px
  padding-top 60px
  .logo-icon
    width 247px
    height 47px
    background url('./logo-icon.png') no-repeat
    margin 0 auto
    margin-bottom 34px
  .href-icon
    width 241px
    height 74px
    margin 0 auto
    font-size 26px
    color #ffffff
    text-indent 33px
    line-height 74px
    background url('./href-icon.png') no-repeat
    position relative
    cursor pointer
    &:after
      content ' '
      width 12px
      height 20px
      position absolute
      right 32px
      top 50%
      margin-top -10px
      background url('./icon.png') no-repeat
</style>