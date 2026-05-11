import { useState } from 'react';
import { cn } from '#/lib/utils';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardOverview } from './components/overview/DashboardOverview';
import { UsersManagement } from './components/user/UsersManagement';
import { ListingsManagement } from './components/listing/ListingsManagement';
import { CategoryManagement } from './components/category/CategoryManagement';
import { ReviewsManagement } from './components/review/ReviewsManagement';
import { useAdminStats, useAdminRecentUsers, useAdminRecentProducts } from '#/hook';

const DashboardPage = () => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: recentUsers, isLoading: usersLoading } = useAdminRecentUsers();
  const { data: recentProducts, isLoading: productsLoading } = useAdminRecentProducts();

  const handleManageCategory = (categoryId: string) => {
    setActiveCategoryFilter(categoryId);
    setCurrentTab('listings');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-dash-bg flex overflow-x-hidden">
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setIsSidebarOpen(false); // Close sidebar on mobile after clicking
        }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        "lg:ml-64"
      )}>
        <Header onMenuClick={toggleSidebar} />
        
        <div className="p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          {currentTab === 'overview' ? (
            <DashboardOverview 
              statsData={statsData}
              statsLoading={statsLoading}
              recentUsers={recentUsers}
              usersLoading={usersLoading}
              recentProducts={recentProducts}
              productsLoading={productsLoading}
            />
          ) : currentTab === 'users' ? (
            <UsersManagement />
          ) : currentTab === 'listings' ? (
            <ListingsManagement initialCategoryFilter={activeCategoryFilter} />
          ) : currentTab === 'categories' ? (
            <CategoryManagement onManageCategory={handleManageCategory} />
          ) : currentTab === 'reviews' ? (
            <ReviewsManagement />
          ) : (
            <div className="flex items-center justify-center h-64 text-dash-text-muted">
              Content for {currentTab} is coming soon...
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
export { DashboardPage };
