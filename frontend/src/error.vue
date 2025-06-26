<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

console.error('[App Error]', props.error)

useHead({
  title: `Ошибка ${props.error?.statusCode || ''}`,
})

const route = useRoute()

const is404 = computed(() => props.error?.statusCode === 404)

const title = is404.value ? 'Страница не найдена' : 'Страница недоступна'
const subtitle = is404.value
  ? 'Возможно, она удалена, переименована, или просто временно недоступна. Но скорей всего мы просто еще не успели ее реализовать, она обязательно скоро появиться!'
  : 'Мы уже знаем о проблеме и занимаемся ее решением. Попробуйте зайти позднее.'

function handleError(event: Event) {
  event.preventDefault()
  clearError({ redirect: '/' })
}
</script>

<template>
  <section class="error">
    <h1 v-if="error.statusCode" class="error__code">
      {{ error.statusCode }}
    </h1>

    <p class="error__title">
      {{ title }}
    </p>

    <p class="error__subtitle">
      {{ subtitle }}
    </p>

    <NLink
      v-if="route.path !== '/'"
      class="error__link"
      to="/"
      @click="handleError"
    >
      На главную
    </NLink>
  </section>
</template>

<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 42px;

  padding: 0 16px;

  &__code {
    font-size: 63px;
    line-height: 70px;

    margin: 0;
  }

  &__title {
    font-size: 44px;
    line-height: 46px;

    text-align: center;

    margin: 0;
  }

  &__subtitle {
    font-size: 24px;
    line-height: 32px;
    text-align: center;

    margin: 0;
    width: 80%;
  }

  &__link {
    background-color: $accent;

    font-size: 33px;
    line-height: 36px;
    color: #fff;

    padding: 24px 36px;
    margin: 16px 0 0;
    cursor: pointer;
  }
}
</style>
