<template>
  <el-container style="height:100%">
    <Left
      :dataSetList="dataSetList"
      :dataSetId="dataSetId"
    >
    </Left>
    <el-container>
      <el-main>
        <el-tabs
          v-model="activeName"
          type="border-card"
          style="height: 100%"
        >
          <el-tab-pane
            label="数据预览"
            name="first"
            style="width:100%"
          >
            <div>
              <el-row
                :gutter="20"
                style="text-align:left;padding-left:20px;margin-bottom: 0px;"
              >
                <el-button
                  type="text"
                  @click="showFiltVisible"
                >
                  数据筛选
                  <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-button
                  type="text"
                  @click="addNewField"
                >
                  新增字段
                </el-button>
                <el-button
                  type="text"
                  @click="dealwithNull"
                >
                  空值处理
                </el-button>
                <el-button
                  type="primary"
                  style="float:right;margin-right:20px"
                  @click="saveAndGoDataAnalysis"
                >下一步
                </el-button>
              </el-row>
              <el-row style="text-align:left;padding-left:10px">
                <div v-if="isShowFiltVisible">
                  <span style="font-size:14px">筛选方式：</span>
                  <el-radio
                    v-model="filtType"
                    label="1"
                  >条件筛选</el-radio>
                  <el-radio
                    v-model="filtType"
                    label="2"
                  >语句筛选</el-radio>
                </div>
                <el-row>
                  <!-- 条件筛选 -->
                  <div
                    v-if="filtType=='1'&&isShowFiltVisible"
                    style="padding-right:30px;"
                  >
                    <condition-filter
                      :dataSetId="dataSetId"
                      :keys="tableKeys"
                      :keyTypes="tableKeysType"
                      v-on:refresh="refreshData"
                    ></condition-filter>
                  </div>
                  <div v-if="filtType=='2'&&isShowFiltVisible">
                    语句筛选内容
                  </div>
                </el-row>
                <div style="padding-top:30px;width:100%;margin:0 auto;">
                  <div v-if="IsEmptyDataSetList">
                    <empty-task>
                      <template slot="404Message">
                        <p>数据集内容空空如也！</p>
                        <p>请重新新建任务，再进行数据处理！</p>
                      </template>
                    </empty-task>
                  </div>
                  <div v-if="IsEmptyDataSet&&!IsEmptyDataSetList">
                    <empty-task>
                      <template slot="404Message">
                        <p>数据集内容空空如也！</p>
                        <p>可能是被您过滤完了。</p>
                      </template>
                    </empty-task>
                  </div>

                  <div class="items-text">当前显示<span class="emphasize-number">{{showItem}}</span>条,该数据集一共有<span class="emphasize-number">{{allItems}}</span>条数据
                  </div>
                  <el-pagination
                    :page-size="100"
                    :pager-count="11"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange"
                    layout="total,prev, pager, next"
                    :total="total"
                    style="float:right"
                  >
                  </el-pagination>
                  <!-- 数据列表 -->
                  <MyTable
                    v-show="!IsEmptyDataSet"
                    :loading="tableLoading"
                    :data="tempTableData"
                    :header="tableKeys"
                    :option="tableOption"
                    :keyVisibilitys="keyVisibilitys"
                    :types="tableKeysTypeObject"
                    @changeHeaderName="changeHeaderName"
                    @updateTableKeys="updateTableKeys"
                    @updateTableTypes="updateTableTypes"
                  >
                    <el-table-column
                      slot="fixed"
                      fixed
                      type="index"
                      width="50"
                    >
                    </el-table-column>
                  </MyTable>
                </div>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="字段设置"
            name="second"
          >
            <el-row>
              <!-- 字段设置 -->
              <batch-operation
                :tablePropertys="tablePropertys"
                v-on:updateTableProperty="updateTableProperty"
              ></batch-operation>
            </el-row>
          </el-tab-pane>

        </el-tabs>
      </el-main>
    </el-container>

    <el-dialog
      title="修改列名/类型"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-form-item label="字段类型">
          <type-select
            v-model="newColumnType"
            :placeholder="`请选择`"
          ></type-select>
        </el-form-item>
        <el-form-item label="字段名称">
          <el-input
            v-model="newColumnName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="renewColumnName()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="增加新字段"
      :visible.sync="addFieldDialogVisible"
      width="30%"
    >
      <new-field-form
        ref="newFiledRef"
        :fields="tableKeys"
        :types="tableKeysType"
        :dataSetId="dataSetId"
        @refreshData="refreshData"
      ></new-field-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addFieldDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addField"
        >确 定</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>
