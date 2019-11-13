<template>
    <div style='display:flex'>
        <div class="mode-menu">
            <Menu style='width:160px' :active-name='formModel.categoryCode'  @on-select="onModeSelect">
                <MenuItem v-for='item in deptModeList' :key='item.categoryCode' :name='item.categoryCode'>{{item.categoryName}}</MenuItem>
            </Menu>
        </div>
        <div class='mode-content'>
            <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
                <Col span='20'>
                <Form-item label='部室名称' prop='deptId'>
                    <Select v-model="formModel.deptId" :size='size' transfer clearable :disabled='readonlyFlag'>
                        <Option v-for='item in deptList' :key='item.deptId' :value='item.deptId'>{{item.deptName}}</Option>
                    </Select>
                </Form-item>
                <Form-item label='项目名称' prop='projectName'>
                    <Input :size='size' v-model="formModel.projectName"></Input>
                </Form-item>
                <Form-item label='内容' prop='remark'>
                    <Input type="textarea" style="width:100%;font-size:12px" v-model="formModel.remark" class="textarea-input" ></Input>
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
            deptModeList:[
                {
                    categoryCode:'jsdy',
                    categoryName:'讲师调用'
                },
                {
                    categoryCode:'kckf',
                    categoryName:'课程开发'
                },
                {
                    categoryCode:'jspyhrz',
                    categoryName:'讲师培养和认证'
                },
                {
                    categoryCode:'zxkckfhxczc',
                    categoryName:'在线课程开发和宣传支持'
                },
                {
                    categoryCode:'stxmzc',
                    categoryName:'素拓项目支持'
                },
                {
                    categoryCode:'tjhzhb',
                    categoryName:'推荐合作伙伴'
                },
                {
                    categoryCode:'xxcfsj',
                    categoryName:'学习参访设计'
                },
                {
                    categoryCode:'xxfzzc',
                    categoryName:'学习发展支持'
                },
                {
                    categoryCode:'qt',
                    categoryName:'其他'
                },
            ],
            formModel:{
                totalId:'',
                categoryCode:'jsdy',//事项大类
                deptId:'',//部门
                projectName:'',//项目名称
                remark:'',//内容
                scoreTotal:'',//分值
                endTime:'',//截止日期
                scoreUsable:''//可用分值
            },
            endTime:'',//有效期
            deptList:[],//部室下拉
            rules:{
                deptId: [
                    { required: true, message: "请选择部室名称", trigger: "change" }
                ],
                projectName: [
                    { required: true, message: "项目名称不能为空，请输入项目名称", trigger: "blur" }
                ],
                remark: [
                    { required: true, message: "内容不能为空，请输入内容", trigger: "blur" }
                ],
                scoreTotal: [
                    { required: true, message: "分值不能为空，请输入分值", trigger: "change" }
                ],
                endTime: [
                    { required: true,message: "有效期不能为空，请选择有效期", trigger: "change" }
                ],
            }

        }
    },
    created(){
        this.getDeptList()
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
    },
    methods:{
        //修改初始化页面
        initPage(){
            //console.log(this.row)

            this.formModel={
                totalId:this.row.totalId,
                categoryCode:this.row.categoryCode,//事项大类
                deptId:this.row.deptId,//部门
                projectName:this.row.projectName,//项目名称
                remark:this.row.remark,//内容
                scoreTotal:this.row.scoreTotal,//分值
                endTime:this.row.endTime,//有效期
                scoreUsable:this.row.scoreUsable,//可用分值
                categoryName:this.row.categoryName
            }
            this.deptModeList=[]
            this.deptModeList.push({
                categoryCode:this.formModel.categoryCode,
                categoryName:this.formModel.categoryName
            })
        },
        //切换模块
        onModeSelect(val){
            this.formModel.categoryCode= val
            this.$refs["modelForm"].resetFields();
            
        },
        //获取部门列表
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
        //选择日期
        chooseDate(val){
            this.formModel.endTime=val
        },
        //保存
        save(){
            if(!!this.formModel.totalId){
                let d=new Date(this.formModel.endTime)
                this.formModel.endTime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            }
            console.log(this.formModel)
            this.$emit("SetActionsState", {
                btn: "save",
                state: true
            });
            this.$refs["modelForm"].validate(valid => {
                //debugger;
                if (valid) {
                    this.formModel.scoreUsable=this.formModel.scoreTotal
                    axios.post(this.HOST+'/dept/t-total-score-dept/saveDept',this.formModel).then(res=>{
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
        }
    },
}
</script>
<style lang="less">
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