<template>
 <div style="width:100%;height:100%;over-flow:hidden;" class='box'>
    <!-- <Input v-model="password">
    </Input>
    <Button @click="login">登陆</Button> -->
    <div style="width:100%;height:100vh;display:flex">
        <img src="../../../static/images/background.png" alt="" style="width:100%;height:100%">
        <div class='login-box'>
            
        </div>
        <div class='copy-login-box'>
            <div style='text-align:center;font-size:40px;font-weight:bold;width:100%;color:#3399ff'>
               欢迎登陆
            </div>
            <Form :model="formModel" :label-width="70" ref="modelForm" >
                <Form-item label='账号:' prop='account'>
                    <Input style='width:90%' v-model="formModel.account"></Input>
                </Form-item>
                <Form-item label='密码:' prop='password'>
                    <Input style='width:90%' type='password' v-model="formModel.password"></Input>
                    <span v-if='error' style="color:red;display:inline-block">密码错误，请重新输入</span>
                </Form-item>
            </Form>
             <Button type="primary" style='width:90%;margin-left:5%' @click="login">登陆</Button>
        </div>
    </div>
   
 </div>
</template>
<script>
export default{
    data(){
        return {
            password:'',
            formModel:{
                account:'',
                password:'',
            },
            rules:{
                account: [
                    {  message: '请入账号', trigger: 'blur' }
                ],
                password: [
                    {  message: '请输入密码', trigger: 'blur' }
                ],
            },
            error:false
        }
    },
    mounted(){
        // window.onbeforeunload = function (e) {
        //         var storage = window.localStorage;
        //         storage.clear()
        //     }
    },
    methods:{
        login(){
           
            if(this.formModel.account=='admin' && this.formModel.password=='1'){
                sessionStorage.setItem("adminname", this.formModel.account);
                this.$router.push({
                    path:'/home'
                })
            }else{
                this.error=true;
                return
            }
        }

    }
}
</script>
<style lang="less">
.login-box{
    width: 250px;
    height: 250px;
    border-radius: 5%;
    background:white;
    z-index: 999;
    display: inline-block;
    position: absolute;
    opacity:0.5;
    right: 10%;
    top: 30%;
}
.copy-login-box{
     width: 250px;
    height: 250px;
    border-radius: 5%;
    //background:white;
    z-index: 999;
    display: inline-block;
    position: absolute;
    //opacity:0.5;
    right: 10%;
    top: 30%;
    .ivu-form .ivu-form-item-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 18px;
    color: white;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
    position: relative;
    top: -3px;
    }
}
</style>