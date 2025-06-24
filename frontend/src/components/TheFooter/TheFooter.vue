<script setup lang="ts">
</script>

<template>
  <footer>
    <div class="footer">
      <div class="footer__body">
        <dl class="footer__content">
          <div>
            <dt class="footer__content-title">
              Проект для подготовки к&nbsp;экзамену ГИМС
            </dt>

            <dd class="footer__content-text">
              Этот сайт поможет вам подготовиться к&nbsp;экзамену ГИМС. Мы&nbsp;постарались собрали всю нужную информацию и&nbsp;официальные билеты. Проект Создан в&nbsp;учебных целях группой студентов Вышей Школы Экономики. Проект в&nbsp;процессе постоянной доработки и&nbsp;внедрению нового функционала
            </dd>
          </div>

          <div>
            <dt class="footer__content-title">
              Информация о&nbsp;курсе
            </dt>

            <dd class="footer__content-text">
              В&nbsp;курсе есть все, что нужно для успешной подготовки: теория по&nbsp;судовождению, проверочные тесты и&nbsp;советы по&nbsp;прохождению экзамена. Все материалы соответствуют требованиям ГИМС, поэтому вы&nbsp;будете изучать только нужные темы и&nbsp;сможете сразу применять знания на&nbsp;практике.
            </dd>
          </div>
        </dl>

        <dl class="footer__content">
          <div>
            <dt class="footer__content-title">
              Контакты
            </dt>

            <dd class="footer__content-text">
              <ul class="footer__content-list">
                <li class="footer__content-item">
                  <span>
                    Почта:
                  </span>
                  <a class="footer__content-link" href="mailto:">vessels-manual@gmail.com</a>
                </li>

                <li class="footer__content-item">
                  <address class="footer__content-item_adress">
                    Адрес: Студенческая ул., 38, Пермь, Пермский край, Россия, 614070
                  </address>
                </li>
              </ul>
            </dd>
          </div>

          <div>
            <dt class="footer__content-title">
              Участники
            </dt>

            <dd class="footer__content-text">
              <ul class="footer__content-list">
                <li class="footer__content-item">
                  БОБРОВ КИРИЛЛ
                </li>

                <li class="footer__content-item">
                  БОЛУЧЕВСКАЯ КСЕНИЯ
                </li>

                <li class="footer__content-item">
                  БАЖЕНОВ КИРИЛЛ
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <div class="footer__line">
        <ul class="footer__line-list">
          <li class="footer__line-list_item">
            vessels-manual
          </li>

          <li class="footer__line-list_item">
            МОСКВА 2025
          </li>

          <li class="footer__line-list_item">
            ВШЭ
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    max-width: 1400px;
    width: 100%;

    margin: 0 auto;

    @include shadow();
  }

  .footer__body {
    display: flex;
    flex-direction: column;
    gap: 16px;

    background-image: url("@/assets/images/footer/footerback.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    padding: 30px 16px;

    @include breakpoint('desktop') {
      padding: 40px 50px;
      gap: 24px;
    }
  }

  .footer__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;

    max-width: 860px;
    width: 100%;

    background-color: rgba(#3B6790, 0.6);

    padding: 16px;

    @include breakpoint('tablet') {
      &:last-child {
        grid-template-columns: 60% 40%;
      }
    }

    @include breakpoint('desktop') {
      padding: 24px 16px;
      margin: 0;
    }
  }

  .footer__content-title {
    margin: 0 0 10px;

    color: white;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: font('secondary');

    @include breakpoint('tablet') {
      font-size: 18px;
    }
  }

  .footer__content-text {
    margin: 8px 0 0 12px;

    color: white;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    font-family: font('primary');

    @include breakpoint('tablet') {
      font-size: 16px;
      line-height: 22px;
    }
  }

  .footer__content-list {
    margin: 8px 0 0 12px;
    padding: 0;
    list-style: none;
  }

  .footer__content-link {
    color: white;
  }

  .footer__line-list {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    justify-content: space-between;
  }

  .footer__line {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 8px 20px;
  }

  .footer__content-item {
    color: white;
    margin-bottom: 10px;

    font-size: 12px;

    @include breakpoint('tablet') {
      font-size: 18px;
    }

    @include breakpoint('desktop') {
      font-size: 18px;
    }
  }
</style>
