<script setup lang="ts">
import { useRam } from '~/services'

async function fetchTest() {
  // Fetch запрос, как пример
  const response = await fetch(`http://localhost:1337/api/quez`)
  const json = await response.json()
  console.log(json)

  // Обертка fetch'a которую будем юзать мы, в ней потом допишем логику для пользователя
  const { data } = await useRam('GET', 'quez')
  console.log(data)
}
</script>

<template>
  <div :class="$style.layout">
    <TheHeader />
    <button @click="fetchTest">
      TEST FETCH
    </button>
    <main>
      <nuxt-page />
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss" module>
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
