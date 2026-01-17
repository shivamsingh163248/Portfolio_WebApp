import React, { useState } from 'react';
import { searchAPI } from '../services/api';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      const response = await searchAPI.search(query);
      setResults(response.data);
    } catch (err) {
      console.error('Error searching:', err);
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1 className="page-title">🔍 Search</h1>
      <p className="page-description">
        Search across profile, skills, projects, education, and work experience.
      </p>
      
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Try: Python, React, Machine Learning, NIT Delhi..."
      />

      {loading && <Loading message="Searching..." />}
      {error && <Error message={error} />}
      
      {!loading && !error && hasSearched && (
        <SearchResults results={results} />
      )}

      {!hasSearched && (
        <div className="search-suggestions">
          <h3>Suggested Searches</h3>
          <div className="suggestion-tags">
            <button onClick={() => handleSearch('Python')} className="suggestion-tag">Python</button>
            <button onClick={() => handleSearch('React')} className="suggestion-tag">React</button>
            <button onClick={() => handleSearch('Machine Learning')} className="suggestion-tag">Machine Learning</button>
            <button onClick={() => handleSearch('NIT')} className="suggestion-tag">NIT</button>
            <button onClick={() => handleSearch('Web Development')} className="suggestion-tag">Web Development</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
