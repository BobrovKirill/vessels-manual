<script setup lang="ts">
defineProps({
  data: {
    required: true,
    type: Object,
  },
})
</script>

<template>
  <NuxtLink class="card" :to="{ path: '/example', query: data.value }">
    <dl class="card__header">
      <div>
        <dt class="card__title">
          регион&nbsp;плаванья
        </dt>
        <dd class="card__subtitle">
          {{ data.region }}
        </dd>
      </div>

      <div>
        <dt class="card__title">
          тип&nbsp;судна
        </dt>
        <dd class="card__subtitle">
          {{ data.vessel }}
        </dd>
      </div>
    </dl>

    <img :alt="data.alt" class="card__img" :src="data.img">

    <span class="card__btn">
      ПЕРЕЙТИ К ТЕСТУ
    </span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 8px;

  border: 2px solid rgba(color('blue'), 0.4);
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 2px solid $accent;

    .card__btn {
      display: block;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 10px;

    width: 100%;

    padding: 0 0 10px;
    margin: 0;
    font-family: "Martian Mono";
  }

  &__title {
    margin: 0 0 6px;
    font-size: 12px;
    text-transform: uppercase;
    color: black;
  }

  &__subtitle {
    margin: 0;

    text-transform: uppercase;
    font-size: 18px;
    font-weight: 700;
    color: black;
  }

  &__img {
    display: block;

    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__btn {
    display: none;
    position: absolute;
    top: 50%;
    color: white;
    text-decoration: none;
    background-color: $accent;
    padding: 17px 42px;
    cursor: pointer;

    @include breakpoint('tablet') {
      font-size: 16px;
      padding: 17px 72px;
    }

    @include breakpoint('desktop') {
      font-size: 16px;
      padding: 17px 72px;
    }
  }
}
</style>
