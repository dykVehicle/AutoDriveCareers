<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  debugMode?: boolean // Force holiday mode for testing
}>();

const currentHoliday = ref<string | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrame: number;

// Santa position
const santaX = ref(-200);
const santaY = ref(100);
const showSanta = ref(false);

const checkDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if (props.debugMode || (month === 12) || (month === 1 && day < 10)) {
    currentHoliday.value = 'christmas';
  } else if (month === 1 || month === 2) {
    // Simplified logic for Spring Festival (adjust as needed)
    currentHoliday.value = 'spring_festival'; 
  }
};

// Snow / Particle System
class Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  type: string;

  constructor(w: number, h: number, type: string) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.wind = Math.random() * 0.5 - 0.25;
    this.type = type;
  }

  update(h: number) {
    this.y += this.speed;
    this.x += this.wind;
    if (this.y > h) {
      this.y = -10;
      this.x = Math.random() * window.innerWidth;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.type === 'christmas' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 215, 0, 0.8)';
    ctx.fill();
  }
}

const particles: Particle[] = [];

const initParticles = () => {
  if (!canvasRef.value) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvasRef.value.width = w;
  canvasRef.value.height = h;
  
  particles.length = 0;
  const count = window.innerWidth < 768 ? 30 : 100; // Less particles on mobile
  
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(w, h, currentHoliday.value || 'christmas'));
  }
};

const animate = () => {
  if (!canvasRef.value) return;
  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  particles.forEach(p => {
    p.update(canvasRef.value!.height);
    p.draw(ctx);
  });

  animationFrame = requestAnimationFrame(animate);
};

// Santa Animation Logic
const startSantaRun = () => {
  if (currentHoliday.value !== 'christmas') return;
  
  const run = () => {
    showSanta.value = true;
    santaX.value = -200;
    santaY.value = Math.random() * (window.innerHeight / 2); // Top half of screen
    
    const duration = 10000; // 10s to cross screen
    const startTime = performance.now();
    
    const move = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        santaX.value = -200 + (window.innerWidth + 400) * progress;
        // Add some sine wave bobbing
        santaY.value += Math.sin(progress * 10) * 2;
        requestAnimationFrame(move);
      } else {
        showSanta.value = false;
        // Schedule next run in 30-60 seconds
        setTimeout(run, Math.random() * 30000 + 30000);
      }
    };
    requestAnimationFrame(move);
  };

  // First run after a short delay
  setTimeout(run, 5000);
};

onMounted(() => {
  checkDate();
  if (currentHoliday.value) {
    initParticles();
    animate();
    window.addEventListener('resize', initParticles);
    startSantaRun();
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
  window.removeEventListener('resize', initParticles);
});
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" v-if="currentHoliday">
    <!-- Snow/Rain Canvas -->
    <canvas ref="canvasRef" class="absolute inset-0"></canvas>

    <!-- Christmas Elements -->
    <div v-if="currentHoliday === 'christmas'">
      <!-- Flying Santa -->
      <div 
        v-if="showSanta"
        class="absolute z-10 text-6xl filter drop-shadow-lg transition-transform will-change-transform"
        :style="{ transform: `translate(${santaX}px, ${santaY}px) rotate(10deg)` }"
      >
        🎅🛷🦌
      </div>

      <!-- Decorative Trees (Bottom Corners) -->
      <div class="fixed bottom-0 left-4 text-6xl opacity-80 animate-bounce-slow">🎄</div>
      <div class="fixed bottom-0 right-4 text-6xl opacity-80 animate-bounce-slow" style="animation-delay: 1s;">🎄</div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}
</style>
