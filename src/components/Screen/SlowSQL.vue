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
    name: "SlowSQL",
    data() {
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
