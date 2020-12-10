<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-page-header @back="goBack()" content="跟进记录">
      </el-page-header>
    </div>
    <div style="margin: 20px 0">

      <el-button type="primary" icon="el-icon-clear" @click="dialogVisible=true">
        写跟进
      </el-button>
    </div>

  <div class="block">
    <el-timeline>
      <el-timeline-item :timestamp="item.create_at" placement="top" v-for="item in list">
        <el-card>
          <p>{{item.content}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getLogs"/>

    <el-dialog :visible.sync="dialogVisible" title="写跟进"  >
      <el-form :model="log" label-position="left" label-width="100px"  >
        <el-form-item label="写跟进">
          <el-input type="textarea" v-model="log.content"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmLog">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'

  import { addCarSellLog, getCarSellLogs } from '../../api/car'

  export default {
    components: { Pagination },
    name: 'cellLog',
    data(){
      return {
        list:[],
        log:{
          content:'',
          sell_id: this.$route.query.id
        },
        total: 0,
        dialogVisible: false,
        listQuery: {
          page: 1,
          per_page:20,
          sell_id:this.$route.query.id
        }
      }
    },
    created() {
      this.getLogs()
    },
    methods:{
      goBack(){
        this.$router.back()
      },
      async getLogs() {
        const res = await getCarSellLogs((this.listQuery))
        this.list = res.data.items
        this.total = res.data._meta.total_count
      },
      confirmLog(){
        addCarSellLog(this.log).then(res => {
          if (res.code == 0) {
            this.$message.success('保存成功！')
            this.dialogVisible=false
            this.getLogs()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
