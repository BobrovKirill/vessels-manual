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
  <div class="layout">
    <TheHeader />
    <button @click="fetchTest">
      TEST FETCH
    </button>

    <main>
      <div class="container">
        <nuxt-page />
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style lang="scss">
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid black;
}
</style>
