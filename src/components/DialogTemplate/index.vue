<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <el-dialog :model-value="visible" v-bind="$attrs" @close="handleClose">
    <template #header>
      <slot name="title">
        <h2>{{ title }}</h2>
      </slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer" v-bind="{ handleClose, handleConfirm }">
        <el-button @click="handleClose">{{ cancelButtonText }}</el-button>
        <el-button type="primary" @click="handleConfirm">
          {{ confirmButtonText }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
defineOptions({
  name: "DialogTemplate"
});
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "标题"
  },
  cancelButtonText: {
    type: String,
    default: "取消"
  },
  confirmButtonText: {
    type: String,
    default: "确定"
  }
});
const emits = defineEmits(["update:visible", "close", "confirm"]);

const handleClose = () => {
  emits("update:visible", false);
  emits("close");
};
const handleConfirm = () => {
  emits("confirm");
};
</script>

<style lang="scss" scoped></style>
