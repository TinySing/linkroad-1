<template>
  <!--主体背景部分-->
  <div class="home_main">
    <i>当前位置：总览</i>
    <!--主体中心部分-->
    <div class="home_msg">
      <!--搜索框部分-->
      <div class="search">
        <input type="text" placeholder="请输入系统名称"/>
        <div class="sea_right">
          <img src="../../../static/img/search.png" alt="">
        </div>
      </div>
      <!--单独盒子部分-->
      <!--弹窗部分-->
      <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        @close='jumpOther'
        center
        >
        <div class="dialogBox"
             style="padding-bottom: 10px;" >
          <p>抱歉，当前没有可供您浏览的系统，如您认为系统分配不正确，请与您所在团队负责人联系</p>
        </div>
        <span slot="footer" class="dialog-footer"
              style="display:inline-block;width:300px;height:30px;margin-top: 23px;">
            <el-button class="btn" type="primary" @click="jumpOther">确 定</el-button>
          </span>
      </el-dialog>
      <div class="single_msg" v-for="item of homeList" :key="item.id">
        <!--盒子右边部分-->
        <div class="right_msg">
          <p class="one" @click="enter(item.one,item.sixCode)">系统名称：{{item.one}}</p><br>
          <p class="seven">系统负责人：{{item.seven}}</p>
          <p class="two">扫描时间：{{item.two}}</p>
          <img :src="require('../../../static/img/'+imgsrc+'.jpg')"/>
          <p class="three">{{text}}</p>
          <p class="four">{{item.four}}台存在警告</p>
          <!--盒子右下部分-->
          <div class="bottom_msg">
            <div class="bottom_left">
              <p class="five">告警设备:</p>
              <p style="float:left;width:20px;line-height:15px;">{{item.five}}</p>
            </div>
            <div class="bottom_right">
              <p class="six">系统编号:{{item.sixCode}}<br>
                关联设备数量:{{item.sixEqp}}台<br>
                项目成员数量:{{item.sixPer}}人</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        text: '未读',
        imgsrc: 'noread',
        dialogVisible: false,
        // homeList: [],

        homeList: [
          {
            one: '产险实时大屏',
            seven: '吴彦祖 王大陆',
            two: '2019年11月5日14时57分30秒',
            four: '3',
            five: '210.110.148.220 101.210.148.220 210.510.148.220',
            sixCode: 'G286',
            sixEqp: '12',
            sixPer: '8'
          },
          {
            one: '人力资源管理系统',
            seven: '孙燕姿 王大陆',
            two: '2019年11月5日14时57分30秒',
            four: '3',
            five: '10.110.148.220 210.210.148.220 21.510.148.220',
            sixCode: 'P041',
            sixEqp: '22',
            sixPer: '6'
          },
          {
            one: '开门红大屏二期',
            seven: '赵薇 王大陆',
            two: '2019年11月5日14时57分30秒',
            four: '3',
            five: '210.110.148.220 101.210.148.220 10.10.148.220',
            sixCode: 'G286',
            sixEqp: '12',
            sixPer: '8'
          },
          {
            one: '产险实时大屏',
            seven: '吴彦祖 王大陆',
            two: '2019年11月5日14时57分30秒',
            four: '3',
            five: '210.110.148.220 101.210.148.220 210.510.148.220',
            sixCode: 'G286',
            sixEqp: '12',
            sixPer: '8'
          },
          {
            one: '人力资源管理系统',
            seven: '孙燕姿 王大陆',
            two: '2019年11月5日14时57分30秒',
            four: '3',
            five: '210.110.148.220 10.210.148.220 21.510.148.220',
            sixCode: 'P041',
            sixEqp: '22',
            sixPer: '6'
          },
          {
            one: '开门红大屏二期',
            seven: '赵薇 王大陆',
            two: '2019年11月5日14时57分30秒',
            four: '3',
            five: '210.110.148.220 101.210.148.220 10.10.148.220',
            sixCode: 'G286',
            sixEqp: '12',
            sixPer: '8'
          },
          {
            one: '人力资源管理系统',
            seven: '孙燕姿 王大陆',
            two: '2019年11月5日14时57分30秒',
            four: '3',
            five: '210.110.148.220 10.210.148.220 21.510.148.220',
            sixCode: 'P041',
            sixEqp: '22',
            sixPer: '6'
          },
          {
            one: '开门红大屏二期',
            seven: '赵薇 王大陆',
            two: '2019年11月5日14时57分30秒',
            four: '3',
            five: '210.110.148.220 101.210.148.220 10.10.148.220',
            sixCode: 'G286',
            sixEqp: '12',
            sixPer: '8'
          }
        ]
      }
    },
    methods: {
      enter(id, idOne) {
        this.$router.push({
          // path: `/index/monitorMsg/${id}/${idOne}`,
          path: '/index/monitorMsg',
        })
        // this.imgsrc='read'
        // this.text='已读'
        // console.log(id)
        // console.log(idOne)
      },
      //如果该用户没有系统，则出弹窗
      appear() {
        if (this.homeList.length === 0) {
          this.dialogVisible = true
        } else {
          this.dialogVisible = false
        }
      },
      jumpOther() {
        this.$router.push({
          path: '/index/monitorMsg'
        })
      },
      // mainData(){
      //   let homeList=[]
      //   let qs = require('qs');
      //   let information = {"userId": ""};
      //   this.$axios.post('/monitorCon/system/userProject/queryProject', qs.stringify(information)).then((response) => {
      //     //session为空
      //     console.log(response)
      //     for (let i = 0; i < response.data.length; i++) {
      //       homeList.push({
      //         'sixCode': response.data[i]['projectid'],
      //         'one': response.data[i]['projectname']
      //       });
      //     }
      //     console.log(homeList)
      //   });
      // }
    },
    mounted() {
      this.appear()
      // this.mainData()
    }
  }
