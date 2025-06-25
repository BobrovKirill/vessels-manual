<script setup lang="ts">
const props = defineProps({
  list: {
    required: true,
    type: Array,
  },
})
</script>

<template>
  <nav class="nav">
    <ul v-if="$viewport.isGreaterThan('tablet')" class="nav__list">
      <li
        v-for="(listItem, index) in list"
        :key="index"
        class="nav__list-item"
        :class="`${index}_item`"
      >
        <NuxtLink v-if="listItem.name" :to="listItem.to">
          {{ listItem.name || '' }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  margin: 0 auto;
}

.nav__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
    "item1 item2 pass item3 item4";
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: center;
    justify-items: center;
    column-gap: 90px;
}

.nav__list-item {
  color: $accent;
  font-size: 14px;
  font-family: font('primary');

  @include breakpoint('tablet') {
    font-size: 18px;
  }

  a {
    text-decoration: none;
    color: inherit;
    padding: 0;
    margin: 0;
  }
}

.nav__list-item:nth-child(1) {
  grid-area: item1;
}

.nav__list-item:nth-child(2) {
  grid-area: item2;
}

.nav__list-item:nth-child(3) {
  grid-area: item3;
}

.nav__list-item:nth-child(4) {
  grid-area: item4;
}
</style>
