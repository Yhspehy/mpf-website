<script setup lang="ts">
import EmailLogin from './EmailLogin.vue'

defineOptions({
  name: 'RegisterView'
})
</script>

<template>
  <div
    class="relative flex-center wh-full"
    style="
      background-image: linear-gradient(
        45deg,
        #0c3483 0%,
        #a2b6df 100%,
        #6b8cce 100%,
        #a2b6df 100%
      );
    "
  >
    <div
      class="flex rounded-6px w-1000px overflow-x-hidden"
      style="box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3)"
    >
      <div
        class="flex-1"
        style="
          background-image: url(https://pic.imgdb.cn/item/653b5e89c458853aef23aa1d.jpg);
          background-size: cover;
        "
      ></div>

      <div class="w-45% py-30px bg-var px-40px box-border">
        <header class="text-center">
          <n-gradient-text type="primary" :size="28">海丝论坛</n-gradient-text>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px transition-color font-medium">邮箱注册</h3>
          <div class="pt-24px">
            <transition name="fade-slide" mode="out-in" appear>
              <email-login type="2" />
            </transition>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
