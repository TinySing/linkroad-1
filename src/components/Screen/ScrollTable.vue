<template>
  <div class="scorll_list_bg" :id="id" v-if="isRefresh">
    <table class="scroll_list scroll_list_fixed" cellpadding="0" cellspacing="0">
      <tr class="tableHeader">
        <th v-for="(option,index) in tableHeader" :key="index" :style='"width:"+option.rowsWidth+"%"'>
          {{option.rowsName}}
        </th>
      </tr>
    </table>
    <table class="scroll_list scroll_list_scroll" cellpadding="0" cellspacing="0" id="srcollTable">
      <tr class="tableHeader" style="color: transparent;">
        <th v-for="(option,index) in tableHeader" :key="index" :style='"width:"+option.rowsWidth+"%"'>{{option}}</th>
      </tr>
      <tr v-for="(option,index) in dataList" :key="index">
        <td v-for="rowInfo in tableHeader" :key="rowInfo.rowsCode">{{option[rowInfo.rowsCode]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'scrollTable',
    props: {
      tableHeader: {//列表表头
        type: Array,
        require: true
      },
      dataList: {//列表数据
        type: Array,
        require: true
      },
      id: {//组件id
        type: String,
        require: true
      },
      speed: {//每次滚动行数
        type: Number,
        require: false,
        default: 2
      }
    },
    data() {
      return {
        scrollTimer: null,
        isScroll: false,  //当前是否为可滚动状态,默认不可滚动
        isRefresh: true   //强制刷新组件

      }
    },
    created() {
    },
    mounted() {
      let that = this;
      setTimeout(() => {
        that.listScroll();
      }, 0)
    },
    beforeDestroy() {
      let that = this;
      clearInterval(that.scrollTimer);
      that.scrollTimer = null;
    },
    updated() {
      let that = this;
      setTimeout(() => {
        that.listScroll();
      }, 0)
    },
    methods: {
      //列表滚动DOM
      listScroll() {
        let that = this;
        let $viewArea = $("#" + that.id),   //可视区域
          $scrollList = $viewArea.find("#srcollTable"),  //滚动列表
          rowsHeight = $(".scroll_list_fixed").height(),  //每行数据的高度
          //滚动区域的高度
          viewHeight = $viewArea.height(),
          //滚动列表总高度
          scrollHeight = $scrollList.height();

        clearInterval(that.scrollTimer);
        that.scrollTimer = null;

        //重置滚动位置
        $scrollList.css({top: 0});
        //列表滚动DOM
        that.scrollTimer = setInterval(function () {
          //console.log(Math.abs(scrollHeight - viewHeight));
          //列表不需要滚动
          if (Math.abs(scrollHeight - viewHeight) < 12 || (scrollHeight < viewHeight)) {
            //窗口变化导致由可滚动变为不可滚动时，数据顺序重置
            if (that.isScroll) {
              that.isfresh = false;
              that.$nextTick(() => {
                that.isfresh = true;
              });
              console.log('可滚动变为不可滚动');
            }
            that.isScroll = false;
            return false;
          }
          that.isScroll = true;
          //窗口变大由可滚动变为不可滚动时，数据恢复默认顺序
          //判断本次滚动是否会触底
          /*if((scrollHeight-viewHeight+top) < (that.speed * rowsHeight) && !toBottomFlag){
            //触底直接滚动到底部
            $scrollList.animate({
              top: -(scrollHeight-viewHeight) + 'px'
            }, 1000)
            toBottomFlag = true;

          }else if(parseInt(top) == parseInt(scrollHeight-viewHeight) || toBottomFlag) {
            //如果当前位置在底部则返回顶部
            $scrollList.animate({
              top: 0 + 'px'
            }, 1000)
            toBottomFlag = false;
          }else{
            $scrollList.animate({
              top: "-=" + (that.speed * rowsHeight) + 'px'
            }, 1000)
            toBottomFlag = false;
          }*/
          $scrollList.animate({
            top: -(that.speed * rowsHeight) + 'px'
          }, 1000, function () {
            //将当前数据添加到数组末尾
            for (let i = 1; i < Number(that.speed + 1); i++) {
              let _currData = $scrollList.find("tr").eq(1);
              $scrollList.append(_currData);
              $scrollList.css({top: -(Number(that.speed - i) * rowsHeight) + 'px'});
            }
          })
        }, 3000)
      }
    }
  }
</script>

<!--<style scoped lang="scss">
  @media screen and (max-width: 1600px) {
  table {
  font-size: 12px !important;
  }
  }
  .scorll_list_bg {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 0;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

  table {
    width: 100%;
    font-size: 14px;
    color: #0cd8f4;
    font-weight: bold;
    border-collapse: collapse;
    table-layout: fixed;

  td, th {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-collapse: collapse;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  th {
    color: #fff;
    font-weight: bold;
  }

  }
  table.scroll_list {
    position: absolute;
    top: 0;
    z-index: 9;

  th, td {
    padding: 0 5px;
  }

  }
  table.scroll_list.scroll_list_fixed {
    box-shadow: 0 0 15px #3b69c5 inset;
    border-radius: 5px;
    background: #0f2253;
    z-index: 10;
  }

  table.scroll_list.scroll_list_scroll {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  }
</style>-->
