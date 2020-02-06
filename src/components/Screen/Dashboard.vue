<template>
  <div style="width:99%;height:58vh;background-color:rgba(255,255,255,0.7);margin-top:2vh;box-shadow:0 0 2px 2px #2CF8DE">
    <div id="chartDashboard" :style="{width: '96%', height: '95%',margin:'auto'}"></div>
  </div>
</template>
<script>
  export default {
    name: "Dashboard",
    methods: {
      draw() {
        let chartDashboard = this.$echarts.init(document.getElementById('chartDashboard'));
        let option = {
          title: {
            text: '数据源连接使用率(TOP3)',
            x: 'center',
            y:'top',
            padding:[20,0,0,0],
            textStyle: {
              fontSize:'20'
            },
          },
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [
            {
              name: '数据源连接使用率',
              type: 'gauge',
              radius: "57%",//仪表盘的大小
              center: ['18%', '80%'], //**调整仪表盘的位置**
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 18,
                  color: [[0.2, '#128fd0'], [0.8, '#fda027'], [1, '#ff7b7c']]
                }
              },
              axisTick: {             // 刻度(线)样式。
                show: true,             // 是否显示刻度(线),默认 true。
                splitNumber: 5,         // 分隔线之间分割的刻度数,默认 5。
                length: 12,              // 刻度线长。支持相对半径的百分比,默认 8。
                lineStyle: {            // 刻度线样式。
                  color: "#eee",              //线的颜色,默认 #eee。
                  opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  width: 1,                   //线度,默认 1。
                  type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                  shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                },
              },
              splitLine: {           // 分隔线
                show: true,             // 是否显示分隔线,默认 true。
                length: 30,             // 分隔线线长。支持相对半径的百分比,默认 30。
                lineStyle: {            // 分隔线样式。
                  color: "#eee",              //线的颜色,默认 #eee。
                  opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  width: 2,                   //线度,默认 2。
                  type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                  shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                }
              },
              itemStyle: {            // 仪表盘指针样式。
                color: "auto",          // 指针颜色，默认(auto)取数值所在的区间的颜色
                opacity: 1,  // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                borderWidth: 0,         // 描边线宽,默认 0。为 0 时无描边。
                borderType: "solid",    // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
                borderColor: "#000",    // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
                shadowBlur: 10,         // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: "#fff",    // 阴影颜色。支持的格式同color。
              },
              title: {                // 仪表盘标题。
                show: true,             // 是否显示标题,默认 true。
                offsetCenter: [0, "-40%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                color: "#333",          // 文字的颜色,默认 #333。
                fontSize: 14,           // 文字的字体大小,默认 15。
              },
              detail: {               // 仪表盘详情，用于显示数据。
                textStyle: {       // 其余属性默认使用全局文本样式
                  fontWeight: 'bolder',
                  fontSize: 24
                },
                show: true,             // 是否显示详情,默认 true。
                offsetCenter: [0, "50%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                color: "auto",          // 文字的颜色,默认 auto。
                fontSize: 30,           // 文字的字体大小,默认 15。
                formatter: "{value}%",  // 格式化函数或者字符串
              },
              pointer: {              // 仪表盘指针。
                show: true,             // 是否显示指针,默认 true。
                length: "70%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                width: 5,               // 指针宽度,默认 8。
              },
              //  markPoint:{
              //             symbol:'circle',
              //             symbolSize:5,
              //             data:[
              //                 //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
              //               {x:'center',y:'center',itemStyle:{color:'#FFF'}}
              //               ]
              //         },

              data: [
                {value: 70, name: 'P160_shortins_zhongtai'},
              ]
            },
            {
              name: '数据源连接使用率',
              type: 'gauge',
              radius: "66%",//仪表盘的大小
              center: ['50%', '45%'], //**调整仪表盘的位置**
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 24,
                  color: [[0.2, '#128fd0'], [0.8, '#fda027'], [1, '#ff7b7c']]
                }
              },
              axisTick: {             // 刻度(线)样式。
                show: true,             // 是否显示刻度(线),默认 true。
                splitNumber: 5,         // 分隔线之间分割的刻度数,默认 5。
                length: 12,              // 刻度线长。支持相对半径的百分比,默认 8。
                lineStyle: {            // 刻度线样式。
                  color: "#eee",              //线的颜色,默认 #eee。
                  opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  width: 1,                   //线度,默认 1。
                  type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                  shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                },
              },
              splitLine: {           // 分隔线
                show: true,             // 是否显示分隔线,默认 true。
                length: 30,             // 分隔线线长。支持相对半径的百分比,默认 30。
                lineStyle: {            // 分隔线样式。
                  color: "#eee",              //线的颜色,默认 #eee。
                  opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  width: 2,                   //线度,默认 2。
                  type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                  shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                }
              },
              itemStyle: {            // 仪表盘指针样式。
                color: "auto",          // 指针颜色，默认(auto)取数值所在的区间的颜色
                opacity: 1,  // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                borderWidth: 0,         // 描边线宽,默认 0。为 0 时无描边。
                borderType: "solid",    // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
                borderColor: "#000",    // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
                shadowBlur: 10,         // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: "#fff",    // 阴影颜色。支持的格式同color。
              },
              title: {                // 仪表盘标题。
                show: true,             // 是否显示标题,默认 true。
                offsetCenter: [0, "-40%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                color: "#333",          // 文字的颜色,默认 #333。
                fontSize: 14,           // 文字的字体大小,默认 15。
              },
              detail: {               // 仪表盘详情，用于显示数据。
                textStyle: {       // 其余属性默认使用全局文本样式
                  fontWeight: 'bolder',
                  fontSize: 24
                },
                show: true,             // 是否显示详情,默认 true。
                offsetCenter: [0, "50%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                color: "auto",          // 文字的颜色,默认 auto。
                fontSize: 30,           // 文字的字体大小,默认 15。
                formatter: "{value}%",  // 格式化函数或者字符串
              },
              pointer: {              // 仪表盘指针。
                show: true,             // 是否显示指针,默认 true。
                length: "70%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                width: 5,               // 指针宽度,默认 8。
              },
              //  markPoint:{
              //             symbol:'circle',
              //             symbolSize:5,
              //             data:[
              //                 //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
              //               {x:'center',y:'center',itemStyle:{color:'#FFF'}}
              //               ]
              //         },

              data: [
                {value: 70, name: 'P160_shortins_zhongtai'},
              ]
            },
            {
              name: '数据源连接使用率',
              type: 'gauge',
              radius: "57%",//仪表盘的大小
              center: ['82%', '80%'], //**调整仪表盘的位置**
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 18,
                  color: [[0.2, '#128fd0'], [0.8, '#fda027'], [1, '#ff7b7c']]
                }
              },
              axisTick: {             // 刻度(线)样式。
                show: true,             // 是否显示刻度(线),默认 true。
                splitNumber: 5,         // 分隔线之间分割的刻度数,默认 5。
                length: 12,              // 刻度线长。支持相对半径的百分比,默认 8。
                lineStyle: {            // 刻度线样式。
                  color: "#eee",              //线的颜色,默认 #eee。
                  opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  width: 1,                   //线度,默认 1。
                  type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                  shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                },
              },
              splitLine: {           // 分隔线
                show: true,             // 是否显示分隔线,默认 true。
                length: 30,             // 分隔线线长。支持相对半径的百分比,默认 30。
                lineStyle: {            // 分隔线样式。
                  color: "#eee",              //线的颜色,默认 #eee。
                  opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  width: 2,                   //线度,默认 2。
                  type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                  shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                }
              },
              itemStyle: {            // 仪表盘指针样式。
                color: "auto",          // 指针颜色，默认(auto)取数值所在的区间的颜色
                opacity: 1,  // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                borderWidth: 0,         // 描边线宽,默认 0。为 0 时无描边。
                borderType: "solid",    // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
                borderColor: "#000",    // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
                shadowBlur: 10,         // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: "#fff",    // 阴影颜色。支持的格式同color。
              },
              title: {                // 仪表盘标题。
                show: true,             // 是否显示标题,默认 true。
                offsetCenter: [0, "-40%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                color: "#333",          // 文字的颜色,默认 #333。
                fontSize: 14,           // 文字的字体大小,默认 15。
              },
              detail: {               // 仪表盘详情，用于显示数据。
                textStyle: {       // 其余属性默认使用全局文本样式
                  fontWeight: 'bolder',
                  fontSize: 24
                },
                show: true,             // 是否显示详情,默认 true。
                offsetCenter: [0, "50%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                color: "auto",          // 文字的颜色,默认 auto。
                fontSize: 30,           // 文字的字体大小,默认 15。
                formatter: "{value}%",  // 格式化函数或者字符串
              },
              pointer: {              // 仪表盘指针。
                show: true,             // 是否显示指针,默认 true。
                length: "70%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                width: 5,               // 指针宽度,默认 8。
              },
              //  markPoint:{
              //             symbol:'circle',
              //             symbolSize:5,
              //             data:[
              //                 //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
              //               {x:'center',y:'center',itemStyle:{color:'#FFF'}}
              //               ]
              //         },

              data: [
                {value: 70, name: 'P160_shortins_zhongtai'},
              ]
            }
          ]
        };
        chartDashboard.setOption(option, true);
        window.addEventListener("resize", () => { chartDashboard.resize();});
      }
    },
    mounted() {
      this.draw() //函数调用
    }
  }
</script>

<style scoped>

</style>
