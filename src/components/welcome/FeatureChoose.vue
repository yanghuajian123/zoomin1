<template>
  <div class="feature-choose">
    <div class="feature-choose-title">
      Why Choose us
    </div>
    <div class="feature-choose-title-decoration"></div>
    <div class="feature-choose-show">
      <div
        v-for="(item,index) in good"
        :key="index"
        class="feature-choose-card">
        <div class="choose-card-icon">
          <img
            :src="require(`../../common/image/Welcome/icon${index + 1}.svg`)"
            width="100px"
            height="100px">
        </div>

        <div>
          <h3>{{item.title}}</h3>
          <div class="choose-card-decoration"></div>
          <h5>{{item.content}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      good: [
        {
          title: "高度智能 + 易用性",
          content:
            "系统采用简单易懂的操作界面、Web应用的方式呈现给用户，将复杂的数据可视化功能和专业的数据挖掘模型科学整合"
        },
        {
          title: "探索数据 + 自定义",
          content:
            "引导用户去对自己的数据进行清洗、统计分析、和训练相应的机器学习模型后深度挖掘隐藏在数据中的潜在价值"
        },
        {
          title: "深度分析 + 可视化",
          content:
            "可导出可视化分析报告，辅助决策等，另外本产品可以根据用户的分析结果，提供进一步更加专业的技术支持。"
        }
      ]
    };
  }
};
</script>
<style scoped>
/* $color-decoration:linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%); */
.feature-choose{
    border-radius: 20px;
    box-shadow: 0 40px 80px -40px #373737;
    padding:50px 50px 250px 50px;
    background-color: #fff;
    position: relative;
    width: 80%;
    height: 400px;
    margin:-120px auto 0 100px;
    /* z-index: 1000; */
    /* left:0;
    top:0;
    bottom: 0;
    right: 0; */
    }
.feature-choose-title{
    margin:50px auto 0 auto;
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    letter-spacing:  3px;
}
.feature-choose-title-decoration{
    width: 35%;
    height: 8px;
    border-radius: 20px;
    margin:20px auto 40px auto;
    background-image: linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%);
}

.feature-choose-card{
    margin-top: 50px;
    padding: 50px;
    height: 150px;
    width: 250px;
    border-radius: 20px;
    box-shadow: 0 2px 8px 0 #333;
    transition: all .4s ease-in-out;
}
.feature-choose-card:hover{
    transform: translateY(-5px);
    transition: all .4s ease-in-out;
    box-shadow: 0 20px 40px -10px #333;
}
.choose-card-decoration{
    width: 100%;
    height: 5px;
    border-radius: 20px;
    margin:-10px auto auto auto;
    background-image: linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%); 
}
.feature-choose-show{
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;

}
.choose-card-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 80px;
    margin:-95px auto 0 0;
    border-radius: 50%;
    
}
.feature-choose-card h3{
    margin-top: 30px;
    font-size: 22px;
    letter-spacing: 3px;
    color: #333;
}
.feature-choose-card h5{
    font-size: 16px;
    color: #666;
    font-weight: 400;
}
</style>