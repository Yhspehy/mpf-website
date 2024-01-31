<script setup>
defineOptions({
  name: 'ServicePage'
});
</script>

<template>
  <div class="mx-auto max-w-640px">
    <h2 class="text-center">MPF Service</h2>
    <n-card title="Inbound Journey" class="mb-20px">
      <div>Travel Method</div>
      <div>Flight/Class</div>
      <div>Arrival Time</div>
      <div>Location</div>
    </n-card>

    <n-card title="Back Journey" class="mb-20px">
      <div>Travel Method</div>
      <div>Flight/Class</div>
      <div>Departure time</div>
      <div>Location</div>
    </n-card>

    <n-card title="My Hotel" class="mb-20px">
      <div>My Hotel</div>
      <div>Room Type</div>
      <div>Payment Method</div>
    </n-card>

    <div class="flex justify-end">
      <n-button round type="primary"> edit </n-button>
    </div>
  </div>
</template>
