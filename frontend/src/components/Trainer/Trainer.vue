<!-- <script setup lang="js"> -->
<!-- import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue' -->
<!-- import { useRam } from '~/services' -->

<!-- // Props & Emits -->
<!-- const { visible, mode, filters } = defineProps({ -->
<!--  visible: Boolean, -->
<!--  mode: String, // 'exam' or 'quiz' -->
<!--  filters: Object, -->
<!-- }) -->
<!-- const emit = defineEmits(['close']) -->

<!-- // State -->
<!-- const questions = ref([]) -->
<!-- const answers = reactive([]) -->
<!-- const correctness = reactive([]) -->
<!-- const submitted = reactive([]) -->
<!-- const currentIndex = ref(0) -->
<!-- const sessionId = ref(null) -->
<!-- const timerMessage = ref('') -->
<!-- const examFinished = ref(false) -->
<!-- const wrongLimit = filters.wrongLimit ?? 0 -->

<!-- // Computed -->
<!-- const wrongCountExam = computed(() => -->
<!--  correctness.reduce( -->
<!--    (sum, correct, idx) => sum + (submitted[idx] && !correct ? 1 : 0), -->
<!--    0, -->
<!--  ), -->
<!-- ) -->
<!-- const allAnswered = computed(() => -->
<!--  submitted.length > 0 && submitted.every(v => v), -->
<!-- ) -->

<!-- // Button label -->
<!-- const buttonLabel = computed(() => { -->
<!--  if (mode === 'exam') { -->
<!--    if (!allAnswered.value) -->
<!--      return 'Ответить' -->
<!--    if (!examFinished.value) -->
<!--      return 'Завершить' -->
<!--    return 'Закрыть' -->
<!--  } -->
<!--  return allAnswered.value ? 'Закрыть' : 'Ответить' -->
<!-- }) -->

<!-- // Timer -->
<!-- const examDuration = ref(0) -->
<!-- const timeLeft = ref(0) -->
<!-- let timerInterval = null -->

<!-- // Close logic -->
<!-- function handleClose() { -->
<!--  if (mode === 'exam') { -->
<!--    // first click finishes exam, second click closes -->
<!--    if (!examFinished.value) { -->
<!--      confirmFinish() -->
<!--      return -->
<!--    } -->
<!--    emit('close') -->
<!--  } else { -->
<!--    emit('close') -->
<!--  } -->
<!-- } -->

<!-- function normalizeQuestions(payload) { -->
<!--  const arr = [ -->
<!--    payload?.questions, -->
<!--    payload?.data?.questions, -->
<!--    Array.isArray(payload?.data) && payload.data, -->
<!--    Array.isArray(payload) && payload, -->
<!--  ].find(Array.isArray) -->
<!--  if (!arr?.length) -->
<!--    return [] -->
<!--  return arr.map((raw) => { -->
<!--    const src = raw.attributes ?? raw -->
<!--    const opts = Array.isArray(src.answers) ? src.answers : [] -->
<!--    return { -->
<!--      id: Number(src.id ?? raw.id ?? 0), -->
<!--      text: src.text ?? '', -->
<!--      image: src.image, -->
<!--      options: opts.map(a => ({ -->
<!--        label: a.text ?? '', -->
<!--        value: Number(a.id ?? 0), -->
<!--        image: a.image, -->
<!--      })), -->
<!--    } -->
<!--  }) -->
<!-- } -->

<!-- async function fetchQuestions() { -->
<!--  examFinished.value = false -->
<!--  timerMessage.value = '' -->
<!--  const body = { -->
<!--    certificate: filters.certificate, -->
<!--    regions: filters.regions, -->
<!--    vessels: filters.vessels, -->
<!--  } -->
<!--  const endpoint = mode === 'exam' ? '/questions/exam' : '/questions/quiz' -->
<!--  const res = await useRam('POST', endpoint, { body }) -->
<!--  if (!res?.data) -->
<!--    return -->
<!--  const raw = res.data.data ?? res.data -->
<!--  if (raw.session) { -->
<!--    sessionId.value = raw.session -->
<!--    if (mode === 'exam') { -->
<!--      await useRam('POST', '/questions/launch', { body: { session: sessionId.value } }) -->
<!--      if (raw.timeLimit != null) { -->
<!--        examDuration.value = raw.timeLimit * 60 -->
<!--        startLocalTimer() -->
<!--      } -->
<!--    } -->
<!--  } -->
<!--  const loaded = normalizeQuestions(raw) -->
<!--  questions.value = loaded -->
<!--  answers.splice(0, answers.length, ...Array.from({ length: loaded.length }).fill(null)) -->
<!--  correctness.splice(0, correctness.length, ...Array.from({ length: loaded.length }).fill(null)) -->
<!--  submitted.splice(0, submitted.length, ...Array.from({ length: loaded.length }).fill(false)) -->
<!-- } -->

<!-- function startLocalTimer() { -->
<!--  clearInterval(timerInterval) -->
<!--  timeLeft.value = examDuration.value -->
<!--  timerInterval = setInterval(() => { -->
<!--    if (timeLeft.value > 0) { -->
<!--      timeLeft.value&#45;&#45; -->
<!--    } else { -->
<!--      clearInterval(timerInterval) -->
<!--      timerMessage.value = 'Время вышло' -->
<!--      finishSession().then(() => (examFinished.value = true)) -->
<!--    } -->
<!--  }, 1000) -->
<!-- } -->

<!-- const displayTime = computed(() => { -->
<!--  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0') -->
<!--  const s = String(timeLeft.value % 60).padStart(2, '0') -->
<!--  return `${m} : ${s}` -->
<!-- }) -->

<!-- onMounted(fetchQuestions) -->
<!-- onUnmounted(() => clearInterval(timerInterval)) -->
<!-- watch( -->
<!--  () => [mode, filters.certificate, filters.regions.join(','), filters.vessels.join(',')], -->
<!--  fetchQuestions, -->
<!-- ) -->

<!-- const currentQuestion = computed( -->
<!--  () => questions.value[currentIndex.value] ?? { id: 0, options: [] }, -->
<!-- ) -->

<!-- function selectAnswer(val) { -->
<!--  if (mode === 'exam' && examFinished.value) -->
<!--    return -->
<!--  const idx = currentIndex.value -->
<!--  if (!submitted[idx]) -->
<!--    answers[idx] = val -->
<!-- } -->

<!-- async function submitAnswer() { -->
<!--  if ((mode === 'exam' && examFinished.value) || buttonLabel.value !== 'Ответить') -->
<!--    return -->
<!--  const idx = currentIndex.value -->
<!--  const val = answers[idx] -->
<!--  if (val == null || submitted[idx]) -->
<!--    return -->
<!--  const res = await useRam('POST', '/questions/answer', { -->
<!--    body: { -->
<!--      session: sessionId.value, -->
<!--      question: currentQuestion.value.id, -->
<!--      answer: val, -->
<!--    }, -->
<!--  }) -->
<!--  const obj = res.data.data ?? res.data -->
<!--  correctness[idx] = Boolean(obj.is_correct) -->
<!--  submitted[idx] = true -->
<!-- } -->

<!-- async function finishSession() { -->
<!--  if (!sessionId.value) -->
<!--    return -->
<!--  await useRam('POST', '/questions/finish', { body: { session: sessionId.value } }) -->
<!-- } -->

<!-- function confirmFinish() { -->
<!--  if (window.confirm('Вы точно хотите завершить экзамен?')) { -->
<!--    clearInterval(timerInterval) -->
<!--    finishSession().then(() => (examFinished.value = true)) -->
<!--  } -->
<!-- } -->

<!-- function goToQuestion(i) { -->
<!--  if (i >= 0 && i < questions.value.length) -->
<!--    currentIndex.value = i -->
<!-- } -->
<!-- function previousQuestion() { -->
<!--  if (currentIndex.value > 0) -->
<!--    currentIndex.value&#45;&#45; -->
<!-- } -->
<!-- function nextQuestion() { -->
<!--  if (currentIndex.value < questions.value.length - 1) -->
<!--    currentIndex.value++ -->
<!-- } -->
<!-- </script> -->

<!-- <template> -->
<!--  <div v-if="visible" class="trainer__backdrop"> -->
<!--    <div class="trainer__content" @click.stop> -->
<!--      <button class="trainer__close" @click="handleClose"> -->
<!--        × -->
<!--      </button> -->
<!--      <div v-if="timerMessage" class="trainer__timeout"> -->
<!--        {{ timerMessage }} -->
<!--      </div> -->

<!--      <h2 class="trainer__title"> -->
<!--        {{ mode === 'exam' ? 'Экзамен' : 'Тренажёр' }} -->
<!--      </h2> -->
<!--      <div v-if="mode === 'exam'" class="trainer__timer"> -->
<!--        {{ displayTime }} -->
<!--      </div> -->

<!--      <div class="trainer__questions-container"> -->
<!--        <div class="trainer__questions-counter"> -->
<!--          <span -->
<!--            v-for="(_, idx) in questions" -->
<!--            :key="idx" -->
<!--            class="trainer__question-number" -->
<!--            :class="{ -->
<!--              'trainer__question-number&#45;&#45;active': idx === currentIndex, -->
<!--              'trainer__question-number&#45;&#45;answered-exam': mode === 'exam' && submitted[idx] && !examFinished, -->
<!--              'trainer__question-number&#45;&#45;correct': (mode === 'quiz' || examFinished) && submitted[idx] && correctness[idx], -->
<!--              'trainer__question-number&#45;&#45;wrong': (mode === 'quiz' || examFinished) && submitted[idx] && !correctness[idx], -->
<!--            }" -->
<!--            @click="goToQuestion(idx)" -->
<!--          >{{ idx + 1 }}</span> -->
<!--        </div> -->
<!--      </div> -->

<!--      <form @submit.prevent> -->
<!--        <div class="trainer__question-content"> -->
<!--          <img -->
<!--            v-if="currentQuestion.image" -->
<!--            alt="question image" -->
<!--            class="trainer__question-image" -->
<!--            :src="currentQuestion.image" -->
<!--          > -->
<!--          <p v-if="currentQuestion.text" class="trainer__question-text"> -->
<!--            {{ currentQuestion.text }} -->
<!--          </p> -->
<!--        </div> -->

<!--        <ul class="trainer__options-list"> -->
<!--          <li v-for="opt in currentQuestion.options" :key="opt.value"> -->
<!--            <label -->
<!--              class="trainer__option" -->
<!--              :class="{ -->
<!--                'trainer__option&#45;&#45;selected': answers[currentIndex] === opt.value, -->
<!--                'trainer__option&#45;&#45;correct': mode !== 'exam' && submitted[currentIndex] && answers[currentIndex] === opt.value && correctness[currentIndex], -->
<!--                'trainer__option&#45;&#45;wrong': mode !== 'exam' && submitted[currentIndex] && answers[currentIndex] === opt.value && !correctness[currentIndex], -->
<!--              }" -->
<!--              @click.prevent="selectAnswer(opt.value)" -->
<!--            > -->
<!--              <img -->
<!--                v-if="opt.image" -->
<!--                alt="option image" -->
<!--                class="trainer__option-image" -->
<!--                :src="opt.image" -->
<!--              > -->
<!--              <span class="trainer__option-text">{{ opt.label }}</span> -->
<!--            </label> -->
<!--          </li> -->
<!--        </ul> -->

