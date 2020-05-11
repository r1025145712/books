<template>
   <div class="footer-link">
        <a href="#/user" class="footer-link-a jsDownloadLink">首页</a>
        <a href="javascript:" class="footer-link-a dark">触屏版</a>
        <a href="javascript:" class="footer-link-a">电脑版</a>
        <a href="javascript:" class="footer-link-a">帮助</a>
        <a href="javascript:" target="_blank" class="footer-link-a jsLogin">反馈</a>
      </div>
</template>
<script>
export default {
  name: "btm",
  data() {
    return {
    };
  },
  methods: {
    switchon() {}
  }
};
</script>
<style lang="scss">
.footer-link {
    margin-top:.1rem;
    font-size: .14rem;
    height: .4rem;
    display: flex;
    display: -webkit-box;
    display: box;
    padding: .09rem .2rem ;
    background: #fff;
    text-align: center;
    color: #969ba3 ;
    justify-content: space-between;
    -webkit-box-pack: justify;
    box-pack: justify;
}
.footer-link-a {
    display: block;
    padding: .08rem 0;
    -webkit-box-flex: 1;
      color: #969ba3 ;
    box-flex: 1;
}
.dark {
    color: #33373d;
}
</style>