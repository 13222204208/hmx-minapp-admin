<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="频道名称" prop="Content_type_id">
    <el-select v-model="form.channel_id" placeholder="请选择频道" style="width: 58rem;">
      <el-option v-for='item in option' :key='item.id' :value='item.id' :label='item.title'>
       <span style="float: left">{{ item.title }}</span> 			</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="标题" prop="title">
    <el-input v-model="form.title" style="width: 58rem;"></el-input>
  </el-form-item>
    <div class="ckeditor" style="margin-left:10px; width:1000px">
      <!-- 工具栏容器 -->
      <div id="toolbar-container"></div>
      <!-- 编辑器容器 -->
      <div id="editor">

      </div>
    </div>
    <br>
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
import { editContent, updateContent } from '@/api/content'
import { channelList} from '@/api/channel'
export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入标题'))
      } else {
        callback()
      }
    }
    return {
      editor:null,//编辑器实例
      form:{
        id:'',
        title:'',
        content:'',
        channel_id:null
      },
        rules: {
          title: [
            { required:true,validator: validateTitle, trigger: 'blur' }
          ],
        },
      option:[],
      imgFilesList:[],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl:process.env.VUE_APP_BASE_API+"/upload/img"
    }
  },
  mounted() {
    this.initCKEditor()
  },
  created() {
    this.getList()
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },


  methods: {
    getList(){
      channelList().then( response=>{
        this.option = response.data;

      })
    },

    fetchData(id) {
      editContent(id).then(response => {
        this.editor.setData(response.data.content);
        this.form.title= response.data.title;
        this.form.channel_id = response.data.channel_id;
        this.form.id = response.data.id;
      }).catch(err => {
        console.log(err)
      })
    },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) { console.log(file.url)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUpSuccess(response){

          if(response.uploaded == true){
            this.form.cover = response.url;
            console.log(this.form.cover);
          }
      },

    initCKEditor(){
      CKEditor.create(document.querySelector("#editor"),{
        language: 'zh-cn',
        ckfinder:{
          // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
          uploadUrl:process.env.VUE_APP_BASE_API+"/upload/img",
        }
      }).then(editor => {console.log(editor);
        const toolbarContainer = document.querySelector('#toolbar-container');
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        // 将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        this.editor = editor;
      }).catch(error => {
        console.log(error)
      });
    },
    /*获取编辑器内容*/
    getHtml(){
      console.log(this.editor.getData());
    },

    onSubmit(){
      this.form.content = this.editor.getData();//富文本内容
 
      updateContent(this.form.id,this.form).then(response => {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$router.push({name:'ContentList'})
        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
