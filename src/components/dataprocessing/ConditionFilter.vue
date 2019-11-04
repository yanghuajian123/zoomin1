<template>
  <div class="condition-warp">
    <el-row>
      <span class="condition-text">满足下列:</span>
      <el-select v-model="conditionType" placeholder="请选择" size="mini">
        <el-option v-for="item in conditionTypeOption" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-row :gutter="10" style="margin-bottom: -10px;">
      <conditionItem :ref="'item'+index" :keys="keys" v-for="(value,index) in itemCount" :key="value.index" :keyTypes="keyTypes" :end="index+1==itemCount.length" :count="itemCount.length" :item="value" v-on:addItem="addItem" v-on:removeItem="removeItem" v-on:updateItemData="updateItemData" v-on:filterData="sendfilterData">
      </conditionItem>
    </el-row>

  </div>
</template>

<script>
//条件筛选
import ConditionItem from "./ConditionItem";
class FilterItemData {
  constructor(field_name, filter_method, filter_obj) {
    this.field_name = field_name;
    this.filter_method = filter_method;
    this.filter_obj = filter_obj;
  }
}
export default {
  components: {
    ConditionItem
  },
  props: {
    dataSetId: "",
    keys: Array,
    keyTypes: Array
  },
  data() {
    return {
      conditionType: "",
      conditionTypeOption: [
        {
          value: "&",
          label: "全部条件"
        },
        {
          value: "|",
          label: "任意条件"
        }
      ],
      //标签数
      itemCount: [
        {
          value: "",
          index: 1
        }
      ],
      filterData: []
    };
  },
  methods: {
    //添加
    addItem(){
      this.itemCount.push({
        value: "",
        index: this.itemCount.length + 1
      });
    },
    //移除
    removeItem(item) {
      let removeIndex = this.itemCount.indexOf(item); //确定删除的是哪一项
      this.filterData.splice(removeIndex, 1);
      if (this.itemCount.length > 1) {
        this.itemCount.splice(removeIndex, 1);
      } else {
        this.$message({
          message: "再删就没了！",
          type: "warning",
          showClose:true,
          duration:1500
        });
      }
    },
    //更新数据
    updateItemData: function(field_type, index, key, operator, val) {
      let filterItem = new FilterItemData(key, operator, val);
      filterItem.field_type = parseInt(field_type);
      if (!isNaN(key)) {
        key = key.toString();
      }
      if (this.filterData.length < index) {
        this.filterData.push(filterItem);
      } else {
        this.filterData[index - 1] = filterItem;
      }
    },
    //确定过滤数据
    sendfilterData() {
      this.$post(
        "task/dataProcessing/filters",
        {
          data_set_id: this.dataSetId,
          logical_type: this.conditionType,
          filter: this.filterData
        }
     
      ).then(res => {
        // 重新拉取过滤后的数据
        this.$emit("refresh");
        this.initFilter();
      });
    },
    initFilter() {
      this.itemCount = [
        {
          value: "",
          index: 1
        }
      ];
      this.$refs.item0[0].init();
      this.filterData = [new FilterItemData()];
    }
  }
};
</script>

<style>
.condition-warp {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: transparent;
  width: 100%;
  min-height: 100px;
  box-shadow: 2px 1px 10px 5px #f3f3f3;
}
.condition-text {
  padding: 0 8px 0 0;
  font-size: 14px;
  color: #777;
}

</style>

