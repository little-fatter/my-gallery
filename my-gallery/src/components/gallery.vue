<template>
  <n-image-group>
    <n-space>
      <n-image
        v-for="(item,index) in photoes" :key="item+index+'gallery'" 
        width="400"
        :src="rootPath + item"
        :alt="'pic'+index"
      />
    </n-space>
  </n-image-group>
</template>

<script setup>
const props = defineProps({
      photoes: Array,
      rootPath: String,
    })
</script>