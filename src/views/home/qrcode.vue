<script setup>
import { useAppStore } from '@/stores';

defineOptions({
  name: 'QrcodePage'
});

const router = useRouter();
const app = useAppStore();

const text = ref('text');
</script>

<template>
  <div class="bg-#E6FCFB w-full pt-7rem" style="height: calc(100vh - 8rem)">
    <img
      v-if="app.isMobile"
      src="/images/rest.gif"
      class="w-80% absolute bottom--10rem left-10rem"
    />
    <div class="relative mx-auto w-64rem text-center">
      <div class="text-2.3rem font-bold">Thank You for Your Registration!</div>
      <div class="text-2.3rem font-bold mb-10rem">
        Please Use this QR Code for Venue and Meal Check-In.
      </div>

      <img
        v-if="!app.isMobile"
        src="/images/thanks.gif"
        class="w-20rem h-20rem absolute top-24rem right--2rem"
      />

      <n-qr-code :value="text" :size="200" class="box-content" />

      <div class="flex-center gap-3rem mt-10rem">
        <n-button
          color="#044EB3"
          class="h-5.6rem border-rd-2.8rem <sm:h-7rem <sm:border-rd-3.5rem"
          @click="router.push('/home/forum?type=edit')"
          >Edit Your Agenda</n-button
        >
        <n-button
          color="#044EB3"
          class="h-5.6rem border-rd-2.8rem <sm:h-7rem <sm:border-rd-3.5rem"
          @click="router.push('/home/service?type=edit')"
          >Edit Your Pick-Up and Hotel
        </n-button>
      </div>
    </div>
  </div>
</template>
