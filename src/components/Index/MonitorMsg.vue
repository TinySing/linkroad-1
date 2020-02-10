<template>
  <!--主体背景部分-->
  <div class="monitor_main">
    <p>当前位置：监控信息</p>
    <!--<el-button class="comBack" @click="comHome">返回总览</el-button>-->
    <!--上半部分-->
    <div class="monitor_msg">
      <div class="leftBox" style="width:27%;float:left;margin-left:6%;position: relative;">
        <!--监控项分类选择器-->
        <i class="one">监控项分类:</i>
        <el-select v-model="valueOne" placeholder="请选择" @change="togDisabled(valueData,valueTwoCopy)"
                   :style={zIndex:1}>
          <el-option
            v-for="item in optionsOne"
            :key="item.valueOne"
            :label="item.labelOne"
            :value="item.valueOne">
          </el-option>
        </el-select>
        <br>
        <!--弹窗列表+输入框-->
        <i class="three">请选择系统:</i>
        <!--选择系统输入框-->
        <el-button
          style="background-color: rgba(255,255,255,.1);position: absolute;top:56px;width:202px;border: none;height: 30px;"
          @click="centerDialog = true">
        </el-button>
        <div style="display: inline-block" @click="centerDialog = true">
          <input placeholder="点击选择系统"
                 class="system"
                 type="text"
                 value=""
                 disabled
                 v-model="indexText"
          />
        </div>
        <!--点击按钮清空输入框-->
        <i class="el-icon-circle-close" @click="empty"></i>
        <!--点击出现弹窗列表-->
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
      </div>
      <div class="middleBox" style="width:25%;float:left;margin-left:6%;">
        <!--日期插件-->
        <div class="block" style="padding-top:4px;">
          <span class="demonstration">日期:</span>
          <el-date-picker
            v-model="valueData"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="changeDay(valueData)">
          </el-date-picker>
        </div>
        <!--设备IP选择器-->
        <i class="four">设备IP:</i>
        <el-select :disabled="changeDisabled" v-model="valueThree" placeholder="请选择" @change="changeThree"
                   style="width: 230px;">
          <el-option
            v-for="item in optionsThree"
            :key="item.valueThree"
            :label="item.labelThree"
            :value="item.labelThree"
          >
          </el-option>
        </el-select>
      </div>
      <div class="RightBox" style="width:26%;float:left;margin-left:7.5%;">
        <!--监控维度选择器-->
        <i class="two">监控维度:</i>
        <el-select v-model="valueTwo" :class="{'great':isActive}" placeholder="请选择" @click.native="warnSystem()"
                   @change="changeTwo(valueTwo)">
          <el-option
            v-for="item in optionsTwo"
            :key="item.valueTwo"
            :label="item.labelTwo"
            :value="item.valueTwo">
          </el-option>
        </el-select>
        <el-select v-model="valueTwoCopy" :class="{'great':isActiveCopy}"
                   placeholder="请选择"
                   @change="changeTwoCopy(valueTwoCopy)">
          <el-option
            v-for="item in optionsTwoCopy"
            :key="item.valueTwoCopy"
            :label="item.labelTwo"
            :value="item.valueTwoCopy">
          </el-option>
        </el-select>
        <br>
        <!--时间选择器-->
        <i class="five">时间:</i>
        <el-select :disabled="changeDisabledTime" v-model="valueFour" placeholder="请选择" @change="changeFour">
          <el-option
            v-for="item in optionsFour"
            :key="item.valueFour"
            :label="item.labelFour"
            :value="item.valueFour">
          </el-option>
        </el-select>
      </div>
      <!--</div>-->
    </div>
    <!--下半部分-->
    <div class="monitor_echarts" style="padding:3vh 15px 0">
      <div class="divDB" :style={display:selectDB}>
        <el-select v-model="valueDB" placeholder="请选择" @change="changeDB(valueDB)" :style={zIndex:1}>
          <el-option
            v-for="item in optionsDB"
            :key="item.valueDB"
            :label="item.label"
            :value="item.valueDB">
          </el-option>
        </el-select>
        <i style="display:block;float: right;line-height: 30px">增删改查：</i>
      </div>
      <!--批处理情况的表格-->
      <el-table :header-cell-style="{background:'#f0f5f9',color:'#666'}"
                :data="tableData.slice((currentPageOne-1)*pageSizeOne,currentPageOne*pageSizeOne)"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(251, 255, 242, 0.8)"
                border
                empty-text="暂无数据"
                :style="{display:displayB}"
                style="font-size:12px;height:40vh;min-height:250px;overflow: auto;"
                header-row-class-name="tableHead"
      >
        <el-table-column
          prop="appCode"
          label="系统编号"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="jobId"
          label="任务ID"
          align="center">
        </el-table-column>
        <el-table-column
          prop="jobName"
          label="任务名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="runTime"
          label="任务时长"
          align="center">
        </el-table-column>
        <el-table-column
          prop="isSuccess"
          label="执行结果"
          align="center"
          width="80">
        </el-table-column>
      </el-table>
      <div class="block" :style="{display:displayB}" style="width:600px;height: 6vh;margin-top: 3vh;left:40vw;">
        <el-pagination
          background
          @size-change="handleSizeChangeOne"
          @current-change="handleCurrentChangeOne"
          :current-page="currentPageOne"
          :page-sizes="pageSizesOne"
          :page-size="pageSizeOne"
          layout="total,sizes,prev, pager, next, jumper"
          :total="totalOne">
        </el-pagination>
      </div>
      <!--慢SQLtop5的表格-->
      <el-table :header-cell-style="{background:'#f0f5f9',color:'#666'}"
                :data="tableDataTop.slice((currentPageOne-1)*pageSizeOne,currentPageOne*pageSizeOne)"
                border
                empty-text="暂无数据"
                :style="{display:displayC}"
                style="font-size:12px;height:40vh;min-height:250px;overflow: auto;"
                header-row-class-name="tableHead"
      >
        <el-table-column
          prop="appCode"
          label="系统编号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="系统名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="moudleName"
          label="子系统名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sqlContent"
          label="SQL内容(点击查看详细)"
          align="center"
          width="350"
        >
          <template slot-scope="scope">
            <!--点击查看出弹窗-->
            <span @click="readSQL(scope.row,scope.$index)">{{scope.row.sqlContent | ellipsis}}</span>
            <!--弹窗部分-->
            <el-dialog
              title="详细SQL内容"
              :close-on-click-modal="false"
              :visible.sync="centerDialogSQL"
              center>
              <div class="diaBox" style="min-height:15vh;padding:2vh;">
                <li v-for="item of concrete">
                  <ul>{{item.right}}</ul>
                </li>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column
          prop="caller"
          label="调用者"
          align="center">
        </el-table-column>
        <el-table-column
          prop="controlTime"
          label="调用时间"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="respTime"
          label="耗时"
          align="center"
          width="100">
        </el-table-column>
      </el-table>
      <div class="block" :style="{display:displayC}" style="width:600px;height: 6vh;margin-top: 3vh;left:40vw;">
        <el-pagination
          background
          @size-change="handleSizeChangeOne"
          @current-change="handleCurrentChangeOne"
          :current-page="currentPageOne"
          :page-sizes="pageSizesOne"
          :page-size="pageSizeOne"
          layout="total,sizes,prev, pager, next, jumper"
          :total="totalTwo">
        </el-pagination>
      </div>
      <!--响应时间top5的表格-->
      <el-table :header-cell-style="{background:'#f0f5f9',color:'#666'}"
                :data="tableDataRes.slice((currentPageOne-1)*pageSizeOne,currentPageOne*pageSizeOne)"
                border
                empty-text="暂无数据"
                :style="{display:displayD}"
                style="font-size:12px;height:40vh;min-height:250px;overflow: auto;"
                header-row-class-name="tableHead"
      >
        <el-table-column
          prop="appCode"
          label="系统编号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="系统名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="moudleName"
          label="子系统名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="uri"
          label="uri"
          align="center"
          width="350"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="average"
          label="平均请求时间"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="requestsNum"
          label="请求次数"
          align="center"
          width="100">
        </el-table-column>
      </el-table>
      <div class="block" :style="{display:displayD}" style="width:600px;height: 6vh;margin-top: 3vh;left:40vw;">
        <el-pagination
          background
          @size-change="handleSizeChangeOne"
          @current-change="handleCurrentChangeOne"
          :current-page="currentPageOne"
          :page-sizes="pageSizesOne"
          :page-size="pageSizeOne"
          layout="total,sizes,prev, pager, next, jumper"
          :total="totalThree">
        </el-pagination>
      </div>
      <!--折线图的div-->
      <div id="myChart" :style="{display:displayA,width:'82vw',height:'47vh',margin:'auto',marginTop:'5vh'}">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MonitorMsg",
    data() {
      return {
        loading: true,//表格加载动画
        startDate: '',     //日期选择器的开始日期
        endDate: '',       //日期选择器的结束日期
        obj: {},           //存放折线图的标题
        displayA: 'none',  //折线图的画布
        displayB: 'block', //批处理列表的盒子
        displayC: 'none',  //慢SQL列表top5的盒子
        displayD: 'none',  //响应时间top5列表的盒子
        selectDB: 'none',  //DB吞吐率时多出来的下拉框
        // indexText: this.$route.params.id,
        indexText: '',
        nowSysCode: '',     //当前系统编号
        ipCode: '',         //设备级选择系统时，系统对应设备IP默认为第一个
        searchData: '',       // 搜索系统输入框中的值
        isActive: false,     //设备级监控维度下拉框
        isActiveCopy: true,  //系统级监控维度下拉框
        changeDisabled: true,//设备IP下拉框是否可选
        changeDisabledTime: true,//时间维度下拉框是否可选,一进页面默认不可选
        total: null,         // 分页
        totalOne: null,
        totalTwo: null,
        totalThree: null,
        currentPage: 1,
        currentPageOne: 1,
        pageSize: 8,
        pageSizeOne: 10,
        pageSizesOne: [10, 20, 30, 40, 50],
        centerDialog: false,//选择系统弹窗默认关闭
        centerDialogSQL: false,
        importantIndex: '',
        valueData: '', //日期选择下拉框的值
        valueOne: 'System',
        valueTwo: 'MonitorSeven',
        valueTwoCopy: 'D',
        valueThree: '',
        valueFour: 'TimeTwo',
        valueDB: 'INSERT',
        timer: null,  //定时器
        LineData: [],//设备级维度时折线图的数值
        dataY: [],   //设备级维度时折线图的横轴时间
        tableData: [], //批处理的表格
        tableDataTop: [], //慢sqltop5的表格
        tableDataRes: [], //响应时间top5的表格
        sysList: [], //选择系统弹窗显示的系统的列表
        // 选择监控项分类
        optionsOne: [
          {
            valueOne: 'System',
            labelOne: '系统级'
          },
          {
            valueOne: 'Equipment',
            labelOne: '设备级'
          }
        ],
        //选择监控维度
        optionsTwo: [
          {
            valueTwo: 'MonitorSeven',
            labelTwo: '批处理情况'
          },
          {
            valueTwo: 'APPLY',
            labelTwo: '应用吞吐率'
          },
          {
            valueTwo: 'E',
            labelTwo: '应用错误率'
          },
          {
            valueTwo: 'MonitorTwelve',
            labelTwo: '慢SQL操作top5'
          },
          {
            valueTwo: 'OTHER',
            labelTwo: 'DB吞吐率'
          },
          {
            valueTwo: 'R',
            labelTwo: '应用响应时间'
          },
          {
            valueTwo: 'Full',
            labelTwo: 'FullGC次数'
          },
          {
            valueTwo: 'Data',
            labelTwo: '数据源连接池使用率'
          },
          {
            valueTwo: 'MonitorNine',
            labelTwo: '响应时间top5'
          }
        ],
        optionsTwoCopy: [
          {
            valueTwoCopy: 'D',
            labelTwo: '磁盘空间'
          },
          {
            valueTwoCopy: 'C',
            labelTwo: 'cpu使用率'
          },
          {
            valueTwoCopy: 'M',
            labelTwo: '内存使用率'
          }
        ],
        optionsThree: [], //选择设备IP
        //选择时间维度
        optionsFour: [
          // {
          //   valueFour: 'TimeOne',
          //   labelFour: '近5分钟',
          // },
          {
            valueFour: 'TimeTwo',
            labelFour: '近30分钟',
          },
          {
            valueFour: 'TimeThree',
            labelFour: '近2小时',
          },
          {
            valueFour: 'TimeFour',
            labelFour: '近8小时'
          },
          {
            valueFour: 'TimeFive',
            labelFour: '近24小时'
          }
        ],
        //DB吞吐率的下拉框
        optionsDB: [
          {
            valueDB: 'INSERT',
            label: '增',
          },
          {
            valueDB: 'DELETE',
            label: '删',
          },
          {
            valueDB: 'UPDATE',
            label: '改',
          },
          {
            valueDB: 'SELECT',
            label: '查',
          }
        ],
        childSystem: [],//折线图的子系统
        legendName: [],//子系统的名字
        legendId: [],//子系统的id
        //日期选择区间只能选择今天之前的近七天内
        pickerOptions: {
          disabledDate(time) {
            // 一天的毫秒数 = 8.64e7  判断时在return处可进行加减
            let curDate = (new Date()).getTime();
            let day = 7 * 24 * 3600 * 1000;
            let dateRegion = curDate - day;
            return time.getTime() > Date.now() - 8.64e7 || time.getTime() < dateRegion;
          },
        },
        concrete: []//慢SQL的弹窗具体内容
      }
    },
    filters: {
      ellipsis(value) {
        if (!value) return "";
        if (value.length > 80) {
          return value.slice(0, 80) + "...";
        }
        return value;
      }
    },
    methods: {
      readSQL(row) {
        this.centerDialogSQL = true
        this.concrete = []
        this.concrete.push({'right': row.sqlContent})
      },
      // 根据监控项切换监控维度(设备级，系统级)
      togDisabled(valueData, valueTwoCopy) {

        this.changeDisabled = !this.changeDisabled;
        this.isActive = !this.isActive //监控维度下拉框
        this.isActiveCopy = !this.isActiveCopy //监控维度下拉框
        if (this.valueOne === 'System' && this.nowSysCode === '') {
          //如果切换监控项分类，在设备级时不选系统时，在切换到系统时，input框为空，不传系统编号
          this.indexText = ''
        } else {
          //如果切换监控项分类，在设备级时选了系统时，在切换到系统时，传设备级时选择的系统编号
          this.nowSysCode = this.ipCode
        }
        if (this.valueOne === 'Equipment') {
          this.valueTwo = ''
          //解决如果选择设备级时，默认显示磁盘空间时加载不出标题的问题
          this.obj = this.optionsTwoCopy.find((item) => {
            return item.valueTwoCopy === valueTwoCopy;
          });
          this.changeDisabledTime = false
          this.displayA = 'block'
          this.displayB = 'none'
          this.displayC = 'none'
          this.displayD = 'none'
          this.selectDB = 'none'
          this.valueTwoCopy = 'D'
          this.valueData = null
          this.startDate = ''
          this.endDate = ''
          this.valueFour = 'TimeTwo'
          this.ipCode = this.sysList[0].sysCode
          this.indexText = this.sysList[0].sysName  //选择设备维度时，默认第一个系统
          //传给后台的默认第一个系统的对应系统编号，根据系统编号查询该系统的所有设备IP
          let qs = require('qs');
          let informationOne = {"systemId": this.ipCode}
          this.$axios.post('/monitorCon/system/userProject/queryProjectIp', qs.stringify(informationOne)).then((response) => {
            this.optionsThree = []
            for (let i = 0; i < response.data.length; i++) {
              this.optionsThree.push({
                'labelThree': response.data[i]['IP']
              });
            }
            //设备级选择系统时，默认第一个系统的第一个设备Ip
            this.valueThree = this.optionsThree[0].labelThree;
            this.drawLine()//调用折线图
          });
        } else if (this.valueOne === 'System') {
          this.valueTwo = 'MonitorSeven'
          //如果监控项分类为系统级时，默认显示批处理
          this.batchData()
          this.changeDisabledTime = true
          this.valueThree = ''   //设备级时系统显示设备IP，系统级时设备IP清空
          this.displayA = 'none'
          this.displayB = 'block'
          this.valueTwo = 'MonitorSeven'
        }
      },
      //日期选择器下拉框的方法
      changeDay(valueData) {
        //如果日期不为空时
        if (valueData != null) {
          this.startDate = valueData[0];
          this.endDate = valueData[1]
          this.valueFour = ''
          this.changeDisabledTime = true;
        }
        //如果日期为空时
        if (valueData === null) {
          this.changeDisabledTime = false;
          this.startDate = '';
          this.endDate = '';
          this.valueFour = 'TimeTwo'
        }
        //如果日期为空时,维度为批处理时
        if (valueData === null && this.valueTwo === 'MonitorSeven') {
          this.changeDisabledTime = true;
          this.startDate = '';
          this.endDate = '';
          this.valueFour = 'TimeTwo'
        }
        //如果日期为空时,并且维度不等于磁盘空间，CPU使用率，内存使用率
        if (valueData === null && this.valueTwo !== 'MonitorSeven') {
          this.changeDisabledTime = false;
          this.startDate = '';
          this.endDate = '';
          this.valueFour = 'TimeTwo'
        }

        //日期选择器传参开始日期和结束日期获取返回的批处理数据
        if (this.valueOne === 'System' && this.valueTwo === 'MonitorSeven') {
          this.batchData()
        }
        //日期选择器传参开始日期和结束日期获取返回的慢sqltop5数据
        if (this.valueOne === 'System' && this.valueTwo === 'MonitorNine') {
          this.responseTop()
        }
        //日期选择器传参开始日期和结束日期获取返回的响应时间top5数据
        if (this.valueOne === 'System' && this.valueTwo === 'MonitorTwelve') {
          this.slowTop()
        }
        //日期选择器传送开始日期和结束日期获取返回的折线图
        this.drawLine()
      },
      //设备级时监控维度下拉框的方法
      changeTwo(valueTwo) {
        //改变选择框的值时，折线图的标题跟着改变
        this.obj = this.optionsTwo.find((item) => {
          return item.valueTwo === valueTwo;
        });

        //改变监控维度时，日期选择器清空
        // this.valueData = null
        // this.startDate = ''
        // this.endDate = ''
        // this.valueFour = 'TimeTwo'
        if (this.valueOne === 'System' && this.valueTwo === 'OTHER') {
          this.selectDB = 'block'
        } else {
          this.selectDB = 'none'
        }
        if (this.valueTwo === 'APPLY' || this.valueTwo === 'E' || this.valueTwo === 'OTHER' || this.valueTwo === 'R' || this.valueTwo === 'Full' || this.valueTwo === 'Data') {
          this.drawLine()
          this.displayA = 'block'
          this.displayB = 'none'
          this.displayC = 'none'
          this.displayD = 'none'
          this.changeDisabledTime = false;
        } else if (this.valueTwo === "MonitorSeven") {
          this.batchData()
          this.displayA = 'none'
          this.displayB = 'block'
          this.displayC = 'none'
          this.displayD = 'none'
          this.changeDisabledTime = true;
        } else if (this.valueTwo === 'MonitorTwelve') {
          this.slowTop()
          this.changeDisabledTime = false;
          // this.indexText = ''
          //设备级时系统显示设备IP，系统级时设备IP清空
          this.valueThree = ''
          this.displayA = 'none'
          this.displayB = 'none'
          this.displayC = 'block'
          this.displayD = 'none'
          // this.valueTwo = 'MonitorSeven'
        } else if (this.valueTwo = 'MonitorNine') {
          this.responseTop()
          this.changeDisabledTime = false;
          this.valueThree = ''
          this.displayA = 'none'
          this.displayB = 'none'
          this.displayC = 'none'
          this.displayD = 'block'
        } else {
          this.displayA = 'none'
          this.displayB = 'block'
          this.displayC = 'none'
          this.changeDisabledTime = false;
        }
      },
      //系统级时监控维度下拉框的方法
      changeTwoCopy(valueTwoCopy) {
        this.obj = this.optionsTwoCopy.find((item) => {
          return item.valueTwoCopy === valueTwoCopy;
        });
        //改变监控维度时，日期选择器清空
        // this.valueData = null
        if (this.valueTwoCopy === 'D' || this.valueTwoCopy === 'C' || this.valueTwoCopy === 'M') {
          this.displayA = 'block'
          this.displayB = 'none'
          this.drawLine()
          this.changeDisabledTime = false
        } else {
          this.displayA = 'none'
          this.displayB = 'block'
          this.changeDisabledTime = true
        }
      },
      //系统级下不选择系统就选择监控维度出提示弹窗
      warnSystem() {
        if (this.nowSysCode === '') {
          this.$confirm('请您先选择系统', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          })
        }
      },
      //设备ip下拉框的方法,因为设备级目前只涉及到折线图
      changeThree() {
        this.drawLine()
      },
      //时间维度下拉框的方法
      changeFour() {
        if (this.valueOne === 'Equipment' && this.valueData != null) {
          this.valueData = null
          this.startDate = ''
          this.endDate = ''
        } else {
          this.drawLine()
        }
        //如果系统级时并且日期不为空，使日期为空
        if (this.valueOne === 'System' && this.valueData != null) {
          this.valueData = null
          this.startDate = ''
          this.endDate = ''
        }
        if (this.valueTwo === 'MonitorSeven') {
          this.batchData() //调用慢sqltop5
        } else if (this.valueTwo === 'MonitorNine') {
          this.responseTop()//调用响应时间top5
        } else if (this.valueTwo === 'MonitorTwelve') {
          this.slowTop()   //调用慢sqltop5
        }
        // else {
        //   this.drawLine()//调用折线图
        // }
      },
      //DB吞吐率多出下拉框方法
      changeDB() {
        this.drawLine()
      },
      //返回总览页
      // comHome() {
      //   this.$router.push({
      //     path: '/index/home'
      //   })
      // },
      //选择系统弹出的弹窗获取的系统的数据
      dialogData() {
        let qs = require('qs');
        let information = {"userId": ""};
        this.$axios.post('/monitorCon/system/userProject/queryProject', qs.stringify(information)).then((response) => {
          if (response === null) return
          this.sysList = [];
          //选择系统框是否默认显示第一条  this.indexText  = response.data[0]['projectname']
          for (let i = 0; i < response.data.length; i++) {
            this.sysList.push({
              'sysCode': response.data[i]['projectid'],
              'sysName': response.data[i]['projectname']
            });
          }
          // 获取数据之后的实际分页
          this.total = this.sysList.length;
          this.data = this.sysList
          this.searchList()
        });
      },
      // 选择系统出弹窗的搜索的方法
      search() {
        this.currentPage = 1
        this.dialogData()
        //如果内容为空，则弹出提示
        if (this.searchData === "") {
          alert('查询条件不能为空，请重新输入')
        }
      },
      // 处理数据,进行搜索
      searchList() {
        // es6过滤得到满足搜索条件的展示数据list
        let sysList = this.data.filter((item) =>
          item.sysName.includes(this.searchData) || item.sysCode.includes(this.searchData)
        )
        this.sysList = sysList.filter((item, index) =>
          index < this.currentPage * this.pageSize && index >= this.pageSize * (this.currentPage - 1)
        )
        this.total = sysList.length
      },
      // 重置后列表恢复，输入框清空
      reset() {
        this.sysList = this.data
        //重置后输入框清空
        this.searchData = ""
        this.dialogData()
      },
      // 批处理情况的数据获取
      batchData() {
        let qs = require('qs');
        let information = {"systemId": this.nowSysCode, "starDate": this.startDate, "endDate": this.endDate};
        this.$axios.post('/monitorCon/dmMsg/query', qs.stringify(information)).then((response) => {
          // console.log(response)
          this.tableData = [];
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i]['isSuccess'] === 'Y') {
              response.data[i]['isSuccess'] = '成功'
            } else {
              response.data[i]['isSuccess'] = '失败'
            }
            this.tableData.push({
              'appCode': response.data[i]['appCode'],
              'jobId': response.data[i]['jobId'],
              'jobName': response.data[i]['jobName'],
              'startTime': response.data[i]['startTime'],
              'endTime': response.data[i]['endTime'],
              'runTime': response.data[i]['runTime'],
              'isSuccess': response.data[i]['isSuccess']
            });
          }
          this.totalOne = this.tableData.length; // 获取数据之后的实际总条数
          this.loading = false //数据加载完毕，动画消失
        });

      },
      //慢sqltop5的数据获取
      slowTop() {
        let qs = require('qs');
        let information = {
          'appCode': this.nowSysCode,
          'timeType': this.valueFour,
          'starDate': this.startDate,
          'endDate': this.endDate
        };
        this.$axios.post('/monitorCon/sqlTop/query', qs.stringify(information)).then((response) => {
          // console.log(response)
          this.tableDataTop = [];
          for (let i = 0; i < response.data.length; i++) {
            this.tableDataTop.push({
              'id': i,
              'appCode': response.data[i]['appCode'],
              'appName': response.data[i]['appName'],
              'moudleName': response.data[i]['moudleName'],
              'sqlContent': response.data[i]['sqlContent'],
              'caller': response.data[i]['caller'],
              'controlTime': response.data[i]['controlTime'],
              'respTime': response.data[i]['respTime'],
            });
          }
          this.totalTwo = this.tableDataTop.length;// 获取数据之后的实际总条数
        });
      },
      //响应时间top5的数据获取 responseTop
      responseTop() {
        let qs = require('qs');
        let information = {
          'appCode': this.nowSysCode,
          'timeType': this.valueFour,
          'starDate': this.startDate,
          'endDate': this.endDate
        };
        this.$axios.post('/monitorCon/response/query', qs.stringify(information)).then((response) => {
          // console.log(response)
          this.tableDataRes = [];
          for (let i = 0; i < response.data.length; i++) {
            this.tableDataRes.push({
              'appCode': response.data[i]['appCode'],
              'appName': response.data[i]['appName'],
              'moudleName': response.data[i]['moudleName'],
              'uri': response.data[i]['url'],
              'average': response.data[i]['respTime'],
              'requestsNum': response.data[i]['respCount']
            });
          }
          this.totalThree = this.tableDataRes.length;// 获取数据之后的实际总条数
        });
      },
      //将弹窗选择的值映射到输入框内
      choose(index, sysList) {
        this.centerDialog = false;
        this.indexText = sysList[index].sysName;  //当前选中系统的对应名称
        this.nowSysCode = sysList[index].sysCode;  //当前选中系统的对应编号
        if (this.valueTwo === 'MonitorSeven') {
          this.batchData()  //调用批处理
        }
        if (this.valueTwo === 'MonitorNine') {
          this.responseTop()//调用响应时间top5
        }
        if (this.valueTwo === 'MonitorTwelve') {
          this.slowTop()    //调用慢SQLtop5
        }
        if (this.valueThree != null) {
          this.valueThree = null //是设备ip为空
        }
        this.ipCode = sysList[index].sysCode  //设备级选择系统时，系统对应设备IP默认为第一个
        let qs = require('qs');
        let informationOne = {"systemId": this.ipCode}
        this.$axios.post('/monitorCon/system/userProject/queryProjectIp', qs.stringify(informationOne)).then((response) => {
          this.optionsThree = []
          for (let i = 0; i < response.data.length; i++) {
            this.optionsThree.push({
              'labelThree': response.data[i]['IP']
            });
          }
          this.valueThree = this.optionsThree[0].labelThree; //选择系统时，设备IP默认显示第一个
          this.drawLine() //调用折线图
        });
      },
      //清空选择系统维度的输入框，只有批处理维度时，才可以使用这个按钮
      empty() {
        this.valueData = null
        this.startDate = ''
        this.endDate = ''
        //从总览页传递参数进来，若清空输入框，则参数也清空 this.$route.params.idOne=''
        if (this.valueOne === 'System' && this.valueTwo === 'MonitorSeven') {
          this.indexText = '';
          this.nowSysCode = '';
          this.batchData() //调用批处理
        }
      },
      // 弹窗的分页，当前页改变
      handleCurrentChange(val) {
        this.currentPage = val
        this.searchList()
      },
      //当前页改变时会触发
      handleCurrentChangeOne(val) {
        this.currentPageOne = val;
      },
      handleSizeChangeOne(val) {
        this.pageSizeOne = val;
      },
      //关于折线图的方法
      drawLine() {
        //通过系统名称和指标类型获取子系统ID和名称，将子系统名称存到一个数组中，为了展示图例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        if (this.valueOne === 'System' && this.nowSysCode != null) {
          this.nowSysCode = this.ipCode
        }
        let qs = require('qs');
        //磁盘空间，cpu使用率，内存使用率
        let information = {
          "eqpIp": this.valueThree,
          "appCode": this.ipCode,
          "type": this.valueTwoCopy,
          "timeType": this.valueFour,
          "starDate": this.startDate,
          "endDate": this.endDate
        };
        //应用错误率和应用响应时间和应用吞吐率
        let informationOne = {
          "appCode": this.nowSysCode,
          "type": this.valueTwo,
          "timeType": this.valueFour,
          "starDate": this.startDate,
          "endDate": this.endDate
        };
        //FullGC次数和数据源连接使用率维度
        let informationOnly = {
          "appCode": this.nowSysCode,
          "timeType": this.valueFour,
          "starDate": this.startDate,
          "endDate": this.endDate
        };
        //DB吞吐率维度
        let informationDB = {
          "appCode": this.nowSysCode,
          "type": this.valueDB,
          "timeType": this.valueFour,
          "starDate": this.startDate,
          "endDate": this.endDate
        }
        let LineData = [];
        let minDataY = [];
        let dataY = [];
        let legendName = []
        let legendId = []
        let temp = []
        //折线图不同的单位
        let unit = []
        if (this.valueTwoCopy === 'D' || this.valueTwoCopy === 'C' || this.valueTwoCopy === 'M' || this.valueTwo === 'OTHER' || this.valueTwo === 'E' || this.valueTwo === 'Data') {
          unit = '%'
        }
        if (this.valueTwo === 'APPLY') {
          unit = 'rpm'
        }
        if (this.valueTwo === 'R') {
          unit = 'ms'
        }
        if (this.valueTwo === 'Full') {
          unit = '次'
        }
        myChart.showLoading();
        //如果为设备级时，获取磁盘空间，CPU使用率，内存使用率三个维度的折线图
        if (this.valueOne === 'Equipment' && this.valueData === null) {
          //如果选择按时间查看，则x轴展示不带日期
          this.$axios.post('/monitorCon/information/query', qs.stringify(information)).then((response) => {
            // console.log(response)
            for (let i = 0; i < response.data.length; i++) {
              LineData.push(response.data[i].value);
            }
            for (let i = 0; i < response.data.length; i++) {
              minDataY.push(response.data[i].controlTime);
            }
            minDataY.forEach(item => {
              dataY.push(item.split(' ')[1])
            })
            temp = {
              type: "line",
              data: LineData,
              smooth: true,
              barWidth: '20%',
              showSymbol: true,
              symbol: 'circle',     //折点设定为实心点
              symbolSize: 5,   //设定实心点的大小
              itemStyle: {
                color: 'rgb(255, 70, 131)',
                normal: {
                  color: '#66bded', //折点颜色
                  lineStyle: {
                    color: '#43abe9' //折线颜色
                  }
                }
              },
              //设置折线区域的可渐变颜色
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(109,234,237)'
                }, {
                  offset: 1,
                  color: 'rgb(67,171,233)'
                }])
              },
            };
            option.series.push(temp)
            option.xAxis[0].data = dataY
            setTimeout(() => {  //为了让加载动画效果明显,这里加入了setTimeout,实现800ms延时
              myChart.hideLoading()
            }, 800)
            myChart.setOption(option, true);
          });
        }
        if (this.valueOne === 'Equipment' && this.valueData != null) {
          //如果按照日期查看，则x轴展示带日期
          this.$axios.post('/monitorCon/information/query', qs.stringify(information)).then((response) => {
            // console.log(response)
            for (let i = 0; i < response.data.length; i++) {
              LineData.push(response.data[i].value);
            }
            for (let i = 0; i < response.data.length; i++) {
              dataY.push(response.data[i].controlTime);
            }
            temp = {
              type: "line",
              data: LineData,
              smooth: true,
              barWidth: '20%',
              showSymbol: true,
              symbol: 'circle',     //折点设定为实心点
              symbolSize: 5,   //设定实心点的大小
              itemStyle: {
                color: 'rgb(255, 70, 131)',
                normal: {
                  color: '#66bded', //折点颜色
                  lineStyle: {
                    color: '#43abe9' //折线颜色
                  }
                }
              },
              //设置折线区域的可渐变颜色
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(109,234,237)'
                }, {
                  offset: 1,
                  color: 'rgb(67,171,233)'
                }])
              },
            };
            option.series.push(temp)
            option.xAxis[0].data = dataY
            setTimeout(() => {  //为了让加载动画效果明显,这里加入了setTimeout,实现800ms延时
              myChart.hideLoading()
            }, 800)
            myChart.setOption(option, true);
          });
        }
        //如果为系统级时，获取维度是应用错误率和应用响应时间的折线图
        if (this.valueOne === 'System' && this.valueTwo === 'E' || this.valueOne === 'System' && this.valueTwo === 'R') {
          if (this.childSystem != null) {
            this.childSystem = []
          }
          if (legendId != null) {
            legendId = []
          }
          let informationNew = {
            "appCode": this.nowSysCode,
            "type": this.valueTwo,
            "timeType": this.valueFour,
            "starDate": this.startDate,
            "endDate": this.endDate
          };
          this.$axios.post('/monitorCon/applyError/queryMoudleId', qs.stringify(informationNew)).then((response) => {
            // console.log(response)
            for (let i = 0; i < response.data.length; i++) {
              this.childSystem.push({
                'moudleId': response.data[i]['moudleId'],
                'moudleName': response.data[i]['moudleName']
              });
              legendId.push(this.childSystem[i].moudleId)
              legendName.push(this.childSystem[i].moudleName)
            }
            // console.log(legendName)
          })
          //设置延迟执行
          this.timer = setTimeout(() => {
            this.$axios.post('/monitorCon/applyError/query', qs.stringify(informationOne)).then((response) => {
              // console.log(response)
              for (let j = 0; j < legendId.length; j++) {
                let r, q, z = `data_${j}`
                r = [];
                q = [];
                z = legendName[j]
                for (let i = 0; i < response.data.length; i++) {
                  if (legendId[j] === response.data[i].moudleId) {
                    r.push(response.data[i].value)
                    q.push((response.data[i].controlTime).split(' ')[1])
                  }
                }
                temp = {
                  type: "line",
                  data: r,
                  name: z,
                  barWidth: '20%',
                  showSymbol: true,
                  symbol: 'circle',     //折点设定为实心点
                  symbolSize: 5,   //设定实心点的大小

                };
                option.series.push(temp)
                option.xAxis[0].data = q
              }
              setTimeout(() => {  //为了让加载动画效果明显,这里加入了setTimeout,实现800ms延时
                myChart.hideLoading()
              }, 800)
              myChart.setOption(option, true);
            });
          }, 500);
          // clearTimeout(this.timer)
        }
        //如果为系统级时，获取维度是应用吞吐率的折线图
        if (this.valueOne === 'System' && this.valueTwo === 'APPLY') {
          let informationNew = {
            "appCode": this.nowSysCode,
            "type": this.valueTwo,
            "timeType": this.valueFour,
            "starDate": this.startDate,
            "endDate": this.endDate
          }
          this.$axios.post('/monitorCon/through/queryMoudleId', qs.stringify(informationNew)).then((response) => {
            // console.log(response)
            if (this.childSystem != null) {
              this.childSystem = []
            }
            if (legendId != null) {
              legendId = []
            }
            for (let i = 0; i < response.data.length; i++) {
              this.childSystem.push({
                'moudleId': response.data[i]['moudleId'],
                'moudleName': response.data[i]['moudleName']
              });
              legendId.push(this.childSystem[i].moudleId)
              legendName.push(this.childSystem[i].moudleName)
            }
            // console.log(legendName)
          })
          //设置延迟执行
          this.timer = setTimeout(() => {
            this.$axios.post('/monitorCon/through/query', qs.stringify(informationOne)).then((response) => {
              // console.log(response)
              for (let j = 0; j < legendId.length; j++) {
                let r, q, z = `data_${j}`
                r = [];
                q = [];
                z = legendName[j]
                for (let i = 0; i < response.data.length; i++) {
                  if (legendId[j] === response.data[i].moudleId) {
                    r.push(response.data[i].throughput)
                    q.push((response.data[i].controlTime).split(' ')[1])
                  }
                }
                temp = {
                  type: "line",
                  data: r,
                  name: z,
                  barWidth: '20%',
                  showSymbol: true,
                  symbol: 'circle',     //折点设定为实心点
                  symbolSize: 5,   //设定实心点的大小

                };
                option.series.push(temp)
                option.xAxis[0].data = q
              }
              setTimeout(() => {  //为了让加载动画效果明显,这里加入了setTimeout,实现800ms延时
                myChart.hideLoading()
              }, 800)
              myChart.setOption(option, true);
            });
            // console.log('ok');
          }, 500);
        }
        //如果为系统级时，获取维度是FullGC次数的折线图
        if (this.valueOne === 'System' && this.valueTwo === 'Full') {
          let informationNew = {
            "appCode": this.nowSysCode,
            "timeType": this.valueFour,
            "starDate": this.startDate,
            "endDate": this.endDate
          };
          this.$axios.post('/monitorCon/fullGc/queryMoudleId', qs.stringify(informationNew)).then((response) => {
            if (this.childSystem != null) {
              this.childSystem = []
            }
            if (legendId != null) {
              legendId = []
            }
            for (let i = 0; i < response.data.length; i++) {
              this.childSystem.push({
                'moudleId': response.data[i]['moudleId'],
                'moudleName': response.data[i]['moudleName']
              });
              legendId.push(this.childSystem[i].moudleId)
              legendName.push(this.childSystem[i].moudleName)
            }
            // console.log(legendName)
          })
          //设置延迟执行
          this.timer = setTimeout(() => {
            this.$axios.post('/monitorCon/fullGc/query', qs.stringify(informationOnly)).then((response) => {
              for (let j = 0; j < legendId.length; j++) {
                let r, q, z = `data_${j}`
                r = [];
                q = [];
                z = legendName[j]
                for (let i = 0; i < response.data.length; i++) {
                  if (legendId[j] === response.data[i].moudleId) {
                    r.push(response.data[i].count)
                    q.push((response.data[i].controlTime).split(' ')[1])
                  }
                }
                temp = {
                  type: "line",
                  data: r,
                  name: z,
                  barWidth: '20%',
                  showSymbol: true,
                  symbol: 'circle',     //折点设定为实心点
                  symbolSize: 5,   //设定实心点的大小
                };
                option.series.push(temp)
                option.xAxis[0].data = q
              }
              setTimeout(() => {  //为了让加载动画效果明显,这里加入了setTimeout,实现800ms延时
                myChart.hideLoading()
              }, 800)
              myChart.setOption(option, true);
              // console.log(response)
            });
          }, 500);
        }
        //如果为系统级时，获取维度是数据源连接使用率的折线图
        if (this.valueOne === 'System' && this.valueTwo === 'Data') {
          let informationNew = {
            "appCode": this.nowSysCode,
            "timeType": this.valueFour,
            "starDate": this.startDate,
            "endDate": this.endDate
          };
          this.$axios.post('/monitorCon/dataBase/queryMoudleId', qs.stringify(informationNew)).then((response) => {
            if (this.childSystem != null) {
              this.childSystem = []
            }
            if (legendId != null) {
              legendId = []
            }
            for (let i = 0; i < response.data.length; i++) {
              this.childSystem.push({
                'moudleId': response.data[i]['moudleId'],
                'moudleName': response.data[i]['moudleName']
              });
              legendId.push(this.childSystem[i].moudleId)
              legendName.push(this.childSystem[i].moudleName)
            }
            // console.log(legendName)
          })
          //设置延迟执行
          this.timer = setTimeout(() => {
            this.$axios.post('/monitorCon/dataBase/query', qs.stringify(informationOnly)).then((response) => {
              // console.log(response)
              for (let j = 0; j < legendId.length; j++) {
                let r, q, z = `data_${j}`
                r = [];
                q = [];
                z = legendName[j]
                for (let i = 0; i < response.data.length; i++) {
                  if (legendId[j] === response.data[i].moudleId) {
                    r.push(response.data[i].value)
                    q.push((response.data[i].controlTime).split(' ')[1])
                  }
                }
                temp = {
                  type: "line",
                  data: r,
                  name: z,
                  barWidth: '20%',
                  showSymbol: true,
                  symbol: 'circle',     //折点设定为实心点
                  symbolSize: 5,   //设定实心点的大小

                };
                option.series.push(temp)
                option.xAxis[0].data = q
              }
              setTimeout(() => {  //为了让加载动画效果明显,这里加入了setTimeout,实现800ms延时
                myChart.hideLoading()
              }, 800)
              myChart.setOption(option, true);
            });
          }, 500);
        }
        //如果为系统级时，获取维度是DB吞吐率的折线图
        if (this.valueOne === 'System' && this.valueTwo === 'OTHER') {
          let informationNew = {
            "appCode": this.nowSysCode,
            "type": this.valueDB,
            "timeType": this.valueFour,
            "starDate": this.startDate,
            "endDate": this.endDate
          };
          this.$axios.post('/monitorCon/through/queryMoudleId', qs.stringify(informationNew)).then((response) => {
            // console.log(response)
            if (this.childSystem != null) {
              this.childSystem = []
            }
            if (legendId != null) {
              legendId = []
            }
            for (let i = 0; i < response.data.length; i++) {
              this.childSystem.push({
                'moudleId': response.data[i]['moudleId'],
                'moudleName': response.data[i]['moudleName']
              });
              legendId.push(this.childSystem[i].moudleId)
              legendName.push(this.childSystem[i].moudleName)
              // console.log(legendName)
            }
          })
          //设置延迟执行
          this.timer = setTimeout(() => {
            this.$axios.post('/monitorCon/through/query', qs.stringify(informationDB)).then((response) => {
              // console.log(response)
              for (let j = 0; j < legendId.length; j++) {
                let r, q, z = `data_${j}`
                r = [];
                q = [];
                z = legendName[j]
                for (let i = 0; i < response.data.length; i++) {
                  if (legendId[j] === response.data[i].moudleId) {
                    r.push(response.data[i].throughput)
                    q.push((response.data[i].controlTime).split(' ')[1])
                  }
                }
                temp = {
                  type: "line",
                  data: r,
                  name: z,
                  barWidth: '20%',
                  showSymbol: true,
                  symbol: 'circle',     //折点设定为实心点
                  symbolSize: 5,   //设定实心点的大小

                };
                option.series.push(temp)
                option.xAxis[0].data = q
              }
              setTimeout(() => {  //为了让加载动画效果明显,这里加入了setTimeout,实现800ms延时
                myChart.hideLoading()
              }, 800)
              myChart.setOption(option, true);
            });
            // console.log('ok');
          }, 500);
        }
        let option = {
          title: {
            show: true,
            text: this.obj.labelTwo,//折线图的标题
            x: '34',
            y: '-1',
            textAlign: null,//水平对齐方式，默认根据x设置自动调整，可选为： left' | 'right' | 'center
            textStyle: {
              fontFamily: 'Arial',
              fontSize: 18,
              fontStyle: 'normal',
              fontWeight: 'normal',
            },
            zlevel: 0,//一级层叠控制。默认0,每一个不同的zlevel将产生一个独立的canvas，相同zlevel的组件或图标将在同一个canvas上渲染。zlevel越高越靠顶层，canvas对象增多会消耗更多的内存和性能，并不建议设置过多的zlevel，大部分情况可以通过二级层叠控制z实现层叠控制。
            z: 6,//二级层叠控制，默认6,同一个canvas（相同zlevel）上z越高约靠顶层。
          },
          legend: {
            width: 800,
            left: 230,
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            x: 60,
            y: 50,
            right: 80,
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: '',
          }],
          yAxis: {
            type: 'value',
            name: '单位(' + unit + ')',
            nameTextStyle: {
              color: "#59a9e9",
              // padding:1
              top: 4
            },
            splitLine: {show: false},
            // scale: true, /*按比例显示*/
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}'
              // formatter: '{value} %'
            },
            show: true,
            splitNumber: 10,  // max: 100,
          },
          dataZoom: [
            {
              type: "slider",
              textStyle: false,//不显示左右两边的数据
              backgroundColor: "rgb(109,234,237,0.5)",
              fillerColor: "rgb(67,171,233,0.5)",
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '100%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              realtime: true, //拖动滚动条时是否动态的更新图表数据
              height: 20, //滚动条高度
              start: 0, //滚动条开始位置（共100等份）
              end: 100, //结束位置（共100等份）
            }
          ],
          series: [],
        }
        window.onresize = function () {
          myChart.resize();
        }
      }
    },
    computed: {}
    ,
    mounted() {
      this.batchData()
      this.dialogData()
    },
    created() {
    }
  }
