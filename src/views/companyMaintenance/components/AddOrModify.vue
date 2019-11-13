<template>
  <div style="padding:10px">
    <div>
      <Form
        :model="formModel"
       
        :label-width="100"
        ref="modelForm"
        :rules="rules"
      >
        <Row>
          <Col span='20'>
          <FormItem label="大区:" prop="areaId">
            
            <Select
              v-model="formModel.areaId"
              :size="size"
              transfer
              
              clearable
            >
              <Option
                v-for="item in areaList"
                :key="item.areaId"
                :value="item.areaId"
              >{{item.areaName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="区域公司名称:" prop="companyName">
            <Input
              type="text"
              :size="size"
              placeholder="请输入"
              v-model="formModel.companyName"
              clearable
            />
          </FormItem>

          <FormItem label="备注:" prop="remark">
            <Input
              type="textarea"
              :rows="2"
              :size='size'
              style="width:100%;font-size:12px" v-model="formModel.remark" class="textarea-input"
              placeholder="请输入验收项目描述"
              clearable
            />
            
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  props: {
    companyId: {
      type: String,
      default() {
        return [];
      }
    },
    rowData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    const varcharLengthVer1 = (rule, value, callback) => {
      if (value == "" || value == undefined || value == null) {
        callback(new Error("请输入区域公司名称"));
      } else {
        if (value.length > 100) {
          callback(new Error("字符长度过长，请重新输入！"));
        } else {
          callback();
        }
      }
    };
    const varcharLengthVer2 = (rule, value, callback) => {
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (value.length > 200) {
          callback(new Error("字符长度过长，请重新输入！"));
        } else {
          callback();
        }
      }
    };
    return {
      size: "small",
      areaList: [],
      formModel: {
        companyId: "",
        areaId: "", //
        companyName: "", //
        remark: "" //
      },
      rules: {
        areaId: [{ required: true, message: "请选择大区", trigger: "change" }],
        companyName: [
          { required: true, validator: varcharLengthVer1, trigger: "blur" }
        ],
        remark: [{ validator: varcharLengthVer2, trigger: "blur" }]
      }
    };
  },
  created() {
    this.$emit("setPageSize", 450);
    this.$emit("setPageTopSize", 123);
    this.$emit("setModalMove");
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
    this.getAreaList();
    this.init();
  },
  mounted() {
    
  },
  computed: {},
  methods: {
    //获取大区列表
    getAreaList() {
      axios.post(this.HOST + "/company/t-area/selectAreaList", {}).then(res => {
        this.areaList = res.data;
      });
    },
    // 初始化,是新增还是修改页面
    init() {
      if (this.companyId == "" || this.companyId == undefined) {
        this.$emit("setTitle", "区域公司新增");
      } else {
        this.$emit("setTitle", "区域公司修改");
        //console.log(this.rowData)
        this.formModel.companyId = this.rowData.companyId;
        this.formModel.areaId = this.rowData.areaId;
        this.formModel.companyName = this.rowData.companyName;
        this.formModel.remark = this.rowData.remark;
      }
    },
    
    // 保存方法
    save() {
      this.$refs["modelForm"].validate(valid => {
        if (valid) {
          this.$emit("SetActionsState", {
            btn: "addOrModify",
            state: true
          });
          axios
            .post(this.HOST + "/company/t-company/save", this.formModel)
            .then(response => {
              this.$emit("SetActionsState", {
                btn: "addOrModify",
                state: true
              });
               if(response.data==true){
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
            });
        } else {
          this.$emit("SetActionsState", {
            btn: "addOrModify",
            state: true
          });
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.getInput {
  padding-top: 4px;
}
.grayBackg {
  background-color: #f3f3f3;
}
</style>