<template>
  <div
    style="width:96%;height:28vh;background-color:rgba(255,255,255,0.7);margin-top:3vh;box-shadow:0 0 2px 2px #2CF8DE">
    <div id="chartApply" :style="{width: '94%', height: '28vh'}"></div>
  </div>
</template>

<script>
  export default {
    name: "Ram",
    methods: {
      draw() {
        let chartApply = this.$echarts.init(document.getElementById('chartApply'));
        let option = {
          title: {
            text: '应用吞吐率(TOP5)',
            x: 'center',
            textStyle: {
              fontSize: '12'
            },
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            x: 'left',      //可设定图例在左、右、居中
            y: 'top',     //可设定图例在上、下、居中
            padding: [18, 0, 0, 15],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            data: ['邮件营销', '联盟广告', '视频广告']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            }
          ]
        };
        chartApply.setOption(option, true);
      }
    },
    mounted() {
      this.draw() //函数调用
    }
  }
</script>

<style scoped>

</style>
