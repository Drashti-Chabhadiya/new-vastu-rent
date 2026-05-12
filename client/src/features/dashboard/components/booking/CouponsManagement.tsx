import { 
  Ticket, 
  ChevronRight, 
  Calendar, 
  Search, 
  Plus, 
  Copy, 
  MoreHorizontal, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Zap,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';

export const CouponsManagement = () => {
  const stats = [
    { label: 'Total Coupons', value: '48', sub: '+6 from last month', icon: Ticket, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Coupons', value: '18', sub: '+3 from last month', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Used Coupons', value: '156', sub: '+12 from last month', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Total Discount', value: '₹24,750', sub: '+18% from last month', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const coupons = [
    { code: 'WELCOME10', discount: '10% OFF', upTo: 'Upto ₹200', minOrder: '₹1,000', validity: '12 May 2024 - 31 May 2024', usage: '25 / 100', status: 'Active', color: 'emerald' },
    { code: 'VASTR30', discount: '₹30 OFF', upTo: '', minOrder: '₹500', validity: '10 May 2024 - 25 May 2024', usage: '50 / 200', status: 'Active', color: 'blue' },
    { code: 'SUMMER15', discount: '15% OFF', upTo: 'Upto ₹500', minOrder: '₹2,000', validity: '01 May 2024 - 31 May 2024', usage: '75 / 150', status: 'Active', color: 'purple' },
    { code: 'MEGA20', discount: '20% OFF', upTo: 'Upto ₹800', minOrder: '₹3,000', validity: '20 Apr 2024 - 20 May 2024', usage: '120 / 300', status: 'Inactive', color: 'amber' },
    { code: 'NEWUSER50', discount: '₹50 OFF', upTo: '', minOrder: '₹300', validity: '05 May 2024 - 19 May 2024', usage: '300 / 500', status: 'Active', color: 'rose' },
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'emerald': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'purple': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'amber': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'rose': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
          <span>Dashboard</span>
          <ChevronRight size={10} className="text-slate-300" />
          <span className="text-dash-brand font-extrabold uppercase tracking-widest">Coupons</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-[#1e293b]">Coupons</h1>
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
             <div className="flex items-center gap-2 px-4 py-1.5 border-r border-slate-50">
               <Calendar size={14} className="text-dash-brand" />
               <span className="text-[11px] font-bold text-slate-600">May 12 - May 18, 2024</span>
               <ChevronRight size={12} className="rotate-90 text-slate-300" />
             </div>
             <div className="p-1.5 px-2">
                <div className="w-6 h-6 rounded-lg bg-dash-brand/5 flex items-center justify-center text-dash-brand">
                  <Ticket size={14} />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
         <div className="mb-8">
            <h3 className="text-[15px] font-black text-[#1e293b]">Overview</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-3xl border border-slate-50 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] hover:shadow-md transition-all cursor-default group">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <stat.icon size={22} strokeWidth={2.5} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-lg font-black text-[#1e293b]">{stat.value}</p>
                  <p className={`text-[9px] font-bold ${stat.color}`}>{stat.sub}</p>
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* Main Grid: Coupons List & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left Column: All Coupons */}
         <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
               <div>
                  <h3 className="text-[15px] font-black text-[#1e293b]">All Coupons</h3>
                  <p className="text-[11px] font-bold text-slate-400">View and manage all coupons and discount offers.</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <select className="appearance-none bg-slate-50 border-none text-[11px] font-black text-slate-700 h-10 pl-4 pr-10 rounded-xl focus:ring-0 cursor-pointer">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                     </select>
                     <ChevronRight size={14} className="absolute right-3 top-3 rotate-90 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                     <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                     <Input 
                        placeholder="Search coupons..." 
                        className="h-10 pl-9 pr-4 w-48 bg-slate-50 border-none rounded-xl text-[11px] font-bold focus:ring-0"
                     />
                  </div>
                  <Button className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] flex items-center gap-2">
                     <Plus size={14} /> Create Coupon
                  </Button>
               </div>
            </div>

            <div className="overflow-x-auto -mx-2">
               <table className="w-full">
                  <thead>
                     <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                        <th className="text-left px-4 py-3">Coupon</th>
                        <th className="text-left px-4 py-3">Discount</th>
                        <th className="text-left px-4 py-3">Min. Order</th>
                        <th className="text-left px-4 py-3">Validity</th>
                        <th className="text-left px-4 py-3">Usage</th>
                        <th className="text-left px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {coupons.map((coupon, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                           <td className="px-4 py-5">
                              <div className={`inline-flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed ${getColorClasses(coupon.color)}`}>
                                 <span className="text-[11px] font-black tracking-widest">{coupon.code}</span>
                                 <button className="flex items-center gap-1 text-[8px] font-bold mt-1 opacity-70 hover:opacity-100">
                                    Copy <Copy size={8} />
                                 </button>
                              </div>
                           </td>
                           <td className="px-4 py-5">
                              <p className="text-[12px] font-black text-[#1e293b]">{coupon.discount}</p>
                              {coupon.upTo && <p className="text-[9px] font-bold text-slate-400">{coupon.upTo}</p>}
                           </td>
                           <td className="px-4 py-5 font-black text-[#1e293b] text-[11px]">{coupon.minOrder}</td>
                           <td className="px-4 py-5">
                              <p className="text-[10px] font-black text-[#1e293b] leading-tight">{coupon.validity.split(' - ')[0]}</p>
                              <p className="text-[10px] font-black text-[#1e293b] leading-tight">- {coupon.validity.split(' - ')[1]}</p>
                           </td>
                           <td className="px-4 py-5">
                              <p className="text-[10px] font-black text-[#1e293b] mb-1.5">{coupon.usage}</p>
                              <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(parseInt(coupon.usage.split(' / ')[0]) / parseInt(coupon.usage.split(' / ')[1])) * 100}%` }}></div>
                              </div>
                              <p className="text-[8px] font-bold text-slate-400 mt-1">Used</p>
                           </td>
                           <td className="px-4 py-5">
                              <Badge className={`px-2 py-0.5 rounded-lg border-none text-[8px] font-black uppercase tracking-wider ${
                                 coupon.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                              }`}>
                                 {coupon.status}
                              </Badge>
                           </td>
                           <td className="px-4 py-5">
                              <button className="text-slate-300 hover:text-dash-brand transition-colors">
                                 <MoreHorizontal size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
               <p className="text-[11px] font-bold text-slate-400">Showing 1 to 5 of 48 coupons</p>
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-400"><ChevronRight size={16} className="rotate-180" /></Button>
                  <Button className="w-8 h-8 p-0 rounded-lg bg-emerald-600 text-white font-black text-[11px]">1</Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-600 font-bold text-[11px]">2</Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-600 font-bold text-[11px]">3</Button>
                  <span className="text-slate-300 mx-1">...</span>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-600 font-bold text-[11px]">10</Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-400"><ChevronRight size={16} /></Button>
               </div>
            </div>
         </div>

         {/* Right Column: Actions & Performing */}
         <div className="space-y-6">
            {/* Create New Coupon Action */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-[15px] font-black text-[#1e293b] mb-2 uppercase tracking-widest">Create New Coupon</h3>
               <p className="text-[11px] font-bold text-slate-400 mb-6 leading-relaxed">Create a new coupon and start offering discounts.</p>
               <Button className="w-full h-12 rounded-xl bg-[#065f46] hover:bg-[#064e3b] text-white font-black text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-emerald-50">
                  <Ticket size={16} className="rotate-[-10deg]" /> Create Coupon
               </Button>
            </div>

            {/* Top Performing Coupons */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-[15px] font-black text-[#1e293b] mb-6 uppercase tracking-widest">Top Performing Coupons</h3>
               <div className="space-y-6">
                  {[
                    { code: 'SUMMER15', sub: '15% OFF (Upto ₹500)', usage: '75 Used', savings: '₹7,500', color: 'text-amber-500', bg: 'bg-amber-50' },
                    { code: 'MEGA20', sub: '20% OFF (Upto ₹800)', usage: '120 Used', savings: '₹9,600', color: 'text-slate-400', bg: 'bg-slate-50' },
                    { code: 'WELCOME10', sub: '10% OFF (Upto ₹200)', usage: '25 Used', savings: '₹2,500', color: 'text-orange-700', bg: 'bg-orange-50' },
                    { code: 'VASTR30', sub: '₹30 OFF', usage: '50 Used', savings: '₹1,500', color: 'text-slate-500', bg: 'bg-slate-100' },
                    { code: 'NEWUSER50', sub: '₹50 OFF', usage: '300 Used', savings: '₹3,000', color: 'text-slate-500', bg: 'bg-slate-100' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between group">
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0 font-black text-[10px]`}>
                             {i < 3 ? <CheckCircle2 size={14} /> : i + 1}
                          </div>
                          <div>
                             <p className="text-[11px] font-black text-[#1e293b]">{item.code}</p>
                             <p className="text-[9px] font-bold text-slate-400">{item.sub}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-bold text-slate-400">{item.usage}</p>
                          <p className="text-[11px] font-black text-emerald-600">{item.savings}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Help Footer */}
      <div className="bg-white p-6 px-10 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
               <ShieldCheck size={24} />
            </div>
            <div>
               <p className="text-[13px] font-black text-[#1e293b]">Need Help with Coupons?</p>
               <p className="text-[10px] font-bold text-slate-400">Learn how to create and manage coupons effectively.</p>
            </div>
         </div>
         <Button variant="outline" className="h-10 px-6 rounded-xl border-slate-200 text-slate-600 font-black text-[11px] flex items-center gap-2 hover:bg-slate-50">
            View Help Guide <ExternalLink size={14} />
         </Button>
      </div>
    </div>
  );
};
