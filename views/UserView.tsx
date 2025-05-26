
import React, { useState, useMemo, useCallback } from 'react';
import { MedicalEntity, EntityCategory, UserSubView } from '../types';
import FilterPanel from '../components/search_filter/FilterPanel';
import MedicalEntityCard from '../components/medical_entity/MedicalEntityCard';
import HeroSearchBar from '../components/search_filter/HeroSearchBar';
import ServiceCategoryCard from '../components/custom/ServiceCategoryCard';
import { SERVICE_SECTION_ICONS } from '../constants'; 
import Button from '../components/common/Button';
import useMedicalData from '../hooks/useMedicalData'; // Import the hook


interface UserViewProps {
  // entities prop removed, will be sourced from useMedicalData
  onToggleAdminView: () => void; 
  setActiveUserSubView: (view: UserSubView) => void; 
}

const UserView: React.FC<UserViewProps> = ({ onToggleAdminView, setActiveUserSubView }) => {
  const { entities, loading, error: dataError } = useMedicalData(); // Use the hook
  const [keyword, setKeyword] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EntityCategory | ''>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceChange = (serviceName: string, checked: boolean) => {
    setSelectedServices(prev =>
      checked ? [...prev, serviceName] : prev.filter(s => s !== serviceName)
    );
  };
  
  const handleSearch = (newKeyword: string, newLocation: string) => {
    setKeyword(newKeyword);
    setLocationQuery(newLocation);
    setSelectedCategory(''); 
    const resultsSection = document.getElementById('searchResults');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryCardBrowse = useCallback((category: EntityCategory) => {
    let targetSubView: UserSubView = 'home'; 
    switch (category) {
        case EntityCategory.Doctor: targetSubView = 'doctorsPage'; break;
        case EntityCategory.MedicalShop: targetSubView = 'medicalShopsPage'; break;
        case EntityCategory.Lab: targetSubView = 'labsPage'; break;
        case EntityCategory.Hospital: targetSubView = 'hospitalsPage'; break;
    }
    setActiveUserSubView(targetSubView);
}, [setActiveUserSubView]);


  const filteredEntities = useMemo(() => {
    return entities.filter(entity => {
      const keywordLower = keyword.toLowerCase();
      const locationLower = locationQuery.toLowerCase();

      const matchesKeyword = keywordLower === '' || 
        entity.name.toLowerCase().includes(keywordLower) ||
        (entity.services && entity.services.some(s => s.toLowerCase().includes(keywordLower))) ||
        entity.category.toLowerCase().includes(keywordLower);
      
      const matchesLocation = locationLower === '' ||
        entity.city.toLowerCase().includes(locationLower) ||
        entity.area.toLowerCase().includes(locationLower) ||
        entity.address.toLowerCase().includes(locationLower);

      const matchesCategory = selectedCategory ? entity.category === selectedCategory : true;
      
      const matchesServices = selectedServices.length > 0
        ? selectedServices.every(selService => entity.services && entity.services.includes(selService))
        : true;
      
      return matchesKeyword && matchesLocation && matchesCategory && matchesServices;
    });
  }, [entities, keyword, locationQuery, selectedCategory, selectedServices]);
  
  const featuredProviders = useMemo(() => {
    // Create a more diverse set of featured providers if possible, or take top rated
    // For now, taking first 4, ensuring they are unique if entities change
    return entities
        .slice(0, 4) // take first 4 as a simple approach
        .map(e => ({...e, id: `featured-${e.id}`})); // ensure unique key for featured display
  }, [entities]);


  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-b from-slate-900 to-slate-800/30 rounded-xl -mx-4 sm:-mx-6 lg:-mx-8 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Find the Right <span className="text-sky-400">Healthcare Provider</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Connect with doctors, medical shops, pathology labs, and hospitals - all in one place.
        </p>
        <HeroSearchBar onSearch={handleSearch} />
        <Button variant="outline" size="lg" onClick={onToggleAdminView} className="mt-8 mx-auto">
          Admin Portal Access
        </Button>
      </section>

      {/* Our Healthcare Services Section */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-3 text-center">Our Healthcare Services</h2>
        <p className="text-slate-400 mb-10 text-center max-w-xl mx-auto">
          We provide access to a variety of healthcare services to meet all your medical needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(EntityCategory).map(category => (
            <ServiceCategoryCard
              key={category}
              icon={SERVICE_SECTION_ICONS[category]}
              title={category}
              description={`Find qualified ${category.toLowerCase()} and related services in your area.`}
              onBrowse={() => handleCategoryCardBrowse(category)}
            />
          ))}
        </div>
      </section>

      {/* Featured Healthcare Section */}
      {featuredProviders.length > 0 && (
        <section>
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Featured Healthcare</h2>
            <p className="text-slate-400 mb-10 text-center max-w-xl mx-auto">
            Top-rated healthcare providers in your area.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProviders.map(entity => (
                <MedicalEntityCard key={entity.id} entity={entity} isFeatured={true} />
            ))}
            </div>
        </section>
      )}

      {/* Search Results and Filters Section */}
      <section id="searchResults" className="pt-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {keyword || selectedCategory || locationQuery || selectedServices.length > 0 ? 'Search Results' : 'Explore All Providers'}
        </h2>
        <FilterPanel
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedServices={selectedServices}
          onServiceChange={handleServiceChange}
          hideCategoryFilter={false} 
        />
        {loading && (
            <div className="text-center py-12">
                <i className="fas fa-spinner fa-spin fa-3x text-sky-400"></i>
                <p className="text-slate-300 mt-4">Loading providers...</p>
            </div>
        )}
        {!loading && dataError && (
            <div className="text-center py-12 bg-red-900/30 text-red-300 p-6 rounded-lg">
                <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
                <p className="text-2xl mb-2">Error Loading Data</p>
                <p>{dataError}</p>
                <Button variant="primary" onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
            </div>
        )}
        {!loading && !dataError && filteredEntities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntities.map(entity => (
              <MedicalEntityCard key={entity.id} entity={entity} />
            ))}
          </div>
        ) : (
          !loading && !dataError && ( // Only show "no results" if not loading and no error
            <div className="text-center py-12">
                <i className="fas fa-search-minus fa-4x text-slate-500 mb-6"></i>
                <p className="text-2xl text-slate-300 mb-2">No results found.</p>
                <p className="text-slate-400">Try adjusting your search or filter criteria, or explore our categories above.</p>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default UserView;