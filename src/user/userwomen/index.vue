<template>
  <div class="mine">
    <div class="details-header">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>关于我们</h1>
      </div>
    </div>
    <div class="women">
      <p >我们的联系方式：</p>
      <p >手机：18039329001</p>
      <p >QQ号：1025145712</p>
      <p>（周一至周五早9点到晚18点）</p>
      <p
       
      >小森阅读是洛阳师范信息技术学院16级学生阮景峰所开发的一款社交化阅读平台。小森阅读平台群包含面向PC后台网站，移动端网站。</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "usermess",
  data() {
    return {
      ruleForm: {}
    };
  },
  inject: ["reload"],
  created() {},
  methods: {
    handleback() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.mine {
  height: 100%;
}
.details-header {
  display: flex;
  justify-content: space-between;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
}
.module-header {
  height: 0.45rem;
  display: flex;
  justify-content: left;
  align-items: center;
}
.module-header .icon {
  margin: 0.1rem 0.18rem;
  color: #33373d;
}
.module-header h1 {
  font-size: 0.16rem;
  color: #33373d;
}
.women {
  padding: 0.2rem;
  height: 5rPem;
}
.women P{
  margin-top: .1rem;
}
</style>

