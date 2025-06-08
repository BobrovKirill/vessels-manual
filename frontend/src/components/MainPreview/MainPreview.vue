<script setup lang="ts">

</script>

<template>
  <section class="preview">
    <div class="preview__title">
      <h1>
        <span>
          ОНЛАЙН ТРЕНАЖЕР
        </span>

        ЭКЗАМЕНА ГИМС
      </h1>

      <dl class="preview__title-list">
        <div class="preview__title-item">
          <dt>
            Районы плаванья
          </dt>

          <dd>
            МП,&nbsp;ВП, ВВП
          </dd>
        </div>

        <div class="preview__title-item">
          <dt>
            Суда
          </dt>

          <dd>
            гидроцикл, парусное судно, моторное судно
          </dd>
        </div>
      </dl>
    </div>

    <picture class="preview__img">
      <img alt="mainjpg" src="@/assets/images/mainpage/mainsecond.jpg">
    </picture>

    <div class="preview__action">
      <NuxtLink class="preview__action-btn" to="/quizzes">
        НАЧАТЬ ОБУЧЕНИЕ
      </NuxtLink>

      <p class="preview__action-text">
        отслеивание прогресса в <span>личном кабинете</span>
      </p>
    </div>

    <div class="preview__info">
      <h2 class="preview__info-title">
        Всё для успешной сдачи экзамена
      </h2>

      <p class="preview__info-text">
        Поможем качественно подготовиться к экзамену ГИМС.<br><br> Доступны актуальные тесты, подробные теоретические материалы, требования по районам плавания и типам судов, утверждённые в Государственном реестре.<br> Удобная система обучения позволит легко освоить правила судоходства, безопасность на воде и юридические аспекты.<br><br> Контролируйте свой прогресс и приходите на экзамен полностью подготовленными!
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.preview {
  display: grid;
  grid-template-columns: 1fr;

  @include breakpoint('desktop') {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 66px auto;
  }

  &__title {
    padding: 16px;
    border-bottom: 1px solid black;

    @include breakpoint('tablet') {
      padding: 30px;
    }

    @include breakpoint('desktop') {
      grid-column: 1 / 2;
      grid-row: 1 / 3;

      border-right: 1px solid black;
      border-bottom: 1px solid black;
    }

    h1 {
      font-family: font('secondary');
      font-size: 25px;
      line-height: 47px;
      font-weight: 700;
      color: $second-font;
      margin: 0;

      @include breakpoint('tablet') {
        font-size: 35px;
        line-height: 57px;
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

    span {
      display: block;

      margin-bottom: 16px;

      font-size: 24px;
      line-height: 26px;
      font-weight: 700;
      color: $second-font;
      font-family: font('secondary');

      @include breakpoint('tablet') {
        font-size: 28px;
        line-height: 30px;

        margin-bottom: 24px;
      }

      @include breakpoint('desktop', 'medium') {
        font-size: 30px;
        line-height: 32px;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;

      gap: 24px;

      margin: 32px 0 0;
      padding: 0;

      @include breakpoint('tablet') {
        gap: 32px;
      }
    }

    &-item {
      text-transform: uppercase;

      dt {
        margin: 0 0 8px;

        font-size: 12px;
        font-weight: 400;
        font-family: font('secondary');
      }

      dd {
        margin: 0;

        font-size: 14px;
        line-height: 16px;
        font-weight: 700;
        font-family: font('primary');

      }

      @include breakpoint('tablet') {
        dt {
          font-size: 14px;

          margin: 0 0 12px;
        }

        dd {
          font-size: 18px;
          line-height: 20px;
        }
      }

      @include breakpoint('desktop') {
        dt {
          font-size: 16px;
        }

        dd {
          font-size: 20px;
          line-height: 24px;
        }
      }
    }
  }

  &__action {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 24px;

    padding: 16px;
    border-bottom: 1px solid black;

    @include breakpoint('tablet') {
      gap: 24px;
      padding: 30px;
    }

    @include breakpoint('desktop') {
      border-right: 1px solid black;
      border-bottom: none;

      flex-direction: column;
    }

    &-btn {
      width: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 20px;

      background-color: $accent;
      cursor: pointer;

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

    &-text {
      margin: 0;

      font-size: 12px;
      line-height: 14px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: end;

      @include breakpoint('tablet') {
        font-size: 14px;
        line-height: 16px;
      }

      @include breakpoint('desktop') {
        font-size: 20px;
        line-height: 26px;
        text-align: center;
      }

      span {
        color: $accent;
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

    @include breakpoint('desktop') {
      grid-column: 2 / 3;
      grid-row: 2 / 4;
    }

    &-title {
      margin: 0;
      padding: 0 30px;

      font-family: font('primary');
      text-align: center;
      font-size: 20px;
      line-height: 45px;
      font-weight: 700;
      color: $second-font;
      text-transform: uppercase;

      border-bottom: 1px solid black;

      @include breakpoint('desktop', 'base') {
        font-size: 22px;
        line-height: 65px;
      }

      @include breakpoint('desktop', 'medium') {
        font-size: 28px;
        line-height: 65px;
      }
    }

    &-text {
      margin: 0 30px 30px 30px;

      font-family: font('secondary');
      font-size: 12px;
      font-weight: 400;

      @include breakpoint('tablet') {
        font-size: 14px;
      }

      @include breakpoint('desktop') {
        font-size: 16px;
      }
    }
  }
}
</style>
