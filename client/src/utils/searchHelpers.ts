/**
 * Returns the message to show when the search results are empty or loading.
 */
export const getEmptyMessage = (loading: boolean, submittedQuery: string): string => {
  if (loading) {
    return 'Searching breweries...';
  }

  if (!submittedQuery.trim()) {
    return 'Enter a search term to find breweries.';
  }

  return `No breweries found for “${submittedQuery}”.`;
};

/**
 * Returns a status message indicating how many breweries were found.
 */
export const getStatusMessage = (loading: boolean, count: number): string => {
  if (loading) {
    return 'Loading results...';
  }

  return `${count} breweries found`;
};

/**
 * Checks if the search button should be disabled.
 */
export const isSearchDisabled = (loading: boolean, searchInput: string): boolean => {
  return loading || !searchInput.trim();
};
