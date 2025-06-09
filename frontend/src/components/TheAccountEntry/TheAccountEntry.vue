<script setup lang="ts">
const isAuthorized = false
</script>

<template>
  <button class="entry">
    <template v-if="isAuthorized">
      <img alt="Аватар" class="entry__avatar" src="#">
      <span class="entry__name">Имя</span>
    </template>
    <SvgIcon v-else class="entry__icon" name="lk" />
  </button>
</template>

<style scoped lang="scss">
.entry {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  height: 100%;
  width: 34px;
  cursor: pointer;

  background-color: $accent;

  padding: 8px;

  @include breakpoint('tablet') {
    width: 64px;
  }

  @include breakpoint('desktop') {
    width: 130px;
  }
}

.entry__avatar {
  width: 24px;
  height: 24px;
}

.entry__name {
  font-size: 14px;
  line-height: 16px;
}

.entry__icon {
  width: 29px;
  height: 29px;

  @include breakpoint('desktop') {
    width: 63px;
    height: 63px;
  }

}
</style>
