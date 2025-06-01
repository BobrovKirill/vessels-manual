<script setup lang="ts">
import SvgIcon from '~/components/SvgIcon/SvgIcon.vue'
</script>

<template>
  <section class="about">
    <picture class="about__img">
      <img alt="" src="@/assets/images/mainpage/Frame.jpg">
    </picture>

    <div class="about__info">
      <div class="about__header">
        <h2 class="about__header-title">
          О&nbsp;подготовке&nbsp;к экзамену
        </h2>

        <picture class="about__header-img">
          <img alt="" src="@/assets/images/mainpage/aboutimg.jpg">
        </picture>
      </div>

      <div class="about__content">
        <SvgIcon
          v-for="i in 4"
          :key="`panchor-${i}`"
          class="about__content-panchor"
          name="panchor"
        />

        <h3 class="about__content-title">
          НА ЭТОМ РЕСУРСЕ ВЫ МОЖЕТЕ ПОДГОТОВИТЬСЯ К ЭКЗАМЕНУ ГИМС
        </h3>

        <div class="about__content-texts">
          <p class="about__content-text">
            Пройдите теоретический курс, потренируйтесь на тестах и узнайте все правила судовождения, необходимые для успешной сдачи экзамена.
          </p>

          <ul class="about__content-list">
            <li class="about__content-item">
              Тесты соответствуют официальным билетам ГИМС
            </li>

            <li class="about__content-item">
              Практические советы для экзамена на воде
            </li>

            <li class="about__content-item">
              Актуальные требования и полезные материалы
            </li>
          </ul>

          <button class="about__content-btn">
            ОЗНАКОМИТСЯ ПОДРОБНЕЕ
          </button>
        </div>

        <div class="about__content-texts">
          <p class="about__content-text">
            Этот ресурс полностью бесплатный, Вы&nbsp;можете проходить тесты в&nbsp;любой момент, но&nbsp;если вы&nbsp;зарегистрируетесь в&nbsp;личном кабинете&nbsp;то&nbsp;сможете отслеживать процесс своего обучения. это очень удобно попробуйте!
          </p>

          <button class="about__content-btn">
            ЗАРЕГИСТРИРОВАТЬСЯ
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {

  &__img {
    display: block;
    border-bottom: 1px solid black;
    width: 100%;
    object-fit: cover;

    @include breakpoint('tablet') {
      max-height: 700px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__info {
    display: grid;
    grid-template-columns: 1fr;

    @include breakpoint('desktop') {
      grid-template-columns: 1fr 1fr;
    }
  }

}

.about__header {
  display: flex;
  flex-direction: column;

  @include breakpoint('desktop') {
    border-right: 1px solid black;

  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &-title {
    margin: 0;
    padding: 30px;

    font-family: font('secondary');
    font-size: 26px;
    color: $second-font;
    text-align: center;
    text-transform: uppercase;

    border-bottom: 1px solid black;

    @include breakpoint('tablet') {
      font-size: 38px;
    }

    @include breakpoint('desktop') {
      font-size: 48px;
    }
  }
}

.about__content {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  padding: 16px;

  @include breakpoint('tablet') {
    padding: 10px 0 20px;
  }

  @include breakpoint('desktop') {
    padding: 40px 60px 70px;
  }

  &-title {
    margin: 0;
    display: inline-block;
    text-align: center;
    width: 50%;
    font-family: font('secondary');
    font-weight: bold;
    font-size: 12px;

    @include breakpoint('mobile', 'wide') {
      width: 60%;
      font-size: 16px;
    }

    @include breakpoint('tablet') {
      font-size: 20px;
    }
  }

  &-texts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    @include breakpoint('mobile', 'wide') {
      width: 80%;
      gap: 13px;
    }
  }

  &-text {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    font-family: font('primary');
    text-transform: uppercase;
    hyphens: auto;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-self: flex-start;

    list-style-position: inside;

    padding: 0;
    margin: 0;
  }

  &-item {
    font-family: font('primary');
    font-size: 12px;
    text-transform: uppercase;
  }

  &-btn {
    width: calc(100% - 110px);

    margin-top: 10px;
    padding: 15px 20px;
    background: $accent;

    text-decoration: none;
    font-family: font('primary');
    color: white;
    font-size: 12px;

    @include breakpoint('tablet') {
      font-size: 14px;
      width: auto;
    }

    @include breakpoint('desktop') {
      font-size: 16px;
    }
  }

  &-panchor {
    position: absolute;
    left: 10px;
    top: 10px;
    transform: rotate(90deg);
    max-height: 52px;
    max-width: 52px;

    @include breakpoint('tablet') {
      max-height: 72px;
      max-width: 72px;
    }

    @include breakpoint('desktop') {
      max-height: 92px;
      max-width: 92px;
      left: 20px;
      top: 30px;
    }

    &:nth-child(2) {
      transform: rotate(180deg);
      left: auto;
      right: 10px;

      @include breakpoint('desktop') {
        right: 30px;
      }
    }

    &:nth-child(3) {
      transform: rotate(-90deg);
      top: auto;
      left: auto;
      bottom: 10px;
      right: 10px;

      @include breakpoint('desktop') {
        bottom: 30px;
        right: 30px;
      }
    }

    &:nth-child(4) {
      transform: rotate(0deg);
      top: auto;
      bottom: 10px;
      right: 10px;

      @include breakpoint('desktop') {
        bottom: 30px;
        right: 30px;
      }
    }
  }
}
</style>
