<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">


  <el-form-item label="分类名称" prop="title">
    <el-input v-model="form.title" style="width: 58rem;"></el-input>
  </el-form-item>



    <el-form-item label="排序" prop="sort">
      <el-input v-model="form.sort" style="width: 58rem;"></el-input>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
<!--     <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
    <!-- 编辑器 -->

  </div>
</template>

<script>
import { storeCourseType } from '@/api/course_type'

export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入标题'))
      } else {
        callback()
      }
    }

    const validatPrice = (rule, value, callback) => {
        if (rule.required === false && (value === '' || value === null || value === undefined)) {

          callback()

        }
        const isPrice = /(^[1-9]\d*(\.\d{1,2})?$)/

        if (isPrice.test(value)) {

          callback()

        } else {

          callback(new Error(rule.message || '请输入正确的序号，例：1'))

        }
    }

    return {

      form:{
        title:null,

        sort:'',

      },
        rules: {
          title: [
            { required:true,validator: validateTitle, trigger: 'blur' },
            { min: 2, max: 60, message: '长度在 2 到 60个字符', trigger: 'blur' }
          ],
          sort: [
            { required:true,message: '请填写排序序号', trigger: 'blur' },
            { min: 0, max: 99999, validator: validatPrice, trigger: 'change' }
          ],
        },
      option:[],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },

  methods: {
    uploadUrl() {
        var url = process.env.VUE_APP_BASE_API+"/upload/img"// 生产环境和开发环境的判断
        return url
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUpSuccess(response){
          if(response.uploaded == true){
            this.form.cover = response.url;
            console.log(this.form.cover);
          }
      },


    onSubmit(){
      console.log(this.form);
      storeCourseType(this.form).then(response => {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$router.push({name:'CourseTypeList'})
        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
