<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>交易统计</span>
      <b style="margin-left: 100px">最近投资时间：{{user.recent_order_at}}</b>
      <el-button @click="getUserOrders(user.id)" style="float: right;" type="primary" size="mini">查看投资订单列表</el-button>

    </div>

    <div class="user-profile">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="card-panel-description">
            <div class="card-panel-text">
              累计投资金额
            </div>
            <span>{{user.total_order_money}}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="card-panel-description">
            <div class="card-panel-text">
              累计投资项目
            </div>
            <span>{{user.total_order_num}}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="card-panel-description">
            <div class="card-panel-text">
              累计收益
            </div>
            <span>{{user.total_income_price}}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="card-panel-description">
            <div class="card-panel-text">
              等待收益
            </div>
            <span>{{user.frozen_income_price}}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="card-panel-description">
            <div class="card-panel-text">
              参与中金额
            </div>
            <span>{{user.in_order_money}}</span>
          </div>
        </el-col>
      </el-row>

    </div>
  </el-card>
</template>

<script>


  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getUserOrders(id) {
        this.$router.push({ name: 'userOrders', query: { user_id: this.$route.query.id } })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
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
