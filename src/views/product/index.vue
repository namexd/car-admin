<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" ref="filterForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label-width="60px" label="名称:" class="postInfo-container-item">
              <el-input v-model="listQuery.product_title" clearable placeholder="输入关键字" style="width: 50%">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              查询
            </el-button>
            <el-button v-waves class="filter-item" type="default" icon="el-icon-search"
                       @click="resetForm('filterForm')">
              清空查询条件
            </el-button>
          </el-col>
        </el-row>
        <el-button type="success" icon="el-icon-clear" @click="handleAddCar">
          添加标的
        </el-button>
      </el-form>
    </div>


    <el-table ref="dragTable" v-loading="listLoading" :data="productList" row-key="id" fit highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.product_title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="利率(%)">
        <template slot-scope="scope">
          {{ scope.row.product_yield }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="筹标时间(天)">
        <template slot-scope="scope">
          {{ scope.row.raise_days }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标的时间(天)">
        <template slot-scope="scope">
          {{scope.row.product_days }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布日期">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始日期">
        <template slot-scope="scope">
          {{ scope.row.product_start_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期日期">
        <template slot-scope="scope">
          {{ scope.row.product_end_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标的状态">
        <template slot-scope="scope">
          {{scope.row.status | statusShowFilter}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="新手标">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_new | statusFilter">
            {{scope.row.is_new ==1?'是':'否'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否显示">
        <template slot-scope="scope">
          <el-button :type="scope.row.is_show | statusFilter" @click="handleShow(scope.row.id)" size="mini">
            {{scope.row.is_show==1?'是':'否'}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="280px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="default" size="mini" @click="handleLog(scope)">购买记录</el-button>
          <el-button :disabled="scope.row.can_delete==1?false:true" type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getProduct"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑项目':'新增项目'" width="50%" top="5px"
               style="min-height: 500px" @close="handleClose">
      <el-form :model="productInfo" label-position="left" label-width="100px">

        <el-tabs v-model="activeName">
          <el-tab-pane label="基础资料" name="productInfo">
            <el-form-item label="项目名称" required>
              <el-input v-model="productInfo.product_title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input type="textarea" v-model="productInfo.product_subtitle"></el-input>
            </el-form-item>
            <el-form-item label="轮播图" required>
              <Upload v-if="dialogVisible" v-model="productInfo.banner_ids" :pic_url="productInfo.banner"/>
              <p>建议图片宽度750，高度200-950</p>
            </el-form-item>
            <el-form-item label="标的金额" required>
              <el-input v-model="productInfo.collect_money" :disabled="dialogType==='edit'?true:false"></el-input>
            </el-form-item>
            <el-form-item label="年化收益" required>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input v-model="productInfo.product_yield"></el-input>
                </el-col>
                <el-col :span="6">%</el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="筹标时间" required>
              <el-date-picker type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
                              v-model="productInfo.raise_start_at"
                              :disabled="dialogType==='edit'?true:false"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="筹标期限" required>

              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input v-model="productInfo.raise_days" :disabled="dialogType==='edit'?true:false"></el-input>
                </el-col>
                <el-col :span="6">天</el-col>
              </el-row>

            </el-form-item>
            <el-form-item label="标的天数" required>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input v-model="productInfo.product_days" :disabled="dialogType==='edit'?true:false"></el-input>
                </el-col>
                <el-col :span="6">天</el-col>
              </el-row>

            </el-form-item>
            <el-form-item label="起购金额" required>
              <el-select v-model="productInfo.least_money" clearable placeholder="请选择" :disabled="dialogType==='edit'?true:false">
                <el-option key="100" label="100" value="100"></el-option>
                <el-option key="1000" label="1000" value="1000"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="购买限制">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input v-model="productInfo.order_limit" value="0" :disabled="dialogType==='edit'?true:false"></el-input>
                </el-col>
                <el-col :span="6">默认0标识不限制</el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="是否新手标" style="margin-bottom: 30px;" required>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-radio v-model="productInfo.is_new" :label="1" :disabled="dialogType==='edit'?true:false">是</el-radio>
                  <el-radio v-model="productInfo.is_new" :label="2" :disabled="dialogType==='edit'?true:false">否</el-radio>
                </el-col>
                <el-col :span="6">新手标用户只能购买一次</el-col>
              </el-row>
            </el-form-item>
<!--            <el-form-item label="计息方式">-->
<!--              <el-checkbox v-model="productInfo.checked" :true-label="1" :false-label="2">满标计息</el-checkbox>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="还款方式">-->
<!--              <el-checkbox v-model="productInfo.checked" :true-label="1" :false-label="2">到期还本付息</el-checkbox>-->
<!--            </el-form-item>-->
            <el-form-item label="虚拟成团" style="margin-bottom: 30px;" required>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-radio v-model="productInfo.is_virtual" :label="1" :disabled="dialogType==='edit'?true:false">是</el-radio>
                  <el-radio v-model="productInfo.is_virtual" :label="2" :disabled="dialogType==='edit'?true:false">否</el-radio>
                </el-col>
                <el-col :span="12">开启虚拟成团后，在筹标期内人数不够的，系统会虚拟用户凑满人数，使标的成功。虚拟的用户不生成后台投资记录。</el-col>
              </el-row>

            </el-form-item>
            <el-form-item label="是否显示" style="margin-bottom: 30px;" required>
                  <el-radio v-model="productInfo.is_show" :label="1">是</el-radio>
                  <el-radio v-model="productInfo.is_show" :label="2">否</el-radio>
            </el-form-item>
            <div style="text-align:right;">
              <el-button type="default" @click="goNext('productContent')">下一步</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="标的详情" name="productContent">
            <div style="text-align:right;">
              <el-form-item>
                <Tinymce v-if="dialogVisible" v-model="productInfo.product_content" :height="400" width="80%"></Tinymce>
              </el-form-item>
              <el-button type="default" @click="goNext('productInfo')">上一步</el-button>
              <el-button type="default" @click="goNext('productUser')">下一步</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="车主信息" name="productUser">
            <div style="text-align:right;">
              <el-card v-for="product in productCars" style="margin-bottom: 5px">
                <el-form-item label="车主姓名" >
                  <el-input v-model="product.user_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" >
                  <el-input v-model="product.mobile"></el-input>
                </el-form-item>
                <el-form-item label="车辆信息" label-width="100px" >
                  <el-row :gutter="20">
                    <el-col :span="5">
                      <el-select v-model="product.car_brand_title" clearable placeholder="请选择"  @change="loadVehicle">
                        <el-option
                          v-for="item in brandOptions"
                          :key="item.id"
                          :label="item.title"
                          :value="item.title">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="5">
                      <el-select v-model="product.car_vehicle_title" clearable placeholder="请选择" @change="loadYears">
                        <el-option
                          v-for="item in vehicleOptions"
                          :key="item.id"
                          :label="item.title"
                          :value="item.title">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="5">
                      <el-select v-model="product.car_year_title" clearable placeholder="请选择" @change="loadModels">
                        <el-option
                          v-for="item in yearOptions"
                          :key="item.id"
                          :label="item.title"
                          :value="item.title">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="5">
                      <el-select v-model="product.car_model_title" clearable placeholder="请选择">
                        <el-option
                          v-for="item in modelOptions"
                          :key="item.id"
                          :label="item.title"
                          :value="item.title">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-card>
              <div style="margin: 5px;text-align: left">
                <el-button type="danger" @click="addUser()">继续添加车主</el-button>
              </div>
              <el-button type="default" @click="goNext('productContent')">上一步</el-button>
              <el-button type="primary" @click="confirmCarInfo">保存</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage3'
  import waves from '@/directive/waves' // waves directive
  import Tinymce from '@/components/Tinymce'

  import Pagination from '@/components/Pagination'
  import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    showProduct
  } from '@/api/product'
  import {
    getCarBrands,
    getCarModels,
    getCarVehicles,
    getCarYears
  } from '../../api/car'
  import { deepClone } from '../../utils'
  import { productShow } from '../../api/product'

  const statusShow = {
    1: '即将开始',
    2: '疯抢中',
    3: '已满额',
    4: '回款中',
    5: '已还款',
    6: '流标'
  }
  const defaultCar = {}
  const defaultProductCar ={
    user_name: '',
    mobile: '',
    car_brand_title: '',
    car_vehicle_title: '',
    car_year_title: '',
    car_model_title: ''
  }
  export default {
    components: { Pagination, Upload, Tinymce },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          '2': 'danger',
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
        productId: '',
        productInfo: {},
        productCars: [],
        productContent: {},
        productUser: {},
        activeTableName: 'productInfo',
        activeName: 'productInfo',
        brandOptions: [],
        vehicleOptions: [],
        yearOptions: [],
        modelOptions: [],
        productList: [],
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
      this.getProduct()
      this.getBrands()
    },
    methods: {
      handleShow(id){
        productShow(id).then(res=>{
          this.getProduct()
        })
      },
      addUser() {
        this.productCars.push(defaultProductCar)
      },
      goNext(activeName) {
        this.activeName = activeName
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getProduct()
      },
      async getBrands() {
        const res = await getCarBrands({ per_page: 100000 })
        this.brandOptions = res.data.items
      },
      async loadVehicle(value) {
        const brand_id = this.brandOptions.find((n) => n.title == value).id
        const res = await getCarVehicles({ per_page: 100000, brand_id: brand_id })
        this.vehicleOptions = res.data.items
      },

      async loadYears(value) {
        const vehicle_id = this.vehicleOptions.find((n) => n.title == value).id
        const res = await getCarYears({ per_page: 100000, vehicle_id: vehicle_id })
        this.yearOptions = res.data.items
      },

      async loadModels(value) {
        const year_id = this.yearOptions.find((n) => n.title == value).id
        const res = await getCarModels({ per_page: 100000, year_id: year_id })
        this.modelOptions = res.data.items
      },
      async getProduct() {
        this.listLoading = true
        const res = await getProducts(this.listQuery)
        this.productList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },

      handleAddCar() {
        this.productInfo = {}
        this.productCars = []
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        showProduct(scope.row.id).then(res => {
          this.productInfo = res.data.product
          this.productInfo.banner= res.data.banner
          res.data.cars.forEach((i)=>{
            this.productCars.push({
              user_name: i.user_name,
              mobile: i.mobile,
              car_brand_title: i.car_brand_title,
              car_vehicle_title: i.car_vehicle_title,
              car_year_title: i.car_year_title,
              car_model_title:i.car_model_title
            })
          })
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
            await deleteProduct(row.id)
            this.productList.splice($index, 1)
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
        if (isEdit) {
          const params = {
            product_title: this.productInfo.product_title,
            product_subtitle: this.productInfo.product_subtitle,
            banner_ids: this.productInfo.banner_ids,
            collect_money: this.productInfo.collect_money,
            product_yield: this.productInfo.product_yield,
            raise_start_at: this.productInfo.raise_start_at,
            raise_days: this.productInfo.raise_days,
            product_days: this.productInfo.product_days,
            least_money: this.productInfo.least_money,
            order_limit: this.productInfo.order_limit,
            is_new: this.productInfo.is_new,
            is_virtual: this.productInfo.is_virtual,
            product_content: this.productInfo.product_content,
            product_cars: JSON.stringify(this.productCars)
          }
          await updateProduct(this.productInfo.id, params)
        } else {
          this.productInfo.product_cars=JSON.stringify(this.productCars)
           await addProduct(this.productInfo)
        }
        this.getProduct()
        this.dialogVisible=false
        this.$notify({
          title: 'Success',
          message: '操作成功！',
          type: 'success'
        })
      },
      handleClose() {
        this.productCars = []
        console.log(this.productCars )
      },
      resetForm() {
        this.product_title = ''
      },
      handleLog(scope){
        this.$router.push({name:'MoneyOrder',query:{product_id:scope.row.id}})
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
