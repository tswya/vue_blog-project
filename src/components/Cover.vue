<template>
  <div class="cover">
    <img :src="proxy.globalInfo.imageUrl + cover" v-if="cover" />
    <img v-else src="../assets/img/default-img.png" />
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, reactive } from 'vue'
const props = defineProps({
  cover: {
    type: String
    // default: null,
  }
})
const { proxy } = getCurrentInstance()
</script>

<style lang="scss">
.cover {
  background: #ddd;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 60px;
  height: 60px;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
