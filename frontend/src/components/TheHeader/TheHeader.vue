<script setup lang="ts">
console.log('TheHeader is loaded')
</script>

<template>
  <div class="page-header">
    <header>
      <nav class="header-nav">
        <div class="menu">
          <button class="header_buttontheme">
            <svg class="header_buttontheme_svg" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#213341"/>
            </svg>
          </button>
          <NuxtLink class="header_menu_item" to="/tests">Тесты</NuxtLink>
          <NuxtLink class="header_menu_item" to="/info">Информация</NuxtLink>
          <img class="header_logo" src="../../assets/images/header/icon.png" height="100" width="101"/>
          <NuxtLink class="header_menu_item" to="/info-project">О проекте</NuxtLink>
          <NuxtLink class="header_menu_item" to="/more">Что то еще</NuxtLink>
          <button class="header_burgermenu">
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H0V1H16V0ZM16 7H0V8H16V7Z" fill="#B82132"/>
            </svg>
          </button>
          <NuxtLink class="header-lklink" to="/more">
            <svg class="header_lklink_svg" width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3563 44.8875C17.5875 43.1813 20.0813 41.8359 22.8375 40.8516C25.5938 39.8672 28.4813 39.375 31.5 39.375C34.5187 39.375 37.4062 39.8672 40.1625 40.8516C42.9188 41.8359 45.4125 43.1813 47.6437 44.8875C49.175 43.0938 50.3672 41.0594 51.2203 38.7844C52.0734 36.5094 52.5 34.0812 52.5 31.5C52.5 25.6812 50.4547 20.7266 46.3641 16.6359C42.2734 12.5453 37.3187 10.5 31.5 10.5C25.6812 10.5 20.7266 12.5453 16.6359 16.6359C12.5453 20.7266 10.5 25.6812 10.5 31.5C10.5 34.0812 10.9266 36.5094 11.7797 38.7844C12.6328 41.0594 13.825 43.0938 15.3563 44.8875ZM31.5 34.125C28.9188 34.125 26.7422 33.2391 24.9703 31.4672C23.1984 29.6953 22.3125 27.5187 22.3125 24.9375C22.3125 22.3563 23.1984 20.1797 24.9703 18.4078C26.7422 16.6359 28.9188 15.75 31.5 15.75C34.0812 15.75 36.2578 16.6359 38.0297 18.4078C39.8016 20.1797 40.6875 22.3563 40.6875 24.9375C40.6875 27.5187 39.8016 29.6953 38.0297 31.4672C36.2578 33.2391 34.0812 34.125 31.5 34.125ZM31.5 57.75C27.8687 57.75 24.4562 57.0609 21.2625 55.6828C18.0687 54.3047 15.2906 52.4344 12.9281 50.0719C10.5656 47.7094 8.69531 44.9313 7.31719 41.7375C5.93906 38.5438 5.25 35.1313 5.25 31.5C5.25 27.8687 5.93906 24.4562 7.31719 21.2625C8.69531 18.0687 10.5656 15.2906 12.9281 12.9281C15.2906 10.5656 18.0687 8.69531 21.2625 7.31719C24.4562 5.93906 27.8687 5.25 31.5 5.25C35.1313 5.25 38.5438 5.93906 41.7375 7.31719C44.9313 8.69531 47.7094 10.5656 50.0719 12.9281C52.4344 15.2906 54.3047 18.0687 55.6828 21.2625C57.0609 24.4562 57.75 27.8687 57.75 31.5C57.75 35.1313 57.0609 38.5438 55.6828 41.7375C54.3047 44.9313 52.4344 47.7094 50.0719 50.0719C47.7094 52.4344 44.9313 54.3047 41.7375 55.6828C38.5438 57.0609 35.1313 57.75 31.5 57.75Z" fill="#FEF7FF"/>
            </svg>
          </NuxtLink>
        </div>
      </nav>
    </header>
  </div>
</template>

<style lang="scss" scoped>
  header {
    border: 1px solid #0a0a0a;
    border-top: none;
  }

  .page-header {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    font-family: 'Martian Mono', serif; ;
  }

  a {
    text-decoration: none;
    color: inherit;
    padding: 0;
    margin: 0;
  }
  .header-lklink {
    background-color: #dc0a19;
    padding: 5px;
    display: inline-flex;

    @include breakpoint('tablet') {
      padding: 18px;
    }

    @include breakpoint('desktop') {
      padding: 23px 44px;
    }

  }
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;

  }

  .header_nav {
    max-width: 34px;
    width: 100%;

  }

  .header_buttontheme {
    display: none;
    max-width: 100px;
    width: 100%;
    align-items: center;
    border: 1px solid #0a0a0a;
    border-radius: 30px;
    padding: 9px;

    @include breakpoint('tablet') {
      display: flex;
      padding: 8px;
      max-width: 74px;
      margin-right: auto;
    }

    @include breakpoint('desktop') {
      display: flex;
      padding: 9px;
      max-width: 93px;
      margin-right: auto;

    }

  }

  .header_buttontheme_svg {

    @include breakpoint('tablet') {
      max-width: 18px;
      max-height: 18px;
    }

    @include breakpoint('desktop') {
      max-width: 36px;
      max-height: 36px;
    }

  }

  .header_logo {
    max-width: 34px;
    max-height: 34px;
    margin-right: auto;
    padding: 0;
    width: 100%;
    height: 100%;

    @include breakpoint('tablet') {
      margin: 0;
      max-width: 65px;
      max-height: 65px;
      margin-right: auto;
    }

    @include breakpoint('desktop') {
      margin-right: auto;
      max-width: 101px;
      max-height: 101px;
    }

  }
  .header_menu_item {
    display: none;
    color: #B82132;
    font-size: 14px;

    @include breakpoint('desktop') {
      display: block;
      margin-right: auto;
    }

  }

  .header_lklink_svg {
    width: 24px;
    height: 24px;

    @include breakpoint('tablet') {
      width: 29px;
      height: 29px;
    }

    @include breakpoint('desktop') {
      width: 63px;
      height: 63px;
    }

  }

  .header_burgermenu {
    display: block;
    margin-right: 20px;

    @include breakpoint('desktop') {
      display: none;
    }

  }

</style>