import { StatCard } from './StatCard';
import { BookingsChart } from '../booking/BookingsChart';
import { CategoryDonut } from '../category/CategoryDonut';
import { RecentOrders } from '../order/RecentOrders';
import { UsersOverviewTable } from '../user/UsersOverviewTable';
import { RevenueChart } from './RevenueChart';
import { TopCities } from './TopCities';
import { RecentListingsTable } from '../listing/RecentListingsTable';
import { RecentReviews } from '../review/RecentReviews';
import { 
  Users, 
  Tag, 
  ShoppingBag, 
  IndianRupee 
} from 'lucide-react';

interface DashboardOverviewProps {
  statsData: any;
  statsLoading: boolean;
  recentUsers: any[];
  usersLoading: boolean;
  recentProducts: any[];
  productsLoading: boolean;
}

export const DashboardOverview = ({
  statsData,
  statsLoading,
  recentUsers,
  usersLoading,
  recentProducts,
  productsLoading
}: DashboardOverviewProps) => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Users"
          value={statsLoading ? "..." : statsData?.totalUsers?.toLocaleString() || "0"}
          change="16.5%"
          isPositive={true}
          icon={Users}
          iconBg="bg-green-50"
          iconColor="bg-primary-light"
          sparklineData={[30, 40, 35, 50, 45, 60, 55]}
        />
        <StatCard 
          title="Total Listings"
          value={statsLoading ? "..." : statsData?.totalListings?.toLocaleString() || "0"}
          change="12.3%"
          isPositive={true}
          icon={Tag}
          iconBg="bg-emerald-50"
          iconColor="bg-primary-light-alt"
          sparklineData={[40, 30, 45, 35, 55, 40, 50]}
        />
        <StatCard 
          title="Total Bookings"
          value={statsLoading ? "..." : statsData?.totalBookings?.toLocaleString() || "0"}
          change="18.7%"
          isPositive={true}
          icon={ShoppingBag}
          iconBg="bg-green-50"
          iconColor="bg-primary-light"
          sparklineData={[20, 35, 30, 45, 40, 50, 45]}
        />
        <StatCard 
          title="Total Revenue"
          value={statsLoading ? "..." : `₹ ${statsData?.totalRevenue?.toLocaleString() || "0"}`}
          change="20.4%"
          isPositive={true}
          icon={IndianRupee}
          iconBg="bg-emerald-50"
          iconColor="bg-primary-light-alt"
          sparklineData={[50, 60, 55, 70, 65, 80, 75]}
        />
      </div>

      {/* Second Row: Bookings, Categories, Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="md:col-span-1 xl:col-span-1">
          <BookingsChart />
        </div>
        <div className="md:col-span-1 xl:col-span-1">
          <CategoryDonut />
        </div>
        <div className="md:col-span-full xl:col-span-1">
          <RecentOrders />
        </div>
      </div>

      {/* Third Row: Users Overview, Revenue Overview, Top Cities */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="md:col-span-full xl:col-span-1">
          <UsersOverviewTable users={recentUsers} isLoading={usersLoading} />
        </div>
        <div className="md:col-span-1 xl:col-span-1">
          <RevenueChart />
        </div>
        <div className="md:col-span-1 xl:col-span-1">
          <TopCities />
        </div>
      </div>

      {/* Fourth Row: Recent Listings, Recent Reviews */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentListingsTable products={recentProducts} isLoading={productsLoading} />
        <RecentReviews />
      </div>
    </div>
  );
};
