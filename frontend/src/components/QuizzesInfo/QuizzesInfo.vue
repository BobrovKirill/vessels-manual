<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="info">
    <dl class="info__list">
      <template v-for="(item, name) in data" :key="name">
        <dt class="info__title">
          {{ item.name }}:
        </dt>

        <dd class="info__text">
          {{ item.value || '-' }} {{ name === 'timeLimit' && item.value ? 'мин' : '' }}
        </dd>
      </template>
    </dl>
  </div>
</template>

<style scoped lang="scss">
.info {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  @include breakpoint('tablet') {
    position: relative;
  }

  &__list {
    position: sticky;
    top: 0;

    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 12px;

    padding: 12px 16px;
    margin: 0;

    border-left: 1px solid black;
    border-bottom: 1px solid black;
    background-color: white;

    @include breakpoint('tablet') {
      gap: 24px;
      padding: 24px;
    }
  }

  &__title {
    margin: 0;
    font-size: 10px;
    text-align: end;

    @include breakpoint('tablet') {
      font-size: 12px;
    }
  }

  &__text {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    margin: 0;
    font-weight: 700;
    font-size: 14px;

    color: $secondary;

    @include breakpoint('tablet') {
      font-size: 16px;
    }
  }
}
</style>