</script>

<style scoped>

  /*去掉el-table的多余横线*/
  .el-table::before {
    height: 0 !important;
  }

  .monitor_msg >>> .great {
    display: none;
  }

  /*主体背景*/
  .monitor_main {
    min-height: 540px;
    height: 87vh;
    min-width: 1159px;
    background-color: #f6f7ff
  }

  .monitor_main p {
    display: inline-block;
    color: #444;
    font-size: 12px;
    margin-top: 2.5vh;
    margin-left: 18px;
  }

  .monitor_main .comBack {
    float: right;
    height: 3vh;
    margin-top: 1.5vh;
    line-height: 0;
    margin-right: 18px;
  }

  /*上半部分*/
  .monitor_msg >>> .el-input__inner {
    height: 36px;
  }

  .monitor_msg >>> .el-input {
    padding-top: 4px;
    width: 230px;
  }

  .monitor_msg {
    min-height: 110px;
    height: 10vh;
    padding-top: 2.7vh;
    padding-bottom: 0.5vh;
    margin: 2vh 18px 0;
    background-color: #fff;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
  }

  .monitor_msg i {
    display: inline-block;
  }

  .monitor_msg .demonstration {
    margin-left: 11px;
  }

  .monitor_msg .three {
    margin-top: 22px;
  }

  .monitor_msg .four {
    margin-top: 22px;
  }

  .monitor_msg .five {
    margin-left: 24px;
    margin-top: 22px;
  }

  /*弹窗的输入框样式*/
  .diaBox .search {
    float: left;
    width: 270px;
    margin: -2px 0 16px 14px;
  }

  /*input的placeholder样式*/
  input::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 14px;
  }

  /*日期选择的部分*/
  .monitor_msg >>> .el-range-separator {
    line-height: 28px !important;
  }

  /*选择系统的部分*/
  .monitor_msg .system {
    /*width: 182px;*/
    width: 195px;
    height: 32px;
    padding-right: 20px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    font-size: 14px;
    color: #606266;
    padding-left: 13px;
    background-color: #fff;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .monitor_msg .el-icon-circle-close {
    margin-left: -28px !important;
    font-size: 16px;
    color: #C0C4CC;
    z-index: 3;
    display: inline-block;
    cursor: pointer;
  }

  /*选择系统的弹窗样式*/
  .monitor_msg >>> .el-dialog__header {
    height: 30px;
    background-color: #66bded;
    padding: 7px 20px 0 !important;
  }

  .monitor_msg >>> .el-dialog__title {
    color: #fff;
    font-size: 14px;
  }

  .monitor_msg >>> .el-dialog__headerbtn {
    top: 12px;
  }

  .monitor_msg >>> .el-dialog--center .el-dialog__body {
    padding-top: 15px;
  }

  .monitor_msg >>> .el-dialog__footer {
    padding-top: 0;
  }

  .monitor_msg >>> .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }

  /*选择系统的弹窗表格*/
  .el-dialog__wrapper {
    top: -65px;
  }

  .diaBox .el-table >>> .cell {
    text-align: center;
    line-height: 16px;
  }

  .monitor_msg >>> .el-table td, .el-table th {
    padding: 1px 0 !important;
  }

  .diaBox >>> .el-input__inner {
    height: 30px;
  }

  .monitor_msg >>> .el-input__suffix {
    top: 4px;
  }

  /*使选择器的文字在ie上下居中*/
  .monitor_msg >>> .el-input__inner {
    line-height: 29px !important;
  }

  /*下半部分*/
  .monitor_echarts {
    min-height: 310px;
    height: 52vh;
    min-width: 1060px;
    margin: 4vh 18px 0;
    background-color: #fff;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
  }

  .monitor_echarts >>> .tableHead .cell {
    font-weight: bold;
  }

  .monitor_echarts >>> .cell {
    line-height: 16px !important;
  }

  .divDB >>> .el-input__inner {
    height: 33px;
    width: 217px;
  }

  .divDB >>> .el-input__icon {
    margin-right: 25px;
    line-height: 0 !important;
  }

  .divDB >>> .el-input__suffix {
    right: -23px;
  }

  .divDB >>> .el-select {
    width: 217px;
    float: right;
    margin-right: 3vh;
  }

  /*上半部分日期选择器的框*/
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 230px;
  }

  .monitor_msg >>> .el-date-editor .el-range__icon {
    line-height: 29px !important;
  }

  /*日期框的日期显示不全，调整宽度*/
  .monitor_msg >>> .el-date-editor .el-range-input {
    width: 45% !important;
  }

  /*查看SQL的弹窗样式*/
  .monitor_echarts >>> .el-dialog__header {
    height: 36px;
    background-color: #66bded;
    padding: 7px 20px 0 !important;
  }

  .monitor_echarts >>> .el-dialog__title {
    color: #fff;
    font-size: 14px;
  }

  .monitor_echarts >>> .el-dialog__headerbtn {
    top: 12px;
  }

  .monitor_echarts >>> .el-dialog--center .el-dialog__body {
    padding: 0 10px !important;

  }

  .monitor_echarts >>> .el-dialog--center {
    width: 65% !important;

  }

  .monitor_echarts >>> .el-dialog__footer {
    padding-top: 0;
  }

  .monitor_echarts >>> .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }

</style>
<style>
  /*表格纵列内容过多时点点点*/
  .el-tooltip__popper {
    max-width: 75% !important;
  }
</style>
