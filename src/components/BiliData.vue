<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<
  { videoData?: any }
>()

const imageLoaded = ref(false)
const data = ref<any>(null)

onMounted(async () => {
  data.value = props.videoData
})

function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  return `${num}`
}

function formatTitle(title: string): string {
  return title.length > 30
    ? `${title.slice(0, 30)}...`
    : title
}
</script>

<template>
  <div>
    <template v-if="!data">
      <div class="skeleton-card" />
    </template>
    <template v-else>
      <a
        v-if="data"
        class="box_warper cursor-pointer"
        :href="`https://www.bilibili.com/video/${data.bvid}`"
        target="_blank"
      >
        <div class="relative">
          <div
            v-if="!imageLoaded"
            class="rounded-lg bg-stone-200 h-40 w-full animate-pulse"
          />
          <img
            v-show="imageLoaded"
            :src="data.pic"
            class="rounded-lg object-cover"
            @load="imageLoaded = true"
          >
          <div class="p-x-2 flex w-full bottom-2 justify-between absolute">
            <div class="flex-center gap-2">
              <img :src="data.owner_face" class="rounded-full w-6">
              <div class="text-0.6rem text-stone-300 p-1.5 p-y-0.4 rounded-lg bg-stone-800/70">
                {{ data.owner_name }}
              </div>
            </div>
            <div class="flex-center gap-1">
              <div class="text-0.6rem text-stone-300 rounded-lg bg-stone-800/70 md:p-1.5 md:p-y-0.4">
                {{ formatNumber(data.view) }}观看
              </div>
              <div class="text-0.6rem text-stone-300 p-1.5 p-y-0.4 rounded-lg bg-stone-800/70">
                {{ formatNumber(data.danmaku) }}弹幕
              </div>
            </div>
          </div>
        </div>
        <div class="text-lg font-bold">
          {{ formatTitle(data.title) }}
        </div>
        <div class="text-0.8rem text-stone-600 pl-2 flex gap-1">
          <div>{{ formatNumber(data.like_count) }}点赞</div>
          <div class="px-2">
            •
          </div>
          <div>{{ formatNumber(data.coin) }}投币</div>
          <div class="px-2">
            •
          </div>
          <div>{{ formatNumber(data.favorite) }}收藏</div>
        </div>
      </a>
    </template>
  </div>
</template>

<style scoped>
.box_warper {
  --uno:'hover:bg-stone-100 p-3 w-full rounded-lg transition-all duration-300 inline-flex flex-col gap-2  font-mono'
}
.skeleton-card{
  --uno:'rounded-lg bg-stone-200  h-50 w-full inset-0  animate-pulse'
}
</style>
