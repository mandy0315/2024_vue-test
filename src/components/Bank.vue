<script setup lang="ts">
import { ref } from 'vue';
import { Bank } from '/src/utils/bank-practice.ts';
const account = ref('');
const money = ref(0);
const status = ref('');

const bank = new Bank();
const handleOpenAccount = () => {
  status.value = bank.openAccount(account.value);
  account.value = '';
};
const handleDeposit = () => {
  status.value = bank.deposit(account.value, money.value);
  account.value = '';
  money.value = 0;
};
const handleWithdraw = () => {
  status.value = bank.withdraw(account.value, money.value);
  account.value = '';
  money.value = 0;
};
</script>

<template>
  <section>
    <h1 class="pt-10 text-4xl">銀行</h1>
    <p class="bg-yellow-100 my-2">
      狀態：<span data-test="status">{{ status }}</span>
    </p>

    帳戶:<input data-test="input_account" v-model="account" type="text" class="border border-gray-400 block" />
    金額：<input
      data-test="input_money"
      v-model="money"
      type="number"
      min="0"
      class="border border-gray-400 w-20 block"
    />
    <button @click="handleOpenAccount()" data-test="button_open-account" class="bg-green-100 m-2 p-2">開戶</button>
    <button @click="handleDeposit()" data-test="button_deposit" class="bg-blue-100 m-2 p-2">存款</button>
    <button @click="handleWithdraw()" data-test="button_withdraw" class="bg-blue-100 m-2 p-2">提款</button>
  </section>
</template>
