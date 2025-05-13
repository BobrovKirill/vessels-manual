<!-- <script setup lang="ts"> -->
<!-- import { ref } from 'vue' -->
<!-- import QuizzesForm from '~/components/QuizzesForm/QuizzesForm.vue' -->

<!-- import Runningline from '~/components/Runningline/Runningline.vue' -->
<!-- import Trainer from '~/components/Trainer/Trainer.vue' -->

<!-- // 1) Флаг отображения Trainer -->
<!-- const showModal = ref(false) -->

<!-- // 2) Режим: 'exam' | 'quiz' -->
<!-- const mode = ref<'exam' | 'quiz'>('quiz') -->

<!-- // 3) Объект-фильтры, которые передадим Trainer -->
<!-- const filters = ref<{ -->
<!--  certificate: boolean -->
<!--  regions: string[] -->
<!--  vessels: string[] -->
<!-- }>({ -->
<!--  certificate: false, -->
<!--  regions: [], -->
<!--  vessels: [], -->
<!-- }) -->

<!-- // 4) Заголовок Trainer (можно прокинуть, если нужно) -->
<!-- const modalTitle = ref('') -->

<!-- // Когда QuizzesForm эмитит "startExam" -->
<!-- function handleStartExam(payload: { certificate: boolean, regions: string[], vessels: string[] }) { -->
<!--  mode.value = 'exam' -->
<!--  filters.value = { -->
<!--    certificate: payload.certificate, -->
<!--    regions: payload.regions.slice(), -->
<!--    vessels: payload.vessels.slice(), -->
<!--  } -->
<!--  modalTitle.value = 'Подтвердите сдачу экзамена' -->
<!--  showModal.value = true -->
<!-- } -->

<!-- // Когда QuizzesForm эмитит "startTrainer" -->
<!-- function handleStartTrainer(payload: { certificate: boolean, regions: string[], vessels: string[] }) { -->
<!--  mode.value = 'quiz' -->
<!--  filters.value = { -->
<!--    certificate: payload.certificate, -->
<!--    regions: payload.regions.slice(), -->
<!--    vessels: payload.vessels.slice(), -->
<!--  } -->
<!--  modalTitle.value = 'Запустить тренажер' -->
<!--  showModal.value = true -->
<!-- } -->

<!-- // Когда Trainer эмитит "close" -->
<!-- function handleClose() { -->
<!--  showModal.value = false -->
<!-- } -->
<!-- </script> -->

<!-- <template> -->
<!--  <section class="quizzes"> -->
<!--    <h1 class="quizzes__title"> -->
<!--      Тесты -->
<!--    </h1> -->

<!--    <p class="quizzes__description"> -->
<!--      Режим «Экзамен» предназначен для итоговой проверки знаний и максимально имитирует реальное сда-ние квалификационного теста. Попыток, как правило, немного (чаще всего одна), а вопросы выбираются из официального экзаменационного банка билетов ГИМС в случайном порядке. На выполнение даётся строго огра­ниченное время, подсказки полностью отключены, а после ответа результат сразу фиксируется и его уже нельзя изменить. Чтобы успешно пройти экзамен, нужно набрать установленный минимум правильных ответов  и не ошибиться в критических вопросах. Итог сохраняется в системе. -->
<!--    </p> -->

<!--    <p class="quizzes__description brd"> -->
<!--      Режим «Тренажёр» — это учебная среда без жёстких ограничений. Проходить тест можно неограниченное количество раз, при желании сосредоточившись на отдельных темах или билетах. Таймер либо совсем отключён, либо настроен более щадяще, поэтому всегда можно сделать паузу или вернуться к вопросу позже. Подсказки и подробные комментарии к правильным ответам доступны сразу после ответа, что помогает разобрать ошибки и лучше запомнить материал. Никакого официального зачёта в тренажёре не ведётся: статистика служит только для вашего личного анализа и подготовки к настоящему экзамену. -->
<!--    </p> -->

<!--    <div class="quizzes__content-row row1"> -->
<!--      <div class="quizzes__content-container"> -->
<!--        <h2 class="quizzes__content-title"> -->
<!--          В разделе «Есть ли у вас права» выберите: -->
<!--        </h2> -->
<!--        <ul class="quizzes__content-left-list"> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Есть», если у вас уже есть права. -->
<!--          </li> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Нету», если у вас нет прав. -->
<!--          </li> -->
<!--        </ul> -->
<!--      </div> -->

