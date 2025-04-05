<script setup lang="ts">
import Nav from '~/components/Nav/Nav.vue'

import TheAccountEntry from '~/components/TheAccountEntry/TheAccountEntry.vue'
import { navList } from '~/components/TheHeader/index'
import TheSwitcher from '~/components/TheSwitcher/TheSwitcher.vue'
</script>

<template>
  <header class="header">
    <TheSwitcher v-if="$viewport.isGreaterThan('mobileWide')" />

    <NuxtLink class="header__logo" to="/">
      <img
        alt="Лого сайта"
        src="@/assets/images/header/icon.png"
      >
    </NuxtLink>

    <Nav :list="navList" />

    <TheBurger v-if="$viewport.isLessThan('desktop')" :list="navList" />

    <TheAccountEntry />
  </header>
</template>

<style lang="scss" scoped>
.header {
  max-width: 320px;
  width: 100%;
  height: $header-height-mobile;
  margin: 0 auto;
  border: 1px solid #000000;
  display: flex;

  align-items: center;
  padding-left: 5px;
  position: relative;

  @include breakpoint('tablet') {
    max-width: 744px;
    height: $header-height-tablet;
    padding-left: 15px;
  }

  @include breakpoint('desktop') {
    max-width: 1400px;
    height: $header-height-desk;
  }

}

.header__logo {
  width: $header-height-mobile;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @include breakpoint('tablet') {
    position: absolute;

    left: 50%;
    transform: translateX(-50%);

    width: $header-height-tablet;
  }

  @include breakpoint('desktop') {
    width: $header-height-desk;
  }
}
</style>
