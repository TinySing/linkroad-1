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

        var myColor = ['#81E7ED'];
        var dataLine = [100, 56, 23, 15, 15];
        var positionLeft =16;
          var positionRight=16,
          max = 100 + positionLeft - positionRight ;

        var g_cellBar0_y = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAoCAYAAAAhf6DEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA6SURBVEhLY2x8/vY/A4mg3zwcTDOBSTLBqGYSwahmEsGoZhLBqGYSwahmEsGoZhLBqGYSwZDUzMAAAJldBMF2UASmAAAAAElFTkSuQmCC';
        var g_cellBarImg0_y = new Image();
        g_cellBarImg0_y.src = g_cellBar0_y;

        var option = {
          backgroundColor: '#fff',
          grid: [{
            left: '2%',
            top: '12%',
            right: '2%',
            bottom: '8%',
            containLabel: true
          },
            {
              left: '10%',
              top: '12%',
              right: '5%',
              bottom: '8%',
              containLabel: true
            }
          ],
          xAxis: [{
            //   max:max,
            show: false
          }],
          yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              inside: true,
              align: 'left',
              textStyle: {
                color: '#000',
                fontSize: '10'  ,  //y轴左侧字体大小
              }
            },
            z: 10,
            data: ['CCA', 'CHH', 'ABC', 'CBC', 'SCH'] ////y轴左侧字体参数
          }, {
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              inside: true,
              align: 'right',
              textStyle: {
                color: '#000',
                fontSize: '10'  //y轴右侧字体大小
              }
            },
            z: 10,
            data: [100, 56, 23, 15, 15]//y轴右侧字体参数
          }, {

            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)'
              }
            },
            data: []
          }],
          series: [

            { //间距
              type: 'bar',
              barWidth: 10,  //进度条大小
              stack: 'b',
              legendHoverLink: false,
              itemStyle: {
                normal: {
                  color: 'rgb(255,255,255)',
                }
              },
              z: 3,
              data: [positionLeft, positionLeft, positionLeft, positionLeft, positionLeft]
            },

            {
              name: '条',
              type: 'bar',
              stack: 'b',
              yAxisIndex: 0,
              data: dataLine,
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  distance: 10,
                  formatter: function(param) {
                    return param.value + '%'
                  },
                  textStyle: {
                    color: '#ffffff',
                    fontSize: '16'
                  }
                }
              },
              barWidth: 30,
              itemStyle: {
                color: {
                  image: g_cellBarImg0_y,
                  repeat: 'repeat'
                }
                /*normal: {
                    color: function(params) {
                        var num = myColor.length
                        return myColor[params.dataIndex % num]
                    }
                }*/
              },
              z: 2
            },
            /* {
              name: '白框',
              type: 'bar',
              yAxisIndex: 1,
              barGap: '-100%',
              data: [99.8, 99.9, 99.9, 99.9, 99.9],
              barWidth: 57,
              itemStyle: {
                normal: {
                  color: '#0e2147',
                  barBorderRadius: 2
                }
              },
              z: 1
            },*/
         /*   {
              name: '外框',
              type: 'bar',
              yAxisIndex: 2,
              barGap: '-100%',
              data: [100, 100, 100, 100, 100],
              barWidth: 59,
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  distance: 10,
                  formatter: function(data) {
                    return dataLine[data.dataIndex] + "%";
                  },
                  textStyle: {
                    color: '#ffffff',
                    fontSize: '16'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    var num = myColor.length
                    return myColor[params.dataIndex % num]
                  },
                  barBorderRadius: [0, 7, 0, 7]
                }
              },
              z: 0
            },*/
          ]
        }



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