<script>
//首页
import Left from "../components/dataprocessing/DataSetLeft";
import ConditionFilter from "../components/dataprocessing/ConditionFilter";
import MyTable from "../components/dataprocessing/MyTable";
import BatchOperation from "../components/dataprocessing/BatchOperation";
import NewFieldForm from "../components/dataprocessing/NewFieldForm";
import TypeSelect from "../components/dataprocessing/TypeSelect";
// import EmptyTask from "../common/EmptyTask";
import { TYPECONVERTER, JsonParse } from "../utils/commonFunction";

function tableProperty(
  keyVisibility,
  originKey,
  tableKey,
  keyType,
  keyDesc,
  isNew = false
) {
  this.keyVisibility = keyVisibility;
  this.originKey = originKey;
  this.tableKey = tableKey;
  this.keyType = keyType;
  this.keyDesc = keyDesc;
  this.isNew = isNew;
}

function deepCopy(obj) {
  if (typeof obj != "object") {
    return obj;
  }
  var newobj = {};
  for (var attr in obj) {
    newobj[attr] = deepCopy(obj[attr]);
  }
  return newobj;
}

export default {
  components: {
    Left,
    ConditionFilter,
    MyTable,
    BatchOperation,
    NewFieldForm,
    TypeSelect
    // EmptyTask
  },
  data() {
    return {
      total:1000,//总数据数
      currentPage:1,//当前目录
      bigData:[],//分页总数据集


      taskId: 58,
      dataSetId: Number, //数据集id
      dataSetList: [], //左边数据集列表
      tableData: [], //表格数据
      tableKeys: [], //表格表头
      allItems: 0, //所有条目数

      //条件过滤选项
      filtType: "1", //条件过滤默认
      isShowFiltVisible: false,

      activeName: "first",
      dialogVisible: false,
      addFieldDialogVisible: false,
      IsEmptyDataSetList: false,
      IsEmptyDataSet: false,
      tableLoading: true,
      tableOption: {
        border: true,
        maxHeight: document.body.clientHeight - 300
      },

      //修改列名
      changeColumnIndex: 0,
      newColumnName: "",
      newColumnType: "",

      keyVisibilitysObject: Object,
      tableKeysTypeObject: Object,
      keyDesc: Object,
      originKeyObject: Object
    };
  },
  computed: {
    tempTableData: {
      get() {
        var tempTableData = [];
        for (let i = 0; i < this.tableData.length; i++) {
          let obj = this.tableData[i];
          if (typeof obj == "object") {
            var newobj = {};
            for (let attr in obj) {
              if (this.keyVisibilitysObject[attr]) {
                newobj[attr] = obj[attr];
              }
            }
            tempTableData.push(newobj);
          }
        }
        return tempTableData;
      },
      set() {}
    },
    keyVisibilitys: {
      get() {
        var keyVisibilitys = [];
        // 匹配正确的key-value
        this.tableKeys.forEach(tablekey => {
          tablekey = tablekey.trim();
          keyVisibilitys.push(this.keyVisibilitysObject[tablekey]);
        });
        return keyVisibilitys;
      },
      set() {}
    },
    tableKeysType: {
      get() {
        var tableKeysTypes = [];
        // 匹配正确的key-value
        this.tableKeys.forEach(tablekey => {
          tablekey = tablekey.trim();
          tableKeysTypes.push(this.tableKeysTypeObject[tablekey]);
        });
        return tableKeysTypes;
      },
      set() {}
    },
    //字段设置
    tablePropertys: {
      get() {
        var tablePropertys = {};
        for (var i = 0; i < this.tableKeys.length; i++) {
          let key = this.tableKeys[i].trim();
          tablePropertys[key] = new tableProperty(
            this.keyVisibilitys[i],
            this.originKeyObject[key],
            key,
            this.tableKeysTypeObject[key],
            this.keyDesc[key]
          );
        }
        return tablePropertys;
      },
      set(tablePropertyObject) {
        this.tableKeys = Object.keys(tablePropertyObject);
        for (let key in tablePropertyObject) {
          if (
            !TYPECONVERTER.symbols.includes(tablePropertyObject[key].keyType)
          ) {
            tablePropertyObject[key].keyType = tablePropertyObject[key].keyType;
          }
          this.tableKeysTypeObject[key] = tablePropertyObject[key].keyType;
          this.keyDesc[key] = tablePropertyObject[key].keyDesc;
          this.originKeyObject[key] = tablePropertyObject[key].originKey;
          this.keyVisibilitysObject[key] =
            tablePropertyObject[key].keyVisibility;
        }
      }
    },
    //当前显示条数
    showItem: {
      get() {
        return this.tableData.length;
      }
    }
  },
  created() {
    //保存当前页面menu的状态
    this.$store.commit("changeIndex", { index: "dataProcessing" });

    //this.$route.params.id接受参数
    this.dataSetId = this.$route.params.dataSetId;
    this.getAllDataSet();
    //   let query = this.getAllDataSet();
    //   query.then(response => {
    //     this.dataSetList = response;
    //     this.fetch();
    //   });
  },

  methods: {
    //分页处理
    handleCurrentChange(val){
      this.currentPage = val;
      this.tableData = this.bigData.slice(0+100*(val - 1), 100*val);

    },
    //获取数据集内容
    getAllDataSet() {
      let query = this.$get("/dataSet/");
      query.then(res => {
        this.dataSetList = res;
        this.fetch();
      });
      // return this.$get("/dataSet/");
    },
    // 初始化数据，拉取表格数据，
    // 参数，data_set_id
    // 返回json
    fetch() {
      //如果不是router传过来的dataSetId
      // if (typeof this.dataSetId == "undefined") {
      //   if (
      //     this.dataSetList.length == 0 ||
      //     this.dataSetList[0].id == "undefined"
      //   ) {
      //     this.IsEmptyDataSet = true;
      //     return;
      //   }
      //   if (typeof this.$store.getters.lastActiveDataSetId == Number) {
      //     this.dataSetId = this.$store.getters.lastActiveDataSetId;
      //   } else {
      //     this.dataSetId = this.dataSetList[0].id;
      //   }
      // }
      // if (this.IsEmptyDataSet) {
      //   return;
      // }
      // this.$store.commit("changeDataProcessingActiveDataSetId", {
      //   dataSetId: this.dataSetId
      // });
      if (this.dataSetId == "" || typeof this.dataSetId == "undefined") {
        if (this.$route.params.id) {
          this.dataSetId = this.$route.params.id;
          let dataSetArray = this.dataSetList;
          this.taskId = dataSetArray.filter(
            item => item.id === parseInt(this.dataSetId)
          )[0].task;
          this.$router.push(`/home/data-processing/${this.dataSetId}`);
        } 
        else {
          if (
            this.dataSetList.length == 0 ||
            this.dataSetList[0].id == "undefined"
          ) {
            this.IsEmptyDataSetList = true;
            return;
          } 
          else {
            this.IsEmptyDataSetList = false;
            this.dataSetId = this.dataSetList[0].id;
            this.taskId = this.dataSetList[0].task;
            this.$router.push(`/home/data-processing/${this.dataSetId}`);
          }
        }
      }

      this.tableLoading = true;
      this.tableData = [];
      this.$post("/task/dataProcessing/showDataSet3", {
        data_set_id: this.dataSetId
      })
        .then(res => {
          this.allItems = res.data.length;
          this.total = res.data.length;
          this.bigData = res.data;
          this.tableData = res.data.slice(0, 100);
          this.IsEmptyDataSet = this.tableData.length <= 0 ? true : false;
          if (this.IsEmptyDataSet) {
            this.tableData = [];
            return;
          }
          console.log(this.tableData);
          this.tableKeys = Object.keys(this.tableData[0]);
          console.log(this.tableKeys);
          if (this.tableKeys.length > 0) {
            this.$post("/task/dataProcessing/showDtypes", {
              data_set_id: this.dataSetId
            }).then(res => {
              // 用来存储字段类型
              var tableKeysTypes = [];
              // 将后端传回的字符串转换为Object
              // 类型
              this.tableKeysTypeObject = JsonParse.looseJsonParse(res.data);
              this.keyVisibilitysObject = deepCopy(this.tableKeysTypeObject);
              for (let key in this.tableKeysTypeObject) {
                if (this.tableKeysTypeObject[key] == "int64") {
                  this.tableKeysTypeObject[key] = "float64";
                }
                this.keyVisibilitysObject[key] = true;
              }
              this.keyVisibilitys = new Array(this.tableKeys.length);
              for (let index = 0; index < this.keyVisibilitys.length; index++) {
                this.keyVisibilitys[index] = true;
              }
              this.tableLoading = false;
            });

            // 字段描述
            this.$post("/task/dataProcessing/showDesc", {
              data_set_id: this.dataSetId
            }).then(res => {
              this.keyDesc = JsonParse.looseJsonParse(res.data);
            });
            // 列名
            this.$post("/task/dataProcessing/showOriginColumnsName", {
              data_set_id: this.dataSetId
            }).then(res => {
              this.originKeyObject = JsonParse.looseJsonParse(res.data);
            });
          }
        })
        .catch(error => {
          alert("获取数据失败");
        })
        .then(() => {
          this.tableLoading = false;
        });
    },
    //条件筛选显示
    showFiltVisible() {
      if (this.isShowFiltVisible === false) {
        this.isShowFiltVisible = true;
      } else {
        this.isShowFiltVisible = false;
      }
    },
    changeHeaderName(e) {
      var changeKey = e.target.id;
      this.changeColumnIndex = this.tableKeys.indexOf(changeKey);
      this.newColumnName = this.tableKeys[this.changeColumnIndex];
      this.newColumnType = this.tableKeysType[this.changeColumnIndex];
      this.dialogVisible = true;
    },
    //更新列名的方法
    renewColumnName() {
      //判断是否有改内容
      if (
        this.tableKeysType[this.changeColumnIndex] == this.newColumnType &&
        this.tableKeys[this.changeColumnIndex] == this.newColumnName
      ) {
        alert("什么都没有改");
        return;
      }
      //判断是否有重复列名
      if (
        this.tableKeys.indexOf(this.newColumnName) >= 0 &&
        this.tableKeysType[this.changeColumnIndex] == this.newColumnType
      ) {
        alert("已存在名为:" + this.newColumnName + "的列名");
        return;
      }
      //可以抽出新方法来
      let oldKey = this.tableKeys[this.changeColumnIndex]; //旧的键值

      //发送修改请求。
      let query = this.$post("/task/dataProcessing/resetColumns_name_type", {
        data_set_id: this.dataSetId,
        type_field: [
          {
            field: oldKey,
            type: this.newColumnType
          }
        ],
        reset_field: [
          {
            original_col: oldKey,
            new_col: this.newColumnName
          }
        ]
      });
      query.then(res => {
        if (res.message != "类型修改失败") {
          this.tableKeysTypeObject[this.newColumnName] = this.newColumnType;
          this.originKeyObject[this.newColumnName] = this.originKeyObject[
            oldKey
          ];

          this.keyDesc[this.newColumnName] = this.keyDesc[oldKey];

          this.keyVisibilitysObject[
            this.newColumnName
          ] = this.keyVisibilitysObject[oldKey];

          this.tablePropertys[this.newColumnName] = new tableProperty(
            true,
            this.originKeyObject[oldKey],
            this.newColumnName,
            this.newColumnType,
            this.keyDesc[oldKey]
          );
          delete this.tablePropertys[oldKey];
          if (oldKey != this.newColumnName) {
            delete this.tableKeysTypeObject[oldKey];
            delete this.originKeyObject[oldKey];
            delete this.keyDesc[oldKey];
            delete this.keyVisibilitysObject[oldKey];
          }
          this.$set(this.tableKeys, this.changeColumnIndex, this.newColumnName);
          //set方法。数组更新，但是试图不更新的问题，遇到类似的可以使用vue.set为解决方案
          this.$set(
            this.tableKeysType,
            this.changeColumnIndex,
            this.newColumnType
          );
          // 为data重新赋值
          let newData = [];
          for (var i = 0; i < this.tableData.length; i++) {
            let objs = this.tableData[i];
            var o = new Object();
            for (var obj in objs) {
              if (obj == oldKey) {
                o[this.newColumnName] = objs[obj];
              } else {
                o[obj] = objs[obj];
              }
            }
            newData.push(o);
          }
          this.tableData = newData;
          this.tableKeys = Object.keys(this.tableData[0]);
          this.newColumnName = "";
          this.dialogVisible = false;
        } else {
          let obj = JsonParse.looseJsonParse(response.违规率);
          let key = Object.keys(obj);
          alert(`${response.message},错误率为${obj[key[0]] * 100}%`);
        }
      });
    },
    //更新table key
    updateTableKeys(newKeys) {
      this.tableKeys = newKeys;
    },
    //更新table类型
    updateTableTypes(newTypes) {
      this.tableKeysType = newTypes;
    },

    showDataSet(dataSetId) {
      // TODO 是否保存？
      this.dataSetId = dataSetId;
      this.tableLoading = true;
      this.fetch();
    },
    //处理空值
    dealwithNull() {
      var cf = confirm("是否删除所有空值的行？");
      if (cf) {
        this.$post(
          "/task/dataProcessing/dropnan",
          {
            data_set_id: this.dataSetId
          },
          false
        ).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.refreshData();
        });
      }
      // else {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除"
      //   });
      // }
    },
    //更新表格属性
    updateTableProperty(oldTablePropertysObject, newTablePropertysArray) {
      this.tablePropertys = this.converterPropertyArrayToObject(
        newTablePropertysArray
      );
      let oldTableKeys = Object.keys(oldTablePropertysObject);
      let newTableKeys = [];
      let desc_field = [];
      let type_field = [];
      let reset_field = [];
      for (let key in oldTablePropertysObject) {
        let newKey = oldTablePropertysObject[key].tableKey;
        newTableKeys.push(newKey);
        let keyFieldObject = {
          field: key,
          desc: this.tablePropertys[newKey].keyDesc
        };
        let typeObject = {
          field: key,
          type: this.tablePropertys[newKey].keyType
        };

        let resetObject = {
          original_col: key,
          new_col: newKey
        };
        desc_field.push(keyFieldObject);
        type_field.push(typeObject);
        reset_field.push(resetObject);
      }
      this.$post("/task/dataProcessing/resetColumns_name_type_desc", {
        data_set_id: this.dataSetId,
        desc_field,
        type_field,
        reset_field
      }).then(response => {
        this.batchTableKey(oldTableKeys, newTableKeys);
      });
    },

    batchTableKey(oldTableKeys, newTableKeys) {
      let newData = [];
      this.tableData.forEach(data => {
        var obj = new Object();
        for (var i = 0; i < oldTableKeys.length; i++) {
          obj[newTableKeys[i]] = data[oldTableKeys[i]];
        }
        newData.push(obj);
      });
      this.tableData = newData;
    },

    // 增加新字段部分
    addNewField() {
      this.addFieldDialogVisible = true;
    },
    //新增字段如何在表格中正确的标识呢
    addField(fieldName, fieldType, expression) {
      this.$refs.newFiledRef.addField();
      //   let tableData = this.tableData;
      //   fieldName = "新增字段";
      //   fieldType = "object";
      //   tableData.forEach(data => {
      //     // var xxcj;
      //     // var zcj;
      //     // var value;

      //     // for (var key in data) {
      //     //   if (key == "笔试成绩") {
      //     //     xxcj = data[key];
      //     //   }
      //     //   if (key == "总成绩") {
      //     //     zcj = data[key];
      //     //   }
      //     //   value = xxcj + zcj;
      //     // }

      //     data[fieldName] = 1;
      //   });
      //   this.tableData = [];
      //   let property = new tableProperty(
      //     true,
      //     null,
      //     fieldName,
      //     fieldType,
      //     "",
      //     true
      //   );
      //   let newPropertys = deepCopy(this.tablePropertys);
      //   newPropertys[fieldName] = property;
      //   this.tablePropertys = newPropertys;
      //   console.log(this.tablePropertys);
      //   this.tableData = tableData;
      //   this.addFieldDialogVisible = false;
    },

    //数据处理后进入下一步、
    //todo:若不保存处理，应该删除处理的结果。。也就是用处理前的dataset
    saveAndGoDataAnalysis() {
      var c = confirm("是否保存处理结果？");
      if (c) {
        sessionStorage.setItem("dataSetId", this.dataSetId);
        this.$router.push({
          name: "data-analysis",
          params: { dataSetId: this.dataSetId, taskId: this.taskId }
        });
      }
    },
    converterPropertyArrayToObject(propertyArray) {
      let propertyObject = {};
      propertyArray.forEach(function(property, index) {
        propertyObject[property.tableKey] = property;
      });
      return propertyObject;
    },
    //重新拉取数据集
    refreshData() {
      //重新拉取
      this.addFieldDialogVisible = false;
      this.dialogVisible = false;
      this.fetch();
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.dataSetId = to.params.id;
      let dataSetArray = this.dataSetList;
      this.taskId = dataSetArray.filter(
        item => item.id === parseInt(this.dataSetId)
      )[0].task;
      this.refreshData();
    }
  }
  // beforeRouteUpdate(to, from, next) {
  //   this.dataSetId = to.params.id;
  //   this.refreshData();
  //   next();
  // }
};
</script>
<style scoped>
thead {
  line-height: 40px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.items-text {
  padding: 0 0 5px 0;
  text-align: right;
  color: #666;
  font-size: 15px;
  letter-spacing: 1px;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}

.emphasize-number {
  color: #1d8fe1;
}
</style>
