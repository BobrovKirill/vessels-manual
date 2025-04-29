<script setup lang="ts">

</script>

<template>
  <div class="runningline">
    <div class="runningline__wrapper">
      <div class="runningline__item">
        <SvgIcon class="running__inner-svg" name="runningsvg-yacht" />
        <span class="running__inner-text">
          моторное судно
        </span>
        <SvgIcon class="running__inner-svg" name="runnningsvg-jetski" />
        <span class="running__inner-text">
          гидроцикл
        </span>
        <SvgIcon class="running__inner-svg" name="runningsvg-yacht" />
        <span class="running__inner-text2">
          парусное судно
        </span>
      </div>
      <div class="runningline__item">
        <SvgIcon class="running__inner-svg" name="runningsvg-yacht" />
        <span class="running__inner-text">
          моторное судно
        </span>
        <SvgIcon class="running__inner-svg" name="runnningsvg-jetski" />
        <span class="running__inner-text">
          гидроцикл
        </span>
        <SvgIcon class="running__inner-svg" name="runningsvg-yacht" />
        <span class="running__inner-text2">
          парусное судно
        </span>
      </div>
    </div>
  </div>
</template>

<style  lang="scss">
  .runningline {
    overflow: hidden;
    position: relative;
  }

  .runningline__wrapper {
    display: flex;
    background-color: $secondary;
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
    animation: ticker 10s linear infinite; ;
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
