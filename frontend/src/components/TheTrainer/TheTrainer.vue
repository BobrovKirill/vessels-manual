<script setup lang="js">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRam } from '~/services'

// Props & Emits
const { mode, filters } = defineProps({
  mode: String,
  filters: Object,
})

const emit = defineEmits(['close'])

const sessionId = ref(null)

// State
const questions = ref([])
const answers = ref({})
const results = ref({})
const currentAnswer = ref(null)
const currentIndex = ref(0)

const wrongLimit = ref()
const isLoadQuestion = ref(false)

// Timing
const timeLeft = ref(0)
const timeLimit = ref(0)
const timerInterval = ref(null)
const isPassed = ref(false)
const spendTime = ref(0)
const wrongAnswers = ref()
const isTimer = ref(false)

const isLoadResults = ref(false)
const isLoading = computed(() => isLoadQuestion.value || isLoadResults.value)
const isShowResult = ref(false)
const isAnswersFull = computed(() => (Object.keys(answers.value).length === questions.value.length) && questions.value.length)

const answerButton = computed(() => {
  const isQuestionAnswered = !!answers.value[currentIndex.value]

  return {
    title: isQuestionAnswered ? 'Следующий' : 'Ответить',
    disabled: !currentAnswer.value && !isQuestionAnswered,
    action: () => {
      if (isQuestionAnswered && mode !== 'exam') {
        nextQuestion()
      } else {
        submitAnswer()
      }
    },
  }
})

const displayTime = computed(() => {
  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0')
  const s = String(timeLeft.value % 60).padStart(2, '0')
  return `${m} : ${s}`
})

const currentQuestion = computed(() => questions.value[currentIndex.value] || {})

// Fetch questions on mount or when filters change
async function fetchQuestions() {
  isLoadQuestion.value = true

  const endpoint = mode === 'exam' ? '/questions/exam' : '/questions/quiz'
  const { data } = await useRam('POST', endpoint, { body: filters })
  if (!data && data.session) {
    return
  }

  sessionId.value = data.session
  timeLimit.value = data.timeLimit
  timeLeft.value = data.timeLimit * 60
  wrongLimit.value = data.wrongLimit
  questions.value = data.questions
  currentIndex.value = 0
  isLoadQuestion.value = false

  if (mode === 'exam') {
    await useRam('POST', '/questions/launch', { body: { session: sessionId.value } })
    startLocalTimer()
  }
}

// Timer logic
function startLocalTimer() {
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      stopTimer()
    }
  }, 1000)
}

function stopTimer() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

// User actions
function selectAnswer(id, isCorrect = false) {
  currentAnswer.value = { id, isCorrect }
}

function getCorrectAnswer(id) {
  if (mode === 'exam' || answers.value[currentIndex.value]?.id !== id) {
    return ''
  }

  return answers.value[currentIndex.value].isCorrect ? 'trainer__option--correct' : 'trainer__option--wrong'
}

async function submitAnswer() {
  answers.value[currentIndex.value] = { id: currentAnswer.value.id, isCorrect: currentAnswer.value.isCorrect }
  const questionId = currentQuestion.value.id
  const answerId = currentAnswer.value.id
  currentAnswer.value = null

  if (mode === 'exam' && currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
  }

  await useRam('POST', '/questions/answer', {
    body: {
      session: sessionId.value,
      question: questionId,
      answer: answerId,
    },
  })
}

async function finishSession() {
  if (!sessionId.value) {
    return
  }

  isLoadResults.value = true
  isShowResult.value = true
  stopTimer()

  const { data } = await useRam('POST', '/questions/finish', {
    body: { session: sessionId.value },
  })

  if (!data) {
    return
  }

  isPassed.value = data.isPassedExam || false
  spendTime.value = data.spendTime || ''
  wrongAnswers.value = data.wrongAnswer || 0
  isTimer.value = data.isTimer || false

  results.value = data.questions.map(({ id, answer, description = '' }) => {
    const question = questions.value.find(question => question.id === id)

    return {
      id,
      text: question.text,
      description: question.description || description,
      image: question.image,
      answer: {
        text: question.answers.find(item => item.id === answer.id).text,
        isCorrect: answer.is_correct,
      },
    }
  })

  isLoadResults.value = false
}

