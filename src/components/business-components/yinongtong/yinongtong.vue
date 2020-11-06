<template>
  <div>
    <div class="yinongtong-wrap" v-show="Object.keys(this.isvideo).length == 0 " v-on:click="goHref">
      <div class="img"></div>
      <div class="yinongtong-buttom btn2">进入视频诊疗室</div>
    </div>
    <div class="yinongtong-wrap" v-show="Object.keys(this.isvideo).length !==0">
      <div class="sp_anli" @click="watchvideo">
        <div class="img1"></div>
        <div class="text1">新型庄稼医院视频案例</div>
      </div>
      <div class="img2" v-on:click="goHref"></div>
      <div class="tozhenliao" v-on:click="goHref">
          <div class="img3"></div>
          <div class="text2">进入诊疗室</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "yinongtong",
  data() {
    return {
      msg:true,//msg为true代表存在视频资源要进行播放
    };
  },
  props:{
    isvideo:{
      type:Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    yName() {
      return this.$store.state.globalFstusername;
    },
    yPassword() {
      return this.$store.state.globalFstuserpw;
    },
    yRoomId() {
      return this.$store.state.globalFstRoomid;
    }
  },
  methods: {
    watchvideo(){
      this.$emit('openvideo',this.msg)
    },
    goHref: function() {
      var ua = navigator.userAgent.toLowerCase();
      if (
        ua.indexOf(" chrome/") >= 0 ||
        ua.indexOf(" firefox/") >= 0 ||
        ua.indexOf(" gecko/") >= 0
      ) {
        var StringMaker = function() {
          this.str = "";
          this.length = 0;
          this.append = function(s) {
            this.str += s;
            this.length += s.length;
          };
          this.prepend = function(s) {
            this.str = s + this.str;
            this.length += s.length;
          };
          this.toString = function() {
            return this.str;
          };
        };
      } else {
        var StringMaker = function() {
          this.parts = [];
          this.length = 0;
          this.append = function(s) {
            this.parts.push(s);
            this.length += s.length;
          };
          this.prepend = function(s) {
            this.parts.unshift(s);
            this.length += s.length;
          };
          this.toString = function() {
            return this.parts.join("");
          };
        };
      }

      var keyStr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

      function encode64(input) {
        var output = new StringMaker();
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output.append(
              keyStr.charAt(enc1) +
              keyStr.charAt(enc2) +
              keyStr.charAt(enc3) +
              keyStr.charAt(enc4)
          );
        }

        return output.toString();
      }

      let str = `{http://47.97.61.230:8080/download/ZNZX_for_Windows_V3.13.5.8.exe}{Fastonz}{FMDesktop}{-link TCP:47.97.61.230:1089 -uname ${
        this.yName
      } -upwd ${this.yPassword} -utype 1 -rid ${this.yRoomId} -stype 1}`;
      console.log(str);
      str = encodeURIComponent(str);
      let url = "launcher.fsm://" + encode64(str);

      window.location.href = url;
    }
  }
};
// 210 40
</script>
<style lang="stylus" scoped>
bg-image($url) 
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) 
        background-image: url($url + "@2x.png")
.yinongtong-wrap
  height 150px
  text-align left
  user-select none
  cursor pointer
  .sp_anli
    float left
    margin 28px 20px 29px 20px
    height 93px
    width 146px
    background url('./video-btn.png') no-repeat
    bg-image('./video-btn') 
    background-size 146px 93px
    .img1
      margin 7px 40px auto 60px
      height 40px
      width 33px
      background url('./yinongtong-btn1.png') no-repeat
      bg-image('./yinongtong-btn1')
      background-size 33px 40px
    .text1
      width 97px
      height 36px
      font-size 16px
      font-weight bold
      line-height 20px
      margin auto 24px 9px 25px
      font-family Microsoft YaHei
      color #FFFFFF
      text-align center
      text-shadow 0px 3px 2px rgba(76, 76, 76, 0.5)
  .img2
    margin 17px 20px auto auto
    float right
    height 79px
    width 101px
    background url('./yinongtong1.png')
    bg-image('./yinongtong1')
    background-size 101px 79px
  .tozhenliao
    float right
    margin-top 16px
    margin-right 20px
    width 101px
    .text2
      float right
      font-size 16px
      display inline-block
      font-family Microsoft YaHei
      font-weight Regular
      vertical-align center
      padding-right 8px
      color #F79D1D
    .img3
      float right
      width: 11px;
      height 17px
      display inline-block
      background url('./yinongtong-btn.png')
  .img
    width 210px
    height 40px
    background url('./yinongtong.png') no-repeat 100%
    margin 0 auto
    margin-top 15px
  .yinongtong-buttom
    width 195px
    height 55px
    line-height 55px
    background rgba(247, 157, 29, 0)
    border 1px solid rgba(247, 157, 29, 1)
    font-size 18px
    font-weight 400
    color rgba(247, 157, 29, 1)
    cursor pointer
    text-align center
    margin 0 auto
    margin-top 13px
</style>