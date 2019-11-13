<template>
  <div>
    <div style="margin-top:5px">
      <Row>
        <Col span="6">
          <Col span="8" class="searchLabel">大区</Col>
          <Col span="16" class="searchTag">
            <Select
              v-model="formModel.areaId"
              :size="size"
              class="tag"
              transfer
              @on-change="chooseArea"
              clearable
            >
              <Option
                v-for="item in areaList"
                :key="item.areaId"
                :value="item.areaId"
              >{{item.areaName}}</Option>
            </Select>
          </Col>
        </Col>
        <Col span="6">
          <Col span="8" class="searchLabel">区域公司名称</Col>
          <Col span="16" class="searchTag">
            <Select v-model="formModel.companyId" :size="size" class="tag" clearable>
              <Option
                v-for="item in deptNameList"
                :key="item.companyId"
                :value="item.companyName"
              >{{item.companyName}}</Option>
            </Select>
          </Col>
        </Col>
        
        <Col span="12"  class="SearchBtn">
          <Button :size="size" @click="search" type="warning">
            <Icon type="ios-search"></Icon>查询
          </Button>
          <Button :size="size" @click="Refresh" type="info">
            <Icon type="md-refresh"></Icon>重置
          </Button>
        </Col>
      </Row>
    </div>
    <div class="btnBox">
      <Button :size="size" @click="add">
        <Icon type="md-add" />新增
      </Button>
      <Button :size="size" @click="modify">
        <Icon type="md-create" />修改
      </Button>
      <Button :size="size" @click="Delete">
        <Icon type="md-trash" />删除
      </Button>
    </div>
    <div class="tabTableBox">
      <Table
        :data="regionalCompanyList"
        :columns="regionalCompanyColumns"
        :size="size"
        border
        :height="500"
        @on-selection-change="getChooseDeptCols"
      ></Table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AddOrModify from "./components/AddOrModify.vue";
export default {
  data() {
    return {
      size: "small",
      areaList: [], //大区下拉框
      formModel: {
        areaId:"",
        //deptId: "", //
        companyId: "", //
        //companyName: "", //
        any: ""
      },
      regionalCompanyList: [], 
      chooseArr:[],
      deptNameList: [], //总部事项
      regionalCompanyColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          align: "center",
          width: 75,
          type: "index"
        },
        {
          title: "大区",
          align: "center",
          key: "areaName",
          width: 160
        },
        {
          title: "各区域公司名称",
          align: "center",
          key: "companyName",
          // width: 140
        },
        {
          title: "备注",
          align: "center",
          key: "remark",
          width: 150
        },
        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          width: 180
        }
      ]
    };
  },
  created() {
    this.init();
    this.getAreaList();
  },
  methods: {
    init() {
      axios.post(this.HOST + "/company/t-company/selectCompanyList", {}).then(res => {
        this.regionalCompanyList = res.data;
      });
    },
    //获取大区列表
    getAreaList() {
      axios.post(this.HOST + "/company/t-area/selectAreaList", {}).then(res => {
        this.areaList = res.data;
      });
    },
    //选择大区 ----》获取大区列表
    chooseArea(val) {
      this.deptNameList = [];
      this.formModel.companyId = "";
      axios
        .post(this.HOST + "/company/t-company/selectOptionList", {
          areaId: val
        })
        .then(res => {
          this.deptNameList = res.data;
        });
    },
    search(){
      axios.post(this.HOST + "/company/t-company/selectCompanyList", this.formModel).then(res => {
        this.regionalCompanyList = res.data;
      });
    },
    Refresh(){
      this.formModel={
        areaId:"",
        //deptId: "", //
        companyId: "", //
        //companyName: "", //
        any: ""
      }
      axios.post(this.HOST + "/company/t-company/selectCompanyList", this.formModel).then(res => {
        this.regionalCompanyList = res.data;
      });
    },
    //总室各科点新增
    add() {
      new this.$newPopup(AddOrModify, {}, () => {
        this.search();
      });
    },
    //选中的区域公司的数据
    getChooseDeptCols(selection) {
      this.chooseArr = [];
      this.chooseArr= selection
      
    },
    modify(){
      if(this.chooseArr.length!=1){
        this.$Message.warning({
          content:'有且只能选择一条进行修改',
          duration : 10,
          closable: true
        })
        return;
      }else{
        new this.$newPopup(
          AddOrModify, 

          {
              props:{    
                rowData:this.chooseArr[0],
                companyId:this.chooseArr[0].companyId
              }
          },
          () => {
          this.search();
        });
      }
      
    },
  //点删除
    Delete(){
      console.log(this.chooseArr)
      //console.log(this.chooseArr.length)
      if(this.chooseArr.length==0){
        this.$Message.warning({
          content:'请选择数据进行删除',
          duration : 10,
          closable: true
        })
        return;
      }else{
        let deleteFlag=true
        for(let i=0;i<this.chooseArr.length;i++){
          if(this.chooseArr[i].scoreTotal>0){
            deleteFlag=false;
          
            break;
          }
        }
        //console.log(deleteFlag)
        if(!deleteFlag){
           this.$Message.error({
              content:'请检查该公司是否有积分，有积分的公司无法进行删除',
              duration:10,
              closable:true,
            })
            return;
        }else{
          let arr=[]
          this.chooseArr.forEach(element=>{
            arr.push(element.companyId)
          })
          let company=arr.join(',')
          axios.post(this.HOST+'/company/t-company/delete',{companyId:company}).then(res=>{
            if(res.data==true){
                this.$Message.success({
                    content:"删除成功",
                    duration : 5,
                    closable: true
                });
                this.search()
            }else{
                this.$Message.error({
                    content:"删除失败",
                    duration : 20,
                    closable: true
                });
            }
          })
        }
        // if(!!deleteFlag){
        //   let arr=[]
        //   this.chooseArr.forEach(element=>{
        //     arr.push(element.companyId)
        //   })
        //   let company=arr.join(',')
        //   axios.post(this.HOST+'/company/t-company/delete',{companyId:company}).then(res=>{
        //     if(res.data==true){
        //         this.$Message.success({
        //             content:"删除成功",
        //             duration : 5,
        //             closable: true
        //         });
        //         this.search()
        //     }else{
        //         this.$Message.error({
        //             content:"删除失败",
        //             duration : 20,
        //             closable: true
        //         });
        //     }
        //   })
        // }else{
        //    this.$Message.error({
        //       content:'请检查该公司是否有积分，有积分的公司无法进行删除',
        //       duration:10,
        //       closable:true,
        //     })
        //     return;
        // }
        
      }
    }
  }
};
</script>
<style lang="css" scoped>
.tabSearch {
  height: 100%;
}
.searchLabel {
  text-align: right;
  line-height: 22px;
}
.searchTag {
  padding-left: 10px;
  /* .tag{
        width: 100%;
    } */
}
.SearchBtn {
  text-align: right;
}
.btnBox {
  width: 100%;
  border-top: 1px solid #dcdee2;
  padding-top: 5px;
  margin-top: 15px;
}
.tabTableBox {
  margin-top: 5px;
}
</style>