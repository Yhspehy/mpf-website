<script setup>
defineOptions({
  name: 'QrcodePage'
});
</script>

<template>
  <div class="mx-auto max-w-640px text-center">
    <h2>MPF QR Code</h2>
    <n-qr-code value="text" size="200" />
  </div>
</template>
