<template>
  <div class="feature-trait">
    <div class="feature-trait-title">我们的特点是什么
    </div>
    <div class="feature-title-decoration"></div>
    <div class="feature-trait-all">
    <div class="feature-trait-card-show">
      <div
        v-for="(item,index) in trait"
        :key="index"
        class="feature-trait-card">
        <!-- <div class="feature-trait-card-icon">

        </div> -->
        <div>
          <h3>
            <img
              :src="require(`../../common/image/Welcome/trait${index + 1}.svg`)"
              width="60px"
              height="60px"
            >&nbsp;&nbsp;{{item.title}}
          </h3>
          <div class="feature-trait-card-decoration"></div>
          <h5>{{item.content}}</h5>
        </div>

      </div>
    
    
        </div>  
    
  
  <div class="feature-trait-image">
        <img src="../../common/image/Welcome/Trait.svg" width="600px" height="600px"></div>
        </div>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      trait: [
        {
          title: "易用灵活",
          content:
            "无需编程，拖拽完成数据处理，降低数据分析入门门槛，灵活的多维度分析，多层钻取，帮助用户更全面深入的了解数据"
        },
        {
          title: "实时分析",
          content:
            "图表数据实时更新，动态监测数据异常，提升数据分析效率，支持接入多种数据源，包括多类型文本数据，数据库数据，第三方平台数据"
        },
        {
          title: "专业高效",
          content:
            "不同于市面上其他的系统，ZoomIn将数据分析和数据挖掘及可视化集中于一个系统，同时支持5大类机器学习模型数十种挖掘模型，提升效率"
        },
        {
          title: "方便快捷",
          content:
            "区别于其他PC端的软件，本系统采用了Web端技术，可以随时随地进行使用，解决了安装应用配置环境等不便利性"
        }
      ]
    };
  }
};
</script>
<style scoped>
.feature-trait{
    margin:0 100px;
    /* display: flex; */
}
.feature-trait-title{
    cursor: default;
    margin:50px auto 0 auto;
    font-size: 40px;
    text-align: center;
    font-weight: 900;
    letter-spacing: 8px;
    color: #333;
}
.feature-title-decoration{
    width: 35%;
    height: 5px;
    border-radius: 20px;
    margin:10px auto;
    background-image: linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%);
}
.feature-trait-card-show{
    width: 800px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: space-evenly; */
    

}
.feature-trait-card-decoration{
    width: 90%;
    height: 3px;
    border-radius: 20px;
    margin:-20px auto 10px auto;
    background-image: linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%);

}
.feature-trait-all{
    display: flex;
    /* justify-content: space-between; */
     /* flex-direction: column; */
     flex-flow: wrap-reverse;
     
     
     flex-wrap: nowrap;
}
.feature-trait-card{
    margin: 0 0 0 0;
    height: 300px;
    width: 200px;
    padding : 25px 80px;
    border-radius: 20px;
    box-shadow:none;
    transition: all .3s ease-in-out;

}
.feature-trait-card:hover{
    cursor:default;
    box-shadow: rgb(224, 219, 219) 0 5px 30px 0.5px;
    transform: scale(1.05, 1.05);
    transition: all .3s ease-in-out;
}
.feature-trait-card h3{
     display: flex;
    align-items: center;
    margin-top: 30px;
    font-size: 22px;
    letter-spacing: 4px;
    color: #333;
}
.feature-trait-card h5{
    font-size: 18px;
    color: #666;
    font-weight: 400;
}
.feature-trait-image{
    margin: 0;
    width: 600px;
    height: 600px;
    /* text-align: center; */
    /* padding: 50px auto; */
    margin: 75px 0;
  
}

</style>