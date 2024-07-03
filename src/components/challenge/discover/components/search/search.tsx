'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { search } from '@/lib/api';
import { Search as SearchIcon, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { SearchResultGroup } from './';
import debounce from 'lodash.debounce';
import { cn } from '@/lib/utils';

const initialSearchResults = {
  products: [],
  categories: [],
  artists: [],
};

export function Search() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResults>(initialSearchResults);
  const [suggestionsOpen, setSuggestionsOpen] = useState<boolean>(false);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultsCount, setResultsCount] = useState<number>(0);

  const doSearch = async (searchQ: string) => {
    if (!searchQ) return;
    const { products, categories, artists } = await search(searchQ);

    setResults({ products, categories, artists });
    setIsLoading(false);
  };

  const debouncedSearch = useCallback(
    debounce((query) => doSearch(query), 750),
    [],
  );

  const clear = () => {
    setQuery('');
    setSuggestionsOpen(false);
  };

  useEffect(() => {
    setResultsCount(
      results.categories.length +
        results.products.length +
        results.artists.length,
    );

    const hasResultsNow =
      results.products.length > 0 ||
      results.categories.length > 0 ||
      results.artists.length > 0;

    setHasResults(hasResultsNow);

    if (hasResultsNow) setSuggestionsOpen(true);
  }, [results]);

  useEffect(() => {
    if (!query) {
      setResults(initialSearchResults);
      setSuggestionsOpen(false);
    }
  }, [query]);

  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 z-[3] h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => {
          if (e.target.value !== query) setIsLoading(true);
          setQuery(e.target.value);
          debouncedSearch(e.target.value);
        }}
        onBlur={() => setSuggestionsOpen(false)}
        onFocus={() => hasResults && setSuggestionsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') clear();
        }}
        placeholder="Search products"
        className="relative z-[2] bg-white pl-10"
      />
      {query && (
        <Button
          className="absolute right-3.5 top-1/2 z-[2] h-5 w-5 -translate-y-1/2"
          size="icon"
          variant="ghost"
          onClick={() => clear()}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {(suggestionsOpen || query) && (
        <datalist
          className={cn(
            'absolute bottom-0 z-[1] block h-max w-full origin-top translate-y-[calc(100%-1px)] border border-t-0 border-foreground bg-white *:border-b *:border-foreground before:pointer-events-none before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:bg-white/85 before:opacity-0',
            isLoading && 'pointer-events-none min-h-32 before:opacity-100',
          )}
        >
          {isLoading && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-none">
              <div className="decoration-none animate-loading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 199.86 200"
                >
                  <path
                    fill="currentColor"
                    d="m199.86,100.48c0,.36-.18.75-.55,1.16-.36.41-.73.61-1.09.61l-77.98,6.13,50.85,59.44c.09.09.16.23.2.41.04.18.07.5.07.95,0,.36-.02.61-.07.75-.05.14-.11.25-.2.34l-.82.95c-.09.09-.2.16-.34.2-.14.05-.39.07-.75.07-.46,0-.77-.02-.95-.07-.18-.04-.32-.11-.41-.2l-59.58-50.85-6.13,77.85c0,.45-.16.86-.48,1.23-.32.36-.71.55-1.16.55h-1.09c-.46,0-.84-.16-1.16-.48s-.48-.75-.48-1.3l-6.13-77.85-59.58,50.85c-.09.09-.3.2-.61.34-.32.14-.57.2-.75.2-.09,0-.27-.07-.55-.2-.27-.14-.46-.25-.55-.34l-.82-.95c-.18-.09-.32-.25-.41-.48-.09-.23-.14-.43-.14-.61,0-.27.04-.52.14-.75.09-.23.23-.43.41-.61l50.72-59.44L1.64,102.25c-.46,0-.84-.16-1.16-.48-.32-.32-.48-.75-.48-1.3v-1.09c0-.36.16-.73.48-1.09.32-.36.7-.55,1.16-.55l77.85-6.13L28.77,32.17c-.09-.09-.16-.23-.2-.41-.05-.18-.07-.55-.07-1.09,0-.36.02-.61.07-.75.04-.14.11-.25.2-.34l.82-.82c.09-.09.2-.16.34-.2.14-.04.39-.07.75-.07.45,0,.77.02.95.07.18.05.32.11.41.2l59.58,50.85L97.75,1.64c0-.36.18-.73.55-1.09.36-.36.73-.55,1.09-.55h1.09c.36,0,.73.18,1.09.55.36.36.55.73.55,1.09l6.13,77.98,59.58-50.85c.09-.09.23-.16.41-.2.18-.04.5-.07.95-.07.36,0,.61.02.75.07.14.05.25.11.34.2l.82.82c.09.09.16.2.2.34.04.14.07.39.07.75,0,.55-.02.91-.07,1.09-.05.18-.11.32-.2.41l-50.85,59.44,77.98,6.13c.36,0,.73.2,1.09.61.36.41.55.75.55,1.02v1.09Z"
                  />
                </svg>
              </div>
            </div>
          )}
          {hasResults && (
            <>
              {/* CATEGORIES */}
              {results.categories.length ? (
                <SearchResultGroup
                  title="Categories"
                  type="category"
                  results={results.categories}
                />
              ) : null}
              {/* PRODUCTS */}
              {results.products.length ? (
                <SearchResultGroup
                  title="Products"
                  type="product"
                  results={results.products}
                />
              ) : null}
              {/* ARTISTS */}
              {results.artists.length ? (
                <SearchResultGroup
                  title="Artists"
                  type="artist"
                  results={results.artists}
                />
              ) : null}
            </>
          )}
          {!isLoading && !hasResults && (
            <div className="border-none p-4 text-center">No results found.</div>
          )}
        </datalist>
      )}
    </div>
  );
}
