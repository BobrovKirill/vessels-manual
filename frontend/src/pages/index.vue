<script setup lang="ts">
import Dividingline from '~/components/Dividingline/Dividingline.vue'
import Runningline from '~/components/Runningline/Runningline.vue'
import SvgIcon from '~/components/SvgIcon/SvgIcon.vue'
</script>

<template>
  <section class="main">
    <div class="main__blog-first">
      <h1 class="main__blog-first-title">
        ОНЛАЙН-ТРЕНАЖЕР ДЛЯ ПРОХОЖДЕНИЯ ЭКЗАМЕНА ДЛЯ ГИМС
      </h1>
    </div>

    <div class="main__blog-second">
      <div class="main__blog-second-text">
        <dl class="main__blog-second-text1">
          <dd>
            Районы плаванья
          </dd>
          <dt>
            МП,&nbsp;ВП, ВВП
          </dt>
        </dl>

        <dl class="main__blog-second-text2">
          <dd>
            Суда
          </dd>
          <dt>
            гидроцикл,&nbsp;парусное&nbsp;судно, моторное судно
          </dt>
        </dl>
      </div>
      <button class="main__blog-second-btn">
        НАЧАТЬ ОБУЧЕНИЕ
      </button>
    </div>

    <picture class="main__blog-third">
      <img alt="mainjpg" src="../assets/images/mainpage/mainsecond.jpg">
    </picture>

    <div class="main__blog-fourth">
      <h2 class="main__blog-fourth-title">
        ИНФОРМАЦИЯ
      </h2>

      <ul class="main__blog-fourth-list">
        <li class="main__blog-fourth-list-item">
          ЭКЗАМЕН ГИМС
        </li>
        <li class="main__blog-fourth-list-item">
          ПРАВИЛА ПРОВЕДЕНИЯ ГИМС
        </li>
        <li class="main__blog-fourth-list-item">
          ТЕОРИЯ
        </li>
        <li class="main__blog-fourth-list-item">
          ОТСЛЕЖИВАНИЕ ПРОГРЕССА В ЛИЧНОМ КАБИНЕТЕ
        </li>
      </ul>
    </div>
  </section>
  <Runningline />
  <section class="about">
    <picture class="about__img">
      <img alt="" src="../assets/images/mainpage/Frame.jpg">
    </picture>

    <div class="about__info">
      <div class="about__info-left">
        <h2 class="about__info-left-title">
          О&nbsp;подготовке&nbsp;к экзамену
        </h2>
        <picture class="about__info-left-img">
          <img alt="" src="../assets/images/mainpage/aboutimg.jpg">
        </picture>
      </div>
      <div class="about__info-right">
        <SvgIcon class="about__info-right-svg1" name="panchor" />
        <SvgIcon class="about__info-right-svg2" name="panchor" />
        <SvgIcon class="about__info-right-svg3" name="panchor" />
        <SvgIcon class="about__info-right-svg4" name="panchor" />
        <h3 class="about__info-right-title">
          НА ЭТОМ РЕСУРСЕ ВЫ МОЖЕТЕ ПОДГОТОВИТЬСЯ К ЭКЗАМЕНУ ГИМС
        </h3>
        <p class="about__info-right-text">
          Пройдите теоретический курс, потренируйтесь на тестах и узнайте все правила судовождения, необходимые для успешной сдачи экзамена.
        </p>
        <ul class="about__info-right-list">
          <li class="about__info-right-list-item">
            Тесты соответствуют официальным билетам ГИМС
          </li>
          <li class="about__info-right-list-item">
            Практические советы для экзамена на воде
          </li>
          <li class="about__info-right-list-item">
            Актуальные требования и полезные материалы
          </li>
        </ul>
        <button class="about__info-right-link">
          ОЗНАКОМИТСЯ ПОДРОБНЕЕ
        </button>
        <p class="about__info-right-text2">
          Этот ресурс полностью бесплатный, Вы&nbsp;можете проходить тесты в&nbsp;любой момент, но&nbsp;если вы&nbsp;зарегистрируетесь в&nbsp;личном кабинете&nbsp;то&nbsp;сможете отслеживать процесс своего обучения. это очень удобно попробуйте!
        </p>
        <button class="about__info-right-link">
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </div>
    </div>
  </section>
  <Dividingline />
  <section class="tests">
    <div class="tests__card">
      <span class="tests__card-pretitle">РАЙОН ПЛАВАНИЯ - МП</span>
      <h3 class="tests__card-title">
        ВНУТРЕННИЕ И ВНЕШНИЕ МОРЯ
      </h3>
      <img alt="" src="../assets/images/mainpage/card1.jpg">
      <Nuxtlink class="tests__card-link" to="/">
        ПЕРЕЙТИ К ТЕСТУ
      </Nuxtlink>
    </div>
    <div class="tests__card">
      <span class="tests__card-pretitle">РАЙОН ПЛАВАНИЯ - ВВ</span>
      <h3 class="tests__card-title">
        ВНУТРЕННИЕ ВОДОЕМЫ
      </h3>
      <img alt="" src="../assets/images/mainpage/card2.jpg">
      <Nuxtlink class="tests__card-link" to="/">
        ПЕРЕЙТИ К ТЕСТУ
      </Nuxtlink>
    </div>
    <div class="tests__card">
      <span class="tests__card-pretitle">РАЙОНЫ ПЛАВАНИЯ - ВВП</span>
      <h3 class="tests__card-title">
        ВНУТРЕННИЕ ВОДНЫЕ ПУТИ
      </h3>
      <img alt="" class="test__card-img" src="../assets/images/mainpage/card3.jpg">
      <Nuxtlink class="tests__card-link" to="/">
        ПЕРЕЙТИ К ТЕСТУ
      </Nuxtlink>
    </div>
  </section>
  <Runningline />
