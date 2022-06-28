<template>
  <div class="box-border flex justify-center w-[100%] p-[0_15px]">
    <div
      class="flex justify-center flex-col w-[370px] p-[33px] shadow-[0px_3px_6px] shadow-[#00000029] relative text-[14px] text-center"
    >
      <h2 class="text-[36px] mb-[20px] text-[#013253]">Hello!</h2>
      <div>
        <p class="text-[14px] text-[#000000CC]">Insert your email address</p>
      </div>
      <div class="m-[10px_0]">
        <CheckoutInput />
      </div>
      <button
        class="w-[100%] p-[15px] flex justify-center items-center bg-[#0091a8] cursor-pointer border-none rounded-[3px] text-[16px] font-bold text-[#fff] transition-all duration-[0.2s] my-[10px]"
      >
        CONTINUE
      </button>
      <div class="p-[0_10px] text-[12px] mt-[10px] text-[#8f8f8f]">
        <p>If you do not have an account, don't worry, you can create one in the following steps.</p>
      </div>
    </div>
    <!-- <div
      class="relative block text-[16px] font-bold text-[#013253] mt-[25px] before:content-[' '] before:absolute before:top-[50%] before:translate-y-[-50%] before:w-[40%] before:h-[1px] before:bg-[#C5C5C5] before:left-0"
    >
      <span>OR</span>
    </div> -->
  </div>
</template>
