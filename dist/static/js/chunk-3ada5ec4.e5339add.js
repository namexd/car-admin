(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ada5ec4"],{"66b4":function(t,e,a){"use strict";a.d(e,"s",(function(){return i})),a.d(e,"x",(function(){return n})),a.d(e,"D",(function(){return o})),a.d(e,"E",(function(){return l})),a.d(e,"a",(function(){return c})),a.d(e,"t",(function(){return s})),a.d(e,"g",(function(){return d})),a.d(e,"m",(function(){return u})),a.d(e,"y",(function(){return f})),a.d(e,"b",(function(){return m})),a.d(e,"h",(function(){return h})),a.d(e,"n",(function(){return p})),a.d(e,"A",(function(){return g})),a.d(e,"B",(function(){return b})),a.d(e,"c",(function(){return _})),a.d(e,"u",(function(){return v})),a.d(e,"i",(function(){return y})),a.d(e,"r",(function(){return k})),a.d(e,"f",(function(){return O})),a.d(e,"l",(function(){return j})),a.d(e,"q",(function(){return D})),a.d(e,"F",(function(){return w})),a.d(e,"e",(function(){return x})),a.d(e,"k",(function(){return $})),a.d(e,"o",(function(){return C})),a.d(e,"C",(function(){return S})),a.d(e,"G",(function(){return A})),a.d(e,"z",(function(){return I})),a.d(e,"w",(function(){return N})),a.d(e,"d",(function(){return E})),a.d(e,"p",(function(){return K})),a.d(e,"v",(function(){return M})),a.d(e,"j",(function(){return T}));var r=a("b775");function i(t){return Object(r["a"])({url:"/admin/car",method:"get",params:t})}function n(t,e){return Object(r["a"])({url:"/admin/car/".concat(t),method:"put",data:e})}function o(t){return Object(r["a"])({url:"/admin/car-test",method:"put",data:t})}function l(t){return Object(r["a"])({url:"/admin/car-user",method:"put",data:t})}function c(t){return Object(r["a"])({url:"/admin/car",method:"post",data:t})}function s(t){return Object(r["a"])({url:"/admin/car/".concat(t),method:"get"})}function d(t){return Object(r["a"])({url:"/admin/car",method:"delete",data:t})}function u(t){return Object(r["a"])({url:"/admin/car-brand",method:"get",params:t})}function f(t,e){return Object(r["a"])({url:"/admin/car-brand/".concat(t),method:"put",data:e})}function m(t){return Object(r["a"])({url:"/admin/car-brand",method:"post",data:t})}function h(t){return Object(r["a"])({url:"/admin/car-brand",method:"delete",data:t})}function p(t){return Object(r["a"])({url:"/admin/car-model",method:"get",params:t})}function g(t,e){return Object(r["a"])({url:"/admin/car-model/".concat(t,"/extra"),method:"put",data:e})}function b(t,e){return Object(r["a"])({url:"/admin/car-model/".concat(t),method:"put",data:e})}function _(t){return Object(r["a"])({url:"/admin/car-model",method:"post",data:t})}function v(t){return Object(r["a"])({url:"/admin/car-model/".concat(t),method:"get"})}function y(t){return Object(r["a"])({url:"/admin/car-model",method:"delete",data:t})}function k(t){return Object(r["a"])({url:"/admin/car-year",method:"get",params:t})}function O(t){return Object(r["a"])({url:"/admin/car-year",method:"post",data:t})}function j(t){return Object(r["a"])({url:"/admin/car-year",method:"delete",data:t})}function D(t){return Object(r["a"])({url:"/admin/car-vehicle",method:"get",params:t})}function w(t,e){return Object(r["a"])({url:"/admin/car-vehicle/".concat(t),method:"put",data:e})}function x(t){return Object(r["a"])({url:"/admin/car-vehicle",method:"post",data:t})}function $(t){return Object(r["a"])({url:"/admin/car-vehicle",method:"delete",data:t})}function C(t){return Object(r["a"])({url:"/admin/car-sell",method:"get",params:t})}function S(t){return Object(r["a"])({url:"/admin/car/".concat(t,"/sell"),method:"put"})}function A(t){return Object(r["a"])({url:"/admin/car/".concat(t,"/warehouse"),method:"put"})}function I(t){return Object(r["a"])({url:"/admin/car/".concat(t,"/copy"),method:"put"})}function N(t,e){return Object(r["a"])({url:"/admin/car/".concat(t,"/sort"),method:"put",data:e})}function E(t){return Object(r["a"])({url:"/admin/car-sell-log",method:"post",data:t})}function K(t){return Object(r["a"])({url:"/admin/car-sell-log",method:"get",params:t})}function M(t,e){return Object(r["a"])({url:"/admin/car-vehicle/".concat(t,"/updown"),method:"put",data:e})}function T(t){return Object(r["a"])({url:"/admin/car-sell",method:"delete",data:t})}},7652:function(t,e,a){},"91b6":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var r=a("b775");function i(t){return Object(r["a"])({url:"/admin/file",method:"post",param:t,headers:{"Content-Type":"multipart/form-data"},transformRequest:[function(){return t}]})}},a9e3:function(t,e,a){"use strict";var r=a("83ab"),i=a("da84"),n=a("94ca"),o=a("6eeb"),l=a("5135"),c=a("c6b6"),s=a("7156"),d=a("c04e"),u=a("d039"),f=a("7c73"),m=a("241c").f,h=a("06cf").f,p=a("9bf2").f,g=a("58a8").trim,b="Number",_=i[b],v=_.prototype,y=c(f(v))==b,k=function(t){var e,a,r,i,n,o,l,c,s=d(t,!1);if("string"==typeof s&&s.length>2)if(s=g(s),e=s.charCodeAt(0),43===e||45===e){if(a=s.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(s.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+s}for(n=s.slice(2),o=n.length,l=0;l<o;l++)if(c=n.charCodeAt(l),c<48||c>i)return NaN;return parseInt(n,r)}return+s};if(n(b,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var O,j=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof j&&(y?u((function(){v.valueOf.call(a)})):c(a)!=b)?s(new _(k(e)),a,j):k(e)},D=r?m(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;D.length>w;w++)l(_,O=D[w])&&!l(j,O)&&p(j,O,h(_,O));j.prototype=v,v.constructor=j,o(i,b,j)}},b8ea:function(t,e,a){"use strict";a("7652")},e269:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"custom-tree-container app-container"},[a("el-button",{on:{click:function(e){return t.dialogShow("dialog_Brand")}}},[t._v("添加品牌")]),a("div",{staticClass:"block",staticStyle:{"margin-top":"30px"}},[a("el-tree",{ref:"tree",attrs:{data:t.listData,"node-key":"tree_key","expand-on-click-node":!1,lazy:"",load:t.treeLoad,draggable:"","allow-drop":t.allowDrop,"allow-drag":t.allowDrag,accordion:!0},on:{"node-drop":t.handleDrop},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.node,i=e.data;return a("span",{staticClass:"custom-tree-node"},[2===r.level?a("icon",{staticClass:"el-icon-sort",staticStyle:{"padding-right":"10px"}}):t._e(),a("span",[t._v(t._s(i.title))]),a("span",[a("el-button",{staticStyle:{"margin-left":"20px",color:"red"},attrs:{type:"text",size:"mini"},on:{click:function(e){return t.dialogShow(i.key,i)}}},[t._v(" "+t._s(i.btnText)+" ")]),"year_id"!=i.formKey&&4===r.level?a("el-button",{staticStyle:{"margin-left":"20px",color:"red"},attrs:{type:"text",size:"mini"},on:{click:function(e){return t.editDialogShow(r,i,1)}}},[t._v(" 编辑名称 ")]):t._e(),"year_id"!=i.formKey?a("el-button",{staticStyle:{"margin-left":"20px",color:"red"},attrs:{type:"text",size:"mini"},on:{click:function(e){return t.editDialogShow(r,i)}}},[t._v(" "+t._s(4===r.level?"编辑参数":"编辑")+" ")]):t._e(),a("el-button",{staticStyle:{"margin-left":"20px",color:"red"},attrs:{type:"text",size:"mini"},on:{click:function(e){return t.deleteHandle(r,i.id)}}},[t._v(" 删除 ")])],1)],1)}}])})],1),a("el-dialog",{attrs:{title:1==t.type?"添加品牌":"编辑品牌",visible:t.dialog_Brand,"show-close":!1},on:{"update:visible":function(e){t.dialog_Brand=e}}},[a("el-form",{attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"品牌名称"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"车标logo"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{"show-file-list":!1,action:"Fake Action","http-request":t.httpRequest}},[t.imageUrl?a("img",{staticClass:"avatar line",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon line"})])],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialog_Brand=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.submitBrand}},[t._v("提 交")])],1)],1),a("el-dialog",{attrs:{title:1==t.type?"添加车系":"编辑车系",visible:t.dialog_Series,"show-close":!1},on:{"update:visible":function(e){t.dialog_Series=e}}},[a("el-form",{attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"车系名称"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"车系logo"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{"show-file-list":!1,action:"Fake Action","http-request":t.httpRequest}},[t.imageUrl?a("img",{staticClass:"avatar line",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon line"})])],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialog_Series=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.submitSeries}},[t._v("提 交")])],1)],1),a("el-dialog",{attrs:{title:1==t.type?"添加年款":"编辑年款",visible:t.dialog_Age,"show-close":!1},on:{"update:visible":function(e){t.dialog_Age=e}}},[a("el-form",{attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"年款名称"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialog_Age=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.submitAge}},[t._v("提 交")])],1)],1),a("el-dialog",{attrs:{title:"添加型号",visible:t.dialog_Model,"show-close":!1},on:{"update:visible":function(e){t.dialog_Model=e}}},[a("el-form",{attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"型号名称"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialog_Model=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.submitModel}},[t._v("提 交")])],1)],1),a("el-dialog",{attrs:{title:"编辑名称",visible:t.dialog_name,"show-close":!1},on:{"update:visible":function(e){t.dialog_name=e}}},[a("el-form",{attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"单行输入"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialog_name=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.submitName}},[t._v("提 交")])],1)],1)],1)},i=[],n=(a("4160"),a("a9e3"),a("498a"),a("159b"),a("66b4")),o=a("91b6"),l={data:function(){return{dialog_Brand:!1,dialog_Series:!1,dialog_Age:!1,dialog_Model:!1,dialog_name:!1,form:{title:""},imageUrl:"",listData:[],opId:null,opData:{},type:1,parent_id:null}},created:function(){this.getBrand()},methods:{handleDrop:function(t,e,a,r){var i=this,o=Math.abs(Number(t.id)-Number(e.id)),l={is_up:"before"==a?1:2,step:o},c=t.data.id;Object(n["v"])(c,l).then((function(t){0==t.code&&i.$message({type:"success",message:"操作成功!"})}))},allowDrop:function(t,e,a){return 2==e.level&&"inner"!==a},allowDrag:function(t){return 2===t.level},deleteHandle:function(t,e){1===t.level&&this.removeHandle(e,n["h"],t),2===t.level&&this.removeHandle(e,n["k"],t),3===t.level&&this.removeHandle(e,n["l"],t),4===t.level&&this.removeHandle(e,n["i"],t)},removeHandle:function(t,e,a){var r=this;this.$confirm("此操作将永久删除该项, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e({ids:t}).then((function(t){r.$refs.tree.remove(a.data.tree_key),r.$message({type:"success",message:"删除成功!"})}))})).catch((function(){}))},dialogShow:function(t,e){this.form={},this.imageUrl="",this.type=1,this[t]=!0,e&&e.formKey&&(this.form[e.formKey]=e.id,this.opId=e.tree_key,this.opData=e)},editDialogShow:function(t,e,a){if(t.parent&&(this.parent_id=t.parent.data.id),this.type=2,1===t.level&&(this.dialog_Brand=!0),2===t.level&&(this.dialog_Series=!0),3===t.level&&(this.dialog_Age=!0),4===t.level){if(1!=a)return this.$router.push("/car/editInfo?id="+e.id),!1;this.dialog_name=!0}e&&(this.form["title"]=e.title,e.icon_id&&(this.form["icon_id"]=e.icon_id),e.icon_url&&(this.imageUrl=e.icon_url),e.formKey&&(this.form[e.formKey]=e.id),this.opId=e.tree_key,this.opData=e)},httpRequest:function(t){var e=this,a=new FormData;a.append("file",t.file),Object(o["a"])(a).then((function(t){e.form["icon_id"]=t.data.file_id,e.imageUrl=t.data.file_url}))},submitBrand:function(){var t=this;return this.form.title&&0!=this.form.title.trim().length?this.form.icon_id?void(1==this.type?Object(n["b"])(this.form).then((function(e){t.listData.push({title:t.form.title,id:e.data.id,btnText:"添加车系",key:"dialog_Series",formKey:"brand_id",tree_key:"brand_id"+e.data.id}),t.form={title:""},t.imageUrl="",t.dialog_Brand=!1,t.$message({type:"success",message:"新增品牌成功!"})})):Object(n["y"])(this.form.brand_id,this.form).then((function(e){t.opData.title=t.form.title,t.form={title:""},t.$message({type:"success",message:"编辑品牌成功!"}),t.dialog_Brand=!1}))):(this.$message.error("请上传品牌Logo"),!1):(this.$message.error("请填写品牌名称"),!1)},submitSeries:function(){var t=this;if(!this.form.title||0==this.form.title.trim().length)return this.$message.error("请填写车系名称"),!1;1==this.type?Object(n["e"])(this.form).then((function(e){t.opData&&(t.opData.children||t.$set(t.opData,"children",[]),t.opData.children.push({title:t.form.title,id:e.data.id,btnText:"添加年款",key:"dialog_Age",formKey:"vehicle_id",tree_key:"vehicle_id"+e.data.id})),t.form={title:""},t.imageUrl2="",t.dialog_Series=!1,t.$message({type:"success",message:"新增车系成功!"})})):(this.form["brand_id"]=this.parent_id,Object(n["F"])(this.form.vehicle_id,this.form).then((function(e){t.opData.title=t.form.title,t.form={title:""},t.dialog_Series=!1,t.$message({type:"success",message:"编辑车系成功!"})})))},submitAge:function(){var t=this;if(!this.form.title||0==this.form.title.trim().length)return this.$message.error("请填写年款名称"),!1;Object(n["f"])(this.form).then((function(e){t.opData&&(t.opData.children||t.$set(t.opData,"children",[]),t.opData.children.push({title:t.form.title,id:e.data.id,btnText:"添加型号",key:"dialog_Model",formKey:"year_id",tree_key:"year_id"+e.data.id})),t.form={title:""},t.dialog_Age=!1,t.$message({type:"success",message:"新增年款成功!"})}))},submitModel:function(){var t=this;if(!this.form.title||0==this.form.title.trim().length)return this.$message.error("请填写型号名称"),!1;Object(n["c"])(this.form).then((function(e){t.opData&&(t.opData.children||t.$set(t.opData,"children",[]),t.opData.children.push({title:t.form.title,id:e.data.id,btnText:"编辑型号",key:"dialog_Model",formKey:"models_id",tree_key:"models_id"+e.data.id})),t.form={title:""},t.dialog_Model=!1,t.$message({type:"success",message:"新增型号成功!"}),t.$message({type:"success",message:"编辑年款成功!"})}))},submitName:function(){var t=this;if(!this.form.title||0==this.form.title.trim().length)return this.$message.error("请填写名称"),!1;Object(n["B"])(this.form.models_id,this.form).then((function(e){t.opData.title=t.form.title,t.form={title:""},t.dialog_name=!1,t.$message({type:"success",message:"编辑名称成功!"})}))},treeLoad:function(t,e){return 0===t.level||4===t.level?e([]):1===t.level?this.getCarVehicleData(t.data,e):2===t.level?this.getCarYearsData(t.data,e):3===t.level?this.getCarModelsData(t.data,e):void 0},getBrand:function(){var t=this,e=this;Object(n["m"])({per_page:1e5}).then((function(a){var r=a.data.items;t.setData(r),e.listData=a.data.items}))},setData:function(t){var e=this;t&&t.forEach((function(t){t["btnText"]="添加车系",t["key"]="dialog_Series",t["formKey"]="brand_id",t["tree_key"]="brand_id"+t.id,t["children"]=[],t.children&&e.setData(t.children)}))},getCarVehicleData:function(t,e){var a=this;Object(n["q"])({brand_id:t.id,per_page:1e5}).then((function(r){var i=r.data.items;i&&i.length>0&&i.forEach((function(t){t["btnText"]="添加年款",t["key"]="dialog_Age",t["formKey"]="vehicle_id",t["tree_key"]="vehicle_id"+t.id,t["children"]=[]})),a.$refs["tree"].updateKeyChildren(t.tree_key,i),e(r.data.items)}))},getCarYearsData:function(t,e){var a=this;Object(n["r"])({vehicle_id:t.id,per_page:1e5}).then((function(r){var i=r.data.items;i&&i.length>0&&i.forEach((function(t){t["btnText"]="添加型号",t["key"]="dialog_Model",t["formKey"]="year_id",t["tree_key"]="year_id"+t.id,t["children"]=[]})),a.$refs["tree"].updateKeyChildren(t.tree_key,i),e(r.data.items)}))},getCarModelsData:function(t,e){var a=this;Object(n["n"])({year_id:t.id,per_page:1e5}).then((function(r){var i=r.data.items;i&&i.length>0&&i.forEach((function(t){t["formKey"]="models_id",t["tree_key"]="models_id"+t.id})),a.$refs["tree"].updateKeyChildren(t.tree_key,i),e(r.data.items)}))}}},c=l,s=(a("b8ea"),a("2877")),d=Object(s["a"])(c,r,i,!1,null,"659abe15",null);e["default"]=d.exports}}]);