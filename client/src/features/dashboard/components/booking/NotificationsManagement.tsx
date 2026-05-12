import { 
  Bell, 
  ChevronRight, 
  Calendar, 
  Search, 
  Filter, 
  ShoppingCart, 
  CreditCard, 
  Star, 
  Truck, 
  AlertCircle, 
  UserPlus, 
  Settings, 
  Mail,
  Check
} from 'lucide-react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Switch } from '#/components/ui/switch';
import { useState } from 'react';

export const NotificationsManagement = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Notifications', count: 32 },
    { id: 'unread', label: 'Unread', count: 8 },
    { id: 'orders', label: 'Orders', count: 12 },
    { id: 'payments', label: 'Payments', count: 6 },
    { id: 'system', label: 'System', count: 14 },
  ];

  const notifications = [
    { id: 1, type: 'order', title: 'New Order Received', desc: 'You have received a new order #ORD-2024-0001 for Home decorations', time: '2 min ago', unread: true, icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 2, type: 'payment', title: 'Payment Received', desc: 'Payment of ₹10,000 received for order #ORD-2024-0001', time: '15 min ago', unread: true, icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 3, type: 'review', title: 'New Review Added', desc: 'Priya Sharma left a 5-star review for Bridal lehenga', time: '1 hour ago', unread: true, icon: Star, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 4, type: 'order', title: 'Order Shipped', desc: 'Order #ORD-2024-0002 has been shipped successfully', time: '2 hours ago', unread: true, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 5, type: 'dispute', title: 'Dispute Raised', desc: 'A dispute has been raised for order #ORD-2024-0003', time: '3 hours ago', unread: true, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 6, type: 'payment', title: 'Refund Processed', desc: 'Refund of ₹2,500 has been processed for order #ORD-2024-0004', time: '5 hours ago', unread: true, icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 7, type: 'user', title: 'New User Registered', desc: 'A new user Neha Agarwal has registered', time: '1 day ago', unread: false, icon: UserPlus, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 8, type: 'system', title: 'System Update', desc: 'System maintenance completed successfully', time: '2 days ago', unread: false, icon: Settings, color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
          <span>Dashboard</span>
          <ChevronRight size={10} className="text-slate-300" />
          <span className="text-dash-brand font-extrabold uppercase tracking-widest">Notifications</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-[#1e293b]">Notifications</h1>
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
             <div className="flex items-center gap-2 px-4 py-1.5 border-r border-slate-50">
               <Calendar size={14} className="text-dash-brand" />
               <span className="text-[11px] font-bold text-slate-600">May 12 - May 18, 2024</span>
               <ChevronRight size={12} className="rotate-90 text-slate-300" />
             </div>
             <div className="p-1.5 px-2 relative">
                <div className="w-6 h-6 rounded-lg bg-dash-brand/5 flex items-center justify-center text-dash-brand">
                  <Bell size={14} />
                </div>
                <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Content & Settings Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Notifications List */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          {/* Custom Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-50 mb-8 overflow-x-auto scrollbar-hide">
             {tabs.map((tab) => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`pb-4 px-1 flex items-center gap-2 whitespace-nowrap transition-all relative ${
                   activeTab === tab.id ? 'text-[#1e293b]' : 'text-slate-400'
                 }`}
               >
                 <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                 <Badge className={`px-2 py-0 h-4 min-w-[1.25rem] rounded-md border-none flex items-center justify-center text-[9px] font-black ${
                   activeTab === tab.id ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                 }`}>
                    {tab.count}
                 </Badge>
                 {activeTab === tab.id && (
                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full animate-in fade-in slide-in-from-bottom-1"></div>
                 )}
               </button>
             ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
             <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <Input 
                  placeholder="Search notifications..." 
                  className="h-10 pl-9 pr-4 bg-slate-50 border-none rounded-xl text-[11px] font-bold focus:ring-0"
                />
             </div>
             <Button variant="ghost" className="h-10 px-4 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] flex items-center gap-2">
                <Filter size={14} /> Filter
             </Button>
          </div>

          <div className="space-y-2">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all cursor-pointer group">
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${notif.bg} ${notif.color} flex items-center justify-center flex-shrink-0`}>
                       <notif.icon size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                       <p className="text-[12px] font-black text-[#1e293b]">{notif.title}</p>
                       <p className="text-[10px] font-bold text-slate-400 mt-0.5 leading-relaxed">{notif.desc}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-300">{notif.time}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${notif.unread ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                 </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
             <p className="text-[11px] font-bold text-slate-400">Showing 1 to 8 of 32 notifications</p>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-400"><ChevronRight size={16} className="rotate-180" /></Button>
                <Button className="w-8 h-8 p-0 rounded-lg bg-emerald-600 text-white font-black text-[11px]">1</Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-600 font-bold text-[11px]">2</Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-600 font-bold text-[11px]">3</Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-600 font-bold text-[11px]">4</Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-400"><ChevronRight size={16} /></Button>
             </div>
          </div>
        </div>

        {/* Right Column: Settings & Summary */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-[15px] font-black text-[#1e293b] mb-1 uppercase tracking-widest">Notification Settings</h3>
             <p className="text-[11px] font-bold text-slate-400 mb-8 leading-relaxed">Manage how you receive notifications.</p>
             
             <div className="space-y-6">
                {[
                  { label: 'Order Notifications', desc: 'Get notified about new orders', icon: ShoppingCart },
                  { label: 'Payment Notifications', desc: 'Get notified about payments', icon: CreditCard },
                  { label: 'Review Notifications', desc: 'Get notified about new reviews', icon: Star },
                  { label: 'Dispute Notifications', desc: 'Get notified about disputes', icon: AlertCircle },
                  { label: 'System Notifications', desc: 'Get notified about system updates', icon: Settings },
                  { label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                           <setting.icon size={16} />
                        </div>
                        <div>
                           <p className="text-[11px] font-black text-[#1e293b]">{setting.label}</p>
                           <p className="text-[9px] font-bold text-slate-400">{setting.desc}</p>
                        </div>
                     </div>
                     <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
                  </div>
                ))}
             </div>
          </div>

          {/* Notification Summary */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-[15px] font-black text-[#1e293b] mb-1 uppercase tracking-widest">Notification Summary</h3>
             <p className="text-[11px] font-bold text-slate-400 mb-8">Overview of your notifications.</p>
             
             <div className="space-y-4">
                {[
                  { label: 'Total Notifications', value: 32, icon: ShoppingCart, color: 'text-blue-500' },
                  { label: 'Unread Notifications', value: 8, icon: AlertCircle, color: 'text-indigo-500' },
                  { label: 'Today\'s Notifications', value: 12, icon: ShoppingCart, color: 'text-amber-500' },
                  { label: 'This Week', value: 32, icon: Calendar, color: 'text-purple-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <item.icon size={14} className={item.color} />
                        <span className="text-[11px] font-black text-slate-500">{item.label}</span>
                     </div>
                     <span className="text-[11px] font-black text-[#1e293b]">{item.value}</span>
                  </div>
                ))}
             </div>

             <button className="w-full mt-8 text-emerald-600 text-[11px] font-black flex items-center justify-center gap-2 hover:underline">
                <Check size={14} /> Mark all as read
             </button>
          </div>
        </div>
      </div>

      {/* Footer Card */}
      <div className="bg-slate-50 p-6 px-10 rounded-[2rem] border border-slate-100 flex items-center justify-between group">
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-50">
               <Bell size={24} />
            </div>
            <div>
               <p className="text-[13px] font-black text-[#1e293b]">Stay Updated!</p>
               <p className="text-[10px] font-bold text-slate-400">Enable push notifications to never miss important updates.</p>
            </div>
         </div>
         <Button className="h-12 px-6 rounded-xl bg-white hover:bg-emerald-600 hover:text-white text-emerald-600 border border-emerald-100 font-black text-[11px] flex items-center gap-2 transition-all shadow-sm">
            <Bell size={14} /> Enable Push Notifications
         </Button>
      </div>
    </div>
  );
};
