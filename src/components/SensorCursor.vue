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
  if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
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
  
  // Attach listeners to clickable elements dynamically
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
    class="sensor-cursor hidden md:block"
    :class="{ 'is-hovering': isHovering, 'is-clicking': isClicking }"
    :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
  >
    <!-- Core -->
    <div class="cursor-dot"></div>
    <!-- Radar Sweep -->
    <div class="cursor-ring"></div>
    <!-- Target Lock -->
    <div class="cursor-corners"></div>
  </div>
</template>

<style scoped>
.sensor-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
  mix-blend-mode: exclusion;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: #00ffff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ffff;
  transition: transform 0.2s;
}

.cursor-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 1px dashed rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  animation: spin 4s linear infinite;
  transition: all 0.3s;
}

.cursor-corners {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 50px;
  height: 50px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

/* Hover State */
.is-hovering .cursor-dot {
  transform: scale(0.5);
  background: #ff00ff;
  box-shadow: 0 0 10px #ff00ff;
}

.is-hovering .cursor-ring {
  width: 60px;
  height: 60px;
  border-color: rgba(255, 0, 255, 0.5);
  background: rgba(255, 0, 255, 0.05);
  animation-duration: 1s;
}

.is-hovering .cursor-corners {
  transform: translate(-50%, -50%) scale(1);
  border-color: #ff00ff;
  clip-path: polygon(
    0 0, 30% 0, 30% 2px, 2px 2px, 2px 30%, 0 30%,
    0 100%, 30% 100%, 30% calc(100% - 2px), 2px calc(100% - 2px), 2px 70%, 0 70%,
    100% 0, 70% 0, 70% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 30%, 100% 30%,
    100% 100%, 70% 100%, 70% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 70%, 100% 70%
  );
}

/* Click State */
.is-clicking .cursor-ring {
  transform: translate(-50%, -50%) scale(0.8);
  background: rgba(0, 255, 255, 0.2);
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>
