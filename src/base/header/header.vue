<template>
<div
        :class="['background-nav',{'changeNav':isOverScroll}]"
        id="background-nav"
        >
        <!-- <div class="background-nav" id="background-nav"> -->
        <img src="../../assets/logo.png">
        <div class="background-nav-menu">
          <div>数据导入</div>
          <div>数据处理</div>
          <div>数据分析</div>
          <div>数据挖掘</div>
          <div>任务发布</div>
        </div>

        <button
          class="background-nav-user"
          @click="Logout"
        >用户</button>
      </div>


</template>
<script>
export default {
  data(){
    return{

    }
  },
  computed:{
    activeIndex(){
      return $store.getters.activeIndex;
    },
    methods:{
      Logout(){
        localStorage.setItem("token","");
        localStorage.setItem("username","");
        this.$router.push({
          path:"/"
        })
      }

    }

  },
  components:{

  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
body {
  padding: 0;
  margin: 0;
  max-width: 100%;
  overflow: auto;
}
/* .background {
  background: linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%);
  background-size: 100% 100%;
  margin: 0;
  padding: 0 0 250px 0;
  filter: alpha(opacity=50);
} */
.background-nav {
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  font-size: 20px;
  padding: 5px 0;
  background-image: linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%);
  /* font-family: ; */
}
.background-nav-menu {
  list-style: none;
  display: flex;
  /* flex-direction: row;
  flex-wrap: nowrap; */
  justify-content: space-evenly;
  /* margin-left: -520px; */
}
.background-nav-menu div {
  float: left;
  padding: 10px;
  margin: 0 20px;
  font-weight: 700;
  position: relative;
  transition: all 0.25s ease-in-out;
  font-size: 15px;
}
.background-nav-menu div:hover {
  cursor: pointer;
  transform: translateY(-3px);
  transition: all 0.25s ease-in-out;
  text-shadow: 0 0 10px #f3efef;
}

/* .bg-nav-menu div.active::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 4px;
    background: #000;
    transition: all 0.3s ease-in-out;
    left: calc(50% - 10px);
    width: 20px;
  } */
/* .background-nav .logo{
    
    margin-right: 200px;
    border: 1px solid #fff;
    font-weight: 600;
    font-family: "微软雅黑", "黑体", "宋体";
    width: 100px;
    text-align: center;
    padding: 5px;
    border-radius: 6px;

  } */
.background-nav-user {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 4px;
  height: 40px;
  padding: 0 20px;
  outline: none;
  border-radius: 12px;
  border: #fff 1px solid;
  background: transparent;
  transition: all 0.2s ease-in-out;
}
.background-nav-user:hover {
  cursor: pointer;
  box-shadow: 0 0 10px 2px #f3efef;
  transform: all 0.2s ease-in-out;
}
.changeNav{
  position: fixed;
  background: #fff;
  transition: all .25s ease-in-out;
  z-index:99;
}
.changeNav button{
   color:#666;
  /* font-size: 20px;
  font-weight: bold; */
  /* letter-spacing: 4px; */
  /* height: 40px;
  padding: 0 20px;
  outline: none; */
  /* border-radius: 12px; */
  border:#666 1px solid;
  box-shadow: #665 0 0 5px 2px;
  /* background: transparent; */
  /* transition: all 0.2s ease-in-out; */
}
.changeNav div{
  color:#666;
    transition: all 0.4s ease-in-out;

}
/* .background-warp{
  padding: 100px 0 100px 0;
  display: flex;
  position: relative;
  justify-content: space-around;
  /* flex-direction: row;
  flex-wrap: wrap; 
}  */
/* .background-left{
  margin:0;
} */
/* .background-right{
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
} */
/* .background-right-title{
  font-weight: 800;
  font-size: 90px;
  letter-spacing: 10px;
  -webkit-text-stroke: 1px #999;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 4px 8px 20px  #f3efef;
  background-image: linear-gradient(10deg,#eef4fb 0%,rgb(250, 250, 250) 45%,white 100%);
}
.background-right-content{
  font-weight: 400;
  font-size:35px;
  color:white;
  opacity: 0.7;
  text-shadow: 4px 8px 15px  #f3efef;
}
.background-right-button{
  border-radius: 20px;
  border:none;
  color:#fff;
  background-image: linear-gradient(90deg, #1d8fe1 0%, #625eb1 0%);
  align-items: center;
  width:40%;
  height: 10%;
  font-size: 20px;
  outline: none;
  justify-content: center;
  opacity: 0.7;
  transition: all .7s ease-in-out;
}
.background-right-button:hover{
  opacity: 1;
  transition: all .4s ease-in-out;
  box-shadow: 0 0 10px 15px #1d8fe1;
} */

</style>