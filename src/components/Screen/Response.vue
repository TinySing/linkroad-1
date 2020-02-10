<template>
  <div class="response_main">
    <div class="nav_table">
      <p style="color:#fff;text-align: center;font-size: 2vh;line-height: 3.8vh">响应时间top5</p>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="24.3vh">
      <el-table-column
        prop="childSystem"
        label="子系统名称"
        width="120"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="url"
        label="url"
        width="180"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="averageTime"
        label="平均请求时间"
        width="80"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="请求次数"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    name: 'Response',
    props: [
      'code',
      'time'
    ],
    data () {
      return {
        tableData: [
          {
            childSystem: '2016-05-02',
            url: '王小虎',
            averageTime: '1518 弄',
            count: '28374'
          }, {
            childSystem: '2016-05-04',
            url: '王小虎',
            averageTime: '普陀区金沙江路',
            count: '237'
          }, {
            childSystem: '2016-05-01',
            url: '王小虎',
            averageTime: '上海市金沙江路',
            count: '74'
          }, {
            childSystem: '2016-05-03',
            url: '王小虎',
            averageTime: '金沙江路',
            count: '2874'
          }, {
            childSystem: '2016-05-03',
            url: '王小虎',
            averageTime: '金沙江路',
            count: '8374'
          }]
      }
    },
    methods: {
      responseTop() {
        let qs = require('qs');
        let information = {
          'appCode': this.code,
          'timeType': this.time,
          'type':'MonitorNine'
        };
        console.log(information)
        this.$axios.post('/monitorCon/response/queryTop', qs.stringify(information)).then((response) => {
          console.log(response)
          // this.tableData = [];
          // for (let i = 0; i < response.data.length; i++) {
          //   this.tableDataRes.push({
          //     'moudleName': response.data[i]['moudleName'],
          //     'uri': response.data[i]['url'],
          //     'average': response.data[i]['respTime'],
          //     'requestsNum': response.data[i]['respCount']
          //   });
          // }
        });
      },
    },
    watch: {
      code: function (value) {
        this.responseTop()
      }
      ,
      time: function (value) {
        this.responseTop()
      }
    },
    mounted () {
      this.responseTop() //函数调用
    }
  }
</script>

<style scoped>
  .response_main {
    width: 100%;
    height: 30vh;
  }

  .nav_table {
    background-color: #128fd0;
    width: 100%;
    height: 4vh;
  }

  .response_main >>> .el-table td {
    padding: 0 !important;
  }

  .response_main >>> .el-table th.is-leaf {
    padding: 0 !important;
  }
</style>
