<template>
  <div id="rightBoard" style="position:relative;">
    <transition name="el-zoom-in-center">
      <div v-show="rightVisiable" class="transition-box">
        <!--<el-scrollbar>-->
        <div style="margin:10px;" class="rightBoardBtn">
          <el-button type="primary" style="width:100%;" @click="nextClick">下一步</el-button>
          <!-- <el-button  class="nextBtn" @click="nextClick">下一步</el-button> -->
          <el-collapse v-model="activeNames" class="rightBoard itemTitle" accordion>
            <el-collapse-item title="图表标题" name="1">
              <Title/>
            </el-collapse-item>
            <el-collapse-item title="图表类型" name="2">
              <ChartSetting/>
            </el-collapse-item>
            <el-collapse-item title="图表样式" name="3">
              <ChartStyle/>
            </el-collapse-item>
            <el-collapse-item title="功能配置" name="4">
              <Configuration/>
            </el-collapse-item>
            <el-collapse-item title="图内筛选器" name="5">
              <PicFilter/>
            </el-collapse-item>
            <el-collapse-item title="坐标轴设置" name="6">
              <AxisOption/>
            </el-collapse-item>
            <el-collapse-item title="图表备注" name="7">
              <Tips/>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!--</el-scrollbar>-->
      </div>
    </transition>

  </div>
</template>

<script>
  import Bus from "./vueBus";
  import Tips from "./rightmenu/Tips";
  import Title from "./rightmenu/Title";
  import ChartSetting from "./rightmenu/ChartSetting";
  import Configuration from "./rightmenu/Configuration";
  import ChartStyle from "./rightmenu/ChartStyle";
  import draggable from "vuedraggable";
  import PicFilter from "./rightmenu/PicFilter";
  import AxisOption from "./rightmenu/AxisOption";

  export default {
    components: {
      Tips,
      Title,
      ChartSetting,
      PicFilter,
      Configuration,
      ChartStyle,
      draggable,
      AxisOption
    },
    data() {
      return {
        input: "",
        featureConfigurationFlag: false,
        activeNames: ['1', '2', '3', '4', '5', '6', '7'],
        rightVisiable: true,
        dataSetId: '',
        taskId:''
      };
    },
    mounted() {
      this.dataSetId=this.$route.params.dataSetId;
    this.taskId=this.$route.params.taskId;
      document.getElementById('rightBoard').style.height = document.getElementById('app-border').offsetHeight-25+'px';
      // console.log(document.getElementById('app-border').offsetHeight)
      Bus.$on("featureConfigurationFlag", e => {
        this.featureConfigurationFlag = e;
      });
      Bus.$on('leftChange', (Visiable) => {
        this.rightVisiable = !Visiable
      })
      Bus.$on('getDataSetId', (e) => {
        this.dataSetId = e
      })
      this.autoDivSize();
    },
    methods: {
      autoDivSize() {
        if (window.innerHeight) this.winHeight = window.innerHeight;
        else if (document.body && document.body.clientHeight)
        //通过深入Document内部对body进行检测，获取浏览器窗口高度
          this.winHeight = document.body.clientHeight;
        if (document.documentElement && document.documentElement.clientHeight)
          this.winHeight = document.documentElement.clientHeight;

        if (window.innerWidth) this.winWidth = window.innerWidth;
        else if (document.body && document.body.clientWidth)
        //通过深入Document内部对body进行检测，获取浏览器窗口高度
          this.winWidth = document.body.clientWidth;
        if (document.documentElement && document.documentElement.clientWidth)
          this.winWidth = document.documentElement.clientWidth;

        //DIV高度为浏览器窗口的高度
        // document.getElementById("rightBoard").style.height = this.winHeight * 0.95 + "px";
        // document.getElementById("rightBoard").style.height = document.getElementById('app-border').offsetHeight + 26 + 'px';
        //console.log(document.getElementById("rightBoardScrollbar").style.height)
      },
      nextClick() {
        Bus.$emit("saveCharts");
        this.$router.push({
          name: "data-mining",
          params: {dataSetId: this.dataSetId,taskId:this.taskId}
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/common/scss/variable";
  html {
    overflow-x: hidden;
  }
  .itemTitle /deep/ .el-collapse-item__header{
    font-size: $elCollapseItemTitleFontSize;
    color:$elCollapseItemTitleColor;
    font-family: $fontfamily;

  }

  /* body {
    width: 100vw;
    overflow: hidden;
    padding-left: calc(100vw - 100%);
  } */
  /* .my-scroll-bar{
      height:200px;
  } */
</style>
