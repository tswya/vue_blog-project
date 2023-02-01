<template>
  <el-upload
    name="file"
    :show-file-list="false"
    accept=".png, .PNG, .jpg, .JPG, .gif, .GIF, ,bmp, .BMP"
    :multiple="false"
    :http-request="uploadImage"
  >
    <div class="cover-upload-btn">
      <template v-if="modelValue">
        <img :src="proxy.globalInfo.imageUrl + modelValue" />
      </template>
    </div>
  </el-upload>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const api = {
  uploadUrl: 'file/uploadImage'
}
const emit = defineEmits()
const uploadImage = async (file) => {
  let result = await proxy.Request({
    url: api.uploadUrl,
    dataType: 'file',
    params: {
      file: file.file,
      type: 0
    }
  })
  const fileName = result.data.fileName
  console.log(result)
  emit('update:modelValue', fileName)
}
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})
</script>
<style lang="scss">
.cover-upload-btn {
  width: 100px;
  height: 100px;
  background: #ddd;
  background: url(../assets/img/upload.png);
  background-size: contain;
  img {
    width: 100%;
  }
}
</style>
