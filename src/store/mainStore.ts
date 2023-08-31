import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('mainStore', () => {
  const count = ref(0);
  const loginInfo = ref({
    isLogin: false,
    adminName: '',
  });

  const doubleCount = computed(() => count.value * 2);
  const increment = (): void => {
    count.value++;
    console.log(count.value);
  };

  const handleLogin = (): void => {
    loginInfo.value.isLogin = true;
    loginInfo.value.adminName = 'mandy';
    console.log(loginInfo.value.adminName);
  };

  return { count, doubleCount, increment, loginInfo, handleLogin };
});
