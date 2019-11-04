<template>
  <div class="newtask-warp">
    <!-- 新建任务标头 -->
    <div class="newtask-header">
      <div class="newtask-header__title">
        <span>新建任务</span>
      </div>

    </div>
    <div class="newtask-header__decoration"></div>
    <!-- 新建任务选择 -->
    <div class="newtask-add">
      <div class="newtask-add__excel">
        <img
          :src="require('../../common/image/DataImport/excel.svg')"
          width="150px"
          @click="showNewTaskDialog('excel')"
        >
      </div>
      <div class="newtask-add__csv">
        <img
          :src="require('../../common/image/DataImport/csv.svg')"
          width="150px"
          @click="showNewTaskDialog('csv')"
        >

      </div>
    </div>
    <!-- 新建任务输入框 -->
    <div class="newtask-dialog">
      <el-dialog
        :visible.sync="newTaskDialogVisible"
        title="新建任务"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form
          :model="newTaskDetail"
          ref="newTask"
          :rules="rules"
        >
          <el-form-item
            label="任务名:"
            prop="newTaskName"
          >
            <el-input
              type="text"
              v-model="newTaskDetail.newTaskName"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="数据集名:"
            prop="newTaskTitle"
          >
            <el-input
              type="text"
              v-model="newTaskDetail.newTaskTitle"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据源:">
            <input
              type="file"
              ref="obj"
              @change="importFile()"
              :accept="accept"
            >
          </el-form-item>
          <el-form-item
            label="任务描述:"
            prop="newTaskDesc"
          >
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="newTaskDetail.newTaskDesc"
            ></el-input>
          </el-form-item>

        </el-form>
        <span
          slot="footer"
          class="newtask-dialog__footer"
        >
          <el-button @click="newTaskDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="nextTask"
          >下一步</el-button>
          <!-- <el-button
            type="primary"
            @click="upLoadTask"
          >创建</el-button> -->
        </span>
      </el-dialog>
    </div>
    <!-- 新建任务数据预览 -->
    <div class=newtask-dialog__read>
      <el-dialog
        :visible.sync="newTaskLoadingVisible"
        title="数据预览"
        width="30%"
        :modal-append-to-body="false"
      >
      <LoadTask :json="tablejsons" v-on:setTitleIndex="setTitleIndex"></LoadTask>
        <span
          slot="footer"
          class="newtask-dialog__footer"
        >
          <el-button @click="newTaskLoadingVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="upLoadTask"
          >创建任务</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import LoadTask from "./LoadTask";
import Papaparse from "papaparse"; //使用papaparse解析文档
import validateRules from "../../utils/validateRules"; //引入验证
import {
  converterTwoDimArrayToObjectArray,
  converterFileToJson,
  importf
} from "../../utils/fileToJson";
export default {
    components:{
LoadTask
    },
  data() {
    return {
      tablejsons: null, //数据json
      newTaskLoadingVisible: false,
      newTaskDialogVisible: false, //新建任务框
      id: 0,
      titleIndex:1,
      newTaskDetail: {
        newTaskName: "",
        newTaskDesc: "",
        newTaskFile: "",
        newTaskTitle: ""
      }, //新建任务属性
      //验证任务名和数据集名
      rules: {
        newTaskName: [
          { validator: validateRules.validateName, trigger: "blur" }
          //   { required: true, message: "请输入任务名", trigger: "blur" },
          //   { max: 15, message: "长度不能超过15个字符", trigger: "blur" }
        ],
        newTaskTitle: [
          { validator: validateRules.validateTitle, trigger: "blur" }
        ]
      },

      //说明导出excel
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    };
  },
  methods: {
    //新建任务框判断
    showNewTaskDialog(fileType) {
      if (fileType == "csv") {
        this.accept = ".csv";
      } else {
        this.accept =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";
      }
      this.newTaskDialogVisible = true;
    },
    //导入文件
    importFile:function() {
      let obj = this.$refs.obj;
      let fileType = obj.value.substring(
        obj.value.lastIndexOf("."),
        obj.value.length
      );
      let _this = this;
      if (fileType == ".csv") {
        var file = obj.files[0];
        Papa.parse(file, {
          complete(results) {
            _this.tablejsons = converterTwoDimArrayToObjectArray(results.data);
            console.log(_this.tablejsons);
          }
        });
      } 
      else {
        let jsonPromise = converterFileToJson(obj);
        jsonPromise.then(data => {
          this.tablejsons = data;
        });
      }
    },
    setTitleIndex: function(index) {
      this.titleIndex = index;
    },
    //新建任务下一步
    nextTask() {
      this.$refs.newTask.validate(vaild => {
        if (vaild) {
          if (this.$refs.obj.value == "") {
            this.$message({
              message: "请选择数据源",
              type: "warning",
              duration: 1500
            });
          } else {
            // 新建任务
            const loading = this.$loading({
              lock: true,
              text: "新建任务中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let query = this.$post(
              "/taskinfo/",
              {
                task_name: this.newTaskDetail.newTaskName,
                task_desc: this.newTaskDetail.newTaskDesc
              },
              false
            );
            query
              .then(res => {
                console.log(res);
                this.id = res.data.id;
               
                this.newTaskLoadingVisible = true;
                 this.newTaskDialogVisible = false;
                                loading.close();

                
              })
              .catch(err => {
                //   console.log("chucuo");
                loading.close();
                this.$message({
                    // message:"chucuo",
                  message: err.res.data.non_field_errors[0],
                  type: "warning",
                  duration: 1500
                });
              });
          }
        }
      });
    },
    //上传任务
    upLoadTask() {
    //   const loading = this.$loading({
    //     lock: true,
    //     message: "上传任务中...",
    //     background: "#d8d8d8",
    //     spinner: ""
    //   });
      this.$post("/dataSet/", {
        task: this.id,
        step1: "1",
        step2: "2",
        step3: "3",
        stepX1: "x1",
        title: this.newTaskDetail.newTaskTitle,
        row_num: (this.titleIndex - 1).toString(),
        data_set: this.tablejsons
      })
        .then(res => {
          var dataSetId = res.data.id;
          //创建完成之后，跳转到数据处理页面，传任务ID
          loading.close();
          this.$router.push(`/home/data-processing/${dataSetId}`);
        })
        .catch(err => {
          console.log(err);
        //   loading.close();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.newtask-warp {
  height: 100%;
  padding: 20px;
  background-color: white;
  margin: 10px 10% 10px 10%;
}
.newtask-header {
  display: flex;
  color: #999;
  justify-content: flex-start;
  margin: 0 10%;
}
.newtask-header__title {
  font-size: 30px;
  font-weight: 900;
}
.newtask-header__decoration {
  margin-left: 10%;
  margin-top: 10px;
  height: 5px;
  width: 80%;
  border-radius: 20px;
  background-image: linear-gradient(300deg, #697ded 0%, #5e30c1 100%);
}
.newtask-add {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10%;
  margin-top: 20px;
}
.newtask-add__excel {
  cursor: pointer;
  padding: 10px 50px;
  border-radius: 20px;
  border: none;
  margin-right: 10px;
}
.newtask-add__excel:hover {
  cursor: pointer;
  box-shadow: #999 0 0 2px 1px;
  transform: scale(1.01, 1.01);
}
.newtask-add__csv {
  cursor: pointer;
  padding: 10px 50px;
  border-radius: 20px;
  border: none;
}
.newtask-add__csv:hover {
  cursor: pointer;
  box-shadow: #999 0 0 2px 1px;
  transform: scale(1.01, 1.01);
}
.newtask-dialog {
  width: 20%;
}
</style>