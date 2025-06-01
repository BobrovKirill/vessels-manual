<script setup lang="ts">
import MainCard from '~/components/MainCard/MainCard.vue'
import { MOST_POPULAR_CARDS } from '~/components/MainCards/index'
</script>

<template>
  <section class="cards">
    <h2 class="cards__title">
      Популярные
    </h2>

    <ul class="cards__list">
      <li v-for="(card, id) in MOST_POPULAR_CARDS" :key="id">
        <MainCard :data="card" />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.cards {
  max-width: 1400px;
  width: 100%;

  padding: 50px 16px 12px;
  margin: 0 auto;

  &__title {
    margin: 0 0 36px;

    text-align: center;
    font-size: 48px;
    line-height: 50px;
    font-family: font('secondary');
    font-weight: 700;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;

    margin: 0;
    padding: 0;

    list-style: none;

    @include breakpoint('desktop') {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
