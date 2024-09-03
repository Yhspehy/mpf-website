<script setup>
import { useAppStore } from '@/stores';

defineOptions({
  name: 'MpfInfo'
});

const app = useAppStore();
</script>

<template>
  <div
    class="w-full min-h-100vh pb-20px flex-col items-center login-page"
    :class="{
      'bg-pc': !app.isMobile,
      'bg-mobile': app.isMobile
    }"
  >
    <nav-bar />

    <img src="/images/forum-info-all.webp" class="wh-full" />

    <!-- <img
      src="/images/flower.gif"
      class="w-60rem h-42rem fixed bottom-0 left-6rem <sm:w-40rem <sm:h-28rem <sm:static"
      alt=""
    />
    <template v-if="!app.isMobile">
      <img src="/images/rest.gif" class="w-80rem h-66rem fixed bottom--14rem right--6rem" alt="" />
      <img src="/images/mpf-login-bgup.png" class="absolute-br w-full" />
    </template>

    <div
      class="relative mx-auto bg-#F1F1F1 w-85rem py-6rem px-6rem box-border border-rd-2rem <sm:w-70rem"
    >
      <div class="text-18px text-center font-bold">论坛定位及宗旨</div>
      <div class="text-16px text-center my-20px">海丝港口合作论坛</div>
      <div class="text-16px indent-10px">
        “海丝港口合作论坛”是“一带一路”框架下港航合作开放交流和互学互鉴平台。论坛积极响应“一带一路”倡议和世界一流强港建设战略，立足服务构建新发展格局，打造“一带一路”框架下港航合作交流平台，推动建设全球港航命运共同体。
      </div>
      <div class="text-16px">
        论坛积极弘扬“和平合作，开放包容，互学互鉴，互利互赢”的丝路精神，坚持“平等、合作、互利、共赢”的宗旨，遵循“共商、共建、共享”的原则。
      </div>
    </div>

    <div
      class="relative mx-auto mt-20px bg-#F1F1F1 w-85rem py-6rem px-6rem box-border border-rd-2rem <sm:w-70rem"
    >
      <div class="text-18px text-center font-bold">论坛定位及宗旨</div>
      <div class="text-16px text-center my-20px">海丝港口合作论坛</div>
      <div class="text-16px indent-10px">
        “海丝港口合作论坛”是“一带一路”框架下港航合作开放交流和互学互鉴平台。论坛积极响应“一带一路”倡议和世界一流强港建设战略，立足服务构建新发展格局，打造“一带一路”框架下港航合作交流平台，推动建设全球港航命运共同体。
      </div>
      <div class="text-16px">
        论坛积极弘扬“和平合作，开放包容，互学互鉴，互利互赢”的丝路精神，坚持“平等、合作、互利、共赢”的宗旨，遵循“共商、共建、共享”的原则。
      </div>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.bg-pc {
  background-image: url('/images/mpf-login-bg.png');
  background-size: cover;
  padding-top: 120px;
}

.bg-mobile {
  background-image: url('/images/mpf-bg-mobile.png');
  background-size: cover;
  background-repeat: repeat-y;
  padding-top: 10rem;
}
</style>
