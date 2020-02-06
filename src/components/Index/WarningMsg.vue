<template>
  <!--主体背景部分-->
  <div class="warning_main">
   <!-- <td style="width:30% " @click="handleDataClick(0)">
      <span :class="[changeCol===0?'red':'blue']">{{payscrollPre}}&#45;&#45;</span><br>
      <span style="font-size:0.24rem;color:#777676;">新保保费(万元)</span></td>
    <td style="width:30%;" @click="handleDataClick(1)">
      <span :class="[changeCol===1?'red':'blue']">{{paymentPre}}&#45;&#45;</span><br>
      <span style="font-size:0.24rem;color:#777676;">期交保费(万元)</span></td>-->
    <p>当前位置：告警信息</p>
    <!--主体内容部分-->
    <div class="warning_msg">
      <!--日期选择-->
      <div class="block">
        <span class="demonstration">日期:</span>
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="开始日期">
        </el-date-picker>
      </div>
      <!--单独盒子内容-->
      <div class="single_msg" v-for="item of singleList" :key="item.id">
        <!--左边Logo部分-->
        <div class="left_logo">
          <img src="../../../static/img/MHR.png" alt="">
        </div>
        <!--右边系统名称部分-->
        <div class="right_msg">
          <i class="one">系统名称：{{item.name | ellipsis}}</i>
          <!--点击按钮出弹窗-->
          <el-button type="text" @click="open=true" class="two">查看详情</el-button>
          <el-dialog
            title="告警详情"
            :visible.sync="open"
            width="633"
            center>
            <div class="diaBox"
                 style="margin-left: 20px;">
              <i class="title">系统编号:</i>
              <i class="des">P032</i><br>
              <i class="title">系统名称:</i>
              <i class="des">{{item.name}}</i><br>
              <i class="title">系统负责人:</i>
              <i class="des">吴彦祖</i><br>
              <i class="title">告警时间:</i>
              <i class="des">{{item.time}}</i><br>
              <i class="title">延迟内容:</i>
              <i class="des">延迟延延迟延迟延延迟延迟延迟延延迟延迟延延迟延迟延延迟延迟延迟延迟延迟延迟延迟延迟延迟延迟延迟</i>
            </div>
            <span slot="footer" class="dialog-footer"
                  style="display:inline-block;width:300px;height:30px;margin-top: 15px;">
          <el-button type="primary" size="small" @click="open = false">确定</el-button>
          </span>
          </el-dialog>
          <i class="three">告警时间：{{item.time}}</i>
          <img src="../../../static/img/noread.jpg" alt="">
          <i class="four">未读</i>
        </div>
      </div>
      <!--分页插件-->
      <div class="block" style="width:540px;height: 50px;position: absolute;bottom: 15px;left:25vw;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @next-click="nextClick"
          @prev-click="prevClick"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "WarningMsg",
    // 自定义过滤器，因为系统名称可能过长
    filters: {
      ellipsis(name) {
        if (!name) return ''
        if (name.length > 8) {
          return name.slice(0, 8) + '...'
        }
        return name
      }
    },
    data() {
      return {
        changeCol: 0,
        singleListOne: [],
        singleListTwo: [],
        value: '',
        open: false,
        total: 'singleList.length',
        currentPage: 1,
        pageSize: 9,
        singleList: [
          {
            name: '1EHR系统',
            time: '2019年11月5日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月12日14时57分30秒',
          }, {
            name: '财务系统',
            time: '2019年11月19日14时57分30秒',
          }, {
            name: '办公室OA系统',
            time: '2019年11月23日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }, {
            name: '财务系统',
            time: '2019年11月20日14时57分30秒',
          }, {
            name: '办公室OA系统',
            time: '2019年11月21日14时57分30秒',
          }, {
            name: '办公室OA系统',
            time: '2019年11月21日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }, {
            name: '10财务系统',
            time: '2019年11月20日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }, {
            name: '财务系统',
            time: '2019年11月20日14时57分30秒',
          }, {
            name: '办公室OA系统',
            time: '2019年11月21日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }, {
            name: '财务系统',
            time: '2019年11月20日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }, {
            name: '财务系统',
            time: '2019年11月20日14时57分30秒',
          }, {
            name: '办公室OA系统',
            time: '2019年11月21日14时57分30秒',
          }, {
            name: '19人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }, {
            name: '财务系统',
            time: '2019年11月20日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }, {
            name: '财务系统',
            time: '2019年11月20日14时57分30秒',
          }, {
            name: '办公室OA系统',
            time: '2019年11月21日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }, {
            name: '财务系统',
            time: '2019年11月20日14时57分30秒',
          }, {
            name: '人力资源管理系统',
            time: '2019年11月10日14时57分30秒',
          }
        ]
      }
    },
    created() {
      this.total = this.singleList.length
      this.nextClick()
    },
    methods: {
      handleDataClick(color) {
        this.changeCol = color
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.total)
        console.log(this.singleList)
      },
      nextClick(val) {
        this.singleList = this.singleList.splice((this.currentPage * val) - 2, this.currentPage * this.pageSize)
      },
      prevClick(val) {
        this.singleList = this.singleList.splice((this.currentPage * val) - 1, this.currentPage * this.pageSize)
      }
    },
  }
