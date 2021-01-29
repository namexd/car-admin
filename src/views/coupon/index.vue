<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddCoupon">添加红包券</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="couponList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;"  >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="券名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="发放数量">
        <template slot-scope="scope">
          {{ scope.row.total_num }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="使用数量">
        <template slot-scope="scope">
          {{ scope.row.used_num }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="使用率">
        <template slot-scope="scope">
          {{scope.row.used_num>0? ((scope.row.used_num)/(scope.row.total_num)*100+'%'):0 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            查看
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getCoupon"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看红包券':'新增红包券'">
      <el-form :model="coupon" label-position="left" label-width="100px">
        <el-form-item label="券面额" required>
          <el-input :disabled="dialogType=='edit'?true:false" v-model="coupon.deduct_money" placeholder="券面额"/>
        </el-form-item>
        <el-form-item label="券名称" required>
          <el-input :disabled="dialogType=='edit'?true:false" v-model="coupon.title" placeholder="红包券名称"/>
        </el-form-item>
        <el-form-item label="消费门槛" required>
          <el-input :disabled="dialogType=='edit'?true:false" v-model="coupon.min_money" placeholder="消费门槛"/>
        </el-form-item>
        <el-form-item label="发放时间" required>
          <el-date-picker
             :disabled="dialogType=='edit'?true:false"
            v-model="daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="daterangeHandle">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="券有效期" required>
          <el-row>
            <el-col :span="2">
              从发券第
            </el-col>
            <el-col :span="4">
              <el-input :disabled="dialogType=='edit'?true:false" v-model="coupon.valid_start_day" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="2" style="text-align: center">
              天,至
            </el-col>
            <el-col :span="4">
              <el-input :disabled="dialogType=='edit'?true:false" v-model="coupon.valid_end_day" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="4">
              天
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="消费门槛" required>
          <el-radio :disabled="dialogType=='edit'?true:false" v-model="coupon.type" :label="1">实名赠送</el-radio>
          <el-radio :disabled="dialogType=='edit'?true:false" v-model="coupon.type" :label="2">下级实名赠送</el-radio>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="删除红包券"
      :visible.sync="dialogVisibleDelete"
      width="30%"
    >
      <div style="margin-bottom: 10px">
        <el-radio v-model="deleteParams.type" :label="1">会员已领取的红包可以继续使用</el-radio>
      </div>
      <div>
        <el-radio v-model="deleteParams.type" :label="2">一并删除</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleDelete = false">取 消</el-button>
    <el-button type="primary" @click="goDelete">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import {
    getCoupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    showCoupon
  } from '@/api/coupon'

  const statusShow = {
    1: '已启用',
    2: '已停用'
  }
  const defaultCoupon = {}
  export default {
    components: { Pagination, Upload },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          '2': 'info',
          '1': 'success'
        }
        return statusMap[status]
      },
      statusShowFilter(status) {
        return statusShow[status]
      }
    },
    data() {
      return {
        daterange: [],
        deleteParams: {},
        coupon: {},
        couponList: [],
        dialogVisibleDelete: false,
        dialogVisible: false,
        dialogType: 'new',
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        }
      }
    },
    created() {
      this.getCoupon()
    },
    methods: {
      daterangeHandle(value) {
        this.coupon.start_at = value[0]
        this.coupon.end_at = value[1]
      },
      async getCoupon() {
        this.listLoading = true
        const res = await getCoupons(this.listQuery)
        this.couponList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleAddCoupon() {
        this.coupon = {}
        this.daterange = []
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        showCoupon(scope.row.id).then(res => {
          this.coupon = res.data
          this.daterange = [res.data.start_at, res.data.end_at]
          this.dialogType = 'edit'
          this.dialogVisible = true
        })
      },
      handleDelete({ $index, row }) {
        this.dialogVisibleDelete = true
        this.deleteParams.ids = row.id
      },
      goDelete() {
        deleteCoupon(this.deleteParams).then(res => {
          if (res.code == 0) {
            this.$message.success('删除成功')
            this.getCoupon()
            this.dialogVisibleDelete = false

          }
        })
      },
      async confirmCoupon() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          let id = this.coupon.id
          delete this.coupon.id
          await updateCoupon(id, this.coupon)
        } else {
          await addCoupon(this.coupon)
        }
        this.getCoupon()
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          message: '操作成功！',
          type: 'success'
        })
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
