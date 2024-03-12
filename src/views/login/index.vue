<script setup>
import { login } from '@/service/api/auth';
import { localStg } from '@/utils/storage';

defineOptions({
  name: 'LoginView'
});

const router = useRouter();
const route = useRoute();
const message = useMessage();
const model = reactive({
  email: '',
  password: ''
});

function handleEmail() {
  model.password = '';
}

/** 登录 */
async function handleSubmit() {
  if (!model.email || model.email.trim() === '') {
    return message.warning('Please fill email!');
  }
  if (!model.password) {
    return message.warning('Please fill password!');
  }
  login(model.email, model.password).then((res) => {
    localStg.set('token', res.message.token);
    localStg.set('email', model.email);
    if (res.statusCode === '0000') {
      router.push('/home/person');
    } else {
      message.error(res.message);
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
      class="mx-auto mt-100px py-30px bg-var w-850px h-640px py-80px px-170px box-border border-rd-20px"
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
              placeholder="E-mail"
              @update:value="handleEmail"
            />
          </n-form-item>

          <n-form-item path="password">
            <n-input
              class="h-68px line-height-68px"
              v-model:value="model.password"
              placeholder="Password"
            />
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

<style scoped lang="scss">
.bg {
  background-image: url('/images/mpf-login-bg.png');
}
</style>
