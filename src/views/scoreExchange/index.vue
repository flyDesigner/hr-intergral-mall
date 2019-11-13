<template>
    <div style="">
        <Tabs style="width: 100%;height: 100%;" value='areaCompany' >
            <TabPane label="区域公司" name='areaCompany' style="height:100%">
                <div>
                    <Row>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>大区</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="areaFormSearch.areaId" :size='size' class='tag' transfer @on-change="chooseArea" clearable>
                                   <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>区域公司名称</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="areaFormSearch.companyId" :size='size' class='tag' transfer clearable >
                                    <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId'>{{item.companyName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>产品类品</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="areaFormSearch.categoryCode" :size='size' class='tag' transfer clearable>
                                    <Option v-for='item in areaCategoryList' :key='item.categoryCode' :value='item.categoryCode'>{{item.categoryName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>搜索</Col>
                            <Col span='16' class='searchTag'>
                                <Input v-model="areaFormSearch.marryCode" :size="size" class='tag'></Input>
                            </Col>
                        </Col>
                        <Col span="24" class="SearchBtn" style='margin-top:5px'>
                            <Button :size="size" @click="areaSearch" type="warning" ><Icon type="ios-search" ></Icon>查询</Button>
                            <Button :size="size" @click="areaRefresh" type="info" ><Icon type="md-refresh" ></Icon>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div class='btnBox'>
                    <Button :size="size" @click="areaAdd"  ><Icon type="md-add" />新增</Button>
                </div>
                <div class='tabTableBox'>
                    <Table :data='areaCompanyData' :columns='areaCompanyColumns' :size='size' border :height='500'></Table>
                </div>
            </TabPane>
            <TabPane label="总部各室" name='Headquarters' >
                <div >
                    <Row>
                        
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>部室名称</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="deptFormSearch.deptId" :size='size' class='tag' transfer clearable>
                                    <Option v-for='item in deptList' :key='item.deptId' :value='item.deptId'>{{item.deptName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>产品类品</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="deptFormSearch.categoryCode" :size='size' class='tag' transfer clearable>
                                    <Option v-for='item in areaCategoryList' :key='item.categoryCode' :value='item.categoryCode'>{{item.categoryName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>搜索</Col>
                            <Col span='16' class='searchTag'>
                                <Input v-model="deptFormSearch.marryCode" :size="size" class='tag'></Input>
                            </Col>
                        </Col>
                        <Col span="6" class="SearchBtn">
                            <Button :size="size" @click="deptSearch" type="warning" ><Icon type="ios-search" ></Icon>查询</Button>
                            <Button :size="size" @click="deptRefresh" type="info" ><Icon type="md-refresh" ></Icon>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div class='btnBox'>
                    <Button :size="size" @click="deptAdd"  ><Icon type="md-add" />新增</Button>
                </div>
                <div class='tabTableBox'>
                    <Table :data='deptData' :columns='deptColumns' :size='size' border :height='500'></Table>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import axios from 'axios';
import areaAdd from './components/areaAdd.vue'
import deptAdd from './components/deptAdd.vue'
export default {
    data(){
        return{
            size:'small',
            //区域公司
            areaFormSearch:{
                areaId:'',//大区
                companyId:'',//区域公司名称
                categoryCode:'',//产品类品
                marryCode:''
            },
            areaList:[],//大区下拉框
            companyList:[],//区域公司下拉框
            areaCategoryList:[],//区域公司产品类品下拉
            areaCompanyData:[],//区域公司数据
            //区域公司表头
            areaCompanyColumns:[
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
                {
                    title: "序号",
                    align: "center",
                    width: 75,
                    type: "index"
                },
                {
                    title:"大区",
                    align:"center",
                    key:"areaName",
                    width:160, 
                },
                {
                    title:"区域公司名称",
                    align:"center",
                    key:"companyName",
                    width:160, 
                },
                {
                    title:"产品类品",
                    align:"center",
                    key:"categoryName",
                    width:160, 
                },
                {
                    title:"产品明细",
                    align:"center",
                    key:"categoryDetailName",
                    width:160, 
                },
                {
                    title:"兑换积分",
                    align:"center",
                    key:"scoreUsed",
                    width:160, 
                },
                {
                    title:"备注",
                    align:"center",
                    key:"remark",
                    width:160, 
                }
            ],
            deptFormSearch:{
                deptId:'',//部门
                categoryCode:'',//产品类品
                marryCode:''
            },
            deptList:[],//部门下拉
            deptData:[],//部门数据
            //部门科室表头
            deptColumns:[
                {
                    title: "序号",
                    align: "center",
                    width: 75,
                    type: "index"
                },
                {
                    title:"部室名称",
                    align:"center",
                    key:"deptName",
                    width:160, 
                },
                {
                    title:"产品类品",
                    align:"center",
                    key:"categoryName",
                    width:160, 
                },
                {
                    title:"产品明细",
                    align:"center",
                    key:"categoryDetailName",
                    width:160, 
                },
                {
                    title:"兑换积分",
                    align:"center",
                    key:"scoreUsed",
                    width:160, 
                },
                {
                    title:"备注",
                    align:"center",
                    key:"remark",
                    width:160, 
                }
            ]
        }
    },
    created(){
        this.init()
        this.getAreaList()
        this.getAreaCategoryList()
        this.getDeptList()
    },
    methods:{
        init(){
            axios.post(this.HOST+'/company/t-exchange-score-company/findList',{}).then(res=>{
                this.areaCompanyData=res.data
            })
            axios.post(this.HOST+'/dept/t-exchange-score-dept/findList',{}).then(res=>{
                this.deptData=res.data
            })
        },
        //获取大区列表
        getAreaList(){
            axios.post(this.HOST+'/company/t-area/selectAreaList',{}).then(res=>{
                this.areaList=res.data
            })
        },
        //选择大区 ----》获取公司列表
        chooseArea(val){
            axios.post(this.HOST+'/company/t-company/selectOptionList',{areaId:val}).then(res=>{
                this.companyList=[]
                this.areaFormSearch.companyId=''
                if(res.data.length>0){
                    res.data.forEach(element=>{
                        this.companyList.push({companyName:element.companyName,companyId:element.companyId})
                    })
                }
                
            })
        },
        
        //获取区域公司事项大类下拉列表
        getAreaCategoryList(){
            
            axios.post(this.HOST+'/company/t-exchange-category/selectCategoryList',{}).then(res=>{
                res.data.forEach(element=>{
                    this.areaCategoryList.push({
                        categoryCode:element.categoryCode,
                        categoryName:element.categoryName
                    })
                })
            })
            
        },

        //区域公司查询
        areaSearch(){
            axios.post(this.HOST+'/company/t-exchange-score-company/findList',this.areaFormSearch).then(res=>{
                this.areaCompanyData=res.data
            })
        },
        //区域公司重置
        areaRefresh(){
            this.areaFormSearch={
                areaId:'',
                companyId:'',
                categoryCode:'',
                marryCode:''
            }
            axios.post(this.HOST+'/company/t-exchange-score-company/findList',this.areaFormSearch).then(res=>{
                this.areaCompanyData=res.data
            })
        },
        //区域公司点击新增
        areaAdd(){
            new this.$newPopup(
                areaAdd,
                {

                },
                ()=>{
                    this.areaSearch()
                    //console.log('1111')
                }
            )
        },
        //获取总部科室名称
        getDeptList(){
            axios.post(this.HOST+'/dept/t-dept/allDept',{}).then(res=>{
                this.deptList=[]
                res.data.forEach(element=>{
                    this.deptList.push({
                        deptId:element.deptId,
                        deptName:element.deptName
                    })
                })
            })
        },
        deptSearch(){
            axios.post(this.HOST+'/dept/t-exchange-score-dept/findList',this.deptFormSearch).then(res=>{
                this.deptData=res.data
            })
        },
        deptRefresh(){
            this.deptFormSearch={
                deptId:'',
                categoryCode:'',
                marryCode:''
            }
            axios.post(this.HOST+'/dept/t-exchange-score-dept/findList',this.deptFormSearch).then(res=>{
                this.deptData=res.data
            })
        },
        deptAdd(){
            new this.$newPopup(
                deptAdd,
                {

                },
                ()=>{
                    this.deptSearch()
                    
                }
            )
        },
    }
}
</script>
<style lang="less" scoped>
.tabSearch{
    height: 100%;
}
.searchLabel{
    text-align: right;
    line-height: 22px;
}
.searchTag{
    padding-left:10px;
    .tag{
        width: 100%;
    }
}
.SearchBtn{
    text-align: right;
}
.btnBox{
    width: 100%;
    border-top: 1px solid #dcdee2;
    padding-top:5px;
    margin-top:15px;
  
}
.tabTableBox{
    margin-top:5px;
   
}
</style>