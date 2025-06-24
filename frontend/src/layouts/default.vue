<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <TheHeader />
    <main class="main">
      <div class="container">
        <nuxt-page />
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style lang="scss">
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  background-color: white;
  @include shadow();
}

.main {
  min-width: 1px;
}
</style>
