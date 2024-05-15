<script setup>
import { Icon } from '@iconify/vue';

import { useAppStore } from '@/stores';
import { verifyPwd } from '@/utils/common';

import { register } from '@/service/api/auth';

defineOptions({
  name: 'RegisterView'
});

const route = useRoute();
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

const app = useAppStore();

/** 登录 */
async function handleSubmit() {
  if (!model.email || model.email.trim() === '') {
    return message.warning('Please fill email!');
  }
  if (!verifyPwd(model.password)) {
    return;
  }
  if (model.password !== model.confirmPassword) {
    return message.warning('Password is not same with confirmPassword!');
  }
  register(model.email, model.password).then(() => {
    showModal.value = true;
  });
}

const showModal = ref(false);

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
      class="relative mx-auto mt-10rem bg-#F1F1F1 w-85rem pt-8rem pb-6rem px-17rem box-border border-rd-2rem <sm:mt-0 <sm:w-70rem <sm:px-6rem"
    >
      <div class="mx-auto w-32rem mb-2rem">
        <img src="/images/mpf-login-logo@2x.png" class="w-32rem h-10rem" />
      </div>

      <div class="text-2.6rem color-#044EB3 text-center line-height-2.7rem">
        2024 Maritime Silk Road Port International Cooperation Forum
      </div>
      <main class="pt-24px">
        <div
          v-if="app.isMobile"
          class="text-2.6rem color-#BCBDBE line-height-2.6rem mt-2rem mb-1rem"
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
              placeholder="Create a profile with your email *"
              @update:value="handleEmail"
            />
          </n-form-item>
          <n-form-item path="password">
            <n-input
              class="h-7rem line-height-7rem <sm:h-8rem <sm:line-height-8rem"
              type="password"
              v-model:value="model.password"
              placeholder="Create Password *"
            />
          </n-form-item>

          <div class="color-#7d7d7d <sm:text-1.2rem mt-1rem">
            — Please enter at least 8 characters
          </div>
          <div class="color-#7d7d7d <sm:text-1.2rem">— Please enter at least one number</div>
          <div class="color-#7d7d7d <sm:text-1.2rem mb-2rem">
            — Please enter one special character (!+,-./:;<=>?@)
          </div>

          <n-form-item path="password">
            <n-input
              class="h-7rem line-height-7rem mb-2rem <sm:h-8rem <sm:line-height-8rem"
              type="password"
              v-model:value="model.confirmPassword"
              placeholder="Confirm Password *"
            />
          </n-form-item>
        </n-form>

        <n-button
          class="w-20rem mt-6rem"
          type="primary"
          size="large"
          strong
          :block="true"
          :round="true"
          @click="handleSubmit"
        >
          Register Now
        </n-button>
      </main>
    </div>

    <n-modal
      v-model:show="showModal"
      :auto-focus="false"
      :close-on-esc="false"
      :mask-closable="false"
    >
      <div class="flex-center">
        <n-card class="text-center p-3rem" :bordered="false" role="dialog" aria-modal="true">
          <div class="text-3rem flex-center">
            <Icon icon="material-symbols:attach-email-outline" class="mr-2rem" />
            Please go to your email to Sign In!
          </div>
        </n-card>
      </div>
    </n-modal>
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
