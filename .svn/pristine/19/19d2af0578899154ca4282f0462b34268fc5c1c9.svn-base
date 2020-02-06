<template>
  <!--主体背景部分-->
  <div class="system_main">
    <i>当前位置：系统管理</i>
    <!--上半部分-->
    <div class="top_area">
      <!--搜索框-->
      <el-input @input="change($event)" v-model="searchData" class="search" type="text"
                placeholder="项目名称/项目编号" @keyup.enter.native="searchBut"></el-input>
      <div class="but">
        <button @click="searchBut">查询</button>
        <button @click="reset" style="margin-left: 15px!important;">重置</button>
      </div>
      <!--选择器插件-->
      <el-select @change="changeCode()" v-model="value" filterable :placeholder="value" size="small"
                 style="float: right;width:105px;margin-top: 2.5vh;margin-right:28px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--下半部分-->
    <div class="bottom_area" style="padding:3vh 15px 0">
      <!--表格插件-->
      <el-table :header-cell-style="{background:'#f0f5f9',color:'#666',borderRight:'none'}"
                :data="tableData"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(251, 255, 242, 0.8)"
                border
                height="80%"
                style="width:100%;display:block;max-height:51vh;overflow:auto;font-size:12px;"
      >
        <el-table-column
          prop="describe"
          label="系统描述"
          align="center"
        >
          <template slot-scope="scope">
            <p style="text-align:left;line-height: 20px;">系统名称：{{scope.row.systemName}}</p>
            <p style="text-align:left;line-height: 18px;">系统归属：{{scope.row.ownerShip}}</p>
            <p style="text-align:left;line-height: 18px;">负责处室：{{scope.row.describe}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectOwner"
          label="系统负责人"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="projectMembers"
          label="系统参与人"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="man"
          label="关联设备情况"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <!--点击查看出弹窗-->
            <div @click="centerDialog=true">
              <el-button @click="check(scope.$index,tableData)" type="text" size="small">
                查看
              </el-button>
            </div>
            <!--弹窗部分-->
            <el-dialog
              title="系统相关设备"
              :close-on-click-modal="false"
              :visible.sync="centerDialog"
              center>
              <div class="diaBox"
                   style="margin:15px 2vh 0 2vh;padding-bottom: 15px;">
                <!--表格部分-->
                <el-table
                  :header-cell-style="{background:'#f0f5f9',color:'#666',height:'28px'}"
                  :data="tableDataOne.slice((currentPageOne-1)*pageSizeOne,currentPageOne*pageSizeOne)"
                  border>
                  <el-table-column
                    prop="number"
                    label="序号"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="设备类型"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="ip"
                    label="设备IP"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="network"
                    label="所处网段"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="environment"
                    label="所处环境"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <!--style="display:inline-block;width:300px;height:30px;margin-top: 23px;"-->
              <span slot="footer" class="dialog-footer">
                 <div class="block" style="margin-left: auto;">
                    <el-pagination
                      @current-change="handleCurrentChangeOne"
                      :current-page="currentPageOne"
                      :page-size="pageSizeOne"
                      layout="total, prev, pager, next"
                      :total="totalOne">
                  </el-pagination>
                 </div>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column
          prop="validity"
          label="系统有效性"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <!--点击操作出弹窗-->
            <el-button @click="getAddIndex(scope.$index,scope.row)" type="text" size="small"
                       style="text-decoration: underline">
              添加
            </el-button>
            <!--弹窗部分-->
            <el-dialog title="系统相关人员"
                       :before-close="handleDialogClose"
                       :close-on-click-modal="false"
                       :visible.sync="centerDialogOne"
                       width="633"
                       center>
              <div class="diaBox"
                   style="margin-top: 10px;margin-left:2.7vh">
                <el-input @input="change($event)" v-model="searchDataTest" class="search" type="text"
                          placeholder="姓名/用户名"
                          @keyup.enter.native="searchButTest"></el-input>
                <div class="but">
                  <button @click="searchButTest">查询</button>
                  <button @click="resetTest" style="margin-left: 15px!important;">重置</button>
                </div>
                <el-table :header-cell-style="{background:'#f0f5f9',color:'#666',borderRight:'none'}"
                          :data="tableDataTest"
                          border
                          style="width:100%;display:block;font-size:12px;max-height: 51vh;overflow: auto;"
                >
                  <el-table-column
                    prop="people"
                    label="人员用户名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="人员姓名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="handle"
                    label="操作"
                  >
                    <template slot-scope="scope">
                      <div style="cursor: pointer"  @click="choose(scope.$index,tableDataTest,tableData)">
                        <el-button type="text" size="small" style="font-size: 14px;">
                          点击添加
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!--style="display:inline-block;width:300px;height:30px;margin-top: 15px;"-->
              <span slot="footer" class="dialog-footer">
                 <div class="block" style="width:600px;height: 6vh;margin-top: 3vh;left:40vw;">
                  <el-pagination
                    background
                    @current-change="handleCurrentChangeTest"
                    :current-page="currentPageTest"
                    :page-size="pageSizeTest"
                    layout="total,prev, pager, next"
                    :total="totalTest">
                  </el-pagination>
                </div>
          </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <!--分页插件-->
      <!--width:600px;height: 6vh;position: absolute;bottom: 4vh;left:40vw;-->
      <div class="block" style="width:600px;height: 6vh;margin-top: 3vh;left:40vw;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,20,30]"
          :page-size="pageSize"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "SystemMan",
    data() {
      return {
        searchDataTest: '',
        valueAdd: [],
        joinAddValue: [],
        total: null,
        totalOne: null,
        totalTest: null,
        currentPage: 1,
        currentPageOne: 1,
        currentPageTest: 1,
        pageSize: 5,
        pageSizeOne: 6,
        pageSizeTest: 8,
        centerDialog: false,
        centerDialogOne: false,
        options: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 'JT',
            label: '集团'
          },
          {
            value: 'CX',
            label: '产险'
          },
          {
            value: 'SX',
            label: '寿险'
          }
        ],
        tableData: [],
        tableDataOne: [],//系统列表
        tableDataTest: [],//添加人员的列表
        value: '',
        searchData: '',//搜索框输入的值
        importantIndex: '',
        joiner: [],
        ownerShip: [],
        room: [],
        ownId: [],
        loading: true //表格加载动画
      }
    },
    created() {
    },
    methods: {
      handleDialogClose() {
        this.centerDialogOne=false
        this.searchDataTest=''
      },
      //操作功能给系统添加人员
      choose(index, tableDataTest, tableData) {
        this.systemId = tableData[this.importantIndex].projectId;
        this.userId = tableDataTest[index].people  //当前选中人的对应ID
        let qs = require('qs');
        let information = {
          "projectId": this.systemId,
          "part": "1",
          "userId": this.userId,
        };
        // console.log(information)
        this.$axios.post('/monitorCon/system/userProject/add', qs.stringify(information)).then((response) => {
          // console.log(response)
          if (response.data.type === 'success') {
            this.$message({
              message: '添加参与人员成功！',
              type: 'success'
            });
          }
          if (response.data.type === 'fail') {
            this.$message.error('添加失败，此人已是该项目参与人！！！');
          }
          this.getSystem()
          // this.centerDialogOne = false
        });
      },
      searchButTest() {
        this.currentPageTest = 1
        this.getPerson()
        if (this.searchDataTest === "") {
          alert('查询条件不能为空，请重新输入')
        }
      },
      resetTest() {
        //重置后输入框清空
        this.searchDataTest = ""
        this.getPerson()
      },
      //点击系统弹出对应的关联设备
      check(index, tableData) {
        this.importantIndex = index
        this.projectId = tableData[index].projectId;
        let qs = require('qs');
        let information = {"projectId": this.projectId};
        this.$axios.post('/monitorCon/system/appInfo/querySysByProject', qs.stringify(information)).then((response) => {
          // console.log(response)
          this.tableDataOne = []
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i]['networkregion'] === null && response.data[i]['env'] === null) {
              this.tableDataOne.push({
                'number': i + 1,
                'type': response.data[i]['htype'],
                'ip': response.data[i]['ip'],
                'network': '--',
                'environment': '--',
              });
            } else {
              this.tableDataOne.push({
                'number': i + 1,
                'type': response.data[i]['htype'],
                'ip': response.data[i]['ip'],
                'network': response.data[i]['networkregion'],
                'environment': response.data[i]['env'],
              });
            }
          }
          this.totalOne = this.tableDataOne.length
        });
      },
      //查询按钮的方法
      searchBut() {
        this.currentPage = 1
        this.getSystem()
        if (this.searchData === "") {
          alert('查询条件不能为空，请重新输入')
        }
      },
      //操作按钮的弹窗的人员列表
      getPerson() {
        let qs = require('qs');
        let information = {
          "pageNum": this.currentPageTest,
          "pageSize": this.pageSizeTest,
          "userInfo": this.searchDataTest
        }
        this.$axios.post('/monitorCon/system/user/query', qs.stringify(information)).then((response) => {
          // console.log(response)
          this.totalTest = response.data.total
          this.tableDataTest = []
          for (let i = 0; i < response.data.list.length; i++) {
            this.tableDataTest.push({
              'people': response.data.list[i]['userId'],
              'name': response.data.list[i]['userName'],
            })
          }
        });
      },
      //重置按钮的方法
      reset() {
        //重置后下拉框为全部
        this.value = ''
        //重置后输入框清空
        this.searchData = ""
        this.getSystem()
      },
      //按条件筛选表格内容
      changeCode() {
        this.currentPage = 1
        this.getSystem()
      },
      //获取表格中系统的列表
      getSystem() {
        let qs = require('qs');
        let information = {
          "userId": sessionStorage.getItem("userId"),
          "pageNum": this.currentPage,
          "pageSize": this.pageSize,
          "projectInfo": this.searchData,
          "companyCode": this.value
        };
        // console.log(information)
        this.$axios.post('/monitorCon/system/project/queryCascadeProject', qs.stringify(information)).then((response) => {
          // console.log(response)
          this.total = response.data.total
          this.tableData = []
          this.joiner = []
          for (let i = 0; i < response.data.list.length; i++) {
            if (response.data.list[i]['enable'] === '1') {
              response.data.list[i]['enable'] = '正常'
            } else {
              response.data.list[i]['enable'] = '停用'
            }
            let projectname = response.data.list[i]['projectname']
            let projectMembers = response.data.list[i]['projectMembers']
            let projectId = response.data.list[i]['projectid']
            let projectOwner = response.data.list[i]['projectOwners']
            let validity = response.data.list[i]['enable']
            // console.log(projectOwner)
            if (projectOwner.length > 1) {
              for (let q = 0; q < projectOwner.length; q++) {
                //将所属部门转换为汉字
                if (projectOwner[q].companyCode === 'JT') {
                  projectOwner[q].companyCode = '集团'
                }
                if (projectOwner[q].companyCode === 'SX') {
                  projectOwner[q].companyCode = '寿险'
                }
                if (projectOwner[q].companyCode === 'CX') {
                  projectOwner[q].companyCode = '产险'
                }
                this.joiner.push(
                  projectOwner[q].userName
                );
                this.ownId.push(
                  projectOwner[q].userId
                );
                // this.ownerShip.push(
                //   projectOwner[q].companyCode
                // );
                // this.room.push(
                //   projectOwner[q].dept
                // );
              }

              this.tableData.push({
                'ownId': this.ownId,
                'projectOwner': this.joiner,
                'systemName': projectname,
                'projectMembers': projectMembers,
                'projectId': projectId,
                'ownerShip': projectOwner[0].companyCode,
                'describe': projectOwner[0].dept,
                'validity': validity,
              })

            } else {
              for (let j = 0; j < projectOwner.length; j++) {
                //将参与人员用逗号隔起来
                // console.log(projectMembers)
                if (projectMembers.length > 1) {
                  projectMembers = projectMembers.join(',')
                }
                //将所属部门转换为汉字
                if (projectOwner[j].companyCode === 'JT') {
                  projectOwner[j].companyCode = '集团'
                }
                if (projectOwner[j].companyCode === 'SX') {
                  projectOwner[j].companyCode = '寿险'
                }
                if (projectOwner[j].companyCode === 'CX') {
                  projectOwner[j].companyCode = '产险'
                }

                this.tableData.push({
                  'ownId': projectOwner[j].userId,
                  'systemName': projectname,
                  'projectMembers': projectMembers,
                  'projectId': projectId,
                  'projectOwner': projectOwner[j].userName,
                  'ownerShip': projectOwner[j].companyCode,
                  'describe': projectOwner[j].dept,
                  'validity': validity,
                });
              }
            }
            if (projectOwner.length === 0) {
              this.tableData.push({
                // 'ownId': projectOwner[j].userId,
                'systemName': projectname,
                'projectMembers': projectMembers,
                'projectId': projectId,
                'projectOwner': '暂无数据',
                // 'ownerShip': projectOwner[j].companyCode,
                // 'describe': projectOwner[j].dept,
                'validity': validity,
              });
            }
          }
          this.loading = false //数据加载完毕，动画消失
        });
      },
      //获取该系统的索引
      getAddIndex(index) {
        this.getPerson()
        this.centerDialogOne = true
        this.importantIndex = index
      },
      change(e) {
        this.$forceUpdate()
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.getSystem()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getSystem()
      },
      handleCurrentChangeOne(val) {
        this.currentPageOne = val;
      },
      handleCurrentChangeTest(val) {
        this.currentPageTest = val;
        this.getPerson()
      },
    },
    computed: {},
    mounted() {
      this.getSystem()
    },
    watch: {
      //监听查看相关设备的弹窗的centerDialog值，解决关闭弹窗分页状态保持问题
      centerDialog: {
        handler(newName, oldName) {
          this.currentPageOne = 1;
        },
      }
    }
  }
