<script setup>
defineOptions({
  name: 'QrcodePage'
});

const text = ref('text');
</script>

<template>
  <div class="mx-auto max-w-640px text-center">
    <h2>MPF QR Code</h2>

    <n-qr-code :value="text" size="200" />

    <h5>Please use this QR code to sign in</h5>
    <h5 class="cursor-pointer" @click="text = Math.random() + 'text'">
      click to update the QR code.
    </h5>
  </div>
</template>
