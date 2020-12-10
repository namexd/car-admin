<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="string"
      :show-file-list="false"
      :http-request="upload"
      :on-success="handleImageSuccess"
      :on-error="handleImageError"
       >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  // import  URL from ;
  import { uploadFile } from '../../api/upload'
  export default {
    props: {
      value: '',
      pic_url:''
    },
    data() {
      return {
        dataObj: {},
        tempUrl: '',
        imageUrl:this.GLOBAL.BASE_URL+this.pic_url
      }
    },
    watch: {
      value(val) {
        this.value=val
      }
    },
    methods: {
      upload(file) {
        let param = new FormData(); //创建form对象
        param.append('file',file.file);//通过append向form对象添加数据
        uploadFile(param).then(response => {
          this.emitInput(response.data.file_id)
          this.imageUrl = this.GLOBAL.BASE_URL+response.data.file_url;
          // this.uploadImage(response.data,file.file)
        })

      },
      emitInput(val) {
        this.$emit('input', val)
      },
      handleImageSuccess(file) {
        console.log(this.value)
        this.emitInput(this.tempUrl)
        this.value=this.tempUrl
      },
      handleImageError(err, file, fileList) {
       console.log(err)
      },
    }
  }
</script>
<style  >
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
