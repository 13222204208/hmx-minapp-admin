<template>
 <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="公告时间" required>
            <el-date-picker
              v-model="ruleForm.time"
              type="datetimerange"
              align="left"
              size="large"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
      </el-form-item>

      <el-form-item label="公告内容" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { storeAffiche} from '@/api/affiche'
  export default {
    data() {
      return {
        ruleForm: {
          time: [],
          content: ''
        },
        rules: {
          time: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写公告内容', trigger: 'blur' },
             { min: 2, max: 255, message: '长度在 2 到 255个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { 
            storeAffiche(this.ruleForm).then(response => {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
                this.$router.push({name:'AfficheList'})
              }
            );
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
