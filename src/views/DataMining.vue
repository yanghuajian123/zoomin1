<template>
  <div id="app">
    <div>
      <div class="leftBoardStyle" id="leftBoardStyle">
        <el-button @click="btnClick" class="sizeBtn" id="sizeBtn">
          <icon name="angle-left" v-show="iconFlag"></icon>
          <icon name="angle-right" v-show="!iconFlag"></icon>
        </el-button>
        <div v-show="leftFlag">
          <LeftMenu style="margin-bottom: 30px"></LeftMenu>
          <!-- <drag></drag> -->
        </div>
      </div>

        <div class="app-border" id="app-border">
          <!-- 由于导航栏的问题，临时下降1px -->
          <div id="drop">
            <div>
              <div v-if="status=='回归分析'">
                <div>
                  <Drop></Drop>
                </div>
              </div>
              <div v-if="status=='回归分析'">
                <div>
                  <ModelParms></ModelParms>
                </div>
              </div>
              <ClusterParms v-else-if="status=='聚类分析'" style="margin:-15px"></ClusterParms>
            </div>
          </div>

          <div>
            <Echarts></Echarts>
          </div>
        </div>

        <!--<vue-scroll >-->
        <div v-show="leftFlag">
          <RightMenu/>
        </div>
        <!--</vue-scroll>-->
    </div>

  </div>
</template>

<script>
// import drag from "./drag";
// import drop from "./drop";
// import dropFilter from "./dropFilter";
import Drop from  "../components/datamining/Drop";
import Echarts from "../components/datamining/Echarts";
import vueBus from "../components/datamining/vueBus";
import ModelParms from "../components/datamining/parms/ModelParms";
import LeftMenu from "../components/datamining/LeftMenu";
import RightMenu from "../components/datamining/RightMenu";
// import rightBoard from "./rightBoard";
// import AxiosDistribute from "./AxiosDistribute";
// import tableInfo from "../data-analysis/tableInfo";
// import modelParms from "./modelParms";
// import Bus from "./Bus.js";
// import ClusterParms from "./ClusterParms";

export default {
//   name: "App",
  components: {
    // drag: drag,
    // drop: drop,
    Echarts,
    Drop,
    ModelParms,
    LeftMenu,
    RightMenu
    // echarts: echarts,
    // rightBoard: rightBoard,
    // AxiosDistribute,
    // dropFilter,
    // tableInfo,
    // modelParms,
    // ClusterParms
  },
  data() {
    return {
      isCollapse: true,
      spanParms: [3, 17, 4],
      hackReset: true,
      leftFlag: true,
      iconFlag: true,
      status: "回归分析"
    };
  },
  created() {
    this.$store.commit("changeIndex", { index: "dataMining" });
  },
  mounted() {
    if(sessionStorage.getItem("dataSetId") === null){
      this.dataSetId = 0;
    }else{
      this.dataSetId = sessionStorage.getItem("dataSetId");
      vueBus.$emit("getMiningDataSetId",this.dataSetId);
    }
    this.getDataSet();
    // document.getElementById("sizeBtn").style.marginTop =
    //   document.getElementById("app").offsetHeight / 4 + "px";
    vueBus.$on("modelParmsFlag", modelType => {
      switch (modelType) {
        case "线性回归":
          this.status = "回归分析";
          break;
        case "非线性回归":
          this.status = "回归分析";
          break;
        case "K-Means聚类":
          this.status = "聚类分析";
          break;
        case "Mini Batch K-Means聚类":
          this.status = "聚类分析";
          break;

        default:
          break;
      }
    });
  },
  methods: {
    //获取数据集
    getDataSet:async function(){
      let query = await this.$post("/task/dataProcessing/showDataSet1",{
        data_set_id:this.dataSetId
      });
      vueBus.$emit("AxiosDataEcharts",query.data);
      vueBus.$emit("AxiosDataDragItem",query.data[0]);
    },
    btnClick() {
      vueBus.$emit("leftChange", this.leftFlag);
      if (this.leftFlag) this.spanParms = [1, 22, 1];
      else this.spanParms = [3, 17, 4];
      this.leftFlag = !this.leftFlag;
      this.iconFlag = !this.iconFlag;
    }
  }
};
</script>

<style scoped>
#drop {
  min-width: 970px;
  /* min-height: 100px; */
  padding: 20px 0 10px 0;
}
html {
  overflow-x: hidden;
  overflow-y: hidden;
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

.dataMing-border-left {
  border-right: 1px;
  border-right-style: solid;
  border-color: #d0d0d0;
  box-shadow: -2px 0 1px -1px #888888;
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
  top: 50%;
  border: 0px;
  z-index: 999;
  transform: translateY(-50%);
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
</style>

