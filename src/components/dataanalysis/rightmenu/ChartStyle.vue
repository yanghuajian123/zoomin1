<template>
    <div style="padding:20px">
    <!-- <el-radio v-model="chartStyle" label="dark" border @change="changeEvent(chartStyle)">dark</el-radio>
    <el-radio v-model="chartStyle" label="macarons" border  @change="changeEvent(chartStyle)">macarons</el-radio>
    <el-radio v-model="chartStyle" label="vintage" border @change="changeEvent(chartStyle)">vintage</el-radio>
    <el-radio v-model="chartStyle" label="infographic" border @change="changeEvent(chartStyle)">infographic</el-radio>
    <el-radio v-model="chartStyle" label="shine" border @change="changeEvent(chartStyle)">shine</el-radio>
    <el-radio v-model="chartStyle" label="roma" border @change="changeEvent(chartStyle)">roma</el-radio> -->
    
  <el-carousel :interval="4000" type="card" height="100px" :autoplay="false" indicator-position="none">
    <el-carousel-item v-for="(item,index) in chartStyle" :key="index">
      <img :src="getUrl(item)" style="height:100%;width:100%" @click="changeEvent(item)">
    </el-carousel-item>
  </el-carousel>

  
  </div>
</template>
<script>
import Bus from "../vueBus"
export default {
    data(){
        return {
            chartStyle:['shine','macarons','vintage','infographic','dark','roma']
        }
    },
    methods:{
        changeEvent(e){
            Bus.$emit('chartStyleType',e)
        },
         getUrl(item){
             switch (item) {
                 case 'dark':
                     return require("../../../common/image/DataAnalysis/dark.png");
                     break;
                 case 'infographic':
                     return require('../../../common/image/DataAnalysis/infographic.png');
                     break;
                 case 'macarons':
                     return require('../../../common/image/DataAnalysis/macarons.png');
                     break;
                 case 'roma':
                     return require('../../../common/image/DataAnalysis/roma.png');
                     break;
                 case 'shine':
                     return require('../../../common/image/DataAnalysis/shine.png');
                     break;                     
                 case 'vintage':
                     return require('../../../common/image/DataAnalysis/vintage.png');
                     break;                     
                 default:
                     break;
             }
        }

    }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
