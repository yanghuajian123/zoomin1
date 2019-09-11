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
        <img :src="require('../../common/image/DataImport/excel.svg')" width="150px" @click="showNewTaskDialog('excel')">
      </div>
      <div class="newtask-add__csv">
        <img :src="require('../../common/image/DataImport/csv.svg')" width="150px" @click="showNewTaskDialog('csv')">

      </div>
    </div>
    <!-- 新建任务输入框 -->
    <div class="newtask-dialog">
        <el-dialog :visible.sync="newTaskDialogVisible" title="新建任务" width="30%">
            <el-form :model="newTask" ref="newTask" :rules="rules2">
                <el-form-item label="任务名:" prop="newTaskName">
                    <el-input type="text" v-model="newTask.newTaskName"></el-input>
                </el-form-item>
                <el-form-item label="数据集名:" prop="newTaskTitle">
                    <el-input type="text" v-model="newTask.newTaskTitle"></el-input>
                </el-form-item>
                 <el-form-item label="数据源:">
                    <el-input type="file" ref="obj" :accept="accept" @click="importFile()"></el-input>
                </el-form-item>
                <el-form-item label="任务描述:" prop="newTaskDesc">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="newTask.newTaskDesc"></el-input>
                </el-form-item>
               
            </el-form>
            <span slot="footer" class="newtask-dialog__footer">
                <el-button @click="newTaskDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newTask()">下一步</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- 新建任务数据预览 -->
    <div class=newtask-dialog__read>
        <el-dialog>
             <span slot="footer" class="newtask-dialog__footer">
                <el-button @click="newTaskDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTask()">创建任务</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>
<script>
import Papaparse from "papaparse";//使用papaparse解析文档
import {converterTwoDimArrayToObjectArray,converterFileToJson,importFile} from "../../utils/fileToJson"
export default {
    data(){
        return{
            newTaskDialogVisible:true,//新建任务框
            newTask:{
                newTaskName:"",
                newTaskDesc:"",
                newTaskFile:"",
                newTaskTitle:""                              
            },//新建任务属性
            //说明导出excel
            accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",

        }
    },
    methods:{
        //新建任务框判断
        showNewTaskDialog(fileType){
            if(fileType == "csv"){
                this.accept = ".csv";
            }
            else{
                this.accept ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";
            }
            this.newTaskDialogVisible = true;
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
.newtask-add{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 10%;
    margin-top: 20px;
}
.newtask-add__excel{
    cursor: pointer;
    padding: 10px 50px;
    border-radius: 20px;
    border: none;
    margin-right: 10px;
}
.newtask-add__excel:hover{
    cursor: pointer;
    box-shadow: #999 0 0 2px 1px;
    transform: scale(1.01,1.01);
}
.newtask-add__csv{
    cursor: pointer;
    padding:10px 50px;
     border-radius: 20px;
    border: none;
}
.newtask-add__csv:hover{
    cursor: pointer;
    box-shadow: #999 0 0 2px 1px;
    transform: scale(1.01,1.01);
}
.newtask-dialog{
    width: 20%;
}
</style>