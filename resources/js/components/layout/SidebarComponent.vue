<script setup>
 
    import logo from "@/assets/images/logo.png";


  import { ref } from 'vue'
  import { Link } from '@inertiajs/vue3'

  const isOpen = ref(false)
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>

 

<template>
    <aside
  :class="sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'"
  class="sidebar fixed left-0 top-0 z-9999 flex h-screen w-[290px] flex-col overflow-y-hidden border-r border-gray-200 bg-white px-5 lg:static lg:translate-x-0"
>
  <!-- SIDEBAR HEADER -->
  <div
    :class="sidebarToggle ? 'justify-center' : 'justify-between'"
    class="flex items-center justify-center gap-2 pt-8 sidebar-header pb-7"
  >
    <a href="/" class="flex justify-center mx-auto">
      <span class="logo" :class="sidebarToggle ? 'hidden' : ''">
        <img class="dark:hidden" :src="logo" alt="Logo" />
        <img
          class="hidden"
          :src="logo"
          alt="Logo"
        />
      </span>

      <img
        class="w-[80px] mx-auto" 
        :src="logo"
        alt="Logo"
      />
    </a>
  </div>
  <!-- SIDEBAR HEADER -->

  <div
    class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar"
  >
    <!-- Sidebar Menu -->
    <nav x-data="{selected: $persist('Dashboard')}">
      <!-- Menu Group -->
      <div>
        <h3 class="mb-4 text-xs uppercase leading-[20px] text-gray-400">
          <span
            class="menu-group-title"
            :class="sidebarToggle ? 'lg:hidden' : ''"
          >
            MENU
          </span>

          <svg
            :class="sidebarToggle ? 'lg:block hidden' : 'hidden'"
            class="mx-auto fill-current menu-group-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z"
              fill=""
            />
          </svg>
        </h3>

        <ul class="flex flex-col gap-4 mb-6">
          <!-- Menu Item Dashboard -->
           <!-- Menu Item Calendar -->
          <li>
            <Link
              :href="route('dashboard')" 
              class="menu-item-inactive menu-item group"
            >
              <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 12h18M3 6h18M3 18h18" />
                  </svg>

              <span
                class="menu-item-text text-black" 
              >
                Dashboard
              </span>
            </Link>
          </li>
          <!-- Menu Item Calendar -->
            <li>
              <!-- Parent Menu -->
              <a
                href="#"
                @click.prevent="isOpen = !isOpen"
                class="flex items-center justify-between text-black hover:bg-[#ffffff15]  hover:text-white menu-item-inactive menu-item group"
              >
                <span class="flex items-center gap-2">
                  <!-- Icon -->
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                  Students
                </span>

                <!-- Arrow -->
                <svg
                  :class="{'rotate-180': isOpen}"
                  class="w-4 h-4 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              <!-- Dropdown Items -->
              <transition name="slide-fade">
                <ul v-if="isOpen" class="pl-6 mt-2 space-y-1">
                  <li>
                    <a href="#" class="block p-2 rounded  text-white hover:bg-[#ffffff15]  hover:text-white">eCommerce</a>
                  </li>
                  <li>
                    <a href="#" class="block p-2 rounded text-white hover:bg-[#ffffff15]  hover:text-white">Analytics</a>
                  </li>
                  <li>
                    <a href="#" class="block p-2 rounded  text-white hover:bg-[#ffffff15]  hover:text-white">CRM</a>
                  </li>
                </ul>
              </transition>
            </li>
          <!-- Menu Item Dashboard -->

          <!-- Menu Item Calendar -->
          <li>
            <a
              href="#" 
              class="menu-item-inactive menu-item group"
            >
              <svg
                :class="(selected === 'Calendar') && (page === 'calendar') ? 'menu-item-icon-active'  :'menu-item-icon-inactive'"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V3.75H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9V19C20.75 20.2426 19.7426 21.25 18.5 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V9V6C3.25 4.75736 4.25736 3.75 5.5 3.75H7.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H16H8ZM19.25 9.75H4.75V19C4.75 19.4142 5.08579 19.75 5.5 19.75H18.5C18.9142 19.75 19.25 19.4142 19.25 19V9.75Z"
                  fill=""
                />
              </svg>

              <span
                class="menu-item-text text-black" 
              >
                Calendar
              </span>
            </a>
          </li>
          <!-- Menu Item Calendar -->
 
        </ul>
      </div>
 
    </nav>
    <!-- Sidebar Menu -->
 
  </div>
</aside>

</template>