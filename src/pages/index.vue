<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BiliData from '@/components/BiliData.vue'

const route = useRoute()
const gameId = ref(route.params.gameId)

watch(() => route.params, (newParams) => {
  gameId.value = newParams.gameId
  getGameData(gameId.value as string)
}, { immediate: true })

const gameData = ref()
async function getGameData(gameId: string) {
  const res = await fetch(`http://localhost:3456/game/${gameId}`)
  const json = await res.json()
  gameData.value = json.data
}
</script>

<template>
  <div class="box">
    <div class="gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
      <BiliData v-for="i in gameData" :key="i.id" :bvid="i.bvid" />
    </div>
  </div>
</template>

<style scoped>
.box{
  --uno:'p-x-10 mt-15'
}
</style>
