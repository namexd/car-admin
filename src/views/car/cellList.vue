<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" ref="filterForm">
        <el-row>
          <el-col :span="4">
            <el-form-item label="" class="postInfo-container-item" style="text-align: right">
              <el-select v-model="listQuery.search_type" placeholder="请选择" clearable class="filter-item"  >
                <el-option  key="user_name"  label="姓名" value="user_name"/>
                <el-option  key="mobile"  label="手机号" value="mobile"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item   class="postInfo-container-item">
              <el-input   v-model="listQuery.search_keyword" autocomplete="off" placeholder="请输入关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item  label="状态" class="postInfo-container-item">
              <el-select v-model="listQuery.is_follow" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                <el-option  key="all"   label="全部" :value="0" />
                <el-option v-for="(item,key) in statusShow"   :key="key"  :label="item" :value="key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label-width="80px" label="时间范围:" class="postInfo-container-item">
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
          </el-col>
        </el-row>
      </el-form>

    </div>


    <el-table ref="dragTable" v-loading="listLoading" :data="carList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;"  >
      <el-table-column align="center" label="手机号"  >
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名"  >
        <template slot-scope="scope">
          {{ scope.row.user_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌"  >
        <template slot-scope="scope">
        {{ scope.row.brand_title}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="车系"  >
        <template slot-scope="scope">
        {{ scope.row.vehicle_title}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上牌时间"  >
        <template slot-scope="scope">
        {{ scope.row.registration_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="行驶里程"  >
        <template slot-scope="scope">
        {{ scope.row.mileage}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交时间"  >
        <template slot-scope="scope">
        {{ scope.row.create_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
            {{scope.row.is_follow | statusShowFilter}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            跟进记录
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getCarCell"/>

  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import {
    getCars,
    addCar,
    updateCar,
    deleteCar,
    showCar,
  } from '@/api/car'
  import { deleteCarSell, getCarSell } from '../../api/car'

  const statusShow = {
    1: '已跟进',
    2: '未跟进'
  }
  const defaultCar = {

  }
  export default {
    components: { Pagination, Upload },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          2: 'info',
          1: 'success'
        }
        return statusMap[status]??'danger'
      },
      statusShowFilter(status) {
        return statusShow[status]??'无'
      }
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        statusShow,
        daterange:[],
        car: Object.assign({}, defaultCar),
        carList: [],
        dialogVisible: false,
        dialogType: 'new',
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page:20
        }
      }
    },
    created() {
      this.getCarCell()
    },
    methods: {
      daterangeHandle(value)
      {
        this.listQuery.start_at=value[0]
        this.listQuery.end_at=value[1]
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getCarCell()
      },
      async getCarCell() {
        this.listLoading = true
        const res = await getCarSell(this.listQuery)
        this.carList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleEdit(scope) {
        this.$router.push({name:'CellLog',query:{id:scope.row.id}})
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteCarSell({ ids: row.id })
            this.carList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
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
