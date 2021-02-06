<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-page-header @back="goBack" content="会员详情">
      </el-page-header>
    </div>

    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="12" :xs="24">
          <user-info :user="user.info" :order="user.order" style="min-height: 400px"/>
        </el-col>

        <el-col :span="12" :xs="24">
          <user-distribution :user="user.commission" style="min-height: 345px"/>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
          <user-order :user="user.order" style="min-height: 160px"/>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
  import UserInfo from './components/UserInfo'
  import UserDistribution from './components/UserDistribution'
  import UserOrder from './components/UserOrder'
  import { getUser } from '../../api/user'

  export default {
    name: 'userDetail',
    components: { UserInfo, UserDistribution, UserOrder },
    data() {
      return {
        user: {
          info:{},
          commission:{},
          order:{},
        },
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      goBack()
      {
        this.$router.back()
      },
      getUser() {
        let id=this.$route.query.id
        getUser(id).then(res=>{
          this.user=res.data
        })
      }
    }
  }
</script>
