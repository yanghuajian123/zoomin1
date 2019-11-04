<template>
  <div>
    <el-row v-show="modelParmsFlag" class="modelParmsStyle">
      <el-col :span="12" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">数据划分比例</div>
          <el-input-number v-model="num1" :precision="2" :step="0.01" size="small" @change="testSizeChange"
                           :min="0" :max="0.99" label="描述文字"></el-input-number>
          <a style="color:#dcdfe6">（建议值：0.7~0.8）</a>
        </div>
      </el-col>

      <el-col :span="12" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">&nbsp;误差计算&nbsp;&nbsp;</div>
          <el-select v-model="value" placeholder="MSE(平均绝对误差)" size="small" @change="errorType">
            <el-option
              v-for="(item,index) in selValue"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>


    <!-- 非线性回归部分 -->
    <el-row v-show="!modelParmsFlag" class="modelParmsStyle">
      <el-col :span="10" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">数据划分比例</div>
          <el-input-number v-model="num1" :precision="2" :step="0.01" size="small" @change="testSizeChange"
                           :min="0" :max="0.99" label="描述文字"></el-input-number>
          <a style="color:#dcdfe6">（建议值：0.7~0.8）</a>
        </div>
      </el-col>

      <el-col :span="7" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">次数m</div>
          <el-input-number v-model="num2" size="small" @change="mthPowerChange" :min="2" :max="10"
                           label="描述文字"></el-input-number>
        </div>
      </el-col>

      <el-col :span="7" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">误差计算</div>
          <el-select v-model="value" placeholder="MSE(平均绝对误差)" size="small" @change="errorType">
            <el-option
              v-for="(item,index) in selValue"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import vueBus from "../vueBus";
  import {deBounce} from "@/utils/deBounce";


  export default {
    data() {
      return {
        num1: 0.7,
        num2: 2,
        selValue: ['MSE(平均绝对误差)', 'MAE(均方误差)', 'RMSE(均方根误差)'],
        modelParmsFlag: true,
        value: ''
      };
    },
    methods: {
      // debounce: function(func, wait = 500) {
      //   let timeout; // 定时器变量
      //   return (event) => {
      //     clearTimeout(timeout); // 每次触发时先清除上一次的定时器,然后重新计时
      //     timeout = setTimeout(() => {
      //       func.call(this, event);
      //     }, wait); // 指定 xx ms 后触发真正想进行的操作 handler
      //   };
      // },
      testSizeChange: deBounce(function () {
        vueBus.$emit('test_size', this.num1)
      }, 250),


      mthPowerChange: deBounce(function () {
        vueBus.$emit('mth_power', this.num2)
      }, 250),

      errorType: deBounce(function () {
        vueBus.$emit('error_type', this.value)
      }, 250),
    },
    mounted() {
      vueBus.$on('modelParmsFlag', (type) => {
        switch (type) {
          case '线性回归':
            this.modelParmsFlag = true
            break;
          case '非线性回归':
            this.modelParmsFlag = false
            break;
          default:
            break;
        }
      })
    }
  }
</script>

<style>
  .modelParmsStyle .el-input-group__prepend {
    background-color: transparent;
    border: 0px solid;
    /* border-bottom: 1px solid #dcdfe6;  */
  }
</style>