<!--        <div class="trainer__nav-buttons"> -->
<!--          <button class="trainer__button trainer__button&#45;&#45;nav" :disabled="currentIndex === 0" @click="previousQuestion"> -->
<!--            Предыдущий -->
<!--          </button> -->
<!--          <button -->
<!--            class="trainer__button trainer__button&#45;&#45;submit" -->
<!--            :disabled="buttonLabel === 'Ответить' && (answers[currentIndex] == null || submitted[currentIndex])" -->
<!--            @click="buttonLabel === 'Ответить' ? submitAnswer() : handleClose()" -->
<!--          > -->
<!--            {{ buttonLabel }} -->
<!--          </button> -->
<!--          <button class="trainer__button trainer__button&#45;&#45;nav" :disabled="currentIndex === questions.length - 1" @click="nextQuestion"> -->
<!--            Следующий -->
<!--          </button> -->
<!--        </div> -->

<!--        <div v-if="mode !== 'exam' && submitted[currentIndex]" class="trainer__feedback"> -->
<!--          <p class="trainer__feedback-text" :class="correctness[currentIndex] ? 'trainer__feedback-text&#45;&#45;correct' : 'trainer__feedback-text&#45;&#45;wrong'"> -->
<!--            {{ correctness[currentIndex] ? 'Правильно!' : 'Неправильно' }} -->
<!--          </p> -->
<!--        </div> -->

<!--        <div v-if="mode === 'exam' && examFinished" class="trainer__feedback"> -->
<!--          <p class="trainer__feedback-text" :class="wrongCountExam <= wrongLimit ? 'trainer__feedback-text&#45;&#45;correct' : 'trainer__feedback-text&#45;&#45;wrong'"> -->
<!--            {{ wrongCountExam <= wrongLimit ? 'Сдал экзамен' : 'Не сдал экзамен' }} -->
<!--          </p> -->
<!--        </div> -->
<!--      </form> -->
<!--    </div> -->
<!--    <div class="trainer__overlay" @click="handleClose" /> -->
<!--  </div> -->
<!-- </template> -->

<!-- <style scoped> -->
<!-- .trainer__backdrop { -->
<!--  position: fixed; inset: 0; -->
<!--  background: rgba(0,0,0,0.5); -->
<!--  display: flex; align-items: center; justify-content: center; -->
<!-- } -->
<!-- .trainer__overlay { position: absolute; inset: 0; } -->
<!-- .trainer__content { -->
<!--  background: #f6f6f6; padding:20px; border-radius:20px; -->
<!--  max-width:800px; width:100%; max-height:90vh; overflow-y:auto; -->
<!--  text-align:center; position:relative; z-index:1; -->
<!-- } -->
<!-- .trainer__close { -->
<!--  position:absolute; top:12px; right:12px; -->
<!--  background:transparent; border:none; font-size:24px; cursor:pointer; -->
<!-- } -->
<!-- .trainer__close:hover { color:#b82132; } -->
<!-- .trainer__timeout { -->
<!--  background:#fff3f3; color:#c00; padding:10px; -->
<!--  margin-bottom:10px; border-radius:6px; font-weight:bold; -->
<!-- } -->
<!-- .trainer__title { -->
<!--  font-family:'Merriweather', serif; font-size:30px; -->
<!--  margin:0 0 10px; text-transform:uppercase; -->
<!-- } -->
<!-- .trainer__timer { -->
<!--  margin-bottom:20px; font-family:'Martian Mono', serif; font-size:20px; -->
<!-- } -->
<!-- .trainer__questions-container { margin-bottom:20px; } -->
<!-- .trainer__questions-counter { -->
<!--  display:flex; flex-wrap:wrap; gap:8px; justify-content:center; -->
<!-- } -->
<!-- .trainer__question-number { -->
<!--  width:35px; height:35px; display:flex; align-items:center; -->
<!--  justify-content:center; border:2px solid #3b6790; -->
<!--  font-weight:bold; color:#3b6790; cursor:pointer; border-radius:4px; -->
<!--  transition:background-color .2s, color .2s; -->
<!-- } -->
<!-- .trainer__question-number&#45;&#45;active { -->
<!--  background:#3b6790; color:#fff; border-color:#3b6790; -->
<!-- } -->
<!-- .trainer__question-number&#45;&#45;answered-exam { -->
<!--  background:#3b6790; border-color:#3b6790; color:#fff; -->
<!-- } -->
<!-- .trainer__question-number&#45;&#45;correct { -->
<!--  background:#28a745; border-color:#28a745; color:#fff; -->
<!-- } -->
<!-- .trainer__question-number&#45;&#45;wrong { -->
<!--  background:#b82132; border-color:#b82132; color:#fff; -->
<!-- } -->
<!-- .trainer__question-content { margin-bottom:16px; } -->
<!-- .trainer__question-image { -->
<!--  max-width:300px; max-height:200px; object-fit:contain; margin-bottom:12px; -->
<!-- } -->
<!-- .trainer__question-text { -->
<!--  font-family:'Martian Mono', serif; font-size:18px; margin:0; -->
<!-- } -->
<!-- .trainer__options-list { -->
<!--  display:grid; grid-template-columns:repeat(2,1fr); gap:12px; -->
<!--  list-style:none; padding:0; margin:0; -->
<!-- } -->
<!-- .trainer__option { -->
<!--  display:flex; flex-direction:column; align-items:center; -->
<!--  justify-content:center; min-height:80px; padding:10px; -->
<!--  border:2px solid black; border-radius:4px; cursor:pointer; -->
<!--  transition:background-color .3s, box-shadow .3s; -->
<!-- } -->
<!-- .trainer__option:hover { background:#e6f0ff; } -->
<!-- .trainer__option&#45;&#45;selected { -->
<!--  border-color:#3b6790; box-shadow:0 0 0 2px #3b6790; -->
<!-- } -->
<!-- .trainer__option&#45;&#45;correct { -->
<!--  border-color:#28a745; box-shadow:0 0 0 2px #28a745; -->
<!-- } -->
<!-- .trainer__option&#45;&#45;wrong { -->
<!--  border-color:#b82132; box-shadow:0 0 0 2px #b82132; -->
<!-- } -->
<!-- .trainer__option-image { -->
<!--  width:100px; height:100px; object-fit:contain; margin-bottom:8px; -->
<!-- } -->
<!-- .trainer__option-text { -->
<!--  font-family:'Martian Mono', serif; font-size:14px; -->
<!-- } -->
<!-- .trainer__feedback { margin-top:16px; } -->
<!-- .trainer__feedback-text { -->
<!--  font-family:'Martian Mono', serif; font-size:16px; font-weight:bold; -->
<!-- } -->
<!-- .trainer__feedback-text&#45;&#45;correct { color:#28a745; } -->
<!-- .trainer__feedback-text&#45;&#45;wrong   { color:#dc3545; } -->
<!-- .trainer__nav-buttons { -->
<!--  display:flex; justify-content:center; gap:10px; margin-top:20px; -->
<!-- } -->
<!-- .trainer__button { -->
<!--  padding:12px 20px; font-size:16px; border:none; cursor:pointer; -->
<!--  border-radius:4px; transition:background-color .3s; -->
<!-- } -->
<!-- .trainer__button&#45;&#45;nav { background:#3b6790; color:#fff; } -->
<!-- .trainer__button&#45;&#45;nav:disabled { background:#ccc; cursor:default; } -->
<!-- .trainer__button&#45;&#45;nav:not(:disabled):hover { background:#264562; } -->
<!-- .trainer__button&#45;&#45;submit { background:#3b6790; color:#fff; } -->
<!-- .trainer__button&#45;&#45;submit:disabled { background:#ccc; cursor:default; } -->
<!-- .trainer__button&#45;&#45;submit:hover:not(:disabled) { background:#264562; } -->
<!-- @media (max-width:768px) { -->
<!--  .trainer__options-list { grid-template-columns:1fr; } -->
<!-- } -->
<!-- </style> -->

<!-- second ver -->
<!-- <script setup lang="js"> -->
<!-- import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue' -->
<!-- import { useRam } from '~/services' -->

<!-- // Props & Emits -->
<!-- const { visible, mode, filters } = defineProps({ -->
<!--  visible: Boolean, -->
<!--  mode: String, // 'exam' or 'quiz' -->
<!--  filters: Object, -->
<!-- }) -->
<!-- const emit = defineEmits(['close']) -->

<!-- // State -->
<!-- const questions = ref([]) -->
<!-- const answers = reactive([]) -->
<!-- const correctness = reactive([]) -->
<!-- const submitted = reactive([]) -->
<!-- const currentIndex = ref(0) -->
<!-- const sessionId = ref(null) -->
<!-- const timerMessage = ref('') -->
<!-- const examFinished = ref(false) -->
<!-- const wrongLimit = filters.wrongLimit ?? 0 -->

<!-- // Computed -->
<!-- const wrongCountExam = computed(() => -->
<!--  correctness.reduce( -->
<!--    (sum, correct, idx) => sum + (submitted[idx] && !correct ? 1 : 0), -->
<!--    0, -->
<!--  ), -->
<!-- ) -->
<!-- const allAnswered = computed(() => -->
<!--  submitted.length > 0 && submitted.every(v => v), -->
<!-- ) -->
<!-- // экзамен считается сданным только если отвечены все вопросы и ошибок не больше лимита -->
<!-- const examPassed = computed(() => -->
<!--  allAnswered.value && wrongCountExam.value <= wrongLimit, -->
<!-- ) -->

<!-- // Button label -->
<!-- const buttonLabel = computed(() => { -->
<!--  if (mode === 'exam') { -->
<!--    if (!allAnswered.value) -->
<!--      return 'Ответить' -->
<!--    if (!examFinished.value) -->
<!--      return 'Завершить' -->
<!--    return 'Закрыть' -->
<!--  } -->
<!--  return allAnswered.value ? 'Закрыть' : 'Ответить' -->
<!-- }) -->

<!-- // Timer -->
<!-- const examDuration = ref(0) -->
<!-- const timeLeft = ref(0) -->
<!-- let timerInterval = null -->

<!-- // Close logic -->
<!-- function handleClose() { -->
<!--  if (mode === 'exam') { -->
<!--    if (!examFinished.value) { -->
<!--      confirmFinish() -->
<!--      return -->
<!--    } -->
<!--    emit('close') -->
<!--  } else { -->
<!--    emit('close') -->
<!--  } -->
<!-- } -->

