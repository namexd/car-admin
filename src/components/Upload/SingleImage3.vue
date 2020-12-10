<template>
  <div>
    <el-upload
      action=""
      :http-request="upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :file-list="imgList"
       :on-change="handleChange"
      :limit="10"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {  uploadFile } from '../../api/upload'
  export default {
    props: {
      value: '',
      pic_url:null
    },
    mounted() {
       this.imageUrl()
    },
    data() {
      return {
        imgList: [],
        idList: [],
        valueList: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      imageUrl() {
        this.pic_url.forEach((i)=>{
          this.imgList.push({ url:this.GLOBAL.BASE_URL+i.banner_url})
          this.idList.push({id:i.id,url:this.GLOBAL.BASE_URL+i.banner_url})
        })
        this.valueList=this.value
      },
      upload(file) {
        let param = new FormData(); //创建form对象
        param.append('file',file.file);//通过append向form对象添加数据
        uploadFile(param).then(response => {
          this.valueList.push(response.data.file_id)
          this.emitInput(this.valueList)
        })

      },
      emitInput(val) {
        console.log(val.join(','))
        this.$emit('input', val.join(','))
      },
      handleChange(file)
      {
        console.log(2323,file)
        const image = { name: file.name, url:file.url }
        this.imgList.push(image)
      },
      handleRemove(file, fileList) {
        const url=[];
        fileList.forEach((item)=>{
          this.idList.forEach((i)=>{
           if (i.url==item.url)
           {
             url.push(i.id)
           }
          })
        })
        this.valueList=url
        this.emitInput(url)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>
<style>

  .avatar-uploader .el-upload {
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
    display: block;
  }
</style>
