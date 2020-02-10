<template>
  <div class="slowSQL_main">
    <div class="nav_table">
      <p style="color:#fff;text-align: center;font-size: 2vh;line-height: 3.8vh">慢SQLtop5</p>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="85%">
      <el-table-column
        prop="childSystem"
        label="子系统名称"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="SQL"
        label="SQL内容"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="contorlPer"
        label="调用者"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="contorlTime"
        label="调用时间"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="time"
        label="耗时"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>


  </div>

</template>

<script>
  export default {
    name: 'SlowSQL',
    data () {
      return {
        tableData: [{
          childSystem: '2016-05-02',
          SQL: '王小虎',
          contorlPer: '金沙江路 1518 弄',
          contorlTime: '2016-05',
          time: '28374'
        }, {
          childSystem: '2016-05-04',
          SQL: '王小虎',
          contorlPer: '金沙江路 1517 弄',
          contorlTime: '2016-05-02',
          time: '28374'
        }, {
          childSystem: '2016-05-01',
          SQL: '王小虎',
          contorlPer: '上海市普陀区',
          contorlTime: '2016-05-02',
          time: '28374'
        }, {
          childSystem: '2016-05-03',
          SQL: '王小虎',
          contorlPer: '普陀区 1516 弄',
          contorlTime: '2016-05-02',
          time: '28374'
        }, {
          childSystem: '2016-05-03',
          SQL: '王小虎',
          contorlPer: '上海市',
          contorlTime: '2016-05-02',
          time: '28374'
        }]
      }
    },
    props: [
      'code',
      'time'
    ],
    methods: {
      slowTop () {
        let qs = require('qs')
        let information = {
          'appCode': this.code,
          'timeType': this.time,
          'type': 'MonitorTwelve'
        }
        console.log(information)
        this.$axios.post('/monitorCon/sqlTop/queryTop', qs.stringify(information)).then((response) => {
          console.log(response)
          // this.tableDataTop = [];
          // for (let i = 0; i < response.data.length; i++) {
          //   this.tableData.push({
          //     'moudleName': response.data[i]['moudleName'],
          //     'sqlContent': response.data[i]['sqlContent'],
          //     'caller': response.data[i]['caller'],
          //     'controlTime': response.data[i]['controlTime'],
          //     'respTime': response.data[i]['respTime'],
          //   });
          // }
        })
      },
    },
    watch: {
      code: function (value) {
        this.slowTop()
      }
      ,
      time: function (value) {
        this.slowTop()
      }
    },
    mounted () {
      this.slowTop() //函数调用
    }
  }
</script>

<style scoped>
  .slowSQL_main {
    width: 100%;
    height: 29vh;
  }

  .nav_table {
    background-color: #128fd0;
    margin-top: -1px;
    width: 100%;
    height: 4vh;
  }

  .slowSQL_main >>> .el-table td {
    padding: 0 !important;
  }

  .slowSQL_main >>> .el-table th.is-leaf {
    padding: 0 !important;
  }
</style>
