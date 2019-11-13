<template>
    <div style="padding:10px 20px">
        <table ref="tables" border="0" cellspacing="0" cellpadding="0" style="width:100%;">
            <tr>
            <td class="standard-td">部室名称 :<span name="titleName" :title="formModel.deptName">{{formModel.deptName}}</span></td>
            </tr>
            <tr>
            <td class="standard-td">事项大类 :<span name="titleName" :title="formModel.categoryName">{{formModel.categoryName}}</span></td>
            </tr>
            <tr>
            <td class="standard-td">项目名称 :<span name="titleName" :title="formModel.projectName">{{formModel.projectName}}</span></td>
            </tr>
            <tr>
            <td class="standard-td">内容 :<span name="titleName" :title="formModel.remark">{{formModel.remark}}</span></td>
            </tr>
            <tr>
            <td class="standard-td">分值 :<span name="titleName" :title="formModel.scoreTotal">{{formModel.scoreTotal}}</span></td>
            </tr>
            <tr>
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