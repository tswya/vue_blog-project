<template>
  <div>
    <el-button class="add-btn" size="small" @click="showEdit('add')"
      >新增分类</el-button
    >
    <Table
      :columns="columns"
      :showPagination="false"
      :dataSource="tableData"
      :fetch="loadDataList"
      :options="tableOptions"
    >
      <template #cover="{ index, row }">
        <div class="cover">
          <!-- {{ row.cover }} -->
          <!-- <img :src="proxy.globalInfo.imageUrl + row.cover" alt="" /> -->
          <Cover :cover="row.cover"></Cover>
        </div>
      </template>
      <template #op="{ index, row }">
        <a
          href="javascript:void(0)"
          class="a-link"
          @click="showEdit('update', row)"
          >修改</a
        >
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:void(0)" class="a-link">删除</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:void(0)" class="a-link">上移</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:void(0)" class="a-link">下移</a>
      </template>
    </Table>

    <Dialog
      :show="dialogConfig.show"
      :title="dialogConfig.title"
      :buttons="dialogConfig.buttons"
      @close="dialogConfig.show = false"
      width="500px"
    >
      <el-form
        label-width="80px"
        :model="formData"
        :rules="rules"
        ref="formDataRef"
      >
        <el-form-item label="名称" prop="categoryName">
          <el-input placeholder="请输入名称" v-model="formData.categoryName" />
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <CoverUpload v-model="formData.cover"></CoverUpload>
        </el-form-item>

        <el-form-item label="简介" prop="categoryDesc">
          <el-input
            v-model="formData.categoryDesc"
            type="textarea"
            placeholder="请输入简介"
            :autosize="{ minRows: 4, maxRows: 4 }"
          />
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import { nextTick } from 'process'
const { proxy } = getCurrentInstance()

const api = {
  loadDataList: '/category/loadAllCategory4Blog',
  saveBlog: '/category/saveCategory4Blog'
}
const columns = [
  {
    label: '封面',
    prop: 'cover',
    width: 100,
    scopedSlots: 'cover'
  },
  {
    label: '名称',
    prop: 'categoryName',
    width: 200
  },
  {
    label: '简介',
    prop: 'categoryDesc'
    // width: 150
  },
  {
    label: '博客数量',
    prop: 'blogCount',
    width: 80
  },
  {
    label: '操作',
    prop: 'op',
    width: 200,
    scopedSlots: 'op'
  }
]

const tableData = reactive({})
const tableOptions = {
  extHeight: 10
}
const loadDataList = async () => {
  let result = await proxy.Request({
    url: api.loadDataList
  })
  if (!result) {
    return
  }
  console.log(result)
  tableData.list = result.data
}
//新增
const dialogConfig = reactive({
  title: '标题',
  buttons: [
    {
      type: 'danger',
      text: '确定',
      click: (e) => {
        console.log(e)
        submitForm()
      }
    }
  ],
  show: false
})

const formData = reactive({})
const rules = {
  categoryName: [{ required: true, message: '请输入分类名称' }]
}
const formDataRef = ref()
const showEdit = (type, data) => {
  dialogConfig.show = true
  nextTick(() => {
    formDataRef.value.resetFields()
    if (type == 'add') {
      dialogConfig.title = '新增分类'
    } else if ((type = 'update')) {
      dialogConfig.title = '编辑分类'
      Object.assign(formData, data)
    }
  })
}
const submitForm = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) return
    let params = {}
    Object.assign(params, formData)
    let result = await proxy.Request({
      url: api.saveBlog,
      params
    })
    if (!result) return
    dialogConfig.show = false
    proxy.message.success('保存成功')
    loadDataList()
  })
}
</script>

<style lang="scss">
.add-btn {
  color: rgb(184, 97, 71);
  margin-bottom: 10px;
}

</style>
