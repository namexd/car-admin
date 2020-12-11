<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddArticle">添加文章</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="articleList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID"  >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章名称"  >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分类">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | statusFilter">
            {{scope.row.type | statusShowFilter}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否显示">
        <template slot-scope="scope">
            {{scope.row.is_show=='1'?'是':'否'}}
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
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getArticle"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑文章':'新增文章'">
      <el-form :model="article"   label-position="left" label-width="100px">
        <el-form-item label="名称" required>
          <el-input v-model="article.title" placeholder="文章名称"/>
        </el-form-item>
        <el-form-item label="文章分类" required>
          <el-select v-model="article.type" placeholder="请选择" clearable class="filter-item" style="width: 130px">
            <el-option v-for="(item,key) in statusShow"   :key="key"  :label="item" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图" required>
          <Upload v-model="article.article_thumb" :pic_url="article.article_thumb_url" v-if="dialogVisible"/>
          <p>建议图片宽度750，高度200-950</p>
        </el-form-item>
        <el-form-item label="简介" required>
          <el-input type="textarea" v-model="article.article_content" placeholder="简介"/>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input type="textarea" v-model="article.introduce" placeholder="内容"/>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmArticle">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import {
    getArticles,
    addArticle,
    updateArticle,
    deleteArticle,
    showArticle,
  } from '@/api/article'

  const statusShow = {
    1: '行业新闻',
    2: '时事新闻',
    3: '常见问题'
  }
  const defaultArticle = {

  }
  export default {
    components: { Pagination, Upload },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          '2': 'info',
          '1': 'success',
          '3':'danger'
        }
        return statusMap[status]
      },
      statusShowFilter(status) {
        return statusShow[status]
      }
    },
    data() {
      return {
        article: Object.assign({}, defaultArticle),
        articleList: [],
        statusShow,
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
      this.getArticle()
    },
    methods: {
      async getArticle() {
        this.listLoading = true
        const res = await getArticles(this.listQuery)
        this.articleList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleAddArticle() {
        this.article = Object.assign({}, defaultArticle)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        showArticle(scope.row.id).then(res=>{
          this.article = res.data
          this.dialogType = 'edit'
          this.dialogVisible = true
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此文章吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteArticle({ids:row.id})
            this.articleList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async confirmArticle() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          let id=this.article.id
          delete this.article.id
          await updateArticle(id,this.article)
        } else {
          await addArticle(this.article)
        }
        this.getArticle()
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          message: '操作成功！',
          type: 'success'
        })
      },
      handleClose(){
        this.article={}
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
