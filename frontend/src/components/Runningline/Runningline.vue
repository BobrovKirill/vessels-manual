<script setup lang="ts">

</script>

<template>
  <div class="runningline__container">
    <div class="runningline__wrapper">
      <div class="runningline__item">
        <SvgIcon class="running__inner-svg" name="runningsvg1" />
        <span class="running__inner-text">
          моторное судно
        </span>
        <SvgIcon class="running__inner-svg" name="runningsvg1" />
        <span class="running__inner-text">
          гидроцикл
        </span>
        <SvgIcon class="running__inner-svg" name="runningsvg1" />
        <span class="running__inner-text2">
          парусное судно
        </span>
      </div>
      <div class="runningline__item">
        <SvgIcon class="running__inner-svg" name="runningsvg1" />
        <span class="running__inner-text">
          моторное судно
        </span>
        <SvgIcon class="running__inner-svg" name="runningsvg1" />
        <span class="running__inner-text">
          гидроцикл
        </span>
        <SvgIcon class="running__inner-svg" name="runningsvg1" />
        <span class="running__inner-text2">
          парусное судно
        </span>
      </div>
    </div>
  </div>
</template>

<style  lang="scss">
  .runningline__container {
    overflow: hidden;
    position: relative;
  }

  .runningline__wrapper {
    display: flex;
    background-color: #3B6790;
    padding: 10px 0;
  }

  .running__inner-text {
    color: #fff;
    font-family: 'Merriweather';
    font-size: 17px;
  }

  .running__inner-text2 {
    color: #fff;
    font-family: 'Merriweather';
    font-size: 17px;
    margin-right: 60px;
  }

  .runningline__item {
    white-space: nowrap;
    max-width: 1440px;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    animation: ticker 8s linear infinite; ;
  }

  @keyframes ticker {
    0%{
      transform: translatez(0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }

  }
</style>
