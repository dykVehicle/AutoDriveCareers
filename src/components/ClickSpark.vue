<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

// const sparks: { x: number; y: number; color: string; id: number }[] = [];

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

const createSpark = (e: MouseEvent) => {
  const container = document.getElementById('spark-container');
  if (!container) return;

  const count = 8;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('spark');
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)] ?? '#FF6B6B';
    
    // Random direction
    const angle = (Math.PI * 2 * i) / count;
    const velocity = Math.random() * 60 + 40;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    el.style.setProperty('--tx', `${tx}px`);
    el.style.setProperty('--ty', `${ty}px`);
    
    container.appendChild(el);
    
    // Remove after animation
    setTimeout(() => {
      el.remove();
    }, 600);
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
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  animation: spark-fly 0.6s ease-out forwards;
}

@keyframes spark-fly {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
    opacity: 0;
  }
}
</style>
