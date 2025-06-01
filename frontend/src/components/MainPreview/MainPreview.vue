<script setup lang="ts">

</script>

<template>
  <section class="preview">
    <h1 class="preview__title">
      ОНЛАЙН-ТРЕНАЖЕР ДЛЯ ПРОХОЖДЕНИЯ ЭКЗАМЕНА ДЛЯ ГИМС
    </h1>

    <picture class="preview__img">
      <img alt="mainjpg" src="@/assets/images/mainpage/mainsecond.jpg">
    </picture>

    <div class="preview__action">
      <dl class="preview__action-list">
        <div class="preview__action-item">
          <dd>
            Районы плаванья
          </dd>
          <dt>
            МП,&nbsp;ВП, ВВП
          </dt>
        </div>

        <div class="preview__action-item">
          <dd>
            Суда
          </dd>
          <dt>
            гидроцикл, парусное судно, моторное судно
          </dt>
        </div>
      </dl>

      <button class="preview__action-btn">
        НАЧАТЬ ОБУЧЕНИЕ
      </button>
    </div>

    <div class="preview__info">
      <h2 class="preview__info-title">
        ИНФОРМАЦИЯ
      </h2>

      <ul class="preview__info-list">
        <li class="preview__info-item">
          ЭКЗАМЕН ГИМС
        </li>

        <li class="preview__info-item">
          ПРАВИЛА ПРОВЕДЕНИЯ ГИМС
        </li>

        <li class="preview__info-item">
          ТЕОРИЯ
        </li>

        <li class="preview__info-item">
          ОТСЛЕЖИВАНИЕ ПРОГРЕССА В ЛИЧНОМ КАБИНЕТЕ
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.preview {
  display: grid;
  grid-template-columns: 1fr;

  @include breakpoint('desktop') {
    grid-template-columns: 1fr 1fr;
  }

  &__title {
    padding: 16px;
    border-bottom: 1px solid black;

    font-family: font('secondary');
    font-size: 25px;
    line-height: 47px;
    font-weight: 700;
    color: $second-font;
    margin: 0;
    width: 100%;

    @include breakpoint('tablet') {
      font-size: 35px;
      line-height: 57px;
      padding: 30px;
    }

    @include breakpoint('desktop') {
      border-right: 1px solid black;
      border-bottom: 1px solid black;
    }

    @include breakpoint('desktop', 'medium') {
      font-size: 56px;
      line-height: 67px;
    }

    @include breakpoint('desktop', 'wide') {
      font-size: 62px;
      line-height: 70px;
    }
  }

  &__action {
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 16px;
    border-bottom: 1px solid black;

    @include breakpoint('tablet') {
      gap: 36px;
      padding: 30px;
    }

    @include breakpoint('desktop') {
      border-right: 1px solid black;
      border-bottom: none;
    }

    &-list {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 0;
    }

    &-item {
      max-width: 50%;
      font-size: 12px;
      text-transform: uppercase;
      font-family: font('primary');
      font-weight: 400;

      dd {
        margin: 0 0 12px;
      }

      @include breakpoint('tablet') {
        max-width: 50%;
        font-size: 14px;
      }

      @include breakpoint('desktop') {
        font-size: 16px;
      }
    }

    &-btn {
      padding: 20px;
      background-color: $accent;
      font-size: 16px;
      color: white;

      @include breakpoint('tablet') {
        padding: 25px;
        font-size: 20px;
      }

      @include breakpoint('desktop') {
        padding: 40px;
        font-size: 30px;
      }
    }
  }

  &__img {
    padding: 16px;
    border-bottom: 1px solid black;

    @include breakpoint('tablet') {
      padding: 30px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;

    &-title {
      margin: 0;
      padding: 0 30px;

      font-family: font('secondary');
      text-align: center;
      font-size: 20px;
      line-height: 45px;
      font-weight: 700;
      color: $second-font;

      border-bottom: 1px solid black;

      @include breakpoint('tablet') {
        font-size: 30px;
        line-height: 45px;
      }

      @include breakpoint('desktop') {
        font-size: 40px;
        line-height: 65px;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 6px;

      padding: 0 30px 30px 60px;
      color: $accent;
    }

    &-item {
      margin: 0;
      padding: 0;

      font-family: font('primary');
      font-size: 16px;
      font-weight: 700;

      @include breakpoint('tablet') {
        font-size: 26px;
      }

      @include breakpoint('desktop') {
        font-size: 26px;
      }

      &::marker {
        margin-right: 0;
      }
    }
  }
}
</style>
