<template>

  <div style="width:97%;height:28vh;background-color:rgba(255,255,255,0.7);margin-top:3vh;box-shadow:0 0 4px 3px rgba(21,0,95,0.13)">
    <div id="chartError" :style="{width: '94%', height: '28vh'}"></div>
  </div>
</template>

<script>
  export default {
    name: "Ram",
    props: [
      'code',
      'time'
    ],
    data () {
      return {
        childSystem: [],//折线图的子系统
        legendName: [],//子系统的名字
        legendId: [],//子系统的id
      }
    },
    methods: {
      draw () {
        let chartError = this.$echarts.init(document.getElementById('chartError'));
        chartError.showLoading();
        let qs = require('qs')
        let information = {
          'appCode': this.code,
          'timeType': this.time,
          'type': 'E',
        }
        console.log(information)
        let legendName = []
        let legendId = []
        let temp = []
        this.$axios.post('/monitorCon/applyError/queryTopMoudleId', qs.stringify(information)).then((response) => {
          console.log(response)
          for (let i = 0; i < response.data.length; i++) {
            this.childSystem.push({
              'moudleId': response.data[i]['moudleId'],
              'moudleName': response.data[i]['moudleName']
            })
            legendId.push(this.childSystem[i].moudleId)
            legendName.push(this.childSystem[i].moudleName)
          }
          // console.log(legendName)
        })
        //设置延迟执行
        this.timer = setTimeout(() => {
          this.$axios.post('/monitorCon/applyError/queryTop', qs.stringify(information)).then((response) => {
            console.log(response)
            for (let j = 0; j < legendId.length; j++) {
              let r, q, z = `data_${j}`
              r = []
              q = []
              z = legendName[j]
              for (let i = 0; i < response.data.length; i++) {
                if (legendId[j] === response.data[i].moudleId) {
                  r.push(response.data[i].value)
                  q.push((response.data[i].controlTime).split(' ')[1])
                }
              }
              temp = {
                type: 'line',
                data: r,
                name: z,
                barWidth: '10%',
                showSymbol: true,
                symbol: 'circle',     //折点设定为实心点
                symbolSize: 3,   //设定实心点的大小

              }
              option.series.push(temp)
              option.xAxis[0].data = q
            }
            setTimeout(() => {  //为了让加载动画效果明显,这里加入了setTimeout,实现800ms延时
              chartError.hideLoading()
            }, 800)
            chartError.setOption(option, true)
          })
        }, 500)
        let option = {
          title: {
            text: '应用错误率(TOP5)',
            x: 'center',
            textStyle: {
              fontSize:'12'
            },
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            x:'left',      //可设定图例在左、右、居中
            y:'top',     //可设定图例在上、下、居中
            padding:[18,0,0,15],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            data: ['邮件营销', '联盟广告', '视频广告']
            // data:''
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
            // data: '',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          // series:[],
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
        chartError.setOption(option, true)
      }
    }
    ,
    watch: {
      code: function (value) {
        this.draw()
      }
      ,
      time: function (value) {
        this.draw()
      }
    }
    ,
    mounted() {
      this.draw() //函数调用
    }
  }
</script>

<style scoped>

</style>
