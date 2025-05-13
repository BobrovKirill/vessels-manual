<!-- <script setup lang="ts"> -->
<!-- import { computed, ref } from 'vue' -->
<!-- import { -->
<!--  regionOptions, -->
<!--  rightsOptions, -->
<!--  vesselOptions, -->
<!-- } from '~/components/QuizzesForm/index' -->

<!-- const haveRights = ref('no') -->
<!-- const regionType = ref<string[]>([]) -->
<!-- const vesselType = ref<string[]>([]) -->

<!-- const showModal = ref(false) -->
<!-- const modalTitle = ref('') -->

<!-- function onSubmit() { -->
<!--  modalTitle.value = 'Подтвердите сдачу экзамена' -->
<!--  showModal.value = true -->
<!-- } -->

<!-- function onTrainer() { -->
<!--  modalTitle.value = 'Запустить тренажер' -->
<!--  showModal.value = true -->
<!-- } -->

<!-- const isFormValid = computed(() => -->
<!--  regionType.value.length > 0 -->
<!--  && vesselType.value.length > 0, -->
<!-- ) -->
<!-- </script> -->

<!-- <template> -->
<!--  <form class="form" @submit.prevent="onSubmit"> -->
<!--    &lt;!&ndash; 1. Права &ndash;&gt; -->
<!--    <fieldset class="form__part1"> -->
<!--      <legend class="form__part-title"> -->
<!--        Есть ли у вас права -->
<!--      </legend> -->
<!--      <label -->
<!--        v-for="opt in rightsOptions" -->
<!--        :key="opt.value" -->
<!--        class="form__part1-btn form__part-btn" -->
<!--      > -->
<!--        <input -->
<!--          v-model="haveRights" -->
<!--          class="form__input-hidden" -->
<!--          type="radio" -->
<!--          :value="opt.value" -->
<!--        > -->
<!--        <span class="form__part1-descr">{{ opt.label }}</span> -->
<!--      </label> -->
<!--    </fieldset> -->

<!--    &lt;!&ndash; 2. Регион &ndash;&gt; -->
<!--    <fieldset class="form__part2"> -->
<!--      <legend class="form__part-title"> -->
<!--        Выберите тип региона -->
<!--      </legend> -->
<!--      <label -->
<!--        v-for="opt in regionOptions" -->
<!--        :key="opt.value" -->
<!--        class="form__part2-btn form__part-btn" -->
<!--        :data-abbr="opt.abbr" -->
<!--      > -->
<!--        <input -->
<!--          v-model="regionType" -->
<!--          class="form__input-hidden" -->
<!--          name="regionType" -->
<!--          type="checkbox" -->
<!--          :value="opt.value" -->
<!--        > -->
<!--        <span class="form__part2-descr">{{ opt.label }}</span> -->
<!--      </label> -->
<!--    </fieldset> -->

<!--    &lt;!&ndash; 3. Судно &ndash;&gt; -->
<!--    <fieldset class="form__part3"> -->
<!--      <legend class="form__part-title"> -->
<!--        Выберите тип судна -->
<!--      </legend> -->
<!--      <label -->
<!--        v-for="opt in vesselOptions" -->
<!--        :key="opt.value" -->
<!--        class="form__part3-btn form__part-btn" -->
<!--      > -->
<!--        <input -->
<!--          v-model="vesselType" -->
<!--          class="form__input-hidden" -->
<!--          type="checkbox" -->
<!--          :value="opt.value" -->
<!--        > -->
<!--        <svg-icon -->
<!--          class="form__part3-icon" -->
<!--          :name="opt.icon" -->
<!--        /> -->
<!--        <span class="form__part3-descr">{{ opt.label }}</span> -->
<!--      </label> -->
<!--    </fieldset> -->