<!--      <picture class="quizzes__content-right-img brdl"> -->
<!--        <img alt="" src="../assets/images/quizzes/1row.jpg"> -->
<!--      </picture> -->
<!--    </div> -->

<!--    <div class="quizzes__content-row row2"> -->
<!--      <picture class="quizzes__content-right-img"> -->
<!--        <img alt="" src="../assets/images/quizzes/2row.jpg"> -->
<!--      </picture> -->

<!--      <div class="quizzes__content-container brdl"> -->
<!--        <h2 class="quizzes__content-title"> -->
<!--          В разделе «Выберите тип региона» выберите один из вариантов: -->
<!--        </h2> -->
<!--        <ul class="quizzes__content-left-list"> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Морской путь (МП)» – если будете управлять судном по морским путям. -->
<!--          </li> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Внутренние воды (ВВ)» – если будете управлять судном по внутренним водам. -->
<!--          </li> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Внутренние водные пути (ВВП)» – если будете управлять судном по внутренним водным путям. -->
<!--          </li> -->
<!--        </ul> -->
<!--      </div> -->
<!--    </div> -->

<!--    <div class="quizzes__content-row row3"> -->
<!--      <picture class="quizzes__content-right-img"> -->
<!--        <img alt="" src="../assets/images/quizzes/3row.jpg"> -->
<!--      </picture> -->

<!--      <div class="quizzes__content-container brdl"> -->
<!--        <h2 class="quizzes__content-title"> -->
<!--          В разделе «Выберите тип судна» выберите необходимый тип: -->
<!--        </h2> -->
<!--        <ul class="quizzes__content-left-list"> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Гидроцикл» – для управления гидроциклом. -->
<!--          </li> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Маломерное парусное судно» – для парусных судов небольшого размера. -->
<!--          </li> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Маломерное моторное судно» – для небольших моторных судов. -->
<!--          </li> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Судно особой конструкции» – если судно имеет специальную конструкцию. -->
<!--          </li> -->
<!--        </ul> -->
<!--      </div> -->
<!--    </div> -->

<!--    <div class="quizzes__content-row row4"> -->
<!--      <div class="quizzes__content-container brdr"> -->
<!--        <h2 class="quizzes__content-title"> -->
<!--          После выбора параметров нажмите: -->
<!--        </h2> -->
<!--        <ul class="quizzes__content-left-list"> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Экзамен», чтобы пройти тестирование. -->
<!--          </li> -->
<!--          <li class="quizzes__content-left-list-item"> -->
<!--            «Тренажер», чтобы потренироваться перед экзаменом. -->
<!--          </li> -->
<!--        </ul> -->
<!--      </div> -->

<!--      <picture class="quizzes__content-right-img" /> -->
<!--    </div> -->

<!--    <Runningline /> -->
<!--    <div class="werw"> -->
<!--      <QuizzesForm -->
<!--        @start-exam="handleStartExam" -->
<!--        @start-trainer="handleStartTrainer" -->
<!--      /> -->
<!--    </div> -->
<!--    <Trainer -->
<!--      v-if="showModal" -->
<!--      :filters="filters" -->
<!--      :mode="mode" -->
<!--      :visible="showModal" -->
<!--      @close="handleClose" -->
<!--    /> -->
<!--  </section> -->
<!-- </template> -->

<!-- <style scoped lang="scss"> -->
<!-- .werw { -->
<!--  margin-left: 30%; -->
<!-- } -->

<!-- .quizzes { -->
<!--  margin-bottom: 30px; -->
<!-- } -->

<!-- .quizzes__content-container { -->
<!--  padding: 20px; -->

<!--  max-width: 700px; -->
<!-- } -->
<!--  .quizzes__title { -->
<!--    font-size: 50px; -->
<!--    line-height: 67px; -->
<!--    font-weight: bold; -->
<!--    font-family: 'Merriweather'; -->
<!--    font-weight: bold; -->
<!--    color: $second-font; -->
<!--    padding: 0; -->
<!--    margin: 0 0 0 20px; -->
<!--  } -->

