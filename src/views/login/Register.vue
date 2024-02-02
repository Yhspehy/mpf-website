<script setup lang="ts">
defineOptions({
  name: 'RegisterView'
});

const message = useMessage();
const router = useRouter();
const model = reactive({
  email: '',
  password: ''
});

function handleEmail(value) {
  const upperValue = value.toUpperCase().trim();
  model.email = upperValue;
  model.password = '';
}

/** 登录 */
async function handleSubmit() {
  if (!model.email) {
    return message.warning('请先输入邮箱!');
  }
  if (!model.password) {
    return message.warning('请先输入密码!');
  }
}
</script>

<template>
  <div class="relative flex-center wh-full">
    <div class="rounded-6px w-600px overflow-x-hidden">
      <div class="py-30px bg-var px-40px box-border">
        <header class="text-center text-32px">
          Maritime Silk Road Por International Cooperation Forum
        </header>
        <main class="pt-24px">
          <div class="pt-24px w-80% mx-auto">
            <n-form :model="model" size="large" label-placement="left" label-width="150">
              <n-form-item path="userName">
                <n-input
                  :value="model.userName"
                  @update:value="handleEmail"
                  placeholder="Create a profile with your email*"
                />
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="model.password"
                  type="password"
                  placeholder="Create Password*"
                />
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="model.password"
                  type="password"
                  placeholder="Confirm Password*"
                />
              </n-form-item>
              <n-space :vertical="true" :size="24">
                <n-button type="primary" size="large" :block="true" @click="handleSubmit">
                  Register Now
                </n-button>
              </n-space>
            </n-form>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
