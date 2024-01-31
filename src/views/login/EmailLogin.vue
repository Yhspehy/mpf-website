<script setup>
defineProps({
  type: String
})
const message = useMessage()
const router = useRouter()
const model = reactive({
  email: '',
  password: ''
})

function handleEmail(value) {
  const upperValue = value.toUpperCase().trim()
  model.email = upperValue
  model.password = ''
}

/** 登录 */
async function handleSubmit() {
  if (!model.email) {
    return message.warning('请先输入邮箱!')
  }
  if (!model.password) {
    router.push('/register')
  }
}
</script>

<template>
  <n-form :model="model" size="large" :show-label="false">
    <n-form-item path="userName">
      <n-input :value="model.userName" placeholder="请输入邮箱" @update:value="handleEmail" />
    </n-form-item>
    <n-form-item path="password">
      <n-input v-model:value="model.password" type="password" placeholder="请输入密码" />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">
        {{ type === '1' ? '登录/注册' : '注册' }}
      </n-button>
    </n-space>
  </n-form>
</template>
