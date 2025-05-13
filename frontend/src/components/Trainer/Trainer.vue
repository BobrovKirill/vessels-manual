<script setup lang="js">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRam } from '~/services'

// Props & Emits
const { visible, mode, filters } = defineProps({
  visible: Boolean,
  mode: String, // 'exam' or 'quiz'
  filters: Object,
})
const emit = defineEmits(['close'])

// State
const questions = ref([])
const answers = reactive([])
const correctness = reactive([])
const submitted = reactive([])
const currentIndex = ref(0)
const sessionId = ref(null)
const timerMessage = ref('')
const examFinished = ref(false)
const wrongLimit = filters.wrongLimit ?? 0

// Computed
const wrongCountExam = computed(() =>
  correctness.reduce(
    (sum, correct, idx) => sum + (submitted[idx] && !correct ? 1 : 0),
    0,
  ),
)
const allAnswered = computed(() =>
  submitted.length > 0 && submitted.every(v => v),
)

// Button label
const buttonLabel = computed(() => {
  if (mode === 'exam') {
    if (!allAnswered.value)
      return 'Ответить'
    if (!examFinished.value)
      return 'Завершить'
    return 'Закрыть'
  }
  return allAnswered.value ? 'Закрыть' : 'Ответить'
})

// Timer
const examDuration = ref(0)
const timeLeft = ref(0)
let timerInterval = null

// Close logic
function handleClose() {
  if (mode === 'exam') {
    // first click finishes exam, second click closes
    if (!examFinished.value) {
      confirmFinish()
      return
    }
    emit('close')
  } else {
    emit('close')
  }
}

function normalizeQuestions(payload) {
  const arr = [
    payload?.questions,
    payload?.data?.questions,
    Array.isArray(payload?.data) && payload.data,
    Array.isArray(payload) && payload,
  ].find(Array.isArray)
  if (!arr?.length)
    return []
  return arr.map((raw) => {
    const src = raw.attributes ?? raw
    const opts = Array.isArray(src.answers) ? src.answers : []
    return {
      id: Number(src.id ?? raw.id ?? 0),
      text: src.text ?? '',
      image: src.image,
      options: opts.map(a => ({
        label: a.text ?? '',
        value: Number(a.id ?? 0),
        image: a.image,
      })),
    }
  })
}

async function fetchQuestions() {
  examFinished.value = false
  timerMessage.value = ''
  const body = {
    certificate: filters.certificate,
    regions: filters.regions,
    vessels: filters.vessels,
  }
  const endpoint = mode === 'exam' ? '/questions/exam' : '/questions/quiz'
  const res = await useRam('POST', endpoint, { body })
  if (!res?.data)
    return
  const raw = res.data.data ?? res.data
  if (raw.session) {
    sessionId.value = raw.session
    if (mode === 'exam') {
      await useRam('POST', '/questions/launch', { body: { session: sessionId.value } })
      if (raw.timeLimit != null) {
        examDuration.value = raw.timeLimit * 60
        startLocalTimer()
      }
    }
  }
  const loaded = normalizeQuestions(raw)
  questions.value = loaded
  answers.splice(0, answers.length, ...Array.from({ length: loaded.length }).fill(null))
  correctness.splice(0, correctness.length, ...Array.from({ length: loaded.length }).fill(null))
  submitted.splice(0, submitted.length, ...Array.from({ length: loaded.length }).fill(false))
}

function startLocalTimer() {
  clearInterval(timerInterval)
  timeLeft.value = examDuration.value
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
      timerMessage.value = 'Время вышло'
      finishSession().then(() => (examFinished.value = true))
    }
  }, 1000)
}

const displayTime = computed(() => {
  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0')
  const s = String(timeLeft.value % 60).padStart(2, '0')
  return `${m} : ${s}`
})

onMounted(fetchQuestions)
onUnmounted(() => clearInterval(timerInterval))
watch(
  () => [mode, filters.certificate, filters.regions.join(','), filters.vessels.join(',')],
  fetchQuestions,
)

const currentQuestion = computed(
  () => questions.value[currentIndex.value] ?? { id: 0, options: [] },
)

function selectAnswer(val) {
  if (mode === 'exam' && examFinished.value)
    return
  const idx = currentIndex.value
  if (!submitted[idx])
    answers[idx] = val
}

