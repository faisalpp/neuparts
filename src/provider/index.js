'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const StoreData = createContext(null);

function Context({ children }) {
  const searchParams = useSearchParams();
  const [partNo, setPartNo] = useState(searchParams.get('partno') ? searchParams.get('partno') : '');
  const [modelNo, setModelNo] = useState(searchParams.get('modelno') ? searchParams.get('modelno') : '');
  const [manufacturer, setManufacturer] = useState(searchParams.get('manufacturer') ? searchParams.get('manufacturer') : '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('selectedCategory') ? searchParams.get('selectedCategory') : '');
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [result, setResult] = useState('');
  const [step, setStep] = useState(0);
  // Product Filters Default Values
  const defaultMinPrice = 9;
  const defaultMaxPrice = 8000;

  const router = useRouter();

  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  // Fetch model numbers when the component mounts
  const debouncedFetchModelSuggestions = debounce(async (query) => {
    if (!query) {
      setModelSuggestions([]);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await fetch(`/api/front/product/models?query=${query}`);
      const data = await response.json();
      setModelSuggestions(data.modelNos || []);
      setShowSuggestions(true);
      setSearchLoading(false);
    } catch (error) {
      console.error('Failed to fetch model numbers:', error);
      setSearchLoading(false);
    }
  }, 500);

  const handleModelNoChange = (e) => {
    const value = e;
    setModelNo(value);
    setError('');
    debouncedFetchModelSuggestions(value);
  };

  const handleSuggestionClick = (model) => {
    setModelNo(model);
    setShowSuggestions(false); // Hide suggestions when a suggestion is clicked
    setError(''); // Clear any previous error
  };

  const filteredModels = modelSuggestions.filter((model) => model.toLowerCase().includes(modelNo.toLowerCase()));

  const SearchResult = async (tab = 'all') => {
    if (tab === 'browse-by' && (!manufacturer || !selectedCategory)) {
      return; // Exit early if required browse-by fields are not provided
    } else if (tab !== 'browse-by' && !modelNo && !partNo) {
      return; // Exit early if required model or part number fields are not provided
    }

    try {
      setSearchLoading(true);

      const searchData = tab === 'browse-by' ? { manufacturer, selectedCategory } : { model_no: modelNo, part_number: partNo };

      const response = await fetch('/api/front/product/search/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchData),
      });

      const data = await response.json();

      // For tab = 'browse-by', set modelNo and partNo from the first card
      if (tab === 'browse-by' && data.firstCard) {
        setModelNo(data.firstCard.model_no);
        setPartNo(data.firstCard.part_no);
      }

      setResult(data);

      setStep(modelNo ? 2 : partNo ? 1 : 0);

      setSearchLoading(false);
    } catch (error) {
      console.error('Failed to fetch model numbers:', error);
    }
  };

  const handleSearchClick = async (tab = 'all') => {
    const isModel = modelSuggestions.includes(modelNo);

    // Validate modelNo only for non-'browse-by' tabs
    if (modelNo && !isModel && tab !== 'browse-by') {
      setError('Invalid model number.');
    } else {
      await SearchResult(tab); // Pass the tab to SearchResult

      // Conditionally build the URL based on the tab type
      const queryParams = new URLSearchParams();

      if (tab === 'browse-by') {
        if (manufacturer) queryParams.append('manufacturer', manufacturer);
        if (selectedCategory) queryParams.append('category', selectedCategory);
      } else {
        if (modelNo) queryParams.append('modelno', modelNo);
        if (partNo) queryParams.append('partno', partNo);
      }

      // Append the tab parameter to URL
      queryParams.append('tab', tab);
      queryParams.append('sale', true);

      if (tab != 'noroute') {
        // Navigate to the URL with only relevant query parameters
        router.push(`/products?${queryParams.toString()}`);
      }
    }
  };

  useEffect(() => {
    debouncedFetchModelSuggestions();
    SearchResult();
  }, []);

  return (
    <StoreData.Provider
      value={{
        partNo,
        modelNo,
        manufacturer,
        selectedCategory,
        filteredModels,
        showSuggestions,
        modelSuggestions,
        error,
        searchLoading,
        result,
        step,
        defaultMinPrice,
        defaultMaxPrice,
        setError,
        setModelSuggestions,
        setPartNo,
        setModelNo,
        setManufacturer,
        setSelectedCategory,
        handleModelNoChange,
        handleSuggestionClick,
        SearchResult,
        handleSearchClick,
      }}
    >
      {children}
    </StoreData.Provider>
  );
}

export default Context;