</script>

<style scoped>
  .bottom_area .search {
    float: left;
    width: 270px;
    height: 20px;
    margin-bottom: 4vh;
  }

  .bottom_area >>> .el-input__inner {
    height: 28px;
  }

  .bottom_area >>> .el-select .el-input .el-select__caret {
    line-height: 12px;
  }

  .bottom_area .but {
    float: left;
    display: inline-block;
  }

  .bottom_area .but button {
    width: 72px;
    height: 27px;
    margin-left: 20px;
    border: none;
    background-color: #43abe9;
    border-radius: 5px;
    color: #fff;
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  /*去掉el-table的多余横线*/
  .el-table::before {
    z-index: inherit;
    height: 0px !important;
  }

  /*弹窗弹出的表格样式*/
  .bottom_area >>> .cell {
    line-height: 22px !important;
  }

  /*弹窗样式*/
  .diaBox p {
    float: left;
    margin-top: 23px;
  }

  .diaBox .eqiIp {
    margin-left: 15px;
  }

  .diaBox .el-table >>> .cell {
    text-align: center;
  }

  .bottom_area >>> .el-dialog__header {
    height: 36px;
    background-color: #66bded;
    padding: 7px 20px 0px !important;
  }

  .bottom_area >>> .el-dialog--center {
    /*width: 633px;*/
  }

  .bottom_area >>> .el-dialog__title {
    color: #fff;
    font-size: 14px;
  }

  .bottom_area >>> .el-dialog__headerbtn {
    top: 12px;
  }

  .bottom_area >>> .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }

  .bottom_area >>> .el-button--small, .el-button--small.is-round {
    padding: 5px 15px !important;
  }

  /*主体背景部分*/
  .system_main {
    height: 87vh;
    min-width: 1159px;
    background-color: #f6f7ff
  }

  .system_main i {
    display: inline-block;
    color: #444;
    font-size: 12px;
    margin-top: 17px;
    margin-left: 18px;
  }

  /*上半部分*/
  .top_area {
    height: 9vh;
    margin: 11px 18px 0;
    background-color: #fff;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
  }

  /*搜索框*/
  .top_area .search {
    float: left;
    width: 270px;
    height: 20px;
    margin-left: 24px;
    margin-top: 2.5vh;
  }

  .top_area >>> .el-input__inner {
    height: 28px;
  }

  .top_area >>> .el-select .el-input .el-select__caret {
    line-height: 12px;
  }

  .top_area .but {
    float: left;
    display: inline-block;
    margin-top: 2.5vh;
  }

  .top_area .but button {
    width: 72px;
    height: 27px;
    margin-left: 20px;
    border: none;
    background-color: #43abe9;
    border-radius: 5px;
    color: #fff;
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  /*下半部分*/
  .bottom_area {
    height: 63vh;
    margin: 17px 18px 0;
    background-color: #fff;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
  }

  .bottom_area .btn0, .bottom_area .btn1 {
    display: inline-block;
    color: #66bded;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #a3d7f4;
    box-shadow: 0 2px 5px 2px rgba(145, 208, 243, 0.3);
    width: 95px;
    height: 28px;
    font-weight: bold;
  }

  .bottom_area >>> .btn1 {
    margin-left: 52px;
    color: #fff !important;
    background-color: #66bded;
  }

  /*主体表格样式*/
  .bottom_area >>> .el-table tr {
    height: 29px !important;
  }

  .bottom_area >>> .tableHead {
    font-size: 14px;
    font-family: '黑体';
  }

  .bottom_area >>> .el-table td, .el-table th {
    padding: 1px 0 !important;
  }

  /*穿梭框的宽度*/
  .bottom_area >>> .el-transfer-panel {
    width: 41.5vh;
  }

  .bottom_area >>> .el-transfer__buttons {
    padding: 0 3vh !important;
  }

  .bottom_area >>> .el-dialog {
    width: 106vh !important;
  }

  .bottom_area >>> .el-dialog__footer {
    padding-top: 0;
  }

  .bottom_area >>> .el-table__header {
    background-color: #f0f5f9;
  }

  .bottom_area >>> .el-dialog--center .el-dialog__body {
    padding: 13px 16px !important;
    min-height: 120px;
  }
</style>
<style>
  /*表格纵列内容过多时点点点*/
  .el-tooltip__popper {
    max-width: 60% !important;
  }
</style>

