<script setup lang="ts">
import { runningItems } from '~/components/Runningline/index'
</script>

<template>
  <div class="runningline">
    <div class="runningline__wrapper">
      <div v-for="dup in 2" :key="dup" class="runningline__item">
        <div v-for="(item, i) in runningItems" :key="i">
          <SvgIcon class="running__inner-svg" :name="item.icon" />
          <span :class="item.alt ? 'running__inner-text' : 'running__inner-text'">
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.runningline {
  overflow: hidden;
  position: relative;
}
.runningline__wrapper {
  display: flex;
  gap: 80px;

  background-color: $secondary;
  padding: 10px 0;
}
.running__inner-text {
  color: #fff;
  font-family: 'Merriweather';
  font-size: 17px;
}

.runningline__item {
  width: 100%;

  display: flex;
  align-items: center;

  gap: 80px;
  animation: ticker 10s linear infinite;

  div {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 80px;
  }
}

@keyframes ticker {
  0% {
    transform: translateZ(0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
