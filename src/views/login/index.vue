<script setup>
import { useAppStore } from '@/stores';
import { localStg } from '@/utils/storage';

import { login, sendForgetEmail } from '@/service/api/auth';
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

function forgetPwd() {
  if (!model.email || model.email.trim() === '') {
    return message.warning('Please fill email!');
  }
  sendForgetEmail(model.email).then((res) => {
    message.success('Send success!');
    router.push('/forget?email=' + model.email);
  });
}

if (route.query.email) {
  model.email = route.query.email;
}
</script>

<template>
  <div
    class="wh-full flex-col-center login-page"
    :class="{
      'bg-pc': !app.isMobile,
      'bg-mobile': app.isMobile
    }"
  >
    <nav-bar />

    <img
      src="/images/flower.gif"
      class="w-60rem h-42rem fixed bottom-0 left-6rem <sm:w-40rem <sm:h-28rem <sm:static"
      alt=""
    />
    <img
      v-if="!app.isMobile"
      src="/images/rest.gif"
      class="w-80rem h-66rem fixed bottom--14rem right--6rem"
      alt=""
    />
    <img src="/images/mpf-login-bgup.png" class="absolute-br w-full" />

    <div
      class="relative mx-auto mt-10rem bg-#F1F1F1 w-85rem py-8rem px-17rem box-border border-rd-2rem <sm:mt-0 <sm:w-70rem <sm:px-6rem"
    >
      <div class="mx-auto w-32rem mb-2rem">
        <img src="/images/mpf-login-logo@2x.png" class="w-32rem h-10rem" />
      </div>
      <div class="text-2.6rem color-#044EB3 text-center line-height-2.7rem">
        2024 Maritime Silk Road Port International Cooperation Forum
      </div>
      <main class="pt-2.4rem">
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
              type="password"
              v-model:value="model.password"
              placeholder="Password"
            />
          </n-form-item>
        </n-form>

        <div class="color-#044EB3 text-2rem text-right my-3rem cursor-pointer" @click="forgetPwd">
          Forget Password？
        </div>

        <n-button
          class="w-20rem mt-6rem <sm:mt-10rem"
          type="primary"
          size="large"
          strong
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
.bg-pc {
  background-image: url('/images/mpf-login-bg.png');
  background-size: cover;
}

.bg-mobile {
  background-image: url('/images/mpf-bg-mobile.png');
  background-size: cover;
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
