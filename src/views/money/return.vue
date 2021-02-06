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
      <el-table-column align="center" label="流水号">
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
      <el-table-column align="center" label="变动金额 (元)">
        <template slot-scope="scope">
          {{ scope.row.end_money}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="待收收益(元)">
        <template slot-scope="scope">
          {{ scope.row.payoff}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="参与项目">
        <template slot-scope="scope">
          {{ scope.row.product_title}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目开始时间">
        <template slot-scope="scope">
          {{ scope.row.start_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="还本时间">
        <template slot-scope="scope">
          {{ scope.row.end_at}}
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button v-if="compareDate(scope.row.create_at)" @click="agree(scope.row)">同意</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getMoneyReturn"/>

  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import { getMoneyLogs, getMoneyOrders, getMoneyReturns, putMoneyReturn } from '../../api/money'

  const statusShow = {
    1: '今日回款',
    2: '全部',
    3: '已回款',
    4: '即将到期',
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
          status:'1',
          per_page:20,
        }
      }
    },
    created() {
      this.getMoneyReturn()
      var mydate = new Date();
      console.log(mydate.toLocaleDateString())
    },
    methods: {
      compareDate(date)
      {
        const mydate = new Date();
        const nowDate=mydate.toLocaleDateString()
        const newData=date.replace("-", "/")
        return nowDate>newData
      },
      async agree(row) {
        const res = await putMoneyReturn(row.id)
        if(res.code==0)
        {
          this.$message.success('操作成功!')
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
        this.getMoneyReturn()
      },
      async getMoneyReturn() {
        this.listLoading = true
        const res = await getMoneyReturns(this.listQuery)
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
