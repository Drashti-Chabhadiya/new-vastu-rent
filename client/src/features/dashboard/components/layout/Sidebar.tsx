import { 
  LayoutDashboard, 
  Users, 
  List, 
  Grid, 
  ShoppingCart, 
  Calendar, 
  CreditCard, 
  Star, 
  AlertCircle, 
  Ticket, 
  Bell, 
  BarChart3, 
  Settings,
  ChevronRight,
  TrendingUp,
  ChevronDown,
  X,
  Trash2
} from 'lucide-react';
import { cn } from '#/lib/utils';

import { authClient } from '#/lib/auth/auth-client';
import { Button } from '#/components/ui/button';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, active, hasSubmenu, onClick }: NavItemProps) => (
  <div 
    onClick={onClick}
    className={cn(
      "flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group",
      active ? "bg-dash-brand-soft text-dash-brand" : "text-dash-text-soft hover:bg-gray-50 hover:text-dash-text"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={cn(
        "transition-colors",
        active ? "text-dash-brand" : "text-dash-text-muted group-hover:text-dash-text-soft"
      )} />
      <span className="text-[15px] font-medium">{label}</span>
    </div>
    {hasSubmenu && <ChevronRight size={16} className={cn(
      "transition-colors",
      active ? "text-dash-brand" : "text-dash-text-muted"
    )} />}
  </div>
);

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ currentTab, onTabChange, isOpen, onClose }: SidebarProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <aside className={cn(
      "w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-[60] transition-transform duration-300",
      "lg:translate-x-0", // Always show on large screens
      isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full" // Toggle on mobile/tablet
    )}>
      {/* Logo & Close Button (Close only on mobile) */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-light">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
              <path d="M12 2v20" opacity="0.2"></path>
              <path d="M2 12h20" opacity="0.2"></path>
              <path d="M7 10s.5-1 1-1 1 .5 1 1" stroke="currentColor" strokeWidth="1.5"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-dash-text leading-none">vastu-rent</h1>
            <p className="text-[10px] text-dash-text-muted mt-1 tracking-wider uppercase font-semibold">
              {user?.role === 'superAdmin' ? 'Super Admin' : 
               user?.role === 'admin' ? 'Admin' : 
               user?.role === 'owner' ? 'Owner' : 'User'} Dashboard
            </p>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="md:hidden text-gray-400 hover:text-gray-600 rounded-full"
        >
          <X size={20} />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        <NavItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={currentTab === 'overview'} 
          onClick={() => onTabChange('overview')}
        />
        {(user?.role === 'admin' || user?.role === 'superAdmin') && (
          <NavItem 
            icon={Users} 
            label="Users" 
            active={currentTab === 'users'} 
            onClick={() => onTabChange('users')}
            hasSubmenu 
          />
        )}
        <NavItem 
          icon={List} 
          label="Listings" 
          active={currentTab === 'listings'}
          onClick={() => onTabChange('listings')}
          hasSubmenu 
        />
        {(user?.role === 'admin' || user?.role === 'superAdmin') && (
          <NavItem 
            icon={Grid} 
            label="Categories" 
            active={currentTab === 'categories'}
            onClick={() => onTabChange('categories')}
            hasSubmenu 
          />
        )}
        {(user?.role === 'owner' || user?.role === 'admin' || user?.role === 'superAdmin') && (
          <NavItem 
            icon={ShoppingCart} 
            label="Orders" 
            active={currentTab === 'orders'}
            onClick={() => onTabChange('orders')}
            hasSubmenu 
          />
        )}
        <NavItem 
          icon={Calendar} 
          label="My Bookings" 
          active={currentTab === 'bookings'}
          onClick={() => onTabChange('bookings')}
          hasSubmenu 
        />
        <NavItem 
          icon={CreditCard} 
          label="Payments" 
          active={currentTab === 'payments'}
          onClick={() => onTabChange('payments')}
          hasSubmenu 
        />
        <NavItem 
          icon={Star} 
          label="Reviews" 
          active={currentTab === 'reviews'}
          onClick={() => onTabChange('reviews')}
          hasSubmenu 
        />
        <NavItem 
          icon={AlertCircle} 
          label="Disputes" 
          active={currentTab === 'disputes'}
          onClick={() => onTabChange('disputes')}
          hasSubmenu 
        />
        {user?.role === 'superAdmin' && (
          <NavItem 
            icon={Trash2} 
            label="Delete Requests" 
            active={currentTab === 'delete-requests'}
            onClick={() => onTabChange('delete-requests')}
          />
        )}
        <NavItem 
          icon={Ticket} 
          label="Coupons" 
          active={currentTab === 'coupons'}
          onClick={() => onTabChange('coupons')}
        />
        <NavItem 
          icon={Bell} 
          label="Notifications" 
          active={currentTab === 'notifications'}
          onClick={() => onTabChange('notifications')}
        />
        <NavItem 
          icon={BarChart3} 
          label="Reports" 
          active={currentTab === 'reports'}
          onClick={() => onTabChange('reports')}
          hasSubmenu 
        />
        <NavItem 
          icon={Settings} 
          label="Settings" 
          active={currentTab === 'settings'}
          onClick={() => onTabChange('settings')}
          hasSubmenu 
        />
      </div>

      {/* Premium Card */}
      <div className="p-4">
        <div className="bg-dash-brand rounded-xl p-4 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-yellow-400/20 rounded-lg">
                <TrendingUp size={16} className="text-yellow-400" />
              </div>
              <span className="text-sm font-semibold">Go Premium</span>
            </div>
            <p className="text-xs text-green-100/80 mb-3 leading-relaxed">
              Unlock all premium features and grow your rental business.
            </p>
            <button className="w-full py-2 bg-white text-dash-brand text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
              Upgrade Now
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
          <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
              <img 
                src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} 
                alt={user?.name || 'User'} 
                className="w-10 h-10 rounded-full bg-gray-100 object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-dash-text truncate">{user?.name || 'Anonymous'}</p>
              <p className="text-[11px] text-dash-text-muted truncate uppercase font-bold">{user?.role || 'Guest'}</p>
            </div>
          </div>
          <ChevronDown size={16} className="text-dash-text-muted flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
};
