(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-efda237e"],{"130c":function(t,e,i){"use strict";i("cf2f")},"66b4":function(t,e,i){"use strict";i.d(e,"r",(function(){return r})),i.d(e,"u",(function(){return n})),i.d(e,"z",(function(){return o})),i.d(e,"A",(function(){return l})),i.d(e,"a",(function(){return d})),i.d(e,"s",(function(){return c})),i.d(e,"g",(function(){return s})),i.d(e,"l",(function(){return u})),i.d(e,"v",(function(){return f})),i.d(e,"b",(function(){return m})),i.d(e,"h",(function(){return h})),i.d(e,"m",(function(){return p})),i.d(e,"x",(function(){return g})),i.d(e,"c",(function(){return b})),i.d(e,"t",(function(){return _})),i.d(e,"i",(function(){return v})),i.d(e,"q",(function(){return y})),i.d(e,"f",(function(){return k})),i.d(e,"k",(function(){return j})),i.d(e,"p",(function(){return O})),i.d(e,"B",(function(){return D})),i.d(e,"e",(function(){return x})),i.d(e,"j",(function(){return $})),i.d(e,"n",(function(){return w})),i.d(e,"y",(function(){return S})),i.d(e,"w",(function(){return C})),i.d(e,"d",(function(){return B})),i.d(e,"o",(function(){return K}));var a=i("b775");function r(t){return Object(a["a"])({url:"/admin/car",method:"get",params:t})}function n(t,e){return Object(a["a"])({url:"/admin/car/".concat(t),method:"put",data:e})}function o(t){return Object(a["a"])({url:"/admin/car-test",method:"put",data:t})}function l(t){return Object(a["a"])({url:"/admin/car-user",method:"put",data:t})}function d(t){return Object(a["a"])({url:"/admin/car",method:"post",data:t})}function c(t){return Object(a["a"])({url:"/admin/car/".concat(t),method:"get"})}function s(t){return Object(a["a"])({url:"/admin/car",method:"delete",data:t})}function u(t){return Object(a["a"])({url:"/admin/car-brand",method:"get",params:t})}function f(t,e){return Object(a["a"])({url:"/admin/car-brand/".concat(t),method:"put",data:e})}function m(t){return Object(a["a"])({url:"/admin/car-brand",method:"post",data:t})}function h(t){return Object(a["a"])({url:"/admin/car-brand",method:"delete",data:t})}function p(t){return Object(a["a"])({url:"/admin/car-model",method:"get",params:t})}function g(t,e){return Object(a["a"])({url:"/admin/car-model/".concat(t),method:"put",data:e})}function b(t){return Object(a["a"])({url:"/admin/car-model",method:"post",data:t})}function _(t){return Object(a["a"])({url:"/admin/car-model/".concat(t),method:"get"})}function v(t){return Object(a["a"])({url:"/admin/car-model",method:"delete",data:t})}function y(t){return Object(a["a"])({url:"/admin/car-year",method:"get",params:t})}function k(t){return Object(a["a"])({url:"/admin/car-year",method:"post",data:t})}function j(t){return Object(a["a"])({url:"/admin/car-year",method:"delete",data:t})}function O(t){return Object(a["a"])({url:"/admin/car-vehicle",method:"get",params:t})}function D(t,e){return Object(a["a"])({url:"/admin/car-vehicle/".concat(t),method:"put",data:e})}function x(t){return Object(a["a"])({url:"/admin/car-vehicle",method:"post",data:t})}function $(t){return Object(a["a"])({url:"/admin/car-vehicle",method:"delete",data:t})}function w(t){return Object(a["a"])({url:"/admin/car-sell",method:"get",params:t})}function S(t){return Object(a["a"])({url:"/admin/car/".concat(t,"/sell"),method:"put"})}function C(t){return Object(a["a"])({url:"/admin/car/".concat(t,"/copy"),method:"put"})}function B(t){return Object(a["a"])({url:"/admin/car-sell-log",method:"post",data:t})}function K(t){return Object(a["a"])({url:"/admin/car-sell-log",method:"get",params:t})}},"91b6":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var a=i("b775");function r(t){return Object(a["a"])({url:"/admin/file",method:"post",param:t,headers:{"Content-Type":"multipart/form-data"},transformRequest:[function(){return t}]})}},cf2f:function(t,e,i){},e269:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"custom-tree-container app-container"},[i("el-button",{on:{click:function(e){return t.dialogShow("dialog_Brand")}}},[t._v("添加品牌")]),i("div",{staticClass:"block",staticStyle:{"margin-top":"30px"}},[i("el-tree",{ref:"tree",attrs:{data:t.listData,"node-key":"tree_key","expand-on-click-node":!1,lazy:"",load:t.treeLoad},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.node,r=e.data;return i("span",{staticClass:"custom-tree-node"},[i("span",[t._v(t._s(r.title))]),i("span",[i("el-button",{staticStyle:{"margin-left":"20px",color:"red"},attrs:{type:"text",size:"mini"},on:{click:function(e){return t.dialogShow(r.key,r)}}},[t._v(" "+t._s(r.btnText)+" ")]),"year_id"!=r.formKey?i("el-button",{staticStyle:{"margin-left":"20px",color:"red"},attrs:{type:"text",size:"mini"},on:{click:function(e){return t.editDialogShow(a,r)}}},[t._v(" "+t._s(4===a.level?"编辑参数":"编辑")+" ")]):t._e(),i("el-button",{staticStyle:{"margin-left":"20px",color:"red"},attrs:{type:"text",size:"mini"},on:{click:function(e){return t.deleteHandle(a,r.id)}}},[t._v(" 删除 ")])],1)])}}])})],1),i("el-dialog",{attrs:{title:1==t.type?"添加品牌":"编辑品牌",visible:t.dialog_Brand,"show-close":!1},on:{"update:visible":function(e){t.dialog_Brand=e}}},[i("el-form",{attrs:{model:t.form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"品牌名称"}},[i("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),i("el-form-item",{attrs:{label:"车标logo"}},[i("el-upload",{staticClass:"avatar-uploader",attrs:{"show-file-list":!1,action:"Fake Action","http-request":t.httpRequest}},[t.imageUrl?i("img",{staticClass:"avatar line",attrs:{src:t.imageUrl}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon line"})])],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialog_Brand=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.submitBrand}},[t._v("提 交")])],1)],1),i("el-dialog",{attrs:{title:1==t.type?"添加车系":"编辑车系",visible:t.dialog_Series,"show-close":!1},on:{"update:visible":function(e){t.dialog_Series=e}}},[i("el-form",{attrs:{model:t.form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"车系名称"}},[i("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialog_Series=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.submitSeries}},[t._v("提 交")])],1)],1),i("el-dialog",{attrs:{title:1==t.type?"添加年款":"编辑年款",visible:t.dialog_Age,"show-close":!1},on:{"update:visible":function(e){t.dialog_Age=e}}},[i("el-form",{attrs:{model:t.form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"年款名称"}},[i("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialog_Age=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.submitAge}},[t._v("提 交")])],1)],1),i("el-dialog",{attrs:{title:"添加型号",visible:t.dialog_Model,"show-close":!1},on:{"update:visible":function(e){t.dialog_Model=e}}},[i("el-form",{attrs:{model:t.form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"型号名称"}},[i("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialog_Model=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.submitModel}},[t._v("提 交")])],1)],1)],1)},r=[],n=(i("4160"),i("498a"),i("159b"),i("66b4")),o=i("91b6"),l={data:function(){return{dialog_Brand:!1,dialog_Series:!1,dialog_Age:!1,dialog_Model:!1,form:{title:""},imageUrl:"",listData:[],opId:null,opData:{},type:1,parent_id:null}},created:function(){this.getBrand()},methods:{deleteHandle:function(t,e){1===t.level&&this.removeHandle(e,n["h"],t),2===t.level&&this.removeHandle(e,n["j"],t),3===t.level&&this.removeHandle(e,n["k"],t),4===t.level&&this.removeHandle(e,n["i"],t)},removeHandle:function(t,e,i){var a=this;this.$confirm("此操作将永久删除该项, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e({ids:t}).then((function(t){a.$refs.tree.remove(i.data.tree_key),a.$message({type:"success",message:"删除成功!"})}))})).catch((function(){}))},dialogShow:function(t,e){this.type=1,this[t]=!0,e&&(e.formKey&&(this.form[e.formKey]=e.id),this.opId=e.tree_key,this.opData=e)},editDialogShow:function(t,e){if(t.parent&&(this.parent_id=t.parent.data.id),this.type=2,1===t.level&&(this.dialog_Brand=!0),2===t.level&&(this.dialog_Series=!0),3===t.level&&(this.dialog_Age=!0),4===t.level)return this.$router.push("/car/editInfo?id="+e.id),!1;e&&(this.form["title"]=e.title,e.icon_id&&(this.form["icon_id"]=e.icon_id),e.icon_url&&(this.imageUrl=e.icon_url),e.formKey&&(this.form[e.formKey]=e.id),this.opId=e.tree_key,this.opData=e)},httpRequest:function(t){var e=this,i=new FormData;i.append("file",t.file),Object(o["a"])(i).then((function(t){e.form["icon_id"]=t.data.file_id,e.imageUrl=t.data.file_url}))},submitBrand:function(){var t=this;return this.form.title&&0!=this.form.title.trim().length?this.form.icon_id?void(1==this.type?Object(n["b"])(this.form).then((function(e){t.listData.push({title:t.form.title,id:e.data.id,btnText:"添加车系",key:"dialog_Series",formKey:"brand_id",tree_key:"brand_id"+e.data.id}),t.form={title:""},t.imageUrl="",t.dialog_Brand=!1,t.$message({type:"success",message:"新增品牌成功!"})})):Object(n["v"])(this.form.brand_id,this.form).then((function(e){t.opData.title=t.form.title,t.form={title:""},t.$message({type:"success",message:"编辑品牌成功!"}),t.dialog_Brand=!1}))):(this.$message.error("请上传品牌Logo"),!1):(this.$message.error("请填写品牌名称"),!1)},submitSeries:function(){var t=this;if(!this.form.title||0==this.form.title.trim().length)return this.$message.error("请填写车系名称"),!1;1==this.type?Object(n["e"])(this.form).then((function(e){t.opData&&(t.opData.children||t.$set(t.opData,"children",[]),t.opData.children.push({title:t.form.title,id:e.data.id,btnText:"添加年款",key:"dialog_Age",formKey:"vehicle_id",tree_key:"vehicle_id"+e.data.id})),t.form={title:""},t.dialog_Series=!1,t.$message({type:"success",message:"新增车系成功!"})})):(this.form["brand_id"]=this.parent_id,Object(n["B"])(this.form.vehicle_id,this.form).then((function(e){t.opData.title=t.form.title,t.form={title:""},t.dialog_Series=!1,t.$message({type:"success",message:"编辑车系成功!"})})))},submitAge:function(){var t=this;if(!this.form.title||0==this.form.title.trim().length)return this.$message.error("请填写年款名称"),!1;Object(n["f"])(this.form).then((function(e){t.opData&&(t.opData.children||t.$set(t.opData,"children",[]),t.opData.children.push({title:t.form.title,id:e.data.id,btnText:"添加型号",key:"dialog_Model",formKey:"year_id",tree_key:"year_id"+e.data.id})),t.form={title:""},t.dialog_Age=!1,t.$message({type:"success",message:"新增年款成功!"})}))},submitModel:function(){var t=this;if(!this.form.title||0==this.form.title.trim().length)return this.$message.error("请填写型号名称"),!1;Object(n["c"])(this.form).then((function(e){t.opData&&(t.opData.children||t.$set(t.opData,"children",[]),t.opData.children.push({title:t.form.title,id:e.data.id,formKey:"models_id",tree_key:"models_id"+e.data.id})),t.form={title:""},t.dialog_Model=!1,t.$message({type:"success",message:"新增型号成功!"}),t.$message({type:"success",message:"编辑年款成功!"})}))},treeLoad:function(t,e){return 0===t.level||4===t.level?e([]):1===t.level?this.getCarVehicleData(t.data,e):2===t.level?this.getCarYearsData(t.data,e):3===t.level?this.getCarModelsData(t.data,e):void 0},getBrand:function(){var t=this,e=this;Object(n["l"])().then((function(i){var a=i.data.items;t.setData(a),e.listData=i.data.items}))},setData:function(t){var e=this;t&&t.forEach((function(t){t["btnText"]="添加车系",t["key"]="dialog_Series",t["formKey"]="brand_id",t["tree_key"]="brand_id"+t.id,t["children"]=[],t.children&&e.setData(t.children)}))},getCarVehicleData:function(t,e){var i=this;Object(n["p"])({brand_id:t.id}).then((function(a){var r=a.data.items;r&&r.length>0&&r.forEach((function(t){t["btnText"]="添加年款",t["key"]="dialog_Age",t["formKey"]="vehicle_id",t["tree_key"]="vehicle_id"+t.id,t["children"]=[]})),i.$refs["tree"].updateKeyChildren(t.tree_key,r),e(a.data.items)}))},getCarYearsData:function(t,e){var i=this;Object(n["q"])({vehicle_id:t.id}).then((function(a){var r=a.data.items;r&&r.length>0&&r.forEach((function(t){t["btnText"]="添加型号",t["key"]="dialog_Model",t["formKey"]="year_id",t["tree_key"]="year_id"+t.id,t["children"]=[]})),i.$refs["tree"].updateKeyChildren(t.tree_key,r),e(a.data.items)}))},getCarModelsData:function(t,e){var i=this;Object(n["m"])({year_id:t.id}).then((function(a){var r=a.data.items;r&&r.length>0&&r.forEach((function(t){t["formKey"]="models_id",t["tree_key"]="models_id"+t.id})),i.$refs["tree"].updateKeyChildren(t.tree_key,r),e(a.data.items)}))}}},d=l,c=(i("130c"),i("2877")),s=Object(c["a"])(d,a,r,!1,null,"803478d2",null);e["default"]=s.exports}}]);