<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// UI State
const q = ref('');
const openNotif = ref(false);

const notifications = ref([
  { title: 'Fee overdue: Karim Ali', time: '2h ago', type: 'alert' },
  { title: 'New student enrolled: Sumaiya', time: '1d ago', type: 'info' },
  { title: 'Exam schedule updated', time: '3d ago', type: 'alert' },
]);

const cards = ref([
  { label: 'Students', value: '1,245', delta: 12, icon: 'student', spark: [3,5,6,7,6,8,9] },
  { label: 'Teachers', value: '82', delta: 5, icon: 'teacher', spark: [1,2,2,3,3,4,4] },
  { label: 'Classes', value: '36', delta: -2, icon: 'class', spark: [6,6,5,5,4,4,3] },
  { label: 'Attendance', value: '95%', delta: 3, icon: 'attendance', spark: [90,92,93,94,95,95,95] },
  { label: 'Fees Collected', value: 'BDT 1,20,000', delta: 10, icon: 'fees', spark: [50,60,65,70,75,80,90] },
  { label: 'Exams', value: '5 Upcoming', delta: 0, icon: 'exam', spark: [1,2,1,2,3,2,1] },
]);

const events = ref([
  { date: '12 Jul', title: 'Term Exam', meta: 'Class 9-10', color: 'bg-blue-500' },
  { date: '20 Jul', title: 'Parents Meeting', meta: 'All classes', color: 'bg-green-500' },
  { date: '25 Jul', title: 'Sports Day', meta: 'Open', color: 'bg-orange-400' },
]);

const payments = ref([
  { student: 'Rahim Uddin', date: 'Aug 1, 2025', amount: 'BDT 2,000', status: 'paid' },
  { student: 'Karim Ali', date: 'Aug 3, 2025', amount: 'BDT 1,500', status: 'pending' },
]);

const recentStudents = ref([
  { name: 'Rahim Uddin', email: 'rahim@example.com', class: '10', enrolled: 'Jan 15, 2025', status: 'Active' },
  { name: 'Karim Ali', email: 'karim@example.com', class: '9', enrolled: 'Jan 10, 2025', status: 'Pending' },
  { name: 'Sumaiya Akter', email: 'sumaiya@example.com', class: '8', enrolled: 'Jan 8, 2025', status: 'Active' },
]);

const birthdays = ref([
  { name: 'Mitu Sultana', type: 'Student', date: 'Aug 12' },
  { name: 'Mr. Rahman', type: 'Teacher', date: 'Aug 14' },
]);

const activityFeed = ref([
  { text: 'Rahim Uddin enrolled in Class 10', time: '2h ago' },
  { text: 'Karim Ali fee payment pending', time: '5h ago' },
  { text: 'Sumaiya Akter attended Math exam', time: '1d ago' },
]);

// Chart refs (canvas elements)
const attendanceChart = ref(null);
const admissionChart = ref(null);

// Chart instances to destroy before recreating
let attendanceChartInstance = null;
let admissionChartInstance = null;

// Fixed attendance data and labels (no loop, no random)
const attendanceLabels = ['D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12','D13','D14','D15','D16','D17','D18','D19','D20','D21','D22','D23','D24','D25','D26','D27','D28','D29','D30'];
const attendanceData = [90, 91, 92, 93, 94, 95, 95, 95, 94, 93, 92, 91, 90, 91, 92, 93, 94, 95, 95, 95, 94, 93, 92, 91, 90, 91, 92, 93, 94, 95];