<!--    &lt;!&ndash; Кнопки &ndash;&gt; -->
<!--    <div class="form__buttons"> -->
<!--      <button -->
<!--        class="form__button" -->
<!--        :disabled="!isFormValid" -->
<!--        type="submit" -->
<!--      > -->
<!--        Экзамен -->
<!--      </button> -->
<!--      <button -->
<!--        class="form__button" -->
<!--        :disabled="!isFormValid" -->
<!--        type="button" -->
<!--        @click="onTrainer" -->
<!--      > -->
<!--        Тренажер -->
<!--      </button> -->
<!--    </div> -->
<!--  </form> -->

<!--  &lt;!&ndash; Попап (модальное окно) &ndash;&gt; -->
<!-- </template> -->

<!-- <style scoped lang="scss"> -->
<!-- .form__input-hidden { -->
<!--  position: absolute; -->
<!--  opacity: 0; -->
<!--  width: 0; -->
<!--  height: 0; -->
<!-- } -->

<!-- .form__part-btn { -->
<!--  position: relative; -->
<!--  display: inline-block; -->
<!--  margin-right: 20px; -->
<!--  width: 140px; -->
<!--  height: 90px; -->
<!--  border: 2px solid #b82132; -->
<!--  color: #b82132; -->
<!--  cursor: pointer; -->
<!--  overflow: hidden; -->
<!--  user-select: none; -->
<!--  transition: background 0.3s, color 0.3s, border-color 0.3s; -->
<!-- } -->

<!-- /* Описание внутри кнопки (разное для каждой части) */ -->
<!-- .form__part1-descr, -->
<!-- .form__part2-descr, -->
<!-- .form__part3-descr { -->
<!--  display: flex; -->
<!--  width: 100%; -->
<!--  height: 100%; -->
<!--  align-items: center; -->
<!--  justify-content: center; -->
<!--  padding: 0; -->
<!--  font-family: 'Merriweather'; -->
<!--  font-size: 15px; -->
<!--  font-weight: bold; -->
<!--  text-align: center; -->
<!--  transition: background 0.3s, color 0.3s; -->
<!-- } -->

<!-- /* Стили для легенд */ -->
<!-- .form__part-title { -->
<!--  margin-bottom: 15px; -->
<!--  font-size: 18px; -->
<!--  font-family: 'Merriweather'; -->
<!-- } -->

<!-- /* Секция «Права» */ -->
<!-- .form__part1 { -->
<!--  margin: 0 0 30px 0; -->
<!--  padding: 0; -->
<!--  border: none; -->
<!--  display: flex; -->
<!-- } -->

<!-- /* Активное состояние радиокнопки */ -->
<!-- .form__part1-btn input:checked + .form__part1-descr { -->
<!--  background-color: #b82132; -->
<!--  color: #fff; -->
<!--  border-color: #b82132; -->
<!-- } -->

<!-- /* Секция «Регион» */ -->
<!-- .form__part2 { -->
<!--  margin: 0 0 30px 0; -->
<!--  padding: 0; -->
<!--  border: none; -->
<!--  display: flex; -->
<!-- } -->

<!-- /* Аббревиатура в углу */ -->
<!-- .form__part2-btn::before { -->
<!--  content: attr(data-abbr); -->
<!--  position: absolute; -->
<!--  top: 0; -->
<!--  left: 0; -->
<!--  color: #b82132; -->
<!--  border-right: 1px solid #b82132; -->
<!--  border-bottom: 1px solid #b82132; -->
<!--  padding: 2px 6px; -->
<!--  font-size: 0.75rem; -->
<!--  line-height: 1; -->
<!--  background: transparent; -->
<!--  transition: background 0.3s, color 0.3s, border-color 0.3s; -->
<!-- } -->

<!-- /* Активное состояние чекбокса «Регион» */ -->
<!-- .form__part2-btn input:checked + .form__part2-descr { -->
<!--  background-color: #b82132; -->
<!--  color: #fff; -->
<!-- } -->

