<template>
  <div>
    <el-dialog
      :show-close="false"
      :draggable="true"
      :model-value="show"
      :close-on-click-modal="false"
      :title="title"
      :showClose="showClose"
      class="cust-dialog"
      :top="top"
      :width="width"
      :modal="true"
      :showCancel="showCancel"
    >
      <div class="dialog-body">
        <slot></slot>
      </div>
      <template v-if="(buttons && buttons.length > 0) || showCancel">
        <div class="dialog-footer">
          <el-button link @click="close" size="small">取消</el-button>
          <el-button
            size="small"
            v-for="(btn, i) in buttons"
            :key="i"
            :type="btn.type"
            @click="btn.click"
            >{{ btn.text }}</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  showClose: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  top: {
    type: String,
    default: '50px'
  },
  width: {
    type: String,
    default: '30%'
  },
  buttons: {
    type: Array
  }
})
const emit = defineEmits()
const close = () => {
  emit('close')
}
</script>
<style lang="scss">
.cust-dialog {
  .el-dialog__body {
    border-top: 1px solid #ddd;
    padding: 0;
  }
  .dialog-body {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 15px;
    min-height: 20px;
  }
  .dialog-footer {
    text-align: right;
    padding: 5px 20px;
  }
}
</style>
