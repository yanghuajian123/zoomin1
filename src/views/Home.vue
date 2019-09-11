<template>
  <div class="background">
    <div
        :class="['background-nav',{'changeNav':isOverScroll}]"
        id="background-nav"
        >
        <!-- <div class="background-nav" id="background-nav"> -->
        <img :src="require('../assets/logo.png')" >
        <div class="background-nav-menu">
          <div>数据导入</div>
          <div>数据处理</div>
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
  methods:{
       Logout(){
        localStorage.setItem("token","");
        localStorage.setItem("username","");
        this.$router.push({
          path:"/"})
      }
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="scss" scoped>
*{
    padding: 0;
    margin: 0;
}
html,body,.background{
    height: 100%;

}
.background{
  background-color: #f6f6f6;
}

</style>