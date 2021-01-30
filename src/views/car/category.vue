<template>
  <div class="custom-tree-container app-container">
    <el-button @click="dialogShow('dialog_Brand')">添加品牌</el-button>
    <div class="block" style="margin-top: 30px;">
      <el-tree ref="tree" :data="listData" node-key="tree_key"   :expand-on-click-node="false" lazy :load="treeLoad"
               @node-drop="handleDrop"
               draggable
               :allow-drop="allowDrop"
               :allow-drag="allowDrag"

      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <icon style="padding-right: 10px" class="el-icon-sort" v-if=" node.level === 2"> </icon>
          <span>{{ data.title }}</span>
          <span>
            <el-button type="text" size="mini" style="margin-left: 20px;color: red;" @click="dialogShow(data.key, data)">
              {{data.btnText}}
            </el-button>
			 <el-button v-if="data.formKey != 'year_id' && node.level === 4" type="text" size="mini" style="margin-left: 20px;color: red;"
                  @click="editDialogShow(node, data, 1)">
              编辑名称
            </el-button>
            <el-button v-if="data.formKey != 'year_id'" type="text" size="mini" style="margin-left: 20px;color: red;"
                       @click="editDialogShow(node, data)">
              {{node.level === 4?'编辑参数':'编辑'}}
            </el-button>
            <el-button type="text" size="mini" style="margin-left: 20px;color: red;" @click="deleteHandle(node, data.id)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 添加弹出层 -->
    <el-dialog :title="type == 1 ? '添加品牌' : '编辑品牌'" :visible.sync="dialog_Brand" :show-close="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="品牌名称">
          <el-input v-model="form.title" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="车标logo">
          <el-upload class="avatar-uploader" :show-file-list="false" action="Fake Action" :http-request="httpRequest">
            <img v-if="imageUrl" :src="imageUrl" class="avatar line">
            <i v-else class="el-icon-plus avatar-uploader-icon line"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_Brand = false">取 消</el-button>
        <el-button type="primary" @click="submitBrand">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="type == 1 ? '添加车系' : '编辑车系'" :visible.sync="dialog_Series" :show-close="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="车系名称">
          <el-input v-model="form.title" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="车系logo">
          <el-upload class="avatar-uploader" :show-file-list="false" action="Fake Action" :http-request="httpRequest">
            <img v-if="imageUrl" :src="imageUrl" class="avatar line">
            <i v-else class="el-icon-plus avatar-uploader-icon line"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_Series = false">取 消</el-button>
        <el-button type="primary" @click="submitSeries">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="type == 1 ? '添加年款' : '编辑年款'" :visible.sync="dialog_Age" :show-close="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="年款名称">
          <el-input v-model="form.title" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_Age = false">取 消</el-button>
        <el-button type="primary" @click="submitAge">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加型号" :visible.sync="dialog_Model" :show-close="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="型号名称">
          <el-input v-model="form.title" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_Model = false">取 消</el-button>
        <el-button type="primary" @click="submitModel">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑名称" :visible.sync="dialog_name" :show-close="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.title" autocomplete="off" placeholder="单行输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_name = false">取 消</el-button>
        <el-button type="primary" @click="submitName">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCarBrands,
    addCarBrand,
    updateCarBrand,
    deleteCarBrand,
    getCarVehicles,
    addCarVehicle,
    updateCarVehicle,
    deleteCarVehicle,
    getCarYears,
    addCarYear,
    deleteCarYear,
    getCarModels,
    addCarModel,
    deleteCarModel, updateCarModelName, sortCarVehicle
  } from '../../api/car'
  import {
    uploadFile
  } from "../../api/upload"

  export default {
    data() {
      return {
        dialog_Brand: false, //品牌弹窗的显隐
        dialog_Series: false, //车系弹窗的显隐
        dialog_Age: false, //年份弹窗的显隐
        dialog_Model: false, //型号弹窗的显隐
        dialog_name: false,
        form: {
          title: ""
        }, //双向绑定的表单数据
        imageUrl: '', //上传logo做展示的图片
        listData: [], //品牌列表数据源
        opId: null, //当前选中操作的id
        opData: {},
        type: 1, //判断是新增还是修改 1：新增 2：编辑
        parent_id: null, //获取上一级id
      }
    },
    created() {
      this.getBrand();
    },
    methods: {
      handleDrop(draggingNode, dropNode, dropType, ev) {
        const step=Math.abs(Number(draggingNode.id)-Number(dropNode.id))
        const params={
          is_up:dropType=='before'?1:2,
          step:step
        }
        const vehicle_id=draggingNode.data.id
        sortCarVehicle(vehicle_id,params).then(res=>{
          if (res.code==0){
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }
        })
      },
      allowDrop(draggingNode, dropNode, type) {
        return (dropNode.level==2)&&(type !== 'inner')
      },
      allowDrag(draggingNode) {
        return draggingNode.level === 2;
      },

      // 删除
      deleteHandle(node, id) {
        if (node.level === 1) {
          this.removeHandle(id, deleteCarBrand, node);
        }
        if (node.level === 2) {
          this.removeHandle(id, deleteCarVehicle, node);
        }
        if (node.level === 3) {
          this.removeHandle(id, deleteCarYear, node);
        }
        if (node.level === 4) {
          this.removeHandle(id, deleteCarModel, node);
        }
      },
      // 删除
      removeHandle(id, methods, node) {
        this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          methods({
            ids: id
          }).then((res) => {
            this.$refs.tree.remove(node.data.tree_key);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() => {

        });
      },
      // 点击弹出层添加
      dialogShow(key, data) {
        this.form={}
        this.imageUrl=''
        this.type = 1;
        this[key] = true;
        if (data) {
          if (data.formKey) {
            this.form[data.formKey] = data.id;
            this.opId = data.tree_key;
            this.opData = data;
          }
        }
      },
      // 点击弹出层修改
      editDialogShow(node, data, type) {
        if (node.parent) {
          this.parent_id = node.parent.data.id;
        }
        this.type = 2;
        if (node.level === 1) {
          this.dialog_Brand = true;
        }
        if (node.level === 2) {
          this.dialog_Series = true;
        }
        if (node.level === 3) {
          this.dialog_Age = true;
        }
        if (node.level === 4) {
          if(type == 1){
            this.dialog_name = true;
          }else{
            this.$router.push('/car/editInfo?id='+data.id);
            return false;
          }
        }
        if (data) {
          this.form["title"] = data.title;
          if (data.icon_id) {
            this.form["icon_id"] = data.icon_id;
          }
          if (data.icon_url) {
            this.imageUrl =data.icon_url;
          }
          if (data.formKey) {
            this.form[data.formKey] = data.id;
          }
          this.opId = data.tree_key;
          this.opData = data;
        }
      },
      // 上传品牌logo
      httpRequest(file) {
        let formData = new FormData();
        formData.append("file", file.file);
        uploadFile(formData).then((res) => {
          this.form["icon_id"] = res.data.file_id;
          this.imageUrl =res.data.file_url;
        });
      },
      // 保存品牌
      submitBrand() {
        if (!this.form.title || this.form.title.trim().length == 0) {
          this.$message.error('请填写品牌名称');
          return false;
        }
        if (!this.form.icon_id) {
          this.$message.error('请上传品牌Logo');
          return false;
        }
        if (this.type == 1) {
          addCarBrand(this.form).then((res) => {
            this.listData.push({
              title: this.form.title,
              id: res.data.id,
              btnText: "添加车系",
              key: "dialog_Series",
              formKey: "brand_id",
              tree_key: "brand_id" + res.data.id
            });
            this.form = {
              title: ""
            };
            this.imageUrl = "";
            this.dialog_Brand = false;
            this.$message({
              type: 'success',
              message: '新增品牌成功!'
            });
          });
        } else {
          updateCarBrand(this.form.brand_id, this.form).then((res) => {
            this.opData.title = this.form.title;
            this.form = {
              title: ""
            };
            this.$message({
              type: 'success',
              message: '编辑品牌成功!'
            });
            this.dialog_Brand = false;
          });
        }
      },
      // 保存车系
      submitSeries() {
        if (!this.form.title || this.form.title.trim().length == 0) {
          this.$message.error('请填写车系名称');
          return false;
        }
        if (this.type == 1) {
          addCarVehicle(this.form).then((res) => {
            if (this.opData) {
              if (!this.opData.children) {
                this.$set(this.opData, 'children', []);
              }
              this.opData.children.push({
                title: this.form.title,
                id: res.data.id,
                btnText: "添加年款",
                key: "dialog_Age",
                formKey: "vehicle_id",
                tree_key: "vehicle_id" + res.data.id
              });
            }
            this.form = {
              title: ""
            };
            this.imageUrl2 = "";
            this.dialog_Series = false;
            this.$message({
              type: 'success',
              message: '新增车系成功!'
            });
            // this.$refs.tree.store.nodesMap[this.opId].expanded = true;
          });
        } else {
          this.form["brand_id"] = this.parent_id;
          updateCarVehicle(this.form.vehicle_id, this.form).then((res) => {
            this.opData.title = this.form.title;
            this.form = {
              title: ""
            };
            this.dialog_Series = false;
            // this.$refs.tree.store.nodesMap[this.opId].expanded = true;
            this.$message({
              type: 'success',
              message: '编辑车系成功!'
            });
          });
        }
      },
      // 保存年款
      submitAge() {
        if (!this.form.title || this.form.title.trim().length == 0) {
          this.$message.error('请填写年款名称');
          return false;
        }
        addCarYear(this.form).then((res) => {
          if (this.opData) {
            if (!this.opData.children) {
              this.$set(this.opData, 'children', []);
            }
            this.opData.children.push({
              title: this.form.title,
              id: res.data.id,
              btnText: "添加型号",
              key: "dialog_Model",
              formKey: "year_id",
              tree_key: "year_id" + res.data.id
            });
          }
          this.form = {
            title: ""
          };
          this.dialog_Age = false;
          this.$message({
            type: 'success',
            message: '新增年款成功!'
          });
          // this.$refs.tree.store.nodesMap[this.opId].expanded = true;
        });
      },
      // 保存型号
      submitModel() {
        if (!this.form.title || this.form.title.trim().length == 0) {
          this.$message.error('请填写型号名称');
          return false;
        }
        addCarModel(this.form).then((res) => {
          if (this.opData) {
            if (!this.opData.children) {
              this.$set(this.opData, 'children', []);
            }
            this.opData.children.push({
              title: this.form.title,
              id: res.data.id,
              btnText: "编辑型号",
              key: "dialog_Model",
              formKey: "models_id",
              tree_key: "models_id" + res.data.id
            });
          }
          this.form = {
            title: ""
          };
          this.dialog_Model = false;
          this.$message({
            type: 'success',
            message: '新增型号成功!'
          });
          // this.$refs.tree.store.nodesMap[this.opId].expanded = true;
          this.$message({
            type: 'success',
            message: '编辑年款成功!'
          });
        });
      },
      // 保存名称修改
      submitName() {
        if (!this.form.title || this.form.title.trim().length == 0) {
          this.$message.error('请填写名称');
          return false;
        }
        updateCarModelName(this.form.models_id, this.form).then((res) => {
          this.opData.title = this.form.title;
          this.form = {
            title: ""
          };
          this.dialog_name = false;
          this.$message({
            type: 'success',
            message: '编辑名称成功!'
          });
        });
      },
      // 懒加载节点展开时
      treeLoad(node, resolve) {
        if (node.level === 0 || node.level === 4) {
          return resolve([]);
        }
        if (node.level === 1) {
          return this.getCarVehicleData(node.data, resolve);
        }
        if (node.level === 2) {
          return this.getCarYearsData(node.data, resolve);
        }
        if (node.level === 3) {
          return this.getCarModelsData(node.data, resolve);
        }
      },
      // 获取品牌
      getBrand() {
        const that = this;
        getCarBrands({per_page: 100000}).then((res) => {
          let data = res.data.items;
          this.setData(data);
          that.listData = res.data.items;
        });
      },
      // 递归设置值
      setData(child) {
        if (child) {
          child.forEach((item) => {
            item["btnText"] = "添加车系";
            item["key"] = "dialog_Series";
            item["formKey"] = "brand_id";
            item["tree_key"] = "brand_id" + item.id;
            item["children"] = [];
            if (item.children) {
              this.setData(item.children);
            }
          });
        }
      },
      // 获取车系
      getCarVehicleData(data, resolve) {
        getCarVehicles({
          brand_id: data.id,
        per_page: 100000
        }).then((res) => {
          let items = res.data.items;
          if (items && items.length > 0) {
            items.forEach((item) => {
              item["btnText"] = "添加年款";
              item["key"] = "dialog_Age";
              item["formKey"] = "vehicle_id";
              item["tree_key"] = "vehicle_id" + item.id;
              item["children"] = [];
            });
          }
          this.$refs['tree'].updateKeyChildren(data.tree_key, items);
          resolve(res.data.items);
        })
      },
      // 获取年款
      getCarYearsData(data, resolve) {
        getCarYears({
          vehicle_id: data.id,
          per_page: 100000
        }).then((res) => {
          let items = res.data.items;
          if (items && items.length > 0) {
            items.forEach((item) => {
              item["btnText"] = "添加型号";
              item["key"] = "dialog_Model";
              item["formKey"] = "year_id";
              item["tree_key"] = "year_id" + item.id;
              item["children"] = [];
            });
          }
          this.$refs['tree'].updateKeyChildren(data.tree_key, items);
          resolve(res.data.items);
        })
      },
      // 获取型号
      getCarModelsData(data, resolve) {
        getCarModels({
          year_id: data.id,
          per_page: 100000
        }).then((res) => {
          let items = res.data.items;
          if (items && items.length > 0) {
            items.forEach((item) => {
              // item["btnText"] = "编辑参数";
              item["formKey"] = "models_id";
              item["tree_key"] = "models_id" + item.id;
            });
          }
          this.$refs['tree'].updateKeyChildren(data.tree_key, items);
          resolve(res.data.items);
        })
      },
    }
  };
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .custom-tree-node {
    display: inline-block !important;
  }

  .line {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    line-height: 178px;
    display: block;
  }
</style>
