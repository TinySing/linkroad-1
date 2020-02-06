<template>
  <div class="main_bgm" :style="bgImg">
    <div class="nav" :style="navImg"></div>
    <div class="left">
      <div class="disc">
        <Disc></Disc>
      </div>
      <div class="ram">
        <Ram></Ram>
      </div>
      <div class="cpu">
        <Cpu></Cpu>
      </div>
    </div>
    <div class="middle">
      <div class="middle_top">
        <div class="fullGC"></div>
        <div class="apply"></div>
        <div class="error"></div>
      </div>
      <div class="dashboard">
        <Dashboard></Dashboard>
      </div>
    </div>
    <div class="right">
      <div class="batch">
        <ScrollTable></ScrollTable>
      </div>
      <div class="response"></div>
      <div class="slowSQL"></div>
    </div>
  </div>

</template>

<script>
  import Disc from './Screen/Disc'
  import Ram from './Screen/Ram'
  import Cpu from './Screen/Cpu'
  import Dashboard from './Screen/Dashboard'
  import ScrollTable from './Screen/ScrollTable'

  export default {
    name: "SmallScreen",
    components: {Cpu, Ram, Disc, Dashboard,ScrollTable}
    ,
    data() {
      return {
        navImg: {
          backgroundImage: "url(" + require("../../static/img/screen_nav.jpg") + ") ",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        },
        bgImg: {
          backgroundImage: "url(" + require("../../static/img/screen_main.jpg") + ") ",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }
      }
    }
  }
</script>

<style scoped>
  body{
    width:100%;
    height:100%;
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

  .left {
    float: left;
    width: 28%;
    height: 89vh;
  }

  .disc {
    width: 100%;
    height: 30vh;
    border: 1px solid red;
  }

  .ram {
    height: 30vh;
    border: 1px solid red;
  }

  .cpu {
    height: 29vh;
    border: 1px solid red;
  }

  .middle {
    float: left;
    height: 89vh;
    width: 44%;
  }

  .middle_top {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .middle .middle_top .fullGC {
    float: left;
    width: 33%;
    height: 30vh;
    border: 1px solid red;
  }

  .middle .middle_top .apply {
    float: left;
    width: 33%;
    height: 30vh;
    border: 1px solid red;
  }

  .middle .middle_top .error {
    float: left;
    width: 33%;
    height: 30vh;
    border: 1px solid red;
  }

  .dashboard {
    float: left;
    width: 100%;
    height: 59vh;
    border: 1px solid red;
  }

  .right {
    float: left;
    height: 89vh;
    width: 28%;
  }

  .batch {
    width: 99%;
    height: 30vh;
    border: 1px solid red;
  }

  .response {
    width: 99%;
    height: 30vh;
    border: 1px solid red;
  }

  .slowSQL {
    width: 99%;
    height: 29vh;
    border: 1px solid red;
  }

</style>
