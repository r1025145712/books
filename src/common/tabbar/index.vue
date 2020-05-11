<template>
  <aside class="page-menu">
    <!-- class="on"  -->
    <router-link v-for="item in tabs" :key="item.id" :to="item.path" tag="a">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="item.icon" />
      </svg>
      {{item.text}}
    </router-link>
  </aside>
</template>
<script>
export default {
  name: "tabbar",
  data() {
    return {
      tabs: [
        {
          id: 0,
          text: "书架",
          icon: "#iconjiachang_shujia",
          path: "/user/bookshelf"
        },
        {
          id: 1,
          text: "精选",
          icon: "#iconjingxuan1",
          path: "/user/jingxuan"
        },
        {
          id: 2,
          text: "我的",
          icon: "#iconwode1",
          path: "/user/mine"
        }
      ]
    };
  },
  methods: {
    switchon() {}
  }
};
</script>
<style lang="scss">
.page-menu {
  box-shadow: 0 0 0.32rem 0.02rem rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.96);
  display: flex;
  height: 0.5rem;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  a {
    display: inline-block;
    width: 20%;
    position: relative;
    padding-top: 0.22rem;
    padding-bottom: 0.001rem;
    font-size: 0.12rem;
    svg {
      font-size: 0.2rem;
      display: block;
      position: absolute;
      top: 0.01rem;
      left: 50%;
      margin-left: -0.1rem;
    }
  }
  .router-link-active {
    color: red;
    svg {
      color: red;
    }
  }
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>