<!-- function normalizeQuestions(payload) { -->
<!--  const arr = [ -->
<!--    payload?.questions, -->
<!--    payload?.data?.questions, -->
<!--    Array.isArray(payload?.data) && payload.data, -->
<!--    Array.isArray(payload) && payload, -->
<!--  ].find(Array.isArray) -->
<!--  if (!arr?.length) -->
<!--    return [] -->
<!--  return arr.map((raw) => { -->
<!--    const src = raw.attributes ?? raw -->
<!--    const opts = Array.isArray(src.answers) ? src.answers : [] -->
<!--    return { -->
<!--      id: Number(src.id ?? raw.id ?? 0), -->
<!--      text: src.text ?? '', -->
<!--      image: src.image, -->
<!--      options: opts.map(a => ({ -->
<!--        label: a.text ?? '', -->
<!--        value: Number(a.id ?? 0), -->
<!--        image: a.image, -->
<!--      })), -->
<!--    } -->
<!--  }) -->
<!-- } -->

<!-- async function fetchQuestions() { -->
<!--  examFinished.value = false -->
<!--  timerMessage.value = '' -->
<!--  const body = { -->
<!--    certificate: filters.certificate, -->
<!--    regions: filters.regions, -->
<!--    vessels: filters.vessels, -->
<!--  } -->
<!--  const endpoint = mode === 'exam' ? '/questions/exam' : '/questions/quiz' -->
<!--  const res = await useRam('POST', endpoint, { body }) -->
<!--  if (!res?.data) -->
<!--    return -->
<!--  const raw = res.data.data ?? res.data -->
<!--  if (raw.session) { -->
<!--    sessionId.value = raw.session -->
<!--    if (mode === 'exam') { -->
<!--      await useRam('POST', '/questions/launch', { body: { session: sessionId.value } }) -->
<!--      if (raw.timeLimit != null) { -->
<!--        examDuration.value = raw.timeLimit * 60 -->
<!--        startLocalTimer() -->
<!--      } -->
<!--    } -->
<!--  } -->
<!--  const loaded = normalizeQuestions(raw) -->
<!--  questions.value = loaded -->
<!--  answers.splice(0, answers.length, ...Array.from({ length: loaded.length }).fill(null)) -->
<!--  correctness.splice(0, correctness.length, ...Array.from({ length: loaded.length }).fill(null)) -->
<!--  submitted.splice(0, submitted.length, ...Array.from({ length: loaded.length }).fill(false)) -->
<!-- } -->

<!-- function startLocalTimer() { -->
<!--  clearInterval(timerInterval) -->
<!--  timeLeft.value = examDuration.value -->
<!--  timerInterval = setInterval(() => { -->
<!--    if (timeLeft.value > 0) { -->
<!--      timeLeft.value&#45;&#45; -->
<!--    } else { -->
<!--      clearInterval(timerInterval) -->
<!--      timerMessage.value = 'Время вышло' -->
<!--      finishSession().then(() => (examFinished.value = true)) -->
<!--    } -->
<!--  }, 1000) -->
<!-- } -->

<!-- const displayTime = computed(() => { -->
<!--  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0') -->
<!--  const s = String(timeLeft.value % 60).padStart(2, '0') -->
<!--  return `${m} : ${s}` -->
<!-- }) -->

<!-- onMounted(fetchQuestions) -->
<!-- onUnmounted(() => clearInterval(timerInterval)) -->
<!-- watch( -->
<!--  () => [mode, filters.certificate, filters.regions.join(','), filters.vessels.join(',')], -->
<!--  fetchQuestions, -->
<!-- ) -->

<!-- const currentQuestion = computed( -->
<!--  () => questions.value[currentIndex.value] ?? { id: 0, options: [] }, -->
<!-- ) -->

<!-- function selectAnswer(val) { -->
<!--  if (mode === 'exam' && examFinished.value) -->
<!--    return -->
<!--  const idx = currentIndex.value -->
<!--  if (!submitted[idx]) -->
<!--    answers[idx] = val -->
<!-- } -->

<!-- // после ответа в экзамене автоматически переходим к следующему вопросу -->
<!-- async function submitAnswer() { -->
<!--  if ((mode === 'exam' && examFinished.value) || buttonLabel.value !== 'Ответить') -->
<!--    return -->
<!--  const idx = currentIndex.value -->
<!--  const val = answers[idx] -->
<!--  if (val == null || submitted[idx]) -->
<!--    return -->

<!--  const res = await useRam('POST', '/questions/answer', { -->
<!--    body: { -->
<!--      session: sessionId.value, -->
<!--      question: currentQuestion.value.id, -->
<!--      answer: val, -->
<!--    }, -->
<!--  }) -->
<!--  const obj = res.data.data ?? res.data -->
<!--  correctness[idx] = Boolean(obj.is_correct) -->
<!--  submitted[idx] = true -->

<!--  if (mode === 'exam' && currentIndex.value < questions.value.length - 1) { -->
<!--    currentIndex.value++ -->
<!--  } -->
<!-- } -->

<!-- async function finishSession() { -->
<!--  if (!sessionId.value) -->
<!--    return -->
<!--  await useRam('POST', '/questions/finish', { body: { session: sessionId.value } }) -->
<!-- } -->

<!-- function confirmFinish() { -->
<!--  if (window.confirm('Вы точно хотите завершить экзамен?')) { -->
<!--    clearInterval(timerInterval) -->
<!--    finishSession().then(() => (examFinished.value = true)) -->
<!--  } -->
<!-- } -->

<!-- function goToQuestion(i) { -->
<!--  if (i >= 0 && i < questions.value.length) -->
<!--    currentIndex.value = i -->
<!-- } -->
<!-- function previousQuestion() { -->
<!--  if (currentIndex.value > 0) -->
<!--    currentIndex.value&#45;&#45; -->
<!-- } -->
<!-- function nextQuestion() { -->
<!--  if (currentIndex.value < questions.value.length - 1) -->
<!--    currentIndex.value++ -->
<!-- } -->
<!-- </script> -->

<!-- <template> -->
<!--  <div v-if="visible" class="trainer__backdrop"> -->
<!--    <div class="trainer__content" @click.stop> -->
<!--      <button class="trainer__close" @click="handleClose"> -->
<!--        × -->
<!--      </button> -->
<!--      <div v-if="timerMessage" class="trainer__timeout"> -->
<!--        {{ timerMessage }} -->
<!--      </div> -->

<!--      <h2 class="trainer__title"> -->
<!--        {{ mode === 'exam' ? 'Экзамен' : 'Тренажёр' }} -->
<!--      </h2> -->
<!--      <div v-if="mode === 'exam'" class="trainer__timer"> -->
<!--        {{ displayTime }} -->
<!--      </div> -->

<!--      <div class="trainer__questions-container"> -->
<!--        <div class="trainer__questions-counter"> -->
<!--          <span -->
<!--            v-for="(_, idx) in questions" -->
<!--            :key="idx" -->
<!--            class="trainer__question-number" -->
<!--            :class="{ -->
<!--              'trainer__question-number&#45;&#45;active': idx === currentIndex, -->
<!--              'trainer__question-number&#45;&#45;answered-exam': mode === 'exam' && submitted[idx] && !examFinished, -->
<!--              'trainer__question-number&#45;&#45;correct': (mode === 'quiz' || examFinished) && submitted[idx] && correctness[idx], -->
<!--              'trainer__question-number&#45;&#45;wrong': (mode === 'quiz' || examFinished) && submitted[idx] && !correctness[idx], -->
<!--            }" -->
<!--            @click="goToQuestion(idx)" -->
<!--          >{{ idx + 1 }}</span> -->
<!--        </div> -->
<!--      </div> -->

<!--      <form @submit.prevent> -->
<!--        <div class="trainer__question-content"> -->
<!--          <img -->
<!--            v-if="currentQuestion.image" -->
<!--            alt="question image" -->
<!--            class="trainer__question-image" -->
<!--            :src="currentQuestion.image" -->
<!--          > -->
<!--          <p v-if="currentQuestion.text" class="trainer__question-text"> -->
<!--            {{ currentQuestion.text }} -->
<!--          </p> -->
<!--        </div> -->

<!--        <ul class="trainer__options-list"> -->
<!--          <li v-for="opt in currentQuestion.options" :key="opt.value"> -->
<!--            <label -->
<!--              class="trainer__option" -->
<!--              :class="{ -->
<!--                'trainer__option&#45;&#45;selected': answers[currentIndex] === opt.value, -->
<!--                'trainer__option&#45;&#45;correct': mode !== 'exam' && submitted[currentIndex] && answers[currentIndex] === opt.value && correctness[currentIndex], -->
<!--                'trainer__option&#45;&#45;wrong': mode !== 'exam' && submitted[currentIndex] && answers[currentIndex] === opt.value && !correctness[currentIndex], -->
<!--              }" -->
<!--              @click.prevent="selectAnswer(opt.value)" -->
<!--            > -->
<!--              <img -->
<!--                v-if="opt.image" -->
<!--                alt="option image" -->
<!--                class="trainer__option-image" -->
<!--                :src="opt.image" -->
<!--              > -->
<!--              <span class="trainer__option-text">{{ opt.label }}</span> -->
<!--            </label> -->
<!--          </li> -->
<!--        </ul> -->

<!--        <div class="trainer__nav-buttons"> -->
<!--          <button class="trainer__button trainer__button&#45;&#45;nav" :disabled="currentIndex === 0" @click="previousQuestion"> -->
<!--            Предыдущий -->
<!--          </button> -->
<!--          <button -->
<!--            class="trainer__button trainer__button&#45;&#45;submit" -->
<!--            :disabled="buttonLabel === 'Ответить' && (answers[currentIndex] == null || submitted[currentIndex])" -->
<!--            @click="buttonLabel === 'Ответить' ? submitAnswer() : handleClose()" -->
<!--          > -->
<!--            {{ buttonLabel }} -->
<!--          </button> -->
<!--          <button class="trainer__button trainer__button&#45;&#45;nav" :disabled="currentIndex === questions.length - 1" @click="nextQuestion"> -->
<!--            Следующий -->
<!--          </button> -->
<!--        </div> -->

<!--        <div v-if="mode !== 'exam' && submitted[currentIndex]" class="trainer__feedback"> -->
<!--          <p class="trainer__feedback-text" :class="correctness[currentIndex] ? 'trainer__feedback-text&#45;&#45;correct' : 'trainer__feedback-text&#45;&#45;wrong'"> -->
<!--            {{ correctness[currentIndex] ? 'Правильно!' : 'Неправильно' }} -->
<!--          </p> -->
<!--        </div> -->

<!--        <div v-if="mode === 'exam' && examFinished" class="trainer__feedback"> -->
<!--          <p class="trainer__feedback-text" :class="examPassed.value ? 'trainer__feedback-text&#45;&#45;correct' : 'trainer__feedback-text&#45;&#45;wrong'"> -->
<!--            {{ examPassed.value ? 'Сдал экзамен' : 'Не сдал экзамен' }} -->
<!--          </p> -->
<!--        </div> -->
<!--      </form> -->
<!--    </div> -->
<!--    <div class="trainer__overlay" @click="handleClose" /> -->
<!--  </div> -->
<!-- </template> -->

