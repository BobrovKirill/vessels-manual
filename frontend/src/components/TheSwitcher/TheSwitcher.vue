<script setup lang="ts">
import SvgIcon from '~/components/SvgIcon/SvgIcon.vue'

function handleSwitcher() {
  console.log('switcher')
}
</script>

<template>
  <button class="switcher" @click="handleSwitcher()">
    <SvgIcon class="switcher__icon" :color="$viewport.isGreaterThan('mobileWide') && '#fff'" name="ellipse" />
  </button>
</template>

<style scoped lang="scss">
.switcher {
  border: 1px solid white;
  border-radius: 50px;
  display: flex;
  padding: 7px;
  width: 74px;
  height: 37px;

  @include breakpoint('tablet') {
    border: 1px solid $first-font;
  }

  @include breakpoint('desktop') {
    border: 1px solid $first-font;
    border-radius: 50px;
    display: flex;
    padding: 9px;
    max-width: 93px;
    width: 100%;
    max-height: 55px;
    height: 100%;
  }

}

.switcher__icon {
  max-width: 20px;
  max-height: 20px;

  @include breakpoint('desktop') {
    max-width: 36px;
    max-height: 36px;
  }
}
</style>
