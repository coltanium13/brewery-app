<template>
  <section class="space-y-8">
    <div class="grid gap-6 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600 px-6 py-8 text-white shadow-panel lg:grid-cols-[1.4fr_1fr] lg:px-8">
      <div class="space-y-4">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-100">Discover breweries</p>
        <h2 class="max-w-2xl text-3xl font-bold sm:text-4xl">Search breweries by name, city, or state with a typed GraphQL query.</h2>
        <p class="max-w-2xl text-sm text-brand-50 sm:text-base">
          Try a search like <span class="font-semibold text-white">Winston-Salem</span> to see how the Apollo-powered search refreshes results.
        </p>
      </div>

      <div class="rounded-2xl bg-white/10 p-4 backdrop-blur">
        <label for="search" class="text-sm font-medium text-brand-50">Search breweries</label>
        <div class="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="search"
            v-model="searchInput"
            type="text"
            placeholder="Winston-Salem"
            class="min-w-0 flex-1 rounded-2xl border border-white/20 bg-white px-4 py-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-brand-100"
          />
          <button
            type="button"
            class="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isSubmitDisabled"
            @click="runSearch"
          >
            Search
          </button>
        </div>
        <p class="mt-3 text-xs text-brand-100">This page is the finished example. You can build the `local-brews` page in the same style.</p>
      </div>
    </div>

    <section class="space-y-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 class="text-xl font-semibold text-slate-900">Results</h3>
          <p class="text-sm text-slate-500">Showing breweries returned by the `search` GraphQL query.</p>
        </div>
        <p class="text-sm text-slate-500">{{ statusMessage }}</p>
      </div>

      <div v-if="errorMessage" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ errorMessage }}
      </div>

      <BreweryGrid :breweries="breweries" :empty-message="emptyMessage" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import BreweryGrid from '../components/BreweryGrid.vue';
import { graphql } from '../gql';

const SearchBreweriesDocument = graphql(`
  query SearchBreweries($query: String!) {
    search(query: $query) {
      id
      name
      brewery_type
      city
      state
      website_url
    }
  }
`);

const searchInput = ref('Winston-Salem');
const submittedQuery = ref('Winston-Salem');

const { result, loading, error, refetch } = useQuery(SearchBreweriesDocument, {
  query: submittedQuery.value,
});

watch(submittedQuery, async (nextQuery) => {
  await refetch({ query: nextQuery });
});

const breweries = computed(() => result.value?.search ?? []);

const runSearch = async () => {
  const nextQuery = searchInput.value.trim();

  if (!nextQuery) {
    return;
  }

  submittedQuery.value = nextQuery;
};

import { isSearchDisabled, getEmptyMessage, getStatusMessage } from '../utils/searchHelpers';

const isSubmitDisabled = computed(() => isSearchDisabled(loading.value, searchInput.value));

const errorMessage = computed(() => error.value?.message ?? '');

const emptyMessage = computed(() => 
  getEmptyMessage(loading.value, submittedQuery.value)
);

const statusMessage = computed(() => 
  getStatusMessage(loading.value, breweries.value.length)
);
</script>
