
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  ShoppingCart, LayoutGrid, BarChart3, Settings, Plus, Trash2, 
  Edit, Save, ArrowRight, MapPin, Store, CreditCard, Wallet,
  ChevronLeft, ChevronRight, CheckCircle2, Package, Image as ImageIcon,
  LogOut, TrendingUp, PieChart, Users, Lock, QrCode, X, PlusCircle, MinusCircle, Copy, Share2, 
  Home as HomeIcon, Download, Upload, Info, Type, Globe
} from 'lucide-react';
import { Product, Category, Branch, Order, OrderItem, PriceOption, PaymentConfig, AdminConfig } from './types';
import { BRANCHES, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from './constants';

// --- Utils ---
const generateSerial = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// --- Components ---

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center animate-pulse">
      <div className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center text-white font-bold text-5xl shadow-2xl shadow-orange-200 mb-6 rotate-12">ف</div>
      <h1 className="text-3xl font-bold text-gray-800">فرن الكنافة</h1>
      <p className="text-orange-500 font-medium mt-2">أصالة الطعم.. وجودة المكونات</p>
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <div className="w-8 h-1 bg-orange-100 rounded-full overflow-hidden">
          <div className="w-full h-full bg-orange-500 origin-right animate-[shimmer_1.5s_infinite]"></div>
        </div>
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Loading Experience</span>
      </div>
    </div>
  );
};

const Header: React.FC<{ 
  title: string; 
  isAdmin?: boolean;
  showBack?: boolean;
  onLogout?: () => void;
}> = ({ title, isAdmin, showBack, onLogout }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3 flex justify-between items-center border-b border-orange-50">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-orange-50 rounded-xl transition-colors">
            <ChevronRight className="text-orange-600" />
          </button>
        )}
        {!showBack && <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">ف</div>}
        <h1 className="text-lg font-bold text-gray-800 truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {isAdmin ? (
          <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-xl">
            <LogOut size={18} />
          </button>
        ) : (
          <Link to="/admin" className="p-2 text-gray-400 hover:text-orange-500 transition-colors bg-orange-50 rounded-xl">
            <Lock size={18} />
          </Link>
        )}
      </div>
    </header>
  );
};

const BottomNav: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const location = useLocation();
  const isSelected = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-50 px-6 py-3 flex justify-around items-center z-50 max-w-md mx-auto rounded-t-3xl shadow-[0_-10px_25px_rgba(0,0,0,0.05)]">
      <Link to="/" className={`flex flex-col items-center gap-1 transition-all ${isSelected('/') ? 'text-orange-600 scale-110' : 'text-gray-400'}`}>
        <HomeIcon size={24} strokeWidth={isSelected('/') ? 2.5 : 2} />
        <span className="text-[10px] font-bold">الرئيسية</span>
      </Link>
      <Link to="/cart" className={`relative flex flex-col items-center gap-1 transition-all ${isSelected('/cart') ? 'text-orange-600 scale-110' : 'text-gray-400'}`}>
        <ShoppingCart size={24} strokeWidth={isSelected('/cart') ? 2.5 : 2} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold animate-bounce">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-bold">السلة</span>
      </Link>
      <Link to="/admin" className={`flex flex-col items-center gap-1 transition-all ${isSelected('/admin') ? 'text-orange-600 scale-110' : 'text-gray-400'}`}>
        <Users size={24} strokeWidth={isSelected('/admin') ? 2.5 : 2} />
        <span className="text-[10px] font-bold">الإدارة</span>
      </Link>
    </nav>
  );
};

// --- Store Front Components ---

