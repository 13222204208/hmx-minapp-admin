<template>
 <div class="app-container">
      <div class="filter-container">
         <router-link :to="{name:'CreateAffiche'}">
          <el-button type="primary"  style="margin-left: 10px;"  plain>添加公告</el-button>
          </router-link>

      </div>
      <br>
   <el-table
     :key="tableKey"
    :data="tableData"
    v-loading="listLoading"
     border
     fit
     highlight-current-row
     style="width: 100%;"
   >
     <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" >
       <template slot-scope="{row}">
         <span>{{ row.id }}</span>
       </template>
     </el-table-column>
     <el-table-column label="公告内容" align="center">
       <template slot-scope="{row}">
         <span>{{ row.content }}</span>
       </template>
    </el-table-column>
    
     <el-table-column label="开始时间" align="center">
       <template slot-scope="{row}">
         <span>{{ row.start_time }}</span>
       </template>
     </el-table-column>

     <el-table-column label="结束时间" align="center">
       <template slot-scope="{row}">
         <span>{{ row.stop_time }}</span>
       </template>
     </el-table-column>
     <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
       <template slot-scope="{row,$index}">
        <router-link :to="'edit/'+row.id">
          <el-button type="primary" size="mini" style="margin-right: 5px;">
            编辑
          </el-button>
        </router-link>
         <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
           删除
         </el-button>
       </template>
     </el-table-column>
   </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
</div>
</template>

<script>
   import { afficheList , delAffiche } from '@/api/affiche'
   import waves from '@/directive/waves' // waves directive
   import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  export default {
    components: { Pagination },
     directives: { waves },
    data() {
      return {
        tableKey: 0,
        tableData:null,
        listLoading: true,
        imgUrl:'',
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          username: undefined,
        },
        temp: {
          id: undefined,
          name: '',
        },
        dialogPvVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        pvData: [],
        textMap: {
          update: '编辑',
          create: 'Create'
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        var str=process.env.VUE_APP_BASE_API;
        var  leg= str.indexOf('api');
        var url= str.substr(0,leg);
        this.imgUrl= url+'/';
        afficheList(this.listQuery).then(response => {
          this.tableData = response.data.item;
          this.total = response.data.total;

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },


      handleDelete(index, row) {

        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAffiche(index.id).then(response => {
          this.$notify({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.tableData.splice(row, 1)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    }
  }
</script>
