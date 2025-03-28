<script setup lang="ts">
import Nav from '~/components/Nav/Nav.vue'

import { navList } from '~/components/TheHeader/index'

console.log('TheHeader is loaded')
</script>

<template>
  <header class="header">
    <button class="header__buttontheme">
      <SvgIcon class="header__buttontheme-svg" name="ellipse" />
    </button>

    <NuxtLink class="header__nav-logo" to="/tests">
      <img
        class="header__logo-img"
        height="100"
        src="../../assets/images/header/icon.png"
        width="101"
      >
    </NuxtLink>
    <Nav :list="navList" />
    <theBurger v-if="$viewport.isLessThan('desktop')" />
    <NuxtLink class="header__login-link">
      <SvgIcon class="header__login-link-svg" name="lk" />
    </NuxtLink>
  </header>
</template>

<style lang="scss" scoped>
a {
    text-decoration: none;
    color: inherit;
    padding: 0;
    margin: 0;
  }

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

.header__buttontheme {
  display: none;

  @include breakpoint('tablet') {
    border: 1px solid #000000;
    border-radius: 50px;
    display: flex;
    padding: 7px;
    max-width: 74px;
    width: 100%;
    max-height: 37px;
    height: 100%;
  }

  @include breakpoint('desktop') {
    border: 1px solid #000000;
    border-radius: 50px;
    display: flex;
    padding: 9px;
    max-width: 93px;
    width: 100%;
    max-height: 55px;
    height: 100%;
  }

}

.header__buttontheme-svg {

  @include breakpoint('tablet') {
    max-width: 20px;
    max-height: 20px;
  }

  @include breakpoint('desktop') {
    max-width: 36px;
    max-height: 36px;
  }
}

.header__login-link {
  background: #B82132;

  @include breakpoint('tablet') {
    padding: 16px 16px;
  }

  @include breakpoint('desktop') {
    padding: 15.5px 44px;

  }
}

.header__login-link-svg {
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

.header__nav-logo {
  position: absolute;

  @include breakpoint('tablet') {
    position: absolute;
    right: 46%;
    width: 65px;
    height: 65px;
  }

  @include breakpoint('desktop') {
    position: absolute;
    right: 50.3%;
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