<!-- <style scoped> -->
<!-- .trainer__backdrop { -->
<!--  position: fixed; inset: 0; -->
<!--  background: rgba(0,0,0,0.5); -->
<!--  display: flex; align-items: center; justify-content: center; -->
<!-- } -->
<!-- .trainer__overlay { position: absolute; inset: 0; } -->
<!-- .trainer__content { -->
<!--  background: #f6f6f6; padding:20px; border-radius:20px; -->
<!--  max-width:800px; width:100%; max-height:90vh; overflow-y:auto; -->
<!--  text-align:center; position:relative; z-index:1; -->
<!-- } -->
<!-- .trainer__close { -->
<!--  position:absolute; top:12px; right:12px; -->
<!--  background:transparent; border:none; font-size:24px; cursor:pointer; -->
<!-- } -->
<!-- .trainer__close:hover { color:#b82132; } -->
<!-- .trainer__timeout { -->
<!--  background:#fff3f3; color:#c00; padding:10px; -->
<!--  margin-bottom:10px; border-radius:6px; font-weight:bold; -->
<!-- } -->
<!-- .trainer__title { -->
<!--  font-family:'Merriweather', serif; font-size:30px; -->
<!--  margin:0 0 10px; text-transform:uppercase; -->
<!-- } -->
<!-- .trainer__timer { -->
<!--  margin-bottom:20px; font-family:'Martian Mono', serif; font-size:20px; -->
<!-- } -->
<!-- .trainer__questions-container { margin-bottom:20px; } -->
<!-- .trainer__questions-counter { -->
<!--  display:flex; flex-wrap:wrap; gap:8px; justify-content:center; -->
<!-- } -->
<!-- .trainer__question-number { -->
<!--  width:35px; height:35px; display:flex; align-items:center; -->
<!--  justify-content:center; border:2px solid #3b6790; -->
<!--  font-weight:bold; color:#3b6790; cursor:pointer; border-radius:4px; -->
<!--  transition:background-color .2s, color .2s; -->
<!-- } -->
<!-- .trainer__question-number&#45;&#45;active { -->
<!--  background:#3b6790; color:#fff; border-color:#3b6790; -->
<!-- } -->
<!-- .trainer__question-number&#45;&#45;answered-exam { -->
<!--  background:#3b6790; border-color:#3b6790; color:#fff; -->
<!-- } -->
<!-- .trainer__question-number&#45;&#45;correct { -->
<!--  background:#28a745; border-color:#28a745; color:#fff; -->
<!-- } -->
<!-- .trainer__question-number&#45;&#45;wrong { -->
<!--  background:#b82132; border-color:#b82132; color:#fff; -->
<!-- } -->
<!-- .trainer__question-content { margin-bottom:16px; } -->
<!-- .trainer__question-image { -->
<!--  max-width:300px; max-height:200px; object-fit:contain; margin-bottom:12px; -->
<!-- } -->
<!-- .trainer__question-text { -->
<!--  font-family:'Martian Mono', serif; font-size:18px; margin:0; -->
<!-- } -->
<!-- .trainer__options-list { -->
<!--  display:grid; grid-template-columns:repeat(2,1fr); gap:12px; -->
<!--  list-style:none; padding:0; margin:0; -->
<!-- } -->
<!-- .trainer__option { -->
<!--  display:flex; flex-direction:column; align-items:center; -->
<!--  justify-content:center; min-height:80px; padding:10px; -->
<!--  border:2px solid black; border-radius:4px; cursor:pointer; -->
<!--  transition:background-color .3s, box-shadow .3s; -->
<!-- } -->
<!-- .trainer__option:hover { background:#e6f0ff; } -->
<!-- .trainer__option&#45;&#45;selected { -->
<!--  border-color:#3b6790; box-shadow:0 0 0 2px #3b6790; -->
<!-- } -->
<!-- .trainer__option&#45;&#45;correct { -->
<!--  border-color:#28a745; box-shadow:0 0 0 2px #28a745; -->
<!-- } -->
<!-- .trainer__option&#45;&#45;wrong { -->
<!--  border-color:#b82132; box-shadow:0 0 0 2px #b82132; -->
<!-- } -->
<!-- .trainer__option-image { -->
<!--  width:100px; height:100px; object-fit:contain; margin-bottom:8px; -->
<!-- } -->
<!-- .trainer__option-text { -->
<!--  font-family:'Martian Mono', serif; font-size:14px; -->
<!-- } -->
<!-- .trainer__feedback { margin-top:16px; } -->
<!-- .trainer__feedback-text { -->
<!--  font-family:'Martian Mono', serif; font-size:16px; font-weight:bold; -->
<!-- } -->
<!-- .trainer__feedback-text&#45;&#45;correct { color:#28a745; } -->
<!-- .trainer__feedback-text&#45;&#45;wrong   { color:#dc3545; } -->
<!-- .trainer__nav-buttons { -->
<!--  display:flex; justify-content:center; gap:10px; margin-top:20px; -->
<!-- } -->
<!-- .trainer__button { -->
<!--  padding:12px 20px; font-size:16px; border:none; cursor:pointer; -->
<!--  border-radius:4px; transition:background-color .3s; -->
<!-- } -->
<!-- .trainer__button&#45;&#45;nav { background:#3b6790; color:#fff; } -->
<!-- .trainer__button&#45;&#45;nav:disabled { background:#ccc; cursor:default; } -->
<!-- .trainer__button&#45;&#45;nav:not(:disabled):hover { background:#264562; } -->
<!-- .trainer__button&#45;&#45;submit { background:#3b6790; color:#fff; } -->
<!-- .trainer__button&#45;&#45;submit:disabled { background:#ccc; cursor:default; } -->
<!-- .trainer__button&#45;&#45;submit:hover:not(:disabled) { background:#264562; } -->
<!-- @media (max-width:768px) { -->
<!--  .trainer__options-list { grid-template-columns:1fr; } -->
<!-- } -->
<!-- </style> -->

<!-- 3 version -->
<!-- <script setup lang="js"> -->
<!-- import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue' -->
<!-- import { useRam } from '~/services' -->

<!-- // Props & Emits -->
<!-- const { visible, mode, filters } = defineProps({ visible: Boolean, mode: String, filters: Object }) -->
<!-- const emit = defineEmits(['close']) -->

<!-- // State -->
<!-- const questions = ref([]) -->
<!-- const answers = reactive([]) -->
<!-- const correctness = reactive([]) -->
<!-- const submitted = reactive([]) -->
<!-- const currentIndex = ref(0) -->
<!-- const sessionId = ref(null) -->
<!-- const timerMessage = ref('') -->
<!-- const examFinished = ref(false) -->
<!-- const wrongLimit = filters.wrongLimit ?? 0 -->

<!-- // Timing -->
<!-- const examDuration = ref(0) -->
<!-- const timeLeft = ref(0) -->
<!-- let timerInterval = null -->

<!-- // Computed -->
<!-- const wrongCountExam = computed(() => -->
<!--  correctness.reduce((sum, c, i) => sum + (submitted[i] && !c ? 1 : 0), 0), -->
<!-- ) -->
<!-- const allAnswered = computed(() => submitted.length > 0 && submitted.every(v => v)) -->
<!-- const examPassed = computed(() => allAnswered.value && wrongCountExam.value <= wrongLimit) -->
<!-- const spentMinutes = computed(() => Math.ceil((examDuration.value - timeLeft.value) / 60)) -->
<!-- const buttonLabel = computed(() => { -->
<!--  if (mode === 'exam') { -->
<!--    if (!allAnswered.value) -->
<!--      return 'Ответить' -->
<!--    if (!examFinished.value) -->
<!--      return 'Завершить' -->
<!--    return 'Закрыть' -->
<!--  } -->
<!--  return allAnswered.value ? 'Закрыть' : 'Ответить' -->
<!-- }) -->
<!-- const displayTime = computed(() => { -->
<!--  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0') -->
<!--  const s = String(timeLeft.value % 60).padStart(2, '0') -->
<!--  return `${m} : ${s}` -->
<!-- }) -->
<!-- const currentQuestion = computed(() => questions.value[currentIndex.value] || {}) -->

<!-- // Helpers -->
<!-- function getAnswerLabel(idx) { -->
<!--  const q = questions.value[idx] -->
<!--  const opt = q.options.find(o => o.value === answers[idx]) -->
<!--  return opt ? opt.label : '' -->
<!-- } -->

<!-- // Fetch & normalize -->
<!-- function normalizeQuestions(payload) { -->
<!--  const list = [ -->
<!--    payload.questions, -->
<!--    payload.data?.questions, -->
<!--    Array.isArray(payload.data) && payload.data, -->
<!--    Array.isArray(payload) && payload, -->
<!--  ].find(Array.isArray) -->
<!--  if (!list) -->
<!--    return [] -->
<!--  return list.map((item) => { -->
<!--    const src = item.attributes || item -->
<!--    return { -->
<!--      id: src.id || item.id, -->
<!--      text: src.text, -->
<!--      image: src.image, -->
<!--      description: src.description || '', -->
<!--      options: (src.answers || []).map(a => ({ label: a.text, value: a.id, image: a.image })), -->
<!--    } -->
<!--  }) -->
<!-- } -->

<!-- async function fetchQuestions() { -->
<!--  examFinished.value = false -->
<!--  timerMessage.value = '' -->
<!--  const body = { certificate: filters.certificate, regions: filters.regions, vessels: filters.vessels } -->
<!--  const endpoint = mode === 'exam' ? '/questions/exam' : '/questions/quiz' -->
<!--  const res = await useRam('POST', endpoint, { body }) -->
<!--  if (!res?.data) -->
<!--    return -->
<!--  const raw = res.data.data ?? res.data -->
<!--  if (raw.session) { -->
<!--    sessionId.value = raw.session -->
<!--    if (mode === 'exam') { -->
<!--      await useRam('POST', '/questions/launch', { body: { session: sessionId.value } }) -->
<!--      if (raw.timeLimit != null) { -->
<!--        examDuration.value = raw.timeLimit * 60 -->
<!--        startLocalTimer() -->
<!--      } -->
<!--    } -->
<!--  } -->
<!--  questions.value = normalizeQuestions(raw) -->
<!--  answers.splice(0, answers.length, ...Array.from({ length: questions.value.length }).fill(null)) -->
<!--  correctness.splice(0, correctness.length, ...Array.from({ length: questions.value.length }).fill(null)) -->
<!--  submitted.splice(0, submitted.length, ...Array.from({ length: questions.value.length }).fill(false)) -->
<!--  currentIndex.value = 0 -->
<!-- } -->

<!-- // Timer -->
<!-- function startLocalTimer() { -->
<!--  clearInterval(timerInterval) -->
<!--  timeLeft.value = examDuration.value -->
<!--  timerInterval = setInterval(() => { -->
<!--    if (timeLeft.value > 0) { timeLeft.value&#45;&#45; -->
<!--    } -->
<!--    else { -->
<!--      clearInterval(timerInterval) -->
<!--      timerMessage.value = 'Время вышло' -->
<!--      finishSession() -->
<!--    } -->
<!--  }, 1000) -->
<!-- } -->

<!-- // Actions -->
<!-- function selectAnswer(val) { -->
<!--  if (mode === 'exam' && examFinished.value) -->
<!--    return -->
<!--  answers[currentIndex.value] = val -->
<!-- } -->

