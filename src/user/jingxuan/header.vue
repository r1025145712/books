<template>
  <div class="header">
    <header>
      <div class="logo-a">
        <h1>小森阅读</h1>
      </div>
      <nav class="btn-group">
        <div :class="'btn-tab'+ active" @click="man">男生</div>
        <div :class="'btn-tab'+ active1" @click="women">女生</div>
      </nav>
      <div class="header-right">
        <a>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconcaidan" />
          </svg>
        </a>
          <a href="#/user/search">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconsousuo" />
          </svg>
        </a>
      </div>
    </header>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "mine",
  components: {},
  created() {
    document.title = this.$route.meta.title;
  },
  data() {
    return {
      active: "  active",
      active1: "",
      sort:"男频",
      sort1:"女频"
    };
  },
  created(){
    this.$store.dispatch("books/handleActionsSort",this.sort);
  },
  methods: {
    man() {
      this.active = "   active";
      this.active1 = "";
       this.$store.dispatch("books/handleActionsSort",this.sort);
        this.$store.dispatch("books/handleActionsRecommend");
      this.$store.dispatch("books/handleActionsRemendata");
          this.$store.dispatch("books/handleActionsNewbooks");
           this.$store.dispatch("books/handleActionsCollect");
    },
    women() {
      this.active1 = "  active";
      this.active = "";
        this.$store.dispatch("books/handleActionsSort",this.sort1);
        this.$store.dispatch("books/handleActionsRecommend");
      this.$store.dispatch("books/handleActionsRemendata");
        this.$store.dispatch("books/handleActionsNewbooks");
        this.$store.dispatch("books/handleActionsCollect");
     
    }
  }
};
</script>
<style scoped>
.header{
    width: 100%;
    background-color: #fff;
}
header {
  height: 0.45rem;
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f1f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-a {
  width: 1.2rem;
  padding: 0 0.16rem;
  height: 0.45rem;
}
.logo-a h1 {
  line-height: 0.45rem;
  font-weight: bold;
  font-size: 0.18rem;
}
.btn-group {
  width: 1.2rem;
  height: 0.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-tab:nth-child(1) {
  width: 0.5rem;
  border-radius: 4px 0 0 4px;
  text-align: center;
  color: #ed424b;
  border: 1px solid #ed424b;
}
.btn-tab:nth-child(2) {
  width: 0.5rem;
  border-radius: 0 4px 4px 0;
  text-align: center;
  color: #ed424b;
  border: 1px solid #ed424b;
}
.btn-tab.active {
  color: #fff;
  background-color: #ed424b;
}
.header-right {
  width: 1.2rem;
  height: 0.45rem;
}
.header-right a{
  width: .36rem;
  height: .45rem;
    line-height: .45rem;
  float: right;
  margin-right:.1rem ;
}
.header-right svg {
  width: 0.24rem;
  height: 0.24rem;
  font-size: 0.24rem;

  color: #ed424b;
}
</style>

