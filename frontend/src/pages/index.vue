<script setup lang="ts">
import { useNuxtApp } from '#app'

const { $viewport } = useNuxtApp()

console.log('index page')

const isShowTestBlock = computed(() => $viewport.isGreaterThan('tablet'))
</script>

<template>
  <div>
    <h1>Pages</h1>

    <SvgIcon name="close" />

    <div class="background-test" />

    <div v-if="$viewport.isLessThan('tablet')">
      viewport test
    </div>

    <div v-if="isShowTestBlock">
      viewport test 2
    </div>

    <div>{{ isShowTestBlock }}</div>
  </div>
</template>

<style lang="scss" scoped>
 h1 {
   color: brown;
 }

 .background-test {
   background-color: tomato;
   height: 600px;
   width: 600px;
   background-image: url("@/assets/images/footer-background.png");
 }
</style>
