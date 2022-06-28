<template>
  <div>
    <Head>
      <Link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap&display=swap"
      />
      <Link rel="icon" type="image/x-icon" href="/favicon.png" />
    </Head>
    <Header />
    <global-message />
    <main class="px-[15px] xl:px-0 w-screen lg:w-full xl:max-w-7xl m-auto pb-10">
      <GlobalNotification />
      <slot />
    </main>
  </div>
</template>

<style>
html {
  font-family: 'Roboto', sans-serif;
}
</style>
