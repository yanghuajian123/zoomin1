<template>
    <div><!-- default-active="1" -->
        <el-collapse
        class="el-menu-vertical-demo axisOptionStyle2"
        style="text-align: left;"
        accordion>
        <el-collapse-item index="1">

            <template slot="title">
                <!-- <i class="icon" herf="#icon-xalxe"></i> -->
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-xalxe"></use></svg>
            <span>X轴</span>
            </template>

                <div class="el-input el-input-group el-input-group--prepend">
                <div class="el-input-group__prepend">标题</div>
                <el-input v-model="xAxisInput" @blur="xAxisChange" class="axisOptionStyle" placeholder="请输入X轴" suffix-icon="el-icon-edit"></el-input>
                </div>

                

        </el-collapse-item>

        <el-collapse-item index="2">

            <template slot="title">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-yaxle"></use></svg>
            <span>Y轴</span>
            </template>

            
                <div class="el-input el-input-group el-input-group--prepend ">
                <div class="el-input-group__prepend">标题</div>
                <el-input class="axisOptionStyle" v-model="yAxisInput" @blur="yAxisChange" placeholder="请输入Y轴" suffix-icon="el-icon-edit"></el-input>
                </div>

        
            

        </el-collapse-item>

        </el-collapse>
    </div>
</template>

<script>
import vueBus from "../vueBus";
export default {
      data(){
          return{
              radio: "1",
              xAxisInput:"",
              yAxisInput:"",

          }
        },
        methods: {
           xAixsChange(){
               vuBus.$emit("miningXAxis",this.xAxisInput);
           },
           yAxisChange(){
               vueBus.$emit("miningYAxis",this.yAxisInput);
           }
        }
}
</script>

<style lang="scss">
@import "@/common/scss/variable";
.el-input-group__prepend{
    background-color: #ffffff;
    border: 0px solid #ffffff;

}
.icon{
    height: $iconHeight;
    width: $iconWidth;
}

/* .axisOptionStyle{
    margin-right: 5px
} */


.axisOptionStyle .el-input__inner{
        border: 1px solid #ffffff;
        border-bottom-color: #dcdfe6;
    }

.axisOptionStyle .el-collapse-item__arrow{
  float: left;
}

.axisOptionStyle2{
    padding-left: 20px;
}

.axisOptionStyle2 .el-submenu__icon-arrow{
    right: 280px;
    /* left: 0px; */
}
</style>
