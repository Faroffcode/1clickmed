import React from 'react';
import { EntityCategory } from '../../types';
import QuickActionButton from './QuickActionButton';
import OverviewCard from './OverviewCard';

interface DashboardContentProps {
  counts: Record<EntityCategory, number>;
  onQuickAdd: (category: EntityCategory) => void;
  onViewDetails: (category: EntityCategory) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ counts, onQuickAdd, onViewDetails }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Admin Dashboard</h1>
        <p className="mt-1 text-slate-400">Manage your healthcare provider network from one central location.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-slate-200 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton
            label="Add Doctor"
            iconClass="fas fa-user-plus"
            color="blue"
            onClick={() => onQuickAdd(EntityCategory.Doctor)}
          />
          <QuickActionButton
            label="Add Medical Shop"
            iconClass="fas fa-cart-plus"
            color="green"
            onClick={() => onQuickAdd(EntityCategory.MedicalShop)}
          />
          <QuickActionButton
            label="Add Lab"
            iconClass="fas fa-flask-medical" // Changed icon to fa-flask-medical or similar
            color="purple"
            onClick={() => onQuickAdd(EntityCategory.Lab)}
          />
          <QuickActionButton
            label="Add Hospital"
            iconClass="fas fa-hospital-user"
            color="red"
            onClick={() => onQuickAdd(EntityCategory.Hospital)}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <OverviewCard
            title="Doctors"
            count={counts[EntityCategory.Doctor] || 0}
            iconClass="fas fa-users"
            color="blue"
            onViewDetails={() => onViewDetails(EntityCategory.Doctor)}
          />
          <OverviewCard
            title="Medical Shops"
            count={counts[EntityCategory.MedicalShop] || 0}
            iconClass="fas fa-store-alt"
            color="green"
            onViewDetails={() => onViewDetails(EntityCategory.MedicalShop)}
          />
          <OverviewCard
            title="Laboratories"
            count={counts[EntityCategory.Lab] || 0}
            iconClass="fas fa-microscope"
            color="purple"
            onViewDetails={() => onViewDetails(EntityCategory.Lab)}
          />
          <OverviewCard
            title="Hospitals"
            count={counts[EntityCategory.Hospital] || 0}
            iconClass="fas fa-hospital-alt" // Changed icon for consistency
            color="red"
            onViewDetails={() => onViewDetails(EntityCategory.Hospital)}
          />
        </div>
      </section>
      
      {/* Placeholder for future sections like recent activity or charts */}
      {/* 
      <section>
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Recent Activity</h2>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <p className="text-slate-400">No recent activity to display.</p>
        </div>
      </section>
      */}
    </div>
  );
};

export default DashboardContent;