<!-- async function submitAnswer() { -->
<!--  if ((mode === 'exam' && examFinished.value) || buttonLabel.value !== 'Ответить') -->
<!--    return -->
<!--  const idx = currentIndex.value -->
<!--  if (answers[idx] == null || submitted[idx]) -->
<!--    return -->
<!--  const res = await useRam('POST', '/questions/answer', { -->
<!--    body: { -->
<!--      session: sessionId.value, -->
<!--      question: currentQuestion.value.id, -->
<!--      answer: answers[idx], -->
<!--    }, -->
<!--  }) -->
<!--  correctness[idx] = Boolean(res.data.data?.is_correct ?? res.data.is_correct) -->
<!--  submitted[idx] = true -->
<!--  if (mode === 'exam' && currentIndex.value < questions.value.length - 1) { -->
<!--    currentIndex.value++ -->
<!--  } -->
<!-- } -->

<!-- async function finishSession() { -->
<!--  if (!sessionId.value) -->
<!--    return -->
<!--  await useRam('POST', '/questions/finish', { body: { session: sessionId.value } }) -->
<!--  examFinished.value = true -->
<!-- } -->

<!-- function confirmFinish() { -->
<!--  if (window.confirm('Вы точно хотите завершить экзамен?')) { -->
<!--    clearInterval(timerInterval) -->
<!--    finishSession() -->
<!--  } -->
<!-- } -->

<!-- function handleClose() { -->
<!--  if (mode === 'exam' && !examFinished.value) { -->
<!--    confirmFinish() -->
<!--  } else { -->
<!--    emit('close') -->
<!--  } -->
<!-- } -->

<!-- function restartExam() { -->
<!--  clearInterval(timerInterval) -->
<!--  fetchQuestions() -->
<!-- } -->

<!-- function goToQuestion(i) { -->
<!--  if (i >= 0 && i < questions.value.length) -->
<!--    currentIndex.value = i -->
<!-- } -->
<!-- function previousQuestion() { -->
<!--  if (currentIndex.value > 0) -->
<!--    currentIndex.value&#45;&#45; -->
<!-- } -->
<!-- function nextQuestion() { -->
<!--  if (currentIndex.value < questions.value.length - 1) -->
<!--    currentIndex.value++ -->
<!-- } -->

<!-- onMounted(fetchQuestions) -->
<!-- onUnmounted(() => clearInterval(timerInterval)) -->
<!-- watch( -->
<!--  () => [mode, filters.certificate, filters.regions.join(','), filters.vessels.join(',')], -->
<!--  fetchQuestions, -->
<!-- ) -->
<!-- </script> -->

<!-- <template> -->
<!--  <div v-if="visible" class="trainer__backdrop"> -->
<!--    <div class="trainer__content" @click.stop> -->
<!--      &lt;!&ndash; Результаты экзамена &ndash;&gt; -->
<!--      <div v-if="mode === 'exam' && examFinished" class="trainer__results"> -->
<!--        <h2 class="trainer__title result-title"> -->
<!--          {{ examPassed ? 'Сдал' : 'Не сдал' }} -->
<!--        </h2> -->
<!--        <p class="result-info"> -->
<!--          Потраченное время – {{ spentMinutes }} мин -->
<!--        </p> -->
<!--        <p class="result-info"> -->
<!--          Неправильных ответов – {{ wrongCountExam }} -->
<!--        </p> -->
<!--        <ul class="trainer__results-list"> -->
<!--          <li v-for="(q, idx) in questions" :key="q.id"> -->
<!--            <details> -->
<!--              <summary -->
<!--                :class="{ -->
<!--                  'result-summary&#45;&#45;correct': correctness[idx], -->
<!--                  'result-summary&#45;&#45;wrong': !correctness[idx], -->
<!--                }" -->
<!--              > -->
<!--                Вопрос {{ idx + 1 }} -->
<!--              </summary> -->
<!--              <p class="question-text"> -->
<!--                {{ q.text }} -->
<!--              </p> -->
<!--              <p><strong>Ваш ответ:</strong> {{ getAnswerLabel(idx) }}</p> -->
<!--              <p -->
<!--                v-if="!correctness[idx]" -->
<!--                class="question-description" -->
<!--                v-html="q.description" -->
<!--              /> -->
<!--            </details> -->
<!--          </li> -->
<!--        </ul> -->
<!--        <div class="trainer__footer-buttons"> -->
<!--          <button class="trainer__button" @click="emit('close')"> -->
<!--            Закрыть -->
<!--          </button> -->
<!--          <button class="trainer__button" @click="restartExam"> -->
<!--            Начать заново -->
<!--          </button> -->
<!--        </div> -->
<!--      </div> -->

<!--      &lt;!&ndash; Экзамен и тренажёр до завершения &ndash;&gt; -->
<!--      <div v-else> -->
<!--        <button class="trainer__close" @click="handleClose"> -->
<!--          × -->
<!--        </button> -->
<!--        <div v-if="timerMessage" class="trainer__timeout"> -->
<!--          {{ timerMessage }} -->
<!--        </div> -->

<!--        <h2 class="trainer__title"> -->
<!--          {{ mode === 'exam' ? 'Экзамен' : 'Тренажёр' }} -->
<!--        </h2> -->
<!--        <div v-if="mode === 'exam'" class="trainer__timer"> -->
<!--          {{ displayTime }} -->
<!--        </div> -->

<!--        <div class="trainer__questions-container"> -->
<!--          <div class="trainer__questions-counter"> -->
<!--            <span -->
<!--              v-for="(_, idx) in questions" -->
<!--              :key="idx" -->
<!--              class="trainer__question-number" -->
<!--              :class="{ -->
<!--                'trainer__question-number&#45;&#45;active': idx === currentIndex, -->
<!--                'trainer__question-number&#45;&#45;answered-exam': mode === 'exam' && submitted[idx] && !examFinished, -->
<!--                'trainer__question-number&#45;&#45;correct': (mode !== 'exam' || examFinished) && submitted[idx] && correctness[idx], -->
<!--                'trainer__question-number&#45;&#45;wrong': (mode !== 'exam' || examFinished) && submitted[idx] && !correctness[idx], -->
<!--              }" -->
<!--              @click="goToQuestion(idx)" -->
<!--            >{{ idx + 1 }}</span> -->
<!--          </div> -->
<!--        </div> -->

<!--        <form @submit.prevent> -->
<!--          <div class="trainer__question-content"> -->
<!--            <img -->
<!--              v-if="currentQuestion.image" -->
<!--              alt="question image" -->
<!--              class="trainer__question-image" -->
<!--              :src="currentQuestion.image" -->
<!--            > -->
<!--            <p v-if="currentQuestion.text" class="trainer__question-text"> -->
<!--              {{ currentQuestion.text }} -->
<!--            </p> -->
<!--          </div> -->

<!--          <ul class="trainer__options-list"> -->
<!--            <li v-for="opt in currentQuestion.options" :key="opt.value"> -->
<!--              <label -->
<!--                class="trainer__option" -->
<!--                :class="{ -->
<!--                  'trainer__option&#45;&#45;selected': answers[currentIndex] === opt.value, -->
<!--                  'trainer__option&#45;&#45;correct': (mode !== 'exam' || examFinished) && submitted[currentIndex] && answers[currentIndex] === opt.value && correctness[currentIndex], -->
<!--                  'trainer__option&#45;&#45;wrong': (mode !== 'exam' || examFinished) && submitted[currentIndex] && answers[currentIndex] === opt.value && !correctness[currentIndex], -->
<!--                }" -->
<!--                @click.prevent="selectAnswer(opt.value)" -->
<!--              > -->
<!--                <img -->
<!--                  v-if="opt.image" -->
<!--                  alt="option image" -->
<!--                  class="trainer__option-image" -->
<!--                  :src="opt.image" -->
<!--                > -->
<!--                <span class="trainer__option-text">{{ opt.label }}</span> -->
<!--              </label> -->
<!--            </li> -->
<!--          </ul> -->

<!--          <div class="trainer__nav-buttons"> -->
<!--            <button -->
<!--              class="trainer__button trainer__button&#45;&#45;nav" -->
<!--              :disabled="currentIndex === 0" -->
<!--              @click="previousQuestion" -->
<!--            > -->
<!--              Предыдущий -->
<!--            </button> -->
<!--            <button -->
<!--              class="trainer__button trainer__button&#45;&#45;submit" -->
<!--              :disabled="buttonLabel === 'Ответить' && (answers[currentIndex] == null || submitted[currentIndex])" -->
<!--              @click="buttonLabel === 'Ответить' ? submitAnswer() : handleClose()" -->
<!--            > -->
<!--              {{ buttonLabel }} -->
<!--            </button> -->
<!--            <button -->
<!--              class="trainer__button trainer__button&#45;&#45;nav" -->
<!--              :disabled="currentIndex === questions.length - 1" -->
<!--              @click="nextQuestion" -->
<!--            > -->
<!--              Следующий -->
<!--            </button> -->
<!--          </div> -->

<!--          <div v-if="mode !== 'exam' && submitted[currentIndex]" class="trainer__feedback"> -->
<!--            <p -->
<!--              class="trainer__feedback-text" -->
<!--              :class="correctness[currentIndex] ? 'trainer__feedback-text&#45;&#45;correct' : 'trainer__feedback-text&#45;&#45;wrong'" -->
<!--            > -->
<!--              {{ correctness[currentIndex] ? 'Правильно!' : '' }} -->
<!--              <span v-if="!correctness[currentIndex]" v-html="currentQuestion.description" /> -->
<!--            </p> -->
<!--          </div> -->
<!--        </form> -->
<!--      </div> -->
<!--    </div> -->
<!--    <div class="trainer__overlay" @click="handleClose" /> -->
<!--  </div> -->
<!-- </template> -->

<!-- <style scoped> -->
<!-- /* Основные стили сохранены */ -->
<!-- .trainer__results-list { list-style: none; padding: 0; margin: 20px 0; } -->
<!-- .result-title { margin-bottom: 10px; } -->
<!-- .result-info { margin: 4px 0; } -->
<!-- .result-summary&#45;&#45;correct { background: #28a745; color: #fff; padding: 5px; border-radius: 4px; } -->
<!-- .result-summary&#45;&#45;wrong { background: #b82132; color: #fff; padding: 5px; border-radius: 4px; } -->
<!-- .trainer__footer-buttons { display: flex; justify-content: space-between; margin-top: 20px; } -->

