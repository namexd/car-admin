(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1dffb66e"],{3250:function(e,t,n){"use strict";n("9fe9")},"333d":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},o=[];n("a9e3");Math.easeInOutQuad=function(e,t,n,a){return e/=a/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function l(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function u(e,t,n){var a=r(),o=e-a,u=20,s=0;t="undefined"===typeof t?500:t;var c=function e(){s+=u;var r=Math.easeInOutQuad(s,a,o,t);l(r),s<t?i(e):n&&"function"===typeof n&&n()};c()}var s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&u(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&u(0,800)}}},c=s,d=(n("abc3"),n("2877")),p=Object(d["a"])(c,a,o,!1,null,"6977430e",null);t["a"]=p.exports},6724:function(e,t,n){"use strict";n("8d41");var a="@@wavesContext";function o(e,t){function n(n){var a=Object.assign({},t.value),o=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),i=o.ele;if(i){i.style.position="relative",i.style.overflow="hidden";var l=i.getBoundingClientRect(),r=i.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":(r=document.createElement("span"),r.className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",i.appendChild(r)),o.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(n.pageY-l.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(n.pageX-l.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=o.color,r.className="waves-ripple z-active",!1}}return e[a]?e[a].removeHandle=n:e[a]={removeHandle:n},n}var i={bind:function(e,t){e.addEventListener("click",o(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[a].removeHandle,!1),e.addEventListener("click",o(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[a].removeHandle,!1),e[a]=null,delete e[a]}},l=function(e){e.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(l)),i.install=l;t["a"]=i},"680f":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-upload",{staticClass:"avatar-uploader",attrs:{action:"string","show-file-list":!1,"http-request":e.upload,"on-success":e.handleImageSuccess,"on-error":e.handleImageError}},[e.imageUrl?n("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)},o=[],i=n("91b6"),l={props:{value:"",pic_url:""},data:function(){return{dataObj:{},tempUrl:"",imageUrl:this.pic_url}},watch:{value:function(e){this.value=e}},methods:{upload:function(e){var t=this,n=new FormData;n.append("file",e.file),Object(i["a"])(n).then((function(e){t.emitInput(e.data.file_id),t.imageUrl=e.data.file_url}))},emitInput:function(e){this.$emit("input",e)},handleImageSuccess:function(e){console.log(this.value),this.emitInput(this.tempUrl),this.value=this.tempUrl},handleImageError:function(e,t,n){console.log(e)}}},r=l,u=(n("3250"),n("2877")),s=Object(u["a"])(r,a,o,!1,null,null,null);t["a"]=s.exports},"76e2":function(e,t,n){},"8d41":function(e,t,n){},"91b6":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n("b775");function o(e){return Object(a["a"])({url:"/admin/file",method:"post",param:e,headers:{"Content-Type":"multipart/form-data"},transformRequest:[function(){return e}]})}},"9fe9":function(e,t,n){},a77f:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-button",{attrs:{type:"primary"},on:{click:e.handleAddCoupon}},[e._v("添加红包券")]),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"dragTable",staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:e.couponList,"row-key":"id",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.id)+" ")]}}])}),n("el-table-column",{attrs:{align:"center",label:"券名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.title)+" ")]}}])}),n("el-table-column",{attrs:{align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.create_at)+" ")]}}])}),n("el-table-column",{attrs:{align:"center",label:"发放数量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.total_num)+" ")]}}])}),n("el-table-column",{attrs:{align:"center",label:"使用数量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.used_num)+" ")]}}])}),n("el-table-column",{attrs:{align:"center",label:"使用率"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.used_num>0?t.row.used_num/t.row.total_num*100+"%":0)+" ")]}}])}),n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return e.handleEdit(t)}}},[e._v(" 查看 ")]),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return e.handleDelete(t)}}},[e._v("删除")])]}}])})],1),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.per_page},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"per_page",t)},pagination:e.getCoupon}}),n("el-dialog",{attrs:{visible:e.dialogVisible,title:"edit"===e.dialogType?"查看红包券":"新增红包券"},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("el-form",{attrs:{model:e.coupon,"label-position":"left","label-width":"100px"}},[n("el-form-item",{attrs:{label:"券面额",required:""}},[n("el-input",{attrs:{disabled:"edit"==e.dialogType,placeholder:"券面额"},model:{value:e.coupon.deduct_money,callback:function(t){e.$set(e.coupon,"deduct_money",t)},expression:"coupon.deduct_money"}})],1),n("el-form-item",{attrs:{label:"券名称",required:""}},[n("el-input",{attrs:{disabled:"edit"==e.dialogType,placeholder:"红包券名称"},model:{value:e.coupon.title,callback:function(t){e.$set(e.coupon,"title",t)},expression:"coupon.title"}})],1),n("el-form-item",{attrs:{label:"消费门槛",required:""}},[n("el-input",{attrs:{disabled:"edit"==e.dialogType,placeholder:"消费门槛"},model:{value:e.coupon.min_money,callback:function(t){e.$set(e.coupon,"min_money",t)},expression:"coupon.min_money"}})],1),n("el-form-item",{attrs:{label:"发放时间",required:""}},[n("el-date-picker",{attrs:{disabled:"edit"==e.dialogType,type:"daterange","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.daterangeHandle},model:{value:e.daterange,callback:function(t){e.daterange=t},expression:"daterange"}})],1),n("el-form-item",{attrs:{label:"券有效期",required:""}},[n("el-row",[n("el-col",{attrs:{span:2}},[e._v(" 从发券第 ")]),n("el-col",{attrs:{span:4}},[n("el-input",{attrs:{disabled:"edit"==e.dialogType,placeholder:"请输入"},model:{value:e.coupon.valid_start_day,callback:function(t){e.$set(e.coupon,"valid_start_day",t)},expression:"coupon.valid_start_day"}})],1),n("el-col",{staticStyle:{"text-align":"center"},attrs:{span:2}},[e._v(" 天,至 ")]),n("el-col",{attrs:{span:4}},[n("el-input",{attrs:{disabled:"edit"==e.dialogType,placeholder:"请输入"},model:{value:e.coupon.valid_end_day,callback:function(t){e.$set(e.coupon,"valid_end_day",t)},expression:"coupon.valid_end_day"}})],1),n("el-col",{attrs:{span:4}},[e._v(" 天 ")])],1)],1),n("el-form-item",{attrs:{label:"消费门槛",required:""}},[n("el-radio",{attrs:{disabled:"edit"==e.dialogType,label:1},model:{value:e.coupon.type,callback:function(t){e.$set(e.coupon,"type",t)},expression:"coupon.type"}},[e._v("实名赠送")]),n("el-radio",{attrs:{disabled:"edit"==e.dialogType,label:2},model:{value:e.coupon.type,callback:function(t){e.$set(e.coupon,"type",t)},expression:"coupon.type"}},[e._v("下级实名赠送")])],1)],1)],1),n("el-dialog",{attrs:{title:"删除红包券",visible:e.dialogVisibleDelete,width:"30%"},on:{"update:visible":function(t){e.dialogVisibleDelete=t}}},[n("div",{staticStyle:{"margin-bottom":"10px"}},[n("el-radio",{attrs:{label:1},model:{value:e.deleteParams.type,callback:function(t){e.$set(e.deleteParams,"type",t)},expression:"deleteParams.type"}},[e._v("会员已领取的红包可以继续使用")])],1),n("div",[n("el-radio",{attrs:{label:2},model:{value:e.deleteParams.type,callback:function(t){e.$set(e.deleteParams,"type",t)},expression:"deleteParams.type"}},[e._v("一并删除")])],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogVisibleDelete=!1}}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.goDelete}},[e._v("确 定")])],1)])],1)},o=[],i=(n("96cf"),n("1da1")),l=n("680f"),r=n("6724"),u=n("333d"),s=n("cbfe"),c={1:"已启用",2:"已停用"},d={components:{Pagination:u["a"],Upload:l["a"]},directives:{waves:r["a"]},filters:{statusFilter:function(e){var t={2:"info",1:"success"};return t[e]},statusShowFilter:function(e){return c[e]}},data:function(){return{daterange:[],deleteParams:{},coupon:{},couponList:[],dialogVisibleDelete:!1,dialogVisible:!1,dialogType:"new",total:0,listLoading:!0,listQuery:{page:1,per_page:20}}},created:function(){this.getCoupon()},methods:{daterangeHandle:function(e){this.coupon.start_at=e[0],this.coupon.end_at=e[1]},getCoupon:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.listLoading=!0,t.next=3,Object(s["c"])(e.listQuery);case 3:n=t.sent,e.couponList=n.data.items,e.total=n.data._meta.total_count,e.listLoading=!1;case 7:case"end":return t.stop()}}),t)})))()},handleAddCoupon:function(){this.coupon={},this.daterange=[],this.dialogType="new",this.dialogVisible=!0},handleEdit:function(e){var t=this;Object(s["d"])(e.row.id).then((function(e){t.coupon=e.data,t.daterange=[e.data.start_at,e.data.end_at],t.dialogType="edit",t.dialogVisible=!0}))},handleDelete:function(e){e.$index;var t=e.row;this.dialogVisibleDelete=!0,this.deleteParams.ids=t.id},goDelete:function(){var e=this;Object(s["b"])(this.deleteParams).then((function(t){0==t.code&&(e.$message.success("删除成功"),e.getCoupon(),e.dialogVisibleDelete=!1)}))},confirmCoupon:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n="edit"===e.dialogType,!n){t.next=8;break}return a=e.coupon.id,delete e.coupon.id,t.next=6,Object(s["e"])(a,e.coupon);case 6:t.next=10;break;case 8:return t.next=10,Object(s["a"])(e.coupon);case 10:e.getCoupon(),e.dialogVisible=!1,e.$notify({title:"Success",message:"操作成功！",type:"success"});case 13:case"end":return t.stop()}}),t)})))()}}},p=d,f=(n("f4be"),n("2877")),m=Object(f["a"])(p,a,o,!1,null,"4dc118ea",null);t["default"]=m.exports},a9e3:function(e,t,n){"use strict";var a=n("83ab"),o=n("da84"),i=n("94ca"),l=n("6eeb"),r=n("5135"),u=n("c6b6"),s=n("7156"),c=n("c04e"),d=n("d039"),p=n("7c73"),f=n("241c").f,m=n("06cf").f,g=n("9bf2").f,b=n("58a8").trim,h="Number",v=o[h],y=v.prototype,_=u(p(y))==h,w=function(e){var t,n,a,o,i,l,r,u,s=c(e,!1);if("string"==typeof s&&s.length>2)if(s=b(s),t=s.charCodeAt(0),43===t||45===t){if(n=s.charCodeAt(2),88===n||120===n)return NaN}else if(48===t){switch(s.charCodeAt(1)){case 66:case 98:a=2,o=49;break;case 79:case 111:a=8,o=55;break;default:return+s}for(i=s.slice(2),l=i.length,r=0;r<l;r++)if(u=i.charCodeAt(r),u<48||u>o)return NaN;return parseInt(i,a)}return+s};if(i(h,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var k,x=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof x&&(_?d((function(){y.valueOf.call(n)})):u(n)!=h)?s(new v(w(t)),n,x):w(t)},S=a?f(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),T=0;S.length>T;T++)r(v,k=S[T])&&!r(x,k)&&g(x,k,m(v,k));x.prototype=y,y.constructor=x,l(o,h,x)}},abc3:function(e,t,n){"use strict";n("b684")},b684:function(e,t,n){},cbfe:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"a",(function(){return l})),n.d(t,"d",(function(){return r})),n.d(t,"b",(function(){return u}));var a=n("b775");function o(e){return Object(a["a"])({url:"/admin/coupon",method:"get",params:e})}function i(e,t){return Object(a["a"])({url:"/admin/coupon/".concat(e),method:"put",data:t})}function l(e){return Object(a["a"])({url:"/admin/coupon",method:"post",data:e})}function r(e){return Object(a["a"])({url:"/admin/coupon/".concat(e),method:"get"})}function u(e){return Object(a["a"])({url:"/admin/coupon",method:"delete",data:e})}},f4be:function(e,t,n){"use strict";n("76e2")}}]);