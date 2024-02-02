<script setup>
defineOptions({
  name: 'QrcodePage'
});

const text = ref('text');
</script>

<template>
  <div class="mx-auto max-w-640px text-center">
    <h2>My MPF QR Code</h2>

    <n-qr-code :value="text" size="200" />

    <h5>Please Use this QR Code for Venue and Meal Check-in.</h5>
  </div>
</template>
