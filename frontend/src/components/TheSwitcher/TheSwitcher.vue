<script setup lang="ts">

</script>

<template>
  <fieldset class="switcher">
    <legend class="switcher__legend">
      Переключение темная / светлая тема
    </legend>

    <input
      aria-label="Светлая"
      class="switcher__radio"
      name="color-scheme"
      type="radio"
      value="light"
    >

    <input
      aria-label="Темная"
      checked
      class="switcher__radio"
      name="color-scheme"
      type="radio"
      value="dark"
    >
  </fieldset>
</template>

<style scoped lang="scss">
.switcher {
  position: relative;

  margin: 0;
  padding: 2px 8px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;

  border: 1px solid $main;
  border-radius: 50px;

  width: 74px;
  height: 36px;

  background-color: $secondary;

  @include breakpoint('tablet') {
    border: 1px solid $second-font;
    background-color: $main;
  }

  @include breakpoint('desktop') {
    border: 1px solid $first-font;

    width: 96px;
    height: 56px;
  }
}

.switcher__legend {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.switcher__radio {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 22px;
  height: 22px;
  background-color: inherit;
  transition: background-color 0.1s ease-in;
  border-radius: 100%;

  @include breakpoint('desktop') {
    width: 36px;
    height: 36px;
  }

  &:checked {
    background-color: $main;

    @include breakpoint('tablet') {
      background-color: $second-font;
    }
  }
}
</style>
