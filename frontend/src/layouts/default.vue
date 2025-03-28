<script setup lang="ts">
console.log('default layouts')
</script>

<template>
  <div :class="$style.layout">
    <TheHeader />
    <main>
      <nuxt-page />
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss" module>
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
