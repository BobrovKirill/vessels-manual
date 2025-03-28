<script setup lang="ts">
const props = defineProps({
  list: {
    required: true,
    type: Array,
  },
})
console.log('props', props.list)
</script>

<template>
  <nav class="nav">
    <ul v-if="$viewport.isGreaterThan('tablet')" class="header__nav__list">
      <li
        v-for="(listItem, index) in list"
        :key="index"
        class="header__nav-item"
        :class="`${index}_item`"
      >
        <NuxtLink v-if="listItem.name" :to="listItem.to">
          {{ listItem.name || '' }}
        </NuxtLink>
      </li>
      <!--      <li class="header__nav__list__item first__item__left"> -->
      <!--        <NuxtLink to="/tests"> -->
      <!--          Тесты -->
      <!--        </NuxtLink> -->
      <!--      </li> -->
      <!--      <li class="header__nav__list__item second__item__left"> -->
      <!--        <NuxtLink to="/info"> -->
      <!--          Информация -->
      <!--        </NuxtLink> -->
      <!--      </li> -->
      <!--      <li class="header__nav__list__item first__item__right"> -->
      <!--        <NuxtLink to="/info-project"> -->
      <!--          О&nbsp;проекте -->
      <!--        </NuxtLink> -->
      <!--      </li> -->
      <!--      <li class="header__nav__list__item second__item__right"> -->
      <!--        <NuxtLink to="/more"> -->
      <!--          Теория -->
      <!--        </NuxtLink> -->
      <!--      </li> -->
    </ul>
    <slot />
  </nav>
</template>

<style scoped lang="scss">

a {
  text-decoration: none;
}

.nav {
  margin: 0 auto;
}


.header__nav-item {
    color: #B82132;
    font-size: 14px;
}

.header__nav__list {
    display: grid;
    grid-template-columns: repeat(5, 90px);
    grid-template-areas:
    "item1 item2 pass item3 item4";
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: center;
    justify-items: center;
    column-gap: 90px;
}

.header__nav-item:nth-child(1) {
  grid-area: item1;
}

.header__nav-item:nth-child(2) {
  grid-area: item2;
}

.header__nav-item:nth-child(3) {
  grid-area: item3;
}

.header__nav-item:nth-child(4) {
  grid-area: item4;
}



</style>
