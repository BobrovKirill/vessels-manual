<script setup lang="ts">
import { ref } from 'vue'
import { useRam } from '~/services'

// Реактивный массив, в который будем класть вопросы из ответа
const questions = ref<any[]>([])

// Функция для загрузки «quiz?category=mp»
async function fetchQuiz() {
  try {
    // useRam возвращает объект вида { data: RefImpl, error: RefImpl, refresh: f, … }
    const response = await useRam('GET', '/questions/quiz?category=mp')
    console.log('fetchQuiz raw response:', response)

    // Разворачиваем Ref: весь payload лежит в response.data.value
    const payload = response.data.value
    // payload должен быть примерно: { sessionId: "...", questions: [ {id, text, answers: […]}, … ] }

    // Массив вопросов находится в payload.questions
    const questionsArray = payload?.questions

    if (Array.isArray(questionsArray)) {
      questions.value = questionsArray
    } else {
      console.warn('Ожидался массив в payload.questions, получили:', questionsArray)
      questions.value = []
    }
  } catch (err) {
    console.error('Ошибка при fetchQuiz:', err)
    questions.value = []
  }
}

// Функция для загрузки «exam?category=vv»
async function fetchExam() {
  try {
    const response = await useRam('GET', '/questions/exam?category=vv')
    console.log('fetchExam raw response:', response)

    const payload = response.data.value
    const questionsArray = payload?.questions

    if (Array.isArray(questionsArray)) {
      questions.value = questionsArray
    } else {
      console.warn('Ожидался массив в payload.questions, получили:', questionsArray)
      questions.value = []
    }
  } catch (err) {
    console.error('Ошибка при fetchExam:', err)
    questions.value = []
  }
}

// import { useNuxtApp } from '#app'
// import { useRam } from '~/services'
//
// const { $viewport } = useNuxtApp()
//
//
//
// console.log('index page')
//
// const isShowTestBlock = computed(() => $viewport.isGreaterThan('tablet'))

// async function fetchTest() {
//   // Fetch запрос, как пример
//   // const response = await fetch(`http://localhost:1337/api/quez`)
//   // const json = await response.json()
//   // console.log(json)
//
//   // Обертка fetch'a которую будем юзать мы, в ней потом допишем логику для пользователя
//   const { data } = await useRam('GET', '/questions/quiz?category=mp')
//   console.log(data)
// }

// async function fetchTest2() {
//   // Fetch запрос, как пример
//   // const response = await fetch(`http://localhost:1337/api/quez`)
//   // const json = await response.json()
//   // console.log(json)
//
//   // Обертка fetch'a которую будем юзать мы, в ней потом допишем логику для пользователя
//   const { data } = await useRam('GET', '/questions/exam?category=vv')
//   console.log(data)
// }
</script>

<template>
  <div style="padding: 16px">
    <h1>Вывод вопросов и вариантов ответов</h1>

    <!-- Кнопки для загрузки вопросов -->
    <button style="margin-right: 8px; padding: 6px 12px" @click="fetchQuiz">
      Загрузить Quiz (mp)
    </button>
    <button style="padding: 6px 12px" @click="fetchExam">
      Загрузить Exam (vv)
    </button>

    <!-- Если questions пуст, показываем подсказку -->
    <div v-if="!questions.length" style="margin-top: 24px">
      <p>Пока нет вопросов. Нажмите одну из кнопок выше.</p>
    </div>

    <!-- Если questions не пуст, рендерим каждый вопрос + его ответы -->
    <div v-else style="margin-top: 24px">
      <div
        v-for="q in questions"
        :key="q.id || q.documentId"
        style="margin-bottom: 24px; padding: 12px; border: 1px solid #ddd; border-radius: 4px"
      >
        <!-- 1) Выводим сам текст вопроса -->
        <h3 style="margin-bottom: 8px; font-weight: 500">
          {{ q.text }}
        </h3>

        <!-- 2) Выводим варианты ответа (q.answers) -->
        <ul style="padding-left: 20px; margin: 0">
          <li
            v-for="ans in q.answers"
            :key="ans.id || ans.documentId"
            style="margin-bottom: 4px"
          >
            {{ ans.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>

<!--  <div> -->
<!--    <h1>Pages</h1> -->

<!--    <SvgIcon name="close" /> -->

<!--    <div class="background-test" /> -->

<!--    <div v-if="$viewport.isLessThan('tablet')"> -->
<!--      viewport test -->
<!--    </div> -->

<!--    <div v-if="isShowTestBlock"> -->
<!--      viewport test 2 -->
<!--    </div> -->

<!--    <div>{{ isShowTestBlock }}</div> -->

<!--    &lt;!&ndash;    <button @click="fetchTest"> &ndash;&gt; -->
<!--    &lt;!&ndash;      TEST FETCH &ndash;&gt; -->
<!--    &lt;!&ndash;    </button> &ndash;&gt; -->

<!--    &lt;!&ndash;    <button @click="fetchTest2"> &ndash;&gt; -->
<!--    &lt;!&ndash;      TEST FETCH 2 &ndash;&gt; -->
<!--    &lt;!&ndash;    </button> &ndash;&gt; -->

<!--    -->
<!--  </div> -->
</template>

<style lang="scss" scoped>
button {
  font-size: 14px;
  cursor: pointer;
}

//h1 {
 //  color: brown;
 //
 //}
 //
 //.background-test {
 //  background-color: tomato;
 //  height: 600px;
 //  width: 600px;
 //  background-image: url("@/assets/images/footer-background.png");
 //}
</style>
