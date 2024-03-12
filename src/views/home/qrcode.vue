<script setup>
defineOptions({
  name: 'QrcodePage'
});

const text = ref('text');
</script>

<template>
  <div class="bg-#E6FCFB pt-70px" style="height: calc(100vh - 80px)">
    <div class="mx-auto max-w-640px text-center">
      <div class="text-50px font-bold mb-200px">My MPF QR Code</div>

      <n-qr-code :value="text" size="200" />

      <div class="text-20px color-#989898 mt-30px">
        Please Use this QR Code for Venue and Meal Check-in.
      </div>
    </div>
  </div>
</template>
