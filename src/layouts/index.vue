<script setup lang='ts'>
import ColomnNav from '@C/ColomnNav.vue'
import { AnimatePresence, motion } from 'motion-v'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="font-mono p-x-5 flex">
    <ColomnNav class="hidden fixed md:flex" />
    <AnimatePresence mode="wait">
      <motion.div
        :key="route.fullPath"
        class="w-full md:pl-44"
        layout
        :initial="{ opacity: 0, y: -0 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -0 }"
        :transition="{ duration: 0.3 }"
      >
        <RouterView />
      </motion.div>
    </AnimatePresence>
  </div>
</template>
