<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BiliData from '@/components/BiliData.vue'
import Search from '@/components/Search.vue'

const route = useRoute()
const gameId = ref(route.params.gameId)
const keyword = ref()

function handleSearch(value: string) {
  keyword.value = value
}
function emptyEvent() {
  keyword.value = ''
}

watch(
  [() => route.params.gameId, () => keyword.value],
  ([newGameId, newKeyword]) => {
    gameId.value = newGameId
    getGameData(newGameId as string, newKeyword)
  },
  { immediate: true },
)

const gameData = ref()

async function getGameData(gameId: string, keyword: string) {
  const res = await fetch(`/json/${gameId}.json`)
  const json = await res.json()
  gameData.value = keyword
    ? json.filter((item: any) =>
        item.keywords?.includes(keyword),
      )
    : json
}
</script>

<template>
  <div class="box">
    <Search class="py-3 top-0 sticky z-10" @search="handleSearch" @empty="emptyEvent" />
    <div v-if="gameData?.length" class="biliData_grid">
      <BiliData v-for="i in gameData" :key="i.id" :bvid="i.bvid" />
    </div>
    <div v-else class="text-sm mt-40 flex-center w-full">
      暂无数据
    </div>
  </div>
</template>

<style scoped>
.box{
  --uno:'p-x-10 mt-15';
}
.biliData_grid{
  --uno:'mt-5 gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2'
}
</style>