async function submitAnswer() {
  if ((mode === 'exam' && examFinished.value) || buttonLabel.value !== 'Ответить')
    return
  const idx = currentIndex.value
  const val = answers[idx]
  if (val == null || submitted[idx])
    return
  const res = await useRam('POST', '/questions/answer', {
    body: {
      session: sessionId.value,
      question: currentQuestion.value.id,
      answer: val,
    },
  })
  const obj = res.data.data ?? res.data
  correctness[idx] = Boolean(obj.is_correct)
  submitted[idx] = true
}

async function finishSession() {
  if (!sessionId.value)
    return
  await useRam('POST', '/questions/finish', { body: { session: sessionId.value } })
}

function confirmFinish() {
  if (window.confirm('Вы точно хотите завершить экзамен?')) {
    clearInterval(timerInterval)
    finishSession().then(() => (examFinished.value = true))
  }
}

function goToQuestion(i) {
  if (i >= 0 && i < questions.value.length)
    currentIndex.value = i
}
function previousQuestion() {
  if (currentIndex.value > 0)
    currentIndex.value--
}
function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1)
    currentIndex.value++
}
</script>

<template>
  <div v-if="visible" class="trainer__backdrop">
    <div class="trainer__content" @click.stop>
      <button class="trainer__close" @click="handleClose">
        ×
      </button>
      <div v-if="timerMessage" class="trainer__timeout">
        {{ timerMessage }}
      </div>

      <h2 class="trainer__title">
        {{ mode === 'exam' ? 'Экзамен' : 'Тренажёр' }}
      </h2>
      <div v-if="mode === 'exam'" class="trainer__timer">
        {{ displayTime }}
      </div>

      <div class="trainer__questions-container">
        <div class="trainer__questions-counter">
          <span
            v-for="(_, idx) in questions"
            :key="idx"
            class="trainer__question-number"
            :class="{
              'trainer__question-number--active': idx === currentIndex,
              'trainer__question-number--answered-exam': mode === 'exam' && submitted[idx] && !examFinished,
              'trainer__question-number--correct': (mode === 'quiz' || examFinished) && submitted[idx] && correctness[idx],
              'trainer__question-number--wrong': (mode === 'quiz' || examFinished) && submitted[idx] && !correctness[idx],
            }"
            @click="goToQuestion(idx)"
          >{{ idx + 1 }}</span>
        </div>
      </div>

      <form @submit.prevent>
        <div class="trainer__question-content">
          <img
            v-if="currentQuestion.image"
            alt="question image"
            class="trainer__question-image"
            :src="currentQuestion.image"
          >
          <p v-if="currentQuestion.text" class="trainer__question-text">
            {{ currentQuestion.text }}
          </p>
        </div>

        <ul class="trainer__options-list">
          <li v-for="opt in currentQuestion.options" :key="opt.value">
            <label
              class="trainer__option"
              :class="{
                'trainer__option--selected': answers[currentIndex] === opt.value,
                'trainer__option--correct': mode !== 'exam' && submitted[currentIndex] && answers[currentIndex] === opt.value && correctness[currentIndex],
                'trainer__option--wrong': mode !== 'exam' && submitted[currentIndex] && answers[currentIndex] === opt.value && !correctness[currentIndex],
              }"
              @click.prevent="selectAnswer(opt.value)"
            >
              <img
                v-if="opt.image"
                alt="option image"
                class="trainer__option-image"
                :src="opt.image"
              >
              <span class="trainer__option-text">{{ opt.label }}</span>
            </label>
          </li>
        </ul>

        <div class="trainer__nav-buttons">
          <button class="trainer__button trainer__button--nav" :disabled="currentIndex === 0" @click="previousQuestion">
            Предыдущий
          </button>
          <button
            class="trainer__button trainer__button--submit"
            :disabled="buttonLabel === 'Ответить' && (answers[currentIndex] == null || submitted[currentIndex])"
            @click="buttonLabel === 'Ответить' ? submitAnswer() : handleClose()"
          >
            {{ buttonLabel }}
          </button>
          <button class="trainer__button trainer__button--nav" :disabled="currentIndex === questions.length - 1" @click="nextQuestion">
            Следующий
          </button>
        </div>

        <div v-if="mode !== 'exam' && submitted[currentIndex]" class="trainer__feedback">
          <p class="trainer__feedback-text" :class="correctness[currentIndex] ? 'trainer__feedback-text--correct' : 'trainer__feedback-text--wrong'">
            {{ correctness[currentIndex] ? 'Правильно!' : 'Неправильно' }}
          </p>
        </div>

        <div v-if="mode === 'exam' && examFinished" class="trainer__feedback">
          <p class="trainer__feedback-text" :class="wrongCountExam <= wrongLimit ? 'trainer__feedback-text--correct' : 'trainer__feedback-text--wrong'">
            {{ wrongCountExam <= wrongLimit ? 'Сдал экзамен' : 'Не сдал экзамен' }}
          </p>
        </div>
      </form>
    </div>
    <div class="trainer__overlay" @click="handleClose" />
  </div>
