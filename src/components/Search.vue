<script setup lang="ts">
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['search', 'empty'])
const inputValue = ref('')

function onInput(event: Event) {
  inputValue.value = (event.target as HTMLInputElement).value
  if (inputValue.value.length === 0) {
    emit('empty')
  }
}

function onSearchClick() {
  emit('search', inputValue.value)
}
function onEnter(event: KeyboardEvent) {
  event.preventDefault()
  emit('search', inputValue.value)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="pr-0 relative">
      <input
        type="text" placeholder="搜索  (角色/类型/标签)"
        class="input_warper"
        @input="onInput"
        @keydown.enter="onEnter"
      >
      <div class="p-3 flex-center right-16 top-0 absolute" @click="onSearchClick">
        <div class="i-iconamoon-search-duotone text-stone-500 cursor-pointer hover:text-stone-600" />
      </div>
      <div class="p-3 flex-center right-8 top-0 absolute">
        <a
          target="_blank"
          href="https://www.bilibili.com/opus/1093945732428202018?spm_id_from=333.1387.0.0"
          class="i-mingcute-bilibili-line text-stone-500 cursor-pointer hover:text-stone-600"
        />
      </div>
      <div class="p-3 flex-center right-1 top-0 absolute">
        <a
          target="_blank"
          href="https://github.com/llds66/hoyo-er"
          class="i-mingcute-github-line text-stone-500 cursor-pointer hover:text-stone-600"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.input_warper {
  --uno:'px-4 py-2 outline-none border border-stone-300 rounded-full bg-transparent w-full focus:border-stone-500 bg-#ffffff/80 backdrop-blur-lg'
}
</style>