<!-- /* Когда чекбокс «Регион» выбран, меняем и псевдоэлемент */ -->
<!-- .form__part2-btn:has(input:checked)::before { -->
<!--  background-color: #b82132; -->
<!--  color: #fff; -->
<!--  border-color: #fff; -->
<!-- } -->

<!-- /* Секция «Судно» */ -->
<!-- .form__part3 { -->
<!--  margin: 0 0 30px 0; -->
<!--  padding: 0; -->
<!--  border: none; -->
<!--  display: flex; -->
<!--  flex-wrap: wrap; -->
<!--  gap: 20px 30px; -->
<!-- } -->

<!-- /* Иконка внутри кнопки «Судно» */ -->
<!-- .form__part3-icon { -->
<!--  position: absolute; -->
<!--  top: 4px; -->
<!--  left: 4px; -->
<!--  width: 18px; -->
<!--  height: 18px; -->
<!--  margin-bottom: 5px; -->
<!--  color: #b82132; -->
<!--  pointer-events: none; -->
<!-- } -->

<!-- /* Активное состояние чекбокса «Судно» */ -->
<!-- .form__part3-btn input:checked ~ .form__part3-descr { -->
<!--  background-color: #b82132; -->
<!--  color: #fff; -->
<!-- } -->

<!-- .form__part3-btn input:checked ~ .form__part3-icon { -->
<!--  color: #fff; -->
<!-- } -->

<!-- /* Стили для группы кнопок «Экзамен/Тренажер» */ -->
<!-- .form__buttons { -->
<!--  display: flex; -->
<!--  gap: 1rem; -->
<!-- } -->

<!-- /* Общий стиль для кнопок */ -->
<!-- .form__button { -->
<!--  background-color: #3b6790; -->
<!--  color: #fff; -->
<!--  padding: 20px 35px; -->
<!--  font-size: 20px; -->
<!--  cursor: pointer; -->
<!--  border: none; -->
<!--  border-radius: 4px; -->
<!--  transition: opacity 0.3s; -->
<!-- } -->

<!-- .form__button:disabled { -->
<!--  opacity: 0.6; -->
<!--  cursor: not-allowed; -->
<!-- } -->
<!-- </style> -->

<script setup lang="js">
import { computed, ref } from 'vue'
import { regionOptions, rightsOptions, vesselOptions } from '~/components/QuizzesForm/index'

// Определяем, какие события будем эмитить
const emit = defineEmits(['start-exam', 'start-trainer'])

// Состояние формы
const haveRights = ref('no') // 'yes' или 'no'
const regionType = ref([]) // массив строк
const vesselType = ref([]) // массив строк

// Валидность формы: хотя бы один регион и один тип судна
const isFormValid = computed(() =>
  regionType.value.length > 0 && vesselType.value.length > 0,
)

// Нажали «Экзамен» → эмитим событие 'start-exam' с пэйлоадом
function onSubmit() {
  const payload = {
    certificate: haveRights.value === 'yes',
    regions: regionType.value.slice(),
    vessels: vesselType.value.slice(),
  }
  emit('start-exam', payload)
}

