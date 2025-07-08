<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<
  { bvid: string }
>()

const baseUrl = import.meta.env.VITE_API_BASE_URL

const imageLoaded = ref(false)
const data = ref<any>(null)
onMounted(async () => {
  if (!props.bvid)
    return

  try {
    const res = await fetch(`${baseUrl}/bvideo?bvid=${props.bvid}`)
    data.value = await res.json()
  }
  catch (error) {
    console.error('获取视频信息出错：', error)
  }
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
function formatImage(url: string): string {
  if (!url)
    return ''
  return `${baseUrl}/img-proxy?url=${encodeURIComponent(url)}`
}
</script>

<template>
  <div>
    <template v-if="!data">
      <div class="skeleton-card" />
    </template>
    <template v-else>
      <div v-if="data" class="box_warper cursor-pointer">
        <div class="relative">
          <div
            v-if="!imageLoaded"
            class="rounded-lg bg-stone-200 h-40 w-full animate-pulse"
          />
          <img
            v-show="imageLoaded"
            :src="formatImage(data.pic)"
            class="rounded-lg object-cover"
            @load="imageLoaded = true"
          >
          <div class="p-x-2 flex w-full bottom-2 justify-between absolute">
            <div class="flex-center gap-2">
              <img :src="formatImage(data.owner.face)" class="rounded-full w-6">
              <div class="text-0.6rem text-stone-300 p-1.5 p-y-0.4 rounded-lg bg-stone-800/70">
                {{ data.owner.name }}
              </div>
            </div>
            <div class="flex-center gap-1">
              <div class="text-0.6rem text-stone-300 rounded-lg bg-stone-800/70 md:p-1.5 md:p-y-0.4">
                {{ formatNumber(data.count.view) }}观看
              </div>
              <div class="text-0.6rem text-stone-300 p-1.5 p-y-0.4 rounded-lg bg-stone-800/70">
                {{ formatNumber(data.count.danmaku) }}弹幕
              </div>
            </div>
          </div>
        </div>
        <div class="text-lg font-bold">
          {{ formatTitle(data.title) }}
        </div>
        <div class="text-0.8rem text-stone-600 pl-2 flex gap-1">
          <div>{{ formatNumber(data.count.like) }}点赞</div>
          <div class="px-2">
            •
          </div>
          <div>{{ formatNumber(data.count.coin) }}投币</div>
          <div class="px-2">
            •
          </div>
          <div>{{ formatNumber(data.count.favorite) }}收藏</div>
        </div>
      </div>
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
