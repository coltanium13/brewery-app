<template>
  <section
    class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 shadow-panel"
  >
    <div class="mx-auto max-w-2xl space-y-4 text-center">
      <p
        class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600"
      >
        Starter Route
      </p>
      <h2 class="text-3xl font-bold text-slate-900">Local Brews</h2>
      <p class="text-sm text-slate-600 sm:text-base">
        This page is intentionally left as a minimal stub so you can practice
        building the city-based `filter` query flow yourself.
      </p>
      <p class="text-sm text-slate-500">
        Use the `Home` page as your example for Apollo queries, generated
        `graphql()` documents, responsive layout, and card-grid reuse.
      </p>
      <div class="space-x-4">
        <input
          type="text"
          placeholder="City"
          class="border border-slate-300 rounded-lg px-4 py-2"
          v-model="city"
        />
        <select
          name="type"
          id="type"
          class="border border-slate-300 rounded-lg px-4 py-2"
          v-model="type"
        >
          <option value="">All</option>
          <option value="brewpub">Brewpub</option>
          <option value="contract">Contract</option>
          <option value="micro">Micro</option>
          <option value="nano">Nano</option>
          <option value="regional">Regional</option>
          <option value="macro">Macro</option>
          <option value="brewery">Brewery</option>
        </select>
        <button
          class="px-4 py-2 rounded-lg bg-brand-700 hover:bg-brand-600 text-white"
          @click="runSearch"
          :disabled="isSubmitDisabled"
        >
          Search
        </button>
      </div>
    </div>

    <section class="space-y-4">
      <div
        class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h3 class="text-xl font-semibold text-slate-900">Results</h3>
          <p class="text-sm text-slate-500">
            Showing breweries returned by the `search` GraphQL query.
          </p>
        </div>
        <p class="text-sm text-slate-500">{{ statusMessage }}</p>
      </div>

      <div
        v-if="errorMessage"
        class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {{ errorMessage }}
      </div>

      <BreweryGrid :breweries="breweries" :empty-message="emptyMessage" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "../gql";
import { computed, ref, watch } from "vue";
import {
  getEmptyMessage,
  getStatusMessage,
  isSearchDisabled,
} from "../utils/searchHelpers";

import BreweryGrid from "../components/BreweryGrid.vue";

const FilterLocalBreweriesDocument = graphql(`
  query FilterLocalBreweries($city: String!, $type: String!) {
    filter(city: $city, type: $type) {
      id
      name
      brewery_type
      city
      state
      website_url
    }
  }
`);

const city = ref("");
const type = ref("");
const submittedQuery = ref({ city: "", type: "" });

const { result, loading, error, refetch } = useQuery(
  FilterLocalBreweriesDocument,
  {
    city: submittedQuery.value.city,
    type: submittedQuery.value.type,
  },
);

const runSearch = async () => {
  const nextCity = city.value.trim();
  const nextType = type.value.trim();

  if (!nextCity) {
    return;
  }

  submittedQuery.value = { city: nextCity, type: nextType };
};

watch(submittedQuery, async (nextQuery) => {
  await refetch({
    city: nextQuery.city,
    type: nextQuery.type,
  });
});

const breweries = computed(() => result.value?.filter ?? []);

const isSubmitDisabled = computed(() =>
  isSearchDisabled(loading.value, city.value),
);

const errorMessage = computed(() => error.value?.message ?? "");

const emptyMessage = computed(() =>
  getEmptyMessage(loading.value, submittedQuery.value.city),
);

const statusMessage = computed(() =>
  getStatusMessage(loading.value, breweries.value.length),
);
</script>
