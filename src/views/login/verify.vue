<script setup>
import { useAppStore } from '@/stores';
import { verify } from '@/service/api/auth';
defineOptions({
  name: 'VerifyView'
});

const router = useRouter();
const model = reactive({
  email: ''
});

const app = useAppStore();

/** 登录 */
async function handleSubmit() {
  if (!model.email || model.email.trim() === '') {
    return message.warning('Please fill email!');
  }
  verify(model.email).then((res) => {
    if (res) {
      router.push('/login?email=' + model.email);
    } else {
      router.push('/register?email=' + model.email);
    }
  });
}
</script>

<template>
  <div class="wh-full bg flex-col-center login-page">
    <nav-bar />

    <img
      src="/images/flower.gif"
      class="w-60rem h-42rem absolute bottom-0 left-6rem <sm:w-40rem <sm:h-28rem <sm:left-24% <sm:bottom-76%"
      alt=""
    />
    <img
      v-if="!app.isMobile"
      src="/images/rest.gif"
      class="w-80rem h-66rem absolute bottom--14rem right--6rem"
      alt=""
    />
    <img src="/images/mpf-login-bgup.png" class="absolute-br w-full" />
    <div
      class="relative mx-auto mt-10rem bg-#F1F1F1 w-85rem py-8rem px-17rem box-border border-rd-2rem <sm:w-70rem <sm:px-6rem"
    >
      <div class="mx-auto w-32rem mb-2rem">
        <img src="/images/mpf-login-logo@2x.png" class="w-32rem h-10rem" />
      </div>
      <div class="text-2.6rem color-#044EB3 text-center line-height-2.7rem">
        2024 Maritime Silk Road Port International Cooperation Forum
      </div>

      <main class="pt-2.4rem">
        <div
          v-if="app.isMobile"
          class="text-2.6rem color-#BCBDBE line-height-2.6rem mt-2rem mb-1rem"
        >
          Sign in with your email and password or create a profile if you are new.
        </div>
        <n-form
          :model="model"
          size="large"
          label-placement="left"
          label-width="100"
          :show-feedback="false"
        >
          <n-form-item path="email">
            <n-input
              class="h-7rem line-height-7rem mb-2rem <sm:h-8rem <sm:line-height-8rem"
              v-model:value="model.email"
              placeholder="E-mail"
            />
          </n-form-item>
        </n-form>

        <div
          class="color-#ABABAC text-1.8rem mb-11rem cursor-pointer mt-2rem <sm:mb-16rem"
          @click="router.push('/register')"
        >
          * Create a profile with your email.
        </div>

        <n-button
          class="w-20rem"
          type="primary"
          size="large"
          strong
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
  background-size: 100%;
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