onMounted(async () => {
  await nextTick();

  // Mini sparklines for cards
  cards.value.forEach((c, idx) => {
    const el = document.querySelector(`#spark${idx}`);
    if (!el) return;

    new Chart(el.getContext('2d'), {
      type: 'line',
      data: {
        labels: c.spark.map((_, i) => i + 1),
        datasets: [{
          data: c.spark,
          borderColor: '#6366F1', // Indigo-500
          borderWidth: 2,
          fill: false,
          tension: 0.3,
          pointRadius: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { display: false }, y: { display: false } },
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
      },
    });
  });

  // Destroy previous attendance chart if exists
  if (attendanceChartInstance) {
    attendanceChartInstance.destroy();
    attendanceChartInstance = null;
  }

  // Create attendance chart with fixed data
  attendanceChartInstance = new Chart(attendanceChart.value.getContext('2d'), {
    type: 'line',
    data: {
      labels: attendanceLabels,
      datasets: [{
        label: 'Attendance %',
        data: attendanceData,
        borderColor: '#10B981', // Emerald-500
        backgroundColor: 'rgba(16,185,129,0.2)',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } },
    },
  });

  // Destroy previous admissions chart if exists
  if (admissionChartInstance) {
    admissionChartInstance.destroy();
    admissionChartInstance = null;
  }

  // Admissions bar chart data
  const admissionLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const admissionData = [12,18,9,14,15,20,22,17,10,11,8,6];

  admissionChartInstance = new Chart(admissionChart.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: admissionLabels,
      datasets: [{
        label: 'Admissions',
        data: admissionData,
        backgroundColor: '#3B82F6', // Blue-500
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
});

</script>

<style>
canvas {
  width: 100% !important;
  height: 70px !important;  
}
</style>


<template>
  <AuthenticatedLayout>
    <Head title="Dashboard" />

    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        Dashboard
      </h2>
    </template>

    <div class="">
      <main>
        <div class="max-w-7xl mx-auto p-4 md:p-6 space-y-8"> 

          <!-- Stat Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(c, idx) in cards"
              :key="idx"
              class="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center"
            >
              <div>
                <p class="text-xs text-gray-400 font-medium">{{ c.label }}</p>
                <p class="mt-2 text-2xl font-semibold text-gray-800">{{ c.value }}</p>
                <p :class="c.delta > 0 ? 'text-green-500' : 'text-red-500'" class="text-sm mt-1">
                  {{ c.delta > 0 ? '+' + c.delta + '%' : c.delta + '%' }}
                  <span class="text-gray-400">from last month</span>
                </p>
              </div>
              <div class="flex flex-col items-end">
                <!-- icons based on label --> 

                <canvas :id="'spark' + idx" class="!w-30 h-8 mt-2"></canvas>
              </div>
            </div>
          </div>

          <!-- Big Charts -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-2xl shadow-sm p-5 lg:col-span-2">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-800">Attendance Trend</h3>
                <p class="text-sm text-gray-500">Last 30 days</p>
              </div>
              <canvas ref="attendanceChart" class="w-full !h-[300px]"></canvas>
            </div>

            <div class="bg-white rounded-2xl shadow-sm p-5">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-800">Monthly Admissions</h3>
                <p class="text-sm text-gray-500">Year 2025</p>
              </div>
              <canvas ref="admissionChart" class="w-full !h-[300px] "></canvas>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-2xl shadow-sm p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button class="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-300 hover:shadow-md">
                <svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Student</span>
              </button>

              <button class="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-300 hover:shadow-md">
                <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a4 4 0 014-4h1" />
                </svg>
                <span>Mark Attendance</span>
              </button>

              <button class="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-300 hover:shadow-md">
                <svg class="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 6h18M3 14h18" />
                </svg>
                <span>Schedule Exam</span>
              </button>

              <button class="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-300 hover:shadow-md">
                <svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h-4m0 0v4m0-4v-4m0 4h4" />
                </svg>
                <span>Send Announcement</span>
              </button>
            </div>
          </div>

          <!-- Recent Students + Upcoming Events -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-2xl shadow-sm p-5 lg:col-span-2">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Students</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full text-left text-sm">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2">Name</th>
                      <th class="px-4 py-2">Email</th>
                      <th class="px-4 py-2">Class</th>
                      <th class="px-4 py-2">Enrolled</th>
                      <th class="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(student, idx) in recentStudents"
                      :key="idx"
                      class="border-b hover:bg-gray-50"
                    >
                      <td class="px-4 py-2">{{ student.name }}</td>
                      <td class="px-4 py-2">{{ student.email }}</td>
                      <td class="px-4 py-2">{{ student.class }}</td>
                      <td class="px-4 py-2">{{ student.enrolled }}</td>
                      <td class="px-4 py-2">
                        <span
                          :class="{
                            'bg-green-100 text-green-700': student.status === 'Active',
                            'bg-yellow-100 text-yellow-700': student.status === 'Pending',
                          }"
                          class="px-2 py-1 rounded-full text-xs font-semibold"
                          >{{ student.status }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm p-5">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
              <ul class="space-y-4 text-gray-700">
                <li
                  v-for="(event, idx) in events"
                  :key="idx"
                  class="flex items-center gap-3"
                >
                  <div
                    class="flex-shrink-0 rounded-lg p-2 text-white text-sm font-semibold"
                    :class="event.color"
                    style="width:48px; text-align:center"
                  >
                    {{ event.date }}
                  </div>
                  <div>
                    <p class="font-semibold">{{ event.title }}</p>
                    <p class="text-xs">{{ event.meta }}</p>
                  </div>
                </li>
              </ul>

              <div class="mt-8">
                <h4 class="font-semibold mb-2 text-gray-800">Birthdays</h4>
                <ul class="space-y-2 text-gray-600 text-sm">
                  <li
                    v-for="(b, idx) in birthdays"
                    :key="idx"
                    class="flex justify-between"
                  >
                    <span>{{ b.name }} ({{ b.type }})</span>
                    <span class="text-gray-400">{{ b.date }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Activity Feed -->
          <div class="bg-white rounded-2xl shadow-sm p-4">
            <h3 class="font-semibold text-gray-800 mb-3">Activity Feed</h3>
            <ul class="space-y-3 text-gray-700 text-sm">
              <li v-for="(act, idx) in activityFeed" :key="idx" class="flex justify-between">
                <span>{{ act.text }}</span>
                <span class="text-gray-400 text-xs">{{ act.time }}</span>
              </li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  </AuthenticatedLayout>
</template>
