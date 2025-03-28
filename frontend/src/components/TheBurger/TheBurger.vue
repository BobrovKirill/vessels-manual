<script setup lang="ts">
  import SvgIcon from '~/components/SvgIcon/SvgIcon.vue'

  import { ref } from 'vue'


  
  const isMenuOpen = ref(false)

  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

</script>

<template>
  <button  @click="toggleMenu" class="header__burger-menu">
    <SvgIcon  name="burger" />
  </button>
  <Nav v-if="isMenuOpen" :list="navList" />
</template>

<style scoped lang="scss">

  .header__burger-menu {
    margin-right: 30px;
  } 
 
</style>
