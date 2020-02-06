<template>
  <div style="width:92%;height:28vh;background-color:rgba(255,255,255,0.7);margin-top:3vh;margin-left:2vh;box-shadow:0 0 2px 2px #2CF8DE">
    <div id="chartDisc" :style="{width: '98%', height: '100%'}"></div>
  </div>
</template>

<script>
  export default {
    name: "Disc",
    methods: {
      draw() {
        let chartDisc = this.$echarts.init(document.getElementById('chartDisc'));
        let data = [78, 60, 60, 70, 69]
        let titlename = ['一级手术', '二级手术', '三级手术', '四级手术', '五级手术'];
        let valdata = [683, 234, 234, 523, 345]
        let myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
        let option = {
          title: {
            text: '磁盘空间'
          },
          xAxis: {
            show: false
          },
          yAxis: [{
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: function (value, index) {
                  var num = myColor.length;
                  return myColor[index % num]
                }
              },
              formatter: function (value, index) {
                return [
                  '{title|' + value + '} '
                ].join('\n')
              },
              rich: {}
            },

          }, {
            show: true,
            inverse: true,
            data: valdata,
            axisLabel: {
              textStyle: {
                color: function (value, index) {
                  var num = myColor.length;
                  return myColor[index % num]
                }
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },

          }],
          series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: data,
            barWidth: 30,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: function (params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num]
                },
              }
            },
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{c}%'
              }
            },
          }]
        };
        chartDisc.setOption(option, true);
      },
    },
    mounted() {
      this.draw() //函数调用
    }
  }
</script>

<style scoped>

</style>