<!-- /* Существующие стили компонента */ -->
<!-- .trainer__backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; } -->
<!-- .trainer__overlay { position: absolute; inset: 0; } -->
<!-- .trainer__content { background: #f6f6f6; padding: 20px; border-radius: 20px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; text-align: center; position: relative; z-index: 1; } -->
<!-- .trainer__close { position: absolute; top: 12px; right: 12px; background: transparent; border: none; font-size: 24px; cursor: pointer; } -->
<!-- .trainer__timeout { background: #fff3f3; color: #c00; padding: 10px; margin-bottom: 10px; border-radius: 6px; font-weight: bold; } -->
<!-- .trainer__title { font-family: 'Merriweather', serif; font-size: 30px; margin: 0 0 10px; text-transform: uppercase; } -->
<!-- .trainer__timer { margin-bottom: 20px; font-family: 'Martian Mono', serif; font-size: 20px; } -->
<!-- .trainer__questions-counter { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 20px; } -->
<!-- .trainer__question-number { width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border: 2px solid #3b6790; font-weight: bold; color: #3b6790; cursor: pointer; border-radius: 4px; transition: background-color .2s, color .2s; } -->
<!-- .trainer__question-number&#45;&#45;active { background: #3b6790; color: #fff; border-color: #3b6790; } -->
<!-- .trainer__question-number&#45;&#45;answered-exam { background: #3b6790; border-color: #3b6790; color: #fff; } -->
<!-- .trainer__question-number&#45;&#45;correct { background: #28a745; border-color: #28a745; color: #fff; } -->
<!-- .trainer__question-number&#45;&#45;wrong { background: #b82132; border-color: #b82132; color: #fff; } -->
<!-- .trainer__question-content { margin-bottom: 16px; } -->
<!-- .trainer__question-image { max-width: 300px; max-height: 200px; object-fit: contain; margin-bottom: 12px; } -->
<!-- .trainer__question-text { font-family: 'Martian Mono', serif; font-size: 18px; margin: 0; } -->
<!-- .trainer__options-list { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; list-style: none; padding: 0; margin: 0; } -->
<!-- .trainer__option { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80px; padding: 10px; border: 2px solid black; border-radius: 4px; cursor: pointer; transition: background-color .3s, box-shadow .3s; } -->
<!-- .trainer__option:hover { background: #e6f0ff; } -->
<!-- .trainer__option&#45;&#45;selected { border-color: #3b6790; box-shadow: 0 0 0 2px #3b6790; } -->
<!-- .trainer__option&#45;&#45;correct { border-color: #28a745; box-shadow: 0 0 0 2px #28a745; } -->
<!-- .trainer__option&#45;&#45;wrong { border-color: #b82132; box-shadow: 0 0 0 2px #b82132; } -->
<!-- .trainer__option-image { width: 100px; height: 100px; object-fit: contain; margin-bottom: 8px; } -->
<!-- .trainer__option-text { font-family: 'Martian Mono', serif; font-size: 14px; } -->
<!-- .trainer__feedback { margin-top: 16px; } -->
<!-- .trainer__feedback-text { font-family: 'Martian Mono', serif; font-size: 16px; font-weight: bold; } -->
<!-- .trainer__feedback-text&#45;&#45;correct { color: #28a745; } -->
<!-- .trainer__feedback-text&#45;&#45;wrong { color: #dc3545; } -->
<!-- .trainer__nav-buttons { display: flex; justify-content: center; gap: 10px; margin-top: 20px; } -->
<!-- .trainer__button { padding: 12px 20px; font-size: 16px; border: none; cursor: pointer; border-radius: 4px; transition: background-color .3s; } -->
<!-- .trainer__button&#45;&#45;nav { background: #3b6790; color: #fff; } -->
<!-- .trainer__button&#45;&#45;nav:disabled { background: #ccc; cursor: default; } -->
<!-- .trainer__button&#45;&#45;nav:not(:disabled):hover { background: #264562; } -->
<!-- .trainer__button&#45;&#45;submit { background: #3b6790; color: #fff; } -->
<!-- .trainer__button&#45;&#45;submit:disabled { background: #ccc; cursor: default; } -->
<!-- .trainer__button&#45;&#45;submit:hover:not(:disabled) { background: #264562; } -->
<!-- @media (max-width:768px) { -->
<!--  .trainer__options-list { grid-template-columns: 1fr; } -->
<!-- } -->
<!-- </style> -->

<!-- 4 version -->
<!-- <script setup lang="js"> -->
<!-- import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue' -->
<!-- import { useRam } from '~/services' -->

<!-- // Props & Emits -->
<!-- const { visible, mode, filters } = defineProps({ visible: Boolean, mode: String, filters: Object }) -->
<!-- const emit = defineEmits(['close']) -->

<!-- // State -->
<!-- const questions = ref([]) -->
<!-- const answers = reactive([]) -->
<!-- const correctness = reactive([]) -->
<!-- const submitted = reactive([]) -->
<!-- const currentIndex = ref(0) -->
<!-- const sessionId = ref(null) -->
<!-- const timerMessage = ref('') -->
<!-- const examFinished = ref(false) -->
<!-- const wrongLimit = filters.wrongLimit ?? 0 -->

<!-- // Timing -->
<!-- const examDuration = ref(0) -->
<!-- const timeLeft = ref(0) -->
<!-- let timerInterval = null -->

<!-- // Computed -->
<!-- const wrongCountExam = computed(() => -->
<!--  correctness.reduce((sum, c, i) => sum + (submitted[i] && !c ? 1 : 0), 0), -->
<!-- ) -->
<!-- const allAnswered = computed(() => submitted.length > 0 && submitted.every(v => v)) -->
<!-- const examPassed = computed(() => allAnswered.value && wrongCountExam.value <= wrongLimit) -->
<!-- const spentMinutes = computed(() => Math.ceil((examDuration.value - timeLeft.value) / 60)) -->
<!-- const buttonLabel = computed(() => { -->
<!--  if (mode === 'exam') { -->
<!--    if (!allAnswered.value) -->
<!--      return 'Ответить' -->
<!--    if (!examFinished.value) -->
<!--      return 'Завершить' -->
<!--    return 'Закрыть' -->
<!--  } -->
<!--  return allAnswered.value ? 'Закрыть' : 'Ответить' -->
<!-- }) -->
<!-- const displayTime = computed(() => { -->
<!--  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0') -->
<!--  const s = String(timeLeft.value % 60).padStart(2, '0') -->
<!--  return `${m} : ${s}` -->
<!-- }) -->
<!-- const currentQuestion = computed(() => questions.value[currentIndex.value] || {}) -->

<!-- // Helpers -->
<!-- function getAnswerLabel(idx) { -->
<!--  const q = questions.value[idx] -->
<!--  const opt = q.options.find(o => o.value === answers[idx]) -->
<!--  return opt ? opt.label : '' -->
<!-- } -->

<!-- // Fetch & normalize -->
<!-- function normalizeQuestions(payload) { -->
<!--  const list = [ -->
<!--    payload.questions, -->
<!--    payload.data?.questions, -->
<!--    Array.isArray(payload.data) && payload.data, -->
<!--    Array.isArray(payload) && payload, -->
<!--  ].find(Array.isArray) -->
<!--  if (!list) -->
<!--    return [] -->
<!--  return list.map((item) => { -->
<!--    const src = item.attributes || item -->
<!--    return { -->
<!--      id: src.id || item.id, -->
<!--      text: src.text, -->
<!--      image: src.image, -->
<!--      description: src.description || '', -->
<!--      options: (src.answers || []).map(a => ({ label: a.text, value: a.id, image: a.image })), -->
<!--    } -->
<!--  }) -->
<!-- } -->

<!-- async function fetchQuestions() { -->
<!--  examFinished.value = false -->
<!--  timerMessage.value = '' -->
<!--  const body = { certificate: filters.certificate, regions: filters.regions, vessels: filters.vessels } -->
<!--  const endpoint = mode === 'exam' ? '/questions/exam' : '/questions/quiz' -->
<!--  const res = await useRam('POST', endpoint, { body }) -->
<!--  if (!res?.data) -->
<!--    return -->
<!--  const raw = res.data.data ?? res.data -->
<!--  if (raw.session) { -->
<!--    sessionId.value = raw.session -->
<!--    if (mode === 'exam') { -->
<!--      await useRam('POST', '/questions/launch', { body: { session: sessionId.value } }) -->
<!--      if (raw.timeLimit != null) { -->
<!--        examDuration.value = raw.timeLimit * 60 -->
<!--        startLocalTimer() -->
<!--      } -->
<!--    } -->
<!--  } -->
<!--  questions.value = normalizeQuestions(raw) -->
<!--  answers.splice(0, answers.length, ...Array.from({ length: questions.value.length }).fill(null)) -->
<!--  correctness.splice(0, correctness.length, ...Array.from({ length: questions.value.length }).fill(null)) -->
<!--  submitted.splice(0, submitted.length, ...Array.from({ length: questions.value.length }).fill(false)) -->
<!--  currentIndex.value = 0 -->
<!-- } -->

<!-- // Timer -->
<!-- function startLocalTimer() { -->
<!--  clearInterval(timerInterval) -->
<!--  timeLeft.value = examDuration.value -->
<!--  timerInterval = setInterval(() => { -->
<!--    if (timeLeft.value > 0) { timeLeft.value&#45;&#45; -->
<!--    } -->
<!--    else { -->
<!--      clearInterval(timerInterval) -->
<!--      timerMessage.value = 'Время вышло' -->
<!--      finishSession() -->
<!--    } -->
<!--  }, 1000) -->
<!-- } -->

<!-- // Actions -->
<!-- function selectAnswer(val) { -->
<!--  if (mode === 'exam' && examFinished.value) -->
<!--    return -->
<!--  answers[currentIndex.value] = val -->
<!-- } -->

<!-- async function submitAnswer() { -->
<!--  if ((mode === 'exam' && examFinished.value) || buttonLabel.value !== 'Ответить') -->
<!--    return -->
<!--  const idx = currentIndex.value -->
<!--  if (answers[idx] == null || submitted[idx]) -->
<!--    return -->
<!--  const res = await useRam('POST', '/questions/answer', { -->
<!--    body: { -->
<!--      session: sessionId.value, -->
<!--      question: currentQuestion.value.id, -->
<!--      answer: answers[idx], -->
<!--    }, -->
<!--  }) -->
<!--  correctness[idx] = Boolean(res.data.data?.is_correct ?? res.data.is_correct) -->
<!--  submitted[idx] = true -->
<!--  if (mode === 'exam' && currentIndex.value < questions.value.length - 1) { -->
<!--    currentIndex.value++ -->
<!--  } -->
<!-- } -->

<!-- async function finishSession() { -->
<!--  if (!sessionId.value) -->
<!--    return -->
<!--  await useRam('POST', '/questions/finish', {	body: { session: sessionId.value } }) -->
<!--  examFinished.value = true -->
<!-- } -->

<!-- function confirmFinish() { -->
<!--  if (window.confirm('Вы точно хотите завершить экзамен?')) { -->
<!--    clearInterval(timerInterval) -->
<!--    finishSession() -->
<!--  } -->
<!-- } -->

<!-- function handleClose() { -->
<!--  if (mode === 'exam' && !examFinished.value) { -->
<!--    confirmFinish() -->
<!--  } else { -->
<!--    emit('close') -->
<!--  } -->
<!-- } -->

<!-- function restartExam() { -->
<!--  clearInterval(timerInterval) -->
<!--  fetchQuestions() -->
<!-- } -->

<!-- function goToQuestion(i) { -->
<!--  if (i >= 0 && i < questions.value.length) -->
<!--    currentIndex.value = i -->
<!-- } -->
<!-- function previousQuestion() { -->
<!--  if (currentIndex.value > 0) -->
<!--    currentIndex.value&#45;&#45; -->
<!-- } -->
<!-- function nextQuestion() { -->
<!--  if (currentIndex.value < questions.value.length - 1) -->
<!--    currentIndex.value++ -->
<!-- } -->

<!-- onMounted(fetchQuestions) -->
<!-- onUnmounted(() => clearInterval(timerInterval)) -->
<!-- watch( -->
<!--  () => [mode, filters.certificate, filters.regions.join(','), filters.vessels.join(',')], -->
<!--  fetchQuestions, -->
<!-- ) -->
<!-- </script> -->

<!-- <template> -->
<!--  <div v-if="visible" class="trainer__backdrop"> -->
<!--    <div class="trainer__content" @click.stop> -->
<!--      &lt;!&ndash; Результаты экзамена &ndash;&gt; -->
<!--      <div v-if="mode === 'exam' && examFinished" class="trainer__results"> -->
<!--        <h2 class="trainer__title result-title"> -->
<!--          {{ examPassed ? 'Сдал' : 'Не сдал' }} -->
<!--        </h2> -->
<!--        <p class="result-info"> -->
<!--          Потраченное время – {{ spentMinutes }} мин -->
<!--        </p> -->
<!--        <p class="result-info"> -->
<!--          Неправильных ответов – {{ wrongCountExam }} -->
<!--        </p> -->
<!--        <ul class="trainer__results-list"> -->
<!--          <li v-for="(q, idx) in questions" :key="q.id"> -->
<!--            <details> -->
<!--              <summary -->
<!--                :class="{ -->
<!--                  'result-summary&#45;&#45;correct': correctness[idx], -->
<!--                  'result-summary&#45;&#45;wrong': !correctness[idx], -->
<!--                }" -->
<!--              > -->
<!--                Вопрос {{ idx + 1 }} -->
<!--              </summary> -->
<!--              <p class="question-text"> -->
<!--                {{ q.text }} -->
<!--              </p> -->
<!--              <p><strong>Ваш ответ:</strong> {{ getAnswerLabel(idx) }}</p> -->
<!--              <p -->
<!--                v-if="!correctness[idx]" -->
<!--                class="question-description" -->
<!--                v-html="q.description" -->
<!--              /> -->
<!--            </details> -->
<!--          </li> -->
<!--        </ul> -->
<!--        <div class="trainer__footer-buttons"> -->
<!--          <button class="trainer__button" @click="emit('close')"> -->
<!--            Закрыть -->
<!--          </button> -->
<!--          <button class="trainer__button" @click="restartExam"> -->
<!--            Начать заново -->
<!--          </button> -->
<!--        </div> -->
<!--      </div> -->

<!--      &lt;!&ndash; Экзамен и тренажёр до завершения &ndash;&gt; -->
<!--      <div v-else> -->
<!--        <button class="trainer__close" @click="handleClose"> -->
<!--          × -->
<!--        </button> -->
<!--        <div v-if="timerMessage" class="trainer__timeout"> -->
<!--          {{ timerMessage }} -->
<!--        </div> -->

<!--        <h2 class="trainer__title"> -->
<!--          {{ mode === 'exam' ? 'Экзамен' : 'Тренажёр' }} -->
<!--        </h2> -->
<!--        <div v-if="mode === 'exam'" class="trainer__timer"> -->
<!--          {{ displayTime }} -->
<!--        </div> -->

<!--        <div class="trainer__questions-container"> -->
<!--          <div class="trainer__questions-counter"> -->
<!--            <span -->
<!--              v-for="(_, idx) in questions" -->
<!--              :key="idx" -->
<!--              class="trainer__question-number" -->
<!--              :class="{ -->
<!--                'trainer__question-number&#45;&#45;active': idx === currentIndex, -->
<!--                'trainer__question-number&#45;&#45;answered-exam': mode === 'exam' && submitted[idx] && !examFinished, -->
<!--                'trainer__question-number&#45;&#45;correct': (mode !== 'exam' || examFinished) && submitted[idx] && correctness[idx], -->
<!--                'trainer__question-number&#45;&#45;wrong': (mode !== 'exam' || examFinished) && submitted[idx] && !correctness[idx], -->
<!--              }" -->
<!--              @click="goToQuestion(idx)" -->
<!--            >{{ idx + 1 }}</span> -->
<!--          </div> -->
<!--        </div> -->

<!--        <form @submit.prevent> -->
<!--          <div class="trainer__question-content"> -->
<!--            <img -->
<!--              v-if="currentQuestion.image" -->
<!--              alt="question image" -->
<!--              class="trainer__question-image" -->
<!--              :src="currentQuestion.image" -->
<!--            > -->
<!--            <p v-if="currentQuestion.text" class="trainer__question-text"> -->
<!--              {{ currentQuestion.text }} -->
<!--            </p> -->
<!--          </div> -->

<!--          <ul class="trainer__options-list"> -->
<!--            <li v-for="opt in currentQuestion.options" :key="opt.value"> -->
<!--              <label -->
<!--                class="trainer__option" -->
<!--                :class="{ -->
<!--                  'trainer__option&#45;&#45;selected': answers[currentIndex] === opt.value, -->
<!--                  'trainer__option&#45;&#45;correct': (mode !== 'exam' || examFinished) && submitted[currentIndex] && answers[currentIndex] === opt.value && correctness[currentIndex], -->
<!--                  'trainer__option&#45;&#45;wrong': (mode !== 'exam' || examFinished) && submitted[currentIndex] && answers[currentIndex] === opt.value && !correctness[currentIndex], -->
<!--                }" -->
<!--                @click.prevent="selectAnswer(opt.value)" -->
<!--              > -->
<!--                <img -->
<!--                  v-if="opt.image" -->
<!--                  alt="option image" -->
<!--                  class="trainer__option-image" -->
<!--                  :src="opt.image" -->
<!--                > -->
<!--                <span class="trainer__option-text">{{ opt.label }}</span> -->
<!--              </label> -->
<!--            </li> -->
<!--          </ul> -->

<!--          <div class="trainer__nav-buttons"> -->
<!--            <button -->
<!--              class="trainer__button trainer__button&#45;&#45;nav" -->
<!--              :disabled="currentIndex === 0" -->
<!--              @click="previousQuestion" -->
<!--            > -->
<!--              Предыдущий -->
<!--            </button> -->
<!--            <button -->
<!--              class="trainer__button trainer__button&#45;&#45;submit" -->
<!--              :disabled="buttonLabel === 'Ответить' && (answers[currentIndex] == null || submitted[currentIndex])" -->
<!--              @click="buttonLabel === 'Ответить' ? submitAnswer() : handleClose()" -->
<!--            > -->
<!--              {{ buttonLabel }} -->
<!--            </button> -->
<!--            <button -->
<!--              class="trainer__button trainer__button&#45;&#45;nav" -->
<!--              :disabled="currentIndex === questions.length - 1" -->
<!--              @click="nextQuestion" -->
<!--            > -->
<!--              Следующий -->
<!--            </button> -->
<!--          </div> -->

<!--          <div v-if="mode !== 'exam' && submitted[currentIndex]" class="trainer__feedback"> -->
<!--            <p -->
<!--              class="trainer__feedback-text" -->
<!--              :class="correctness[currentIndex] ? 'trainer__feedback-text&#45;&#45;correct' : 'trainer__feedback-text&#45;&#45;wrong'" -->
<!--            > -->
<!--              {{ correctness[currentIndex] ? 'Правильно!' : '' }} -->
<!--              <span v-if="!correctness[currentIndex]" v-html="currentQuestion.description" /> -->
<!--            </p> -->
<!--          </div> -->
<!--        </form> -->
<!--      </div> -->
<!--    </div> -->
<!--    <div class="trainer__overlay" @click="handleClose" /> -->
<!--  </div> -->
<!-- </template> -->

<!-- <style scoped> -->
<!-- /* Отступ между вопросами в списке результатов */ -->
<!-- .trainer__results-list li { margin-bottom: 20px; } -->

<!-- /* Бордер и выравнивание заголовков вопросов */ -->
<!-- .result-summary&#45;&#45;correct, -->
<!-- .result-summary&#45;&#45;wrong { -->
<!--  border: 2px solid; -->
<!--  color: inherit; -->
<!--  background: none; -->
<!--  padding: 8px; -->
<!--  border-radius: 4px; -->
<!--  font-weight: bold; -->
<!--  text-align: left; -->
<!-- } -->
<!-- .result-summary&#45;&#45;correct { border-color: #28a745; color: #28a745; } -->
<!-- .result-summary&#45;&#45;wrong   { border-color: #b82132; color: #b82132; } -->