function handleClose() {
  emit('close')
}

function restartExam() {
  isShowResult.value = false
  isLoadResults.value = false
  results.value = null
  questions.value = null
  answers.value = null
  currentIndex.value = 0
  currentAnswer.value = null
  currentIndex.value = null

  stopTimer()
  fetchQuestions()
}

function goToQuestion(i) {
  if (i >= 0 && i < questions.value.length) {
    currentIndex.value = i
  }
}

function previousQuestion() {
  if (currentIndex.value > 0)
    currentIndex.value--
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
  }
}

fetchQuestions()

onMounted(() => {

})

onUnmounted(() => stopTimer())
</script>

<template>
  <div class="trainer__backdrop">
    <div class="trainer__content" :style="mode === 'exam' ? 'min-height: 660px' : 'min-height: 740px'" @click.stop>
      <button class="trainer__close" @click="handleClose">
        <SvgIcon name="close" />
      </button>

      <div v-if="isLoading" class="trainer__loader">
        <SvgIcon class="trainer__loader-svg" name="dividingline-wheel" />
      </div>

      <template v-if="!isLoading">
        <!-- Результаты экзамена -->
        <div v-if="isShowResult" class="trainer__results">
          <h2 class="trainer__title result-title">
            {{ isPassed ? 'Сдал' : 'Не сдал' }}
          </h2>
          <p class="result-info">
            Потраченное время – {{ spentMinutes }} мин
          </p>
          <p class="result-info">
            Неправильных ответов – {{ wrongAnswers }}
          </p>
          <ul class="trainer__results-list">
            <li v-for="(question, id) in results" :key="question.id">
              <details>
                <summary
                  :class="{
                    'result-summary--correct': question.answer.isCorrect,
                    'result-summary--wrong': !question.answer.isCorrect,
                  }"
                >
                  Вопрос {{ id + 1 }}
                </summary>

                <div class="trainer__results-content">
                  <img
                    v-if="question.image"
                    alt="option image"
                    class="trainer__option-image"
                    :src="question.image.url"
                  >

                  <p class="question-text">
                    {{ question.text }}
                  </p>

                  <p class="trainer__results-answer">
                    <strong>Ваш ответ:</strong> {{ question.answer.text }}
                  </p>

                  <p class="question-description" v-html="question.description" />
                </div>
              </details>
            </li>
          </ul>
          <div class="trainer__footer-buttons">
            <button class="trainer__button" @click="emit('close')">
              Закрыть
            </button>
            <button class="trainer__button" @click="restartExam">
              Начать заново
            </button>
          </div>
        </div>

        <!-- Экзамен/тренажёр до завершения -->
        <div v-else>
          <h2 class="trainer__title">
            {{ mode === 'exam' ? 'Экзамен' : 'Тренажёр' }}
          </h2>

          <div v-if="mode === 'exam'" class="trainer__timer" :style="timeLeft < 180 ? 'color: #b82132' : ''">
            {{ displayTime }}
          </div>

          <div class="trainer__questions-container">
            <div class="trainer__questions-counter">
              <span
                v-for="(_, idx) in questions"
                :key="idx"
                class="trainer__question-number"
                :class="[
                  idx === currentIndex && 'trainer__question-number--active',
                  (mode === 'exam' && answers[idx]?.id) && 'trainer__question-number--answered-exam',
                  (mode !== 'exam' && answers[idx]?.id && answers[idx]?.isCorrect) && 'trainer__question-number--correct',
                  (mode !== 'exam' && answers[idx]?.id && !answers[idx]?.isCorrect) && 'trainer__question-number--wrong',
                ]"
                @click="goToQuestion(idx)"
              >
                {{ idx + 1 }}
              </span>
            </div>
          </div>

          <form class="trainer__form" @submit.prevent>
            <div class="trainer__question-content">
              <div v-if="currentQuestion.image" class="trainer__question-image">
                <img
                  alt="question image"
                  :src="currentQuestion.image.url"
                >
              </div>
              <div v-if="currentQuestion.text" class="trainer__question-text">
                <p>
                  {{ currentQuestion.text }}
                </p>
              </div>
            </div>

            <ul class="trainer__options-list">
              <li v-for="answer in currentQuestion.answers" :key="answer.value">
                <button
                  class="trainer__option"
                  :class="[
                    currentAnswer?.id === answer.id && 'trainer__option--selected',
                    getCorrectAnswer(answer.id),
                  ]"
                  :disabled="!!answers[currentIndex]"
                  @click="selectAnswer(answer.id, answer.is_correct)"
                >
                  <img
                    v-if="answer.image"
                    alt="option image"
                    class="trainer__option-image"
                    :src="answer.image.url"
                  >
                  <span class="trainer__option-text">{{ answer.text }}</span>
                </button>
              </li>
            </ul>

            <div class="trainer__action">
              <button
                class="trainer__nav left"
                :disabled="currentIndex === 0"
                @click="previousQuestion"
              >
                <SvgIcon name="chevron-right" />
              </button>

              <button
                v-show="!isAnswersFull"
                class="trainer__button trainer__button--submit"
                :disabled="answerButton.disabled"
                @click="answerButton.action()"
              >
                {{ answerButton.title }}
              </button>

              <button
                v-show="isAnswersFull"
                class="trainer__button trainer__button--submit"
                :disabled="examFinished"
                @click="finishSession()"
              >
                Результаты
              </button>

              <button
                class="trainer__nav right"
                :disabled="currentIndex === questions.length - 1"
                @click="nextQuestion"
              >
                <SvgIcon name="chevron-right" />
              </button>
            </div>
          </form>

          <div v-if="mode !== 'exam'" class="trainer__feedback">
            <p
              v-show="answers[currentIndex]?.id"
              class="trainer__feedback-text"
              :class="answers[currentIndex]?.isCorrect ? 'trainer__feedback-text--correct' : 'trainer__feedback-text--wrong'"
            >
              <span v-html="answers[currentIndex]?.isCorrect ? 'Правильно!' : currentQuestion.description" />
            </p>
          </div>
        </div>
      </template>
    </div>
    <div class="trainer__overlay" />
  </div>
