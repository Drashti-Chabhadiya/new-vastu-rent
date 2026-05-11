import { 
  Bell, 
  Calendar, 
  ChevronDown,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-2 md:gap-6">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors lg:hidden"
        >
          <Menu size={22} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-lg md:text-xl font-bold text-dash-text">Dashboard</h2>
          <p className="hidden md:block text-sm text-dash-text-muted">Welcome back! Here's what's happening with your platform.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Date Range Picker Placeholder - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer transition-all">
          <Calendar size={18} className="text-dash-text-soft" />
          <span className="text-sm font-medium text-dash-text">May 12 - May 18, 2024</span>
          <ChevronDown size={16} className="text-dash-text-muted" />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 hover:bg-gray-50 rounded-xl text-gray-500 transition-all group">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Profile */}
        <button className="p-1 hover:bg-gray-50 rounded-full transition-all">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-dash-brand rounded-full flex items-center justify-center text-white font-bold text-sm">
            R
          </div>
        </button>
      </div>
    </header>
  );
};
