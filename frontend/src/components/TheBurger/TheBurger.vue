<script setup lang="ts">
import SvgIcon from '~/components/SvgIcon/SvgIcon.vue'

defineProps({
  list: {
    required: true,
    type: Array,
  },
})

const navToggler = ref(false)

function handleClick() {
  navToggler.value = !navToggler.value
}
</script>

<template>
  <button class="header__burger-menu" @click="handleClick()">
    <SvgIcon name="burger" />
  </button>

  <NavMobile v-show="navToggler" :list="list" @close="handleClick()" />
</template>

<style scoped lang="scss">
  .header__burger-menu {
    margin-right: 30px;
  }
</style>
