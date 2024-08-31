'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const StoreData = createContext(null);

function Context({ children }) {
  const searchParams = useSearchParams();
  const [partNo, setPartNo] = useState(searchParams.get('partno') ? searchParams.get('partno') : '');
  const [modelNo, setModelNo] = useState(searchParams.get('modelno') ? searchParams.get('modelno') : '');
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [result, setResult] = useState('');
  const [step, setStep] = useState(0);

  const router = useRouter();

  // Fetch model numbers when the component mounts
  const fetchModelNumbers = async () => {
    try {
      const response = await fetch('/api/front/product/models');
      const data = await response.json();

      setModelSuggestions(data.modelNos);
    } catch (error) {
      console.error('Failed to fetch model numbers:', error);
    }
  };

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
  const filteredModels = modelSuggestions.filter((model) => model?.toLowerCase().includes(modelNo?.toLowerCase()));

  const SearchResult = async () => {
    try {
      setSearchLoading(true);
      if (modelNo || partNo) {
        const response = await fetch('/api/front/product/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ model_no: modelNo, part_number: partNo }),
        });
        const data = await response.json();
        setResult(data);
        if (partNo != '' && modelNo === '') {
          setStep(1);
        } else if (modelNo != '') {
          setStep(2);
        } else {
          setStep(0);
        }
      }
      setSearchLoading(false);
      // console.log(data);
    } catch (error) {
      console.error('Failed to fetch model numbers:', error);
    }
  };

  const handleSearchClick = async () => {
    if (modelNo && !modelSuggestions.includes(modelNo)) {
      setError('Invalid model number.');
    } else {
      // Navigate to the search page
      await SearchResult();
      if (partNo != '' && modelNo === '') {
        setStep(1);
      } else if (modelNo != '') {
        setStep(2);
      } else {
        setStep(0);
      }
      router.push(`/products?modelno=${modelNo}&partno=${partNo}`);
    }
  };

  useEffect(() => {
    fetchModelNumbers();
    SearchResult();
  }, []);

  return <StoreData.Provider value={{ partNo, modelNo, filteredModels, showSuggestions, modelSuggestions, error, searchLoading, result, step, setError, setModelSuggestions, setPartNo, setModelNo, handleModelNoChange, handleSuggestionClick, SearchResult, SearchResult, SearchResult, handleSearchClick }}>{children}</StoreData.Provider>;
}

export default Context;
