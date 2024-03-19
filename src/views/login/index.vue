<script setup>
import { useAppStore } from '@/stores';
import { localStg } from '@/utils/storage';

import { login } from '@/service/api/auth';
import { getMember } from '@/service/api/mpf';

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

const app = useAppStore();

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
    localStg.set('token', res.token);
    localStg.set('email', model.email);

    if (res.token) {
      getMember(model.email).then((res) => {
        if (res.code === '0') {
          localStg.set('mpfId', res.data.id);
          app.mpfId = res.data.id;
          router.push('/home/person');
        }
      });
    }
  });
}

if (route.query.email) {
  model.email = route.query.email;
}
</script>

<template>
  <div class="wh-full bg flex-col-center login-page">
    <nav-bar />
    <div
      class="mx-auto mt-10rem bg-#F1F1F1 w-85rem py-8rem px-17rem box-border border-rd-2rem <sm:w-70rem <sm:px-6rem"
    >
      <div class="text-center text-10.8rem color-#0040FF line-height-11rem mb-2rem <sm:text-12rem">
        MPF 2024
      </div>
      <div class="text-2.6rem color-#0040FF text-center line-height-2.7rem">
        The 8th Maritime Silk Road Port International Cooperation Forum
      </div>
      <main class="pt-2.4rem">
        <div
          v-if="app.isMobile"
          class="text-2.6rem color-#BCBDBE line-height-2.6rem mt-4rem mb-1rem"
        >
          Create a profile with your email.
        </div>
        <n-form
          :model="model"
          size="large"
          label-placement="left"
          label-width="100"
          :show-feedback="false"
        >
          <n-form-item path="userName">
            <n-input
              class="h-7rem line-height-7rem mb-2rem <sm:h-8rem <sm:line-height-8rem"
              v-model:value="model.email"
              placeholder="E-mail"
              @update:value="handleEmail"
            />
          </n-form-item>

          <n-form-item path="password">
            <n-input
              class="h-7rem line-height-7rem <sm:h-8rem <sm:line-height-8rem"
              v-model:value="model.password"
              placeholder="Password"
            />
          </n-form-item>
        </n-form>

        <n-button
          class="w-20rem mt-6rem <sm:mt-10rem"
          type="primary"
          size="large"
          :block="true"
          :round="true"
          @click="handleSubmit"
        >
          Sign In
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

<style lang="scss">
.login-page .n-input__input-el {
  height: 7rem !important;
}
.mobile .login-page .n-input__input-el {
  height: 8rem !important;
}
</style>
