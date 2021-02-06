<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" ref="filterForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="状态"  prop="search_type">
              <el-select v-model="listQuery.status" placeholder="请选择" clearable class="filter-item" @change="getData">
                <el-option v-for="(item,key) in statusShow" :key="key" :label="item" :value="key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;">
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.user_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="提现方式">
        <template slot-scope="scope">
          {{ scope.row.type|typeShowFilter}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请提现金额">
        <template slot-scope="scope">
          {{ scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="提现手续费">
        <template slot-scope="scope">
          {{ scope.row.service_charge}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="实际佣金">
        <template slot-scope="scope">
          {{ scope.row.real_money}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请时间">
        <template slot-scope="scope">
          {{ scope.row.create_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支行信息">
        <template slot-scope="scope">
          {{ scope.row.bank_branch}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ statusShow[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status==1">
            <el-button type="success" size="mini" @click="handleWithdraw(scope,2)">同意</el-button>
            <el-button type="danger" size="mini" @click="handleWithdraw(scope,3)">拒绝</el-button>
          </div>
          <div v-else>
            <span>{{statusShow[scope.row.status]}}</span>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getData"/>

  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination'

  import { getCommissionWithdraw, updateCommissionWithdraw } from '../../api/commission'

  const statusShow = {
    1: '待审核',
    2: '已打款',
    3: '无效/已拒绝',
  }
  const typeShow = {
    1: '银行卡',
  }
  export default {
    components: { Pagination },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          2: 'info',
          1: 'success'
        }
        return statusMap[status]
      },
      typeShowFilter(status) {
        return typeShow[status]
      }
    },
    data() {
      return {
        typeShow,
        statusShow,
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
          status:'1'
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      handleWithdraw(scope,status)
      {
        updateCommissionWithdraw(scope.row.id,{status:status}).then(res=>{
          if (res.code==0)
          this.getData()
        })
      },
      async getData() {
        this.listLoading = true
        const res = await getCommissionWithdraw(this.listQuery)
        this.list = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
