<template>
 <div class="app-container">
      <div class="filter-container">
         <el-input v-model="listQuery.phone" placeholder="联系方式" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
         <el-button v-waves class="filter-item" type="primary" style="margin-left: 10px;" icon="el-icon-search" @click="handleFilter">
           搜索
         </el-button>

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

     <el-table-column label="少儿姓名" align="center">
       <template slot-scope="{row}">
         <span>{{ row.children_name}}</span>
       </template>
     </el-table-column>
     <el-table-column label="报名人姓名" align="center">
       <template slot-scope="{row}">
         <span>{{ row.enroll_name }}</span>
       </template>
     </el-table-column>
     <el-table-column label="联系方式" align="center">
       <template slot-scope="{row}">
         <span>{{ row.phone }}</span>
       </template>
     </el-table-column>
     <el-table-column label="报名的活动" align="center">
       <template slot-scope="{row}">
         <span>{{ row.activity.title }}</span>
       </template>
     </el-table-column>
     <el-table-column label="提交时间" align="center">
       <template slot-scope="{row}">
         <span>{{ row.created_at }}</span>
       </template>
     </el-table-column>
     <el-table-column label="状态" class-name="status-col" align="center" width="80">
       <template slot-scope="{row}">
         <el-tag  >
           {{ row.status == 1 ? '已处理':'未处理' }}
         </el-tag>
       </template>
     </el-table-column>

     <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
       <template slot-scope="{row,$index}">
          <el-button v-if="row.status ==1" size="mini" @click="handleModifyStatus(row,0)">
            取消已处理
          </el-button>
          <el-button v-if="row.status ==0" size="mini" @click="handleModifyStatus(row,1)">
            点击处理
          </el-button>
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
   import {enrollList, updateEnroll, delEnroll} from '@/api/enroll'
   import waves from '@/directive/waves' // waves directive
   import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  export default {
    components: { Pagination },
     directives: { waves },
    data() {
      return {
        tableKey: 0,
        tableData:[],
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          phone: undefined,
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
        console.log(this.listQuery)
        enrollList(this.listQuery).then(response => {console.log(response)
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
      handleUpdate(row) { console.log(row)
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },


      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delEnroll(index.id).then(response => {
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
      },

      handleModifyStatus(row, status) {
        row.status= status;
        console.log(row);

        updateEnroll(row.id,row).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      },
    }
  }
</script>
