<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <div class="logo">
          <img src="@/assets/img/aislogo.png" style="width: 50px" />
          <span>EasyBlog</span>
        </div>
        <div class="user-info">
          <span>欢迎回来，</span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ userInfo.nickName }}
              <span class="iconfont icon-open"></span>
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="avatar"><img :src="userInfo.avatar" /></div>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside width="200px" class="left-aside">
          <div>
            <el-button class="post-btn">发布</el-button>
            <div class="menu-panel">
              <ul>
                <li v-for="(item, index) in menuList" :key="index">
                  <span class="menu-title-p" @click="openClose(index)">
                    <span :class="['iconfont', item.icon]"></span>
                    <span class="menu-title">{{ item.title }}</span>
                    <span
                      :class="[
                        'iconfont',
                        'open-close',
                        item.open ? 'icon-close' : 'icon-open'
                      ]"
                    ></span>
                  </span>
                  <ul class="sub-menu" v-show="item.open">
                    <li v-for="(item2, index2) in item.children" :key="index2">
                      <router-link
                        :to="item2.path"
                        :class="[
                          'sub-menu-item',
                          activePath == item2.path ? 'active' : ''
                        ]"
                        >{{ item2.title }}</router-link
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </el-aside>
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'
import VueCookies from 'vue-cookies'
import { watch } from 'vue'

const router = useRouter()
const route = useRoute()
const proxy = getCurrentInstance()
const menuList = ref([
  {
    title: '博客',
    icon: 'icon-blog',
    open: true,
    children: [
      {
        title: '博客管理',
        path: '/blog/list'
      },
      {
        title: '分类管理',
        path: '/blog/category'
      }
    ]
  },
  {
    title: '专题',
    icon: 'icon-zhuanti',
    open: true,
    children: [
      {
        title: '专题管理',
        path: '/special/category'
      }
    ]
  },
  {
    title: '设置',
    icon: 'icon-setting',
    open: true,
    children: [
      {
        title: '个人信息设置',
        path: '/setting/my'
      },
      {
        title: '博客成员',
        path: '/setting/user'
      },
      {
        title: '系统设置',
        path: '/setting/sysSetting'
      }
    ]
  },
  {
    title: '回收站',
    icon: 'icon-delete',
    open: true,
    children: [
      {
        title: '回收站',
        path: '/recovery/list'
      }
    ]
  }
])
const openClose = (index) => {
  const open = menuList.value[index].open
  menuList.value[index].open = !open
}

const userInfo = ref({})
const init = () => {
  userInfo.value = VueCookies.get('userInfo')
  // userInfo.value.avatar = proxy.globalInfo.imageUrl + userInfo.value.avatar
  console.log(userInfo.value)
}
init()
const activePath = ref(null)
watch(
  route,
  (newVal, oldVal) => {
    console.log(newVal.path)
    activePath.value = newVal.path
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss">
.layout {
  background-image: url('@/assets/home-bg.jpg');
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;

  position: relative;

  .container {
    padding-top: 10px;
    background: rgb(245, 246, 247, 0.7);
    height: calc(100vh - 60px);
  }
  .left-aside {
    padding: 0 15px;
    width: 200px;
    .post-btn {
      background: rgb(184, 97, 71, 0.9);
      color: rgb(233, 222, 217);
      height: 35px;
      width: 100%;
      border: 0;
    }
    .menu-panel {
      margin-top: 5px;
      ul,
      li {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      .menu-title-p {
        padding: 0 5px;
        line-height: 40px;
        cursor: pointer;
        display: flex;
        .iconfont {
          color: #646464;
        }
        .open-close {
          width: 20px;
          font-size: 16px;
        }
        .menu-title {
          flex: 1;
          color: #3f4042;
          margin-left: 15px;
        }
      }
      .menu-title-p:hover {
        background: #ddd;
      }
      .sub-menu {
        // padding-left: 27px;
        font-size: 14px;
        .sub-menu-item {
          padding: 0 10px 0 33px;
          display: block;
          cursor: pointer;
          line-height: 30px;
          color: #4a4a4c;
          text-decoration: none;
        }
        .active {
          background: #ddd;
        }
        .sub-menu-item:hover {
          font-size: 16px;
          color: rgb(184, 97, 71);
        }
      }
    }
  }
  .right-main {
    background: rgb(255, 255, 255, 0.4);
  }

  .header {
    background: rgb(255, 255, 255, 0.5);
    border-bottom: 1px soild #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #3f4042;
    .logo {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
        // display: block;
        font-size: 25px;
      }
    }
    .user-info {
      display: flex;
      align-items: center;
      .el-dropdown-link {
        cursor: pointer;
        color: rgb(184, 97, 71, 0.9);
        // margin-top: 4px;
        .iconfont {
          font-size: 14px;
        }
      }
      .avatar {
        margin-left: 10px;
        width: 50px;
        img {
          border-radius: 25px;

          width: 100%;
        }
      }
    }
  }
}
</style>
