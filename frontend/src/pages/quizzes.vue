<script setup lang="js">
import { ref } from 'vue'
import QuizzesForm from '~/components/QuizzesForm/QuizzesForm.vue'
import QuizzesInfo from '~/components/RunningLine/QuizzesInfo.vue'
import RunningLine from '~/components/RunningLine/RunningLine.vue'
import Trainer from '~/components/Trainer/Trainer.vue'
import { useRam } from '~/services/index.js'

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

const quizzInfo = ref({
  timeLimit: {
    name: 'Время на сдачу',
    value: '',
  },
  questionsCount: {
    name: 'Количество вопросов',
    value: '',
  },
  wrongLimit: {
    name: 'Количество допустимых ошибок',
    value: '',
  },
})

// Заголовок Trainer (если нужен)
const modalTitle = ref('')

function handleLaunch() {
  showModal.value = true
  document.body.style.overflowY = 'hidden'
}

async function fetchInfo(data) {
  const { type, regions, vessels, certificate } = data
  const isCertificate = certificate === 'yes'

  const response = await useRam('POST', '/questions/info', {
    body: {
      type,
      certificate: isCertificate,
      regions,
      vessels,
    },
  })

  if (!response?.data) {
    return
  }

  Object.entries(response?.data).forEach(([key, value]) => {
    if (quizzInfo.value[key]) {
      quizzInfo.value[key].value = `${value}`
    }
  })
}

// Обработчик события «start-trainer» из QuizzesForm
function handleFilling(data) {
  const { type, regions, vessels, certificate } = data
  mode.value = type
  filters.value = {
    certificate,
    regions,
    vessels,
  }

  modalTitle.value = data.type === 'quiz' ? 'Запустить тренажер' : 'Подтвердите сдачу экзамена'
  fetchInfo(data)
}

// При закрытии Trainer (emit('close'))
function handleClose() {
  showModal.value = false
  document.body.style.overflowY = 'auto'
}
</script>

<template>
  <section class="quizzes">
    <div class="quizzes__header">
      <h1 class="quizzes__title">
        Тесты
      </h1>

      <p class="quizzes__description">
        Заполните все шаги для формирования экзамена или тренажера и приступайте к сдаче. Удачи!
      </p>
    </div>

    <div class="quizzes__active">
      <QuizzesForm class="quizzes__form" @launch="handleLaunch" @send-current-form="handleFilling" />
      <QuizzesInfo :data="quizzInfo" />
    </div>

    <Trainer
      v-if="showModal"
      :filters="filters"
      :mode="mode"
      @close="handleClose"
    />

    <RunningLine />
  </section>
</template>

<style scoped lang="scss">
.quizzes {
  &__header {
    padding: 24px 36px 40px;

    border-bottom: 1px solid black;
  }

  &__title {
    font-size: 50px;
    line-height: 67px;
    font-weight: 700;
    font-family: font('primary');
    color: $second-font;
    margin: 0 0 12px;
  }

  &__description {
    max-width: 360px;
    margin: 0;
    color: $secondary;
    hyphens: none;
  }

  &__active {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

  }

  &__form {
    padding: 24px 36px 24px;
    grid-column: span 2;
  }
}

.quizzes__content-container {
  padding: 20px;
  max-width: 700px;
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
