<script setup lang="js">
import { computed, ref } from 'vue'
import { QUIZZES_FORM_OPTIONS } from '~/components/QuizzesForm/index'

const emit = defineEmits(['launch', 'sendCurrentForm'])

const form = ref({
  certificate: 'no',
  type: 'quiz',
  regions: [],
  vessels: [],
})

const isFormValid = computed(() =>
  form.value.regions.length > 0 && form.value.vessels.length > 0,
)

function onSubmit() {
  emit('launch')
}

function sendCurrentForm() {
  emit('sendCurrentForm', form.value)
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <fieldset v-for="(option, name) in QUIZZES_FORM_OPTIONS" :key="name" class="form__part">
      <legend class="form__title">
        {{ option.title }}
      </legend>

      <p class="form__text" v-html="option.description" />

      <div class="form__inputs" :style="name === 'vessels' ? 'grid-template-columns: auto auto;' : ''">
        <label
          v-for="(item, id) in option.items"
          :key="`${name}-${id}`"
          class="form__label"
        >
          <input
            v-model="form[name]"
            class="form__input-hidden"
            :type="option.type"
            :value="item.value"
            @change="sendCurrentForm"
          >

          <span class="form__custom-checkbox">
            <svg-icon v-if="item.icon" class="form__icon" :name="item.icon" />
            <template v-else>
              {{ item.abbr }}
            </template>
          </span>

          <svg-icon v-if="item.icon" class="form__icon" :name="item.icon" />

          <span class="form__label-textr">{{ item.label }}</span>
        </label>
      </div>
    </fieldset>

    <div class="form__buttons">
      <button
        class="form__button"
        :disabled="!isFormValid"
        type="submit"
      >
        Начать
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 36px;

  &__part {
    border: none;
    padding: 0;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  &__text {

    font-size: 16px;
    line-height: 20px;
    margin: 0 0 24px;
    hyphens: none;
  }

  &__inputs {
    display: grid;
    grid-template-columns: auto;
    justify-content: start;
    flex-wrap: wrap;
    row-gap: 16px;
    column-gap: 32px;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 12px;

    cursor: pointer;

    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__input-hidden {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  }

  &__custom-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    width: 40px;
    height: 40px;

    border: 2px solid #ccc;
    background-color: #fff;
    border-radius: 50%;

    color: #fff;
    transition: all 0.2s ease-in-out;
  }

  &__icon {
    display: none;

    width: 24px;
    height: 24px;

    fill: #fff;
  }

  &__label-text {
    font-size: 22px;
    hyphens: none;
    flex-grow: 1;
  }

  &__input-hidden:checked + &__custom-checkbox {
    background-color: $secondary;
    border-color: $secondary;
  }

  &__input-hidden:checked + &__custom-checkbox &__icon {
    display: block;
  }

  &__input-hidden[type="checkbox"] + &__custom-checkbox {
    border-radius: 4px;
  }

  &__input-hidden:focus-visible + &__custom-checkbox {
    outline: 2px solid $secondary;
    outline-offset: 2px;
  }

  &__buttons {
    padding: 16px 0 0;
    border-top: 1px solid black;
  }

  &__button {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    background-color: $accent;
    color: white;
    padding: 24px 36px;

    width: 100%;
    max-width: 200px;

    &[disabled] {
      filter: grayscale(50%);
    }
  }
}
</style>
