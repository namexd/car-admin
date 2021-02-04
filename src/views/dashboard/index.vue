<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="topTitle">
        <h4>今日需处理回款</h4>
        <el-row :gutter="20">
          <el-col :span="3" :offset="1" style="font-size: large">
            {{data.today_return.total_num}}笔
          </el-col>
          <el-col :span="6" style="font-size: large">
            共 {{data.today_return.total_money}}元
          </el-col>
        </el-row>
      </div>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日成交</span>
            <el-button type="success" size="mini" style="float: right; padding: 3px 0">日</el-button>
          </div>
          <h1>
            ￥{{data.order.today_order}}
          </h1>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>昨日成交</span>
            <el-button type="success" size="mini" style="float: right; padding: 3px 0">日</el-button>
          </div>
          <h1>
            ￥{{data.order.yesterday_order}}
          </h1>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>近七日成交</span>
            <el-button type="primary" size="mini" style="float: right; padding: 3px 0">周</el-button>
          </div>
          <h1>
            ￥{{data.order.seven_order}}
          </h1>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>近一月成交</span>
            <el-button type="success" size="info" style="float: right; padding: 3px 0">月</el-button>
          </div>
          <h1>
            ￥{{data.order.month_order}}
          </h1>
        </el-card>

      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>在投金额</span>
            <el-button type="warning" size="mini" style="float: right; padding: 3px 0">共</el-button>
          </div>
          <h1>
            ￥{{data.order.in_money}}
          </h1>
        </el-card>

      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>在投收益</span>
            <el-button type="warning" size="mini" style="float: right; padding: 3px 0">共</el-button>
          </div>
          <h1>
            ￥{{data.order.in_payoff}}
          </h1>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>累计成交</span>
            <el-button type="warning" size="mini" style="float: right; padding: 3px 0">共</el-button>
          </div>
          <h1>
            ￥{{data.order.total_order}}
          </h1>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>累计收益</span>
            <el-button type="warning" size="mini" style="float: right; padding: 3px 0">共</el-button>
          </div>
          <h1>
            ￥{{data.order.total_paid}}
          </h1>
        </el-card>

      </el-col>
    </el-row>


    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>会员概览</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <span>今日新增会员数</span>
              <h1>{{data.user.today_user}}</h1>
            </el-col>
            <el-col :span="8">
              <span>近七日新增会员数</span>
              <h1>{{data.user.seven_user}}</h1>
            </el-col>
            <el-col :span="8">
              <span>近30天新增会员数</span>
              <h1>{{data.user.month_user}}</h1>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <span>注册会员数</span>
              <h1>{{data.user.total_register}}</h1>
            </el-col>
            <el-col :span="8">
              <span>实名会员数</span>
              <h1>{{data.user.total_auth}}</h1>
            </el-col>
            <el-col :span="8">
              <span>投资会员数</span>
              <h1>{{data.user.total_paid}}</h1>
            </el-col>
          </el-row>
        </el-card>

      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>投资排行</span>
          </div>
          <el-table ref="dragTable"  :data="data.order_limits"   highlight-current-row >
            <el-table-column align="center" label="排行"  >
              <template slot-scope="scope">
                {{ (scope.$index)+1 }}
              </template>
            </el-table-column>

            <el-table-column align="center" label="姓名"  >
              <template slot-scope="scope">
                {{ scope.row.real_name }}
              </template>
            </el-table-column>

            <el-table-column align="center" label="投资金额"  >
              <template slot-scope="scope">
                {{ scope.row.order_money }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>

      </el-col>
    </el-row>
  </div>

</template>

<script>
  import { getHome } from '../../api/home'

  export default {
    name: 'Dashboard',
    data() {
      return {
        data: {}
      }
    },
    created() {
      this.getHome()
    },
    methods: {
      async getHome() {
        const res = await getHome()
        this.data = res.data
      }
    }
  }
</script>

<style>
  .topTitle {
    margin-bottom: 20px;
  }

  .static b {
    color: #20a0ff;
  }
</style>
