<template>
  <div class="main_bgm" :style="bgImg">
    <div class="nav" :style="navImg">
      <div class="nav-back">
        <img src="../../static/img/back.png" alt="">
        <span>返回</span>
      </div>

      <div class="system" @click="centerDialog = true">
        <h2 v-text="systemText"></h2>
        <i class="el-icon-arrow-down"></i>
      </div>

      <div class="scale">
        <img src="../../static/img/scaleSmall.png" alt="">
        <span>缩小</span>
      </div>


      <!--  <input placeholder="点击选择系统"
               class="system"
               type="text"
               value=""
               @click="centerDialog = true"
               v-model="systemText"
        />-->

      <el-dialog
        title="请选择您的系统"
        :visible.sync="centerDialog"
        :close-on-click-modal="false"
        width="633"
        center>
        <!--列表-->
        <div class="diaBox">
          <el-input class="search" type="text" v-model="searchData" placeholder="系统编号/系统名称"
                    @keyup.enter.native="search"></el-input>
          <el-button size="middle" type="primary" @click="search"
                     style="float:left;margin-left: 10px;padding: 6px 15px;margin-top:3px;">搜索
          </el-button>
          <el-button size="middle" type="primary" @click="reset"
                     style="float:left;margin-left: 10px;padding: 6px 15px;margin-top:3px;">重置
          </el-button>
          <el-table
            :header-cell-style="{background:'#f0f5f9',color:'#666'}"
            border
            :data="sysList"
          >
            <el-table-column
              prop="sysCode"
              label="系统编号"
            >
              <template slot-scope="scope">
                <div style="cursor: pointer;" @click="choose(scope.$index,sysList)">{{scope.row.sysCode}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sysName"
              label="系统名称"
            >
              <template slot-scope="scope">
                <div style="cursor: pointer;" @click="choose(scope.$index,sysList)">{{scope.row.sysName}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="handle"
              label="操作"
            >
              <template slot-scope="scope">
                <div style="cursor: pointer" @click="choose(scope.$index,sysList)">
                  <el-button type="text" size="small" style="font-size: 14px;">
                    点击选择
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
           <!--选择系统出弹窗上的分页-->
          <div class="block" style="margin-left: auto;">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total,prev,pager, next"
              :total="total">
            </el-pagination>
          </div>
        </span>
      </el-dialog>

      <div class="select-time">[
        <el-select v-model="valueOne" placeholder="请选择" @change="changeTime">
          <el-option
            v-for="item in optionsOne"
            :key="item.valueOne"
            :label="item.labelOne"
            :value="item.valueOne">
          </el-option>
        </el-select>
        <span>( 截止到:{{ nowDate + ' ' + nowTime + ' '}} )</span>
        ]

      </div>


    </div>

    <div class="left">
      <div class="disc">
        <Disc></Disc>
      </div>
      <div class="ram">
        <Ram :code='needCode' :time="valueOne"></Ram>
      </div>
      <div class="cpu">
        <Cpu></Cpu>
      </div>
    </div>
    <div class="middle">
      <div class="middle_top">
        <div class="fullGC">
          <FullGC :code='needCode' :time="valueOne"></FullGC>
        </div>
        <div class="apply">
          <Apply :code='needCode' :time="valueOne"></Apply>
        </div>
        <div class="error">
          <Error :code='needCode' :time="valueOne"></Error>
        </div>
      </div>
      <div class="dashboard">
        <Dashboard></Dashboard>
      </div>
    </div>
    <div class="right">
      <div class="batch">
        <Batch :code='needCode' :time="valueOne"></Batch>
        <!--<ScrollTable></ScrollTable>-->
      </div>
      <div class="response">
        <Response :code='needCode' :time="valueOne"></Response>
      </div>
      <div class="slowSQL">
        <SlowSQL :code='needCode' :time="valueOne"></SlowSQL>
      </div>
    </div>
  </div>

</template>

<script>
  import Disc from './Screen/Disc'
  import Ram from './Screen/Ram'
  import Cpu from './Screen/Cpu'
  import FullGC from './Screen/FullGC'
  import Apply from './Screen/Apply'
  import Error from './Screen/Error'
  import Dashboard from './Screen/Dashboard'
  import Batch from './Screen/Batch'
  import Response from './Screen/Response'
  import SlowSQL from './Screen/SlowSQL'
  // import ScrollTable from './Screen/ScrollTable'

  export default {
    name: 'SmallScreen',
    components: {Cpu, Ram, Disc, FullGC, Apply, Error, Dashboard, Batch, Response, SlowSQL}
    ,
    data () {
      return {
        navImg: {
          backgroundImage: 'url(' + require('../../static/img/screen_nav.jpg') + ') ',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        },
        bgImg: {
          backgroundImage: 'url(' + require('../../static/img/screen_main.jpg') + ') ',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        },
        centerDialog: false,//选择系统弹窗默认关闭
        searchData: '',
        total: null,         // 分页
        currentPage: 1,
        pageSize: 8,
        systemText: '',
        needCode: '',
        // sysList: [], //选择系统弹窗显示的系统的列表
        sysList: [
          {
            sysCode: 'P095',
            sysName: '极限端系统'
          }, {
            sysCode: 'Y045',
            sysName: '运营大屏操作系统'
          }
        ], //选择系统弹窗显示的系统的列表

        valueOne: '',
        optionsOne: [
          {
            valueOne: 'One',
            labelOne: '最近30分钟'
          },
          {
            valueOne: 'Two',
            labelOne: '最近2小时'
          },
          {
            valueOne: 'Three',
            labelOne: '最近8小时'
          },
          {
            valueOne: 'Four',
            labelOne: '最近24小时'
          }
        ],
        nowDate: '',    // 当前日期
        nowTime: '',    // 当前时间
        nowWeek: ''     // 当前星期
      }
    },
    methods: {
      changeTime (value) {
        // console.log(this.valueOne)
        // console.log(this.needCode)
      // console.log(value)
      },
      currentTime () {
        setInterval(this.getDate, 500)
      },
      getDate: function () {
        var _this = this
        let yy = new Date().getFullYear()
        let mm = new Date().getMonth() + 1
        let dd = new Date().getDate()
        let week = new Date().getDay()
        let hh = new Date().getHours()
        let mf =
          new Date().getMinutes() < 10
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes()
        /*  if (week == 1) {
            this.nowWeek = "星期一";
          } else if (week == 2) {
            this.nowWeek = "星期二";
          } else if (week == 3) {
            this.nowWeek = "星期三";
          } else if (week == 4) {
            this.nowWeek = "星期四";
          } else if (week == 5) {
            this.nowWeek = "星期五";
          } else if (week == 6) {
            this.nowWeek = "星期六";
          } else {
            this.nowWeek = "星期日";
          }*/
        _this.nowTime = hh + ':' + mf
        _this.nowDate = yy + '-' + mm + '-' + dd
      },
      dialogData () {
        let qs = require('qs')
        let information = {'userId': ''}
        this.$axios.post('/monitorCon/system/userProject/queryProject', qs.stringify(information)).then((response) => {
          if (response === null) return
          this.sysList = []
          //选择系统框是否默认显示第一条  this.systemText  = response.data[0]['projectname']
          for (let i = 0; i < response.data.length; i++) {
            this.sysList.push({
              'sysCode': response.data[i]['projectid'],
              'sysName': response.data[i]['projectname']
            })
          }
          // 获取数据之后的实际分页
          this.total = this.sysList.length
          this.data = this.sysList
          this.searchList()
        })
      },
      search () {
        this.currentPage = 1
        this.dialogData()
        //如果内容为空，则弹出提示
        if (this.searchData === '') {
          alert('查询条件不能为空，请重新输入')
        }
      },
      //将弹窗选择的值映射到输入框内
      choose (index, sysList) {
        this.centerDialog = false
        this.systemText = sysList[index].sysName  //当前选中系统的对应名称
        this.needCode = sysList[index].sysCode  //当前选中系统的对应编号
        // console.log(this.needCode)

        if (this.valueThree != null) {
          this.valueThree = null //是设备ip为空
        }
        this.ipCode = sysList[index].sysCode  //设备级选择系统时，系统对应设备IP默认为第一个
        let qs = require('qs')
        let informationOne = {'systemId': this.ipCode}
        this.$axios.post('/monitorCon/system/userProject/queryProjectIp', qs.stringify(informationOne)).then((response) => {
          this.optionsThree = []
          for (let i = 0; i < response.data.length; i++) {
            this.optionsThree.push({
              'labelThree': response.data[i]['IP']
            })
          }
          this.valueThree = this.optionsThree[0].labelThree //选择系统时，设备IP默认显示第一个
        })
      },
      searchList () {
        // es6过滤得到满足搜索条件的展示数据list
        let sysList = this.data.filter((item) =>
          item.sysName.includes(this.searchData) || item.sysCode.includes(this.searchData)
        )
        this.sysList = sysList.filter((item, index) =>
          index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1)
        )
        this.total = sysList.length
      },
      // 弹窗的分页，当前页改变
      handleCurrentChange (val) {
        this.currentPage = val
        this.searchList()
      },
      reset () {
        this.sysList = this.data
        //重置后输入框清空
        this.searchData = ''
        this.dialogData()
      },
    },
    created () {
      this.systemText = this.sysList[0].sysName
      this.needCode = this.sysList[0].sysCode
      this.valueOne="One"

    },
    mounted () {
      this.currentTime()
      // this.dialogData()

    },
    watch: {
      systemText (val, newval) {
        // console.log(val)
        //
        // console.log(newval)
      }
    },
    // 销毁定时器
    beforeDestroy: function () {
      if (this.getDate) {
        // console.log('销毁定时器')
        clearInterval(this.getDate) // 在Vue实例销毁前，清除时间定时器
      }
    }
  }
</script>

<style scoped>
  body {
    width: 100%;
    height: 100%;
  }

  .main_bgm {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .nav {
    width: 100%;
    height: 8vh;

  }

  .nav-back {
    width: 50px;
    height: 20px;
    position: absolute;
    top: 5%;
    left: 2%;
    margin-top: 4px;
  }

  .nav-back img {
    width: 10px;
    height: 10px;
  }

  .nav-back span {
    color: #fff;
    font-weight: bold;
  }

  .scale {
    width: 8vh;
    height: 2vh;
    position: absolute;
    top: 5.4vh;
    left: 68%;
    /*margin-top: 4px;*/
  }

  .scale img {
    width: 2.3vh;
    height: 2.3vh;
    float: left;
  }

  .scale span {
    color: #fff;
    font-weight: bold;
    float: left;
    font-size: 2vh;
    margin-top: -0.3vh
  }

  .left {
    float: left;
    width: 22%;
    height: 89vh;
  }

  .disc {
    width: 100%;
    /*height: 29vh;*/
    /*border: 1px solid red;*/
  }

  .ram {
    /*height: 29vh;*/
    /*border: 1px solid red;*/
  }

  .cpu {
    /*height: 28vh;*/
    /*border: 1px solid red;*/
  }

  .middle {
    float: left;
    height: 89vh;
    width: 45%;
  }

  .middle_top {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .middle .middle_top .fullGC {
    float: left;
    width: 34%;
    /*height: 30vh;*/
    /*border: 1px solid red;*/
  }

  .middle .middle_top .apply {
    float: left;
    width: 34%;
    /*height: 30vh;*/
    /*border: 1px solid red;*/
  }

  .middle .middle_top .error {
    float: left;
    width: 34%;
    /*height: 30vh;*/
    /*border: 1px solid red;*/
  }

  .dashboard {
    float: left;
    width: 100%;
    /*height: 59vh;*/
    /*border: 1px solid red;*/
  }

  .right {
    float: left;
    height: 89vh;
    margin-left: 1vh;
    width: 32%;
  }

  .batch {
    width: 97%;
    margin-top: 2vh;
    border: 1px solid #41a5d9;
    height: 29vh;
    /*border: 1px solid red;*/
  }

  .response {
    width: 97%;
    margin-top: 1vh;
    border: 1px solid #41a5d9;
    height: 28.3vh;
    /*border: 1px solid red;*/
  }

  .slowSQL {
    width: 97%;
    margin-top: 1vh;
    border: 1px solid #41a5d9;
    height: 28.6vh;
    /*border: 1px solid red;*/
  }

  /*选择系统的弹窗表格*/
  .el-dialog__wrapper {
    top: -65px;
  }

  .diaBox .el-table >>> .cell {
    text-align: center;
    line-height: 16px;
  }

  .nav >>> .el-table td, .el-table th {
    padding: 1px 0 !important;
  }

  .diaBox >>> .el-input__inner {
    height: 30px;
  }

  .nav >>> .el-input__suffix {
    top: 4px;
  }

  /*选择系统的弹窗样式*/
  .nav >>> .el-dialog__header {
    height: 30px;
    background-color: #66bded;
    padding: 7px 20px 0 !important;
  }

  .nav >>> .el-dialog__title {
    color: #fff;
    font-size: 14px;
  }

  .nav >>> .el-dialog__headerbtn {
    top: 12px;
  }

  .nav >>> .el-dialog--center .el-dialog__body {
    padding-top: 15px;
  }

  .nav >>> .el-dialog__footer {
    padding-top: 0;
  }

  .nav >>> .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }

  /*弹窗的输入框样式*/
  .diaBox .search {
    float: left;
    width: 270px;
    margin: 1px 0 16px 14px;
  }

  /*input的placeholder样式*/
  input::-webkit-input-placeholder {
    color: #fff;
    font-size: 24px;
  }

  /*选择系统的部分*/
  .nav .system {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    width: 47vh;
    height: 45px;
    font-size: 18px;
    color: #FFF;
    background-color: #128fd0;
    cursor: pointer;

  }

  .nav .system h2 {
    display: inline-block;
    line-height: 45px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .nav .system i {
    font-size: 18px;
    position: absolute;
    top: 50%;
    transform: translate(5px, -40%);
  }

  .el-icon-arrow-down {
    display: inline-block;
    color: #fff;
    font-size: 4vh;
  }

  .select-time {
    position: absolute;
    top: 4.5vh;
    left: 74%;
    /*margin-top: 6px;*/
    width: 25vw;
    font-size: 2.3vh;
    color: #fff;
    z-index: 99;
  }

  .select-time span {
    position: absolute;
    left: 30%;
    z-index: -98;

  }

  .select-time >>> .el-select {
    width: 90%;
    height: 20px;
  }

  .select-time >>> .el-select .el-input {
    width: 100%;
    height: 20px;
    font-size: 2.3vh;
  }

  .select-time >>> .el-select .el-input__inner {
    -webkit-appearance: none;
    background-color: transparent;
    background-image: none;
    border-radius: 4px;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: inherit;
    line-height: 20px;
    outline: 0;
    /* padding: 0 15px; */
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    height: 20px;
    padding: 0px !important;
  }

  .select-time >>> .el-select .el-input__suffix {
    top: 1px;
    right: -3px;

  }

  .select-time >>> .el-select .el-input__icon {

    line-height: 20px;
  }

  .select-time >>> .el-select .el-input__icon {

    color: #fff;
  }

  .right >>> .el-table th > .cell {
    height: 4vh;
    line-height: 30px;
  }

  .right >>> .el-table__row {
    height: 4vh;
  }


</style>