</template>

<style lang="scss" scoped>
/* Отступ между вопросами в списке результатов */
.trainer__results-list {
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 0 24px;
  margin: 0;
  list-style: none;
}

.trainer__form {
  position: relative;

  padding: 0 60px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include breakpoint('tablet') {
    min-height: 320px;
  }
}

.trainer__footer-buttons {
  justify-content: space-between;
  display: flex;

  margin-top: 24px;
  padding: 0 24px;
}

.trainer__results {
  height: 800px;
  overflow-y: scroll;
  padding-right: 12px;
}

/* Бордер и выравнивание заголовков вопросов */
.result-summary--correct,
.result-summary--wrong {
  border: 2px solid;
  background: none;
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
  text-align: left;
}

.trainer__results-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 12px;

  padding: 24px;

  p {
    margin: 0;
    grid-column: span 2;
  }
}

.trainer__results-content img + p {
  grid-column: 2 / 3 ;

  padding-left: 10px;
  border-left: 1px solid black;
}

.trainer__results-answer {
  width: 100%;

  padding: 16px 0;

  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.result-summary--correct {
  border-color: #28a745;
  color: #28a745;
}

.result-summary--wrong {
  border-color: #b82132;
  color: #b82132;
}

/* Основные стили */
.trainer__backdrop {
  position: fixed;
  z-index: 100;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.trainer__overlay {
  position: absolute;
  inset: 0;
}

.trainer__content {
  position: relative;
  z-index: 100;

  max-width: 800px;
  width: 100%;
  max-height: 90vh;

  padding: 32px 0;
  margin: 0 16px;
  border-radius: 4px;

  background: #f6f6f6;

  text-align: center;
}

.trainer__close {
  position: absolute;
  top: 25px;
  right: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.trainer__timeout {
  background: #fff3f3;
  color: #c00;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  font-weight: bold;
}

.trainer__title {
  font-family: font('secondary');
  font-size: 30px;
  margin: 0 0 10px;
  text-transform: uppercase;
}

.trainer__timer {
  position: absolute;
  top: 22px;
  left: 38px;

  font-family: font('secondary');
  font-size: 22px;
}

.trainer__questions-counter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
}

.trainer__question-number {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #3b6790;
  font-weight: bold;
  color: #3b6790;
  cursor: pointer;
  border-radius: 4px;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.trainer__question-number--active {
  background: #3b6790;
  color: #fff;
  border-color: #3b6790;
}

.trainer__question-number--answered-exam {
  background: #3b6790;
  border-color: #3b6790;
  color: #fff;
}

.trainer__question-number--correct {
  background: #28a745;
  border-color: #28a745;
  color: #fff;
}

.trainer__question-number--wrong {
  background: #b82132;
  border-color: #b82132;
  color: #fff;
}

.trainer__question-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  height: 310px;

  margin-bottom: 16px;

  @include breakpoint('tablet') {
    flex-direction: row;
    gap: 0;
    height: 250px;
  }
}

.trainer__question-image {
  height: 200px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  @include breakpoint('tablet') {
    flex: 0 0 50%;
    height: auto;

    padding: 0 10px 10px 0;

    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
}

.trainer__question-text {
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: font('secondary');
  font-size: 18px;

  padding: 0 0 10px;
  border-bottom: 1px solid black;

  @include breakpoint('tablet') {
    padding: 0 10px 0;
  }

  p {
    margin: 0;
    text-align: center;
    hyphens: none;
  }
}

.trainer__options-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  list-style: none;

  padding: 0 0 16px;
  margin: 0;

  @include breakpoint('tablet') {
    grid-template-columns: 1fr 1fr;
  }
}

.trainer__option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60px;

  padding: 10px 16px;

  border: 2px solid black;
  border-radius: 4px;

  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}

.trainer__option:hover {
  background: #e6f0ff;
}

.trainer__option--selected {
  border-color: #3b6790;
  box-shadow: 0 0 0 2px #3b6790;
}

.trainer__option--correct {
  border-color: #28a745;
  box-shadow: 0 0 0 2px #28a745;
}

.trainer__option--wrong {
  border-color: #b82132;
  box-shadow: 0 0 0 2px #b82132;
}

.trainer__option-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 8px;
}

