<template>
    <div style='display:flex'>
        <div class="mode-menu">
            <Menu style='width:160px' :active-name='formModel.categoryCode'  @on-select="onModeSelect" >
                <MenuItem v-for='item in areaModeList' :key='item.categoryCode' :name='item.categoryCode'>{{item.categoryName}}</MenuItem>
            </Menu>
        </div>
        <div class='mode-content'>
            <div v-if='formModel.categoryCode=="jszc"?true:false'>
                <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                    <Col span='20'>
                    <Form-item label='大区' prop='areaId'>
                        <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable :disabled='readonlyFlag'>
                            <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='区域公司名称' prop='companyId'>
                        <Select v-model="formModel.companyId" :size='size'  transfer  clearable :disabled='readonlyFlag'>
                            <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='内容' prop='content'>
                        <Input type="textarea" style="width:100%;font-size:12px" v-model="formModel.content" class="textarea-input" ></Input>
                    </Form-item>
                    <Form-item label='分值' prop='scoreTotal'>
                        <Input type='number' :size="size" v-model="formModel.scoreTotal" ></Input>
                    </Form-item>
                    <Form-item label='积分有效期' prop='endTime'>
                         <DatePicker type="date" placeholder="选择积分有效期" v-model='formModel.endTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseDate" :options="disabledChoosePlanDate" style='width:100%'></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    </Col>
                </Form>
            </div>
            <div v-if='formModel.categoryCode=="kckf"?true:false'>
                <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                    <Col span='20'>
                    <Form-item label='大区' prop='areaId'>
                        <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable :disabled='readonlyFlag'>
                            <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='区域公司名称' prop='companyId'>
                        <Select v-model="formModel.companyId" :size='size'  transfer  clearable :disabled='readonlyFlag'>
                            <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='姓名' prop='personName'>
                        <Input :size='size' v-model="formModel.personName"></Input>
                    </Form-item>
                    <Form-item label='项目名称' prop='projectName'>
                        <Input :size='size' v-model="formModel.projectName"></Input>
                    </Form-item>
                     <Form-item label='课程名称' prop='className'>
                        <Input :size='size' v-model="formModel.className"></Input>
                    </Form-item>
                    <Form-item label='课时' prop='classHour'>
                        <Input type='number' :size="size" v-model="formModel.classHour" ></Input>
                    </Form-item>
                    <Form-item label='分值' prop='scoreTotal'>
                        <Input type='number' :size="size" v-model="formModel.scoreTotal" ></Input>
                    </Form-item>
                    <Form-item label='积分有效期' prop='endTime'>
                         <DatePicker type="date" placeholder="选择积分有效期" v-model='formModel.endTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseDate" :options="disabledChoosePlanDate" style="width:100%"></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    </Col>
                </Form>
            </div>
            <div v-if='formModel.categoryCode=="rcjl"?true:false'>
                <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                    <Col span='20'>
                    <Form-item label='大区' prop='areaId'>
                        <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable :disabled='readonlyFlag'>
                            <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='区域公司名称' prop='companyId'>
                        <Select v-model="formModel.companyId" :size='size'  transfer  clearable :disabled='readonlyFlag'>
                            <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='姓名' prop='personName'>
                        <Input :size='size' v-model="formModel.personName"></Input>
                    </Form-item>
                    <Form-item label='交流部门' prop='exchangeDept'>
                        <Input :size='size' v-model="formModel.exchangeDept"></Input>
                    </Form-item>
                    <Form-item label='交流时长' prop='exchangeHour'>
                        <Input type='number' :size="size" v-model="formModel.exchangeHour" ></Input>
                    </Form-item>
                    <Form-item label='交流日期区间' prop='exchangeTime'>
                         <DatePicker type="daterange" placeholder="选择交流日期" v-model='exchangeTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseExchangeTime"  style="width:100%"></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    <Form-item label='分值' prop='scoreTotal'>
                        <Input type='number' :size="size" v-model="formModel.scoreTotal" ></Input>
                    </Form-item>
                    <Form-item label='积分有效期' prop='endTime'>
                         <DatePicker type="date" placeholder="选择积分有效期" v-model='formModel.endTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseDate" :options="disabledChoosePlanDate" style="width:100%"></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    </Col>
                </Form>
            </div>
            <div v-if='formModel.categoryCode=="tjhzhb"?true:false'>
                <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                    <Col span='20'>
                    <Form-item label='大区' prop='areaId'>
                        <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable :disabled='readonlyFlag'>
                            <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='区域公司名称' prop='companyId'>
                        <Select v-model="formModel.companyId" :size='size'  transfer  clearable :disabled='readonlyFlag'>
                            <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                        </Select>
                    </Form-item>
                     <Form-item label='项目名称' prop='projectName'>
                        <Input :size='size' v-model="formModel.projectName"></Input>
                    </Form-item>
                    <Form-item label='内容' prop='content'>
                        <Input type="textarea" style="width:100%;font-size:12px" v-model="formModel.content" class="textarea-input" ></Input>
                    </Form-item>
                    <Form-item label='分值' prop='scoreTotal'>
                        <Input type='number' :size="size" v-model="formModel.scoreTotal" ></Input>
                    </Form-item>
                    <Form-item label='积分有效期' prop='endTime'>
                         <DatePicker type="date" placeholder="选择积分有效期" v-model='formModel.endTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseDate" :options="disabledChoosePlanDate" style='width:100%'></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    </Col>
                </Form>
            </div>
            <div v-if='formModel.categoryCode=="cxktfh"?true:false'>
                <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                    <Col span='20'>
                    <Form-item label='大区' prop='areaId'>
                        <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable :disabled='readonlyFlag'>
                            <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='区域公司名称' prop='companyId'>
                        <Select v-model="formModel.companyId" :size='size'  transfer  clearable :disabled='readonlyFlag'>
                            <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                        </Select>
                    </Form-item>
                     <Form-item label='项目名称' prop='projectName'>
                        <Input :size='size' v-model="formModel.projectName"></Input>
                    </Form-item>
                    <Form-item label='内容' prop='content'>
                        <Input type="textarea" style="width:100%;font-size:12px" v-model="formModel.content" class="textarea-input" ></Input>
                    </Form-item>
                    <Form-item label='分值' prop='scoreTotal'>
                        <Input type='number' :size="size" v-model="formModel.scoreTotal" ></Input>
                    </Form-item>
                    <Form-item label='积分有效期' prop='endTime'>
                         <DatePicker type="date" placeholder="选择积分有效期" v-model='formModel.endTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseDate" :options="disabledChoosePlanDate" style='width:100%'></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    </Col>
                </Form>
            </div>
            <div v-if='formModel.categoryCode=="xxcfjd"?true:false'>
                <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                    <Col span='20'>
                    <Form-item label='大区' prop='areaId'>
                        <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable :disabled='readonlyFlag'>
                            <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='区域公司名称' prop='companyId'>
                        <Select v-model="formModel.companyId" :size='size'  transfer  clearable :disabled='readonlyFlag'>
                            <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                        </Select>
                    </Form-item>
                     <Form-item label='项目名称' prop='projectName'>
                        <Input :size='size' v-model="formModel.projectName"></Input>
                    </Form-item>
                    <Form-item label='内容' prop='content'>
                        <Input type="textarea" style="width:100%;font-size:12px" v-model="formModel.content" class="textarea-input" ></Input>
                    </Form-item>
                    <Form-item label='分值' prop='scoreTotal'>
                        <Input type='number' :size="size" v-model="formModel.scoreTotal" ></Input>
                    </Form-item>
                    <Form-item label='积分有效期' prop='endTime'>
                         <DatePicker type="date" placeholder="选择积分有效期" v-model='formModel.endTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseDate" :options="disabledChoosePlanDate" style='width:100%'></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    </Col>
                </Form>
            </div>
            <div v-if='formModel.categoryCode=="xyfzzc"?true:false'>
                <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                    <Col span='20'>
                    <Form-item label='大区' prop='areaId'>
                        <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable :disabled='readonlyFlag'>
                            <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='区域公司名称' prop='companyId'>
                        <Select v-model="formModel.companyId" :size='size'  transfer  clearable :disabled='readonlyFlag'>
                            <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                        </Select>
                    </Form-item>
                     <Form-item label='项目名称' prop='projectName'>
                        <Input :size='size' v-model="formModel.projectName"></Input>
                    </Form-item>
                    <Form-item label='内容' prop='content'>
                        <Input type="textarea" style="width:100%;font-size:12px" v-model="formModel.content" class="textarea-input" ></Input>
                    </Form-item>
                    <Form-item label='分值' prop='scoreTotal'>
                        <Input type='number' :size="size" v-model="formModel.scoreTotal" ></Input>
                    </Form-item>
                    <Form-item label='积分有效期' prop='endTime'>
                         <DatePicker type="date" placeholder="选择积分有效期" v-model='formModel.endTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseDate" :options="disabledChoosePlanDate" style='width:100%'></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    </Col>
                </Form>
            </div>
            <div v-if='formModel.categoryCode=="qt"?true:false'>
                <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                    <Col span='20'>
                    <Form-item label='大区' prop='areaId'>
                        <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable :disabled='readonlyFlag'>
                            <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label='区域公司名称' prop='companyId'>
                        <Select v-model="formModel.companyId" :size='size'  transfer  clearable :disabled='readonlyFlag'>
                            <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                        </Select>
                    </Form-item>
                     <Form-item label='项目名称' prop='projectName'>
                        <Input :size='size' v-model="formModel.projectName"></Input>
                    </Form-item>
                    <Form-item label='内容' prop='content'>
                        <Input type="textarea" style="width:100%;font-size:12px" v-model="formModel.content" class="textarea-input" ></Input>
                    </Form-item>
                    <Form-item label='分值' prop='scoreTotal'>
                        <Input type='number' :size="size" v-model="formModel.scoreTotal" ></Input>
                    </Form-item>
                    <Form-item label='积分有效期' prop='endTime'>
                         <DatePicker type="date" placeholder="选择积分有效期" v-model='formModel.endTime' :size='size' format="yyyy-MM-dd" transfer @on-change="chooseDate" :options="disabledChoosePlanDate" style='width:100%'></DatePicker>
                         <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
                    </Form-item>
                    </Col>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props:{
        totalId:{
            type:String,
            default(){
                return ''
            }
        },
        row:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        
        return{
            disabledChoosePlanDate: {
                disabledDate(date) {
                    return date && date.valueOf() < Date.now()- 8.64e7;
                }
            },
            readonlyFlag:false,//判断能否修改
            size:'small',
            areaModeList:[
                {
                    categoryCode:'jszc',
                    categoryName:'讲师支持'
                },
                {
                    categoryCode:'kckf',
                    categoryName:'课程开发'
                },
                {
                    categoryCode:'rcjl',
                    categoryName:'人才交流'
                },
                {
                    categoryCode:'tjhzhb',
                    categoryName:'推荐合作伙伴'
                },
                {
                    categoryCode:'cxktfh',
                    categoryName:'创新课题孵化'
                },
                {
                    categoryCode:'xxcfjd',
                    categoryName:'学习参访接待'
                },
                {
                    categoryCode:'xyfzzc',
                    categoryName:'学院发展支持'
                },
                {
                    categoryCode:'qt',
                    categoryName:'其他'
                },
            ],//区域公司模块
            //areaActiveMode:'jszc',
            areaList:[],//大区下拉框
            companyList:[],//区域公司下拉框
            formModel:{
                totalId:'',//主键
                categoryCode:'jszc',//事项大类//模块
                areaId:'',//大区
                companyId:'',//区域公司
                content:'',//内容
                scoreTotal:'',//分值
                scoreUsable:'',//可用积分 新增时和分值保持一致
                endTime:'',//截止日期
                personName:'',//姓名
                projectName:'',//项目名称
                className:'',//课程
                classHour:'',//课时
                exchangeDept:'',//交流部门
                exchangeHour:'',//交流时长
                exchangeStarttime:'',//交流开始日期
                exchangeEndtime:'',//交流结束日期
            },
            exchangeTime:[],//交流时间区间
            rules:{
                areaId: [
                    { required: true, message: "请选择大区", trigger: "change" }
                ],
                companyId: [
                    { required: true, message: "请选择区域公司", trigger: "change" }
                ],
                content: [
                    { required: true, message: "内容不能为空，请输入内容", trigger: "blur" }
                ],
                scoreTotal: [
                    { required: true, message: "分值不能为空，请输入分值", trigger: "change" }
                ],
                endTime: [
                    { required: true,message: "有效期不能为空，请选择有效期", trigger: "change" }
                ],
                personName: [
                    { required: true, message: "姓名不能为空，请输入姓名", trigger: "blur" }
                ],
                projectName: [
                    { required: true, message: "项目名称不能为空，请输入项目名称", trigger: "blur" }
                ],
                className: [
                    { required: true, message: "课程名称不能为空，请输入课程名称", trigger: "blur" }
                ],
                classHour: [
                    { required: true, message: "课时不能为空，请输入课时", trigger: "change" }
                ],
                exchangeDept: [
                    { required: true, message: "交流部门不能为空，请输入交流部门", trigger: "change" }
                ],
                exchangeHour: [
                    { required: true, message: "交流时长不能为空，请输入交流时长", trigger: "change" }
                ],
                exchangeTime: [
                    { required: true, type: "array", 
                    fields: {
                        0: {type: 'date', required: true, message: '请选择起止日期'},
                        1: {type: 'date', required: true, message: '请选择起止日期'}
                    }
                    } 
                ],
            }
        }
    },
    created(){
        this.$emit("setModalClass", "hidden-register-modal");
        if(!!this.totalId){
            this.$emit("setTitle", "积分累计修改");
            this.formModel.totalId=this.totalId
            this.initPage()
            this.readonlyFlag=true
        }else{
            this.$emit("setTitle", "积分累计新增");
        }
        
        this.$emit("setModalMove");
        this.$emit("setPageTopSize", 50);
        this.$emit("setPageActions", [
            {
                text: "确定",
                icon: "md-checkmark-circle-outline",
                theme: "warning",
                action: "addOrModify",
                handle: () => {
                    this.save();
                }
                
            },
            {
                text: "取消",
                icon: "ios-close-circle-outline",
                theme: "info",
                action: "reset",
                handle: () => {
                    this.cancel();
                }
            }
            
        ]);
       
        this.getAreaList()
        
    },
  
    methods:{
        //修改进来初始化页面
        initPage(){
            this.formModel={
                totalId:this.row.totalId,//主键
                categoryCode:this.row.categoryCode,//事项大类//模块
                categoryName:this.row.categoryName,
                areaId:this.row.areaId,//大区
                companyId:'',//区域公司
                content:this.row.content,//内容
                scoreTotal:this.row.scoreTotal,//分值
                scoreUsable:this.row.scoreUsable,//可用积分 新增时和分值保持一致
                endTime:this.row.endTime,//截止日期
                personName:this.row.personName,//姓名
                projectName:this.row.projectName,//项目名称
                className:this.row.className,//课程
                classHour:this.row.classHour,//课时
                exchangeDept:this.row.exchangeDept,//交流部门
                exchangeHour:this.row.exchangeHour,//交流时长
                exchangeStarttime:this.row.exchangeStarttime,//交流开始日期
                exchangeEndtime:this.row.exchangeEndtime,//交流结束日期
            }
            this.areaModeList=[]
            this.areaModeList.push({
                categoryCode:this.formModel.categoryCode,
                categoryName:this.formModel.categoryName
            })

            axios.post(this.HOST+'/company/t-company/selectOptionList',{areaId:this.formModel.areaId}).then(res=>{
                this.companyList=[]
                this.formModel.companyId=''
                res.data.forEach(element=>{
                    this.companyList.push({companyName:element.companyName,companyId:element.companyId})
                })
                this.formModel.companyId=this.row.companyId
            })
            if(!!this.row.exchangeStarttime && !!this.row.exchangeEndtime){
                this.exchangeTime[0]=this.row.exchangeStarttime
                this.exchangeTime[1]=this.row.exchangeEndtime
            }
            //console.log(this.formModel.endTime)
        },
        onModeSelect(val){
            //console.log(val)
            //this.areaActiveMode=val
            this.formModel.categoryCode= val
            this.$refs["modelForm"].resetFields();
            
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
        //选择大区 ----》获取公司列表
        chooseArea(val){
            
            axios.post(this.HOST+'/company/t-company/selectOptionList',{areaId:val}).then(res=>{
                this.companyList=[]
                this.formModel.companyId=''
                if(res.data.length>0){
                    res.data.forEach(element=>{
                        this.companyList.push({companyName:element.companyName,companyId:element.companyId})
                    })
                }
                //console.log(this.companyList)
            })
            
        },
        //选择时间
        chooseDate(val){
            this.formModel.endTime=val
            //console.log(this.formModel.endTime)
        },
        //选择交流时间区间
        chooseExchangeTime(val){
            this.formModel.exchangeStarttime=val[0]
            this.formModel.exchangeEndtime=val[1]
            // console.log(this.formModel.exchangeStarttime)
            // console.log(this.formModel.exchangeEndtime)
        },
        //保存
        save(){
            
            if(!!this.formModel.totalId){
                let d=new Date(this.formModel.endTime)
                this.formModel.endTime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            }
            //console.log(this.formModel)
            this.$emit("SetActionsState", {
                btn: "save",
                state: true
            });
            this.$refs["modelForm"].validate(valid => {
                //debugger;
                if (valid) {
                    this.formModel.scoreUsable=this.formModel.scoreTotal
                    axios.post(this.HOST+'/company/t-total-score-company/save',this.formModel).then(res=>{
                        //console.log(res)
                        this.$emit("setActionsState", {
                            btn: "save",
                            state: false
                        });
                        if(res.data==true){
                            this.$Message.success({
                                content:"保存成功",
                                duration : 5,
                                closable: true
                            });
                            this.$emit("close");
                        }else{
                            this.$Message.error({
                                content:"保存失败",
                                duration : 20,
                                closable: true
                            });
                            this.$emit("close");
                        }
                        
                    })
                   
                }
            })
        },
        cancel(){
            this.$emit("close");
        },
       
    }
}
</script>
<style lang='less' scoped>
.mode-menu{
    .ivu-menu-vertical .ivu-menu-item{
        padding: 10px 15px !important;
        position: relative;
        cursor: pointer;
        z-index: 1;
        transition: all .2s ease-in-out;
        font-size: 12px;
    }
}
.mode-content{
    width: calc(~'100% - 160px');
    padding:10px 5px;

}

</style>