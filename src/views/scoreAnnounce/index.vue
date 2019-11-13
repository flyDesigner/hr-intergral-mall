<template>
    <div style="">
        <Tabs style="width: 100%;height: 100%;" value='areaCompany' >
            <TabPane label="区域公司" name='areaCompany' >
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
                            <Col span='8' class='searchLabel'>搜索</Col>
                            <Col span='16' class='searchTag'>
                                <Input v-model="areaFormSearch.searchKey" :size="size" class='tag'></Input>
                            </Col>
                        </Col>
                        <Col span="6" class="SearchBtn">
                            <Button :size="size" @click="areaSearch" type="warning" ><Icon type="ios-search" ></Icon>查询</Button>
                            <Button :size="size" @click="areaRefresh" type="info" ><Icon type="md-refresh" ></Icon>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div class='tabTableBox'>
                    <Table :data='areaCompanyData' :columns='areaCompanyColumns' :size='size' border stripe :height='500'></Table>
                </div>
            </TabPane>
            <TabPane label="总部各室" name='Headquarters' >
                 <div class='tabSearch'>
                    <Row>
                        
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>部室名称</Col>
                            <Col span='16' class='searchTag'>
                                <Select v-model="generalFormSearch.deptId" :size='size' class='tag' transfer clearable>
                                    <Option v-for='item in deptList' :key='item.deptId' :value='item.deptId'>{{item.deptName}}</Option>
                                </Select>
                            </Col>
                        </Col>
                        <Col span='6'>
                            <Col span='8' class='searchLabel'>搜索</Col>
                            <Col span='16' class='searchTag'>
                                <Input v-model="generalFormSearch.searchKey" :size="size" class='tag'></Input>
                            </Col>
                        </Col>
                        <Col span="12" class="SearchBtn">
                            <Button :size="size" @click="generalSearch" type="warning" ><Icon type="ios-search" ></Icon>查询</Button>
                            <Button :size="size" @click="generalRefresh" type="info" ><Icon type="md-refresh" ></Icon>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div class='tabTableBox'>
                    <Table :data='generalHeadQuartersData' :columns='generalHeadQuartersColumns' :size='size' border :height='500'></Table>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return{
            size:'small',
            //区域公司
            areaFormSearch:{
                areaId:'',//大区
                companyId:'',//区域公司名称
                searchKey:''
            },
            areaList:[],//大区下拉框
            companyList:[],//区域公司下拉框
            areaCompanyData:[],//区域公司表格数据
            //区域公司列表
            areaCompanyColumns:[
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
                    width:110, 
                },
                {
                    title:"区域公司名称",
                    align:"center",
                    key:"companyName",
                    width:160, 
                },
                {
                    title:"讲师支持",
                    align:"center",
                    key:"jszc",
                    width:110, 
                },
                {
                    title:"课程开发",
                    align:"center",
                    key:"kckf",
                    width:110, 
                },
                {
                    title:"人才交流",
                    align:"center",
                    key:"rcjl",
                    width:110, 
                },
                {
                    title:"推荐合作伙伴",
                    align:"center",
                    key:"tjhzhb",
                    width:110, 
                },
                {
                    title:"创新课题孵化",
                    align:"center",
                    key:"cxktfh",
                    width:110, 
                },
                {
                    title:"学习参访接待",
                    align:"center",
                    key:"xxcfjd",
                    width:110, 
                },
                {
                    title:"学院发展支持",
                    align:"center",
                    key:"xyfzzc",
                    width:110, 
                },
                {
                    title:"其他",
                    align:"center",
                    key:"qt",
                    width:110, 
                },
                {
                    title:"总积分",
                    align:"center",
                    key:"scoreTotal",
                    width:110, 
                },
                {
                    title:"兑换积分",
                    align:"center",
                    key:"scoreUsed",
                    width:110, 
                },
                {
                    title:"可用积分",
                    align:"center",
                    key:"scoreUsable",
                    width:110, 
                },
            ],
            generalFormSearch:{
                deptId:'',//部门
                searchKey:''
            },
            deptList:[],//部门下拉框
            generalHeadQuartersData:[],//总部各室表格数据
            //总部各室列表
            generalHeadQuartersColumns:[
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
                    title:"讲师调用",
                    align:"center",
                    key:"jsdy",
                    width:110, 
                },
                {
                    title:"课程开发",
                    align:"center",
                    key:"kckf",
                    width:110, 
                },
                {
                    title:"讲师培养和认证",
                    align:"center",
                    key:"jspyhrz",
                    width:130, 
                },
                {
                    title:"在线课程开发和宣传支持",
                    align:"center",
                    key:"zxkckfhxczc",
                    width:170, 
                },
                {
                    title:"素拓项目支持",
                    align:"center",
                    key:"stxmzc",
                    width:110, 
                },
                
                {
                    title:"推荐合作伙伴",
                    align:"center",
                    key:"tjhzhb",
                    width:110, 
                },
                {
                    title:"引入科学方法",
                    align:"center",
                    key:"yrkxff",
                    width:110, 
                },
                {
                    title:"学习参访设计",
                    align:"center",
                    key:"xxcfsj",
                    width:110, 
                },
                {
                    title:"学院发展支持",
                    align:"center",
                    key:"xyfzzc",
                    width:110, 
                },
                {
                    title:"总积分",
                    align:"center",
                    key:"scoreTotal",
                    width:110, 
                },
                {
                    title:"其他",
                    align:"center",
                    key:"qt",
                    width:110, 
                },
                {
                    title:"兑换积分",
                    align:"center",
                    key:"scoreUsed",
                    width:110, 
                },
                {
                    title:"可用积分",
                    align:"center",
                    key:"scoreUsable",
                    width:110, 
                },
            ]
        }
    },
    created(){
        this.getAreaList()
        //this.getCompanyList()
        this.getDeptList()
        this.init()

    },
    methods:{
        //初始化页面
        init(){
            // let url = this.HOST+"/dept/t-dept/list"
            let param={}
            axios.post(this.HOST+'/company/t-company/selectCompanyList',param).then(res=>{    
                this.areaCompanyData=res.data
            })
            axios.post(this.HOST+'/dept/t-dept/list',param).then(res=>{
                
                this.generalHeadQuartersData=res.data
            })
        },
        //获取大区列表
        getAreaList(){
            axios.post(this.HOST+'/company/t-area/selectAreaList',{}).then(res=>{
                this.areaList=res.data
            })
        },
        //获取公司列表
        getCompanyList(){
            axios.post(this.HOST+'/company/t-company/selectOptionList',{areaId:this.areaFormSearch.areaId}).then(res=>{
                this.companyList=[]
                res.data.forEach(element=>{
                    this.companyList.push({companyName:element.companyName,companyId:element.companyId})
                })
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
        //区域 点击查询
        areaSearch(){
            axios.post(this.HOST+'/company/t-company/selectCompanyList',this.areaFormSearch).then(res=>{    
                this.areaCompanyData=[]
                this.areaCompanyData=res.data
            })
        },
        areaRefresh(){
            this.areaFormSearch={
                areaId:'',
                companyId:'',
                searchKey:''
            }
            axios.post(this.HOST+'/company/t-company/selectCompanyList',this.areaFormSearch).then(res=>{    
                this.areaCompanyData=[]
                this.areaCompanyData=res.data
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
        generalSearch(){
            axios.post(this.HOST+'/dept/t-dept/list',this.generalFormSearch).then(res=>{
                this.generalHeadQuartersData=res.data
            })
        },
        generalRefresh(){
            this.generalFormSearch={
                deptId:'',
                searchKey:''
            }
            axios.post(this.HOST+'/dept/t-dept/list',this.generalFormSearch).then(res=>{
                this.generalHeadQuartersData=[]
                this.generalHeadQuartersData=res.data
            })
        }
    },
}
</script>
<style lang="less" scoped>
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
.tabTableBox{
    margin-top:20px 
}
.ivu-table-small td {
    height: 32px !important;
}
</style>