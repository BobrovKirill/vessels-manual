<script setup lang="ts">
import SvgIcon from '~/components/SvgIcon/SvgIcon.vue'
import TheSwitcher from '~/components/TheSwitcher/TheSwitcher.vue'

defineProps({
  list: {
    required: true,
    type: Array,
  },
})

defineEmits(['close'])
</script>

<template>
  <div class="nav-mobile">
    <div class="nav-mobile__header">
      <TheSwitcher />

      <button @click="$emit('close')">
        <SvgIcon color="#fff" name="close-3" />
      </button>
    </div>

    <nav class="nav-mobile__nav">
      <ul class="nav-mobile__list">
        <li
          v-for="(listItem, index) in list"
          :key="index"
          class="nav-mobile__item"
          :class="`${index}_item`"
        >
          <NuxtLink v-if="listItem.name" :to="listItem.to">
            {{ listItem.name || '' }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.nav-mobile {
  position: fixed;
  top:0;
  left:0;
  z-index: $nav-mobile-index;
  width: 100vw;
  height: 100vh;

  background-color: $secondary;

  padding: 16px;
}

.nav-mobile__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  margin-bottom: 30px;
}

.nav-mobile__nav {
  padding: 24px 16px;
}

.nav-mobile__list {
  display: flex;
  flex-direction: column;
  gap: 32px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.nav-mobile__item {
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;

  a {
    color: white;
  }
}
</style>
