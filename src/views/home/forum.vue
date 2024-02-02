<script setup>
defineOptions({
  name: 'ForumPage'
});

const list = [
  {
    title: 'Title',
    time: 'time',
    location: 'location'
  },
  {
    title: 'Title',
    time: 'time',
    location: 'location'
  },
  {
    title: 'Title',
    time: 'time',
    location: 'location'
  }
];

const isEdit = ref(false);
</script>

<template>
  <div class="mx-auto max-w-640px">
    <h2 class="text-center">My Agenda</h2>

    <n-card v-if="isEdit" title="Choose Your Agenda">
      <n-collapse default-expanded-names="['1', '2']">
        <n-collapse-item title="2024 MPF Main Forum" name="1">
          <n-radio-group name="participationMethod">
            <n-radio value="1">
              <div>date</div>
              <div>location</div>
            </n-radio>
          </n-radio-group>
        </n-collapse-item>
        <n-collapse-item title="MPF High-level Roundtable Meeting" name="2">
          <n-radio-group name="participationMethod">
            <n-radio value="2">
              <div>date</div>
              <div>location</div>
            </n-radio>
          </n-radio-group>
        </n-collapse-item>
        <n-collapse-item title="MPF Thematic forum" name="3">
          <n-radio-group name="participationMethod" class="flex-col">
            <n-radio value="3">
              <div>Forum Name</div>
              <div>date</div>
              <div>location</div>
            </n-radio>
            <n-radio value="4">
              <div>Forum Name</div>
              <div>date</div>
              <div>location</div>
            </n-radio>
            <n-radio value="5">
              <div>Forum Name</div>
              <div>date</div>
              <div>location</div>
            </n-radio>
            <n-radio value="6">
              <div>Forum Name</div>
              <div>date</div>
              <div>location</div>
            </n-radio>
          </n-radio-group>
        </n-collapse-item>
        <n-collapse-item title="Linkage Activities" name="3">
          <n-radio-group name="participationMethod" class="flex-col">
            <n-radio value="7">
              <div>Forum Name</div>
              <div>date</div>
              <div>location</div>
            </n-radio>
            <n-radio value="8">
              <div>Forum Name</div>
              <div>date</div>
              <div>location</div>
            </n-radio>
          </n-radio-group>
        </n-collapse-item>
      </n-collapse>
    </n-card>

    <n-card v-else v-for="item in list" :key="index" :title="item.title" class="mb-20px">
      <div>{{ item.time }}</div>
      <div>{{ item.location }}</div>
    </n-card>

    <div class="flex justify-end mt-20px">
      <n-button round type="primary" @click="isEdit = !isEdit">
        {{ isEdit ? 'save' : 'edit' }}
      </n-button>
    </div>
  </div>
</template>
