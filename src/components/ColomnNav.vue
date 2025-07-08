<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const nav = ref([
  { name: '导航项一', link: 'ys' },
  { name: '导航项二', link: 'bt' },
  { name: '导航项三', link: 'zzz' },
])

const active = ref(route.params.gameId) || ref('ys')

function changeActive(link: string) {
  active.value = link
  router.push({ params: { gameId: link } })
}
</script>

<template>
  <div class="mt-15 flex gap-10">
    <div class="inline-flex flex-col gap-1.5">
      <div
        v-for="item in nav"
        :key="item.name"
        class="nva_item"
        :class="{
          'active': active === item.link,
          'bg-#15181E text-white scale-105 shadow-md': active === item.link,
        }"
        @click="changeActive(item.link)"
      >
        <span class="pl-2">{{ item.name }}</span>
      </div>
    </div>
    <div class="rounded-lg bg-#E5E5E5 h-80vh w-0.3" />
  </div>
</template>

<style scoped>
.nva_item{
  --uno:'w-30 rounded-xl p-x-1 p-y-1.5  text-sm cursor-pointer  transition-all duration-300 ';
}

.nva_item:not(.active):hover {
  background-color: rgba(131, 131, 145, 0.3);
  transform: scale(1.05);
}
</style>