</script>


<style scoped>

  /*主体背景*/
  .home_main {
    height: 87vh;
    min-width: 1060px;
    background-color: #f6f7ff
  }

  .home_main i {
    display: inline-block;
    color: #444;
    font-size: 12px;
    margin-top: 2.5vh;
    margin-left: 18px;
  }

  /*主体部分*/
  .home_msg {
    height: 77vh;
    min-width: 1060px;
    margin: 2vh 18px 0;
    /*当内容超出div高度时，出现滚动条*/
    overflow-x: auto;
    background-color: #fff;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
  }

  /*主体部分搜索框*/
  .search {
    position: relative;
    width: 290px;
    height: 33px;
    margin: 15px 0 8px 35vw;
  }

  .search input {
    width: 213px;
    height: 31px;
    border: 1px solid #cecfcf;
    padding-left: 30px;
    border-radius: 50px 0 0 50px;
    font-size: 12px;
  }

  .sea_right {
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid #cecfcf;
    border-radius: 0 50px 50px 0;
    width: 43px;
    height: 33px;
    background-color: #66bded;
    cursor: pointer;
  }

  .sea_right img {
    display: block;
    width: 18px;
    height: 18px;
    margin-top: 8px;
    margin-left: 10px;
  }

  /*修改输入框默认字体样式*/
  ::-webkit-input-placeholder { /*Webkit browsers*/
    color: #d2d3d9;
    font-size: 12px;
  }

  :-moz-placeholder { /*Mozilla Firefox 4 to 8*/
    color: #d2d3d9;
    font-size: 12px;
  }

  ::-moz-placeholder { /*Mozilla Firefox 19+*/
    color: #d2d3d9;
    font-size: 12px;
  }

  /*主体内单独小盒子*/
  .single_msg {
    float: left;
    width: 32%;
    height: 152px;
    font-size: 1.5vh;
    margin: 2vh 0 2vh 2vh;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  /*盒子右边部分*/
  .right_msg {
    position: relative;
    /*width: 351px;*/
    width: 100%;
    height: 86px;
    float: left;
    line-height: 12px;
  }

  .right_msg .one {
    display: block;
    cursor: pointer;
    margin-top: 14px;
    margin-left: 27px;
    float: left;
    color: #333;
  }

  .right_msg .one:hover {
    color: #39AAED;
  }

  .right_msg .two {
    display: block;
    margin-top: 6px;
    margin-left: 27px;
    color: #333;
  }

  .right_msg img {
    width: 50px;
    height: 50px;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 15px 0 0;
  }

  .right_msg .three {
    position: absolute;
    top: 11px;
    right: 2px;
    font-size: 1.5vh;
    color: #fff;
  }

  .right_msg .four {
    display: block;
    margin-top: 6px;
    margin-left: 27px;
    color: #ff3333;
  }

  .right_msg .seven {
    display: block;
    margin-top: 20px;
    margin-left: 27px;
    width: 45%;
    color: #333;
  }

  /*盒子下面部分*/
  .bottom_msg {
    line-height: 14px;
    width: 90%;
    height: 60px;
    border-top: 1px solid #e8eaeb;
    margin-left: 20px;
    margin-top: 8px;
    margin-bottom: 6px;
  }

  .bottom_left {
    float: left;
    width: 53%;
    height: 41px;
    border-right: 1px solid #e8eaeb;
    margin-top: 10px;
  }

  .bottom_left .five {
    float: left;
    font-size: 1.5vh;
    margin-left: 6px;
    margin-right: 2%;
    color: #333;
  }

  .bottom_right {
    float: right;
    width: 46%;
    height: 41px;
    margin-top: 10px;
  }

  .bottom_right .six {
    font-size: 1.5vh;
    margin-left: 9%;
    color: #333;
    line-height: 15px;
  }

  /*弹窗样式*/
  .dialogBox {
    min-width: 500px;
    background: #fff;
  }

  .home_msg >>> .el-dialog {
    margin-top: 22vh !important;
  }

  .home_msg >>> .el-dialog__header {
    height: 29px;
    background-color: #66bded;
    padding: 7px 20px 0 !important;
  }

  .home_msg >>> .el-dialog__footer {
    padding-top: 0;
  }

  .home_msg >>> .el-dialog__title {
    height: 26px;
    background-color: #66bded;
    font-size: 14px;
    padding-top: 9px;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
  }

  .home_msg >>> .el-dialog__headerbtn {
    top: 12px !important;
  }

  .home_msg >>> .btn {
    display: inline-block;
    cursor: pointer;
    line-height: 5px;
    border: 1px solid #a3d7f4;
    box-shadow: 0 2px 5px 2px rgba(145, 208, 243, 0.3);
    width: 95px;
    height: 30px;
    font-weight: bold;
  }
</style>
