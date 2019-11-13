<template>
  <div id="box" style="height:100%">
    <div class="head-banner">
      <div class="head-banner-text">"智慧"积分管理平台</div>
    
    </div>
    <div class="contain-box">
      <div class="menu-bar-box">
        <Menu style="width: 200px" :theme='theme' :active-name='activeMenu' @on-select="onMenuSelect">
          <MenuItem name='scoreAnnounce'>
              积分公示
          </MenuItem>
          <MenuItem name='scoreAccount'>
              积分累计
          </MenuItem>
          <MenuItem name='scoreExchange'>
              积分兑换
          </MenuItem>
          <MenuItem name='companyMaintenance'>
              区域公司维护
          </MenuItem>
        </Menu>
        
      </div>
      <div class="page-modal">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return{
      theme:'light',
      activeMenu:''
    }
  },
  created(){
    this.refresh()
  },
  methods:{
    refresh(){
      //console.log(this.$router.history.current.name)
      this.activeMenu=this.$router.history.current.name
    },
    //点击菜单切换页面
    onMenuSelect(val){
      let params={}
      this.$router.push({
        name: val,
        params: params,
        
      });
        
    }
  }
};
</script>

<style lang='less'>
* {
  padding: 0px;
  margin: 0px;
  
}
html,body,#box{

 height: 100%;

}
.head-banner {
  width: 100%;
  height: 48px;
  background: #3399ff;
  .head-banner-text {
    line-height: 48px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    padding-left: 50px;
  }
}
.contain-box {
  width: 100%;
  //background: red;
   height: calc(~"100% - 48px");
  padding-top: 2px;
  display: flex;

}
.menu-bar-box {
  display: inline-block;
  width: 200px;
  height: 100%;
  background: white;
}
.page-modal {
  display: inline-block;
  width: calc(~"100% - 200px");
  height: 100%;
  //background: red;
  border-top: 5px solid #f3f3f3;
  border-left: 5px solid #f3f3f3;
  border-right: 5px solid #f3f3f3;
  padding: 5px 10px;
}
</style>
