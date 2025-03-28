<script setup lang="ts">
import { table } from 'node:console';
import Nav from '~/components/Nav/Nav.vue'
import { navList } from '~/components/TheHeader/index'

console.log('TheHeader is loaded')


  
</script>

<template>
  <header class="header">
    <button  class="header__buttontheme">
      <svg
        class="header__buttontheme__svg"
        fill="none"
        height="36"
        viewBox="0 0 36 36"
        width="36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          fill="#213341"
          r="18"
        />
      </svg>
    </button>

    <NuxtLink class="header__nav__logo" to="/tests">
      <img
        class="header__logo__img"
        height="100"
        src="../../assets/images/header/icon.png"
        width="101"
      >
    </NuxtLink>
    <Nav :list="navList" />
    <!--    <nav class="header__nav"> -->
    <!--      <ul v-if="$viewport.isGreaterThan('tablet')" class="header__nav__list"> -->
    <!--        <li class="header__nav__list__item first__item__left"> -->
    <!--          <NuxtLink to="/tests"> -->
    <!--            Тесты -->
    <!--          </NuxtLink> -->
    <!--        </li> -->
    <!--        <li class="header__nav__list__item second__item__left"> -->
    <!--          <NuxtLink to="/info"> -->
    <!--            Информация -->
    <!--          </NuxtLink> -->
    <!--        </li> -->
    <!--        <li class="header__nav__list__item first__item__right"> -->
    <!--          <NuxtLink to="/info-project"> -->
    <!--            О&nbsp;проекте -->
    <!--          </NuxtLink> -->
    <!--        </li> -->
    <!--        <li class="header__nav__list__item second__item__right"> -->
    <!--          <NuxtLink to="/more"> -->
    <!--            Теория -->
    <!--          </NuxtLink> -->
    <!--        </li> -->
    <!--      </ul> -->
    <!--      <TheBurger v-else /> -->
    <!--    </nav> -->
    <theBurger v-if="$viewport.isLessThan('desktop')"></theBurger>
    <NuxtLink class="header__login__link">
      <svg
        class="header__login__link__svg"
        fill="none"
        height="63"
        viewBox="0 0 63 63"
        width="63"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.3563 44.8875C17.5875 43.1813 20.0813 41.8359 22.8375 40.8516C25.5938 39.8672 28.4813 39.375 31.5 39.375C34.5187 39.375 37.4062 39.8672 40.1625 40.8516C42.9188 41.8359 45.4125 43.1813 47.6437 44.8875C49.175 43.0938 50.3672 41.0594 51.2203 38.7844C52.0734 36.5094 52.5 34.0812 52.5 31.5C52.5 25.6812 50.4547 20.7266 46.3641 16.6359C42.2734 12.5453 37.3187 10.5 31.5 10.5C25.6812 10.5 20.7266 12.5453 16.6359 16.6359C12.5453 20.7266 10.5 25.6812 10.5 31.5C10.5 34.0812 10.9266 36.5094 11.7797 38.7844C12.6328 41.0594 13.825 43.0938 15.3563 44.8875ZM31.5 34.125C28.9188 34.125 26.7422 33.2391 24.9703 31.4672C23.1984 29.6953 22.3125 27.5187 22.3125 24.9375C22.3125 22.3563 23.1984 20.1797 24.9703 18.4078C26.7422 16.6359 28.9188 15.75 31.5 15.75C34.0812 15.75 36.2578 16.6359 38.0297 18.4078C39.8016 20.1797 40.6875 22.3563 40.6875 24.9375C40.6875 27.5187 39.8016 29.6953 38.0297 31.4672C36.2578 33.2391 34.0812 34.125 31.5 34.125ZM31.5 57.75C27.8687 57.75 24.4562 57.0609 21.2625 55.6828C18.0687 54.3047 15.2906 52.4344 12.9281 50.0719C10.5656 47.7094 8.69531 44.9313 7.31719 41.7375C5.93906 38.5438 5.25 35.1313 5.25 31.5C5.25 27.8687 5.93906 24.4562 7.31719 21.2625C8.69531 18.0687 10.5656 15.2906 12.9281 12.9281C15.2906 10.5656 18.0687 8.69531 21.2625 7.31719C24.4562 5.93906 27.8687 5.25 31.5 5.25C35.1313 5.25 38.5438 5.93906 41.7375 7.31719C44.9313 8.69531 47.7094 10.5656 50.0719 12.9281C52.4344 15.2906 54.3047 18.0687 55.6828 21.2625C57.0609 24.4562 57.75 27.8687 57.75 31.5C57.75 35.1313 57.0609 38.5438 55.6828 41.7375C54.3047 44.9313 52.4344 47.7094 50.0719 50.0719C47.7094 52.4344 44.9313 54.3047 41.7375 55.6828C38.5438 57.0609 35.1313 57.75 31.5 57.75Z" fill="#FEF7FF" />
      </svg>
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

.header__nav__list {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  align-items: center;

}

.header__nav__list__item {
  color: #B82132;
  font-size: 14px;
  position: absolute;
}

.header__nav{

  @include breakpoint('desktop') {
    display: flex;
    margin-left: auto;
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

.header__buttontheme__svg {

  @include breakpoint('tablet') {
    max-width: 20px;
    max-height: 20px;
  }

  @include breakpoint('desktop') {
    max-width: 36px;
    max-height: 36px;
  }
}

.header__login__link {
  background: #B82132;

  

  @include breakpoint('tablet') {
    padding: 16px 16px;
  }

  @include breakpoint('desktop') {
    padding: 15.5px 44px;
    
  }
}

.header__login__link__svg {
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

.header__nav__logo {
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

.header__logo__img {
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