<!--  .quizzes__content-title { -->
<!--    margin: 0 0 20px 0; -->
<!--    padding: 0; -->
<!--    color: $second-font; -->
<!--    font-family: 'Martian Mono'; -->
<!--  } -->

<!--  .quizzes__content-row { -->
<!--    margin: 0; -->
<!--    display: flex; -->
<!--    border-bottom: 1px solid black; -->
<!--  } -->

<!-- .quizzes__content-row picture { -->
<!--  align-self: center; -->
<!-- } -->

<!--  .quizzes__content-left-list { -->
<!--    list-style: none; -->
<!--    margin: 0; -->
<!--    padding: 0; -->
<!--    text-transform: uppercase; -->
<!--    font-size: 16px; -->
<!--    font-family: 'Martian Mono', serif; -->
<!--    color: $first-font; -->
<!--  } -->

<!--  .quizzes__content-right-img img { -->
<!--    width: 100%; -->
<!--    object-fit: cover; -->
<!--    height: auto; -->
<!--  } -->

<!--  .quizzes__content-right-img { -->
<!--    padding: 20px; -->
<!--    max-width: 700px; -->
<!--  } -->

<!--  .quizzes__content-left-list-item { -->
<!--    margin-bottom: 20px; -->
<!--  } -->

<!--  .quizzes__description { -->
<!--    margin: 0; -->
<!--    padding: 0; -->
<!--    text-transform: uppercase; -->
<!--    font-size: 16px; -->
<!--    font-family: 'Martian Mono', serif; -->
<!--    padding: 20px; -->
<!--  } -->

<!--  .brd { -->
<!--    border-bottom: 1px solid black; -->
<!--  } -->

<!--  .brdr { -->
<!--    border-right: 1px solid black; -->
<!--  } -->

<!--  .brdl { -->
<!--    border-left: 1px solid black; -->
<!--  } -->
<!-- </style> -->

<script setup lang="js">
import { ref } from 'vue'
import QuizzesForm from '~/components/QuizzesForm/QuizzesForm.vue'
import Runningline from '~/components/Runningline/Runningline.vue'
import Trainer from '~/components/Trainer/Trainer.vue'

// Флаг отображения Trainer
const showModal = ref(false)

// Режим: 'exam' или 'quiz'
const mode = ref('quiz')

// Объект фильтров, который передадим Trainer
const filters = ref({
  certificate: false,
  regions: [],
  vessels: [],
})

// Заголовок Trainer (если нужен)
const modalTitle = ref('')

// Обработчик события «start-exam» из QuizzesForm
function handleStartExam(payload) {
  mode.value = 'exam'
  filters.value = {
    certificate: payload.certificate,
    regions: payload.regions.slice(),
    vessels: payload.vessels.slice(),
  }
  modalTitle.value = 'Подтвердите сдачу экзамена'
  showModal.value = true
}

// Обработчик события «start-trainer» из QuizzesForm
function handleStartTrainer(payload) {
  mode.value = 'quiz'
  filters.value = {
    certificate: payload.certificate,
    regions: payload.regions.slice(),
    vessels: payload.vessels.slice(),
  }
  modalTitle.value = 'Запустить тренажер'
  showModal.value = true
}

// При закрытии Trainer (emit('close'))
function handleClose() {
  showModal.value = false
}
</script>