<!-- /* Основные стили сохранены */ -->
<!-- .trainer__results-list { list-style: none; padding: 0; margin: 20px 0; } -->
<!-- .result-title { margin-bottom: 10px; } -->
<!-- .result-info { margin: 4px 0; } -->
<!-- .trainer__footer-buttons { display: flex; justify-content: space-between; margin-top: 20px; } -->

<!-- .trainer__backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; } -->
<!-- .trainer__overlay { position: absolute; inset: 0; } -->
<!-- .trainer__content { background: #f6f6f6; padding: 20px; border-radius: 20px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; text-align: center; position: relative; z-index: 1; } -->
<!-- .trainer__close { position: absolute; top: 12px; right: 12px; background: transparent; border: none; font-size: 24px; cursor: pointer; } -->
<!-- .trainer__timeout { background: #fff3f3; color: #c00; padding: 10px; margin-bottom: 10px; border-radius: 6px; font-weight: bold; } -->
<!-- .trainer__title { font-family: 'Merriweather', serif; font-size: 30px; margin: 0 0 10px; text-transform: uppercase; } -->
<!-- .trainer__timer { margin-bottom: 20px; font-family: 'Martian Mono', serif; font-size: 20px; } -->
<!-- .trainer__questions-counter { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 20px; } -->
<!-- .trainer__question-number { width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border: 2px solid #3b6790; font-weight: bold; color: #3b6790; cursor: pointer; border-radius: 4px; transition: background-color .2s, color .2s; } -->
<!-- .trainer__question-number&#45;&#45;active { background: #3b6790; color: #fff; border-color: #3b6790; } -->
<!-- .trainer__question-number&#45;&#45;answered-exam { background: #3b6790; border-color: #3b6790; color: #fff; } -->
<!-- .trainer__question-number&#45;&#45;correct { background: #28a745; border-color: #28a745; color: #fff; } -->
<!-- .trainer__question-number&#45;&#45;wrong { background: #b82132; border-color: #b82132; color: #fff; } -->
<!-- .trainer__question-content { margin-bottom: 16px; } -->
<!-- .trainer__question-image { max-width: 300px; max-height: 200px; object-fit: contain; margin-bottom: 12px; } -->
<!-- .trainer__question-text { font-family: 'Martian Mono', serif; font-size: 18px; margin: 0; } -->
<!-- .trainer__options-list { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; list-style: none; padding: 0; margin: 0; } -->
<!-- .trainer__option { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80px; padding: 10px; border: 2px solid black; border-radius: 4px; cursor: pointer; transition: background-color .3s, box-shadow .3s; } -->
<!-- .trainer__option:hover { background: #e6f0ff; } -->
<!-- .trainer__option&#45;&#45;selected { border-color: #3b6790; box-shadow: 0 0 0 2px #3b6790; } -->
<!-- .trainer__option&#45;&#45;correct { border-color: #28a745; box-shadow: 0 0 0 2px #28a745; } -->
<!-- .trainer__option&#45;&#45;wrong { border-color: #b82132; box-shadow: 0 0 0 2px #b82132; } -->
<!-- .trainer__option-image { width: 100px; height: 100px; object-fit: contain; margin-bottom: 8px; } -->
<!-- .trainer__option-text { font-family: 'Martian Mono', serif; font-size: 14px; } -->
<!-- .trainer__feedback { margin-top: 16px; } -->
<!-- .trainer__feedback-text { font-family: 'Martian Mono', serif; font-size: 16px; font-weight: bold; } -->
<!-- .trainer__feedback-text&#45;&#45;correct { color: #28a745; } -->
<!-- .trainer__feedback-text&#45;&#45;wrong { color: #dc3545; } -->
<!-- .trainer__nav-buttons { display: flex; justify-content: center; gap: 10px; margin-top: 20px; } -->
<!-- .trainer__button { padding: 12px 20px; font-size: 16px; border: none; cursor: pointer; border-radius: 4px; transition: background-color .3s; } -->
<!-- .trainer__button&#45;&#45;nav { background: #3b6790; color: #fff; } -->
<!-- .trainer__button&#45;&#45;nav:disabled { background: #ccc; cursor: default; } -->
<!-- .trainer__button&#45;&#45;nav:not(:disabled):hover { background: #264562; } -->
<!-- .trainer__button&#45;&#45;submit { background: #3b6790; color: #fff; } -->
<!-- .trainer__button&#45;&#45;submit:disabled { background: #ccc; cursor: default; } -->
<!-- .trainer__button&#45;&#45;submit:hover:not(:disabled) { background: #264562; } -->
<!-- @media (max-width:768px) { -->
<!--  .trainer__options-list { grid-template-columns: 1fr; } -->
<!-- } -->
<!-- </style> -->

<script setup lang="js">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRam } from '~/services'

// Props & Emits
const { visible, mode, filters } = defineProps({
  visible: Boolean,
  mode: String,
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

// Timing
const examDuration = ref(0)
const timeLeft = ref(0)
let timerInterval = null

// Computed
const wrongCountExam = computed(() =>
  correctness.reduce((sum, c, i) =>
    sum + (submitted[i] && !c ? 1 : 0), 0),
)

const allAnswered = computed(() =>
  submitted.length > 0 && submitted.every(v => v),
)

const examPassed = computed(() =>
  allAnswered.value && wrongCountExam.value <= wrongLimit,
)

const spentMinutes = computed(() =>
  Math.ceil((examDuration.value - timeLeft.value) / 60),
)

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

const displayTime = computed(() => {
  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0')
  const s = String(timeLeft.value % 60).padStart(2, '0')
  return `${m} : ${s}`
})

const currentQuestion = computed(() =>
  questions.value[currentIndex.value] || {},
)

// Helpers
function getAnswerLabel(idx) {
  const q = questions.value[idx]
  const opt = q.options.find(o => o.value === answers[idx])
  return opt ? opt.label : ''
}

// Normalize incoming payload into our questions array
function normalizeQuestions(payload) {
  const list = [
    payload.questions,
    payload.data?.questions,
    Array.isArray(payload.data) && payload.data,
    Array.isArray(payload) && payload,
  ].find(Array.isArray)

  return (list || []).map((item) => {
    const src = item.attributes || item
    return {
      id: src.id || item.id,
      text: src.text,
      image: src.image,
      description: src.description || '',
      options: (src.answers || []).map(a => ({
        label: a.text,
        value: a.id,
        image: a.image,
      })),
    }
  })
}

// Fetch questions on mount or when filters change
async function fetchQuestions() {
  examFinished.value = false
  timerMessage.value = ''

  const body = { certificate: filters.certificate, regions: filters.regions, vessels: filters.vessels }
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

  questions.value = normalizeQuestions(raw)
  answers.splice(0, answers.length, ...Array.from({ length: questions.value.length }).fill(null))
  correctness.splice(0, correctness.length, ...Array.from({ length: questions.value.length }).fill(null))
  submitted.splice(0, submitted.length, ...Array.from({ length: questions.value.length }).fill(false))
  currentIndex.value = 0
}

// Timer logic
function startLocalTimer() {
  clearInterval(timerInterval)
  timeLeft.value = examDuration.value

  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
      timerMessage.value = 'Время вышло'
      finishSession()
    }
  }, 1000)
}

// User actions
function selectAnswer(val) {
  if (mode === 'exam' && examFinished.value)
    return
  answers[currentIndex.value] = val
}

async function submitAnswer() {
  if ((mode === 'exam' && examFinished.value) || buttonLabel.value !== 'Ответить')
    return

  const idx = currentIndex.value
  if (answers[idx] == null || submitted[idx])
    return

  const res = await useRam('POST', '/questions/answer', {
    body: {
      session: sessionId.value,
      question: currentQuestion.value.id,
      answer: answers[idx],
    },
  })

  correctness[idx] = Boolean(res.data.data?.is_correct ?? res.data.is_correct)
  submitted[idx] = true

  if (mode === 'exam' && currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
  }
}

async function finishSession() {
  if (!sessionId.value)
    return

  const res = await useRam('POST', '/questions/finish', {
    body: { session: sessionId.value },
  })

  const raw = res.data?.data ?? res.data
  const results = Array.isArray(raw.questions) ? raw.questions : []

  results.forEach(({ id: questionId, answer }) => {
    const idx = questions.value.findIndex(q => q.id === questionId)
    if (idx !== -1) {
      answers[idx] = answer.id
      correctness[idx] = Boolean(answer.is_correct)
      submitted[idx] = true
    }
  })

  examFinished.value = true
}

function confirmFinish() {
  if (window.confirm('Вы точно хотите завершить экзамен?')) {
    clearInterval(timerInterval)
    finishSession()
  }
}

function handleClose() {
  if (mode === 'exam' && !examFinished.value) {
    confirmFinish()
  } else {
    emit('close')
  }
}

function restartExam() {
  clearInterval(timerInterval)
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
  if (currentIndex.value < questions.value.length - 1)
    currentIndex.value++
}

onMounted(fetchQuestions)
onUnmounted(() => clearInterval(timerInterval))
watch(
  () => [mode, filters.certificate, filters.regions.join(','), filters.vessels.join(',')],
  fetchQuestions,
)
</script>

<template>
  <div v-if="visible" class="trainer__backdrop">
    <div class="trainer__content" @click.stop>
      <!-- Результаты экзамена -->
      <div v-if="mode === 'exam' && examFinished" class="trainer__results">
        <h2 class="trainer__title result-title">
          {{ examPassed ? 'Сдал' : 'Не сдал' }}
        </h2>
        <p class="result-info">
          Потраченное время – {{ spentMinutes }} мин
        </p>
        <p class="result-info">
          Неправильных ответов – {{ wrongCountExam }}
        </p>
        <ul class="trainer__results-list">
          <li v-for="(q, idx) in questions" :key="q.id">
            <details>
              <summary
                :class="{
                  'result-summary--correct': correctness[idx],
                  'result-summary--wrong': !correctness[idx],
                }"
              >
                Вопрос {{ idx + 1 }}
              </summary>
              <p class="question-text">
                {{ q.text }}
              </p>
              <p><strong>Ваш ответ:</strong> {{ getAnswerLabel(idx) }}</p>
              <p
                v-if="!correctness[idx]"
                class="question-description"
                v-html="q.description"
              />
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
                'trainer__question-number--correct': (mode !== 'exam' || examFinished) && submitted[idx] && correctness[idx],
                'trainer__question-number--wrong': (mode !== 'exam' || examFinished) && submitted[idx] && !correctness[idx],
              }"
              @click="goToQuestion(idx)"
            >
              {{ idx + 1 }}
            </span>
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
                  'trainer__option--correct': (mode !== 'exam' || examFinished) && submitted[currentIndex] && answers[currentIndex] === opt.value && correctness[currentIndex],
                  'trainer__option--wrong': (mode !== 'exam' || examFinished) && submitted[currentIndex] && answers[currentIndex] === opt.value && !correctness[currentIndex],
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
            <button
              class="trainer__button trainer__button--nav"
              :disabled="currentIndex === 0"
              @click="previousQuestion"
            >
              Предыдущий
            </button>
            <button
              class="trainer__button trainer__button--submit"
              :disabled="buttonLabel === 'Ответить' && (answers[currentIndex] == null || submitted[currentIndex])"
              @click="buttonLabel === 'Ответить' ? submitAnswer() : handleClose()"
            >
              {{ buttonLabel }}
            </button>
            <button
              class="trainer__button trainer__button--nav"
              :disabled="currentIndex === questions.length - 1"
              @click="nextQuestion"
            >
              Следующий
            </button>
          </div>

          <div v-if="mode !== 'exam' && submitted[currentIndex]" class="trainer__feedback">
            <p
              class="trainer__feedback-text"
              :class="correctness[currentIndex] ? 'trainer__feedback-text--correct' : 'trainer__feedback-text--wrong'"
            >
              {{ correctness[currentIndex] ? 'Правильно!' : '' }}
              <span v-if="!correctness[currentIndex]" v-html="currentQuestion.description" />
            </p>
          </div>
        </form>
      </div>
    </div>
    <div class="trainer__overlay" @click="handleClose" />
  </div>
