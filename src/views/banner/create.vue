<template>
 <div class="app-container">
<el-form ref="form" :model="form"  label-width="80px">

  <el-form-item label="Banner图" prop="img_url">
      <el-upload
        name="upload"
        :action="uploadUrl()"
        list-type="picture-card"
        :limit='1'
        :on-success="handleUpSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

  </el-form-item>
  <el-form-item label="排序" prop="title">
    <el-input v-model="form.sort" placeholder="例如 1 " style="width: 58rem;"></el-input>
  </el-form-item>

    <br>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
<!--     <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
    <!-- 编辑器 -->

  </div>
</template>

<script>
import { storeBanner} from '@/api/banner'
export default {
  data() {
    return {
      form:{
        sort:'',
        img_url:'',
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
      handlePictureCardPreview(file) { console.log(file.url)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUpSuccess(response){console.log(response);
          if(response.uploaded == true){
            this.form.img_url = response.url;
            console.log(this.form.img_url);
          }
      },

    onSubmit(){
      console.log(this.form);
      storeBanner(this.form).then(response => {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$router.push({name:'BannerList'})
        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
