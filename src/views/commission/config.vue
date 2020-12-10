<template>
  <div class="app-container">

  <el-form :model="data" ref="filterForm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础设置</span>
      </div>
      <el-form-item label="佣金比例" label-width="200px">
        <el-input v-model="data.ratio" style="width: 50%"></el-input> %
      </el-form-item>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>结算设置</span>
      </div>
      <el-form-item label="最低提现额度" label-width="200px">
        <el-input v-model="data.withdraw_min_money" style="width: 50%"></el-input> 元
      </el-form-item>
      <el-form-item label="佣金提现手续费" label-width="200px">
        <el-input v-model="data.withdraw_fee" style="width: 50%"></el-input> %
      </el-form-item>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提现方式</span>
      </div>
      <el-form-item>
        <el-checkbox v-model="checked">提现到银行卡</el-checkbox>
      </el-form-item>
      <el-form-item label="支持银行" label-width="200px">
        <div v-for="(item,key) in data.bank">
          <el-input v-model="data.bank[key]"  placeholder="请输入" style="width: 20%"></el-input> <el-button type="text" @click="deleteBank(key)">删除</el-button>
        </div>
        <div>
          <el-button type="defult" @click="addBank">添加</el-button>
        </div>
      </el-form-item>
    </el-card>
  </el-form>
    <div style="text-align:center;">
      <el-button type="primary" @click="confirmConfig">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { getCommissionConfig, updateCommissionConfig } from '../../api/commission'
  import { deepClone } from '../../utils'

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
      deleteBank(key){
        this.data.bank.splice(key,1)
      },
      addBank(){
        this.data.bank.push(null)
      },
      async getData() {
        const res = await getCommissionConfig()
        this.data = res.data
        if (res.data.bank==null)
        {
          this.data.bank=[]
        }
      },
      confirmConfig()
      {
        const params=deepClone(this.data)
        params.bank=JSON.stringify(params.bank)
        updateCommissionConfig(params).then(res=>{
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
