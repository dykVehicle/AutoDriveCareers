<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const scrollProgress = ref(0);

const updateScroll = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.value = scrolled;
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
});
</script>

<template>
  <div class="fixed bottom-10 left-0 w-full px-8 pointer-events-none z-40 hidden md:block">
    <!-- Road Line with gradient -->
    <div class="absolute bottom-4 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 rounded-full shadow-sm"></div>
    
    <!-- The Car -->
      <div 
        class="relative w-20 h-12 transition-all duration-100 ease-out will-change-transform drop-shadow-2xl"
        :style="{ left: `${scrollProgress}%` }"
      >
      <!-- Car Body (Enhanced CSS Art) -->
      <div class="absolute bottom-0 w-full h-full">
        <!-- Roof with gradient -->
        <div class="absolute top-0 left-3 w-12 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-xl shadow-lg"></div>
        <!-- Main Body with gradient -->
        <div class="absolute bottom-1 w-20 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-2xl shadow-blue-500/50"></div>
        <!-- Sensor (LiDAR) with glow -->
        <div class="absolute -top-3 left-7 w-4 h-3 bg-gradient-to-br from-slate-800 to-slate-900 animate-spin-slow rounded-lg shadow-lg shadow-slate-900/50"></div>
        <!-- Wheels with enhanced style -->
        <div class="absolute bottom-0 left-3 w-4 h-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full animate-spin-roll shadow-md"></div>
        <div class="absolute bottom-0 right-3 w-4 h-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full animate-spin-roll shadow-md"></div>
        <!-- Lights with enhanced glow -->
        <div class="absolute bottom-4 right-0 w-2 h-3 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-r-lg shadow-[0_0_15px_#facc15] animate-pulse-slow"></div>
        <!-- Front glass -->
        <div class="absolute top-1 left-4 w-10 h-4 bg-gradient-to-b from-blue-300/30 to-transparent rounded-t-lg"></div>
      </div>
      
      <!-- Speech Bubble (Fun Factor) with enhanced styling -->
      <div v-if="scrollProgress > 95" class="absolute -top-16 left-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl shadow-xl text-sm font-bold whitespace-nowrap animate-bounce">
        到达终点! 🏁✨
      </div>
      <div v-else-if="scrollProgress > 50 && scrollProgress < 55" class="absolute -top-16 left-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-2xl shadow-xl text-sm font-bold whitespace-nowrap animate-pulse">
        正在巡航... 🚗💨
      </div>
      <div v-else-if="scrollProgress > 10 && scrollProgress < 15" class="absolute -top-16 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl shadow-xl text-sm font-bold whitespace-nowrap animate-bounce">
        加速中... ⚡
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}

@keyframes spin-roll {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-roll {
  animation: spin-roll 0.5s linear infinite;
}
</style>
