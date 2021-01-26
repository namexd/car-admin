<template>
  <div class="app-container">

  <el-form :model="data" ref="filterForm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础设置</span>
      </div>
      <el-form-item label="客服电话" label-width="200px">
        <el-input  v-model="data.service_tel"  style="width: 50%" ></el-input>
      </el-form-item>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>钱包余额充值提现设置</span>
      </div>
      <el-form-item label="最低充值金额" label-width="200px">
        <el-input  v-model="data.min_recharge"   style="width: 50%"></el-input>元
      </el-form-item>
      <el-form-item label="最低提现额度" label-width="200px">
        <el-input  v-model="data.min_withdraw"   style="width: 50%"></el-input>元
      </el-form-item>
      <el-form-item label="提现手续费" label-width="200px">
        <el-input  v-model="data.withdraw_fee"   style="width: 50%"></el-input>%
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
      <div v-for="(item,key) in data2.bank" class="bank">
        <el-input v-model="data2.bank[key]"  placeholder="请输入" style="width: 20%"></el-input> <el-button type="text" @click="deleteBank(key)">删除</el-button>
      </div>
      <div>
        <el-button type="defult" @click="addBank">添加</el-button>
      </div>
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
  import { getCommissionConfig, updateCommissionConfig } from '../../api/commission'
  import { deepClone } from '../../utils'

  export default {
    name: 'config',
    data() {
      return {
        data: {
        },
        data2: {
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
        this.data2.bank.splice(key,1)
      },
      addBank(){
        this.data2.bank.push(null)
        console.log( this.data.bank)
      },
      async getData() {
        const res = await getSysConfig()
        const res2 = await getCommissionConfig()

        this.data = res.data
        this.data2 = res2.data
        if (!res2.data.bank)
        {
          this.data2.bank=[]
        }
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
            const params2=deepClone(this.data2)
            params2.bank=JSON.stringify(params2.bank)
            updateCommissionConfig(params2).then(res=>{
              if (res.code==0)
              {
                this.$message.success('保存成功！')
                this.getData()
              }
            });
          }
        });


      }
    }
  }
</script>

<style scoped>

</style>
