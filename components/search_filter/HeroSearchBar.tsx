import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

interface HeroSearchBarProps {
  onSearch: (keyword: string, location: string) => void;
}

const HeroSearchBar: React.FC<HeroSearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-700"
      aria-label="Healthcare provider search"
    >
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <div className="w-full sm:flex-1">
          <Input
            id="hero-keyword-search"
            placeholder="Search by name, specialty..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="Search by name or specialty"
            className="py-3 text-base bg-slate-700/70 border-slate-600"
            icon={<i className="fas fa-search text-slate-400"></i>}
          />
        </div>
        <div className="hidden sm:block h-6 border-l border-slate-600"></div> {/* Vertical Separator for sm+ */}
         <div className="w-full sm:flex-1">
          <Input
            id="hero-location-search"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Search by location"
            className="py-3 text-base bg-slate-700/70 border-slate-600"
            icon={<i className="fas fa-map-marker-alt text-slate-400"></i>}
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto px-8 py-3.5">
          Search
        </Button>
      </div>
    </form>
  );
};

export default HeroSearchBar;