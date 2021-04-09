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
    <el-button type="primary" @click="onSubmit">更新保存</el-button>
<!--     <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
    <!-- 编辑器 -->

  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
import { editCourseType, updateCourseType } from '@/api/course_type'
export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入标题'))
      } else {
        callback()
      }
    }

    const validatsort = (rule, value, callback) => {
        if (rule.required === false && (value === '' || value === null || value === undefined)) {

          callback()

        }
        const issort = /(^[1-9]\d*(\.\d{1,2})?$)/

        if (issort.test(value)) {

          callback()

        } else {

          callback(new Error(rule.message || '请输入正确的序号，例：1'))

        }
    }
    return {
      editor:null,//编辑器实例
      form:{
        id:'',
        title:'',
        sort:null,
      },
        rules: {
          title: [
            { required:true,validator: validateTitle, trigger: 'blur' },
            { min: 2, max: 60, message: '长度在 2 到 60个字符', trigger: 'blur' }
          ],

          sort: [
            { required:true,message: '请填写序号', trigger: 'blur' },
            { min: 0, max: 99999, validator: validatsort, trigger: 'change' }
          ],
        },
      option:[],
      imgFilesList:[],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl:process.env.VUE_APP_BASE_API+"/upload/img"
    }
  },

  created() {

    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },

  methods: {
    fetchData(id) {
      editCourseType(id).then(response => {
        this.form= response.data;
      }).catch(err => {
        console.log(err)
      })
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
      updateCourseType(this.form.id,this.form).then(response => {
          this.$message({
            message: '更新成功',
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
