<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>分销信息</span>
    </div>

    <div class="user-profile">
        <div class="progress-item">
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="card-panel-description">
              <div class="card-panel-text">
                累计佣金
              </div>
              <span>{{user.commission_price}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="card-panel-description">
              <div class="card-panel-text">
                已提现佣金
              </div>
              <span>{{user.with_commission_price}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="card-panel-description">
              <div class="card-panel-text">
                待入账佣金
              </div>
              <span>{{user.booked_commission_price}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="card-panel-description">
              <div class="card-panel-text">
                分销订单
              </div>
              <span>{{user.total_commission_order}}</span>
            </div>
          </el-col>
        </el-row>

      </div>
      <div class="user-bio">
        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="skill"/>
          </div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <b>推广人数</b>
              <span>{{user.total_under_user}}</span>
              <el-button type="text" @click="getUserRelations">查看下级列表</el-button>
            </div>
          </div>
        </div>
      </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {
          }
        }
      }
    },
    data(){
      return {
        activeName:'first'
      }
    },
    methods:{
      getUserRelations(){
        this.$router.push({
          name:'userChild',
          query:{
            id:this.$route.query.id
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  b{
    margin-right: 10px;
  }
  .box-center {
    margin: 0 auto;
    display: table;
  }
  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }

  .text-muted {
    color: #777;
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    color: #606266;

    span {
      padding-left: 4px;
      margin-right: 4px;
    }

    .user-bio-section {
      font-size: 16px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