.trainer__option-text {
  font-family: 'Martian Mono', serif;
  font-size: 14px;
}

.trainer__feedback {
  margin-top: 16px;
  padding: 0 60px;

  height: 70px;
}

.trainer__feedback-text {
  font-family: 'Martian Mono', serif;
  font-size: 16px;
  font-weight: bold;
}

.trainer__feedback-text--correct {
  color: #28a745;
}

.trainer__feedback-text--wrong {
  color: #dc3545;
}

.trainer__action {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;

  border-bottom: 1px solid black;

  @include breakpoint('tablet') {
    justify-content: center;
  }
}

.trainer__nav {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #3b6790;

  height: 40px;
  width: 40px;

  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;

  @include breakpoint('tablet') {
    position: absolute;
    top: 0;

    width: 45px;
    height: 100%;

    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  &:hover {
    background-color: #264562;
  }

  &:disabled{
    background: #ccc;
    cursor: not-allowed;
  }

  &.left {
    left: 0;
    rotate: 180deg;
  }

  &.right {
    right: 0;
  }
}

.trainer__button {
  padding: 12px 20px;
  font-size: 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  background: #3b6790;
  color: #fff;

  @include breakpoint('tablet') {
    font-size: 16px;
  }
}

.trainer__button--submit {
  width: 50%;
}

.trainer__button--nav:disabled,
.trainer__button--submit:disabled {
  background: #ccc;
  cursor: default;
}

.trainer__button--nav:not(:disabled):hover,
.trainer__button--submit:not(:disabled):hover {
  background: #264562;
}

.trainer__loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);

  animation: loading-rotate 2s infinite linear;
}

.trainer__loader-svg {
  width: 80px;
  height: 80px;

  color: $secondary;
}

@media (max-width: 768px) {
  .trainer__options-list {
    grid-template-columns: 1fr;
  }
}

@keyframes loading-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