// Нажали «Тренажер» → эмитим событие 'start-trainer' с пэйлоадом
function onTrainer() {
  const payload = {
    certificate: haveRights.value === 'yes',
    regions: regionType.value.slice(),
    vessels: vesselType.value.slice(),
  }
  emit('start-trainer', payload)
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <!-- 1. Права -->
    <fieldset class="form__part1">
      <legend class="form__part-title">
        Есть ли у вас права
      </legend>
      <label
        v-for="opt in rightsOptions"
        :key="opt.value"
        class="form__part1-btn form__part-btn"
      >
        <input
          v-model="haveRights"
          class="form__input-hidden"
          type="radio"
          :value="opt.value"
        >
        <span class="form__part1-descr">{{ opt.label }}</span>
      </label>
    </fieldset>

    <!-- 2. Регион -->
    <fieldset class="form__part2">
      <legend class="form__part-title">
        Выберите тип региона
      </legend>
      <label
        v-for="opt in regionOptions"
        :key="opt.value"
        class="form__part2-btn form__part-btn"
        :data-abbr="opt.abbr"
      >
        <input
          v-model="regionType"
          class="form__input-hidden"
          type="checkbox"
          :value="opt.value"
        >
        <span class="form__part2-descr">{{ opt.label }}</span>
      </label>
    </fieldset>

    <!-- 3. Судно -->
    <fieldset class="form__part3">
      <legend class="form__part-title">
        Выберите тип судна
      </legend>
      <label
        v-for="opt in vesselOptions"
        :key="opt.value"
        class="form__part3-btn form__part-btn"
      >
        <input
          v-model="vesselType"
          class="form__input-hidden"
          type="checkbox"
          :value="opt.value"
        >
        <svg-icon class="form__part3-icon" :name="opt.icon" />
        <span class="form__part3-descr">{{ opt.label }}</span>
      </label>
    </fieldset>

    <!-- Кнопки -->
    <div class="form__buttons">
      <button
        class="form__button"
        :disabled="!isFormValid"
        type="submit"
      >
        Экзамен
      </button>
      <button
        class="form__button"
        :disabled="!isFormValid"
        type="button"
        @click="onTrainer"
      >
        Тренажер
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form__input-hidden {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.form__part-btn {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  width: 140px;
  height: 90px;
  border: 2px solid #b82132;
  color: #b82132;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

/* Описание внутри кнопки */
.form__part1-descr,
.form__part2-descr,
.form__part3-descr {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-family: 'Merriweather';
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  transition: background 0.3s, color 0.3s;
}

/* Стили для легенд */
.form__part-title {
  margin-bottom: 15px;
  font-size: 18px;
  font-family: 'Merriweather';
}

/* Секция «Права» */
.form__part1 {
  margin: 0 0 30px 0;
  padding: 0;
  border: none;
  display: flex;
}

/* Активное состояние радиокнопки */
.form__part1-btn input:checked + .form__part1-descr {
  background-color: #b82132;
  color: #fff;
  border-color: #b82132;
}

/* Секция «Регион» */
.form__part2 {
  margin: 0 0 30px 0;
  padding: 0;
  border: none;
  display: flex;
}

/* Аббревиатура в углу */
.form__part2-btn::before {
  content: attr(data-abbr);
  position: absolute;
  top: 0;
  left: 0;
  color: #b82132;
  border-right: 1px solid #b82132;
  border-bottom: 1px solid #b82132;
  padding: 2px 6px;
  font-size: 0.75rem;
  line-height: 1;
  background: transparent;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

/* Активное состояние чекбокса «Регион» */
.form__part2-btn input:checked + .form__part2-descr {
  background-color: #b82132;
  color: #fff;
}

/* Когда чекбокс «Регион» выбран, меняем и псевдоэлемент */
.form__part2-btn:has(input:checked)::before {
  background-color: #b82132;
  color: #fff;
  border-color: #fff;
}

/* Секция «Судно» */
.form__part3 {
  margin: 0 0 30px 0;
  padding: 0;
  border: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 30px;
}

/* Иконка внутри кнопки «Судно» */
.form__part3-icon {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 18px;
  height: 18px;
  margin-bottom: 5px;
  color: #b82132;
  pointer-events: none;
}

/* Активное состояние чекбокса «Судно» */
.form__part3-btn input:checked ~ .form__part3-descr {
  background-color: #b82132;
  color: #fff;
}

.form__part3-btn input:checked ~ .form__part3-icon {
  color: #fff;
}

/* Кнопки */
.form__buttons {
  display: flex;
  gap: 1rem;
}

.form__button {
  background-color: #3b6790;
  color: #fff;
  padding: 20px 35px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: opacity 0.3s;
}

.form__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
