<script setup lang="ts">

</script>

<template>
  <div class="dividingline__container">
    <SvgIcon class="dividingline__svg" name="dividingline-wheel" />
    <span class="dividingline__span">
      7 ФУТОВ ПОД КИЛЕМ!
    </span>
    <SvgIcon class="dividingline__svg" name="dividingline-knot" />
  </div>
</template>

<style scoped lang="scss">
.dividingline__svg {
    width: 80px;
    height: 80px;

  @include breakpoint('tablet') {
    width: 125px;
    height: 125px;
  }

  @include breakpoint('desktop') {
    width: 220px;
    height: 220px;
  }
}

  .dividingline__container {
    background: $secondary;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 21px 10px;
    display: flex;
    justify-content: space-between;

    @include breakpoint('tablet') {
      padding: 31px 20px;
    }

    @include breakpoint('desktop') {
      padding: 41px 30px;
    }
  }

  .dividingline__span {
    color: #DCDDE2;
    font-family: 'Merriweather', serif;
    font-size: 19px;
    text-align: center;
    align-self: center;

    max-width: 206px;
    width: 100%;

    @include breakpoint('tablet') {
      font-size: 39px;
      max-width: 406px;
      width: 100%
    }

    @include breakpoint('desktop') {
      font-size: 69px;
      max-width: 506px;
      width: 100%
    }
  }
</style>
