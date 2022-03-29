<template>
  <n-tabs v-if="home" v-model:value="tabValue" type="line" size="large">
    <n-tab-pane name="daily-pictures" tab="daily-pictures">
      <p>This is the entrance to <b>daily-pictures</b> </p>
      <n-button :block="true" circle type="info" @click="handleClick">
        view
      </n-button>
    </n-tab-pane>
    <n-tab-pane name="hundred-day-pictures" tab="hundred-day-pictures">
      <p>This is the entrance to <b>hundred-day-pictures</b> </p>
      <n-button :block="true" circle type="info" @click="handleClick">
        view
      </n-button>
    </n-tab-pane>
    <n-tab-pane name="my-sercet-pictures" tab="my-sercet-pictures">
      <p>This is the entrance to <b>hundred-day-pictures</b> </p>
      <n-button :block="true" circle type="info" @click="handleClick">
        view
      </n-button>
    </n-tab-pane>
  </n-tabs>
  <div v-else>
    <n-page-header subtitle="欢迎进入" @back="handleBack">
      <gallery :photoes="photoes" :rootPath="rootPath" v-if="active"></gallery>
      <caroules :photoes="photoes" :rootPath="rootPath" v-else></caroules>
      <template #title>
        <n-switch v-model:value="active">
          <template #checked>
            画廊模式
          </template>
          <template #unchecked>
            轮播模式
          </template>
        </n-switch>
      </template>
    </n-page-header>
  </div>
  <n-modal 
    :show="showModal"
    preset="dialog"
    title="需要密码访问"
    positive-text="确认"
    negative-text="取消"
    :closable="false"
    @positive-click="submitCallback"
    @negative-click="closeModal">
    <n-input
      type="password"
      show-password-on="mousedown"
      placeholder="请输入访问密码"
      :maxlength="8"
      v-model:value="password"
    />
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';
import caroules from './components/caroules.vue';
import gallery from './components/gallery.vue';
import { useMessage } from 'naive-ui'
  const message = useMessage()
  const active = ref(false);
  const home = ref(true);
  const showModal = ref(false);
  const tabValue = ref('daily-pictures');
  const password = ref(null);
  const photoes = ref([]);
  const rootPath = ref(null);
  const getPics = (name) => {
    fetch(`http://localhost:21314?name=${name}`)
      .then(response => response.json())
      .then(res => {
        if(res.success && res.filesPath?.length) {
          photoes.value = res.filesPath
          rootPath.value = 'http://localhost:21314/' + name;
        } else {
          message.error('请求失败')
        }
      })
  }
  const handleClick = () => {
    if(tabValue.value === 'my-sercet-pictures') {
      showModal.value = true;
      return 
    }
    getPics(tabValue.value)
    home.value = false
  }
  const handleBack = () => {
    home.value = true
  }
  const closeModal = () => {
    showModal.value = false
  }
  const submitCallback = () => {
    if(password.value === '20200213') { 
      getPics(tabValue.value)
      home.value = false
      showModal.value = false
      return
    }
    message.error('密码错误')
  }
</script>
