<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" ref="filterForm">
        <el-row>
          <el-col :span="4">
            <el-form-item label-width="60px" label="品牌" class="postInfo-container-item">
              <el-select v-model="listQuery.brand_id" clearable placeholder="请选择" @change="loadVehicle" ref="brand">
                <el-option
                  v-for="item in brandOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="60px" label="车系" class="postInfo-container-item">
              <el-select v-model="listQuery.vehicle_id" clearable placeholder="请选择" @change="loadYears">
                <el-option
                  v-for="item in vehicleOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="60px" label="款:" class="postInfo-container-item">
              <el-select v-model="listQuery.year_id" clearable placeholder="请选择" @change="loadModels">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="60px" label="型号:" class="postInfo-container-item">
              <el-select v-model="listQuery.model_id" clearable placeholder="请选择">
                <el-option
                  v-for="item in modelOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="60px" label="车源号:" class="postInfo-container-item">
                <el-input v-model="listQuery.source_no" clearable placeholder="输入车源号" style="width: 60%">
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              查询
            </el-button>

          </el-col>
        </el-row>
        <el-button type="success" icon="el-icon-clear" @click="handleAddCar">
          添加车辆信息
        </el-button>
      </el-form>
      <el-tabs v-model="listQuery.status" @tab-click="handleClick">
        <el-tab-pane label="全部车辆" name="0"></el-tab-pane>
        <el-tab-pane label="出售中" name="1"></el-tab-pane>
        <el-tab-pane label="已出售" name="2"></el-tab-pane>
        <el-tab-pane label="仓库中" name="3"></el-tab-pane>
      </el-tabs>
    </div>


    <el-table ref="dragTable" v-loading="listLoading" :data="carList" row-key="id" fit highlight-current-row
    >
      <el-table-column  label="权重"  >
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.sort" class="edit-input" size="small"/>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="text"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.sort }}</span>
          <el-button
            v-if="row.edit"
            type="text"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            确定
          </el-button>
          <el-button
            v-else
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            修改
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="车源号">
        <template slot-scope="scope">
          {{ scope.row.source_no }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌">
        <template slot-scope="scope">
          {{ scope.row.brand_title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="车系">
        <template slot-scope="scope">
          {{ scope.row.vehicle_title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="款">
        <template slot-scope="scope">
          {{scope.row.year_title }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="上牌时间">
        <template slot-scope="scope">
          {{ scope.row.registration_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="行驶里程">
        <template slot-scope="scope">
          {{ scope.row.mileage }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <!--      <el-table-column align="center" label="状态"  >-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag :type="scope.row.is_show | statusFilter">-->
      <!--            {{scope.row.is_show | statusShowFilter}}-->
      <!--          </el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="操作" width="400px">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleSell(scope)" v-if="scope.row.is_warehouse==1&&scope.row.is_sell==1">
            已售出
          </el-button>
          <el-button type="success" size="mini" @click="handleWarehouse(scope)" v-if="scope.row.is_warehouse==2">
            上架
          </el-button>
          <el-button type="warning" size="mini" @click="handleWarehouse(scope)" v-if="scope.row.is_warehouse==1&&scope.row.is_sell==1">
            下架
          </el-button>
<!--          <el-button type="primary" size="mini" @click="handleCopy(scope)">-->
<!--            复制-->
<!--          </el-button>-->
          <el-button type="default" size="mini" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="info" size="mini" @click="handleDelete(scope)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getCar"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑车辆':'新增车辆'" width="80%" top="5px"
               style="min-height: 500px" @close="handleClose">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="carInfo">
          <el-form :model="carInfo" label-position="left" label-width="100px" style="width: 50%">
            <el-form-item label="品牌" required>
              <el-select v-model="carInfo.brand_id" clearable placeholder="请选择" @change="loadVehicle">
                <el-option
                  v-for="item in brandOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车系" required>
              <el-select v-model="carInfo.vehicle_id" clearable placeholder="请选择" @change="loadYears">
                <el-option
                  v-for="item in vehicleOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年款" required>
              <el-select v-model="carInfo.year_id" clearable placeholder="请选择" @change="loadModels">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="型号" required>
              <el-select v-model="carInfo.model_id" clearable placeholder="请选择" @change="change()">
                <el-option
                  v-for="item in modelOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input type="textarea" v-model="carInfo.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="轮播图" required>
              <Upload v-if="dialogVisible==true" v-model="carInfo.banner_ids" :pic_url="carInfo.banners"/>
              <p>建议图片宽度750，高度200-950</p>
            </el-form-item>

            <el-form-item label="价格" required>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input v-model="carInfo.price"></el-input>
                </el-col>
                <el-col :span="6">万元</el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="新车价" required>

              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input v-model="carInfo.new_price"></el-input>
                </el-col>
                <el-col :span="6">万元</el-col>
              </el-row>

            </el-form-item>
            <h5>车辆信息</h5>
            <el-form-item label="里表显示" required>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input v-model="carInfo.mileage"></el-input>
                </el-col>
                <el-col :span="6">万公里</el-col>
              </el-row>

            </el-form-item>
            <el-form-item label="上牌时间" required>
              <el-date-picker type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
                              v-model="carInfo.registration_at">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="变速箱" required>
              <el-select v-model="carInfo.transmission" clearable placeholder="请选择">
                <el-option key="1" label="自动" value="1"></el-option>
                <el-option key="2" label="手动" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排放标准" required>
              <el-select v-model="carInfo.emission_standard" clearable placeholder="请选择">
                <el-option key="1" label="国四" value="3"></el-option>
                <el-option key="1" label="国五" value="1"></el-option>
                <el-option key="2" label="国六" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="过户次数" required>
              <el-input v-model="carInfo.number_change"  oninput="carInfo.number_change=carInfo.number_change.replace(/[^\d]/g,'')" style="width: 50%"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐" style="margin-bottom: 30px;" required>
              <el-radio v-model="carInfo.is_up" :label="1">是</el-radio>
              <el-radio v-model="carInfo.is_up" :label="2">否</el-radio>
            </el-form-item>
          </el-form>
          <div style="text-align:right;">
            <el-button type="primary" @click="confirmCarInfo">保存</el-button>
            <el-button type="default" @click="goNext('carTest')">下一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="检测报告" name="carTest">
          <div style="text-align:right;">
            <el-form :model="carTest" label-position="left" label-width="100px" style="width: 50%">

              <el-form-item label="事故检测" style="margin-top: 30px;" required>
                <el-checkbox v-model="carTest.accident_test" :true-label="1" :false-label="2">已检测</el-checkbox>
              </el-form-item>
              <el-form-item label="机舱检测" style="margin-top: 30px;" required>
                <el-checkbox v-model="carTest.engine_test" :true-label="1" :false-label="2">已检测</el-checkbox>
              </el-form-item>
              <el-form-item label="底盘检测" style="margin-top: 30px;" required>
                <el-checkbox v-model="carTest.chassis_test" :true-label="1" :false-label="2">已检测</el-checkbox>
              </el-form-item>
              <el-form-item label="外部检测" style="margin-top: 30px;" required>
                <el-checkbox v-model="carTest.out_test" :true-label="1" :false-label="2">已检测</el-checkbox>
              </el-form-item>
              <el-form-item label="内部检测" style="margin-top: 30px;" required>
                <el-checkbox v-model="carTest.in_test" :true-label="1" :false-label="2">已检测</el-checkbox>
              </el-form-item>
              <el-form-item label="配置检测" style="margin-top: 30px;" required>
                <el-checkbox v-model="carTest.config_test" :true-label="1" :false-label="2">已检测</el-checkbox>
              </el-form-item>
              <el-form-item label="检测总结" required>
                <el-input type="textarea" v-model="carTest.conclusion"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="default" @click="goNext('carInfo')">上一步</el-button>
            <el-button type="primary" @click="confirmCarInfo">保存</el-button>
            <el-button type="default" @click="goNext('carUser')">下一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车主信息" name="carUser">
          <div style="text-align:right;">
            <el-form :model="carUser" label-position="left" label-width="100px" style="width: 50%">
              <el-form-item label="车主姓名" >
                <el-input v-model="carUser.owner_user"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" >
                <el-input v-model="carUser.owner_idcard"></el-input>
              </el-form-item>
              <el-form-item label="手机号" >
                <el-input v-model="carUser.owner_mobile"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="default" @click="goNext('carTest')">上一步</el-button>
            <el-button type="primary" @click="confirmCarInfo">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>

    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage3'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'
  import Qs from 'qs'
  import {
    getCars,
    addCar,
    updateCar,
    deleteCar,
    showCar
  } from '@/api/car'
  import {
    getCarBrands,
    getCarModels,
    getCarTest,
    getCarUser,
    getCarVehicles,
    getCarYears, sortCars, updateCarCopy, updateCarSell,
    updateCarTest, updateCarUser, updateCarWarehouse
  } from '../../api/car'

  const statusShow = {
    1: '已启用',
    2: '已停用'
  }
  const defaultCar = {}
  export default {
    components: { Pagination, Upload },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          '2': 'info',
          '1': 'success'
        }
        return statusMap[status]
      },
      statusShowFilter(status) {
        return statusShow[status]
      }
    },
    data() {
      return {
        carId: '',
        carInfo: {
          banners:[],
          number_change:Number,
        },
        carTest: {},
        carUser: {},
        activeTableName: 'carInfo',
        activeName: 'carInfo',
        brandOptions: [],
        vehicleOptions: [],
        yearOptions: [],
        modelOptions: [],
        carList: [],
        dialogVisible: false,
        dialogType: 'new',
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        }
      }
    },
    created() {
      this.getCar()
      this.getBrands()
    },
    methods: {
      cancelEdit(row) {
        row.sort = row.originalSort
        row.edit = false
        this.$message({
          message: '取消修改权重',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        sortCars(row.id, { sort: row.sort }).then(res => {
          row.edit = false
          row.originalSort = row.sort
          this.$message({
            message: '权重已修改',
            type: 'success'
          })
        })
      },
      handleClick(name) {
        this.getCar()
      },
      goNext(activeName) {
        // if (!this.carId) {
        //   this.$message.error('请先保存！')
        //   return false
        // }
        // this.getCarTest()
        // this.getCarUser()
        this.activeName = activeName

      },
      handleFilter() {
        this.listQuery.page = 1
        this.getCar()
      },
      async getBrands() {
        const res = await getCarBrands({ per_page: 100000 })
        this.brandOptions = res.data.items
      },

      async loadVehicle(value) {
        this.carInfo.vehicle_id=''
        this.carInfo.year_id=''
        this.carInfo.model_id=''
        const res = await getCarVehicles({ per_page: 100000, brand_id: value })
        this.vehicleOptions = res.data.items
      },
      change(){
        this.$forceUpdate()
      },
      async loadYears(value) {
        this.carInfo.year_id=''
        this.carInfo.model_id=''
        const res = await getCarYears({ per_page: 100000, vehicle_id: value })
        this.yearOptions = res.data.items
      },

      async loadModels(value) {
        this.carInfo.model_id=''
        const res = await getCarModels({ per_page: 100000, year_id: value })
        this.modelOptions = res.data.items
      },

      async getCar() {
        this.listLoading = true
        const res = await getCars(this.listQuery)
        const items= res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
        this.carList =  items.map(v => {
          this.$set(v, 'edit', false)
          v.originalSort = v.sort
          return v
        })
      },
      handleAddCar() {
        this.carInfo = {}
        this.carTest = {}
        this.carUser ={}
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleWarehouse(scope) {
        updateCarWarehouse(scope.row.id).then(res => {
          this.getCar()
        })
      },
      handleSell(scope) {
        updateCarSell(scope.row.id).then(res => {
          this.getCar()
        })
      },
      handleCopy(scope) {
        updateCarCopy(scope.row.id).then(res => {
          this.getCar()
        })
      },
      handleEdit(scope) {
        showCar(scope.row.id).then(res => {
          this.carInfo = res.data.car
          this.carId = res.data.car.id
          this.carInfo.banners=res.data.banner
          this.carTest=res.data.test
          this.carUser=res.data.user
          this.dialogType = 'edit'
          this.dialogVisible = true
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteCar({ ids: row.id })
            this.carList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async confirmCarInfo() {
        const isEdit = this.dialogType === 'edit'
        var car_test = Object.keys(this.carTest);
        if(car_test.length==0)
        {
          this.$message.error('请填写检测报告')
          return  false
        }
        const params = {
          brand_id: this.carInfo.brand_id,
          vehicle_id: this.carInfo.vehicle_id,
          year_id: this.carInfo.year_id,
          model_id: this.carInfo.model_id,
          subtitle: this.carInfo.subtitle,
          banner_ids: this.carInfo.banner_ids,
          price: this.carInfo.price,
          new_price: this.carInfo.new_price,
          mileage: this.carInfo.mileage,
          registration_at: this.carInfo.registration_at,
          transmission: this.carInfo.transmission,
          emission_standard: this.carInfo.emission_standard,
          number_change: Number(this.carInfo.number_change),
          is_up: this.carInfo.is_up,
          accident_test:this.carTest.accident_test,
          engine_test:this.carTest.engine_test,
          chassis_test:this.carTest.chassis_test,
          out_test:this.carTest.out_test,
          in_test:this.carTest.in_test,
          config_test:this.carTest.config_test,
          conclusion:this.carTest.conclusion,
          owner_user:this.carUser.owner_user,
          owner_mobile:this.carUser.owner_mobile,
          owner_idcard:this.carUser.owner_idcard,
        }
        if (isEdit) {
          this.carId = this.carInfo.id
          await updateCar(this.carId, params)
        } else {
          const res = await addCar(params)
          this.carId = res.data.id
        }
        this.dialogVisible=false
        this.getCar()
        this.$notify({
          title: 'Success',
          message: '操作成功！',
          type: 'success'
        })
      },
      async confirmCarTest() {
        updateCarTest(this.carTest).then(res => {
          if (res.code == 0) {
            this.$message.success('保存成功！')
          }
        })
      },
      async confirmCarUser() {
        updateCarUser(this.carUser).then(res => {
          if (res.code == 0) {
            this.$message.success('保存成功！')
          }
        })
        this.dialogVisible=false
      },

      handleClose() {
        this.carId = ''
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
