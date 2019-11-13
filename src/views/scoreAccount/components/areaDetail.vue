<template>
    <div style="padding:10px 20px">
        <table ref="tables" border="0" cellspacing="0" cellpadding="0" style="width:100%;">
            <tr>
            <td class="standard-td">大区 :<span name="titleName" :title="formModel.areaName">{{formModel.areaName}}</span></td>
            </tr>
            <tr>
            <td class="standard-td">区域公司名称 :<span name="titleName" :title="formModel.companyName">{{formModel.companyName}}</span></td>
            </tr>
            <tr>
            <td class="standard-td">事项大类 :<span name="titleName" :title="formModel.categoryName">{{formModel.categoryName}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.content'>
            <td class="standard-td">内容 :<span name="titleName" :title="formModel.content">{{formModel.content}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.personName'>
            <td class="standard-td">姓名 :<span name="titleName" :title="formModel.personName">{{formModel.personName}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.projectName'>
            <td class="standard-td">项目名称 :<span name="titleName" :title="formModel.projectName">{{formModel.projectName}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.className'>
            <td class="standard-td">课程名称 :<span name="titleName" :title="formModel.className">{{formModel.className}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.classHour'>
            <td class="standard-td">课时 :<span name="titleName" :title="formModel.classHour">{{formModel.classHour}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.exchangeDept'>
            <td class="standard-td">交流部门 :<span name="titleName" :title="formModel.exchangeDept">{{formModel.exchangeDept}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.exchangeHour'>
            <td class="standard-td">交流时长 :<span name="titleName" :title="formModel.exchangeHour">{{formModel.exchangeHour}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.exchangeStarttime &&!!this.formModel.exchangeEndtime '>
            <td class="standard-td">交流日期 :<span name="titleName" >{{formModel.exchangeStarttime}} - {{formModel.exchangeEndtime}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.scoreTotal'>
            <td class="standard-td">分值 :<span name="titleName" :title="formModel.scoreTotal">{{formModel.scoreTotal}}</span></td>
            </tr>
            <tr v-if='!!this.formModel.endTime'>
            <td class="standard-td">积分有效期 :<span name="titleName" :title="formModel.endTime">{{formModel.endTime}}</span></td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props:{
        row:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            formModel:{
                areaName:''
            },
        }
    },
    created(){
        this.$emit("setTitle", "积分累计详情");
        this.$emit("setModalMove");
        this.$emit("setPageTopSize", 50);
        this.$emit("setFootShow",false);
        this.$emit("setPageSize",400)
        this.formModel=this.row
    }
}
</script>
<style lang="less">
.standard-td{
  width: 70%;
  text-align: left; 
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  line-height: 28px;
  height: 28px;
  padding-left: 10px;
  font-weight: bolder;
  span{
    margin-left: 5px;
    color: #333;
    font-weight: 100;
  }
}
</style>