</template>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100..800&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100..800&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap');

  .main {
    margin: 0 auto;
    display: grid;
    width: 100%;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(100px, 329px);
    grid-template-areas:
      "item1"
      "item2"
      "item3"
      "item4";

    @include breakpoint('desktop') {
      grid-template-areas:
      "item1 item3"
      "item2 item4";
      max-width: 1390px;
      width: 100%;
    }
  }

  .main__blog-first {
    grid-area: item1;
    max-width: 300px;
    width: 100%;
    display: flex;

    justify-content: center;
    align-items: center;
    padding: 30px 0px;
    border-bottom: 1px solid black;

    @include breakpoint('tablet') {
      max-width: 700px;
      width: 100%;
    }

    @include breakpoint('desktop') {
      border-right: 1px solid black;
      border-bottom: 1px solid black;
      max-width: 700px;
      width: 100%;
    }
  }

  .main__blog-second {
    grid-area: item2;
    display: flex;
    max-width: 300px;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Martian Mono', serif;
    padding: 10px 10px;
    height: 100%;
    border-bottom: 1px solid black;

    @include breakpoint('tablet') {
      max-width: 700px;
      border-bottom: 1px solid black;
      width: 100%;
    }

    @include breakpoint('desktop') {
      border-right: 1px solid black;
      border-bottom: none;
      max-width: 700px;
      width: 100%;
      padding: 30px 30px;
      height: 100%;
    }

  }

  .main__blog-third {
    display: flex;
    grid-area: item3;
    height: auto;
    object-fit: cover;
    width: 100%;
    padding: 30px;
    border-bottom: 1px solid black;
    justify-content: center;
    align-items: center;

    @include breakpoint('tablet') {
      width: 100%;
    }

    @include breakpoint('desktop') {
      width: 100%;
    }
  }

  .main__blog-third img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .main__blog-fourth {
    grid-area: item4;
    max-width: 300px;
    width: 100%;

    @include breakpoint('tablet') {
      max-width: 700px;
      width: 100%;
    }

    @include breakpoint('desktop') {
      max-width: 700px;
      width: 100%;
    }
  }

  .main__blog-second-btn {
    margin: 0;
    padding: 20px;
    max-width: 634px;
    background-color: #B82132;
    font-size: 20px;
    color: white;

    @include breakpoint('tablet') {
      padding: 25px;
      font-size: 25px;
      max-width: 700px;
      width: 100%;
    }

    @include breakpoint('desktop') {
      padding: 40px;
      max-width: 634px;
      font-size: 30px;
    }
  }

  .main__blog-first-title {
    font-family: 'Merriweather';
    font-size: 25px;
    line-height: 47px;
    font-weight: bold;
    color: #213341;
    margin: 0;
    padding: 0;
    max-width: 570px;
    width: 100%;

    @include breakpoint('tablet') {
      font-size: 35px;
      line-height: 57px;
      font-weight: bold;
    }

    @include breakpoint('desktop') {
      font-size: 50px;
      line-height: 67px;
      font-weight: bold;
    }
  }

  .main__blog-fourth-title{
    font-family: 'Merriweather';
    text-align: center;
    font-size: 20px;
    line-height: 45px;
    font-weight: bold;
    padding: 0;
    margin: 0 0 20px;
    color: #213341;
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

  .main__blog-fourth-list{
    padding: 0;
    margin: 0 0 0 25px;
    color: #B82132;
    list-style-position: inside;
  }

  .main__blog-fourth-list li::marker {
    margin-right: 0px;
  }

  .main__blog-fourth-list-item{
    margin: 0;
    padding: 0;
    font-family: 'Martian Mono', serif;
    font-size: 16px;
    font-weight: bold;

    @include breakpoint('tablet') {
      font-size: 26px;
    }

    @include breakpoint('desktop') {
      font-size: 26px;
    }
  }

  .main__blog-second-text1 {
    margin: 0;
    padding: 0;
    font-size: 12px;
    text-transform: uppercase;
    max-width: 186px;
    margin-bottom: 25px;

    @include breakpoint('tablet') {
      max-width: 186px;
      font-size: 16px;
    }

    @include breakpoint('desktop') {
      max-width: 186px;
      font-size: 16px;
    }
  }

  .main__blog-second-text2 dd {
    margin-left: 0;
  }

  .main__blog-second-text1 dd {
    margin-left: 0;
  }

  .main__blog-second-text2 {
    margin: 0;
    padding: 0;
    font-size: 12px;
    text-transform: uppercase;
    max-width: 342px;

    @include breakpoint('tablet') {
      max-width: 302px;
      font-size: 16px;
    }

    @include breakpoint('desktop') {
      max-width: 342px;
      font-size: 16px;
    }
  }

  .main__blog-second-text {
    margin: 0;
    padding: 0;
    flex-direction: column;
    max-width: 630px;
    justify-content: space-between;
    max-height: 100px;
    height: 100%;

    @include breakpoint('tablet') {
      display: flex;
      flex-direction: row;
      max-width: 700px;
    }

    @include breakpoint('desktop') {
      display: flex;
      flex-direction: row;
    }
  }

  .about {
    max-width: 1397px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .about__img {
    display: block;
    border-bottom: 1px solid black;
    width: 100%;
    height: 100%;
    object-fit: cover;

    @include breakpoint('tablet') {
      max-height: 700px;
      height: 100%;
    }

    @include breakpoint('desktop') {
      width: 100%;
      height: auto;
    }
  }

  .about__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .about__info {
    display: flex;
    flex-direction: column;

    @include breakpoint('desktop') {
      display: flex;
      flex-direction: row;
      max-height: 697px;
      height: 100%;
    }
  }

  .about__info-left {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include breakpoint('desktop') {
      border-right: 1px solid black;
      max-width: 698px;
      width: 100%;
    }
  }

  .about__info-left-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .about__info-left-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .about__info-left-title {
    margin: 0;
    padding: 0;
    font-family: 'Merriweather';
    font-size: 26px;
    color: #213341;
    text-align: center;
    border-bottom: 1px solid black;
    text-transform: uppercase;

    @include breakpoint('tablet') {
      font-size: 38px;
      max-width: 698px;
      width: 100%;
    }

    @include breakpoint('desktop') {
      font-size: 48px;
    }
  }

  .about__info-right-list {
    list-style-position: inside;
    padding: 0;
    margin: 0 0 15px;
    text-transform: uppercase;
    width: 71%;
  }

  .about__info-right-list-item {
    font-family: 'Martian Mono';
    font-size: 12px;
  }

  .about__info-right-title {
    margin: 0;
    padding: 30px 0 0 0;
    display: inline-block;
    text-align: center;
    width: 50%;
    font-family: 'Merriweather';
    font-weight: bold;
    font-size: 12px;

    @include breakpoint('desktop') {
      font-size: 18px;
    }
  }

  .about__info-right-text {
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-family: 'Martian Mono';
    text-transform: uppercase;
    width: 71%;
  }

  .about__info-right-text2 {
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-family: 'Martian Mono';
    width: 71%;
    text-transform: uppercase;
  }

  .about__info-right-link {

    text-decoration: none;
    font-family: 'Martian Mono';
    color: white;
    background: #B82132;
    padding: 15px 0px;
    font-size: 14px;
    max-width: 184px;
    width: 100%;

    @include breakpoint('tablet') {
      padding: 15px 0px;
      font-size: 14px;
      max-width: 264px;
    }

    @include breakpoint('desktop') {
      padding: 15px 0px;
      font-size: 14px;
      max-width: 264px;
    }
  }

  .about__info-right-link:last-child {
    margin-bottom: 30px;
  }

  .about__info-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 10px 0 20px 0;

    position: relative;

    height: 650px;

    @include breakpoint('tablet') {
      padding: 10px 0 20px 0;
      max-width: 698px;
      width: 100%;
      height: 650px;
    }

    @include breakpoint('desktop') {
      padding: 30px 0 30px 20px;
      max-width: 698px;
      width: 100%;
      height: auto;
    }
  }

  .about__info-right-svg1 {
    position: absolute;
    left: 0;
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

  }

  .about__info-right-svg2 {
    position: absolute;
    right: 0;
    top: 10px;
    transform: rotate(-180deg);
    max-height: 52px;
    max-width: 52px;

    @include breakpoint('tablet') {
      max-height: 72px;
      max-width: 72px;
    }

    @include breakpoint('desktop') {
      max-height: 92px;
      max-width: 92px;
      right: 0;
      top: 30px;
    };
  }

  .about__info-right-svg3 {
    position: absolute;
    right: 0;
    bottom: 20px;
    transform: rotate(-90deg);
    max-height: 52px;
    max-width: 52px;

    @include breakpoint('tablet') {
      max-height: 72px;
      max-width: 72px;
    }

    @include breakpoint('desktop') {
      max-height: 92px;
      max-width: 92px;
      right: 0;
      bottom: 30px;
    }
  }

  .about__info-right-svg4 {
    position: absolute;
    left: 0px;
    bottom: 20px;
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
      bottom: 30px;
    }
  }

  .tests {
    display: flex;
    flex-direction: column;
    font-family: "Martian Mono";
    justify-content: space-between;
    align-items: center;
    padding: 50px 0px;
    max-width: 1397px;
    width: 100%;
    margin: 0 auto;

    @include breakpoint('desktop') {
      flex-direction: row;
    }
  }

  .tests__card {
    border: 2px solid transparent;
    position: relative;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 436px;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 60px;
    transition: box-shadow 0.3s ease;
  }

  .tests__card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 2px solid #B82132;
  }

  .tests__card-link {
    cursor: pointer;
    display: none;
    background-color: #B82132;
    position: absolute;
    top: 50%;
    color: white;
    text-decoration: none;
    padding: 17px 42px;

    @include breakpoint('tablet') {
      font-size: 16px;
      padding: 17px 72px;
    }

    @include breakpoint('desktop') {
      font-size: 16px;
      padding: 17px 72px;
    }
  }

  .tests__card:hover .tests__card-link{
    display: block;
  }

  .tests__card-pretitle {
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
  }

  .tests__card-title {
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
    text-align: center;
  }

  .tests__card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
