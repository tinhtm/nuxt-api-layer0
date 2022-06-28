<template>
  <div v-for="noti in globalNotification">
    <div
      class="m-[0_0_10px] p-[12px_20px_12px_12px] text-[14px] bg-[#e5efe5] text-[#006400] relative flex gap-3"
      :class="{ 'text-[red] , bg-[#ff687057]': noti.isError }"
    >
      <div class="rounded-[50%] bg-[#006400]">
        <Icon type="success" width="24px" height="24px" color="white"></Icon>
      </div>
      <span>{{ noti.message }} </span>
    </div>
  </div>
</template>

<script setup>
const globalNotification = useGlobalNotification();
watch(globalNotification.value, () => {
  setTimeout(() => {
    globalNotification.value.splice(0, 1);
  }, 3000);
});
</script>
