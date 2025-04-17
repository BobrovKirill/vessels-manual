<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'logo'
  }
})

const icon = computed(() => {
  try {
    return defineAsyncComponent(() => import(`~/assets/icons/${props.name}.svg`));
  } catch (e) {
    console.error(`Иконка ${props.name} не найдена`);
    return null;
  }
});
</script>

<template>
  <component :is="icon" v-if="icon"/>
</template>
