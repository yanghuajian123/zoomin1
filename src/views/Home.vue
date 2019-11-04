<template>
  <div class="background">
    <div
      class="background-nav"
      id="background-nav"
    >
      <!-- <div class="background-nav" id="background-nav"> -->
      <img :src="require('../assets/logo.png')">
      <div class="background-nav-menu">
        <div>
          <router-link to="/home/data-import">数据导入</router-link>
        </div>
        <div>
          <router-link to="/home/data-processing/id">数据处理</router-link>
        </div>
        <div>数据分析</div>
        <div>数据挖掘</div>
        <div>任务发布</div>
      </div>

      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon>用户中心</el-dropdown-item>
          <el-dropdown-item icon>帮助</el-dropdown-item>
          <el-dropdown-item icon>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="background-wrap">

      <router-view></router-view>
    </div>
    <Footer></Footer>

  </div>
</template>
<script>
import Header from "../base/header/header";
import Footer from "../base/footer/footer";
export default {
  data() {
    return {};
  },
  computed: {
    activeIndex: function() {
      return $store.getters.activeIndex;
    }
  },
  methods: {
    Logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
      this.$router.push({
        path: "/"
      });
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
* {
  padding: 0;
  margin: 0;
}
html,
body,
.background {
  height: 100%;
  -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
   z-index: 1;
}
.background {
  background-color: $defaultBackgroundColor;
  // background-image: $color-background;
}
.background-nav-menu a {
  text-decoration: none;
  color: #fff;
}
</style>