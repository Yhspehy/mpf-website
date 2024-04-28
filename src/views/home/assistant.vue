<script setup>
import { useAppStore } from '@/stores';
import { getMemberInfo } from '@/service/api/mpf';

defineOptions({
  name: 'AssistantPage'
});

const { mpfId } = useAppStore();

const assistant = ref({});

getMemberInfo(mpfId).then((res) => {
  if (res.data.volunteerForumTemp) {
    assistant.value = res.data.volunteerForumTemp.find((e) => e.type === 1);
  }
});
</script>

<template>
  <div class="relative mx-auto w-105rem pt-7rem <sm:w-70rem">
    <div class="color-#044EB3 text-5rem font-bold text-center mb-10rem <sm:text-left">
      My Assistant
    </div>

    <img
      src="/images/thanks.gif"
      class="w-20rem h-20rem absolute top-8rem right-0rem <sm:top-4rem"
    />

    <div class="card relative bg-#fff">
      <div class="flex-y-center border-t <sm:border-none">
        <img
          src="/images/assistant-icon-name@2x.png"
          alt=""
          class="w-3.5rem h-3.5rem mr-2rem <sm:self-start <sm:top-4.5rem <sm:relative"
        />
        <div class="flex-y-center flex-1 <sm:flex-col <sm:items-start">
          <div class="w-24rem text-3rem font-bold mr-11rem <sm:py-4rem <sm:w-full <sm:border-b">
            Name
          </div>
          <div class="text-2.4rem color-#595757 flex-1 py-4rem border-b <sm:w-full">
            {{ assistant.nameEn || '' }}
          </div>
        </div>
      </div>

      <div class="flex-y-center border-b <sm:border-none">
        <img
          src="/images/assistant-icon-name@2x.png"
          alt=""
          class="w-3.5rem h-3.5rem mr-2rem <sm:self-start <sm:top-4.5rem <sm:relative"
        />
        <div class="flex-y-center flex-1 <sm:flex-col <sm:items-start">
          <div class="w-24rem text-3rem font-bold mr-11rem <sm:py-4rem <sm:w-full <sm:border-b">
            Contact Number
          </div>
          <div class="text-2.4rem color-#595757 flex-1 py-4rem <sm:w-full">
            {{ assistant.tel || '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mobile .card {
  border: 1px solid #eee;
  padding: 0 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0 #eee;
}
</style>
