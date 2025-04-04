<script setup lang="ts">
import Nav from '~/components/Nav/Nav.vue'

import { navList } from '~/components/TheHeader/index'
import TheSwitcher from '~/components/TheSwitcher/TheSwitcher.vue'

console.log('TheHeader is loaded')
</script>

<template>
  <header class="header">
    <TheSwitcher v-if="$viewport.isGreaterThan('mobileWide')" />

    <NuxtLink class="header__logo" to="/">
      <img
        class="header__logo-img"
        height="100"
        src="../../assets/images/header/icon.png"
        width="101"
      >
    </NuxtLink>

    <Nav :list="navList" />

    <TheBurger v-if="$viewport.isLessThan('desktop')" :list="navList" />

    <NuxtLink class="header__login">
      <SvgIcon class="header__login-icon" name="lk" />
    </NuxtLink>
  </header>
</template>

<style lang="scss" scoped>
.header {
  max-width: 320px;
  width: 100%;
  max-height: 36px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #000000;
  display: flex;

  align-items: center;
  padding-left: 5px;
  position: relative;

  @include breakpoint('tablet') {
    max-width: 744px;
    width: 100%;
    max-height: 67px;
    height: 100%;
    padding-left: 15px;
  }

  @include breakpoint('desktop') {
    max-width: 1400px;
    width: 100%;
    max-height: 100px;
    height: 100%;
  }

}

.header__login {
  background: $accent;

  @include breakpoint('tablet') {
    padding: 16px 16px;
  }

  @include breakpoint('desktop') {
    padding: 16px 44px;

  }
}

.header__login-icon {
  padding: 0;
  margin: 0;
  width: 29px;
  height: 29px;

  @include breakpoint('tablet') {
    width: 29px;
    height: 29px;
  }

  @include breakpoint('desktop') {
    width: 63px;
    height: 63px;
  }

}

.header__logo {
  position: absolute;

  @include breakpoint('tablet') {
    right: 46%;
    width: 65px;
    height: 65px;
  }

  @include breakpoint('desktop') {
    right: 50%;
    padding: 0;
    margin: 0;
    max-height: 98px;
    height: 100%;
  }

}

.header__logo-img {
  width: 34px;
  height: 35px;

  @include breakpoint('tablet') {
    width: 65px;
    height: 65px;
  }

  @include breakpoint('desktop') {
    width: 101px;
    height: 98px;
  }
}
</style>
