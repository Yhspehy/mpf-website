<script setup>
import { verify } from '@/service/api/auth';
defineOptions({
  name: 'VerifyView'
});

const router = useRouter();
const model = reactive({
  email: '670395851@qq.com'
});

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
          <n-form-item path="email">
            <n-input
              class="h-68px line-height-68px"
              v-model:value="model.email"
              placeholder="E-mail"
            />
          </n-form-item>
        </n-form>

        <div
          class="color-#ABABAC text-18px mb-110px cursor-pointer"
          @click="router.push('/register')"
        >
          * Create a profile with your email.
        </div>

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
