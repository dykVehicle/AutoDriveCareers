<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const scrollProgress = ref(0);
// const carRef = ref<HTMLElement | null>(null);

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
  <div class="fixed bottom-8 left-0 w-full px-8 pointer-events-none z-40 hidden md:block">
    <!-- Road Line -->
    <div class="absolute bottom-3 left-0 w-full h-0.5 bg-slate-200"></div>
    
    <!-- The Car -->
      <div 
        
        class="relative w-16 h-10 transition-all duration-100 ease-out will-change-transform"
        :style="{ left: `${scrollProgress}%` }"
      >
      <!-- Car Body (Simple CSS Art) -->
      <div class="absolute bottom-0 w-full h-full">
        <!-- Roof -->
        <div class="absolute top-0 left-2 w-10 h-5 bg-blue-500 rounded-t-lg"></div>
        <!-- Main Body -->
        <div class="absolute bottom-1 w-16 h-5 bg-blue-600 rounded-lg shadow-lg"></div>
        <!-- Sensor (LiDAR) -->
        <div class="absolute -top-2 left-6 w-3 h-2 bg-slate-800 animate-spin-slow rounded-sm"></div>
        <!-- Wheels -->
        <div class="absolute bottom-0 left-2 w-3 h-3 bg-slate-800 rounded-full animate-spin-roll"></div>
        <div class="absolute bottom-0 right-2 w-3 h-3 bg-slate-800 rounded-full animate-spin-roll"></div>
        <!-- Lights -->
        <div class="absolute bottom-3 right-0 w-1 h-2 bg-yellow-400 rounded-r-sm shadow-[0_0_10px_#facc15]"></div>
      </div>
      
      <!-- Speech Bubble (Fun Factor) -->
      <div v-if="scrollProgress > 95" class="absolute -top-12 left-0 bg-white px-3 py-1 rounded-lg shadow-md text-xs font-bold text-blue-600 whitespace-nowrap animate-bounce">
        到达终点! 🏁
      </div>
      <div v-else-if="scrollProgress > 50 && scrollProgress < 55" class="absolute -top-12 left-0 bg-white px-3 py-1 rounded-lg shadow-md text-xs font-bold text-blue-600 whitespace-nowrap animate-pulse">
        正在巡航... 🚗
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
/* Bind animation speed to "velocity" ideally, but constant is ok for fun */
.animate-spin-roll {
  animation: spin-roll 0.5s linear infinite;
}
</style>
