<template>
  <div class="batch_main">
    <div class="nav_table">
      <p style="color:#fff;text-align: center;font-size: 2vh;line-height: 3.8vh">批处理任务</p>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="25vh">
      <el-table-column
        prop="jobName"
        label="任务名称"
      >
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
      >
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
      >
      </el-table-column>
      <el-table-column
        prop="runTime"
        label="任务时长"
      >
      </el-table-column>
      <el-table-column
        prop="isSuccess"
        label="执行结果"
      >
      </el-table-column>
    </el-table>


  </div>

</template>

<script>
  export default {
    name: "Batch",
    data() {
      return {
        tableData: [{
          jobName: '2016-05',
          startTime: '王小虎',
          isSuccess: '王小虎',
          endTime: '上海市',
          runTime: '上海市'
        }, {
          jobName: '2016-05',
          startTime: '王小虎',
          endTime: '上海市',
          runTime: '上海市',
          isSuccess: '王小虎',
        }, {
          jobName: '2016-05',
          startTime: '王小虎',
          endTime: '上海市',
          runTime: '上海市',
          isSuccess: '王小虎',
        }, {
          jobName: '2016-05',
          startTime: '王小虎',
          endTime: '上海市',
          runTime: '上海市',
          isSuccess: '王小虎',
        }, {
          jobName: '2016-05',
          startTime: '王小虎',
          endTime: '上海市',
          runTime: '上海市',
          isSuccess: '王小虎',
        }]
      }
    }
  }
</script>

<style scoped>
  .batch_main {
    width: 100%;
    height: 30vh;
  }

  .nav_table {
    background-color: #128fd0;
    width: 100%;
    height: 4vh;
  }

  .batch_main >>> .el-table td {
    padding: 0 !important;
  }

  .batch_main >>> .el-table th.is-leaf {
    padding: 0 !important;
  }
</style>
