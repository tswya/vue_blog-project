<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form :model="fromData" :rules="rules" ref="fromDataRef">
        <el-form-item prop="account">
          <el-input
            placeholder="请输入账号"
            v-model="fromData.account"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="fromData.password"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input
              placeholder="请输入验证码"
              v-model="fromData.checkCode"
              class="input-panel"
            />
            <img
              src="checkCodeUrl"
              class="check-code"
              @click="changeCheckCode"
            />
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="fromData.rememberMe" :label="true"
            >记住我</el-checkbox
          >
        </el-form-item>
        <el-form-item label="">
          <el-button type="warning" plain :style="{ width: '100%' }"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

const api = {
  checkCode: 'api/checkCode'
}
const checkCodeUrl = ref(api.checkCode)

const changeCheckCode = () => {
  checkCodeUrl.value = api.checkCode + '?' + new Date().getTime()
}

const fromData = reactive({})
const fromDataRef = ref()
const rules = {
  account: [
    {
      required: true,
      message: '请输入用户名！'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码！'
    }
  ],
  checkCode: [
    {
      required: true,
      message: '请输入验证码！'
    }
  ]
}

const login = () => {
  fromDataRef.value.validate((valid) => {
    if (!valid) return
  })
}
</script>

<style lang="scss">
.login-body {
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  background-image: url('@/assets/login-bg.jpg');
  position: relative;
  .login-panel {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 350px;

    background: #fff;
    float: right;
    // margin-right: 100px;
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    // margin-top: 100px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #ddd;
    .login-title {
      font-size: 18px;
      text-align: center;
      margin-bottom: 10px;
      color: rgb(61, 52, 40);
    }
    .check-code-panel {
      width: 100%;
      display: flex;
      align-items: center;
      .input-panel {
        flex: 1;
        margin-right: 5px;
      }
      .check-code {
        height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
