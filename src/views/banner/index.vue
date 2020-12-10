<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddBanner">添加轮播图</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="bannerList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID"  >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="轮播图名称"  >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="跳转地址"  >
        <template slot-scope="scope">
          <el-link  type="info" href=" scope.row.link_url" target="_blank" >{{ scope.row.link_url}}</el-link >
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否启用">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_show | statusFilter">
            {{scope.row.is_show | statusShowFilter}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="添加时间"  >
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getBanner"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑轮播图':'新增轮播图'">
      <el-form :model="banner"   label-position="left" label-width="100px">
        <el-form-item label="名称" required>
          <el-input v-model="banner.title" placeholder="轮播图名称"/>
        </el-form-item>
        <el-form-item label="轮播图地址" required>
          <el-input v-model="banner.link_url" placeholder="轮播图地址"/>
        </el-form-item>
        <el-form-item label="上传图片" required>
          <Upload v-model="banner.pic_id" :pic_url="banner.pic_url"/>
          <p>建议图片宽度750，高度200-950</p>
        </el-form-item>
        <el-form-item   label="是否启用"   style="margin-bottom: 30px;" required>
          <el-radio v-model="banner.is_show" :label="1">是</el-radio>
          <el-radio v-model="banner.is_show" :label="2">否</el-radio>
        </el-form-item>


      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmBanner">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import {
    getBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    showBanner,
  } from '@/api/banner'

  const statusShow = {
    1: '已启用',
    2: '已停用'
  }
  const defaultBanner = {

  }
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
        banner: Object.assign({}, defaultBanner),
        bannerList: [],
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
      this.getBanner()
    },
    methods: {
      async getBanner() {
        this.listLoading = true
        const res = await getBanners(this.listQuery)
        this.bannerList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleAddBanner() {
        this.banner = Object.assign({}, defaultBanner)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        showBanner(scope.row.id).then(res=>{
          this.banner = res.data
          this.dialogType = 'edit'
          this.dialogVisible = true
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此轮播图吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteBanner({ids:row.id})
            this.bannerList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async confirmBanner() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          let id=this.banner.id
          delete this.banner.id
          await updateBanner(id,this.banner)
        } else {
          await addBanner(this.banner)
        }
        this.getBanner()
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
