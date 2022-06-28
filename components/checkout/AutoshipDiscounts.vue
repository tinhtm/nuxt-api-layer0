<template>
  <div class="flex flex-col gap-y-3 p-[24px_28px_40px_28px]">
    <div class="flex items-center justify-between">
      <span class="text-[28px] leading-[30px] text-[#2A363E] font-bold">Autoship discounts</span>
      <button class="text-[12px] leading-[26px] text-[#013253] cursor-pointer font-bold" @click="handleClose">CLOSE</button>
    </div>
    <p class="text-[14px] leading-[20px]">Autoship was designed for you to save both time and money when reordering your favorite products and you are rewarded for your loyalty</p>
    <p class="text-[14px] leading-[20px]">Discounts are applied automatically based on the numbers of autoship renewals up to a maximum of 10%.</p>
    <table>
      <tr>
        <th class="pb-1">
          <span class="text-[14px] leading-[16px] font-bold text-[#013253]">Autoship 1st renewal</span>
        </th>
        <th class="pb-1 border-l border-dashed border-[#70707040]">
          <span class="text-[14px] leading-[16px] font-bold text-[#013253]">Autoship 2nd renewal</span>
        </th>
        <th class="pb-1 border-l border-dashed border-[#70707040]">
          <span class="text-[14px] leading-[16px] font-bold text-[#013253]">Autoship 3rd renewal</span>
        </th>
        <th class="pb-1 border-l border-dashed border-[#70707040]">
          <span class="text-[14px] leading-[16px] font-bold text-[#013253]">Autoship 4th renewal</span>
        </th>
      </tr>
      <tr class="border-t border-t-[#70707040] border-b border-b-[#70707040]">
        <td
          v-for="n in 4"
          :key="n"
          class="text-center pt-2 pb-1 border-l border-dashed first:border-l-0 border-[#70707040]"
        >
          <span class="text-[20px] leading-[16px] font-bold text-[#013253]">{{ (n * 2) + 4 }}%</span>
        </td>
      </tr>
    </table>
    <p class="text-[14px] leading-[20px]">Note: Canceling or pausing autoship will reset your discount Tier level. Rescheduling the shipment to another future date will not reset your discounts.</p>
    <p class="text-[14px] leading-[20px]">Using a different coupon code will replace your discount as discounts are not cumulative.</p>
    <p class="text-[14px] leading-[20px]">Important: You will be notified 5 days before your autoship is scheduled for renewal so you can do any modifications to your autoship. In the last 24h before renewal no changes can be made.</p>
    <p class="text-[14px] leading-[20px]">Please make sure you have sufficient funds o the credit card assigned to autoship. If payment will fail due to insuficient funds your autoship will be paused thus resulting in a Tier discount reset.</p>
  </div>
</template>

<script setup>
const props = defineProps({
  handleClose: Function
})
</script>