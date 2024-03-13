import { defineStore } from 'pinia';
import { localStg } from '@/utils/storage';

export const useAppStore = defineStore('app-store', {
  state: () => ({
    mpfId: localStg.get('mpfId'),
    isMobile: false
  })
});
