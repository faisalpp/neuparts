'use client';
import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const StoreData = createContext(null);

function Context({ children }) {
  const searchParams = useSearchParams();
  const [partNo, setPartNo] = useState(searchParams.get('partno'));
  const [modelNo, setModelNo] = useState(searchParams.get('modelno'));
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Fetch model numbers when the component mounts
    const fetchModelNumbers = async () => {
      try {
        const response = await fetch('/api/front/product/models');
        const data = await response.json();
        console.log(data.modelNos);

        setModelSuggestions(data.modelNos);
      } catch (error) {
        console.error('Failed to fetch model numbers:', error);
      }
    };

    fetchModelNumbers();
  }, []);
  const handleModelNoChange = (e) => {
    setModelNo(e);
    setShowSuggestions(true); // Show suggestions when user types
    setError(''); // Clear any previous error
  };

  const handleSuggestionClick = (model) => {
    setModelNo(model);
    setShowSuggestions(false); // Hide suggestions when a suggestion is clicked
    setError(''); // Clear any previous error
  };
  const filteredModels = modelSuggestions.filter((model) => model.toLowerCase().includes(modelNo.toLowerCase()));

  const SearchResult = async () => {
    try {
      setSearchLoading(true);
      const response = await fetch('/api/front/product/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model_no: modelNo, part_number: partNo }),
      });
      const data = await response.json();
      setResult(data);
      setSearchLoading(false);
      // console.log(data);
    } catch (error) {
      console.error('Failed to fetch model numbers:', error);
    }
  };

  useEffect(() => {
    SearchResult();
  }, ['']);

  return <StoreData.Provider value={{ partNo, modelNo, filteredModels, showSuggestions, modelSuggestions, error, searchLoading, result, setError, setModelSuggestions, setPartNo, handleModelNoChange, handleSuggestionClick, SearchResult, SearchResult, SearchResult }}>{children}</StoreData.Provider>;
}

export default Context;
