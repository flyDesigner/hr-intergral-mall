<template>
    <div>
        <Tabs style="width: 100%;height: 100%;" value='areaCompany' >
            <TabPane label="区域公司" name='areaCompany' style="height:100%">
                <div class='tabSearch'>
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
                                <Select v-model="areaFormSearch.companyId" :size='size' class='tag' transfer clearable>
                                    <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId'>{{item.companyName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>事项大类</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="areaFormSearch.categoryCode" :size='size' class='tag' transfer clearable>
                                    <Option v-for='item in areaCategoryList' :key='item.categoryCode' :value='item.categoryCode'>{{item.categoryName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>搜索</Col>
                            <Col span='16' class='searchTag'>
                                <Input v-model="areaFormSearch.searchKey" :size="size" class='tag'></Input>
                            </Col>
                        </Col>
                        <Col span="24" class="SearchBtn" style='margin-top:5px'>
                            <Button :size="size" @click="areaSearch" type="warning" ><Icon type="ios-search" ></Icon>查询</Button>
                            <Button :size="size" @click="areaRefresh" type="info" ><Icon type="md-refresh" ></Icon>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div class='btnBox'>
                    <Button :size="size" @click="addAreaScore"  ><Icon type="md-add" />新增</Button>
                    <Button :size="size" @click="modifyAreaScore"  ><Icon type="md-create" />修改</Button>
                    <Button :size="size" @click="deleteAreaScore"  ><Icon type="md-trash" />删除</Button>
                </div>
                <div class='tabTableBox'>
                    <Table :data='areaCompanyData' :columns='areaCompanyColumns' :size='size' border :height='500' @on-selection-change="getChooseAreaCols"></Table>
                </div>
            </TabPane>
            <TabPane label="总部各室" name='Headquarters' >
                 <div >
                    <Row>
                        
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>部室名称</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="generalFormSearch.deptId" :size='size' class='tag'>
                                    <Option v-for='item in deptList' :key='item.deptId' :value='item.deptId'>{{item.deptName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>事项大类</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="generalFormSearch.categoryCode" :size='size' class='tag' clearable>
                                    <Option v-for='item in deptCategoryList' :key='item.categoryCode' :value='item.categoryCode'>{{item.categoryName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>搜索</Col>
                            <Col span='16' class='searchTag'>
                                <Input v-model="generalFormSearch.searchKey" :size="size" class='tag'></Input>
                            </Col>
                        </Col>
                        <Col span="6" class="SearchBtn">
                            <Button :size="size" @click="deptSearch" type="warning" ><Icon type="ios-search" ></Icon>查询</Button>
                            <Button :size="size" @click="deptRefresh" type="info" ><Icon type="md-refresh" ></Icon>重置</Button>
                            
                        </Col>
                    </Row>
                </div>
                <div class='btnBox'>
                    <Button :size="size" @click="addDeptScore"  ><Icon type="md-add" />新增</Button>
                    <Button :size="size" @click="modifyDeptScore"  ><Icon type="md-create" />修改</Button>
                    <Button :size="size" @click="deleteDeptScore"  ><Icon type="md-trash" />删除</Button>
                </div>
                <div class='tabTableBox'>
                    <Table :data='generalHeadQuartersData' :columns='generalHeadQuartersColumns' :size='size' border :height='500' @on-selection-change="getChooseDeptCols"></Table>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import axios from 'axios'
import areaAddOrModify from './components/areaAddOrModify.vue';
import deptAddOrModify from './components/deptAddOrModify.vue';
import areaDetail from './components/areaDetail.vue';
import deptDetail from './components/deptDetail.vue'
export default{
    data(){
        return{
            size:'small',
            //区域公司查询
            areaFormSearch:{
                areaId:'',//大区
                companyId:'',//公司
                categoryCode:'',//事项类型
                searchKey:'',
                
            },
            areaList:[],//大区下拉框
            companyList:[],//区域公司下拉框
            areaCompanyData:[],//区域公司数据
            areaCategoryList:[],//区域公司重大事项下拉列表
            //区域公司表格
            areaCompanyColumns:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
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
                    render: (h, param) => {
                        return h("span", {
                            domProps: {
                                innerHTML: param.row.companyName
                            },
                            attrs: {
                                title: param.row.companyName
                            },
                            style: {
                                cursor: "pointer",
                                color: "#309AF2"
                            },
                            on: {
                                click: () => {
                                    this.showAreaDetail(param.row);
                                }
                            }
                        });
                    }
                },
                {
                    title:"事项大类",
                    align:"center",
                    key:"categoryName",
                    width:140, 
                },
                {
                    title:"分值",
                    align:"center",
                    key:"scoreTotal",
                    width:110, 
                },
                {
                    title:"积分有效期",
                    align:"center",
                    key:"endTime",
                    width:140, 
                },
                {
                    title:"创建时间",
                    align:"center",
                    key:"createTime",
                    width:180, 
                },
                {
                    title:"更新时间",
                    align:"center",
                    key:"updateTime",
                    width:180, 
                }
            ],
            chooseAreaTableCols:[],
            generalFormSearch:{
                deptId:'',//部室名称
                categoryCode:'',//事项类型
                searchKey:''
            },
            deptList:[],//部室下拉
            deptCategoryList:[],//总部事项
            generalHeadQuartersData:[],//总部各室数据
            generalHeadQuartersColumns:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
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
                    render: (h, param) => {
                        return h("span", {
                            domProps: {
                                innerHTML: param.row.deptName
                            },
                            attrs: {
                                title: param.row.deptName
                            },
                            style: {
                                cursor: "pointer",
                                color: "#309AF2"
                            },
                            on: {
                                click: () => {
                                    this.showDeptDetail(param.row);
                                }
                            }
                        });
                    }
                },
                {
                    title:"事项大类",
                    align:"center",
                    key:"categoryName",
                    width:140, 
                },
                {
                    title:"分值",
                    align:"center",
                    key:"scoreTotal",
                    width:110, 
                },
                {
                    title:"积分有效期",
                    align:"center",
                    key:"endTime",
                    width:140, 
                },
                {
                    title:"创建时间",
                    align:"center",
                    key:"createTime",
                    width:180, 
                },
                {
                    title:"更新时间",
                    align:"center",
                    key:"updateTime",
                    width:180, 
                }
            ],//总部各室表格
            deptAreaTableCols:[]
        }
    },
    created(){
        this.init()
        this.getAreaList()
        this.getAreaCategoryList()
        this.getDeptList()
        this.getDeptCategoryList()
    },
    methods:{
        init(){
            axios.post(this.HOST+'/company/t-total-score-company/selectList',{}).then(res=>{
                this.areaCompanyData=res.data
            })
            axios.post(this.HOST+'/dept/t-total-score-dept/list',{}).then(res=>{
                this.generalHeadQuartersData=res.data
            })
        },
        //获取大区列表
        getAreaList(){
            axios.post(this.HOST+'/company/t-area/selectAreaList',{}).then(res=>{
                this.areaList=res.data
            })
        },
        //选择大区 ----》获取大区列表
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
            axios.post(this.HOST+'/company/t-category-company/selectList',{}).then(res=>{
                res.data.forEach(element=>{
                    this.areaCategoryList.push({
                        categoryCode:element.categoryCode,
                        categoryName:element.categoryName
                    })
                })
            })
            //console.log(this.areaCategoryList)
        },
        //详情
        showAreaDetail(row){
            new this.$newPopup(
                areaDetail,
                {
                    props:{
                        row:row
                    }
                }
            )
        },
        areaSearch(){
            axios.post(this.HOST+'/company/t-total-score-company/selectList',this.areaFormSearch).then(res=>{
                this.areaCompanyData=res.data
            })
        },
        areaRefresh(){
            this.areaFormSearch={
                areaId:'',
                companyId:'',
                categoryCode:'',
                searchKey:''
            }
            axios.post(this.HOST+'/company/t-total-score-company/selectList',this.areaFormSearch).then(res=>{
                this.areaCompanyData=res.data
            })
        },
        //区域 新增按钮
        addAreaScore(){
            new this.$newPopup(
                areaAddOrModify,
                {

                },
                ()=>{
                    this.areaSearch()
                    //console.log('1111')
                }
            )
        },
        //选中的区域公司的数据
        getChooseAreaCols(selection){
            this.chooseAreaTableCols=[]
            this.chooseAreaTableCols=selection
        },
        //区域点修改
        modifyAreaScore(){
            
            //console.log(this.chooseAreaTableCols)
            if(this.chooseAreaTableCols.length==0){
                this.$Message.warning({
                    content: "请选择一条数据进行修改",
                    duration: 10,
                    closable: true
                });
                return;
            }else if(this.chooseAreaTableCols.length>1){
                this.$Message.warning({
                    content: "只能选择一条数据进行修改",
                    duration: 10,
                    closable: true
                });
                return;
            }else{
                if(!!this.chooseAreaTableCols[0].scoreUsed&&this.chooseAreaTableCols[0].scoreUsed>0){
                    this.$Message.warning({
                        content: "兑换过的积分无法再次进行修改",
                        duration: 10,
                        closable: true
                    });
                    return;
                }
                let date=this.chooseAreaTableCols[0].endTime
                //console.log(date)
                let arr=date.split('-')
                let day=new Date(arr[0],arr[1]-1,arr[2]) 
                //Date.now()- 8.64e7;
                if(day<Date.now() - 8.64e7){
                    this.$Message.warning({
                        content: "已过期的积分无法再次进行修改",
                        duration: 10,
                        closable: true
                    });
                    return;
                }else{
                    new this.$newPopup(
                        areaAddOrModify,
                        {
                            props:{
                                totalId:this.chooseAreaTableCols[0].totalId,
                                row:this.chooseAreaTableCols[0]
                            }
                        },
                        ()=>{
                            this.areaSearch()
                        }
                    )
                }
            }
            
        },
        //区域点删除
        deleteAreaScore(){
            if(this.chooseAreaTableCols.length==0){
                this.$Message.warning({
                    content: "请选择一条数据进行删除",
                    duration: 10,
                    closable: true
                });
                return;
            }else{
                let flag=true
                for(let i=0;i<this.chooseAreaTableCols.length;i++){
                    if(!!this.chooseAreaTableCols[i].scoreUsed && this.chooseAreaTableCols[i].scoreUsed>0){
                        flag=false
                        break;
                    }
                }
                
                if(!flag){
                    this.$Message.warning({
                        content: "请检查选中的数据是否兑换过积分，兑换过的积分无法进行删除",
                        duration: 10,
                        closable: true
                    });
                    return;
                }else{
                    let arr=[]
                    this.chooseAreaTableCols.forEach(element=>{
                        arr.push(element.totalId)
                    })
                    let totalId=arr.join(',')
                    axios.post(this.HOST+'/company/t-total-score-company/delete',{totalId:totalId}).then(res=>{
                        if(res.data==true){
                            this.$Message.success({
                                content:"删除成功",
                                duration : 5,
                                closable: true
                            });
                            this.areaSearch()
                        }else{
                            this.$Message.error({
                                content:"删除失败",
                                duration : 20,
                                closable: true
                            });
                        }
                    })
                }
            }
        },
        deptSearch(){
            axios.post(this.HOST+'/dept/t-total-score-dept/list',this.generalFormSearch).then(res=>{
                this.generalHeadQuartersData=res.data
            })
        },
        deptRefresh(){
            this.generalFormSearch={
                deptId:'',
                categoryCode:'',
                searchKey:'',
            }
            axios.post(this.HOST+'/dept/t-total-score-dept/list',this.generalFormSearch).then(res=>{
                this.generalHeadQuartersData=res.data
            })
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
        //获取总部事项大类列表
        getDeptCategoryList(){
            axios.post(this.HOST+'/dept/t-category-dept/list',{}).then(res=>{
                res.data.forEach(element=>{
                    this.deptCategoryList.push({
                        categoryCode:element.categoryCode,
                        categoryName:element.categoryName
                    })
                })
            })
        },
        //总室各科点新增
        addDeptScore(){
            new this.$newPopup(
                deptAddOrModify,
                {

                },
                ()=>{
                    this.deptSearch()
                   
                }
            )
        },
        showDeptDetail(row){
             new this.$newPopup(
                deptDetail,
                {
                    props:{
                        row:row
                    }
                }
            )
        },
        //选中的区域公司的数据
        getChooseDeptCols(selection){
            this.deptAreaTableCols=[]
            this.deptAreaTableCols=selection
        },
        //总室各科点修改
        modifyDeptScore(){
            if(this.deptAreaTableCols.length==0){
                this.$Message.error({
                    content: "请选择一条数据进行修改",
                    duration: 20,
                    closable: true
                });
                return;
            }else if(this.deptAreaTableCols.length>1){
                this.$Message.error({
                    content: "只能选择一条数据进行修改",
                    duration: 20,
                    closable: true
                });
                return;
            }else{
                if(!!this.deptAreaTableCols[0].scoreUsed&&this.deptAreaTableCols[0].scoreUsed>0){
                    this.$Message.warning({
                        content: "兑换过的积分无法再次进行修改",
                        duration: 10,
                        closable: true
                    });
                    return;
                }
                let date=this.deptAreaTableCols[0].endTime
                //console.log(date)
                let arr=date.split('-')
                let day=new Date(arr[0],arr[1]-1,arr[2]) 
                //Date.now()- 8.64e7;
                if(day<Date.now() - 8.64e7){
                    this.$Message.warning({
                        content: "已过期的积分无法再次进行修改",
                        duration: 10,
                        closable: true
                    });
                    return;
                }else{
                    new this.$newPopup(
                        deptAddOrModify,
                        {
                            props:{
                                totalId:this.deptAreaTableCols[0].totalId,
                                row:this.deptAreaTableCols[0]
                            }
                        },
                        ()=>{
                            this.deptSearch()
                        }
                    )
                }
            }
        },
        //总室各科点删除
        deleteDeptScore(){
            
            if(this.deptAreaTableCols.length==0){
                this.$Message.warning({
                    content: "请选择一条数据进行删除",
                    duration: 10,
                    closable: true
                });
                return;
            }else{
               
                let flag=true
                for(let i=0;i<this.deptAreaTableCols.length;i++){
                    if(!!this.deptAreaTableCols[i].scoreUsed && this.deptAreaTableCols[i].scoreUsed>0){
                        flag=false
                        break;
                    }
                }
                if(!flag){
                    this.$Message.warning({
                        content: "请检查选中的数据是否兑换过积分，兑换过的积分无法进行删除",
                        duration: 10,
                        closable: true
                    });
                    return;
                }else{
                    let arr=[]
                    this.deptAreaTableCols.forEach(element=>{
                        arr.push(element.totalId)
                    })
                    
                    axios.post(this.HOST+'/dept/t-total-score-dept/delete',arr).then(res=>{
                        if(res.data==true){
                            this.$Message.success({
                                content:"删除成功",
                                duration : 5,
                                closable: true
                            });
                            this.deptSearch()
                        }else{
                            this.$Message.error({
                                content:"删除失败",
                                duration : 20,
                                closable: true
                            });
                        }
                    })
                }
            }
        },
    },
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