</template>

<style scoped>
/* Отступ между вопросами в списке результатов */
.trainer__results-list li {
  margin-bottom: 20px;
}

.trainer__footer-buttons {
  justify-content: space-between;
  display: flex;
}

.trainer__results-list {
  list-style: none;
  padding: 0;
}

/* Бордер и выравнивание заголовков вопросов */
.result-summary--correct,
.result-summary--wrong {
  border: 2px solid;
  background: none;
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
  text-align: left;
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
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
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
  z-index: 1;
  background: #f6f6f6;
  padding: 20px 30px;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  text-align: center;
}

.trainer__close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 24px;
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
  font-family: 'Merriweather', serif;
  font-size: 30px;
  margin: 0 0 10px;
  text-transform: uppercase;
}

.trainer__timer {
  margin-bottom: 20px;
  font-family: 'Martian Mono', serif;
  font-size: 20px;
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
  transition: background-color 0.2s, color 0.2s;
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
  margin-bottom: 16px;
}

.trainer__question-image {
  max-width: 300px;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 12px;
}

.trainer__question-text {
  font-family: 'Martian Mono', serif;
  font-size: 18px;
  margin: 0;
}

.trainer__options-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.trainer__option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
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

.trainer__nav-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.trainer__button {
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  background: #3b6790;
  color: #fff;
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

@media (max-width: 768px) {
  .trainer__options-list {
    grid-template-columns: 1fr;
  }
}
</style>
