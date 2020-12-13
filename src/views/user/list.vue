<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" ref="filterForm">
        <el-row>
          <el-col :span="3">
            <el-form-item label="" class="postInfo-container-item" style="text-align: right" prop="search_type">
              <el-select v-model="listQuery.search_type" placeholder="请选择" clearable class="filter-item">
                <el-option key="user_name" label="姓名" value="user_name"/>
                <el-option key="mobile" label="手机号" value="mobile"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item class="postInfo-container-item" prop="search_keyword">
              <el-input v-model="listQuery.search_keyword" autocomplete="off" placeholder="请输入关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
          <el-form-item label-width="60px" label="推荐人:" class="postInfo-container-item">
            <el-input v-model="listQuery.referees" clearable placeholder="推荐人手机号" style="width: 50%" class="filter-item"
                      @keyup.enter.native="handleFilter"/>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
          <el-button  type="info" icon="el-icon-clear" @click="resetForm('filterForm')">
            清空查询条件
          </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
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
          <el-button type="warning" size="mini" @click="handleMoneyOrder(row)">
            我的投资
          </el-button>
          <el-button type="danger" size="mini" @click="handleMoneyLog(row)">
            资金管理
          </el-button>
          <el-button type="primary" size="mini" @click="handleView(row)">
            详情
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
  import { getUsers } from '../../api/user' // secondary package based on el-pagination

  const userStatusOptions = [
    { key: '0', display_name: '全部' },
    { key: '1', display_name: '是' },
    { key: '2', display_name: '否' }
  ]
  const promoterOptions = {1:'普通用户',2:'推广员'}

  // arr to obj, such as { CN : "China", US : "USA" }
  const userStatusKeyValue = userStatusOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'UserList',
    components: { Pagination },
    directives: { waves },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return userStatusKeyValue[type]
      },
      PromoterFilter(type) {
        return promoterOptions[type]
      }
    },
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
        userStatusOptions,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      resetForm(formName) {
         this.listQuery.mobile=''
         this.listQuery.user_name=''
         this.listQuery.p_user=''
      },
      getList() {
        this.listLoading = true
        getUsers(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data._meta.total_count
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$confirm('您确认要把'+row.mobile+'加入黑名单吗？拉黑后，该账号将无法访问商城?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userBlack(row.id).then(res=>{
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            row.status = status
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

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
      handleMoneyOrder(row) {
          this.$router.push({
            name:'MoneyOrder',
            query: {
              user_id:row.id
            }
          })
      },
      handleMoneyLog(row) {
          this.$router.push({
            name:'MoneyLog',
            query: {
              user_id:row.id
            }
          })
      },
    }
  }
</script>