const Home: React.FC<{ 
  products: Product[]; 
  categories: Category[]; 
  adminConfig: AdminConfig;
  addToCart: (p: Product, size?: string) => void;
  cartCount: number;
}> = ({ products, categories, adminConfig, addToCart, cartCount }) => {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState(categories[0]?.id || '');

  return (
    <div className="pb-28">
      <Header title="فرن الكنافة" />
      
      <div className="px-4 py-4">
        {/* Banner */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-[2.5rem] mb-6 flex items-center justify-between shadow-xl shadow-orange-100 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-1">{adminConfig.bannerTitle || 'حلوياتنا صنعت بحب'}</h2>
            <p className="text-orange-100 text-sm">{adminConfig.bannerSubtitle || 'أفضل أنواع الكنافة في المملكة'}</p>
            <div className="mt-4 flex gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold">توصيل سريع</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold">جودة عالية</span>
            </div>
          </div>
          <div className="opacity-10 absolute -right-6 -bottom-6 rotate-12 scale-150">
            <Package size={120} />
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex gap-3 overflow-x-auto pb-6 hide-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-6 py-2 rounded-2xl whitespace-nowrap font-bold text-sm transition-all shadow-sm ${
                activeCat === cat.id ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-white text-gray-500 border border-orange-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
          {products.filter(p => p.category === activeCat).map(p => (
            <div key={p.id} className="bg-white rounded-[2rem] p-3 shadow-sm border border-orange-50 hover:shadow-lg transition-all group active:scale-95">
              <div className="aspect-square w-full bg-gray-50 rounded-2xl mb-3 overflow-hidden relative">
                <img 
                  src={p.image || 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400'} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                {p.isNew && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter">جديد</span>
                )}
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-1 px-1 line-clamp-1">{p.name}</h4>
              <div className="flex justify-between items-center px-1">
                <div className="text-xs font-black text-orange-600">
                  {Array.isArray(p.price) ? `${p.price[0].price} ر.س` : `${p.price} ر.س`}
                </div>
                <button 
                  onClick={() => {
                    if (Array.isArray(p.price)) navigate(`/product/${p.id}`);
                    else addToCart(p);
                  }}
                  className="w-8 h-8 bg-orange-500 text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav cartCount={cartCount} />
    </div>
  );
};

const ProductDetails: React.FC<{ 
  products: Product[]; 
  addToCart: (p: Product, size?: string) => void;
  cartCount: number;
}> = ({ products, addToCart, cartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!product) return <div className="p-10 text-center font-bold">المنتج غير موجود</div>;

  const handleAdd = () => {
    if (Array.isArray(product.price) && !selectedSize) {
      alert('الرجاء اختيار الحجم أولاً');
      return;
    }
    addToCart(product, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-screen pb-28">
      <Header title={product.name} showBack />
      <div className="max-w-md mx-auto animate-in slide-in-from-bottom-10 duration-500">
        <div className="p-4">
          <img src={product.image} className="w-full h-80 object-cover rounded-[3rem] shadow-2xl" alt={product.name} />
        </div>
        <div className="p-6 pt-2">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-black text-gray-800">{product.name}</h2>
            {product.isNew && <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">إصدار حصري</span>}
          </div>
          
          {Array.isArray(product.price) ? (
            <div className="space-y-4">
              <p className="font-bold text-gray-400 text-sm flex items-center gap-2">
                <LayoutGrid size={14} /> اختر الحجم المفضل
              </p>
              <div className="grid grid-cols-2 gap-3">
                {product.price.map(opt => (
                  <button
                    key={opt.size}
                    onClick={() => setSelectedSize(opt.size)}
                    className={`p-4 border-2 rounded-[2rem] text-center transition-all ${
                      selectedSize === opt.size 
                        ? 'border-orange-500 bg-orange-500 text-white shadow-xl shadow-orange-100' 
                        : 'border-gray-50 bg-gray-50/50 text-gray-500'
                    }`}
                  >
                    <div className="text-xs font-bold mb-1 opacity-80">{opt.size}</div>
                    <div className="text-lg font-black">{opt.price} ر.س</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 p-6 rounded-[2rem] flex justify-between items-center border border-orange-100">
              <span className="font-bold text-orange-800">السعر</span>
              <span className="text-3xl font-black text-orange-600">{product.price} ر.س</span>
            </div>
          )}

          <button 
            onClick={handleAdd}
            className="w-full mt-10 bg-orange-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-orange-200 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <ShoppingCart size={24} />
            إضافة للسلة
          </button>
        </div>
      </div>
      <BottomNav cartCount={cartCount} />
    </div>
  );
};

const Cart: React.FC<{ 
  cart: OrderItem[]; 
  updateQty: (index: number, delta: number) => void;
  removeItem: (index: number) => void;
}> = ({ cart, updateQty, removeItem }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <Header title="سلة المشتريات" />
      <div className="p-4 max-w-md mx-auto">
        {cart.length === 0 ? (
          <div className="text-center py-24 animate-in zoom-in-75 duration-500">
            <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-50">
              <ShoppingCart className="text-orange-200" size={60} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">السلة تنتظر طلبيتك!</h3>
            <p className="text-gray-400 mb-10 px-10 text-sm">تصفح قائمتنا واختر ما تشتهيه من ألذ أنواع الكنافة</p>
            <Link to="/" className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-orange-100 inline-block active:scale-95 transition-all">ابدأ الطلب الآن</Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-[2rem] flex gap-4 shadow-sm border border-orange-50 animate-in slide-in-from-right-4">
                  <img src={item.product.image} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-1">{item.product.name}</h4>
                    {item.selectedSize && <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">{item.selectedSize}</span>}
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-orange-600 font-black">{item.price * item.quantity} ر.س</span>
                      <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-3 py-1">
                        <button onClick={() => updateQty(idx, -1)} className="text-orange-500 font-bold text-xl active:scale-125">-</button>
                        <span className="font-black w-4 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQty(idx, 1)} className="text-orange-500 font-bold text-xl active:scale-125">+</button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(idx)} className="text-red-300 hover:text-red-500 transition-colors p-1"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-orange-50">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 font-bold">عدد الأصناف</span>
                <span className="text-gray-800 font-black">{cart.length} أصناف</span>
              </div>
              <div className="flex justify-between mb-6 pt-4 border-t border-dashed border-gray-100">
                <span className="text-gray-800 font-black text-lg">الإجمالي النهائي</span>
                <span className="text-2xl font-black text-orange-600">{total} ر.س</span>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-orange-100 active:scale-95 transition-all"
              >
                المتابعة لإتمام الطلب
              </button>
            </div>
          </>
        )}
      </div>
      <BottomNav cartCount={cart.length} />
    </div>
  );
};

const Checkout: React.FC<{ 
  cart: OrderItem[]; 
  onOrderComplete: (order: Order) => void;
  paymentConfig: PaymentConfig;
}> = ({ cart, onOrderComplete, paymentConfig }) => {
  const navigate = useNavigate();
  const [branchId, setBranchId] = useState<number>(1);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'cash'>('cash');
  const [customerLocation, setCustomerLocation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!customerName) { alert('الرجاء إدخال اسمك الكريم'); return; }
    if (orderType === 'delivery' && !customerLocation) { alert('الرجاء مشاركة الموقع أو كتابة العنوان للتوصيل'); return; }

    setIsLoading(true);
    const orderId = generateSerial();
    const order: Order = {
      id: orderId,
      branchId,
      items: cart,
      total,
      type: orderType,
      paymentMethod,
      customerLocation: orderType === 'delivery' ? customerLocation : undefined,
      timestamp: Date.now()
    };

    const branch = BRANCHES.find(b => b.id === branchId)!;
    const itemsText = cart.map(i => `🔸 *${i.product.name}* ${i.selectedSize ? `(${i.selectedSize})` : ''} \n   (الكمية: ${i.quantity}) - السعر: ${i.price * i.quantity} ر.س`).join('\n\n');
    
    const message = `🏁 *طلب جديد من تطبيق فرن الكنافة* \n\n👤 *العميل:* ${customerName}\n🔢 *رقم الطلب:* #${order.id}\n📍 *الفرع:* ${branch.name}\n\n🛒 *الأصناف المطلوبة:*\n${itemsText}\n\n💰 *المجموع:* ${total} ر.س\n🚚 *طريقة الاستلام:* ${orderType === 'delivery' ? '✅ توصيل للمنزل' : '🏪 استلام من الفرع'}\n💳 *طريقة الدفع:* ${paymentMethod === 'apple_pay' ? '🍎 Apple Pay' : '💵 كاش'}\n\n${orderType === 'delivery' ? `🗺️ *الموقع:* ${customerLocation}` : ''}\n\n✨ *شكراً لاختياركم فرن الكنافة* ✨`;
    
    const waLink = `https://wa.me/${branch.phone}?text=${encodeURIComponent(message)}`;
    
    onOrderComplete(order);
    
    // محاولة الإرسال للواتساب
    window.location.href = waLink;
    
    setTimeout(() => {
        navigate('/success/' + order.id);
    }, 1500);
  };

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCustomerLocation(`📍 موقعي الحالي: https://www.google.com/maps?q=${latitude},${longitude}`);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Header title="تأكيد الطلب" showBack />
      <div className="p-4 max-w-md mx-auto space-y-6">
        
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50">
          <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
            <Users className="text-orange-500" size={20} /> بيانات العميل
          </h3>
          <input 
            placeholder="ادخل اسمك الكامل هنا" 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:border-orange-500 transition-all"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50">
          <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
            <Store className="text-orange-500" size={20} /> الفرع الأقرب لك
          </h3>
          <div className="space-y-3">
            {BRANCHES.map(b => (
              <label key={b.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${branchId === b.id ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-50 bg-gray-50/50'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="branch" className="accent-orange-500 w-5 h-5" checked={branchId === b.id} onChange={() => setBranchId(b.id)} />
                  <span className={branchId === b.id ? 'font-black text-orange-700' : 'text-gray-500 font-bold'}>{b.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50">
          <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
            <Package className="text-orange-500" size={20} /> طريقة الاستلام
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setOrderType('pickup')} className={`flex flex-col items-center p-5 border-2 rounded-2xl transition-all ${orderType === 'pickup' ? 'border-orange-500 bg-orange-50 text-orange-700 font-black shadow-lg' : 'border-gray-50 bg-gray-50/50 text-gray-400'}`}>
              <Store size={28} />
              <span className="text-sm mt-2">استلام فرع</span>
            </button>
            <button onClick={() => setOrderType('delivery')} className={`flex flex-col items-center p-5 border-2 rounded-2xl transition-all ${orderType === 'delivery' ? 'border-orange-500 bg-orange-50 text-orange-700 font-black shadow-lg' : 'border-gray-50 bg-gray-50/50 text-gray-400'}`}>
              <MapPin size={28} />
              <span className="text-sm mt-2">توصيل منزل</span>
            </button>
          </div>
          
          {orderType === 'delivery' && (
            <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-4">
              <textarea 
                placeholder="تفاصيل العنوان (الحي، الشارع، المعالم)"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm h-28 focus:ring-2 focus:ring-orange-200 outline-none font-bold"
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value)}
              />
              <button onClick={getMyLocation} className="w-full py-3 bg-orange-100 text-orange-600 rounded-xl text-xs font-black flex items-center justify-center gap-2 border border-orange-200 active:scale-95 transition-all">
                <MapPin size={16} /> تحديد موقعي الجغرافي تلقائياً
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50">
          <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="text-orange-500" size={20} /> وسيلة الدفع
          </h3>
          <div className="space-y-3">
            {paymentConfig.applePayEnabled && (
              <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'apple_pay' ? 'border-black bg-gray-50 shadow-md' : 'border-gray-50 bg-gray-50/50'}`}>
                <input type="radio" name="payment" className="accent-black w-5 h-5" checked={paymentMethod === 'apple_pay'} onChange={() => setPaymentMethod('apple_pay')} />
                <div className="flex items-center gap-2 font-black text-gray-800">
                  <div className="bg-black text-white p-1 rounded-lg px-2 text-[8px] font-bold"> Pay</div>
                  أبل باي
                </div>
              </label>
            )}
            <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-50 bg-gray-50/50'}`}>
              <input type="radio" name="payment" className="accent-orange-500 w-5 h-5" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
              <div className="flex items-center gap-2 font-black text-gray-800">
                <Wallet className="text-orange-500" size={20} />
                {orderType === 'delivery' ? 'كاش عند الاستلام' : 'دفع عند الاستلام بالفرع'}
              </div>
            </label>
          </div>
        </div>

        <button 
          onClick={handleCheckout} 
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-6 rounded-[2rem] font-black text-2xl shadow-2xl shadow-green-100 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
        >
          {isLoading ? 'جاري التحويل...' : 'تأكيد وإرسال الطلب'}
          <ArrowRight size={28} />
        </button>
        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">سيتم تحويلك للواتساب لإرسال الفاتورة</p>
      </div>
    </div>
  );
};

const Success: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-700">
      <div className="w-28 h-28 bg-green-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-green-50 animate-bounce">
        <CheckCircle2 size={56} className="text-green-600" />
      </div>
      <h2 className="text-4xl font-black text-gray-800 mb-3">بالعافية مقدماً!</h2>
      <p className="text-gray-400 font-bold mb-10">تم إرسال طلبك بنجاح للفرع المختار برقم <span className="text-orange-600">#{id}</span></p>
      
      <div className="bg-orange-50/50 p-8 rounded-[3rem] mb-12 w-full max-w-sm border-4 border-dashed border-orange-100 shadow-inner">
        <p className="text-[10px] font-black text-orange-400 mb-6 uppercase tracking-[0.3em]">Official Order Ticket</p>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=order-${id}&color=FF8C00&bgcolor=FFF9F0`} alt="QR" className="w-40 h-40 mx-auto rounded-3xl" />
        <div className="mt-8 pt-6 border-t border-orange-100 flex justify-between items-center text-xs font-black text-orange-800">
          <span>#{id}</span>
          <span>فـرن الكنـافـة</span>
        </div>
      </div>

      <Link to="/" className="bg-orange-600 text-white px-12 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 hover:gap-5 transition-all shadow-2xl shadow-orange-100">
        العودة للرئيسية <ArrowRight size={24} />
      </Link>
    </div>
  );
};

// --- Admin Section ---

const AdminLogin: React.FC<{ onLogin: (u: string, p: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F0] p-6">
      <div className="w-full max-w-sm bg-white p-10 rounded-[3rem] shadow-2xl shadow-orange-100 border border-orange-50">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-orange-500 rounded-[2rem] flex items-center justify-center text-white mb-6 shadow-2xl shadow-orange-200 rotate-6">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800">إدارة المتجر</h2>
          <p className="text-gray-400 text-sm mt-2 font-bold">لوحة تحكم المشرف الرئيسي</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(username, password); }} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 mb-2 mr-2 uppercase tracking-widest">Username</label>
            <input type="text" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-orange-500 font-bold transition-all shadow-inner" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 mb-2 mr-2 uppercase tracking-widest">Password</label>
            <input type="password" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-orange-500 font-bold transition-all shadow-inner" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-[2rem] font-black shadow-2xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95 text-lg mt-4">تسجيل الدخول</button>
        </form>
        <Link to="/" className="block text-center mt-10 text-xs text-gray-400 font-black flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <ArrowRight size={14} /> العودة لمتجهة العميل
        </Link>
      </div>
    </div>
  );
};

const ProductEditModal: React.FC<{ product: Product | null, categories: Category[], onClose: () => void, onSave: (p: Product) => void }> = ({ product, categories, onClose, onSave }) => {
  const [name, setName] = useState(product?.name || '');
  const [image, setImage] = useState(product?.image || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState<number | PriceOption[]>(product?.price || 0);

  if (!product) return null;

  const handlePriceChange = (val: string) => {
    if (!Array.isArray(price)) setPrice(parseFloat(val) || 0);
  };

  const handleSizePriceChange = (idx: number, val: string) => {
    if (Array.isArray(price)) {
      const next = [...price];
      next[idx].price = parseFloat(val) || 0;
      setPrice(next);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 overflow-y-auto max-h-[90vh] shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black text-gray-800">تعديل المنتج</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} className="text-gray-400" /></button>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 mb-2 ml-1">اسم المنتج بالعربية</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-orange-500 font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 mb-2 ml-1">تصنيف القسم</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-orange-500 font-bold appearance-none">
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 mb-2 ml-1">رابط صورة المنتج</label>
            <input value={image} onChange={e => setImage(e.target.value)} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-orange-500 font-bold text-xs" />
          </div>
          
          <div className="pt-4 border-t border-dashed border-gray-100">
            <label className="block text-xs font-black text-gray-400 mb-4 ml-1 flex items-center gap-2">
              <CreditCard size={14} /> قائمة الأسعار والأحجام
            </label>
            {Array.isArray(price) ? (
              <div className="space-y-4">
                {price.map((p, i) => (
                  <div key={p.size} className="flex items-center gap-4 bg-orange-50/30 p-4 rounded-2xl border border-orange-100">
                    <span className="text-xs font-black w-14 text-orange-800">{p.size}</span>
                    <input type="number" value={p.price} onChange={e => handleSizePriceChange(i, e.target.value)} className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center font-black text-orange-600 shadow-sm" />
                    <span className="text-[10px] font-black text-orange-400">ر.س</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-orange-50/30 p-4 rounded-2xl border border-orange-100">
                <input type="number" value={price} onChange={e => handlePriceChange(e.target.value)} className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center font-black text-orange-600 shadow-sm" />
                <span className="text-xs font-black text-orange-800">ريال سعودي</span>
              </div>
            )}
          </div>

          <button 
            onClick={() => onSave({ ...product, name, image, category, price })}
            className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black shadow-2xl shadow-orange-100 mt-10 active:scale-95 transition-all text-lg"
          >
            حفظ التحديثات
          </button>
        </div>
      </div>
    </div>
  );
};

const Admin: React.FC<{
  products: Product[]; categories: Category[]; orders: Order[];
  onUpdateProducts: (p: Product[]) => void; onUpdateCategories: (c: Category[]) => void;
  paymentConfig: PaymentConfig; onUpdatePayment: (cfg: PaymentConfig) => void;
  adminConfig: AdminConfig; onUpdateAdmin: (cfg: AdminConfig) => void; onLogout: () => void;
}> = ({ products, categories, orders, onUpdateProducts, onUpdateCategories, paymentConfig, onUpdatePayment, adminConfig, onUpdateAdmin, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'reports' | 'settings' | 'share'>('reports');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [copied, setCopied] = useState(false);

  // الرابط الفعلي للمتجر
  const storeUrl = adminConfig.storeUrl || window.location.href.split('?')[0].split('#')[0] + '#/';

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const salesByProduct = useMemo(() => {
    const map: Record<string, { count: number; total: number }> = {};
    orders.forEach(o => o.items.forEach(i => {
      const key = i.product.name + (i.selectedSize ? ` (${i.selectedSize})` : '');
      if (!map[key]) map[key] = { count: 0, total: 0 };
      map[key].count += i.quantity;
      map[key].total += i.price * i.quantity;
    }));
    return Object.entries(map).sort((a, b) => b[1].total - a[1].total);
  }, [orders]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(storeUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareStore = () => {
    if (navigator.share) {
      navigator.share({ title: 'فرن الكنافة', text: adminConfig.bannerTitle || 'اطلب ألذ أنواع الكنافة الآن!', url: storeUrl });
    } else {
      copyToClipboard();
    }
  };

  const exportData = () => {
    const data = { products, categories, paymentConfig, adminConfig };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kunafa_full_config_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.products) onUpdateProducts(data.products);
          if (data.categories) onUpdateCategories(data.categories);
          if (data.paymentConfig) onUpdatePayment(data.paymentConfig);
          if (data.adminConfig) onUpdateAdmin(data.adminConfig);
          alert('تم استيراد كافة البيانات والإعدادات بنجاح!');
        } catch (err) {
          alert('خطأ في تنسيق الملف');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="لوحة القيادة" isAdmin onLogout={onLogout} />
      
      <div className="flex bg-white border-b sticky top-[60px] z-40 overflow-x-auto whitespace-nowrap hide-scrollbar shadow-sm">
        {[
          { id: 'reports', label: 'المبيعات', icon: BarChart3 },
          { id: 'products', label: 'المنتجات', icon: LayoutGrid },
          { id: 'share', label: 'الباركود', icon: QrCode },
          { id: 'settings', label: 'الإعدادات', icon: Settings },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 py-5 px-6 flex items-center justify-center gap-2 border-b-4 font-black transition-all ${activeTab === tab.id ? 'border-orange-600 text-orange-600 bg-orange-50/30' : 'border-transparent text-gray-400'}`}>
            <tab.icon size={20} /> <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {activeTab === 'reports' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50 flex flex-col items-center">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-3"><TrendingUp size={20} /></div>
                <span className="text-gray-400 text-[10px] font-black uppercase mb-1">إجمالي المبيعات</span>
                <span className="text-2xl font-black text-green-600">{totalSales} ر.س</span>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50 flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3"><Package size={20} /></div>
                <span className="text-gray-400 text-[10px] font-black uppercase mb-1">عدد الطلبات</span>
                <span className="text-2xl font-black text-blue-600">{orders.length}</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
              <h3 className="font-black text-gray-800 mb-8 flex items-center gap-2 text-lg underline decoration-orange-200 decoration-4 underline-offset-8">الأصناف الأكثر طلباً</h3>
              <div className="space-y-8">
                {salesByProduct.length > 0 ? salesByProduct.map(([name, data]) => (
                  <div key={name} className="relative">
                    <div className="flex justify-between text-sm mb-3 font-black">
                      <span className="text-gray-700">{name}</span>
                      <span className="text-orange-600">{data.total} ر.س</span>
                    </div>
                    <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-l from-orange-400 to-orange-600 h-full rounded-full" style={{ width: `${(data.total / (totalSales || 1)) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-black">
                      <span>الكمية المبيعة: {data.count}</span>
                      <span className="bg-orange-50 px-2 py-0.5 rounded text-orange-600">{((data.total / (totalSales || 1)) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                )) : <div className="text-center text-gray-400 py-16 flex flex-col items-center gap-4">
                  <PieChart size={40} className="opacity-20" />
                  <span className="font-bold">بانتظار استقبال أول طلبية...</span>
                </div>}
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] shadow-sm border border-orange-50">
              <h3 className="font-black text-gray-800 flex items-center gap-2"><LayoutGrid className="text-orange-500" size={20} /> إدارة القائمة</h3>
              <button onClick={() => {
                const name = prompt('اسم القسم الجديد:');
                if (name) onUpdateCategories([...categories, { id: Date.now().toString(), name }]);
              }} className="bg-orange-600 text-white p-3 rounded-2xl shadow-lg shadow-orange-100 flex items-center gap-2 active:scale-90 transition-all">
                <Plus size={20} /> <span className="text-xs font-black">قسم جديد</span>
              </button>
            </div>

            {categories.map(cat => (
              <div key={cat.id} className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-orange-50 mb-6 animate-in slide-in-from-bottom-2">
                <div className="bg-orange-50/50 p-5 flex justify-between items-center border-b border-orange-100">
                  <div className="flex items-center gap-3">
                    <h4 className="font-black text-orange-700 text-lg">{cat.name}</h4>
                    <button onClick={() => {
                      const newName = prompt('تعديل اسم القسم:', cat.name);
                      if (newName) onUpdateCategories(categories.map(c => c.id === cat.id ? { ...c, name: newName } : c));
                    }} className="text-orange-300 hover:text-orange-500 transition-colors"><Edit size={16}/></button>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => {
                      const newName = prompt('اسم المنتج:');
                      const newPrice = prompt('السعر:');
                      if (newName && newPrice) onUpdateProducts([...products, { id: Date.now().toString(), name: newName, category: cat.id, price: parseFloat(newPrice), image: 'https://picsum.photos/400/300' }]);
                    }} className="text-[10px] bg-white text-orange-600 px-4 py-2 rounded-xl border border-orange-200 font-black shadow-sm active:scale-95 transition-all">+ إضافة منتج</button>
                    <button onClick={() => { if(confirm('هل أنت متأكد من حذف القسم وكل منتجاته؟')) onUpdateCategories(categories.filter(c => c.id !== cat.id)); }} className="text-red-300 p-2"><Trash2 size={18}/></button>
                  </div>
                </div>
                <div className="divide-y divide-gray-50">
                  {products.filter(p => p.category === cat.id).map(p => (
                    <div key={p.id} className="p-5 flex items-center gap-4 hover:bg-orange-50/10 transition-colors group">
                      <img src={p.image} className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                      <div className="flex-1">
                        <div className="font-black text-gray-800 text-sm">{p.name}</div>
                        <div className="text-[10px] font-black text-orange-400 mt-1 uppercase tracking-tighter">
                          {Array.isArray(p.price) ? 'عدة أحجام متوفرة' : `السعر: ${p.price} ريال`}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingProduct(p)} className="p-3 text-blue-500 bg-blue-50 rounded-xl active:scale-90 transition-all"><Edit size={20}/></button>
                        <button onClick={() => { if(confirm('حذف هذا المنتج؟')) onUpdateProducts(products.filter(prod => prod.id !== p.id)); }} className="p-3 text-red-500 bg-red-50 rounded-xl active:scale-90 transition-all"><Trash2 size={20}/></button>
                      </div>
                    </div>
                  ))}
                  {products.filter(p => p.category === cat.id).length === 0 && <div className="p-10 text-center text-gray-300 font-bold text-xs italic">لا توجد منتجات في هذا القسم حالياً</div>}
                </div>
              </div>
            ))}
            <ProductEditModal product={editingProduct} categories={categories} onClose={() => setEditingProduct(null)} onSave={p => { onUpdateProducts(products.map(pr => pr.id === p.id ? p : pr)); setEditingProduct(null); }} />
          </div>
        )}

        {activeTab === 'share' && (
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-orange-50 text-center space-y-8 animate-in zoom-in-95">
              <div className="w-24 h-24 bg-orange-100 rounded-[2.5rem] flex items-center justify-center text-orange-600 mx-auto shadow-inner shadow-orange-200/50">
                <QrCode size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-800">باركود طلبات العملاء</h3>
                <p className="text-gray-400 text-sm mt-3 font-bold px-6">اطبع هذا الكود وضعه على طاولات المحل أو في الواجهة لسهولة وصول العملاء للمنيو والطلب المباشر</p>
              </div>

              <div className="bg-white p-6 rounded-[3rem] inline-block border-[12px] border-orange-50 shadow-2xl">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(storeUrl)}&color=FF8C00&bgcolor=FFFFFF&qzone=2`} 
                  className="w-56 h-56 mx-auto" 
                  alt="Store QR" 
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 overflow-hidden shadow-inner">
                  <input readOnly value={storeUrl} className="flex-1 bg-transparent text-[10px] text-gray-400 font-black outline-none truncate" />
                  <button onClick={copyToClipboard} className={`p-3 rounded-xl transition-all shadow-md ${copied ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'}`}>
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                
                <button 
                  onClick={shareStore}
                  className="w-full bg-orange-600 text-white py-5 rounded-[2rem] font-black shadow-2xl shadow-orange-100 flex items-center justify-center gap-3 active:scale-95 transition-all text-lg"
                >
                  <Share2 size={24} /> مشاركة الرابط المباشر
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            {/* إعدادات الرابط - جديد لضمان صحة الباركود */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
              <h3 className="font-black text-gray-800 mb-8 flex items-center gap-2"><Globe size={20} className="text-orange-500" /> رابط المتجر الرسمي</h3>
              <div className="space-y-4">
                <p className="text-xs text-gray-400 font-bold leading-relaxed">أدخل الرابط الذي حصلت عليه بعد رفع الموقع (مثال: mykunafa.vercel.app). سيتم استخدامه لتوليد الباركود الصحيح.</p>
                <input 
                  className="w-full p-4 bg-orange-50/50 border border-orange-100 rounded-2xl font-black text-gray-700 outline-none focus:border-orange-500 shadow-inner" 
                  value={adminConfig.storeUrl || ''} 
                  placeholder="مثال: https://kunafa-oven.vercel.app"
                  onChange={e => onUpdateAdmin({...adminConfig, storeUrl: e.target.value})} 
                />
              </div>
            </div>

            {/* إعدادات اللوحة الترحيبية */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
              <h3 className="font-black text-gray-800 mb-8 flex items-center gap-2"><Type size={20} className="text-orange-500" /> تعديل لوحة الترحيب (البانر)</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 ml-1 uppercase tracking-widest">العنوان الرئيسي</label>
                  <input 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-700 outline-none focus:border-orange-500 shadow-inner" 
                    value={adminConfig.bannerTitle || ''} 
                    placeholder="مثال: حلوياتنا صنعت بحب"
                    onChange={e => onUpdateAdmin({...adminConfig, bannerTitle: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 ml-1 uppercase tracking-widest">العنوان الفرعي</label>
                  <input 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-700 outline-none focus:border-orange-500 shadow-inner" 
                    value={adminConfig.bannerSubtitle || ''} 
                    placeholder="مثال: أفضل أنواع الكنافة في المملكة"
                    onChange={e => onUpdateAdmin({...adminConfig, bannerSubtitle: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
              <h3 className="font-black text-gray-800 mb-8 flex items-center gap-2"><Users size={20} className="text-orange-500" /> إدارة الحساب</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 ml-1 uppercase tracking-widest">Username</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-700 outline-none focus:border-orange-500 shadow-inner" value={adminConfig.username} onChange={e => onUpdateAdmin({...adminConfig, username: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 ml-1 uppercase tracking-widest">New Password</label>
                  <input type="password" placeholder="أدخل كلمة مرور جديدة هنا" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-700 outline-none focus:border-orange-500 shadow-inner" onBlur={e => { if(e.target.value) onUpdateAdmin({...adminConfig, passwordHash: e.target.value}) }} />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
              <h3 className="font-black text-gray-800 mb-8 flex items-center gap-2"><Download size={20} className="text-orange-500" /> النسخ الاحتياطي ونقل البيانات</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={exportData} className="flex flex-col items-center gap-2 p-6 bg-orange-50 rounded-[2rem] border border-orange-100 text-orange-700 font-black shadow-sm active:scale-95 transition-all">
                  <Download size={32} />
                  <span className="text-xs">تصدير الإعدادات</span>
                </button>
                <label className="flex flex-col items-center gap-2 p-6 bg-blue-50 rounded-[2rem] border border-blue-100 text-blue-700 font-black shadow-sm active:scale-95 transition-all cursor-pointer">
                  <Upload size={32} />
                  <span className="text-xs">استيراد الإعدادات</span>
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- App Root ---

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('kunafa_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('kunafa_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('kunafa_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(() => {
    const saved = localStorage.getItem('kunafa_payment');
    return saved ? JSON.parse(saved) : { applePayEnabled: true, cashOnDeliveryEnabled: true };
  });
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('kunafa_admin_config');
    return saved ? JSON.parse(saved) : { 
      username: 'admin', 
      passwordHash: 'admin',
      bannerTitle: 'حلوياتنا صنعت بحب',
      bannerSubtitle: 'أفضل أنواع الكنافة في المملكة',
      storeUrl: ''
    };
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [cart, setCart] = useState<OrderItem[]>([]);

  useEffect(() => localStorage.setItem('kunafa_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('kunafa_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('kunafa_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('kunafa_payment', JSON.stringify(paymentConfig)), [paymentConfig]);
  useEffect(() => localStorage.setItem('kunafa_admin_config', JSON.stringify(adminConfig)), [adminConfig]);

  const addToCart = (product: Product, size?: string) => {
    const price = Array.isArray(product.price) ? (product.price.find(o => o.size === size)?.price || product.price[0].price) : product.price;
    setCart(prev => [...prev, { product, selectedSize: size, quantity: 1, price }]);
  };

  const updateQty = (idx: number, delta: number) => {
    setCart(prev => {
      const next = [...prev];
      const newQty = next[idx].quantity + delta;
      if (newQty > 0) next[idx].quantity = newQty;
      return next;
    });
  };

  const removeItem = (idx: number) => setCart(prev => prev.filter((_, i) => i !== idx));
  const handleOrderComplete = (order: Order) => { setOrders(prev => [...prev, order]); setCart([]); };
  const handleAdminLogin = (u: string, p: string) => { 
    if (u === adminConfig.username && p === adminConfig.passwordHash) setIsAdminLoggedIn(true);
    else alert('عذراً، اسم المستخدم أو كلمة المرور غير صحيحة');
  };

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-screen bg-[#FFFDFB] shadow-2xl relative overflow-x-hidden font-cairo">
        <Routes>
          <Route path="/" element={<Home products={products} categories={categories} adminConfig={adminConfig} addToCart={addToCart} cartCount={cart.length} />} />
          <Route path="/product/:id" element={<ProductDetails products={products} addToCart={addToCart} cartCount={cart.length} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQty={updateQty} removeItem={removeItem} />} />
          <Route path="/checkout" element={<Checkout cart={cart} onOrderComplete={handleOrderComplete} paymentConfig={paymentConfig} />} />
          <Route path="/success/:id" element={<Success />} />
          <Route path="/admin" element={
            isAdminLoggedIn ? (
              <Admin 
                products={products} categories={categories} orders={orders} 
                onUpdateProducts={setProducts} onUpdateCategories={setCategories}
                paymentConfig={paymentConfig} onUpdatePayment={setPaymentConfig}
                adminConfig={adminConfig} onUpdateAdmin={setAdminConfig}
                onLogout={() => setIsAdminLoggedIn(false)}
              />
            ) : <AdminLogin onLogin={handleAdminLogin} />
          } />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
