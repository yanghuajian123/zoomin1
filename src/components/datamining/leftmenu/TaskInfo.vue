<template>
  <div class="taskInfo">
    
      <div class="tableInfoStyle">
        <div
          class="el-input-group__prepend">
          工作表
        </div>
        <div class="tableInfo-decoration"></div>
      <el-button
        class="tableInfoBtn"
        @click="dialogTableVisible = true"
        icon="el-icon-folder-opened"
      >

        点击查看工作表信息
      </el-button>
      </div>
      
   

    <el-dialog
      title="工作表信息"
      style="font-weight:900;font-size:30px;"
      :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"

    >

      <a style="float: right;color:#1d8fe1;">显示前30条数据，最近更新时间：{{getTime}}</a>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%;"
        max-height="450"
      >
        <el-table-column
          v-for="(item,index) in fields"
          :key="index"
          :prop=item
          :label=item
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>

    </el-dialog>

  </div>
</template>

<script>
import vueBus from "../vueBus";
  export default {
    data() {
      return {
        dialogTableVisible: false,
        tableData: [],
        fields:[],
        dateString:'',
        getTime:""
      };
    },
    mounted(){
      this.getTime = this.getNowFormatDate();


        vueBus.$on('AxiosDataEcharts', (e) => {

          let jsonObj = e

          for(var i =0 ;i < 30;i++){
              this.tableData[i] = jsonObj[i];
          }
          this.fields = Object.keys(jsonObj[0])
        })
        
    },
    methods: {
        getNowFormatDate() {
      let date = new Date();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let currentDate = date
        .getDate()
        .toString()
        .padStart(2, "0");
      let hours = date
        .getHours()
        .toString()
        .padStart(2, "0");
      let minutes = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let seconds = date
        .getSeconds()
        .toString()
        .padStart(2, "0");
      return `${date.getFullYear()}-${month}-${currentDate} ${hours}:${minutes}:${seconds}`;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        myAiox(){
        return JSON.parse('[{	"RANK": "1111",	"RANK_H": "1291",	"姓名_x": "赵一钦1",	"学校名称": "市三中1",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区1",	"考生号": "170010508"}, {	"RANK": "2222",	"RANK_H": "1292",	"姓名_x": "赵一钦2",	"学校名称": "市三中2",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区2",	"考生号": "170010508"}, {	"RANK": "3333",	"RANK_H": "1293",	"姓名_x": "赵一钦3",	"学校名称": "市三中3",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区3",	"考生号": "170010508"}]')
    }
    }
  };
</script>
<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
.el-input-group__prepend{
  border: 0px solid #dcdfe6;
    background-color: #ffffff;
    font-size: $titleFontSize;
}
.tableInfo-decoration{
  text-align: center;
  width: 100%;
  height: 2px;
  position: relative;
  margin-bottom: 15px;
  margin-top: 10px;
  background-image:$color-decoration1;

}

</style>