</script>

<style scoped>
  .red {
    color: red;
  }

  .blue {
    color: blue;
  }

  /*弹窗样式*/
  .warning_msg >>> .des {
    font-size: 12px;
  }

  .warning_msg >>> .title {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
  }

  .warning_msg >>> .el-dialog__header {
    height: 30px;
    background-color: #66bded;
    padding: 7px 20px 0 !important;
  }

  .warning_msg >>> .el-dialog--center {
    /*width: 633px;*/
  }

  .warning_msg >>> .el-dialog__title {
    color: #fff;
    font-size: 14px;
  }

  .warning_msg >>> .el-dialog__headerbtn {
    top: 12px;
  }

  .warning_msg >>> .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }

  .warning_msg >>> .el-button--small, .el-button--small.is-round {
    width: 80px;
    padding: 5px 15px !important;
  }

  /*主体背景部分*/
  .warning_main {
    height: 87vh;
    min-width: 1159px;
    background-color: #f6f7ff
  }

  .warning_main p {
    display: inline-block;
    /*margin-top: 17px;*/
    margin-top: 3vh;
    margin-left: 18px;
    color: #444;
    font-size: 12px;
  }

  /*主体内容部分*/
  .warning_msg {
    height: 77vh;
    min-width: 1060px;
    margin: -0.5vh 18px 0;
    background-color: #fff;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
  }

  /*选择日期部分*/
  .block {
    margin-left: 32vw;
    margin-top: 15px;
    padding-top: 3vh;
  }

  .warning_msg >>> .el-date-editor .el-range__icon {
    line-height: 28px;
  }

  .warning_msg >>> .el-date-editor .el-range-separator {
    line-height: 28px;
  }

  /*内容单独盒子*/
  .single_msg {
    display: inline-block;
    float: left;
    width: 31%;
    height: 18%;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
    margin-top: 4vh;
    margin-left: 3vh;
    border-radius: 15px;
  }

  /*左边logo部分*/
  .left_logo {
    width: 20%;
    height: 100%;
    background-color: #f0f5f9;
    border-radius: 15px 0 0 15px;
    float: left;
  }

  .left_logo img {
    display: inline-block;
    width: 55%;
    height: 55%;
    margin-top: 29%;
    margin-left: 26%;
  }

  /*右边部分*/
  .right_msg {
    position: relative;
    width: 80%;
    height: 100%;
    float: left;
  }

  .single_msg .one {
    font-size: 1.7vh;
    display: block;
    width: 60%;
    margin-top: 3.5vh;
    margin-left: 14px;
    float: left;
    color: #333;
  }

  .single_msg .two {
    padding-top: 4vh;
    height: 2vh;
    display: inline-block;
    float: left;
    color: #66bded;
    text-decoration: underline;
    font-size: 1.7vh;
    cursor: pointer;
  }

  .single_msg .three {
    font-size: 1.7vh;
    display: block;
    margin-top: 8vh;
    margin-left: 14px;
    color: #333;
  }

  .right_msg img {
    display: inline-block;
    width: 3.3vw;
    height: 3.3vw;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 15px 0 0;
  }

  .right_msg .four {
    position: absolute;
    top: 9px;
    right: 0;
    font-size: 1.7vh;
    color: #fff;
  }

  .el-range-editor.el-input__inner {
    height: 30px;
    width: 230px;
    padding: 0 7px;
  }
</style>

