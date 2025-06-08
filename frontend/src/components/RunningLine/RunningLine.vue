<script setup lang="ts">
import { runningItems } from '~/components/RunningLine/index'
</script>

<template>
  <div class="running-line">
    <div class="running-line__wrapper">
      <div v-for="dup in 2" :key="dup" class="running-line__item">
        <div v-for="(item, i) in runningItems" :key="`first-${i}`">
          <SvgIcon class="running__inner-svg" :name="item.icon" />
          <span class="running__inner-text">{{ item.text }}</span>
        </div>
        <div v-for="(item, i) in runningItems" :key="`second-${i}`">
          <SvgIcon class="running__inner-svg" :name="item.icon" />
          <span class="running__inner-text">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.running-line {
  overflow: hidden;
  position: relative;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.running-line__wrapper {
  display: flex;
  background-color: $secondary;
  padding: 10px 0;
}

.running__inner-text {
  color: #fff;
  font-family: font('secondary');
  font-size: 17px;
}

.running-line__item {
  width: max-content;

  display: flex;
  align-items: center;

  animation: ticker 10s linear infinite;
  will-change: transform;

  div {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 40px;
    backface-visibility: hidden;

    padding: 0 40px 0 0;

    @include breakpoint('tablet') {
      gap: 80px;
      padding: 0 80px 0 0;
    }
  }
}

@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
