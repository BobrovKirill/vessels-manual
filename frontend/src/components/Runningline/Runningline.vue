<script setup lang="ts">
import { runningItems } from '~/components/Runningline/index'
</script>

<template>
  <div class="runningline">
    <div class="runningline__wrapper">
      <div v-for="dup in 2" :key="dup" class="runningline__item">
        <template v-for="(item, i) in runningItems" :key="i">
          <SvgIcon class="running__inner-svg" :name="item.icon" />
          <span :class="item.alt ? 'running__inner-text' : 'running__inner-text'">
            {{ item.text }}
          </span>
        </template>
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
  background-color: $secondary;
  padding: 10px 0;
}
.running__inner-text {
  color: #fff;
  font-family: 'Merriweather';
  font-size: 17px;

  &:last-child {
    margin-right: 60px;
  }
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
  animation: ticker 10s linear infinite;
}
@keyframes ticker {
  0% {
    transform: translateZ(0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
