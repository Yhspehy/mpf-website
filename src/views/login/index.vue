<script setup>
defineOptions({
  name: 'LoginView'
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
    return message.warning('Please fill email!');
  }
  if (!model.password) {
    router.push('/register');
  }
}
</script>

<template>
  <div
    class="relative flex-center wh-full"
    style="
      background-image: linear-gradient(
        45deg,
        #0c3483 0%,
        #a2b6df 100%,
        #6b8cce 100%,
        #a2b6df 100%
      );
    "
  >
    <div
      class="rounded-6px w-600px overflow-x-hidden"
      style="box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3)"
    >
      <div class="py-30px bg-var px-40px box-border">
        <header class="text-center">
          <n-gradient-text type="primary" :size="28">海丝论坛</n-gradient-text>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px transition-color font-medium">Login</h3>
          <div class="pt-24px">
            <transition name="fade-slide" mode="out-in" appear>
              <n-form :model="model" size="large" :show-label="false">
                <n-form-item path="userName">
                  <n-input :value="model.userName" @update:value="handleEmail" />
                </n-form-item>
                <n-form-item path="password">
                  <n-input v-model:value="model.password" type="password" />
                </n-form-item>
                <n-space :vertical="true" :size="24">
                  <n-button
                    type="primary"
                    size="large"
                    :block="true"
                    :round="true"
                    @click="handleSubmit"
                  >
                    登录/注册
                  </n-button>
                </n-space>
              </n-form>
            </transition>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
