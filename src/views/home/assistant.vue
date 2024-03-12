<script setup>
import { useAppStore } from '~/src/stores';
import { getMemberInfo } from '@/service/api/mpf';

defineOptions({
  name: 'AssistantPage'
});

const { mpfId } = useAppStore();

getMemberInfo(mpfId);
</script>

<template>
  <div class="ml-450px max-w-1050px pt-70px">
    <div class="text-5rem font-bold text-center mb-100px">My Assistant</div>

    <div class="flex-y-center" style="border-top: 1px solid #eee">
      <img src="/images/assistant-icon-name@2x.png" alt="" class="w-3.5rem h-3.5rem mr-2rem" />
      <div class="w-240px text-30px font-bold mr-110px">Name</div>
      <div class="text-24px color-#595757 flex-1 py-4rem" style="border-bottom: 1px solid #eee">
        Wash
      </div>
    </div>

    <div class="flex-y-center" style="border-bottom: 1px solid #eee">
      <img
        src="/images/assistant-icon-telephone@2x.png"
        alt=""
        class="w-35px h-35px mr-20px <sm:w-98px <sm:h-98px"
      />
      <div class="w-240px text-30px font-bold mr-110px">Contact Number</div>
      <div class="text-24px color-#595757 flex-1 py-4rem" style="border-bottom: 1px solid #eee">
        +77 6688 9990
      </div>
    </div>
  </div>
</template>
