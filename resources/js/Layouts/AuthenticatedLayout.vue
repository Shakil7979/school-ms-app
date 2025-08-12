<script setup>  

import { ref, watch, onMounted } from 'vue'

import SidebarComponent from '@/components/layout/SidebarComponent.vue'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import OverlayComponent from '@/components/layout/OverlayComponent.vue'

const darkMode = ref(false)
const sidebarToggle = ref(false)

onMounted(() => {
  darkMode.value = JSON.parse(localStorage.getItem('darkMode')) || false
})

watch(darkMode, (value) => {
  localStorage.setItem('darkMode', JSON.stringify(value))
})
</script>

<template>
    <div class="flex h-screen overflow-hidden w-full" :class="{ 'dark bg-gray-900': darkMode }">
    <!-- Sidebar -->
    <SidebarComponent :sidebar-toggle="sidebarToggle" />

    <!-- Content Area -->
    <div class="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
      <!-- Overlay -->
      <OverlayComponent />

      <!-- Header -->
      <HeaderComponent
        :dark-mode="darkMode"
        @toggle-dark="darkMode = !darkMode"
      />

      <!-- Main content -->
      <main>
        <div class="p-4 mx-auto max-w-screen-2xl md:p-6"> 
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>
