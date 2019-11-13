<template>
<div style="margin:10px 20px">
    <Form ref="modelForm" :label-width="100" :model="formModel" :rules="rules">
        <Col span='20'>
            <Form-item label='大区' prop='areaId'>
                <Select v-model="formModel.areaId" :size='size'  transfer @on-change="chooseArea" clearable >
                    <Option v-for="item in areaList" :key='item.areaId' :value='item.areaId' >{{item.areaName}}</Option>
                </Select>
            </Form-item>
            <Form-item label='区域公司名称' prop='companyId'>
                <Select v-model="formModel.companyId" :size='size'  transfer  clearable @on-change='chooseCompany'>
                    <Option v-for="item in companyList" :key='item.companyId' :value='item.companyId' >{{item.companyName}}</Option>
                </Select>
            </Form-item>
            <Form-item label='产品类品' prop='categoryCode'>
                <Select v-model="formModel.categoryCode" :size='size' class='tag' transfer clearable @on-change="chooseCategory">
                    <Option v-for='item in areaCategoryList' :key='item.categoryCode' :value='item.categoryCode'>{{item.categoryName}}</Option>
                </Select>
            </Form-item>
            <Form-item label='产品明细' prop='categoryDetailCode'>
                <Select v-model="formModel.categoryDetailCode" :size='size' class='tag' transfer>
                    <Option v-for='item in categoryDetailList' :key='item.categoryDetailId' :value='item.categoryDetailCode'>{{item.categoryDetailName}}</Option>
                </Select>
            </Form-item>
            <Form-item label='可兑换积分' prop='scoreUsable'>
                <Input type='number' :size="size" v-model="formModel.scoreUsable" disabled></Input>
            </Form-item>
            <Form-item label='兑换积分' prop='scoreUsed'>
                <Input type='number' :size="size" v-model="formModel.scoreUsed" ></Input>
            </Form-item>
            <Form-item label='备注' prop='remark'>
                <Input type="textarea" style="width:100%;font-size:12px" v-model="formModel.remark" class="textarea-input" ></Input>
            </Form-item>
        </Col>
    </Form>
    <Modal
        v-model="Modal"
        title="提示"
        width="300px"
        @on-ok="makeSureSave"
        @on-cancel="makeSureCancel">
        <p>积分一经兑换无法退回，是否确定兑换？</p>
        
    </Modal>
</div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
         
        return{
            size:'small',
            flag:'true',
            formModel:{
                areaId:'',//大区
                companyId:'',//公司名称
                categoryCode:'',//产品类品
                categoryDetailCode:'',//产品明细
                scoreUsable:'',//可兑换积分
                scoreUsed:'',//兑换积分
                remark:''
            },
            rules:{
                areaId: [
                    { required: true, message: "请选择大区", trigger: "change" }
                ],
                companyId: [
                    { required: true, message: "请选择区域公司", trigger: "change" }
                ],
                categoryCode: [
                    { required: true, message: "请选择产品类品", trigger: "change" }
                ],
                categoryDetailCode: [
                    { required: true, message: "请选择产品明细", trigger: "change" }
                ],
                scoreUsed: [
                    { required: true, message: "兑换积分不能为空，请输入兑换积分", trigger: "change" },
                   
                ],
                remark: [
                    { required: true, message: "备注不能为空，请输入备注", trigger: "blur" }
                ],
            },
            areaList:[],//大区下拉框
            companyList:[],//公司下拉
            areaCategoryList:[],//产品类品下拉
            categoryDetailList:[],//产品明细下拉
            Modal:false
        }
    },
    created(){
        this.getAreaList()
        this.getAreaCategoryList()
        this.$emit("setTitle", "积分兑换新增");
        this.$emit("setModalMove");
        this.$emit("setPageTopSize", 50);
        this.$emit("setPageSize",485);
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
                this.formModel.companyId=''
                if(res.data.length>0){
                    res.data.forEach(element=>{
                        this.companyList.push({companyName:element.companyName,companyId:element.companyId})
                    })
                }
            })
        },
        //获取区域公司事项大类下拉列表
        getAreaCategoryList(){
            axios.post(this.HOST+'/company/t-exchange-category/selectCategoryList',{tExchangeCategory:''}).then(res=>{
                res.data.forEach(element=>{
                    this.areaCategoryList.push({
                        categoryCode:element.categoryCode,
                        categoryName:element.categoryName
                    })
                })
            })
        },
        //选择公司 ----》获取可兑换积分
        chooseCompany(val){
            axios.post(this.HOST+'/company/t-total-score-company/findUsableCount',{companyId:val}).then(res=>{
                //console.log(res)
                if(!!res.data.totalCount){
                    this.formModel.scoreUsable=res.data.totalCount
                }else{
                    this.formModel.scoreUsable=0
                }
                
            })
        },
        //选择产品类品获取产品明细
        chooseCategory(val){
            let param={parentCategoryCode:val}
            axios.post(this.HOST+'/company/t-exchange-category-detail/selectCategoryDetailList',param).then(res=>{
                this.categoryDetailList=[]
                this.formModel.categoryDetailCode=''
                if(res.data.length>0){
                    res.data.forEach(element=>{
                        this.categoryDetailList.push({
                            categoryDetailCode:element.categoryDetailCode,
                            categoryDetailName:element.categoryDetailName
                        })
                    })
                }
            })
        },
        
        //保存
        save(){
            this.$refs['modelForm'].validate(valid=>{
                if(valid){
                    if(this.formModel.scoreUsed>this.formModel.scoreUsable){
                        this.$Message.error({
                             content: "兑换积分不能超过可兑换积分，请重新输入兑换积分",
                            duration: 20,
                            closable: true
                        })
                        return;
                    }else{
                        this.Modal=true
                    }
                   
                }
            })
            
        },
        cancel(){
            this.$emit("close");
        },
        //确定
        makeSureSave(){
            axios.post(this.HOST+'/company/t-exchange-score-company/save',this.formModel).then(res=>{
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
        },
        makeSureCancel(){
            this.Modal=false
        }
    }
}
</script>