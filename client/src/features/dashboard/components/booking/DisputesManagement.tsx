import { 
  AlertCircle, 
  ChevronRight, 
  Calendar, 
  Search, 
  Filter, 
  Clock, 
  RefreshCcw, 
  CheckCircle2, 
  Image as ImageIcon,
  XCircle,
  ExternalLink,
  Send
} from 'lucide-react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { useState } from 'react';

export const DisputesManagement = () => {
  const [selectedDispute, setSelectedDispute] = useState<any>(null);

  const stats = [
    { label: 'Total Disputes', value: '24', sub: '+4 from last week', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Open Disputes', value: '8', sub: 'Needs attention', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'In Progress', value: '10', sub: 'Under review', icon: RefreshCcw, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Resolved', value: '6', sub: 'Completed', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  const disputes = [
    { 
      id: 1, 
      issue: 'Item not as described', 
      desc: 'The sofa color was different from what was shown in the listing.', 
      orderId: '#ORD-2024-0001', 
      item: 'Sofa Set', 
      raisedBy: 'Rohan Mehta', 
      email: 'rohan@gmail.com', 
      date: '12 May 2024', 
      time: '10:30 AM', 
      status: 'Open' 
    },
    { 
      id: 2, 
      issue: 'Damage to item', 
      desc: 'Received lehenga with a torn and damaged fabric.', 
      orderId: '#ORD-2024-0002', 
      item: 'Bridal lehenga', 
      raisedBy: 'Priya Sharma', 
      email: 'priya@gmail.com', 
      date: '11 May 2024', 
      time: '04:15 PM', 
      status: 'In Progress' 
    },
    { 
      id: 3, 
      issue: 'Late delivery', 
      desc: 'Item was delivered 2 days after the expected date.', 
      orderId: '#ORD-2024-0003', 
      item: 'DSLR Camera', 
      raisedBy: 'Amit Patel', 
      email: 'amit@gmail.com', 
      date: '10 May 2024', 
      time: '09:20 AM', 
      status: 'In Progress' 
    },
    { 
      id: 4, 
      issue: 'Item not working', 
      desc: 'Scooter had battery issues and not in working condition.', 
      orderId: '#ORD-2024-0004', 
      item: 'Honda Activa 6G', 
      raisedBy: 'Sneha Joshi', 
      email: 'sneha@gmail.com', 
      date: '09 May 2024', 
      time: '02:45 PM', 
      status: 'Resolved' 
    },
    { 
      id: 5, 
      issue: 'Refund not received', 
      desc: 'Refund is not processed yet for the cancelled order.', 
      orderId: '#ORD-2024-0005', 
      item: 'MacBook Air M2', 
      raisedBy: 'Vikram Singh', 
      email: 'vikram@gmail.com', 
      date: '08 May 2024', 
      time: '11:10 AM', 
      status: 'Closed' 
    },
  ];

  const currentDispute = selectedDispute || disputes[0];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
          <span>Dashboard</span>
          <ChevronRight size={10} className="text-slate-300" />
          <span className="text-dash-brand font-extrabold uppercase tracking-widest">Disputes</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-[#1e293b]">Disputes</h1>
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
             <div className="flex items-center gap-2 px-4 py-1.5 border-r border-slate-50">
               <Calendar size={14} className="text-dash-brand" />
               <span className="text-[11px] font-bold text-slate-600">May 12 - May 18, 2024</span>
               <ChevronRight size={12} className="rotate-90 text-slate-300" />
             </div>
             <div className="p-1.5 px-2">
                <div className="w-6 h-6 rounded-lg bg-dash-brand/5 flex items-center justify-center text-dash-brand">
                  <AlertCircle size={14} />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all cursor-default">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={22} strokeWidth={2.5} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
               <h2 className="text-xl font-black text-[#1e293b]">{stat.value}</h2>
               <p className={`text-[9px] font-bold ${stat.color}`}>{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Disputes List & Details Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: All Disputes Table */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-[15px] font-black text-[#1e293b]">All Disputes</h3>
              <p className="text-[11px] font-bold text-slate-400">View and manage all customer disputes.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <select className="appearance-none bg-slate-50 border-none text-[11px] font-black text-slate-700 h-10 pl-4 pr-10 rounded-xl focus:ring-0 cursor-pointer">
                    <option>All Status</option>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                  <ChevronRight size={14} className="absolute right-3 top-3 rotate-90 text-slate-400 pointer-events-none" />
               </div>
               <div className="relative">
                  <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                  <Input 
                    placeholder="Search disputes..." 
                    className="h-10 pl-9 pr-4 w-48 bg-slate-50 border-none rounded-xl text-[11px] font-bold placeholder:text-slate-400 focus:ring-0"
                  />
               </div>
               <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl bg-slate-50 text-slate-600">
                  <Filter size={16} />
               </Button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full">
              <thead>
                <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="text-left px-4 py-3">Dispute</th>
                  <th className="text-left px-4 py-3">Order</th>
                  <th className="text-left px-4 py-3">Raised By</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {disputes.map((dispute) => (
                  <tr 
                    key={dispute.id} 
                    onClick={() => setSelectedDispute(dispute)}
                    className={`group cursor-pointer hover:bg-slate-50/50 transition-all ${selectedDispute?.id === dispute.id ? 'bg-slate-50/80' : ''}`}
                  >
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                            <ImageIcon size={16} className="w-full h-full p-2.5 text-slate-300" />
                         </div>
                         <div>
                            <p className="text-[11px] font-black text-[#1e293b] leading-tight">{dispute.issue}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-0.5 truncate max-w-[120px]">{dispute.desc}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                       <p className="text-[10px] font-black text-[#1e293b]">{dispute.orderId}</p>
                       <p className="text-[9px] font-bold text-slate-400">{dispute.item}</p>
                    </td>
                    <td className="px-4 py-5">
                       <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-black">
                             {dispute.raisedBy.charAt(0)}
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-[#1e293b]">{dispute.raisedBy}</p>
                             <p className="text-[8px] font-bold text-slate-400">{dispute.email}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-4 py-5">
                       <p className="text-[10px] font-black text-[#1e293b]">{dispute.date}</p>
                       <p className="text-[9px] font-bold text-slate-400">{dispute.time}</p>
                    </td>
                    <td className="px-4 py-5">
                       <Badge className={`px-2.5 py-0.5 rounded-lg border-none text-[8px] font-black uppercase tracking-wider ${
                         dispute.status === 'Open' ? 'bg-rose-50 text-rose-500' :
                         dispute.status === 'In Progress' ? 'bg-blue-50 text-blue-500' :
                         dispute.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                       }`}>
                         {dispute.status}
                       </Badge>
                    </td>
                    <td className="px-4 py-5 text-right">
                       <ChevronRight size={14} className="text-slate-300 group-hover:text-dash-brand transition-colors" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Dispute Details & Actions & Chat */}
        <div className="space-y-6">
          {/* Dispute Details Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-[15px] font-black text-[#1e293b] mb-6 uppercase tracking-widest">Dispute Details</h3>
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300">
                      <ImageIcon size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400">Order {currentDispute.orderId}</p>
                      <p className="text-[13px] font-black text-[#1e293b]">{currentDispute.item}</p>
                      <p className="text-[9px] font-bold text-slate-400">{currentDispute.date}, {currentDispute.time}</p>
                   </div>
                </div>
                <Badge className="bg-rose-50 text-rose-500 border-none px-2 py-0.5 text-[8px] font-black uppercase">Open</Badge>
             </div>

             <div className="space-y-4">
                <div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Issue</span>
                   <p className="text-[12px] font-black text-[#1e293b]">{currentDispute.issue}</p>
                </div>
                <div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Description</span>
                   <p className="text-[11px] font-bold text-slate-600 leading-relaxed">{currentDispute.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Raised By</span>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black">R</div>
                         <div>
                            <p className="text-[10px] font-black text-[#1e293b]">{currentDispute.raisedBy}</p>
                            <p className="text-[8px] font-bold text-slate-400">{currentDispute.email}</p>
                         </div>
                      </div>
                   </div>
                   <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Against</span>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-black">O</div>
                         <div>
                            <p className="text-[10px] font-black text-[#1e293b]">Owner</p>
                            <p className="text-[8px] font-bold text-slate-400">owner@gmail.com</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Attachments</span>
                   <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                           <ImageIcon size={16} />
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-black">+3</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
             <h3 className="text-[13px] font-black text-[#1e293b] mb-1 uppercase tracking-widest">Dispute Actions</h3>
             <Button className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Resolve Dispute
             </Button>
             <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-slate-600 font-black text-[11px] flex items-center justify-center gap-2">
                <AlertCircle size={16} /> Request More Information
             </Button>
             <Button variant="ghost" className="w-full h-12 rounded-xl text-rose-500 hover:bg-rose-50 font-black text-[11px] flex items-center justify-center gap-2 border border-rose-100">
                <XCircle size={16} /> Close Dispute
             </Button>
          </div>

          {/* Conversation Chat */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
             <div className="flex items-center justify-between mb-2">
                <h3 className="text-[13px] font-black text-[#1e293b] uppercase tracking-widest">Conversation</h3>
                <button className="text-[10px] font-black text-emerald-600 hover:underline">View All</button>
             </div>
             <div className="space-y-6">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] font-black flex-shrink-0">R</div>
                   <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <span className="text-[10px] font-black text-[#1e293b]">Rohan Mehta</span>
                         <span className="text-[8px] font-bold text-slate-400">12 May 2024, 10:30 AM</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-600 leading-relaxed">Please look into this issue.</p>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[11px] font-black flex-shrink-0">O</div>
                   <div className="bg-indigo-50/50 p-3 rounded-2xl rounded-tl-none flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <span className="text-[10px] font-black text-[#1e293b]">Owner</span>
                         <span className="text-[8px] font-bold text-slate-400">12 May 2024, 11:15 AM</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-600 leading-relaxed">We will check and get back to you soon.</p>
                   </div>
                </div>
             </div>
             <div className="relative pt-2">
                <Input 
                  placeholder="Type a message..." 
                  className="h-12 pl-12 pr-12 bg-slate-50 border-none rounded-2xl text-[11px] font-bold placeholder:text-slate-400 focus:ring-0"
                />
                <div className="absolute left-4 top-[22px] text-slate-300">
                   <ImageIcon size={18} />
                </div>
                <button className="absolute right-3 top-[18px] w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-100 hover:scale-105 transition-all">
                   <Send size={14} />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Support Footer */}
      <div className="bg-emerald-50 p-8 px-12 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between group">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-50">
               <ShieldCheck size={24} />
            </div>
            <div>
               <h4 className="text-[15px] font-black text-[#1e293b]">We're here to help</h4>
               <p className="text-[11px] font-bold text-slate-500">Our support team is reviewing all disputes and will resolve them as quickly as possible.</p>
            </div>
         </div>
         <Button className="h-12 px-6 rounded-xl bg-white hover:bg-emerald-600 hover:text-white text-emerald-600 border border-emerald-100 font-black text-[11px] flex items-center gap-2 transition-all shadow-sm">
            View Dispute Policy <ExternalLink size={14} />
         </Button>
      </div>
    </div>
  );
};

const ShieldCheck = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
