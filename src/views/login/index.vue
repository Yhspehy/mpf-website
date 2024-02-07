<script setup>
defineOptions({
  name: 'LoginView'
});

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
  // if (!model.email) {
  //   return message.warning('Please fill email!');
  // }
  if (!model.password) {
    router.push('/register');
  }
}
</script>

<template>
  <div class="relative flex-col-center wh-full">
    <header class="w-600px text-center text-32px mobile:text-22px">
      Maritime Silk Road Por natfonal Cooperation Forum
    </header>
    <div class="py-30px bg-var w-480px px-40px box-border">
      <main class="pt-24px">
        <n-form :model="model" size="large" label-placement="left" label-width="100">
          <n-form-item path="userName">
            <n-input :value="model.userName" @update:value="handleEmail" />
          </n-form-item>

          <n-form-item path="password">
            <n-input :value="model.password" />
          </n-form-item>
        </n-form>

        <n-button
          class="w-200px"
          type="primary"
          size="large"
          :block="true"
          :round="true"
          @click="handleSubmit"
        >
          CONTINUE
        </n-button>
      </main>
    </div>
  </div>
</template>
