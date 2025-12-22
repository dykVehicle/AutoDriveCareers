<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const cursorX = ref(0);
const cursorY = ref(0);
const isHovering = ref(false);
const isClicking = ref(false);

const updateCursor = (e: MouseEvent) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
};

const handleMouseEnter = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.closest('a') || target.closest('button') || target.tagName === 'INPUT') {
    isHovering.value = true;
  }
};

const handleMouseLeave = () => {
  isHovering.value = false;
};

const handleMouseDown = () => isClicking.value = true;
const handleMouseUp = () => isClicking.value = false;

onMounted(() => {
  window.addEventListener('mousemove', updateCursor);
  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', handleMouseUp);
  document.body.addEventListener('mouseover', handleMouseEnter);
  document.body.addEventListener('mouseout', handleMouseLeave);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor);
  window.removeEventListener('mousedown', handleMouseDown);
  window.removeEventListener('mouseup', handleMouseUp);
  document.body.removeEventListener('mouseover', handleMouseEnter);
  document.body.removeEventListener('mouseout', handleMouseLeave);
});
</script>

<template>
  <div 
    class="drone-cursor hidden md:block"
    :class="{ 'is-hovering': isHovering, 'is-clicking': isClicking }"
    :style="{ transform: `translate(${cursorX}px, ${cursorY}px)` }"
  >
    <!-- Drone Body -->
    <div class="relative -translate-x-1/2 -translate-y-1/2">
      <!-- Main Core -->
      <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm relative z-10 transition-all duration-300"
           :class="isHovering ? 'scale-150 bg-orange-500' : ''"></div>
      
      <!-- Rotors (Decorative) -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-slate-300 rounded-full animate-spin-slow opacity-50"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-blue-200 rounded-full animate-ping opacity-30" v-if="isClicking"></div>
      
      <!-- Label -->
      <div class="absolute left-6 top-0 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 transition-opacity"
           :class="isHovering ? 'opacity-100' : ''">
        TARGET_LOCKED
      </div>
    </div>
  </div>
</template>

<style scoped>
.drone-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
}

@keyframes spin-slow {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>
