<script setup>
import { useAppStore } from '@/stores';
import { getQrCode } from '@/service/api/mpf';

defineOptions({
  name: 'QrcodePage'
});

const router = useRouter();
const app = useAppStore();

const qrcodeUrl = ref('');
if (app.mpfId) {
  getQrCode(app.mpfId).then((res) => {
    if (res) {
      qrcodeUrl.value = res;
    }
  });
}
</script>

<template>
  <div class="bg-#E6FCFB w-full pt-7rem" style="height: calc(100vh - 8rem)">
    <img
      v-if="app.isMobile"
      src="/images/rest.gif"
      class="w-80% absolute bottom--10rem left-10rem"
    />

    <img
      v-if="!app.isMobile"
      src="/images/thanks.gif"
      class="w-20rem h-20rem absolute top-30rem right-30%"
    />

    <div class="relative mx-auto w-64rem text-center">
      <div class="text-2.3rem font-bold">Thank You for Your Registration!</div>
      <div class="text-2.3rem font-bold mb-10rem">
        Please SAVE this QR Code for Venue and Meal Check-In.
      </div>

      <img :src="qrcodeUrl" class="w-26rem h-26rem" style="-webkit-touch-callout: default" />

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
