<template>
  <div class="rightBoardStyle" id="rightBoardStyle">
    <!-- <el-button @click="btnClick" class="sizeBtn" id="sizeBtn">
          <icon name="angle-left" v-show="iconFlag"></icon>
          <icon name="angle-right" v-show="!iconFlag"></icon>
    </el-button>-->
    <!-- 这里按钮还没有添加事件 -->
    <!--<el-scrollbar>-->
      <div class="rightBoardBtn">
        <el-button type="primary" style="width:100%;" @click="nextClick">下一步</el-button>
        <!-- <el-button  class="nextBtn" @click="nextClick">下一步</el-button> -->
        <el-collapse v-model="activeNames" class="rightBoard">
          <el-collapse-item title="图表标题" name="1"  style="text-align:left">
            <Title/>
          </el-collapse-item>
          <el-collapse-item title="模型选择" name="2"  style="text-align:left">
            <modelType/>
          </el-collapse-item>
          <el-collapse-item title="模型选择" name="3"  style="text-align:left" v-show="false">
            <modelType/>
          </el-collapse-item>
          <el-collapse-item title="坐标轴设置" name="4"  style="text-align:left" v-show="axisOptionVisible">
            <AxisOption/>
          </el-collapse-item>
          <el-collapse-item title="图表备注" name="6" style="text-align:left">
            <Tips/>
          </el-collapse-item>
        </el-collapse>
      </div>
  </div>
</template>

<script>
import vueBus from "./vueBus";
import Title from "./rightmenu/Title";
import ModelType from "./rightmenu/ModelType";
import AxisOption from "./rightmenu/AxisOption";
import Tips from "./rightmenu/Tips";
// import rightTips from "./rightOption/rightTips";
// import rightTitle from "./rightOption/rightTitle";
// import rightChartSetting from "./rightOption/rightChartSetting";
// import featureConfiguration from "./rightOption/featureConfiguration";
// import chartStyle from "./rightOption/chartStyle";
// import picFilter from "./rightOption/picFilter";
// import modelType from "./rightOption/modelType";
// import axisOption from "./rightOption/axisOption";

export default {
  components: {
      Title,
      ModelType,
      AxisOption,
      Tips
    // rightTips,
    // rightTitle,
    // rightChartSetting,
    // featureConfiguration,
    // chartStyle,
    // picFilter,
    // modelType,
    // axisOption
  },
  data() {
    return {
      taskId:'',
      dataSetId:'',
      input: "",
      featureConfigurationFlag: false,
      activeNames: ["1", "2", "3", "4", "5", "6"],
      axisOptionVisible: true
    };
  },
  mounted() {
    this.taskId=this.$route.params.taskId;
    this.dataSetId=this.$route.params.dataSetId;
    vueBus.$on("featureConfigurationFlag", e => {
      this.featureConfigurationFlag = e;
    });
    vueBus.$on("modelParmsFlag", type => {
      switch (type) {
        case "线性回归":
          this.axisOptionVisible = true;
          break;
        case "非线性回归":
          this.axisOptionVisible = true;
          break;
        case "K-Means聚类":
          this.axisOptionVisible = false; //关闭坐标轴设置
          break;
        case "Mini Batch K-Means聚类": //关闭坐标轴设置
          this.axisOptionVisible = false;
          break;
        default:
          break;
      }
    });
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
      // document.getElementById("rightBoard").style.height =
      //   this.winHeight * 0.95 + "px";
      //console.log(document.getElementById("rightBoardScrollbar").style.height)
    },
    nextClick() {
      this.$router.push({
        name: "task-release",
        params: {dataSetId:this.dataSetId,taskId:this.taskId}
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>


<style>
/* body {
    width: 100vw;
    overflow: hidden;
    padding-left: calc(100vw - 100%);
  } */
/* .my-scroll-bar{
      height:200px;
  } */
.nextBtn {
  background: #00c587;
  color: #fff;
  border-radius: 7px;
  width: 100%;
}

.nextBtn .el-button {
  background: #00c587;
}

.rightBoardStyle {
  position: fixed;
  z-index: 2;
  overflow-x: hidden;
  overflow-y: auto;
  top: 60px;
  bottom: 0;
  right: 0;
  width: 250px;
  padding: 10px;
  background: #fff;
  box-shadow: -10px 10px 20px -10px rgba(0, 0, 0, 0.2);
}

/* .rightBoard {
  text-align: left;
}

.rightBoard .el-collapse-item__arrow {
  float: left;
}

.rightBoardBtn .el-button--success .is-plain {
  background-color: #000;
} */

.rightBoardBtn{
  padding:5px;
}
</style>
