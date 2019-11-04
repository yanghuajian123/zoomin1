<template>
  <div id="app">
    <div>
      <div class="leftBoardStyle" id="leftBoardStyle">
        <el-button @click="btnClick" class="sizeBtn" id="sizeBtn">
          <icon name="angle-left" v-show="iconFlag"></icon>
          <icon name="angle-right" v-show="!iconFlag"></icon>
        </el-button>
        <!-- <transition name="el-zoom-in-center"> -->
        <div v-show="leftVisiable" class="transition-box">
            <LeftMenu></LeftMenu>
          <!-- <TaskInfo style="margin-bottom: 50px" v-show="leftVisiable"></TaskInfo>
          <div class="demo_line_02" id="demo_line_02">
            <span>维度数值</span>
          </div>
          <Drag></Drag> -->
        </div>
        <!-- </transition> -->
      </div>

      <div class="app-border" id="app-border">
        <!-- 由于导航栏的问题，临时下降1px -->
        <div id="drop">
          <!-- <el-card> -->
          <!-- <el-col :span="24"> -->
          <Drop></Drop>
          <!-- </el-col> -->
          <!-- <el-col :span="24"> -->
          <!-- <drop-filter></drop-filter> -->
          <DropFilter></DropFilter>
          <!-- </el-col> -->
          <!-- </el-card> -->
        </div>

        <!-- <div> -->
        <Echarts></Echarts>
        <!-- </div> -->
      </div>

      <div class="rightBoardStyle" id="rightBoardStyle">
        <div>
          <RightMenu/>
        </div>
      </div>
    </div>

    <!-- <axios-distribute></axios-distribute> -->
  </div>
</template>

<script>
import LeftMenu from "../components/dataanalysis/LeftMenu";
// import TaskInfo from "../components/dataanalysis/leftmenu/TaskInfo";
// import Drag from "../components/dataanalysis/leftmenu/Drag";
import Drop from "../components/dataanalysis/Drop";
import DropFilter from "../components/dataanalysis/drop/DropFilter";
import Echarts from "../components/dataanalysis/Echarts";
import RightMenu from "../components/dataanalysis/RightMenu";
// import drop from "./drop";
// import dropFilter from "./dropFilter";
// import echarts from "./echarts";
// import rightBoard from "./rightBoard";
// // import AxiosDistribute from "./AxiosDistribute";
// import tableInfo from "./tableInfo";
import Bus from "../components/dataanalysis/vueBus";

export default {

  components: {
      // Drag,
      // TaskInfo,
      LeftMenu,
      Drop,
      DropFilter,
      Echarts,
      RightMenu
    // drag: drag,
    // drop: drop,
    // echarts: echarts,
    // rightBoard: rightBoard,
    // // AxiosDistribute,
    // dropFilter,
    // tableInfo
  },
  data() {
    return {
      taskId:'',
      isCollapse: true,
      spanParms: [3, 17, 4],
      hackReset: true,
      leftFlag: true,
      iconFlag: true,
      leftVisiable: true,
       dataSetId: Number,
      chartTitle: "图表标题",
      chartId: 15
    };
  },


  
  created() {
    this.$store.commit("changeIndex", { index: "dataAnalysis" });
  },
  methods: {
     //获取数据集
    getDataSet:async function() {
      let query =await this.$post("/task/dataProcessing/showDataSet1", {
        data_set_id: this.dataSetId
        //data_set_id: 15
      });
        // query.then(res => {
        //   console.log(res);
        //   Bus.$emit("AxiosDataDragItem", res.data[0]);
        //   Bus.$emit("AxiosDataEcharts", res.data);
        // });
         Bus.$emit("AxiosDataDragItem", query.data[0]);
          Bus.$emit("AxiosDataEcharts", query.data);
        // .catch(res => {
        //   alert("获取数据失败");
        // });
    },
     
    //图表创建
    createChart() {  
      let query = this.$post("/chart/", {
        data_set: this.dataSetId,
        title: this.chartTitle,
        desc: "",
        chart_type: 1,
        x_axis: "",
        y_axis: "",
        contrast_axis: "",
        secondary_axis: ""
      });
      // console.log(query);
      this.chartId = query.data.id;
      console.log(this.chartId);
      Bus.$emit("chartID", this.chartId);
    },
    btnClick() {
      Bus.$emit("leftChange", this.leftVisiable);
      if (this.leftFlag) this.spanParms = [1, 22, 1];
      else this.spanParms = [3, 17, 4];
      this.leftFlag = !this.leftFlag;
      this.iconFlag = !this.iconFlag;
      this.leftVisiable = !this.leftVisiable;
    }
  },
  mounted() {
    // this.dataSetId=this.$route.params.dataSetId;
    this.taskId=this.$route.params.taskId;
    // console.log(document.getElementById("demo_line_02").offsetTop);
    // console.log(document.getElementById("app-border").offsetHeight);
    // document.getElementById('dragCon').style.height=document.getElementById('app-border').offsetHeight-document.getElementById('demo_line_02').offsetTop-55+'px'
    // document.getElementById('dragCon').style.height = 480 + 'px'
    // document.getElementById("dragCon").style.height =
    //   document.getElementById("app-border").offsetHeight -
    //   document.getElementById("demo_line_02").offsetTop -
    //   50 +
    //   "px";

    document.getElementById("sizeBtn").style.marginTop =
      document.getElementById("app").offsetHeight / 2.5 + "px";

      if (sessionStorage.getItem("dataSetId") === null) {
      this.dataSetId = 0;
    } else {
      // this.dataSetId = this.$route.params.dataSetId;
      this.dataSetId = sessionStorage.getItem("dataSetId");
      Bus.$emit("getDataSetId", this.dataSetId);
      //alert(this.dataSetId)
    }

    this.getDataSet();

    //2.随机生成图表标题
   
    this.chartTitle =
      this.chartTitle + Math.floor(Math.random() * (1000000 - 1 + 1) + 1); //用当前时间(new Date()).valueOf();，创建于2018-9-18-16:32:45

    //3.创建图表信息
    this.createChart();
  }
};
</script>

<style scoped>

.drop {
  min-width: 970px;
  min-height: 100px;
  padding: 20px 30px 20px 0;
}

::-webkit-scrollbar-track {
  border-radius: 2px;
  background: rgba(128, 133, 144, 0.1);
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: rgba(128, 133, 144, 0.2);
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar-button {
  display: block;
  width: 0;
  height: 0;
}

::-webkit-scrollbar {
  width: 15px;
  height: 15px;
  padding: 0;
}

#app {
  font-family: "Microsoft YaHei", "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5a616a;
  overflow: hidden;
}

.app-border {
  position: relative;
  overflow-x: auto;
  height: calc(100vh - 60px);
  margin: 0 270px 0 220px;
  padding: 0 20px;
}

/* 顶替dataProcessing冲突的样式 */
.el-row {
  margin-bottom: 0px;
}

.el-col {
  border-radius: 0px;
}

.sizeBtn {
  width: 1px;
  position: absolute;
  right: 0px;
  margin-top: 30px;
  border: 0;
  z-index: 999;
}

.leftBoardStyle {
  position: fixed;
  z-index: 3;
  overflow-x: hidden;
  overflow-y: auto;
  top: 60px;
  bottom: 0;
  width: 200px;
  padding: 10px;
  background: #fff;
  box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.2);
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

.demo_line_02 {
  height: 1px;
  border-top: 1px solid rgb(200, 200, 200);
  text-align: center;
}

.demo_line_02 span {
  position: relative;
  top: -8px;
  background: #fff;
  padding: 0 20px;
}
</style>
