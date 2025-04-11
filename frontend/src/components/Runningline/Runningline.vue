<script setup lang="ts">

</script>

<template>
  <div class="marquee-infinite">
    <div class="running-line__container">
      <div>
        <SvgIcon name="runningsvg1" />
        <span>моторное судно</span>
        <SvgIcon name="runningsvg1" />
        <span>гидроцикл</span>
        <SvgIcon name="runningsvg1" />
        <span>парусное судно</span>
        <SvgIcon name="runningsvg1" />
      </div>
      <div>
        <SvgIcon name="runningsvg1" />
        <span>моторное судно</span>
        <SvgIcon name="runningsvg1" />
        <span>гидроцикл</span>
        <SvgIcon name="runningsvg1" />
        <span>парусное судно</span>
        <SvgIcon name="runningsvg1" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .running-line__container {
    display: flex;
  }

  .marquee-infinite {
    background-color: #B82132;
  }
</style>
