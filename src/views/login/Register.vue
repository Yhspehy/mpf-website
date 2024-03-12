<script setup>
import { register } from '@/service/api/auth';

defineOptions({
  name: 'RegisterView'
});

const route = useRoute();
const router = useRouter();
const message = useMessage();

const model = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});

function handleEmail() {
  model.password = '';
  model.confirmPassword = '';
}

/** 登录 */
async function handleSubmit() {
  if (!model.email || model.email.trim() === '') {
    return message.warning('Please fill email!');
  }
  if (model.password !== model.confirmPassword) {
    return message.warning('Password is not same withconfirmPassword!');
  }
  register(model.email, model.password).then((res) => {
    if (res.statusCode === '0000') {
      message.success('Send email success!');
    }
  });
}

if (route.query.email) {
  model.email = route.query.email;
}
</script>

<template>
  <div class="wh-full bg">
    <nav-bar />
    <div
      class="mx-auto mt-100px py-30px bg-var w-850px h-740px py-80px px-170px box-border border-rd-20px"
    >
      <div class="text-108px color-#0040FF line-height-110px">MPF 2024</div>
      <div class="text-22px color-#0040FF text-center">
        The 8th Maritime Silk Road Port International Cooperation Forum
      </div>
      <main class="pt-24px">
        <n-form :model="model" size="large" label-placement="left" label-width="100">
          <n-form-item path="userName">
            <n-input
              class="h-68px line-height-68px"
              v-model:value="model.email"
              placeholder="Create a profile with your email *"
              @update:value="handleEmail"
            />
          </n-form-item>

          <n-form-item path="password">
            <n-input
              class="h-68px line-height-68px"
              v-model:value="model.password"
              placeholder="Create Password *"
            />
          </n-form-item>

          <n-form-item path="password">
            <n-input
              class="h-68px line-height-68px"
              v-model:value="model.confirmPassword"
              placeholder="Confirm Password *"
            />
          </n-form-item>
        </n-form>

        <n-button
          class="w-200px mt-80px"
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

<style scoped lang="scss">
.bg {
  background-image: url('/images/mpf-login-bg.png');
}
</style>
