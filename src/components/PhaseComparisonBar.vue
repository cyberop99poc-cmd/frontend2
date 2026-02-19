
<template>
  <div class="w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const props = defineProps({
  phases: {
    type: Array,
    required: true
  }
});


// Gradient bar color for a futuristic look
const getGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, '#0ea5e9'); // blue-500
  gradient.addColorStop(0.5, '#818cf8'); // indigo-400
  gradient.addColorStop(1, '#f472b6'); // pink-400
  return gradient;
};

// Grouped bar chart for G, A, Q by phase
// Hardcoded demo values for each category and phase
const phaseLabels = ['Self Audit', "Commander's Audit", 'APTD'];
const G_scores = [75.2, 80.1, 88.5]; // Example values for G
const A_scores = [82.3, 87.0, 91.2]; // Example values for A
const Q_scores = [78.8, 83.5, 89.7]; // Example values for Q

const chartData = computed(() => ({
  labels: phaseLabels,
  datasets: [
    {
      label: 'G',
      backgroundColor: '#fb923c', // orange-400
      data: G_scores,
      borderRadius: 12,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
    {
      label: 'A',
      backgroundColor: '#3b82f6', // blue-500
      data: A_scores,
      borderRadius: 12,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
    {
      label: 'Q',
      backgroundColor: '#22c55e', // green-500
      data: Q_scores,
      borderRadius: 12,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    }
  ]
}));


const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#334155',
        font: { family: 'Inter, sans-serif', size: 14, weight: 'bold' }
      }
    },
    title: {
      display: true,
      text: 'Analisis Skor Audit Mengikut Kategori (G, A, Q)',
      color: '#0ea5e9',
      font: { size: 20, weight: 'bold', family: 'Inter, sans-serif' }
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          const value = context.parsed.y;
          const cat = context.dataset.label;
          const phase = context.chart.data.labels[context.dataIndex];
          return `${cat} (${phase}): ${value}%`;
        }
      }
    },
    datalabels: {
      display: true,
      color: '#0ea5e9',
      font: { weight: 'bold', size: 16 },
      anchor: 'end',
      align: 'end',
      formatter: (value) => `${value}%`
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        color: '#818cf8',
        font: { size: 16, weight: 'bold' }
      },
      grid: { color: 'rgba(129,140,248,0.1)' },
      ticks: { color: '#334155', font: { size: 13 } }
    },
    y: {
      title: {
        display: true,
        text: 'Skor Audit (%)',
        color: '#818cf8',
        font: { size: 16, weight: 'bold' }
      },
      min: 0,
      max: 100,
      grid: { color: 'rgba(129,140,248,0.08)' },
      ticks: { color: '#334155', font: { size: 13 }, stepSize: 20 }
    }
  },
  animation: {
    duration: 1200,
    easing: 'easeOutQuart'
  }
});
</script>