<template>
  <section class="quizzes">
    <h1 class="quizzes__title">
      Тесты
    </h1>

    <p class="quizzes__description">
      Режим «Экзамен» предназначен для итоговой проверки знаний и максимально имитирует реальное сда-ние квалификационного теста...
    </p>
    <p class="quizzes__description brd">
      Режим «Тренажёр» — это учебная среда без жёстких ограничений...
    </p>

    <div class="quizzes__content-row row1">
      <div class="quizzes__content-container">
        <h2 class="quizzes__content-title">
          В разделе «Есть ли у вас права» выберите:
        </h2>
        <ul class="quizzes__content-left-list">
          <li class="quizzes__content-left-list-item">
            «Есть», если у вас уже есть права.
          </li>
          <li class="quizzes__content-left-list-item">
            «Нету», если у вас нет прав.
          </li>
        </ul>
      </div>
      <picture class="quizzes__content-right-img brdl">
        <img alt="" src="../assets/images/quizzes/1row.jpg">
      </picture>
    </div>

    <div class="quizzes__content-row row2">
      <picture class="quizzes__content-right-img">
        <img alt="" src="../assets/images/quizzes/2row.jpg">
      </picture>
      <div class="quizzes__content-container brdl">
        <h2 class="quizzes__content-title">
          В разделе «Выберите тип региона» выберите один из вариантов:
        </h2>
        <ul class="quizzes__content-left-list">
          <li class="quizzes__content-left-list-item">
            «Морской путь (МП)» – если будете управлять судном по морским путям.
          </li>
          <li class="quizzes__content-left-list-item">
            «Внутренние воды (ВВ)» – если будете управлять судном по внутренним водам.
          </li>
          <li class="quizzes__content-left-list-item">
            «Внутренние водные пути (ВВП)» – если будете управлять судном по внутренним водным путям.
          </li>
        </ul>
      </div>
    </div>

    <div class="quizzes__content-row row3">
      <picture class="quizzes__content-right-img">
        <img alt="" src="../assets/images/quizzes/3row.jpg">
      </picture>
      <div class="quizzes__content-container brdl">
        <h2 class="quizzes__content-title">
          В разделе «Выберите тип судна» выберите необходимый тип:
        </h2>
        <ul class="quizzes__content-left-list">
          <li class="quizzes__content-left-list-item">
            «Гидроцикл» – для управления гидроциклом.
          </li>
          <li class="quizzes__content-left-list-item">
            «Маломерное парусное судно» – для парусных судов небольшого размера.
          </li>
          <li class="quizzes__content-left-list-item">
            «Маломерное моторное судно» – для небольших моторных судов.
          </li>
          <li class="quizzes__content-left-list-item">
            «Судно особой конструкции» – если судно имеет специальную конструкцию.
          </li>
        </ul>
      </div>
    </div>

    <div class="quizzes__content-row row4">
      <div class="quizzes__content-container brdr">
        <h2 class="quizzes__content-title">
          После выбора параметров нажмите:
        </h2>
        <ul class="quizzes__content-left-list">
          <li class="quizzes__content-left-list-item">
            «Экзамен», чтобы пройти тестирование.
          </li>
          <li class="quizzes__content-left-list-item">
            «Тренажер», чтобы потренироваться перед экзаменом.
          </li>
        </ul>
      </div>
      <picture class="quizzes__content-right-img" />
    </div>

    <Runningline />

    <div class="werw">
      <QuizzesForm
        @start-exam="handleStartExam"
        @start-trainer="handleStartTrainer"
      />
    </div>

    <Trainer
      v-if="showModal"
      :filters="filters"
      :mode="mode"
      :visible="showModal"
      @close="handleClose"
    />
  </section>
</template>

<style scoped lang="scss">
.werw {
  margin-left: 30%;
}

.quizzes {
  margin-bottom: 30px;
}

.quizzes__content-container {
  padding: 20px;
  max-width: 700px;
}

.quizzes__title {
  font-size: 50px;
  line-height: 67px;
  font-weight: bold;
  font-family: 'Merriweather';
  color: $second-font;
  margin: 0 0 0 20px;
}

.quizzes__content-row {
  margin: 0;
  display: flex;
  border-bottom: 1px solid black;
}

.quizzes__content-row picture {
  align-self: center;
}

.quizzes__content-left-list {
  list-style: none;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  font-size: 16px;
  font-family: 'Martian Mono', serif;
  color: $first-font;
}

.quizzes__content-right-img img {
  width: 100%;
  object-fit: cover;
  height: auto;
}

.quizzes__content-right-img {
  padding: 20px;
  max-width: 700px;
}

.quizzes__content-left-list-item {
  margin-bottom: 20px;
}

.quizzes__description {
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  font-size: 16px;
  font-family: 'Martian Mono', serif;
  padding: 20px;
}

.brd {
  border-bottom: 1px solid black;
}

.brdr {
  border-right: 1px solid black;
}

.brdl {
  border-left: 1px solid black;
}
</style>