</template>

<style scoped>
.trainer__backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}
.trainer__overlay { position: absolute; inset: 0; }
.trainer__content {
  background: #f6f6f6; padding:20px; border-radius:20px;
  max-width:800px; width:100%; max-height:90vh; overflow-y:auto;
  text-align:center; position:relative; z-index:1;
}
.trainer__close {
  position:absolute; top:12px; right:12px;
  background:transparent; border:none; font-size:24px; cursor:pointer;
}
.trainer__close:hover { color:#b82132; }
.trainer__timeout {
  background:#fff3f3; color:#c00; padding:10px;
  margin-bottom:10px; border-radius:6px; font-weight:bold;
}
.trainer__title {
  font-family:'Merriweather', serif; font-size:30px;
  margin:0 0 10px; text-transform:uppercase;
}
.trainer__timer {
  margin-bottom:20px; font-family:'Martian Mono', serif; font-size:20px;
}
.trainer__questions-container { margin-bottom:20px; }
.trainer__questions-counter {
  display:flex; flex-wrap:wrap; gap:8px; justify-content:center;
}
.trainer__question-number {
  width:35px; height:35px; display:flex; align-items:center;
  justify-content:center; border:2px solid #3b6790;
  font-weight:bold; color:#3b6790; cursor:pointer; border-radius:4px;
  transition:background-color .2s, color .2s;
}
.trainer__question-number--active {
  background:#3b6790; color:#fff; border-color:#3b6790;
}
.trainer__question-number--answered-exam {
  background:#3b6790; border-color:#3b6790; color:#fff;
}
.trainer__question-number--correct {
  background:#28a745; border-color:#28a745; color:#fff;
}
.trainer__question-number--wrong {
  background:#b82132; border-color:#b82132; color:#fff;
}
.trainer__question-content { margin-bottom:16px; }
.trainer__question-image {
  max-width:300px; max-height:200px; object-fit:contain; margin-bottom:12px;
}
.trainer__question-text {
  font-family:'Martian Mono', serif; font-size:18px; margin:0;
}
.trainer__options-list {
  display:grid; grid-template-columns:repeat(2,1fr); gap:12px;
  list-style:none; padding:0; margin:0;
}
.trainer__option {
  display:flex; flex-direction:column; align-items:center;
  justify-content:center; min-height:80px; padding:10px;
  border:2px solid black; border-radius:4px; cursor:pointer;
  transition:background-color .3s, box-shadow .3s;
}
.trainer__option:hover { background:#e6f0ff; }
.trainer__option--selected {
  border-color:#3b6790; box-shadow:0 0 0 2px #3b6790;
}
.trainer__option--correct {
  border-color:#28a745; box-shadow:0 0 0 2px #28a745;
}
.trainer__option--wrong {
  border-color:#b82132; box-shadow:0 0 0 2px #b82132;
}
.trainer__option-image {
  width:100px; height:100px; object-fit:contain; margin-bottom:8px;
}
.trainer__option-text {
  font-family:'Martian Mono', serif; font-size:14px;
}
.trainer__feedback { margin-top:16px; }
.trainer__feedback-text {
  font-family:'Martian Mono', serif; font-size:16px; font-weight:bold;
}
.trainer__feedback-text--correct { color:#28a745; }
.trainer__feedback-text--wrong   { color:#dc3545; }
.trainer__nav-buttons {
  display:flex; justify-content:center; gap:10px; margin-top:20px;
}
.trainer__button {
  padding:12px 20px; font-size:16px; border:none; cursor:pointer;
  border-radius:4px; transition:background-color .3s;
}
.trainer__button--nav { background:#3b6790; color:#fff; }
.trainer__button--nav:disabled { background:#ccc; cursor:default; }
.trainer__button--nav:not(:disabled):hover { background:#264562; }
.trainer__button--submit { background:#3b6790; color:#fff; }
.trainer__button--submit:disabled { background:#ccc; cursor:default; }
.trainer__button--submit:hover:not(:disabled) { background:#264562; }
@media (max-width:768px) {
  .trainer__options-list { grid-template-columns:1fr; }
}
</style>
