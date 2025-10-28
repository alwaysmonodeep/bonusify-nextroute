"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import Image from "next/image";

function SearchBox({ 
  onSearch,
  className = "",
  showSuggestions = true,
  isMobile = false,
  isVisible = true,
  onClose,
  autoFocus = false
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [popularStores, setPopularStores] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current && isVisible) {
      inputRef.current.focus();
    }
  }, [autoFocus, isVisible]);

  // Fetch popular stores on mount
  useEffect(() => {
    if (showSuggestions) {
      fetchPopularStores();
    }
  }, [showSuggestions]);

  // Debounced search
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestionsList(false);
      return;
    }

    if (showSuggestions) {
      timeoutRef.current = setTimeout(() => fetchSuggestions(searchQuery), 400);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [searchQuery, showSuggestions]);

  const fetchPopularStores = async () => {
    try {
      const response = await fetch('/api/search/suggestions?limit=5');
      if (!response.ok) throw new Error('Failed to fetch popular stores');
      
      const data = await response.json();
      let results = data.results || data.suggestions || [];
      
      // Sort by deal value (best deals first)
      results = results.sort((a, b) => {
        const getDeallValue = (store) => {
          if (!store.deal?.maxRateValue) return 0;
          return store.deal.maxRateType === 'fixed' ? 
            store.deal.maxRateValue / 100 : // Convert fixed to percentage equivalent
            store.deal.maxRateValue;
        };
        return getDeallValue(b) - getDeallValue(a);
      });
      
      setPopularStores(results);
    } catch (error) {
      console.error('Error fetching popular stores:', error);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.trim().length < 3) return;

    try {
      const response = await fetch(
        `/api/search/suggestions?q=${encodeURIComponent(query)}&limit=5`
      );
      
      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      const results = data.results || data.suggestions || [];
      
      setSuggestions(results);
      setShowSuggestionsList(results.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
      setShowSuggestionsList(false);
    }
  };

  const handleSearch = (query = searchQuery, suggestion = null) => {
    const searchTerm = query.trim();
    if (!searchTerm) return;

    setShowSuggestionsList(false);
    setSuggestions([]);
    setSearchQuery("");
    
    onSearch?.(searchTerm, suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') setShowSuggestionsList(false);
  };

  const handleSuggestionClick = (suggestion) => {
    const suggestionText = suggestion.name || suggestion.slug || '';
    handleSearch(suggestionText, suggestion);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestionsList(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (searchQuery.trim().length >= 3 && suggestions.length > 0) {
      setShowSuggestionsList(true);
    } else if (searchQuery.trim().length === 0 && popularStores.length > 0) {
      // Show popular stores when no search query
      setShowSuggestionsList(true);
    }
  };

  const formatDeal = (deal) => {
    if (!deal) return '';
    const { qualifier, type, maxRateValue, maxRateType } = deal;
    return [
      qualifier,
      maxRateValue && (maxRateType === 'fixed' ? `₹${maxRateValue}` : `${maxRateValue}%`),
      type
    ].filter(Boolean).join(' ');
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestionsList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className='flex items-center w-full bg-gray-100 rounded-full px-3 py-3'>
        <CiSearch 
          className={`text-gray-800 mr-4 cursor-pointer ${isMobile ? 'text-sm' : 'text-xl'}`}
          onClick={() => handleSearch()}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder='Search for any brand or product'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          className={`flex-1 outline-none text-gray-900 placeholder-gray-800 bg-transparent ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}
        />
        {searchQuery && (
          <MdClose 
            className={`text-gray-500 cursor-pointer hover:text-gray-700 ml-2 ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}
            onClick={handleClear}
          />
        )}
      </div>

      {/* Suggestions */}
      {showSuggestionsList && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-lg max-h-96 overflow-y-auto">
          {/* Show popular stores when no search query, otherwise show search results */}
          {searchQuery.trim().length === 0 && popularStores.length > 0 ? (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
                Top Cashback Stores
              </div>
              {popularStores.map((store, index) => (
                <div
                  key={`popular-${store.slug}-${index}`}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSuggestionClick(store)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      {store.logo && (
                        <div className="mr-3">
                          <Image 
                            src={store.logo} 
                            alt={store.name}
                            width={32}
                            height={32}
                            className="object-contain rounded"
                          />
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-medium text-gray-900 text-xs">
                          {store.name}
                        </h3>
                        <div className="text-blue-600 text-xs font-medium">
                          in Stores
                        </div>
                      </div>
                    </div>
                    
                    {store.deal && (
                      <div className="ml-4">
                        <div className="text-green-600 text-[10px] md:text-xs font-semibold">
                          {formatDeal(store.deal)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : searchQuery.trim().length >= 3 && suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.slug}-${index}`}
                className={`px-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                  index === 0 ? 'py-4' : 'py-3'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    {suggestion.logo && (
                      <div className={index === 0 ? 'mr-4' : 'mr-3'}>
                        <Image 
                          src={suggestion.logo} 
                          alt={suggestion.name}
                          width={index === 0 ? 48 : 35}
                          height={index === 0 ? 48 : 32}
                          className="object-contain rounded"
                        />
                      </div>
                    )}
                    
                    <div>
                      <h3 
                        className={`${index === 0 ? 'font-semibold' : 'font-medium'} text-gray-900 ${
                          isMobile ? 'text-xs' : (index === 0 ? 'text-sm' : 'text-xs')
                        }`}
                        dangerouslySetInnerHTML={{ __html: suggestion.name }}
                      />
                      <div className="text-blue-600 text-[10px] md:text-xs font-medium">
                        in {suggestion.type === 'store' ? 'Stores' : 'Products'}
                      </div>
                    </div>
                  </div>
                  
                  {suggestion.deal && (
                    <div className="ml-4">
                      <div className={`text-green-600 text-[10px] md:text-xs font-semibold ${
                        index === 0 ? 'bg-gray-100 px-4 py-2 rounded-full' : ''
                      }`}>
                        {formatDeal(suggestion.deal)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : searchQuery.trim().length >= 3 ? (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">
              No suggestions found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchBox;