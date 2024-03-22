<script setup>
import { useAppStore } from '@/stores';

defineOptions({
  name: 'QrcodePage'
});

const app = useAppStore();

const text = ref('text');
</script>

<template>
  <div class="bg-#E6FCFB w-full pt-7rem" style="height: calc(100vh - 8rem)">
    <div class="mx-auto w-64rem text-center">
      <div class="text-5rem font-bold mb-20rem">My MPF QR Code</div>

      <n-qr-code :value="text" :size="200" class="box-content" />

      <div class="text-2rem color-#989898 mt-3rem">
        Please Use this QR Code for Venue and Meal Check-in.
      </div>
      <div v-if="app.isMobile" class="text-2rem color-#989898 mt-3rem">
        Please long press this QR Code to save it to your album.
      </div>
    </div>
  </div>
</template>
