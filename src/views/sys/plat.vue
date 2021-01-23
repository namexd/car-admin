<template>
  <div class="app-container">

    <el-form :model="data" ref="filterForm">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>平台介绍</span>
        </div>
        <el-form-item label="平台介绍" label-width="200px">
          <el-input type="textarea" v-model="data.plat_intro"  ></el-input>
        </el-form-item>
      </el-card>
    </el-form>
    <div style="text-align:center;margin-top: 50px">
      <el-button type="primary" @click="confirmConfig">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { getSysConfig, updateSysConfig } from '../../api/sys-config'

  export default {
    name: 'config',
    data() {
      return {
        data: {
          bank:[]
        },
        checked:true
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        const res = await getSysConfig()
        this.data = res.data
      },
      confirmConfig()
      {
        const params={
          service_tel:this.data.service_tel,
          plat_intro:this.data.plat_intro,
        }
        updateSysConfig(params).then(res=>{
          if (res.code==0)
          {
            this.$message.success('保存成功！')
            this.getData()
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
