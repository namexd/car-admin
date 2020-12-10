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
          <el-col :span="5">
            <el-form-item label="参与项目" class="postInfo-container-item" prop="product_title">
              <el-input v-model="listQuery.product_title" autocomplete="off" placeholder="请输入关键字"
                        style="width: 50%;"></el-input>
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


    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;">
      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          {{ scope.row.order_no }}
        </template>
      </el-table-column>
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
      <el-table-column align="center" label="参与金额 (元)">
        <template slot-scope="scope">
          {{ scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="待收收益(元)">
        <template slot-scope="scope">
          {{ scope.row.payoff}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="参与项目">
        <template slot-scope="scope">
          {{ scope.row.create_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="参与时间">
        <template slot-scope="scope">
          {{ scope.row.create_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="推荐人">
        <template slot-scope="scope">
          {{ scope.row.p_user_name}} <br>
          佣金：{{scope.row.commission_money}}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getData"/>

  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import { getMoneyLogs, getMoneyOrders } from '../../api/money'
  import { getCommissionOrders } from '../../api/commission'

  const statusShow = {
    1: '已跟进',
    2: '未跟进'
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
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page:20,
          product_id:this.$route.query.product_id?this.$route.query.product_id:''
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
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
        this.getData()
      },
      async getData() {
        this.listLoading = true
        const res = await getCommissionOrders(this.listQuery)
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
