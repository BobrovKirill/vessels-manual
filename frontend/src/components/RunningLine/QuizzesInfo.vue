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
          <template v-if="typeof item.value === 'string'">
            {{ item.value }}
          </template>

          <template v-if="Array.isArray(item.value)">
            <span v-for="(text, id) in item.value" :key="id">
              {{ text }}
            </span>
          </template>
        </dd>
      </template>
    </dl>
  </div>
</template>

<style scoped lang="scss">
.info {
  position: relative;

  &__list {
    position: sticky;
    top: 0;

    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;

    padding: 24px;
    margin: 0;

    border-left: 1px solid black;
    border-bottom: 1px solid black;
  }

  &__title {
    margin: 0;
    font-size: 12px;
    text-align: end;
  }

  &__text {
    margin: 0;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
