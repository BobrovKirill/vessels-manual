<script setup lang="ts">
import { useNuxtApp } from '#app'
import { useRam } from '~/services'

const { $viewport } = useNuxtApp()

console.log('index page')

const isShowTestBlock = computed(() => $viewport.isGreaterThan('tablet'))

async function fetchTest() {
  // Fetch запрос, как пример
  // const response = await fetch(`http://localhost:1337/api/quez`)
  // const json = await response.json()
  // console.log(json)

  // Обертка fetch'a которую будем юзать мы, в ней потом допишем логику для пользователя
  const { data } = await useRam('GET', '/questions/quiz?category=mp')
  console.log(data)
}

async function fetchTest2() {
  // Fetch запрос, как пример
  // const response = await fetch(`http://localhost:1337/api/quez`)
  // const json = await response.json()
  // console.log(json)

  // Обертка fetch'a которую будем юзать мы, в ней потом допишем логику для пользователя
  const { data } = await useRam('GET', '/questions/exam?category=vv')
  console.log(data)
}
</script>

<template>
  <div>
    <h1>Pages</h1>

    <SvgIcon name="close" />

    <div class="background-test" />

    <div v-if="$viewport.isLessThan('tablet')">
      viewport test
    </div>

    <div v-if="isShowTestBlock">
      viewport test 2
    </div>

    <div>{{ isShowTestBlock }}</div>

    <button @click="fetchTest">
      TEST FETCH
    </button>

    <button @click="fetchTest2">
      TEST FETCH 2
    </button>
  </div>
</template>

<style lang="scss" scoped>
 h1 {
   color: brown;
 }

 .background-test {
   background-color: tomato;
   height: 600px;
   width: 600px;
   background-image: url("@/assets/images/footer-background.png");
 }
</style>
