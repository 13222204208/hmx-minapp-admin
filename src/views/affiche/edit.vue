<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">

      <el-form-item label="公告内容" prop="content"  required>
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item label="公告时间" required>
            <el-date-picker
              v-model="form.time"
              type="datetimerange"
              align="left"
              size="large"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
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
import { editAffiche, updateAffiche } from '@/api/affiche'

export default {
  data() {
    const validatesort = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入排序'))
      } else {
        callback()
      }
    }
    return {
      editor:null,//编辑器实例
      form:{
        id:'',
        content:'',
        time:'',
      },
        rules: {
          sort: [
            { required:true,validator: validatesort, trigger: 'blur' }
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
      editAffiche(id).then(response => {
        this.form.content= response.data.content;
       var myArray=new Array()
        myArray[0]=response.data.start_time
        myArray[1]=response.data.stop_time
        this.form.time= myArray
        this.form.id = response.data.id;
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
            this.form.img_url = response.url;
            console.log(this.form.img_url);
          }
      },


    onSubmit(){
      updateAffiche(this.form.id,this.form).then(response => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.$router.push({name:'AfficheList'})
        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
