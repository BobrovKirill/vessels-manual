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
        src="@/assets/images/header/logo.png"
      >
    </NuxtLink>

    <Nav :list="navList" />

    <TheBurger v-if="$viewport.isLessThan('desktop')" :list="navList" />

    <TheAccountEntry />
  </header>
</template>

<style lang="scss" scoped>
.header {
  max-width: 1400px;
  width: 100%;
  height: $header-height-mobile;

  margin: 0 auto;
  padding-left: 6px;

  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  background-color: white;
  @include shadow();

  display: flex;
  align-items: center;

  position: relative;

  @include breakpoint('tablet') {
    height: $header-height-tablet;
    padding-left: 16px;
  }

  @include breakpoint('desktop') {
    height: $header-height-desk;

    border-right: 1px solid #000000;
    border-left: 1px solid #000000;
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
