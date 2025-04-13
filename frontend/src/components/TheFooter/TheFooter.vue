<script setup lang="ts">
console.log('TheFooter is loaded')
</script>

<template>
  <footer>
    <div class="page_footer">
      <div class="footer_up">
        <div class="footer_blog_left">
          <h3 class="footer_blog_left_title">
            О&nbsp;нас
          </h3>
          <h4 class="footer_blog_left_subtitle">
            Проект для подготовки к&nbsp;экзамену ГИМС
          </h4>
          <p class="footer_blog_left_text">
            Этот сайт поможет вам подготовиться к&nbsp;экзамену ГИМС легко и&nbsp;удобно. Мы&nbsp;собрали всю нужную информацию, официальные билеты, полезные советы и&nbsp;тесты. С&nbsp;нами вы&nbsp;сможете уверенно сдать экзамен и&nbsp;получить права на&nbsp;управление маломерными судами.
          </p>
          <h4 class="footer_blog_left_subtitle">
            Информация о&nbsp;курсе
          </h4>
          <p class="footer_blog_left_text">
            В&nbsp;курсе есть все, что нужно для успешной подготовки: теория по&nbsp;судовождению, проверочные тесты и&nbsp;советы по&nbsp;прохождению экзамена. Все материалы соответствуют требованиям ГИМС, поэтому вы&nbsp;будете изучать только нужные темы и&nbsp;сможете сразу применять знания на&nbsp;практике.
          </p>
        </div>
        <div class="footer_blog_right">
          <h3 class="footer_blog_right_title">
            Контакты
          </h3>
          <ul class="footer_blog_right_listcontacts">
            <li class="footer_blog_right_listcontacts_item">
              <span>
                Почта:
              </span>
              <a class="footer_blog_right_listcontacts_item_link" href="mailto:">jfjfjf@mail.ru</a>
            </li>
            <li class="footer_blog_right_listcontacts_item">
              <address class="footer_blog_right_listcontacts_item_adress">
                Адрес: Москва, Россия
              </address>
            </li>
            <li class="footer_blog_right_listcontacts_item">
              <span>
                Телефон:
              </span>
              <a class="footer_blog_right_listcontacts_item_link" href="tel:">+7....</a>
            </li>
          </ul>
          <h4 class="footer_blog_right_subtitle">
            РАЗРАБОТЧИКИ
          </h4>
          <ul class="footer_blog_right_listdev">
            <li class="footer_blog_right_listdev_item">
              БОБРОВ КИРИЛЛ
            </li>
            <li class="footer_blog_right_listdev_item">
              БОЛУЧЕВСКАЯ КСЕНИЯ
            </li>
            <li class="footer_blog_right_listdev_item">
              БАЖЕНОВ КИРИЛЛ
            </li>
          </ul>
          <h4 class="footer_blog_right_subtitle">
            ССЫЛКИ
          </h4>
        </div>
      </div>
      <div class="footer_down">
        <ul class="footer_down_list">
          <li class="footer_down_list_item">
            PRIVACY
          </li>
          <li class="footer_down_list_item">
            МОСКВА 2025
          </li>
          <li class="footer_down_list_item">
            ВШЭ
          </li>
        </ul>
      </div>
      </div>
  </footer>
</template>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }

  address {
    font-style: normal;
  }

  ul {
    list-style: none;
  }

  div,h1,h2,h3,h4,p,ul {
    margin: 0;
    padding: 0;
  }
  
  .page_footer{
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    font-family: 'Martian Mono', serif; ;
  }

  .footer_up {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("@/assets/images/footer/footerback.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    justify-content: space-between;


    @include breakpoint('desktop') {
      flex-direction: row;
      padding: 40px 50px;
    }
  }

  .footer_blog_left {
    padding: 0;
    margin: 0;
    max-width: 520px;
    width: 100%;
    background-color: rgba(247, 247, 247, 0.45);
    border-radius: 4px;
    padding: 35px 55px 35px 35px;
  }

  .footer_blog_right {
    padding: 0;
    margin: 0;
    max-width: 520px;
    width: 100%;
    background-color: rgba(247, 247, 247, 0.45);
    border-radius: 4px;
    padding: 35px 55px 35px 35px;
  }

  .footer_down_list {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    justify-content: space-between;
  }

  .footer_down {
    border: 1px solid;
    padding: 8px 20px;
  }

  .footer_down_list_item {
    font-size: 15px;
    font-family: 'Roboto';
    color: #213341;
  }

  .footer_blog_left_title {
    margin-bottom: 10px;
    color: #213341;
  }

  .footer_blog_left_subtitle {
    margin-bottom: 10px;
    color: #213341;
  }

  .footer_blog_left_text:not(:last-child) {
    margin-bottom: 10px;
  }

  .footer_blog_left_text {
    color: #213341;
  }

  .footer_blog_right_title {
    margin-bottom: 10px;
    color: #213341;
  }

  .footer_blog_right_listcontacts_item{
    color: #213341;
    margin-bottom: 10px;
  }

  .footer_blog_right_listcontacts_item_link {
    color: #213341;
  }

  .footer_blog_right_subtitle{
    color: #213341;
    margin-bottom: 10px;
  }
  
  .footer_blog_right_listdev_item{
    color: #213341;
  }

  .footer_blog_right_listdev {
    margin-bottom: 10px;
  }

</style>