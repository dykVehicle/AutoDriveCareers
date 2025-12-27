<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

// const sparks: { x: number; y: number; color: string; id: number }[] = [];

const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

const createSpark = (e: MouseEvent) => {
  const container = document.getElementById('spark-container');
  if (!container) return;

  const count = 10;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('spark');
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)] ?? '#3b82f6';
    
    // Random direction
    const angle = (Math.PI * 2 * i) / count;
    const velocity = Math.random() * 70 + 50;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    el.style.setProperty('--tx', `${tx}px`);
    el.style.setProperty('--ty', `${ty}px`);
    
    container.appendChild(el);
    
    // Remove after animation
    setTimeout(() => {
      el.remove();
    }, 700);
  }
};

onMounted(() => {
  window.addEventListener('click', createSpark);
});

onUnmounted(() => {
  window.removeEventListener('click', createSpark);
});
</script>

<template>
  <div id="spark-container" class="fixed inset-0 pointer-events-none z-[9999]"></div>
</template>

<style>
.spark {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  pointer-events: none;
  animation: spark-fly 0.7s ease-out forwards;
  box-shadow: 0 0 10px currentColor;
}

@keyframes spark-fly {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
    opacity: 0;
  }
}
</style>
