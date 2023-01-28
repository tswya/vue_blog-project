<template>
  <div class="layout">
    <el-container>
      <el-header class="header">Header</el-header>
      <el-container class="container">
        <el-aside width="200px" class="left-aside">Aside</el-aside>
        <el-main class="right-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup></script>

<style lang="scss">
.layout {
  .container {
    background: #f5f6f7;
    height: calc(100vh - 60px);
  }
  .left-aside {
    width: 250px;
  }
  .right-main {
    background: #fff;
  }
  .header {
    border-bottom: 1px soild #ddd;
  }
}
</style>
