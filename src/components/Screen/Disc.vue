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
          let nameOne =  ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          let myColor = ['#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
          let option = {

            title: {
              text: '磁盘空间',
              textStyle: {
                fontSize:'12'
              },
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'none'

              }
            },

            legend: {
              // type:'scroll',
              // orient: 'vertical',
              textStyle:{
                color: '#000',
                fontSize: '10',
              },
              x:'left',      //可设定图例在左、右、居中
              y:'15',     //可设定图例在上、下、居中
              // padding:[18,0,0,15],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
              data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },




          backgroundColor: '#fff',
          grid: {
            left: '5%',
            // top: '25%',
            right: '3%',
            bottom: '-5%',
            containLabel: true
          },
          xAxis: [{
            show: false,
          }],
          yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            offset: '1',
            axisLabel: {
                textStyle: {
                color: function(params,index) {
                  console.log(params,index)
                  let num = myColor.length;
                  return myColor[index % num]
                },
                fontSize: '10',
              }
            },
            data: ['20%', '30%', '40%', '50%', '20%']
          }, {
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              textStyle: {
                color: '#000',
                fontSize: '10',
              }
            },
            data: [ '55', '44', '33', '22', '11']
          },
            {
            // name: '分拨延误TOP 10',
            // nameGap: '50',
           /* nameTextStyle: {
              color: '#000',
              fontSize: '16',
            },*/
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)'
              }
            },
            data: [],
          }

          ],
          series: [

          /*  {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: [ 44, 50, 52, 60, 72],
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#ffffff',
                  fontSize: '10', //进度条上面的字体大小
                }
              }
            },
            barWidth: 12,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num]
                },
              }
            },
            z: 2
          },*/
        /*    {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [ 99.5, 99.5, 99.5, 99.5, 99.5],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#0e2147',
                barBorderRadius: 5,
              }
            },
            z: 1
          },*/
            {
            name: nameOne[0],
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: [ 20, 30, 40,100, 20],
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num]
                },
                barBorderRadius: 5,
              }
            },
            z: 0
          },
            {
              name: nameOne[1],
              type: 'bar',
              yAxisIndex: 2,
              barGap: '-100%',
              data: [ 20, 30, 40,100, 20],
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var num = myColor.length;
                    return myColor[params.dataIndex % num]
                  },
                  barBorderRadius: 5,
                }
              },
              z: 0
            },
            {
              name: nameOne[2],
              type: 'bar',
              yAxisIndex: 2,
              barGap: '-100%',
              data: [ 20, 30, 40,100, 20],
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var num = myColor.length;
                    return myColor[params.dataIndex % num]
                  },
                  barBorderRadius: 5,
                }
              },
              z: 0
            },
            {
              name: nameOne[3],
              type: 'bar',
              yAxisIndex: 2,
              barGap: '-100%',
              data: [ 20, 30, 40,100, 20],
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var num = myColor.length;
                    return myColor[params.dataIndex % num]
                  },
                  barBorderRadius: 5,
                }
              },
              z: 0
            },
            {
              name: nameOne[4],
              type: 'bar',
              yAxisIndex: 2,
              barGap: '-100%',
              data: [ 20, 30, 40,100, 20],
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var num = myColor.length;
                    return myColor[params.dataIndex % num]
                  },
                  barBorderRadius: 5,
                }
              },
              z: 0
            },
            /*{
              name: '外圆',
              type: 'scatter',
              hoverAnimation: false,
              data: [ 0, 0, 0, 0, 0],
              yAxisIndex: 2,
              symbolSize: 35,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var num = myColor.length;
                    return myColor[params.dataIndex % num]
                  },
                  opacity: 1,
                }
              },
              z: 2
            }*/
          ]
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
