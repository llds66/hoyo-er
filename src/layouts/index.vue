<script setup lang='ts'>
import { AnimatePresence, motion } from 'motion-v'
import { useRoute } from 'vue-router'
import ColomnNav from '@/components/ColomnNav.vue'

const route = useRoute()
</script>

<template>
  <div class="p-x-5 flex">
    <ColomnNav />
    <AnimatePresence mode="wait">
      <motion.div
        :key="route.fullPath"
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
