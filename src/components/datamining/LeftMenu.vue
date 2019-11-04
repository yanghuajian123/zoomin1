<template>
<div>
     <TaskInfo v-show="leftVisiable"></TaskInfo>
     <!-- <div class="leftMenu-decoration"></div> -->
         
          <Drag></Drag>
</div>
</template>
<script>
import TaskInfo from "./leftmenu/TaskInfo";
import Drag from "./leftmenu/Drag";
import vueBus from "./vueBus";
export default {
    components:{
        TaskInfo,
        Drag
    },
    data(){
        return{
            leftVisiable:true
        }
    }
    
}
</script>
<style lang="scss" scoped>
.demo_line_02 {
  // height: 1px;
  // border-top: 1px solid rgb(200, 200, 200);
  // text-align: center;
  //   background-image:linear-gradient(to top, #00c6fb 0%, #005bea 100%);

}

.demo_line_02 {
  position: relative;
  top: -8px;
  // background: #fff;
  // padding: 0 20px;
}
.leftMenu-decoration{
    text-align: center;
  width: 100%;
  height: 2px;
  // position: relative;
  // margin-bottom: 20px;
  // margin-top: -10px;
  background-image:linear-gradient(to top, #00c6fb 0%, #005bea 100%);
;
}
</style>