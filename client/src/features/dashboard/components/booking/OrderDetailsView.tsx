import { 
  ArrowLeft, 
  MapPin, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Package,
  Calendar,
  ChevronRight,
  User as UserIcon,
  MessageSquare,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { useUpdateRentalStatus } from '#/hook';
import { toast } from 'sonner';

interface OrderDetailsViewProps {
  order: any;
  onBack: () => void;
}

export const OrderDetailsView = ({ order, onBack }: OrderDetailsViewProps) => {
  const updateStatus = useUpdateRentalStatus();

  if (!order) return null;

  const handleStatusUpdate = (newStatus: string) => {
    updateStatus.mutate(
      { id: order.id, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Order status updated to ${newStatus}`);
        },
        onError: () => {
          toast.error("Failed to update status");
        }
      }
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-50 text-blue-600 border-none px-3 py-1 rounded-lg font-bold flex items-center gap-1.5"><Clock size={12} /> Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-50 text-green-600 border-none px-3 py-1 rounded-lg font-bold flex items-center gap-1.5"><CheckCircle2 size={12} /> Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-50 text-red-600 border-none px-3 py-1 rounded-lg font-bold flex items-center gap-1.5"><XCircle size={12} /> Cancelled</Badge>;
      default:
        return <Badge className="bg-yellow-50 text-yellow-600 border-none px-3 py-1 rounded-lg font-bold flex items-center gap-1.5"><AlertCircle size={12} /> Pending</Badge>;
    }
  };

  const calculateDuration = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff || 1;
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#f8fafc] -m-8 p-10 min-h-screen font-sans">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
          <span className="cursor-pointer hover:text-dash-brand" onClick={onBack}>Dashboard</span>
          <ChevronRight size={10} className="text-slate-300" />
          <span className="cursor-pointer hover:text-dash-brand" onClick={onBack}>Orders</span>
          <ChevronRight size={10} className="text-slate-300" />
          <span className="text-dash-brand font-extrabold">Order Details</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-[#1e293b]">Order Details</h1>
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

      {/* Top Stats Bar */}
      <div className="bg-white px-10 py-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-8">
        <div className="space-y-1.5">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Order ID</span>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-[#1e293b]">#ORD-{new Date(order.createdAt).getFullYear()}-{order.id.slice(-4).toUpperCase()}</h2>
            <Badge className="bg-[#e2f5ec] text-[#059669] border-none px-3 py-0.5 rounded-full font-bold text-[10px]">
              Pending
            </Badge>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Order Placed On</span>
          <div className="flex items-center gap-2.5">
             <Calendar size={16} className="text-slate-400" />
             <span className="text-[13px] font-extrabold text-[#1e293b]">
               {format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}
             </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Total Income</span>
          <div className="flex items-center gap-1 text-2xl font-black text-[#059669]">
             <IndianRupee size={20} strokeWidth={3} />
             {order.totalPrice.toLocaleString()}
          </div>
        </div>

        <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-100 bg-white font-black text-[12px] text-slate-700 flex items-center gap-2 hover:bg-slate-50 shadow-sm">
          View Invoice <FileText size={16} className="text-slate-400" />
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Product Details Section */}
          <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[14px] font-black text-[#1e293b] mb-8">Product Details</h3>
            <div className="flex gap-8">
              <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-sm border border-slate-50">
                <img src={order.product?.images?.[0]} className="w-full h-full object-cover" alt={order.product?.title} />
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1.5">
                <div className="flex items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#059669] bg-[#e2f5ec] px-3 py-1 rounded-lg">
                    {order.product?.category?.name || 'HOME DECOR'}
                  </span>
                </div>
                <h4 className="text-xl font-black text-[#1e293b]">{order.product?.title}</h4>
                <div className="flex items-center gap-0.5 text-[#059669] font-black text-lg">
                  <IndianRupee size={16} strokeWidth={3} />
                  {order.product?.price.toLocaleString()}
                  <span className="text-slate-400 text-[11px] font-bold ml-1">/ total</span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end gap-1.5">
                <span className="text-[9px] font-black text-[#334155] uppercase tracking-widest">Rental Period</span>
                <span className="text-[14px] font-black text-[#1e293b]">
                  {format(new Date(order.startDate), 'dd MMM yyyy')} - {format(new Date(order.endDate), 'dd MMM yyyy')}
                </span>
                <Badge className="bg-[#f1f5f9] text-[#475569] border-none px-4 py-1 rounded-full font-bold text-[11px]">
                  {calculateDuration(order.startDate, order.endDate)} Days
                </Badge>
              </div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[14px] font-black text-[#1e293b] mb-8">Customer Details</h3>
            <div className="grid grid-cols-2 gap-20">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-[#e2f5ec] flex items-center justify-center text-[#059669]">
                  <UserIcon size={24} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[16px] font-black text-[#1e293b] leading-tight">{order.renter?.name}</p>
                  <p className="text-[12px] font-bold text-slate-500">{order.renter?.email}</p>
                  <p className="text-[12px] font-bold text-slate-500">+91 {order.renter?.phone || '98765 43210'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-black text-[#334155] uppercase tracking-widest block">Shipping Address</span>
                <div className="text-[12px] font-bold text-slate-600 leading-relaxed">
                  <p>{order.renter?.name || 'test'}</p>
                  <p>123, Test Street, Test Area</p>
                  <p>Ahmedabad, Gujarat - 380001</p>
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-10 pb-2">
               <h3 className="text-[14px] font-black text-[#1e293b] mb-8 uppercase tracking-widest">Payment Details</h3>
            </div>
            <div className="px-10 space-y-0">
              {[
                { label: 'Payment Method', value: 'Online Payment (Razorpay)' },
                { label: 'Payment Status', value: 'PENDING', isBadge: true },
                { label: 'Transaction ID', value: 'txn_1234567890' },
                { label: 'Payment Date', value: format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a') },
                { label: 'Subtotal', value: `₹${order.totalPrice.toLocaleString()}` },
                { label: 'Platform Fee (10%)', value: `₹${(order.totalPrice * 0.1).toLocaleString()}` },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50">
                  <span className="text-[12px] font-bold text-slate-500">{item.label}</span>
                  {item.isBadge ? (
                    <span className="text-[9px] font-black uppercase tracking-widest bg-[#fffbeb] text-[#d97706] px-4 py-1.5 rounded-full">
                      {item.value}
                    </span>
                  ) : (
                    <span className="text-[12px] font-black text-[#1e293b]">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-[#f8fafc] px-10 py-8 flex items-center justify-between mt-4">
              <span className="text-[14px] font-black text-[#1e293b]">Total Income</span>
              <span className="text-xl font-black text-[#059669]">₹{order.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Timeline & Actions */}
        <div className="space-y-6">
          {/* Order Timeline */}
          <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[14px] font-black text-[#1e293b] mb-10 uppercase tracking-widest">Order Timeline</h3>
            <div className="relative space-y-12 pl-12">
              {/* Timeline Dashed Line */}
              <div className="absolute left-5 top-2 bottom-2 w-0 border-l border-dashed border-slate-200"></div>

              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-12 w-10 h-10 rounded-full bg-[#059669] flex items-center justify-center text-white z-10 shadow-lg shadow-emerald-100">
                  <CheckCircle2 size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[14px] font-black text-[#1e293b]">Order Placed</p>
                  <p className="text-[11px] font-bold text-slate-400">{format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}</p>
                  <p className="text-[11px] font-medium text-slate-500">Order has been placed by customer.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-12 w-10 h-10 rounded-full bg-[#f59e0b] flex items-center justify-center text-white z-10 shadow-lg shadow-amber-100">
                  <Clock size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[14px] font-black text-[#1e293b]">Payment Pending</p>
                  <p className="text-[11px] font-bold text-slate-400">{format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}</p>
                  <p className="text-[11px] font-medium text-slate-500">Waiting for customer payment.</p>
                </div>
              </div>

              {/* Inactive steps */}
              {[
                { title: 'Confirmed', icon: Package },
                { title: 'Shipped', icon: MapPin },
                { title: 'Delivered', icon: CheckCircle2 },
                { title: 'Completed', icon: CheckCircle2 },
              ].map((step, i) => (
                <div key={i} className="relative opacity-20">
                  <div className="absolute -left-12 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 z-10 border border-slate-100">
                    <step.icon size={16} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[14px] font-black text-[#1e293b]">{step.title}</p>
                    <p className="text-[11px] font-bold text-slate-400">Pending</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Actions */}
          <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-[14px] font-black text-[#1e293b] mb-4 uppercase tracking-widest text-center lg:text-left">Order Actions</h3>
            <div className="flex flex-col gap-4">
              <Button 
                onClick={() => handleStatusUpdate('active')}
                className="h-14 rounded-2xl bg-white hover:bg-[#e2f5ec]/50 text-[#059669] border border-[#059669]/30 font-black text-[12px] flex items-center justify-center gap-3 transition-all"
              >
                <div className="w-5 h-5 rounded-full border-2 border-[#059669] flex items-center justify-center">
                  <CheckCircle2 size={12} strokeWidth={4} />
                </div>
                Confirm Order
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('cancelled')}
                variant="ghost"
                className="h-14 rounded-2xl bg-white hover:bg-red-50/50 text-[#ef4444] border border-[#ef4444]/30 font-black text-[12px] flex items-center justify-center gap-3 transition-all"
              >
                <div className="w-5 h-5 rounded-full border-2 border-[#ef4444] flex items-center justify-center">
                   <XCircle size={12} strokeWidth={4} />
                </div>
                Cancel Order
              </Button>
              <Button 
                variant="outline"
                className="h-14 rounded-2xl border border-slate-100 font-black text-[12px] text-[#1e293b] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm"
              >
                <MessageSquare size={18} className="text-slate-400" /> Contact Customer
              </Button>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                onClick={onBack}
                variant="ghost" 
                className="text-slate-400 font-black text-[11px] hover:bg-transparent flex items-center gap-2 tracking-[0.15em]"
              >
                <ArrowLeft size={14} className="text-slate-300" /> BACK TO ORDERS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
