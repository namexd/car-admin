<template>
  <div>
    <el-card style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>会员资料</span>
        <el-button   @click="handleUserDelete(user)" style="float: right;margin-left: 5px" type="info"
                     size="mini">删除
        </el-button>
        <el-button v-if="user.status==2" @click="handleUserBlock(user)" style="float: right;" type="warning"
                   size="mini">移除黑名单
        </el-button>
        <el-button v-if="user.status==1" @click="handleUserBlock(user)" style="float: right;" type="danger"
                   size="mini">加入黑名单
        </el-button>

      </div>

      <div class="user-profile">
        <el-row :gutter="20">
          <el-col :span="24"  >
            <div class="card-panel-description">
              <div class="card-panel-text">
                红包券
              </div>
              <el-button type="text" @click="showLogs" style="color: red;font-size: 15px">{{user.total_coupon}}</el-button>
              <el-button type="text" @click="addMine">添加</el-button>
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
              <b>手机号</b>
              <span>{{user.mobile}}</span>
            </div>
            <div class="progress-item">
              <b>注册时间</b>
              <span>{{user.create_at}}</span>
            </div>
            <div class="progress-item">
              <b>推荐人</b>
              <span>{{user.p_user}}</span>
              <el-button type="text" style="margin-left: 20px" @click="addParent">修改</el-button>
            </div>
            <div class="progress-item">
              <b>姓名</b>
              <span>{{user.auth.real_name}}</span>
            </div>
            <div class="progress-item">
              <b>身份证号</b>
              <span>{{user.auth.id_card}}</span>
            </div>
            <div class="progress-item">
              <b>银行名称</b>
              <span>{{user.auth.bank_name.bank_name}}</span>
            </div>
            <div class="progress-item">
              <b>银行卡号</b>
              <span>{{user.bank_card_no}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="红包券记录" :visible.sync="dialogMineListVisible" width="80%">
      <div>
        <div class="filter-container">
          <el-form :model="listQueryMine" >
            <el-row>
              <el-col :span="4">
                <el-form-item label="状态:" class="postInfo-container-item">
                  <el-select v-model="listQueryMine.status" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                    <el-option v-for="item in stateTypes" :key="item.key" :label="item.display_name"
                               :value="item.key"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                  搜索
                </el-button>
              </el-col>
            </el-row>
          </el-form>

        </div>
        <el-table ref="dragTable" v-loading="listLoading" :data="couponList" row-key="id" fit highlight-current-row
                  style="width: 100%;margin-top:30px;"  >
          <el-table-column align="center" label="红包券名称" width="220">
            <template slot-scope="scope">
              {{ scope.row.coupon_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="领取来源">
            <template slot-scope="scope">
              {{ scope.row.type|typeFilter}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="领取时间">
            <template slot-scope="scope">
              {{ scope.row.create_at}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="券状态">
            <template slot-scope="scope">
              {{ scope.row.status|stateTypeFilter }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
             <el-button type="danger" @click="handleDelete(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQueryMine.page" :limit.sync="listQueryMine.per_page"
                    @pagination="getUserCoupon"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMineListVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加红包券" :visible.sync="dialogMineVisible">
      <el-form :model="couponParams">
        <el-form-item label="选择红包券:" class="postInfo-container-item">
      <el-row :gutter="20">
        <div v-for="item in couponsList" :label="item.id" style="margin-bottom: 5px">
          <el-radio v-model="couponParams.coupon_id" :label="item.id">{{item.title}}</el-radio>
        </div>
      </el-row>
        </el-form-item>
      <el-form-item label="数量:" class="postInfo-container-item">
        <el-row :gutter="20">
          <el-col :span="5"><el-input v-model="couponParams.coupon_num" placeholder="请输入数量"></el-input></el-col>
          <el-col :span="2"><span>张</span></el-col>
        </el-row>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMineVisible = false">取 消</el-button>
        <el-button type="primary" @click="postMine">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改上级联系人" :visible.sync="dialogParentVisible">
      <div>
        <div class="filter-container">
          <el-form :model="listQueryParent" >
            <el-row>
              <el-col :span="4">
                <el-form-item label="" class="postInfo-container-item">
                  <el-select v-model="listQueryParent.search_type" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                    <el-option label="姓名" value="1"/>
                    <el-option   label="手机号" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item   class="postInfo-container-item">
                  <el-input   v-model="listQueryParent.search_keyword" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilterParent">
                  搜索
                </el-button>
              </el-col>
            </el-row>
          </el-form>

        </div>
        <el-table ref="dragTable"  :data="parentList" row-key="id" fit highlight-current-row  @current-change="handleCurrentChange"
                  style="width: 100%;margin-top:30px;" border>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column align="center" label="账号" width="220">

            <template slot-scope="scope">
              {{ scope.row.mobile }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名">
            <template slot-scope="scope">
              {{scope.row.user_name}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogParentVisible = false">取 消</el-button>
        <el-button type="primary" @click="postParent">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves'
  import {
    addsUerCoupon, blackUser,
    deleteUser,
    deleteUserCoupon,
    getUserCoupon,
    getUsers,
    updateUserParent
  } from '../../../api/user'
  import { getCoupons } from '../../../api/coupon' // waves directive


  const stateTypes = [
    { key: 1, display_name: '待使用' },
    { key: 2, display_name: '已使用' },
    { key: 3, display_name: '已失效' },
  ]
  const types = [
    { key: 1, display_name: '实名认证' },
    { key: 2, display_name: '推荐奖励' },
    { key: 3, display_name: '后台发放' },
  ]
  const stateTypeKeyValue = stateTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  const typeKeyValue = types.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  export default {
    components: { Pagination },
    directives: { waves },
    inject:['reload'],
    props: {
      user: {
        type: Object,
        default: () => {
          return {
            status: '',
            share_mine: '',
            left_parent_coin: '',
            mobile: '',
            create_at: '',
            address_name: '',
            total_address: '',
            mine_count: '',
            invite_user: ''
          }
        }
      }
    },
    filters:{
      stateTypeFilter(type){
        return stateTypeKeyValue[type]
      },
      typeFilter(type){
        return typeKeyValue[type]
      }
    },
    data() {
      return {
        mines: [],
        dialogMineVisible: false,
        dialogParentVisible: false,
        dialogMineListVisible: false,
        dialogVouchersVisible: false,
        vouchersParams: {
          user_id:this.$route.query.id,
          type:1
        },
        couponParams: {
          user_id:this.$route.query.id,
        },
        parentParams: {},
        listQueryParent:{},
        stateTypes,
        types,
        total: 0,
        couponsList:[],
        parentList:[],
        couponList:[],
        listLoading: true,
        listQueryMine: {
          page: 1,
          per_page: 20,
          user_id:this.$route.query.id,
        }
      }
    },
    created() {
      this.getUserCoupon()
      this.getCoupon()
    },
    methods: {


      handleUserBlock(user)
      {
        const message=user.status==1?'确定要把'+user.mobile+'加入黑名单吗?<br><span style="color: red">拉黑后，该账号无法访问平台！</span>':'确定要把'+user.mobile+'解除黑名单吗?'
        this.$confirm(message, 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString:true
        })
          .then(() => {
            blackUser(user.id).then(res=>{
              if (res.code==0)
              {
                this.$message.success('操作成功')
                this.reload()
              }
            })
          })
          .catch(err => {
            console.error(err)
          })

      },

      handleUserDelete(user)
      {
        this.$confirm('确定要把'+user.mobile+'删除吗?<br><span style="color: red">删除后，该账号数据无法恢复，请谨慎操作！</span>', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString:true
        })
          .then(() => {
            deleteUser(user.id).then(res=>{
              if (res.code==0)
              {
                this.$message.success('删除成功')
                this.$router.back()
              }
            })
          })
          .catch(err => {
            console.error(err)
          })

      },

      handleDelete(scope)
      {
        this.$confirm('确定要删除吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteUserCoupon({ids:scope}).then(res=>{
              if (res.code==0)
              {
                this.$message.success('删除成功')
                this.getUserCoupon()
              }
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      handleFilter() {
        this.listQueryMine.page = 1
        this.getUserCoupon()
      },
      handleFilterParent(){
        getUsers(this.listQueryParent).then(res=>{
          this.parentList=res.data.items

        })
      },
      handleCurrentChange(val) {
        this.parentParams.p_id=val.id;
      },
      async getUserCoupon() {
        const res = await getUserCoupon(this.listQueryMine)
        this.couponList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      async getCoupon() {
        const res = await getCoupons({per_page:10000})
        this.couponsList = res.data.items
      },
      showLogs()
      {
        this.dialogMineListVisible=true
      },
      addMine() {
        this.dialogMineVisible = true
      },
      addParent() {
        this.dialogParentVisible = true
      },
      postMine() {
        this.dialogMineVisible = false
        addsUerCoupon(this.couponParams).then(res => {
          if (res.code == 0) {
            this.$message.success('添加红包券成功')
            this.reload()
          } else {
            this.$message.success('添加红包券失败')
          }
        })
      },
      postParent() {
        this.dialogParentVisible = false
        updateUserParent(this.$route.query.id, this.parentParams).then(res => {
          if (res.code == 0) {
            this.$message.success('操作成功')
            this.reload()
          } else {
            this.$message.error('操作失败')
          }
        })
      },
    }
  }
</script>
<style>
  .el-button span:not:first-child {
    font-size: 12px
  }
</style>
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
