<template>

  <div>
   <div class="demo_line_02">
           
            <div class="dragContext">维度数值</div>
             <div class="leftMenu-decoration"></div>
          </div>
    <div
    class='drag-content'
    id="dragCon"
  >
      <div
        style="margin-top:130px"
        v-if="loadingUsergroupList"
      >
        <div
          v-loading="loadingUsergroupList"
          element-loading-text="数据加载中…"
        ></div>
      </div>
      <!-- <vue-scroll> -->
      <div
        class='select-ul'
        id="select-ul"
        v-if="dragFlag"
      >
        <div
          style="display:table;text-align: left;"
          v-for="(textField,index) in textFields"
          :key="index"
        >
          <div
            class='select-item'
            :id=textField
            :name=textField
            draggable='true'
            @dragstart='drag($event)'
            style="list-style-type:none;"
          >
            <!-- <svg
              class="icon"
              aria-hidden="true"
              style="margin-right:20px; width:15px;height:15px"
            >
              <use :xlink:href="$utils.showTypesUi(index)"></use>
            </svg> -->
            <svg class="icon" aria-hidden="true" style="margin-right:10px;width:15px;height:15px;">
                <use xlink:href="#icon-wenzi"></use>
              </svg>{{textField}}
              </div> 
          </div>
          <div
            style="display:table;text-align: left;"
            v-for="(numberField) in numberFields"
            :key="numberField"
          >
            <div
              class='select-item'
              :id=numberField
              :name=numberField
              draggable='true'
              @dragstart='drag($event)'
              style="list-style-type:none; "
            >
              <svg
                class="icon"
                aria-hidden="true"
                style="margin-right:10px;width:15px;height:15px;"
              >
                <use xlink:href="#icon-shuzi"></use>
              </svg>{{numberField}}</div>
          </div>
        </div> <!-- 拖动的标签 -->
        <!-- </vue-scroll> -->
      </div>

      <!-- <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shuzi"></use></svg> -->
    </div>
</template>

<script>
import Bus from "../vueBus";

export default {
  data() {
    return {
      keyArray: [],
      numberFields: [],
      textFields: [],
      loadingUsergroupList: true,
      dragFlag: false,
      activeName: "first"
    };
  },
  methods: {
     get(){
        Bus.$on('AxiosDataDragItem', (e) => {
            //console.log(e)
            this.keyArray = e
            this.loadingUsergroupList = false
            this.dragFlag = true
          })
     }
  },
  mounted() {
    // document.getElementById('dragCon').style.height=document.getElementById('app-border').offsetHeight-document.getElementById('dragCon').offsetTop+'px'
    // console.log(document.getElementById('demo_line_02').offsetTop)
    // console.log(document.getElementById('app-border').offsetHeight)
    Bus.$on("AxiosDataDragItem", e => {
      //console.log(e)
      this.keyArray = e;
      this.loadingUsergroupList = false;
      this.dragFlag = true;
    });
  },
  watch: {
      //判断类型放进去num或者text类型
    keyArray(val) {
      Object.keys(val).forEach((arrayItem, index) => {
        if (this.isNumber(val[Object.keys(val)[index]])) {
          this.numberFields.push(Object.keys(val)[index]);
        } else {
          this.textFields.push(Object.keys(val)[index]);
        }
      });
    }
  },
  methods: {
    drag(ev) {
      const data = ev.target.innerText.trim();
      ev.dataTransfer.setData("ID", data); //拖动元素的ID
      //dom = ev.target
    },
    //判断是否为num
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },

    typeClassify() {}
  }
};
</script>

<style lang="scss" scoped>
@import "src/common/scss/variable.scss";
.drag-content {
  margin-top: 30px;
}
.dragContext{
  color: #909399;
   border: 0px solid #dcdfe6;
    background-color: #ffffff;
    font-size: $titleFontSize;
    float: left;
padding-left: 20px;
    /* margin-left: 0; */

}

.select-ul {
  padding: 5px;
  text-align: center;
  cursor: pointer;
  color: #5a616a;
  font-family: "Microsoft YaHei", "宋体";
}

.select-item {
  /* border:1px solid #5bc0de;
    display: inline-block;
    text-align: left;
    border-radius: 3px;
    margin-right: 15px;
    cursor:pointer;
    padding: 6px 20px;
    color: #5bc0de;
    width: 120px; */
  margin: 10px;
  color: rgb(100, 100, 100);
  font-family: $fontfamily;
  /*border: 0px*/
}
.demo_line_02 {
  background-color: #ffffff;
  border: 0px solid;
  border-bottom: 0px solid #dcdfe6;
  font-size:10;
    margin:20px 0 20px -10px;
}
.leftMenu-decoration{
    text-align: center;
  width: 100%;
  height: 1.8px;
  float: left;
 /* position: relative; */
   /* margin-bottom: 20px; */
   /* margin-top: 50px; */
   background-image: $color-decoration1;
  // background-image:linear-gradient(to top, #00c6fb 0%, #005bea 100%);
;}

.cursored {
  cursor: default;
}

.people-content {
  margin-top: 4px;
}

.select-project-item {
  display: inline-block;
  text-align: center;
  border-radius: 3px;
}

.drag-people-label {
  margin-bottom: 0;
  padding-right: 10px;
}

.tab-pane-font {
  text-align: center;
}

[v-cloak] {
  display: none;
}
</style>
