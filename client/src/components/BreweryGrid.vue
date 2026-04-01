<template>
  <div>
    <div v-if="breweries.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="brewery in breweries"
        :key="brewery.id"
        class="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-panel"
      >
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-lg font-semibold text-slate-900">{{ brewery.name }}</h3>
              <p class="text-sm text-slate-500">{{ formatType(brewery.brewery_type) }}</p>
            </div>
            <span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              {{ brewery.city || 'Unknown city' }}
            </span>
          </div>

          <dl class="space-y-2 text-sm text-slate-600">
            <div class="flex flex-col">
              <dt class="font-medium text-slate-900">Location</dt>
              <dd>{{ [brewery.city, brewery.state].filter(Boolean).join(', ') || 'Unavailable' }}</dd>
            </div>
            <div class="flex flex-col">
              <dt class="font-medium text-slate-900">Type</dt>
              <dd>{{ formatType(brewery.brewery_type) }}</dd>
            </div>
          </dl>
        </div>

        <a
          v-if="brewery.website_url"
          :href="brewery.website_url"
          target="_blank"
          rel="noreferrer"
          class="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Visit Website
        </a>
        <span
          v-else
          class="mt-6 inline-flex items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm font-medium text-slate-400"
        >
          Website unavailable
        </span>
      </article>
    </div>

    <div
      v-else
      class="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500"
    >
      {{ emptyMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface BreweryCardData {
  id: string;
  name: string;
  brewery_type?: string | null;
  city?: string | null;
  state?: string | null;
  website_url?: string | null;
}

defineProps<{
  breweries: BreweryCardData[];
  emptyMessage: string;
}>();

const formatType = (value?: string | null) => {
  if (!value) {
    return 'Unknown type';
  }

  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};
</script>
