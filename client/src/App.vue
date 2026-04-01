<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Brewery App</p>
          <h1 class="text-2xl font-bold text-brand-900">Explore breweries with Vue and Apollo</h1>
        </div>
        <nav class="flex flex-wrap gap-2">
          <RouterLink to="/" class="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900" active-class="bg-brand-600 text-white hover:bg-brand-700 hover:text-white">
            Home
          </RouterLink>
          <RouterLink to="/local-brews" class="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900" active-class="bg-brand-600 text-white hover:bg-brand-700 hover:text-white">
            Local Brews
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>
