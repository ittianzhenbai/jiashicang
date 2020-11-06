<template>
    <div class="time">
        {{date}}
    </div>
</template>
<script>
export default {
    data(){
        return{
          date:''  
        }
    },
    created(){
        setInterval(() => {
            this.getDate();
        }, 2000);
    },
    methods:{
    getDate() {
        let myDate = new Date();
        let y = myDate.getFullYear();
        let m = myDate.getMonth() + 1;
        let d = myDate.getDate();
        let h = myDate.getHours();
        let f = myDate.getMinutes();
        if (m < 10) {
            m = `0${m}`;
        }
        if (d < 10) {
            d = `0${d}`;
        }
        if (h < 10) {
            h = `0${h}`;
        }
        if (f < 10) {
            f = `0${f}`;
        }
        this.date = `${y}-${m}-${d}  ${h}:${f}`;
        return this.date;
        }
    }
}
</script>
<style lang="stylus" scoped>
.time
    font-size 14px
    font-family ArialMT
    font-weight 400
    width 120px
    color rgba(127, 181, 241, 1)
</style>