<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" ref="filterForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="状态" class="postInfo-container-item" prop="product_title">
              <el-select v-model="listQuery.status" placeholder="请选择" clearable class="filter-item">
                <el-option :key="key" :label="item" :value="key" v-for="(item,key) in statusShow"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" class="postInfo-container-item" style="text-align: right" prop="search_type">
              <el-select v-model="listQuery.search_type" placeholder="请选择" clearable class="filter-item">
                <el-option key="user_name" label="姓名" value="1"/>
                <el-option key="mobile" label="手机号" value="2"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item class="postInfo-container-item" prop="search_keyword">
              <el-input v-model="listQuery.search_keyword" autocomplete="off" placeholder="请输入关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label-width="80px" label="时间范围:" class="postInfo-container-item" prop="daterange">
              <el-date-picker
                v-model="daterange"
                type="daterange"
                value-format="yyyy-MM-dd"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="daterangeHandle">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              查询
            </el-button>
            <el-button type="default" icon="el-icon-delete" @click="handleClear('filterForm')">
              清空查询条件
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>


    <el-table ref="dragTable" v-loading="listLoading" :data="moneyList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;">
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.user_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          {{ scope.row.user_mobile}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="银行名称">
        <template slot-scope="scope">
          {{ scope.row.bank_name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支行信息">
        <template slot-scope="scope">
          {{ scope.row.bank_branch}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="银行卡号">
        <template slot-scope="scope">
          {{ scope.row.bank_card_no}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="提现金额">
        <template slot-scope="scope">
          {{ scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ statusShow[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status=='0'" type="success" @click="agree(scope.row,1)">已转账</el-button>
          <el-button v-if="scope.row.status=='0'" type="danger" @click="agree(scope.row,2)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getMoneyWithdraw"/>

  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import {getMoneyWithdraw, changeMoneyWithdraw } from '../../api/money'

  const statusShow = {
    '0': '审核中',
    '-1': '全部',
    '1': '提现成功',
    '2': '无效',
  }
  const defaultCar = {}
  export default {
    components: { Pagination, Upload },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          2: 'info',
          1: 'success'
        }
        return statusMap[status] ?? 'danger'
      },
      statusShowFilter(status) {
        return statusShow[status] ?? '无'
      }
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        statusShow,
        daterange: [],
        car: Object.assign({}, defaultCar),
        moneyList: [],
        dialogVisible: false,
        dialogType: 'new',
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          status:'0',
          per_page:20,
        }
      }
    },
    created() {
      this.getMoneyWithdraw()
    },
    methods: {
      async agree(row,status) {
        const res = await changeMoneyWithdraw(row.id,{status:status})
        if(res.code==0)
        {
          this.$message.success('操作成功!')
          this.getMoneyWithdraw()
        }
      },
      daterangeHandle(value) {
        if (value) {
          this.listQuery.start_at = value[0]
          this.listQuery.end_at = value[1]
        } else {
          delete this.listQuery.start_at
          delete this.listQuery.end_at
        }

      },
      handleClear(formName) {
        this.$refs[formName].resetFields()
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getMoneyWithdraw()
      },
      async getMoneyWithdraw() {
        this.listLoading = true
        const res = await getMoneyWithdraw(this.listQuery)
        this.moneyList = res.data.items
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
