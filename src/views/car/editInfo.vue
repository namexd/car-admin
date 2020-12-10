<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本参数" name="1">
        <el-form ref="form" label-width="200px" style="max-width: 500px;margin-top: 40px;">
          <el-form-item :label="item.name" v-for="(item, index) in tabData1" :key="index">
            <el-input v-model="item.value" placeholder="单行输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('tabData1', 'base_param')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="发动机参数" name="2">
        <el-form ref="form" label-width="200px" style="max-width: 500px;margin-top: 40px;">
          <el-form-item :label="item.name" v-for="(item, index) in tabData2" :key="index">
            <el-input v-if="!item.options" v-model="item.value" placeholder="单行输入"></el-input>
            <el-select v-else v-model="item.value" placeholder="请选择" style="width: 100%">
              <el-option v-for="(res, idx) in item.options" :key="idx" :label="res.name" :value="res.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('tabData2', 'engine_param')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="底盘及制动" name="3">
        <el-form ref="form" label-width="200px" style="max-width: 500px;margin-top: 40px;">
          <el-form-item :label="item.name" v-for="(item, index) in tabData3" :key="index">
            <el-input v-model="item.value" placeholder="单行输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('tabData3', 'chassis_param')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="安全配置" name="4">
        <el-form ref="form" label-width="200px" style="max-width: 500px;margin-top: 40px;">
          <el-form-item :label="item.name" v-for="(item, index) in tabData4" :key="index">
            <el-select v-model="item.value" placeholder="请选择" style="width: 100%">
              <el-option label="标配" value="标配"></el-option>
              <el-option label="-" value="-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('tabData4', 'safe_param')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="外部配置" name="5">
        <el-form ref="form" label-width="200px" style="max-width: 500px;margin-top: 40px;">
          <el-form-item :label="item.name" v-for="(item, index) in tabData5" :key="index">
            <el-select v-model="item.value" placeholder="请选择" style="width: 100%">
              <el-option label="标配" value="标配"></el-option>
              <el-option label="-" value="-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('tabData5', 'out_param')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="内部配置" name="6">
        <el-form ref="form" label-width="200px" style="max-width: 500px;margin-top: 40px;">
          <el-form-item :label="item.name" v-for="(item, index) in tabData6" :key="index">
            <el-select v-model="item.value" placeholder="请选择" style="width: 100%">
              <el-option label="标配" value="标配"></el-option>
              <el-option label="-" value="-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('tabData6', 'in_param')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    showCarModel,
    updateCarModel
  } from "../../api/car"

  export default {
    data() {
      return {
        activeName: '1',
        formData: {
          base_param: [],
          engine_param: [],
          chassis_param: [],
          safe_param: [],
          out_param: [],
          in_param: []
        },
        tabData1: [{
          name: "厂商",
          value: "",
          key: "t1_key1"
        }, {
          name: "级别",
          value: "",
          key: "t1_key2"
        }, {
          name: "发动机",
          value: "",
          key: "t1_key3"
        }, {
          name: "变速箱",
          value: "",
          key: "t1_key4"
        }, {
          name: "车身结构",
          value: "",
          key: "t1_key5"
        }, {
          name: "长/宽/高mm",
          value: "",
          key: "t1_key6"
        }, {
          name: "轴距（mm）",
          value: "",
          key: "t1_key7"
        }, {
          name: "行李箱容积（L）",
          value: "",
          key: "t1_key8"
        }, {
          name: "整备质量（kg）",
          value: "",
          key: "t1_key9"
        }],
        tabData2: [{
          name: "排量（L）",
          value: "",
          key: "t2_key1"
        }, {
          name: "进气形式",
          value: "",
          key: "t2_key2"
        }, {
          name: "气缸数",
          value: "",
          key: "t2_key3"
        }, {
          name: "最大马力（Ps）",
          value: "",
          key: "t2_key4"
        }, {
          name: "最大扭矩（N*m）",
          value: "",
          key: "t2_key5"
        }, {
          name: "燃料类型",
          value: "",
          key: "t2_key6",
          options: [{
            name: "汽油"
          }, {
            name: "柴油"
          }]
        }, {
          name: "燃油标号",
          value: "",
          key: "t2_key7"
        }, {
          name: "供油方式",
          value: "",
          key: "t2_key8"
        }, {
          name: "排放标准",
          value: "",
          key: "t2_key9"
        }],
        tabData3: [{
          name: "驱动方式",
          value: "",
          key: "t3_key1"
        }, {
          name: "助力类型",
          value: "",
          key: "t3_key2"
        }, {
          name: "前悬挂类型",
          value: "",
          key: "t3_key3"
        }, {
          name: "后悬挂类型",
          value: "",
          key: "t3_key4"
        }, {
          name: "前制动类型",
          value: "",
          key: "t3_key5"
        }, {
          name: "后制动类型",
          value: "",
          key: "t3_key6"
        }, {
          name: "驱车制动类型",
          value: "",
          key: "t3_key7"
        }, {
          name: "前轮胎规格",
          value: "",
          key: "t3_key8"
        }, {
          name: "后轮胎规格",
          value: "",
          key: "t3_key9"
        }],
        tabData4: [{
          name: "主/副驾驶安全气囊",
          value: "",
          key: "t4_key1"
        }, {
          name: "前/后排侧气囊",
          value: "",
          key: "t4_key2"
        }, {
          name: "前/后排头部气囊",
          value: "",
          key: "t4_key3"
        }, {
          name: "胎压检测",
          value: "",
          key: "t4_key4"
        }, {
          name: "车内中控锁",
          value: "",
          key: "t4_key5"
        }, {
          name: "儿童座椅接口",
          value: "",
          key: "t4_key6"
        }, {
          name: "无钥匙启动",
          value: "",
          key: "t4_key7"
        }, {
          name: "防抱死系统（ABS）",
          value: "",
          key: "t4_key8"
        }, {
          name: "车身稳定控制（ESP）",
          value: "",
          key: "t4_key9"
        }],
        tabData5: [{
          name: "电动天窗",
          value: "",
          key: "t5_key1"
        }, {
          name: "全景天窗",
          value: "",
          key: "t5_key2"
        }, {
          name: "电动吸合门",
          value: "",
          key: "t5_key3"
        }, {
          name: "感应后备箱",
          value: "",
          key: "t5_key4"
        }, {
          name: "感应雨刷",
          value: "",
          key: "t5_key5"
        }, {
          name: "后雨刷",
          value: "",
          key: "t5_key6"
        }, {
          name: "前/后电动车窗",
          value: "",
          key: "t5_key7"
        }, {
          name: "后视镜加热",
          value: "",
          key: "t5_key8"
        }],
        tabData6: [{
          name: "多功能方向盘",
          value: "",
          key: "t6_key1"
        }, {
          name: "定速巡航",
          value: "",
          key: "t6_key2"
        }, {
          name: "后排独立空调",
          value: "",
          key: "t6_key3"
        }, {
          name: "空调控制方式",
          value: "",
          key: "t6_key4"
        }, {
          name: "GPS导航",
          value: "",
          key: "t6_key5"
        }, {
          name: "倒车雷达",
          value: "",
          key: "t6_key6"
        }, {
          name: "倒车影像系统",
          value: "",
          key: "t6_key7"
        }, {
          name: "真皮座椅",
          value: "",
          key: "t6_key8"
        }, {
          name: "前/后排座椅加热",
          value: "",
          key: "t6_key9"
        }],
        opId: null
      }
    },
    created() {
      this.opId = this.$route.query.id;
      this.getData();
    },
    methods: {
      onSubmit(dataKey, formKey) {
        this.formData[formKey] = JSON.stringify(this[dataKey]);
        updateCarModel(this.opId, this.formData).then((res) => {
          this.$message.success("保存成功");
        });
      },
      getData() {
        showCarModel(this.opId).then((res) => {
          const extra = res.data.extra;
          if (extra.base_param) {
            this.tabData1 = JSON.parse(extra.base_param);
          }
          if (extra.engine_param) {
            this.tabData2 = JSON.parse(extra.engine_param);
          }
          if (extra.chassis_param) {
            this.tabData3 = JSON.parse(extra.chassis_param);
          }
          if (extra.safe_param) {
            this.tabData4 = JSON.parse(extra.safe_param);
          }
          if (extra.out_param) {
            this.tabData5 = JSON.parse(extra.out_param);
          }
          if (extra.in_param) {
            this.tabData6 = JSON.parse(extra.in_param);
          }
        });
      }
    }
  };
</script>

<style scoped>
</style>
