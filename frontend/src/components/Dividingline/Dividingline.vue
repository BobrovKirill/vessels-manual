<script setup lang="ts">

</script>

<template>
  <div class="dividingline__container">
    <SvgIcon name="dividingline1" />
    <span class="dividingline__span">
      7 ФУТОВ ПОД КИЛЕМ!
    </span>
    <SvgIcon name="dividingline2" />
  </div>
</template>

<style scoped lang="scss">
  .dividingline__container {
    background: #3B6790;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 41px 30px;
    display: flex;
    justify-content: space-between;
  }

  .dividingline__span {
    color: #DCDDE2;
    font-family: 'Merriweather', serif;
    font-size: 69px;
    max-width: 506px;
    width: 100%;
    text-align: center;
  }
</style>
