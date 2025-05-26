import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

interface SearchBarProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  onSearch
}) => {
  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-xl mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <Input
          label="Search by Name / Service"
          placeholder="e.g., Cardiology, City Hospital"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
          icon={<i className="fas fa-search text-slate-400"></i>}
        />
        <Input
          label="Location (City / Area)"
          placeholder="e.g., Wellness City, Downtown"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
          icon={<i className="fas fa-map-marker-alt text-slate-400"></i>}
        />
        <Button onClick={onSearch} className="w-full md:w-auto h-11" variant="primary">
          <i className="fas fa-search mr-2"></i>Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;