<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="margin-bottom: 10px">
        <el-page-header @back="goBack" content="会员详情">
        </el-page-header>
      </div>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center ">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名"   align="left">
        <template slot-scope="{row}">
          <div>{{row.user_name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="手机号"   align="left">
        <template slot-scope="{row}">
          <span>{{ row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间"    align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.create_at }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="账户金额"   align="center">
        <template slot-scope="{row}">
          <span> {{ row.usable_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在投金额" align="center" >
        <template slot-scope="{row}">
         {{row.frozen_price}}
        </template>
      </el-table-column>
      <el-table-column label="累计收益" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.total_income_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐人" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.p_user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleView(row)">
           查看用户详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :limit.sync="listQuery.per_page" @pagination="getList"/>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination'
  import { getUserChild, getUsers } from '../../api/user' // secondary package based on el-pagination

  export default {
    name: 'UserChild',
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      goBack()
      {
        this.$router.back()
      },
      getList() {
        this.listLoading = true
        getUserChild(this.$route.query.id,this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data._meta.total_count
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      sortChange(data) {
        const { prop, order } = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id'
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
      },
      handleView(row) {
          this.$router.push({
            name:'usersDetail',
            query: {
              id:row.id
            }
          })
      },
    }
  }
</script>
