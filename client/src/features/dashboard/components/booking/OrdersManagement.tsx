import { useState } from 'react';
import { useOrders } from '#/hook';
import { 
  ShoppingCart, 
  IndianRupee, 
  Clock, 
  ChevronRight,
  User as UserIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Mail
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '#/components/ui/badge';
import { OrderDetailsView } from './OrderDetailsView';

export const OrdersManagement = () => {
  const { data: orders, isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleOpenDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return <OrderDetailsView order={selectedOrder} onBack={handleBackToList} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-gray-100" />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="text-gray-300" size={40} />
        </div>
        <h3 className="text-xl font-bold text-dash-text">No Orders Found</h3>
        <p className="text-dash-text-soft mt-2 max-w-xs text-center font-medium">
          There are no rental orders for your products yet.
        </p>
      </div>
    );
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-dash-text flex items-center gap-3">
            <ShoppingCart className="text-dash-brand" size={28} />
            Product Orders
          </h2>
          <p className="text-dash-text-soft text-sm font-medium">
            Manage incoming rental orders and track your product inventory performance.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((order: any) => (
          <div 
            key={order.id}
            className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-dash-brand/20 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Info */}
              <div className="flex gap-4 flex-1">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 bg-gray-100">
                  <img 
                    src={order.product?.images?.[0] || 'https://via.placeholder.com/150?text=Product'} 
                    alt={order.product?.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150?text=Product')}
                  />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-dash-brand bg-dash-brand/10 px-2 py-0.5 rounded-md">
                      {order.product?.category?.name || 'Uncategorized'}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <h4 className="text-lg font-extrabold text-dash-text truncate max-w-[250px]">
                    {order.product?.title || 'Untitled Product'}
                  </h4>
                </div>
              </div>

              {/* Renter Info */}
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex-1">
                <div className="w-10 h-10 rounded-xl bg-dash-brand/10 flex items-center justify-center text-dash-brand overflow-hidden">
                  {order.renter.image ? (
                    <img src={order.renter.image} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={20} />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-dash-text-soft uppercase tracking-wider">Customer</span>
                  <span className="text-sm font-extrabold text-dash-text">{order.renter.name || 'Customer'}</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-dash-text-soft">
                    <Mail size={10} />
                    {order.renter.email}
                  </div>
                </div>
              </div>

              {/* Date & Price */}
              <div className="flex items-center gap-8 lg:gap-12 min-w-fit">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-dash-text-soft uppercase tracking-wider mb-1">Rental Period</span>
                    <div className="flex items-center gap-2 text-sm font-extrabold text-dash-text">
                      <Calendar size={14} className="text-dash-brand" />
                      {format(new Date(order.startDate), 'dd MMM')} - {format(new Date(order.endDate), 'dd MMM, yyyy')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end min-w-[100px]">
                  <span className="text-[10px] font-black text-dash-text-soft uppercase tracking-wider mb-1">Income</span>
                  <div className="text-xl font-black text-dash-brand flex items-center">
                    <IndianRupee size={18} strokeWidth={3} />
                    {order.totalPrice.toLocaleString()}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleOpenDetails(order)}
                  className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-dash-text-soft hover:bg-dash-brand hover:text-white transition-all duration-300"
                >
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
