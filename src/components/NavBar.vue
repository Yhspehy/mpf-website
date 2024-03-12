<script setup>
defineOptions({
  name: 'NavBar'
});

const router = useRouter();

const navList = [
  {
    name: 'HOME'
  },
  {
    name: 'ABOUT'
  },
  {
    name: 'GUIDE'
  },
  {
    name: 'MEDIA'
  },
  {
    name: 'MY MPF'
  },
  {
    name: 'MANAGEMENT'
  },
  {
    name: 'CONTACT'
  }
];
</script>

<template>
  <div class="w-full color-#fff flex-y-center h-120px pl-170px">
    <img src="/images/nav-top-logo.png" class="w-160px h-82px" />
    <div class="nav-list">
      <div v-for="item in navList" :key="item.name" class="cursor-pointer">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-list {
  @include flex-center;
  gap: 90px;
  margin-left: 50px;
  padding-left: 70px;
  height: 80px;
  border-left: 1px solid #fff;
  font-size: 18px;
}
</style>
