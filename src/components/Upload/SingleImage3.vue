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
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import { uploadFile } from '../../api/upload'

  export default {
    props: {
      value: '',
      pic_url: []
    },
    mounted() {
      this.imageUrl()
    },
    data() {
      return {
        imgList: [],
        imgList2: [],
        valueList: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      imageUrl() {
        if (this.pic_url) {
          this.pic_url.forEach((i) => {
            this.imgList.push({ id: i.id, name: i.banner_name, url: i.banner_url })
          })
          this.valueList = this.value.indexOf(',') ? this.value.split(','):this.valueList.push(this.value);
        } else {
          return true
        }

      },
      upload(file) {
        console.log(file)
        let param = new FormData() //创建form对象
        param.append('file', file.file)//通过append向form对象添加数据
        uploadFile(param).then(response => {
          this.valueList.push(response.data.file_id)
          // this.imgList.push({name: response.data.file_name, url: response.data.file_url })
          this.imgList2.push({ id: response.data.file_id, name: response.data.file_name, url: response.data.file_url })
          this.emitInput(this.valueList)
        })

      },
      emitInput(val) {
        console.log(val.join(','))
        this.$emit('input', val.join(','))
      },
      handleChange(file, fileList) {
        const image = { name: file.name, url: file.url }
        this.imgList.push(image)
      },
      handleRemove(file, fileList) {
        console.log(fileList)
        const url = []
        this.imgList = fileList
        fileList.forEach((item) => {
          this.imgList2.forEach((i) => {
            if (item.name == i.name) {
              url.push(i.id)
            }
          })
        })
        this.emitInput(url)
        this.valueList = url
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${file.name}？`)
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
