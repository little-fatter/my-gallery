<template>
  <n-carousel
    :key="myEffect"
    :effect="myEffect"
    :centered-slides="isCard"
    slides-per-view="auto"
    draggable
    autoplay
    interval="3000"
    style="height: 600px"
  >
    <n-carousel-item v-for="(item,index) in photoes" :key="item+index+'carousel'" :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        :src="rootPath + item"
      >
    </n-carousel-item>
  </n-carousel>
</template>

<script setup>
  import { computed } from 'vue'
    const props = defineProps({
      photoes: Array,
      rootPath: String,
    })
    const isCard = computed(() => props.photoes.length > 2 ? true : false);
    const myEffect = computed(() => props.photoes.length > 2 ? "card" : 'slide') ;

</script>

<style>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>